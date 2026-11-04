const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json"
      },
      ...options
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    return await response.json();
  } catch (error) {
    console.warn("Backend unavailable:", error.message);
    return null;
  }
}

export const api = {
  getSessions: () => request("/sessions"),

  createSession: (data) =>
    request("/sessions", {
      method: "POST",
      body: JSON.stringify(data)
    }),

  updateSession: (id, data) =>
    request(`/sessions/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),

  deleteSession: (id) =>
    request(`/sessions/${id}`, {
      method: "DELETE"
    })
};