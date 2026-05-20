const CINEMANA_SEAT_ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const CINEMANA_SEAT_COUNT = 20;

const CINEMANA_EXTENSION_COPY = {
  fr: {
    modal: {
      labels: {
        profession: "Fonction / Profession",
        professionOther: "Autre fonction"
      },
      professionOptions: {
        empty: "Choisir une fonction",
        student: "Étudiant",
        employee: "Employé",
        other: "Autre"
      },
      validation: {
        professionOther: "Veuillez préciser votre fonction."
      }
    },
    reservation: {
      member: {
        steps: ["Saisir les informations membre.", "Vérification dans la base CINEMANA.", "Choix d’un seul siège.", "Confirmation avec référence et QR code."],
        labels: {
          name: "Nom complet",
          code: "Code membre / Référence membre",
          phone: "Téléphone",
          email: "E-mail"
        },
        button: "Vérifier et choisir un siège",
        verified: "Membre vérifié. Choisissez maintenant votre siège."
      },
      public: {
        steps: ["Remplir le formulaire.", "Choisir un seul siège.", "Recevoir la référence de réservation.", "Recevoir le QR code par e-mail."],
        labels: {
          email: "E-mail"
        },
        button: "Choisir un siège"
      },
      seat: {
        eyebrow: "Plan de salle",
        title: "Choisissez un seul siège.",
        intro: "Les sièges déjà réservés ne sont pas disponibles.",
        back: "Retour",
        stage: "SCÈNE",
        entrance1: "ENTRÉE 1",
        entrance2: "ENTRÉE 2",
        available: "Disponible",
        selectedLabel: "Sélectionné",
        reserved: "Réservé",
        none: "Aucun siège sélectionné.",
        selected: (seat) => `Siège sélectionné : ${seat}`,
        confirm: "Confirmer la réservation",
        loadingSeats: "Chargement des sièges disponibles...",
        loadingCreate: "Enregistrement de la réservation...",
        success: (name, reference, seat) => `Merci ${name}. Votre réservation ${reference} est confirmée pour le siège ${seat}. Un e-mail avec le QR code va vous arriver.`
      },
      validation: {
        required: "Veuillez remplir tous les champs obligatoires.",
        email: "Veuillez entrer une adresse e-mail valide.",
        age: "Veuillez entrer un âge valide.",
        sheetsMissing: "Configuration Google Sheets manquante. Vérifiez GOOGLE_SHEETS_WEB_APP_URL.",
        referenceNotFound: "Ce code membre n’existe pas dans la liste des membres.",
        emailMismatch: "Cet e-mail n’est pas lié à ce code membre.",
        identityMismatch: "Les informations saisies ne sont pas enregistrées comme membre.",
        seatRequired: "Veuillez choisir un siège.",
        seatTaken: "Ce siège vient d’être réservé. Choisissez un autre siège.",
        generic: "Impossible de terminer l’opération pour le moment. Veuillez réessayer."
      }
    }
  },
  en: {
    modal: {
      labels: {
        profession: "Role / Profession",
        professionOther: "Other role"
      },
      professionOptions: {
        empty: "Choose a role",
        student: "Student",
        employee: "Employee",
        other: "Other"
      },
      validation: {
        professionOther: "Please specify your role."
      }
    },
    reservation: {
      member: {
        steps: ["Enter member information.", "Verify it in the CINEMANA database.", "Choose one seat only.", "Confirm with a reference and QR code."],
        labels: {
          name: "Full name",
          code: "Member code / Member reference",
          phone: "Phone number",
          email: "E-mail"
        },
        button: "Verify and choose a seat",
        verified: "Member verified. Now choose your seat."
      },
      public: {
        steps: ["Fill in the form.", "Choose one seat only.", "Receive the reservation reference.", "Receive the QR code by e-mail."],
        labels: {
          email: "E-mail"
        },
        button: "Choose a seat"
      },
      seat: {
        eyebrow: "Hall plan",
        title: "Choose one seat only.",
        intro: "Already reserved seats are not available.",
        back: "Back",
        stage: "STAGE",
        entrance1: "ENTRANCE 1",
        entrance2: "ENTRANCE 2",
        available: "Available",
        selectedLabel: "Selected",
        reserved: "Reserved",
        none: "No seat selected.",
        selected: (seat) => `Selected seat: ${seat}`,
        confirm: "Confirm reservation",
        loadingSeats: "Loading available seats...",
        loadingCreate: "Saving the reservation...",
        success: (name, reference, seat) => `Thank you ${name}. Your reservation ${reference} is confirmed for seat ${seat}. An e-mail with the QR code will arrive shortly.`
      },
      validation: {
        required: "Please fill in all required fields.",
        email: "Please enter a valid e-mail address.",
        age: "Please enter a valid age.",
        sheetsMissing: "Google Sheets configuration is missing. Check GOOGLE_SHEETS_WEB_APP_URL.",
        referenceNotFound: "This member code does not exist in the members list.",
        emailMismatch: "This e-mail is not linked to this member code.",
        identityMismatch: "The entered information is not registered as a member.",
        seatRequired: "Please choose a seat.",
        seatTaken: "This seat has just been reserved. Choose another seat.",
        generic: "Unable to complete the operation right now. Please try again."
      }
    }
  },
  ar: {
    modal: {
      labels: {
        profession: "المهنة / الصفة",
        professionOther: "مهنة أخرى"
      },
      professionOptions: {
        empty: "اختر المهنة",
        student: "طالب",
        employee: "مستخدم",
        other: "أخرى"
      },
      validation: {
        professionOther: "يرجى كتابة المهنة."
      }
    },
    reservation: {
      member: {
        steps: ["أدخل معلومات العضوية.", "التحقق من قاعدة بيانات سينيمانا.", "اختر كرسيا واحدا فقط.", "تأكيد الحجز مع المرجع و QR code."],
        labels: {
          name: "الاسم الكامل",
          code: "كود العضوية / ريفيرونس العضوية",
          phone: "رقم الهاتف",
          email: "البريد الإلكتروني"
        },
        button: "تحقق واختر الكرسي",
        verified: "تم التحقق من العضوية. اختر الكرسي الآن."
      },
      public: {
        steps: ["املأ الاستمارة.", "اختر كرسيا واحدا فقط.", "توصل بمرجع الحجز.", "توصل ب QR code عبر الإيميل."],
        labels: {
          email: "البريد الإلكتروني"
        },
        button: "اختيار الكرسي"
      },
      seat: {
        eyebrow: "تصميم القاعة",
        title: "اختر كرسيا واحدا فقط.",
        intro: "الكراسي المحجوزة غير متاحة.",
        back: "رجوع",
        stage: "المنصة",
        entrance1: "المدخل 1",
        entrance2: "المدخل 2",
        available: "متاح",
        selectedLabel: "مختار",
        reserved: "محجوز",
        none: "لم يتم اختيار أي كرسي.",
        selected: (seat) => `الكرسي المختار: ${seat}`,
        confirm: "تأكيد الحجز",
        loadingSeats: "جاري تحميل الكراسي المتاحة...",
        loadingCreate: "جاري تسجيل الحجز...",
        success: (name, reference, seat) => `شكرا ${name}. تم تأكيد الحجز ${reference} للكرسي ${seat}. سيصلك إيميل فيه QR code قريبا.`
      },
      validation: {
        required: "يرجى ملء جميع الحقول الضرورية.",
        email: "يرجى إدخال بريد إلكتروني صحيح.",
        age: "يرجى إدخال عمر صحيح.",
        sheetsMissing: "إعدادات Google Sheets غير موجودة. تحقق من GOOGLE_SHEETS_WEB_APP_URL.",
        referenceNotFound: "كود العضوية غير موجود في لائحة الأعضاء.",
        emailMismatch: "هذا الإيميل غير مرتبط بكود العضوية.",
        identityMismatch: "المعلومات المدخلة غير مسجلة كعضو.",
        seatRequired: "يرجى اختيار كرسي.",
        seatTaken: "هذا الكرسي تم حجزه الآن. اختر كرسيا آخر.",
        generic: "تعذر إتمام العملية الآن. حاول مرة أخرى."
      }
    }
  }
};

