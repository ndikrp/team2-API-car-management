const { User, Auths } = require("../models");
const imagekit = require("../lib/imagekit");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcrypt");

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
  const { name, age, address, email, password, confirmPassword } = req.body;
  let userId;

  try {
    if (req.params.id) {
      userId = req.params.id;
      const user = await User.findByPk(req.params.id);
      if (!user) {
        throw new ApiError(`Cannot find user with id : ${userId}`, 404);
      }
    } else {
      userId = req.user.id;
    }

    let hashedPassword;
    if (password) {
      if (password.length < 8) {
        throw new ApiError(
          "Password needs to be atleast 8 characters long",
          400
        );
      }

      if (password !== confirmPassword) {
        throw new ApiError("Password didn't match", 400);
      }

      const saltRounds = 10;
      hashedPassword = bcrypt.hashSync(password, saltRounds);
    }

    await User.update(
      {
        name,
        age,
        address,
      },
      {
        where: {
          id: userId,
        },
      }
    );

    const updatedUser = await User.findByPk(userId);

    if (email || hashedPassword) {
      await Auths.update(
        {
          email,
          password: hashedPassword,
        },
        {
          where: {
            userId: userId,
          },
        }
      );
    }

    const updatedAuths = await Auths.findOne({
      where: {
        userId: userId,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "User update successfully",
      data: {
        user: updatedUser,
        auths: updatedAuths,
      },
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
