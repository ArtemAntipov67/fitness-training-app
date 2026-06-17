import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">FitApp</div>

      <nav className="sidebar-nav">
        <NavLink to="/">🏠 Головна</NavLink>
        <NavLink to="/nutrition">🍎 Харчування</NavLink>
        <NavLink to="/workouts">💪 Тренування</NavLink>
        <NavLink to="/progress">📈 Прогрес</NavLink>
        <NavLink to="/profile">⚙️ Профіль</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;