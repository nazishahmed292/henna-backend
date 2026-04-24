// routes/authRoutes.js  –  Admin authentication endpoints
const express = require("express");
const router  = express.Router();
 
const { register, login, getMe } = require("../controllers/authController");
const { protect }                = require("../middleware/authMiddleware");
 
// POST /api/auth/register  –  Create an admin account
router.post("/register", register);
 
// POST /api/auth/login     –  Login and receive a JWT
router.post("/login", login);
 
// GET  /api/auth/me        –  Get the logged-in admin's profile (protected)
router.get("/me", protect, getMe);
 
module.exports = router;