const express = require("express");
const pool = require("../config/db");

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM nutrition_entries
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [req.params.userId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Помилка отримання записів харчування",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      name,
      type,
      amount,
      unit,
      calories,
      protein,
      fats,
      carbs,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO nutrition_entries
      (
        user_id,
        name,
        type,
        amount,
        unit,
        calories,
        protein,
        fats,
        carbs
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *
      `,
      [
        userId,
        name,
        type,
        amount,
        unit,
        calories,
        protein,
        fats,
        carbs,
      ]
    );

    res.status(201).json({
      message: "Запис додано",
      item: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Помилка додавання запису харчування",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM nutrition_entries WHERE id = $1",
      [req.params.id]
    );

    res.json({
      message: "Запис видалено",
    });
  } catch (error) {
    res.status(500).json({
      message: "Помилка видалення запису",
    });
  }
});

module.exports = router;