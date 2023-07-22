const {
  getAllproducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth");

const router = require("express").Router();
router.get(
  "/products",

  getAllproducts
);
router.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  createProduct
);
router.put(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  updateProduct
);
router.get("/product/:id", getProductDetails);
router.delete(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  deleteProduct
);
router.put("/review", isAuthenticatedUser, createProductReview);

module.exports = router;
