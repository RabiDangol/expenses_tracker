import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//login callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }
    const user = await userModel.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const passwordIsHashed = /^\$2[aby]\$\d{2}\$/.test(user.password);
    const passwordMatches = passwordIsHashed
      ? await bcrypt.compare(password, user.password)
      : password === user.password;

    if (!passwordMatches) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    if (!passwordIsHashed) {
      user.password = await bcrypt.hash(password, 12);
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const safeUser = user.toObject();
    delete safeUser.password;

    res.status(200).json({
      success: true,
      user: safeUser,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Unable to log in right now. Please try again later.",
    });
  }
};

//register callback
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
    }

    const newUser = new userModel({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: await bcrypt.hash(password, 12),
    });
    await newUser.save();
    const safeUser = newUser.toObject();
    delete safeUser.password;

    res.status(201).json({
      success: true,
      newUser: safeUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)
          .map(({ message }) => message)
          .join(", "),
      });
    }

    console.error(error);
    res.status(500).json({
      success: false,
      message: "Unable to create an account right now. Please try again later.",
    });
  }
};

export { loginController, registerController };
