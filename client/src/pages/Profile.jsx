import { useEffect, useState } from "react";
import {
  getEvents,
  getProfile,
  updateProfile
} from "../services/api";
import EventCard from "../components/EventCard";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);

  const [name, setName] = useState("");
  const [interests, setInterests] = useState("");

  const [message, setMessage] = useState(
    "Loading profile..."
  );

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const [profile, eventData] =
          await Promise.all([
            getProfile(),
            getEvents()
          ]);

        setUser(profile);
        setEvents(eventData);

        setName(profile.name || "");

        setInterests(
          (profile.interests || []).join(", ")
        );

        setMessage("");
      } catch (error) {
        setMessage(error.message);
      }
    };

    loadProfile();
  }, []);

  const savedEvents = events.filter((event) =>
    user?.favorites?.some(
      (favoriteId) =>
        favoriteId.toString() === event._id
    )
  );

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = await updateProfile({
        name,
        interests: interests
          .split(",")
          .map((interest) => interest.trim())
          .filter(Boolean)
      });

      setUser(updatedUser);

      setMessage(
        "Profile updated successfully!"
      );
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (!user && message) {
    return (
      <div className="profile-page">
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* HORIZONTAL HEADER */}

      <section className="profile-header">
        <div className="profile-avatar">
          {user?.name
            ?.charAt(0)
            .toUpperCase()}
        </div>

        <div className="profile-header-info">
          <span className="profile-eyebrow">
            YOUR COMMUNITY PROFILE
          </span>

          <h1>{user?.name}</h1>

          <p>{user?.email}</p>
        </div>

        <div className="profile-header-meta">
          <div>
            <span>Age Group</span>

            <strong>
              {user?.ageGroup ||
                "Not specified"}
            </strong>
          </div>

          <div>
            <span>Interests</span>

            <strong>
              {user?.interests?.length || 0}
            </strong>
          </div>

          <div>
            <span>Favorites</span>

            <strong>
              {savedEvents.length}
            </strong>
          </div>
        </div>
      </section>

      {/* 3-COLUMN GRID */}

      <section className="profile-grid">
        {/* BADGES */}

        <article className="profile-panel">
          <div className="profile-panel-heading">
            <span>INTERESTS</span>
            <h2>Your Badges</h2>
          </div>

          <div className="profile-badges">
            {user?.interests?.length ? (
              user.interests.map((interest) => (
                <span
                  className="profile-badge"
                  key={interest}
                >
                  {interest}
                </span>
              ))
            ) : (
              <p>No interests added yet.</p>
            )}
          </div>
        </article>

        {/* SAVED EVENTS */}

        <article className="profile-panel">
          <div className="profile-panel-heading">
            <span>SAVED</span>
            <h2>Your Events</h2>
          </div>

          {savedEvents.length === 0 ? (
            <p>
              You haven't saved any events yet.
            </p>
          ) : (
            <div className="profile-events">
              {savedEvents
                .slice(0, 2)
                .map((event) => (
                  <EventCard
                    key={event._id}
                    event={event}
                  />
                ))}
            </div>
          )}
        </article>

        {/* SETTINGS */}

        <article className="profile-panel">
          <div className="profile-panel-heading">
            <span>ACCOUNT</span>
            <h2>Settings</h2>
          </div>

          <form
            className="profile-form"
            onSubmit={handleUpdate}
          >
            <label htmlFor="profile-name">
              Name
            </label>

            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <label htmlFor="profile-email">
              Email
            </label>

            <input
              id="profile-email"
              type="email"
              value={user?.email || ""}
              disabled
            />

            <label htmlFor="profile-age">
              Age Group
            </label>

            <input
              id="profile-age"
              type="text"
              value={
                user?.ageGroup ||
                "Not specified"
              }
              disabled
            />

            <label htmlFor="profile-interests">
              Interests
            </label>

            <input
              id="profile-interests"
              type="text"
              value={interests}
              onChange={(e) =>
                setInterests(e.target.value)
              }
              placeholder="Music, Arts, Technology"
            />

            <button type="submit">
              Update Profile
            </button>
          </form>

          {message && (
            <p className="profile-message">
              {message}
            </p>
          )}
        </article>
      </section>
    </div>
  );
}

export default Profile;