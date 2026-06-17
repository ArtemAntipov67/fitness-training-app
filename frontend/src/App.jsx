import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import Nutrition from "./pages/Nutrition/Nutrition";
import Workouts from "./pages/Workouts/Workouts";
import Progress from "./pages/Progress/Progress";
import Profile from "./pages/Profile/Profile";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/nutrition" element={<Nutrition />} />


        <Route path="/workouts" element={<Workouts />} />

        <Route path="/progress" element={<Progress />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;