let pendingReservation = null;
let reservedSeats = new Set();
let selectedSeat = "";

function extendCinemanaTranslations() {
  Object.keys(CINEMANA_EXTENSION_COPY).forEach((language) => {
    const source = CINEMANA_EXTENSION_COPY[language];
    const target = TRANSLATIONS[language];
    if (!target) return;

    target.modal.labels = { ...target.modal.labels, ...source.modal.labels };
    target.modal.professionOptions = source.modal.professionOptions;
    target.modal.validation = { ...target.modal.validation, ...source.modal.validation };

    target.reservation.member.steps = source.reservation.member.steps;
    target.reservation.member.labels = { ...target.reservation.member.labels, ...source.reservation.member.labels };
    target.reservation.member.button = source.reservation.member.button;
    target.reservation.member.verified = source.reservation.member.verified;
    target.reservation.public.steps = source.reservation.public.steps;
    target.reservation.public.labels = { ...target.reservation.public.labels, ...source.reservation.public.labels };
    target.reservation.public.button = source.reservation.public.button;
    target.reservation.seat = source.reservation.seat;
    target.reservation.validation = source.reservation.validation;
  });
}

function getExtensionCopy() {
  return TRANSLATIONS[currentLanguage] || TRANSLATIONS.fr;
}

function applyExtensionTexts() {
  const copy = getExtensionCopy();
  const modal = copy.modal;
  const reservation = copy.reservation;

  setLabel("memberProfessionType", modal.labels.profession);
  setLabel("memberProfessionOther", modal.labels.professionOther);
  setOption('#memberProfessionType option[value=""]', modal.professionOptions.empty);
  setOption('#memberProfessionType option[value="student"]', modal.professionOptions.student);
  setOption('#memberProfessionType option[value="employee"]', modal.professionOptions.employee);
  setOption('#memberProfessionType option[value="other"]', modal.professionOptions.other);

  setLabel("memberReservationName", reservation.member.labels.name);
  setLabel("memberCode", reservation.member.labels.code);
  setLabel("memberTel", reservation.member.labels.phone);
  setLabel("memberReservationEmail", reservation.member.labels.email);
  setText("#memberReservationForm button", reservation.member.button);

  setLabel("publicEmail", reservation.public.labels.email);
  setText("#publicReservationForm button", reservation.public.button);

  setText("#seatSelection .eyebrow", reservation.seat.eyebrow);
  setText("#seatSelection h2", reservation.seat.title);
  setText("#seatSelectionIntro", reservation.seat.intro);
  setText("#seatBackButton", reservation.seat.back);
  setText("#cinemaStage", reservation.seat.stage);
  setText(".seat-entrances span:nth-child(1)", reservation.seat.entrance1);
  setText(".seat-entrances span:nth-child(2)", reservation.seat.entrance2);

  const legendItems = document.querySelectorAll("#seatLegend span");
  if (legendItems[0]) legendItems[0].lastChild.textContent = reservation.seat.available;
  if (legendItems[1]) legendItems[1].lastChild.textContent = reservation.seat.selectedLabel;
  if (legendItems[2]) legendItems[2].lastChild.textContent = reservation.seat.reserved;

  const summary = document.getElementById("selectedSeatSummary");
  if (summary) summary.textContent = selectedSeat ? reservation.seat.selected(selectedSeat) : reservation.seat.none;
  setText("#confirmSeatButton", reservation.seat.confirm);
}

