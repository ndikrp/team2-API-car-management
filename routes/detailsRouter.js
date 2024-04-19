const router = require("express").Router();

const Details = require("../controllers/detailsController");
const upload = require("../middlewares/uploader");
const autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");

router.get("/", autentikasi, Details.getDetails);
router.post("/", autentikasi, checkRole(["Admin", "Manager"]), upload.array("images"), Details.createDetails);
router.patch("/:id", autentikasi, checkRole(["Admin", "Manager"]), upload.array("images"), Details.updateDetails);

router.get("/:id", autentikasi, Details.findDetailsById);
router.delete("/:id", autentikasi, Details.deleteDetails);

module.exports = router;
