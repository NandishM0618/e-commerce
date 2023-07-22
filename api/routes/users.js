const router = require("express").Router();
const {
  registerUser,
  loginUser,
  logOut,
  forgetPassword,
  getUserDetails,
  updateProfile,
  getUsers,
  getSingleUsers,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logOut);
router.post("/password/forgot", forgetPassword);
router.get("/me", isAuthenticatedUser, getUserDetails);
router.put("/me/update", isAuthenticatedUser, updateProfile);
router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  getUsers
);
router.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  getSingleUsers
);
router.put(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  updateUserRole
);
router.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  deleteUser
);
module.exports = router;
