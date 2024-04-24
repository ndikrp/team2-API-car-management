const ApiError = require("../utils/apiError");
const { User } = require("../models");

const checkUserRental = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (req.user.rentalId !== user.rentalId) {
      return next(new ApiError("Anda tidak memiliki akses!"));
    }
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

module.exports = checkUserRental;
