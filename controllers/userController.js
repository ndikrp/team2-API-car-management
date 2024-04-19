const { User } = require("../models");
const imagekit = require("../lib/imagekit");
const ApiError = require("../utils/apiError");

const findUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.status(200).json({
      status: "Success",
      data: {
        users,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      throw new ApiError(`Cannot find user with id : ${userId}`, 404);
    }

    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const updateUser = async (req, res, next) => {
  const { name, age, address, role } = req.body;

  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      throw new ApiError(`Cannot find user with id : ${userId}`, 404);
    }

    await User.update(
      {
        name,
        age,
        address,
        role,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "User update successfully",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      throw new ApiError(`User with id : ${userId} doesn't exist`, 404);
    }

    await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "User deleted",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
};
