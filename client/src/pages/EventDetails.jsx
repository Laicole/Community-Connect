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
      <h1>{event.title}</h1>

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

      <p>
        <strong>Organizer:</strong> {event.organizer}
      </p>

      <p>
        <strong>Cost:</strong>{" "}
        {event.cost === null || event.cost === undefined
          ? "Not specified"
          : Number(event.cost) === 0
            ? "Free"
            : `$${event.cost}`}
      </p>
    </div>
  );
}

export default EventDetails;