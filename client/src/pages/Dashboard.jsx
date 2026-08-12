import { useEffect, useState } from "react";
import { getEvents, getRecommendations } from "../services/api";
import EventCard from "../components/EventCard";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [message, setMessage] = useState("Loading dashboard...");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const profileResponse = await fetch(
          "http://localhost:5000/api/v1/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const profile = await profileResponse.json();

        if (!profileResponse.ok) {
          throw new Error(
            profile.message || "Failed to load profile"
          );
        }

        const eventData = await getEvents();
        const recommendationData = await getRecommendations();

        console.log("PROFILE:", profile);
        console.log("EVENTS:", eventData);
        console.log(
          "DASHBOARD RECOMMENDATIONS:",
          recommendationData
        );

        setUser(profile);
        setEvents(eventData);
        setRecommendations(recommendationData);
        setMessage("");
      } catch (error) {
        setMessage(error.message);
      }
    };

    loadDashboard();
  }, []);

  if (message) {
    return <p>{message}</p>;
  }

  const favoriteEvents = events.filter((event) =>
    user?.favorites?.some(
      (favoriteId) =>
        favoriteId.toString() === event._id
    )
  );

  const upcomingEvents = [...events]
    .sort(
      (a, b) =>
        new Date(a.date) - new Date(b.date)
    )
    .slice(0, 3);

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <span className="dashboard-eyebrow">
          YOUR COMMUNITY
        </span>

        <h1>
          Welcome back, {user?.name?.split(" ")[0]}.
        </h1>

        <p>
          Discover what’s happening nearby and keep track of
          the events that matter to you.
        </p>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-heading">
          <div>
            <span>✨ RECOMMENDED FOR YOU</span>
            <h2>AI Picks</h2>
          </div>
        </div>

        {recommendations.length === 0 ? (
          <div className="dashboard-empty">
            <p>
              Add more interests to your profile to get better
              recommendations.
            </p>
          </div>
        ) : (
          <div className="dashboard-grid">
            {recommendations.slice(0, 3).map((event) => (
              <div className="recommendation-item" key={event._id}>
                <div className="recommendation-meta">
                  <span className="match-score">
                    {event.matchScore}% match
                  </span>

                  <p>
                    {event.recommendationReason}
                  </p>
                </div>

                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="dashboard-section">
        <div className="dashboard-heading">
          <div>
            <span>COMING UP</span>
            <h2>Upcoming Events</h2>
          </div>
        </div>

        <div className="dashboard-grid">
          {upcomingEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
            />
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-heading">
          <div>
            <span>SAVED FOR LATER</span>
            <h2>Your Favorites</h2>
          </div>
        </div>

        {favoriteEvents.length === 0 ? (
          <div className="dashboard-empty">
            <p>
              You haven't saved any events yet.
            </p>
          </div>
        ) : (
          <div className="dashboard-grid">
            {favoriteEvents
              .slice(0, 3)
              .map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                />
              ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;