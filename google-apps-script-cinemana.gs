const SPREADSHEET_ID = "1b3ZW4esFw0SqFwSw0HwMbtiadsNfYVJ0QdtzWDLGEIU";
const MEMBERSHIP_SHEET_NAME = "membership";
const RESERVATION_SHEET_NAME = "reservation";
const TELEGRAM_BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN";
const TELEGRAM_CHAT_ID = "YOUR_TELEGRAM_CHAT_ID";

const MEMBERSHIP_HEADERS = [
  "References",
  "Nom complet",
  "ville",
  "Date de naissance",
  "Téléphone",
  "E-mail",
  "Fonction"
];

const RESERVATION_HEADERS = [
  "References",
  "Nom complet",
  "Tel WhatsApp",
  "E-mail",
  "Âge",
  "Fonction",
  "Comment as-tu su pour la projection?",
  "Seat",
  "member ou non",
  "Created at",
  "Email status",
  "Statu"
];

function doGet(e) {
  return respond_(handleRequest_(e.parameter || {}), e.parameter && e.parameter.callback);
}

function doPost(e) {
  if (e && e.postData && e.postData.contents) {
    const telegramResponse = handleTelegramWebhook_(e.postData.contents);
    if (telegramResponse) return respond_(telegramResponse, null);
  }

  const params = e.parameter || {};
  return respond_(handleRequest_(params), params.callback);
}

function handleRequest_(params) {
  try {
    const action = params.action || "";
    const payload = parsePayload_(params.payload);

    if (action === "saveMembership") return saveMembership_(payload);
    if (action === "verifyMember") return verifyMember_(payload);
    if (action === "getReservedSeats") return getReservedSeats_();
    if (action === "createReservation") return createReservation_(payload);
    if (action === "decision") return processReservationDecision_(payload.reference, payload.decision, null);

    return { ok: false, code: "unknown_action", message: "Unknown action." };
  } catch (error) {
    return { ok: false, code: "server_error", message: String(error && error.message ? error.message : error) };
  }
}

function parsePayload_(raw) {
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch (error) {
    return {};
  }
}

function respond_(result, callback) {
  const json = JSON.stringify(result);
  const output = callback ? `${callback}(${json});` : json;
  return ContentService
    .createTextOutput(output)
    .setMimeType(callback ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON);
}

function getSpreadsheet_() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function getSheet_(name, headers) {
  const ss = getSpreadsheet_();
  const sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  ensureHeaders_(sheet, headers);
  return sheet;
}

function ensureHeaders_(sheet, headers) {
  if (sheet.getLastRow() === 0 || sheet.getLastColumn() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
    return;
  }

  const existing = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), headers.length)).getValues()[0];
  const hasData = sheet.getLastRow() > 1;
  const normalizedExisting = existing.map(normalizeHeader_);

  if (!hasData) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    if (sheet.getLastColumn() > headers.length) {
      sheet.getRange(1, headers.length + 1, 1, sheet.getLastColumn() - headers.length).clearContent();
    }
    sheet.setFrozenRows(1);
    return;
  }

  headers.forEach((header) => {
    if (!normalizedExisting.includes(normalizeHeader_(header))) {
      sheet.getRange(1, sheet.getLastColumn() + 1).setValue(header);
      normalizedExisting.push(normalizeHeader_(header));
    }
  });
  sheet.setFrozenRows(1);
}

function headerMap_(sheet) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const map = {};
  headers.forEach((header, index) => {
    if (header) map[normalizeHeader_(header)] = index + 1;
  });
  return map;
}

function normalizeHeader_(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "");
}

function normalizeText_(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function normalizePhone_(value) {
  return String(value || "").replace(/[^\d+]/g, "").replace(/^00/, "+");
}

function normalizeEmail_(value) {
  return String(value || "").trim().toLowerCase();
}

function getRows_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  return sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
}

