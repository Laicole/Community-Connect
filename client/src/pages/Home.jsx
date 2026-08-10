import { useEffect, useState } from "react";
import { getEvents } from "../services/api";

function Home() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("Loading events...");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
        setMessage("");
      } catch (error) {
        setMessage(error.message);
      }
    };

    loadEvents();
  }, []);

  return (
    <div>
      <h1>Community Connect</h1>
      <h2>Community Events</h2>

      {message && <p>{message}</p>}

      {events.map((event) => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>Category: {event.category}</p>
          <p>Age Group: {event.ageGroup}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;