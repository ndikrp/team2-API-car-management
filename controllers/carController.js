const multer = require("multer");
const { Car, Rental, User } = require("../models");
const imagekit = require("../lib/imagekit");
const ApiError = require("../utils/apiError");
const { Op } = require("sequelize");

const createProduct = async (req, res, next) => {
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

const findProducts = async (req, res, next) => {
  try {
    const { productName, username, shop, page, limit } = req.query;
    const condition = {};
    if (productName) condition.name = { [Op.iLike]: `%${productName}%` };

    const includeShopCondition = {};
    if (shop) includeShopCondition.name = { [Op.iLike]: `%${shop}%` };

    const includeUserCondition = {};
    if (username) includeUserCondition.name = { [Op.iLike]: `${username}%` };

    const pageNum = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 100;
    const offset = (pageNum - 1) * pageSize;

    let whereCondition = condition;

    if (req.user.role === "Admin") {
      whereCondition;
    } else {
      whereCondition = {
        ...condition,
        rentalId: req.user.rentalId,
      };
    }

    const totalCount = await Car.count({ where: whereCondition });

    const car = await Car.findAll({
      include: [
        {
          model: Rental,
          where: includeShopCondition,
          attributes: ["id", "name"],
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
      where: whereCondition,
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

const findProductById = async (req, res, next) => {
  try {
    const car = await Car.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!car) {
      return next(
        new ApiError(`car with this ${req.params.id} is not exist`, 404)
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

const UpdateProduct = async (req, res, next) => {
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
      message: "sukses update produk",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteProduct = async (req, res, next) => {
  const { name, rentPrice } = req.body;
  try {
    const car = await Car.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!car) {
      next(new ApiError("Product id tersebut gak ada", 404));
    }

    await Car.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "sukses delete produk",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  createProduct,
  findProducts,
  findProductById,
  UpdateProduct,
  deleteProduct,
};
