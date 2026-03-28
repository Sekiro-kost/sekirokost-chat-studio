# Structure du Projet - Claude Interface

Documentation complète de tous les fichiers et leur rôle.

## 📁 Racine du Projet

| Fichier | Description |
|---------|-------------|
| `package.json` | Dépendances NPM et scripts du projet |
| `tsconfig.json` | Configuration TypeScript |
| `next.config.js` | Configuration Next.js |
| `tailwind.config.ts` | Configuration Tailwind CSS (thème, couleurs, animations) |
| `postcss.config.js` | Configuration PostCSS pour Tailwind |
| `.eslintrc.json` | Règles ESLint pour la qualité du code |
| `.gitignore` | Fichiers à ignorer par Git |
| `.env.example` | Template des variables d'environnement |
| `vercel.json` | Configuration pour déploiement Vercel |
| `setup.sh` | Script d'installation automatique (exécutable) |
| `LICENSE` | Licence MIT du projet |

## 📚 Documentation (Markdown)

| Fichier | Description |
|---------|-------------|
| `README.md` | Documentation principale du projet |
| `QUICKSTART.md` | Guide de démarrage rapide (3 étapes) |
| `ARCHITECTURE.md` | Architecture technique et choix de design |
| `DEPLOYMENT.md` | Guide de déploiement (Vercel, Netlify, Docker, VPS) |
| `CONTRIBUTING.md` | Guide pour les contributeurs |
| `TODO.md` | Liste des tâches à faire, organisée par priorité |
| `CHANGELOG.md` | Historique des versions et changements |
| `COMMANDS.md` | Commandes utiles pour le développement |
| `PROJECT_SUMMARY.md` | Résumé complet du projet |
| `FILE_STRUCTURE.md` | Ce fichier - Description de tous les fichiers |

## 🎨 Application (`app/`)

Next.js App Router - Dossier principal de l'application.

| Fichier | Description |
|---------|-------------|
| `app/layout.tsx` | Layout racine, wrapper de toute l'app |
| `app/page.tsx` | Page d'accueil (route `/`) |
| `app/globals.css` | Styles CSS globaux + directives Tailwind |

## 🧩 Composants (`components/`)

Composants React réutilisables.

| Fichier | Description | Props Principales |
|---------|-------------|-------------------|
| `Sidebar.tsx` | Navigation latérale avec workspaces/projets/sessions | - |
| `ChatView.tsx` | Vue principale de chat avec messages et textarea | - |
| `StatusIndicator.tsx` | Indicateur visuel d'état de Claude (point vert/jaune + flash) | - |
| `TokenCounter.tsx` | Affichage de la consommation de tokens | - |
| `WelcomeScreen.tsx` | Écran de bienvenue pour nouveaux utilisateurs | - |
| `StatsPanel.tsx` | Panneau de statistiques (workspaces, sessions, messages, tokens) | - |

### Détails des Composants

**Sidebar** : 
- Gestion des workspaces (création, sélection, suppression)
- Gestion des projets (création, sélection, suppression)
- Gestion des sessions (création, sélection, suppression)
- Arborescence interactive avec états actifs

**ChatView** :
- Affichage des messages avec scroll auto
- Textarea fixe en bas de page
- Support Shift+Enter pour multiligne
- Indicateurs de statut (traitement en cours)
- Intégration TokenCounter

**StatusIndicator** :
- Point vert quand Claude est idle
- Point jaune pulsant quand Claude traite
- Flash de l'écran quand Claude termine
- Position fixed en haut à droite

**TokenCounter** :
- Affichage Input/Output/Total
- Formatage intelligent (K, M)
- Couleurs différenciées
- Icône Zap

**WelcomeScreen** :
- Affichage conditionnel (seulement si aucun workspace)
- Option démo avec données pré-remplies
- Option démarrage de zéro
- Modal fullscreen

**StatsPanel** :
- Statistiques globales en temps réel
- Grid responsive 2-4 colonnes
- Icônes pour chaque métrique

## 🔧 Store (`store/`)

Gestion d'état globale avec Zustand.

| Fichier | Description |
|---------|-------------|
| `useAppStore.ts` | Store principal avec toute la logique d'état |

### État Géré

- `workspaces[]` - Liste de tous les workspaces
- `currentWorkspaceId` - ID du workspace actif
- `currentProjectId` - ID du projet actif
- `currentSessionId` - ID de la session active
- `isClaudeProcessing` - État de traitement de Claude
- `shouldFlash` - Déclencheur d'animation flash

### Actions Disponibles

- `addWorkspace(name, color)` - Créer workspace
- `addProject(workspaceId, name, desc)` - Créer projet
- `addSession(projectId, name)` - Créer session
- `addMessage(sessionId, message)` - Ajouter message
- `updateSessionStatus(sessionId, status)` - MAJ statut
- `updateTokenUsage(sessionId, tokens)` - MAJ tokens
- `setCurrentWorkspace/Project/Session(id)` - Navigation
- `deleteWorkspace/Project/Session(id)` - Suppression
- `getCurrentSession()` - Getter session active

## 📝 Types (`types/`)

Définitions TypeScript.

| Fichier | Description |
|---------|-------------|
| `index.ts` | Tous les types et interfaces |

### Types Principaux

