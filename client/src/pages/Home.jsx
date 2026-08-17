import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getEvents,
  getRecommendations
} from "../services/api";
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
  const [freeOnly, setFreeOnly] = useState(false);
  const [weekendOnly, setWeekendOnly] = useState(false);

  const [message, setMessage] = useState(
    "Loading events..."
  );

  useEffect(() => {
    const loadHome = async () => {
      try {
        const eventData = await getEvents();

        setEvents(eventData);
        setMessage("");

        const token =
          localStorage.getItem("token");

        if (token) {
          try {
            const recommendationData =
              await getRecommendations();

            setRecommendations(
              recommendationData
            );
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

  const filteredEvents = events.filter(
    (event) => {
      const searchText =
        search.trim().toLowerCase();

      const matchesSearch =
        !searchText ||
        event.title
          ?.toLowerCase()
          .includes(searchText) ||
        event.description
          ?.toLowerCase()
          .includes(searchText);

      const matchesCategory =
        !category ||
        event.category === category;

      const matchesAgeGroup =
        !ageGroup ||
        event.ageGroup === ageGroup;

      const matchesLocation =
        !location ||
        event.location
          ?.toLowerCase()
          .includes(
            location.toLowerCase()
          );

      const eventDate =
        event.date?.split("T")[0] || "";

      const matchesDate =
        !date ||
        eventDate === date;

      const matchesFree =
        !freeOnly ||
        Number(event.cost) === 0;

      let matchesWeekend = true;

      if (weekendOnly && event.date) {
        const eventDay =
          new Date(event.date).getDay();

        matchesWeekend =
          eventDay === 0 ||
          eventDay === 6;
      }

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAgeGroup &&
        matchesLocation &&
        matchesDate &&
        matchesFree &&
        matchesWeekend
      );
    }
  );

  const featuredEvent =
    filteredEvents[0];

  const upNextEvents =
    filteredEvents.slice(1, 4);

  const clearSpecialFilters = () => {
    setFreeOnly(false);
    setWeekendOnly(false);
  };

  const applyCategory = (value) => {
    setCategory(value);
    clearSpecialFilters();
  };

  const showNearYou = () => {
    setLocation("Monticello");
    setFreeOnly(false);
    setWeekendOnly(false);
  };

  const showWeekendEvents = () => {
    setWeekendOnly(true);
    setFreeOnly(false);
  };

  const showFreeEvents = () => {
    setFreeOnly(true);
    setWeekendOnly(false);
  };

  const showAllEvents = () => {
    setSearch("");
    setCategory("");
    setAgeGroup("");
    setLocation("");
    setDate("");
    setFreeOnly(false);
    setWeekendOnly(false);
  };

  return (
    <div className="home-page">
      {/* HERO */}

      <section className="home-hero">
        <span className="hero-greeting">
          GOOD MORNING ☀️
        </span>

        <h1>
          Find something worth
          showing up for.
        </h1>

        <p>
          Discover local events,
          activities, and community
          experiences near you.
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
            onClick={showNearYou}
          >
            📍 Near You
          </button>

          <button
            type="button"
            onClick={showWeekendEvents}
          >
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
              applyCategory(
                "Arts & Culture"
              )
            }
          >
            🎨 Arts
          </button>

          <button
            type="button"
            onClick={() =>
              applyCategory(
                "Health & Wellness"
              )
            }
          >
            🌿 Wellness
          </button>

          <button
            type="button"
            onClick={showAllEvents}
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

      {/* FEATURED + UP NEXT */}

      {featuredEvent && (
        <section className="home-section">
          <div className="section-title-row">
            <div>
              <span className="section-eyebrow">
                FEATURED
              </span>

              <h2>
                Featured Event
              </h2>
            </div>
          </div>

          <div className="home-featured-layout">
            <div className="featured-event">
              <EventCard
                event={featuredEvent}
              />
            </div>

            <aside className="up-next">
              <span className="section-eyebrow">
                COMING SOON
              </span>

              <h2>Up Next</h2>

              <div className="up-next-list">
                {upNextEvents.length ===
                0 ? (
                  <p>
                    No additional events
                    available.
                  </p>
                ) : (
                  upNextEvents.map(
                    (event) => (
                      <Link
                        key={event._id}
                        to={`/events/${event._id}`}
                        className="up-next-item"
                      >
                        <img
                          src={
                            event.image ||
                            "/event-placeholder.jpg"
                          }
                          alt={
                            event.title ||
                            "Community event"
                          }
                          onError={(e) => {
                            e.currentTarget.onerror =
                              null;

                            e.currentTarget.src =
                              "/event-placeholder.jpg";
                          }}
                        />

                        <div>
                          <strong>
                            {event.title}
                          </strong>

                          <span>
                            {event.date
                              ? new Date(
                                  event.date
                                ).toLocaleDateString()
                              : "Date TBD"}
                          </span>

                          <span>
                            {event.location ||
                              "Location TBD"}
                          </span>
                        </div>
                      </Link>
                    )
                  )
                )}
              </div>
            </aside>
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
                      {event.matchScore}%
                      match
                    </strong>

                    <span>
                      {
                        event.recommendationReason
                      }
                    </span>
                  </div>

                  <EventCard
                    event={event}
                  />
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

            <h2>
              Upcoming Events
            </h2>
          </div>

          <span className="event-count">
            {filteredEvents.length}{" "}
            events
          </span>
        </div>

        {filteredEvents.length ===
        0 ? (
          <div className="home-empty">
            <h3>
              No events found
            </h3>

            <p>
              Try changing your
              search or filters.
            </p>
          </div>
        ) : (
          <div className="events-scroll">
            {filteredEvents.map(
              (event) => (
                <div
                  className="event-slide"
                  key={event._id}
                >
                  <EventCard
                    event={event}
                  />
                </div>
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;