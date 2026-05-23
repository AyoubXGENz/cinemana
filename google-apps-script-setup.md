# CINEMANA Google Apps Script Setup

1. Open the Google Sheet:
   `https://docs.google.com/spreadsheets/d/1b3ZW4esFw0SqFwSw0HwMbtiadsNfYVJ0QdtzWDLGEIU/edit`

2. Go to `Extensions > Apps Script`.

3. Replace the current code with the content of `google-apps-script-cinemana.gs`.

3.1. After pasting the code, run `fixCinemanaSheetColumns` once from the Apps Script editor:
   - Click Save or press `Ctrl + S`.
   - Refresh the Apps Script page if the function does not appear in the dropdown.
   - In the function dropdown, choose `fixCinemanaSheetColumns`.
   - Click `Run`.
   - Accept the Google permissions.

This immediately adds the missing columns to `membership` and `reservation`, even if the sheets already contain old test rows.

4. Add your Telegram bot settings as private Apps Script properties, not inside the public website files.

   Reservation notifications use the reservation bot:

   - In Apps Script, open `Project Settings`.
   - Under `Script Properties`, add `TELEGRAM_BOT_TOKEN`.
   - Add `TELEGRAM_CHAT_ID`.
   - Paste the real reservation bot token and chat id there.

   Membership-card requests use the separate membership bot:

   - Add `MEMBERSHIP_TELEGRAM_BOT_TOKEN`.
   - Add `MEMBERSHIP_TELEGRAM_CHAT_ID`.
   - Paste the real membership bot token and chat id there.

To create/get them:
- In Telegram, open `@BotFather`, create a bot, and copy the bot token.
- Send one message to the bot.
- Open `https://api.telegram.org/botYOUR_REAL_TELEGRAM_BOT_TOKEN/getUpdates` in the browser.
- Copy your chat id from the JSON response and put it in the matching chat id script property.

5. Click `Deploy > New deployment`.

6. Choose `Web app`.

7. Use these settings:
   - Execute as: `Me`
   - Who has access: `Anyone`

8. Copy the Web App URL and put it in `script.js` as:

```js
const GOOGLE_SHEETS_WEB_APP_URL = "YOUR_DEPLOYED_WEB_APP_URL";
```

9. The Telegram buttons now use direct Web App links, so they work even without a webhook. If you also want old callback-style Telegram messages to keep working, register the webhook with your deployed Web App URL for each bot you use:

```text
https://api.telegram.org/botYOUR_REAL_TELEGRAM_BOT_TOKEN/setWebhook?url=YOUR_DEPLOYED_WEB_APP_URL
```

10. The script expects these sheets:
   - `membership`
   - `reservation`

The script will create or correct the header row if the sheets are empty or missing new columns.

The `membership` sheet now also uses:
- `Comment as-tu connu CINEMANA?`
- `Statu`
- `Created at`
- `Email status`
- `Telegram chat`
- `Telegram message`

Membership requests are saved as `pending` in `Statu`. Telegram sends you two buttons:
- `Accepter`: changes `Statu` to `member`, marks it green, and sends the member reference + QR e-mail.
- `Refuser`: changes `Statu` to `rejected`, marks it red, and removes the Telegram buttons.

Public reservations are now saved as `pending` in the `Statu` column. Telegram sends you two buttons:
- `Confirmer`: changes `Statu` to `confirmed`, marks it green, reserves the seat, and sends the ticket e-mail with QR code.
- `Annuler`: changes `Statu` to `annulé`, marks it red, and releases the seat on the website.

The script also adds internal columns to `reservation`:
- `Code membre`: blocks a member from reserving more than one active seat with the same member code.
- `Telegram chat` and `Telegram message`: let Apps Script edit the original Telegram notification after confirmation/cancellation and remove the buttons.

Important: after changing Apps Script code, always use `Deploy > Manage deployments > Edit > New version > Deploy`. If Telegram buttons were sent before this update, generate a new test reservation so the notification contains the new direct-link buttons.
