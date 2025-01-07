import React from "react";
import { Link } from "react-router-dom";

import "./EventCard.css";

function EventCard({ event }) {
  return (
    <div className="event-card">

      <img
        className="event-photo"
        src={`http://localhost:3001/${event.photo}`} 
        alt={event.title} 
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

