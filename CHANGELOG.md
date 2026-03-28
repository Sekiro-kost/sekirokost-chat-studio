# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [Non publié]

### À venir
- Intégration API Claude réelle
- WebSocket pour streaming des réponses
- Export/Import de sessions
- Recherche dans l'historique

## [0.1.0] - 2026-03-28

### ✨ Ajouté

#### Features principales
- Interface web responsive pour gérer les sessions Claude Code
- Organisation hiérarchique : Workspaces > Projets > Sessions
- Persistence automatique dans localStorage
- Textarea fixe qui reste visible pendant le scroll
- Notifications visuelles (flash à l'écran) quand Claude termine
- Indicateur d'état avec point vert/jaune dans le menu
- Suivi en temps réel de la consommation de tokens (input/output/total)

#### UI/UX
- Design moderne avec thème sombre
- Sidebar avec navigation par workspaces/projets/sessions
- Vue de chat avec messages scrollables
- Écran de bienvenue pour nouveaux utilisateurs
- Données de démo pour tester rapidement
- Animations fluides (flash, pulse, transitions)
- Couleurs auto-assignées aux workspaces
- Support Shift+Entrée pour multi-lignes dans textarea

#### Composants
- `Sidebar` - Navigation et organisation
- `ChatView` - Interface de chat principale
- `StatusIndicator` - Indicateur d'état visuel
- `TokenCounter` - Affichage de la consommation
- `WelcomeScreen` - Écran d'accueil
- `StatsPanel` - Panneau de statistiques

#### Architecture
- Next.js 14 avec App Router
- TypeScript pour le typage
- Zustand pour la gestion d'état
- Tailwind CSS pour le styling
- Structure modulaire et maintenable

#### DevOps & Tooling
- Configuration ESLint
- GitHub Actions CI/CD
- Script d'installation automatique
- Configuration Vercel pour déploiement
- Hot reload en développement

### 📚 Documentation
- README complet avec exemples
- Guide de démarrage rapide (QUICKSTART.md)
- Guide de contribution (CONTRIBUTING.md)
- Architecture détaillée (ARCHITECTURE.md)
- Guide de déploiement (DEPLOYMENT.md)
- Liste des tâches (TODO.md)
- Résumé du projet (PROJECT_SUMMARY.md)
- Licence MIT

### 🔧 Infrastructure
- Configuration TypeScript
- Configuration Tailwind CSS
- Configuration PostCSS
- ESLint rules
- Git ignore
- Variables d'environnement (.env.example)

### 🎨 Design System
- Palette de couleurs cohérente
- Animations personnalisées (flash, pulse-green)
- Scrollbar custom
- Responsive breakpoints
- Icônes Lucide React

## [0.0.1] - 2026-03-28

### Ajouté
- Initialisation du projet
- Setup de base Next.js + TypeScript

---

## Types de changements

- `✨ Ajouté` - Nouvelles fonctionnalités
- `🔄 Modifié` - Changements dans les fonctionnalités existantes
- `❌ Déprécié` - Fonctionnalités dépréciées (à supprimer)
- `🗑️ Supprimé` - Fonctionnalités supprimées
- `🐛 Corrigé` - Corrections de bugs
- `🔒 Sécurité` - Correctifs de sécurité

## Liens

[Non publié]: https://github.com/julien/claude-interface/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/julien/claude-interface/releases/tag/v0.1.0
[0.0.1]: https://github.com/julien/claude-interface/releases/tag/v0.0.1
