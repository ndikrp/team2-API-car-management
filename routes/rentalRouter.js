const router = require("express").Router();
const Rental = require("../controllers/rentalController");
const authenticate = require("../middleware/authentication");
const checkRole = require("../middleware/checkRole");
const checkOwnership = require("../middleware/checkOwnership");

router.get("/", Rental.getRentals);
router.get("/:id", Rental.getRentalById);

router.post("/", authenticate, checkRole("Admin"), Rental.createRental);
router.delete("/:id", authenticate, checkRole("Admin"), Rental.deleteRental);

router.patch(
  "/:id",
  authenticate,
  checkOwnership,
  checkRole("Manager"),
  Rental.updateRental
);

module.exports = router;
