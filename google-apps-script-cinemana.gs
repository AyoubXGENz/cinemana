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
  "Fonction",
  "Comment as-tu connu CINEMANA?",
  "Statu",
  "Created at",
  "Email status",
  "Telegram chat",
  "Telegram message"
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
  "Statu",
  "Code membre",
  "Telegram chat",
  "Telegram message"
];

function doGet(e) {
  const params = e.parameter || {};
  const result = handleRequest_(params);
  if (params.ui === "telegram") return respondDecisionPage_(result);
  return respond_(result, params.callback);
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
    if (action === "membershipDecision") return processMembershipDecision_(payload.reference, payload.decision);

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

function phoneMatches_(left, right) {
  const a = normalizePhone_(left);
  const b = normalizePhone_(right);
  if (!a || !b) return false;
  if (a === b) return true;

  const aDigits = a.replace(/\D/g, "");
  const bDigits = b.replace(/\D/g, "");
  if (!aDigits || !bDigits) return false;
  if (aDigits === bDigits) return true;
  if (aDigits.length >= 9 && bDigits.length >= 9) {
    return aDigits.slice(-9) === bDigits.slice(-9);
  }
  return false;
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
    profession: String(get("Fonction") || "").trim(),
    heard_about_us: String(get("Comment as-tu connu CINEMANA?") || "").trim(),
    status: normalizeMembershipStatus_(get("Statu")),
    email_status: String(get("Email status") || "").trim(),
    telegram_chat_id: String(get("Telegram chat") || "").trim(),
    telegram_message_id: String(get("Telegram message") || "").trim()
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
    if (emailMatches && (phoneMatches || nameMatches) && member.status === "member") return member;
  }
  return null;
}

function verifyMemberPayload_(payload) {
  if (!payload.member_reference || !payload.full_name || !payload.email) {
    return { ok: false, code: "missing_fields" };
  }

  const member = findMemberByReference_(payload.member_reference);
  if (!member) return { ok: false, code: "reference_not_found" };
  if (member.status && member.status !== "member") return { ok: false, code: "member_not_approved" };
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

function normalizeMembershipStatus_(value) {
  const status = normalizeText_(value);
  if (!status) return "member";
  if (["member", "membre", "accepted", "approved", "accepte", "acceptee", "accepté", "acceptée"].includes(status)) return "member";
  if (["pending", "en attente", "attente", "review", "under review", "معلق"].includes(status)) return "pending";
  if (["rejected", "refused", "refuse", "refusee", "refusé", "refusée", "رفض", "مرفوض"].includes(status)) return "rejected";
  return status;
}

function formatMembershipStatus_(sheet, row, status) {
  const map = headerMap_(sheet);
  const column = map[normalizeHeader_("Statu")];
  if (!column) return;

  const normalized = normalizeMembershipStatus_(status);
  const display = normalized === "member" ? "member" : normalized === "rejected" ? "rejected" : "pending";
  const color = normalized === "member" ? "#0f8a3b" : normalized === "rejected" ? "#c62828" : "#d9822b";
  const background = normalized === "member" ? "#d9f2df" : normalized === "rejected" ? "#fde0df" : "#fff0d6";

  sheet.getRange(row, column)
    .setValue(display)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setFontColor(color)
    .setBackground(background);
}

function findMembershipByReference_(reference) {
  const sheet = getSheet_(MEMBERSHIP_SHEET_NAME, MEMBERSHIP_HEADERS);
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
        member: rowObject_(rows[i], map)
      };
    }
  }
  return null;
}

