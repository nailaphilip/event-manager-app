import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import DatePicker from "react-datepicker";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "react-datepicker/dist/react-datepicker.css";
import "leaflet/dist/leaflet.css";
import "./AddEvent.css";

function AddEvent() {
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [position, setPosition] = useState(null);
  const [transport, setTransport] = useState("");
  const [duration, setDuration] = useState("");
  const [photo, setPhoto] = useState(null); 
  const [photoPreview, setPhotoPreview] = useState(null); 

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file); 
      setPhotoPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let photoUrl = "";

      if (photo) {
        const formData = new FormData();
        formData.append("photo", photo);

        console.log("Uploading photo...");
        const uploadResponse = await axios.post("http://localhost:3001/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        photoUrl = uploadResponse.data.fileUrl;
        console.log("Photo uploaded successfully:", photoUrl);
      }

      console.log("Submitting event data...");
      const response = await axios.post("http://localhost:3001/events", {
        title,
        info,
        date: date?.toISOString().split("T")[0],
        time,
        duration,
        location,
        transport,
        photo: photoUrl,
      });

      alert("Event has been added successfully.");
      console.log("Event added:", response.data);

      setTitle("");
      setInfo("");
      setDate(null);
      setTime("");
      setDuration("");
      setLocation("");
      setTransport("");
      setPhoto(null);
      setPhotoPreview(null);
    } catch (error) {
      console.error("Error adding event:", error);
      alert("An error occurred while adding the event.");
    }
  };

  const handleLocationChange = async (e) => {
    const locationName = e.target.value;
    setLocation(locationName);

    if (!locationName) {
      setPosition(null);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert("Location not found. Please try another search.");
      }
    } catch (error) {
      console.error("Error fetching geolocation data:", error);
      alert("Error fetching location data. Please try again later.");
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      async click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]); // Update position with clicked coordinates

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          const data = await response.json();

          if (data && data.display_name) {
            setLocation(data.display_name); // Update input with place name
          } else {
            setLocation(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`); // Fallback to coordinates
          }
        } catch (error) {
          console.error("Error fetching reverse geocoding data:", error);
          alert("Error fetching location name. Please try again.");
        }
      },
    });
    return null;
  };

  // Component to dynamically update the map view
  const UpdateMapView = () => {
    const map = useMap();
    if (position) {
      map.setView(position, 13);
    }
    return null;
  };

  return (
    <div>
      <Navbar />
      <div className="add-event-container">
        <h1>Add Event</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="info">Event Information:</label>
            <textarea
              id="info"
              value={info}
              onChange={(event) => setInfo(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="date">Date:</label>
            <DatePicker
              selected={date}
              onChange={(newDate) => setDate(newDate)}
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div>
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="duration">Duration:</label>
            <input
              type="text"
              id="duration"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              placeholder="e.g., 2 hours"
            />
          </div>
          <div>
            <label htmlFor="location">Enter Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={handleLocationChange}
              placeholder="Search for a location"
            />
          </div>

          <MapContainer
            center={position || [51.505, -0.09]} // Default center
            zoom={13}
            style={{ height: "400px", width: "100%" }}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {position && (
              <Marker position={position}>
                <Popup>
                  <b>{location}</b>
                </Popup>
              </Marker>
            )}
            <MapClickHandler />
            <UpdateMapView />
          </MapContainer>

          <div>
            <label htmlFor="transport">Transport:</label>
            <textarea
              id="transport"
              value={transport}
              onChange={(event) => setTransport(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="photo">Upload Photo:</label>
            <input type="file" id="photo" accept="image/*" onChange={handlePhotoUpload} />
            {photoPreview && (
              <div style={{ marginTop: "10px" }}>
                <img
                  src={photoPreview}
                  alt="Event Preview"
                  style={{ width: "200px", height: "auto", borderRadius: "5px" }}
                />
              </div>
            )}
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
