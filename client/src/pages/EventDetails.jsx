import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEventById } from "../services/api";
import FavoriteButton from "../components/FavoriteButton";
import "./EventDetails.css";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("Loading event...");

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
        setMessage("");
      } catch (error) {
        setMessage(error.message);
      }
    };

    loadEvent();
  }, [id]);

  if (message) {
    return (
      <div className="event-details-page">
        <p>{message}</p>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <div className="event-details-page">
      <Link to="/events" className="back-link">
        ← Back to Events
      </Link>

      <article className="event-details-card">
        <div className="event-details-image-wrap">
          <img
            src={event.image || "/event-placeholder.jpg"}
            alt={event.title || "Community event"}
            className="event-details-image"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/event-placeholder.jpg";
            }}
          />

          <div className="event-details-favorite">
            <FavoriteButton eventId={event._id} />
          </div>
        </div>

        <div className="event-details-content">
          <div className="event-details-top">
            <span className="details-category">
              {event.category || "Community"}
            </span>

            <span className="details-date">
              {event.date
                ? new Date(event.date).toLocaleDateString()
                : "Date TBD"}
            </span>
          </div>

          <h1>{event.title}</h1>

          <p className="details-description">
            {event.description}
          </p>

          <div className="details-grid">
            <div>
              <span>Time</span>
              <strong>{event.time || "TBD"}</strong>
            </div>

            <div>
              <span>Age Group</span>
              <strong>
                {event.ageGroup || "Not Specified"}
              </strong>
            </div>

            <div>
              <span>Location</span>
              <strong>
                {event.location || "Location TBD"}
              </strong>
            </div>

            <div>
              <span>Organizer</span>
              <strong>
                {event.organizer || "Not Specified"}
              </strong>
            </div>

            <div>
              <span>Cost</span>
              <strong>
                {event.cost === null || event.cost === undefined
                  ? "Not specified"
                  : Number(event.cost) === 0
                    ? "Free"
                    : `$${event.cost}`}
              </strong>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default EventDetails;