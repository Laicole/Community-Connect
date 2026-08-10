import User from"../models/user.js";
import bcrpyt from "bcryptjs";

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
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
        name,
        email,
        password,
        ageGroup,
        interests
    }); 

    return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        ageGroup: user.ageGroup,
        interests: user.interests,
        favorites: user.favorites,
        createdAt: user.createdAt,
    });

 } catch (error) {
      return res.status(400).json({ message: error.message 

    });
  }
};