// server/src/services/spotifyService.js
const axios = require('axios');
require('dotenv').config();

let spotifyToken = null;
let tokenExpiry = 0;

async function getSpotifyToken() {
  // Reuse token if not expired
  if (spotifyToken && Date.now() < tokenExpiry) return spotifyToken;
  const resp = await axios.post('https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' +
          Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
      }
    }
  );
  spotifyToken = resp.data.access_token;
  tokenExpiry = Date.now() + (resp.data.expires_in - 60) * 1000;
  return spotifyToken;
}

// Map moods to Spotify search queries ("Happy" => "happy", etc)
const moodQuery = {
  happy:    'pop party happy upbeat dance',
  sad:      'sad acoustic chill melancholy',
  energetic:'energetic workout power fast',
  calm:     'calm relax chill ambient',
};

async function getMoodRecommendations(mood, limit=10) {
  const q = moodQuery[mood.toLowerCase()] || 'pop';
  const token = await getSpotifyToken();
  const resp = await axios.get(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&limit=${limit}`,
    { headers: { Authorization: 'Bearer ' + token } }
  );
  return resp.data.tracks.items.map(track => ({
    id: track.id,
    name: track.name,
    artist: track.artists.map(a=>a.name).join(', '),
    album: track.album.name,
    image: track.album.images[0]?.url,
    preview_url: track.preview_url,
    external_url: track.external_urls.spotify
  }));
}

async function getTrackInfo(trackId) {
  const token = await getSpotifyToken();
  const resp = await axios.get(
    `https://api.spotify.com/v1/tracks/${trackId}`,
    { headers: { Authorization: 'Bearer ' + token } }
  );
  const track = resp.data;
  return {
    id: track.id,
    name: track.name,
    artist: track.artists.map(a=>a.name).join(', '),
    album: track.album.name,
    image: track.album.images[0]?.url,
    preview_url: track.preview_url,
    external_url: track.external_urls.spotify
  };
}

module.exports = { getMoodRecommendations, getTrackInfo };
