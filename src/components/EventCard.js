import React from "react";
import { Link } from "react-router-dom";

import "./EventCard.css";

function EventCard({ event }) {
  return (
    <div className="event-card">
      {event.photo && (
        <img
          className="event-photo"
          src={`https://event-manager-app-json-server.onrender.com/${event.photo}`}
          alt={event.title || "Event"}
        />
      )}
      <div className="event-card-content">
        <h2>{event.title || "Title unavailable"}</h2>
        <p>{event.info || "Information not available"}</p>
        <Link to={`/events/${event.id}`} className="event-link">
          View Event
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
