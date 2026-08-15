import { useEffect, useState } from "react";
import { getEvents, getRecommendations } from "../services/api";
import EventCard from "../components/EventCard";
import "./Home.css";

function Home() {
  const [events, setEvents] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const [message, setMessage] = useState("Loading events...");

  useEffect(() => {
    const loadHome = async () => {
      try {
        const eventData = await getEvents();

        setEvents(eventData);
        setMessage("");

        const token = localStorage.getItem("token");

        if (token) {
          try {
            const recommendationData =
              await getRecommendations();

            setRecommendations(recommendationData);
          } catch (error) {
            console.error(
              "Could not load recommendations:",
              error.message
            );
          }
        }
      } catch (error) {
        setMessage(error.message);
      }
    };

    loadHome();
  }, []);

  const filteredEvents = events.filter((event) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      event.title?.toLowerCase().includes(searchText) ||
      event.description?.toLowerCase().includes(searchText);

    const matchesCategory =
      !category || event.category === category;

    const matchesAgeGroup =
      !ageGroup || event.ageGroup === ageGroup;

    const matchesLocation =
      !location ||
      event.location
        ?.toLowerCase()
        .includes(location.toLowerCase());

    const eventDate =
      event.date?.split("T")[0] || "";

    const matchesDate =
      !date || eventDate === date;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesAgeGroup &&
      matchesLocation &&
      matchesDate
    );
  });

  const featuredEvent = filteredEvents[0];

  const applyCategory = (value) => {
    setCategory(value);
  };

  const showFreeEvents = () => {
    setSearch("");
    setCategory("");
    setAgeGroup("");
    setLocation("");
    setDate("");
  };

  return (
    <div className="home-page">
      {/* HERO */}

      <section className="home-hero">
        <span className="hero-greeting">
          GOOD MORNING ☀️
        </span>

        <h1>
          Find something worth showing up for.
        </h1>

        <p>
          Discover local events, activities, and
          community experiences near you.
        </p>

        <div className="home-search">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
          />

          <button type="button">
            Find Events
          </button>
        </div>

        {/* QUICK FILTERS */}

        <div className="quick-filters">
          <button
            type="button"
            onClick={() => setLocation("Monticello")}
          >
            📍 Near You
          </button>

          <button type="button">
            📅 This Weekend
          </button>

          <button
            type="button"
            onClick={showFreeEvents}
          >
            🎟️ Free Events
          </button>

          <button
            type="button"
            onClick={() =>
              applyCategory("Music")
            }
          >
            🎵 Music
          </button>

          <button
            type="button"
            onClick={() =>
              applyCategory("Arts & Culture")
            }
          >
            🎨 Arts
          </button>

          <button
            type="button"
            onClick={() =>
              applyCategory("Health & Wellness")
            }
          >
            🌿 Wellness
          </button>

          <button
            type="button"
            onClick={() =>
              applyCategory("")
            }
          >
            All Events
          </button>
        </div>
      </section>

      {message && (
        <p className="home-message">
          {message}
        </p>
      )}

      {/* FEATURED EVENT */}

      {featuredEvent && (
        <section className="home-section">
          <div className="section-title-row">
            <div>
              <span className="section-eyebrow">
                FEATURED
              </span>

              <h2>Featured Event</h2>
            </div>
          </div>

          <div className="featured-event">
            <EventCard event={featuredEvent} />
          </div>
        </section>
      )}

      {/* AI PICKS */}

      {recommendations.length > 0 && (
        <section className="home-section ai-section">
          <div className="section-title-row">
            <div>
              <span className="section-eyebrow">
                ✨ PERSONALIZED FOR YOU
              </span>

              <h2>AI Picks</h2>
            </div>
          </div>

          <div className="events-scroll">
            {recommendations
              .slice(0, 6)
              .map((event) => (
                <div
                  className="event-slide"
                  key={event._id}
                >
                  <div className="recommendation-label">
                    <strong>
                      {event.matchScore}% match
                    </strong>

                    <span>
                      {event.recommendationReason}
                    </span>
                  </div>

                  <EventCard event={event} />
                </div>
              ))}
          </div>
        </section>
      )}

      {/* UPCOMING EVENTS */}

      <section className="home-section">
        <div className="section-title-row">
          <div>
            <span className="section-eyebrow">
              EXPLORE
            </span>

            <h2>Upcoming Events</h2>
          </div>

          <span className="event-count">
            {filteredEvents.length} events
          </span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="home-empty">
            <h3>No events found</h3>

            <p>
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="events-scroll">
            {filteredEvents.map((event) => (
              <div
                className="event-slide"
                key={event._id}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;