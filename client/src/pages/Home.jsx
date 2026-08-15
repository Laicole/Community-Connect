import { useEffect, useState } from "react";
import { getEvents } from "../services/api";
import EventCard from "../components/EventCard";
import "./Home.css";

function Home() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
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

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      !category || event.category === category;

    const matchesAgeGroup =
      !ageGroup || event.ageGroup === ageGroup;

    const eventLocation =
      typeof event.location === "string"
        ? event.location
        : `${event.location?.venue || ""} ${event.location?.city || ""} ${event.location?.state || ""}`;

    const matchesLocation =
      !location ||
      eventLocation.toLowerCase().includes(location.toLowerCase());

    const eventDate = event.date
      ? event.date.split("T")[0]
      : "";

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

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">LOCAL EXPERIENCES</span>

          <h1>Find something worth showing up for.</h1>

          <p>
            Discover community events that match your interests,
            age group, and location.
          </p>
        </div>

        <div className="search-panel">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Health & Wellness">Health & Wellness</option>
            <option value="Children & Family">Children & Family</option>
            <option value="Business & Networking">Business & Networking</option>
            <option value="Arts & Culture">Arts & Culture</option>
            <option value="Pets & Adoption">Pets & Adoption</option>
          </select>

          <select
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
          >
            <option value="">All Age Groups</option>
            <option value="All Ages">All Ages</option>
            <option value="Children">Children</option>
            <option value="Adult">Adult</option>
            <option value="21+">21+</option>
            <option value="Not Specified">Not Specified</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </section>

      <section className="events-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">EXPLORE</span>
            <h2>Community Events</h2>
          </div>

          <p>
            Showing {filteredEvents.length} of {events.length} events
          </p>
        </div>

        {message && <p>{message}</p>}

        <div className="events-scroll">
          {filteredEvents.map((event) => (
            <div className="event-slide" key={event._id}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;