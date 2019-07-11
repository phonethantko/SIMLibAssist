// Local Shared Objects

let option_AutoRedirect;
let option_EnableSIM;

function parseLocalStorage() {
  option_AutoRedirect = JSON.parse(localStorage.autoRedirect || true);
  option_EnableSIM = JSON.parse(localStorage.enableSIM || true);
}
