const express = require("express");
const pool = require("../config/db");

const router = express.Router();

router.put("/update/:id", async (req, res) => {
  try {
    const {
      gender,
      age,
      height,
      currentWeight,
      targetWeight,
      activityLevel,
      goalDuration,
      calories,
      protein,
      fats,
      carbs,
      water,
      goalType,
    } = req.body;

    const updatedUser = await pool.query(
      `
      UPDATE users
      SET
        gender = $1,
        age = $2,
        height = $3,
        current_weight = $4,
        target_weight = $5,
        activity_level = $6,
        goal_duration = $7,
        calories = $8,
        protein = $9,
        fats = $10,
        carbs = $11,
        water = $12,
        goal_type = $13
      WHERE id = $14
      RETURNING id, name, email, gender, age, height,
      current_weight, target_weight, activity_level, goal_duration,
      calories, protein, fats, carbs, water, goal_type
      `,
      [
        gender,
        age,
        height,
        currentWeight,
        targetWeight,
        activityLevel,
        goalDuration,
        calories,
        protein,
        fats,
        carbs,
        water,
        goalType,
        req.params.id,
      ]
    );

    res.json({
      message: "Профіль оновлено",
      user: updatedUser.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Помилка оновлення профілю",
    });
  }
});

module.exports = router;