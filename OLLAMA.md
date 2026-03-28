# Guide Ollama - LLMs Locaux Gratuits

## Qu'est-ce qu'Ollama ?

**Ollama** est une plateforme qui permet d'utiliser des **modèles de langage (LLM)** de deux façons :

1. **Modèles Cloud** : Hébergés par Ollama, rapides, pas de téléchargement (gratuits avec internet)
2. **Modèles Locaux** : Exécutés sur votre machine, privés, hors ligne

Contrairement à l'API Claude qui nécessite des crédits payants, Ollama est **100% gratuit**.

## Avantages d'Ollama

✅ **Gratuit et illimité** : Pas de frais, pas de limite d'utilisation  
✅ **Cloud ou Local** : Choisissez entre rapidité cloud ou confidentialité locale  
✅ **Hors ligne possible** : Les modèles locaux fonctionnent sans internet  
✅ **Open Source** : Transparent et personnalisable  

## Inconvénients vs Claude API

⚠️ **Moins performant** : Les modèles open source sont moins puissants que Claude 3.5 Sonnet  
⚠️ **Plus lent** : Dépend de votre machine (CPU/GPU)  
⚠️ **Consomme des ressources** : RAM et batterie si sur laptop  

---

## Installation

### macOS

```bash
# Télécharger depuis le site officiel
open https://ollama.ai/download

# Ou via Homebrew
brew install ollama
```

### Linux

```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### Windows

Téléchargez l'installeur depuis [ollama.ai/download](https://ollama.ai/download)

---

## Démarrage

Ollama se lance automatiquement après installation. Pour vérifier :

```bash
# Test si Ollama tourne
curl http://localhost:11434
# Devrait retourner "Ollama is running"
```

Si Ollama n'est pas démarré :

```bash
ollama serve
```

---

## Types de modèles

### ☁️ Modèles Cloud (Recommandés pour commencer)

**Avantages** :
- ✅ Pas de téléchargement (disponibles immédiatement)
- ✅ Très rapides (hébergés sur serveurs puissants)
- ✅ Aucun impact sur votre machine (RAM, CPU, disque)
- ✅ Gratuits avec connexion internet

**Modèles disponibles** :
- **kimi-k2.5:cloud** - Raisonnement multimodal avec sous-agents ⭐
- **qwen3.5:cloud** - Raisonnement, code et vision ⭐
- **glm-5:cloud** - Génération de code
- **minimax-m2.7:cloud** - Rapide et efficace

**Utilisation** : Sélectionnez-les directement dans l'interface, rien à télécharger !

### 💻 Modèles Locaux (Pour confidentialité maximale)

**Avantages** :
- ✅ 100% privé (données jamais envoyées)
- ✅ Fonctionne hors ligne
- ✅ Contrôle total

**Modèles disponibles** :

```bash
# Qwen 3.5 (~11GB) - Raisonnement, code et vision
ollama pull qwen3.5

# GLM-4.7 Flash (~25GB) - Raisonnement et code, très puissant
ollama pull glm-4.7-flash
```

### Liste complète

```bash
# Voir tous les modèles disponibles
ollama list

# Chercher un modèle
ollama search <nom>
```

---

## Configuration dans l'interface

1. **Ouvrez les Paramètres** (icône ⚙️ dans la sidebar)
2. **Sélectionnez "Ollama Local"** comme provider
3. **L'URL par défaut** `http://localhost:11434` devrait fonctionner
4. **Choisissez un modèle** (commencez par `llama3.2`)
5. **Testez la connexion**
6. **Sauvegardez** ✅

---

## Commandes utiles

```bash
# Lister les modèles installés
ollama list

# Supprimer un modèle
ollama rm <modèle>

# Tester un modèle en CLI
ollama run llama3.2

# Voir les logs
ollama logs

# Mettre à jour Ollama
curl -fsSL https://ollama.ai/install.sh | sh
```

---

## Comparaison des modèles

### Modèles Cloud

| Modèle | Type | Vitesse | Qualité | Recommandé |
|--------|------|---------|---------|------------|
| **kimi-k2.5:cloud** | Cloud | ⚡⚡⚡⚡ | ⭐⭐⭐⭐⭐ | ✅ Oui |
| **qwen3.5:cloud** | Cloud | ⚡⚡⚡⚡ | ⭐⭐⭐⭐ | ✅ Oui |
| **glm-5:cloud** | Cloud | ⚡⚡⚡⚡ | ⭐⭐⭐⭐ | ✅ Oui |
| minimax-m2.7:cloud | Cloud | ⚡⚡⚡⚡ | ⭐⭐⭐ | Bon |

### Modèles Locaux

| Modèle | Taille | Vitesse | Qualité | Recommandé |
|--------|--------|---------|---------|------------|
| **qwen3.5** | ~11GB | ⚡⚡ | ⭐⭐⭐⭐ | ✅ Oui |
| glm-4.7-flash | ~25GB | ⚡ | ⭐⭐⭐⭐⭐ | Si machine puissante |

