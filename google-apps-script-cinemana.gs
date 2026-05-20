const SPREADSHEET_ID = "1b3ZW4esFw0SqFwSw0HwMbtiadsNfYVJ0QdtzWDLGEIU";
const MEMBERSHIP_SHEET_NAME = "membership";
const RESERVATION_SHEET_NAME = "reservation";

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
  "Email status"
];

function doGet(e) {
  return respond_(handleRequest_(e.parameter || {}), e.parameter && e.parameter.callback);
}

function doPost(e) {
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
  if (!payload.member_reference || !payload.full_name || !payload.phone || !payload.email) {
    return { ok: false, code: "missing_fields" };
  }

  const member = findMemberByReference_(payload.member_reference);
  if (!member) return { ok: false, code: "reference_not_found" };
  if (normalizeEmail_(member.email) !== normalizeEmail_(payload.email)) return { ok: false, code: "email_mismatch" };

  const nameMatches = normalizeText_(member.fullName) === normalizeText_(payload.full_name);
  const phoneMatches = normalizePhone_(member.phone) === normalizePhone_(payload.phone);
  if (!nameMatches || !phoneMatches) return { ok: false, code: "identity_mismatch" };

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
  const rows = getRows_(sheet);
  const seats = rows
    .map((row) => String(row[seatColumn - 1] || "").trim().toUpperCase())
    .filter(Boolean);
  return { ok: true, seats };
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
      "Email status": "pending"
    };
    const rowValues = buildRow_(sheet, valuesByHeader);
    sheet.appendRow(rowValues);

    const appendedRow = sheet.getLastRow();
    formatMemberMark_(sheet, appendedRow, isMember);

    const emailStatus = sendReservationEmail_(payload, reference, seat, isMember);
    const map = headerMap_(sheet);
    const emailStatusColumn = map[normalizeHeader_("Email status")];
    if (emailStatusColumn) sheet.getRange(appendedRow, emailStatusColumn).setValue(emailStatus);

    return { ok: true, reference, seat, member: isMember, email_status: emailStatus };
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
    const html = `
      <div style="font-family:Arial,sans-serif;background:#101827;color:#f7f0df;padding:28px">
        <div style="max-width:620px;margin:auto;background:#111;border-radius:14px;overflow:hidden;border:1px solid #d9b24c">
          <div style="background:#d9b24c;color:#080808;padding:24px;text-align:center">
            <h1 style="margin:0;font-size:30px">CINEMANA</h1>
            <p style="margin:6px 0 0;font-weight:700">Confirmation de réservation</p>
          </div>
          <div style="padding:28px">
            <h2 style="margin-top:0;color:#fff">Bonjour ${escapeHtml_(payload.full_name)}</h2>
            <p>Votre réservation CINEMANA est confirmée.</p>
            <p><strong>Référence d’entrée :</strong> ${escapeHtml_(reference)}</p>
            <p><strong>Siège :</strong> ${escapeHtml_(seat)}</p>
            <p><strong>Statut membre :</strong> ${isMember ? "Membre CINEMANA" : "Non membre"}</p>
            <p style="text-align:center"><img src="${qrUrl_(reference)}" alt="QR code" width="220" height="220"></p>
            <p style="color:#b8b0a6">Présentez ce QR code à l’entrée de la salle.</p>
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
