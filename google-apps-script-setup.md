# CINEMANA Google Apps Script Setup

1. Open the Google Sheet:
   `https://docs.google.com/spreadsheets/d/1b3ZW4esFw0SqFwSw0HwMbtiadsNfYVJ0QdtzWDLGEIU/edit`

2. Go to `Extensions > Apps Script`.

3. Replace the current code with the content of `google-apps-script-cinemana-UPDATED.gs`.

3.1. After pasting the code, run `setupCinemanaSheetsExactOrder` once from the Apps Script editor:
   - Click Save or press `Ctrl + S`.
   - Refresh the Apps Script page if the function does not appear in the dropdown.
   - In the function dropdown, choose `setupCinemanaSheetsExactOrder`.
   - Click `Run`.
   - Accept the Google permissions.

This immediately reorders the columns in `membership` and `reservation` to match the current layout. If an old `Nom complet` column still exists, the helper tries to split it into `Prénom` and `Nom`, then removes the old header from the active layout.

4. Add your private settings as Apps Script properties, not inside the public website files or Apps Script source.

   In Apps Script, open `Project Settings` -> `Script Properties`, then add the values you use:

   - `ADMIN_SECRET`: required for admin dashboard actions and signed Telegram decision links.
   - `SCANNER_PIN`: required for the scanner login screen.
   - `ADMIN_EMAIL`: receives membership badge preparation e-mails.
   - `TELEGRAM_BOT_TOKEN`: reservation Telegram bot token.
   - `TELEGRAM_CHAT_ID`: reservation Telegram chat id.
   - `MEMBERSHIP_TELEGRAM_BOT_TOKEN`: membership Telegram bot token.
   - `MEMBERSHIP_TELEGRAM_CHAT_ID`: membership Telegram chat id.

   Reservation notifications use the reservation bot:

   - Paste the real reservation bot token and chat id there.

   Membership-card requests use the separate membership bot:

   - Paste the real membership bot token and chat id there.
   - Run `testMembershipTelegramNotification` once. If it returns `sent`, you should receive a small test message in Telegram.
   - If something still fails, run `getMembershipTelegramConfigStatus` to check whether the membership bot token and chat id are visible to Apps Script without printing the private token.

   Badge-admin e-mail setting:

   - Add `ADMIN_EMAIL`.
   - To send only a test badge e-mail without changing the real admin setting, run `testMembershipBadgeEmail`. It sends a sample badge to the `ADMIN_EMAIL` property.

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

The script will create the header row if the sheets are empty. To force the exact current column order after editing the Apps Script code, run `fixCinemanaSheetColumns` once.

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

When a member is accepted, the script also sends a badge-preparation e-mail to `ADMIN_EMAIL` with the same member QR code. For old accepted members that do not have `badge admin: sent` inside `Email status`, run `resendMissingMembershipBadgeEmails` once from the Apps Script editor. If you want to resend the new QR badge e-mail to every accepted member again, run `resendAllAcceptedMembershipBadgeEmails` once.

Public reservations are now saved as `pending` in the `Statu` column. Telegram sends you two signed buttons that require `ADMIN_SECRET` to be set:
- `Confirmer`: changes `Statu` to `confirmed`, marks it green, reserves the seat, and sends the ticket e-mail with QR code.
- `Annuler`: changes `Statu` to `annulé`, marks it red, and releases the seat on the website.

The entrance scanner page is available at `#scanner`. It first validates `SCANNER_PIN` with the Apps Script action `scannerLogin`, then uses the protected `verifyTicket` action with a temporary scanner token. After copying the latest `google-apps-script-cinemana-UPDATED.gs`, deploy a new Web App version before testing the scanner.

The hidden admin dashboard is available at `#admin`. It uses `ADMIN_SECRET` for `getReservations` and `updateReservationStatus`.

The public ticket status page is available at `#ticket-status`. It uses `getTicketStatus` and returns only safe fields: reference, status, seat, and event.

The script also adds internal columns to `reservation`:
- `Event` and `Event id`: keep seat availability separated by projection/event.
- `Code membre`: blocks a member from reserving more than one active seat with the same member code.
- `Telegram chat` and `Telegram message`: let Apps Script edit the original Telegram notification after confirmation/cancellation and remove the buttons.

Important: after changing Apps Script code, always use `Deploy > Manage deployments > Edit > New version > Deploy`. If Telegram buttons were sent before this update, generate a new test reservation so the notification contains the new direct-link buttons.
