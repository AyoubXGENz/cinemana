# CINEMANA Google Apps Script Setup

1. Open the Google Sheet:
   `https://docs.google.com/spreadsheets/d/1b3ZW4esFw0SqFwSw0HwMbtiadsNfYVJ0QdtzWDLGEIU/edit`

2. Go to `Extensions > Apps Script`.

3. Replace the current code with the content of `google-apps-script-cinemana.gs`.

4. Add your Telegram bot settings near the top of the script:

```js
const TELEGRAM_BOT_TOKEN = "YOUR_REAL_TELEGRAM_BOT_TOKEN";
const TELEGRAM_CHAT_ID = "YOUR_REAL_TELEGRAM_CHAT_ID";
```

To create/get them:
- In Telegram, open `@BotFather`, create a bot, and copy the bot token.
- Send one message to your new bot.
- Open `https://api.telegram.org/botYOUR_REAL_TELEGRAM_BOT_TOKEN/getUpdates` in the browser.
- Copy your chat id from the JSON response and put it in `TELEGRAM_CHAT_ID`.

5. Click `Deploy > New deployment`.

6. Choose `Web app`.

7. Use these settings:
   - Execute as: `Me`
   - Who has access: `Anyone`

8. Copy the Web App URL and put it in `script.js` as:

```js
const GOOGLE_SHEETS_WEB_APP_URL = "YOUR_DEPLOYED_WEB_APP_URL";
```

9. The Telegram buttons now use direct Web App links, so they work even without a webhook. If you also want old callback-style Telegram messages to keep working, register the webhook with your deployed Web App URL:

```text
https://api.telegram.org/botYOUR_REAL_TELEGRAM_BOT_TOKEN/setWebhook?url=YOUR_DEPLOYED_WEB_APP_URL
```

10. The script expects these sheets:
   - `membership`
   - `reservation`

The script will create or correct the header row if the sheets are empty.

Public reservations are now saved as `pending` in the `Statu` column. Telegram sends you two buttons:
- `Confirmer`: changes `Statu` to `confirmed`, marks it green, reserves the seat, and sends the ticket e-mail with QR code.
- `Annuler`: changes `Statu` to `annulé`, marks it red, and releases the seat on the website.

The script also adds a `Code membre` column to `reservation`. This column is used internally to block a member from reserving more than one active seat with the same member code.

Important: after changing Apps Script code, always use `Deploy > Manage deployments > Edit > New version > Deploy`. If Telegram buttons were sent before this update, generate a new test reservation so the notification contains the new direct-link buttons.
