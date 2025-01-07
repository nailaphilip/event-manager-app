import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AddEvent from "./pages/AddEvent";
import BrowseEvents from "./pages/BrowseEvents";
import EventPage from "./pages/EventPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add" element={<AddEvent />} />
        <Route path="/browse" element={<BrowseEvents />} />
        <Route path="/https://www.bc.fi/" />
        <Route path="/https://www.bc.fi/" />
        <Route path="/events/:id" element={<EventPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
