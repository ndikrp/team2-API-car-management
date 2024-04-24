const ApiError = require("../utils/apiError");

const checkUserId = (req, res, next) => {
  try {
    if (req.user.id != req.params.id) {
      return next(new ApiError("Anda tidak memiliki akses pada user ini!"));
    }
    next();
  } catch (error) {
    next(new ApiError(error.messagge, 500));
  }
};

module.exports = checkUserId;
