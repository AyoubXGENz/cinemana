const SPREADSHEET_ID = "1b3ZW4esFw0SqFwSw0HwMbtiadsNfYVJ0QdtzWDLGEIU";
const MEMBERSHIP_SHEET_NAME = "membership";
const RESERVATION_SHEET_NAME = "reservation";

// The 10 center seats of row A (closest to the screen) are permanently held
// back from booking for every event, regardless of what the sheet says.
const CINEMANA_BLOCKED_SEATS = ["A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15"];

// Private values must be set in Apps Script:
// Project Settings -> Script Properties.
// Expected keys: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID,
// MEMBERSHIP_TELEGRAM_BOT_TOKEN, MEMBERSHIP_TELEGRAM_CHAT_ID,
// ADMIN_EMAIL, ADMIN_SECRET, SCANNER_PIN.
const SCANNER_TOKEN_CACHE_PREFIX = "cinemana_scanner_token_";
const SCANNER_TOKEN_TTL_SECONDS = 6 * 60 * 60;

const MEMBERSHIP_HEADERS = [
  "References",
  "Prénom",
  "Nom",
  "ville",
  "Date de naissance",
  "Téléphone",
  "E-mail",
  "Fonction",
  "Comment as-tu connu CINEMANA?",
  "Photo de profil",
  "Photo de profil file id",
  "Recu paiement",
  "Recu paiement file id",
  "Statu",
  "Created at",
  "Email status",
  "Telegram chat",
  "Telegram message",
  "Photo upload error"
];

const RESERVATION_HEADERS = [
  "References",
  "Event",
  "Event id",
  "Prénom",
  "Nom",
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
    // Try to parse the body as JSON first.
    // If it contains an "action" field, it's a direct API call (e.g. saveMembership with images)
    // posted with Content-Type: text/plain to avoid CORS preflight.
    // Otherwise treat it as a Telegram webhook.
    let parsed;
    try { parsed = JSON.parse(e.postData.contents); } catch (_) { parsed = null; }

    if (parsed && typeof parsed.action === "string") {
      const params = { action: parsed.action };
      const payloadStr = JSON.stringify(parsed.payload || {});
      return respond_(handleRequest_(Object.assign({}, params, { payload: payloadStr })), null);
    }

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

    if (action === "scannerLogin") return scannerLogin_(payload);
    if (action === "getTicketStatus") return getTicketStatus_(payload);
    if (action === "verifyTicket") {
      if (!isScannerAuthorized_(payload) && !isAdminAuthorized_(params, payload)) return unauthorizedResponse_();
      return verifyTicket_(payload);
    }
    if (action === "decision") {
      if (!isAdminAuthorized_(params, payload) && !isSignedDecisionRequest_("decision", payload)) return unauthorizedResponse_();
      return processReservationDecision_(payload.reference, payload.decision, null);
    }
    if (action === "membershipDecision") {
      if (!isAdminAuthorized_(params, payload) && !isSignedDecisionRequest_("membershipDecision", payload)) return unauthorizedResponse_();
      return processMembershipDecision_(payload.reference, payload.decision);
    }
    if (isSensitiveAction_(action) && !isAdminAuthorized_(params, payload)) return unauthorizedResponse_();

    if (action === "setupSheets") return setupCinemanaSheets();
    if (action === "saveMembership") return saveMembership_(payload);
    if (action === "testMembershipBadgeEmail") return testMembershipBadgeEmail();
    if (action === "setupCinemanaSheetsExactOrder") return setupCinemanaSheetsExactOrder();
    if (action === "verifyMember") return verifyMember_(payload);
    if (action === "getMemberDashboard") return getMemberDashboard_(payload);
    if (action === "getReservedSeats") return getReservedSeats_(payload);
    if (action === "createReservation") return createReservation_(payload);
    if (action === "getReservations") return getReservations_();
    if (action === "updateReservationStatus") return updateReservationStatus_(payload);

    return { ok: false, code: "unknown_action", message: "Unknown action." };
  } catch (error) {
    return { ok: false, code: "server_error", message: String(error && error.message ? error.message : error) };
  }
}

function getConfigValue(key) {
  // Set private values in Apps Script: Project Settings -> Script Properties.
  return String(PropertiesService.getScriptProperties().getProperty(key) || "").trim();
}

function getAdminSecret_() {
  return getConfigValue("ADMIN_SECRET");
}

function unauthorizedResponse_() {
  return {
    success: false,
    ok: false,
    code: "unauthorized",
    error: "Unauthorized request",
    message: "Unauthorized request"
  };
}

function requestSecret_(params, payload) {
  return String(
    (payload && (payload.admin_secret || payload.adminSecret || payload.secret)) ||
    (params && (params.admin_secret || params.adminSecret || params.secret)) ||
    ""
  ).trim();
}

function isAdminAuthorized_(params, payload) {
  const expected = getAdminSecret_();
  if (!expected) return false;
  return requestSecret_(params, payload) === expected;
}

function isSensitiveAction_(action) {
  // New web-entry admin guard: direct Apps Script editor runs are still available.
  return [
    "setupSheets",
    "testMembershipBadgeEmail",
    "setupCinemanaSheetsExactOrder",
    "fixCinemanaSheetColumns",
    "setReservationTelegramToNewChat",
    "setMembershipTelegramToAyoubChat",
    "setMembershipTelegramConfigToAyoub",
    "getMembershipTelegramConfigStatus",
    "testMembershipTelegramNotification",
    "setAdminBadgeEmailToAyoub",
    "resendMissingMembershipBadgeEmails",
    "resendAllAcceptedMembershipBadgeEmails",
    "getReservations",
    "updateReservationStatus"
  ].includes(action);
}

function signedDecisionToken_(action, decision, reference) {
  // New Telegram safety token: signs decision links without exposing ADMIN_SECRET.
  const secret = getAdminSecret_();
  if (!secret) return "";
  const source = [action, String(decision || "").trim(), normalizeText_(reference)].join("|");
  const signature = Utilities.computeHmacSha256Signature(source, secret);
  return Utilities.base64EncodeWebSafe(signature).replace(/=+$/g, "").slice(0, 48);
}

function isSignedDecisionRequest_(action, payload) {
  const reference = payload && payload.reference;
  const decision = payload && payload.decision;
  const provided = String(payload && (payload.auth || payload.token || payload.signature) || "").trim();
  if (!reference || !decision || !provided) return false;
  return provided === signedDecisionToken_(action, decision, reference);
}

function createScannerToken_() {
  // New scanner session token: short-lived server-side access after PIN login.
  const token = Utilities.getUuid().replace(/-/g, "") + Utilities.getUuid().replace(/-/g, "");
  CacheService.getScriptCache().put(SCANNER_TOKEN_CACHE_PREFIX + token, "1", SCANNER_TOKEN_TTL_SECONDS);
  return token;
}

