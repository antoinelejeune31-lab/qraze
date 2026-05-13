Guide de déploiement sur Vercel

1) Pré-requis
- Avoir un compte GitHub (ou GitLab/Bitbucket) et y pousser la branche.
- Avoir un compte Vercel (https://vercel.com) et se connecter avec GitHub.

2) Push de la branche locale
# (exécuter localement)

git remote add origin git@github.com:<your-username>/<your-repo>.git
git push -u origin fix/qr-generator

3) Importer sur Vercel
- Sur Vercel, cliquer sur "New Project" → Import from Git → choisir le repo.
- Branch: `fix/qr-generator` ou `main` selon ton workflow.

4) Variables d'environnement (securisées)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY (DO NOT expose to client)
- RESEND_API_KEY
- NEXT_PUBLIC_APP_NAME
- NEXT_PUBLIC_APP_URL
- CRON_SECRET
- NEXT_PUBLIC_ADSENSE_CLIENT

Ajoute ces variables via Settings → Environment Variables dans Vercel (Production / Preview / Development selon besoin).

5) Déploiement
- Vercel détecte Next.js automatiquement. Lancer le déploiement.

6) Notes
- Garde les clés sensibles dans l'interface Vercel (ne les commit pas dans le repo).
- Si tu veux des URLs custom, configure un domaine dans Vercel et mets à jour les DNS.

Commandes utiles (local):
```bash
# installer vercel cli
npm i -g vercel
vercel login
# déployer (interactive) depuis le dossier du projet
vercel --prod
```