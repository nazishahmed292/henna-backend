const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

console.log("Starting server...");

const PORT = process.env.PORT || 3000;

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });


// ✅ CREATE SCHEMA
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


// ✅ Home route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});


// ✅ FIXED API ROUTE (NOW SAVES DATA)
app.post("/api/orders", async (req, res) => {
  try {
    console.log("Received booking:", req.body);

    // 🔥 SAVE TO DATABASE
    const newOrder = new Order(req.body);
    await newOrder.save();

    console.log("Saved to MongoDB ✅");

    res.status(200).json({
      success: true,
      message: "Booking saved successfully"
    });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});


// ✅ Start server
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});