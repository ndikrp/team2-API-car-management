const { Details, Car } = require("../models");
const imagekit = require("../lib/imagekit");
const ApiError = require("../utils/apiError");
const { Op } = require("sequelize");

const getDetails = async (req, res, next) => {
  try {
    const { carId, page, limit } = req.query;

    const condition = {};
    if (carId) condition.carId = { [Op.iLike]: `%${carId}%` };


    const pageNum = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const offset = (pageNum - 1) * pageSize;

    let whereCondition = condition;
    const totalCount = await Details.count({ where: whereCondition });
    const totalPages = Math.ceil(totalCount / pageSize);
   


    const details = await Details.findAll({
      include: [
        {
          model: Car,
          attributes: ["id", "name"],
        },
      ],
      order: [["id", "ASC"]],
      limit:pageSize,
      offset:offset
    });

    res.status(200).json({
      status: "Success",
      data: {
        car_details: details,
        pagination: {
          totalData: totalCount,
          totalPages,
          pageNum,
          pageSize,
        }
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const createDetails = async (req, res, next) => {
  const { carId } = req.body;
  const files = req.files;
  let images = [];

  try {
    if (files) {
      await Promise.all(
        files.map(async (file) => {
          
          const split = file.originalname.split(".");
          const extension = split[split.length - 1];

      
          const uploadedImage = await imagekit.upload({
            file: file.buffer,
            fileName: `IMG-${Date.now()}.${extension}`,
          });
          images.push(uploadedImage.url);
        })
      );
    }

    const newCars = await Details.create({
      imageUrl: images,
      carId,
    });

    res.status(200).json({
      status: "Success",
      data: {
        newCars,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};


const findDetailsById = async (req, res, next) => {
  try {
    const details = await Details.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Car,
          attributes: ["id", "name", "rentalId", "rentPrice" ],
        }
      ]
    });

    if (!details) {
      return next(
        new ApiError(`car's detail with this ${req.params.id} is not exist`, 404)
      );
    }

   

    res.status(200).json({
      status: "Success",
      data: {
        details,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteDetails = async (req, res, next) => {
  const id = req.params.id;

  try {
    await Details.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "Success delete product",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  getDetails,
  createDetails,
  findDetailsById,
  deleteDetails
};
