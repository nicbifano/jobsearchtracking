chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed");
  });
  
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "sendToSheet") {
    const sheetUrl = "https://script.google.com/u/0/home/projects/1b6DyXjIahXP1bxLUSknTrRkEqo1aV-J7W36doYxuL3eM3z4P16-VxxOo/Code.gs"; // Replace with your web app URL
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