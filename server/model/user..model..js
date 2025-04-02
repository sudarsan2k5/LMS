import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: "String",
      required: [true, "Name is Required"],
      minLenght: [5, "Name must be at least in 5 character"],
      maxLenght: [50, "Name should be less than 50 character"],
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
      minLenght: [8, "Password must be at least 8 character"],
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

const User = model("User", userSchema);
