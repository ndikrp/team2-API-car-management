const router = require("express").Router();

const Car = require("../controllers/carController");

const upload = require("../middlewares/uploader");
const autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");
const checkOwnership = require("../middlewares/checkOwnership");

router.post(
  "/",
  autentikasi,
  checkRole(["Admin", "Manager"]),
  upload.array("images"),
  Car.createProduct
);
router.get("/", autentikasi, Car.findProducts);
router.get("/:id", autentikasi, Car.findProductById);
router.patch("/:id", Car.UpdateProduct);
router.delete("/:id", Car.deleteProduct);

module.exports = router;
