const CINEMANA_SEAT_ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const CINEMANA_SEAT_COUNT = 20;
// The 10 center seats of row A (closest to the screen) are permanently held back
// from booking for every event, regardless of what the sheet reports for them.
const CINEMANA_BLOCKED_SEATS = new Set(["A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15"]);
const CINEMANA_RESERVATION_EVENTS = [
  {
    // Active reservation event. Keep one object here so old projections no longer appear.
    id: "le-monte-moussa",
    title: "LE MONT MOUSSA",
    posterTitle: "LE MONT\nMOUSSA",
    poster: "assets/events/le-monte-moussa.jpg?v=20260618-event",
    posterFallback: "Affiche officielle",
    date: "Dimanche 28 juin 2026",
    time: "19:00",
    venue: "Palais de la Culture Malabata - Tanger",
    category: "Projection et discussion",
    summary: "Projection suivie d'une discussion autour du film de Driss Mrini."
  }
];

const CINEMANA_EXTENSION_COPY = {
  fr: {
    modal: {
      labels: {
        profession: "Fonction / Profession",
        professionOther: "Autre fonction",
        referralType: "Comment avez-vous connu CINEMANA ?",
        referralSocial: "Réseau social",
        referralOther: "Précisez",
        rulesConsent: "Je confirme avoir pris connaissance du règlement intérieur de la Fondation CINEMANA, je m'engage à le respecter et j'assume l'entière responsabilité de toute information inexacte ou violation des règles applicables."
      },
      professionOptions: {
        empty: "Choisir une fonction",
        student: "Étudiant",
        employee: "Employé",
        other: "Autre"
      },
      referralOptions: {
        empty: "Choisir une réponse",
        social: "Réseaux sociaux",
        internet: "Internet",
        person: "Suggestion d’une personne",
        chance: "Par hasard",
        other: "Autre"
      },
      socialOptions: {
        empty: "Choisir le réseau",
        instagram: "Instagram",
        facebook: "Facebook",
        tiktok: "TikTok",
        youtube: "YouTube",
        whatsapp: "WhatsApp",
        linkedin: "LinkedIn",
        x: "X / Twitter"
      },
      verifyButton: "Vérifier le code et envoyer ma demande",
      loadingCreate: "Vérification du code et envoi de la demande...",
      success: (name) => `Merci ${name}. Nous avons bien reçu votre demande d’adhésion CINEMANA. Notre équipe va l’étudier et vous répondra dans les plus brefs délais.`,
      completeTitle: "Demande envoyée",
      completeHome: "Retour à l’accueil",
      validation: {
        professionOther: "Veuillez préciser votre fonction.",
        referralSocial: "Veuillez choisir le réseau social.",
        referralOther: "Veuillez préciser comment vous nous avez connus.",
        rulesConsent: "Veuillez confirmer votre engagement à respecter le règlement intérieur de CINEMANA."
      }
    },
    reservation: {
      event: {
        eyebrow: "Événement",
        title: "Choisissez l’événement",
        intro: "Sélectionnez la projection avant de remplir le formulaire de réservation.",
        selectedLabel: "Événement sélectionné",
        change: "Changer",
        choose: "Réserver cet événement",
        required: "Veuillez choisir un événement avant de continuer.",
        category: "Projection et discussion",
        dateLabel: "Date",
        timeLabel: "Heure",
        venueLabel: "Lieu"
      },
      member: {
        steps: ["Saisir les informations membre.", "Vérification dans la base CINEMANA.", "Choix d’un seul siège.", "Confirmation avec référence et QR code."],
        labels: {
          name: "Nom complet",
          firstName: "Prénom",
          lastName: "Nom",
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
        intro: "Les sièges réservés ou en attente ne sont pas disponibles.",
        back: "Retour",
        stage: "SCÈNE",
        entrance1: "ENTRÉE 1",
        entrance2: "ENTRÉE 2",
        available: "Disponible",
        selectedLabel: "Sélectionné",
        pending: "En attente",
        reserved: "Réservé",
        none: "Aucun siège sélectionné.",
        selected: (seat) => `Siège sélectionné : ${seat}`,
        confirm: "Confirmer la réservation",
        loadingSeats: "Chargement des sièges disponibles...",
        loadingCreate: "Enregistrement de la réservation...",
        confirmedSuccess: (name, reference, seat) => `Merci ${name}. Votre réservation ${reference} est confirmée pour le siège ${seat}. Un e-mail avec le QR code va vous arriver.`,
        pendingSuccess: (name) => `Merci ${name}. Votre demande de réservation est enregistrée. Nous vous contacterons pour confirmer votre réservation, puis le ticket vous sera envoyé par e-mail après validation.`
      },
      complete: {
        eyebrow: "Réservation",
        pendingTitle: "Demande enregistrée",
        confirmedTitle: "Réservation confirmée",
        home: "Retour à l’accueil"
      },
      validation: {
        required: "Veuillez remplir tous les champs obligatoires.",
        email: "Veuillez entrer une adresse e-mail valide.",
        phone: "Veuillez entrer un numéro marocain valide (06XXXXXXXX, 07XXXXXXXX ou +2126XXXXXXXX).",
        age: "Veuillez entrer un âge valide.",
        sheetsMissing: "Configuration Google Sheets manquante. Vérifiez GOOGLE_SHEETS_WEB_APP_URL.",
        referenceNotFound: "Ce code membre n’existe pas dans la liste des membres.",
        emailMismatch: "Cet e-mail n’est pas lié à ce code membre.",
        identityMismatch: "Le nom saisi ne correspond pas à ce code membre.",
        memberNotApproved: "Cette carte membre n’est pas encore validée. Votre demande est en cours de revue.",
        seatRequired: "Veuillez choisir un siège.",
        seatTaken: "Ce siège vient d’être réservé. Choisissez un autre siège.",
        sheetsTimeout: "Google Apps Script ne répond pas. Vérifiez que le Web App est déployé avec le nouveau code.",
        sheetsNetwork: "Impossible de contacter Google Apps Script. Vérifiez le Web App URL et les permissions.",
        sheetsInvalidResponse: "Apps Script n’est pas à jour. Collez le nouveau code, redéployez le Web App, puis remplacez GOOGLE_SHEETS_WEB_APP_URL si l’URL change.",
        unknownAction: "Apps Script ne reconnaît pas cette action. Redéployez le nouveau script CINEMANA.",
        duplicateEmail: "Cet e-mail a déjà une réservation active.",
        duplicatePhone: "Ce numéro de téléphone a déjà une réservation active.",
        memberAlreadyReserved: "Ce code membre a déjà été utilisé pour une réservation active.",
        generic: "Impossible de terminer l’opération pour le moment. Veuillez réessayer."
      }
    }
  },
  en: {
    modal: {
      labels: {
        profession: "Role / Profession",
        professionOther: "Other role",
        referralType: "How did you hear about CINEMANA?",
        referralSocial: "Social network",
        referralOther: "Please specify",
        rulesConsent: "I confirm that I have read the CINEMANA Foundation internal rules, agree to respect them, and accept full responsibility for any inaccurate information or violation of the applicable rules."
      },
      professionOptions: {
        empty: "Choose a role",
        student: "Student",
        employee: "Employee",
        other: "Other"
      },
      referralOptions: {
        empty: "Choose an answer",
        social: "Social media",
        internet: "Internet",
        person: "Suggested by someone",
        chance: "By chance",
        other: "Other"
      },
      socialOptions: {
        empty: "Choose the network",
        instagram: "Instagram",
        facebook: "Facebook",
        tiktok: "TikTok",
        youtube: "YouTube",
        whatsapp: "WhatsApp",
        linkedin: "LinkedIn",
        x: "X / Twitter"
      },
      verifyButton: "Verify code and send my request",
      loadingCreate: "Verifying the code and sending the request...",
      success: (name) => `Thank you ${name}. We have received your CINEMANA membership request. Our team will review it and get back to you as soon as possible.`,
      completeTitle: "Request sent",
      completeHome: "Back to home",
      validation: {
        professionOther: "Please specify your role.",
        referralSocial: "Please choose the social network.",
        referralOther: "Please specify how you heard about us.",
        rulesConsent: "Please confirm your commitment to respect CINEMANA internal rules."
      }
    },
    reservation: {
      event: {
        eyebrow: "Event",
        title: "Choose the event",
        intro: "Select the screening before filling in the reservation form.",
        selectedLabel: "Selected event",
        change: "Change",
        choose: "Reserve this event",
        required: "Please choose an event before continuing.",
        category: "Screening and discussion",
        dateLabel: "Date",
        timeLabel: "Time",
        venueLabel: "Venue"
      },
      member: {
        steps: ["Enter member information.", "Verify it in the CINEMANA database.", "Choose one seat only.", "Confirm with a reference and QR code."],
        labels: {
          name: "Full name",
          firstName: "First name",
          lastName: "Last name",
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
        intro: "Reserved or pending seats are not available.",
        back: "Back",
        stage: "STAGE",
        entrance1: "ENTRANCE 1",
        entrance2: "ENTRANCE 2",
        available: "Available",
        selectedLabel: "Selected",
        pending: "Pending",
        reserved: "Reserved",
        none: "No seat selected.",
        selected: (seat) => `Selected seat: ${seat}`,
        confirm: "Confirm reservation",
        loadingSeats: "Loading available seats...",
        loadingCreate: "Saving the reservation...",
        confirmedSuccess: (name, reference, seat) => `Thank you ${name}. Your reservation ${reference} is confirmed for seat ${seat}. An e-mail with the QR code will arrive shortly.`,
        pendingSuccess: (name) => `Thank you ${name}. Your reservation request has been saved. We will contact you to confirm it, then the ticket will be sent by e-mail after approval.`
      },
      complete: {
        eyebrow: "Reservation",
        pendingTitle: "Request Saved",
        confirmedTitle: "Reservation Confirmed",
        home: "Back to home"
      },
      validation: {
        required: "Please fill in all required fields.",
        email: "Please enter a valid e-mail address.",
        phone: "Please enter a valid Moroccan phone number (06XXXXXXXX, 07XXXXXXXX or +2126XXXXXXXX).",
        age: "Please enter a valid age.",
        sheetsMissing: "Google Sheets configuration is missing. Check GOOGLE_SHEETS_WEB_APP_URL.",
        referenceNotFound: "This member code does not exist in the members list.",
        emailMismatch: "This e-mail is not linked to this member code.",
        identityMismatch: "The entered name does not match this member code.",
        memberNotApproved: "This membership card is not approved yet. Your request is still under review.",
        seatRequired: "Please choose a seat.",
        seatTaken: "This seat has just been reserved. Choose another seat.",
        sheetsTimeout: "Google Apps Script is not responding. Make sure the Web App is deployed with the new code.",
        sheetsNetwork: "Unable to contact Google Apps Script. Check the Web App URL and permissions.",
        sheetsInvalidResponse: "Apps Script is not up to date. Paste the new code, redeploy the Web App, then replace GOOGLE_SHEETS_WEB_APP_URL if the URL changes.",
        unknownAction: "Apps Script does not recognize this action. Redeploy the new CINEMANA script.",
        duplicateEmail: "This e-mail already has an active reservation.",
        duplicatePhone: "This phone number already has an active reservation.",
        memberAlreadyReserved: "This member code has already been used for an active reservation.",
        generic: "Unable to complete the operation right now. Please try again."
      }
    }
  },
  ar: {
    modal: {
      labels: {
        profession: "المهنة / الصفة",
        professionOther: "مهنة أخرى",
        referralType: "كيفاش عرفتينا؟",
        referralSocial: "موقع التواصل",
        referralOther: "وضح أكثر",
        rulesConsent: "أؤكد أنني اطلعت على القانون الداخلي لمؤسسة CINEMANA وألتزم باحترامه، وأتحمل كامل المسؤولية عن أي معلومات غير صحيحة أو مخالفة للقواعد المعمول بها."
      },
      professionOptions: {
        empty: "اختر المهنة",
        student: "طالب",
        employee: "مستخدم",
        other: "أخرى"
      },
      referralOptions: {
        empty: "اختار الجواب",
        social: "مواقع التواصل",
        internet: "الإنترنت",
        person: "اقتراح من شخص",
        chance: "صدفة",
        other: "آخر"
      },
      socialOptions: {
        empty: "اختار الموقع",
        instagram: "Instagram",
        facebook: "Facebook",
        tiktok: "TikTok",
        youtube: "YouTube",
        whatsapp: "WhatsApp",
        linkedin: "LinkedIn",
        x: "X / Twitter"
      },
      verifyButton: "تأكيد الرمز وإرسال الطلب",
      loadingCreate: "جاري تأكيد الرمز وإرسال الطلب...",
      success: (name) => `شكرا ${name}. توصلنا بطلب العضوية ديالك فـ CINEMANA. الفريق ديالنا غادي يراجع الطلب وغادي نجاوبوك ف أقرب وقت.`,
      completeTitle: "تم إرسال الطلب",
      completeHome: "الرئيسية",
      validation: {
        professionOther: "يرجى كتابة المهنة.",
        referralSocial: "يرجى اختيار موقع التواصل.",
        referralOther: "يرجى توضيح كيفاش عرفتينا.",
        rulesConsent: "يرجى تأكيد الالتزام باحترام القانون الداخلي لمؤسسة CINEMANA."
      }
    },
    reservation: {
      event: {
        eyebrow: "الحدث",
        title: "اختار الحدث",
        intro: "اختار العرض أولا، ومن بعد عمر استمارة الحجز.",
        selectedLabel: "الحدث المختار",
        change: "تغيير",
        choose: "الحجز في هذا الحدث",
        required: "يرجى اختيار حدث قبل المتابعة.",
        category: "عرض ومناقشة فيلم",
        dateLabel: "التاريخ",
        timeLabel: "الوقت",
        venueLabel: "المكان"
      },
      member: {
        steps: ["أدخل معلومات العضوية.", "التحقق من قاعدة بيانات سينمانا.", "اختر كرسيا واحدا فقط.", "تأكيد الحجز مع المرجع و QR code."],
        labels: {
          name: "الاسم الكامل",
          firstName: "الاسم",
          lastName: "النسب",
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
        intro: "الكراسي المحجوزة أو المعلقة غير متاحة.",
        back: "رجوع",
        stage: "المنصة",
        entrance1: "المدخل 1",
        entrance2: "المدخل 2",
        available: "متاح",
        selectedLabel: "مختار",
        pending: "معلق",
        reserved: "محجوز",
        none: "لم يتم اختيار أي كرسي.",
        selected: (seat) => `الكرسي المختار: ${seat}`,
        confirm: "تأكيد الحجز",
        loadingSeats: "جاري تحميل الكراسي المتاحة...",
        loadingCreate: "جاري تسجيل الحجز...",
        confirmedSuccess: (name, reference, seat) => `شكرا ${name}. تم تأكيد الحجز ${reference} للكرسي ${seat}. سيصلك إيميل فيه QR code قريبا.`,
        pendingSuccess: (name) => `شكرا ${name}. تم تسجيل طلب الحجز ديالك. غادي نتواصلو معاك باش نأكدو الحجز، ومن بعد غادي يوصلك ticket عبر الإيميل.`
      },
      complete: {
        eyebrow: "الحجز",
        pendingTitle: "تم تسجيل الطلب",
        confirmedTitle: "تم تأكيد الحجز",
        home: "الرئيسية"
      },
      validation: {
        required: "يرجى ملء جميع الحقول الضرورية.",
        email: "يرجى إدخال بريد إلكتروني صحيح.",
        phone: "يرجى إدخال رقم هاتف مغربي صحيح (06XXXXXXXX أو 07XXXXXXXX أو +2126XXXXXXXX).",
        age: "يرجى إدخال عمر صحيح.",
        sheetsMissing: "إعدادات Google Sheets غير موجودة. تحقق من GOOGLE_SHEETS_WEB_APP_URL.",
        referenceNotFound: "كود العضوية غير موجود في لائحة الأعضاء.",
        emailMismatch: "هذا الإيميل غير مرتبط بكود العضوية.",
        identityMismatch: "الاسم المدخل لا يطابق كود العضوية.",
        memberNotApproved: "بطاقة العضوية مازال ما تقبلاتش. الطلب ديالك باقي قيد المراجعة.",
        seatRequired: "يرجى اختيار كرسي.",
        seatTaken: "هذا الكرسي تم حجزه الآن. اختر كرسيا آخر.",
        sheetsTimeout: "Google Apps Script لا يجيب. تأكد أن Web App منشور بالكود الجديد.",
        sheetsNetwork: "تعذر الاتصال ب Google Apps Script. تحقق من رابط Web App والصلاحيات.",
        sheetsInvalidResponse: "Apps Script مازال ما محدثش. لسق الكود الجديد، دير Deploy من جديد، وبدل GOOGLE_SHEETS_WEB_APP_URL إذا تبدل الرابط.",
        unknownAction: "Apps Script ما تعرفش على هاد العملية. دير Deploy للسكريبت الجديد ديال CINEMANA.",
        duplicateEmail: "هاد الإيميل راه عندو ريزيرفاسيون نشيطة من قبل.",
        duplicatePhone: "هاد رقم الهاتف راه عندو ريزيرفاسيون نشيطة من قبل.",
        memberAlreadyReserved: "هاد كود العضوية تستعمل من قبل فريزيرفاسيون نشيطة.",
        generic: "تعذر إتمام العملية الآن. حاول مرة أخرى."
      }
    }
  }
};

let pendingReservation = null;
let activeSeatStatuses = new Map();
let selectedSeat = "";
let selectedReservationEvent = null;

function extendCinemanaTranslations() {
  Object.keys(CINEMANA_EXTENSION_COPY).forEach((language) => {
    const source = CINEMANA_EXTENSION_COPY[language];
    const target = TRANSLATIONS[language];
    if (!target) return;

    target.modal.labels = { ...target.modal.labels, ...source.modal.labels };
    target.modal.professionOptions = source.modal.professionOptions;
    target.modal.referralOptions = source.modal.referralOptions;
    target.modal.socialOptions = source.modal.socialOptions;
    target.modal.verifyButton = source.modal.verifyButton;
    target.modal.loadingCreate = source.modal.loadingCreate;
    target.modal.success = source.modal.success;
    target.modal.completeTitle = source.modal.completeTitle;
    target.modal.completeHome = source.modal.completeHome;
    target.modal.validation = { ...target.modal.validation, ...source.modal.validation };

    target.reservation.event = source.reservation.event;
    target.reservation.member.steps = source.reservation.member.steps;
    target.reservation.member.labels = { ...target.reservation.member.labels, ...source.reservation.member.labels };
    target.reservation.member.button = source.reservation.member.button;
    target.reservation.member.verified = source.reservation.member.verified;
    target.reservation.public.steps = source.reservation.public.steps;
    target.reservation.public.labels = { ...target.reservation.public.labels, ...source.reservation.public.labels };
    target.reservation.public.button = source.reservation.public.button;
    target.reservation.seat = source.reservation.seat;
    target.reservation.complete = source.reservation.complete;
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
  setLabel("memberReferralType", modal.labels.referralType);
  setLabel("memberReferralSocial", modal.labels.referralSocial);
  setLabel("memberReferralOther", modal.labels.referralOther);
  setOption('#memberReferralType option[value=""]', modal.referralOptions.empty);
  setOption('#memberReferralType option[value="social"]', modal.referralOptions.social);
  setOption('#memberReferralType option[value="internet"]', modal.referralOptions.internet);
  setOption('#memberReferralType option[value="person"]', modal.referralOptions.person);
  setOption('#memberReferralType option[value="chance"]', modal.referralOptions.chance);
  setOption('#memberReferralType option[value="other"]', modal.referralOptions.other);
  setOption('#memberReferralSocial option[value=""]', modal.socialOptions.empty);
  setOption('#memberReferralSocial option[value="instagram"]', modal.socialOptions.instagram);
  setOption('#memberReferralSocial option[value="facebook"]', modal.socialOptions.facebook);
  setOption('#memberReferralSocial option[value="tiktok"]', modal.socialOptions.tiktok);
  setOption('#memberReferralSocial option[value="youtube"]', modal.socialOptions.youtube);
  setOption('#memberReferralSocial option[value="whatsapp"]', modal.socialOptions.whatsapp);
  setOption('#memberReferralSocial option[value="linkedin"]', modal.socialOptions.linkedin);
  setOption('#memberReferralSocial option[value="x"]', modal.socialOptions.x);
  setText("#memberRulesConsentText", modal.labels.rulesConsent);
  setText("#memberCompleteTitle", modal.completeTitle);
  setText("#memberCompleteHome", modal.completeHome);

  setText("#reservationEventEyebrow", reservation.event.eyebrow);
  setText("#reservationEventTitle", reservation.event.title);
  setText("#reservationEventIntro", reservation.event.intro);
  setText("#reservationSelectedEventLabel", reservation.event.selectedLabel);
  setText("#reservationEventChange", reservation.event.change);
  renderReservationEvents();
  updateSelectedReservationEventPanel();

  setLabel("memberReservationFirstName", reservation.member.labels.firstName);
  setLabel("memberReservationLastName", reservation.member.labels.lastName);
  setLabel("memberCode", reservation.member.labels.code);
  setLabel("memberTel", reservation.member.labels.phone);
  setLabel("memberReservationEmail", reservation.member.labels.email);
  setText("#memberReservationForm button", reservation.member.button);

  setLabel("publicFirstName", reservation.public.labels.firstName);
  setLabel("publicLastName", reservation.public.labels.lastName);
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
  if (legendItems[2]) legendItems[2].lastChild.textContent = reservation.seat.pending;
  if (legendItems[3]) legendItems[3].lastChild.textContent = reservation.seat.reserved;

  setText("#reservationCompleteEyebrow", reservation.complete.eyebrow);
  setText("#reservationCompleteHome", reservation.complete.home);

  const summary = document.getElementById("selectedSeatSummary");
  if (summary) summary.textContent = selectedSeat ? reservation.seat.selected(selectedSeat) : reservation.seat.none;
  setText("#confirmSeatButton", reservation.seat.confirm);
}

function getReservationEventById(eventId) {
  return CINEMANA_RESERVATION_EVENTS.find((event) => event.id === eventId) || null;
}

function renderReservationEvents() {
  const grid = document.getElementById("reservationEventGrid");
  if (!grid) return;

  const copy = getExtensionCopy().reservation.event;
  grid.innerHTML = "";
  CINEMANA_RESERVATION_EVENTS.forEach((event) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "reservation-event-card";
    card.dataset.eventId = event.id;
    card.setAttribute("aria-label", `${copy.choose}: ${event.title}`);
    card.addEventListener("click", () => selectReservationEvent(event.id));

    const poster = document.createElement("span");
    poster.className = "reservation-event-poster";
    poster.setAttribute("aria-hidden", "true");
    if (event.poster) {
      const posterImage = document.createElement("img");
      posterImage.src = event.poster;
      posterImage.alt = "";
      posterImage.loading = "lazy";
      posterImage.addEventListener("load", () => poster.classList.add("has-image"));
      posterImage.addEventListener("error", () => poster.classList.add("image-missing"));
      poster.appendChild(posterImage);
    }
    const posterTitle = document.createElement("span");
    posterTitle.className = "reservation-event-poster-fallback";
    posterTitle.innerHTML = (event.posterFallback || event.posterTitle).split("\n").map(escapeHtml).join("<br>");
    poster.appendChild(posterTitle);

    const body = document.createElement("span");
    body.className = "reservation-event-body";
    body.innerHTML = `
      <span class="eyebrow">${escapeHtml(copy.category || event.category)}</span>
      <strong>${escapeHtml(event.title)}</strong>
      <span class="reservation-event-meta">
        <span>${escapeHtml(event.date)}</span>
        <span>${escapeHtml(event.time)}</span>
        <span>${escapeHtml(event.venue)}</span>
      </span>
      ${event.summary ? `<span class="reservation-event-summary">${escapeHtml(event.summary)}</span>` : ""}
      <span class="reservation-event-action">${escapeHtml(copy.choose)}</span>
    `;

    card.appendChild(poster);
    card.appendChild(body);
    grid.appendChild(card);
  });
}

function selectReservationEvent(eventId) {
  const event = getReservationEventById(eventId);
  if (!event) return;

  selectedReservationEvent = event;
  const selector = document.getElementById("reservationEventSelector");
  const selectedPanel = document.getElementById("reservationSelectedEvent");
  const cards = document.querySelector(".reservation-choice-grid");
  const seatSection = document.getElementById("seatSelection");
  const complete = document.getElementById("reservationComplete");

  if (selector) selector.hidden = true;
  if (selectedPanel) selectedPanel.hidden = false;
  if (cards) cards.hidden = false;
  if (seatSection) seatSection.hidden = true;
  if (complete) complete.hidden = true;
  clearMessage("memberReservationMessage");
  clearMessage("publicReservationMessage");
  clearMessage("seatSelectionMessage");
  updateSelectedReservationEventPanel();
  if (cards) cards.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetReservationEvent() {
  selectedReservationEvent = null;
  pendingReservation = null;
  selectedSeat = "";
  activeSeatStatuses = new Map();

  const selector = document.getElementById("reservationEventSelector");
  const selectedPanel = document.getElementById("reservationSelectedEvent");
  const cards = document.querySelector(".reservation-choice-grid");
  const seatSection = document.getElementById("seatSelection");
  const complete = document.getElementById("reservationComplete");
  const button = document.getElementById("confirmSeatButton");

  if (selector) selector.hidden = false;
  if (selectedPanel) selectedPanel.hidden = true;
  if (cards) cards.hidden = true;
  if (seatSection) seatSection.hidden = true;
  if (complete) complete.hidden = true;
  if (button) button.disabled = true;
  clearMessage("memberReservationMessage");
  clearMessage("publicReservationMessage");
  clearMessage("seatSelectionMessage");
  updateSelectedSeatSummary();
  if (selector) selector.scrollIntoView({ behavior: "smooth", block: "start" });
}

function updateSelectedReservationEventPanel() {
  const title = document.getElementById("reservationSelectedEventTitle");
  if (title) title.textContent = selectedReservationEvent ? selectedReservationEvent.title : "";
}

function addSelectedReservationEvent(data) {
  if (!selectedReservationEvent) return data;
  return {
    ...data,
    event_id: selectedReservationEvent.id,
    event_title: selectedReservationEvent.title,
    event_date: selectedReservationEvent.date,
    event_time: selectedReservationEvent.time,
    event_venue: selectedReservationEvent.venue
  };
}

function canonicalMemberProfession(data) {
  if (data.profession_type === "student") return "Étudiant";
  if (data.profession_type === "employee") return "Employé";
  return data.profession_other.trim();
}

function canonicalMemberReferral(data) {
  if (data.referral_type === "social") {
    const names = {
      instagram: "Instagram",
      facebook: "Facebook",
      tiktok: "TikTok",
      youtube: "YouTube",
      whatsapp: "WhatsApp",
      linkedin: "LinkedIn",
      x: "X / Twitter"
    };
    return `Réseaux sociaux - ${names[data.referral_social] || data.referral_social}`;
  }
  if (data.referral_type === "internet") return "Internet";
  if (data.referral_type === "person") return "Suggestion d’une personne";
  if (data.referral_type === "chance") return "Par hasard";
  return data.referral_other.trim();
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

function handleMemberReferralChange() {
  const type = document.getElementById("memberReferralType");
  const socialWrap = document.getElementById("memberReferralSocialWrap");
  const social = document.getElementById("memberReferralSocial");
  const otherWrap = document.getElementById("memberReferralOtherWrap");
  const other = document.getElementById("memberReferralOther");
  const showSocial = type && type.value === "social";
  const showOther = type && type.value === "other";

  if (socialWrap) socialWrap.hidden = !showSocial;
  if (social) {
    social.required = Boolean(showSocial);
    if (!showSocial) social.value = "";
  }

  if (otherWrap) otherWrap.hidden = !showOther;
  if (other) {
    other.required = Boolean(showOther);
    if (!showOther) other.value = "";
  }
}

const originalSetLanguage = setLanguage;
extendCinemanaTranslations();
setLanguage = function setLanguageWithReservation(language) {
  originalSetLanguage(language);
  applyExtensionTexts();
  handleMemberProfessionChange();
  handleMemberReferralChange();
  renderSeatMap();
};

const originalResetMemberVerification = resetMemberVerification;
resetMemberVerification = function resetMemberVerificationWithProfession(clearForm = false) {
  originalResetMemberVerification(clearForm);
  handleMemberProfessionChange();
  handleMemberReferralChange();
};

getMemberFormData = function getMemberFormDataWithProfession() {
  const firstName = document.getElementById("memberFirstName").value.trim();
  const lastName = document.getElementById("memberLastName").value.trim();
  return {
    first_name: firstName,
    last_name: lastName,
    full_name: combineNameParts(firstName, lastName),
    birthday: document.getElementById("memberBirthday").value,
    city: document.getElementById("memberCity").value.trim(),
    phone: document.getElementById("memberPhone").value.trim(),
    profession_type: document.getElementById("memberProfessionType").value,
    profession_other: document.getElementById("memberProfessionOther").value.trim(),
    referral_type: document.getElementById("memberReferralType").value,
    referral_social: document.getElementById("memberReferralSocial").value,
    referral_other: document.getElementById("memberReferralOther").value.trim(),
    email: document.getElementById("memberEmail").value.trim(),
    password: document.getElementById("memberPassword").value,
    repeat_password: document.getElementById("memberRepeatPassword").value,
    rules_consent: Boolean(document.getElementById("memberRulesConsent") && document.getElementById("memberRulesConsent").checked)
  };
};

validateMemberForm = function validateMemberFormWithProfession(data) {
  const messages = TRANSLATIONS[currentLanguage].modal.validation;
  const requiredValues = [
    data.first_name,
    data.last_name,
    data.birthday,
    data.city,
    data.phone,
    data.profession_type,
    data.referral_type,
    data.email,
    data.password,
    data.repeat_password
  ];

  if (requiredValues.some((value) => !value)) return messages.required;
  if (data.profession_type === "other" && !data.profession_other) return messages.professionOther;
  if (data.referral_type === "social" && !data.referral_social) return messages.referralSocial;
  if (data.referral_type === "other" && !data.referral_other) return messages.referralOther;
  if (!data.rules_consent) return messages.rulesConsent;
  if (!isValidMoroccanPhone(data.phone)) return getExtensionCopy().reservation.validation.phone;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return messages.email;

  const birthday = new Date(`${data.birthday}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (Number.isNaN(birthday.getTime()) || birthday >= today) return messages.birthday;

  if (data.password.length < 8) return messages.passwordLength;
  if (data.password !== data.repeat_password) return messages.passwordMatch;

  data.profession = canonicalMemberProfession(data);
  data.heard_about_us = canonicalMemberReferral(data);
  data.phone = normalizeMoroccanPhone(data.phone);
  return "";
};

setMemberFieldsDisabled = function setMemberFieldsDisabledWithProfession(disabled) {
  [
    "memberFirstName",
    "memberLastName",
    "memberBirthday",
    "memberCity",
    "memberPhone",
    "memberProfessionType",
    "memberProfessionOther",
    "memberReferralType",
    "memberReferralSocial",
    "memberReferralOther",
    "memberEmail",
    "memberPassword",
    "memberRepeatPassword",
    "memberRulesConsent",
    "memberProfilePhoto",
    "memberPaymentReceipt"
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
    first_name: data.first_name,
    last_name: data.last_name,
    full_name: data.full_name,
    birthday: data.birthday,
    city: data.city,
    phone: data.phone,
    profession: data.profession || canonicalMemberProfession(data),
    heard_about_us: data.heard_about_us || canonicalMemberReferral(data),
    rules_consent: Boolean(data.rules_consent),
    rules_consent_at: window.firebase.firestore.FieldValue.serverTimestamp(),
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
  // Use a direct POST request (instead of JSONP) so that large base64 image data
  // can be sent in the request body without URL-length limits.
  // Content-Type is set to "text/plain" to avoid a CORS preflight OPTIONS request,
  // which Google Apps Script does not handle.
  const payload = {
    reference_code: referenceCode,
    user_id: user.uid,
    first_name: data.first_name,
    last_name: data.last_name,
    full_name: data.full_name,
    birthday: data.birthday,
    city: data.city,
    phone: data.phone,
    profession: data.profession || canonicalMemberProfession(data),
    heard_about_us: data.heard_about_us || canonicalMemberReferral(data),
    rules_consent: Boolean(data.rules_consent),
    email: data.email,
    status: "pending",
    source: "cinemana-website",
    created_at: new Date().toISOString(),
    profile_picture: data.profile_picture || null,
    payment_receipt: data.payment_receipt || null
  };

  const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ action: "saveMembership", payload })
  });

  if (!response.ok) {
    throw new Error("sheets-network-error");
  }

  let result;
  try {
    result = await response.json();
  } catch (_) {
    throw new Error("sheets-invalid-response");
  }

  if (!result || !result.ok) {
    throw new Error(result && result.message ? result.message : "sheets-sync-failed");
  }
};

function callGoogleSheetsAction(action, payload = {}) {
  if (!isGoogleSheetsConfigured()) {
    return Promise.reject(new Error("sheets_missing"));
  }

  return new Promise((resolve, reject) => {
    const callbackName = `cinemanaSheets_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    let didCallback = false;
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("sheets_timeout"));
    }, 20000);

    function cleanup() {
      window.clearTimeout(timeout);
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    window[callbackName] = (response) => {
      didCallback = true;
      cleanup();
      resolve(response);
    };

    const url = new URL(GOOGLE_SHEETS_WEB_APP_URL);
    url.searchParams.set("action", action);
    url.searchParams.set("payload", JSON.stringify(payload));
    url.searchParams.set("callback", callbackName);

    script.onerror = () => {
      cleanup();
      reject(new Error("sheets_network"));
    };
    script.onload = () => {
      window.setTimeout(() => {
        if (!didCallback) {
          cleanup();
          reject(new Error("sheets_invalid_response"));
        }
      }, 250);
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
    member_not_approved: validation.memberNotApproved,
    seat_required: validation.seatRequired,
    seat_taken: validation.seatTaken,
    seat_blocked: validation.seatTaken,
    sheets_timeout: validation.sheetsTimeout,
    sheets_network: validation.sheetsNetwork,
    sheets_invalid_response: validation.sheetsInvalidResponse,
    unknown_action: validation.unknownAction,
    missing_fields: validation.required,
    invalid_email: validation.email,
    invalid_phone: validation.phone,
    invalid_age: validation.age,
    duplicate_email: validation.duplicateEmail,
    duplicate_phone: validation.duplicatePhone,
    member_already_reserved: validation.memberAlreadyReserved
  };
  return map[code] || validation.generic;
}

function normalizeSeatStatuses(result) {
  const map = new Map();
  if (Array.isArray(result.seat_statuses)) {
    result.seat_statuses.forEach((entry) => {
      const seat = String(entry.seat || "").trim().toUpperCase();
      const status = String(entry.status || "confirmed").trim().toLowerCase();
      if (seat) map.set(seat, status === "pending" ? "pending" : "confirmed");
    });
    return map;
  }

  (result.seats || []).forEach((seat) => {
    const normalized = String(seat || "").trim().toUpperCase();
    if (normalized) map.set(normalized, "confirmed");
  });
  return map;
}

function getReservationSuccessMessage(name, reference, seat, status) {
  const seatCopy = getExtensionCopy().reservation.seat;
  if (status === "pending") return seatCopy.pendingSuccess(name);
  return seatCopy.confirmedSuccess(name, reference, seat);
}

function errorCodeFromException(error) {
  const message = error && error.message ? error.message : "";
  return message.replace(/-/g, "_");
}

function normalizeEmail(value) {
  return value.trim().toLowerCase();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Moroccan phone helper: accepts 06/07XXXXXXXX or +2126/+2127XXXXXXXX and stores 10 local digits.
function normalizeMoroccanPhone(value) {
  let phone = String(value || "").trim().replace(/[\s().-]/g, "");
  if (phone.startsWith("00212")) phone = `+${phone.slice(2)}`;
  if (/^\+212[67]\d{8}$/.test(phone)) return `0${phone.slice(4)}`;
  if (/^212[67]\d{8}$/.test(phone)) return `0${phone.slice(3)}`;
  return phone;
}

function isValidMoroccanPhone(value) {
  return /^0[67]\d{8}$/.test(normalizeMoroccanPhone(value));
}

function getMemberReservationData() {
  const firstName = document.getElementById("memberReservationFirstName").value.trim();
  const lastName = document.getElementById("memberReservationLastName").value.trim();
  return addSelectedReservationEvent({
    type: "member",
    first_name: firstName,
    last_name: lastName,
    full_name: combineNameParts(firstName, lastName),
    member_reference: document.getElementById("memberCode").value.trim(),
    phone: document.getElementById("memberTel").value.trim(),
    whatsapp: document.getElementById("memberTel").value.trim(),
    email: normalizeEmail(document.getElementById("memberReservationEmail").value),
    age: "",
    profession: "",
    source: "Réservation membre"
  });
}

function getPublicReservationData() {
  const firstName = document.getElementById("publicFirstName").value.trim();
  const lastName = document.getElementById("publicLastName").value.trim();
  return addSelectedReservationEvent({
    type: "public",
    first_name: firstName,
    last_name: lastName,
    full_name: combineNameParts(firstName, lastName),
    whatsapp: document.getElementById("publicWhatsapp").value.trim(),
    phone: document.getElementById("publicWhatsapp").value.trim(),
    email: normalizeEmail(document.getElementById("publicEmail").value),
    age: document.getElementById("publicAge").value.trim(),
    profession: document.getElementById("publicRole").value.trim(),
    source: document.getElementById("publicSource").value.trim(),
    member_reference: ""
  });
}

function validateReservationData(data, requireMemberReference) {
  const validation = getExtensionCopy().reservation.validation;
  const required = [
    data.first_name,
    data.last_name,
    data.phone || data.whatsapp,
    data.email
  ];

  if (requireMemberReference) required.push(data.member_reference);
  if (!requireMemberReference) required.push(data.age, data.profession, data.source);
  if (required.some((value) => !value)) return validation.required;
  if (!isValidMoroccanPhone(data.phone || data.whatsapp)) return validation.phone;
  data.phone = normalizeMoroccanPhone(data.phone || data.whatsapp);
  data.whatsapp = data.phone;
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

  if (!selectedReservationEvent) {
    setFormMessage(message, copy.event.required, "error");
    return;
  }

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
    setFormMessage(message, getReservationErrorMessage(errorCodeFromException(error)), "error");
  } finally {
    if (button) button.disabled = false;
  }
};

submitPublicReservation = async function submitPublicReservationWithSeats(event) {
  event.preventDefault();
  const message = document.getElementById("publicReservationMessage");
  const copy = getExtensionCopy().reservation;
  const data = getPublicReservationData();
  const validationError = validateReservationData(data, false);

  if (!selectedReservationEvent) {
    setFormMessage(message, copy.event.required, "error");
    return;
  }

  if (validationError) {
    setFormMessage(message, validationError, "error");
    return;
  }

  if (!isGoogleSheetsConfigured()) {
    setFormMessage(message, copy.validation.sheetsMissing, "error");
    return;
  }

  setFormMessage(message, "");
  await beginSeatSelection(data);
};

async function beginSeatSelection(data) {
  pendingReservation = data;
  selectedSeat = "";
  activeSeatStatuses = new Map();

  const cards = document.querySelector(".reservation-choice-grid");
  const selector = document.getElementById("reservationEventSelector");
  const selectedPanel = document.getElementById("reservationSelectedEvent");
  const section = document.getElementById("seatSelection");
  const button = document.getElementById("confirmSeatButton");
  const message = document.getElementById("seatSelectionMessage");
  const sourceMessage = document.getElementById(data.type === "member" ? "memberReservationMessage" : "publicReservationMessage");
  const copy = getExtensionCopy().reservation.seat;

  if (section) section.hidden = true;
  if (button) button.disabled = true;
  setFormMessage(sourceMessage, copy.loadingSeats);
  clearMessage("seatSelectionMessage");
  updateSelectedSeatSummary();

  try {
    const result = await callGoogleSheetsAction("getReservedSeats", {
      event_id: data.event_id || "",
      event_title: data.event_title || ""
    });
    if (!result || !result.ok) {
      pendingReservation = null;
      setFormMessage(sourceMessage, getReservationErrorMessage(result && result.code), "error");
      return;
    }
    activeSeatStatuses = normalizeSeatStatuses(result);
    if (selector) selector.hidden = true;
    if (selectedPanel) selectedPanel.hidden = true;
    if (cards) cards.hidden = true;
    if (section) section.hidden = false;
    renderSeatMap();
    setFormMessage(sourceMessage, "");
    setFormMessage(message, "");
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    pendingReservation = null;
    setFormMessage(sourceMessage, getReservationErrorMessage(errorCodeFromException(error)), "error");
  }
}

function cancelSeatSelection() {
  pendingReservation = null;
  selectedSeat = "";

  const cards = document.querySelector(".reservation-choice-grid");
  const selector = document.getElementById("reservationEventSelector");
  const selectedPanel = document.getElementById("reservationSelectedEvent");
  const section = document.getElementById("seatSelection");
  const button = document.getElementById("confirmSeatButton");
  const complete = document.getElementById("reservationComplete");

  if (selector) selector.hidden = Boolean(selectedReservationEvent);
  if (selectedPanel) selectedPanel.hidden = !selectedReservationEvent;
  if (cards) cards.hidden = !selectedReservationEvent;
  if (section) section.hidden = true;
  if (complete) complete.hidden = true;
  if (button) button.disabled = true;
  clearMessage("seatSelectionMessage");
  updateSelectedSeatSummary();
  const scrollTarget = selectedReservationEvent ? selectedPanel || cards : selector || document.getElementById("page-reservation");
  if (scrollTarget) scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showReservationComplete(result, data) {
  const section = document.getElementById("seatSelection");
  const complete = document.getElementById("reservationComplete");
  const title = document.getElementById("reservationCompleteTitle");
  const text = document.getElementById("reservationCompleteText");
  const copy = getExtensionCopy().reservation;
  const status = result && result.status;

  if (section) section.hidden = true;
  if (complete) complete.hidden = false;
  if (title) title.textContent = status === "confirmed" ? copy.complete.confirmedTitle : copy.complete.pendingTitle;
  if (text) text.textContent = getReservationSuccessMessage(data.full_name, result.reference, result.seat, status);
  clearMessage("seatSelectionMessage");
  if (complete) complete.scrollIntoView({ behavior: "smooth", block: "center" });
}

function goReservationHome() {
  pendingReservation = null;
  selectedSeat = "";
  activeSeatStatuses = new Map();

  const cards = document.querySelector(".reservation-choice-grid");
  const selector = document.getElementById("reservationEventSelector");
  const selectedPanel = document.getElementById("reservationSelectedEvent");
  const section = document.getElementById("seatSelection");
  const complete = document.getElementById("reservationComplete");
  const button = document.getElementById("confirmSeatButton");

  selectedReservationEvent = null;
  if (selector) selector.hidden = false;
  if (selectedPanel) selectedPanel.hidden = true;
  if (cards) cards.hidden = true;
  if (section) section.hidden = true;
  if (complete) complete.hidden = true;
  if (button) button.disabled = true;
  clearMessage("memberReservationMessage");
  clearMessage("publicReservationMessage");
  clearMessage("seatSelectionMessage");
  updateSelectedSeatSummary();
  showPage("home");
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
      const isBlocked = CINEMANA_BLOCKED_SEATS.has(seat);
      const seatStatus = isBlocked ? "reserved" : activeSeatStatuses.get(seat);
      if (seatStatus) {
        button.disabled = true;
        button.classList.add(seatStatus === "pending" ? "pending" : "reserved");
      }
      if (!isBlocked && selectedSeat === seat) button.classList.add("selected");
      if (!isBlocked) button.addEventListener("click", () => selectSeat(seat));
      rowEl.appendChild(button);
    }

    map.appendChild(rowEl);
  });
}

function selectSeat(seat) {
  if (!pendingReservation || activeSeatStatuses.has(seat) || CINEMANA_BLOCKED_SEATS.has(seat)) return;
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
        activeSeatStatuses = normalizeSeatStatuses(result);
        selectedSeat = "";
        renderSeatMap();
        updateSelectedSeatSummary();
      }
      setFormMessage(message, getReservationErrorMessage(result && result.code), "error");
      if (button && selectedSeat) button.disabled = false;
      return;
    }

    const submittedReservation = pendingReservation;
    activeSeatStatuses.set(result.seat, result.status === "pending" ? "pending" : "confirmed");
    document.getElementById("memberReservationForm").reset();
    document.getElementById("publicReservationForm").reset();
    pendingReservation = null;
    selectedSeat = "";
    renderSeatMap();
    updateSelectedSeatSummary();
    showReservationComplete(result, submittedReservation);
  } catch (error) {
    setFormMessage(message, getReservationErrorMessage(errorCodeFromException(error)), "error");
    if (button) button.disabled = false;
  }
}

