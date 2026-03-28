# Différences entre les comptes Claude

## 🔍 Clarification importante

Il existe **3 services Claude différents** avec des comptes séparés :

### 1. 🌐 Claude.ai (Interface Web)
**URL :** https://claude.ai

**C'est quoi :**
- Interface de chat web grand public
- Conversation directe avec Claude dans le navigateur

**Tarifs :**
- ✅ **Gratuit** : Accès limité, files d'attente aux heures de pointe
- 💰 **Claude Pro** (~20$/mois) : Accès prioritaire, plus de messages, Claude Opus

**Donne accès à l'API ?** ❌ **NON**

---

### 2. 🔌 API Claude (Anthropic Developer)
**URL :** https://console.anthropic.com

**C'est quoi :**
- API pour développeurs
- Pour intégrer Claude dans vos applications (comme cette interface)
- Accès programmatique via code

**Tarifs :**
- 💳 **Pay-as-you-go** (paiement à l'usage)
- Pas d'abonnement mensuel
- Vous payez uniquement ce que vous consommez
- Facturation au token (input/output)

**Prix approximatifs (Claude 3.5 Sonnet) :**
- Input : ~$3 / million de tokens
- Output : ~$15 / million de tokens
- Exemple : 100 conversations typiques ≈ $1-2

**Comment ça marche :**
1. Créez un compte sur console.anthropic.com
2. Ajoutez du crédit (minimum ~$5-10 selon les régions)
3. Générez une clé API
4. Utilisez-la dans vos applications

**Donne accès à claude.ai ?** ❌ **NON** (comptes séparés)

---

### 3. 🔧 Claude pour VS Code
**C'est quoi :**
- Extension VS Code pour coder avec l'aide de Claude
- Utilise l'API Claude en arrière-plan

**Tarifs :**
- Peut utiliser votre clé API personnelle
- OU abonnement direct via l'extension

---

## ✅ Pour CETTE interface (Claude Interface)

Vous avez besoin de **l'API Claude** (option 2).

### Étapes pour démarrer :

#### Option A : Mode Gratuit (Simulation)
- ✅ Aucun compte nécessaire
- ✅ Fonctionne immédiatement
- ❌ Réponses simulées (pas le vrai Claude)

#### Option B : Mode Réel (API)
1. Allez sur **https://console.anthropic.com**
2. Créez un compte (peut être le même email que claude.ai, mais c'est un compte séparé)
3. Ajoutez du crédit (carte bancaire, minimum ~$5-10)
4. Générez une clé API dans **Settings → API Keys**
5. Collez cette clé dans **Paramètres** de cette interface
6. Profitez des vraies réponses de Claude ! 🎉

---

## 💰 Budget estimé

**Pour usage modéré :**
- 10-20 conversations par jour
- ~1000 tokens par conversation
- **Coût mensuel : $5-15**

**Pour usage intensif :**
- 50+ conversations par jour
- Longues conversations
- **Coût mensuel : $20-50**

**Beaucoup moins cher** qu'un abonnement Pro (20$/mois) si vous n'utilisez pas beaucoup !

---

## 🆚 Comparaison récapitulative

| Feature | claude.ai Gratuit | Claude Pro | API Claude |
|---------|-------------------|------------|------------|
| Prix | Gratuit | ~20$/mois | À l'usage |
| Interface | Web uniquement | Web uniquement | Vos apps ! |
| Messages | Limités | Illimités | Illimités |
| File d'attente | Oui | Non | Non |
| Développement | ❌ | ❌ | ✅ |
| Cette interface | ❌ | ❌ | ✅ |

---

## 🎯 Recommandation

**Si vous avez déjà Claude Pro (20$/mois) :**
- Peut-être mieux de passer à l'API
- Plus flexible
- Probablement moins cher si usage modéré
- Vous pouvez annuler Claude Pro et utiliser l'API + cette interface !

**Si vous êtes sur claude.ai gratuit :**
- Essayez d'abord cette interface en mode simulation
- Quand vous êtes prêt, ajoutez $5-10 de crédit API
- Testez pour voir votre consommation réelle

---

## ❓ FAQ

**Q: Mon compte claude.ai marche-t-il pour l'API ?**
R: Non, ce sont des comptes séparés. Mais vous pouvez utiliser le même email.

**Q: Si j'ai Claude Pro, ai-je l'API gratuite ?**
R: Non, ce sont des services complètement distincts.

**Q: Quel est le minimum pour commencer avec l'API ?**
R: Généralement 5-10$ de crédit initial (varie selon votre pays).

**Q: L'API est-elle plus chère que Claude Pro ?**
R: Dépend de votre usage. Si vous envoyez <500 messages/mois, l'API est probablement moins chère.

**Q: Puis-je tester l'API gratuitement ?**
R: Anthropic offre parfois des crédits gratuits aux nouveaux comptes (vérifiez sur console.anthropic.com).

**Q: Comment surveiller ma consommation ?**
R: Sur console.anthropic.com dans la section "Usage" + cette interface affiche les tokens en temps réel.

---

## 🔗 Liens utiles

- **Créer compte API :** https://console.anthropic.com
- **Tarification API :** https://www.anthropic.com/pricing
- **Documentation API :** https://docs.anthropic.com
- **Status API :** https://status.anthropic.com

---

**Besoin d'aide pour configurer ?** Consultez [CLAUDE_API_SETUP.md](CLAUDE_API_SETUP.md) pour un guide pas-à-pas !
