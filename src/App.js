import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <div className="home-page-container">
      <Navbar />
      <div className="container">
        <div className="hero-banner">
          <h1>Welcome to BCH events</h1>
        </div>
        <div className="card-container">
          <div className="card">
            <Link to="/add">
              <h2>Add Event</h2>
              <p>Add a new event</p>
            </Link>
          </div>
          <div className="card">
            <Link to="/browse">
              <h2>Browse Events</h2>
              <p>Explore our events</p>
            </Link>
          </div>
          <div className="card">
            <Link to="https://www.bc.fi/">
              <h2>BC's website</h2>
              <p>Visit Our Website</p>
            </Link>
          </div>
          <div className="card">
            <Link to="https://www.myhelsinki.fi/see-and-do/events">
              <h2>What to do in Helsinki</h2>
              <p>Visit city of Helsinki</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