function isScannerAuthorized_(payload) {
  const token = String(payload && (payload.scanner_token || payload.scannerToken) || "").trim();
  if (!token) return false;
  return CacheService.getScriptCache().get(SCANNER_TOKEN_CACHE_PREFIX + token) === "1";
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

function setupCinemanaSheets() {
  const membershipSheet = getSheet_(MEMBERSHIP_SHEET_NAME, MEMBERSHIP_HEADERS);
  const reservationSheet = getSheet_(RESERVATION_SHEET_NAME, RESERVATION_HEADERS);
  SpreadsheetApp.flush();

  return {
    ok: true,
    message: "CINEMANA sheets are ready.",
    membership_headers: membershipSheet.getRange(1, 1, 1, membershipSheet.getLastColumn()).getValues()[0],
    reservation_headers: reservationSheet.getRange(1, 1, 1, reservationSheet.getLastColumn()).getValues()[0]
  };
}

function setReservationTelegramToNewChat() {
  return {
    ok: false,
    code: "manual_config_required",
    property: "TELEGRAM_CHAT_ID",
    message: "Set TELEGRAM_CHAT_ID in Apps Script Project Settings -> Script Properties."
  };
}

function setMembershipTelegramToAyoubChat() {
  return setMembershipTelegramConfigToAyoub();
}

function setMembershipTelegramConfigToAyoub() {
  return {
    ok: false,
    code: "manual_config_required",
    properties: ["MEMBERSHIP_TELEGRAM_BOT_TOKEN", "MEMBERSHIP_TELEGRAM_CHAT_ID"],
    message: "Set membership Telegram values in Apps Script Project Settings -> Script Properties."
  };
}

function getMembershipTelegramConfigStatus() {
  const token = getMembershipTelegramBotToken_();
  const chatId = getMembershipTelegramChatId_();
  return {
    ok: true,
    configured: Boolean(isMembershipTelegramConfigured_()),
    token_present: Boolean(token),
    token_is_placeholder: token === "YOUR_MEMBERSHIP_TELEGRAM_BOT_TOKEN",
    chat_id_present: Boolean(chatId),
    chat_is_placeholder: chatId === "YOUR_MEMBERSHIP_TELEGRAM_CHAT_ID"
  };
}

function testMembershipTelegramNotification() {
  if (!isMembershipTelegramConfigured_()) {
    return {
      ok: false,
      code: "membership_telegram_missing_config",
      config: getMembershipTelegramConfigStatus()
    };
  }

  try {
    const response = telegramApi_("sendMessage", {
      chat_id: getMembershipTelegramChatId_(),
      text: "CINEMANA membership notifications test: OK",
      parse_mode: "HTML"
    }, getMembershipTelegramBotToken_());

    return {
      ok: true,
      status: "sent",
      message_id: response && response.result ? String(response.result.message_id || "") : ""
    };
  } catch (error) {
    return {
      ok: false,
      code: "telegram_error",
      message: String(error && error.message ? error.message : error)
    };
  }
}

function setAdminBadgeEmailToAyoub() {
  return {
    ok: false,
    code: "manual_config_required",
    property: "ADMIN_EMAIL",
    message: "Set ADMIN_EMAIL in Apps Script Project Settings -> Script Properties."
  };
}

function testMembershipBadgeEmail() {
  const adminEmail = getAdminBadgeEmail_();
  if (!adminEmail) {
    return {
      ok: false,
      code: "missing_admin_email",
      message: "Set ADMIN_EMAIL in Apps Script Project Settings -> Script Properties."
    };
  }

  const testMember = {
    reference: `CIN-TEST-${new Date().getFullYear()}`,
    firstName: "Admin",
    lastName: "Test CINEMANA",
    fullName: "Admin Test CINEMANA",
    birthday: "2000-01-01",
    city: "Tanger",
    phone: "0600000000",
    email: adminEmail,
    profession: "Test badge",
    heard_about_us: "Test manuel Apps Script"
  };

  return {
    ok: true,
    status: sendMembershipBadgeAdminEmail_(testMember, adminEmail),
    message: "Test badge e-mail sent without changing the real admin badge e-mail setting."
  };
}

function setupCinemanaSheetsExactOrder() {
  const result = fixCinemanaSheetColumns();
  formatExistingCinemanaSheetRows_();
  return Object.assign({}, result, {
    rows_formatted: true,
    message: "Sheets columns and existing status rows are aligned with the CINEMANA layout."
  });
}

function fixCinemanaSheetColumns() {
  const spreadsheetId = typeof SPREADSHEET_ID !== "undefined"
    ? SPREADSHEET_ID
    : "1b3ZW4esFw0SqFwSw0HwMbtiadsNfYVJ0QdtzWDLGEIU";
  const membershipHeaders = [
    "References",
    "Prénom",
    "Nom",
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
  const reservationHeaders = [
    "References",
    "Event",
    "Event id",
    "Prénom",
    "Nom",
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

  function normalizeHeaderLocal(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "");
  }

  function splitFullNameLocal(fullName) {
    const parts = String(fullName || "").trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return { first: "", last: "" };
    return {
      first: parts[0],
      last: parts.slice(1).join(" ")
    };
  }

  function valueForHeader(row, existing, normalizedExisting, header) {
    const normalizedHeader = normalizeHeaderLocal(header);
    const directIndex = normalizedExisting.indexOf(normalizedHeader);
    let value = directIndex >= 0 ? row[directIndex] : "";

    const fullNameIndex = normalizedExisting.indexOf("nomcomplet");
    const fullName = fullNameIndex >= 0 ? String(row[fullNameIndex] || "").trim() : "";
    if (!value && fullName && (normalizedHeader === "prenom" || normalizedHeader === "nom")) {
      const split = splitFullNameLocal(fullName);
      value = normalizedHeader === "prenom" ? split.first : split.last;
    }

    return value;
  }

  function syncColumns(sheetName, headers) {
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
    const lastRow = sheet.getLastRow();
    const lastColumn = sheet.getLastColumn();

    if (lastRow === 0 || lastColumn === 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.setFrozenRows(1);
      return headers;
    }

    const width = Math.max(lastColumn, headers.length);
    const existing = sheet.getRange(1, 1, 1, width).getValues()[0];
    const normalizedExisting = existing.map(normalizeHeaderLocal);
    const rows = lastRow > 1 ? sheet.getRange(2, 1, lastRow - 1, width).getValues() : [];
    const nextRows = rows.map((row) => headers.map((header) => valueForHeader(row, existing, normalizedExisting, header)));

    sheet.getRange(1, 1, Math.max(lastRow, 1), width).clearContent();
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    if (nextRows.length) sheet.getRange(2, 1, nextRows.length, headers.length).setValues(nextRows);

    sheet.setFrozenRows(1);
    return sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  }

  const membershipResult = syncColumns("membership", membershipHeaders);
  const reservationResult = syncColumns("reservation", reservationHeaders);
  SpreadsheetApp.flush();

  return {
    ok: true,
    membership_headers: membershipResult,
    reservation_headers: reservationResult
  };
}

function formatExistingCinemanaSheetRows_() {
  const membershipSheet = getSheet_(MEMBERSHIP_SHEET_NAME, MEMBERSHIP_HEADERS);
  const membershipMap = headerMap_(membershipSheet);
  getRows_(membershipSheet).forEach((row, index) => {
    const member = rowObject_(row, membershipMap);
    if (!member.reference && !member.email) return;
    formatMembershipStatus_(membershipSheet, index + 2, member.status);
  });

  const reservationSheet = getSheet_(RESERVATION_SHEET_NAME, RESERVATION_HEADERS);
  const reservationMap = headerMap_(reservationSheet);
  getRows_(reservationSheet).forEach((row, index) => {
    const reservation = reservationPayloadFromRow_(row, reservationMap);
    if (!reservation.reference && !reservation.email) return;
    formatReservationStatus_(reservationSheet, index + 2, reservation.status);
    formatMemberMark_(reservationSheet, index + 2, reservation.member_mark === "✓");
  });

  SpreadsheetApp.flush();
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

function combineNameParts_(firstName, lastName) {
  return [firstName, lastName]
    .map((value) => String(value || "").trim())
    .filter(Boolean)
    .join(" ");
}

function splitFullNameParts_(fullName) {
  const parts = String(fullName || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length <= 1) {
    return { firstName: parts[0] || "", lastName: "" };
  }
  return {
    firstName: parts.slice(0, -1).join(" "),
    lastName: parts[parts.length - 1]
  };
}

function formatDateForEmail_(value) {
  if (!value) return "";
  if (Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value.getTime())) {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }
  const text = String(value || "").trim();
  const isoMatch = text.match(/\d{4}-\d{2}-\d{2}/);
  if (isoMatch) return isoMatch[0];
  return text;
}

function memberDisplayName_(member) {
  return combineNameParts_(member && member.firstName, member && member.lastName) ||
    String(member && (member.fullName || member.full_name || member.name) || "").trim();
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

  let firstName = String(get("Prénom") || "").trim();
  let lastName = String(get("Nom") || "").trim();
  const legacyFullName = String(get("Nom complet") || get("Full name") || get("full_name") || "").trim();
  if ((!firstName || !lastName) && legacyFullName) {
    const splitName = splitFullNameParts_(legacyFullName);
    if (!firstName) firstName = splitName.firstName;
    if (!lastName) lastName = splitName.lastName;
  }
  const fullName = combineNameParts_(firstName, lastName) || legacyFullName;

  return {
    reference: String(get("References") || "").trim(),
    firstName,
    lastName,
    fullName,
    city: String(get("ville") || "").trim(),
    birthday: get("Date de naissance"),
    phone: String(get("Téléphone") || "").trim(),
    email: String(get("E-mail") || "").trim(),
    profession: String(get("Fonction") || "").trim(),
    heard_about_us: String(get("Comment as-tu connu CINEMANA?") || "").trim(),
    status: normalizeMembershipStatus_(get("Statu")),
    email_status: String(get("Email status") || "").trim(),
    telegram_chat_id: String(get("Telegram chat") || "").trim(),
    telegram_message_id: String(get("Telegram message") || "").trim(),
    // Image links stored after Drive upload (used in approve/reject Telegram notifications)
    profile_picture_url: String(get("Photo de profil") || "").trim(),
    profile_picture_file_id: String(get("Photo de profil file id") || "").trim(),
    receipt_url: String(get("Recu paiement") || "").trim(),
    receipt_file_id: String(get("Recu paiement file id") || "").trim()
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
      first_name: result.member.firstName,
      last_name: result.member.lastName,
      full_name: result.member.fullName,
      email: result.member.email,
      phone: result.member.phone,
      profession: result.member.profession
    }
  };
}

function findMemberForDashboard_(payload) {
  const sheet = getSheet_(MEMBERSHIP_SHEET_NAME, MEMBERSHIP_HEADERS);
  const map = headerMap_(sheet);
  const rows = getRows_(sheet);
  const email = normalizeEmail_(payload.email);
  const reference = normalizeText_(payload.reference_code || payload.reference || payload.member_reference);

  for (let i = 0; i < rows.length; i += 1) {
    const member = rowObject_(rows[i], map);
    const emailMatches = email && normalizeEmail_(member.email) === email;
    const referenceMatches = reference && normalizeText_(member.reference) === reference;
    if (emailMatches || referenceMatches) return member;
  }
  return null;
}

function getMemberDashboard_(payload) {
  const email = normalizeEmail_(payload.email);
  const reference = normalizeText_(payload.reference_code || payload.reference || payload.member_reference);
  if (!email && !reference) return { ok: false, code: "missing_fields" };

  const member = findMemberForDashboard_(payload);
  if (!member) return { ok: false, code: "member_not_found" };

  const reservationSheet = getSheet_(RESERVATION_SHEET_NAME, RESERVATION_HEADERS);
  const reservationMap = headerMap_(reservationSheet);
  const rows = getRows_(reservationSheet);
  const memberEmail = normalizeEmail_(member.email);
  const memberReference = normalizeText_(member.reference);
  const reservations = [];

  rows.forEach((row) => {
    const reservation = reservationPayloadFromRow_(row, reservationMap);
    const emailMatches = memberEmail && normalizeEmail_(reservation.email) === memberEmail;
    const referenceMatches = memberReference && normalizeText_(reservation.member_reference) === memberReference;
    if (!emailMatches && !referenceMatches) return;

    reservations.push({
      reference: reservation.reference,
      event_title: reservation.event_title,
      event_id: reservation.event_id,
      full_name: reservation.full_name,
      email: reservation.email,
      phone: reservation.phone,
      seat: reservation.seat,
      status: reservation.status,
      created_at: reservation.created_at,
      member_reference: reservation.member_reference,
      email_status: reservation.email_status
    });
  });

  return {
    ok: true,
    member: {
      reference: member.reference,
      reference_code: member.reference,
      first_name: member.firstName,
      last_name: member.lastName,
      full_name: member.fullName,
      fullName: member.fullName,
      birthday: member.birthday,
      city: member.city,
      phone: member.phone,
      email: member.email,
      profession: member.profession,
      heard_about_us: member.heard_about_us,
      status: member.status
    },
    reservations: reservations.reverse()
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

// ─────────────────────────────────────────────────────────────────────────────
// Membership photo uploads (profile picture + payment receipt)
// Files are stored in a dedicated Drive folder, shared as "anyone with the
// link can view", and the resulting links are written into the sheet.
// Added 2026-06-30.
// ─────────────────────────────────────────────────────────────────────────────
function getOrCreateMembershipUploadsFolder_() {
  const props = PropertiesService.getScriptProperties();
  const cachedId = props.getProperty("MEMBERSHIP_UPLOADS_FOLDER_ID");
  if (cachedId) {
    try {
      return DriveApp.getFolderById(cachedId);
    } catch (error) {
      // The stored folder id is no longer valid (deleted/moved) — fall through and recreate it.
    }
  }
  const folderName = "CINEMANA - Membership Uploads";
  const existing = DriveApp.getFoldersByName(folderName);
  const folder = existing.hasNext() ? existing.next() : DriveApp.createFolder(folderName);
  props.setProperty("MEMBERSHIP_UPLOADS_FOLDER_ID", folder.getId());
  return folder;
}

function saveMemberImageToDrive_(imageData, fullName, referenceCode, label) {
  if (!imageData || !imageData.base64) return null;
  try {
    const folder = label === "profil" ? getOrCreateMemberProfilesFolder_() : getOrCreatePaymentReceiptsFolder_();
    const bytes = Utilities.base64Decode(imageData.base64);
    const mimeType = imageData.mime_type || "image/jpeg";
    const extension = fileExtensionFromImageData_(imageData);
    const safeName = sanitizeFileNamePart_(fullName) || sanitizeFileNamePart_(referenceCode) || "Sans nom";
    const suffix = label === "profil" ? "" : "-receipt";
    const fileName = `${safeName} (${referenceCode})${suffix}.${extension}`;
    const blob = Utilities.newBlob(bytes,mimeType,fileName);
    const file=folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW);
    return {file_id:file.getId(),url:`https://drive.google.com/uc?export=view&id=${file.getId()}`,blob:blob};
  } catch(error){
    return {error:String(error&&error.message||error)};
  }
}

function telegramSendMultipart_(method, fields, botToken) {
  const token = botToken || getTelegramBotToken_();
  const url = `https://api.telegram.org/bot${token}/${method}`;
  const response = UrlFetchApp.fetch(url, {
    method: "post",
    payload: fields,
    muteHttpExceptions: true
  });
  const code = response.getResponseCode();
  if (code < 200 || code >= 300) {
    throw new Error(`telegram_${method}_${code}: ${response.getContentText()}`);
  }
  try {
    return JSON.parse(response.getContentText());
  } catch (error) {
    return { ok: true };
  }
}

function sendTelegramMembershipPhotos_(profileUpload, receiptUpload, payload, reference) {
  if (!isMembershipTelegramConfigured_()) return;

  const captionName = escapeHtml_(payload.full_name || payload.fullName || "");
  const hasProfile = Boolean(profileUpload && profileUpload.blob);
  const hasReceipt = Boolean(receiptUpload && receiptUpload.blob);
  if (!hasProfile && !hasReceipt) return;

  try {
    if (hasProfile && hasReceipt) {
      const media = [
        { type: "photo", media: "attach://profile_photo", caption: `📷 Photo de profil — ${captionName} (${escapeHtml_(reference)})`, parse_mode: "HTML" },
        { type: "photo", media: "attach://receipt_photo", caption: `🧾 Reçu de paiement — ${escapeHtml_(reference)}`, parse_mode: "HTML" }
      ];
      telegramSendMultipart_("sendMediaGroup", {
        chat_id: getMembershipTelegramChatId_(),
        media: JSON.stringify(media),
        profile_photo: profileUpload.blob,
        receipt_photo: receiptUpload.blob
      }, getMembershipTelegramBotToken_());
    } else if (hasProfile) {
      telegramSendMultipart_("sendPhoto", {
        chat_id: getMembershipTelegramChatId_(),
        caption: `📷 Photo de profil — ${captionName} (${escapeHtml_(reference)})`,
        parse_mode: "HTML",
        photo: profileUpload.blob
      }, getMembershipTelegramBotToken_());
    } else if (hasReceipt) {
      telegramSendMultipart_("sendPhoto", {
        chat_id: getMembershipTelegramChatId_(),
        caption: `🧾 Reçu de paiement — ${captionName} (${escapeHtml_(reference)})`,
        parse_mode: "HTML",
        photo: receiptUpload.blob
      }, getMembershipTelegramBotToken_());
    }
  } catch (error) {
    // Photo delivery is best-effort; the text notification, email and sheet row are already saved.
  }
}

// New 2026-07-01: previously a Drive upload failure (e.g. missing/expired Drive
// permission scope after a code update) was completely silent — no error in the
// sheet, no Telegram photo, nothing. This sends an explicit admin alert so a
// failure is never invisible again.
function sendMembershipPhotoUploadAlert_(payload, reference, profileUpload, receiptUpload) {
  if (!isMembershipTelegramConfigured_()) return;
  try {
    const lines = [
      `⚠️ <b>Échec de l'envoi d'une photo — adhésion ${escapeHtml_(reference)}</b>`,
      `<b>Nom :</b> ${escapeHtml_(payload.full_name || payload.fullName || "-")}`
    ];
    if (profileUpload && profileUpload.error) {
      lines.push(`Photo de profil : ${escapeHtml_(profileUpload.error)}`);
    }
    if (receiptUpload && receiptUpload.error) {
      lines.push(`Reçu de paiement : ${escapeHtml_(receiptUpload.error)}`);
    }
    lines.push("", "Vérifiez que le script Apps Script a bien l'autorisation Google Drive (réautorisez et redéployez si besoin).");
    telegramApi_("sendMessage", {
      chat_id: getMembershipTelegramChatId_(),
      text: lines.join("\n"),
      parse_mode: "HTML"
    }, getMembershipTelegramBotToken_());
  } catch (error) {
    // Best-effort alert; nothing else to do if even this fails.
  }
}

function saveMembership_(payload) {
  payload.full_name = payload.full_name || combineNameParts_(payload.first_name, payload.last_name);
  const required = ["reference_code", "first_name", "last_name", "full_name", "birthday", "city", "phone", "email", "profession", "heard_about_us"];
  if (required.some((key) => !payload[key])) return { ok: false, code: "missing_fields" };

  const profileUpload = saveMemberImageToDrive_(payload.profile_picture, payload.full_name, payload.reference_code, "profil");
  const receiptUpload = saveMemberImageToDrive_(payload.payment_receipt, payload.full_name, payload.reference_code, "recu");

  const sheet = getSheet_(MEMBERSHIP_SHEET_NAME, MEMBERSHIP_HEADERS);
  const map = headerMap_(sheet);
  const rows = getRows_(sheet);
  const existingRow = rows.findIndex((row) => {
    const reference = row[map[normalizeHeader_("References")] - 1];
    return normalizeText_(reference) === normalizeText_(payload.reference_code);
  });
  const valuesByHeader = {
    "References": payload.reference_code,
    "Prénom": payload.first_name,
    "Nom": payload.last_name,
    "ville": payload.city,
    "Date de naissance": payload.birthday,
    "Téléphone": payload.phone,
    "E-mail": payload.email,
    "Fonction": payload.profession,
    "Comment as-tu connu CINEMANA?": payload.heard_about_us,
    "Photo de profil": profileUpload && profileUpload.url ? profileUpload.url : "",
    "Photo de profil file id": profileUpload && profileUpload.file_id ? profileUpload.file_id : "",
    "Recu paiement": receiptUpload && receiptUpload.url ? receiptUpload.url : "",
    "Recu paiement file id": receiptUpload && receiptUpload.file_id ? receiptUpload.file_id : "",
    "Statu": "pending",
    "Created at": new Date(),
    "Email status": "pending",
    "Photo upload error": [
      profileUpload && profileUpload.error ? `profil: ${profileUpload.error}` : "",
      receiptUpload && receiptUpload.error ? `recu: ${receiptUpload.error}` : ""
    ].filter(Boolean).join(" | ")
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

  const telegramResult = sendTelegramMembershipNotification_(payload, payload.reference_code);
  const telegramStatus = typeof telegramResult === "string" ? telegramResult : telegramResult.status;
  if (emailStatusColumn) sheet.getRange(savedRow, emailStatusColumn).setValue(`${emailStatus}; telegram: ${telegramStatus}`);
  if (telegramResult && typeof telegramResult === "object") {
    const telegramChatColumn = latestMap[normalizeHeader_("Telegram chat")];
    const telegramMessageColumn = latestMap[normalizeHeader_("Telegram message")];
    if (telegramChatColumn) sheet.getRange(savedRow, telegramChatColumn).setValue(telegramResult.chat_id);
    if (telegramMessageColumn) sheet.getRange(savedRow, telegramMessageColumn).setValue(telegramResult.message_id);
  }

  sendTelegramMembershipPhotos_(profileUpload, receiptUpload, payload, payload.reference_code);

  if ((profileUpload && profileUpload.error) || (receiptUpload && receiptUpload.error)) {
    sendMembershipPhotoUploadAlert_(payload, payload.reference_code, profileUpload, receiptUpload);
  }

  return {
    ok: true,
    reference: payload.reference_code,
    status: "pending",
    email_status: emailStatus,
    telegram_status: telegramStatus,
    profile_picture_url: profileUpload && profileUpload.url ? profileUpload.url : "",
    payment_receipt_url: receiptUpload && receiptUpload.url ? receiptUpload.url : ""
  };
}

function getReservationEventKey_(payload) {
  const eventId = normalizeText_(payload && (payload.event_id || payload.eventId));
  if (eventId) return eventId;
  return normalizeText_(payload && (payload.event_title || payload.eventTitle || payload.event));
}

function reservationRowEventKey_(row, map) {
  const eventIdColumn = map[normalizeHeader_("Event id")];
  const eventColumn = map[normalizeHeader_("Event")];
  const eventId = eventIdColumn ? normalizeText_(row[eventIdColumn - 1]) : "";
  if (eventId) return eventId;
  return eventColumn ? normalizeText_(row[eventColumn - 1]) : "";
}

function reservationRowMatchesEvent_(row, map, payload) {
  const target = getReservationEventKey_(payload);
  if (!target) return true;                  // No event filter requested → match all
  const rowEvent = reservationRowEventKey_(row, map);
  if (!rowEvent) return false;               // Row has no event_id → never bleeds into another event
  return rowEvent === target;
}

function getReservedSeats_(payload) {
  const isJbelMoussa = normalizeText_(payload && (payload.event_id || payload.eventId)) === JBEL_MOUSSA_EVENT_ID;

  if (isJbelMoussa) {
    // Read directly from the dedicated Jbel Moussa sheet.
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const jSheet = ss.getSheetByName(JBEL_MOUSSA_SHEET_NAME);
    const seatStatuses = CINEMANA_BLOCKED_SEATS.map(function(seat) { return { seat: seat, status: "confirmed" }; });
    if (!jSheet || jSheet.getLastRow() < 2) {
      return { ok: true, seats: seatStatuses.map(function(e) { return e.seat; }), seat_statuses: seatStatuses };
    }
    const jMap = headerMap_(jSheet);
    const seatCol   = jMap[normalizeHeader_("Siège")];
    const statusCol = jMap[normalizeHeader_("Statut")];
    const rows = getRows_(jSheet);
    rows.forEach(function(row) {
      const seat   = String(row[seatCol - 1] || "").trim().toUpperCase();
      if (!seat || CINEMANA_BLOCKED_SEATS.indexOf(seat) !== -1) return;
      const status = normalizeReservationStatus_(statusCol ? row[statusCol - 1] : "");
      if (status === "confirmed" || status === "pending") {
        seatStatuses.push({ seat, status });
      }
    });
    return { ok: true, seats: seatStatuses.map(function(e) { return e.seat; }), seat_statuses: seatStatuses };
  }

  // Default: main reservation sheet (other events).
  const sheet = getSheet_(RESERVATION_SHEET_NAME, RESERVATION_HEADERS);
  const map = headerMap_(sheet);
  const seatColumn = map[normalizeHeader_("Seat")];
  const statusColumn = map[normalizeHeader_("Statu")];
  const rows = getRows_(sheet);
  const seatStatuses = CINEMANA_BLOCKED_SEATS.map(function(seat) { return { seat: seat, status: "confirmed" }; });

  rows.forEach((row) => {
    if (!reservationRowMatchesEvent_(row, map, payload)) return;
    const seat = String(row[seatColumn - 1] || "").trim().toUpperCase();
    if (!seat || CINEMANA_BLOCKED_SEATS.indexOf(seat) !== -1) return;
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

function findActiveReservationByMemberReference_(memberReference, eventId) {
  // Search the appropriate sheet based on event.
  const isJbelMoussa = normalizeText_(eventId) === JBEL_MOUSSA_EVENT_ID;
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = isJbelMoussa
    ? ss.getSheetByName(JBEL_MOUSSA_SHEET_NAME)
    : getSheet_(RESERVATION_SHEET_NAME, RESERVATION_HEADERS);
  if (!sheet) return null;

  const map = headerMap_(sheet);
  const codeColumn   = map[normalizeHeader_(isJbelMoussa ? "Code membre" : "Code membre")];
  const statusColumn = map[normalizeHeader_(isJbelMoussa ? "Statut" : "Statu")];
  if (!codeColumn) return null;

  const target = normalizeText_(memberReference);
  const rows = getRows_(sheet);
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    const code   = normalizeText_(row[codeColumn - 1]);
    const status = statusColumn ? row[statusColumn - 1] : "";
    if (code && code === target && isActiveReservationStatus_(status)) {
      return { rowNumber: i + 2, row };
    }
  }
  return null;
}

function findActiveReservationDuplicate_(payload) {
  const isJbelMoussa = normalizeText_(payload.event_id) === JBEL_MOUSSA_EVENT_ID;
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = isJbelMoussa
    ? ss.getSheetByName(JBEL_MOUSSA_SHEET_NAME)
    : getSheet_(RESERVATION_SHEET_NAME, RESERVATION_HEADERS);
  if (!sheet) return null;

  const map = headerMap_(sheet);
  const emailColumn  = map[normalizeHeader_(isJbelMoussa ? "E-mail"        : "E-mail")];
  const phoneColumn  = map[normalizeHeader_(isJbelMoussa ? "Tel / WhatsApp" : "Tel WhatsApp")];
  const statusColumn = map[normalizeHeader_(isJbelMoussa ? "Statut"         : "Statu")];
  const targetEmail  = normalizeEmail_(payload.email);
  const targetPhone  = payload.whatsapp || payload.phone;
  const rows = getRows_(sheet);

  for (let i = 0; i < rows.length; i += 1) {
    const row    = rows[i];
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
    payload.full_name = payload.full_name || combineNameParts_(payload.first_name, payload.last_name);
    payload.event_title = payload.event_title || payload.event || "";
    payload.event_id = payload.event_id || payload.eventId || getReservationEventKey_(payload);
    const required = ["type", "first_name", "last_name", "full_name", "phone", "email", "seat"];
    if (required.some((key) => !payload[key])) return { ok: false, code: "missing_fields" };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail_(payload.email))) return { ok: false, code: "invalid_email" };

    const seat = String(payload.seat || "").trim().toUpperCase();
    if (CINEMANA_BLOCKED_SEATS.indexOf(seat) !== -1) {
      return { ok: false, code: "seat_blocked" };
    }
    const activeSeats = getReservedSeats_(payload);
    if (activeSeats.seats.includes(seat)) {
      return { ok: false, code: "seat_taken", seats: activeSeats.seats, seat_statuses: activeSeats.seat_statuses };
    }

    let member = null;
    let isMember = false;
    if (payload.type === "member") {
      const verification = verifyMemberPayload_(payload);
      if (!verification.ok) return verification;
      if (findActiveReservationByMemberReference_(payload.member_reference, payload.event_id)) {
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

    // Route to the dedicated Jbel Moussa sheet when the event matches,
    // otherwise fall back to the main reservation sheet.
    const isJbelMoussa = normalizeText_(payload.event_id) === JBEL_MOUSSA_EVENT_ID;
    const sheet = isJbelMoussa
      ? (SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(JBEL_MOUSSA_SHEET_NAME)
         || (setupJbelMoussaSheet(), SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(JBEL_MOUSSA_SHEET_NAME)))
      : getSheet_(RESERVATION_SHEET_NAME, RESERVATION_HEADERS);

    const valuesByHeader = isJbelMoussa ? {
      // Columns matching JBEL_MOUSSA_HEADERS
      "Références":                           reference,
      "Événement":                            payload.event_title || "Le Mont Moussa",
      "Event ID":                             payload.event_id,
      "Date":                                 payload.event_date  || "Dimanche 28 juin 2026",
      "Heure":                                payload.event_time  || "19:00",
      "Lieu":                                 payload.event_venue || "Palais de la Culture Malabata - Tanger",
      "Prénom":                               payload.first_name,
      "Nom":                                  payload.last_name,
      "Tel / WhatsApp":                       payload.whatsapp || payload.phone,
      "E-mail":                               payload.email,
      "Âge":                                  payload.type === "member" ? "" : payload.age,
      "Fonction":                             payload.type === "member" ? (member && member.profession ? member.profession : payload.profession) : payload.profession,
      "Comment as-tu su pour la projection ?": payload.type === "member" ? `Réservation membre${payload.event_title ? " - " + payload.event_title : ""}` : payload.source,
      "Siège":                                seat,
      "Membre (oui/non)":                     isMember ? "Oui" : "Non",
      "Code membre":                          payload.type === "member" ? payload.member_reference : "",
      "Statut":                               status,
      "Présence":                             "",
      "Créé le":                              new Date().toISOString(),
      "Statut e-mail":                        status === "confirmed" ? "pending" : "waiting confirmation",
      "Chat Telegram":                        "",
      "Message Telegram":                     ""
    } : {
      "References": reference,
      "Event": payload.event_title,
      "Event id": payload.event_id,
      "Prénom": payload.first_name,
      "Nom": payload.last_name,
      "Tel WhatsApp": payload.whatsapp || payload.phone,
      "E-mail": payload.email,
      "Âge": payload.type === "member" ? "" : payload.age,
      "Fonction": payload.type === "member" ? (member && member.profession ? member.profession : payload.profession) : payload.profession,
      "Comment as-tu su pour la projection?": payload.type === "member" ? `Réservation membre${payload.event_title ? " - " + payload.event_title : ""}` : payload.source,
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
    const emailStatusColName    = isJbelMoussa ? "Statut e-mail"     : "Email status";
    const telegramChatColName   = isJbelMoussa ? "Chat Telegram"     : "Telegram chat";
    const telegramMsgColName    = isJbelMoussa ? "Message Telegram"  : "Telegram message";
    const emailStatusColumn = map[normalizeHeader_(emailStatusColName)];
    if (emailStatusColumn) sheet.getRange(appendedRow, emailStatusColumn).setValue(emailStatus);
    if (telegramResult && typeof telegramResult === "object") {
      const telegramChatColumn    = map[normalizeHeader_(telegramChatColName)];
      const telegramMessageColumn = map[normalizeHeader_(telegramMsgColName)];
      if (telegramChatColumn)    sheet.getRange(appendedRow, telegramChatColumn).setValue(telegramResult.chat_id);
      if (telegramMessageColumn) sheet.getRange(appendedRow, telegramMessageColumn).setValue(telegramResult.message_id);
    }

    return {
      ok: true,
      reference: status === "confirmed" ? reference : "",
      event_title: payload.event_title,
      event_id: payload.event_id,
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
  if (["attended", "present", "presence", "présence", "checkedin", "checked in", "حضر"].includes(status)) return "attended";
  if (["canceled", "cancelled", "annule", "annulee", "annulé", "annulée", "رفض", "ملغي"].includes(status)) return "canceled";
  return status;
}

function formatReservationStatus_(sheet, row, status) {
  const map = headerMap_(sheet);
  const column = map[normalizeHeader_("Statu")];
  if (!column) return;

  const normalized = normalizeReservationStatus_(status);
  const display = normalized === "confirmed" ? "confirmé" : normalized === "canceled" ? "annulé" : normalized === "attended" ? "présence" : normalized;
  const isGreen = normalized === "confirmed" || normalized === "attended";
  const color = isGreen ? "#0f8a3b" : normalized === "pending" ? "#d9822b" : "#c62828";
  const background = isGreen ? "#d9f2df" : normalized === "pending" ? "#fff0d6" : "#fde0df";

  sheet.getRange(row, column)
    .setValue(display)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setFontColor(color)
    .setBackground(background);
}

function findReservationByReference_(reference) {
  const target = normalizeText_(reference);

  // 1 — Search dedicated event sheets first (most recent events).
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const jSheet = ss.getSheetByName(JBEL_MOUSSA_SHEET_NAME);
  if (jSheet && jSheet.getLastRow() >= 2) {
    const jMap  = headerMap_(jSheet);
    const jRefCol = jMap[normalizeHeader_("Références")];
    if (jRefCol) {
      const jRows = getRows_(jSheet);
      for (let i = 0; i < jRows.length; i++) {
        if (normalizeText_(jRows[i][jRefCol - 1]) === target) {
          // Normalize to a standard reservation payload so callers work unchanged.
          const res = reservationPayloadFromJbelMoussaRow_(jRows[i], jMap);
          return { sheet: jSheet, map: jMap, rowNumber: i + 2, row: jRows[i], reservation: res, isJbelMoussa: true };
        }
      }
    }
  }

  // 2 — Fall back to main reservation sheet.
  const sheet = getSheet_(RESERVATION_SHEET_NAME, RESERVATION_HEADERS);
  const map = headerMap_(sheet);
  const referenceColumn = map[normalizeHeader_("References")];
  const rows = getRows_(sheet);

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

// Maps a Jbel Moussa sheet row to the standard reservation payload shape.
function reservationPayloadFromJbelMoussaRow_(row, map) {
  function col(header) {
    const c = map[normalizeHeader_(header)];
    return c ? String(row[c - 1] || "").trim() : "";
  }
  const firstName = col("Prénom");
  const lastName  = col("Nom");
  return {
    reference:      col("Références"),
    event_title:    col("Événement"),
    event_id:       col("Event ID"),
    event_date:     col("Date"),
    event_time:     col("Heure"),
    event_venue:    col("Lieu"),
    first_name:     firstName,
    last_name:      lastName,
    full_name:      (firstName + " " + lastName).trim(),
    phone:          col("Tel / WhatsApp"),
    whatsapp:       col("Tel / WhatsApp"),
    email:          col("E-mail"),
    age:            col("Âge"),
    profession:     col("Fonction"),
    source:         col("Comment as-tu su pour la projection ?"),
    seat:           col("Siège"),
    member_mark:    col("Membre (oui/non)") === "Oui" ? "✓" : "✗",
    member_reference: col("Code membre"),
    status:         normalizeReservationStatus_(col("Statut")),
    created_at:     col("Créé le"),
    email_status:   col("Statut e-mail"),
    telegram_chat:      col("Chat Telegram"),
    telegram_chat_id:   col("Chat Telegram"),
    telegram_message:   col("Message Telegram"),
    telegram_message_id: col("Message Telegram")
  };
}

function ticketReferenceFromPayload_(payload) {
  const rawReference = String(payload.reference || payload.ticket || payload.code || "").trim();
  const match = rawReference.toUpperCase().match(/RES-\d{4}-[A-Z0-9]+/);
  return match ? match[0] : rawReference;
}

function publicTicketStatus_(ticket) {
  return {
    reference: ticket.reference,
    status: ticket.status,
    seat: ticket.seat,
    event_title: ticket.event_title,
    event_id: ticket.event_id
  };
}

function getTicketStatus_(payload) {
  // New public ticket status endpoint: returns only safe, non-private fields.
  const reference = ticketReferenceFromPayload_(payload);
  if (!reference) {
    return {
      success: false,
      ok: false,
      code: "missing_reference",
      error: "Ticket not found",
      message: "Ticket not found"
    };
  }

  const found = findReservationByReference_(reference);
  if (!found) {
    return {
      success: false,
      ok: false,
      code: "reference_not_found",
      reference,
      status: "not_found",
      error: "Ticket not found",
      message: "Ticket not found"
    };
  }

  return {
    success: true,
    ok: true,
    data: publicTicketStatus_(found.reservation),
    ticket: publicTicketStatus_(found.reservation)
  };
}

function scannerLogin_(payload) {
  // New scanner login endpoint: validates SCANNER_PIN from Script Properties.
  const expectedPin = getConfigValue("SCANNER_PIN");
  const providedPin = String(payload && (payload.pin || payload.password || payload.scanner_pin) || "").trim();
  if (!expectedPin || providedPin !== expectedPin) return unauthorizedResponse_();

  const token = createScannerToken_();
  return {
    success: true,
    ok: true,
    scanner_token: token,
    expires_in: SCANNER_TOKEN_TTL_SECONDS
  };
}

function verifyTicket_(payload) {
  const reference = ticketReferenceFromPayload_(payload);
  if (!reference) {
    return {
      ok: false,
      code: "missing_reference",
      status: "not_found",
      message: "Reference ticket obligatoire."
    };
  }

  const found = findReservationByReference_(reference);
  if (!found) {
    return {
      ok: false,
      code: "reference_not_found",
      reference,
      status: "not_found",
      message: "Ticket introuvable."
    };
  }

  // Mark presence (✓ + timestamp) on whichever sheet holds this ticket.
  markPresenceOnSheet_(found, reference);

  const ticket = found.reservation;
  return {
    ok: true,
    reference: ticket.reference,
    status: ticket.status,
    ticket: {
      reference: ticket.reference,
      event_title: ticket.event_title,
      event_id: ticket.event_id,
      first_name: ticket.first_name,
      last_name: ticket.last_name,
      full_name: ticket.full_name,
      phone: ticket.phone || ticket.whatsapp,
      whatsapp: ticket.whatsapp,
      email: ticket.email,
      age: ticket.age,
      profession: ticket.profession,
      source: ticket.source,
      seat: ticket.seat,
      member: ticket.member_mark === "✓",
      member_mark: ticket.member_mark,
      member_reference: ticket.member_reference,
      status: ticket.status,
      created_at: formatDateTimeForApi_(ticket.created_at),
      email_status: ticket.email_status,
      row_number: found.rowNumber
    }
  };
}

function formatDateTimeForApi_(value) {
  if (!value) return "";
  if (Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value.getTime())) {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm");
  }
  return String(value || "").trim();
}

function reservationPayloadFromRow_(row, map) {
  function get(header) {
    const index = map[normalizeHeader_(header)];
    return index ? row[index - 1] : "";
  }

  const firstName = String(get("Prénom") || "").trim();
  const lastName = String(get("Nom") || "").trim();
  const fullName = combineNameParts_(firstName, lastName);

  return {
    reference: String(get("References") || "").trim(),
    event_title: String(get("Event") || "").trim(),
    event_id: String(get("Event id") || "").trim(),
    first_name: firstName,
    last_name: lastName,
    full_name: fullName,
    whatsapp: String(get("Tel WhatsApp") || "").trim(),
    phone: String(get("Tel WhatsApp") || "").trim(),
    email: String(get("E-mail") || "").trim(),
    age: String(get("Âge") || "").trim(),
    profession: String(get("Fonction") || "").trim(),
    source: String(get("Comment as-tu su pour la projection?") || "").trim(),
    seat: String(get("Seat") || "").trim().toUpperCase(),
    member_mark: String(get("member ou non") || "").trim(),
    created_at: get("Created at") || "",
    email_status: String(get("Email status") || "").trim(),
    status: normalizeReservationStatus_(get("Statu")),
    member_reference: String(get("Code membre") || "").trim(),
    telegram_chat_id: String(get("Telegram chat") || "").trim(),
    telegram_message_id: String(get("Telegram message") || "").trim()
  };
}

function adminReservationPayload_(reservation) {
  // New admin dashboard shape: includes operational fields but omits Telegram metadata.
  return {
    reference: reservation.reference,
    event_title: reservation.event_title,
    event_id: reservation.event_id,
    name: reservation.full_name,
    first_name: reservation.first_name,
    last_name: reservation.last_name,
    age: reservation.age,
    profession: reservation.profession,
    phone: reservation.phone || reservation.whatsapp,
    email: reservation.email,
    seat: reservation.seat,
    status: reservation.status,
    created_at: formatDateTimeForApi_(reservation.created_at),
    member_reference: reservation.member_reference,
    member: reservation.member_mark === "âœ“"
  };
}

function getReservations_() {
  // New protected admin endpoint: lists all reservations for dashboard management.
  const sheet = getSheet_(RESERVATION_SHEET_NAME, RESERVATION_HEADERS);
  const map = headerMap_(sheet);
  const data = getRows_(sheet)
    .map((row) => adminReservationPayload_(reservationPayloadFromRow_(row, map)))
    .filter((reservation) => reservation.reference || reservation.email)
    .reverse();

  return {
    success: true,
    ok: true,
    data
  };
}

function updateReservationStatus_(payload) {
  // New protected admin endpoint: approves/cancels or marks operational statuses.
  const reference = String(payload.reference || "").trim();
  const requested = String(payload.status || payload.decision || "").trim().toLowerCase();
  if (!reference) return { success: false, ok: false, code: "missing_reference", error: "Reference required" };

  if (["approve", "approved", "confirm", "confirmed"].includes(requested)) {
    const result = processReservationDecision_(reference, "confirm", null);
    return Object.assign({ success: Boolean(result && result.ok) }, result);
  }
  if (["cancel", "canceled", "cancelled"].includes(requested)) {
    const result = processReservationDecision_(reference, "cancel", null);
    return Object.assign({ success: Boolean(result && result.ok) }, result);
  }

  const status = normalizeReservationStatus_(requested);
  if (!["pending", "attended"].includes(status)) {
    return { success: false, ok: false, code: "invalid_status", error: "Invalid reservation status" };
  }

  const found = findReservationByReference_(reference);
  if (!found) return { success: false, ok: false, code: "reference_not_found", error: "Reservation not found" };

  const statusColumn = found.map[normalizeHeader_("Statu")];
  if (statusColumn) found.sheet.getRange(found.rowNumber, statusColumn).setValue(status === "attended" ? "presence" : "pending");
  formatReservationStatus_(found.sheet, found.rowNumber, status);

  const updated = findReservationByReference_(reference);
  return {
    success: true,
    ok: true,
    reference,
    status,
    data: updated ? adminReservationPayload_(updated.reservation) : null,
    message: "Reservation status updated."
  };
}

function processReservationDecision_(reference, decision, callbackQueryId) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    if (decision !== "confirm" && decision !== "cancel") {
      return { success: false, ok: false, code: "invalid_decision", message: "Décision invalide." };
    }

    const found = findReservationByReference_(reference);
    if (!found) return { success: false, ok: false, code: "reference_not_found", message: "Réservation introuvable." };

    const currentStatus = found.reservation.status;
    if (currentStatus === "confirmed" || currentStatus === "canceled") {
      const result = {
        success: true,
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
    // Support both main sheet ("Statu") and Jbel Moussa sheet ("Statut") column names.
    const statusColumn      = map[normalizeHeader_("Statut")] || map[normalizeHeader_("Statu")];
    const emailStatusColumn = map[normalizeHeader_("Statutemail")] || map[normalizeHeader_("Emailstatus")];
    if (statusColumn) sheet.getRange(found.rowNumber, statusColumn).setValue(status === "confirmed" ? "confirmed" : "annulé");
    formatReservationStatus_(sheet, found.rowNumber, status);

    let emailStatus = "canceled";
    if (status === "confirmed") {
      emailStatus = sendReservationEmail_(found.reservation, reference, found.reservation.seat, found.reservation.member_mark === "✓");
    }
    if (emailStatusColumn) sheet.getRange(found.rowNumber, emailStatusColumn).setValue(emailStatus);

    const result = {
      success: true,
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
      return { success: false, ok: false, kind: "membership", code: "invalid_decision", message: "Décision invalide." };
    }

    const found = findMembershipByReference_(reference);
    if (!found) return { success: false, ok: false, kind: "membership", code: "reference_not_found", message: "Demande d’adhésion introuvable." };

    const currentStatus = found.member.status;
    const currentEmailStatus = getMembershipEmailStatus_(found.sheet, found.map, found.rowNumber, found.member.email_status);
    if (currentStatus === "member" || currentStatus === "rejected") {
      let adminBadgeEmailStatus = "not needed";
      let message = `Déjà ${currentStatus === "member" ? "accepté" : "refusé"}.`;

      if (currentStatus === "member" && decision === "approve") {
        adminBadgeEmailStatus = sendMembershipBadgeAdminEmail_(found.member);
        setMembershipEmailStatus_(found.sheet, found.map, found.rowNumber, mergeMembershipEmailStatus_(currentEmailStatus, adminBadgeEmailStatus));
        message = "Déjà accepté. E-mail badge admin renvoyé.";
      }

      const result = {
        success: true,
        ok: true,
        kind: "membership",
        reference,
        status: currentStatus,
        admin_badge_email_status: adminBadgeEmailStatus,
        message
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
    const adminBadgeEmailStatus = status === "member"
      ? sendMembershipBadgeAdminEmail_(found.member)
      : "not needed";
    if (emailStatusColumn) {
      sheet.getRange(found.rowNumber, emailStatusColumn).setValue(
        status === "member" ? mergeMembershipEmailStatus_(emailStatus, adminBadgeEmailStatus) : emailStatus
      );
    }

    const result = {
      success: true,
      ok: true,
      kind: "membership",
      reference,
      status,
      email_status: emailStatus,
      admin_badge_email_status: adminBadgeEmailStatus,
      message: status === "member" ? "Membre accepté et e-mail envoyé." : "Demande refusée."
    };
    editStoredTelegramMembershipDecisionMessage_(found.member, result);
    sendTelegramMembershipDecisionPhotos_(found.member, status);
    return result;
  } finally {
    lock.releaseLock();
  }
}

function getMembershipEmailStatus_(sheet, map, rowNumber, fallback) {
  const emailStatusColumn = map[normalizeHeader_("Email status")];
  if (!emailStatusColumn) return String(fallback || "").trim();
  return String(sheet.getRange(rowNumber, emailStatusColumn).getValue() || fallback || "").trim();
}

function setMembershipEmailStatus_(sheet, map, rowNumber, value) {
  const emailStatusColumn = map[normalizeHeader_("Email status")];
  if (!emailStatusColumn) return;
  sheet.getRange(rowNumber, emailStatusColumn).setValue(value);
}

function membershipBadgeAdminEmailWasSent_(emailStatus) {
  return /badge admin:\s*sent/i.test(String(emailStatus || ""));
}

function mergeMembershipEmailStatus_(emailStatus, adminBadgeEmailStatus) {
  const base = String(emailStatus || "")
    .replace(/;\s*badge admin:\s*[^;]+/ig, "")
    .trim();
  return `${base || "sent"}; badge admin: ${adminBadgeEmailStatus || "unknown"}`;
}

function resendMissingMembershipBadgeEmails() {
  return resendAcceptedMembershipBadgeEmails_(true);
}

function resendAllAcceptedMembershipBadgeEmails() {
  return resendAcceptedMembershipBadgeEmails_(false);
}

function resendAcceptedMembershipBadgeEmails_(missingOnly) {
  const sheet = getSheet_(MEMBERSHIP_SHEET_NAME, MEMBERSHIP_HEADERS);
  const map = headerMap_(sheet);
  const rows = getRows_(sheet);
  const results = {
    ok: true,
    resent: 0,
    skipped: 0,
    errors: []
  };

  rows.forEach((row, index) => {
    const rowNumber = index + 2;
    const member = rowObject_(row, map);
    const emailStatus = getMembershipEmailStatus_(sheet, map, rowNumber, member.email_status);

    if (member.status !== "member" || (missingOnly && membershipBadgeAdminEmailWasSent_(emailStatus))) {
      results.skipped += 1;
      return;
    }

    const status = sendMembershipBadgeAdminEmail_(member);
    setMembershipEmailStatus_(sheet, map, rowNumber, mergeMembershipEmailStatus_(emailStatus, status));
    if (status === "sent") {
      results.resent += 1;
    } else {
      results.errors.push({ reference: member.reference, status });
    }
  });

  return results;
}

function isTelegramConfigured_() {
  return isReservationTelegramConfigured_();
}

function isReservationTelegramConfigured_() {
  const token = getTelegramBotToken_();
  const chatId = getTelegramChatId_();
  return token &&
    chatId &&
    token !== "YOUR_TELEGRAM_BOT_TOKEN" &&
    chatId !== "YOUR_TELEGRAM_CHAT_ID";
}

function getTelegramBotToken_() {
  return getConfigValue("TELEGRAM_BOT_TOKEN");
}

function getTelegramChatId_() {
  return getConfigValue("TELEGRAM_CHAT_ID");
}

function isMembershipTelegramConfigured_() {
  const token = getMembershipTelegramBotToken_();
  const chatId = getMembershipTelegramChatId_();
  return token &&
    chatId &&
    token !== "YOUR_MEMBERSHIP_TELEGRAM_BOT_TOKEN" &&
    chatId !== "YOUR_MEMBERSHIP_TELEGRAM_CHAT_ID";
}

function getMembershipTelegramBotToken_() {
  return getConfigValue("MEMBERSHIP_TELEGRAM_BOT_TOKEN");
}

function getMembershipTelegramChatId_() {
  return getConfigValue("MEMBERSHIP_TELEGRAM_CHAT_ID");
}

function getAdminBadgeEmail_() {
  return getConfigValue("ADMIN_EMAIL");
}

function telegramApi_(method, payload, botToken) {
  const token = botToken || getTelegramBotToken_();
  const url = `https://api.telegram.org/bot${token}/${method}`;
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
    `<b>Événement :</b> ${escapeHtml_(payload.event_title || "-")}`,
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
  if (!isMembershipTelegramConfigured_()) return "membership_telegram_missing_config";

  try {
    const response = telegramApi_("sendMessage", {
      chat_id: getMembershipTelegramChatId_(),
      text: buildTelegramMembershipText_(payload, reference, "pending"),
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [[
          { text: "✅ Accepter", url: buildMembershipDecisionUrl_("approve", reference) },
          { text: "❌ Refuser", url: buildMembershipDecisionUrl_("reject", reference) }
        ]]
      }
    }, getMembershipTelegramBotToken_());
    return {
      status: "sent",
      chat_id: response && response.result && response.result.chat ? String(response.result.chat.id) : getMembershipTelegramChatId_(),
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
  if (!member || !member.telegram_chat_id || !member.telegram_message_id || !isMembershipTelegramConfigured_()) return;
  try {
    telegramApi_("editMessageText", {
      chat_id: member.telegram_chat_id,
      message_id: member.telegram_message_id,
      text: buildTelegramMembershipText_(member, result.reference || member.reference, result.status),
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: [] }
    }, getMembershipTelegramBotToken_());
  } catch (error) {
    // The Google Sheet status is already updated; Telegram editing is best-effort.
  }
}

/**
 * Sends a new Telegram message with the applicant's profile photo and payment
 * receipt when the admin approves or rejects a membership request.
 * Uses Drive file IDs (stored in the sheet) to fetch the blobs directly —
 * more reliable than passing Google Drive redirect URLs to Telegram.
 */
function sendTelegramMembershipDecisionPhotos_(member, status) {
  if (!isMembershipTelegramConfigured_()) return;
  if (!member) return;

  const profileFileId = String(member.profile_picture_file_id || "").trim();
  const receiptFileId = String(member.receipt_file_id || "").trim();
  if (!profileFileId && !receiptFileId) return;

  const statusEmoji = status === "member" ? "✅" : "❌";
  const statusLabel = status === "member" ? "Accepté(e)" : "Refusé(e)";
  const name = escapeHtml_(member.fullName || "");
  const ref = escapeHtml_(member.reference || "");
  const captionBase = `${statusEmoji} <b>${statusLabel}</b> — ${name} (<code>${ref}</code>)`;

  try {
    const profileBlob = profileFileId ? (function() { try { return DriveApp.getFileById(profileFileId).getBlob(); } catch (_) { return null; } })() : null;
    const receiptBlob = receiptFileId ? (function() { try { return DriveApp.getFileById(receiptFileId).getBlob(); } catch (_) { return null; } })() : null;

    if (profileBlob && receiptBlob) {
      // Send both images as a media group
      telegramSendMultipart_("sendMediaGroup", {
        chat_id: getMembershipTelegramChatId_(),
        media: JSON.stringify([
          { type: "photo", media: "attach://profile_photo", caption: captionBase + "\n📷 Photo de profil", parse_mode: "HTML" },
          { type: "photo", media: "attach://receipt_photo", caption: "🧾 Reçu de paiement", parse_mode: "HTML" }
        ]),
        profile_photo: profileBlob,
        receipt_photo: receiptBlob
      }, getMembershipTelegramBotToken_());
    } else if (profileBlob) {
      telegramSendMultipart_("sendPhoto", {
        chat_id: getMembershipTelegramChatId_(),
        caption: captionBase + "\n📷 Photo de profil",
        parse_mode: "HTML",
        photo: profileBlob
      }, getMembershipTelegramBotToken_());
    } else if (receiptBlob) {
      telegramSendMultipart_("sendPhoto", {
        chat_id: getMembershipTelegramChatId_(),
        caption: captionBase + "\n🧾 Reçu de paiement",
        parse_mode: "HTML",
        photo: receiptBlob
      }, getMembershipTelegramBotToken_());
    }
  } catch (error) {
    // Decision photo delivery is best-effort; the status update already succeeded.
    console.error("sendTelegramMembershipDecisionPhotos_ error:", error);
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
  const payload = encodeURIComponent(JSON.stringify({
    decision,
    reference,
    auth: signedDecisionToken_("decision", decision, reference)
  }));
  return `${ScriptApp.getService().getUrl()}?action=decision&ui=telegram&payload=${payload}`;
}

function buildMembershipDecisionUrl_(decision, reference) {
  const payload = encodeURIComponent(JSON.stringify({
    decision,
    reference,
    auth: signedDecisionToken_("membershipDecision", decision, reference)
  }));
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
  const reference = parts[1] || "";
  const auth = parts[2] || "";

  if (!reference || (decision !== "confirm" && decision !== "cancel")) {
    answerTelegramCallback_(callbackQuery.id, "Action invalide.");
    return { ok: false, code: "invalid_callback" };
  }
  if (!isSignedDecisionRequest_("decision", { decision, reference, auth })) {
    answerTelegramCallback_(callbackQuery.id, "Action non autorisee.");
    return unauthorizedResponse_();
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

function sendMembershipBadgeAdminEmail_(member, overrideEmail) {
  const adminBadgeEmail = overrideEmail || getAdminBadgeEmail_();
  if (!adminBadgeEmail) return "missing_admin_email";
  try {
    const fullName = memberDisplayName_(member);
    const splitName = splitFullNameParts_(fullName);
    const firstName = member.firstName || splitName.firstName;
    const lastName = member.lastName || splitName.lastName;
    const reference = member.reference || "";
    const qrCodeUrl = qrUrl_(reference);
    const rows = [
      ["Référence", reference],
      ["Nom complet", fullName],
      ["Prénom", firstName],
      ["Nom", lastName],
      ["Date de naissance", formatDateForEmail_(member.birthday)],
      ["Ville", member.city || ""],
      ["Téléphone", member.phone || ""],
      ["E-mail", member.email || ""],
      ["Fonction", member.profession || ""],
      ["Comment connu CINEMANA", member.heard_about_us || ""]
    ];
    const detailsHtml = rows.map(([label, value]) => `
      <tr>
        <td style="padding:8px 10px;border-bottom:1px solid #2c3547;color:#d9b24c;font-weight:800">${escapeHtml_(label)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #2c3547;color:#f7f0df">${escapeHtml_(value || "-")}</td>
      </tr>
    `).join("");
    const plain = `${rows.map(([label, value]) => `${label}: ${value || "-"}`).join("\n")}\nQR code: ${qrCodeUrl}`;
    const html = `
      <div style="margin:0;padding:18px;background:#080808;font-family:Arial,sans-serif;color:#f7f0df">
        <div style="max-width:680px;margin:auto;background:#111827;border:1px solid #d9b24c;border-radius:16px;overflow:hidden">
          <div style="background:#d9b24c;color:#080808;padding:20px;text-align:center">
            <div style="font-size:13px;font-weight:900;letter-spacing:4px;text-transform:uppercase">CINEMANA</div>
            <h1 style="margin:8px 0 0;font-size:28px;line-height:1.15">Membre accepté - badge à préparer</h1>
          </div>
          <div style="padding:22px">
            <p style="margin:0 0 16px;color:#d7d0c3;font-size:16px;line-height:1.55">Une demande d’adhésion vient d’être acceptée. Voici les informations à utiliser pour préparer le badge.</p>
            <div style="margin:0 0 18px;padding:16px;background:#f7f0df;border-radius:14px;text-align:center;color:#080808">
              <div style="font-size:12px;font-weight:900;letter-spacing:2px;text-transform:uppercase;color:#2d3442">QR code membre</div>
              <img src="${qrCodeUrl}" alt="QR code membre" width="180" height="180" style="display:block;width:180px;height:180px;margin:12px auto;border:8px solid #fff;border-radius:12px">
              <div style="font-size:20px;font-weight:900;letter-spacing:1px;word-break:break-word">${escapeHtml_(reference)}</div>
            </div>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;background:#0b0f1a;border-radius:12px;overflow:hidden">
              ${detailsHtml}
            </table>
          </div>
        </div>
      </div>`;

    MailApp.sendEmail({
      to: adminBadgeEmail,
      subject: `Badge CINEMANA à préparer - ${fullName || member.email || reference}`,
      body: plain,
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
    const eventTitle = payload.event_title || "Projection CINEMANA";
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
                            <div style="font-size:13px;color:#b8c0d0;margin-bottom:4px">Événement</div>
                            <div style="font-size:17px;color:#fff;font-weight:800;line-height:1.35;word-break:break-word">${escapeHtml_(eventTitle)}</div>
                          </div>
                          ${payload.event_date ? `<div style="border-top:1px solid #293244;padding:12px 0">
                            <div style="font-size:13px;color:#b8c0d0;margin-bottom:4px">Date</div>
                            <div style="font-size:17px;color:#fff;font-weight:800;line-height:1.35">${escapeHtml_(payload.event_date)}</div>
                          </div>` : ""}
                          ${payload.event_time ? `<div style="border-top:1px solid #293244;padding:12px 0">
                            <div style="font-size:13px;color:#b8c0d0;margin-bottom:4px">Heure</div>
                            <div style="font-size:17px;color:#fff;font-weight:800;line-height:1.35">${escapeHtml_(payload.event_time)} GMT+1</div>
                          </div>` : ""}
                          ${payload.event_venue ? `<div style="border-top:1px solid #293244;padding:12px 0">
                            <div style="font-size:13px;color:#b8c0d0;margin-bottom:4px">Lieu</div>
                            <div style="font-size:17px;color:#fff;font-weight:800;line-height:1.35">${escapeHtml_(payload.event_venue)}</div>
                          </div>` : ""}
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

// ─────────────────────────────────────────────────────────────────────────────
// CINEMANA — Feuille dédiée à l'événement "Jbel Moussa / Le Mont Moussa"
// Ajoutée le 2026-06-18
// ─────────────────────────────────────────────────────────────────────────────

const JBEL_MOUSSA_SHEET_NAME = "reservation - Jbel Moussa";
const JBEL_MOUSSA_EVENT_ID   = "le-monte-moussa";

const JBEL_MOUSSA_HEADERS = [
  "Références",
  "Événement",
  "Event ID",
  "Date",
  "Heure",
  "Lieu",
  "Prénom",
  "Nom",
  "Tel / WhatsApp",
  "E-mail",
  "Âge",
  "Fonction",
  "Comment as-tu su pour la projection ?",
  "Siège",
  "Membre (oui/non)",
  "Code membre",
  "Statut",
  "Présence",
  "Créé le",
  "Statut e-mail",
  "Chat Telegram",
  "Message Telegram"
];

/**
 * Crée (ou retrouve) la feuille dédiée à Jbel Moussa et s'assure
 * que les en-têtes sont en place.  Appelable depuis l'éditeur Apps Script.
 */
function setupJbelMoussaSheet() {
  const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  let   sheet = ss.getSheetByName(JBEL_MOUSSA_SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(JBEL_MOUSSA_SHEET_NAME);
  }

  // En-têtes
  const existing = sheet.getRange(1, 1, 1, JBEL_MOUSSA_HEADERS.length).getValues()[0];
  const isEmpty  = existing.every(function(v) { return v === "" || v === null; });
  if (isEmpty) {
    sheet.getRange(1, 1, 1, JBEL_MOUSSA_HEADERS.length).setValues([JBEL_MOUSSA_HEADERS]);
    sheet.setFrozenRows(1);

    // Largeurs de colonnes confortables
    sheet.setColumnWidth(1,  140); // Références
    sheet.setColumnWidth(2,  200); // Événement
    sheet.setColumnWidth(7,  120); // Prénom
    sheet.setColumnWidth(8,  120); // Nom
    sheet.setColumnWidth(9,  140); // Téléphone
    sheet.setColumnWidth(10, 200); // E-mail
    sheet.setColumnWidth(13, 260); // Source
    sheet.setColumnWidth(18, 160); // Créé le

    // Couleur d'en-tête dorée (charte CINEMANA)
    sheet.getRange(1, 1, 1, JBEL_MOUSSA_HEADERS.length)
         .setBackground("#C9933A")
         .setFontColor("#FFFFFF")
         .setFontWeight("bold");
  }

  SpreadsheetApp.flush();
  return {
    ok: true,
    message: "Feuille « " + JBEL_MOUSSA_SHEET_NAME + " » prête.",
    sheet: JBEL_MOUSSA_SHEET_NAME
  };
}

/**
 * Synchronise une réservation de la feuille principale « reservation »
 * vers la feuille Jbel Moussa lorsque l'event_id correspond.
 * Appelée automatiquement à chaque createReservation_ si l'event_id correspond.
 */
function mirrorReservationToJbelMoussaSheet_(payload, reference, seat) {
  try {
    if (normalizeText_(payload.event_id) !== JBEL_MOUSSA_EVENT_ID) return;
    const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    let   sheet = ss.getSheetByName(JBEL_MOUSSA_SHEET_NAME);
    if (!sheet) { setupJbelMoussaSheet(); sheet = ss.getSheetByName(JBEL_MOUSSA_SHEET_NAME); }

    const now = new Date().toISOString();
    const row = [
      reference,
      payload.event_title  || "Le Mont Moussa",
      payload.event_id     || JBEL_MOUSSA_EVENT_ID,
      payload.event_date   || "Dimanche 28 juin 2026",
      payload.event_time   || "19:00",
      payload.event_venue  || "Palais de la Culture Malabata - Tanger",
      payload.first_name   || "",
      payload.last_name    || "",
      payload.phone || payload.whatsapp || "",
      payload.email        || "",
      payload.age          || "",
      payload.profession   || "",
      payload.source       || (payload.type === "member" ? "Réservation membre" : ""),
      seat                 || "",
      payload.type === "member" ? "Oui" : "Non",
      payload.member_reference || "",
      "pending",
      "",   // Présence (mis à jour par le scanner lors du contrôle)
      now,
      "",   // Statut e-mail (mis à jour par les triggers email)
      "",   // Chat Telegram
      ""    // Message Telegram
    ];

    sheet.appendRow(row);
    SpreadsheetApp.flush();
  } catch (err) {
    // Mirror is best-effort — ne bloque pas la réservation principale.
    console.error("mirrorReservationToJbelMoussaSheet_ error:", err);
  }
}
// ─────────────────────────────────────────────────────────────────────────────
// FIN — Jbel Moussa sheet helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Marque la présence (✓ + horodatage) dans la feuille "reservation - Jbel Moussa"
 * dès qu'un ticket est scanné via verifyTicket_.
 * Best-effort : n'interrompt jamais le flux de scan principal si elle échoue.
 */
function markPresenceOnJbelMoussaSheet_(reference) {
  try {
    const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(JBEL_MOUSSA_SHEET_NAME);
    if (!sheet) return; // Feuille pas encore créée — on ignore silencieusement.

    const map = headerMap_(sheet);
    const refCol      = map[normalizeHeader_("Références")];
    const presenceCol = map[normalizeHeader_("Présence")];
    if (!refCol || !presenceCol) return;

    const target = normalizeText_(reference);
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return;

    const refs = sheet.getRange(2, refCol, lastRow - 1, 1).getValues();
    for (let i = 0; i < refs.length; i++) {
      if (normalizeText_(refs[i][0]) === target) {
        const rowNumber = i + 2;
        const cell = sheet.getRange(rowNumber, presenceCol);

        // N'écrase pas si déjà marqué.
        if (String(cell.getValue() || "").trim() !== "") return;

        const timestamp = Utilities.formatDate(
          new Date(),
          Session.getScriptTimeZone(),
          "dd/MM/yyyy HH:mm:ss"
        );
        cell.setValue("✓  " + timestamp);
        cell.setBackground("#22c55e");   // vert
        cell.setFontColor("#ffffff");
        cell.setFontWeight("bold");
        SpreadsheetApp.flush();
        return;
      }
    }
  } catch (err) {
    console.error("markPresenceOnJbelMoussaSheet_ error:", err);
  }
}

/**
 * Marque la présence (✓ + horodatage) sur la feuille qui contient le ticket,
 * qu'il s'agisse de "reservation - Jbel Moussa" ou de la feuille principale.
 * Appelée depuis verifyTicket_ juste après findReservationByReference_.
 */
function markPresenceOnSheet_(found, reference) {
  try {
    if (!found) return;

    const sheet = found.sheet;
    const map   = found.map;

    // Cherche la colonne Présence (avec ou sans accent, avec ou sans espace).
    const presenceCol = map[normalizeHeader_("Présence")]
                     || map[normalizeHeader_("presence")]
                     || map[normalizeHeader_("Presence")];
    if (!presenceCol) return; // Pas de colonne Présence sur cette feuille → rien à faire.

    const cell = sheet.getRange(found.rowNumber, presenceCol);

    // N'écrase pas si déjà marqué.
    if (String(cell.getValue() || "").trim() !== "") return;

    const timestamp = Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone(),
      "dd/MM/yyyy HH:mm:ss"
    );
    cell.setValue("✓  " + timestamp);
    cell.setBackground("#22c55e");  // vert
    cell.setFontColor("#ffffff");
    cell.setFontWeight("bold");
    SpreadsheetApp.flush();
  } catch (err) {
    console.error("markPresenceOnSheet_ error:", err);
  }
}


function getOrCreateNamedFolder_(propertyKey, folderName) {
  const props = PropertiesService.getScriptProperties();
  const cachedId = props.getProperty(propertyKey);
  if (cachedId) {
    try { return DriveApp.getFolderById(cachedId); } catch(e) {}
  }
  const existing = DriveApp.getFoldersByName(folderName);
  const folder = existing.hasNext() ? existing.next() : DriveApp.createFolder(folderName);
  props.setProperty(propertyKey, folder.getId());
  return folder;
}
function getOrCreateMemberProfilesFolder_() {
  return getOrCreateNamedFolder_("MEMBER_PROFILES_FOLDER_ID","Member Profiles");
}
function getOrCreatePaymentReceiptsFolder_() {
  return getOrCreateNamedFolder_("PAYMENT_RECEIPTS_FOLDER_ID","Payment Receipts");
}
function fileExtensionFromImageData_(imageData){
  const mt=String(imageData&&imageData.mime_type||"").toLowerCase();
  const m={"image/jpeg":"jpg","image/jpg":"jpg","image/png":"png","image/webp":"webp","image/heic":"heic","application/pdf":"pdf"};
  if(m[mt]) return m[mt];
  const n=String(imageData&&imageData.file_name||"");
  const mm=n.match(/\.([a-zA-Z0-9]+)$/);
  return mm?mm[1].toLowerCase():"jpg";
}
function sanitizeFileNamePart_(v){
  return String(v||"").trim().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9\s_-]+/g,"").replace(/\s+/g," ").trim();
}
