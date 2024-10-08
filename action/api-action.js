"use server";

const jwtSecret = 'a6bca59a8855b4';

//login
export const login = async (data) => {
  const response = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  return resData;
};

const fetchWithAuth = async (url, options = {}) => {
  const token = jwtSecret;
  const headers = {
    ...options.headers,
    Authorization: `${token}`,
  };
  const response = await fetch(url, { ...options, headers });
  return response;
};

// Get users from the server
export const getUsers = async () => {
  const response = await fetchWithAuth("http://localhost:8000/users");
  const data = await response.json();
  data.forEach((user) => {
    user.resetToken = null;
    user.resetTokenExpiry = null;
    user.profile = null;
  });
  return data;
};

// Get user by id
export const getUserById = async (id) => {
  const response = await fetchWithAuth(`http://localhost:8000/users/${id}`);
  const data = await response.json();
  data.resetToken = null;
  data.resetTokenExpiry = null;
  data.profile = null;
  return data;
};

// Get user by email
export const getUserByEmail = async (id) => {
  const response = await fetchWithAuth(`http://localhost:8000/user/${id}`);
  const data = await response.json();
  return data;
};

// Update user
export const updateUser = async (id, data) => {
  const response = await fetchWithAuth(`http://localhost:8000/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  return resData;
};

// Delete user
export const deleteUser = async (id) => {
  const response = await fetchWithAuth(`http://localhost:8000/users/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

// Add user
export const addUser = async (data) => {
  const response = await fetchWithAuth(`http://localhost:8000/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  return resData;
};

// Get aircrafts from the server
export const getAircrafts = async () => {
  const response = await fetchWithAuth("http://localhost:8000/aircrafts");
  const data = await response.json();
  return data;
};

// Get aircraft by id
export const getAircraftById = async (id) => {
  const response = await fetchWithAuth(`http://localhost:8000/aircrafts/${id}`);
  const data = await response.json();
  return data;
};

// Update aircraft
export const updateAircraft = async (id, data) => {
  const response = await fetchWithAuth(
    `http://localhost:8000/aircrafts/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const resData = await response.json();
  return resData;
};

// Add aircraft
export const addAircraft = async (data) => {
  const response = await fetchWithAuth(`http://localhost:8000/aircrafts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  return resData;
};

// Delete aircraft
export const deleteAircraft = async (id) => {
  const response = await fetchWithAuth(
    `http://localhost:8000/aircrafts/${id}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();
  return data;
};

// Get flights from the server
export const getFlights = async () => {
  const response = await fetchWithAuth("http://localhost:8000/csv");
  const data = await response.json();
  return data;
};

// Get CSV file
export const getCsvFile = async (id) => {
  const response = await fetchWithAuth(`http://localhost:8000/csv/${id}`);
  const data = await response.text();
  return data;
};

// Get flight by id
export const getFlightById = async (id) => {
  const response = await fetchWithAuth(`http://localhost:8000/flight/${id}`);
  const data = await response.json();
  return data;
};

// Update flight
export const updateFlight = async (id, data) => {
  const response = await fetchWithAuth(`http://localhost:8000/csv/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  return resData;
};

// Delete flight
export const deleteFlight = async (id) => {
  const response = await fetchWithAuth(`http://localhost:8000/csv/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

// Add flight
export const newFlight = async (data) => {
  const response = await fetchWithAuth(`http://localhost:8000/csv`, {
    method: "POST",
    body: data,
  });
  const resData = await response.json();
  return resData;
};

// Get events from the server
export const getEvents = async () => {
  const response = await fetchWithAuth("http://localhost:8000/events");
  const data = await response.json();
  return data;
};

// Get event by id
export const getEventById = async (id) => {
  const response = await fetchWithAuth(`http://localhost:8000/events/${id}`);
  const data = await response.json();
  return data;
};

// Update event
export const updateEvent = async (id, data) => {
  const response = await fetchWithAuth(`http://localhost:8000/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  return resData;
};

// Add event
export const addEvent = async (data) => {
  const response = await fetchWithAuth(`http://localhost:8000/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  return resData;
};

// Delete event
export const deleteEvent = async (id) => {
  const response = await fetchWithAuth(`http://localhost:8000/events/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

// Get exceedances from the server
export const getExceedances = async () => {
  const response = await fetchWithAuth("http://localhost:8000/exceedances");
  const data = await response.json();
  return data;
};

// Get exceedance by id
export const getExceedanceById = async (id) => {
  const response = await fetchWithAuth(
    `http://localhost:8000/exceedances/${id}`
  );
  const data = await response.json();
  return data;
};

// Get exceedance by flight id
export const getExceedanceByFlightId = async (id) => {
  const response = await fetchWithAuth(
    `http://localhost:8000/exceedances/flight/${id}`
  );
  const data = await response.json();
  return data;
};

// Update exceedance
export const updateExceedance = async (id, data) => {
  const response = await fetchWithAuth(
    `http://localhost:8000/exceedances/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const resData = await response.json();
  return resData;
};

// Add exceedance
export const addExceedance = async (data) => {
  const response = await fetchWithAuth(`http://localhost:8000/exceedances`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  return resData;
};

// Delete exceedance
export const deleteExceedance = async (id) => {
  const response = await fetchWithAuth(
    `http://localhost:8000/exceedances/${id}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();
  return data;
};
