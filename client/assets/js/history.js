// client/assets/js/history.js
import { createMusicCard } from './main.js';

export async function fetchHistory() {
  try {
    const list = document.getElementById('historyList');
    if (!list) {
      console.error('historyList element not found');
      return;
    }

    list.innerHTML = '<div>Loading...</div>';

    const res = await fetch('/api/history/list', {
      headers: { 'Authorization': `Bearer ${localStorage.token}` }
    });
    if (!res.ok) {
      list.innerHTML = '<div>Failed to load history.</div>';
      return;
    }

    const hist = await res.json();
    list.innerHTML = '';

    for (const h of hist) {
      const resp = await fetch(`/api/music/track/${h.song_id}`);
      if (!resp.ok) {
        console.warn(`Failed to fetch track info for song_id ${h.song_id}`);
        continue;
      }
      const song = await resp.json();
      const card = createMusicCard(song);
      list.appendChild(card);
    }

    if (hist.length === 0) {
      list.innerHTML = '<div>No recently played songs.</div>';
    }
  } catch (err) {
    console.error('Error fetching history:', err);
  }
}
