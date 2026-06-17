import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Register/Register.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("https://fitness-training-backend.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Помилка входу");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Вхід успішний");

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      setMessage("Сервер не відповідає");
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Вхід</h1>
        <p>Увійди у свій акаунт</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Електронна пошта"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Увійти</button>
        </form>

        {message && <span className="auth-message">{message}</span>}

        <button className="link-button" onClick={() => navigate("/register")}>
          Немає акаунта? Зареєструватися
        </button>
      </div>
    </section>
  );
}

export default Login;