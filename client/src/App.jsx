import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventDetails from "./pages/EventDetails";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          {/* PUBLIC ROUTES */}

          <Route path="/" element={<Home />} />

          <Route
            path="/events"
            element={<Events />}
          />

          <Route
            path="/events/:id"
            element={<EventDetails />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          {/* PROTECTED ROUTES */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;