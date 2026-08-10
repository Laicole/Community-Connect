import { useState } from "react";
import "./FavoriteButton.css";

function FavoriteButton({ eventId }) {
  const [message, setMessage] = useState("");

  const addFavorite = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/v1/users/favorites/${eventId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save favorite");
      }

      setMessage("Saved!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="favorite-wrap">
      <button
        type="button"
        className="favorite-button"
        onClick={addFavorite}
      >
        ♡ Save
      </button>

      {message && (
        <span className="favorite-message">
          {message}
        </span>
      )}
    </div>
  );
}

export default FavoriteButton;