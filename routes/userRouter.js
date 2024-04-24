const router = require("express").Router();

const User = require("../controllers/userController");

const upload = require("../middlewares/uploader");
const autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");
const checkUserId = require("../middlewares/checkUserId");

router.get("/", autentikasi, User.findUsers);
router.get("/:id", autentikasi, checkUserId, User.findUserById);
router.patch("/edit/:id", autentikasi, checkRole(["Admin"]), User.updateUser);
router.delete(
  "/delete/:id",
  autentikasi,
  checkRole(["Admin"]),
  User.deleteUser
);

module.exports = router;