function saveMembership_(payload) {
  const required = ["reference_code", "full_name", "birthday", "city", "phone", "email", "profession", "heard_about_us"];
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
    "Fonction": payload.profession,
    "Comment as-tu connu CINEMANA?": payload.heard_about_us,
    "Statu": "pending",
    "Created at": new Date(),
    "Email status": "pending"
  };
  const rowValues = buildRow_(sheet, valuesByHeader);

  if (existingRow >= 0) {
    sheet.getRange(existingRow + 2, 1, 1, rowValues.length).setValues([rowValues]);
  } else {
    sheet.appendRow(rowValues);
  }

  const savedRow = existingRow >= 0 ? existingRow + 2 : sheet.getLastRow();
  formatMembershipStatus_(sheet, savedRow, "pending");
  const emailStatus = sendMembershipEmail_(payload);
  const latestMap = headerMap_(sheet);
  const emailStatusColumn = latestMap[normalizeHeader_("Email status")];
  if (emailStatusColumn) sheet.getRange(savedRow, emailStatusColumn).setValue(emailStatus);

  const telegramResult = sendTelegramMembershipNotification_(payload, payload.reference_code);
  if (telegramResult && typeof telegramResult === "object") {
    const telegramChatColumn = latestMap[normalizeHeader_("Telegram chat")];
    const telegramMessageColumn = latestMap[normalizeHeader_("Telegram message")];
    if (telegramChatColumn) sheet.getRange(savedRow, telegramChatColumn).setValue(telegramResult.chat_id);
    if (telegramMessageColumn) sheet.getRange(savedRow, telegramMessageColumn).setValue(telegramResult.message_id);
  }

  return {
    ok: true,
    reference: payload.reference_code,
    status: "pending",
    email_status: emailStatus,
    telegram_status: typeof telegramResult === "string" ? telegramResult : telegramResult.status
  };
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

function isActiveReservationStatus_(status) {
  const normalized = normalizeReservationStatus_(status);
  return normalized === "confirmed" || normalized === "pending";
}

function findActiveReservationByMemberReference_(memberReference) {
  const sheet = getSheet_(RESERVATION_SHEET_NAME, RESERVATION_HEADERS);
  const map = headerMap_(sheet);
  const codeColumn = map[normalizeHeader_("Code membre")];
  const statusColumn = map[normalizeHeader_("Statu")];
  if (!codeColumn) return null;

  const target = normalizeText_(memberReference);
  const rows = getRows_(sheet);
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    const code = normalizeText_(row[codeColumn - 1]);
    const status = statusColumn ? row[statusColumn - 1] : "";
    if (code && code === target && isActiveReservationStatus_(status)) {
      return { rowNumber: i + 2, row };
    }
  }
  return null;
}

function findActiveReservationDuplicate_(payload) {
  const sheet = getSheet_(RESERVATION_SHEET_NAME, RESERVATION_HEADERS);
  const map = headerMap_(sheet);
  const emailColumn = map[normalizeHeader_("E-mail")];
  const phoneColumn = map[normalizeHeader_("Tel WhatsApp")];
  const statusColumn = map[normalizeHeader_("Statu")];
  const targetEmail = normalizeEmail_(payload.email);
  const targetPhone = payload.whatsapp || payload.phone;
  const rows = getRows_(sheet);

  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    const status = statusColumn ? row[statusColumn - 1] : "";
    if (!isActiveReservationStatus_(status)) continue;

    if (emailColumn && targetEmail && normalizeEmail_(row[emailColumn - 1]) === targetEmail) {
      return { code: "duplicate_email", rowNumber: i + 2 };
    }

    if (phoneColumn && targetPhone && phoneMatches_(row[phoneColumn - 1], targetPhone)) {
      return { code: "duplicate_phone", rowNumber: i + 2 };
    }
  }

  return null;
}

