// client/components/moodSelector.js

const moodThemes = {
    happy:    'mood-happy',
    sad:      'mood-sad',
    energetic:'mood-energetic',
    calm:     'mood-calm'
};

const moodEmojis = { happy:'😊', sad:'😢', energetic:'⚡', calm:'🧘' };

export function setThemeByMood(mood) {
    Object.values(moodThemes).forEach(cls=>{
        document.body.classList.remove(cls);
    });
    document.body.classList.add(moodThemes[mood]);
}

export function renderMoodSelector(selected = 'happy', onSelect) {
    let moods = Object.keys(moodThemes);
    let html = moods.map(mood => `
        <button class="mood-btn ${selected==mood?'selected':''}" data-mood="${mood}" title="${mood}">
            ${moodEmojis[mood]}<br>${mood.charAt(0).toUpperCase()+mood.slice(1)}
        </button>
    `).join('');
    document.getElementById('moodSelector').innerHTML = html;
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.mood-btn').forEach(b=>b.classList.remove('selected'));
            btn.classList.add('selected');
            setThemeByMood(btn.dataset.mood);
            onSelect(btn.dataset.mood);
        };
    });
}
