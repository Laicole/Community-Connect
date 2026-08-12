import User from "../models/user.js";
import Event from "../models/event.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// CALCULATE AGE GROUP FROM DATE OF BIRTH
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

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      dateOfBirth,
      interests
    } = req.body || {};

    if (!name || !email || !password || !dateOfBirth) {
      return res.status(400).json({
        message:
          "Name, email, password, and date of birth are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const ageGroup = calculateAgeGroup(dateOfBirth);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
      ageGroup,
      interests
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
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
      dateOfBirth: user.dateOfBirth,
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

// UPDATE LOGGED-IN USER PROFILE
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const {
      name,
      dateOfBirth,
      interests
    } = req.body || {};

    if (name !== undefined) {
      user.name = name;
    }

    if (dateOfBirth !== undefined) {
      user.dateOfBirth = dateOfBirth;
      user.ageGroup = calculateAgeGroup(dateOfBirth);
    }

    if (interests !== undefined) {
      user.interests = interests;
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      dateOfBirth: updatedUser.dateOfBirth,
      ageGroup: updatedUser.ageGroup,
      interests: updatedUser.interests,
      favorites: updatedUser.favorites
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};

// ADD FAVORITE
export const addFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const eventId = req.params.eventId;

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (!user.favorites.includes(eventId)) {
      user.favorites.push(eventId);
      await user.save();
    }

    return res.status(200).json(user.favorites);
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};

// REMOVE FAVORITE
export const removeFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const eventId = req.params.eventId;

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.favorites = user.favorites.filter(
      (favoriteId) =>
        favoriteId.toString() !== eventId
    );

    await user.save();

    return res.status(200).json(user.favorites);
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};

// GET PERSONALIZED EVENT RECOMMENDATIONS
export const getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const events = await Event.find();

    const recommendations = events
      .map((event) => {
        let score = 0;
        const reasons = [];

        const matchingInterest = user.interests?.find(
          (interest) => {
            const interestText = interest.toLowerCase();

            return (
              event.category
                ?.toLowerCase()
                .includes(interestText) ||
              event.title
                ?.toLowerCase()
                .includes(interestText) ||
              event.description
                ?.toLowerCase()
                .includes(interestText)
            );
          }
        );

        if (matchingInterest) {
          score += 70;

          reasons.push(
            `Matches your interest in ${matchingInterest}`
          );
        }

        if (event.ageGroup === user.ageGroup) {
          score += 30;

          reasons.push(
            `Matches your ${user.ageGroup} age group`
          );
        } else if (event.ageGroup === "All Ages") {
          score += 20;
          reasons.push("Open to all ages");
        } else if (event.ageGroup === "Not Specified") {
          score += 10;
          reasons.push("No age restriction listed");
        }

        return {
          ...event.toObject(),
          matchScore: score,
          recommendationReason: reasons.join(" • ")
        };
      })
      .filter(
        (event) => event.matchScore > 0
      )
      .sort(
        (a, b) =>
          b.matchScore - a.matchScore
      );

    return res.status(200).json(recommendations);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};