function createReservation_(payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const required = ["type", "full_name", "phone", "email", "seat"];
    if (required.some((key) => !payload[key])) return { ok: false, code: "missing_fields" };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail_(payload.email))) return { ok: false, code: "invalid_email" };

    const seat = String(payload.seat || "").trim().toUpperCase();
    const activeSeats = getReservedSeats_();
    if (activeSeats.seats.includes(seat)) {
      return { ok: false, code: "seat_taken", seats: activeSeats.seats, seat_statuses: activeSeats.seat_statuses };
    }

    let member = null;
    let isMember = false;
    if (payload.type === "member") {
      const verification = verifyMemberPayload_(payload);
      if (!verification.ok) return verification;
      if (findActiveReservationByMemberReference_(payload.member_reference)) {
        return { ok: false, code: "member_already_reserved" };
      }
      member = verification.member;
      isMember = true;
    } else {
      const duplicate = findActiveReservationDuplicate_(payload);
      if (duplicate) return { ok: false, code: duplicate.code };
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
      "Statu": status,
      "Code membre": payload.type === "member" ? payload.member_reference : ""
    };
    const rowValues = buildRow_(sheet, valuesByHeader);
    sheet.appendRow(rowValues);

    const appendedRow = sheet.getLastRow();
    formatMemberMark_(sheet, appendedRow, isMember);
    formatReservationStatus_(sheet, appendedRow, status);

    const map = headerMap_(sheet);
    let emailStatus = "waiting confirmation";
    let telegramStatus = "not needed";
    let telegramResult = null;
    if (status === "confirmed") {
      emailStatus = sendReservationEmail_(payload, reference, seat, isMember);
    } else {
      telegramResult = sendTelegramReservationNotification_(payload, reference, seat, isMember);
      telegramStatus = typeof telegramResult === "string" ? telegramResult : telegramResult.status;
    }
    const emailStatusColumn = map[normalizeHeader_("Email status")];
    if (emailStatusColumn) sheet.getRange(appendedRow, emailStatusColumn).setValue(emailStatus);
    if (telegramResult && typeof telegramResult === "object") {
      const telegramChatColumn = map[normalizeHeader_("Telegram chat")];
      const telegramMessageColumn = map[normalizeHeader_("Telegram message")];
      if (telegramChatColumn) sheet.getRange(appendedRow, telegramChatColumn).setValue(telegramResult.chat_id);
      if (telegramMessageColumn) sheet.getRange(appendedRow, telegramMessageColumn).setValue(telegramResult.message_id);
    }

    return {
      ok: true,
      reference: status === "confirmed" ? reference : "",
      seat,
      status,
      member: isMember,
      email_status: emailStatus,
      telegram_status: telegramStatus
    };
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
    status: normalizeReservationStatus_(get("Statu")),
    member_reference: String(get("Code membre") || "").trim(),
    telegram_chat_id: String(get("Telegram chat") || "").trim(),
    telegram_message_id: String(get("Telegram message") || "").trim()
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
      const result = {
        ok: true,
        reference,
        seat: found.reservation.seat,
        status: currentStatus,
        message: `Déjà ${currentStatus === "confirmed" ? "confirmée" : "annulée"}.`
      };
      editStoredTelegramDecisionMessage_(found.reservation, result);
      return result;
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

    const result = {
      ok: true,
      reference,
      seat: found.reservation.seat,
      status,
      email_status: emailStatus,
      message: status === "confirmed" ? "Réservation confirmée et ticket envoyé." : "Réservation annulée."
    };
    editStoredTelegramDecisionMessage_(found.reservation, result);
    return result;
  } finally {
    lock.releaseLock();
  }
}

function processMembershipDecision_(reference, decision) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    if (decision !== "approve" && decision !== "reject") {
      return { ok: false, kind: "membership", code: "invalid_decision", message: "Décision invalide." };
    }

    const found = findMembershipByReference_(reference);
    if (!found) return { ok: false, kind: "membership", code: "reference_not_found", message: "Demande d’adhésion introuvable." };

    const currentStatus = found.member.status;
    if (currentStatus === "member" || currentStatus === "rejected") {
      const result = {
        ok: true,
        kind: "membership",
        reference,
        status: currentStatus,
        message: `Déjà ${currentStatus === "member" ? "accepté" : "refusé"}.`
      };
      editStoredTelegramMembershipDecisionMessage_(found.member, result);
      return result;
    }

    const status = decision === "approve" ? "member" : "rejected";
    const sheet = found.sheet;
    const map = found.map;
    const statusColumn = map[normalizeHeader_("Statu")];
    const emailStatusColumn = map[normalizeHeader_("Email status")];
    if (statusColumn) sheet.getRange(found.rowNumber, statusColumn).setValue(status);
    formatMembershipStatus_(sheet, found.rowNumber, status);

    const emailStatus = status === "member"
      ? sendMembershipApprovedEmail_(found.member)
      : sendMembershipRejectedEmail_(found.member);
    if (emailStatusColumn) sheet.getRange(found.rowNumber, emailStatusColumn).setValue(emailStatus);

    const result = {
      ok: true,
      kind: "membership",
      reference,
      status,
      email_status: emailStatus,
      message: status === "member" ? "Membre accepté et e-mail envoyé." : "Demande refusée."
    };
    editStoredTelegramMembershipDecisionMessage_(found.member, result);
    return result;
  } finally {
    lock.releaseLock();
  }
}