function rowObject_(row, map) {
  function get(header) {
    const index = map[normalizeHeader_(header)];
    return index ? row[index - 1] : "";
  }

  return {
    reference: String(get("References") || "").trim(),
    fullName: String(get("Nom complet") || "").trim(),
    city: String(get("ville") || "").trim(),
    birthday: get("Date de naissance"),
    phone: String(get("Téléphone") || "").trim(),
    email: String(get("E-mail") || "").trim(),
    profession: String(get("Fonction") || "").trim()
  };
}

function findMemberByReference_(reference) {
  const sheet = getSheet_(MEMBERSHIP_SHEET_NAME, MEMBERSHIP_HEADERS);
  const map = headerMap_(sheet);
  const rows = getRows_(sheet);
  const target = normalizeText_(reference);

  for (let i = 0; i < rows.length; i += 1) {
    const member = rowObject_(rows[i], map);
    if (normalizeText_(member.reference) === target) return member;
  }
  return null;
}

function findMatchingMember_(payload) {
  const sheet = getSheet_(MEMBERSHIP_SHEET_NAME, MEMBERSHIP_HEADERS);
  const map = headerMap_(sheet);
  const rows = getRows_(sheet);
  const email = normalizeEmail_(payload.email);
  const phone = normalizePhone_(payload.phone || payload.whatsapp);
  const name = normalizeText_(payload.full_name);

  for (let i = 0; i < rows.length; i += 1) {
    const member = rowObject_(rows[i], map);
    const emailMatches = email && normalizeEmail_(member.email) === email;
    const phoneMatches = phone && normalizePhone_(member.phone) === phone;
    const nameMatches = name && normalizeText_(member.fullName) === name;
    if (emailMatches && (phoneMatches || nameMatches)) return member;
  }
  return null;
}

function verifyMemberPayload_(payload) {
  if (!payload.member_reference || !payload.full_name || !payload.email) {
    return { ok: false, code: "missing_fields" };
  }

  const member = findMemberByReference_(payload.member_reference);
  if (!member) return { ok: false, code: "reference_not_found" };
  if (normalizeEmail_(member.email) !== normalizeEmail_(payload.email)) return { ok: false, code: "email_mismatch" };

  const nameMatches = normalizeText_(member.fullName) === normalizeText_(payload.full_name);
  if (!nameMatches) return { ok: false, code: "identity_mismatch" };

  return { ok: true, member };
}

function verifyMember_(payload) {
  const result = verifyMemberPayload_(payload);
  if (!result.ok) return result;
  return {
    ok: true,
    member: {
      reference: result.member.reference,
      full_name: result.member.fullName,
      email: result.member.email,
      phone: result.member.phone,
      profession: result.member.profession
    }
  };
}

function saveMembership_(payload) {
  const required = ["reference_code", "full_name", "birthday", "city", "phone", "email", "profession"];
  if (required.some((key) => !payload[key])) return { ok: false, code: "missing_fields" };

  const sheet = getSheet_(MEMBERSHIP_SHEET_NAME, MEMBERSHIP_HEADERS);
  const map = headerMap_(sheet);
  const rows = getRows_(sheet);
  const existingRow = rows.findIndex((row) => {
    const reference = row[map[normalizeHeader_("References")] - 1];
    return normalizeText_(reference) === normalizeText_(payload.reference_code);
  });
  const valuesByHeader = {
    "References": payload.reference_code,
    "Nom complet": payload.full_name,
    "ville": payload.city,
    "Date de naissance": payload.birthday,
    "Téléphone": payload.phone,
    "E-mail": payload.email,
    "Fonction": payload.profession
  };
  const rowValues = buildRow_(sheet, valuesByHeader);

  if (existingRow >= 0) {
    sheet.getRange(existingRow + 2, 1, 1, rowValues.length).setValues([rowValues]);
  } else {
    sheet.appendRow(rowValues);
  }

  const emailStatus = sendMembershipEmail_(payload);
  return { ok: true, reference: payload.reference_code, email_status: emailStatus };
}