function canonicalMemberProfession(data) {
  if (data.profession_type === "student") return "Étudiant";
  if (data.profession_type === "employee") return "Employé";
  return data.profession_other.trim();
}

function handleMemberProfessionChange() {
  const select = document.getElementById("memberProfessionType");
  const wrap = document.getElementById("memberProfessionOtherWrap");
  const input = document.getElementById("memberProfessionOther");
  const showOther = select && select.value === "other";

  if (wrap) wrap.hidden = !showOther;
  if (input) {
    input.required = Boolean(showOther);
    if (!showOther) input.value = "";
  }
}

const originalSetLanguage = setLanguage;
extendCinemanaTranslations();
setLanguage = function setLanguageWithReservation(language) {
  originalSetLanguage(language);
  applyExtensionTexts();
  handleMemberProfessionChange();
  renderSeatMap();
};

const originalResetMemberVerification = resetMemberVerification;
resetMemberVerification = function resetMemberVerificationWithProfession(clearForm = false) {
  originalResetMemberVerification(clearForm);
  handleMemberProfessionChange();
};

getMemberFormData = function getMemberFormDataWithProfession() {
  return {
    full_name: document.getElementById("memberName").value.trim(),
    birthday: document.getElementById("memberBirthday").value,
    city: document.getElementById("memberCity").value.trim(),
    phone: document.getElementById("memberPhone").value.trim(),
    profession_type: document.getElementById("memberProfessionType").value,
    profession_other: document.getElementById("memberProfessionOther").value.trim(),
    email: document.getElementById("memberEmail").value.trim(),
    password: document.getElementById("memberPassword").value,
    repeat_password: document.getElementById("memberRepeatPassword").value
  };
};

