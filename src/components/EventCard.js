import React from "react";
import { Link } from "react-router-dom";

import "./EventCard.css";

function EventCard({ event }) {
  return (
    <div className="event-card">
      {/* Prepend full URL to the photo path */}
      <img
        className="event-photo"
        src={`http://localhost:3001/${event.photo}`} // Full URL for the image
        alt={event.title} // Use event.title as alt text
      />
      <div className="event-card-content">
        <h2>{event.title}</h2>
        <p>{event.info}</p>
        <Link to={`/events/${event.id}`} className="event-link">
          View Event
        </Link>
      </div>
    </div>
  );
}

export default EventCard;