function getReservedSeats_() {
  const sheet = getSheet_(RESERVATION_SHEET_NAME, RESERVATION_HEADERS);
  const map = headerMap_(sheet);
  const seatColumn = map[normalizeHeader_("Seat")];
  const statusColumn = map[normalizeHeader_("Statu")];
  const rows = getRows_(sheet);
  const seatStatuses = [];

  rows.forEach((row) => {
    const seat = String(row[seatColumn - 1] || "").trim().toUpperCase();
    if (!seat) return;
    const status = normalizeReservationStatus_(statusColumn ? row[statusColumn - 1] : "");
    if (status === "confirmed" || status === "pending") {
      seatStatuses.push({ seat, status });
    }
  });

  return {
    ok: true,
    seats: seatStatuses.map((entry) => entry.seat),
    seat_statuses: seatStatuses
  };
}

function createReservation_(payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const required = ["type", "full_name", "phone", "email", "seat"];
    if (required.some((key) => !payload[key])) return { ok: false, code: "missing_fields" };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail_(payload.email))) return { ok: false, code: "invalid_email" };

    const seat = String(payload.seat || "").trim().toUpperCase();
    const reserved = getReservedSeats_().seats;
    if (reserved.includes(seat)) {
      return { ok: false, code: "seat_taken", seats: reserved };
    }

    let member = null;
    let isMember = false;
    if (payload.type === "member") {
      const verification = verifyMemberPayload_(payload);
      if (!verification.ok) return verification;
      member = verification.member;
      isMember = true;
    } else {
      member = findMatchingMember_(payload);
      isMember = Boolean(member);
    }

    const reference = generateReservationReference_();
    const status = payload.type === "member" ? "confirmed" : "pending";
    const sheet = getSheet_(RESERVATION_SHEET_NAME, RESERVATION_HEADERS);
    const valuesByHeader = {
      "References": reference,
      "Nom complet": payload.full_name,
      "Tel WhatsApp": payload.whatsapp || payload.phone,
      "E-mail": payload.email,
      "Âge": payload.type === "member" ? "" : payload.age,
      "Fonction": payload.type === "member" ? (member && member.profession ? member.profession : payload.profession) : payload.profession,
      "Comment as-tu su pour la projection?": payload.type === "member" ? "Réservation membre" : payload.source,
      "Seat": seat,
      "member ou non": isMember ? "✓" : "✗",
      "Created at": new Date(),
      "Email status": status === "confirmed" ? "pending" : "waiting confirmation",
      "Statu": status
    };
    const rowValues = buildRow_(sheet, valuesByHeader);
    sheet.appendRow(rowValues);

    const appendedRow = sheet.getLastRow();
    formatMemberMark_(sheet, appendedRow, isMember);
    formatReservationStatus_(sheet, appendedRow, status);

    const map = headerMap_(sheet);
    let emailStatus = "waiting confirmation";
    let telegramStatus = "not needed";
    if (status === "confirmed") {
      emailStatus = sendReservationEmail_(payload, reference, seat, isMember);
    } else {
      telegramStatus = sendTelegramReservationNotification_(payload, reference, seat, isMember);
    }
    const emailStatusColumn = map[normalizeHeader_("Email status")];
    if (emailStatusColumn) sheet.getRange(appendedRow, emailStatusColumn).setValue(emailStatus);

    return { ok: true, reference, seat, status, member: isMember, email_status: emailStatus, telegram_status: telegramStatus };
  } finally {
    lock.releaseLock();
  }
}

function buildRow_(sheet, valuesByHeader) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  return headers.map((header) => {
    const key = Object.keys(valuesByHeader).find((candidate) => normalizeHeader_(candidate) === normalizeHeader_(header));
    return key ? valuesByHeader[key] : "";
  });
}

