const router = require("express").Router();

const Car = require("./carRouter");
const Admin = require("./adminRouter");
const Auth = require("./authRouter");
const User = require("./userRouter");
const Details = require("./detailsRouter");

router.use("/api/v1/cars", Car);
router.use("/api/v1/auth", Auth);
router.use("/api/v1/users", User);
router.use("/api/v1/details", Details);

router.use("/", Admin);

module.exports = router;
