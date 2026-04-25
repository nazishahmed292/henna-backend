const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express(); // ✅ THIS WAS MISSING

app.use(cors({
  origin: "*"
}));
app.use(express.json());

console.log("Starting server...");

const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

// Home route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ API ROUTE
app.post("/api/orders", async (req, res) => {
  try {
    console.log("Received booking:", req.body);

    res.status(200).json({
      success: true,
      message: "Booking received successfully"
    });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});