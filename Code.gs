
function doPost(e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
    if (!sheet) {
      return ContentService.createTextOutput("Error: 'Data' sheet not found")
        .setMimeType(ContentService.MimeType.TEXT);
    }
  
    const data = JSON.parse(e.postData.contents);
    sheet.appendRow([data.timestamp, data.url, data.title, data.note || ""]); 
  
    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  }