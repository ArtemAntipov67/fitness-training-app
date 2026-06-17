import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Помилка реєстрації");
        return;
      }

      setMessage("Реєстрація успішна");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setMessage("Сервер не відповідає");
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Реєстрація</h1>
        <p>Створи рахунок для збереження своїх даних</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Ім'я"
            value={formData.name}
            onChange={handleChange}
            required
          />

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

          <button type="submit">Зареєструватися</button>
        </form>

        {message && <span className="auth-message">{message}</span>}

        <button className="link-button" onClick={() => navigate("/login")}>
          Уже є акаунт? Увійти
        </button>
      </div>
    </section>
  );
}

export default Register;