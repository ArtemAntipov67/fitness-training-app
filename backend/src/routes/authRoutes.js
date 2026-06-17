const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({
        message: "Користувач вже існує",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, current_weight, target_weight, goal_type, created_at
      `,
      [name, email, hashedPassword]
    );

    res.status(201).json({
      message: "Користувача створено",
      user: newUser.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Помилка сервера",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({
        message: "Неправильна пошта або пароль",
      });
    }

    const user = userResult.rows[0];

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Неправильна пошта або пароль",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Вхід успішний",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        currentWeight: user.current_weight,
        targetWeight: user.target_weight,
        goalType: user.goal_type,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Помилка сервера",
    });
  }
});

module.exports = router;