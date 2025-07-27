// // client/assets/js/diary.js

// function renderEntry(entry) {
//     return `
//       <div class="diary-entry fadeInUp" data-id="${entry.id}">
//         <div class="entry-date">${new Date(entry.date).toLocaleDateString()} | <b>${entry.mood || 'Unknown'}</b></div>
//         <textarea disabled>${entry.entry_text}</textarea>
//         <div class="entry-actions">
//             <button class="btn edit-btn">Edit</button>
//             <button class="btn del-btn" style="background:#ea5b65;">Delete</button>
//             <button class="btn share-btn">Share</button>
//         </div>
//       </div>
//     `;
// }

// function fetchEntries() {
//     document.getElementById('entryList').innerHTML = 'Loading...';
//     fetch('/api/diary/list', {
//         headers: { 'Authorization': `Bearer ${localStorage.token}` }
//     }).then(r=>r.json())
//     .then(entries => {
//         document.getElementById('entryList').innerHTML = entries.map(renderEntry).join('');
//         document.querySelectorAll('.edit-btn').forEach(btn => {
//             btn.onclick = function() {
//                 const parent = btn.closest('.diary-entry');
//                 const textarea = parent.querySelector('textarea');
//                 if (btn.innerText === 'Edit') {
//                     textarea.disabled = false;
//                     btn.innerText = 'Save';
//                 } else {
//                     fetch('/api/diary/update', {
//                         method:'POST',
//                         headers: { 'Content-Type':'application/json','Authorization': `Bearer ${localStorage.token}` },
//                         body: JSON.stringify({
//                             id: parent.dataset.id,
//                             entry_text: textarea.value,
//                             mood: (parent.querySelector('.entry-date').innerText.split('|')[1] || '').trim()
//                         })
//                     }).then(()=>{ textarea.disabled=true; btn.innerText='Edit'; });
//                 }
//             }
//         });
//         document.querySelectorAll('.del-btn').forEach(btn => {
//             btn.onclick = function() {
//                 const parent = btn.closest('.diary-entry');
//                 if(confirm('Delete this entry?')) {
//                     fetch('/api/diary/remove', {
//                         method: 'POST',
//                         headers: { 'Content-Type':'application/json','Authorization': `Bearer ${localStorage.token}` },
//                         body: JSON.stringify({ id: parent.dataset.id })
//                     }).then(fetchEntries);
//                 }
//             }
//         });
//         document.querySelectorAll('.share-btn').forEach(btn=>{
//             btn.onclick = function() {
//                 const parent = btn.closest('.diary-entry');
//                 const text = parent.querySelector('textarea').value;
//                 const email = prompt('Send to email (leave blank to export as .txt):');
//                 if(email) {
//                     fetch('/api/email/share', {
//                         method:'POST',
//                         headers: { 'Content-Type':'application/json','Authorization': `Bearer ${localStorage.token}` },
//                         body: JSON.stringify({ email, text })
//                     }).then(()=>alert('Sent!'));
//                 } else {
//                     // Download as txt
//                     const el = document.createElement('a');
//                     el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
//                     el.setAttribute('download', 'mood_diary.txt');
//                     el.click();
//                 }
//             }
//         });
//     });
// }

// document.getElementById('addEntryBtn').onclick = function() {
//     const txt = document.getElementById('entryText').value;
//     const mood = document.getElementById('entryMood').value;
//     fetch('/api/diary/add', {
//         method:'POST',
//         headers: { 'Content-Type':'application/json','Authorization': `Bearer ${localStorage.token}` },
//         body: JSON.stringify({ entry_text: txt, mood })
//     }).then(()=>{ document.getElementById('entryText').value = ''; fetchEntries(); });
// };

// fetchEntries();


// Exported so diary.html script can call these after DOM is ready

export function renderEntry(entry) {
  return `
    <div class="diary-entry fadeInUp" data-id="${entry.id}">
      <div class="entry-date">${new Date(entry.date).toLocaleDateString()} | <b>${entry.mood || 'Unknown'}</b></div>
      <textarea disabled>${entry.entry_text}</textarea>
      <div class="entry-actions">
        <button class="btn edit-btn">Edit</button>
        <button class="btn del-btn" style="background:#ea5b65;">Delete</button>
        <button class="btn share-btn">Share</button>
      </div>
    </div>
  `;
}

export function fetchEntries() {
  const entryList = document.getElementById('entryList');
  if (!entryList) {
    console.error('entryList element not found');
    return;
  }

  entryList.innerHTML = 'Loading...';

  fetch('/api/diary/list', {
    headers: { 'Authorization': `Bearer ${localStorage.token}` }
  })
    .then(res => res.json())
    .then(entries => {
      entryList.innerHTML = entries.map(renderEntry).join('');

      // Attach listeners to Edit buttons
      document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.onclick = function() {
          const parent = btn.closest('.diary-entry');
          const textarea = parent.querySelector('textarea');
          if (btn.innerText === 'Edit') {
            textarea.disabled = false;
            btn.innerText = 'Save';
          } else {
            fetch('/api/diary/update', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
              },
              body: JSON.stringify({
                id: parent.dataset.id,
                entry_text: textarea.value,
                mood: (parent.querySelector('.entry-date').innerText.split('|')[1] || '').trim()
              })
            }).then(() => {
              textarea.disabled = true;
              btn.innerText = 'Edit';
            });
          }
        };
      });

      // Attach listeners to Delete buttons
      document.querySelectorAll('.del-btn').forEach(btn => {
        btn.onclick = function() {
          const parent = btn.closest('.diary-entry');
          if (confirm('Delete this entry?')) {
            fetch('/api/diary/remove', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
              },
              body: JSON.stringify({ id: parent.dataset.id })
            }).then(fetchEntries);
          }
        };
      });

      // Attach listeners to Share buttons
      document.querySelectorAll('.share-btn').forEach(btn => {
        btn.onclick = function() {
          const parent = btn.closest('.diary-entry');
          const text = parent.querySelector('textarea').value;
          const email = prompt('Send to email (leave blank to export as .txt):');
          if (email) {
            fetch('/api/email/share', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
              },
              body: JSON.stringify({ email, text })
            }).then(() => alert('Sent!'));
          } else {
            const el = document.createElement('a');
            el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            el.setAttribute('download', 'mood_diary.txt');
            document.body.appendChild(el);
            el.click();
            el.remove();
          }
        };
      });
    })
    .catch(err => {
      console.error('Failed to fetch entries:', err);
      entryList.innerHTML = 'Failed to load entries.';
    });
}

export function setupAddEntryHandler() {
  const addEntryBtn = document.getElementById('addEntryBtn');
  if (!addEntryBtn) {
    console.error('addEntryBtn element not found');
    return;
  }

  addEntryBtn.onclick = function() {
    const txt = document.getElementById('entryText').value;
    const mood = document.getElementById('entryMood').value;

    fetch('/api/diary/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({ entry_text: txt, mood })
    })
      .then(() => {
        document.getElementById('entryText').value = '';
        fetchEntries();
      })
      .catch(err => {
        console.error('Failed to add entry:', err);
        alert('Failed to add entry, please try again.');
      });
  };
}