function isTelegramConfigured_() {
  const token = getTelegramBotToken_();
  const chatId = getTelegramChatId_();
  return token &&
    chatId &&
    token !== "YOUR_TELEGRAM_BOT_TOKEN" &&
    chatId !== "YOUR_TELEGRAM_CHAT_ID";
}

function getTelegramBotToken_() {
  return PropertiesService.getScriptProperties().getProperty("TELEGRAM_BOT_TOKEN") || TELEGRAM_BOT_TOKEN;
}

function getTelegramChatId_() {
  return PropertiesService.getScriptProperties().getProperty("TELEGRAM_CHAT_ID") || TELEGRAM_CHAT_ID;
}

function telegramApi_(method, payload) {
  const url = `https://api.telegram.org/bot${getTelegramBotToken_()}/${method}`;
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
    const response = telegramApi_("sendMessage", {
      chat_id: getTelegramChatId_(),
      text: buildTelegramReservationText_(payload, reference, seat, isMember, "pending"),
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [[
          { text: "✅ Confirmer", url: buildDecisionUrl_("confirm", reference) },
          { text: "❌ Annuler", url: buildDecisionUrl_("cancel", reference) }
        ]]
      }
    });
    return {
      status: "sent",
      chat_id: response && response.result && response.result.chat ? String(response.result.chat.id) : getTelegramChatId_(),
      message_id: response && response.result ? String(response.result.message_id || "") : ""
    };
  } catch (error) {
    return `error: ${String(error && error.message ? error.message : error)}`;
  }
}

function buildTelegramReservationText_(payload, reference, seat, isMember, status) {
  const statusLabel = status === "confirmed"
    ? "✅ Confirmé"
    : status === "canceled"
      ? "❌ Annulé"
      : "⏳ En attente";
  const memberLabel = isMember ? "Oui" : "Non";

  return [
    "🎬 <b>Demande de réservation CINEMANA</b>",
    "",
    `<b>Statut :</b> ${statusLabel}`,
    `<b>Référence :</b> ${escapeHtml_(reference)}`,
    `<b>Siège :</b> ${escapeHtml_(seat)}`,
    `<b>Nom :</b> ${escapeHtml_(payload.full_name)}`,
    `<b>Téléphone :</b> ${escapeHtml_(payload.whatsapp || payload.phone)}`,
    `<b>E-mail :</b> ${escapeHtml_(payload.email)}`,
    `<b>Âge :</b> ${escapeHtml_(payload.age || "-")}`,
    `<b>Fonction :</b> ${escapeHtml_(payload.profession || "-")}`,
    `<b>Source :</b> ${escapeHtml_(payload.source || "-")}`,
    `<b>Membre :</b> ${memberLabel}`,
    "",
    status === "pending" ? "Choisissez une action :" : "Action traitée."
  ].join("\n");
}

