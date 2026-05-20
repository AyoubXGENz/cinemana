# CINEMANA Google Apps Script Setup

1. Open the Google Sheet:
   `https://docs.google.com/spreadsheets/d/1b3ZW4esFw0SqFwSw0HwMbtiadsNfYVJ0QdtzWDLGEIU/edit`

2. Go to `Extensions > Apps Script`.

3. Replace the current code with the content of `google-apps-script-cinemana.gs`.

4. Click `Deploy > New deployment`.

5. Choose `Web app`.

6. Use these settings:
   - Execute as: `Me`
   - Who has access: `Anyone`

7. Copy the Web App URL and put it in `script.js` as:

```js
const GOOGLE_SHEETS_WEB_APP_URL = "YOUR_DEPLOYED_WEB_APP_URL";
```

8. The script expects these sheets:
   - `membership`
   - `reservation`

The script will create or correct the header row if the sheets are empty.