// New admin/ticket/scanner helpers share escaping and status normalization.
const CINEMANA_ADMIN_SECRET_STORAGE_KEY = "cinemana_admin_secret";
const CINEMANA_SCANNER_TOKEN_STORAGE_KEY = "cinemana_scanner_token";
let adminReservations = [];
let adminCurrentFilter = "all";

function extensionEscapeHtml(value) {
  if (typeof escapeHtml === "function") return escapeHtml(value);
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeReservationStatusForTools(value) {
  const status = String(value || "").trim().toLowerCase();
  if (["confirmed", "confirme", "confirmee", "confirmé", "confirmée"].includes(status)) return "confirmed";
  if (["pending", "en attente", "attente"].includes(status)) return "pending";
  if (["canceled", "cancelled", "annule", "annulee", "annulé", "annulée"].includes(status)) return "canceled";
  if (["attended", "present", "presence", "présence", "checked-in", "checked in"].includes(status)) return "attended";
  return status || "unknown";
}

function statusLabelForTools(status) {
  const normalized = normalizeReservationStatusForTools(status);
  const labels = {
    pending: "Pending",
    confirmed: "Confirmed",
    canceled: "Canceled",
    attended: "Attended",
    unknown: "Unknown"
  };
  return labels[normalized] || normalized;
}

function getStoredAdminSecret() {
  try {
    return sessionStorage.getItem(CINEMANA_ADMIN_SECRET_STORAGE_KEY) || "";
  } catch (error) {
    return "";
  }
}

function setStoredAdminSecret(secret) {
  try {
    sessionStorage.setItem(CINEMANA_ADMIN_SECRET_STORAGE_KEY, secret);
  } catch (error) {
    // If sessionStorage is unavailable, the current login attempt still continues.
  }
}

function clearStoredAdminSecret() {
  try {
    sessionStorage.removeItem(CINEMANA_ADMIN_SECRET_STORAGE_KEY);
  } catch (error) {
    // Storage cleanup is best-effort.
  }
}

function setAdminMessage(text, type) {
  const message = document.getElementById("adminDashboardMessage") || document.getElementById("adminLoginMessage");
  if (typeof setFormMessage === "function") {
    setFormMessage(message, text, type);
  } else if (message) {
    message.textContent = text || "";
  }
}

function setAdminPanels(isLoggedIn) {
  const login = document.getElementById("adminLoginPanel");
  const dashboard = document.getElementById("adminDashboard");
  if (login) login.hidden = isLoggedIn;
  if (dashboard) dashboard.hidden = !isLoggedIn;
}

// New admin dashboard initialization keeps the route hidden until the secret is entered.
function initAdminDashboard() {
  if (getStoredAdminSecret()) {
    setAdminPanels(true);
    if (!adminReservations.length) refreshAdminReservations();
  } else {
    setAdminPanels(false);
  }
}

async function submitAdminLogin(event) {
  event.preventDefault();
  const input = document.getElementById("adminSecretInput");
  const button = document.getElementById("adminLoginButton");
  const secret = input ? input.value.trim() : "";
  const message = document.getElementById("adminLoginMessage");

  if (!secret) {
    if (typeof setFormMessage === "function") setFormMessage(message, "ADMIN_SECRET requis.", "error");
    return;
  }

  if (button) button.disabled = true;
  if (typeof setFormMessage === "function") setFormMessage(message, "Verification de l'acces...", "");
  setStoredAdminSecret(secret);

  try {
    await refreshAdminReservations();
    if (input) input.value = "";
    if (typeof setFormMessage === "function") setFormMessage(message, "", "");
    setAdminPanels(true);
  } catch (error) {
    clearStoredAdminSecret();
    setAdminPanels(false);
    if (typeof setFormMessage === "function") setFormMessage(message, error.message || "Acces admin refuse.", "error");
  } finally {
    if (button) button.disabled = false;
  }
}

function logoutAdmin() {
  clearStoredAdminSecret();
  adminReservations = [];
  setAdminPanels(false);
  const list = document.getElementById("adminReservationList");
  if (list) list.innerHTML = '<div class="dashboard-empty">Connectez-vous pour charger les reservations.</div>';
}

async function refreshAdminReservations() {
  const secret = getStoredAdminSecret();
  const button = document.getElementById("adminRefreshButton");
  if (!secret) throw new Error("ADMIN_SECRET requis.");
  if (!isGoogleSheetsConfigured()) throw new Error("Google Sheets n'est pas encore configure.");

  if (button) button.disabled = true;
  setAdminMessage("Chargement des reservations...", "");

  try {
    const response = await callGoogleSheetsAction("getReservations", { admin_secret: secret });
    if (!response || !response.ok) {
      throw new Error((response && (response.error || response.message)) || "Chargement refuse.");
    }
    adminReservations = Array.isArray(response.data) ? response.data : [];
    setAdminPanels(true);
    renderAdminReservations();
    setAdminMessage("Reservations chargees.", "success");
  } finally {
    if (button) button.disabled = false;
  }
}

function setAdminFilter(filter) {
  adminCurrentFilter = filter || "all";
  document.querySelectorAll(".admin-filter").forEach((button) => {
    button.classList.toggle("active", button.dataset.adminFilter === adminCurrentFilter);
  });
  renderAdminReservations();
}

function adminReservationMatches(reservation, search) {
  if (!search) return true;
  const haystack = [
    reservation.reference,
    reservation.name,
    reservation.first_name,
    reservation.last_name,
    reservation.seat
  ].join(" ").toLowerCase();
  return haystack.includes(search);
}

function renderAdminReservations() {
  const list = document.getElementById("adminReservationList");
  const summary = document.getElementById("adminDashboardSummary");
  const searchInput = document.getElementById("adminReservationSearch");
  if (!list) return;

  const search = String(searchInput && searchInput.value || "").trim().toLowerCase();
  const filtered = adminReservations.filter((reservation) => {
    const status = normalizeReservationStatusForTools(reservation.status);
    const statusMatches = adminCurrentFilter === "all" || status === adminCurrentFilter;
    return statusMatches && adminReservationMatches(reservation, search);
  });

  if (summary) {
    summary.textContent = `${filtered.length} reservation(s) affichee(s) sur ${adminReservations.length}.`;
  }

  if (!filtered.length) {
    list.innerHTML = '<div class="dashboard-empty">Aucune reservation trouvee.</div>';
    return;
  }

  list.innerHTML = filtered.map((reservation) => adminReservationCard(reservation)).join("");
}

function adminReservationCard(reservation) {
  const status = normalizeReservationStatusForTools(reservation.status);
  const approveDisabled = status === "confirmed" || status === "attended" ? "disabled" : "";
  const cancelDisabled = status === "canceled" ? "disabled" : "";
  const reference = reservation.reference || "";
  const fields = [
    ["Name", reservation.name || [reservation.first_name, reservation.last_name].filter(Boolean).join(" ") || "-"],
    ["Age", reservation.age || "-"],
    ["Job", reservation.profession || "-"],
    ["Phone", reservation.phone || "-"],
    ["Email", reservation.email || "-"],
    ["Seat", reservation.seat || "-"],
    ["Created", reservation.created_at || "-"],
    ["Event", reservation.event_title || "-"]
  ];

  return `
    <article class="admin-reservation-card status-${extensionEscapeHtml(status)}">
      <div class="admin-reservation-card-head">
        <div>
          <strong>${extensionEscapeHtml(reference || "-")}</strong>
          <span class="ticket-status-badge ${extensionEscapeHtml(status)}">${extensionEscapeHtml(statusLabelForTools(status))}</span>
        </div>
        <div class="admin-card-actions">
          <button class="btn primary compact" type="button" data-admin-action="confirm" data-reference="${extensionEscapeHtml(reference)}" ${approveDisabled}>Approve</button>
          <button class="btn ghost compact" type="button" data-admin-action="cancel" data-reference="${extensionEscapeHtml(reference)}" ${cancelDisabled}>Cancel</button>
        </div>
      </div>
      <dl>
        ${fields.map(([label, value]) => `
          <div>
            <dt>${extensionEscapeHtml(label)}</dt>
            <dd>${extensionEscapeHtml(value)}</dd>
          </div>
        `).join("")}
      </dl>
    </article>
  `;
}

async function updateAdminReservationStatus(reference, decision, button) {
  const secret = getStoredAdminSecret();
  if (!secret) {
    setAdminMessage("ADMIN_SECRET requis.", "error");
    return;
  }

  if (button) button.disabled = true;
  setAdminMessage("Mise a jour de la reservation...", "");

  try {
    const response = await callGoogleSheetsAction("updateReservationStatus", {
      admin_secret: secret,
      reference,
      decision
    });
    if (!response || !response.ok) {
      throw new Error((response && (response.error || response.message)) || "Mise a jour refusee.");
    }
    setAdminMessage(response.message || "Reservation mise a jour.", "success");
    await refreshAdminReservations();
  } catch (error) {
    setAdminMessage(error.message || "Impossible de mettre a jour la reservation.", "error");
    if (button) button.disabled = false;
  }
}

function handleAdminReservationClick(event) {
  const button = event.target.closest("[data-admin-action]");
  if (!button) return;
  updateAdminReservationStatus(button.dataset.reference || "", button.dataset.adminAction || "", button);
}

// New public ticket status page uses safe Apps Script data only.
function initTicketStatusPage() {
  const result = document.getElementById("ticketStatusResult");
  if (!result || result.dataset.ready) return;
  result.dataset.ready = "true";
}

function renderTicketStatusResult(data, statusOverride) {
  const result = document.getElementById("ticketStatusResult");
  if (!result) return;
  const status = normalizeReservationStatusForTools(statusOverride || (data && data.status));

  if (!data) {
    result.className = "ticket-status-result not-found";
    result.innerHTML = `
      <span class="ticket-status-badge canceled">Ticket not found</span>
      <h3>Ticket not found</h3>
      <p>Aucune reservation ne correspond a cette reference.</p>
    `;
    return;
  }

  result.className = `ticket-status-result ${status}`;
  result.innerHTML = `
    <span class="ticket-status-badge ${extensionEscapeHtml(status)}">${extensionEscapeHtml(statusLabelForTools(status))}</span>
    <h3>${extensionEscapeHtml(data.reference || "-")}</h3>
    <dl>
      <div><dt>Reference</dt><dd>${extensionEscapeHtml(data.reference || "-")}</dd></div>
      <div><dt>Status</dt><dd>${extensionEscapeHtml(statusLabelForTools(status))}</dd></div>
      <div><dt>Seat</dt><dd>${extensionEscapeHtml(data.seat || "-")}</dd></div>
      <div><dt>Event</dt><dd>${extensionEscapeHtml(data.event_title || data.event_id || "-")}</dd></div>
    </dl>
  `;
}

async function submitTicketStatusCheck(event) {
  event.preventDefault();
  const input = document.getElementById("ticketStatusReference");
  const button = document.getElementById("ticketStatusButton");
  const message = document.getElementById("ticketStatusMessage");
  const reference = extractTicketReference(input ? input.value : "");

  if (!reference) {
    if (typeof setFormMessage === "function") setFormMessage(message, "Saisissez une reference ticket.", "error");
    return;
  }
  if (!isGoogleSheetsConfigured()) {
    if (typeof setFormMessage === "function") setFormMessage(message, "Google Sheets n'est pas encore configure.", "error");
    return;
  }

  if (button) button.disabled = true;
  if (typeof setFormMessage === "function") setFormMessage(message, "Verification du statut...", "");

  try {
    const response = await callGoogleSheetsAction("getTicketStatus", { reference });
    if (!response || !response.ok) {
      renderTicketStatusResult(null, "not_found");
      if (typeof setFormMessage === "function") setFormMessage(message, "Ticket not found", "error");
      return;
    }
    renderTicketStatusResult(response.data || response.ticket);
    if (typeof setFormMessage === "function") setFormMessage(message, "Statut trouve.", "success");
  } catch (error) {
    renderTicketStatusResult(null, "not_found");
    if (typeof setFormMessage === "function") setFormMessage(message, "Verification impossible pour le moment.", "error");
  } finally {
    if (button) button.disabled = false;
  }
}

function getStoredScannerToken() {
  try {
    return sessionStorage.getItem(CINEMANA_SCANNER_TOKEN_STORAGE_KEY) || "";
  } catch (error) {
    return "";
  }
}

function setStoredScannerToken(token) {
  try {
    sessionStorage.setItem(CINEMANA_SCANNER_TOKEN_STORAGE_KEY, token);
  } catch (error) {
    // If storage is blocked, the scanner simply requires login again.
  }
}

function clearStoredScannerToken() {
  try {
    sessionStorage.removeItem(CINEMANA_SCANNER_TOKEN_STORAGE_KEY);
  } catch (error) {
    // Storage cleanup is best-effort.
  }
}

// New scanner access gate shows the scanner only after Apps Script accepts the PIN.
function setScannerAccessState(hasAccess) {
  const login = document.getElementById("scannerLoginPanel");
  const scanner = document.getElementById("scannerTool");
  if (login) login.hidden = hasAccess;
  if (scanner) scanner.hidden = !hasAccess;
  if (!hasAccess) stopTicketScanner();
}

function initScannerAccess() {
  setScannerAccessState(Boolean(getStoredScannerToken()));
}

async function submitScannerLogin(event) {
  event.preventDefault();
  const input = document.getElementById("scannerPinInput");
  const button = document.getElementById("scannerLoginButton");
  const message = document.getElementById("scannerLoginMessage");
  const pin = input ? input.value.trim() : "";

  if (!pin) {
    if (typeof setFormMessage === "function") setFormMessage(message, "PIN requis.", "error");
    return;
  }
  if (!isGoogleSheetsConfigured()) {
    if (typeof setFormMessage === "function") setFormMessage(message, "Google Sheets n'est pas encore configure.", "error");
    return;
  }

  if (button) button.disabled = true;
  if (typeof setFormMessage === "function") setFormMessage(message, "Verification du PIN...", "");

  try {
    const response = await callGoogleSheetsAction("scannerLogin", { pin });
    if (!response || !response.ok || !response.scanner_token) {
      throw new Error((response && (response.error || response.message)) || "PIN incorrect.");
    }
    setStoredScannerToken(response.scanner_token);
    if (input) input.value = "";
    if (typeof setFormMessage === "function") setFormMessage(message, "", "");
    setScannerAccessState(true);
    renderTicketEmptyState();
    renderTicketScannerHistory();
  } catch (error) {
    clearStoredScannerToken();
    setScannerAccessState(false);
    if (typeof setFormMessage === "function") setFormMessage(message, "PIN incorrect.", "error");
  } finally {
    if (button) button.disabled = false;
  }
}

function logoutScanner() {
  clearStoredScannerToken();
  setScannerAccessState(false);
  renderTicketEmptyState();
}

const TICKET_SCANNER_COPY = {
  confirmed: {
    label: "Ticket confirme",
    tone: "valid",
    message: "Reservation confirmee. Controlez les informations puis laissez entrer."
  },
  attended: {
    label: "Presence deja marquee",
    tone: "valid",
    message: "Ce ticket a deja ete controle. Verifiez avec le responsable avant de laisser entrer."
  },
  pending: {
    label: "Reservation en attente",
    tone: "pending",
    message: "Cette reservation est encore en attente de validation. Ne pas laisser entrer sans confirmation."
  },
  canceled: {
    label: "Reservation annulee",
    tone: "invalid",
    message: "Cette reservation est annulee. Le ticket n'est pas valable."
  },
  not_found: {
    label: "Ticket introuvable",
    tone: "invalid",
    message: "Aucune reservation ne correspond a cette reference."
  },
  error: {
    label: "Verification impossible",
    tone: "invalid",
    message: "Impossible de verifier le ticket pour le moment. Reessayez ou contactez le responsable."
  }
};

let ticketScannerStream = null;
let ticketScannerDetector = null;
let ticketScannerRunning = false;
let lastTicketScannerValue = "";
let lastTicketScannerTime = 0;
const ticketScannerHistory = [];

function getTicketScannerCopy(status) {
  return TICKET_SCANNER_COPY[status] || TICKET_SCANNER_COPY.error;
}

function setTicketScannerMessage(text, type) {
  const message = document.getElementById("ticketScannerMessage");
  if (typeof setFormMessage === "function") {
    setFormMessage(message, text, type);
  } else if (message) {
    message.textContent = text;
  }
}

function updateTicketScannerMode(text) {
  const mode = document.getElementById("ticketScannerMode");
  if (mode) mode.textContent = text;
}

function extractTicketReference(value) {
  const text = String(value || "").trim().toUpperCase();
  const match = text.match(/RES-\d{4}-[A-Z0-9]+/);
  return match ? match[0] : text;
}

function ticketScannerEscape(value) {
  return typeof escapeHtml === "function" ? escapeHtml(value) : String(value || "");
}

function renderTicketEmptyState() {
  const card = document.getElementById("ticketScannerResult");
  if (!card) return;
  card.className = "scanner-result-card empty";
  card.innerHTML = `
    <span class="scanner-status-pill">En attente</span>
    <h3>Aucun ticket controle.</h3>
    <p>Scannez un QR code ou saisissez une reference pour afficher le statut.</p>
  `;
}

function renderTicketScanResult(result, fallbackReference) {
  const card = document.getElementById("ticketScannerResult");
  if (!card) return;

  if (!result || !result.ok) {
    const reference = result && result.reference ? result.reference : fallbackReference;
    const status = result && result.status ? result.status : "error";
    const copy = getTicketScannerCopy(status);
    card.className = `scanner-result-card ${copy.tone}`;
    card.innerHTML = `
      <span class="scanner-status-pill">${copy.label}</span>
      <h3>${ticketScannerEscape(reference || "Reference inconnue")}</h3>
      <p>${copy.message}</p>
    `;
    addTicketScannerHistory({
      reference: reference || "-",
      status,
      label: copy.label
    });
    setTicketScannerMessage(copy.message, "error");
    return;
  }

  const ticket = result.ticket || {};
  const status = result.status || ticket.status || "error";
  const copy = getTicketScannerCopy(status);
  const fullName = ticket.full_name || [ticket.first_name, ticket.last_name].filter(Boolean).join(" ");
  const memberLabel = ticket.member ? "Oui" : "Non";

  const detailRows = [
    ["Reference", ticket.reference || fallbackReference],
    ["Evenement", ticket.event_title || "-"],
    ["Nom", fullName || "-"],
    ["Age", ticket.age || "-"],
    ["Fonction", ticket.profession || "-"],
    ["Telephone", ticket.phone || ticket.whatsapp || "-"],
    ["E-mail", ticket.email || "-"],
    ["Membre", memberLabel],
    ["Statut", copy.label],
    ["Creation", ticket.created_at || "-"]
  ];

  card.className = `scanner-result-card ${copy.tone}`;
  card.innerHTML = `
    <span class="scanner-status-pill">${copy.label}</span>
    <h3>${ticketScannerEscape(fullName || ticket.reference || fallbackReference)}</h3>
    <p>${copy.message}</p>
    <div class="scanner-seat-highlight">
      <span>Siege</span>
      <strong>${ticketScannerEscape(ticket.seat || "-")}</strong>
    </div>
    <dl class="scanner-result-details">
      ${detailRows.map(([label, value]) => `
        <div>
          <dt>${ticketScannerEscape(label)}</dt>
          <dd>${ticketScannerEscape(value)}</dd>
        </div>
      `).join("")}
    </dl>
  `;

  addTicketScannerHistory({
    reference: ticket.reference || fallbackReference,
    status,
    label: copy.label,
    name: fullName,
    seat: ticket.seat
  });
  setTicketScannerMessage(copy.message, copy.tone === "invalid" ? "error" : "success");
}

function addTicketScannerHistory(entry) {
  ticketScannerHistory.unshift({
    ...entry,
    time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
  });
  ticketScannerHistory.splice(6);
  renderTicketScannerHistory();
}

function renderTicketScannerHistory() {
  const list = document.getElementById("ticketScannerHistory");
  if (!list) return;
  if (!ticketScannerHistory.length) {
    list.innerHTML = `<p class="scanner-history-empty">Les derniers controles apparaitront ici.</p>`;
    return;
  }

  list.innerHTML = ticketScannerHistory.map((entry) => {
    const copy = getTicketScannerCopy(entry.status);
    return `
      <article class="scanner-history-item ${copy.tone}">
        <div>
          <strong>${ticketScannerEscape(entry.reference)}</strong>
          <span>${ticketScannerEscape(entry.name || entry.label)}</span>
        </div>
        <div>
          <strong>${ticketScannerEscape(entry.seat || "-")}</strong>
          <span>${ticketScannerEscape(entry.time)}</span>
        </div>
      </article>
    `;
  }).join("");
}

async function verifyTicketReference(rawValue) {
  const reference = extractTicketReference(rawValue);
  const scannerToken = getStoredScannerToken();
  if (!reference) {
    setTicketScannerMessage("Saisissez ou scannez une reference ticket.", "error");
    return;
  }
  if (!scannerToken) {
    setScannerAccessState(false);
    setTicketScannerMessage("Connectez-vous au scanner avant de verifier un ticket.", "error");
    return;
  }
  if (!isGoogleSheetsConfigured()) {
    setTicketScannerMessage("Google Sheets n'est pas encore configure.", "error");
    renderTicketScanResult({ ok: false, reference, status: "error" }, reference);
    return;
  }

  setTicketScannerMessage("Verification du ticket...", "");
  try {
    const result = await callGoogleSheetsAction("verifyTicket", { reference, scanner_token: scannerToken });
    if (result && result.code === "unauthorized") {
      clearStoredScannerToken();
      setScannerAccessState(false);
    }
    renderTicketScanResult(result, reference);
  } catch (error) {
    const copy = getTicketScannerCopy("error");
    setTicketScannerMessage(copy.message, "error");
    renderTicketScanResult({
      ok: false,
      reference,
      status: "error",
      message: error && error.message ? error.message : copy.message
    }, reference);
  }
}

async function submitTicketManualCheck(event) {
  event.preventDefault();
  const input = document.getElementById("ticketReferenceInput");
  const button = document.getElementById("ticketManualButton");
  if (button) button.disabled = true;
  await verifyTicketReference(input ? input.value : "");
  if (button) button.disabled = false;
}

function updateTicketScannerButtons() {
  const start = document.getElementById("ticketScannerStart");
  const stop = document.getElementById("ticketScannerStop");
  if (start) start.disabled = ticketScannerRunning;
  if (stop) stop.disabled = !ticketScannerRunning;
}

async function startTicketScanner() {
  if (!getStoredScannerToken()) {
    setScannerAccessState(false);
    setTicketScannerMessage("Connectez-vous au scanner avant d'ouvrir la camera.", "error");
    return;
  }
  const video = document.getElementById("ticketScannerVideo");
  const frame = video ? video.closest(".scanner-video-frame") : null;
  if (!video || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    setTicketScannerMessage("La camera n'est pas disponible sur cet appareil. Utilisez la verification manuelle.", "error");
    return;
  }
  if (!("BarcodeDetector" in window)) {
    setTicketScannerMessage("Le scan QR automatique n'est pas supporte par ce navigateur. Utilisez la verification manuelle.", "error");
    return;
  }

  try {
    ticketScannerDetector = new BarcodeDetector({ formats: ["qr_code"] });
    ticketScannerStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" } },
      audio: false
    });
    video.srcObject = ticketScannerStream;
    await video.play();
    ticketScannerRunning = true;
    if (frame) frame.classList.add("is-live");
    updateTicketScannerMode("Camera active");
    updateTicketScannerButtons();
    setTicketScannerMessage("Camera active. Placez le QR code dans le cadre.", "success");
    requestAnimationFrame(runTicketScannerLoop);
  } catch (error) {
    stopTicketScanner();
    setTicketScannerMessage("Impossible d'ouvrir la camera. Verifiez les permissions ou utilisez la verification manuelle.", "error");
  }
}

