// controllers/authController.js  –  Admin registration & login
const jwt   = require("jsonwebtoken");
const Admin = require("../models/Admin");
 
// Helper: sign a JWT for a given admin ID
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
 
// ── POST /api/auth/register ────────────────────
// Create a new admin account (protect this endpoint in production!)
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
 
    // Prevent duplicate admin accounts
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email already registered." });
    }
 
    const admin = await Admin.create({ name, email, password });
    const token = signToken(admin._id);
 
    res.status(201).json({
      success: true,
      message: "Admin registered successfully.",
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
 
// ── POST /api/auth/login ───────────────────────
// Admin login – returns a JWT on success
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
 
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }
 
    // Explicitly select password since it's hidden by default in the schema
    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }
 
    const token = signToken(admin._id);
 
    res.json({
      success: true,
      message: "Login successful.",
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
 
// ── GET /api/auth/me ───────────────────────────
// Return the currently logged-in admin's details
exports.getMe = async (req, res) => {
  // req.admin is set by the protect middleware
  res.json({ success: true, admin: req.admin });
};