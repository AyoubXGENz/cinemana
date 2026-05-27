const PAGES = [
  "home",
  "missions",
  "bureau",
  "activities",
  "membership",
  "partner",
  "reservation",
  "dashboard",
  "press",
  "partners"
];

const CONNECT_HIDDEN_PAGES = new Set(["membership", "reservation"]);

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCl7S3KtNdRP4t-o8wsEABdezShD1TRd3o",
  authDomain: "cenimana-106f1.firebaseapp.com",
  projectId: "cenimana-106f1",
  storageBucket: "cenimana-106f1.firebasestorage.app",
  messagingSenderId: "36373295981",
  appId: "1:36373295981:web:02cc4ff2629d5b2593a064",
   measurementId: "G-S63HWF9KQ3"
};

const EMAILJS_PUBLIC_KEY = "vvAV3OkM-NMHVEaKC";
const EMAILJS_SERVICE_ID = "service_axwqg28";
const EMAILJS_TEMPLATE_ID = "template_r0njw8m";
const EMAIL_CODE_EXPIRY_MINUTES = 10;
const GOOGLE_SHEETS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzAU5tid1K9dM2gR-XKHCjH7_PwZ2ESPo-IVvk-5UGrFFInSBIMzBcsff6COQ5RSSPI/exec";

