const router = require("express").Router();

const Car = require("./carRouter");
const Auth = require("./authRouter");
const User = require("./userRouter");
const Details = require("./detailsRouter");
const Rental = require('./rentalRouter');

router.use("/api/v1/cars", Car);
router.use("/api/v1/auth", Auth);
router.use("/api/v1/users", User);
router.use("/api/v1/details", Details);
router.use("/api/v1/rentals", Rental);


module.exports = router;
