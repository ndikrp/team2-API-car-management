const { Details } = require("../models");
const imagekit = require("../lib/imagekit");
const ApiError = require("../utils/apiError");

const getDetails = async (req, res, next) => {
  try {
    const details = await Details.findAll();

    res.status(200).json({
      status: "Success",
      data: {
        car_details: details,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const createDetails = async (req, res, next) => {
  const { imageUrl, carId } = req.body;
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

module.exports = {
  getDetails,
  createDetails,
};
