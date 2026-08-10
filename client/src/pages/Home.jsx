import { useEffect, useState } from "react";
import { getEvents } from "../services/api";
import EventCard from "../components/EventCard";

function Home() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("Loading events...");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getEvents();

        console.log("EVENTS:", data);

        setEvents(data);
        setMessage("");
      } catch (error) {
        console.error("EVENT ERROR:", error);
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
        <EventCard
          key={event._id}
          event={event}
        />
      ))}
    </div>
  );
}

export default Home;