```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  tokenCount?: number;
}

interface Session {
  id: string;
  name: string;
  workspaceId: string;
  projectId?: string;
  messages: Message[];
  status: 'idle' | 'processing' | 'completed' | 'error';
  tokenUsage: { input, output, total };
  createdAt: Date;
  updatedAt: Date;
}

interface Project {
  id: string;
  name: string;
  description?: string;
  sessions: Session[];
  createdAt: Date;
}

interface Workspace {
  id: string;
  name: string;
  color: string;
  projects: Project[];
  createdAt: Date;
}
```

## 🎣 Hooks (`hooks/`)

Custom React hooks.

| Fichier | Description |
|---------|-------------|
| `useClaude.ts` | Hook pour interaction avec API Claude |

### Hook useClaude

```typescript
const { sendMessage, isLoading, error } = useClaude();
```

- `sendMessage(sessionId, message, history)` - Envoyer un message
- `isLoading` - État de chargement
- `error` - Message d'erreur éventuel

**Note** : Actuellement en mode simulation. Décommenter le code pour activer l'API réelle.

## 🛠️ Lib (`lib/`)

Fonctions utilitaires et helpers.

| Fichier | Description |
|---------|-------------|
| `utils.ts` | Fonctions utilitaires générales |
| `demo.ts` | Génération de données de démo |
| `polyfills.ts` | Polyfills pour compatibilité |

### Fonctions utils.ts

- `cn(...inputs)` - Merge de classes CSS (clsx + tailwind-merge)
- `formatTokenCount(count)` - Formatage K/M pour tokens
- `formatDate(date)` - Formatage relatif français ("il y a 2h")

### Fonctions demo.ts

- `initializeDemoData()` - Créer workspace/projet/session avec messages exemple

## ⚙️ GitHub (`/.github/`)

Configuration CI/CD.

| Fichier | Description |
|---------|-------------|
| `.github/workflows/ci.yml` | Pipeline GitHub Actions (lint + build) |

### Pipeline CI

- Trigger : Push/PR sur main et develop
- Matrix : Node 18 et 20
- Steps : Checkout → Install → Lint → Build

## 📊 Hiérarchie des Données

```
App Store (Zustand + localStorage)
    └── workspaces: Workspace[]
            └── Workspace
                ├── id: string
                ├── name: string
                ├── color: string
                └── projects: Project[]
                        └── Project
                            ├── id: string
                            ├── name: string
                            └── sessions: Session[]
                                    └── Session
                                        ├── id: string
                                        ├── name: string
                                        ├── status: Status
                                        ├── tokenUsage: Tokens
                                        └── messages: Message[]
                                                └── Message
                                                    ├── id: string
                                                    ├── role: Role
                                                    ├── content: string
                                                    └── timestamp: Date
```

## 🎨 Design Tokens (Tailwind)

### Couleurs Principales

```css
--background: #0a0a0a (zinc-950)
--surface: #18181b (zinc-900)
--border: #27272a (zinc-800)
--text: #ededed (foreground)
--accent: #3b82f6 (blue-600)
```

### Animations Custom

- `animate-flash` - 3 flashs de 0.5s
- `animate-pulse-green` - Pulse continu du point vert

## 🔄 Flow de Données

### Création d'une Session

```
User Click → Sidebar.handleAddSession() 
    → useAppStore.addSession(projectId, name)
        → State Update
            → Zustand persist middleware
                → localStorage['claude-interface-storage']
```

### Envoi d'un Message

```
User Submit → ChatView.handleSubmit()
    → useAppStore.addMessage(sessionId, message)
    → useAppStore.updateSessionStatus('processing')
    → useClaude.sendMessage()
        → (Simulation 2s / ou API Claude)
    → useAppStore.addMessage(response)
    → useAppStore.updateTokenUsage()
    → useAppStore.updateSessionStatus('completed')
        → triggerFlash()
            → StatusIndicator animation
```

## 📦 Dépendances Principales

### Production
- `next@14.2.3` - Framework
- `react@18.3.1` - UI Library
- `zustand@4.5.2` - State Management
- `tailwindcss@3.4.3` - Styling
- `lucide-react@0.379.0` - Icons
- `socket.io-client@4.7.5` - WebSocket (ready)
- `date-fns@3.6.0` - Date formatting

### Development
- `typescript@5` - Type checking
- `eslint@8` - Linting
- `autoprefixer@10.4.19` - CSS prefixes

## 🚀 Scripts NPM

| Script | Commande | Description |
|--------|----------|-------------|
| `dev` | `next dev` | Démarre serveur dev port 3000 |
| `build` | `next build` | Build pour production |
| `start` | `next start` | Démarre serveur production |
| `lint` | `next lint` | Vérifie qualité du code |

## 🔒 Fichiers Sensibles (.gitignore)

- `node_modules/` - Dépendances
- `.next/` - Build Next.js
- `.env.local` - Variables d'environnement locales (JAMAIS commit)
- `*.log` - Logs
- `.DS_Store` - Fichiers système macOS

## 📏 Métriques du Projet

- **Total fichiers** : 36
- **Total lignes de code** : ~2500+
- **Composants React** : 7
- **Hooks custom** : 1
- **Types TypeScript** : 5 interfaces principales
- **Documentation** : 10 fichiers MD
- **Taille estimée** : ~500KB (avant node_modules)

---

**Date de création** : 28 Mars 2026  
**Dernière mise à jour** : 28 Mars 2026  
**Version** : 0.1.0
