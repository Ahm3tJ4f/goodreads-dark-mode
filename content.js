const setDark = (enabled) => {
  document.body.setAttribute("data-gr-dark", enabled ? "active" : "");
};

chrome.storage.sync.get("enabled", ({ enabled }) => {
  setDark(enabled);
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
