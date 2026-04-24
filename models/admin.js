// models/Admin.js  –  Admin user account (for JWT login)
const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");
 
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // Never return password field in queries by default
    },
  },
  { timestamps: true }
);
 
// Hash the password before saving if it was modified
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
 
// Instance method: compare plain-text password with stored hash
adminSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
 
module.exports = mongoose.model("Admin", adminSchema);