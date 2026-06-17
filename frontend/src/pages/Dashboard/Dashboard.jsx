import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    const savedProducts =
      JSON.parse(localStorage.getItem("nutritionProducts")) || [];

    const calories = savedProducts.reduce(
      (sum, product) => sum + Number(product.calories),
      0
    );

    setTotalCalories(calories);

    const savedUser = localStorage.getItem("user");
    setUser(savedUser ? JSON.parse(savedUser) : null);
  }, []);

  const currentWeight = user?.currentWeight || 0;
  const targetWeight = user?.targetWeight || 0;
  const targetCalories = user?.calories || 0;
  const protein = user?.protein || 0;
  const fats = user?.fats || 0;
  const carbs = user?.carbs || 0;
  const water = user?.water || 0;
  const goalType = user?.goalType || "Профіль не заповнено";

  return (
    <Layout>
      <section className="dashboard">
        <h1>Вітаємо, {user?.name || "користувач"} 👋</h1>
        <p className="subtitle">Твоя персональна фітнес-панель</p>

        {!user && (
          <div className="card">
            <h3>⚠️ Ви не увійшли в акаунт</h3>
            <p>Увійдіть або зареєструйтесь, щоб зберігати свої дані.</p>
          </div>
        )}

        {user && (
          <div className="dashboard-grid">
            <div className="card">
              <h3>🔥 Калорії</h3>
              <p>
                {totalCalories} / {targetCalories || "—"} ккал
              </p>
            </div>

            <div className="card">
              <h3>🎯 Ціль</h3>
              <p>
                {currentWeight || "—"} кг → {targetWeight || "—"} кг
              </p>
              <span className="small-text">{goalType}</span>
            </div>

            <div className="card">
              <h3>🥗 Рекомендоване КБЖВ</h3>
              <p>{targetCalories || "—"} ккал</p>
              <span className="small-text">
                Б: {protein || "—"} г | Ж: {fats || "—"} г | В:{" "}
                {carbs || "—"} г
              </span>
            </div>

            <div className="card">
              <h3>💧 Водний баланс</h3>
              <p>{water || "—"} мл / день</p>
              <span className="small-text">
                Розраховано на основі поточної ваги
              </span>
            </div>

            <div className="card">
              <h3>💪 Наступне тренування</h3>
              <p>Оберіть вправи у розділі тренувань</p>
            </div>

            <div className="card">
              <h3>📈 Прогрес</h3>
              <p>Дані будуть доступні після збереження тренувань</p>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Dashboard;