function sendTelegramMembershipNotification_(payload, reference) {
  if (!isTelegramConfigured_()) return "telegram_missing_config";

  try {
    const response = telegramApi_("sendMessage", {
      chat_id: getTelegramChatId_(),
      text: buildTelegramMembershipText_(payload, reference, "pending"),
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [[
          { text: "✅ Accepter", url: buildMembershipDecisionUrl_("approve", reference) },
          { text: "❌ Refuser", url: buildMembershipDecisionUrl_("reject", reference) }
        ]]
      }
    });
    return {
      status: "sent",
      chat_id: response && response.result && response.result.chat ? String(response.result.chat.id) : getTelegramChatId_(),
      message_id: response && response.result ? String(response.result.message_id || "") : ""
    };
  } catch (error) {
    return `error: ${String(error && error.message ? error.message : error)}`;
  }
}

function buildTelegramMembershipText_(payload, reference, status) {
  const statusLabel = status === "member"
    ? "✅ Member"
    : status === "rejected"
      ? "❌ Rejected"
      : "⏳ Pending";

  return [
    "🎬 <b>Demande d’adhésion CINEMANA</b>",
    "",
    `<b>Statut :</b> ${statusLabel}`,
    `<b>Référence :</b> ${escapeHtml_(reference)}`,
    `<b>Nom :</b> ${escapeHtml_(payload.full_name || payload.fullName)}`,
    `<b>Date de naissance :</b> ${escapeHtml_(payload.birthday || "-")}`,
    `<b>Ville :</b> ${escapeHtml_(payload.city || "-")}`,
    `<b>Téléphone :</b> ${escapeHtml_(payload.phone || "-")}`,
    `<b>E-mail :</b> ${escapeHtml_(payload.email || "-")}`,
    `<b>Fonction :</b> ${escapeHtml_(payload.profession || "-")}`,
    `<b>Comment il/elle a connu CINEMANA :</b> ${escapeHtml_(payload.heard_about_us || "-")}`,
    "",
    status === "pending" ? "Choisissez une action :" : "Action traitée."
  ].join("\n");
}

function editStoredTelegramMembershipDecisionMessage_(member, result) {
  if (!member || !member.telegram_chat_id || !member.telegram_message_id || !isTelegramConfigured_()) return;
  try {
    telegramApi_("editMessageText", {
      chat_id: member.telegram_chat_id,
      message_id: member.telegram_message_id,
      text: buildTelegramMembershipText_(member, result.reference || member.reference, result.status),
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: [] }
    });
  } catch (error) {
    // The Google Sheet status is already updated; Telegram editing is best-effort.
  }
}

function editStoredTelegramDecisionMessage_(reservation, result) {
  if (!reservation || !reservation.telegram_chat_id || !reservation.telegram_message_id || !isTelegramConfigured_()) return;
  try {
    telegramApi_("editMessageText", {
      chat_id: reservation.telegram_chat_id,
      message_id: reservation.telegram_message_id,
      text: buildTelegramReservationText_(
        reservation,
        result.reference || reservation.reference,
        result.seat || reservation.seat,
        reservation.member_mark === "✓",
        result.status
      ),
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: [] }
    });
  } catch (error) {
    // The Google Sheet status is already updated; Telegram editing is best-effort.
  }
}

function buildDecisionUrl_(decision, reference) {
  const payload = encodeURIComponent(JSON.stringify({ decision, reference }));
  return `${ScriptApp.getService().getUrl()}?action=decision&ui=telegram&payload=${payload}`;
}

function buildMembershipDecisionUrl_(decision, reference) {
  const payload = encodeURIComponent(JSON.stringify({ decision, reference }));
  return `${ScriptApp.getService().getUrl()}?action=membershipDecision&ui=telegram&payload=${payload}`;
}

