chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed");
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "sendToSheet") {
      const sheetUrl = "<YOUR_GOOGLE_SHEETS_WEB_APP_URL>"; // Replace with your web app URL
      fetch(sheetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          url: message.url,
          title: message.title
        })
      })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error));
    }
  });