import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/api";
import "./Auth.css";

function Register() {
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  dateOfBirth: "",
  interests: ""
});

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const userData = {
  name: formData.name,
  email: formData.email,
  password: formData.password,
  dateOfBirth: formData.dateOfBirth,
  interests: formData.interests
    .split(",")
    .map((interest) => interest.trim())
    .filter(Boolean)
};

      const data = await registerUser(userData);

      localStorage.setItem("token", data.token);

      setMessage("Registration successful!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="auth-page">
      <section className="auth-card">
        <h1>Create an account</h1>

        <p className="auth-subtitle">
          Join Community Connect and start discovering events happening in
          your community.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Full Name</label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="dateOfBirth">
               Date of Birth
            </label>

            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="interests">Interests</label>

            <input
              id="interests"
              type="text"
              name="interests"
              placeholder="Music, Sports, Arts"
              value={formData.interests}
              onChange={handleChange}
            />
          </div>

          <button className="auth-button" type="submit">
            Create Account
          </button>
        </form>

        {message && (
          <p className="auth-message">
            {message}
          </p>
        )}

        <p className="auth-link">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </section>
    </div>
  );
}

export default Register;