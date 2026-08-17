import { useEffect, useMemo, useState } from "react";
import {
  getEvents,
  getProfile,
  getRecommendations
} from "../services/api";
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
        const [
          profile,
          eventData,
          recommendationData
        ] = await Promise.all([
          getProfile(),
          getEvents(),
          getRecommendations()
        ]);

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

  const favoriteEvents = useMemo(() => {
    return events.filter((event) =>
      user?.favorites?.some(
        (favoriteId) =>
          favoriteId.toString() === event._id
      )
    );
  }, [events, user]);

  const upcomingEvents = useMemo(() => {
    return [...events]
      .filter((event) => event.date)
      .sort(
        (a, b) =>
          new Date(a.date) - new Date(b.date)
      )
      .slice(0, 5);
  }, [events]);

  const categoryStats = useMemo(() => {
    const totals = {};

    events.forEach((event) => {
      const category = event.category || "Other";

      totals[category] =
        (totals[category] || 0) + 1;
    });

    return Object.entries(totals)
      .map(([category, count]) => ({
        category,
        count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [events]);

  const maxCategoryCount =
    categoryStats[0]?.count || 1;

  const formatDate = (date) => {
    if (!date) {
      return "TBD";
    }

    return new Date(date).toLocaleDateString();
  };

  const formatCost = (cost) => {
    if (cost === null || cost === undefined) {
      return "—";
    }

    if (Number(cost) === 0) {
      return "Free";
    }

    return `$${Number(cost).toFixed(2)}`;
  };

  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src =
      "/event-placeholder.jpg";
  };

  if (message) {
    return (
      <div className="dashboard-page">
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {/* HEADER */}

      <section className="dashboard-hero">
        <span className="dashboard-eyebrow">
          YOUR COMMUNITY
        </span>

        <h1>
          Welcome back, {user?.name?.split(" ")[0]}.
        </h1>

        <p>
          Here's a quick look at your events,
          recommendations, and saved activity.
        </p>
      </section>

      {/* STATS */}

      <section className="dashboard-stats">
        <article className="stat-card">
          <span>Total Events</span>
          <strong>{events.length}</strong>
          <small>Available to explore</small>
        </article>

        <article className="stat-card">
          <span>Favorites</span>
          <strong>{favoriteEvents.length}</strong>
          <small>Events you've saved</small>
        </article>

        <article className="stat-card">
          <span>AI Picks</span>
          <strong>{recommendations.length}</strong>
          <small>Personalized matches</small>
        </article>

        <article className="stat-card">
          <span>Interests</span>
          <strong>
            {user?.interests?.length || 0}
          </strong>
          <small>Profile interests</small>
        </article>
      </section>

      {/* CHART + ACTIVITY */}

      <section className="dashboard-middle">
        {/* CATEGORY CHART */}

        <article className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <span>EVENT BREAKDOWN</span>
            <h2>Events by Category</h2>
          </div>

          <div className="dashboard-chart">
            {categoryStats.map(
              ({ category, count }) => (
                <div
                  className="chart-row"
                  key={category}
                >
                  <div className="chart-label">
                    <span>{category}</span>
                    <strong>{count}</strong>
                  </div>

                  <div className="chart-track">
                    <div
                      className="chart-bar"
                      style={{
                        width: `${
                          (count /
                            maxCategoryCount) *
                          100
                        }%`
                      }}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </article>

        {/* RECENT ACTIVITY */}

        <article className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <span>YOUR ACTIVITY</span>
            <h2>Recent Activity</h2>
          </div>

          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">
                ♥
              </span>

              <div>
                <strong>
                  {favoriteEvents.length} saved
                </strong>

                <p>
                  Events currently in your favorites.
                </p>
              </div>
            </div>

            <div className="activity-item">
              <span className="activity-icon">
                ✨
              </span>

              <div>
                <strong>
                  {recommendations.length} AI picks
                </strong>

                <p>
                  Personalized using your interests.
                </p>
              </div>
            </div>

            <div className="activity-item">
              <span className="activity-icon">
                ◉
              </span>

              <div>
                <strong>
                  {user?.ageGroup ||
                    "Not specified"}
                </strong>

                <p>
                  Your current event age group.
                </p>
              </div>
            </div>

            <div className="activity-item">
              <span className="activity-icon">
                #
              </span>

              <div>
                <strong>
                  {user?.interests?.join(", ") ||
                    "No interests yet"}
                </strong>

                <p>
                  Interests used for recommendations.
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* TOP EVENTS TABLE */}

      <section className="dashboard-panel dashboard-table-panel">
        <div className="dashboard-panel-heading">
          <span>COMING UP</span>
          <h2>Top Events</h2>
        </div>

        <div className="table-scroll">
          <table className="events-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Category</th>
                <th>Date</th>
                <th>Location</th>
                <th>Cost</th>
              </tr>
            </thead>

            <tbody>
              {upcomingEvents.map((event) => (
                <tr key={event._id}>
                  <td>
                    <div className="table-event">
                      <img
                        src={
                          event.image ||
                          "/event-placeholder.jpg"
                        }
                        alt={
                          event.title ||
                          "Community event"
                        }
                        onError={handleImageError}
                      />

                      <strong>
                        {event.title}
                      </strong>
                    </div>
                  </td>

                  <td>
                    {event.category ||
                      "Community"}
                  </td>

                  <td>
                    {formatDate(event.date)}
                  </td>

                  <td>
                    {event.location ||
                      "Location TBD"}
                  </td>

                  <td>
                    {formatCost(event.cost)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* AI PICKS */}

      <section className="dashboard-section">
        <div className="dashboard-heading">
          <span>
            ✨ PERSONALIZED FOR YOU
          </span>

          <h2>AI Picks</h2>
        </div>

        {recommendations.length === 0 ? (
          <div className="dashboard-empty">
            <p>
              Add interests to your profile to
              improve your recommendations.
            </p>
          </div>
        ) : (
          <div className="dashboard-grid">
            {recommendations
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