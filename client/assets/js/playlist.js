// // // client/assets/js/playlist.js

// // import { createMusicCard } from './main.js';

// // function fetchFavorites() {
// //     fetch('/api/playlist/list', {
// //         headers: { 'Authorization': `Bearer ${localStorage.token}` }
// //     }).then(r=>r.json())
// //     .then(async favs => {
// //         const list = document.getElementById('favoritesList');
// //         list.innerHTML = '<div>Loading...</div>';
// //         list.innerHTML = '';
// //         for(let f of favs) {
// //             const resp = await fetch(`/api/music/track/${f.song_id}`);
// //             const song = await resp.json();
// //             const card = createMusicCard(song);
// //             card.querySelector('.fav-btn')?.classList.add('favorited');
// //             card.querySelector('.fav-btn')?.setAttribute('disabled', true);
// //             list.appendChild(card);
// //         }
// //     });
// // }

// // window.onload = fetchFavorites;


// // client/assets/js/playlist.js
// // import { createMusicCard } from './main.js';

// // export async function fetchFavorites() {
// //     const list = document.getElementById('favoritesList');
// //     if (!list) {
// //         console.error('favoritesList element not found');
// //         return;
// //     }

// //     // Show loading message initially
// //     list.innerHTML = '<div>Loading...</div>';

// //     try {
// //         // Fetch list of favorite song IDs from backend API
// //         const res = await fetch('/api/playlist/list', {
// //             headers: { 'Authorization': `Bearer ${localStorage.token}` }
// //         });

// //         if (!res.ok) {
// //             console.error('Failed to fetch favorites, status:', res.status);
// //             list.innerHTML = '<div>Failed to load favorites.</div>';
// //             return;
// //         }

// //         const favs = await res.json();

// //         // Clear loading message before rendering
// //         list.innerHTML = '';

// //         for (const f of favs) {
// //             // For each favorite, fetch detailed song info
// //             const resp = await fetch(`/api/music/track/${f.song_id}`);
// //             if (!resp.ok) {
// //                 console.warn(`Failed to fetch track details for song_id: ${f.song_id}`);
// //                 continue; // skip to next favorite
// //             }
// //             const song = await resp.json();

// //             // Create music card element
// //             /*const card = createMusicCard(song);

// //             // Mark as favorited & disable the favorite button
// //             card.querySelector('.fav-btn')?.classList.add('favorited');
// //             card.querySelector('.fav-btn')?.setAttribute('disabled', true);

// //             // Append card to favorites list container
// //             list.appendChild(card);*/

// //             const card = createMusicCard(song, {
// //             isFavorited: true,
// //             onFavToggle: async (song, favBtn) => {
// //                 const res = await fetch('/api/playlist/remove', {...});
// //                 if (!res.ok) throw new Error('Failed to remove favorite');
// //                 card.remove(); // Remove from DOM on success
// //             }
// //             });
// //             list.appendChild(card);
// //         }

// //         // If no favorites, show friendly message
// //         if (favs.length === 0) {
// //             list.innerHTML = '<div>No favorites found yet.</div>';
// //         }

// //     } catch (err) {
// //         console.error('Error fetching favorites:', err);
// //         list.innerHTML = '<div>Error loading favorites.</div>';
// //     }
// // }

// // // Optional: you can still call this on window load or from playlist.html explicitly
// // //window.onload = fetchFavorites;


// import { createMusicCard } from './main.js';

// export async function fetchFavorites() {
//     const list = document.getElementById('favoritesList');
//     if (!list) {
//         console.error('favoritesList element not found');
//         return;
//     }

//     // Show loading message initially
//     list.innerHTML = '<div>Loading...</div>';

//     try {
//         // Fetch list of favorite song IDs from backend API
//         const res = await fetch('/api/playlist/list', {
//             headers: { 'Authorization': `Bearer ${localStorage.token}` }
//         });

//         if (!res.ok) {
//             console.error('Failed to fetch favorites, status:', res.status);
//             list.innerHTML = '<div>Failed to load favorites.</div>';
//             return;
//         }

//         const favs = await res.json();

//         // Clear loading message before rendering
//         list.innerHTML = '';

//         for (const f of favs) {
//             // For each favorite, fetch detailed song info
//             const resp = await fetch(`/api/music/track/${f.song_id}`);
//             if (!resp.ok) {
//                 console.warn(`Failed to fetch track details for song_id: ${f.song_id}`);
//                 continue; // skip to next favorite
//             }
//             const song = await resp.json();

//             // Create music card element with remove favorite functionality
//             const card = createMusicCard(song, {
//                 isFavorited: true,
//                 onFavToggle: async (song, favBtn) => {
//                     const res = await fetch('/api/playlist/remove', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'Authorization': `Bearer ${localStorage.token}`
//                         },
//                         body: JSON.stringify({ song_id: song.id })
//                     });
//                     if (!res.ok) throw new Error('Failed to remove favorite');
//                     card.remove(); // Remove from DOM on success
//                 }
//             });
//             list.appendChild(card);
//         }

//         // If no favorites, show friendly message
//         if (favs.length === 0) {
//             list.innerHTML = '<div>No favorites found yet.</div>';
//         }

//     } catch (err) {
//         console.error('Error fetching favorites:', err);
//         list.innerHTML = '<div>Error loading favorites.</div>';
//     }
// }

// // Optional: you can still call this on window load or from playlist.html explicitly
// // window.onload = fetchFavorites;



import { createMusicCard } from './main.js';

export async function fetchFavorites() {
  const list = document.getElementById('favoritesList');
  if (!list) {
    console.error('favoritesList element not found');
    return;
  }

  list.innerHTML = '<div>Loading...</div>';

  try {
    const res = await fetch('/api/playlist/list', {
      headers: { 'Authorization': `Bearer ${localStorage.token}` }
    });

    if (!res.ok) {
      console.error('Failed to fetch favorites, status:', res.status);
      list.innerHTML = '<div>Failed to load favorites.</div>';
      return;
    }

    const favs = await res.json();
    list.innerHTML = '';

    for (const f of favs) {
      const resp = await fetch(`/api/music/track/${f.song_id}`);
      if (!resp.ok) {
        console.warn(`Failed to fetch track details for song_id: ${f.song_id}`);
        continue;
      }
      const song = await resp.json();

      const card = createMusicCard(song, {
        isFavorited: true,
        onFavToggle: async (song, favBtn) => {
          const res = await fetch('/api/playlist/remove', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({ song_id: song.id })
          });
          if (!res.ok) throw new Error('Failed to remove favorite');
          card.remove();
        }
      });

      list.appendChild(card);
    }

    if (favs.length === 0) {
      list.innerHTML = '<div>No favorites found yet.</div>';
    }

  } catch (err) {
    console.error('Error fetching favorites:', err);
    list.innerHTML = '<div>Error loading favorites.</div>';
  }
}
