const router = require("express").Router();
const Rental = require("../controllers/rentalController");
const authenticate = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");
const checkOwnership = require("../middlewares/checkOwnership");

router.get("/", Rental.getRentals);
router.get("/:id", Rental.getRentalById);

router.post(
  "/",
  authenticate,
  checkRole(["Admin", "Manager"]),
  Rental.createRental
);
router.delete(
  "/:id",
  authenticate,
  checkRole(["Admin", "Manager"]),
  Rental.deleteRental
);

router.patch(
  "/:id",
  authenticate,
  checkOwnership,
  checkRole(["Admin", "Manager"]),
  Rental.updateRental
);

module.exports = router;