const TRANSLATIONS = {
  fr: {
    lang: "fr",
    dir: "ltr",
    metaTitle: "Fondation CINEMANA | Cinéma et culture à Tanger",
    metaDescription: "Fondation CINEMANA, institution culturelle à but non lucratif dédiée au cinéma, aux cinéclubs, aux formations et au Festival International du Film de Tanger.",
    langLabel: "Choisir la langue",
    menuLabel: "Ouvrir le menu",
    nav: {
      home: "Accueil",
      missions: "Missions",
      bureau: "Bureau & Comités",
      activities: "Activités",
      membership: "Devenir membre",
      partner: "Devenir partenaire",
      reservation: "Réservation",
      dashboard: "Espace membre",
      press: "Presse",
      partners: "Partenaires"
    },
    home: {
      heroAlt: "Caméra de cinéma sur un plateau de tournage",
      logoLabel: "Logo CINEMANA animé",
      eyebrow: "CINÉMA est notre oxygène",
      title: "Le cinéma se vit, se partage et se transmet à Tanger.",
      copy: "La Fondation CINEMANA rassemble les passionnés de cinéma autour du Festival International du Film de Tanger, de projections mensuelles, de cinéclubs scolaires, de formations et de rencontres avec les artistes.",
      missionButton: "Découvrir nos missions",
      memberButton: "Voir la carte CINEMANA",
      metricsLabel: "Repères CINEMANA",
      metrics: [
        ["15+", "projections sur réservation préalable"],
        ["Tanger", "ancrage local et rayonnement national"],
        ["Festival", "ouverture, clôture et rencontres professionnelles"],
        ["Cinéclubs", "éducation à l’image auprès des jeunes publics"]
      ],
      introEyebrow: "Accueil",
      introTitle: "Une dynamique culturelle ouverte à tous.",
      introCopy: "CINEMANA défend une approche vivante du cinéma : découvrir des œuvres, rencontrer celles et ceux qui les fabriquent, former les talents de demain et soutenir la circulation des films marocains.",
      reserveButton: "Réserver une place",
      supportButton: "Soutenir la fondation",
      photosLabel: "Photos CINEMANA",
      photoAlts: [
        "Projection CINEMANA dans une salle de cinéma",
        "Rencontre professionnelle pendant le festival",
        "Atelier de formation audiovisuelle avec caméra"
      ],
      captions: ["Projections", "Rencontres", "Formations"]
    },
    missions: {
      eyebrow: "Missions",
      title: "Promouvoir le cinéma, former les publics et renforcer les passerelles culturelles.",
      heading: "La Fondation CINEMANA",
      p1: "La Fondation CINEMANA est une institution culturelle à but non lucratif dédiée à la promotion du cinéma et de la culture, active à Tanger et au niveau national à travers la Fédération nationale des cinéclubs.",
      p2: "Nos missions s’articulent autour de plusieurs axes complémentaires, du festival aux formations, en passant par la médiation culturelle et le renforcement de la distribution des films marocains.",
      quote: "Rejoignez-nous et participez directement ou indirectement à une dynamique culturelle vivante.",
      cards: [
        ["Festival International du Film de Tanger", "Événement phare de notre programmation, le festival propose chaque année une sélection riche de longs et courts métrages marocains et internationaux, des avant-premières, des hommages, ainsi que des rencontres professionnelles. Il est un rendez-vous incontournable pour les cinéphiles et les acteurs du secteur.", "Photos du festival à venir."],
        ["Projections mensuelles", "Tout au long de l’année, nous organisons des séances régulières dans des salles partenaires à Tanger, permettant au public de découvrir ou redécouvrir des œuvres marocaines et étrangères dans un cadre convivial."],
        ["Cinéclubs scolaires", "Nous accompagnons les établissements scolaires dans la création et l’animation de cinéclubs, afin d’éveiller les jeunes générations au langage cinématographique et de former des spectateurs critiques et passionnés."],
        ["Formations aux métiers du cinéma", "En partenariat avec des professionnels et la Fédération nationale des cinéclubs, nous proposons des ateliers et des cursus de formation en réalisation, montage, écriture de scénario et gestion de projet culturel."],
        ["Médiation nationale et internationale", "Nous développons des actions de médiation culturelle pour rapprocher le cinéma de tous les publics et tissons des partenariats avec des institutions étrangères pour favoriser les échanges et la coopération cinématographique."],
        ["Infrastructure locale", "Par la médiatisation de nos actions et l’attractivité de nos événements, nous contribuons à faire rayonner Tanger sur les scènes locale et internationale, tout en soutenant le développement des équipements et des lieux de diffusion."],
        ["Distribution des films marocains", "Nous travaillons activement à faciliter la circulation des œuvres marocaines sur le territoire national et à l’étranger, en créant des passerelles entre producteurs, distributeurs et salles de cinéma."]
      ]
    },
    bureau: {
      eyebrow: "Bureau & Comités",
      title: "Une équipe engagée pour porter les projets CINEMANA.",
      executive: "Bureau exécutif",
      committees: "Coordinateurs des comités",
      roles: ["Président", "Secrétaire général", "Trésorier", "Conseiller", "Conseiller"],
      committeeRoles: ["Organisation", "Logistique", "Audiovisuel", "Communication"]
    },
    activities: {
      eyebrow: "Activités",
      title: "Activités CINEMANA",
      imageAlt: "Public du Tangier Film Festival dans le hall",
      featureEyebrow: "Temps fort",
      featureTitle: "Tangier Film Festival",
      featureCopy: [
        "Tangier Film Festival est une manifestation internationale qui s’est solidement imposée dans le circuit régional des festivals de cinéma comme l’un des festivals africains et arabes les plus réputés.",
        "Il propose une sélection impressionnante de films en compétition, comprenant des longs métrages, des courts métrages de fiction, des courts métrages d’animation et des courts métrages documentaires, avec la présence de distributeurs et d’agents de festivals de renommée internationale.",
        "Le Festival invite chaque année des cinéastes du monde entier à participer au Tangier Film Factory, où ils auront l’opportunité de développer leur networking entre producteurs, acheteurs, distributeurs et porteurs de projets, et de voir leur film présenté sur la plateforme du Festival ainsi que promu auprès de tous nos membres à travers le monde."
      ],
      cards: [
        ["Compétition internationale", "Longs métrages, courts métrages de fiction, animation et documentaires dans une sélection reconnue."],
        ["Tangier Film Factory", "Un espace de développement et de networking entre cinéastes, producteurs, acheteurs et distributeurs."],
        ["Rayonnement mondial", "Des films présentés sur la plateforme du Festival et promus auprès d’un réseau international de membres."]
      ],
      galleryLabel: "Photos du Tangier Film Festival",
      galleryCaptions: ["Tapis rouge", "Cérémonie", "Networking", "Presse", "Lauréats"],
      galleryAlts: [
        "Invités sur le tapis rouge du Tangier Film Festival",
        "Public dans la salle pendant le Tangier Film Festival",
        "Espace professionnel du Tangier Film Festival",
        "Interview presse pendant le Tangier Film Festival",
        "Lauréats avec leurs trophées au Tangier Film Festival"
      ],
      monthlyImageAlt: "Projection mensuelle CINEMANA au Palais des Arts de Tanger",
      monthlyEyebrow: "Cycle de projections",
      monthlyTitle: "Projections Mensuelles",
      monthlyCopy: [
        "Dans le cadre du projet SIN lancé par le ministère de la Jeunesse et de la Culture en partenariat avec la Fédération nationale des cinéclubs, la Fondation CINEMANA organise des cycles de projections mensuelles en collaboration avec la Direction régionale de la culture et le Palais des Arts de Tanger."
      ],
      monthlyCards: [
        ["Projet SIN", "Un programme national qui rapproche le cinéma du public et accompagne la vie culturelle locale."],
        ["Partenariats institutionnels", "Une action menée avec le ministère, la Fédération nationale des cinéclubs et la Direction régionale de la culture."],
        ["Palais des Arts de Tanger", "Un espace de projection et de rencontre pour partager les films avec les publics de Tanger."]
      ],
      monthlyGalleryLabel: "Photos des projections mensuelles CINEMANA",
      monthlyGalleryCaptions: ["Projection", "Accueil du public", "Rencontre", "Invités", "Échange"],
      monthlyGalleryAlts: [
        "Écran de projection pendant une projection mensuelle CINEMANA",
        "Public dans le hall pendant les projections mensuelles CINEMANA",
        "Remise symbolique pendant une projection mensuelle CINEMANA",
        "Invités devant le panneau CINEMANA pendant les projections mensuelles",
        "Interview pendant les projections mensuelles CINEMANA"
      ],
      trainingImageAlt: "Affiche de la résidence COURTS ENTRE 2 RIVES",
      trainingEyebrow: "Atelier et formation",
      trainingTitle: "COURTS ENTRE 2 RIVES",
      trainingCopy: [
        "La Fondation CINEMANA organise, en partenariat avec France Télévisions et les trois festivals Les Nuits MED, MoliseCinema et Vues sur les Arts, la résidence méditerranéenne « COURTS ENTRE 2 RIVES », qui invite quatre porteurs de projets de courts métrages du Maroc, de France, de Tunisie et d’Italie à développer leurs projets et à concourir pour un prix d’achat de France Télévisions."
      ],
      trainingCards: [
        ["Résidence méditerranéenne", "Un programme de développement dédié aux courts métrages entre le Maroc, la France, la Tunisie et l’Italie."],
        ["Partenaires internationaux", "Une résidence organisée avec France Télévisions, Les Nuits MED, MoliseCinema et Vues sur les Arts."],
        ["Prix d’achat", "Les projets accompagnés concourent pour un prix d’achat de France Télévisions."]
      ],
      schoolImageAlt: "Élève manipulant une caméra pendant un cinéclub scolaire CINEMANA",
      schoolEyebrow: "Cinéclubs scolaires",
      schoolTitle: "Cinéclubs scolaires",
      schoolCopy: [
        "La Fondation CINEMANA anime des ciné-clubs scolaires au sein de plusieurs établissements éducatifs de Tanger, à travers l’organisation de projections de films, d’ateliers d’initiation au cinéma et de formations destinées aux élèves et aux étudiants. À travers ces activités, la fondation œuvre à promouvoir l’éducation à l’image, à développer l’esprit critique et la créativité des jeunes, tout en favorisant l’échange culturel et l’ouverture sur différentes formes d’expression artistique et cinématographique."
      ],
      schoolCards: [
        ["Éducation à l’image", "Des projections et ateliers pour apprendre aux jeunes à lire, analyser et questionner les images."],
        ["Initiation au cinéma", "Des formations pratiques autour de la caméra, de la narration, de la réalisation et des métiers du cinéma."],
        ["Créativité et échange", "Un cadre qui développe l’esprit critique, la créativité et l’ouverture culturelle des élèves et étudiants."]
      ],
      schoolGalleryLabel: "Photos des cinéclubs scolaires CINEMANA",
      schoolGalleryCaptions: ["Atelier caméra", "Groupe d’élèves", "Pratique audiovisuelle", "Encadrement", "Échange pédagogique", "Projection scolaire"],
      schoolGalleryAlts: [
        "Élève utilisant une caméra pendant un atelier de cinéclub scolaire",
        "Groupe d’élèves participant à un cinéclub scolaire à Tanger",
        "Jeunes en pratique audiovisuelle avec caméras et stabilisateur",
        "Encadrement technique avec des élèves autour d’une caméra",
        "Échange pédagogique entre formateur et jeunes participants",
        "Public scolaire assistant à une projection"
      ]
    },
    membership: {
      eyebrow: "Carte CINEMANA",
      title: "Devenir membre",
      copy: "En devenant membre de la Fondation CINEMANA, vous accédez à un ensemble d’avantages exclusifs conçus pour les passionnés de cinéma et de la culture.",
      benefits: [
        ["Projections sur réservation", "L’entrée par réservation préalable à plus de quinze projections cinématographiques organisées tout au long de l’année, couvrant aussi bien les séances mensuelles que la programmation spéciale du Festival International du Film de Tanger."],
        ["Cérémonies et espace VIP", "Une invitation personnelle aux prestigieuses cérémonies d’ouverture et de clôture du festival, avec un accès privilégié à l’espace VIP où vous pourrez échanger dans un cadre convivial."],
        ["Rencontres inédites", "La possibilité de participer à des rencontres et débats inédits avec les plus grandes stars et réalisateurs marocains."],
        ["Tirage au sort carte blanche", "Une participation automatique à un tirage au sort pour gagner une carte blanche donnant accès à l’Université Cinématographique organisée par la Fédération nationale des cinéclubs, incluant hébergement, restauration et participation aux ateliers et formations programmés."],
        ["Séjour à Marrakech", "Participation à la grande tombola pour gagner un séjour à Marrakech."]
      ],
      ctaTitle: "Avec la carte CINEMANA, « Vivez le cinéma. Redonnez vie au cinéma. »",
      ctaCopy: "",
      ctaButton: "Demander ma carte"
    },
    partner: {
      eyebrow: "Devenir partenaire",
      title: "Devenir partenaire de la Fondation CINEMANA",
      heading: "Associez votre image à une dynamique culturelle d’envergure.",
      copy: "Rejoindre la Fondation CINEMANA en tant que partenaire, c’est associer votre image à une dynamique culturelle d’envergure nationale et internationale, active à Tanger et à travers tout le Maroc via la Fédération nationale des cinéclubs.",
      copy2: "Notre offre de partenariat vous permet d’offrir à vos collaborateurs ou à vos publics la carte d’adhésion CINEMANA, conçue pour vivre le cinéma de l’intérieur.",
      close: "Devenir partenaire CINEMANA, c’est allier responsabilité sociétale, rayonnement culturel et avantage concret pour vos équipes, tout en participant à redonner vie au cinéma.",
      cards: [
        ["Visibilité valorisante", "Une présence sur nos supports de communication : site web, réseaux sociaux, affiches du festival et bande-annonce avant chaque projection, avec mention de votre logo et de votre engagement culturel."],
        ["Avantage RH différenciant", "Carte d’adhésion annuelle pour vos collaborateurs, incluant plus de quinze projections gratuites, invitations aux cérémonies, accès VIP, rencontres et dédicaces avec des stars et réalisateurs marocains et étrangers."],
        ["Tarif préférentiel", "À partir de dix cartes commandées, le prix unitaire est réduit selon un tarif dégressif."],
        ["Invitation entreprise", "Une invitation personnelle pour un représentant de votre entreprise aux cérémonies d’ouverture et de clôture du festival, avec accès aux espaces VIP et industrie."],
        ["Certification culturelle", "Une certification de partenaire culturel que vous pouvez valoriser dans vos rapports RSE, sur votre site internet et dans vos communications internes."],
        ["Impact concret", "Une contribution au renforcement de l’infrastructure cinématographique locale, à la distribution des films marocains et à l’attractivité de Tanger sur la scène nationale et internationale."]
      ]
    },
    reservation: {
      eyebrow: "Réservation",
      title: "Choisissez votre parcours de réservation.",
      heading: "Membre ou particulier",
      copy: "Les membres CINEMANA réservent avec leur code et choisissent leur place après vérification téléphonique. Les particuliers remplissent une demande qui passe par validation avant l’envoi du ticket.",
      note: "La réception du ticket indique le numéro de place confirmé.",
      quote: "Un parcours clair pour confirmer les places et garder une expérience fluide le jour de la projection.",
      member: {
        eyebrow: "Réserver comme membre",
        title: "Réservation membre",
        steps: ["Demande du code membre.", "Vérification par téléphone.", "Choix de la place.", "Confirmation de la réservation."],
        labels: {
          code: "Code membre",
          phone: "Téléphone",
          seat: "Choix de place"
        },
        emptySeat: "Choisir une place",
        button: "Confirmer la réservation membre",
        message: (code, seat, number) => `Code ${code} vérifié par téléphone. Votre place ${seat} est réservée sous la référence MEM-${number}.`
      },
      public: {
        eyebrow: "Réserver comme particulier",
        title: "Demande de réservation",
        steps: ["Remplir le formulaire.", "Attendre la validation.", "Recevoir la confirmation.", "Recevoir le ticket avec numéro de place."],
        labels: {
          name: "Nom complet",
          firstName: "Prénom",
          lastName: "Nom",
          whatsapp: "Tel WhatsApp",
          age: "Âge",
          role: "Fonction",
          source: "Comment as-tu su pour la projection ?"
        },
        button: "Envoyer la demande",
        message: (name, seat, number) => `Merci ${name}. Votre demande est en attente de validation. Après confirmation, vous recevrez le ticket ${number} avec la place ${seat}.`
      }
    },
    press: {
      eyebrow: "Presse",
      title: "Informations presse et demandes médias.",
      socialEyebrow: "Réseaux sociaux",
      socialTitle: "Suivez CINEMANA",
      contactEyebrow: "Contact us",
      contactTitle: "Contact us",
      cards: [
        ["Communiqués", "Actualités de la Fondation CINEMANA, annonces de programmation, partenariats et temps forts du festival."],
        ["Dossier de presse", "Présentation de la fondation, missions, bureau, visuels officiels et chiffres clés à mettre à jour avec les prochains documents."],
        ["Accréditations", "Demandes d’accès presse pour les cérémonies, projections, conférences, interviews et espaces professionnels."],
        ["Contact média", "Coordination communication : Khaoula El Maaroufi."]
      ]
    },
    partners: {
      eyebrow: "Partenaires",
      title: "Un réseau au service du cinéma marocain et de la médiation culturelle.",
      festivalEyebrow: "Tangier Film Festival",
      festivalTitle: "Partenaires festival",
      festivalCopy: "Institutions, lieux culturels et partenaires professionnels qui accompagnent le rayonnement du festival.",
      residencyEyebrow: "Résidence Scénario",
      residencyTitle: "Partenaires résidence scénario",
      residencyCopy: "Les partenaires méditerranéens de la résidence COURTS ENTRE 2 RIVES.",
      sinEyebrow: "Projections mensuelles SIN",
      sinTitle: "Partenaires projections mensuelles SIN",
      sinCopy: "Un programme réalisé avec le Ministère de la Jeunesse, de la Culture et de la Communication, la Fédération Nationale des Ciné-Clubs au Maroc et ISTA NTIC TANGER.",
      sinMinistry: "Ministère de la Jeunesse, de la Culture et de la Communication",
      sinFnccm: "Fédération Nationale des Ciné-Clubs au Maroc",
      sinCad: "ISTA NTIC TANGER"
    },
    footer: {
      copy: "Fondation culturelle à but non lucratif dédiée à la promotion du cinéma et de la culture à Tanger et au niveau national.",
      sitemap: "Plan de site",
      foundation: "Fondation",
      links: ["Missions", "Carte CINEMANA", "Réservation", "Bureau & Comités", "Devenir partenaire", "Presse"]
    },
    modal: {
      eyebrow: "Carte CINEMANA",
      title: "Demande d’adhésion",
      close: "Fermer",
      labels: {
        name: "Nom complet",
        firstName: "Prénom",
        lastName: "Nom",
        birthday: "Date de naissance",
        city: "Ville",
        phone: "Téléphone",
        email: "E-mail",
        password: "Mot de passe",
        repeatPassword: "Répéter le mot de passe",
        verificationCode: "Code de vérification"
      },
      button: "Envoyer le code de vérification",
      verifyButton: "Vérifier le code et envoyer ma demande",
      loadingCode: "Envoi du code de vérification...",
      loadingCreate: "Vérification du code et envoi de la demande...",
      codeSent: (email) => `Un code à 6 chiffres a été envoyé à ${email}. Vérifiez votre boîte mail et le dossier spam.`,
      verificationHelp: "Entrez le code à 6 chiffres reçu par e-mail.",
      success: (name) => `Merci ${name}. Nous avons bien reçu votre demande d’adhésion CINEMANA. Notre équipe va l’étudier et vous répondra dans les plus brefs délais.`,
      completeTitle: "Demande envoyée",
      completeHome: "Retour à l’accueil",
      validation: {
        required: "Veuillez remplir tous les champs du formulaire.",
        email: "Veuillez entrer une adresse e-mail valide.",
        birthday: "Veuillez entrer une date de naissance valide dans le passé.",
        passwordLength: "Le mot de passe doit contenir au moins 8 caractères.",
        passwordMatch: "Les deux mots de passe ne correspondent pas.",
        firebaseMissing: "Configuration Firebase manquante. Remplacez les valeurs YOUR_FIREBASE_* dans script.js.",
        firebaseSdkMissing: "Le SDK Firebase n’est pas chargé. Vérifiez votre connexion ou les liens CDN.",
        emailServiceMissing: "Configuration EmailJS manquante. Remplacez EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID et EMAILJS_TEMPLATE_ID dans script.js.",
        emailSdkMissing: "Le SDK EmailJS n’est pas chargé. Vérifiez votre connexion ou le lien CDN.",
        sheetsMissing: "Configuration Google Sheets manquante. Remplacez GOOGLE_SHEETS_WEB_APP_URL dans script.js après avoir déployé Apps Script.",
        sheetsSyncFailed: "Votre demande est presque finalisée, mais l’enregistrement a échoué. Veuillez réessayer dans un instant.",
        codeRequired: "Veuillez entrer le code reçu par e-mail.",
        codeExpired: "Le code a expiré. Demandez un nouveau code.",
        codeMismatch: "Le code saisi est incorrect.",
        tooManyAttempts: "Trop de tentatives incorrectes. Demandez un nouveau code.",
        emailSendFailed: "Impossible d’envoyer le code pour le moment. Vérifiez EmailJS et réessayez.",
        emailRecipientMissing: "Le destinataire est vide dans EmailJS. Dans votre template EmailJS, mettez {{to_email}} dans le champ To Email.",
        accountExists: "Une demande existe déjà avec cet e-mail. Veuillez utiliser un autre e-mail ou contacter CINEMANA.",
        generic: "Impossible d’envoyer la demande pour le moment. Veuillez réessayer."
      }
    }
  },
  en: {
    lang: "en",
    dir: "ltr",
    metaTitle: "CINEMANA Foundation | Cinema and Culture in Tangier",
    metaDescription: "CINEMANA Foundation is a non-profit cultural institution dedicated to cinema, film clubs, training programs and the Tangier International Film Festival.",
    langLabel: "Choose language",
    menuLabel: "Open menu",
    nav: {
      home: "Home",
      missions: "Missions",
      bureau: "Board & Committees",
      activities: "Activities",
      membership: "Become a member",
      partner: "Become a partner",
      reservation: "Reservation",
      dashboard: "Member area",
      press: "Press",
      partners: "Partners"
    },
    home: {
      heroAlt: "Cinema camera on a film set",
      logoLabel: "Animated CINEMANA logo",
      eyebrow: "We breathe CINEMA",
      title: "Cinema is lived, shared and passed on in Tangier.",
      copy: "The CINEMANA Foundation brings film lovers together around the Tangier International Film Festival, monthly screenings, school film clubs, training programs and encounters with artists.",
      missionButton: "Discover our missions",
      memberButton: "See the CINEMANA card",
      metricsLabel: "CINEMANA highlights",
      metrics: [
        ["15+", "screenings with prior reservation"],
        ["Tangier", "local roots and national reach"],
        ["Festival", "opening, closing and professional meetings"],
        ["Film clubs", "image education for young audiences"]
      ],
      introEyebrow: "Home",
      introTitle: "A cultural movement open to everyone.",
      introCopy: "CINEMANA promotes a living approach to cinema: discovering works, meeting the people who create them, training tomorrow’s talents and supporting the circulation of Moroccan films.",
      reserveButton: "Reserve a seat",
      supportButton: "Support the foundation",
      photosLabel: "CINEMANA photos",
      photoAlts: [
        "CINEMANA screening inside a cinema hall",
        "Professional encounter during the festival",
        "Audiovisual training workshop with a camera"
      ],
      captions: ["Screenings", "Encounters", "Training"]
    },
    missions: {
      eyebrow: "Missions",
      title: "Promoting cinema, training audiences and strengthening cultural bridges.",
      heading: "The CINEMANA Foundation",
      p1: "The CINEMANA Foundation is a non-profit cultural institution dedicated to promoting cinema and culture, active in Tangier and nationally through the National Federation of Film Clubs.",
      p2: "Our missions are built around complementary priorities, from the festival to training, cultural mediation and stronger distribution channels for Moroccan films.",
      quote: "Join us and take part, directly or indirectly, in a living cultural movement.",
      cards: [
        ["Tangier International Film Festival", "The flagship event of our program, the festival presents each year a rich selection of Moroccan and international feature and short films, premieres, tributes and professional meetings. It is an essential gathering for film lovers and industry professionals.", "Festival photos coming soon."],
        ["Monthly screenings", "Throughout the year, we organize regular screenings in partner cinemas in Tangier, allowing audiences to discover or rediscover Moroccan and foreign works in a welcoming setting."],
        ["School film clubs", "We support schools in creating and running film clubs, helping younger generations understand cinematic language and become critical, passionate viewers."],
        ["Training in cinema professions", "In partnership with professionals and the National Federation of Film Clubs, we offer workshops and training paths in directing, editing, screenwriting and cultural project management."],
        ["National and international mediation", "We develop cultural mediation actions to bring cinema closer to all audiences and build partnerships with foreign institutions to encourage exchange and cinematic cooperation."],
        ["Local cinema infrastructure", "Through media coverage and the appeal of our events, we help Tangier shine locally and internationally while supporting the development of venues and screening facilities."],
        ["Distribution of Moroccan films", "We actively work to facilitate the circulation of Moroccan works in Morocco and abroad by creating bridges between producers, distributors and cinemas."]
      ]
    },
    bureau: {
      eyebrow: "Board & Committees",
      title: "A committed team carrying CINEMANA projects forward.",
      executive: "Executive board",
      committees: "Committee coordinators",
      roles: ["President", "General Secretary", "Treasurer", "Advisor", "Advisor"],
      committeeRoles: ["Organization", "Logistics", "Audiovisual", "Communication"]
    },
    activities: {
      eyebrow: "Activities",
      title: "CINEMANA Activities",
      imageAlt: "Tangier Film Festival audience in the lobby",
      featureEyebrow: "Highlight",
      featureTitle: "Tangier Film Festival",
      featureCopy: [
        "Tangier Film Festival is an international event that has firmly established itself on the regional film-festival circuit as one of the most respected African and Arab festivals.",
        "It presents an impressive competition selection, including feature films, fiction shorts, animated shorts and documentary shorts, with the presence of internationally renowned distributors and festival agents.",
        "Each year, the Festival invites filmmakers from around the world to take part in Tangier Film Factory, where they can develop their networking with producers, buyers, distributors and project holders, and see their films presented on the Festival platform and promoted to our members worldwide."
      ],
      cards: [
        ["International competition", "Feature films, fiction shorts, animation and documentaries in a recognized selection."],
        ["Tangier Film Factory", "A development and networking space for filmmakers, producers, buyers and distributors."],
        ["Global reach", "Films presented on the Festival platform and promoted through an international member network."]
      ],
      galleryLabel: "Tangier Film Festival photos",
      galleryCaptions: ["Red carpet", "Ceremony", "Networking", "Press", "Award winners"],
      galleryAlts: [
        "Guests on the Tangier Film Festival red carpet",
        "Audience in the theatre during Tangier Film Festival",
        "Professional area at Tangier Film Festival",
        "Press interview during Tangier Film Festival",
        "Award winners holding trophies at Tangier Film Festival"
      ],
      monthlyImageAlt: "CINEMANA monthly screening at the Palais des Arts in Tangier",
      monthlyEyebrow: "Screening cycle",
      monthlyTitle: "Monthly Screenings",
      monthlyCopy: [
        "As part of the SIN project launched by the Ministry of Youth and Culture in partnership with the National Federation of Film Clubs, the CINEMANA Foundation organizes monthly screening cycles in collaboration with the Regional Directorate of Culture and the Palais des Arts in Tangier."
      ],
      monthlyCards: [
        ["SIN project", "A national program that brings cinema closer to audiences and supports local cultural life."],
        ["Institutional partnerships", "An initiative carried out with the ministry, the National Federation of Film Clubs and the Regional Directorate of Culture."],
        ["Palais des Arts Tangier", "A screening and meeting space where films are shared with Tangier audiences."]
      ],
      monthlyGalleryLabel: "CINEMANA monthly screening photos",
      monthlyGalleryCaptions: ["Screening", "Audience welcome", "Encounter", "Guests", "Exchange"],
      monthlyGalleryAlts: [
        "Projection screen during a CINEMANA monthly screening",
        "Audience in the lobby during CINEMANA monthly screenings",
        "Symbolic presentation during a CINEMANA monthly screening",
        "Guests in front of the CINEMANA backdrop during monthly screenings",
        "Interview during CINEMANA monthly screenings"
      ],
      trainingImageAlt: "Poster for the COURTS BETWEEN 2 SHORES residency",
      trainingEyebrow: "Workshop and training",
      trainingTitle: "COURTS BETWEEN 2 SHORES",
      trainingCopy: [
        "The CINEMANA Foundation organizes, in partnership with France Télévisions and the three festivals Les Nuits MED, MoliseCinema and Vues sur les Arts, the Mediterranean residency “COURTS BETWEEN 2 SHORES”, inviting four short-film project holders from Morocco, France, Tunisia and Italy to develop their projects and compete for a France Télévisions acquisition prize."
      ],
      trainingCards: [
        ["Mediterranean residency", "A development program dedicated to short films connecting Morocco, France, Tunisia and Italy."],
        ["International partners", "A residency organized with France Télévisions, Les Nuits MED, MoliseCinema and Vues sur les Arts."],
        ["Acquisition prize", "Supported projects compete for a France Télévisions acquisition prize."]
      ],
      schoolImageAlt: "Student handling a camera during a CINEMANA school film club",
      schoolEyebrow: "School film clubs",
      schoolTitle: "School Film Clubs",
      schoolCopy: [
        "The CINEMANA Foundation runs school film clubs in several educational institutions in Tangier through film screenings, introductory cinema workshops and training sessions for pupils and students. Through these activities, the foundation promotes image education, develops young people’s critical thinking and creativity, and encourages cultural exchange and openness to different forms of artistic and cinematic expression."
      ],
      schoolCards: [
        ["Image education", "Screenings and workshops that help young people read, analyze and question images."],
        ["Introduction to cinema", "Practical training around the camera, storytelling, directing and cinema professions."],
        ["Creativity and exchange", "A setting that develops critical thinking, creativity and cultural openness among pupils and students."]
      ],
      schoolGalleryLabel: "CINEMANA school film club photos",
      schoolGalleryCaptions: ["Camera workshop", "Student group", "Audiovisual practice", "Mentoring", "Educational exchange", "School screening"],
      schoolGalleryAlts: [
        "Student using a camera during a school film club workshop",
        "Group of students taking part in a school film club in Tangier",
        "Young people practicing audiovisual work with cameras and a stabilizer",
        "Technical mentoring with students around a camera",
        "Educational exchange between a trainer and young participants",
        "School audience attending a screening"
      ]
    },
    membership: {
      eyebrow: "CINEMANA card",
      title: "Become a member",
      copy: "By becoming a member of the CINEMANA Foundation, you gain access to exclusive benefits designed for cinema and culture lovers.",
      benefits: [
        ["Reserved screenings", "Admission by prior reservation to more than fifteen film screenings organized throughout the year, including monthly sessions and the special program of the Tangier International Film Festival."],
        ["Ceremonies and VIP area", "A personal invitation to the prestigious opening and closing ceremonies of the festival, with privileged access to the VIP area where you can exchange in a friendly setting."],
        ["Exclusive encounters", "The opportunity to take part in unique meetings and debates with the biggest Moroccan stars and directors."],
        ["Carte blanche draw", "Automatic entry into a draw to win a carte blanche giving access to the Cinematographic University organized by the National Federation of Film Clubs, including accommodation, meals and participation in scheduled workshops and training sessions."],
        ["Stay in Marrakech", "Participation in the grand tombola to win a stay in Marrakech."]
      ],
      ctaTitle: "With the CINEMANA card, “Live cinema. Bring cinema back to life.”",
      ctaCopy: "",
      ctaButton: "Request my card"
    },
    partner: {
      eyebrow: "Become a partner",
      title: "Become a partner of the CINEMANA Foundation",
      heading: "Associate your image with a major cultural movement.",
      copy: "Joining the CINEMANA Foundation as a partner means associating your image with a cultural movement of national and international scope, active in Tangier and across Morocco through the National Federation of Film Clubs.",
      copy2: "Our partnership offer allows you to provide your collaborators or audiences with the CINEMANA membership card, designed to experience cinema from the inside.",
      close: "Becoming a CINEMANA partner means combining social responsibility, cultural visibility and a concrete benefit for your teams, while helping bring cinema back to life.",
      cards: [
        ["Valuable visibility", "Visibility across our communication channels: website, social media, festival posters and trailer before each screening, with your logo and cultural commitment mentioned."],
        ["Distinctive HR benefit", "Annual membership card for your collaborators, including more than fifteen free screenings, invitations to festival ceremonies, VIP access, meetings and signings with Moroccan and foreign stars and directors."],
        ["Preferential pricing", "From ten cards ordered, the unit price is reduced through a decreasing rate."],
        ["Company invitation", "A personal invitation for one representative of your company to the festival opening and closing ceremonies, with access to VIP and industry spaces."],
        ["Cultural partner certificate", "A cultural partner certificate you can highlight in CSR reports, on your website and in internal communications."],
        ["Concrete impact", "A contribution to strengthening local cinema infrastructure, distributing Moroccan films and increasing Tangier’s attractiveness nationally and internationally."]
      ]
    },
    reservation: {
      eyebrow: "Reservation",
      title: "Choose your reservation path.",
      heading: "Member or individual",
      copy: "CINEMANA members reserve with their code and choose their seat after phone verification. Individuals fill in a request that goes through validation before the ticket is sent.",
      note: "The ticket received includes the confirmed seat number.",
      quote: "A clear path to confirm seats and keep the screening-day experience smooth.",
      member: {
        eyebrow: "Reserve as a member",
        title: "Member reservation",
        steps: ["Request member code.", "Phone verification.", "Seat selection.", "Reservation confirmation."],
        labels: {
          code: "Member code",
          phone: "Phone",
          seat: "Seat choice"
        },
        emptySeat: "Choose a seat",
        button: "Confirm member reservation",
        message: (code, seat, number) => `Code ${code} verified by phone. Your seat ${seat} is reserved under reference MEM-${number}.`
      },
      public: {
        eyebrow: "Reserve as an individual",
        title: "Reservation request",
        steps: ["Fill in the form.", "Wait for validation.", "Receive confirmation.", "Receive the ticket with seat number."],
        labels: {
          name: "Full name",
          firstName: "First name",
          lastName: "Last name",
          whatsapp: "WhatsApp phone",
          age: "Age",
          role: "Occupation",
          source: "How did you hear about the screening?"
        },
        button: "Send request",
        message: (name, seat, number) => `Thank you ${name}. Your request is awaiting validation. After confirmation, you will receive ticket ${number} with seat ${seat}.`
      }
    },
    press: {
      eyebrow: "Press",
      title: "Press information and media requests.",
      socialEyebrow: "Social media",
      socialTitle: "Follow CINEMANA",
      contactEyebrow: "Contact us",
      contactTitle: "Contact us",
      cards: [
        ["Press releases", "CINEMANA Foundation news, program announcements, partnerships and festival highlights."],
        ["Press kit", "Foundation presentation, missions, board, official visuals and key figures to update with upcoming documents."],
        ["Accreditations", "Press access requests for ceremonies, screenings, conferences, interviews and professional spaces."],
        ["Media contact", "Communication coordination: Khaoula El Maaroufi."]
      ]
    },
    partners: {
      eyebrow: "Partners",
      title: "A network serving Moroccan cinema and cultural mediation.",
      festivalEyebrow: "Tangier Film Festival",
      festivalTitle: "Festival partners",
      festivalCopy: "Institutions, cultural venues and professional partners supporting the festival's reach.",
      residencyEyebrow: "Screenwriting Residency",
      residencyTitle: "Screenwriting residency partners",
      residencyCopy: "The Mediterranean partners of the COURTS ENTRE 2 RIVES residency.",
      sinEyebrow: "Monthly SIN screenings",
      sinTitle: "Monthly SIN screening partners",
      sinCopy: "A program carried out with the Ministry of Youth, Culture and Communication, the National Federation of Film Clubs in Morocco and ISTA NTIC TANGER.",
      sinMinistry: "Ministry of Youth, Culture and Communication",
      sinFnccm: "National Federation of Film Clubs in Morocco",
      sinCad: "ISTA NTIC TANGER"
    },
    footer: {
      copy: "A non-profit cultural foundation dedicated to promoting cinema and culture in Tangier and across Morocco.",
      sitemap: "Site map",
      foundation: "Foundation",
      links: ["Missions", "CINEMANA card", "Reservation", "Board & Committees", "Become a partner", "Press"]
    },
    modal: {
      eyebrow: "CINEMANA card",
      title: "Membership request",
      close: "Close",
      labels: {
        name: "Full name",
        firstName: "First name",
        lastName: "Last name",
        birthday: "Date of birth",
        city: "City",
        phone: "Phone number",
        email: "E-mail",
        password: "Password",
        repeatPassword: "Repeat password",
        verificationCode: "Verification code"
      },
      button: "Send verification code",
      verifyButton: "Verify code and send my request",
      loadingCode: "Sending the verification code...",
      loadingCreate: "Verifying the code and sending the request...",
      codeSent: (email) => `A 6-digit code was sent to ${email}. Check your inbox and spam folder.`,
      verificationHelp: "Enter the 6-digit code received by e-mail.",
      success: (name) => `Thank you ${name}. We have received your CINEMANA membership request. Our team will review it and get back to you as soon as possible.`,
      completeTitle: "Request sent",
      completeHome: "Back to home",
      validation: {
        required: "Please fill in every field in the form.",
        email: "Please enter a valid e-mail address.",
        birthday: "Please enter a valid date of birth in the past.",
        passwordLength: "The password must contain at least 8 characters.",
        passwordMatch: "The two passwords do not match.",
        firebaseMissing: "Firebase configuration is missing. Replace the YOUR_FIREBASE_* values in script.js.",
        firebaseSdkMissing: "The Firebase SDK is not loaded. Check your connection or CDN links.",
        emailServiceMissing: "EmailJS configuration is missing. Replace EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID and EMAILJS_TEMPLATE_ID in script.js.",
        emailSdkMissing: "The EmailJS SDK is not loaded. Check your connection or CDN link.",
        sheetsMissing: "Google Sheets configuration is missing. Replace GOOGLE_SHEETS_WEB_APP_URL in script.js after deploying Apps Script.",
        sheetsSyncFailed: "Your request is almost complete, but saving failed. Please try again in a moment.",
        codeRequired: "Please enter the code received by e-mail.",
        codeExpired: "The code has expired. Request a new code.",
        codeMismatch: "The code you entered is incorrect.",
        tooManyAttempts: "Too many incorrect attempts. Request a new code.",
        emailSendFailed: "Unable to send the code right now. Check EmailJS and try again.",
        emailRecipientMissing: "The recipient is empty in EmailJS. In your EmailJS template, put {{to_email}} in the To Email field.",
        accountExists: "A request already exists with this e-mail. Please use another e-mail or contact CINEMANA.",
        generic: "Unable to send the request right now. Please try again."
      }
    }
  },
  ar: {
    lang: "ar",
    dir: "rtl",
    metaTitle: "مؤسسة سينمانا | السينما والثقافة في طنجة",
    metaDescription: "مؤسسة سينمانا مؤسسة ثقافية غير ربحية مكرسة للسينما والنوادي السينمائية والتكوينات والمهرجان الدولي للفيلم بطنجة.",
    langLabel: "اختيار اللغة",
    menuLabel: "فتح القائمة",
    nav: {
      home: "الرئيسية",
      missions: "المهام",
      bureau: "المكتب واللجان",
      activities: "الأنشطة",
      membership: "كن عضوا",
      partner: "كن شريكا",
      reservation: "الحجز",
      dashboard: "فضاء العضو",
      press: "الصحافة",
      partners: "الشركاء"
    },
    home: {
      heroAlt: "كاميرا سينمائية في موقع تصوير",
      logoLabel: "شعار سينمانا المتحرك",
      eyebrow: "نتنفس سينما",
      title: "السينما تجربة نعيشها ونتقاسمها وننقلها من طنجة.",
      copy: "تجمع مؤسسة سينمانا عشاق السينما حول المهرجان الدولي للفيلم بطنجة، والعروض الشهرية، والنوادي السينمائية المدرسية، والتكوينات، واللقاءات مع الفنانين.",
      missionButton: "اكتشف مهامنا",
      memberButton: "تعرف على بطاقة سينمانا",
      metricsLabel: "معطيات سينمانا",
      metrics: [
        ["+15", "عرضا سينمائيا بالحجز المسبق"],
        ["طنجة", "امتداد محلي وإشعاع وطني"],
        ["المهرجان", "افتتاح واختتام ولقاءات مهنية"],
        ["الأندية السينمائية", "تربية بصرية موجهة للشباب"]
      ],
      introEyebrow: "الرئيسية",
      introTitle: "دينامية ثقافية مفتوحة للجميع.",
      introCopy: "تدافع سينمانا عن مقاربة حية للسينما: اكتشاف الأعمال، لقاء صانعيها، تكوين مواهب الغد، ودعم تداول الأفلام المغربية.",
      reserveButton: "احجز مقعدا",
      supportButton: "ادعم المؤسسة",
      photosLabel: "صور سينمانا",
      photoAlts: [
        "عرض سينمانا داخل قاعة سينما",
        "لقاء مهني خلال المهرجان",
        "ورشة تكوين سمعي بصري بالكاميرا"
      ],
      captions: ["العروض", "اللقاءات", "التكوينات"]
    },
    missions: {
      eyebrow: "المهام",
      title: "النهوض بالسينما، تكوين الجمهور، وتقوية الجسور الثقافية.",
      heading: "مؤسسة سينمانا",
      p1: "مؤسسة سينمانا مؤسسة ثقافية غير ربحية مكرسة للنهوض بالسينما والثقافة، تنشط في طنجة وعلى المستوى الوطني عبر الجامعة الوطنية للأندية السينمائية.",
      p2: "تتمحور مهامنا حول محاور متكاملة، من المهرجان إلى التكوين، مرورا بالوساطة الثقافية وتقوية شبكة توزيع الأفلام المغربية.",
      quote: "انضموا إلينا وشاركوا بشكل مباشر أو غير مباشر في دينامية ثقافية حية.",
      cards: [
        ["المهرجان الدولي للفيلم بطنجة", "الحدث الأبرز في برنامجنا، يقترح المهرجان كل سنة مختارات غنية من الأفلام الطويلة والقصيرة المغربية والدولية، وعروضا أولى، وتكريمات، ولقاءات مهنية. إنه موعد أساسي لعشاق السينما وفاعلي القطاع.", "صور المهرجان قريبا."],
        ["العروض الشهرية", "ننظم طوال السنة عروضا منتظمة في قاعات شريكة بطنجة، تتيح للجمهور اكتشاف أو إعادة اكتشاف أعمال مغربية وأجنبية في أجواء ودية."],
        ["النوادي السينمائية المدرسية", "نواكب المؤسسات التعليمية في إنشاء وتنشيط نواد سينمائية لإيقاظ الأجيال الشابة على اللغة السينمائية وتكوين مشاهدين نقديين وشغوفين."],
        ["التكوين في مهن السينما", "بشراكة مع مهنيين والجامعة الوطنية للأندية السينمائية، نقترح ورشات ومسارات تكوينية في الإخراج والمونتاج وكتابة السيناريو وتدبير المشاريع الثقافية."],
        ["الوساطة الوطنية والدولية", "نطور أنشطة للوساطة الثقافية لتقريب السينما من كل الجماهير، وننسج شراكات مع مؤسسات أجنبية لتعزيز التبادل والتعاون السينمائي."],
        ["البنية السينمائية المحلية", "من خلال التغطية الإعلامية وجاذبية فعالياتنا، نساهم في إشعاع طنجة محليا ودوليا، وندعم تطوير التجهيزات وفضاءات العرض."],
        ["توزيع الأفلام المغربية", "نعمل بنشاط على تسهيل تداول الأعمال المغربية داخل المغرب وخارجه، عبر خلق جسور بين المنتجين والموزعين وقاعات السينما."]
      ]
    },
    bureau: {
      eyebrow: "المكتب واللجان",
      title: "فريق ملتزم بحمل مشاريع سينمانا إلى الأمام.",
      executive: "المكتب التنفيذي",
      committees: "منسقو اللجان",
      roles: ["الرئيس", "الكاتب العام", "أمينة المال", "مستشار", "مستشار"],
      committeeRoles: ["التنظيم", "اللوجستيك", "السمعي البصري", "التواصل"]
    },
    activities: {
      eyebrow: "الأنشطة",
      title: "أنشطة سينمانا",
      imageAlt: "جمهور مهرجان طنجة للفيلم في بهو القاعة",
      featureEyebrow: "محطة بارزة",
      featureTitle: "مهرجان طنجة للفيلم",
      featureCopy: [
        "مهرجان طنجة للفيلم تظاهرة دولية فرضت مكانتها بقوة ضمن المسار الجهوي لمهرجانات السينما، كواحد من أبرز المهرجانات الإفريقية والعربية.",
        "يقترح المهرجان اختيارات مهمة من الأفلام في المسابقة، تشمل الأفلام الطويلة، والأفلام القصيرة الروائية، وأفلام التحريك القصيرة، والأفلام الوثائقية القصيرة، بحضور موزعين ووكلاء مهرجانات ذوي صيت دولي.",
        "يدعو المهرجان كل سنة سينمائيين من مختلف أنحاء العالم للمشاركة في Tangier Film Factory، حيث تتاح لهم فرصة تطوير شبكة علاقاتهم بين المنتجين والمشترين والموزعين وحاملي المشاريع، وعرض أفلامهم على منصة المهرجان والترويج لها لدى أعضائنا عبر العالم."
      ],
      cards: [
        ["مسابقة دولية", "أفلام طويلة، وأفلام قصيرة روائية، وتحريك، ووثائقيات ضمن اختيار سينمائي معترف به."],
        ["Tangier Film Factory", "فضاء للتطوير والتشبيك بين السينمائيين والمنتجين والمشترين والموزعين."],
        ["إشعاع عالمي", "أفلام تعرض على منصة المهرجان وتروج ضمن شبكة دولية من الأعضاء."]
      ],
      galleryLabel: "صور مهرجان طنجة للفيلم",
      galleryCaptions: ["السجادة الحمراء", "الحفل", "التشبيك", "الصحافة", "الفائزون"],
      galleryAlts: [
        "ضيوف على السجادة الحمراء في مهرجان طنجة للفيلم",
        "الجمهور داخل القاعة خلال مهرجان طنجة للفيلم",
        "فضاء مهني في مهرجان طنجة للفيلم",
        "حوار صحفي خلال مهرجان طنجة للفيلم",
        "فائزون يحملون الجوائز في مهرجان طنجة للفيلم"
      ],
      monthlyImageAlt: "عرض شهري لسينمانا في قصر الفنون بطنجة",
      monthlyEyebrow: "دورة عروض",
      monthlyTitle: "العروض الشهرية",
      monthlyCopy: [
        "في إطار مشروع SIN الذي أطلقته وزارة الشباب والثقافة بشراكة مع الجامعة الوطنية للأندية السينمائية، تنظم مؤسسة سينمانا دورات عروض شهرية بتعاون مع المديرية الجهوية للثقافة وقصر الفنون بطنجة."
      ],
      monthlyCards: [
        ["مشروع SIN", "برنامج وطني يقرب السينما من الجمهور ويدعم الحياة الثقافية المحلية."],
        ["شراكات مؤسساتية", "مبادرة تنجز مع الوزارة والجامعة الوطنية للأندية السينمائية والمديرية الجهوية للثقافة."],
        ["قصر الفنون بطنجة", "فضاء للعرض واللقاء من أجل تقاسم الأفلام مع جمهور طنجة."]
      ],
      monthlyGalleryLabel: "صور العروض الشهرية لسينمانا",
      monthlyGalleryCaptions: ["العرض", "استقبال الجمهور", "لقاء", "ضيوف", "تبادل"],
      monthlyGalleryAlts: [
        "شاشة عرض خلال عرض شهري لسينمانا",
        "الجمهور في بهو القاعة خلال العروض الشهرية لسينمانا",
        "تسليم رمزي خلال عرض شهري لسينمانا",
        "ضيوف أمام خلفية سينمانا خلال العروض الشهرية",
        "حوار خلال العروض الشهرية لسينمانا"
      ],
      trainingImageAlt: "ملصق إقامة COURTS ENTRE 2 RIVES",
      trainingEyebrow: "ورشات وتكوين",
      trainingTitle: "COURTS ENTRE 2 RIVES",
      trainingCopy: [
        "تنظم مؤسسة سينمانا، بشراكة مع France Télévisions والمهرجانات الثلاثة Les Nuits MED وMoliseCinema وVues sur les Arts، الإقامة المتوسطية « COURTS ENTRE 2 RIVES »، التي تستضيف أربعة حاملي مشاريع أفلام قصيرة من المغرب وفرنسا وتونس وإيطاليا لتطوير مشاريعهم والتنافس على جائزة شراء من France Télévisions."
      ],
      trainingCards: [
        ["إقامة متوسطية", "برنامج تطوير مخصص للأفلام القصيرة يربط المغرب وفرنسا وتونس وإيطاليا."],
        ["شركاء دوليون", "إقامة تنظم مع France Télévisions وLes Nuits MED وMoliseCinema وVues sur les Arts."],
        ["جائزة شراء", "المشاريع المواكبة تتنافس على جائزة شراء من France Télévisions."]
      ],
      schoolImageAlt: "تلميذ يستعمل كاميرا خلال نشاط لنادي سينمائي مدرسي لسينمانا",
      schoolEyebrow: "الأندية السينمائية المدرسية",
      schoolTitle: "الأندية السينمائية المدرسية",
      schoolCopy: [
        "تنشط مؤسسة سينمانا أندية سينمائية مدرسية داخل عدد من المؤسسات التعليمية بطنجة، عبر تنظيم عروض أفلام وورشات للتعريف بالسينما وتكوينات موجهة للتلاميذ والطلبة. ومن خلال هذه الأنشطة، تعمل المؤسسة على ترسيخ التربية على الصورة، وتنمية الحس النقدي والإبداع لدى الشباب، مع تشجيع التبادل الثقافي والانفتاح على مختلف أشكال التعبير الفني والسينمائي."
      ],
      schoolCards: [
        ["التربية على الصورة", "عروض وورشات تساعد الشباب على قراءة الصور وتحليلها وطرح الأسئلة حولها."],
        ["الانفتاح على السينما", "تكوينات تطبيقية حول الكاميرا والسرد والإخراج ومهن السينما."],
        ["الإبداع والتبادل", "فضاء ينمي الحس النقدي والإبداع والانفتاح الثقافي لدى التلاميذ والطلبة."]
      ],
      schoolGalleryLabel: "صور الأندية السينمائية المدرسية لسينمانا",
      schoolGalleryCaptions: ["ورشة الكاميرا", "مجموعة تلاميذ", "تطبيق سمعي بصري", "تأطير", "تبادل تربوي", "عرض مدرسي"],
      schoolGalleryAlts: [
        "تلميذ يستعمل كاميرا خلال ورشة لناد سينمائي مدرسي",
        "مجموعة من التلاميذ يشاركون في ناد سينمائي مدرسي بطنجة",
        "شباب في تطبيق سمعي بصري باستعمال الكاميرات والمثبت",
        "تأطير تقني مع التلاميذ حول الكاميرا",
        "تبادل تربوي بين مؤطر وشباب مشاركين",
        "جمهور مدرسي يتابع عرضا سينمائيا"
      ]
    },
    membership: {
      eyebrow: "بطاقة سينمانا",
      title: "كن عضوا",
      copy: "بانضمامك إلى مؤسسة سينمانا، تستفيد من مجموعة امتيازات حصرية موجهة لعشاق السينما والثقافة.",
      benefits: [
        ["عروض بالحجز المسبق", "الدخول بالحجز المسبق إلى أكثر من خمسة عشر عرضا سينمائيا طوال السنة، تشمل العروض الشهرية والبرنامج الخاص للمهرجان الدولي للفيلم بطنجة."],
        ["الحفلات وفضاء VIP", "دعوة شخصية إلى حفلي الافتتاح والاختتام المرموقين للمهرجان، مع ولوج مميز إلى فضاء VIP للتبادل في أجواء ودية."],
        ["لقاءات حصرية", "إمكانية المشاركة في لقاءات ونقاشات غير مسبوقة مع أكبر النجوم والمخرجين المغاربة."],
        ["قرعة البطاقة البيضاء", "مشاركة تلقائية في قرعة للفوز ببطاقة بيضاء تتيح الولوج إلى الجامعة السينمائية المنظمة من طرف الجامعة الوطنية للأندية السينمائية، وتشمل الإقامة والتغذية والمشاركة في الورشات والتكوينات المبرمجة."],
        ["إقامة في مراكش", "المشاركة في الطومبولا الكبرى للفوز بإقامة في مراكش."]
      ],
      ctaTitle: "مع بطاقة سينمانا: «عيشوا السينما. أعيدوا الحياة إلى السينما.»",
      ctaCopy: "",
      ctaButton: "اطلب بطاقتي"
    },
    partner: {
      eyebrow: "كن شريكا",
      title: "كن شريكا لمؤسسة سينمانا",
      heading: "اربطوا صورتكم بدينامية ثقافية واسعة.",
      copy: "الانضمام إلى مؤسسة سينمانا كشريك يعني ربط صورتكم بدينامية ثقافية ذات امتداد وطني ودولي، تنشط في طنجة وعبر المغرب من خلال الجامعة الوطنية للأندية السينمائية.",
      copy2: "يتيح لكم عرض الشراكة تقديم بطاقة عضوية سينمانا لموظفيكم أو جمهوركم، وهي بطاقة مصممة لعيش السينما من الداخل.",
      close: "أن تصبحوا شركاء سينمانا يعني الجمع بين المسؤولية المجتمعية والإشعاع الثقافي ومنفعة ملموسة لفريقكم، مع المساهمة في إعادة الحياة إلى السينما.",
      cards: [
        ["رؤية إعلامية قيمة", "حضور في كل وسائل تواصلنا: الموقع الإلكتروني، الشبكات الاجتماعية، ملصقات المهرجان، والإعلان قبل كل عرض، مع ذكر شعاركم والتزامكم الثقافي."],
        ["امتياز موارد بشرية", "بطاقة عضوية سنوية لموظفيكم تشمل أكثر من خمسة عشر عرضا مجانيا، دعوات إلى حفلي افتتاح واختتام المهرجان، الولوج إلى فضاء VIP، ولقاءات وتوقيعات مع نجوم ومخرجين مغاربة وأجانب."],
        ["تعرفة تفضيلية", "ابتداء من عشر بطاقات مطلوبة، يتم تخفيض السعر الفردي وفق تعرفة تنازلية."],
        ["دعوة لممثل الشركة", "دعوة شخصية لممثل عن شركتكم إلى حفلي افتتاح واختتام المهرجان، مع الولوج إلى فضاءات VIP والصناعة."],
        ["شهادة شريك ثقافي", "شهادة شريك ثقافي يمكنكم إبرازها في تقارير المسؤولية المجتمعية، وعلى موقعكم الإلكتروني، وفي تواصلكم الداخلي."],
        ["أثر ملموس", "مساهمة فعلية في تقوية البنية السينمائية المحلية، وتوزيع الأفلام المغربية، وجاذبية طنجة على الساحة الوطنية والدولية."]
      ]
    },
    reservation: {
      eyebrow: "الحجز",
      title: "اختاروا مسار الحجز المناسب.",
      heading: "عضو أو فرد",
      copy: "يقوم أعضاء سينمانا بالحجز باستعمال الرمز الخاص بهم، ثم يتم التحقق عبر الهاتف قبل اختيار المقعد. أما الأفراد فيملؤون طلبا ينتظر المصادقة قبل إرسال التذكرة.",
      note: "التذكرة المستلمة تتضمن رقم المقعد المؤكد.",
      quote: "مسار واضح لتأكيد المقاعد وضمان تجربة سلسة يوم العرض.",
      member: {
        eyebrow: "احجز كعضو",
        title: "حجز الأعضاء",
        steps: ["طلب رمز العضوية.", "التحقق عبر الهاتف.", "اختيار المقعد.", "تأكيد الحجز."],
        labels: {
          code: "رمز العضوية",
          phone: "الهاتف",
          seat: "اختيار المقعد"
        },
        emptySeat: "اختيار مقعد",
        button: "تأكيد حجز العضو",
        message: (code, seat, number) => `تم التحقق من الرمز ${code} عبر الهاتف. تم حجز المقعد ${seat} تحت المرجع MEM-${number}.`
      },
      public: {
        eyebrow: "احجز كفرد",
        title: "طلب الحجز",
        steps: ["ملء الاستمارة.", "انتظار المصادقة.", "استلام التأكيد.", "استلام التذكرة مع رقم المقعد."],
        labels: {
          name: "الاسم الكامل",
          firstName: "الاسم",
          lastName: "النسب",
          whatsapp: "هاتف واتساب",
          age: "العمر",
          role: "المهنة",
          source: "كيف علمت بهذا العرض؟"
        },
        button: "إرسال الطلب",
        message: (name, seat, number) => `شكرا ${name}. طلبكم في انتظار المصادقة. بعد التأكيد، ستتوصلون بالتذكرة ${number} مع المقعد ${seat}.`
      }
    },
    press: {
      eyebrow: "الصحافة",
      title: "معلومات صحفية وطلبات إعلامية.",
      socialEyebrow: "مواقع التواصل",
      socialTitle: "تابعوا CINEMANA",
      contactEyebrow: "تواصل معنا",
      contactTitle: "تواصل معنا",
      cards: [
        ["بلاغات", "أخبار مؤسسة سينمانا، إعلانات البرمجة، الشراكات، وأبرز لحظات المهرجان."],
        ["الملف الصحفي", "تقديم المؤسسة، المهام، المكتب، الصور الرسمية، والأرقام الأساسية التي سيتم تحديثها مع الوثائق المقبلة."],
        ["الاعتمادات", "طلبات الولوج الصحفي إلى الحفلات والعروض والندوات والمقابلات والفضاءات المهنية."],
        ["الاتصال الإعلامي", "تنسيق التواصل: خولة المعروفي."]
      ]
    },
    partners: {
      eyebrow: "الشركاء",
      title: "شبكة في خدمة السينما المغربية والوساطة الثقافية.",
      festivalEyebrow: "مهرجان طنجة للفيلم",
      festivalTitle: "شركاء المهرجان",
      festivalCopy: "مؤسسات وفضاءات ثقافية وشركاء مهنيون يواكبون إشعاع المهرجان.",
      residencyEyebrow: "إقامة السيناريو",
      residencyTitle: "شركاء إقامة السيناريو",
      residencyCopy: "الشركاء المتوسطيون لإقامة COURTS ENTRE 2 RIVES.",
      sinEyebrow: "العروض الشهرية SIN",
      sinTitle: "شركاء العروض الشهرية SIN",
      sinCopy: "برنامج يتم إنجازه بشراكة مع وزارة الشباب والثقافة والتواصل والجامعة الوطنية للأندية السينمائية بالمغرب و ISTA NTIC TANGER.",
      sinMinistry: "وزارة الشباب والثقافة والتواصل",
      sinFnccm: "الجامعة الوطنية للأندية السينمائية بالمغرب",
      sinCad: "ISTA NTIC TANGER"
    },
    footer: {
      copy: "مؤسسة ثقافية غير ربحية مكرسة للنهوض بالسينما والثقافة في طنجة وعلى المستوى الوطني.",
      sitemap: "خريطة الموقع",
      foundation: "المؤسسة",
      links: ["المهام", "بطاقة سينمانا", "الحجز", "المكتب واللجان", "كن شريكا", "الصحافة"]
    },
    modal: {
      eyebrow: "بطاقة سينمانا",
      title: "طلب العضوية",
      close: "إغلاق",
      labels: {
        name: "الاسم الكامل",
        firstName: "الاسم",
        lastName: "النسب",
        birthday: "تاريخ الميلاد",
        city: "المدينة",
        phone: "رقم الهاتف",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        repeatPassword: "تكرار كلمة المرور",
        verificationCode: "رمز التحقق"
      },
      button: "إرسال رمز التحقق",
      verifyButton: "تأكيد الرمز وإرسال الطلب",
      loadingCode: "جاري إرسال رمز التحقق...",
      loadingCreate: "جاري تأكيد الرمز وإرسال الطلب...",
      codeSent: (email) => `تم إرسال رمز من 6 أرقام إلى ${email}. تحقق من بريدك ومن مجلد الرسائل غير المرغوب فيها.`,
      verificationHelp: "أدخل الرمز المكون من 6 أرقام الذي وصلك عبر البريد الإلكتروني.",
      success: (name) => `شكرا ${name}. توصلنا بطلب العضوية ديالك فـ CINEMANA. الفريق ديالنا غادي يراجع الطلب وغادي نجاوبوك ف أقرب وقت.`,
      completeTitle: "تم إرسال الطلب",
      completeHome: "الرئيسية",
      validation: {
        required: "يرجى ملء جميع حقول الاستمارة.",
        email: "يرجى إدخال بريد إلكتروني صحيح.",
        birthday: "يرجى إدخال تاريخ ميلاد صحيح في الماضي.",
        passwordLength: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.",
        passwordMatch: "كلمتا المرور غير متطابقتين.",
        firebaseMissing: "إعدادات Firebase غير موجودة. عوض قيم YOUR_FIREBASE_* داخل script.js.",
        firebaseSdkMissing: "لم يتم تحميل SDK الخاص ب Firebase. تحقق من الاتصال أو روابط CDN.",
        emailServiceMissing: "إعدادات EmailJS غير موجودة. عوض EMAILJS_PUBLIC_KEY و EMAILJS_SERVICE_ID و EMAILJS_TEMPLATE_ID داخل script.js.",
        emailSdkMissing: "لم يتم تحميل SDK الخاص ب EmailJS. تحقق من الاتصال أو رابط CDN.",
        sheetsMissing: "إعدادات Google Sheets غير موجودة. عوض GOOGLE_SHEETS_WEB_APP_URL داخل script.js بعد نشر Apps Script.",
        sheetsSyncFailed: "الطلب ديالك تقريبا تسجل، ولكن وقع مشكل فالحفظ. عاود المحاولة بعد لحظات.",
        codeRequired: "يرجى إدخال الرمز الذي وصلك عبر البريد الإلكتروني.",
        codeExpired: "انتهت صلاحية الرمز. اطلب رمزا جديدا.",
        codeMismatch: "الرمز الذي أدخلته غير صحيح.",
        tooManyAttempts: "محاولات كثيرة غير صحيحة. اطلب رمزا جديدا.",
        emailSendFailed: "تعذر إرسال الرمز الآن. تحقق من EmailJS ثم حاول مرة أخرى.",
        emailRecipientMissing: "المستلم فارغ في EmailJS. داخل قالب EmailJS ضع {{to_email}} في خانة To Email.",
        accountExists: "هاد الإيميل مستعمل من قبل. استعمل إيميل آخر أو تواصل مع CINEMANA.",
        generic: "تعذر إرسال الطلب الآن. يرجى المحاولة مرة أخرى."
      }
    }
  }
};

