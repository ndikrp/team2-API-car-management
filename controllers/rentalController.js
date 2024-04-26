const { Rental } = require("../models");
const { Op } = require("sequelize");
const ApiError = require("../utils/apiError");

const getRentals = async (req, res, next) => {
  try {
    const { name, city } = req.query;
    const condition = {};

    if (name) {
      condition.name = { [Op.iLike]: `%${name}%` };
    }
    if (city) {
      condition.city = { [Op.iLike]: `%${city}%` };
    }

    const rentals = await Rental.findAll({
      where: condition,
    });

    if (rentals.length < 1) {
      return next(
        new ApiError("Rental data is empty, please add data first", 404)
      );
    }

    res.status(200).json({
      status: "Success",
      totalData: rentals.length,
      data: {
        rentals,
      },
    });
  } catch (error) {
    next(new ApiError(error.message), 400);
  }
};

const getRentalById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const rental = await Rental.findOne({
      where: {
        id,
      },
    });

    if (!rental) {
      return next(new ApiError("There's no rental with this id", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        rental,
      },
    });
  } catch (error) {
    next(new ApiError(error.message), 400);
  }
};

const createRental = async (req, res, next) => {
  try {
    const { name, city } = req.body;

    console.log(req.body);

    if (!name || !city) {
      return next(new ApiError("Please fill the data", 400));
    }

    const newRental = await Rental.create({
      name,
      city,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    res.status(201).json({
      status: "success",
      data: {
        newRental,
      },
    });
  } catch (error) {
    next(new ApiError(err.message), 400);
  }
};

const deleteRental = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedRental = await Rental.destroy({
      where: {
        id,
      },
    });

    if (deletedRental === 0) {
      return next(new ApiError("There's no rental with this id", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Rental deleted successfully :(",
    });
  } catch (error) {
    next(new ApiError(err.message), 500);
  }
};

const updateRental = async (req, res, next) => {
  try {
    const { name, city } = req.body;
    const { id } = req.params;

    const reqBody = req.body;

    if (Object.keys(reqBody).length === 0) {
      return next(new ApiError("Please input your data!", 400));
    }

    const updatedRows = {};
    if (name) {
      updatedRows.name = name;
    }
    if (city) {
      updatedRows.city = city;
    }

    const updateRental = await Rental.update(updatedRows, {
      where: {
        id,
      },
    });

    if (updateRental[0] === 0) {
      return next(new ApiError("There's no rental with this id", 404));
    }

    const updatedRental = await Rental.findOne({
      where: {
        id,
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        updatedRental,
      },
    });
  } catch (error) {
    next(new ApiError(error.message), 400);
  }
};

module.exports = {
  getRentals,
  getRentalById,
  createRental,
  deleteRental,
  updateRental,
};
