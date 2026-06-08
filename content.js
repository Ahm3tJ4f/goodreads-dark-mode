const setDark = (enabled) => {
  document.documentElement.setAttribute("data-gr-dark", enabled ? "active" : "");
};

setDark(true);

chrome.storage.sync.get("enabled", ({ enabled }) => {
  setDark(enabled !== false);
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "toggle") {
    setDark(msg.enabled);
  }
});

const swapLogo = () => {
  const logo = document.querySelector(".siteHeader__logo");
  if (logo) {
    logo.style.backgroundImage = `url(${chrome.runtime.getURL("images/goodreads-logo.svg")})`;
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", swapLogo);
} else {
  swapLogo();
}