function formatMemberMark_(sheet, row, isMember) {
  const map = headerMap_(sheet);
  const column = map[normalizeHeader_("member ou non")];
  if (!column) return;
  sheet.getRange(row, column)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setFontColor(isMember ? "#0f8a3b" : "#c62828")
    .setValue(isMember ? "✓" : "✗");
}

function normalizeReservationStatus_(value) {
  const status = normalizeText_(value);
  if (!status) return "confirmed";
  if (["confirmed", "confirme", "confirmee", "confirmé", "confirmée"].includes(status)) return "confirmed";
  if (["pending", "en attente", "attente", "معلق"].includes(status)) return "pending";
  if (["canceled", "cancelled", "annule", "annulee", "annulé", "annulée", "رفض", "ملغي"].includes(status)) return "canceled";
  return status;
}

function formatReservationStatus_(sheet, row, status) {
  const map = headerMap_(sheet);
  const column = map[normalizeHeader_("Statu")];
  if (!column) return;

  const normalized = normalizeReservationStatus_(status);
  const display = normalized === "confirmed" ? "confirmé" : normalized === "canceled" ? "annulé" : normalized;
  const color = normalized === "confirmed" ? "#0f8a3b" : normalized === "pending" ? "#d9822b" : "#c62828";
  const background = normalized === "confirmed" ? "#d9f2df" : normalized === "pending" ? "#fff0d6" : "#fde0df";

  sheet.getRange(row, column)
    .setValue(display)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setFontColor(color)
    .setBackground(background);
}

function findReservationByReference_(reference) {
  const sheet = getSheet_(RESERVATION_SHEET_NAME, RESERVATION_HEADERS);
  const map = headerMap_(sheet);
  const referenceColumn = map[normalizeHeader_("References")];
  const rows = getRows_(sheet);
  const target = normalizeText_(reference);

  for (let i = 0; i < rows.length; i += 1) {
    if (normalizeText_(rows[i][referenceColumn - 1]) === target) {
      return {
        sheet,
        map,
        rowNumber: i + 2,
        row: rows[i],
        reservation: reservationPayloadFromRow_(rows[i], map)
      };
    }
  }

  return null;
}

function reservationPayloadFromRow_(row, map) {
  function get(header) {
    const index = map[normalizeHeader_(header)];
    return index ? row[index - 1] : "";
  }

  return {
    reference: String(get("References") || "").trim(),
    full_name: String(get("Nom complet") || "").trim(),
    whatsapp: String(get("Tel WhatsApp") || "").trim(),
    phone: String(get("Tel WhatsApp") || "").trim(),
    email: String(get("E-mail") || "").trim(),
    age: String(get("Âge") || "").trim(),
    profession: String(get("Fonction") || "").trim(),
    source: String(get("Comment as-tu su pour la projection?") || "").trim(),
    seat: String(get("Seat") || "").trim().toUpperCase(),
    member_mark: String(get("member ou non") || "").trim(),
    email_status: String(get("Email status") || "").trim(),
    status: normalizeReservationStatus_(get("Statu"))
  };
}

