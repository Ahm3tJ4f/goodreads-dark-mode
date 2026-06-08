const toggle = document.getElementById("toggle");
const status = document.getElementById("status");

const update = (enabled) => {
  status.textContent = enabled ? "Enabled" : "Disabled";
};

chrome.storage.sync.get("enabled", ({ enabled }) => {
  toggle.checked = !!enabled;
  update(!!enabled);
});

toggle.addEventListener("change", () => {
  const enabled = toggle.checked;

  chrome.storage.sync.set({ enabled });
  update(enabled);

  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.sendMessage(tab.id, { action: "toggle", enabled });
  });
});
