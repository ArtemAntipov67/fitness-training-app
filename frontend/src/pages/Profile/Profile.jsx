import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import "./Profile.css";

function Profile() {
  const savedUser = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    gender: savedUser?.gender || "",
    age: savedUser?.age || "",
    height: savedUser?.height || "",
    currentWeight: savedUser?.currentWeight || "",
    targetWeight: savedUser?.targetWeight || "",
    activityLevel: savedUser?.activityLevel || "medium",
    goalDuration: savedUser?.goalDuration || 12,
  });

  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function calculateProfileData() {
    const age = Number(formData.age);
    const height = Number(formData.height);
    const currentWeight = Number(formData.currentWeight);
    const targetWeight = Number(formData.targetWeight);
    const goalDuration = Number(formData.goalDuration);

    let bmr = 0;

    if (formData.gender === "male") {
      bmr = 10 * currentWeight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * currentWeight + 6.25 * height - 5 * age - 161;
    }

    const activityMultipliers = {
      low: 1.2,
      medium: 1.45,
      high: 1.7,
    };

    const maintenanceCalories = Math.round(
      bmr * activityMultipliers[formData.activityLevel]
    );

    const weightDifference = targetWeight - currentWeight;

    const dailyCalorieAdjustment = Math.round(
      (weightDifference * 7700) / (goalDuration * 7)
    );

    const calories = Math.max(
      1400,
      maintenanceCalories + dailyCalorieAdjustment
    );

    const protein = Math.round(currentWeight * 2);
    const fats = Math.round(currentWeight * 0.8);
    const carbs = Math.round((calories - protein * 4 - fats * 9) / 4);
    const water = Math.round(currentWeight * 35);

    const goalType =
      targetWeight < currentWeight
        ? "Схуднення"
        : targetWeight > currentWeight
        ? "Набір маси"
        : "Підтримка";

    return {
      calories,
      protein,
      fats,
      carbs,
      water,
      goalType,
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!savedUser?.id) {
      setMessage("Спочатку потрібно увійти в акаунт");
      return;
    }

    const calculatedData = calculateProfileData();

    try {
      const response = await fetch(
        `https://fitness-training-backend.onrender.com/api/profile/update/${savedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gender: formData.gender,
            age: Number(formData.age),
            height: Number(formData.height),
            currentWeight: Number(formData.currentWeight),
            targetWeight: Number(formData.targetWeight),
            activityLevel: formData.activityLevel,
            goalDuration: Number(formData.goalDuration),
            calories: calculatedData.calories,
            protein: calculatedData.protein,
            fats: calculatedData.fats,
            carbs: calculatedData.carbs,
            water: calculatedData.water,
            goalType: calculatedData.goalType,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Помилка оновлення профілю");
        return;
      }

      const updatedUser = {
        ...savedUser,
        gender: data.user.gender,
        age: data.user.age,
        height: data.user.height,
        currentWeight: data.user.current_weight,
        targetWeight: data.user.target_weight,
        activityLevel: data.user.activity_level,
        goalDuration: data.user.goal_duration,
        calories: data.user.calories,
        protein: data.user.protein,
        fats: data.user.fats,
        carbs: data.user.carbs,
        water: data.user.water,
        goalType: data.user.goal_type,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      localStorage.setItem("currentWeight", updatedUser.currentWeight);
      localStorage.setItem(
        "nutritionGoal",
        JSON.stringify({
          calories: updatedUser.calories,
          protein: updatedUser.protein,
          fats: updatedUser.fats,
          carbs: updatedUser.carbs,
        })
      );

      setResult(calculatedData);
      setMessage("Профіль успішно оновлено");
    } catch (error) {
      setMessage("Сервер не відповідає");
    }
  }

  return (
    <Layout>
      <section className="profile-page">
        <div className="profile-header">
          <h1>Профіль користувача</h1>
          <p>Заповніть дані для персонального розрахунку КБЖВ</p>
        </div>

        <div className="profile-grid">
          <form className="profile-form" onSubmit={handleSubmit}>
            <h2>Особисті параметри</h2>

            <label>
              Стать
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Оберіть стать</option>
                <option value="male">Чоловіча</option>
                <option value="female">Жіноча</option>
              </select>
            </label>

            <label>
              Вік
              <input
                type="number"
                name="age"
                min="1"
                placeholder="Наприклад: 21"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Зріст, см
              <input
                type="number"
                name="height"
                min="1"
                placeholder="Наприклад: 180"
                value={formData.height}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Поточна вага, кг
              <input
                type="number"
                name="currentWeight"
                min="1"
                step="0.1"
                placeholder="Наприклад: 75"
                value={formData.currentWeight}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Бажана вага, кг
              <input
                type="number"
                name="targetWeight"
                min="1"
                step="0.1"
                placeholder="Наприклад: 80"
                value={formData.targetWeight}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Термін досягнення цілі, тижнів
              <input
                type="number"
                name="goalDuration"
                min="1"
                placeholder="Наприклад: 12"
                value={formData.goalDuration}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Рівень активності
              <select
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
              >
                <option value="low">Низький</option>
                <option value="medium">Середній</option>
                <option value="high">Високий</option>
              </select>
            </label>

            <button type="submit">Оновити профіль</button>

            {message && <p className="profile-message">{message}</p>}
          </form>

          <div className="profile-result">
            <h2>Результат розрахунку</h2>

            {result ? (
              <>
                <div className="result-card">
                  <h3>🎯 Ціль</h3>
                  <p>{result.goalType}</p>
                </div>

                <div className="result-card">
                  <h3>🔥 Калорії</h3>
                  <p>{result.calories} ккал</p>
                </div>

                <div className="result-card">
                  <h3>🥩 Білки</h3>
                  <p>{result.protein} г</p>
                </div>

                <div className="result-card">
                  <h3>🥑 Жири</h3>
                  <p>{result.fats} г</p>
                </div>

                <div className="result-card">
                  <h3>🍚 Вуглеводи</h3>
                  <p>{result.carbs} г</p>
                </div>

                <div className="result-card">
                  <h3>💧 Вода</h3>
                  <p>{result.water} мл</p>
                </div>
              </>
            ) : (
              <p className="empty-result">
                Після заповнення профілю тут зʼявиться персональний розрахунок.
              </p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Profile;