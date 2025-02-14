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
      inputField.value = data.sheetUrl; // Populate input field
      sheetValueSpan.textContent = data.sheetUrl; // Display saved URL
    }
  });

  // Save Sheet URL when button is clicked
  saveButton.addEventListener("click", function () {
    const sheetUrl = inputField.value.trim();
  
    if (sheetUrl.startsWith("https://script.google.com/macros/s/")) {
      chrome.storage.sync.set({ sheetUrl: sheetUrl }, function () {
        sheetValueSpan.textContent = sheetUrl;
        statusText.textContent = "Sheet URL saved!";
        setTimeout(() => (statusText.textContent = ""), 2000);
      });
    } else {
      statusText.textContent = "Invalid Google Apps Script Web App URL!";
    }
  });

  // Clear Sheet URL when button is clicked
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

      // Get active tab and extract page data
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: extractPageData,
        }, (results) => {
          if (chrome.runtime.lastError || !results || !results[0].result) {
            statusText.textContent = "Failed to retrieve page data.";
            return;
          }

          const pageData = results[0].result;
          pageData.dataType = selectedDataType; // Add selected data type
          console.log("Page Data:", pageData); // Output all data in pageData to the console
          // Send data to Google Apps Script Web App
          fetch(sheetUrl, {
            method: "POST",
            mode: "no-cors", // Avoids CORS issues
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(pageData)
          })
          .then(response => response.text())
          .then(data => {
            statusText.textContent = "Data sent successfully!";
            setTimeout(() => (statusText.textContent = ""), 2000);
          })
          .catch(error => {
            statusText.textContent = "Error sending data";
            console.error("Error:", error);
          });
        });
      });
    });
  });
});

// Extracts page data from the active tab
function extractPageData() {
  return {
    url: window.location.href,
    title: document.title,
    timestamp: new Date().toLocaleDateString()
  };
}
