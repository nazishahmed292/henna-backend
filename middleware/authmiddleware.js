// middleware/authMiddleware.js  –  Protect routes with JWT verification
const jwt   = require("jsonwebtoken");
const Admin = require("../models/Admin");
 
const protect = async (req, res, next) => {
  let token;
 
  // Expect the token in the Authorization header as "Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
 
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorised. No token provided.",
    });
  }
 
  try {
    // Verify token and decode the admin ID from the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
    // Attach the admin document to req so controllers can use it
    req.admin = await Admin.findById(decoded.id);
    if (!req.admin) {
      return res.status(401).json({ success: false, message: "Admin not found." });
    }
 
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};
 
module.exports = { protect };