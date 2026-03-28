# SekiroKost Chat Studio 🚀

Une interface web moderne et intuitive pour organiser et gérer toutes vos sessions Claude Code.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## ✨ Features

- **100% Web** - Accessible depuis n'importe quel navigateur, n'importe où
- **Multi-Provider** - Anthropic Claude API ou Ollama (LLMs locaux gratuits)
- **Sessions persistantes** - Les sessions continuent à tourner même quand vous fermez le navigateur
- **Organisation intelligente** - Organisez vos sessions par workspaces et projets
- **Textarea flottante** - Saisissez vos prompts pendant que vous scrollez les réponses de Claude
- **Notifications visuelles** - Flash à l'écran et point vert dans le menu quand Claude a terminé
- **Suivi des tokens** - Monitoring en temps réel de la consommation de tokens (input/output/total)
- **Calcul des coûts** - Estimation des coûts pour l'API Claude
- **Interface moderne** - Design sombre et minimaliste avec Tailwind CSS
- **Gestion d'état performante** - Utilise Zustand avec persistence locale

## 🎯 Technologies

- **Framework** : Next.js 14 (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS
- **State Management** : Zustand avec persistence
- **Icons** : Lucide React
- **Temps réel** : Socket.io (prêt pour intégration)

## 🚀 Installation

```bash
# Cloner le repository
git clone https://github.com/julien/claude-interface.git
cd claude-interface

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📖 Utilisation

### 1. Créer un Workspace

Cliquez sur "Nouveau workspace" dans la sidebar et donnez-lui un nom. Chaque workspace a une couleur unique.

### 2. Ajouter un Projet

Survolez un workspace et cliquez sur l'icône "+" pour ajouter un projet.

### 3. Créer une Session

Survolez un projet et cliquez sur l'icône "+" pour créer une nouvelle session de chat.

### 4. Discuter avec Claude

- Sélectionnez une session
- Tapez votre message dans la textarea en bas
- Appuyez sur Entrée pour envoyer (Shift+Entrée pour une nouvelle ligne)
- Le point vert devient jaune pendant le traitement
- Un flash apparaît quand Claude a terminé

## 🏗️ Structure du Projet

```
claude-interface/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   └── globals.css        # Styles globaux
├── components/            # Composants React
│   ├── Sidebar.tsx        # Navigation et organisation
│   ├── ChatView.tsx       # Interface de chat
│   ├── StatusIndicator.tsx # Indicateur d'état
│   └── TokenCounter.tsx   # Compteur de tokens
├── store/                 # Gestion d'état
│   └── useAppStore.ts     # Store Zustand principal
├── types/                 # Définitions TypeScript
│   └── index.ts           # Types globaux
└── lib/                   # Utilitaires
    └── utils.ts           # Fonctions helper
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

- [ ] Intégration API Claude réelle
- [ ] WebSocket pour streaming des réponses
- [ ] Export/Import de sessions
- [ ] Recherche dans l'historique
- [ ] Thème clair
- [ ] Raccourcis clavier
- [ ] Multi-utilisateurs
- [ ] Statistiques détaillées
- [ ] Tags et filtres

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

## 📧 Contact

Julien - [@julien](https://github.com/julien)

Project Link: [https://github.com/julien/claude-interface](https://github.com/julien/claude-interface)

---

⭐ N'oubliez pas de star le projet si vous le trouvez utile !
