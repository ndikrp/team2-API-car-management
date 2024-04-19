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
  Car.createCar
);
router.get("/", autentikasi, checkRole(["Admin"]), Car.findProducts);
router.get("/:id", autentikasi, checkOwnership, Car.findProductById);
router.patch("/:id", autentikasi, checkOwnership, Car.UpdateProduct);
router.delete(
  "/:id",
  autentikasi,
  checkRole(["Admin", "Manager"]),
  checkOwnership,
  Car.deleteProduct
);

module.exports = router;
