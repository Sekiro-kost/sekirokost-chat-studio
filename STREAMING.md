# 🌊 Streaming SSE - Guide de Test

## ✅ Implémentation terminée

Le streaming des réponses en temps réel est maintenant **actif** pour Claude API et Ollama !

## 🎯 Ce qui a changé

### Backend (API Routes)
- ✅ `/app/api/claude/route.ts` : Stream SSE direct depuis Anthropic
- ✅ `/app/api/ollama/route.ts` : Reformate les événements Ollama au format SSE

### Frontend
- ✅ `hooks/useClaude.ts` : Parse les événements SSE et met à jour les messages progressivement
- ✅ `store/useAppStore.ts` : Nouvelle fonction `updateMessage()` pour la mise à jour incrémentale
- ✅ `ChatView` : Affichage automatique grâce à la réactivité Zustand (aucun changement requis)

## 🧪 Comment tester

### 1. Redémarrer le serveur de développement

```bash
npm run dev
```

### 2. Tester avec Ollama (gratuit)

1. Assure-toi qu'Ollama est en cours d'exécution
2. Ouvre l'application : http://localhost:3000
3. Va dans **Paramètres** → **Provider** → Sélectionne **Ollama**
4. Choisis un modèle (ex: `qwen3.5:cloud`)
5. Envoie un message : "Écris un poème sur les montagnes"
6. **Observe** : Le texte apparaît **mot par mot** 🎉

### 3. Tester avec Claude API (payant)

1. Va dans **Paramètres** → **Provider** → Sélectionne **Anthropic**
2. Entre ta clé API
3. Envoie un message long : "Explique-moi la théorie de la relativité en détail"
4. **Observe** : La réponse se construit progressivement

## 🔍 Comportement attendu

### ✅ Streaming activé (défaut)
```
User: Raconte-moi une histoire
Assistant: Il était | une fois | dans un | royaume | lointain...
           ↑ Apparaît progressivement, mot par mot
```

### ⚠️ Streaming désactivé (fallback)
Si le stream échoue, le système retombe sur le mode classique (attente complète).

## 📊 Formats SSE supportés

### Claude API (Anthropic)
```
event: message_start
data: {"type":"message_start","message":{"usage":{"input_tokens":10}}}

event: content_block_delta
data: {"type":"content_block_delta","delta":{"text":"Bonjour"}}

event: message_delta
data: {"type":"message_delta","usage":{"output_tokens":50}}
```

### Ollama
```
{"message":{"content":"Bonjour"},"done":false}
{"message":{"content":" comment"},"done":false}
{"message":{"content":" ça va?"},"done":true,"eval_count":45}
```
→ Reformaté en SSE compatible avec Claude

## 🎨 Améliorations futures possibles

- [ ] Bouton **Stop** pour interrompre la génération en cours
- [ ] Indicateur de vitesse (tokens/sec)
- [ ] Animation de typing cursor pendant le streaming
- [ ] Mode "Quick" vs "Full" streaming (tout d'un coup vs progressif)

## 🐛 Debugging

### Le texte n'apparaît pas progressivement ?

1. **Ouvre la console dev** (F12)
2. **Regarde l'onglet Network** → Filtre "claude" ou "ollama"
3. **Vérifie** :
   - `Content-Type: text/event-stream` ✅
   - `Transfer-Encoding: chunked` ✅
   - Les événements SSE apparaissent en temps réel

### Erreurs dans la console ?

- `SSE parsing error` : Normal, certains chunks peuvent être incomplets
- `No response body` : L'API n'a pas retourné de stream
- `TypeError: reader.read` : Le navigateur ne supporte pas les Streams (très rare)

### ⚠️ Erreur "HeadersTimeoutError" avec Ollama

**Symptôme** : L'interface affiche "travaille toujours" mais le terminal montre :
```
Ollama API error: [TypeError: fetch failed] {
  cause: [HeadersTimeoutError: Headers Timeout Error]
}
```

**Cause** : Ollama (surtout local) peut être **très lent** à démarrer la réponse :
- Modèles locaux : Chargement du modèle en RAM (10-30s)
- Premier appel après redémarrage : Initialisation longue
- Requêtes complexes : Temps de traitement élevé

**Solutions** :

1. **Utilisez les modèles cloud Ollama** (10x plus rapides) :
   - `kimi-k2.5:cloud` (recommandé)
   - `qwen3.5:cloud`
   - `glm-5:cloud`

2. **Réchauffez les modèles locaux** avant utilisation :
   ```bash
   # Envoyez une requête simple pour charger le modèle
   ollama run qwen3.5 "hello"
   ```

3. **Timeout côté client** (120s) : Le système affiche maintenant un message d'erreur explicite après 2 minutes

4. **Réessayez** : Souvent, le 2e appel est beaucoup plus rapide (modèle en cache)

**Comportement actuel** :
- ✅ Message d'erreur affiché dans le chat
- ✅ Statut passe à "error" (point rouge)
- ✅ Indication claire du problème

**Avant (ancien bug)** :
- ❌ Restait bloqué sur "travaille"
- ❌ Message vide dans le chat
- ❌ Pas d'indication d'erreur

## 📝 Code technique

### Activation/Désactivation

Par défaut, `stream: true`. Pour désactiver :

```typescript
// Dans useClaude.ts
const requestBody = {
  // ...
  stream: false, // ← Désactive le streaming
};
```

### Événements SSE parsés

- `content_block_delta` : Nouveau texte disponible
- `message_start` : Début de la réponse (input tokens)
- `message_delta` : Mise à jour usage (output tokens)
- `message_stop` : Fin du stream

---

**🎉 Le streaming est prêt !** Profite des réponses ultra-rapides en temps réel.
