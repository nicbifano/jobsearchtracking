function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
  if (!sheet) {
    return ContentService.createTextOutput("Error: 'Data' sheet not found")
      .setMimeType(ContentService.MimeType.TEXT);
  }

  const data = JSON.parse(e.postData.contents);
  
  // Find the first empty row
  let lastRow = sheet.getLastRow();
  let firstEmptyRow = lastRow + 1;
  
  for (let i = 1; i <= lastRow; i++) {
    let rowValues = sheet.getRange(i, 1, 1, sheet.getLastColumn()).getValues()[0];
    if (rowValues.every(value => value === "")) { // Check if row is completely empty
      firstEmptyRow = i;
      break;
    }
  }

  // Append the data in the first empty row
  sheet.getRange(firstEmptyRow, 1, 1, 4).setValues([
    [data.timestamp, data.dataType, "", data.title + " - " + data.url]
  ]);

  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}
