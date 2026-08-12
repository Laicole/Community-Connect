import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, ageGroup, interests } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      ageGroup,
      interests
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
const calculateAgeGroup = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDifference =
    today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  if (age < 13) {
    return "Children";
  }

  if (age < 18) {
    return "Teen";
  }

  if (age < 65) {
    return "Adult";
  }

  return "Senior";
};
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      ageGroup: user.ageGroup,
      interests: user.interests,
      favorites: user.favorites,
      createdAt: user.createdAt,
      token
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      ageGroup: user.ageGroup,
      interests: user.interests,
      favorites: user.favorites,
      token
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

// GET LOGGED-IN USER PROFILE
export const getProfile = async (req, res) => {
  return res.status(200).json(req.user);
};