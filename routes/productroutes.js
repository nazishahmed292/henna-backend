// routes/productRoutes.js  –  Product catalogue endpoints
const express = require("express");
const router  = express.Router();
 
const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
 
const { protect } = require("../middleware/authMiddleware");
 
// POST   /api/products      –  Admin: add a product
router.post("/", protect, addProduct);
 
// GET    /api/products      –  Public: list all available products
router.get("/", getAllProducts);
 
// GET    /api/products/:id  –  Public: get one product
router.get("/:id", getProductById);
 
// PUT    /api/products/:id  –  Admin: update a product
router.put("/:id", protect, updateProduct);
 
// DELETE /api/products/:id  –  Admin: delete a product
router.delete("/:id", protect, deleteProduct);
 
module.exports = router;