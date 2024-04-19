const router = require("express").Router();

const Details = require("../controllers/detailsController");
const upload = require("../middlewares/uploader");

router.get("/", Details.getDetails);
router.post("/", upload.array("images"), Details.createDetails);
router.get("/:id", Details.findDetailsById);
router.delete("/:id", Details.deleteDetails)

module.exports = router;
