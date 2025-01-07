import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/add" className="nav-link">
            Add Event
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/browse" className="nav-link">
            Browse Events
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