function respondDecisionPage_(result) {
  const ok = result && result.ok;
  const status = result && result.status ? result.status : "";
  const isMembership = result && result.kind === "membership";
  const title = ok
    ? isMembership
      ? status === "member"
        ? "Membre accepté"
        : status === "rejected"
          ? "Demande refusée"
          : "Demande traitée"
      : status === "confirmed"
        ? "Réservation confirmée"
        : status === "canceled"
          ? "Réservation annulée"
          : "Demande traitée"
    : "Action impossible";
  const color = ok && (status === "confirmed" || status === "member") ? "#16a34a" : ok && (status === "canceled" || status === "rejected") ? "#dc2626" : "#d9b24c";
  const message = result && result.message ? result.message : "La décision a été traitée.";
  const reference = result && result.reference ? result.reference : "";
  const seat = result && result.seat ? result.seat : "";

  return HtmlService.createHtmlOutput(`
    <!doctype html>
    <html lang="fr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${escapeHtml_(title)}</title>
        <style>
          body{margin:0;min-height:100vh;display:grid;place-items:center;background:#080808;color:#f7f0df;font-family:Arial,sans-serif}
          .card{width:min(92vw,520px);background:#111827;border:1px solid #d9b24c;border-radius:18px;padding:30px;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,.4)}
          .badge{width:72px;height:72px;margin:0 auto 18px;border-radius:999px;display:grid;place-items:center;background:${color};color:white;font-size:34px;font-weight:900}
          h1{margin:0 0 12px;font-size:30px;color:white}
          p{margin:8px 0;color:#d7d0c3;font-size:17px;line-height:1.5}
          strong{color:#d9b24c}
        </style>
      </head>
      <body>
        <main class="card">
          <div class="badge">${status === "canceled" || status === "rejected" ? "×" : "✓"}</div>
          <h1>${escapeHtml_(title)}</h1>
          <p>${escapeHtml_(message)}</p>
          ${reference ? `<p>Référence : <strong>${escapeHtml_(reference)}</strong></p>` : ""}
          ${seat ? `<p>Siège : <strong>${escapeHtml_(seat)}</strong></p>` : ""}
          <p>Vous pouvez fermer cette page et retourner à Telegram.</p>
        </main>
      </body>
    </html>
  `);
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
    const html = `
      <div style="margin:0;padding:0;background:#080808">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;background:#080808">
          <tr>
            <td style="padding:18px 10px;font-family:Arial,sans-serif;color:#f7f0df">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:620px;margin:0 auto;border-collapse:collapse;background:#111827;border:1px solid #d9b24c;border-radius:18px;overflow:hidden">
                <tr>
                  <td style="background:#d9b24c;color:#080808;padding:22px 16px;text-align:center">
                    <div style="font-size:13px;font-weight:800;letter-spacing:4px;text-transform:uppercase">CINEMANA</div>
                    <div style="font-size:30px;line-height:1.12;font-weight:900;margin-top:8px">Demande reçue</div>
                    <div style="font-size:15px;font-weight:800;margin-top:8px">Carte membre CINEMANA</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px 18px">
                    <p style="margin:0 0 16px;color:#d7d0c3;font-size:18px;line-height:1.5">Bonjour <strong style="color:#fff">${escapeHtml_(payload.full_name)}</strong>,</p>
                    <p style="margin:0 0 16px;color:#d7d0c3;font-size:16px;line-height:1.6">Nous avons bien reçu votre demande d’adhésion à la Fondation CINEMANA.</p>
                    <p style="margin:0 0 16px;color:#d7d0c3;font-size:16px;line-height:1.6">Notre équipe va vérifier les informations transmises et vous répondra dans les plus brefs délais. Votre carte membre sera activée uniquement après validation.</p>
                    <div style="margin-top:18px;padding:16px;background:#151c2b;border-radius:12px;color:#d7d0c3;font-size:15px;line-height:1.6">
                      <strong style="color:#d9b24c">Statut actuel :</strong> en cours de revue.
                    </div>
                    <p style="text-align:center;margin:24px 0 0;color:#8f98aa;font-size:13px">© 2026 CINEMANA · Tanger, Maroc</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>`;

    MailApp.sendEmail({
      to: payload.email,
      subject: "Demande d’adhésion CINEMANA reçue",
      htmlBody: html,
      name: "CINEMANA"
    });
    return "sent";
  } catch (error) {
    return `error: ${String(error && error.message ? error.message : error)}`;
  }
}

