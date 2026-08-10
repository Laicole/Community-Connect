import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
    <nav>
      <Link to="/">Home</Link>

      {" | "}

      <Link to="/favorites">Favorites</Link>

      {" | "}

      <Link to="/profile">Profile</Link>

      {" | "}

      {!token ? (
        <>
          <Link to="/login">Login</Link>

          {" | "}

          <Link to="/register">Register</Link>
        </>
      ) : (
        <button onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;