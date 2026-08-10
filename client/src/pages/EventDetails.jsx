import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../services/api";

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
    return <p>{message}</p>;
  }

  if (!event) {
    return null;
  }

  return (
    <div>
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          width="400"
        />
      )}

      <h1>{event.title}</h1>

      <p>{event.description}</p>

      <p>Category: {event.category}</p>

      <p>Age Group: {event.ageGroup}</p>

      <p>
        Date: {new Date(event.date).toLocaleDateString()}
      </p>

      <p>
        Time: {event.startTime || event.time}
        {event.endTime && ` - ${event.endTime}`}
      </p>

      <p>
        Location: {event.location?.venue}
      </p>

      <p>
        {event.location?.street}
      </p>

      <p>
        {event.location?.city}, {event.location?.state}{" "}
        {event.location?.zipCode}
      </p>

      <p>Organizer: {event.organizer}</p>

      <p>
        Cost:{" "}
        {event.cost === null || event.cost === undefined
          ? "Not specified"
          : event.cost === 0
            ? "Free"
            : `$${event.cost}`}
      </p>
    </div>
  );
}

export default EventDetails;