function processReservationDecision_(reference, decision, callbackQueryId) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    if (decision !== "confirm" && decision !== "cancel") {
      return { ok: false, code: "invalid_decision", message: "Décision invalide." };
    }

    const found = findReservationByReference_(reference);
    if (!found) return { ok: false, code: "reference_not_found", message: "Réservation introuvable." };

    const currentStatus = found.reservation.status;
    if (currentStatus === "confirmed" || currentStatus === "canceled") {
      return {
        ok: true,
        reference,
        seat: found.reservation.seat,
        status: currentStatus,
        message: `Déjà ${currentStatus === "confirmed" ? "confirmée" : "annulée"}.`
      };
    }

    const status = decision === "confirm" ? "confirmed" : "canceled";
    const sheet = found.sheet;
    const map = found.map;
    const statusColumn = map[normalizeHeader_("Statu")];
    const emailStatusColumn = map[normalizeHeader_("Email status")];
    if (statusColumn) sheet.getRange(found.rowNumber, statusColumn).setValue(status === "confirmed" ? "confirmed" : "annulé");
    formatReservationStatus_(sheet, found.rowNumber, status);

    let emailStatus = "canceled";
    if (status === "confirmed") {
      emailStatus = sendReservationEmail_(found.reservation, reference, found.reservation.seat, found.reservation.member_mark === "✓");
    }
    if (emailStatusColumn) sheet.getRange(found.rowNumber, emailStatusColumn).setValue(emailStatus);

    return {
      ok: true,
      reference,
      seat: found.reservation.seat,
      status,
      email_status: emailStatus,
      message: status === "confirmed" ? "Réservation confirmée et ticket envoyé." : "Réservation annulée."
    };
  } finally {
    lock.releaseLock();
  }
}

function isTelegramConfigured_() {
  return TELEGRAM_BOT_TOKEN &&
    TELEGRAM_CHAT_ID &&
    TELEGRAM_BOT_TOKEN !== "YOUR_TELEGRAM_BOT_TOKEN" &&
    TELEGRAM_CHAT_ID !== "YOUR_TELEGRAM_CHAT_ID";
}

function telegramApi_(method, payload) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/${method}`;
  const response = UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
  const code = response.getResponseCode();
  const body = response.getContentText();
  if (code < 200 || code >= 300) {
    throw new Error(`telegram_${code}: ${body}`);
  }

  try {
    return JSON.parse(body);
  } catch (error) {
    return { ok: true, raw: body };
  }
}

function sendTelegramReservationNotification_(payload, reference, seat, isMember) {
  if (!isTelegramConfigured_()) return "telegram_missing_config";

  try {
    const memberLabel = isMember ? "Oui" : "Non";
    const text = [
      "🎬 <b>Nouvelle demande de réservation CINEMANA</b>",
      "",
      "<b>Statut :</b> En attente",
      `<b>Référence :</b> ${escapeHtml_(reference)}`,
      `<b>Siège demandé :</b> ${escapeHtml_(seat)}`,
      `<b>Nom :</b> ${escapeHtml_(payload.full_name)}`,
      `<b>Téléphone :</b> ${escapeHtml_(payload.whatsapp || payload.phone)}`,
      `<b>E-mail :</b> ${escapeHtml_(payload.email)}`,
      `<b>Âge :</b> ${escapeHtml_(payload.age || "-")}`,
      `<b>Fonction :</b> ${escapeHtml_(payload.profession || "-")}`,
      `<b>Source :</b> ${escapeHtml_(payload.source || "-")}`,
      `<b>Membre :</b> ${memberLabel}`,
      "",
      "Choisissez une action :"
    ].join("\n");

    telegramApi_("sendMessage", {
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [[
          { text: "✅ Confirmer", callback_data: `confirm|${reference}` },
          { text: "❌ Annuler", callback_data: `cancel|${reference}` }
        ]]
      }
    });
    return "sent";
  } catch (error) {
    return `error: ${String(error && error.message ? error.message : error)}`;
  }
}

function handleTelegramWebhook_(raw) {
  let update;
  try {
    update = JSON.parse(raw);
  } catch (error) {
    return null;
  }

  if (!update || (!update.update_id && !update.callback_query && !update.message)) return null;
  if (!update.callback_query) return { ok: true, ignored: true };
  return handleTelegramCallback_(update.callback_query);
}

function handleTelegramCallback_(callbackQuery) {
  const data = String(callbackQuery.data || "");
  const parts = data.split("|");
  const decision = parts[0];
  const reference = parts.slice(1).join("|");

  if (!reference || (decision !== "confirm" && decision !== "cancel")) {
    answerTelegramCallback_(callbackQuery.id, "Action invalide.");
    return { ok: false, code: "invalid_callback" };
  }

  const result = processReservationDecision_(reference, decision, callbackQuery.id);
  answerTelegramCallback_(callbackQuery.id, result.message || "Action traitée.");
  editTelegramDecisionMessage_(callbackQuery, result);
  return result;
}

function answerTelegramCallback_(callbackQueryId, text) {
  if (!callbackQueryId || !isTelegramConfigured_()) return;
  try {
    telegramApi_("answerCallbackQuery", {
      callback_query_id: callbackQueryId,
      text: String(text || "").slice(0, 180),
      show_alert: false
    });
  } catch (error) {
    // Telegram acknowledgements are best-effort; the sheet remains the source of truth.
  }
}

function editTelegramDecisionMessage_(callbackQuery, result) {
  if (!callbackQuery || !callbackQuery.message || !isTelegramConfigured_()) return;
  try {
    const marker = result.status === "confirmed" ? "✅ CONFIRMÉ" : result.status === "canceled" ? "❌ ANNULÉ" : "⚠️ NON TRAITÉ";
    const originalText = callbackQuery.message.text || "Demande de réservation CINEMANA";
    const text = `${originalText}\n\n${marker}\n${result.message || ""}`;
    telegramApi_("editMessageText", {
      chat_id: callbackQuery.message.chat.id,
      message_id: callbackQuery.message.message_id,
      text,
      reply_markup: { inline_keyboard: [] }
    });
  } catch (error) {
    // The decision is already written in Google Sheets; editing Telegram is only cosmetic.
  }
}

function generateReservationReference_() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 6; i += 1) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `RES-${new Date().getFullYear()}-${suffix}`;
}

function qrUrl_(value) {
  return `https://quickchart.io/qr?size=240&text=${encodeURIComponent(value)}`;
}