function sendMembershipApprovedEmail_(member) {
  if (!member.email) return "missing_email";
  try {
    const reference = member.reference;
    const html = `
      <div style="margin:0;padding:0;background:#080808">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;background:#080808">
          <tr>
            <td style="padding:18px 10px;font-family:Arial,sans-serif;color:#f7f0df">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:620px;margin:0 auto;border-collapse:collapse;background:#111827;border:1px solid #d9b24c;border-radius:18px;overflow:hidden">
                <tr>
                  <td style="background:#d9b24c;color:#080808;padding:22px 16px;text-align:center">
                    <div style="font-size:13px;font-weight:800;letter-spacing:4px;text-transform:uppercase">CINEMANA</div>
                    <div style="font-size:30px;line-height:1.12;font-weight:900;margin-top:8px">Carte membre validée</div>
                    <div style="font-size:15px;font-weight:800;margin-top:8px">Bienvenue dans la Fondation CINEMANA</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px 18px">
                    <p style="margin:0 0 16px;color:#d7d0c3;font-size:18px;line-height:1.5">Bonjour <strong style="color:#fff">${escapeHtml_(member.fullName)}</strong>, votre demande d’adhésion est acceptée.</p>
                    <div style="padding:18px;background:#0b0f1a;border:2px dashed #d9b24c;border-radius:16px">
                      <div style="font-size:12px;color:#d9b24c;font-weight:800;letter-spacing:2px;text-transform:uppercase">Référence membre</div>
                      <div style="font-size:28px;line-height:1.18;font-weight:900;color:#fff;margin:8px 0 18px;word-break:break-word;overflow-wrap:anywhere">${escapeHtml_(reference)}</div>
                      <p style="margin:0 0 12px;color:#d7d0c3;font-size:15px;line-height:1.5">Utilisez cette référence pour vos réservations membre.</p>
                      <div style="margin-top:14px;padding:16px;background:#f7f0df;border-radius:14px;text-align:center">
                        <img src="${qrUrl_(reference)}" alt="QR code" width="180" height="180" style="display:block;width:180px;height:180px;margin:0 auto;border:8px solid #fff;border-radius:12px">
                      </div>
                    </div>
                    <p style="text-align:center;margin:24px 0 0;color:#8f98aa;font-size:13px">© 2026 CINEMANA · Tanger, Maroc</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>`;

    MailApp.sendEmail({
      to: member.email,
      subject: "Votre adhésion CINEMANA est validée",
      htmlBody: html,
      name: "CINEMANA"
    });
    return "sent";
  } catch (error) {
    return `error: ${String(error && error.message ? error.message : error)}`;
  }
}

