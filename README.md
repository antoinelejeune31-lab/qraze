# qr-generator-site

Quickstart local

Prérequis
- Node (recommandé via nvm) - version moderne (ex: 18+)

1) Copier `.env.example` → `.env.local` et remplir les valeurs :
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- RESEND_API_KEY
- NEXT_PUBLIC_APP_NAME
- NEXT_PUBLIC_APP_URL
- CRON_SECRET
- NEXT_PUBLIC_ADSENSE_CLIENT (optionnel)

2) Installer les dépendances et lancer en dev :

```bash
npm install
npm run dev
```

3) Build / Start production :

```bash
npm run build
npm run start
```

Notes
- Si `npm run build` échoue à cause d'une variable manquante, remplissez `.env.local`.
- Évitez `npm audit fix --force` sur la branche principale sans tests : il peut upgrader des versions majeures (Next.js) et créer des ruptures.

Fichiers utiles
- `.vscode/tasks.json`, `.vscode/launch.json` : helpers pour lancer le serveur depuis VS Code.

Contact
- Si vous voulez que je restaure le contenu complet des pages RGPD ou du formulaire d'inscription (plutôt que les versions minimales), dites-moi quels textes insérer.
