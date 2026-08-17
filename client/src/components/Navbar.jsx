import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfile } from "../services/api";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    const loadFavoriteCount = async () => {
      try {
        if (!token) {
          setFavoriteCount(0);
          return;
        }

        const profile = await getProfile();

        setFavoriteCount(
          profile.favorites?.length || 0
        );
      } catch {
        setFavoriteCount(0);
      }
    };

    loadFavoriteCount();

    window.addEventListener(
      "favoritesUpdated",
      loadFavoriteCount
    );

    return () => {
      window.removeEventListener(
        "favoritesUpdated",
        loadFavoriteCount
      );
    };
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setFavoriteCount(0);
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
            <Link to="/events">Events</Link>

            {token ? (
              <>
                <Link to="/dashboard">
                  Dashboard
                </Link>

                <Link
                  to="/favorites"
                  className="favorites-nav-link"
                >
                  Favorites

                  {favoriteCount > 0 && (
                    <span className="favorites-badge">
                      {favoriteCount}
                    </span>
                  )}
                </Link>

                <Link to="/profile">
                  Profile
                </Link>

                <button
                  type="button"
                  className="logout-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
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
            )}
          </nav>
        </div>
      </header>

      {/* MOBILE NAV */}
      <nav className="mobile-nav">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>

        {token ? (
          <>
            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link
              to="/favorites"
              className="favorites-nav-link"
            >
              Favorites

              {favoriteCount > 0 && (
                <span className="favorites-badge">
                  {favoriteCount}
                </span>
              )}
            </Link>

            <Link to="/profile">
              Profile
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Join
            </Link>
          </>
        )}
      </nav>
    </>
  );
}

export default Navbar;