function sendMembershipRejectedEmail_(member) {
  if (!member.email) return "missing_email";
  try {
    const html = `
      <div style="font-family:Arial,sans-serif;background:#080808;color:#f7f0df;padding:24px">
        <div style="max-width:580px;margin:auto;background:#111827;border:1px solid #d9b24c;border-radius:16px;overflow:hidden">
          <div style="background:#d9b24c;color:#080808;padding:20px;text-align:center">
            <h1 style="margin:0;font-size:28px">CINEMANA</h1>
            <p style="margin:6px 0 0;font-weight:700">Demande d’adhésion</p>
          </div>
          <div style="padding:24px">
            <p style="font-size:17px;line-height:1.5;color:#d7d0c3">Bonjour <strong style="color:#fff">${escapeHtml_(member.fullName)}</strong>,</p>
            <p style="font-size:16px;line-height:1.6;color:#d7d0c3">Après revue, votre demande d’adhésion CINEMANA n’a pas été validée pour le moment.</p>
            <p style="font-size:16px;line-height:1.6;color:#d7d0c3">Merci pour votre intérêt et votre compréhension.</p>
            <p style="text-align:center;margin:24px 0 0;color:#8f98aa;font-size:13px">© 2026 CINEMANA · Tanger, Maroc</p>
          </div>
        </div>
      </div>`;

    MailApp.sendEmail({
      to: member.email,
      subject: "Réponse à votre demande d’adhésion CINEMANA",
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
      <div style="margin:0;padding:0;background:#080808">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;background:#080808">
          <tr>
            <td style="padding:18px 10px;font-family:Arial,sans-serif;color:#f7f0df">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:560px;margin:0 auto;border-collapse:collapse;background:#111827;border:1px solid #d9b24c;border-radius:18px;overflow:hidden">
                <tr>
                  <td style="background:#d9b24c;color:#080808;padding:22px 16px;text-align:center">
                    <div style="font-size:13px;font-weight:800;letter-spacing:4px;text-transform:uppercase">CINEMANA</div>
                    <div style="font-size:34px;line-height:1.08;font-weight:900;margin-top:8px">Billet d’entrée</div>
                    <div style="font-size:16px;font-weight:800;margin-top:8px">Réservation confirmée</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:22px 16px">
                    <p style="margin:0 0 18px;color:#d7d0c3;font-size:18px;line-height:1.45">Bonjour <strong style="color:#fff">${escapeHtml_(payload.full_name)}</strong>, votre place est confirmée. Présentez ce billet à l’entrée.</p>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;background:#0b0f1a;border:2px dashed #d9b24c;border-radius:16px">
                      <tr>
                        <td style="padding:20px 16px">
                          <div style="font-size:12px;color:#d9b24c;font-weight:800;letter-spacing:2px;text-transform:uppercase">Référence ticket</div>
                          <div style="font-size:28px;line-height:1.18;font-weight:900;color:#fff;margin:8px 0 18px;word-break:break-word;overflow-wrap:anywhere">${escapeHtml_(reference)}</div>

                          <div style="border-top:1px solid #293244;padding:12px 0">
                            <div style="font-size:13px;color:#b8c0d0;margin-bottom:4px">Nom</div>
                            <div style="font-size:17px;color:#fff;font-weight:800;line-height:1.35;word-break:break-word">${escapeHtml_(payload.full_name)}</div>
                          </div>
                          <div style="border-top:1px solid #293244;padding:12px 0">
                            <div style="font-size:13px;color:#b8c0d0;margin-bottom:4px">Siège</div>
                            <div style="font-size:30px;color:#d9b24c;font-weight:900;line-height:1">${escapeHtml_(seat)}</div>
                          </div>
                          <div style="border-top:1px solid #293244;padding:12px 0">
                            <div style="font-size:13px;color:#b8c0d0;margin-bottom:4px">Statut</div>
                            <div style="font-size:17px;color:#fff;font-weight:800;line-height:1.35">${memberLabel}</div>
                          </div>
                          <div style="border-top:1px solid #293244;padding:12px 0">
                            <div style="font-size:13px;color:#b8c0d0;margin-bottom:4px">Téléphone</div>
                            <div style="font-size:17px;color:#fff;font-weight:800;line-height:1.35;word-break:break-word">${escapeHtml_(phone)}</div>
                          </div>

                          <div style="margin-top:16px;padding:18px;background:#f7f0df;border-radius:14px;text-align:center">
                            <img src="${qrUrl_(reference)}" alt="QR code" width="190" height="190" style="display:block;width:190px;height:190px;margin:0 auto;border:8px solid #fff;border-radius:12px">
                            <div style="font-size:12px;color:#101827;font-weight:900;margin-top:12px;letter-spacing:1px">SCAN À L’ENTRÉE</div>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <div style="margin-top:18px;padding:15px 16px;background:#151c2b;border-radius:12px;color:#d7d0c3;font-size:15px;line-height:1.5">
                      <strong style="color:#d9b24c">Important :</strong> gardez ce ticket avec vous. Le QR code correspond uniquement à la référence ${escapeHtml_(reference)}.
                    </div>
                    <p style="text-align:center;margin:24px 0 0;color:#8f98aa;font-size:13px">© 2026 CINEMANA · Tanger, Maroc</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
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