function sendMembershipEmail_(payload) {
  if (!payload.email) return "missing_email";
  try {
    const reference = payload.reference_code;
    const html = `
      <div style="font-family:Arial,sans-serif;background:#101827;color:#f7f0df;padding:28px">
        <div style="max-width:620px;margin:auto;background:#111;border-radius:14px;overflow:hidden;border:1px solid #d9b24c">
          <div style="background:#d9b24c;color:#080808;padding:24px;text-align:center">
            <h1 style="margin:0;font-size:30px">CINEMANA</h1>
            <p style="margin:6px 0 0;font-weight:700">Fondation Culturelle</p>
          </div>
          <div style="padding:28px">
            <h2 style="margin-top:0;color:#fff">Bienvenue ${escapeHtml_(payload.full_name)}</h2>
            <p>Votre compte membre CINEMANA est créé.</p>
            <p><strong>Référence membre :</strong> ${escapeHtml_(reference)}</p>
            <p><strong>Ville :</strong> ${escapeHtml_(payload.city)}</p>
            <p><strong>Fonction :</strong> ${escapeHtml_(payload.profession)}</p>
            <p style="text-align:center"><img src="${qrUrl_(reference)}" alt="QR code" width="180" height="180"></p>
            <p style="color:#b8b0a6">Gardez cette référence pour vos réservations membre.</p>
          </div>
        </div>
      </div>`;

    MailApp.sendEmail({
      to: payload.email,
      subject: "Votre carte membre CINEMANA",
      htmlBody: html,
      name: "CINEMANA"
    });
    return "sent";
  } catch (error) {
    return `error: ${String(error && error.message ? error.message : error)}`;
  }
}

