# Configuration API Claude

Ce guide explique comment connecter votre interface à l'API Claude réelle d'Anthropic.

## 📋 Prérequis

1. **Compte Anthropic** : Créez un compte sur [console.anthropic.com](https://console.anthropic.com/)
2. **Clé API** : Générez une clé API dans la section "API Keys"
3. **Crédit API** : Ajoutez du crédit à votre compte

## 🔑 Obtenir votre clé API

1. Allez sur [https://console.anthropic.com/](https://console.anthropic.com/)
2. Connectez-vous ou créez un compte
3. Naviguez vers **Settings → API Keys**
4. Cliquez sur **"Create Key"**
5. Copiez votre clé (elle commence par `sk-ant-api...`)

⚠️ **Important** : Ne partagez JAMAIS votre clé API publiquement !

## ⚙️ Configuration

### Étape 1 : Créer le fichier .env.local

```bash
# Créer le fichier à la racine du projet
cp .env.example .env.local
```

### Étape 2 : Ajouter votre clé API

Éditez `.env.local` et ajoutez :

```env
NEXT_PUBLIC_CLAUDE_API_KEY=sk-ant-api03-VOTRE_CLE_ICI
NEXT_PUBLIC_CLAUDE_API_URL=https://api.anthropic.com/v1
```

### Étape 3 : Activer l'API dans le code

Ouvrez `hooks/useClaude.ts` et **décommentez** le code de l'API réelle :

```typescript
// AVANT (code simulé)
// Simulation pour le moment
await new Promise((resolve) => setTimeout(resolve, 2000));
const mockResponse = `...`;

// APRÈS (API réelle)
const response = await fetch(process.env.NEXT_PUBLIC_CLAUDE_API_URL + '/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_CLAUDE_API_KEY || '',
    'anthropic-version': '2023-06-01',
  },
  body: JSON.stringify({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4096,
    messages: [...history, { role: 'user', content: message }],
  }),
});

const data = await response.json();
const assistantMessage = data.content[0].text;
const tokens = {
  input: data.usage.input_tokens,
  output: data.usage.output_tokens,
};
```

### Étape 4 : Redémarrer le serveur

```bash
# Arrêtez le serveur (Ctrl+C)
# Puis redémarrez
npm run dev
```

## 🎯 Modèles disponibles

Vous pouvez choisir différents modèles Claude :

| Modèle | Description | Usage |
|--------|-------------|--------|
| `claude-3-5-sonnet-20241022` | **Recommandé** - Meilleur équilibre performance/coût | Usage général |
| `claude-3-opus-20240229` | Le plus puissant, meilleur raisonnement | Tâches complexes |
| `claude-3-haiku-20240307` | Le plus rapide et économique | Tâches simples |

Pour changer de modèle, modifiez la ligne `model:` dans `useClaude.ts`.

## 💰 Tarification

Prix approximatifs (vérifiez sur [anthropic.com/pricing](https://www.anthropic.com/pricing)) :

### Claude 3.5 Sonnet
- **Input** : ~$3 / million de tokens
- **Output** : ~$15 / million de tokens

### Exemple de coût
- Conversation typique (500 input + 1000 output tokens) : ~$0.017
- 100 conversations similaires : ~$1.70

## 🛡️ Sécurité

### ⚠️ NE JAMAIS faire :

- ❌ Commiter `.env.local` dans git (déjà dans `.gitignore`)
- ❌ Partager votre clé API
- ❌ Exposer la clé côté client sans proxy

### ✅ Bonnes pratiques :

- ✅ Utiliser des variables d'environnement
- ✅ Régénérer les clés si elles sont compromises
- ✅ Implémenter un backend pour les apps en production

## 🔄 Architecture recommandée pour production

Pour une app en production, **NE PAS** appeler l'API Claude directement depuis le frontend :

```
Frontend → Backend API → Claude API
```

### Créer un backend simple

Créez `pages/api/chat.ts` :

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY!, // Sans NEXT_PUBLIC_
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        messages: [...history, { role: 'user', content: message }],
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Claude API error:', error);
    res.status(500).json({ error: 'API request failed' });
  }
}
```

Puis modifiez `useClaude.ts` pour appeler `/api/chat` au lieu de l'API directement.

## 🧪 Tester la connexion

1. Créez une nouvelle session
2. Envoyez un message : "Bonjour, réponds-moi pour confirmer que tu es bien Claude !"
3. Si vous recevez une réponse de Claude (pas la simulation), ça marche ! ✅

## 🐛 Problèmes courants

### Erreur : "Invalid API key"
- Vérifiez que votre clé commence par `sk-ant-api`
- Vérifiez qu'elle est bien dans `.env.local`
- Redémarrez le serveur après modification

### Erreur : "Insufficient credits"
- Ajoutez du crédit sur console.anthropic.com

### Pas de réponse / Timeout
- Vérifiez votre connexion internet
- L'API Claude peut mettre plusieurs secondes à répondre

### Variables d'environnement non trouvées
- Vérifiez que le fichier s'appelle bien `.env.local` (pas `.env`)
- Vérifiez que vous avez redémarré le serveur
- Les variables `NEXT_PUBLIC_*` sont exposées au client

## 📚 Ressources

- [Documentation API Claude](https://docs.anthropic.com/)
- [Console Anthropic](https://console.anthropic.com/)
- [Tarification](https://www.anthropic.com/pricing)
- [Limites de taux](https://docs.anthropic.com/claude/reference/rate-limits)

## 🔐 Pour la production

En production, utilisez :

```env
# Backend only (plus sécurisé)
CLAUDE_API_KEY=sk-ant-api03-...

# Frontend (si vraiment nécessaire)
NEXT_PUBLIC_CLAUDE_API_URL=https://votre-backend.com/api/chat
```

Et créez un vrai backend qui gère :
- ✅ Authentication utilisateur
- ✅ Rate limiting
- ✅ Logging
- ✅ Gestion d'erreurs
- ✅ Cache des réponses

---

**Besoin d'aide ?** Ouvrez une issue sur [GitHub](https://github.com/julien/claude-interface/issues) !
