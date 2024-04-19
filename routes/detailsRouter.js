const router = require("express").Router();

const Details = require("../controllers/detailsController");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/uploader");

router.get("/", authenticate, Details.getDetails);
router.post("/", authenticate, upload.array("images"), Details.createDetails);

module.exports = router;
