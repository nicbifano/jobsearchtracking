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
  const saveButton = document.getElementById("saveSheet");
  const clearButton = document.getElementById("clearSheet");
  const sendButton = document.getElementById("sendData");
  const statusText = document.getElementById("status");
  const sheetValueSpan = document.getElementById("sheetValue");

  // Add save button click handler
  saveButton.addEventListener("click", function() {
    const inputValue = inputField.value;
    
    // Save to chrome storage
    chrome.storage.sync.set({ userNote: inputValue }, function() {
      // Update span text
      sheetValueSpan.textContent = inputValue;
      
      // Show success message
      statusText.textContent = "Sheet data saved!";
      setTimeout(() => {
        statusText.textContent = "";
      }, 2000);
    });
  });

  clearButton.addEventListener("click", function() {
    // Clear chrome storage
    chrome.storage.sync.remove("userNote", function() {
      // Clear span text
      sheetValueSpan.textContent = "";
      
      // Show success message
      statusText.textContent = "Sheet data cleared!";
      setTimeout(() => {
        statusText.textContent = "";
      }, 2000);
    });
  })

});

