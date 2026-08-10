import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div>
      <h3>{event.title}</h3>

      <p>{event.description}</p>

      <p>
        <strong>Category:</strong> {event.category}
      </p>

      <p>
        <strong>Age Group:</strong> {event.ageGroup}
      </p>

      <p>
        <strong>Date:</strong>{" "}
        {new Date(event.date).toLocaleDateString()}
      </p>

      <p>
        <strong>Time:</strong> {event.time}
      </p>

      {event.location && (
        <p>
          <strong>Location:</strong> {event.location}
        </p>
      )}

      <Link to={`/events/${event._id}`}>
        View Details
      </Link>

      <hr />
    </div>
  );
}

export default EventCard;