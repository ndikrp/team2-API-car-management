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

  router.get("/", autentikasi, Car.findCars);
  router.get("/:id", autentikasi, checkOwnership, Car.findCarById);
  router.patch("/:id", autentikasi, checkRole(["Admin", "Manager"]), Car.UpdateCar);
  router.delete("/:id", autentikasi, checkRole(["Admin"]), Car.deleteCar);

module.exports = router;