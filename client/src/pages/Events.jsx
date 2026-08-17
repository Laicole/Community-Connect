import { useEffect, useState } from "react";
import { getEvents } from "../services/api";
import EventCard from "../components/EventCard";
import "./Events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState("All");

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [message, setMessage] = useState(
    "Loading events..."
  );

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

  const handleSearch = (e) => {
    e.preventDefault();

    setSearchTerm(searchInput.trim());
  };

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      category === "All" ||
      event.category
        ?.toLowerCase()
        .includes(category.toLowerCase());

    const query = searchTerm.toLowerCase();

    const matchesSearch =
      !query ||
      event.title
        ?.toLowerCase()
        .includes(query) ||
      event.description
        ?.toLowerCase()
        .includes(query) ||
      event.category
        ?.toLowerCase()
        .includes(query) ||
      event.location
        ?.toLowerCase()
        .includes(query) ||
      event.organizer
        ?.toLowerCase()
        .includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="events-page">
      {/* HEADER */}

      <header className="events-header">
        <span className="events-eyebrow">
          DISCOVER LOCAL EXPERIENCES
        </span>

        <h1>Explore Events</h1>

        <p>
          Discover what's happening around you.
        </p>
      </header>

      {/* SEARCH */}

      <form
        className="events-search"
        onSubmit={handleSearch}
      >
        <input
          type="search"
          placeholder="Search events, locations, or categories..."
          value={searchInput}
          onChange={(e) =>
            setSearchInput(e.target.value)
          }
          aria-label="Search events"
        />

        <button type="submit">
          Find
        </button>
      </form>

      {/* CATEGORY FILTERS */}

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

      {/* RESULTS */}

      <div className="events-results-heading">
        <strong>
          {filteredEvents.length} events found
        </strong>
      </div>

      {message && (
        <p className="events-message">
          {message}
        </p>
      )}

      {!message &&
        filteredEvents.length === 0 && (
          <div className="events-empty">
            <h3>No events found</h3>

            <p>
              Try another search or category.
            </p>
          </div>
        )}

      {/* 4-COLUMN EVENT GRID */}

      {!message &&
        filteredEvents.length > 0 && (
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