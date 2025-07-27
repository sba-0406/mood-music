// client/components/footer.js
export function renderFooter() {
    let html = `<footer class="footer" style="text-align:center;
      background:linear-gradient(90deg, #ede1ff 60%, #bfaacc 95%);
      color:#9e85c5;margin-top:2rem;padding:.8em 0 1.2em 0;font-size:1.04em;box-shadow:0 -2px 18px #afa3df33;">
        <span>&copy; 2025 MoodMusic &mdash; For Emotions in Tunes</span>
      </footer>`;
    document.body.insertAdjacentHTML('beforeend', html);
}
