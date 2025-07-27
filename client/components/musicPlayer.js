// client/components/musicPlayer.js

export function renderMusicPlayer(song) {
    if (!song.preview_url) return '';
    return `
      <audio controls src="${song.preview_url}" style="width:90%"></audio>
    `;
}
