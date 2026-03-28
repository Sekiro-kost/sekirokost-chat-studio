# SekiroKost Chat Studio 🚀

Interface web moderne pour gérer vos conversations avec différents LLMs (Claude API, Ollama).

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## ✨ Features

- **100% Web** - Accessible depuis n'importe quel navigateur
- **Multi-Provider** - Anthropic Claude API ou Ollama (cloud/local)
- **Streaming en temps réel** ⚡ - Réponses affichées mot par mot (SSE)
- **Sessions persistantes** - Sauvegardées automatiquement dans le navigateur
- **Organisation intelligente** - Workspaces → Projets → Sessions
- **Backup automatique** - Export/Import + sauvegarde auto avec rotation 7 jours
- **Interface adaptive** - Affiche le bon nom de LLM selon le provider
- **Textarea flottante** - Écrivez pendant que vous scrollez
- **Notifications visuelles** - Flash + indicateur coloré quand le LLM répond
- **Suivi des tokens** - Monitoring temps réel (input/output/total)
- **Calcul des coûts** - Estimation pour Claude API
- **Design moderne** - Tailwind CSS, animations fluides
- **Gestion d'état** - Zustand avec persistence localStorage

## 🎯 Technologies

- **Framework** : Next.js 14 (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS
- **State Management** : Zustand avec persistence localStorage
- **Icons** : Lucide React
- **Backend** : Edge Runtime API Routes
- **LLMs** : Claude API + Ollama (cloud & local)

## 🚀 Installation

```bash
# Cloner le repository
git clone https://github.com/VOTRE_USERNAME/sekirokost-chat-studio.git
cd sekirokost-chat-studio

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📖 Utilisation

### 1. Choisir votre LLM

Allez dans **Paramètres** ⚙️ et choisissez :
- **Anthropic API** : Claude officiel (payant, excellent)
- **Ollama** : Gratuit (cloud rapide ou local privé)

### 2. Créer un Workspace

Cliquez sur "Nouveau workspace" dans la sidebar. Chaque workspace a une couleur unique.

### 3. Ajouter un Projet

Survolez un workspace et cliquez sur l'icône "+" pour ajouter un projet.

### 4. Créer une Session

Survolez un projet et cliquez sur l'icône "+" pour créer une nouvelle session de chat.

### 5. Discuter

- Sélectionnez une session
- Tapez votre message dans la textarea en bas
- Appuyez sur **Entrée** pour envoyer (Shift+Entrée pour nouvelle ligne)
- L'indicateur montre le statut : vert (prêt), jaune (traitement)
- Flash visuel quand le LLM a terminé

## 💾 Sauvegarde & Backup

L'interface dispose d'un **système de backup complet** :

### Export/Import Manuel

1. **Paramètres** → Section "Sauvegarde & Export"
2. **Exporter** : Télécharge un JSON avec toutes vos données
3. **Importer** : Restaure depuis un fichier JSON

### Backup Automatique

- Configurez le dossier de sauvegarde
- Cliquez sur "Backup" pour créer une sauvegarde
- **Rotation automatique** : garde les 7 derniers jours
- Liste des backups avec suppression individuelle

> 📖 Guide complet : [BACKUP.md](BACKUP.md)

## 🏗️ Structure du Projet

```
sekirokost-chat-studio/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   ├── claude/          # Proxy Claude API
│   │   ├── ollama/          # Proxy Ollama
│   │   └── backup/          # Système de backup
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Page d'accueil
│   └── globals.css          # Styles globaux
├── components/              # Composants React
│   ├── Sidebar.tsx          # Navigation et organisation
│   ├── ChatView.tsx         # Interface de chat
│   ├── StatusIndicator.tsx  # Indicateur d'état LLM
│   ├── TokenCounter.tsx     # Compteur de tokens + coût
│   ├── SettingsPanel.tsx    # Configuration & Backup
│   ├── WelcomeScreen.tsx    # Écran d'accueil
│   └── HelpPanel.tsx        # Panneau d'aide
├── store/                   # Gestion d'état
│   └── useAppStore.ts       # Store Zustand avec persistence
├── hooks/                   # React Hooks
│   └── useClaude.ts         # Hook multi-provider
├── lib/                     # Utilitaires
│   ├── utils.ts             # Helpers (pricing, etc.)
│   ├── ollama.ts            # Config modèles Ollama
│   ├── backup.ts            # Export/Import/Backup
│   └── demo.ts              # Données de démo
├── types/                   # Définitions TypeScript
│   └── index.ts             # Types globaux
└── scripts/                 # Scripts utilitaires
    └── auto-backup.js       # Script backup automatique
```

## 🔧 Configuration

### API Claude (Optionnel)

**Méthode 1 : Via l'interface (Recommandé)**

1. Cliquez sur **"Paramètres"** dans la sidebar
2. Obtenez une clé API sur [console.anthropic.com](https://console.anthropic.com/settings/keys)
3. Collez votre clé dans le champ prévu
4. Testez la connexion
5. Sauvegardez !

Votre clé est stockée de manière sécurisée dans le localStorage de votre navigateur.

**Méthode 2 : Via fichier .env.local**

Créez un fichier `.env.local` à la racine :

```env
# API Claude (optionnel - préférez l'interface)
NEXT_PUBLIC_CLAUDE_API_KEY=your_api_key_here
NEXT_PUBLIC_CLAUDE_API_URL=https://api.anthropic.com/v1
```

> 📖 Pour plus de détails, consultez [CLAUDE_API_SETUP.md](CLAUDE_API_SETUP.md)

### Ollama - LLMs Locaux (Gratuit)

**Ollama** vous permet d'utiliser des modèles de langage **gratuitement et en local** :

✅ **100% gratuit et illimité**  
✅ **Privé** - Vos conversations restent sur votre machine  
✅ **Fonctionne hors ligne** (une fois les modèles téléchargés)  

**Installation rapide :**

```bash
# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.ai/install.sh | sh

# Windows : téléchargez depuis ollama.ai/download
```

**Choisissez un modèle :**

```bash
# Modèles Cloud (recommandés, aucun téléchargement)
# Utilisez-les directement dans l'interface !
kimi-k2.5:cloud
qwen3.5:cloud
glm-5:cloud

# Ou modèles Locaux (confidentialité maximale)
ollama pull qwen3.5
ollama pull glm-4.7-flash
```

**Configuration dans l'interface :**

1. Cliquez sur **"Paramètres"** dans la sidebar
2. Sélectionnez **"Ollama Local"** comme provider
3. L'URL `http://localhost:11434` devrait fonctionner automatiquement
4. Choisissez un modèle :
   - **Cloud** (immédiat) : `kimi-k2.5:cloud` ou `qwen3.5:cloud`
   - **Local** (privé) : `qwen3.5` ou `glm-4.7-flash`
5. Testez la connexion et sauvegardez !

> 📖 Guide complet : [OLLAMA.md](OLLAMA.md) (comparaison des modèles, performances, dépannage)

**Quand utiliser Ollama vs Claude API ?**

| Critère | Claude API | Ollama |
|---------|------------|--------|
| Coût | Payant | **Gratuit** ✅ |
| Performance | Excellent | Bon |
| Vitesse | Très rapide | Moyen |
| Privacité | Cloud | **100% local** ✅ |
| Internet | Requis | **Optionnel** ✅ |

**Recommandation** : Utilisez Ollama pour tester gratuitement, Claude API pour les tâches complexes.

## 🎨 Personnalisation

### Couleurs des workspaces

Les couleurs sont auto-assignées parmi :
- Bleu (`#3b82f6`)
- Rouge (`#ef4444`)
- Vert (`#10b981`)
- Violet (`#8b5cf6`)
- Orange (`#f59e0b`)
- Rose (`#ec4899`)

### Animations

- **Flash de notification** : 3 flashs de 0.5s quand Claude termine
- **Point vert pulsant** : Animation continue en mode idle
- **Point jaune pulsant** : Pendant le traitement

## 🚧 Roadmap

### ✅ Fonctionnalités implémentées

- [x] Intégration API Claude réelle
- [x] Support multi-provider (Anthropic + Ollama)
- [x] 8 modèles Ollama (6 cloud, 2 local)
- [x] Export/Import/Auto-backup de sessions
- [x] Calcul du coût en temps réel (Claude API)
- [x] Indicateur de statut dynamique
- [x] Système de backup avec rotation (7 jours)
- [x] **Streaming SSE des réponses en temps réel** ✨

### 📋 À venir

- [ ] Recherche dans l'historique
- [ ] Thème clair
- [ ] Raccourcis clavier
- [ ] Statistiques détaillées (graphiques)
- [ ] Tags et filtres pour sessions
- [ ] Support GPT-4 / OpenAI
- [ ] Historique de révisions par message
- [ ] Bouton Stop pour interrompre la génération

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Lucide Icons](https://lucide.dev/)
- [Anthropic Claude](https://www.anthropic.com/)
- [Ollama](https://ollama.com/) - Pour l'accès aux modèles locaux et cloud

## 📧 Contact

Julien - [@julien](https://github.com/julien)

Project Link: [https://github.com/julien/sekirokost-chat-studio]
---

⭐ N'oubliez pas de star le projet si vous le trouvez utile !
