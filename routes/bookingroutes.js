// routes/bookingRoutes.js  –  Henna appointment booking endpoints
const express = require("express");
const router  = express.Router();
 
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
} = require("../controllers/bookingController");
 
const { protect } = require("../middleware/authMiddleware");
 
// POST   /api/bookings           –  Public: submit a new booking
router.post("/", createBooking);
 
// GET    /api/bookings           –  Admin: list all bookings
router.get("/", protect, getAllBookings);
 
// GET    /api/bookings/:id       –  Admin: get one booking
router.get("/:id", protect, getBookingById);
 
// PATCH  /api/bookings/:id/status – Admin: update booking status
router.patch("/:id/status", protect, updateBookingStatus);
 
// DELETE /api/bookings/:id       –  Admin: delete a booking
router.delete("/:id", protect, deleteBooking);
 
module.exports = router;