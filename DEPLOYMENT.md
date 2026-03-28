# Guide de déploiement

## Déploiement sur Vercel (Recommandé)

Vercel est la plateforme créée par l'équipe Next.js, offrant le meilleur support.

### Étape 1 : Préparer le repository

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/votre-username/claude-interface.git
git push -u origin main
```

### Étape 2 : Déployer sur Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "Import Project"
3. Sélectionnez votre repository GitHub
4. Configurez les variables d'environnement (optionnel) :
   - `NEXT_PUBLIC_CLAUDE_API_KEY`
   - `NEXT_PUBLIC_CLAUDE_API_URL`
5. Cliquez sur "Deploy"

### Étape 3 : Configuration des domaines

Vercel vous donnera un domaine gratuit `.vercel.app`. Vous pouvez aussi configurer un domaine personnalisé dans les paramètres du projet.

## Déploiement sur Netlify

### Méthode 1 : Via Git

1. Allez sur [netlify.com](https://netlify.com)
2. Cliquez sur "New site from Git"
3. Connectez votre repository
4. Configuration :
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Ajoutez les variables d'environnement
6. Déployez

### Méthode 2 : Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## Déploiement sur un VPS (Linux)

### Prérequis

- Serveur avec Node.js 18+
- Nginx
- PM2 pour la gestion des processus

### Installation

```bash
# Sur le serveur
git clone https://github.com/votre-username/claude-interface.git
cd claude-interface
npm install
npm run build

# Installer PM2
npm install -g pm2

# Démarrer l'application
pm2 start npm --name "claude-interface" -- start
pm2 save
pm2 startup
```

### Configuration Nginx

```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Déploiement Docker

### Dockerfile

Créez un `Dockerfile` :

```dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Build et run

```bash
docker build -t claude-interface .
docker run -p 3000:3000 claude-interface
```

### Docker Compose

Créez `docker-compose.yml` :

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

```bash
docker-compose up -d
```

## Variables d'environnement en production

Assurez-vous de configurer :

```env
NODE_ENV=production
NEXT_PUBLIC_CLAUDE_API_KEY=votre_clé_api
NEXT_PUBLIC_CLAUDE_API_URL=https://api.anthropic.com/v1
```

## Optimisations pour la production

### 1. Activer la compression

Dans `next.config.js` :

```javascript
const nextConfig = {
  compress: true,
  // ... autres options
}
```

### 2. Analyser le bundle

```bash
npm install @next/bundle-analyzer
```

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
```

### 3. Cache

Configurez les headers de cache appropriés dans `next.config.js`.

## Monitoring

### Vercel Analytics

Activez Vercel Analytics dans le dashboard Vercel pour un monitoring gratuit.

### Sentry

Pour le tracking des erreurs :

```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

## Sécurité

- [ ] Activez HTTPS (automatique sur Vercel/Netlify)
- [ ] Configurez CORS si nécessaire
- [ ] Utilisez des variables d'environnement pour les secrets
- [ ] Activez la protection CSRF
- [ ] Configurez les Content Security Policy headers

---

Pour plus d'informations, consultez :
- [Documentation Next.js Deployment](https://nextjs.org/docs/deployment)
- [Guide Vercel](https://vercel.com/docs)
