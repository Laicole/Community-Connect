import { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [interests, setInterests] = useState("");
  const [message, setMessage] = useState("Loading profile...");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/v1/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load profile");
        }

        setUser(data);
        setName(data.name || "");
        setAgeGroup(data.ageGroup || "");
        setInterests((data.interests || []).join(", "));
        setMessage("");
      } catch (error) {
        setMessage(error.message);
      }
    };

    loadProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/v1/users/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            name,
            ageGroup,
            interests: interests
              .split(",")
              .map((interest) => interest.trim())
              .filter(Boolean)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      setUser(data);
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (!user && message === "Loading profile...") {
    return <p>{message}</p>;
  }

  return (
   <div className="profile-page">
    <section className="profile-card">
      <div className="profile-header">
        <div>
          <span className="profile-eyebrow">YOUR COMMUNITY PROFILE</span>
          <h1>My Profile</h1>
          <p>
            Update your interests so Community Connect can recommend better events.
          </p>
        </div>
      </div>

      <form className="profile-form" onSubmit={handleUpdate}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Age Group</label>
        <select
          value={ageGroup}
          onChange={(e) => setAgeGroup(e.target.value)}
        >
          <option value="">Select Age Group</option>
          <option value="Children">Children</option>
          <option value="Teen">Teen</option>
          <option value="Adult">Adult</option>
          <option value="Senior">Senior</option>
          <option value="21+">21+</option>
        </select>

        <label>Interests</label>
        <input
          type="text"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          placeholder="Music, Arts, Technology"
        />

        <button type="submit">
          Update Profile
        </button>
      </form>

      {message && <p className="profile-message">{message}</p>}
    </section>
  </div>
  );
}

export default Profile;