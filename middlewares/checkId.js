const ApiError = require("../utils/apiError");
const { Rental } = require("../models");

const checkId = async (req, res, next) => {
  try {
    const rental = await Rental.findByPk(req.params.id);

    if (!shop) {
      return next(new ApiError(`Rental tidak ada`, 404));
    }

    next();
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = checkId;
