import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import "./Nutrition.css";

function Nutrition() {
  const currentWeight = Number(localStorage.getItem("currentWeight")) || 75;
  const waterGoal = Math.round(currentWeight * 35);

  const savedGoal = JSON.parse(localStorage.getItem("nutritionGoal"));

  const dailyGoal = savedGoal || {
    calories: 2900,
    protein: 160,
    fats: 75,
    carbs: 350,
  };

  const foodDatabase = [
    { id: 1, name: "Рис варений", category: "food", unit: "г", calories: 130, protein: 2.7, fats: 0.3, carbs: 28, countsAsWater: false },
    { id: 2, name: "Рис сухий", category: "food", unit: "г", calories: 360, protein: 7, fats: 1, carbs: 78, countsAsWater: false },
    { id: 3, name: "Куряча грудка", category: "food", unit: "г", calories: 165, protein: 31, fats: 3.6, carbs: 0, countsAsWater: false },
    { id: 4, name: "Гречка варена", category: "food", unit: "г", calories: 110, protein: 3.6, fats: 1.1, carbs: 21, countsAsWater: false },
    { id: 5, name: "Вівсянка суха", category: "food", unit: "г", calories: 370, protein: 13, fats: 7, carbs: 60, countsAsWater: false },
    { id: 6, name: "Банан", category: "food", unit: "г", calories: 89, protein: 1.1, fats: 0.3, carbs: 23, countsAsWater: false },
    { id: 7, name: "Яйце куряче", category: "food", unit: "г", calories: 155, protein: 13, fats: 11, carbs: 1.1, countsAsWater: false },
    { id: 8, name: "Сир кисломолочний 5%", category: "food", unit: "г", calories: 121, protein: 17, fats: 5, carbs: 2, countsAsWater: false },
    { id: 9, name: "Молоко 2.5%", category: "food", unit: "г", calories: 52, protein: 3, fats: 2.5, carbs: 4.7, countsAsWater: false },
    { id: 10, name: "Тунець у власному соку", category: "food", unit: "г", calories: 116, protein: 26, fats: 1, carbs: 0, countsAsWater: false },
    { id: 11, name: "Макарони варені", category: "food", unit: "г", calories: 150, protein: 5, fats: 1, carbs: 30, countsAsWater: false },
    { id: 12, name: "Картопля варена", category: "food", unit: "г", calories: 82, protein: 2, fats: 0.1, carbs: 19, countsAsWater: false },

    { id: 101, name: "Вода", category: "drink", unit: "мл", calories: 0, protein: 0, fats: 0, carbs: 0, countsAsWater: true },
    { id: 102, name: "Кока-Кола", category: "drink", unit: "мл", calories: 42, protein: 0, fats: 0, carbs: 10.6, countsAsWater: false },
    { id: 103, name: "Кока-Кола Zero", category: "drink", unit: "мл", calories: 0, protein: 0, fats: 0, carbs: 0, countsAsWater: false },
    { id: 104, name: "Фанта", category: "drink", unit: "мл", calories: 48, protein: 0, fats: 0, carbs: 11.7, countsAsWater: false },
    { id: 105, name: "Спрайт", category: "drink", unit: "мл", calories: 40, protein: 0, fats: 0, carbs: 10, countsAsWater: false },
    { id: 106, name: "Сік апельсиновий", category: "drink", unit: "мл", calories: 45, protein: 0.7, fats: 0.2, carbs: 10.4, countsAsWater: false },
    { id: 107, name: "Кава без цукру", category: "drink", unit: "мл", calories: 2, protein: 0.1, fats: 0, carbs: 0, countsAsWater: true },
    { id: 108, name: "Чай без цукру", category: "drink", unit: "мл", calories: 1, protein: 0, fats: 0, carbs: 0, countsAsWater: true },
    { id: 109, name: "Енергетик", category: "drink", unit: "мл", calories: 45, protein: 0, fats: 0, carbs: 11, countsAsWater: false },
  ];

  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("nutritionProducts");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const [waterAmount, setWaterAmount] = useState(() => {
    return Number(localStorage.getItem("waterAmount")) || 0;
  });

  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    localStorage.setItem("nutritionProducts", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("waterAmount", waterAmount);
  }, [waterAmount]);

  const filteredItems = foodDatabase.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const amountNumber = Number(amount);

  function calculateNutrition(item, value) {
    const multiplier = value / 100;

    return {
      calories: Math.round(item.calories * multiplier),
      protein: Number((item.protein * multiplier).toFixed(1)),
      fats: Number((item.fats * multiplier).toFixed(1)),
      carbs: Number((item.carbs * multiplier).toFixed(1)),
    };
  }

  const preview =
    selectedItem && amountNumber > 0
      ? calculateNutrition(selectedItem, amountNumber)
      : null;

  const total = products.reduce(
    (sum, product) => {
      return {
        calories: sum.calories + product.calories,
        protein: Number((sum.protein + product.protein).toFixed(1)),
        fats: Number((sum.fats + product.fats).toFixed(1)),
        carbs: Number((sum.carbs + product.carbs).toFixed(1)),
      };
    },
    { calories: 0, protein: 0, fats: 0, carbs: 0 }
  );

  const caloriesPercent = Math.min(
    Math.round((total.calories / dailyGoal.calories) * 100),
    100
  );

  const waterPercent = Math.min(
    Math.round((waterAmount / waterGoal) * 100),
    100
  );

  function handleSelectItem(item) {
    setSelectedItem(item);
    setSearchText(item.name);
  }

  function handleAddItem(event) {
    event.preventDefault();

    if (!selectedItem || amountNumber <= 0) {
      return;
    }

    const calculated = calculateNutrition(selectedItem, amountNumber);

    if (selectedItem.countsAsWater) {
      setWaterAmount((previousAmount) => previousAmount + amountNumber);
    }

    const newItem = {
      id: Date.now(),
      name: selectedItem.name,
      amount: amountNumber,
      unit: selectedItem.unit,
      type: selectedItem.category,
      calories: calculated.calories,
      protein: calculated.protein,
      fats: calculated.fats,
      carbs: calculated.carbs,
    };

    setProducts((previousProducts) => [...previousProducts, newItem]);

    setSearchText("");
    setSelectedItem(null);
    setAmount("");
  }

  function handleDeleteProduct(id) {
    setProducts((previousProducts) =>
      previousProducts.filter((product) => product.id !== id)
    );
  }

  function addWater(amount) {
    setWaterAmount((previousAmount) => previousAmount + amount);
  }

  function clearWater() {
    setWaterAmount(0);
  }

  return (
    <Layout>
      <section className="nutrition">
        <div className="nutrition-header">
          <div>
            <h1>Харчування</h1>
            <p>Пошук продуктів, напоїв та автоматичний розрахунок КБЖВ</p>
          </div>
        </div>

        <div className="nutrition-grid">
          <div className="nutrition-card main-calories">
            <h3>🔥 Калорії</h3>
            <p className="big-number">
              {total.calories} / {dailyGoal.calories} ккал
            </p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${caloriesPercent}%` }}
              ></div>
            </div>

            <span>{caloriesPercent}% від добової норми</span>
          </div>

          <div className="nutrition-card">
            <h3>🥩 Білки</h3>
            <p>{total.protein} / {dailyGoal.protein} г</p>
          </div>

          <div className="nutrition-card">
            <h3>🥑 Жири</h3>
            <p>{total.fats} / {dailyGoal.fats} г</p>
          </div>

          <div className="nutrition-card">
            <h3>🍚 Вуглеводи</h3>
            <p>{total.carbs} / {dailyGoal.carbs} г</p>
          </div>
        </div>

        <div className="water-card">
          <div>
            <h3>💧 Водний баланс</h3>
            <p>
              {waterAmount} / {waterGoal} мл
            </p>

            <div className="progress-bar">
              <div
                className="water-fill"
                style={{ width: `${waterPercent}%` }}
              ></div>
            </div>

            <span>
              Норма розрахована за вагою: {currentWeight} кг × 35 мл
            </span>
          </div>

          <div className="water-buttons">
            <button type="button" onClick={() => addWater(250)}>
              +250 мл
            </button>

            <button type="button" onClick={() => addWater(500)}>
              +500 мл
            </button>

            <button type="button" onClick={() => addWater(1000)}>
              +1000 мл
            </button>

            <button type="button" className="clear-water" onClick={clearWater}>
              Очистити
            </button>
          </div>
        </div>

        <form className="product-form" onSubmit={handleAddItem}>
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Почати вводити продукт або напій"
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
                setSelectedItem(null);
              }}
              required
            />

            {searchText && !selectedItem && (
              <div className="suggestions">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => handleSelectItem(item)}
                    >
                      <span>
                        {item.category === "drink" ? "🥤 " : "🍽️ "}
                        {item.name}
                      </span>
                      <small>
                        {item.calories} ккал / 100 {item.unit}
                      </small>
                    </button>
                  ))
                ) : (
                  <p>Нічого не знайдено</p>
                )}
              </div>
            )}
          </div>

          <input
            type="number"
            min="1"
            placeholder="Кількість, г/мл"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            required
          />

          <button type="submit">+ Додати</button>
        </form>

        {preview && (
          <div className="preview-card">
            <h3>Попередній розрахунок</h3>
            <p>
              {selectedItem.name}, {amountNumber} {selectedItem.unit}:
            </p>

            <div className="preview-macros">
              <span>{preview.calories} ккал</span>
              <span>Б: {preview.protein} г</span>
              <span>Ж: {preview.fats} г</span>
              <span>В: {preview.carbs} г</span>
            </div>
          </div>
        )}

        <div className="products-section">
          <h2>Продукти та напої за сьогодні</h2>

          {products.length === 0 ? (
            <p className="empty-text">Поки що продуктів або напоїв немає</p>
          ) : (
            <div className="products-list">
              {products.map((product) => (
                <div className="product-item" key={product.id}>
                  <div>
                    <h4>
                      {product.type === "drink" ? "🥤 " : "🍽️ "}
                      {product.name}
                    </h4>
                    <span>
                      {product.amount} {product.unit}
                    </span>
                  </div>

                  <div className="product-macros">
                    <span>{product.calories} ккал</span>
                    <span>Б: {product.protein} г</span>
                    <span>Ж: {product.fats} г</span>
                    <span>В: {product.carbs} г</span>

                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default Nutrition;