---

## Performances attendues

### Modèles Cloud
- **Internet requis** : Oui (connexion stable recommandée)
- **Ressources machine** : Aucune (tout est hébergé)
- **Vitesse** : Très rapide (~50-100 tokens/seconde)
- **Qualité** : Excellente pour le code et le raisonnement

### Modèles Locaux

**Machine recommandée :**
- **RAM** : 16GB minimum (32GB pour glm-4.7-flash)
- **CPU** : Intel i5/i7 ou Apple Silicon M1/M2/M3
- **GPU** : Accélération automatique si disponible (NVIDIA CUDA, Apple Metal)
- **Disque** : 15-30GB d'espace libre

**Vitesse de réponse :**
- **Qwen 3.5** (~11GB) : ~15-30 tokens/seconde
- **GLM-4.7 Flash** (~25GB) : ~10-20 tokens/seconde

> **Note** : Les modèles cloud sont beaucoup plus rapides et ne consomment aucune ressource locale.

---

## Dépannage

### ❌ "Connexion échouée"

```bash
# Vérifier qu'Ollama tourne
curl http://localhost:11434

# Si pas de réponse, démarrer Ollama
ollama serve
```

### ❌ "Modèle introuvable"

**Pour modèles cloud :**
```bash
# Vérifier qu'Ollama est à jour
ollama --version

# Les modèles cloud sont automatiques, pas de téléchargement nécessaire
```

**Pour modèles locaux :**
```bash
# Installer le modèle
ollama pull qwen3.5

# Vérifier qu'il est installé
ollama list
```

### ❌ "Trop lent"

**Solution rapide :**
- Utilisez un **modèle cloud** (`kimi-k2.5:cloud`, `qwen3.5:cloud`) - beaucoup plus rapides !

**Pour modèles locaux :**
- Fermez les autres applications
- Vérifiez que votre machine a assez de RAM
- Utilisez un modèle plus léger (`qwen3.5` au lieu de `glm-4.7-flash`)

### ❌ "Erreur de mémoire"

- Utilisez un modèle plus petit
- Fermez les autres applications
- Augmentez la RAM disponible

---

## Comparaison Claude API vs Ollama

| Critère | Claude API | Ollama Cloud | Ollama Local |
|---------|------------|--------------|--------------|
| **Coût** | Payant (~$3-15/1M) | Gratuit ✅ | Gratuit ✅ |
| **Performance** | Excellent | Très bon | Bon |
| **Vitesse** | Très rapide | Rapide | Moyen |
| **Privacité** | Cloud Anthropic | Cloud Ollama | 100% local ✅ |
| **Internet** | Requis | Requis | Optionnel ✅ |
| **Installation** | API key | Ollama installé | Ollama + modèle |
| **Téléchargement** | - | - | 11-25GB |
| **Ressources** | - | - | 16-32GB RAM |

---

## Recommandation

### Utilisez **Claude API** si :
- Vous avez besoin de la **meilleure qualité** de réponse
- Vous travaillez sur des **tâches complexes**
- Vous avez un **budget** pour l'API

### Utilisez **Ollama Cloud** si :
- Vous voulez **tester gratuitement** l'interface ⭐
- Vous voulez de **bonnes performances** sans téléchargement
- Vous avez une **connexion internet stable**
- Vous débutez avec l'interface

### Utilisez **Ollama Local** si :
- Vous privilégiez la **confidentialité absolue** 🔒
- Vous travaillez **hors ligne**
- Vous avez une **machine puissante** (16GB+ RAM)
- Vos données sont sensibles

### **Recommandation globale** :
1. **Démarrage** : Ollama Cloud (`kimi-k2.5:cloud`) - gratuit, rapide, aucune config
2. **Production** : Claude API - meilleure qualité pour tâches importantes
3. **Confidentialité** : Ollama Local (`qwen3.5`) - données 100% privées

---

## Ressources

- 🌐 Site officiel : [ollama.ai](https://ollama.ai)
- 📚 Documentation : [github.com/ollama/ollama](https://github.com/ollama/ollama)
- 🔍 Modèles disponibles : [ollama.ai/library](https://ollama.ai/library)
- 💬 Discord : [discord.gg/ollama](https://discord.gg/ollama)

---

## Prochaines étapes

**Pour commencer rapidement (Cloud) :**

1. ✅ Installer Ollama sur votre machine
2. ✅ Configurer l'interface (Paramètres → Ollama)  
3. ✅ Choisir un modèle cloud (`kimi-k2.5:cloud` ⭐)
4. ✅ Tester la connexion
5. 🚀 Commencer à coder !

**Pour confidentialité maximale (Local) :**

1. ✅ Installer Ollama
2. ✅ Télécharger un modèle (`ollama pull qwen3.5`)
3. ✅ Configurer l'interface
4. ✅ Tester la connexion
5. 🔒 Vos données restent privées !
