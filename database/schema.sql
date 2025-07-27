-- database/schema.sql

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS moods (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  color_theme VARCHAR(64) NOT NULL
);

INSERT INTO moods (name, color_theme) VALUES
('Happy',    '#FFD700'), -- Gold/Yellow
('Sad',      '#74b9ff'), -- Blue
('Energetic','#e17055'), -- Orange
('Calm',     '#81ecec')  -- Teal
ON CONFLICT (name) DO NOTHING;

CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  song_id VARCHAR(64) NOT NULL,
  mood VARCHAR(32),
  timestamp TIMESTAMP DEFAULT NOW(),
  CONSTRAINT unique_user_song UNIQUE (user_id, song_id)
);


CREATE TABLE IF NOT EXISTS history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  song_id VARCHAR(64) NOT NULL,
  mood VARCHAR(32),
  timestamp TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS diary_entries (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  entry_text TEXT NOT NULL,
  mood VARCHAR(32),
  date DATE
);
-- edit added in favourites table itself
-- ALTER TABLE favorites
-- ADD CONSTRAINT unique_user_song UNIQUE (user_id, song_id);
