import Layout from "../../components/Layout/Layout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

function Progress() {
  const user = JSON.parse(localStorage.getItem("user"));

  const currentWeight = Number(user?.currentWeight) || 75;
  const targetWeight = Number(user?.targetWeight) || 80;

  const weightRecords =
    JSON.parse(localStorage.getItem("weightRecords")) || [];

  const startWeight =
    weightRecords.length > 0 ? Number(weightRecords[0].weight) : currentWeight;

  const totalGoalDistance = Math.abs(targetWeight - startWeight);
  const completedDistance = Math.abs(currentWeight - startWeight);

  const progressPercent =
    totalGoalDistance > 0
      ? Math.min(100, Math.round((completedDistance / totalGoalDistance) * 100))
      : 100;

  const goalType =
    targetWeight > startWeight
      ? "Набір маси"
      : targetWeight < startWeight
      ? "Схуднення"
      : "Підтримка ваги";

  const remainingKg = Math.abs(currentWeight - targetWeight).toFixed(1);

  const chartData =
    weightRecords.length > 0
      ? weightRecords.map((record, index) => ({
          date: record.date,
          weight: Number(record.weight),
          index: index + 1,
        }))
      : [
          {
            date: "Старт",
            weight: currentWeight,
            index: 1,
          },
        ];

  return (
    <Layout>
      <section className="progress-page">
        <h1>📈 Прогрес</h1>

        <div className="dashboard-grid">
          <div className="card">
            <h3>⚖️ Поточна вага</h3>
            <p>{currentWeight} кг</p>
          </div>

          <div className="card">
            <h3>🎯 Цільова вага</h3>
            <p>{targetWeight} кг</p>
          </div>

          <div className="card">
            <h3>🏁 Ціль</h3>
            <p>{goalType}</p>
          </div>

          <div className="card">
            <h3>📊 Виконано</h3>
            <p>{progressPercent}%</p>
            <span className="small-text">Залишилось: {remainingKg} кг</span>
          </div>
        </div>

        <div className="card" style={{ marginTop: "30px" }}>
          <h2 style={{ marginBottom: "20px" }}>Графік зміни ваги</h2>

          <div style={{ width: "100%", height: "360px" }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="date" />

                <YAxis domain={["dataMin - 2", "dataMax + 2"]} />

                <Tooltip />

                <ReferenceLine
                  y={targetWeight}
                  label="Ціль"
                  strokeDasharray="4 4"
                />

                <Line
                  type="monotone"
                  dataKey="weight"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Progress;