const DASHBOARD_TRANSLATIONS = {
  fr: {
    heroEyebrow: "Espace membre",
    heroTitle: "Connectez-vous à votre compte CINEMANA.",
    loginEyebrow: "Carte CINEMANA",
    loginTitle: "Connexion membre",
    loginCopy: "Utilisez l’e-mail et le mot de passe créés lors de votre demande d’adhésion.",
    labels: {
      email: "E-mail",
      password: "Mot de passe",
      reference: "Référence membre",
      phone: "Téléphone",
      city: "Ville",
      seat: "Siège",
      date: "Date"
    },
    loginButton: "Se connecter",
    loginLoading: "Connexion en cours...",
    refresh: "Actualiser",
    logout: "Se déconnecter",
    greeting: (name) => `Bonjour ${name}`,
    intro: "Voici votre espace membre CINEMANA.",
    accessEyebrow: "Avantages connectés",
    accessTitle: "Votre carte devient un vrai espace de suivi.",
    accessItems: [
      "Réservations prioritaires pour les membres validés.",
      "Suivi des tickets et des demandes en cours.",
      "Historique des projections et présence."
    ],
    priorityEyebrow: "Priorité membre",
    priorityTitle: "Réservez avant l’ouverture au public.",
    priorityText: "Les membres validés bénéficient d’un accès prioritaire lorsque les réservations d’un événement sont ouvertes.",
    reserveButton: "Réserver maintenant",
    stats: {
      active: "Réservations actives",
      pending: "En attente",
      attended: "Déjà assistées",
      privileges: "Avantages disponibles"
    },
    reservationsEyebrow: "Mes réservations",
    reservationsTitle: "Réservations en cours",
    attendedEyebrow: "Historique",
    attendedTitle: "Projections déjà assistées",
    benefitsEyebrow: "Privilèges",
    benefitsTitle: "Avantages de votre carte CINEMANA",
    noReservations: "Aucune réservation active pour le moment.",
    noAttended: "Votre historique de présence apparaîtra ici après les prochaines projections.",
    noSeat: "Siège à confirmer",
    memberFallback: "Membre CINEMANA",
    statuses: {
      member: "Membre validé",
      pending: "Demande en revue",
      rejected: "Demande refusée",
      confirmed: "Confirmée",
      reservationPending: "En attente",
      canceled: "Annulée",
      attended: "Présence validée",
      unknown: "À vérifier"
    },
    errors: {
      required: "Veuillez saisir votre e-mail et votre mot de passe.",
      email: "Veuillez saisir un e-mail valide.",
      firebaseMissing: "Firebase n’est pas prêt. Vérifiez la configuration et les scripts Firebase.",
      invalidLogin: "E-mail ou mot de passe incorrect.",
      generic: "Connexion impossible pour le moment. Veuillez réessayer.",
      dashboardUnavailable: "Le compte est connecté, mais les données Google Sheets ne sont pas encore disponibles."
    },
    benefits: [
      ["Réservation prioritaire", "Accès anticipé aux réservations des projections et événements CINEMANA."],
      ["Suivi des tickets", "Vos demandes, confirmations et sièges sont regroupés au même endroit."],
      ["Rencontres exclusives", "Accès privilégié aux rencontres avec les artistes, réalisateurs et invités."],
      ["Avantages festival", "Invitations et accès réservés selon le statut de votre carte CINEMANA."]
    ]
  },
  en: {
    heroEyebrow: "Member area",
    heroTitle: "Sign in to your CINEMANA account.",
    loginEyebrow: "CINEMANA card",
    loginTitle: "Member login",
    loginCopy: "Use the e-mail and password created when you submitted your membership request.",
    labels: {
      email: "E-mail",
      password: "Password",
      reference: "Member reference",
      phone: "Phone",
      city: "City",
      seat: "Seat",
      date: "Date"
    },
    loginButton: "Sign in",
    loginLoading: "Signing in...",
    refresh: "Refresh",
    logout: "Sign out",
    greeting: (name) => `Hello ${name}`,
    intro: "This is your CINEMANA member space.",
    accessEyebrow: "Connected benefits",
    accessTitle: "Your card becomes a real tracking space.",
    accessItems: [
      "Priority reservations for approved members.",
      "Ticket and request tracking.",
      "Screening attendance history."
    ],
    priorityEyebrow: "Member priority",
    priorityTitle: "Book before public opening.",
    priorityText: "Approved members get priority access when reservations open for an event.",
    reserveButton: "Reserve now",
    stats: {
      active: "Active reservations",
      pending: "Pending",
      attended: "Already attended",
      privileges: "Available benefits"
    },
    reservationsEyebrow: "My reservations",
    reservationsTitle: "Current reservations",
    attendedEyebrow: "History",
    attendedTitle: "Screenings already attended",
    benefitsEyebrow: "Privileges",
    benefitsTitle: "Benefits of your CINEMANA card",
    noReservations: "No active reservations yet.",
    noAttended: "Your attendance history will appear here after future screenings.",
    noSeat: "Seat to confirm",
    memberFallback: "CINEMANA member",
    statuses: {
      member: "Approved member",
      pending: "Under review",
      rejected: "Request rejected",
      confirmed: "Confirmed",
      reservationPending: "Pending",
      canceled: "Canceled",
      attended: "Attendance validated",
      unknown: "To verify"
    },
    errors: {
      required: "Please enter your e-mail and password.",
      email: "Please enter a valid e-mail.",
      firebaseMissing: "Firebase is not ready. Check the Firebase configuration and scripts.",
      invalidLogin: "Incorrect e-mail or password.",
      generic: "Unable to sign in right now. Please try again.",
      dashboardUnavailable: "The account is signed in, but Google Sheets data is not available yet."
    },
    benefits: [
      ["Priority reservation", "Early access to CINEMANA screening and event reservations."],
      ["Ticket tracking", "Your requests, confirmations and seats are grouped in one place."],
      ["Exclusive encounters", "Privileged access to meetings with artists, directors and guests."],
      ["Festival benefits", "Invitations and reserved access depending on your CINEMANA card status."]
    ]
  },
  ar: {
    heroEyebrow: "فضاء العضو",
    heroTitle: "سجل الدخول إلى حسابك في سينمانا.",
    loginEyebrow: "بطاقة سينمانا",
    loginTitle: "دخول الأعضاء",
    loginCopy: "استعمل البريد الإلكتروني وكلمة المرور التي أنشأتها أثناء طلب العضوية.",
    labels: {
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      reference: "مرجع العضوية",
      phone: "الهاتف",
      city: "المدينة",
      seat: "المقعد",
      date: "التاريخ"
    },
    loginButton: "تسجيل الدخول",
    loginLoading: "جاري تسجيل الدخول...",
    refresh: "تحديث",
    logout: "تسجيل الخروج",
    greeting: (name) => `مرحبا ${name}`,
    intro: "هذا هو فضاء العضو الخاص بك في سينمانا.",
    accessEyebrow: "امتيازات متصلة",
    accessTitle: "بطاقتك تصبح فضاء حقيقيا للتتبع.",
    accessItems: [
      "حجز مسبق للأعضاء المقبولين.",
      "تتبع التذاكر والطلبات الجارية.",
      "تاريخ الحضور للعروض."
    ],
    priorityEyebrow: "أولوية العضو",
    priorityTitle: "احجز قبل فتح الحجز للعموم.",
    priorityText: "الأعضاء المقبولون يستفيدون من أولوية الحجز عند فتح حجوزات أي حدث.",
    reserveButton: "احجز الآن",
    stats: {
      active: "الحجوزات النشيطة",
      pending: "في الانتظار",
      attended: "حضرت من قبل",
      privileges: "امتيازات متاحة"
    },
    reservationsEyebrow: "حجوزاتي",
    reservationsTitle: "الحجوزات الجارية",
    attendedEyebrow: "السجل",
    attendedTitle: "العروض التي حضرتها",
    benefitsEyebrow: "الامتيازات",
    benefitsTitle: "امتيازات بطاقة سينمانا",
    noReservations: "لا توجد حجوزات نشيطة حاليا.",
    noAttended: "سيظهر سجل حضورك هنا بعد العروض القادمة.",
    noSeat: "المقعد سيؤكد لاحقا",
    memberFallback: "عضو سينمانا",
    statuses: {
      member: "عضو مقبول",
      pending: "قيد المراجعة",
      rejected: "طلب مرفوض",
      confirmed: "مؤكد",
      reservationPending: "في الانتظار",
      canceled: "ملغى",
      attended: "تم تأكيد الحضور",
      unknown: "يحتاج التحقق"
    },
    errors: {
      required: "يرجى إدخال البريد الإلكتروني وكلمة المرور.",
      email: "يرجى إدخال بريد إلكتروني صحيح.",
      firebaseMissing: "Firebase غير جاهز. تحقق من الإعدادات وروابط Firebase.",
      invalidLogin: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
      generic: "تعذر تسجيل الدخول حاليا. حاول مرة أخرى.",
      dashboardUnavailable: "تم تسجيل الدخول، لكن بيانات Google Sheets غير متاحة حاليا."
    },
    benefits: [
      ["حجز بالأولوية", "ولوج مبكر لحجز عروض وفعاليات سينمانا."],
      ["تتبع التذاكر", "طلباتك وتأكيداتك ومقاعدك في مكان واحد."],
      ["لقاءات حصرية", "ولوج مميز للقاءات مع الفنانين والمخرجين والضيوف."],
      ["امتيازات المهرجان", "دعوات وولوج خاص حسب حالة بطاقة سينمانا."]
    ]
  }
};

