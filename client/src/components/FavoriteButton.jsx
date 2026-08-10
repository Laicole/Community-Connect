import { useState } from "react";

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

      setMessage("Saved to favorites!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <button onClick={addFavorite}>
        Save to Favorites
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default FavoriteButton;

