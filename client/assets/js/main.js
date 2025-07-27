// // client/assets/js/main.js
// import { setThemeByMood } from '../../components/moodSelector.js';

// window.addEventListener('DOMContentLoaded', () => {
//     setThemeByMood('happy');
//     // Default mood for demo!
// });

// export function setMoodAndReload(mood) {
//     setThemeByMood(mood);
//     sessionStorage.setItem('selectedMood', mood);
//     fetchRecommendations(mood);
// }

// export function fetchRecommendations(mood = 'happy') {
//     const recList = document.getElementById('musicList');
//     recList.innerHTML = `<div class="center-text">Loading recommendations...</div>`;
//     fetch(`/api/music/recommend?mood=${encodeURIComponent(mood)}&limit=8`)
//     .then(res => res.json())
//     .then(({ songs }) => {
//         recList.innerHTML = '';

//         songs.forEach(song => {
//             // TODO: Replace false with actual favorite detection logic if you implement it
//             const isFav = false;

//             recList.appendChild(createMusicCard(song, {
//                 isFavorited: isFav,
//                 onFavToggle: async (song, favBtn) => {
//                     if (favBtn.classList.contains('favorited')) {
//                         // Remove favorite
//                         await fetch('/api/playlist/remove', {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json',
//                                 'Authorization': `Bearer ${localStorage.token}`
//                             },
//                             body: JSON.stringify({ song_id: song.id })
//                         });
//                     } else {
//                         // Add favorite
//                         await fetch('/api/playlist/add', {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json',
//                                 'Authorization': `Bearer ${localStorage.token}`
//                             },
//                             body: JSON.stringify({ 
//                                 song_id: song.id,
//                                 mood: sessionStorage.getItem('selectedMood') || 'happy'
//                             })
//                         });
//                     }
//                 }
//             }));
//         });
//     })
//     .catch(err => {
//         console.error('Error fetching recommendations:', err);
//         recList.innerHTML = `<div class="center-text">Failed to load recommendations.</div>`;
//     });
// }
// // export function createMusicCard(song) {
// //     const div = document.createElement('div');
// //     div.className = 'music-card fadeInUp';

// //     div.innerHTML = `
// //         <img src="${song.image}" alt="${song.name}">
// //         <div class="title">${song.name}</div>
// //         <div class="artist">${song.artist}</div>
// //         <div class="album">${song.album}</div>
// //         <div class="player-btns">
// //             ${song.preview_url ? `<button class="btn play-btn" data-url="${song.preview_url}">▶️</button>` : ''}
// //             <a href="${song.external_url}" class="external-link" target="_blank" title="Open on Spotify">Spotify</a>
// //         </div>
// //     `;
// //     if(window.isLoggedIn) { // Show add-fav
// //         const favBtn = document.createElement('button');
// //         favBtn.className = 'fav-btn';
// //         favBtn.innerHTML = '💜';
// //         favBtn.addEventListener('click', () => {
// //             fetch('/api/playlist/add', {
// //                 method: 'POST',
// //                 headers: { 'Content-Type':'application/json','Authorization': `Bearer ${localStorage.token}` },
// //                 body: JSON.stringify({
// //                     song_id: song.id,
// //                     mood: sessionStorage.getItem('selectedMood') || 'happy'
// //                 })
// //             }).then(() => {
// //                 favBtn.classList.add('favorited');
// //                 favBtn.disabled = true;
// //             });
// //         });
// //         div.querySelector('.player-btns').appendChild(favBtn);
// //     }

// //     // Preview audio
// //     if (song.preview_url) {
// //         div.querySelector('.play-btn').onclick = function() {
// //             let audio = div.audioEl;
// //             if (audio) {
// //                 if (!audio.paused) audio.pause();
// //                 else audio.play();
// //                 return;
// //             }
// //             audio = new Audio(song.preview_url);
// //             div.audioEl = audio;
// //             audio.play();
// //             this.innerText = '⏸';
// //             audio.onended = () => { this.innerText = '▶️'; }
// //             audio.onpause = () => { this.innerText = '▶️'; }
// //         }
// //     }
// //     return div;
// // }

// export function createMusicCard(song, { isFavorited = false, onFavToggle = null } = {}) {
//     const div = document.createElement('div');
//     div.className = 'music-card fadeInUp';

//     div.innerHTML = `
//         <img src="${song.image}" alt="${song.name}">
//         <div class="title">${song.name}</div>
//         <div class="artist">${song.artist}</div>
//         <div class="album">${song.album}</div>
//         <div class="player-btns">
//             ${song.preview_url ? `<button class="btn play-btn" data-url="${song.preview_url}">▶️</button>` : ''}
//             <a href="${song.external_url}" class="external-link" target="_blank" title="Open on Spotify">Spotify</a>
//         </div>
//     `;

//     if(window.isLoggedIn && onFavToggle) {
//         const favBtn = document.createElement('button');
//         favBtn.className = 'fav-btn';
//         favBtn.innerHTML = isFavorited ? '❤️' : '🤍';  // red heart if favorited, white otherwise

//         // toggle class for styling
//         if (isFavorited) favBtn.classList.add('favorited');

//         favBtn.addEventListener('click', async () => {
//             // Optionally disable button to prevent double clicks
//             favBtn.disabled = true;

