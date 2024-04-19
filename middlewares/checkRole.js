const ApiError = require("../utils/apiError");

const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        const allowedRoles = roles.join(" or ");
        next(
          new ApiError(
            `Akses anda tidak diterima. Role yang memiliki akses : ${allowedRoles}`,
            401
          )
        );
      }
      next();
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  };
};

module.exports = checkRole;
