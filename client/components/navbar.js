// client/components/navbar.js

export function renderNavbar(active) {
    let user = !!localStorage.token;
    let html = `
        <header class="navbar">
            <a href="index.html" class="logo">💜 MoodMusic</a>
            <nav>
                <a href="index.html" class="${active=='home'?'active':''}">Home</a>
                <a href="playlist.html" style="${user?'':'display:none'}" class="${active=='playlist'?'active':''}">Playlist</a>
                <a href="diary.html" style="${user?'':'display:none'}" class="${active=='diary'?'active':''}">Diary</a>
                <a href="history.html" style="${user?'':'display:none'}" class="${active=='history'?'active':''}">History</a>
                <a href="about.html" class="${active=='about'?'active':''}">About</a>
                <a href="login.html" style="${user?'display:none':''}" class="${active=='login'?'active':''}">Login</a>
                <a href="signup.html" style="${user?'display:none':''}" class="${active=='signup'?'active':''}">Signup</a>
                <a href="#" id="logoutBtn" style="${user?'':'display:none'}">Logout</a>
                <label class="switch">
                  <input id="darkToggle" type="checkbox">
                  <span class="slider"></span>
                </label>
            </nav>
        </header>
        <style>
        .navbar {
            display: flex; align-items: center; justify-content: space-between;
            background: linear-gradient(90deg, #e8eafd 60%, #d1c9ee 100%);
            box-shadow: 0 2px 16px #baaada19;
            padding: 0.67em 1.89em;
            border-bottom-left-radius: 35px 25px;
            border-bottom-right-radius: 25px 30px;
        }
        .navbar .logo {
            font-family: 'Montserrat', Arial, sans-serif;
            font-weight: 900; font-size: 1.33em; letter-spacing: 2px; color: #8561c9;
        }
        .navbar nav { display: flex; gap: 1.02rem; align-items: center;}
        .navbar nav a {
            color: #816cdf; font-weight: 600; padding: .5em 0.86em; border-radius: 8px;
            text-decoration: none; font-size: 1.01em; transition:.19s;
        }
        .navbar nav a.active, .navbar nav a:hover { background: #cfc3ec39; }
        .switch { position:relative; display:inline-block; width:44px; height:23px; }
        .switch input {opacity:0;width:0;height:0;}
        .slider {position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:#cab3e7;transition:.4s;border-radius:23px;}
        .slider:before{position:absolute;content:"";height:17px;width:17px;left:4px;bottom:3px;background:#fff;transition:.4s;border-radius:50%;}
        input:checked + .slider {background:#7154ad;}
        input:checked + .slider:before {transform:translateX(19px);}
        </style>
    `;
    document.body.insertAdjacentHTML('afterbegin', html);

    // Logout
    document.getElementById('logoutBtn')?.addEventListener('click', (e)=>{
        e.preventDefault(); localStorage.clear(); window.location = 'index.html';
    });

    // Dark mode
    let d = document.getElementById('darkToggle');
    d.checked = document.body.classList.contains('dark-mode');
    d.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode', d.checked);
        localStorage.setItem('dark-mode', d.checked ? '1':'');
    });
    if(localStorage.getItem('dark-mode')==='1') { d.checked=true; document.body.classList.add('dark-mode'); }
}
