import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../lib/token.js";

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
