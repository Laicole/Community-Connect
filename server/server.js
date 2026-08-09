import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import eventRoutes from "./routes/eventRoutes.js";


dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/v1/events", eventRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Community Connect API is running!"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});