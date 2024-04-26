const router = require("express").Router();

const User = require("../controllers/userController");

const upload = require("../middlewares/uploader");
const autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");

router.get("/", autentikasi, checkRole(["Admin", "Manager"]), User.findUsers);
router.get("/:id", autentikasi, User.findUserById);
router.patch(
  "/:id",
  autentikasi,
  checkRole(["Admin", "Manager"]),
  upload.single("image"),
  User.updateUser
);
router.delete("/:id", autentikasi, checkRole(["Admin"]), User.deleteUser);

module.exports = router;
