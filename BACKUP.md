# Guide de Sauvegarde - SekiroKost Chat Studio

## 💾 Système de Backup Complet

Votre interface dispose maintenant de **3 façons** de sauvegarder vos données :

---

## 1. 📤 Export Manuel (Recommandé pour partage)

**Utilisation** :
1. Ouvrez **Paramètres** ⚙️
2. Section "Sauvegarde & Export"  
3. Cliquez sur **"Exporter"**
4. Fichier téléchargé : `sekirokost-export-2026-03-28.json`

**Avantages** :
- ✅ Fichier JSON dans votre dossier Téléchargements
- ✅ Portable (transférable entre navigateurs/machines)
- ✅ Aucune configuration nécessaire

**Quand l'utiliser** :
- Avant de vider le cache du navigateur
- Pour transférer vos données vers un autre PC
- Pour créer une sauvegarde ponctuelle

---

## 2. 📥 Import Manuel

**Utilisation** :
1. Ouvrez **Paramètres** ⚙️
2. Cliquez sur **"Importer"**
3. Sélectionnez votre fichier JSON
4. Confirmez (⚠️ remplace toutes les données actuelles)
5. La page se recharge automatiquement

**Quand l'utiliser** :
- Après avoir vidé le cache
- Pour restaurer une sauvegarde
- Pour importer des données d'un autre PC

---

## 3. 🔄 Backup Automatique (Option 2 demandée)

**Configuration** :
1. Ouvrez **Paramètres** ⚙️
2. Section "Sauvegarde & Export"
3. Configurez le **chemin** : `/Users/julien/Documents/sekirokostchatstudio-backups`
4. Cliquez sur **"Sauvegarder"**

**Fonctionnement** :
- ✅ Sauvegarde dans le dossier configuré
- ✅ Nom automatique : `backup-2026-03-28.json`
- ✅ **Rotation automatique** : garde les 7 derniers jours
- ✅ Supprime les backups trop anciens

**Liste des backups** :
- Affichée directement dans Paramètres
- Bouton 🗑️ pour supprimer un backup spécifique
- Actualiser avec l'icône 📁

---

## 📋 Que contient un backup ?

Chaque sauvegarde (export ou backup auto) contient **TOUT** :

```json
{
  "state": {
    "workspaces": [...],        // Tous vos workspaces
    "currentWorkspaceId": "...", // Session en cours
    "apiKey": "...",            // Vos paramètres API
    "provider": "ollama",       // Provider sélectionné
    "selectedModel": "qwen3.5", // Modèle actif
    "backupPath": "...",        // Chemin de backup
    // ... toutes vos données
  }
}
```

---

## 🛡️ Recommandations

### ✅ Bonnes pratiques :

1. **Export manuel régulier** :
   - Avant chaque nettoyage de cache
   - Une fois par semaine si usage intensif

2. **Backup automatique** :
   - Configurez le chemin une fois
   - Cliquez sur "Backup" quand vous voulez
   - Les 7 derniers jours sont gardés

3. **Stockage** :
   - Gardez les exports importants ailleurs (Dropbox, Drive, etc.)
   - Les backups auto sont dans `~/Documents/sekirokostchatstudio-backups/`

### ⚠️ Attention :

- L'import **remplace** toutes les données actuelles
- Faites un export avant d'importer
- Les backups auto nécessitent que `npm run dev` soit actif

---

## 🔧 Automatisation Avancée (Optionnel)

**Script disponible** : `npm run backup`

**Utilisation avec cron** (macOS/Linux) :
```bash
# Backup automatique tous les jours à minuit
0 0 * * * cd /Users/julien/Documents/GitHub/claude_interface && npm run backup
```

**Note** : Le serveur Next.js doit tourner pour que le backup fonctionne.

---

## 🆘 Dépannage

### "Aucune donnée à exporter"
→ Vous n'avez encore rien créé (workspaces, sessions, etc.)

### "Erreur lors de l'import"
→ Vérifiez que le fichier JSON est valide

### "Backup failed"
→ Vérifiez que :
- Le dossier de backup existe
- Vous avez les droits d'écriture
- Le serveur `npm run dev` tourne

### Les backups ne s'affichent pas
→ Cliquez sur l'icône 📁 pour actualiser la liste

---

## 📊 Taille des backups

**Estimations** :
- 10 workspaces, 50 sessions : ~500 KB
- 100 sessions avec historique : ~2-5 MB
- Usage intensif : rarement plus de 10 MB

**Rotation sur 7 jours** :
- Maximum ~7 × 5 MB = 35 MB
- En pratique : 10-20 MB total

---

## ✅ Résumé

| Méthode | Destination | Auto | Rotation | Recommandé pour |
|---------|-------------|------|----------|-----------------|
| **Export** | Téléchargements | ❌ | ❌ | Partage, transfert |
| **Import** | - | ❌ | - | Restauration |
| **Backup** | Dossier configuré | ⚙️ Manuel | ✅ 7 jours | Usage quotidien |

**Conseil** : Utilisez **Export** avant de vider le cache, **Backup** pour sauvegardes régulières !

---

🎯 **Vous êtes maintenant protégé contre la perte de données !**
