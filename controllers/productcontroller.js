// controllers/productController.js  –  Admin CRUD for the product catalogue
const Product = require("../models/Product");
 
// ── POST /api/products ─────────────────────────
// Admin: add a new product
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, imageUrl } = req.body;
 
    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Product name and price are required.",
      });
    }
 
    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      imageUrl,
    });
 
    res.status(201).json({ success: true, message: "Product added.", product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
 
// ── GET /api/products ──────────────────────────
// Public: list all available products
exports.getAllProducts = async (req, res) => {
  try {
    // Customers only see products that are marked available
    const filter = req.admin ? {} : { isAvailable: true };
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: products.length, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
 
// ── GET /api/products/:id ──────────────────────
// Public: get a single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
 
// ── PUT /api/products/:id ──────────────────────
// Admin: fully update a product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,       // Accept any subset of product fields
      { new: true, runValidators: true }
    );
 
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }
 
    res.json({ success: true, message: "Product updated.", product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
 
// ── DELETE /api/products/:id ───────────────────
// Admin: remove a product from the catalogue
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }
    res.json({ success: true, message: "Product deleted." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};