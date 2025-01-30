document.getElementById("sendData").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["content.js"]
      });
    });
  });

document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById("sheet");
  const saveButton = document.getElementById("saveData");
  const sendButton = document.getElementById("sendData");
  const statusText = document.getElementById("status");
  const sheetValueSpan = document.getElementById("sheetValue");

  // Load saved data when popup opens
  chrome.storage.sync.get("userNote", function (data) {
    if (data.userNote) {
      inputField.value = data.userNote;
      sheetValueSpan.textContent = data.userNote; // Set initial value of sheetValue span
    }
  })});