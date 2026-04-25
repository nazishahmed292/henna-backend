const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

console.log("Starting server...");

const PORT = process.env.PORT || 3000;

// ✅ ADMIN LOGIN (CHANGE THIS)
const ADMIN_EMAIL = "admin@taiyaba.com";
const ADMIN_PASSWORD = "Nazish@994545"; // change later

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error:", err));

// Schema
const OrderSchema = new mongoose.Schema({
  customerName: String,
  phone: String,
  eventDate: String,
  serviceType: String,
  location: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", OrderSchema);

// Home
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});


// 🔐 LOGIN API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({
      success: true,
      token: "admin123"
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }
});


// 📦 SAVE BOOKING
app.post("/api/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();

    res.json({
      success: true,
      message: "Booking saved successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});


// 🔒 PROTECTED GET ORDERS
app.get("/api/orders", async (req, res) => {
  try {
    const token = req.headers["authorization"];

if (!token || token !== "admin123") {
  return res.status(403).json({ message: "Unauthorized" });
}

    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);

  } catch (err) {
    res.status(500).json({
      message: "Error fetching orders"
    });
  }
});


// Start server
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});