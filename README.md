Certainly! Here is a professional, comprehensive README file you can directly paste into your GitHub repository for your MoodMusic project:

# MoodMusic 🎵

MoodMusic is a mood-based music recommendation web application that offers users personalized playlists and favorite management. It uses a PostgreSQL backend with a Node.js/Express API and a modern JavaScript frontend, allowing users to explore songs that match their chosen mood, favorite tracks, and manage playlists effortlessly.

## Features

- **Mood-based song recommendations**: Select moods like Happy, Sad, Energetic, Calm to receive curated song suggestions.
- **Favorite management**: Add or remove songs from your favorites playlist.
- **Duplicate prevention**: Unique constraints ensure no duplicate favorites in the database.
- **Playlist page**: View and manage your favorite songs with ability to remove favorites.
- **Playback preview**: Listen to 30-second song previews directly within the app.
- **Spotify integration**: External links open songs on Spotify.
- **Responsive UI**: Modern, mobile-friendly design with interactive controls.

## Tech Stack

- **Backend**
  - Node.js & Express
  - PostgreSQL (via `pg` npm package)
  - RESTful API endpoints for authentication, music, playlist, mood, diary, history, analytics
- **Frontend**
  - Vanilla JavaScript ES Modules
  - HTML5/CSS3 with custom components
  - Fetch API for AJAX requests
- **Other**
  - JSON Web Tokens (JWT) for authentication
  - Environment variables for configuration (`dotenv`)
  - Cross-Origin Resource Sharing (CORS)

## Installation & Setup

### Backend

1. Clone repository:
    ```bash
    git clone https://github.com/your-username/moodmusic.git
    cd moodmusic/server
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Setup PostgreSQL database
   - Create a Postgres database and user.
   - Run the SQL schema file (`schema.sql`) in pgAdmin or via psql to create tables.

4. Configure environment:
   - Create a `.env` file in the server folder with:
     ```
     PORT=5000
     DATABASE_URL=postgresql://user:password@localhost:5432/yourdbname
     JWT_SECRET=your_jwt_secret_key
     ```

5. Start backend server:
    ```bash
    npm start
    ```

### Frontend

1. The frontend files are located in `client/`.
2. The backend serves static frontend assets from the `client` directory.
3. Access the app at `http://localhost:5000` (or your configured port).

## Usage

- **Home Page**:
  - Select a mood from the mood selector.
  - View recommended songs matching the selected mood.
  - Click the heart icon (🤍 / ❤️) to add or remove songs from favorites.

- **Playlist Page**:
  - View your saved favorite songs.
  - Click the red heart on favorite cards to remove songs from your playlist.

## API Overview

- `POST /api/playlist/add` - Add a song to favorites.
- `GET /api/playlist/list` - Get the user's favorite songs.
- `POST /api/playlist/remove` - Remove a song from favorites.
- Other APIs cover user auth, music search/recommend, moods, diary, history, and analytics.

## Project Structure

```
moodmusic/
├── client/                   # Frontend assets (HTML, JS, CSS)
│   ├── assets/js/            # JavaScript modules (main.js, playlist.js, etc.)
│   ├── components/           # UI components (navbar, footer, moodSelector)
│   ├── css/                  # Stylesheets
│   └── index.html            # Home page
├── server/                   # Backend Express app
│   ├── controllers/          # Route controllers
│   ├── models/               # DB interaction logic
│   ├── routes/               # Express route definitions
│   ├── middleware/           # Middleware (auth, error handling)
│   ├── server.js             # App entry point
│   └── config/db.js          # Postgres pool config
├── schema.sql                # SQL schema for Postgres (tables, constraints)
├── package.json              # Backend dependencies and scripts
└── README.md                 # This file
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your enhancements.

## License

Distributed under the MIT License.

## Acknowledgments

- Powered by the Spotify API for music data.
- Thanks to all contributors and open source projects used.

### Screenshots




https://github.com/user-attachments/assets/21fe73df-f9bb-4fd7-a1b5-10dc3aa545b4



