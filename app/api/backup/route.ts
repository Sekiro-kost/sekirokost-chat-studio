import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readdir, unlink, mkdir, readFile } from 'fs/promises';
import { join } from 'path';

const DEFAULT_BACKUP_DIR = '/Users/julien/Documents/sekirokostchatstudio-backups';
const MAX_BACKUPS = 7; // Garder 7 jours de backups

// Créer le dossier s'il n'existe pas
async function ensureBackupDir(backupDir: string) {
  try {
    await mkdir(backupDir, { recursive: true });
  } catch (error) {
    // Dossier existe déjà
  }
}

// Obtenir la liste des backups
async function listBackups(backupDir: string) {
  await ensureBackupDir(backupDir);
  try {
    const files = await readdir(backupDir);
    const backups = files
      .filter(f => f.startsWith('backup-') && f.endsWith('.json'))
      .sort()
      .reverse(); // Plus récent en premier
    
    return backups.map(filename => {
      const match = filename.match(/backup-(\d{4}-\d{2}-\d{2})\.json/);
      return {
        filename,
        date: match ? match[1] : 'unknown',
        path: join(backupDir, filename)
      };
    });
  } catch (error) {
    return [];
  }
}

// Supprimer les vieux backups (garder seulement MAX_BACKUPS)
async function cleanOldBackups(backupDir: string) {
  const backups = await listBackups(backupDir);
  if (backups.length > MAX_BACKUPS) {
    const toDelete = backups.slice(MAX_BACKUPS);
    for (const backup of toDelete) {
      try {
        await unlink(backup.path);
        console.log('Deleted old backup:', backup.filename);
      } catch (error) {
        console.error('Failed to delete backup:', error);
      }
    }
  }
}

// GET - Lister les backups disponibles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const backupDir = searchParams.get('backupPath') || DEFAULT_BACKUP_DIR;
    
    const backups = await listBackups(backupDir);
    return NextResponse.json({ backups, backupDir });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to list backups' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau backup
export async function POST(request: NextRequest) {
  try {
    const { data, backupPath } = await request.json();
    const backupDir = backupPath || DEFAULT_BACKUP_DIR;
    
    await ensureBackupDir(backupDir);
    
    // Nom du fichier avec la date du jour
    const today = new Date().toISOString().split('T')[0];
    const filename = `backup-${today}.json`;
    const filepath = join(backupDir, filename);
    
    // Écrire le backup
    await writeFile(filepath, JSON.stringify(data, null, 2), 'utf-8');
    
    console.log('Backup created:', filepath);
    
    // Nettoyer les vieux backups
    await cleanOldBackups(backupDir);
    
    return NextResponse.json({ 
      success: true, 
      filename,
      path: filepath,
      message: `Backup créé : ${filename}`
    });
  } catch (error: any) {
    console.error('Backup error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create backup' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un backup spécifique
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    const backupDir = searchParams.get('backupPath') || DEFAULT_BACKUP_DIR;
    
    if (!filename || !filename.startsWith('backup-')) {
      return NextResponse.json(
        { error: 'Invalid filename' },
        { status: 400 }
      );
    }
    
    const filepath = join(backupDir, filename);
    await unlink(filepath);
    
    return NextResponse.json({ 
      success: true, 
      message: `Backup ${filename} supprimé`
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete backup' },
      { status: 500 }
    );
  }
}
