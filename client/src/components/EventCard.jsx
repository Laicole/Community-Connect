import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import "./EventCard.css";

function EventCard({ event }) {
  const formatDate = (dateString) => {
    if (!dateString) return "Date TBD";

    const [year, month, day] = dateString
      .split("T")[0]
      .split("-");

    return `${month}/${day}/${year}`;
  };

  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/event-placeholder.jpg";
  };

  return (
    <article className="event-card">
      <div className="event-image-container">
        <img
          src={event.image || "/event-placeholder.jpg"}
          alt={event.title || "Community event"}
          className="event-image"
          onError={handleImageError}
        />

        <div className="event-favorite">
          <FavoriteButton eventId={event._id} />
        </div>
      </div>

      <div className="event-card-content">
        <div className="event-card-top">
          <span className="category-badge">
            {event.category || "Community"}
          </span>

          <span className="event-date">
            {formatDate(event.date)}
          </span>
        </div>

        <h3>{event.title}</h3>

        <p className="event-description">
          {event.description}
        </p>

        <div className="event-info">
          <p>
            <strong>Time</strong>
            <span>{event.time || "TBD"}</span>
          </p>

          <p>
            <strong>Location</strong>
            <span>
              {event.location || "Location TBD"}
            </span>
          </p>

          <p>
            <strong>Age Group</strong>
            <span>
              {event.ageGroup || "Not Specified"}
            </span>
          </p>
        </div>

        <div className="event-card-actions">
          <Link
            to={`/events/${event._id}`}
            className="details-button"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default EventCard;