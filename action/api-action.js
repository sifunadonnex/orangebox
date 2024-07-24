"use server";
//get users from the server
export const getUsers = async () => {
    const response = await fetch("http://localhost:8000/users");
    const data = await response.json();
    data.forEach((user) => {
      user.resetToken = null;
      user.resetTokenExpiry = null;
      user.profile = null;
    });
    return data;
  };
  
  //get user by id
  export const getUserById = async (id) => {
    const response = await fetch(`http://localhost:8000/users/${id}`);
    const data = await response.json();
    data.resetToken = null;
    data.resetTokenExpiry = null;
    data.profile = null;
    return data;
  }

  //get user by email
  export const getUserByEmail = async (email) => {
    const response = await fetch(`http://localhost:8000/users/${email}`);
    const data = await response.json();
    return data;
  };
  
  //update user
  export const updateUser = async (id, data) => {
    const response = await fetch(`http://localhost:8000/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
  };
  
  //delete user
  export const deleteUser = async (id) => {
    const response = await fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  };

  //add user
  export const addUser = async (data) => {
    const response = await fetch(`http://localhost:8000/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
  };
  
  //get aircrafts from the server
  export const getAircrafts = async () => {
    const response = await fetch("http://localhost:8000/aircrafts");
    const data = await response.json();
    return data;
  };
  
  //get aircraft by id
  export const getAircraftById = async (id) => {
    const response = await fetch(`http://localhost:8000/aircrafts/${id}`);
    const data = await response.json();
    return data;
  };
  
  //update aircraft
  export const updateAircraft = async (id, data) => {
    const response = await fetch(`http://localhost:8000/aircrafts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
  };
  
  //add aircraft
  export const addAircraft = async (data) => {
    const response = await fetch(`http://localhost:8000/aircrafts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
  };

  //delete aircraft
  export const deleteAircraft = async (id) => {
    const response = await fetch(`http://localhost:8000/aircrafts/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  };
  
  //get flights from the server
  export const getFlights = async () => {
    const response = await fetch("http://localhost:8000/csv");
    const data = await response.json();
    return data;
  };

  // Get csv file
  export const getCsvFile = async (id) => {
    const response = await fetch(`http://localhost:8000/csv/${id}`);
    const data = await response.text();
    return data;
  };
  
  //get flight by id
  export const getFlightById = async (id) => {
    const response = await fetch(`http://localhost:8000/flight/${id}`);
    const data = await response.json();
    return data;
  };
  
  //update flight
  export const updateFlight = async (id, data) => {
    const response = await fetch(`http://localhost:8000/csv/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
  };
  
  //delete flight
  export const deleteFlight = async (id) => {
    const response = await fetch(`http://localhost:8000/csv/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  };
  //add flight
  export const newFlight = async (data) => {
    const response = await fetch(`http://localhost:8000/csv`, {
      method: "POST",
      body: data,
    });
    const resData = await response.json();
    return resData;
  };
  
  //get events from the server
  export const getEvents = async () => {
    const response = await fetch("http://localhost:8000/events");
    const data = await response.json();
    return data;
  };
  
  //get event by id
  export const getEventById = async (id) => {
    const response = await fetch(`http://localhost:8000/events/${id}`);
    const data = await response.json();
    return data;
  };
  
  //update event
  export const updateEvent = async (id, data) => {
    const response = await fetch(`http://localhost:8000/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
  };

  // add event
  export const addEvent = async (data) => {
    const response = await fetch(`http://localhost:8000/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
  };
  
  //delete event
  export const deleteEvent = async (id) => {
    const response = await fetch(`http://localhost:8000/events/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  };
  
  //get exceedances from the server
  export const getExceedances = async () => {
    const response = await fetch("http://localhost:8000/exceedances");
    const data = await response.json();
    return data;
  }
  
  //get exceedance by id
  export const getExceedanceById = async (id) => {
    const response = await fetch(`http://localhost:8000/exceedances/${id}`);
    const data = await response.json();
    return data;
  };

  //get exceedance by flight id
  export const getExceedanceByFlightId = async (id) => {
    const response = await fetch(`http://localhost:8000/exceedances/flight/${id}`);
    const data = await response.json();
    return data;
  };
  
  //update exceedance
  export const updateExceedance = async (id, data) => {
    const response = await fetch(`http://localhost:8000/exceedances/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
  };
  
  //delete exceedance
  export const deleteExceedance = async (id) => {
    const response = await fetch(`http://localhost:8000/exceedances/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  };
  