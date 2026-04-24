// controllers/bookingController.js  –  CRUD for henna appointment bookings
const Booking = require("../models/Booking");
 
// ── POST /api/bookings ─────────────────────────
// Public: a customer submits a new booking request
exports.createBooking = async (req, res) => {
  try {
    const { name, phone, date, design, notes } = req.body;
 
    if (!name || !phone || !date || !design) {
      return res.status(400).json({
        success: false,
        message: "name, phone, date, and design are required.",
      });
    }
 
    const booking = await Booking.create({ name, phone, date, design, notes });
 
    res.status(201).json({
      success: true,
      message: "Booking submitted! We will confirm shortly. 🌿",
      booking,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
 
// ── GET /api/bookings ──────────────────────────
// Admin: retrieve all bookings, newest first
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, count: bookings.length, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
 
// ── GET /api/bookings/:id ──────────────────────
// Admin: retrieve a single booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found." });
    }
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
 
// ── PATCH /api/bookings/:id/status ────────────
// Admin: update the status of a booking
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["pending", "confirmed", "completed", "cancelled"];
 
    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${allowed.join(", ")}`,
      });
    }
 
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
 
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found." });
    }
 
    res.json({ success: true, message: "Booking status updated.", booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
 
// ── DELETE /api/bookings/:id ───────────────────
// Admin: delete a booking record
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found." });
    }
    res.json({ success: true, message: "Booking deleted." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};