const router = require("express").Router();

const Details = require("../controllers/detailsController");
const upload = require("../middlewares/uploader");

router.get("/", Details.getDetails);
router.post("/", upload.array("images"), Details.createDetails);

module.exports = router;
