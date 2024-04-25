const ApiError = require("../utils/apiError");

const checkOwnership = (req, res, next) => {
  if (req.user.role === "Admin") {
    return next();
  }
  if (req.user.rentalId != req.params.id)
    return next(new ApiError("Anda bukan bagian dari rental ini!", 401));

  next();
};

module.exports = checkOwnership;
