const PAGES = [
  "home",
  "missions",
  "bureau",
  "activities",
  "membership",
  "partner",
  "reservation",
  "press",
  "partners"
];

const SUPABASE_URL = "https://tekmnebcmhsjnyjeofai.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_aDEon2SP9AJNDxkdyl4gzA_ploHAUVV";
// Optional: set this to your live site URL after adding it in Supabase Auth redirect URLs.
const SUPABASE_EMAIL_REDIRECT_TO = "https://ayoubxgenz.github.io/cinemana/";

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
      membership: "Pourquoi devenir membre",
      partner: "Devenir partenaire",
      reservation: "Réservation",
      press: "Presse",
      partners: "Partenaires"
    },
    home: {
      heroAlt: "Caméra de cinéma sur un plateau de tournage",
      logoLabel: "Logo CINEMANA animé",
      eyebrow: "Fondation culturelle à but non lucratif",
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
        "Salle de cinéma avec fauteuils rouges",
        "Public dans une salle obscure",
        "Caméra et équipe de tournage"
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
      title: "Des rendez-vous réguliers pour faire circuler les films, les idées et les talents.",
      imageAlt: "Entrée lumineuse d’un cinéma",
      featureEyebrow: "Temps fort",
      featureTitle: "Festival International du Film de Tanger",
      featureCopy: "Sélection de longs et courts métrages, avant-premières, hommages, cérémonies, espace VIP, rencontres professionnelles et échanges avec le public.",
      cards: [
        ["Projections mensuelles", "Séances régulières à Tanger dans des salles partenaires, avec réservation préalable pour les membres et le public."],
        ["Rencontres et débats", "Échanges inédits avec des stars, réalisateurs, techniciens, auteurs et acteurs de la scène cinématographique marocaine."],
        ["Cinéclubs scolaires", "Accompagnement des établissements, formation du regard critique et introduction au langage cinématographique."],
        ["Ateliers et formations", "Réalisation, montage, écriture de scénario, gestion de projet culturel et métiers du cinéma."]
      ]
    },
    membership: {
      eyebrow: "Carte CINEMANA",
      title: "Pourquoi devenir membre",
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
        eyebrow: "Membre",
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
        eyebrow: "Particulier",
        title: "Demande de réservation",
        steps: ["Remplir le formulaire.", "Attendre la validation.", "Recevoir la confirmation.", "Recevoir le ticket avec numéro de place."],
        labels: {
          name: "Nom complet",
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
      logos: ["Institutions culturelles", "Salles partenaires", "Écoles et cinéclubs", "Médias", "Professionnels du cinéma", "Partenaires internationaux"]
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
        birthday: "Date de naissance",
        city: "Ville",
        phone: "Téléphone",
        email: "E-mail",
        password: "Mot de passe",
        repeatPassword: "Répéter le mot de passe"
      },
      button: "Envoyer ma demande",
      loading: "Création de votre compte CINEMANA...",
      success: (name) => `Merci ${name}. Votre compte CINEMANA est créé. Vérifiez votre e-mail pour confirmer votre inscription.`,
      validation: {
        required: "Veuillez remplir tous les champs du formulaire.",
        birthday: "Veuillez entrer une date de naissance valide dans le passé.",
        passwordLength: "Le mot de passe doit contenir au moins 8 caractères.",
        passwordMatch: "Les deux mots de passe ne correspondent pas.",
        configMissing: "Configuration Supabase manquante. Remplacez YOUR_SUPABASE_URL et YOUR_SUPABASE_ANON_KEY dans script.js.",
        supabaseMissing: "Le client Supabase n’est pas chargé. Vérifiez votre connexion ou le lien CDN.",
        accountExists: "Ce compte existe peut-être déjà. Essayez un autre e-mail ou vérifiez Authentication > Users dans Supabase.",
        generic: "Impossible de créer le compte pour le moment. Veuillez réessayer."
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
      membership: "Why become a member",
      partner: "Become a partner",
      reservation: "Reservation",
      press: "Press",
      partners: "Partners"
    },
    home: {
      heroAlt: "Cinema camera on a film set",
      logoLabel: "Animated CINEMANA logo",
      eyebrow: "Non-profit cultural foundation",
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
        "Cinema hall with red seats",
        "Audience in a dark movie theater",
        "Camera and film crew"
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
      title: "Regular events to circulate films, ideas and talent.",
      imageAlt: "Bright entrance of a cinema",
      featureEyebrow: "Highlight",
      featureTitle: "Tangier International Film Festival",
      featureCopy: "Feature and short film selections, premieres, tributes, ceremonies, VIP area, professional meetings and public discussions.",
      cards: [
        ["Monthly screenings", "Regular screenings in partner cinemas in Tangier, with prior reservation for members and the public."],
        ["Meetings and debates", "Unique exchanges with stars, directors, technicians, writers and key voices in Moroccan cinema."],
        ["School film clubs", "Support for schools, critical-viewing education and introduction to cinematic language."],
        ["Workshops and training", "Directing, editing, screenwriting, cultural project management and cinema professions."]
      ]
    },
    membership: {
      eyebrow: "CINEMANA card",
      title: "Why become a member",
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
        eyebrow: "Member",
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
        eyebrow: "Individual",
        title: "Reservation request",
        steps: ["Fill in the form.", "Wait for validation.", "Receive confirmation.", "Receive the ticket with seat number."],
        labels: {
          name: "Full name",
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
      logos: ["Cultural institutions", "Partner cinemas", "Schools and film clubs", "Media", "Cinema professionals", "International partners"]
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
        birthday: "Date of birth",
        city: "City",
        phone: "Phone number",
        email: "E-mail",
        password: "Password",
        repeatPassword: "Repeat password"
      },
      button: "Send my request",
      loading: "Creating your CINEMANA account...",
      success: (name) => `Thank you ${name}. Your CINEMANA account has been created. Check your e-mail to confirm your registration.`,
      validation: {
        required: "Please fill in every field in the form.",
        birthday: "Please enter a valid date of birth in the past.",
        passwordLength: "The password must contain at least 8 characters.",
        passwordMatch: "The two passwords do not match.",
        configMissing: "Supabase configuration is missing. Replace YOUR_SUPABASE_URL and YOUR_SUPABASE_ANON_KEY in script.js.",
        supabaseMissing: "The Supabase client is not loaded. Check your connection or CDN link.",
        accountExists: "This account may already exist. Try another e-mail or check Authentication > Users in Supabase.",
        generic: "Unable to create the account right now. Please try again."
      }
    }
  },
  ar: {
    lang: "ar",
    dir: "rtl",
    metaTitle: "مؤسسة سينيمانا | السينما والثقافة في طنجة",
    metaDescription: "مؤسسة سينيمانا مؤسسة ثقافية غير ربحية مكرسة للسينما والنوادي السينمائية والتكوينات والمهرجان الدولي للفيلم بطنجة.",
    langLabel: "اختيار اللغة",
    menuLabel: "فتح القائمة",
    nav: {
      home: "الرئيسية",
      missions: "المهام",
      bureau: "المكتب واللجان",
      activities: "الأنشطة",
      membership: "لماذا تصبح عضوا",
      partner: "كن شريكا",
      reservation: "الحجز",
      press: "الصحافة",
      partners: "الشركاء"
    },
    home: {
      heroAlt: "كاميرا سينمائية في موقع تصوير",
      logoLabel: "شعار سينيمانا المتحرك",
      eyebrow: "مؤسسة ثقافية غير ربحية",
      title: "السينما تجربة نعيشها ونتقاسمها وننقلها من طنجة.",
      copy: "تجمع مؤسسة سينيمانا عشاق السينما حول المهرجان الدولي للفيلم بطنجة، والعروض الشهرية، والنوادي السينمائية المدرسية، والتكوينات، واللقاءات مع الفنانين.",
      missionButton: "اكتشف مهامنا",
      memberButton: "تعرف على بطاقة سينيمانا",
      metricsLabel: "معطيات سينيمانا",
      metrics: [
        ["+15", "عرضا سينمائيا بالحجز المسبق"],
        ["طنجة", "امتداد محلي وإشعاع وطني"],
        ["المهرجان", "افتتاح واختتام ولقاءات مهنية"],
        ["الأندية السينمائية", "تربية بصرية موجهة للشباب"]
      ],
      introEyebrow: "الرئيسية",
      introTitle: "دينامية ثقافية مفتوحة للجميع.",
      introCopy: "تدافع سينيمانا عن مقاربة حية للسينما: اكتشاف الأعمال، لقاء صانعيها، تكوين مواهب الغد، ودعم تداول الأفلام المغربية.",
      reserveButton: "احجز مقعدا",
      supportButton: "ادعم المؤسسة",
      photosLabel: "صور سينيمانا",
      photoAlts: [
        "قاعة سينما بمقاعد حمراء",
        "جمهور داخل قاعة سينمائية مظلمة",
        "كاميرا وفريق تصوير"
      ],
      captions: ["العروض", "اللقاءات", "التكوينات"]
    },
    missions: {
      eyebrow: "المهام",
      title: "النهوض بالسينما، تكوين الجمهور، وتقوية الجسور الثقافية.",
      heading: "مؤسسة سينيمانا",
      p1: "مؤسسة سينيمانا مؤسسة ثقافية غير ربحية مكرسة للنهوض بالسينما والثقافة، تنشط في طنجة وعلى المستوى الوطني عبر الجامعة الوطنية للأندية السينمائية.",
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
      title: "فريق ملتزم بحمل مشاريع سينيمانا إلى الأمام.",
      executive: "المكتب التنفيذي",
      committees: "منسقو اللجان",
      roles: ["الرئيس", "الكاتب العام", "أمينة المال", "مستشار", "مستشار"],
      committeeRoles: ["التنظيم", "اللوجستيك", "السمعي البصري", "التواصل"]
    },
    activities: {
      eyebrow: "الأنشطة",
      title: "مواعيد منتظمة لتداول الأفلام والأفكار والمواهب.",
      imageAlt: "مدخل مضيء لقاعة سينما",
      featureEyebrow: "محطة بارزة",
      featureTitle: "المهرجان الدولي للفيلم بطنجة",
      featureCopy: "مختارات من الأفلام الطويلة والقصيرة، عروض أولى، تكريمات، حفلات، فضاء VIP، لقاءات مهنية وتبادلات مع الجمهور.",
      cards: [
        ["العروض الشهرية", "عروض منتظمة في قاعات شريكة بطنجة، مع حجز مسبق للأعضاء والجمهور."],
        ["لقاءات ونقاشات", "تبادلات غير مسبوقة مع نجوم ومخرجين وتقنيين وكتاب وفاعلين في المشهد السينمائي المغربي."],
        ["النوادي السينمائية المدرسية", "مواكبة المؤسسات، تكوين النظرة النقدية، والتعريف باللغة السينمائية."],
        ["ورشات وتكوينات", "الإخراج، المونتاج، كتابة السيناريو، تدبير المشاريع الثقافية ومهن السينما."]
      ]
    },
    membership: {
      eyebrow: "بطاقة سينيمانا",
      title: "لماذا تصبح عضوا",
      copy: "بانضمامك إلى مؤسسة سينيمانا، تستفيد من مجموعة امتيازات حصرية موجهة لعشاق السينما والثقافة.",
      benefits: [
        ["عروض بالحجز المسبق", "الدخول بالحجز المسبق إلى أكثر من خمسة عشر عرضا سينمائيا طوال السنة، تشمل العروض الشهرية والبرنامج الخاص للمهرجان الدولي للفيلم بطنجة."],
        ["الحفلات وفضاء VIP", "دعوة شخصية إلى حفلي الافتتاح والاختتام المرموقين للمهرجان، مع ولوج مميز إلى فضاء VIP للتبادل في أجواء ودية."],
        ["لقاءات حصرية", "إمكانية المشاركة في لقاءات ونقاشات غير مسبوقة مع أكبر النجوم والمخرجين المغاربة."],
        ["قرعة البطاقة البيضاء", "مشاركة تلقائية في قرعة للفوز ببطاقة بيضاء تتيح الولوج إلى الجامعة السينمائية المنظمة من طرف الجامعة الوطنية للأندية السينمائية، وتشمل الإقامة والتغذية والمشاركة في الورشات والتكوينات المبرمجة."],
        ["إقامة في مراكش", "المشاركة في الطومبولا الكبرى للفوز بإقامة في مراكش."]
      ],
      ctaTitle: "مع بطاقة سينيمانا: «عيشوا السينما. أعيدوا الحياة إلى السينما.»",
      ctaCopy: "",
      ctaButton: "اطلب بطاقتي"
    },
    partner: {
      eyebrow: "كن شريكا",
      title: "كن شريكا لمؤسسة سينيمانا",
      heading: "اربطوا صورتكم بدينامية ثقافية واسعة.",
      copy: "الانضمام إلى مؤسسة سينيمانا كشريك يعني ربط صورتكم بدينامية ثقافية ذات امتداد وطني ودولي، تنشط في طنجة وعبر المغرب من خلال الجامعة الوطنية للأندية السينمائية.",
      copy2: "يتيح لكم عرض الشراكة تقديم بطاقة عضوية سينيمانا لموظفيكم أو جمهوركم، وهي بطاقة مصممة لعيش السينما من الداخل.",
      close: "أن تصبحوا شركاء سينيمانا يعني الجمع بين المسؤولية المجتمعية والإشعاع الثقافي ومنفعة ملموسة لفريقكم، مع المساهمة في إعادة الحياة إلى السينما.",
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
      copy: "يقوم أعضاء سينيمانا بالحجز باستعمال الرمز الخاص بهم، ثم يتم التحقق عبر الهاتف قبل اختيار المقعد. أما الأفراد فيملؤون طلبا ينتظر المصادقة قبل إرسال التذكرة.",
      note: "التذكرة المستلمة تتضمن رقم المقعد المؤكد.",
      quote: "مسار واضح لتأكيد المقاعد وضمان تجربة سلسة يوم العرض.",
      member: {
        eyebrow: "عضو",
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
        eyebrow: "فرد",
        title: "طلب الحجز",
        steps: ["ملء الاستمارة.", "انتظار المصادقة.", "استلام التأكيد.", "استلام التذكرة مع رقم المقعد."],
        labels: {
          name: "الاسم الكامل",
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
      cards: [
        ["بلاغات", "أخبار مؤسسة سينيمانا، إعلانات البرمجة، الشراكات، وأبرز لحظات المهرجان."],
        ["الملف الصحفي", "تقديم المؤسسة، المهام، المكتب، الصور الرسمية، والأرقام الأساسية التي سيتم تحديثها مع الوثائق المقبلة."],
        ["الاعتمادات", "طلبات الولوج الصحفي إلى الحفلات والعروض والندوات والمقابلات والفضاءات المهنية."],
        ["الاتصال الإعلامي", "تنسيق التواصل: خولة المعروفي."]
      ]
    },
    partners: {
      eyebrow: "الشركاء",
      title: "شبكة في خدمة السينما المغربية والوساطة الثقافية.",
      logos: ["مؤسسات ثقافية", "قاعات شريكة", "مدارس وأندية سينمائية", "وسائل الإعلام", "مهنيون سينمائيون", "شركاء دوليون"]
    },
    footer: {
      copy: "مؤسسة ثقافية غير ربحية مكرسة للنهوض بالسينما والثقافة في طنجة وعلى المستوى الوطني.",
      sitemap: "خريطة الموقع",
      foundation: "المؤسسة",
      links: ["المهام", "بطاقة سينيمانا", "الحجز", "المكتب واللجان", "كن شريكا", "الصحافة"]
    },
    modal: {
      eyebrow: "بطاقة سينيمانا",
      title: "طلب العضوية",
      close: "إغلاق",
      labels: {
        name: "الاسم الكامل",
        birthday: "تاريخ الميلاد",
        city: "المدينة",
        phone: "رقم الهاتف",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        repeatPassword: "تكرار كلمة المرور"
      },
      button: "إرسال طلبي",
      loading: "جاري إنشاء حساب سينيمانا...",
      success: (name) => `شكرا ${name}. تم إنشاء حساب سينيمانا. يرجى التحقق من بريدك الإلكتروني لتأكيد التسجيل.`,
      validation: {
        required: "يرجى ملء جميع حقول الاستمارة.",
        birthday: "يرجى إدخال تاريخ ميلاد صحيح في الماضي.",
        passwordLength: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.",
        passwordMatch: "كلمتا المرور غير متطابقتين.",
        configMissing: "إعدادات Supabase غير موجودة. عوض YOUR_SUPABASE_URL و YOUR_SUPABASE_ANON_KEY داخل script.js.",
        supabaseMissing: "لم يتم تحميل عميل Supabase. تحقق من الاتصال أو رابط CDN.",
        accountExists: "قد يكون هذا الحساب موجودا مسبقا. جرب بريدا آخر أو تحقق من Authentication > Users في Supabase.",
        generic: "تعذر إنشاء الحساب الآن. يرجى المحاولة مرة أخرى."
      }
    }
  }
};

let currentLanguage = "fr";

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

function isSupabaseConfigured() {
  return Boolean(
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    SUPABASE_URL !== "YOUR_SUPABASE_URL" &&
    SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY"
  );
}

function getSupabaseClient() {
  if (!isSupabaseConfigured()) return null;
  if (!window.supabase || !window.supabase.createClient) return null;
  return window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

function getMemberFormData() {
  return {
    full_name: document.getElementById("memberName").value.trim(),
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
    data.full_name,
    data.birthday,
    data.city,
    data.phone,
    data.email,
    data.password,
    data.repeat_password
  ];

  if (requiredValues.some((value) => !value)) return messages.required;

  const birthday = new Date(`${data.birthday}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (Number.isNaN(birthday.getTime()) || birthday >= today) return messages.birthday;

  if (data.password.length < 8) return messages.passwordLength;
  if (data.password !== data.repeat_password) return messages.passwordMatch;

  return "";
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
  setText("#page-activities .activity-feature p:not(.eyebrow)", copy.activities.featureCopy);
  setCardTexts("#page-activities .cards-grid", copy.activities.cards);

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
  setLabel("publicName", copy.reservation.public.labels.name);
  setLabel("publicWhatsapp", copy.reservation.public.labels.whatsapp);
  setLabel("publicAge", copy.reservation.public.labels.age);
  setLabel("publicRole", copy.reservation.public.labels.role);
  setLabel("publicSource", copy.reservation.public.labels.source);
  setText("#publicReservationForm button", copy.reservation.public.button);

  setText("#page-press .page-hero .eyebrow", copy.press.eyebrow);
  setText("#page-press .page-hero h1", copy.press.title);
  setCardTexts("#page-press .cards-grid", copy.press.cards);

  setText("#page-partners .page-hero .eyebrow", copy.partners.eyebrow);
  setText("#page-partners .page-hero h1", copy.partners.title);
  copy.partners.logos.forEach((logo, index) => setText(`#page-partners .partner-logos article:nth-child(${index + 1}) span`, logo));

  setText(".site-footer > div:nth-child(1) p", copy.footer.copy);
  setText(".site-footer > div:nth-child(2) span", copy.footer.sitemap);
  setText(".site-footer > div:nth-child(3) span", copy.footer.foundation);
  setText(".site-footer > div:nth-child(2) a:nth-of-type(1)", copy.footer.links[0]);
  setText(".site-footer > div:nth-child(2) a:nth-of-type(2)", copy.footer.links[1]);
  setText(".site-footer > div:nth-child(2) a:nth-of-type(3)", copy.footer.links[2]);
  setText(".site-footer > div:nth-child(3) a:nth-of-type(1)", copy.footer.links[3]);
  setText(".site-footer > div:nth-child(3) a:nth-of-type(2)", copy.footer.links[4]);
  setText(".site-footer > div:nth-child(3) a:nth-of-type(3)", copy.footer.links[5]);

  setText(".member-modal .modal-header .eyebrow", copy.modal.eyebrow);
  setText(".member-modal .modal-header h2", copy.modal.title);
  setAttr(".member-modal .modal-header button", "aria-label", copy.modal.close);
  setLabel("memberName", copy.modal.labels.name);
  setLabel("memberBirthday", copy.modal.labels.birthday);
  setLabel("memberCity", copy.modal.labels.city);
  setLabel("memberPhone", copy.modal.labels.phone);
  setLabel("memberEmail", copy.modal.labels.email);
  setLabel("memberPassword", copy.modal.labels.password);
  setLabel("memberRepeatPassword", copy.modal.labels.repeatPassword);
  setText(".member-modal > button", copy.modal.button);

  clearMessage("memberReservationMessage");
  clearMessage("publicReservationMessage");
  clearMessage("memberMessage");
}

function showPage(name, pushState = true) {
  const target = PAGES.includes(name) ? name : "home";

  document.querySelectorAll(".page").forEach((page) => {
    page.classList.toggle("active", page.id === `page-${target}`);
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.toggle("active", link.id === `nav-${target}`);
  });

  const navLinks = document.getElementById("navLinks");
  if (navLinks) navLinks.classList.remove("open");

  window.scrollTo(0, 0);

  if (pushState) {
    history.pushState({ page: target }, "", `#${target}`);
  }
}

function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("open");
}

function openMemberForm() {
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

async function submitMember(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = getMemberFormData();
  const message = document.getElementById("memberMessage");
  const submitButton = form.querySelector('button[type="submit"]');
  const copy = TRANSLATIONS[currentLanguage].modal;
  const validationError = validateMemberForm(data);

  if (validationError) {
    setFormMessage(message, validationError, "error");
    return;
  }

  if (!isSupabaseConfigured()) {
    setFormMessage(message, copy.validation.configMissing, "error");
    return;
  }

  const supabaseClient = getSupabaseClient();
  if (!supabaseClient) {
    setFormMessage(message, copy.validation.supabaseMissing, "error");
    return;
  }

  setFormMessage(message, copy.loading);
  if (submitButton) submitButton.disabled = true;

  try {
    const signUpOptions = {
      data: {
        full_name: data.full_name,
        birthday: data.birthday,
        city: data.city,
        phone: data.phone
      }
    };

    if (SUPABASE_EMAIL_REDIRECT_TO) {
      signUpOptions.emailRedirectTo = SUPABASE_EMAIL_REDIRECT_TO;
    }

    const { data: signUpData, error } = await supabaseClient.auth.signUp({
      email: data.email,
      password: data.password,
      options: signUpOptions
    });

    if (error) {
      setFormMessage(message, error.message || copy.validation.generic, "error");
      return;
    }

    const identities = signUpData && signUpData.user ? signUpData.user.identities : null;
    const accountProbablyExists = Array.isArray(identities) && identities.length === 0;
    if (!signUpData || !signUpData.user || accountProbablyExists) {
      setFormMessage(message, copy.validation.accountExists, "error");
      return;
    }

    setFormMessage(message, copy.success(data.full_name), "success");
    form.reset();
  } catch (error) {
    setFormMessage(message, error.message || copy.validation.generic, "error");
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
}

function submitMemberReservation(event) {
  event.preventDefault();
  const code = document.getElementById("memberCode").value.trim();
  const seat = document.getElementById("memberSeat").value;
  const message = document.getElementById("memberReservationMessage");
  const number = Math.floor(1000 + Math.random() * 9000);

  message.textContent = TRANSLATIONS[currentLanguage].reservation.member.message(code, seat, number);
  event.currentTarget.reset();
}

function submitPublicReservation(event) {
  event.preventDefault();
  const name = document.getElementById("publicName").value.trim();
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
});
