import { useEffect, useState } from "react";
import { getEvents } from "../services/api";
import EventCard from "../components/EventCard";
import "./Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState("Loading favorites...");

  useEffect(() => {
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
          profile.favorites.some(
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

    loadFavorites();
  }, []);

  return (
    <div className="favorites-page">
      <div className="favorites-heading">
        <span>YOUR SAVED EVENTS</span>
        <h1>Favorites</h1>
        <p>
          Keep track of events you want to come back to.
        </p>
      </div>

      {message && <p>{message}</p>}

      {!message && favorites.length === 0 && (
        <div className="favorites-empty">
          <h2>No favorites yet</h2>
          <p>Save an event and it will appear here.</p>
        </div>
      )}

      <div className="favorites-grid">
        {favorites.map((event) => (
          <EventCard
            key={event._id}
            event={event}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;