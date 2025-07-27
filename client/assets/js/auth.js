// client/assets/js/auth.js

export function isLoggedIn() {
    return !!localStorage.token;
}
window.isLoggedIn = isLoggedIn();
