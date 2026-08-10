import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div>
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          width="250"
        />
      )}

      <h3>{event.title}</h3>

      <p>{event.description}</p>

      <p>Category: {event.category}</p>

      <p>Age Group: {event.ageGroup}</p>

      <p>
        Location: {event.location?.city}, {event.location?.state}
      </p>

      <Link to={`/events/${event._id}`}>
        View Details
      </Link>
    </div>
  );
}

export default EventCard;