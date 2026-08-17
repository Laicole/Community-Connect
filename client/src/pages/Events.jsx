import { useEffect, useState } from "react";
import { getEvents } from "../services/api";
import EventCard from "../components/EventCard";
import "./Events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState("All");
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

  const categories = [
    "All",
    "Music",
    "Food",
    "Art",
    "Wellness",
    "Sports",
    "Tech"
  ];

  const filteredEvents =
    category === "All"
      ? events
      : events.filter((event) =>
          event.category
            ?.toLowerCase()
            .includes(category.toLowerCase())
        );

  return (
    <div className="events-page">
      <header className="events-header">
        <span className="events-eyebrow">
          DISCOVER LOCAL EXPERIENCES
        </span>

        <h1>Explore Events</h1>

        <p>
          Discover what's happening around you.
        </p>
      </header>

      <div className="event-category-filters">
        {categories.map((item) => (
          <button
            type="button"
            key={item}
            className={
              category === item
                ? "category-filter active"
                : "category-filter"
            }
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="events-results-heading">
        <strong>
          {filteredEvents.length} events found
        </strong>
      </div>

      {message && <p>{message}</p>}

      {!message && filteredEvents.length === 0 && (
        <div className="events-empty">
          <p>No events found in this category.</p>
        </div>
      )}

      {!message && filteredEvents.length > 0 && (
       <div className="explore-events-grid">
  {filteredEvents.map((event) => (
    <EventCard
      key={event._id}
      event={event}
    />
  ))}
</div>
      )}
    </div>
  );
}

export default Events;