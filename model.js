import { authorize } from './auth.js'
import { google } from 'googleapis'

export async function readSpreadsheet(spreadsheetId, range) {
  const auth = await authorize()
  const service = google.sheets({version: 'v4', auth});

  const result = await service.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return result.data.values
}