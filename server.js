const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

console.log("Starting server...");

const PORT = process.env.PORT || 3000;

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

// POST (save booking)
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

// ✅ GET (view bookings)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// Start
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});