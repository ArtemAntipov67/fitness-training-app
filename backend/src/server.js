const nutritionRoutes = require("./routes/nutritionRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/nutrition", nutritionRoutes);

app.get("/", (req, res) => {
  res.send("Fitness Training App API працює");
});

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      message: "Підключення до PostgreSQL успішне",
      time: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      message: "Помилка підключення до бази даних",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});