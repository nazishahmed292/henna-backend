// models/Product.js  –  Henna product catalogue item
const mongoose = require("mongoose");
 
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      trim: true,
      // e.g. "Henna Cones", "Aftercare Oil", "Design Kit", "Gift Sets"
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
    imageUrl: {
      type: String, // URL or path to product image
      trim: true,
    },
    isAvailable: {
      type: Boolean,
      default: true, // Controls whether the product is shown to customers
    },
  },
  { timestamps: true }
);
 
module.exports = mongoose.model("Product", productSchema);