validateMemberForm = function validateMemberFormWithProfession(data) {
  const messages = TRANSLATIONS[currentLanguage].modal.validation;
  const requiredValues = [
    data.full_name,
    data.birthday,
    data.city,
    data.phone,
    data.profession_type,
    data.email,
    data.password,
    data.repeat_password
  ];

  if (requiredValues.some((value) => !value)) return messages.required;
  if (data.profession_type === "other" && !data.profession_other) return messages.professionOther;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return messages.email;

  const birthday = new Date(`${data.birthday}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (Number.isNaN(birthday.getTime()) || birthday >= today) return messages.birthday;

  if (data.password.length < 8) return messages.passwordLength;
  if (data.password !== data.repeat_password) return messages.passwordMatch;

  data.profession = canonicalMemberProfession(data);
  return "";
};

setMemberFieldsDisabled = function setMemberFieldsDisabledWithProfession(disabled) {
  [
    "memberName",
    "memberBirthday",
    "memberCity",
    "memberPhone",
    "memberProfessionType",
    "memberProfessionOther",
    "memberEmail",
    "memberPassword",
    "memberRepeatPassword"
  ].forEach((id) => {
    const input = document.getElementById(id);
    if (input) input.disabled = disabled;
  });
};

createFirebaseMemberAccount = async function createFirebaseMemberAccountWithProfession(data, referenceCode) {
  const services = getFirebaseServices();
  if (!services) throw new Error("firebase-not-ready");

  const credential = await services.auth.createUserWithEmailAndPassword(data.email, data.password);
  const user = credential.user;
  if (user && user.updateProfile) {
    await user.updateProfile({ displayName: data.full_name });
  }

  await services.db.collection("cinemana_members").doc(user.uid).set({
    user_id: user.uid,
    reference_code: referenceCode,
    full_name: data.full_name,
    birthday: data.birthday,
    city: data.city,
    phone: data.phone,
    profession: data.profession || canonicalMemberProfession(data),
    email: data.email,
    email_verified_by_code: true,
    google_sheet_sync_requested: true,
    status: "pending",
    created_at: window.firebase.firestore.FieldValue.serverTimestamp(),
    updated_at: window.firebase.firestore.FieldValue.serverTimestamp()
  });

  return user;
};

sendMemberToGoogleSheets = async function sendMemberToGoogleSheetsWithProfession(data, user, referenceCode) {
  const result = await callGoogleSheetsAction("saveMembership", {
    reference_code: referenceCode,
    user_id: user.uid,
    full_name: data.full_name,
    birthday: data.birthday,
    city: data.city,
    phone: data.phone,
    profession: data.profession || canonicalMemberProfession(data),
    email: data.email,
    status: "pending",
    source: "cinemana-website",
    created_at: new Date().toISOString()
  });

  if (!result || !result.ok) {
    throw new Error(result && result.message ? result.message : "sheets-sync-failed");
  }
};

function callGoogleSheetsAction(action, payload = {}) {
  if (!isGoogleSheetsConfigured()) {
    return Promise.reject(new Error("sheets-missing"));
  }

  return new Promise((resolve, reject) => {
    const callbackName = `cinemanaSheets_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("sheets-timeout"));
    }, 20000);

    function cleanup() {
      window.clearTimeout(timeout);
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    window[callbackName] = (response) => {
      cleanup();
      resolve(response);
    };

    const url = new URL(GOOGLE_SHEETS_WEB_APP_URL);
    url.searchParams.set("action", action);
    url.searchParams.set("payload", JSON.stringify(payload));
    url.searchParams.set("callback", callbackName);

    script.onerror = () => {
      cleanup();
      reject(new Error("sheets-network"));
    };
    script.src = url.toString();
    document.body.appendChild(script);
  });
}