//             try {
//                 await onFavToggle(song, favBtn);

//                 // Toggle UI after success
//                 if (favBtn.classList.contains('favorited')) {
//                     favBtn.classList.remove('favorited');
//                     favBtn.innerHTML = '🤍';
//                 } else {
//                     favBtn.classList.add('favorited');
//                     favBtn.innerHTML = '❤️';
//                 }
//             } catch (err) {
//                 console.error('Favorite toggle error:', err);
//                 alert('Failed to update favorite status.');
//             } finally {
//                 favBtn.disabled = false;
//             }
//         });

//         div.querySelector('.player-btns').appendChild(favBtn);
//     }

//     // Preview audio - keep your code as is...

//     return div;
// }





import { setThemeByMood } from '../../components/moodSelector.js';

window.addEventListener('DOMContentLoaded', () => {
  setThemeByMood('happy');
  // Default mood for demo!
});

// Local cache for user's favorite song IDs
const favoriteSongIDs = new Set();

async function loadFavorites() {
  if (!window.isLoggedIn) return;
  try {
    const res = await fetch('/api/playlist/list', {
      headers: { 'Authorization': `Bearer ${localStorage.token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch favorites');
    const favs = await res.json();
    favoriteSongIDs.clear();
    favs.forEach(fav => favoriteSongIDs.add(fav.song_id));
  } catch (e) {
    console.error('Error loading favorites:', e);
  }
}

export function setMoodAndReload(mood) {
  setThemeByMood(mood);
  sessionStorage.setItem('selectedMood', mood);
  fetchRecommendations(mood);
}

export async function fetchRecommendations(mood = 'happy') {
  const recList = document.getElementById('musicList');
  recList.innerHTML = `<div class="center-text">Loading recommendations...</div>`;

  await loadFavorites();

  fetch(`/api/music/recommend?mood=${encodeURIComponent(mood)}&limit=8`)
    .then(res => res.json())
    .then(({ songs }) => {
      recList.innerHTML = '';

      songs.forEach(song => {
        const isFav = favoriteSongIDs.has(song.id);

        recList.appendChild(createMusicCard(song, {
          isFavorited: isFav,
          onFavToggle: async (song, favBtn) => {
            try {
              if (favBtn.classList.contains('favorited')) {
                // Remove favorite
                const res = await fetch('/api/playlist/remove', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                  },
                  body: JSON.stringify({ song_id: song.id })
                });
                if (!res.ok) throw new Error('Failed to remove favorite');
                favoriteSongIDs.delete(song.id);
              } else {
                // Add favorite
                const res = await fetch('/api/playlist/add', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                  },
                  body: JSON.stringify({
                    song_id: song.id,
                    mood: sessionStorage.getItem('selectedMood') || 'happy'
                  })
                });
                if (!res.ok) throw new Error('Failed to add favorite');
                favoriteSongIDs.add(song.id);
              }
            } catch (err) {
              console.error('Favorite toggle error:', err);
              alert('Failed to update favorite status.');
              // Rethrow for UI button logic to reset disabled state properly
              throw err;
            }
          }
        }));
      });
    })
    .catch(err => {
      console.error('Error fetching recommendations:', err);
      recList.innerHTML = `<div class="center-text">Failed to load recommendations.</div>`;
    });
}

export function createMusicCard(song, { isFavorited = false, onFavToggle = null } = {}) {
  const div = document.createElement('div');
  div.className = 'music-card fadeInUp';

  div.innerHTML = `
    <img src="${song.image}" alt="${song.name}">
    <div class="title">${song.name}</div>
    <div class="artist">${song.artist}</div>
    <div class="album">${song.album}</div>
    <div class="player-btns">
      ${song.preview_url ? `<button class="btn play-btn" data-url="${song.preview_url}">▶️</button>` : ''}
      <a href="${song.external_url}" class="external-link" target="_blank" title="Open on Spotify">Spotify</a>
    </div>
  `;

  if (window.isLoggedIn) {
    const favBtn = document.createElement('button');
    favBtn.className = 'fav-btn';
    favBtn.innerHTML = isFavorited ? '❤️' : '🤍';  // red heart or white heart
    if (isFavorited) favBtn.classList.add('favorited');

    if (onFavToggle) {
      favBtn.addEventListener('click', async () => {
        favBtn.disabled = true;
        try {
          await onFavToggle(song, favBtn);

          // Toggle UI after success
          if (favBtn.classList.contains('favorited')) {
            favBtn.classList.remove('favorited');
            favBtn.innerHTML = '🤍';
          } else {
            favBtn.classList.add('favorited');
            favBtn.innerHTML = '❤️';
          }
        } catch (err) {
          // error handled above, just re-enable button
        } finally {
          favBtn.disabled = false;
        }
      });
    }
    div.querySelector('.player-btns').appendChild(favBtn);
  }

  if (song.preview_url) {
    div.querySelector('.play-btn').onclick = function() {
      let audio = div.audioEl;
      if (audio) {
        if (!audio.paused) audio.pause();
        else audio.play();
        return;
      }
      audio = new Audio(song.preview_url);
      div.audioEl = audio;
      audio.play();
      this.innerText = '⏸';
      audio.onended = () => { this.innerText = '▶️'; }
      audio.onpause = () => { this.innerText = '▶️'; }
    };
  }

  return div;
}
