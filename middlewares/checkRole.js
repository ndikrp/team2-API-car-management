const ApiError = require("../utils/apiError");

const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      let allowedRoles;
      if (!roles.includes(req.user.role)) {
        if (roles.length > 1) {
          allowedRoles = roles.join(" atau ");
        } else {
          allowedRoles = roles.join(" ");
        }
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
