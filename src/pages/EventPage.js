import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";

import "./EventPage.css";

function EventPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://event-manager-app-json-server.onrender.com/events/${params.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching event data:", error))
      .finally(() => setIsLoading(false));
  }, [params.id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="event-page">
      <div className="event-card">
        {data.photo && (
          <img
            className="event-photo"
            src={`https://event-manager-app-json-server.onrender.com/uploads/${data.photo}`}
            alt={data.title || "Event"}
          />
        )}
        <div className="event-card-content">
          <h2>{data.title || "Title unavailable"}</h2>
          <p>{data.info || "Information not available"}</p>
          <p>{data.date || "Date not available"}</p>
          <p>{data.time || "Time not available"}</p>
          <p>{data.duration || "Duration not available"}</p>
          <p>{data.location || "Location not available"}</p>
          <p>{data.transport || "Transport not available"}</p>
        </div>
        <button className="go-back-button" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
      <p>Sign up to receive updates about this event</p>
      <SignUpForm />
    </div>
  );
}

export default EventPage;
