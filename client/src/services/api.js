const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/v1";

const getToken = () => {
  return localStorage.getItem("token");
};

const handleResponse = async (response, fallbackMessage) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || fallbackMessage
    );
  }

  return data;
};

// GET PROFILE
export const getProfile = async () => {
  const token = getToken();

  if (!token) {
    throw new Error("You must be logged in.");
  }

  const response = await fetch(
    `${API_URL}/users/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return handleResponse(
    response,
    "Failed to load profile"
  );
};

export const updateProfile = async (profileData) => {
 const token = getToken();

  if (!token) {
    throw new Error("You must be logged in.");
  }

  const response = await fetch(
    `${API_URL}/users/profile`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    }
  );

  return handleResponse(
    response,
    "Failed to update profile"
  );
};

// REGISTER USER
export const registerUser = async (userData) => {
  const response = await fetch(
    `${API_URL}/users/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    }
  );

  return handleResponse(
    response,
    "Registration failed"
  );
};

// LOGIN USER
export const loginUser = async (credentials) => {
  const response = await fetch(
    `${API_URL}/users/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    }
  );

  return handleResponse(
    response,
    "Login failed"
  );
};

// GET ALL EVENTS
export const getEvents = async () => {
  const response = await fetch(
    `${API_URL}/events`
  );

  return handleResponse(
    response,
    "Failed to fetch events"
  );
};

// GET ONE EVENT BY ID
export const getEventById = async (id) => {
  const response = await fetch(
    `${API_URL}/events/${id}`
  );

  return handleResponse(
    response,
    "Failed to fetch event"
  );
};

// GET RECOMMENDED EVENTS
export const getRecommendations = async () => {
  const token = getToken();

  if (!token) {
    throw new Error("You must be logged in.");
  }

  const response = await fetch(
    `${API_URL}/users/recommendations`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return handleResponse(
    response,
    "Failed to load recommendations"
  );
};