let currentLanguage = "fr";
let firebaseServices = null;
let emailJsInitialized = false;
let pendingMemberRegistration = null;
let activeActivityId = "";
let currentMemberUser = null;
let currentMemberProfile = null;
let currentMemberDashboardData = null;

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function setAttr(selector, attribute, value) {
  const element = document.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
}

function setCardTexts(baseSelector, cards) {
  cards.forEach((card, index) => {
    const selector = `${baseSelector} > article:nth-child(${index + 1})`;
    setText(`${selector} h3`, card[0]);
    setText(`${selector} h2`, card[0]);
    setText(`${selector} p:not(.note)`, card[1]);
    if (card[2]) setText(`${selector} .note`, card[2]);
  });
}

function setLabel(controlId, value) {
  const control = document.getElementById(controlId);
  const label = control ? control.closest("label") : null;
  if (!label) return;

  Array.from(label.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) node.remove();
  });

  let labelText = Array.from(label.children).find((child) => child.classList.contains("label-text"));
  if (!labelText) {
    labelText = document.createElement("span");
    labelText.className = "label-text";
    label.insertBefore(labelText, label.firstChild);
  }
  labelText.textContent = value;
}

function setOption(selector, value) {
  const option = document.querySelector(selector);
  if (option) option.textContent = value;
}

