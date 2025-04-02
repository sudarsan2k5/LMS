import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: "String",
      required: [true, "Name is Required"],
      minLength: [5, "Name must be at least in 5 character"],
      maxLength: [50, "Name should be less than 50 character"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: "String",
      required: [true, "Email is Required"],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: "String",
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 character"],
      select: false,
    },
    avatar: {
      public_id: {
        type: "String",
      },
      secure_url: {
        type: "String",
      },
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware
userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Methods
userSchema.methods.generateJWTToken = async function() {
  return await jwt.sign(
    {
      id: this._id,
      email: this.email,
      subscription: this.subscription,
      role: this.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY
    }
  );
};

const User = mongoose.model("User", userSchema);

export default User;