async function runTicketScannerLoop() {
  if (!ticketScannerRunning || !ticketScannerDetector) return;
  const video = document.getElementById("ticketScannerVideo");
  if (!video) return;

  try {
    const codes = await ticketScannerDetector.detect(video);
    if (codes && codes.length) {
      const rawValue = codes[0].rawValue || "";
      const reference = extractTicketReference(rawValue);
      const now = Date.now();
      if (reference && (reference !== lastTicketScannerValue || now - lastTicketScannerTime > 3500)) {
        lastTicketScannerValue = reference;
        lastTicketScannerTime = now;
        await verifyTicketReference(reference);
      }
    }
  } catch (error) {
    // Some browsers throw while the video is still warming up; keep the loop alive.
  }

  if (ticketScannerRunning) requestAnimationFrame(runTicketScannerLoop);
}

function stopTicketScanner() {
  const video = document.getElementById("ticketScannerVideo");
  const frame = video ? video.closest(".scanner-video-frame") : null;
  if (ticketScannerStream) {
    ticketScannerStream.getTracks().forEach((track) => track.stop());
  }
  ticketScannerStream = null;
  ticketScannerDetector = null;
  ticketScannerRunning = false;
  if (video) video.srcObject = null;
  if (frame) frame.classList.remove("is-live");
  updateTicketScannerMode("Pret");
  updateTicketScannerButtons();
}

