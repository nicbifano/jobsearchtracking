chrome.runtime.sendMessage({
    type: "sendToSheet",
    url: window.location.href,
    title: document.title
  });