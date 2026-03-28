# Commandes Utiles - Claude Interface

## 🚀 Développement

### Installation
```bash
# Installation standard
npm install

# Installation avec cache clean (si problèmes)
npm ci

# Installation avec script automatique
chmod +x setup.sh
./setup.sh
```

### Démarrage
```bash
# Mode développement (port 3000)
npm run dev

# Mode développement sur port custom
PORT=3001 npm run dev

# Mode développement avec turbo
npm run dev -- --turbo
```

### Build & Production
```bash
# Build pour production
npm run build

# Démarrer en mode production (après build)
npm start

# Build + Démarrage
npm run build && npm start

# Vérifier la taille du bundle
ANALYZE=true npm run build
```

### Qualité du Code
```bash
# Lint
npm run lint

# Lint avec auto-fix
npm run lint -- --fix

# Type check seulement
npx tsc --noEmit

# Formattage (si Prettier ajouté)
npm run format
```

## 🧪 Tests (à configurer)

```bash
# Tests unitaires
npm test

# Tests en mode watch
npm test -- --watch

# Coverage
npm test -- --coverage

# Tests E2E
npm run test:e2e
```

## 📦 Gestion des Dépendances

```bash
# Vérifier les mises à jour
npm outdated

# Mettre à jour de façon interactive
npx npm-check-updates -i

# Mettre à jour tout (attention!)
npx npm-check-updates -u && npm install

# Audit de sécurité
npm audit

# Fix automatique des vulnérabilités
npm audit fix

# Nettoyer node_modules et réinstaller
rm -rf node_modules package-lock.json && npm install
```

## 🔍 Debugging

```bash
# Debug mode Next.js
NODE_OPTIONS='--inspect' npm run dev

# Verbose logging
DEBUG=* npm run dev

# Vérifier les variables d'environnement
npm run env

# Analyser le bundle
npm run analyze
```

## 🐳 Docker (si configuré)

```bash
# Build image
docker build -t claude-interface .

# Run container
docker run -p 3000:3000 claude-interface

# Docker Compose
docker-compose up -d

# Logs
docker-compose logs -f

# Stop
docker-compose down
```

## 🚢 Déploiement

### Vercel
```bash
# Installer Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy preview
vercel

# Deploy production
vercel --prod

# Rollback
vercel rollback
```

### Netlify
```bash
# Installer Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy production
netlify deploy --prod
```

### Git & GitHub
```bash
# Init repo
git init

# Premier commit
git add .
git commit -m "Initial commit: Claude Interface"

# Ajouter remote (remplacer URL)
git remote add origin https://github.com/VOTRE-USERNAME/claude-interface.git

# Push
git push -u origin main

# Créer nouvelle branche
git checkout -b feature/nouvelle-feature

# Pull request
gh pr create # (nécessite GitHub CLI)
```

## 🛠️ Utilitaires

### Nettoyage
```bash
# Nettoyer .next et cache
rm -rf .next

# Nettoyer tout + réinstaller
rm -rf .next node_modules package-lock.json && npm install

# Nettoyer le cache npm
npm cache clean --force
```

### Génération
```bash
# Générer un nouveau composant (exemple)
npx plop component NouveauComposant

# Générer types depuis API (si GraphQL)
npm run generate:types
```

### Performance
```bash
# Lighthouse audit
npx lighthouse http://localhost:3000 --view

# Bundle analyzer
npx webpack-bundle-analyzer .next/analyze/client.json

# Check bundle size
npx bundlesize
```

## 📊 Monitoring

```bash
# Logs en temps réel
tail -f .next/*.log

# Performance metrics
npm run analyze:performance

# Memory usage
node --inspect-brk node_modules/.bin/next dev
```

## 🔐 Sécurité

```bash
# Audit de sécurité
npm audit

# Fix vulnérabilités
npm audit fix

# Check licences
npx license-checker

# Vérifier les dépendances obsolètes
npx depcheck
```

## 🎨 Assets

```bash
# Optimiser les images (si ajoutées)
npx @squoosh/cli --webp auto images/*.{jpg,png}

# Générer favicons
npx favicon-generator

# Compresser SVG
npx svgo -f public/icons
```

## 💡 Tips & Tricks

### Raccourcis Utiles
```bash
# Alias à ajouter dans ~/.zshrc ou ~/.bashrc
alias nrd="npm run dev"
alias nrb="npm run build"
alias nrl="npm run lint"
alias ni="npm install"
alias nci="npm ci"

# Recharger le shell
source ~/.zshrc
```

### Variables d'environnement locales
```bash
# Créer .env.local
cp .env.example .env.local

# Éditer avec éditeur par défaut
${EDITOR:-nano} .env.local
```

### Git hooks (si Husky ajouté)
```bash
# Skip hooks temporairement
git commit --no-verify -m "message"

# Réinstaller hooks
npx husky install
```

## 🆘 Troubleshooting

### Port déjà utilisé
```bash
# Trouver le process sur port 3000
lsof -ti:3000

# Kill le process
kill -9 $(lsof -ti:3000)

# Ou utiliser un autre port
PORT=3001 npm run dev
```

### Erreurs de cache
```bash
# Nettoyer cache Next.js
rm -rf .next

# Nettoyer cache npm
npm cache clean --force

# Tout réinstaller
rm -rf node_modules package-lock.json .next && npm install
```

### Erreurs TypeScript
```bash
# Rebuild types
rm -rf .next && npm run dev

# Check types sans builder
npx tsc --noEmit
```

### Module not found
```bash
# Vérifier l'installation
npm list nom-du-module

# Réinstaller
npm install nom-du-module

# Forcer la réinstallation
rm -rf node_modules && npm install
```

## 📚 Ressources

- [Next.js CLI](https://nextjs.org/docs/api-reference/cli)
- [npm CLI](https://docs.npmjs.com/cli/)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Git Cheatsheet](https://education.github.com/git-cheat-sheet-education.pdf)

---

**Dernière mise à jour** : 28 Mars 2026