function getReservationErrorMessage(code) {
  const validation = getExtensionCopy().reservation.validation;
  const map = {
    sheets_missing: validation.sheetsMissing,
    reference_not_found: validation.referenceNotFound,
    email_mismatch: validation.emailMismatch,
    identity_mismatch: validation.identityMismatch,
    seat_required: validation.seatRequired,
    seat_taken: validation.seatTaken,
    missing_fields: validation.required,
    invalid_email: validation.email,
    invalid_age: validation.age
  };
  return map[code] || validation.generic;
}

function normalizeEmail(value) {
  return value.trim().toLowerCase();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getMemberReservationData() {
  return {
    type: "member",
    full_name: document.getElementById("memberReservationName").value.trim(),
    member_reference: document.getElementById("memberCode").value.trim(),
    phone: document.getElementById("memberTel").value.trim(),
    whatsapp: document.getElementById("memberTel").value.trim(),
    email: normalizeEmail(document.getElementById("memberReservationEmail").value),
    age: "",
    profession: "",
    source: "Réservation membre"
  };
}

function getPublicReservationData() {
  return {
    type: "public",
    full_name: document.getElementById("publicName").value.trim(),
    whatsapp: document.getElementById("publicWhatsapp").value.trim(),
    phone: document.getElementById("publicWhatsapp").value.trim(),
    email: normalizeEmail(document.getElementById("publicEmail").value),
    age: document.getElementById("publicAge").value.trim(),
    profession: document.getElementById("publicRole").value.trim(),
    source: document.getElementById("publicSource").value.trim(),
    member_reference: ""
  };
}

function validateReservationData(data, requireMemberReference) {
  const validation = getExtensionCopy().reservation.validation;
  const required = [
    data.full_name,
    data.phone || data.whatsapp,
    data.email
  ];

  if (requireMemberReference) required.push(data.member_reference);
  if (!requireMemberReference) required.push(data.age, data.profession, data.source);
  if (required.some((value) => !value)) return validation.required;
  if (!isValidEmail(data.email)) return validation.email;
  if (!requireMemberReference) {
    const age = Number(data.age);
    if (!Number.isFinite(age) || age < 6 || age > 120) return validation.age;
  }
  return "";
}

submitMemberReservation = async function submitMemberReservationWithSheets(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector('button[type="submit"]');
  const message = document.getElementById("memberReservationMessage");
  const copy = getExtensionCopy().reservation;
  const data = getMemberReservationData();
  const validationError = validateReservationData(data, true);

  if (validationError) {
    setFormMessage(message, validationError, "error");
    return;
  }

  if (!isGoogleSheetsConfigured()) {
    setFormMessage(message, copy.validation.sheetsMissing, "error");
    return;
  }

  setFormMessage(message, copy.seat.loadingSeats);
  if (button) button.disabled = true;

  try {
    const result = await callGoogleSheetsAction("verifyMember", data);
    if (!result || !result.ok) {
      setFormMessage(message, getReservationErrorMessage(result && result.code), "error");
      return;
    }

    if (result.member && result.member.profession) data.profession = result.member.profession;
    setFormMessage(message, copy.member.verified, "success");
    await beginSeatSelection(data);
  } catch (error) {
    setFormMessage(message, getReservationErrorMessage(error.message === "sheets-missing" ? "sheets_missing" : ""), "error");
  } finally {
    if (button) button.disabled = false;
  }
};

submitPublicReservation = async function submitPublicReservationWithSeats(event) {
  event.preventDefault();
  const message = document.getElementById("publicReservationMessage");
  const data = getPublicReservationData();
  const validationError = validateReservationData(data, false);

  if (validationError) {
    setFormMessage(message, validationError, "error");
    return;
  }

  if (!isGoogleSheetsConfigured()) {
    setFormMessage(message, getExtensionCopy().reservation.validation.sheetsMissing, "error");
    return;
  }

  setFormMessage(message, "");
  await beginSeatSelection(data);
};

async function beginSeatSelection(data) {
  pendingReservation = data;
  selectedSeat = "";
  reservedSeats = new Set();

  const cards = document.querySelector(".reservation-choice-grid");
  const section = document.getElementById("seatSelection");
  const button = document.getElementById("confirmSeatButton");
  const message = document.getElementById("seatSelectionMessage");
  const copy = getExtensionCopy().reservation.seat;

  if (cards) cards.hidden = true;
  if (section) section.hidden = false;
  if (button) button.disabled = true;
  setFormMessage(message, copy.loadingSeats);
  updateSelectedSeatSummary();
  renderSeatMap();

  try {
    const result = await callGoogleSheetsAction("getReservedSeats", {});
    if (!result || !result.ok) {
      setFormMessage(message, getReservationErrorMessage(result && result.code), "error");
      return;
    }
    reservedSeats = new Set((result.seats || []).map((seat) => String(seat).toUpperCase()));
    renderSeatMap();
    setFormMessage(message, "");
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    setFormMessage(message, getReservationErrorMessage(error.message === "sheets-missing" ? "sheets_missing" : ""), "error");
  }
}

function cancelSeatSelection() {
  pendingReservation = null;
  selectedSeat = "";

  const cards = document.querySelector(".reservation-choice-grid");
  const section = document.getElementById("seatSelection");
  const button = document.getElementById("confirmSeatButton");

  if (cards) cards.hidden = false;
  if (section) section.hidden = true;
  if (button) button.disabled = true;
  clearMessage("seatSelectionMessage");
  updateSelectedSeatSummary();
  window.scrollTo({ top: document.getElementById("page-reservation").offsetTop, behavior: "smooth" });
}

function renderSeatMap() {
  const map = document.getElementById("seatMap");
  if (!map) return;

  map.innerHTML = "";
  CINEMANA_SEAT_ROWS.forEach((row) => {
    const rowEl = document.createElement("div");
    rowEl.className = "seat-row";

    const label = document.createElement("span");
    label.className = "seat-row-label";
    label.textContent = row;
    rowEl.appendChild(label);

    for (let number = 1; number <= CINEMANA_SEAT_COUNT; number += 1) {
      const seat = `${row}${number}`;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "seat-button";
      button.textContent = String(number);
      button.dataset.seat = seat;
      button.setAttribute("aria-label", seat);
      if (reservedSeats.has(seat)) {
        button.disabled = true;
        button.classList.add("reserved");
      }
      if (selectedSeat === seat) button.classList.add("selected");
      button.addEventListener("click", () => selectSeat(seat));
      rowEl.appendChild(button);
    }

    map.appendChild(rowEl);
  });
}

function selectSeat(seat) {
  if (!pendingReservation || reservedSeats.has(seat)) return;
  selectedSeat = seat;
  const button = document.getElementById("confirmSeatButton");
  if (button) button.disabled = false;
  clearMessage("seatSelectionMessage");
  updateSelectedSeatSummary();
  renderSeatMap();
}

function updateSelectedSeatSummary() {
  const summary = document.getElementById("selectedSeatSummary");
  const copy = getExtensionCopy().reservation.seat;
  if (summary) summary.textContent = selectedSeat ? copy.selected(selectedSeat) : copy.none;
}

async function confirmSeatSelection() {
  const message = document.getElementById("seatSelectionMessage");
  const button = document.getElementById("confirmSeatButton");
  const copy = getExtensionCopy().reservation;

  if (!pendingReservation || !selectedSeat) {
    setFormMessage(message, copy.validation.seatRequired, "error");
    return;
  }

  setFormMessage(message, copy.seat.loadingCreate);
  if (button) button.disabled = true;

  try {
    const result = await callGoogleSheetsAction("createReservation", {
      ...pendingReservation,
      seat: selectedSeat
    });

    if (!result || !result.ok) {
      if (result && result.code === "seat_taken" && result.seats) {
        reservedSeats = new Set(result.seats.map((seat) => String(seat).toUpperCase()));
        selectedSeat = "";
        renderSeatMap();
        updateSelectedSeatSummary();
      }
      setFormMessage(message, getReservationErrorMessage(result && result.code), "error");
      if (button && selectedSeat) button.disabled = false;
      return;
    }

    reservedSeats.add(result.seat);
    setFormMessage(message, copy.seat.success(pendingReservation.full_name, result.reference, result.seat), "success");
    document.getElementById("memberReservationForm").reset();
    document.getElementById("publicReservationForm").reset();
    pendingReservation = null;
    selectedSeat = "";
    renderSeatMap();
    updateSelectedSeatSummary();
  } catch (error) {
    setFormMessage(message, getReservationErrorMessage(error.message === "sheets-missing" ? "sheets_missing" : ""), "error");
    if (button) button.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const professionSelect = document.getElementById("memberProfessionType");
  if (professionSelect) professionSelect.addEventListener("change", handleMemberProfessionChange);
  handleMemberProfessionChange();
  applyExtensionTexts();
});
