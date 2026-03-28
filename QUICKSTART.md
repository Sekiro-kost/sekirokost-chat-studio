# Claude Interface - Guide de démarrage rapide

## Installation en 3 étapes

### 1. Installation des dépendances

```bash
npm install
```

### 2. Lancement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

### 3. Configuration (Optionnel)

**Option A : Anthropic Claude API (Payant)**

Via l'interface :
1. Cliquez sur ⚙️ **Paramètres** dans la sidebar
2. Sélectionnez **"Anthropic API"**
3. Obtenez votre clé API sur [console.anthropic.com](https://console.anthropic.com/)
4. Collez-la et testez la connexion
5. Sauvegardez !

**Option B : Ollama (Gratuit & Local)**

Installation :
```bash
# macOS
brew install ollama

# Pour modèles locaux (optionnel)
ollama pull qwen3.5
```

Configuration :
1. Cliquez sur ⚙️ **Paramètres**
2. Sélectionnez **"Ollama Local"**
3. Choisissez un modèle :
   - Cloud (rapide) : `kimi-k2.5:cloud` ⭐
   - Local (privé) : `qwen3.5`
4. Testez la connexion et sauvegardez !

> 📖 Guide complet Ollama : [OLLAMA.md](OLLAMA.md)

**Sans configuration :** L'app fonctionne en mode simulation par défaut.

## Premiers pas

1. **Test avec données de démo** : Cliquez sur "Essayer avec des données de démo" à l'écran de bienvenue
2. **Ou créez votre workspace** : Cliquez sur "Nouveau workspace" dans la sidebar

## Structure rapide

```
Workspace (ex: "Projets Web")
  └── Projet (ex: "E-commerce")
      └── Session (ex: "Refactoring checkout")
          └── Messages (vos conversations)
```

## Raccourcis

- **Entrée** : Envoyer le message
- **Shift + Entrée** : Nouvelle ligne dans le message

## Fonctionnalités clés

✅ Textarea fixe - écrivez pendant que vous scrollez  
✅ Point vert - indicateur d'état de Claude  
✅ Flash - notification visuelle à la fin  
✅ Tokens - suivi en temps réel de la consommation  
✅ Persistence - tout est sauvegardé automatiquement  

## Besoin d'aide ?

Consultez le [README.md](README.md) complet ou ouvrez une [issue](https://github.com/julien/claude-interface/issues).

Bon coding ! 🚀
