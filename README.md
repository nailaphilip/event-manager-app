# Event Manager App

This project is a simple web application that allows users to add events and browse them. Users can view details of individual events and sign up to receive updates about specific events.

---

## Features

1. **Add Events**: Users can fill out a form to create new events, including uploading an image for each event.
2. **Browse Events**: A list of all events is displayed, with a search bar to filter events by title.
3. **View Event Details**: Users can click on an event to view its details, including the event title, description, date, time, duration, location, and more.
4. **Sign Up for Events**: Users can sign up to receive updates about a specific event.

---

## Technologies Used

- **Frontend**:
  - React
  - CSS (custom styling)
- **Backend**:
  - JSON Server (mock backend)
  - Express.js
  - Multer (for image uploads)

---

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/event-manager-app.git
   cd event-manager-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the JSON Server:

   ```bash
   npm run json-server
   ```

4. Start the React development server:

   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`.

---

## Usage

### Adding an Event
1. Navigate to the "Add Event" page.
2. Fill out the form with the event details (title, description, date, etc.).
3. Upload an image for the event.
4. Submit the form.

### Browsing Events
1. Go to the "Browse Events" page.
2. Use the search bar to filter events by title.
3. Click on an event to view its details.

### Viewing Event Details
1. On the event details page, view all relevant information about the event.
2. Click "Sign Up" to subscribe for updates about the event.

---

## File Structure

### Frontend
- **`src/components`**:
  - `EventCard.js`: Displays individual events in the list.
  - `SignUpForm.js`: Form for signing up for event updates.
- **`src/pages`**:
  - `AddEvent.js`: Page to add new events.
  - `BrowseEvents.js`: Page to browse and search for events.
  - `EventPage.js`: Page to view details of a specific event.
- **`src/styles`**: Contains CSS files for styling.

### Backend
- **`server.js`**: Express.js server for handling image uploads and serving static files.
- **`db.json`**: JSON file for storing event data.

---

## API Endpoints

### Events
- `GET /events`: Fetch all events.
- `GET /events/:id`: Fetch details of a specific event.
- `POST /events`: Add a new event (handled via JSON Server).

### Image Upload
- `POST /upload`: Handle image uploads via Multer. Uploaded images are stored in the `uploads/` directory and served as static files.

---

## Known Issues

- The app does not include user authentication.
- Data is stored temporarily in `db.json` and is not persistent in a database.

---

## Future Improvements

1. Add user authentication to allow users to manage their own events.
2. Integrate with a real backend and database for persistent storage.
3. Enhance styling for better user experience.
4. Add support for event categories and tags.

---

## Contributing

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add a new feature"
   ```

4. Push to the branch:

   ```bash
   git push origin feature-name
   ```

5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

