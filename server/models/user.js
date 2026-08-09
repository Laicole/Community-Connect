import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    ageGroup: {
      type: String
    },
    interests: [
      {
        type: String
      }
    ],
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
      }
    ]
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

export default User;