# QRaze — Générateur de QR codes

## Stack
- **Next.js 14** (App Router)
- **Supabase** (auth + base de données)
- **Tailwind CSS**
- **Resend** (emails transactionnels)
- **Vercel** (hébergement + cron jobs)

## Démarrage rapide

### 1. Installer les dépendances
```bash
npm install
```

### 2. Configurer les variables d'environnement
```bash
cp .env.local.example .env.local
# Remplir les valeurs dans .env.local
```

### 3. Configurer Supabase
- Créer un projet sur https://supabase.com
- Exécuter le contenu de `SUPABASE_SCHEMA.sql` dans l'éditeur SQL
- Récupérer l'URL et les clés API

### 4. Lancer en développement
```bash
npm run dev
```

### 5. Déployer sur Vercel
```bash
npm i -g vercel
vercel
```
Puis ajouter les variables d'environnement dans le dashboard Vercel.

## Structure du projet
```
src/
├── app/
│   ├── page.tsx                    # Accueil
│   ├── generator/                  # Générateur QR
│   ├── dashboard/                  # Espace utilisateur
│   ├── pricing/                    # Tarifs
│   ├── login/ & register/          # Auth
│   ├── rgpd/                       # Pages légales (RGPD)
│   └── api/                        # Routes API
│       ├── auth/login & register
│       ├── qr/create, list, delete
│       ├── user/delete             # Droit à l'effacement RGPD
│       └── cron/expire-qr          # Expiration automatique
├── components/
│   ├── layout/Header & Footer
│   ├── ads/AdBanner
│   └── rgpd/CookieBanner
├── lib/
│   ├── supabase.ts
│   └── email.ts
└── types/index.ts
```

## RGPD — Checklist
- [x] Bannière de consentement cookies
- [x] Politique de confidentialité
- [x] CGU avec droit de résiliation
- [x] Mentions légales
- [x] Opt-in marketing non pré-coché
- [x] Droit à l'effacement (API /user/delete)
- [x] Consentement horodaté en base
- [ ] Désigner un DPO (si >250 employés)
- [ ] Registre des traitements (document interne)
- [ ] Intégrer Google Consent Mode v2