function setListTexts(selector, items) {
  document.querySelectorAll(selector).forEach((element, index) => {
    if (items[index]) element.textContent = items[index];
  });
}

function clearMessage(id) {
  const element = document.getElementById(id);
  if (!element) return;
  element.textContent = "";
  element.classList.remove("error", "success");
}

function setFormMessage(element, text, type) {
  if (!element) return;
  element.textContent = text;
  element.classList.remove("error", "success");
  if (type) element.classList.add(type);
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getActivityUiCopy() {
  const labels = {
    fr: {
      overviewEyebrow: "Nos activités",
      overviewTitle: "Explorez les programmes CINEMANA",
      open: "Découvrir l’activité",
      back: "Retour aux activités",
      keyPoints: "Points clés",
      gallery: "Galerie",
      partners: "Partenaires"
    },
    en: {
      overviewEyebrow: "Our activities",
      overviewTitle: "Explore CINEMANA programs",
      open: "Explore activity",
      back: "Back to activities",
      keyPoints: "Key points",
      gallery: "Gallery",
      partners: "Partners"
    },
    ar: {
      overviewEyebrow: "أنشطتنا",
      overviewTitle: "اكتشفوا برامج سينمانا",
      open: "اكتشف النشاط",
      back: "العودة إلى الأنشطة",
      keyPoints: "محاور أساسية",
      gallery: "معرض الصور",
      partners: "الشركاء"
    }
  };

  return labels[currentLanguage] || labels.fr;
}

function getMediationActivityCopy() {
  const copy = {
    fr: {
      eyebrow: "Rayonnement international",
      title: "Médiation internationale",
      paragraphs: [
        "La Fondation CINEMANA déploie des efforts constants de médiation culturelle et de rayonnement international afin de promouvoir l’image de Tanger et du cinéma marocain sur les scènes cinématographiques les plus prestigieuses au monde. À travers sa participation active à des manifestations internationales majeures, la fondation contribue à renforcer la visibilité de la création marocaine, à encourager les échanges professionnels et à créer des passerelles entre les talents marocains et les acteurs internationaux du secteur audiovisuel.",
        "Dans ce cadre, la fondation représente le Maroc au Festival international du court métrage de Clermont-Ferrand grâce à un stand installé au sein du marché professionnel du festival, un espace stratégique fréquenté chaque année par des milliers de visiteurs et des centaines de professionnels venus du monde entier. Cette présence permet de valoriser la richesse culturelle et cinématographique marocaine, tout en mettant en avant le potentiel de Tanger comme terre de tournage, de création et de dialogue interculturel.",
        "Par ailleurs, au Festival de Cannes, la Fondation CINEMANA participe au rayonnement du cinéma marocain à travers la présentation du programme « Entre Deux Rives » au sein du pavillon de France Télévisions, offrant ainsi une plateforme de visibilité et de coopération artistique entre les deux rives de la Méditerranée. Ces initiatives traduisent l’engagement de la fondation en faveur d’une diplomatie culturelle dynamique, capable de faire de Tanger un carrefour cinématographique international et un symbole d’ouverture, de créativité et de diversité culturelle."
      ],
      cards: [
        ["Clermont-Ferrand", "Un stand au marché professionnel pour représenter le Maroc et valoriser la création marocaine."],
        ["Festival de Cannes", "Présentation du programme « Entre Deux Rives » au pavillon de France Télévisions."],
        ["Tanger, carrefour cinématographique", "Une diplomatie culturelle qui relie les talents marocains aux réseaux internationaux."]
      ],
      captions: ["Cannes", "Stand professionnel", "Rencontres", "Marché du court métrage", "Entre Deux Rives"],
      alts: [
        "Panneau France Télévisions Brut au Festival de Cannes",
        "Stand Tangier Film Festival au marché de Clermont-Ferrand",
        "Rencontre professionnelle autour du stand marocain",
        "Vue du marché professionnel du court métrage à Clermont-Ferrand",
        "Présentation du programme Entre Deux Rives à Cannes"
      ]
    },
    en: {
      eyebrow: "International reach",
      title: "International Mediation",
      paragraphs: [
        "The CINEMANA Foundation carries out ongoing cultural mediation and international outreach to promote the image of Tangier and Moroccan cinema on the world’s most prestigious film stages. Through active participation in major international events, the foundation strengthens the visibility of Moroccan creation, encourages professional exchange and builds bridges between Moroccan talent and international audiovisual professionals.",
        "In this context, the foundation represents Morocco at the Clermont-Ferrand International Short Film Festival with a stand inside the festival’s professional market, a strategic space visited every year by thousands of visitors and hundreds of professionals from around the world. This presence highlights Morocco’s cultural and cinematic richness while promoting Tangier as a land of filming, creation and intercultural dialogue.",
        "At the Cannes Film Festival, CINEMANA also contributes to the visibility of Moroccan cinema by presenting the “Between Two Shores” program inside the France Télévisions pavilion, creating a platform for artistic visibility and cooperation between both shores of the Mediterranean. These initiatives express the foundation’s commitment to dynamic cultural diplomacy and to making Tangier an international cinematic crossroads."
      ],
      cards: [
        ["Clermont-Ferrand", "A professional-market stand representing Morocco and promoting Moroccan creation."],
        ["Cannes Film Festival", "Presentation of the “Between Two Shores” program at the France Télévisions pavilion."],
        ["Tangier as a film crossroads", "Cultural diplomacy connecting Moroccan talent with international networks."]
      ],
      captions: ["Cannes", "Professional stand", "Meetings", "Short film market", "Between Two Shores"],
      alts: [
        "France Télévisions Brut sign at the Cannes Film Festival",
        "Tangier Film Festival stand at the Clermont-Ferrand market",
        "Professional meeting around the Moroccan stand",
        "View of the Clermont-Ferrand short film market",
        "Between Two Shores presentation in Cannes"
      ]
    },
    ar: {
      eyebrow: "إشعاع دولي",
      title: "الوساطة الدولية",
      paragraphs: [
        "تعمل مؤسسة سينمانا باستمرار على تطوير الوساطة الثقافية والإشعاع الدولي من أجل إبراز صورة طنجة والسينما المغربية في أبرز المحافل السينمائية العالمية. ومن خلال مشاركتها في تظاهرات دولية كبرى، تساهم المؤسسة في تعزيز حضور الإبداع المغربي، وتشجيع التبادل المهني، وبناء جسور بين المواهب المغربية والفاعلين الدوليين في القطاع السمعي البصري.",
        "وفي هذا الإطار، تمثل المؤسسة المغرب في المهرجان الدولي للفيلم القصير بكليرمون فيران عبر رواق داخل السوق المهني للمهرجان، وهو فضاء استراتيجي يستقبل سنويا آلاف الزوار ومئات المهنيين من مختلف أنحاء العالم. وتتيح هذه المشاركة إبراز الغنى الثقافي والسينمائي المغربي، مع تقديم طنجة كأرض للتصوير والإبداع والحوار بين الثقافات.",
        "كما تشارك مؤسسة سينمانا في مهرجان كان في التعريف بالسينما المغربية من خلال تقديم برنامج « بين ضفتين » داخل رواق France Télévisions، بما يوفر منصة للرؤية والتعاون الفني بين ضفتي المتوسط. وتعكس هذه المبادرات التزام المؤسسة بدبلوماسية ثقافية ديناميكية تجعل من طنجة ملتقى سينمائيا دوليا ورمزا للانفتاح والإبداع والتنوع الثقافي."
      ],
      cards: [
        ["كليرمون فيران", "رواق داخل السوق المهني لتمثيل المغرب وإبراز الإبداع السينمائي المغربي."],
        ["مهرجان كان", "تقديم برنامج « بين ضفتين » داخل رواق France Télévisions."],
        ["طنجة ملتقى سينمائي", "دبلوماسية ثقافية تربط المواهب المغربية بالشبكات الدولية."]
      ],
      captions: ["كان", "الرواق المهني", "لقاءات", "سوق الفيلم القصير", "بين ضفتين"],
      alts: [
        "لوحة France Télévisions Brut في مهرجان كان",
        "رواق مهرجان طنجة للفيلم في سوق كليرمون فيران",
        "لقاء مهني حول الرواق المغربي",
        "منظر لسوق الفيلم القصير بكليرمون فيران",
        "تقديم برنامج بين ضفتين في كان"
      ]
    }
  };

  return copy[currentLanguage] || copy.fr;
}

function activityImage(src, alt, caption) {
  return { src, alt, caption: caption || "" };
}

const PARTNER_ASSET_VERSION = "20260526-partner-paths";

function partnerAsset(file) {
  return `assets/partners/${file}?v=${PARTNER_ASSET_VERSION}`;
}

function partnerLogo(name, logo, href) {
  return { name, logo: partnerAsset(logo), href };
}

function getActivityPartnerSets() {
  return {
    festival: [
      partnerLogo("Centre Cinematographique Marocain", "logo ccm.jpeg", "https://www.ccm.ma/"),
      partnerLogo("Commune de Tanger", "jama3a.jpeg", "https://tanger.ma/"),
      partnerLogo("Every Design", "every-design.png", "https://www.instagram.com/everydesign.ma?igsh=MTM4Mm01MTdmdmUyNw=="),
      partnerLogo("Port de Tanger Ville", "LOGO SGPTV VERSION Originale-02.jpg.jpeg", "https://www.tangerport.com/fr/port/"),
      partnerLogo("Conseil Regional du Tourisme", "logo-CRT.png", "https://www.visittanger.com/fr/"),
      partnerLogo("Arrondissement Medina", "arrondissement medina.jpg.jpeg"),
      partnerLogo("Centre Culturel Ahmed Boukmakh", "Boukmakh logo.png")
    ],
    monthly: [
      partnerLogo("Ministere de la Jeunesse, de la Culture et de la Communication", "ministere-culture.png", "https://mjcc.gov.ma/ar/"),
      partnerLogo("Federation Nationale des Cine-Clubs au Maroc", "fnccm.jpg", "https://fnccm.com/"),
      partnerLogo("ISTA NTIC TANGER", "CAD.png", "https://www.instagram.com/istantic_tanger?igsh=MTdyb2l6eHpmN2lueQ==")
    ],
    training: [
      partnerLogo("Les Nuits MED", "nuits-med-white Logo rouge et noir-01.png", "https://www.lesnuitsmediterraneennes.com/18e-nuits-med-2025/"),
      partnerLogo("MoliseCinema", "logo MOLISECINEMA PNG.png", "https://www.molisecinema.it/mc/"),
      partnerLogo("Vues sur les Arts", "Logo vues sur les arts_Plan de travail 1 copie.png", "https://www.instagram.com/lagoramarsa?igsh=MWZwaXNmY3MxMzhsNg==")
    ]
  };
}

function activityPartnersMarkup(partners, mode = "card") {
  const list = Array.isArray(partners) ? partners.filter(Boolean) : [];
  if (!list.length) return "";

  return `
    <span class="activity-partner-strip ${mode === "detail" ? "detail" : "compact"}" aria-label="Partenaires">
      ${list.map((partner) => {
        const content = `
          <img src="${escapeHtml(partner.logo)}" alt="${escapeHtml(partner.name)}" loading="lazy">
          <span>${escapeHtml(partner.name)}</span>
        `;
        if (mode === "detail" && partner.href) {
          return `<a class="activity-partner-logo" href="${escapeHtml(partner.href)}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(partner.name)}">${content}</a>`;
        }
        return `<span class="activity-partner-logo" title="${escapeHtml(partner.name)}">${content}</span>`;
      }).join("")}
    </span>
  `;
}

function getActivityItems() {
  const copy = TRANSLATIONS[currentLanguage].activities;
  const mediation = getMediationActivityCopy();
  const partnerSets = getActivityPartnerSets();

  return [
    {
      id: "festival",
      eyebrow: copy.featureEyebrow,
      title: copy.featureTitle,
      short: copy.featureCopy[0],
      paragraphs: copy.featureCopy,
      cards: copy.cards,
      partners: partnerSets.festival,
      images: [
        activityImage("assets/activities/tff-lobby.jpg?v=20260522", copy.imageAlt, copy.featureEyebrow),
        activityImage("assets/activities/tff-red-carpet.jpg?v=20260522", copy.galleryAlts[0], copy.galleryCaptions[0]),
        activityImage("assets/activities/tff-theatre.jpg?v=20260522", copy.galleryAlts[1], copy.galleryCaptions[1]),
        activityImage("assets/activities/tff-networking.jpg?v=20260522", copy.galleryAlts[2], copy.galleryCaptions[2]),
        activityImage("assets/activities/tff-press.webp?v=20260522", copy.galleryAlts[3], copy.galleryCaptions[3]),
        activityImage("assets/activities/tff-awards.jpg?v=20260522", copy.galleryAlts[4], copy.galleryCaptions[4])
      ]
    },
    {
      id: "monthly",
      eyebrow: copy.monthlyEyebrow,
      title: copy.monthlyTitle,
      short: copy.monthlyCopy[0],
      paragraphs: copy.monthlyCopy,
      cards: copy.monthlyCards,
      partners: partnerSets.monthly,
      images: [
        activityImage("assets/activities/monthly-screening.jpg?v=20260522", copy.monthlyImageAlt, copy.monthlyGalleryCaptions[0]),
        activityImage("assets/activities/monthly-lobby.jpg?v=20260522", copy.monthlyGalleryAlts[1], copy.monthlyGalleryCaptions[1]),
        activityImage("assets/activities/monthly-award.jpg?v=20260522", copy.monthlyGalleryAlts[2], copy.monthlyGalleryCaptions[2]),
        activityImage("assets/activities/monthly-guests.jpg?v=20260522", copy.monthlyGalleryAlts[3], copy.monthlyGalleryCaptions[3]),
        activityImage("assets/activities/monthly-interview.jpg?v=20260522", copy.monthlyGalleryAlts[4], copy.monthlyGalleryCaptions[4])
      ]
    },
    {
      id: "training",
      eyebrow: copy.trainingEyebrow,
      title: copy.trainingTitle,
      short: copy.trainingCopy[0],
      paragraphs: copy.trainingCopy,
      cards: copy.trainingCards,
      partners: partnerSets.training,
      images: [
        activityImage("assets/activities/courts-entre-2-rives.jpg?v=20260523", copy.trainingImageAlt, copy.trainingTitle)
      ]
    },
    {
      id: "mediation",
      eyebrow: mediation.eyebrow,
      title: mediation.title,
      short: mediation.paragraphs[0],
      paragraphs: mediation.paragraphs,
      cards: mediation.cards,
      images: [
        activityImage("assets/activities/WhatsApp%20Image%202026-05-23%20at%2017.31.20.jpeg?v=20260523", mediation.alts[0], mediation.captions[0]),
        activityImage("assets/activities/WhatsApp%20Image%202026-05-23%20at%2017.04.15.jpeg?v=20260523", mediation.alts[1], mediation.captions[1]),
        activityImage("assets/activities/WhatsApp%20Image%202026-05-23%20at%2017.02.38.jpeg?v=20260523", mediation.alts[2], mediation.captions[2]),
        activityImage("assets/activities/WhatsApp%20Image%202026-05-23%20at%2017.00.30.jpeg?v=20260523", mediation.alts[3], mediation.captions[3]),
        activityImage("assets/activities/WhatsApp%20Image%202026-05-23%20at%2017.00.03.jpeg?v=20260523", mediation.alts[4], mediation.captions[4])
      ]
    },
    {
      id: "school",
      eyebrow: copy.schoolEyebrow,
      title: copy.schoolTitle,
      short: copy.schoolCopy[0],
      paragraphs: copy.schoolCopy,
      cards: copy.schoolCards,
      images: [
        activityImage("assets/activities/school-cineclub-camera.jpg?v=20260523", copy.schoolImageAlt, copy.schoolGalleryCaptions[0]),
        activityImage("assets/activities/school-cineclub-group.jpg?v=20260523", copy.schoolGalleryAlts[1], copy.schoolGalleryCaptions[1]),
        activityImage("assets/activities/school-cineclub-workshop.jpg?v=20260523", copy.schoolGalleryAlts[2], copy.schoolGalleryCaptions[2]),
        activityImage("assets/activities/school-cineclub-mentor.jpg?v=20260523", copy.schoolGalleryAlts[3], copy.schoolGalleryCaptions[3]),
        activityImage("assets/activities/school-cineclub-discussion.jpg?v=20260523", copy.schoolGalleryAlts[4], copy.schoolGalleryCaptions[4]),
        activityImage("assets/activities/school-cineclub-screening.jpg?v=20260523", copy.schoolGalleryAlts[5], copy.schoolGalleryCaptions[5])
      ]
    }
  ];
}

function activityCarouselMarkup(images) {
  const sourceImages = Array.isArray(images) ? images.filter(Boolean) : [];
  if (!sourceImages.length) return "";

  const duration = Math.max(sourceImages.length * 4, 14);
  const trackClass = sourceImages.length > 1 ? "activity-card-track" : "activity-card-track single";

  return `
    <span class="${trackClass}" style="--activity-carousel-duration:${duration}s">
      ${sourceImages.map((image, index) => `
    <img
      class="activity-card-slide"
      src="${escapeHtml(image.src)}"
      alt="${escapeHtml(image.alt)}"
      loading="lazy"
      style="--activity-slide-delay:${index * 4}s"
    >
      `).join("")}
    </span>
  `;
}

function renderActivityCards() {
  const grid = document.getElementById("activityCardGrid");
  if (!grid) return;

  const ui = getActivityUiCopy();
  const activities = getActivityItems();
  setText("#activitiesOverviewEyebrow", ui.overviewEyebrow);
  setText("#activitiesOverviewTitle", ui.overviewTitle);
  setText("#activityBackButton", ui.back);

  grid.innerHTML = activities.map((activity) => `
    <button class="activity-card" type="button" onclick="openActivityDetail('${activity.id}')">
      <span class="activity-card-media" aria-hidden="true">
        ${activityCarouselMarkup(activity.images)}
      </span>
      <span class="activity-card-body">
        <span class="eyebrow">${escapeHtml(activity.eyebrow)}</span>
        <strong>${escapeHtml(activity.title)}</strong>
        <span>${escapeHtml(activity.short)}</span>
        ${activityPartnersMarkup(activity.partners, "card")}
        <em>${escapeHtml(ui.open)}</em>
      </span>
    </button>
  `).join("");

  if (activeActivityId && !document.getElementById("activityDetail").hidden) {
    renderActivityDetail(activeActivityId);
  }
}

function renderActivityDetail(activityId) {
  const activity = getActivityItems().find((item) => item.id === activityId);
  const container = document.getElementById("activityDetailContent");
  if (!activity || !container) return;

  const ui = getActivityUiCopy();
  const primaryImage = activity.images[0];
  const storyParagraphs = activity.paragraphs.slice(1).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
  const partners = activityPartnersMarkup(activity.partners, "detail");
  const cards = activity.cards.map((card) => `
    <article class="activity-detail-point">
      <h3>${escapeHtml(card[0])}</h3>
      <p>${escapeHtml(card[1])}</p>
    </article>
  `).join("");
  const gallery = activity.images.map((image, index) => `
    <figure class="${index === 0 ? "featured" : ""}">
      <img loading="lazy" src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}">
      <figcaption>${escapeHtml(image.caption)}</figcaption>
    </figure>
  `).join("");

  container.innerHTML = `
    <div class="activity-detail-shell">
      <header class="activity-detail-hero">
        <figure class="activity-detail-main-image">
          <img loading="lazy" src="${escapeHtml(primaryImage.src)}" alt="${escapeHtml(primaryImage.alt)}">
          <figcaption>${escapeHtml(primaryImage.caption || activity.title)}</figcaption>
        </figure>
        <div class="activity-detail-heading">
        <p class="eyebrow">${escapeHtml(activity.eyebrow)}</p>
        <h2>${escapeHtml(activity.title)}</h2>
          <p class="activity-detail-lede">${escapeHtml(activity.short)}</p>
      </div>
      </header>
      ${storyParagraphs ? `<div class="activity-detail-copy">${storyParagraphs}</div>` : ""}
      <section class="activity-detail-section">
      <p class="eyebrow">${escapeHtml(ui.keyPoints)}</p>
      <div class="activity-detail-points">${cards}</div>
      </section>
      ${partners ? `
      <section class="activity-detail-section activity-detail-partners">
      <p class="eyebrow">${escapeHtml(ui.partners)}</p>
      ${partners}
      </section>
      ` : ""}
      <section class="activity-detail-section">
      <p class="eyebrow">${escapeHtml(ui.gallery)}</p>
      <div class="activity-detail-gallery">${gallery}</div>
      </section>
    </div>
  `;
}

function openActivityDetail(activityId) {
  const overview = document.getElementById("activitiesOverview");
  const detail = document.getElementById("activityDetail");
  activeActivityId = activityId;
  renderActivityDetail(activityId);
  if (overview) overview.hidden = true;
  if (detail) {
    detail.hidden = false;
    detail.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function closeActivityDetail(shouldScroll = true) {
  const overview = document.getElementById("activitiesOverview");
  const detail = document.getElementById("activityDetail");
  activeActivityId = "";
  if (detail) detail.hidden = true;
  if (overview) {
    overview.hidden = false;
    if (shouldScroll) overview.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function isFirebaseConfigured() {
  return Boolean(
    FIREBASE_CONFIG.apiKey &&
    FIREBASE_CONFIG.authDomain &&
    FIREBASE_CONFIG.projectId &&
    FIREBASE_CONFIG.apiKey !== "YOUR_FIREBASE_API_KEY" &&
    FIREBASE_CONFIG.authDomain !== "YOUR_FIREBASE_AUTH_DOMAIN" &&
    FIREBASE_CONFIG.projectId !== "YOUR_FIREBASE_PROJECT_ID"
  );
}

function isEmailJsConfigured() {
  return Boolean(
    EMAILJS_PUBLIC_KEY &&
    EMAILJS_SERVICE_ID &&
    EMAILJS_TEMPLATE_ID &&
    EMAILJS_PUBLIC_KEY !== "YOUR_EMAILJS_PUBLIC_KEY" &&
    EMAILJS_SERVICE_ID !== "YOUR_EMAILJS_SERVICE_ID" &&
    EMAILJS_TEMPLATE_ID !== "YOUR_EMAILJS_TEMPLATE_ID"
  );
}

function isGoogleSheetsConfigured() {
  return Boolean(
    GOOGLE_SHEETS_WEB_APP_URL &&
    GOOGLE_SHEETS_WEB_APP_URL !== "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL" &&
    /^https:\/\/script\.google\.com\/macros\/s\//.test(GOOGLE_SHEETS_WEB_APP_URL)
  );
}

function getFirebaseServices() {
  if (!isFirebaseConfigured()) return null;
  if (!window.firebase || !window.firebase.initializeApp) return null;

  if (!firebaseServices) {
    const app = window.firebase.apps && window.firebase.apps.length
      ? window.firebase.app()
      : window.firebase.initializeApp(FIREBASE_CONFIG);

    firebaseServices = {
      app,
      auth: app.auth(),
      db: app.firestore()
    };
  }

  return firebaseServices;
}

function getDashboardCopy() {
  return DASHBOARD_TRANSLATIONS[currentLanguage] || DASHBOARD_TRANSLATIONS.fr;
}

function normalizeDashboardEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeDashboardStatus(value) {
  const status = String(value || "").trim().toLowerCase();
  if (!status) return "unknown";
  if (["member", "membre", "approved", "accepted", "accepté", "acceptée"].includes(status)) return "member";
  if (["pending", "en attente", "review", "under review"].includes(status)) return "pending";
  if (["rejected", "refused", "refusé", "refusée"].includes(status)) return "rejected";
  if (["confirmed", "confirmé", "confirmee", "confirmée"].includes(status)) return "confirmed";
  if (["canceled", "cancelled", "annulé", "annulee", "annulée"].includes(status)) return "canceled";
  if (["attended", "present", "presence", "présence", "checked-in", "checked in"].includes(status)) return "attended";
  return status;
}

function getMemberDisplayName(member, user) {
  return member.full_name || member.fullName || (user && user.displayName) || member.email || getDashboardCopy().memberFallback;
}

function mergeMemberProfile(firestoreProfile, sheetsMember, user) {
  const profile = firestoreProfile || {};
  const member = sheetsMember || {};
  return {
    user_id: (user && user.uid) || profile.user_id || "",
    reference_code: member.reference || member.reference_code || profile.reference_code || profile.reference || "",
    full_name: member.full_name || member.fullName || profile.full_name || (user && user.displayName) || "",
    email: normalizeDashboardEmail(member.email || profile.email || (user && user.email) || ""),
    phone: member.phone || profile.phone || "",
    city: member.city || profile.city || "",
    profession: member.profession || profile.profession || "",
    status: normalizeDashboardStatus(member.status || profile.status || "pending")
  };
}

function reservationMatchesHistory(reservation) {
  const status = normalizeDashboardStatus(reservation.status);
  return status === "attended" || status === "canceled";
}

function dashboardReservationCard(reservation) {
  const copy = getDashboardCopy();
  const status = normalizeDashboardStatus(reservation.status);
  const statusLabel = status === "confirmed"
    ? copy.statuses.confirmed
    : status === "pending"
      ? copy.statuses.reservationPending
      : status === "canceled"
        ? copy.statuses.canceled
        : status === "attended"
          ? copy.statuses.attended
          : copy.statuses.unknown;
  const seat = reservation.seat || copy.noSeat;
  const reference = reservation.reference || "-";
  const created = reservation.created_at || reservation.createdAt || "";

  return `
    <article class="dashboard-reservation-card status-${escapeHtml(status)}">
      <div>
        <strong>${escapeHtml(reference)}</strong>
        <span>${escapeHtml(statusLabel)}</span>
      </div>
      <dl>
        <div><dt>${escapeHtml(copy.labels.seat)}</dt><dd>${escapeHtml(seat)}</dd></div>
        <div><dt>${escapeHtml(copy.labels.email)}</dt><dd>${escapeHtml(reservation.email || "-")}</dd></div>
        <div><dt>${escapeHtml(copy.labels.date)}</dt><dd>${escapeHtml(created ? String(created).slice(0, 16) : "-")}</dd></div>
      </dl>
    </article>
  `;
}

function renderReservationList(containerId, reservations, emptyText) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = reservations.length
    ? reservations.map(dashboardReservationCard).join("")
    : `<div class="dashboard-empty">${escapeHtml(emptyText)}</div>`;
}

function renderMemberBenefits() {
  const grid = document.getElementById("memberBenefitGrid");
  if (!grid) return;

  grid.innerHTML = getDashboardCopy().benefits.map((benefit) => `
    <article>
      <span></span>
      <h4>${escapeHtml(benefit[0])}</h4>
      <p>${escapeHtml(benefit[1])}</p>
    </article>
  `).join("");
}

function renderMemberLoggedOut() {
  const loginPanel = document.getElementById("memberLoginPanel");
  const dashboard = document.getElementById("memberDashboard");
  if (loginPanel) loginPanel.hidden = false;
  if (dashboard) dashboard.hidden = true;
  currentMemberProfile = null;
  currentMemberDashboardData = null;
}

function renderMemberDashboard(data) {
  const copy = getDashboardCopy();
  const loginPanel = document.getElementById("memberLoginPanel");
  const dashboard = document.getElementById("memberDashboard");
  if (loginPanel) loginPanel.hidden = true;
  if (dashboard) dashboard.hidden = false;

  const member = data.member || {};
  const reservations = Array.isArray(data.reservations) ? data.reservations : [];
  const activeReservations = reservations.filter((reservation) => !reservationMatchesHistory(reservation));
  const attendedReservations = reservations.filter(reservationMatchesHistory);
  const pendingReservations = activeReservations.filter((reservation) => normalizeDashboardStatus(reservation.status) === "pending");
  const attendedCount = reservations.filter((reservation) => normalizeDashboardStatus(reservation.status) === "attended").length;
  const name = getMemberDisplayName(member, currentMemberUser);
  const status = normalizeDashboardStatus(member.status);
  const statusLabel = status === "member"
    ? copy.statuses.member
    : status === "pending"
      ? copy.statuses.pending
      : status === "rejected"
        ? copy.statuses.rejected
        : copy.statuses.unknown;

  setText("#memberDashboardGreeting", copy.greeting(name));
  setText("#memberDashboardIntro", copy.intro);
  setText("#memberDashboardName", name);
  setText("#memberDashboardStatus", statusLabel);
  setText("#memberDashboardReference", member.reference_code || "-");
  setText("#memberDashboardEmail", member.email || "-");
  setText("#memberDashboardPhone", member.phone || "-");
  setText("#memberDashboardCity", member.city || "-");
  setText("#memberStatActive", String(activeReservations.length));
  setText("#memberStatPending", String(pendingReservations.length));
  setText("#memberStatAttended", String(attendedCount));
  setText("#memberStatPrivileges", String(copy.benefits.length));

  const chip = document.getElementById("memberDashboardStatus");
  if (chip) {
    chip.className = "member-status-chip";
    chip.classList.add(`status-${status}`);
  }

  renderReservationList("memberReservationList", activeReservations, copy.noReservations);
  renderReservationList("memberAttendedList", attendedReservations, copy.noAttended);
  renderMemberBenefits();
}

async function getFirestoreMemberProfile(user) {
  const services = getFirebaseServices();
  if (!services || !user) return null;
  const doc = await services.db.collection("cinemana_members").doc(user.uid).get();
  return doc.exists ? doc.data() : null;
}

async function getSheetsMemberDashboard(profile, user) {
  if (typeof callGoogleSheetsAction !== "function" || !isGoogleSheetsConfigured()) return null;

  try {
    const response = await callGoogleSheetsAction("getMemberDashboard", {
      email: normalizeDashboardEmail((profile && profile.email) || (user && user.email)),
      reference_code: (profile && (profile.reference_code || profile.reference)) || ""
    });
    return response && response.ok ? response : null;
  } catch (error) {
    return null;
  }
}

async function loadMemberDashboard(user, options = {}) {
  if (!user) {
    renderMemberLoggedOut();
    return;
  }

  const copy = getDashboardCopy();
  const message = document.getElementById("memberLoginMessage");
  if (!options.silent) setFormMessage(message, copy.loginLoading);

  try {
    const firestoreProfile = await getFirestoreMemberProfile(user);
    const sheetsDashboard = await getSheetsMemberDashboard(firestoreProfile, user);
    const member = mergeMemberProfile(firestoreProfile, sheetsDashboard && sheetsDashboard.member, user);
    const reservations = sheetsDashboard && Array.isArray(sheetsDashboard.reservations)
      ? sheetsDashboard.reservations
      : [];

    currentMemberProfile = member;
    currentMemberDashboardData = { member, reservations };
    clearMessage("memberLoginMessage");
    renderMemberDashboard(currentMemberDashboardData);
  } catch (error) {
    setFormMessage(message, copy.errors.dashboardUnavailable, "error");
    const fallbackMember = mergeMemberProfile(null, null, user);
    currentMemberProfile = fallbackMember;
    currentMemberDashboardData = { member: fallbackMember, reservations: [] };
    renderMemberDashboard(currentMemberDashboardData);
  }
}

function initializeMemberAuth() {
  const services = getFirebaseServices();
  if (!services || !services.auth) return;

  services.auth.onAuthStateChanged((user) => {
    currentMemberUser = user || null;
    const dashboardPage = document.getElementById("page-dashboard");
    const dashboardIsVisible = window.location.hash.replace("#", "") === "dashboard" ||
      Boolean(dashboardPage && dashboardPage.classList.contains("active"));
    if (user && dashboardIsVisible) {
      loadMemberDashboard(user, { silent: true });
    } else {
      renderMemberLoggedOut();
    }
  });
}

function initializeEmailJs() {
  if (!isEmailJsConfigured()) return false;
  if (!window.emailjs || !window.emailjs.init || !window.emailjs.send) return false;

  if (!emailJsInitialized) {
    window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    emailJsInitialized = true;
  }

  return true;
}

function combineNameParts(firstName, lastName) {
  return [firstName, lastName]
    .map((value) => String(value || "").trim())
    .filter(Boolean)
    .join(" ");
}

function getMemberFormData() {
  const firstName = document.getElementById("memberFirstName").value.trim();
  const lastName = document.getElementById("memberLastName").value.trim();
  return {
    first_name: firstName,
    last_name: lastName,
    full_name: combineNameParts(firstName, lastName),
    birthday: document.getElementById("memberBirthday").value,
    city: document.getElementById("memberCity").value.trim(),
    phone: document.getElementById("memberPhone").value.trim(),
    email: document.getElementById("memberEmail").value.trim(),
    password: document.getElementById("memberPassword").value,
    repeat_password: document.getElementById("memberRepeatPassword").value
  };
}

function validateMemberForm(data) {
  const messages = TRANSLATIONS[currentLanguage].modal.validation;
  const requiredValues = [
    data.first_name,
    data.last_name,
    data.birthday,
    data.city,
    data.phone,
    data.email,
    data.password,
    data.repeat_password
  ];

  if (requiredValues.some((value) => !value)) return messages.required;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return messages.email;

  const birthday = new Date(`${data.birthday}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (Number.isNaN(birthday.getTime()) || birthday >= today) return messages.birthday;

  if (data.password.length < 8) return messages.passwordLength;
  if (data.password !== data.repeat_password) return messages.passwordMatch;

  return "";
}

function generateVerificationCode() {
  const bytes = new Uint32Array(1);
  if (window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(bytes);
    return String(100000 + (bytes[0] % 900000));
  }
  return String(Math.floor(100000 + Math.random() * 900000));
}

function generateReferenceCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(6);
  if (window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(bytes);
  } else {
    bytes.forEach((_, index) => {
      bytes[index] = Math.floor(Math.random() * 256);
    });
  }

  const suffix = Array.from(bytes, (value) => alphabet[value % alphabet.length]).join("");
  return `CIN-${new Date().getFullYear()}-${suffix}`;
}

function getVerificationCode() {
  return document.getElementById("memberVerificationCode").value.trim();
}

function setMemberFieldsDisabled(disabled) {
  [
    "memberFirstName",
    "memberLastName",
    "memberBirthday",
    "memberCity",
    "memberPhone",
    "memberEmail",
    "memberPassword",
    "memberRepeatPassword"
  ].forEach((id) => {
    const input = document.getElementById(id);
    if (input) input.disabled = disabled;
  });
}

function updateMemberSubmitLabel() {
  const copy = TRANSLATIONS[currentLanguage].modal;
  const button = document.querySelector(".member-modal > button");
  if (button) button.textContent = pendingMemberRegistration ? copy.verifyButton : copy.button;
}

function setMemberCompleteMode(active, text = "") {
  const modal = document.querySelector(".member-modal");
  const header = modal ? modal.querySelector(".modal-header") : null;
  const grid = modal ? modal.querySelector(".member-form-grid") : null;
  const verification = document.getElementById("memberVerificationStep");
  const submitButton = modal ? modal.querySelector('button[type="submit"]') : null;
  const message = document.getElementById("memberMessage");
  const complete = document.getElementById("memberComplete");
  const completeText = document.getElementById("memberCompleteText");

  if (header) header.hidden = active;
  if (grid) grid.hidden = active;
  if (verification) verification.hidden = active || !pendingMemberRegistration;
  if (submitButton) submitButton.hidden = active;
  if (message) message.hidden = active;
  if (complete) complete.hidden = !active;
  if (completeText && text) completeText.textContent = text;
}

function showMemberComplete(name) {
  const copy = TRANSLATIONS[currentLanguage].modal;
  setMemberCompleteMode(true, copy.success(name));
  const complete = document.getElementById("memberComplete");
  if (complete) complete.scrollIntoView({ behavior: "smooth", block: "center" });
}

function goMemberHome() {
  closeMemberForm();
  setMemberCompleteMode(false);
  showPage("home");
}

function resetMemberVerification(clearForm = false) {
  pendingMemberRegistration = null;
  setMemberFieldsDisabled(false);

  const step = document.getElementById("memberVerificationStep");
  const codeInput = document.getElementById("memberVerificationCode");
  if (step) step.hidden = true;
  if (codeInput) codeInput.value = "";
  if (clearForm) {
    const form = document.querySelector(".member-modal");
    if (form) form.reset();
  }
  updateMemberSubmitLabel();
}

function showMemberVerificationStep(data, code) {
  pendingMemberRegistration = {
    data,
    code,
    attempts: 0,
    expiresAt: Date.now() + EMAIL_CODE_EXPIRY_MINUTES * 60 * 1000
  };

  setMemberFieldsDisabled(true);

  const step = document.getElementById("memberVerificationStep");
  const codeInput = document.getElementById("memberVerificationCode");
  if (step) step.hidden = false;
  if (codeInput) {
    codeInput.value = "";
    codeInput.focus();
  }
  updateMemberSubmitLabel();
}

async function sendMemberVerificationCode(data, code) {
  const copy = TRANSLATIONS[currentLanguage].modal;
  const email = data.email.trim();
  const templateParams = {
    to_email: email,
    email,
    user_email: email,
    reply_to: email,
    to_name: data.full_name,
    name: data.full_name,
    user_name: data.full_name,
    from_name: data.full_name,
    verification_code: code,
    code,
    expiry_minutes: EMAIL_CODE_EXPIRY_MINUTES,
    site_name: "CINEMANA"
  };

  try {
    await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
    return "";
  } catch (error) {
    const errorText = error && error.text ? error.text : "";
    if (/recipient|recipients address is empty/i.test(errorText)) {
      return copy.validation.emailRecipientMissing;
    }
    return errorText || copy.validation.emailSendFailed;
  }
}

async function createFirebaseMemberAccount(data, referenceCode) {
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
    email: data.email,
    email_verified_by_code: true,
    google_sheet_sync_requested: true,
    status: "pending",
    created_at: window.firebase.firestore.FieldValue.serverTimestamp(),
    updated_at: window.firebase.firestore.FieldValue.serverTimestamp()
  });

  return user;
}

async function sendMemberToGoogleSheets(data, user, referenceCode) {
  const payload = {
    reference_code: referenceCode,
    user_id: user.uid,
    first_name: data.first_name,
    last_name: data.last_name,
    full_name: data.full_name,
    birthday: data.birthday,
    city: data.city,
    phone: data.phone,
    email: data.email,
    status: "pending",
    source: "cinemana-website",
    created_at: new Date().toISOString()
  };

  const body = new URLSearchParams({
    payload: JSON.stringify(payload)
  });

  await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    body
  });
}

function setLanguage(language) {
  const copy = TRANSLATIONS[language] || TRANSLATIONS.fr;
  currentLanguage = copy.lang;
  localStorage.setItem("cinemana-language", currentLanguage);

  document.documentElement.lang = copy.lang;
  document.documentElement.dir = copy.dir;
  document.title = copy.metaTitle;
  setAttr('meta[name="description"]', "content", copy.metaDescription);
  setAttr(".site-nav", "aria-label", copy.lang === "ar" ? "التنقل الرئيسي" : copy.lang === "en" ? "Main navigation" : "Navigation principale");
  setAttr(".menu-toggle", "aria-label", copy.menuLabel);
  setAttr(".lang-switcher", "aria-label", copy.langLabel);

  document.querySelectorAll(".lang-switcher button").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === currentLanguage);
  });

  PAGES.forEach((page) => setText(`#nav-${page}`, copy.nav[page]));

  setAttr(".brand-logo", "alt", copy.home.logoLabel);
  setAttr(".hero-logo", "alt", copy.home.logoLabel);
  setAttr(".hero-image", "alt", copy.home.heroAlt);
  setAttr(".animated-logo", "aria-label", copy.home.logoLabel);
  setText("#page-home .hero-content .eyebrow", copy.home.eyebrow);
  setText("#page-home .hero-content h1", copy.home.title);
  setText("#page-home .hero-copy", copy.home.copy);
  setText("#page-home .hero-actions .primary", copy.home.missionButton);
  setText("#page-home .hero-actions .secondary", copy.home.memberButton);
  setAttr("#page-home .metrics-band", "aria-label", copy.home.metricsLabel);
  copy.home.metrics.forEach((metric, index) => {
    const selector = `#page-home .metrics-band > div:nth-child(${index + 1})`;
    setText(`${selector} strong`, metric[0]);
    setText(`${selector} span`, metric[1]);
  });
  setText("#page-home .intro-grid .eyebrow", copy.home.introEyebrow);
  setText("#page-home .intro-grid > div:first-child > p:not(.eyebrow)", copy.home.introCopy);
  setText("#page-home .intro-grid h2", copy.home.introTitle);
  setText("#page-home .inline-actions .primary", copy.home.reserveButton);
  setText("#page-home .inline-actions .ghost", copy.home.supportButton);
  setAttr(".photo-stack", "aria-label", copy.home.photosLabel);
  copy.home.photoAlts.forEach((alt, index) => setAttr(`.photo-stack figure:nth-child(${index + 1}) img`, "alt", alt));
  copy.home.captions.forEach((caption, index) => setText(`.photo-stack figure:nth-child(${index + 1}) figcaption`, caption));

  setText("#page-missions .page-hero .eyebrow", copy.missions.eyebrow);
  setText("#page-missions .page-hero h1", copy.missions.title);
  setText("#page-missions .split h2", copy.missions.heading);
  setText("#page-missions .split > div:first-child p:nth-of-type(1)", copy.missions.p1);
  setText("#page-missions .split > div:first-child p:nth-of-type(2)", copy.missions.p2);
  setText("#page-missions .quote-panel p", copy.missions.quote);
  setCardTexts("#page-missions .mission-grid", copy.missions.cards);

  setText("#page-bureau .page-hero .eyebrow", copy.bureau.eyebrow);
  setText("#page-bureau .page-hero h1", copy.bureau.title);
  setText("#page-bureau .bureau-layout > div:nth-child(1) .eyebrow", copy.bureau.executive);
  setText("#page-bureau .bureau-layout > div:nth-child(2) .eyebrow", copy.bureau.committees);
  copy.bureau.roles.forEach((role, index) => setText(`#page-bureau .people-list article:nth-child(${index + 1}) span`, role));
  copy.bureau.committeeRoles.forEach((role, index) => setText(`#page-bureau .committee-grid article:nth-child(${index + 1}) span`, role));

  setText("#page-activities .page-hero .eyebrow", copy.activities.eyebrow);
  setText("#page-activities .page-hero h1", copy.activities.title);
  setAttr("#page-activities .activity-feature img", "alt", copy.activities.imageAlt);
  setText("#page-activities .activity-feature .eyebrow", copy.activities.featureEyebrow);
  setText("#page-activities .activity-feature h2", copy.activities.featureTitle);
  document.querySelectorAll("#page-activities .festival-copy p").forEach((paragraph, index) => {
    paragraph.textContent = copy.activities.featureCopy[index] || "";
  });
  setCardTexts("#page-activities .cards-grid", copy.activities.cards);
  setAttr("#page-activities .festival-gallery", "aria-label", copy.activities.galleryLabel);
  copy.activities.galleryCaptions.forEach((caption, index) => {
    const selector = `#page-activities .festival-gallery figure:nth-child(${index + 1})`;
    setText(`${selector} figcaption`, caption);
    setAttr(`${selector} img`, "alt", copy.activities.galleryAlts[index]);
  });
  setAttr("#page-activities .monthly-feature img", "alt", copy.activities.monthlyImageAlt);
  setText("#page-activities .monthly-feature .eyebrow", copy.activities.monthlyEyebrow);
  setText("#page-activities .monthly-feature h2", copy.activities.monthlyTitle);
  document.querySelectorAll("#page-activities .monthly-copy p").forEach((paragraph, index) => {
    paragraph.textContent = copy.activities.monthlyCopy[index] || "";
  });
  setCardTexts("#page-activities .monthly-cards", copy.activities.monthlyCards);
  setAttr("#page-activities .monthly-gallery", "aria-label", copy.activities.monthlyGalleryLabel);
  copy.activities.monthlyGalleryCaptions.forEach((caption, index) => {
    const selector = `#page-activities .monthly-gallery figure:nth-child(${index + 1})`;
    setText(`${selector} figcaption`, caption);
    setAttr(`${selector} img`, "alt", copy.activities.monthlyGalleryAlts[index]);
  });
  setAttr("#page-activities .training-feature img", "alt", copy.activities.trainingImageAlt);
  setText("#page-activities .training-feature .eyebrow", copy.activities.trainingEyebrow);
  setText("#page-activities .training-feature h2", copy.activities.trainingTitle);
  document.querySelectorAll("#page-activities .training-copy p").forEach((paragraph, index) => {
    paragraph.textContent = copy.activities.trainingCopy[index] || "";
  });
  setCardTexts("#page-activities .training-cards", copy.activities.trainingCards);
  setAttr("#page-activities .school-feature img", "alt", copy.activities.schoolImageAlt);
  setText("#page-activities .school-feature .eyebrow", copy.activities.schoolEyebrow);
  setText("#page-activities .school-feature h2", copy.activities.schoolTitle);
  document.querySelectorAll("#page-activities .school-copy p").forEach((paragraph, index) => {
    paragraph.textContent = copy.activities.schoolCopy[index] || "";
  });
  setCardTexts("#page-activities .school-cards", copy.activities.schoolCards);
  setAttr("#page-activities .school-gallery", "aria-label", copy.activities.schoolGalleryLabel);
  copy.activities.schoolGalleryCaptions.forEach((caption, index) => {
    const selector = `#page-activities .school-gallery figure:nth-child(${index + 1})`;
    setText(`${selector} figcaption`, caption);
    setAttr(`${selector} img`, "alt", copy.activities.schoolGalleryAlts[index]);
  });
  renderActivityCards();

  setText("#page-membership .page-hero .eyebrow", copy.membership.eyebrow);
  setText("#page-membership .page-hero h1", copy.membership.title);
  setText("#page-membership .page-hero p:not(.eyebrow)", copy.membership.copy);
  copy.membership.benefits.forEach((benefit, index) => {
    const selector = `#page-membership .benefits-list article:nth-child(${index + 1})`;
    setText(`${selector} h2`, benefit[0]);
    setText(`${selector} p`, benefit[1]);
  });
  setText("#page-membership .closing-cta h2", copy.membership.ctaTitle);
  setText("#page-membership .closing-cta p", copy.membership.ctaCopy);
  setText("#page-membership .closing-cta button", copy.membership.ctaButton);

  setText("#page-partner .page-hero .eyebrow", copy.partner.eyebrow);
  setText("#page-partner .page-hero h1", copy.partner.title);
  setText("#page-partner .partner-layout h2", copy.partner.heading);
  setText("#page-partner .partner-layout > div:first-child p:nth-of-type(1)", copy.partner.copy);
  setText("#page-partner .partner-layout > div:first-child p:nth-of-type(2)", copy.partner.copy2);
  setText("#page-partner .partner-close p", copy.partner.close);
  setCardTexts("#page-partner .partner-benefits", copy.partner.cards);

  setText("#page-reservation .page-hero .eyebrow", copy.reservation.eyebrow);
  setText("#page-reservation .page-hero h1", copy.reservation.title);
  setText("#page-reservation .reservation-layout h2", copy.reservation.heading);
  setText("#page-reservation .reservation-layout > div:first-child p:not(.note)", copy.reservation.copy);
  setText("#page-reservation .reservation-layout .note", copy.reservation.note);
  setText("#page-reservation .quote-panel p", copy.reservation.quote);
  setText("#page-reservation .reservation-card:nth-child(1) .eyebrow", copy.reservation.member.eyebrow);
  setText("#page-reservation .reservation-card:nth-child(1) h2", copy.reservation.member.title);
  setListTexts("#page-reservation .reservation-card:nth-child(1) .flow-steps li", copy.reservation.member.steps);
  setLabel("memberCode", copy.reservation.member.labels.code);
  setLabel("memberTel", copy.reservation.member.labels.phone);
  setLabel("memberSeat", copy.reservation.member.labels.seat);
  setOption('#memberSeat option[value=""]', copy.reservation.member.emptySeat);
  setText("#memberReservationForm button", copy.reservation.member.button);
  setText("#page-reservation .reservation-card:nth-child(2) .eyebrow", copy.reservation.public.eyebrow);
  setText("#page-reservation .reservation-card:nth-child(2) h2", copy.reservation.public.title);
  setListTexts("#page-reservation .reservation-card:nth-child(2) .flow-steps li", copy.reservation.public.steps);
  setLabel("publicFirstName", copy.reservation.public.labels.firstName);
  setLabel("publicLastName", copy.reservation.public.labels.lastName);
  setLabel("publicWhatsapp", copy.reservation.public.labels.whatsapp);
  setLabel("publicAge", copy.reservation.public.labels.age);
  setLabel("publicRole", copy.reservation.public.labels.role);
  setLabel("publicSource", copy.reservation.public.labels.source);
  setText("#publicReservationForm button", copy.reservation.public.button);

  setText("#page-press .page-hero .eyebrow", copy.press.eyebrow);
  setText("#page-press .page-hero h1", copy.press.title);
  setText("#globalSocialEyebrow", copy.press.socialEyebrow);
  setText("#globalSocialTitle", copy.press.socialTitle);
  setText("#globalContactEyebrow", copy.press.contactEyebrow);
  setCardTexts("#page-press .cards-grid", copy.press.cards);

  setText("#page-partners .page-hero .eyebrow", copy.partners.eyebrow);
  setText("#page-partners .page-hero h1", copy.partners.title);
  setText("#partnersFestivalEyebrow", copy.partners.festivalEyebrow);
  setText("#partnersFestivalTitle", copy.partners.festivalTitle);
  setText("#partnersFestivalCopy", copy.partners.festivalCopy);
  (copy.partners.festivalPlaceholders || []).forEach((label, index) => {
    setText(`#partnersFestivalPlaceholder${index + 1}`, label);
  });
  setText("#partnersResidencyEyebrow", copy.partners.residencyEyebrow);
  setText("#partnersResidencyTitle", copy.partners.residencyTitle);
  setText("#partnersResidencyCopy", copy.partners.residencyCopy);
  setText("#partnersSinEyebrow", copy.partners.sinEyebrow);
  setText("#partnersSinTitle", copy.partners.sinTitle);
  setText("#partnersSinCopy", copy.partners.sinCopy);
  setText("#partnersSinMinistry", copy.partners.sinMinistry);
  setText("#partnersSinFnccm", copy.partners.sinFnccm);
  setText("#partnersSinCad", copy.partners.sinCad);

  setText(".site-footer > div:nth-child(1) p", copy.footer.copy);
  setText(".site-footer > div:nth-child(2) span", copy.footer.sitemap);
  setText(".site-footer > div:nth-child(3) span", copy.footer.foundation);
  setText(".site-footer > div:nth-child(2) a:nth-of-type(1)", copy.footer.links[0]);
  setText(".site-footer > div:nth-child(2) a:nth-of-type(2)", copy.footer.links[1]);
  setText(".site-footer > div:nth-child(2) a:nth-of-type(3)", copy.footer.links[2]);
  setText(".site-footer > div:nth-child(2) a:nth-of-type(4)", copy.nav.dashboard);
  setText(".site-footer > div:nth-child(3) a:nth-of-type(1)", copy.footer.links[3]);
  setText(".site-footer > div:nth-child(3) a:nth-of-type(2)", copy.footer.links[4]);
  setText(".site-footer > div:nth-child(3) a:nth-of-type(3)", copy.footer.links[5]);

  setText(".member-modal .modal-header .eyebrow", copy.modal.eyebrow);
  setText(".member-modal .modal-header h2", copy.modal.title);
  setAttr(".member-modal .modal-header button", "aria-label", copy.modal.close);
  setLabel("memberFirstName", copy.modal.labels.firstName);
  setLabel("memberLastName", copy.modal.labels.lastName);
  setLabel("memberBirthday", copy.modal.labels.birthday);
  setLabel("memberCity", copy.modal.labels.city);
  setLabel("memberPhone", copy.modal.labels.phone);
  setLabel("memberEmail", copy.modal.labels.email);
  setLabel("memberPassword", copy.modal.labels.password);
  setLabel("memberRepeatPassword", copy.modal.labels.repeatPassword);
  setLabel("memberVerificationCode", copy.modal.labels.verificationCode);
  setText("#memberVerificationHelp", copy.modal.verificationHelp);
  setText("#memberCompleteEyebrow", copy.modal.eyebrow);
  setText("#memberCompleteTitle", copy.modal.completeTitle || copy.modal.title);
  setText("#memberCompleteHome", copy.modal.completeHome || copy.nav.home);

  const dashboardCopy = getDashboardCopy();
  setText("#dashboardHeroEyebrow", dashboardCopy.heroEyebrow);
  setText("#dashboardHeroTitle", dashboardCopy.heroTitle);
  setText("#memberLoginEyebrow", dashboardCopy.loginEyebrow);
  setText("#memberLoginTitle", dashboardCopy.loginTitle);
  setText("#memberLoginCopy", dashboardCopy.loginCopy);
  setText("#memberLoginEmailLabel", dashboardCopy.labels.email);
  setText("#memberLoginPasswordLabel", dashboardCopy.labels.password);
  setText("#memberLoginButton", dashboardCopy.loginButton);
  setText("#dashboardAccessEyebrow", dashboardCopy.accessEyebrow);
  setText("#dashboardAccessTitle", dashboardCopy.accessTitle);
  dashboardCopy.accessItems.forEach((item, index) => setText(`#dashboardAccessItem${index + 1}`, item));
  setText("#memberDashboardEyebrow", dashboardCopy.heroEyebrow);
  setText("#memberDashboardRefresh", dashboardCopy.refresh);
  setText("#memberDashboardLogout", dashboardCopy.logout);
  setText("#memberDashboardReferenceLabel", dashboardCopy.labels.reference);
  setText("#memberDashboardEmailLabel", dashboardCopy.labels.email);
  setText("#memberDashboardPhoneLabel", dashboardCopy.labels.phone);
  setText("#memberDashboardCityLabel", dashboardCopy.labels.city);
  setText("#memberDashboardPriorityEyebrow", dashboardCopy.priorityEyebrow);
  setText("#memberDashboardPriorityTitle", dashboardCopy.priorityTitle);
  setText("#memberDashboardPriorityText", dashboardCopy.priorityText);
  setText("#memberDashboardReserveButton", dashboardCopy.reserveButton);
  setText("#memberStatActiveLabel", dashboardCopy.stats.active);
  setText("#memberStatPendingLabel", dashboardCopy.stats.pending);
  setText("#memberStatAttendedLabel", dashboardCopy.stats.attended);
  setText("#memberStatPrivilegesLabel", dashboardCopy.stats.privileges);
  setText("#memberReservationsEyebrow", dashboardCopy.reservationsEyebrow);
  setText("#memberReservationsTitle", dashboardCopy.reservationsTitle);
  setText("#memberAttendedEyebrow", dashboardCopy.attendedEyebrow);
  setText("#memberAttendedTitle", dashboardCopy.attendedTitle);
  setText("#memberBenefitsEyebrow", dashboardCopy.benefitsEyebrow);
  setText("#memberBenefitsTitle", dashboardCopy.benefitsTitle);
  if (currentMemberDashboardData) renderMemberDashboard(currentMemberDashboardData);

  updateMemberSubmitLabel();

  clearMessage("memberReservationMessage");
  clearMessage("publicReservationMessage");
  clearMessage("memberMessage");
}

function updateGlobalConnectPlacement(target) {
  const connect = document.getElementById("globalConnect");
  if (!connect) return;

  const shouldHide = CONNECT_HIDDEN_PAGES.has(target);
  connect.hidden = shouldHide;
  document.body.dataset.page = target;
  if (shouldHide) return;

  const page = document.getElementById(`page-${target}`);
  if (!page) return;

  if (target === "partners") {
    page.appendChild(connect);
    return;
  }

  const anchor = target === "home"
    ? page.querySelector(".hero")
    : page.querySelector(".page-hero");

  if (anchor && anchor.parentElement === page) {
    anchor.insertAdjacentElement("afterend", connect);
    return;
  }

  page.appendChild(connect);
}

function showPage(name, pushState = true) {
  const target = PAGES.includes(name) ? name : "home";

  if (target === "activities" && pushState) closeActivityDetail(false);

  document.querySelectorAll(".page").forEach((page) => {
    page.classList.toggle("active", page.id === `page-${target}`);
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.toggle("active", link.id === `nav-${target}`);
  });

  updateGlobalConnectPlacement(target);

  const navLinks = document.getElementById("navLinks");
  if (navLinks) navLinks.classList.remove("open");

  window.scrollTo(0, 0);

  if (pushState) {
    history.pushState({ page: target }, "", `#${target}`);
  }

  if (target === "dashboard") {
    if (currentMemberUser) {
      loadMemberDashboard(currentMemberUser, { silent: true });
    } else {
      renderMemberLoggedOut();
    }
  }
}

function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("open");
}

function openMemberForm() {
  setMemberCompleteMode(false);
  document.getElementById("memberModal").classList.add("open");
  clearMessage("memberMessage");
}

function closeMemberForm() {
  document.getElementById("memberModal").classList.remove("open");
}

function closeMemberModalOutside(event) {
  if (event.target.id === "memberModal") {
    closeMemberForm();
  }
}

async function submitMemberLogin(event) {
  event.preventDefault();
  const copy = getDashboardCopy();
  const form = event.currentTarget;
  const email = normalizeDashboardEmail(document.getElementById("memberLoginEmail").value);
  const password = document.getElementById("memberLoginPassword").value;
  const message = document.getElementById("memberLoginMessage");
  const button = form.querySelector('button[type="submit"]');

  if (!email || !password) {
    setFormMessage(message, copy.errors.required, "error");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setFormMessage(message, copy.errors.email, "error");
    return;
  }

  const services = getFirebaseServices();
  if (!services) {
    setFormMessage(message, copy.errors.firebaseMissing, "error");
    return;
  }

  setFormMessage(message, copy.loginLoading);
  if (button) button.disabled = true;

  try {
    const credential = await services.auth.signInWithEmailAndPassword(email, password);
    currentMemberUser = credential.user;
    await loadMemberDashboard(credential.user);
    form.reset();
  } catch (error) {
    const code = error && error.code ? error.code : "";
    const invalid = ["auth/user-not-found", "auth/wrong-password", "auth/invalid-credential", "auth/invalid-email"].includes(code);
    setFormMessage(message, invalid ? copy.errors.invalidLogin : (error.message || copy.errors.generic), "error");
  } finally {
    if (button) button.disabled = false;
  }
}

async function refreshMemberDashboard() {
  if (!currentMemberUser) {
    renderMemberLoggedOut();
    return;
  }
  await loadMemberDashboard(currentMemberUser);
}

async function logoutMember() {
  const services = getFirebaseServices();
  if (services && services.auth) await services.auth.signOut();
  currentMemberUser = null;
  renderMemberLoggedOut();
  showPage("dashboard");
}

async function submitMember(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.getElementById("memberMessage");
  const submitButton = form.querySelector('button[type="submit"]');
  const copy = TRANSLATIONS[currentLanguage].modal;

  if (pendingMemberRegistration) {
    const code = getVerificationCode();
    const pending = pendingMemberRegistration;

    if (!code) {
      setFormMessage(message, copy.validation.codeRequired, "error");
      return;
    }

    if (Date.now() > pending.expiresAt) {
      resetMemberVerification();
      setFormMessage(message, copy.validation.codeExpired, "error");
      return;
    }

    if (code !== pending.code) {
      pending.attempts += 1;
      if (pending.attempts >= 5) {
        resetMemberVerification();
        setFormMessage(message, copy.validation.tooManyAttempts, "error");
        return;
      }
      setFormMessage(message, copy.validation.codeMismatch, "error");
      return;
    }

    const services = getFirebaseServices();
    if (!services) {
      setFormMessage(message, isFirebaseConfigured() ? copy.validation.firebaseSdkMissing : copy.validation.firebaseMissing, "error");
      return;
    }

    setFormMessage(message, copy.loadingCreate);
    if (submitButton) submitButton.disabled = true;

    try {
      const referenceCode = generateReferenceCode();
      const user = await createFirebaseMemberAccount(pending.data, referenceCode);
      try {
        await sendMemberToGoogleSheets(pending.data, user, referenceCode);
      } catch (syncError) {
        setFormMessage(message, copy.validation.sheetsSyncFailed, "error");
        return;
      }
      resetMemberVerification();
      form.reset();
      showMemberComplete(pending.data.full_name);
    } catch (error) {
      const isExistingAccount = error && error.code === "auth/email-already-in-use";
      setFormMessage(message, isExistingAccount ? copy.validation.accountExists : (error.message || copy.validation.generic), "error");
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
    return;
  }

  const data = getMemberFormData();
  const validationError = validateMemberForm(data);

  if (validationError) {
    setFormMessage(message, validationError, "error");
    return;
  }

  const services = getFirebaseServices();
  if (!services) {
    setFormMessage(message, isFirebaseConfigured() ? copy.validation.firebaseSdkMissing : copy.validation.firebaseMissing, "error");
    return;
  }

  if (!initializeEmailJs()) {
    setFormMessage(message, isEmailJsConfigured() ? copy.validation.emailSdkMissing : copy.validation.emailServiceMissing, "error");
    return;
  }

  if (!isGoogleSheetsConfigured()) {
    setFormMessage(message, copy.validation.sheetsMissing, "error");
    return;
  }

  const code = generateVerificationCode();
  setFormMessage(message, copy.loadingCode);
  if (submitButton) submitButton.disabled = true;

  try {
    const emailError = await sendMemberVerificationCode(data, code);
    if (emailError) {
      setFormMessage(message, emailError || copy.validation.emailSendFailed, "error");
      return;
    }

    showMemberVerificationStep(data, code);
    setFormMessage(message, copy.codeSent(data.email), "success");
  } catch (error) {
    setFormMessage(message, error.message || copy.validation.emailSendFailed, "error");
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
}

function submitMemberReservation(event) {
  event.preventDefault();
  const code = document.getElementById("memberCode").value.trim();
  const seatInput = document.getElementById("memberSeat");
  const seat = seatInput ? seatInput.value : "";
  const message = document.getElementById("memberReservationMessage");
  const number = Math.floor(1000 + Math.random() * 9000);

  message.textContent = TRANSLATIONS[currentLanguage].reservation.member.message(code, seat, number);
  event.currentTarget.reset();
}

function submitPublicReservation(event) {
  event.preventDefault();
  const name = combineNameParts(
    document.getElementById("publicFirstName").value,
    document.getElementById("publicLastName").value
  );
  const message = document.getElementById("publicReservationMessage");
  const number = Math.floor(1000 + Math.random() * 9000);
  const seats = ["B4", "C7", "D9", "E5", "F8"];
  const seat = seats[number % seats.length];

  message.textContent = TRANSLATIONS[currentLanguage].reservation.public.message(name, seat, `TKT-${number}`);
  event.currentTarget.reset();
}

window.addEventListener("popstate", (event) => {
  showPage(event.state ? event.state.page : "home", false);
});

window.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash.replace("#", "");
  const start = PAGES.includes(hash) ? hash : "home";
  const savedLanguage = localStorage.getItem("cinemana-language");
  const startLanguage = TRANSLATIONS[savedLanguage] ? savedLanguage : "fr";

  history.replaceState({ page: start }, "", `#${start}`);
  showPage(start, false);
  setLanguage(startLanguage);
  initializeMemberAuth();
});

