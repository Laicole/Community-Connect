import { useEffect, useState } from "react";
import { getEvents } from "../services/api";
import EventCard from "../components/EventCard";
import "./Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [removingId, setRemovingId] = useState(null);
  const [message, setMessage] = useState("Loading favorites...");

  const loadFavorites = async () => {
    try {
      const token = localStorage.getItem("token");

      const profileResponse = await fetch(
        "http://localhost:5000/api/v1/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const profile = await profileResponse.json();

      if (!profileResponse.ok) {
        throw new Error(
          profile.message || "Failed to load profile"
        );
      }

      const events = await getEvents();

      const favoriteEvents = events.filter((event) =>
        profile.favorites?.some(
          (favoriteId) =>
            favoriteId.toString() === event._id
        )
      );

      setFavorites(favoriteEvents);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleRemove = async (eventId) => {
    try {
      const token = localStorage.getItem("token");

      setRemovingId(eventId);

      await fetch(
        `http://localhost:5000/api/v1/users/favorites/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTimeout(() => {
        setFavorites((current) =>
          current.filter(
            (event) => event._id !== eventId
          )
        );

        setRemovingId(null);

        window.dispatchEvent(
          new Event("favoritesUpdated")
        );
      }, 350);
    } catch (error) {
      setRemovingId(null);
      setMessage(error.message);
    }
  };

  return (
    <div className="favorites-page">
      <div className="favorites-heading">
        <span>YOUR SAVED EVENTS</span>

        <h1>Favorites</h1>

        <p>
          Keep track of the events you don't want to miss.
        </p>
      </div>

      {message && <p>{message}</p>}

      {!message && favorites.length === 0 && (
        <div className="favorites-empty">
          <div className="empty-heart">
            🤍
          </div>

          <h2>No favorites yet</h2>

          <p>
            Tap the heart on an event and it will appear here.
          </p>
        </div>
      )}

      {!message && favorites.length > 0 && (
        <div className="favorites-list">
          {favorites.map((event, index) => (
            <div
              key={event._id}
              className={`favorite-row ${
                removingId === event._id
                  ? "favorite-removing"
                  : ""
              }`}
              style={{
                animationDelay: `${index * 80}ms`
              }}
            >
              <EventCard event={event} />

              <button
                type="button"
                className="remove-favorite"
                onClick={() =>
                  handleRemove(event._id)
                }
              >
                ♥ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;