function sendReservationEmail_(payload, reference, seat, isMember) {
  if (!payload.email) return "missing_email";
  try {
    const memberLabel = isMember ? "Membre CINEMANA" : "Invitation confirmée";
    const phone = payload.whatsapp || payload.phone || "";
    const html = `
      <div style="font-family:Arial,sans-serif;background:#080808;color:#f7f0df;padding:28px">
        <div style="max-width:680px;margin:auto;background:#111827;border-radius:18px;overflow:hidden;border:1px solid #d9b24c;box-shadow:0 18px 45px rgba(0,0,0,.35)">
          <div style="background:#d9b24c;color:#080808;padding:22px 28px;text-align:center">
            <div style="font-size:14px;font-weight:800;letter-spacing:3px;text-transform:uppercase">CINEMANA</div>
            <h1 style="margin:8px 0 0;font-size:34px;line-height:1">Billet d’entrée</h1>
            <p style="margin:8px 0 0;font-weight:700">Réservation confirmée</p>
          </div>
          <div style="padding:28px">
            <p style="margin:0 0 18px;color:#d7d0c3;font-size:16px">Bonjour <strong style="color:#fff">${escapeHtml_(payload.full_name)}</strong>, votre place est confirmée. Présentez ce billet à l’entrée.</p>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0;background:#0b0f1a;border:2px dashed #d9b24c;border-radius:18px;overflow:hidden">
              <tr>
                <td style="padding:24px;vertical-align:top">
                  <div style="font-size:12px;color:#d9b24c;font-weight:800;letter-spacing:2px;text-transform:uppercase">Référence ticket</div>
                  <div style="font-size:30px;line-height:1.15;font-weight:900;color:#fff;margin:8px 0 20px">${escapeHtml_(reference)}</div>

                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="padding:10px 0;border-top:1px solid #293244;color:#b8c0d0">Nom</td>
                      <td style="padding:10px 0;border-top:1px solid #293244;text-align:right;color:#fff;font-weight:700">${escapeHtml_(payload.full_name)}</td>
                    </tr>
                    <tr>
                      <td style="padding:10px 0;border-top:1px solid #293244;color:#b8c0d0">Siège</td>
                      <td style="padding:10px 0;border-top:1px solid #293244;text-align:right;color:#d9b24c;font-size:22px;font-weight:900">${escapeHtml_(seat)}</td>
                    </tr>
                    <tr>
                      <td style="padding:10px 0;border-top:1px solid #293244;color:#b8c0d0">Statut</td>
                      <td style="padding:10px 0;border-top:1px solid #293244;text-align:right;color:#fff;font-weight:700">${memberLabel}</td>
                    </tr>
                    <tr>
                      <td style="padding:10px 0;border-top:1px solid #293244;color:#b8c0d0">Téléphone</td>
                      <td style="padding:10px 0;border-top:1px solid #293244;text-align:right;color:#fff;font-weight:700">${escapeHtml_(phone)}</td>
                    </tr>
                  </table>
                </td>
                <td style="width:210px;padding:24px;background:#f7f0df;text-align:center;vertical-align:middle">
                  <img src="${qrUrl_(reference)}" alt="QR code" width="170" height="170" style="display:block;margin:auto;border:8px solid #fff;border-radius:12px">
                  <div style="font-size:12px;color:#101827;font-weight:800;margin-top:12px;letter-spacing:1px">SCAN À L’ENTRÉE</div>
                </td>
              </tr>
            </table>

            <div style="margin-top:18px;padding:16px 18px;background:#151c2b;border-radius:12px;color:#d7d0c3">
              <strong style="color:#d9b24c">Important :</strong> gardez ce ticket avec vous. Le QR code correspond uniquement à la référence ${escapeHtml_(reference)}.
            </div>
            <p style="text-align:center;margin:26px 0 0;color:#8f98aa;font-size:13px">© 2026 CINEMANA · Tanger, Maroc</p>
          </div>
        </div>
      </div>`;

    MailApp.sendEmail({
      to: payload.email,
      subject: `Réservation CINEMANA ${reference}`,
      htmlBody: html,
      name: "CINEMANA"
    });
    return "sent";
  } catch (error) {
    return `error: ${String(error && error.message ? error.message : error)}`;
  }
}

function escapeHtml_(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
