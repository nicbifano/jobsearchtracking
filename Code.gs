// Code.gs
const SHEET_NAME = 'Data';

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) return out({ ok: false, error: `Missing sheet "${SHEET_NAME}"` });

    const body = JSON.parse(e.postData?.contents || '{}');

    // --- LinkedIn connection mode ---
    const isConnection =
      body?.dataType === 'linkedin_connection' ||
      Array.isArray(body?.rows) ||
      (body?.date || body?.contact || body?.url);

    if (isConnection) {
      const rows = Array.isArray(body.rows) ? body.rows : [body];
      const existing = loadExistingUrlSet_(sheet); // from column D now
      let inserted = 0;

      rows.forEach((r) => {
        const date = String(r.date || r.timestamp || '').trim();    
        const contact = String(r.contact || r.title || '').trim(); 
        const url = normalizeUrl_(String(r.url || ''));             
        if (!url) return;

        if (!existing.has(url)) {
          const firstEmptyRow = findFirstEmptyRow_(sheet);
          // A=date, B=contact, C=blank, D=url
          sheet.getRange(firstEmptyRow, 1, 1, 4).setValues([[date, contact, '', url]]);
          existing.add(url);
          inserted++;
        }
      });

      return out({ ok: true, mode: 'linkedin_connection', inserted });
    }

    // --- Legacy mode (your original plugin) ---
    const data = body;
    const firstEmptyRow = findFirstEmptyRow_(sheet);
    sheet.getRange(firstEmptyRow, 1, 1, 5).setValues([
      [data.timestamp, data.dataType, '', data.title, data.url]
    ]);
    return out({ ok: true, mode: 'legacy', inserted: 1 });

  } catch (err) {
    return out({ ok: false, error: String(err) });
  }
}

// ---- Helpers ----
function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS'
    });
}

function doOptions() {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS'
    });
}

function loadExistingUrlSet_(sheet) {
  const lastRow = sheet.getLastRow();
  const set = new Set();
  if (lastRow > 0) {
    // Column D now
    const urls = sheet.getRange(1, 4, lastRow, 1).getValues().flat();
    urls.forEach((u) => {
      const n = normalizeUrl_(u);
      if (n) set.add(n);
    });
  }
  return set;
}

function findFirstEmptyRow_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow === 0) return 1;
  for (let i = 1; i <= lastRow; i++) {
    const rowValues = sheet.getRange(i, 1, 1, sheet.getLastColumn()).getValues()[0];
    if (rowValues.every((v) => v === '')) return i;
  }
  return lastRow + 1;
}

function normalizeUrl_(u) {
  try {
    const url = new URL(u);
    if (!/linkedin\.com$/i.test(url.hostname) && !/linkedin\.com$/i.test(url.host)) return '';
    url.hash = '';
    url.search = '';
    url.protocol = 'https:';
    return (`${url.origin}${url.pathname}`).replace(/\/+$/, '');
  } catch (_) {
    return '';
  }
}
