const multer = require("multer");
const { Car, Rental, User } = require("../models");
const imagekit = require("../lib/imagekit");
const ApiError = require("../utils/apiError");
const { Op } = require("sequelize");

const createCar = async (req, res, next) => {
  const { name, rentPrice } = req.body;
  const files = req.files;
  let images = [];

  try {
    if (files) {
      await Promise.all(
        files.map(async (file) => {
          // dapatkan extension file nya
          const split = file.originalname.split(".");
          const extension = split[split.length - 1];

          // upload file ke imagekit
          const uploadedImage = await imagekit.upload({
            file: file.buffer,
            fileName: `IMG-${Date.now()}.${extension}`,
          });
          images.push(uploadedImage.url);
        })
      );
    }
    let rentalId;
    if (req.user.role === "Admin") {
      if (!req.body.rentalId) {
        return next(
          new ApiError(
            "The 'rentalId' field is required to create a product. Please provide the 'rentalId' in the request body.",
            400
          )
        );
      }
      rentalId = req.body.rentalId;
    } else {
      rentalId = req.user.rentalId;
    }
    console.log(rentalId);

    const imagesJson = JSON.stringify(images);

    const newProduct = await Car.create({
      name,
      rentPrice,
      image: imagesJson,
      userId: req.user.id,
      rentalId,
    });

    res.status(200).json({
      status: "Success",
      data: {
        newProduct,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findCars = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const pageNum = parseInt(page)  || 1;
    const pageSize = parseInt(limit)  || 100;
    const offset = (pageNum - 1) * pageSize;

    const totalCount = await Car.count();

    const car = await Car.findAll({
      include: [
        {
          model: Rental,
          attributes: ["id", "name"],
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
      order: [["id", "ASC"]],
      attributes: ["name", "rentPrice", "userId", "createdAt", "updatedAt"],
      limit: pageSize,
      offset: offset,
    });

    const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).json({
      status: "Success",
      data: {
        car,
        pagination: {
          totalData: totalCount,
          totalPages,
          pageNum,
          pageSize,
        },
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findCarById = async (req, res, next) => {
  try {
    const car = await Car.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!car) {
      return next(
        new ApiError(`Car with this ID ${req.params.id} is not exist`, 404)
      );
    }

    if (car.rentalId !== req.user.rentalId) {
      return next(new ApiError("Your shop is not owner of this car", 401));
    }

    res.status(200).json({
      status: "Success",
      data: {
        car,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const UpdateCar = async (req, res, next) => {
  const { name, rentPrice } = req.body;
  try {
    const car = await Car.update(
      {
        name,
        rentPrice,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "Succesfuly update product",
      updatedCar: car,
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteCar = async (req, res, next) => {
  const { name, rentPrice } = req.body;
  try {
    const car = await Car.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!car) {
      return next(new ApiError("Product with this id is not exist", 404));
    }

    await Car.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "Succesfuly delete product",
      deletedCar: car,
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  createCar,
  findCars,
  findCarById,
  UpdateCar,
  deleteCar,
};
