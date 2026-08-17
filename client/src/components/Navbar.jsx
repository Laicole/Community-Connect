import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <header className="site-header">
        <div className="navbar-container">
          {/* LOGO */}
          <Link to="/" className="brand">
            <img
              src="/community-connect-logo.png"
              alt="Community Connect"
              className="nav-logo"
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="desktop-nav">
            <Link to="/">Home</Link>

            <Link to="/events">
              Events
            </Link>

            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/favorites">
              Favorites
            </Link>

            <Link to="/profile">
              Profile
            </Link>

            {!token ? (
              <>
                <Link to="/login">
                  Login
                </Link>

                <Link
                  to="/register"
                  className="nav-cta"
                >
                  Join Community
                </Link>
              </>
            ) : (
              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* MOBILE NAV */}
      <nav className="mobile-nav">
        <Link to="/">Home</Link>

        <Link to="/events">
          Events
        </Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/favorites">
          Favorites
        </Link>

        <Link to="/profile">
          Profile
        </Link>
      </nav>
    </>
  );
}

export default Navbar;