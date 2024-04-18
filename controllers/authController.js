const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Auths, User } = require("../models");
const ApiError = require("../utils/apiError");

const register = async (req, res, next) => {
  try {
    if (req.user.role === "Staff") {
      return next(
        new ApiError("Staff is not allowed to register new users", 403)
      );
    }
    const { name, email, password, confirmPassword, age, address } = req.body;

    const user = await Auths.findOne({
      where: {
        email,
      },
    });

    if (user) {
      next(new ApiError("User email already taken", 400));
    }

    // minimum password length
    const passwordLength = password <= 8;
    if (passwordLength) {
      next(new ApiError("Minimum password must be 8 character", 400));
    }

    // minimum password length
    if (password !== confirmPassword) {
      next(new ApiError("password does not match", 400));
    }

    // hashing password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, saltRounds);

    let rentalId;
    let role;
    if (req.user.role === "Admin") {
      // if user = "Admin"
      role = req.body.role;
      if (!req.body.rentalId) {
        return next(
          new ApiError("Admin must input rentalId in the request body", 400)
        );
      }
      rentalId = req.body.rentalId;
    } else if (req.user.role === "Manager") {
      // if use not "Admin"
      role = "Staff";
      rentalId = req.user.rentalId;
    }

    const newUser = await User.create({
      name,
      address,
      age,
      rentalId,
      role,
    });
    const test = await Auths.create({
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
      userId: newUser.id,
    });

    console.log(test);

    res.status(201).json({
      status: "Success",
      data: {
        ...newUser,
        email,
        password: hashedPassword,
        confirmPassword: hashedConfirmPassword,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Auths.findOne({
      where: {
        email,
      },
      include: ["User"],
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      //   token utk autentikasi
      const token = jwt.sign(
        {
          id: user.userId,
          username: user.User.name,
          role: user.User.role,
          email: user.email,
          rentalId: user.rentalId,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRED,
        }
      );

      res.status(200).json({
        status: "Success",
        message: "Berhasil login",
        data: token,
      });
    } else {
      next(new ApiError("wrong password or user not found", 400));
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const authenticate = async (req, res) => {
  try {
    res.status(200).json({
      status: "Success",
      data: {
        user: req.user,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  register,
  login,
  authenticate,
};
