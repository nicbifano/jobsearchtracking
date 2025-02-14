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
    const statusText = document.getElementById("statusText");
    const sheetValueSpan = document.getElementById("sheetValue");
    const dataTypeSelect = document.getElementById("data");
  
    // Load saved Sheet URL on popup open
    chrome.storage.sync.get("sheetUrl", function (data) {
      if (data.sheetUrl) {
        inputField.value = data.sheetUrl; // Populate input field with saved URL
        sheetValueSpan.textContent = data.sheetUrl; // Update display
      }
    });
  
    // Save Sheet URL when the save button is clicked
    saveButton.addEventListener("click", function () {
      const sheetUrl = inputField.value.trim();
      
      if (sheetUrl) {
        chrome.storage.sync.set({ sheetUrl: sheetUrl }, function () {
          sheetValueSpan.textContent = sheetUrl;
          statusText.textContent = "Sheet URL saved!";
          setTimeout(() => (statusText.textContent = ""), 2000);
        });
      } else {
        statusText.textContent = "Please enter a valid Sheet URL!";
      }
    });
  
    // Clear Sheet URL when the clear button is clicked
    clearButton.addEventListener("click", function () {
      chrome.storage.sync.remove("sheetUrl", function () {
        sheetValueSpan.textContent = "";
        inputField.value = "";
        statusText.textContent = "Sheet URL cleared!";
        setTimeout(() => (statusText.textContent = ""), 2000);
      });
    });
  
    // Send Data to Google Sheets
    sendButton.addEventListener("click", function () {
      chrome.storage.sync.get("sheetUrl", function (data) {
        const sheetUrl = data.sheetUrl;
        if (!sheetUrl) {
          statusText.textContent = "Please save the Sheet URL first!";
          return;
        }
  
        const selectedDataType = dataTypeSelect.value;
  
        // Inject script to extract data from the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: extractPageData,
            args: [sheetUrl, selectedDataType]
          });
        });
      });
    });
  });
  
  // Function to extract page data and send to background.js
  function extractPageData(sheetUrl, selectedDataType) {
    const pageData = {
      url: window.location.href,
      title: document.title,
      dataType: selectedDataType,
      timestamp: new Date().toISOString()
    };
  
    // Send data to background script
    chrome.runtime.sendMessage({ type: "sendToSheet", sheetUrl, pageData });
  }
  