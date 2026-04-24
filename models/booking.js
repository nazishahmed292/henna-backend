// models/Booking.js  –  Henna appointment booking
const mongoose = require("mongoose");
 
const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Appointment date is required"],
    },
    design: {
      type: String,
      required: [true, "Design preference is required"],
      trim: true,
      // e.g. "Bridal Full Hands", "Arabic Pattern", "Minimalist"
    },
    notes: {
      type: String,
      trim: true, // Optional additional notes from the customer
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);
 
module.exports = mongoose.model("Booking", bookingSchema);