window.startTicketScanner = startTicketScanner;
window.stopTicketScanner = stopTicketScanner;
window.submitTicketManualCheck = submitTicketManualCheck;
window.initAdminDashboard = initAdminDashboard;
window.submitAdminLogin = submitAdminLogin;
window.refreshAdminReservations = refreshAdminReservations;
window.renderAdminReservations = renderAdminReservations;
window.setAdminFilter = setAdminFilter;
window.logoutAdmin = logoutAdmin;
window.initTicketStatusPage = initTicketStatusPage;
window.submitTicketStatusCheck = submitTicketStatusCheck;
window.initScannerAccess = initScannerAccess;
window.submitScannerLogin = submitScannerLogin;
window.logoutScanner = logoutScanner;

document.addEventListener("DOMContentLoaded", () => {
  const professionSelect = document.getElementById("memberProfessionType");
  if (professionSelect) professionSelect.addEventListener("change", handleMemberProfessionChange);
  const referralType = document.getElementById("memberReferralType");
  if (referralType) referralType.addEventListener("change", handleMemberReferralChange);
  const adminReservationList = document.getElementById("adminReservationList");
  if (adminReservationList) adminReservationList.addEventListener("click", handleAdminReservationClick);
  handleMemberProfessionChange();
  handleMemberReferralChange();
  applyExtensionTexts();
  initAdminDashboard();
  initTicketStatusPage();
  initScannerAccess();
  renderTicketEmptyState();
  renderTicketScannerHistory();
});
