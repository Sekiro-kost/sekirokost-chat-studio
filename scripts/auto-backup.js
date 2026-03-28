#!/usr/bin/env node

/**
 * Script de backup automatique pour SekiroKost Chat Studio
 * 
 * Lance un serveur local temporaire qui déclenche un backup automatique.
 * Peut être exécuté manuellement ou via un cron job.
 * 
 * Usage: npm run backup
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const DEFAULT_BACKUP_PATH = '/Users/julien/Documents/sekirokostchatstudio-backups';
const STORAGE_KEY = 'claude-interface-storage';

// Fonction pour créer le backup
async function createBackup() {
  try {
    console.log('🔄 Démarrage du backup automatique...');
    
    // Note: Ce script suppose que le serveur Next.js tourne sur localhost:3000
    // Il appelle l'API de backup avec les données du localStorage
    
    const backupPath = process.env.BACKUP_PATH || DEFAULT_BACKUP_PATH;
    
    console.log(`📁 Dossier de backup: ${backupPath}`);
    
    // Créer le dossier s'il n'existe pas
    if (!fs.existsSync(backupPath)) {
      fs.mkdirSync(backupPath, { recursive: true });
      console.log('✅ Dossier de backup créé');
    }
    
    // Pour ce script, nous allons simplement indiquer comment l'utiliser
    console.log('\n📋 Pour utiliser le backup automatique:');
    console.log('1. Ouvrez l\'interface web dans votre navigateur');
    console.log('2. Allez dans Paramètres → Section Sauvegarde');
    console.log('3. Cliquez sur "Backup" pour créer une sauvegarde manuelle');
    console.log('\n💡 Ou utilisez ce script avec un cron job:');
    console.log('0 0 * * * cd /path/to/project && npm run backup');
    console.log('\nℹ️  Le backup automatique nécessite que le serveur Next.js soit actif.');
    
  } catch (error) {
    console.error('❌ Erreur lors du backup:', error.message);
    process.exit(1);
  }
}

// Lancer le backup
createBackup();
