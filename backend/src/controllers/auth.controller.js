import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
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
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {}
};
