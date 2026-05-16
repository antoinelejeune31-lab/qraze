export type Locale = 'fr' | 'en' | 'es' | 'it' | 'de'
export const locales: Locale[] = ['fr', 'en', 'es', 'it', 'de']
export const defaultLocale: Locale = 'fr'
export const flags: Record<Locale, string> = {
  fr: '🇫🇷', en: '🇬🇧', es: '🇪🇸', it: '🇮🇹', de: '🇩🇪',
}

const t = {
  fr: {
    header: {
      generator: 'Générateur', pricing: 'Tarifs', dashboard: 'Dashboard',
      login: 'Connexion', register: "S'inscrire",
    },
    footer: {
      tagline: 'Générateur de QR codes personnalisés.\nGratuit, rapide, conforme RGPD.',
      product: 'Produit', account: 'Compte', legal: 'Légal',
      generator: 'Générateur', pricing: 'Tarifs', dashboard: 'Dashboard',
      login: 'Connexion', register: 'Inscription',
      mentions: 'Mentions légales', privacy: 'Confidentialité', cgu: 'CGU',
      rights: 'Tous droits réservés', contact: 'Nous contacter',
    },
    home: {
      hero: {
        badge: 'Générateur professionnel · Gratuit',
        h1: "J'obtiens mon QR code",
        sub: "Modules, couleurs, dégradés, logo — personnalisez chaque détail. Exportez en PNG, SVG ou JPEG. Sans inscription.",
        cta: 'Créer un QR code gratuitement →',
        note: 'Sans inscription · Sans carte bancaire · 100 % gratuit',
      },
      stats: [
        { val: '100%', label: 'Gratuit' },
        { val: '∞',    label: 'QR illimités' },
        { val: 'SVG',  label: 'Vectoriel' },
        { val: 'RGPD', label: 'Conforme' },
      ],
      how: {
        label: 'Comment ça marche',
        steps: [
          { num: '01', title: 'Saisissez',     desc: 'URL, réseau Wi-Fi, carte de visite ou SMS — choisissez votre type de contenu.' },
          { num: '02', title: 'Personnalisez', desc: 'Couleurs, formes de modules, logo, dégradé — tout se configure en direct.' },
          { num: '03', title: 'Téléchargez',   desc: "PNG 1024 px, SVG vectoriel ou JPEG. Prêt pour l'impression et le web." },
        ],
      },
      features: {
        label: 'Ce que vous obtenez',
        items: [
          { num: '01', title: 'Personnalisation totale', desc: "Modules ronds, étoiles, losanges, cœurs. Couleurs, dégradés, logo central, effet liquid glass. Chaque QR code est unique et reflète votre identité.", cta: 'Essayer maintenant →' },
          { num: '02', title: 'Export haute qualité',    desc: "PNG 1024 px, SVG vectoriel ou JPEG. Prêt pour l'impression et le numérique." },
          { num: '03', title: 'Durée limitée',           desc: "Définissez une expiration. Idéal pour événements et promotions éphémères." },
        ],
      },
      usecases: {
        label: 'Pour chaque besoin',
        title: 'Un QR code pour chaque situation',
        cta: 'Créer en 1 clic →',
        items: [
          { tag: 'Restauration',  type: 'URL',   title: 'Menu digital',     desc: "QR code sur table ou vitrine. Vos clients accèdent au menu, à la carte des vins ou aux réservations en un scan." },
          { tag: 'Networking',    type: 'vCard', title: 'Carte de visite',  desc: "Partagez nom, téléphone et email instantanément. Votre contact s'enregistre sans saisie." },
          { tag: 'Événementiel', type: 'URL',   title: 'Événement',        desc: "Programme, billetterie, plan d'accès — tout accessible depuis le flyer ou le badge." },
          { tag: 'Connectivité', type: 'Wi-Fi', title: 'Réseau Wi-Fi',     desc: "Connexion automatique sans saisie de mot de passe. Idéal en boutique, hôtel ou espace de coworking." },
          { tag: 'Commerce',      type: 'URL',   title: 'Boutique & promo', desc: "Redirigez vers une fiche produit, un code promo ou une page de vente depuis un emballage ou une étiquette." },
          { tag: 'Social media',  type: 'URL',   title: 'Réseaux sociaux',  desc: "Pointez vers votre profil Instagram, LinkedIn ou Linktree depuis une affiche ou un support print." },
          { tag: 'Communication', type: 'SMS',   title: 'SMS & contact',    desc: "Déclenchez un SMS ou un appel pré-rempli depuis un panneau, un packaging ou une publicité." },
          { tag: 'Portfolio',     type: 'URL',   title: 'Professionnel',    desc: "CV, portfolio, présentation d'activité ou prise de rendez-vous — directement depuis votre carte ou signature mail." },
        ],
      },
      cta: {
        label: '— Commencez maintenant',
        title: 'Gratuit.\nSans inscription.\nInstantané.',
        desc: "Aucune carte bancaire. L'offre payante débloque l'historique, les statistiques et les QR à expiration avancés.",
        btn: 'Créer un QR code →',
        link: 'Voir les offres →',
      },
    },
    generator: {
      badge: 'Outil gratuit',
      title: 'Générateur de QR Code',
      sub: 'Couleurs, formes, logo, dégradés.\nExportez en PNG, SVG ou JPEG.',
    },
    pricing: {
      label: 'Tarifs',
      title: 'Simple.\nTransparent.\nSans abonnement.',
      desc: "Générez votre QR code gratuitement. Si vous souhaitez le personnaliser, débloquez toutes les options pour 1,99 € — paiement unique, sans compte.",
      free: {
        label: 'Gratuit', price: '0 €', period: 'Pour toujours',
        features: ['Génération de QR code instantanée', 'Types : URL, Wi-Fi, vCard, SMS', 'Export PNG standard', 'Sans inscription', 'Sans limite de génération'],
        locked: ['Couleurs & dégradés', 'Formes de modules', 'Logo au centre'],
        cta: 'Créer un QR code →',
      },
      paid: {
        label: 'Personnalisation', period: 'Paiement unique · Sans inscription',
        features: ['Tout ce qui est inclus dans Gratuit', 'Couleurs personnalisées', 'Dégradés (linéaire, radial)', 'Formes de modules (rond, étoile, cœur…)', 'Style des yeux du QR', 'Logo au centre', 'Effet Liquid Glass', 'Cadre décoratif', 'Export SVG vectoriel & JPEG HD'],
        cta: 'Débloquer les personnalisations →',
      },
      faq: {
        label: 'Questions fréquentes',
        items: [
          { q: "Comment fonctionne le paiement unique ?",            a: "Vous payez 1,99 € via Stripe (carte bancaire, Apple Pay, Google Pay). Une fois le paiement validé, toutes les personnalisations sont débloquées pour le QR code en cours." },
          { q: "Dois-je créer un compte ?",                          a: "Non. Le paiement unique ne nécessite aucune inscription. Votre QR code personnalisé est généré directement après paiement." },
          { q: "Le paiement est-il sécurisé ?",                      a: "Oui. Les paiements sont gérés par Stripe, leader mondial du paiement en ligne. Vos données bancaires ne transitent jamais par nos serveurs." },
          { q: "Puis-je générer plusieurs QR codes personnalisés ?", a: "Chaque session de personnalisation coûte 1,99 €. Si vous en générez souvent, contactez-nous pour une offre adaptée." },
        ],
      },
    },
    contact: {
      label: 'Contact',
      title: 'Nous contacter',
      sub: 'Une question, une suggestion ? Écrivez-nous, nous répondons sous 48h.',
      name: 'Nom', email: 'Email', message: 'Message',
      ph_name: 'Votre nom', ph_email: 'votre@email.com', ph_message: 'Votre message…',
      submit: 'Envoyer le message →',
      success: 'Votre message a bien été envoyé. Nous vous répondrons dans les 48h.',
      error: 'Une erreur est survenue. Veuillez réessayer.',
    },
  },

  en: {
    header: {
      generator: 'Generator', pricing: 'Pricing', dashboard: 'Dashboard',
      login: 'Log in', register: 'Sign up',
    },
    footer: {
      tagline: 'Customizable QR code generator.\nFree, fast, GDPR compliant.',
      product: 'Product', account: 'Account', legal: 'Legal',
      generator: 'Generator', pricing: 'Pricing', dashboard: 'Dashboard',
      login: 'Log in', register: 'Sign up',
      mentions: 'Legal notice', privacy: 'Privacy policy', cgu: 'Terms of use',
      rights: 'All rights reserved', contact: 'Contact us',
    },
    home: {
      hero: {
        badge: 'Professional generator · Free',
        h1: 'I get my QR code',
        sub: 'Modules, colors, gradients, logo — customize every detail. Export as PNG, SVG or JPEG. No sign-up.',
        cta: 'Create a QR code for free →',
        note: 'No sign-up · No credit card · 100% free',
      },
      stats: [
        { val: '100%', label: 'Free' },
        { val: '∞',    label: 'Unlimited QR' },
        { val: 'SVG',  label: 'Vector' },
        { val: 'GDPR', label: 'Compliant' },
      ],
      how: {
        label: 'How it works',
        steps: [
          { num: '01', title: 'Enter',     desc: 'URL, Wi-Fi network, business card or SMS — choose your content type.' },
          { num: '02', title: 'Customize', desc: 'Colors, module shapes, logo, gradient — configure everything in real time.' },
          { num: '03', title: 'Download',  desc: 'PNG 1024px, vector SVG or JPEG. Ready for print and web.' },
        ],
      },
      features: {
        label: 'What you get',
        items: [
          { num: '01', title: 'Full customization',        desc: 'Round modules, stars, diamonds, hearts. Colors, gradients, central logo, liquid glass effect. Each QR code is unique.', cta: 'Try it now →' },
          { num: '02', title: 'High quality export',       desc: 'PNG 1024px, vector SVG or JPEG. Ready for print and digital.' },
          { num: '03', title: 'Limited duration',          desc: 'Set an expiration date. Perfect for events and temporary promotions.' },
        ],
      },
      usecases: {
        label: 'For every need',
        title: 'A QR code for every situation',
        cta: 'Create in 1 click →',
        items: [
          { tag: 'Food & Drink',   type: 'URL',   title: 'Digital menu',     desc: 'QR code on table or window. Customers open your menu or reservations with one scan.' },
          { tag: 'Networking',     type: 'vCard', title: 'Business card',    desc: 'Share your name, phone and email instantly. The contact is saved without typing.' },
          { tag: 'Events',         type: 'URL',   title: 'Event',            desc: 'Schedule, ticketing, directions — all accessible from the flyer or badge.' },
          { tag: 'Connectivity',   type: 'Wi-Fi', title: 'Wi-Fi network',    desc: 'Automatic connection without entering a password. Ideal for shops, hotels or coworking spaces.' },
          { tag: 'Commerce',       type: 'URL',   title: 'Shop & promo',     desc: 'Link to a product page, promo code or sales page from packaging or a label.' },
          { tag: 'Social media',   type: 'URL',   title: 'Social media',     desc: 'Point to your Instagram, LinkedIn or Linktree profile from a poster or print material.' },
          { tag: 'Communication',  type: 'SMS',   title: 'SMS & contact',    desc: 'Trigger a pre-filled SMS or call from a sign, packaging or advertisement.' },
          { tag: 'Portfolio',      type: 'URL',   title: 'Professional',     desc: 'CV, portfolio, business presentation or appointment booking — from your card or email signature.' },
        ],
      },
      cta: {
        label: '— Get started now',
        title: 'Free.\nNo sign-up.\nInstant.',
        desc: 'No credit card. The paid plan unlocks history, statistics and advanced expiring QR codes.',
        btn: 'Create a QR code →',
        link: 'View pricing →',
      },
    },
    generator: {
      badge: 'Free tool',
      title: 'QR Code Generator',
      sub: 'Colors, shapes, logo, gradients.\nExport as PNG, SVG or JPEG.',
    },
    pricing: {
      label: 'Pricing',
      title: 'Simple.\nTransparent.\nNo subscription.',
      desc: 'Generate your QR code for free. To customize it, unlock all options for €1.99 — one-time payment, no account.',
      free: {
        label: 'Free', price: '€0', period: 'Forever',
        features: ['Instant QR code generation', 'Types: URL, Wi-Fi, vCard, SMS', 'Standard PNG export', 'No sign-up', 'Unlimited generations'],
        locked: ['Colors & gradients', 'Module shapes', 'Central logo'],
        cta: 'Create a QR code →',
      },
      paid: {
        label: 'Customization', period: 'One-time payment · No sign-up',
        features: ['Everything in Free', 'Custom colors', 'Gradients (linear, radial)', 'Module shapes (round, star, heart…)', 'QR eye style', 'Central logo', 'Liquid Glass effect', 'Decorative frame', 'SVG vector & HD JPEG export'],
        cta: 'Unlock customizations →',
      },
      faq: {
        label: 'FAQ',
        items: [
          { q: 'How does the one-time payment work?',            a: 'You pay €1.99 via Stripe (credit card, Apple Pay, Google Pay). Once confirmed, all customizations are unlocked for the current QR code.' },
          { q: 'Do I need to create an account?',                a: 'No. The one-time payment requires no sign-up. Your customized QR code is generated right after payment.' },
          { q: 'Is the payment secure?',                         a: 'Yes. Payments are handled by Stripe, the world leader in online payments. Your bank details never pass through our servers.' },
          { q: 'Can I generate multiple customized QR codes?',   a: 'Each customization session costs €1.99. If you need many, contact us for a tailored offer.' },
        ],
      },
    },
    contact: {
      label: 'Contact',
      title: 'Contact us',
      sub: 'A question or suggestion? Write to us, we reply within 48h.',
      name: 'Name', email: 'Email', message: 'Message',
      ph_name: 'Your name', ph_email: 'your@email.com', ph_message: 'Your message…',
      submit: 'Send message →',
      success: 'Your message has been sent. We will reply within 48h.',
      error: 'An error occurred. Please try again.',
    },
  },

  es: {
    header: {
      generator: 'Generador', pricing: 'Precios', dashboard: 'Dashboard',
      login: 'Iniciar sesión', register: 'Registrarse',
    },
    footer: {
      tagline: 'Generador de códigos QR personalizados.\nGratis, rápido, conforme al RGPD.',
      product: 'Producto', account: 'Cuenta', legal: 'Legal',
      generator: 'Generador', pricing: 'Precios', dashboard: 'Dashboard',
      login: 'Iniciar sesión', register: 'Registro',
      mentions: 'Aviso legal', privacy: 'Privacidad', cgu: 'Términos de uso',
      rights: 'Todos los derechos reservados', contact: 'Contáctenos',
    },
    home: {
      hero: {
        badge: 'Generador profesional · Gratis',
        h1: 'Obtengo mi código QR',
        sub: 'Módulos, colores, degradados, logo — personaliza cada detalle. Exporta en PNG, SVG o JPEG. Sin registro.',
        cta: 'Crear un código QR gratis →',
        note: 'Sin registro · Sin tarjeta · 100% gratis',
      },
      stats: [
        { val: '100%', label: 'Gratis' },
        { val: '∞',    label: 'QR ilimitados' },
        { val: 'SVG',  label: 'Vectorial' },
        { val: 'RGPD', label: 'Conforme' },
      ],
      how: {
        label: 'Cómo funciona',
        steps: [
          { num: '01', title: 'Introduce',   desc: 'URL, red Wi-Fi, tarjeta de visita o SMS — elige el tipo de contenido.' },
          { num: '02', title: 'Personaliza', desc: 'Colores, formas, logo, degradado — todo se configura en tiempo real.' },
          { num: '03', title: 'Descarga',    desc: 'PNG 1024px, SVG vectorial o JPEG. Listo para impresión y web.' },
        ],
      },
      features: {
        label: 'Lo que obtienes',
        items: [
          { num: '01', title: 'Personalización total',      desc: 'Módulos redondos, estrellas, rombos, corazones. Colores, degradados, logo central, efecto liquid glass. Cada código QR es único.', cta: 'Probar ahora →' },
          { num: '02', title: 'Exportación de alta calidad', desc: 'PNG 1024px, SVG vectorial o JPEG. Listo para impresión y digital.' },
          { num: '03', title: 'Duración limitada',           desc: 'Establece una caducidad. Ideal para eventos y promociones temporales.' },
        ],
      },
      usecases: {
        label: 'Para cada necesidad',
        title: 'Un código QR para cada situación',
        cta: 'Crear en 1 clic →',
        items: [
          { tag: 'Restauración',  type: 'URL',   title: 'Menú digital',      desc: 'QR en la mesa o escaparate. Tus clientes acceden al menú o reservas con un scan.' },
          { tag: 'Networking',    type: 'vCard', title: 'Tarjeta de visita', desc: 'Comparte nombre, teléfono y email al instante. El contacto se guarda sin teclear.' },
          { tag: 'Eventos',       type: 'URL',   title: 'Evento',            desc: 'Programa, entradas, indicaciones — todo accesible desde el flyer o la entrada.' },
          { tag: 'Conectividad',  type: 'Wi-Fi', title: 'Red Wi-Fi',         desc: 'Conexión automática sin contraseña. Ideal en tiendas, hoteles o coworkings.' },
          { tag: 'Comercio',      type: 'URL',   title: 'Tienda & promo',    desc: 'Enlaza a ficha de producto, código promo o página de venta desde el embalaje.' },
          { tag: 'Redes sociales', type: 'URL',  title: 'Redes sociales',    desc: 'Apunta a tu perfil de Instagram, LinkedIn o Linktree desde un cartel o impreso.' },
          { tag: 'Comunicación', type: 'SMS',    title: 'SMS & contacto',    desc: 'Activa un SMS o llamada predefinida desde un cartel, embalaje o publicidad.' },
          { tag: 'Portfolio',     type: 'URL',   title: 'Profesional',       desc: 'CV, portfolio, presentación o cita — directamente desde tu tarjeta o firma de correo.' },
        ],
      },
      cta: {
        label: '— Empieza ahora',
        title: 'Gratis.\nSin registro.\nInstantáneo.',
        desc: 'Sin tarjeta bancaria. El plan de pago desbloquea historial, estadísticas y QR con caducidad avanzada.',
        btn: 'Crear un código QR →',
        link: 'Ver precios →',
      },
    },
    generator: {
      badge: 'Herramienta gratuita',
      title: 'Generador de Código QR',
      sub: 'Colores, formas, logo, degradados.\nExporta en PNG, SVG o JPEG.',
    },
    pricing: {
      label: 'Precios',
      title: 'Simple.\nTransparente.\nSin suscripción.',
      desc: 'Genera tu código QR gratis. Si quieres personalizarlo, desbloquea todas las opciones por 1,99 € — pago único, sin cuenta.',
      free: {
        label: 'Gratis', price: '0 €', period: 'Para siempre',
        features: ['Generación instantánea de código QR', 'Tipos: URL, Wi-Fi, vCard, SMS', 'Exportación PNG estándar', 'Sin registro', 'Sin límite de generación'],
        locked: ['Colores y degradados', 'Formas de módulos', 'Logo central'],
        cta: 'Crear un código QR →',
      },
      paid: {
        label: 'Personalización', period: 'Pago único · Sin registro',
        features: ['Todo lo incluido en Gratis', 'Colores personalizados', 'Degradados (lineal, radial)', 'Formas de módulos (redondo, estrella, corazón…)', 'Estilo de ojos del QR', 'Logo central', 'Efecto Liquid Glass', 'Marco decorativo', 'Exportación SVG vectorial & JPEG HD'],
        cta: 'Desbloquear personalizaciones →',
      },
      faq: {
        label: 'Preguntas frecuentes',
        items: [
          { q: '¿Cómo funciona el pago único?',                        a: 'Pagas 1,99 € por Stripe (tarjeta, Apple Pay, Google Pay). Una vez validado el pago, todas las personalizaciones se desbloquean para el QR actual.' },
          { q: '¿Necesito crear una cuenta?',                          a: 'No. El pago único no requiere registro. Tu código QR personalizado se genera justo después del pago.' },
          { q: '¿Es seguro el pago?',                                  a: 'Sí. Los pagos son gestionados por Stripe, líder mundial en pagos en línea. Tus datos bancarios nunca pasan por nuestros servidores.' },
          { q: '¿Puedo generar varios códigos QR personalizados?',     a: 'Cada sesión de personalización cuesta 1,99 €. Si los necesitas a menudo, contáctanos para una oferta adaptada.' },
        ],
      },
    },
    contact: {
      label: 'Contacto',
      title: 'Contáctenos',
      sub: '¿Una pregunta o sugerencia? Escríbenos, respondemos en 48h.',
      name: 'Nombre', email: 'Email', message: 'Mensaje',
      ph_name: 'Tu nombre', ph_email: 'tu@email.com', ph_message: 'Tu mensaje…',
      submit: 'Enviar mensaje →',
      success: 'Tu mensaje ha sido enviado. Te responderemos en 48h.',
      error: 'Ha ocurrido un error. Inténtalo de nuevo.',
    },
  },

  it: {
    header: {
      generator: 'Generatore', pricing: 'Prezzi', dashboard: 'Dashboard',
      login: 'Accedi', register: 'Registrati',
    },
    footer: {
      tagline: 'Generatore di codici QR personalizzati.\nGratuito, veloce, conforme al GDPR.',
      product: 'Prodotto', account: 'Account', legal: 'Legale',
      generator: 'Generatore', pricing: 'Prezzi', dashboard: 'Dashboard',
      login: 'Accedi', register: 'Registrazione',
      mentions: 'Note legali', privacy: 'Privacy', cgu: 'Termini di utilizzo',
      rights: 'Tutti i diritti riservati', contact: 'Contattaci',
    },
    home: {
      hero: {
        badge: 'Generatore professionale · Gratuito',
        h1: 'Ottengo il mio codice QR',
        sub: 'Moduli, colori, gradienti, logo — personalizza ogni dettaglio. Esporta in PNG, SVG o JPEG. Senza registrazione.',
        cta: 'Crea un codice QR gratis →',
        note: 'Senza registrazione · Senza carta · 100% gratuito',
      },
      stats: [
        { val: '100%', label: 'Gratuito' },
        { val: '∞',    label: 'QR illimitati' },
        { val: 'SVG',  label: 'Vettoriale' },
        { val: 'GDPR', label: 'Conforme' },
      ],
      how: {
        label: 'Come funziona',
        steps: [
          { num: '01', title: 'Inserisci',    desc: 'URL, rete Wi-Fi, biglietto da visita o SMS — scegli il tipo di contenuto.' },
          { num: '02', title: 'Personalizza', desc: 'Colori, forme dei moduli, logo, gradiente — tutto si configura in tempo reale.' },
          { num: '03', title: 'Scarica',      desc: 'PNG 1024px, SVG vettoriale o JPEG. Pronto per la stampa e il web.' },
        ],
      },
      features: {
        label: 'Cosa ottieni',
        items: [
          { num: '01', title: 'Personalizzazione totale',      desc: 'Moduli rotondi, stelle, rombi, cuori. Colori, gradienti, logo centrale, effetto liquid glass. Ogni codice QR è unico.', cta: 'Prova ora →' },
          { num: '02', title: 'Esportazione di alta qualità',  desc: 'PNG 1024px, SVG vettoriale o JPEG. Pronto per la stampa e il digitale.' },
          { num: '03', title: 'Durata limitata',               desc: 'Imposta una scadenza. Ideale per eventi e promozioni temporanee.' },
        ],
      },
      usecases: {
        label: 'Per ogni esigenza',
        title: 'Un codice QR per ogni situazione',
        cta: 'Crea in 1 clic →',
        items: [
          { tag: 'Ristorazione',  type: 'URL',   title: 'Menu digitale',       desc: 'QR code sul tavolo o in vetrina. I clienti aprono il menu o le prenotazioni con una scansione.' },
          { tag: 'Networking',    type: 'vCard', title: 'Biglietto da visita', desc: "Condividi nome, telefono ed email all'istante. Il contatto viene salvato senza digitare." },
          { tag: 'Eventi',        type: 'URL',   title: 'Evento',              desc: 'Programma, biglietteria, indicazioni — tutto accessibile dal flyer o dal badge.' },
          { tag: 'Connettività', type: 'Wi-Fi', title: 'Rete Wi-Fi',          desc: 'Connessione automatica senza password. Ideale per negozi, hotel o spazi di coworking.' },
          { tag: 'Commercio',     type: 'URL',   title: 'Negozio & promo',     desc: 'Collega a scheda prodotto, codice promo o pagina di vendita da imballaggio o etichetta.' },
          { tag: 'Social media',  type: 'URL',   title: 'Social media',        desc: 'Punta al tuo profilo Instagram, LinkedIn o Linktree da un poster o un supporto stampato.' },
          { tag: 'Comunicazione', type: 'SMS',   title: 'SMS & contatto',      desc: 'Attiva un SMS o una chiamata precompilata da un cartello, imballaggio o pubblicità.' },
          { tag: 'Portfolio',     type: 'URL',   title: 'Professionale',       desc: 'CV, portfolio, presentazione aziendale o prenotazione — dal biglietto o dalla firma email.' },
        ],
      },
      cta: {
        label: '— Inizia ora',
        title: 'Gratuito.\nSenza registrazione.\nIstantaneo.',
        desc: 'Nessuna carta di credito. Il piano a pagamento sblocca cronologia, statistiche e QR con scadenza avanzata.',
        btn: 'Crea un codice QR →',
        link: 'Vedi i prezzi →',
      },
    },
    generator: {
      badge: 'Strumento gratuito',
      title: 'Generatore di Codici QR',
      sub: 'Colori, forme, logo, gradienti.\nEsporta in PNG, SVG o JPEG.',
    },
    pricing: {
      label: 'Prezzi',
      title: 'Semplice.\nTrasparente.\nSenza abbonamento.',
      desc: 'Genera il tuo codice QR gratuitamente. Per personalizzarlo, sblocca tutte le opzioni per 1,99 € — pagamento unico, senza account.',
      free: {
        label: 'Gratuito', price: '0 €', period: 'Per sempre',
        features: ['Generazione istantanea di codice QR', 'Tipi: URL, Wi-Fi, vCard, SMS', 'Esportazione PNG standard', 'Senza registrazione', 'Generazioni illimitate'],
        locked: ['Colori e gradienti', 'Forme dei moduli', 'Logo centrale'],
        cta: 'Crea un codice QR →',
      },
      paid: {
        label: 'Personalizzazione', period: 'Pagamento unico · Senza registrazione',
        features: ['Tutto incluso nel piano Gratuito', 'Colori personalizzati', 'Gradienti (lineare, radiale)', 'Forme dei moduli (rotondo, stella, cuore…)', 'Stile degli occhi del QR', 'Logo centrale', 'Effetto Liquid Glass', 'Cornice decorativa', 'Esportazione SVG vettoriale & JPEG HD'],
        cta: 'Sblocca le personalizzazioni →',
      },
      faq: {
        label: 'Domande frequenti',
        items: [
          { q: 'Come funziona il pagamento unico?',                  a: 'Paghi 1,99 € tramite Stripe (carta, Apple Pay, Google Pay). Una volta confermato il pagamento, tutte le personalizzazioni vengono sbloccate per il QR code corrente.' },
          { q: 'Devo creare un account?',                            a: 'No. Il pagamento unico non richiede registrazione. Il tuo codice QR personalizzato viene generato subito dopo il pagamento.' },
          { q: 'Il pagamento è sicuro?',                             a: 'Sì. I pagamenti sono gestiti da Stripe, leader mondiale dei pagamenti online. I tuoi dati bancari non transitano mai dai nostri server.' },
          { q: 'Posso generare più codici QR personalizzati?',       a: "Ogni sessione di personalizzazione costa 1,99 €. Se ne hai bisogno spesso, contattaci per un'offerta su misura." },
        ],
      },
    },
    contact: {
      label: 'Contatto',
      title: 'Contattaci',
      sub: 'Una domanda o suggerimento? Scrivici, rispondiamo entro 48h.',
      name: 'Nome', email: 'Email', message: 'Messaggio',
      ph_name: 'Il tuo nome', ph_email: 'tua@email.com', ph_message: 'Il tuo messaggio…',
      submit: 'Invia messaggio →',
      success: 'Il tuo messaggio è stato inviato. Risponderemo entro 48h.',
      error: 'Si è verificato un errore. Riprova.',
    },
  },

  de: {
    header: {
      generator: 'Generator', pricing: 'Preise', dashboard: 'Dashboard',
      login: 'Anmelden', register: 'Registrieren',
    },
    footer: {
      tagline: 'Generator für personalisierte QR-Codes.\nKostenlos, schnell, DSGVO-konform.',
      product: 'Produkt', account: 'Konto', legal: 'Rechtliches',
      generator: 'Generator', pricing: 'Preise', dashboard: 'Dashboard',
      login: 'Anmelden', register: 'Registrieren',
      mentions: 'Impressum', privacy: 'Datenschutz', cgu: 'Nutzungsbedingungen',
      rights: 'Alle Rechte vorbehalten', contact: 'Kontakt',
    },
    home: {
      hero: {
        badge: 'Professioneller Generator · Kostenlos',
        h1: 'Ich erhalte meinen QR-Code',
        sub: 'Module, Farben, Verläufe, Logo — passe jedes Detail an. Exportiere als PNG, SVG oder JPEG. Ohne Anmeldung.',
        cta: 'QR-Code kostenlos erstellen →',
        note: 'Ohne Anmeldung · Ohne Kreditkarte · 100% kostenlos',
      },
      stats: [
        { val: '100%',  label: 'Kostenlos' },
        { val: '∞',     label: 'Unbegrenzt' },
        { val: 'SVG',   label: 'Vektorgrafik' },
        { val: 'DSGVO', label: 'Konform' },
      ],
      how: {
        label: 'So funktioniert es',
        steps: [
          { num: '01', title: 'Eingeben',  desc: 'URL, WLAN-Netzwerk, Visitenkarte oder SMS — wähle deinen Inhaltstyp.' },
          { num: '02', title: 'Anpassen',  desc: 'Farben, Modulformen, Logo, Verlauf — alles in Echtzeit konfigurieren.' },
          { num: '03', title: 'Herunterladen', desc: 'PNG 1024px, Vektor-SVG oder JPEG. Bereit für Druck und Web.' },
        ],
      },
      features: {
        label: 'Was du bekommst',
        items: [
          { num: '01', title: 'Vollständige Anpassung', desc: 'Runde Module, Sterne, Rauten, Herzen. Farben, Verläufe, zentrales Logo, Liquid-Glass-Effekt. Jeder QR-Code ist einzigartig.', cta: 'Jetzt ausprobieren →' },
          { num: '02', title: 'Hochqualitäts-Export',   desc: 'PNG 1024px, Vektor-SVG oder JPEG. Bereit für Druck und Digital.' },
          { num: '03', title: 'Begrenzte Laufzeit',     desc: 'Setze ein Ablaufdatum. Ideal für Veranstaltungen und zeitlich begrenzte Aktionen.' },
        ],
      },
      usecases: {
        label: 'Für jeden Bedarf',
        title: 'Ein QR-Code für jede Situation',
        cta: 'In 1 Klick erstellen →',
        items: [
          { tag: 'Gastronomie',    type: 'URL',   title: 'Digitale Speisekarte', desc: 'QR-Code auf dem Tisch oder Schaufenster. Gäste öffnen die Speisekarte oder Reservierung mit einem Scan.' },
          { tag: 'Networking',     type: 'vCard', title: 'Visitenkarte',         desc: 'Teile Name, Telefon und E-Mail sofort. Der Kontakt wird ohne Tippen gespeichert.' },
          { tag: 'Veranstaltungen', type: 'URL',  title: 'Veranstaltung',        desc: 'Programm, Tickets, Wegbeschreibung — alles über den Flyer oder das Badge zugänglich.' },
          { tag: 'Konnektivität',  type: 'Wi-Fi', title: 'WLAN-Netzwerk',        desc: 'Automatische Verbindung ohne Passwort-Eingabe. Ideal für Läden, Hotels oder Coworking-Spaces.' },
          { tag: 'Handel',         type: 'URL',   title: 'Shop & Promo',         desc: 'Verlinkung zu Produktseite, Rabattcode oder Verkaufsseite von Verpackung oder Etikett.' },
          { tag: 'Social Media',   type: 'URL',   title: 'Social Media',         desc: 'Zeige auf dein Instagram-, LinkedIn- oder Linktree-Profil von einem Poster oder Druckmaterial.' },
          { tag: 'Kommunikation',  type: 'SMS',   title: 'SMS & Kontakt',        desc: 'Löse eine vorausgefüllte SMS oder Anruf aus einem Schild, einer Verpackung oder Werbung aus.' },
          { tag: 'Portfolio',      type: 'URL',   title: 'Professionell',        desc: 'Lebenslauf, Portfolio, Unternehmenspräsentation oder Terminbuchung — von deiner Karte oder E-Mail-Signatur.' },
        ],
      },
      cta: {
        label: '— Jetzt starten',
        title: 'Kostenlos.\nOhne Anmeldung.\nSofort.',
        desc: 'Keine Kreditkarte. Der kostenpflichtige Plan schaltet Verlauf, Statistiken und erweiterte ablaufende QR-Codes frei.',
        btn: 'QR-Code erstellen →',
        link: 'Preise ansehen →',
      },
    },
    generator: {
      badge: 'Kostenloses Tool',
      title: 'QR-Code-Generator',
      sub: 'Farben, Formen, Logo, Verläufe.\nExportiere als PNG, SVG oder JPEG.',
    },
    pricing: {
      label: 'Preise',
      title: 'Einfach.\nTransparent.\nOhne Abonnement.',
      desc: 'Erstelle deinen QR-Code kostenlos. Für Anpassungen, schalte alle Optionen für 1,99 € frei — einmalige Zahlung, kein Konto.',
      free: {
        label: 'Kostenlos', price: '0 €', period: 'Für immer',
        features: ['Sofortige QR-Code-Generierung', 'Typen: URL, WLAN, vCard, SMS', 'Standard-PNG-Export', 'Ohne Anmeldung', 'Unbegrenzte Generierungen'],
        locked: ['Farben & Verläufe', 'Modulformen', 'Zentrales Logo'],
        cta: 'QR-Code erstellen →',
      },
      paid: {
        label: 'Anpassung', period: 'Einmalige Zahlung · Ohne Anmeldung',
        features: ['Alles aus dem kostenlosen Plan', 'Benutzerdefinierte Farben', 'Verläufe (linear, radial)', 'Modulformen (rund, Stern, Herz…)', 'QR-Augen-Stil', 'Zentrales Logo', 'Liquid-Glass-Effekt', 'Dekorativer Rahmen', 'SVG-Vektor & HD-JPEG-Export'],
        cta: 'Anpassungen freischalten →',
      },
      faq: {
        label: 'Häufige Fragen',
        items: [
          { q: 'Wie funktioniert die einmalige Zahlung?',             a: 'Du zahlst 1,99 € über Stripe (Kreditkarte, Apple Pay, Google Pay). Nach der Bestätigung werden alle Anpassungen für den aktuellen QR-Code freigeschaltet.' },
          { q: 'Muss ich ein Konto erstellen?',                       a: 'Nein. Die einmalige Zahlung erfordert keine Registrierung. Dein personalisierter QR-Code wird direkt nach der Zahlung generiert.' },
          { q: 'Ist die Zahlung sicher?',                             a: 'Ja. Zahlungen werden von Stripe abgewickelt, dem weltweiten Marktführer für Online-Zahlungen. Deine Bankdaten gelangen nie auf unsere Server.' },
          { q: 'Kann ich mehrere personalisierte QR-Codes erstellen?', a: 'Jede Anpassungssitzung kostet 1,99 €. Wenn du oft viele brauchst, kontaktiere uns für ein maßgeschneidertes Angebot.' },
        ],
      },
    },
    contact: {
      label: 'Kontakt',
      title: 'Kontakt aufnehmen',
      sub: 'Eine Frage oder ein Vorschlag? Schreib uns, wir antworten innerhalb von 48h.',
      name: 'Name', email: 'E-Mail', message: 'Nachricht',
      ph_name: 'Dein Name', ph_email: 'deine@email.com', ph_message: 'Deine Nachricht…',
      submit: 'Nachricht senden →',
      success: 'Deine Nachricht wurde gesendet. Wir antworten innerhalb von 48h.',
      error: 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.',
    },
  },
}

export { t as translations }
export type Translations = typeof t.fr
