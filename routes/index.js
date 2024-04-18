const router = require("express").Router();

const Product = require("./productRouter");
const Admin = require("./adminRouter");
const Auth = require("./authRouter");
const User = require("./userRouter");
const Shop = require("./shopRouter");
const Details = require("./detailsRouter");

router.use("/api/v1/products", Product);
router.use("/api/v1/auth", Auth);
router.use("/api/v1/users", User);
router.use("/api/v1/shops", Shop);
router.use("/api/v1/details", Details);

router.use("/", Admin);

module.exports = router;
