import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../lib/token.js";
import cloudinary from "../lib/cloudinary.js";

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!email || !fullName || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must not be less than 6 characters" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({ message: "New user registered", user: newUser });
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signUp controller", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "User account is not registered" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ error: "Password is incorrect" });

    generateToken(user._id, res);

    res.status(200).json({ message: "User logged in", user: user.email });
  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(204).json({ message: "User logged out" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { profilePic } = req.body;

  try {
    if (!profilePic) {
      res.status(400).json({ error: "Profile pic is required" });
    }

    const userId = req.user._id;
    if (!userId)
      return res
        .status(401)
        .json({ error: "Unauthorized - token not provided" });

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true },
    );

    res.status(200).json({
      message: "User profile picture updated",
      user: updatedUser.email,
    });
  } catch (error) {
    console.log("Error in updateProfile controller", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    return res.status(500).json({ error: error.message });
  }
};
