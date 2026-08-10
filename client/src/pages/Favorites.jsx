import { useEffect, useState } from "react";
import { getEvents } from "../services/api";
import EventCard from "../components/EventCard";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState("Loading favorites...");

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const token = localStorage.getItem("token");

        // Get logged-in user's profile
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

        // Get all events
        const events = await getEvents();

        // Keep only saved event IDs
        const favoriteEvents = events.filter((event) =>
          profile.favorites.some(
            (favoriteId) => favoriteId.toString() === event._id
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
    <div>
      <h1>My Favorites</h1>

      {message && <p>{message}</p>}

      {!message && favorites.length === 0 && (
        <p>You haven't saved any events yet.</p>
      )}

      {favorites.map((event) => (
        <EventCard
          key={event._id}
          event={event}
        />
      ))}
    </div>
  );
}

export default Favorites;