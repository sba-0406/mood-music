// client/assets/js/analytics.js

export function renderMoodChart(containerId) {
    fetch('/api/analytics/mood', {
        headers: { 'Authorization':`Bearer ${localStorage.token}` }
    }).then(r=>r.json()).then(data=>{
        // {mood, day, count}
        // Group by mood as series.
        const moods = {};
        data.forEach(row=>{
            const day = row.day.split('T')[0];
            if (!moods[row.mood]) moods[row.mood] = {};
            moods[row.mood][day] = row.count;
        });
        const days = Array.from(new Set(data.map(r=>r.day.split('T')[0]))).sort();
        const colors = { 'Happy':'#FFD700', 'Sad':'#74b9ff', 'Energetic':'#e17055', 'Calm':'#81ecec' };
        const chart = document.getElementById(containerId);
        chart.innerHTML = '';
        // Basic chart
        days.forEach(day=>{
            const grp = document.createElement('div');
            grp.style.display='flex';grp.style.gap='6px';
            grp.style.marginBottom='2px';
            let label = document.createElement('span');
            label.style.fontSize = '0.93em';
            label.innerText = day;
            grp.appendChild(label);
            Object.entries(moods).forEach(([m,byday])=>{
                let cnt = byday[day] || 0;
                let bar = document.createElement('div');
                bar.title = m + ': ' + cnt;
                bar.style.height = '13px';
                bar.style.width = (cnt*16) + 'px';
                bar.style.background = colors[m] || '#ccc';
                bar.style.borderRadius = '7px';
                grp.appendChild(bar);
            });
            chart.appendChild(grp);
        })
    });
}
