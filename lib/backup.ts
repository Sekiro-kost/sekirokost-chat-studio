// Utilitaires pour export/import/backup des données

/**
 * Exporter toutes les données du store vers un fichier JSON
 */
export async function exportData(data: any) {
  const today = new Date().toISOString().split('T')[0];
  const filename = `sekirokost-export-${today}.json`;
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  return filename;
}

/**
 * Importer des données depuis un fichier JSON
 */
export async function importData(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        resolve(data);
      } catch (error) {
        reject(new Error('Fichier JSON invalide'));
      }
    };
    
    reader.onerror = () => reject(new Error('Erreur de lecture du fichier'));
    reader.readAsText(file);
  });
}

/**
 * Créer un backup automatique sur le serveur
 */
export async function createAutoBackup(data: any, backupPath: string) {
  try {
    const response = await fetch('/api/backup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, backupPath }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Backup failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Auto backup error:', error);
    throw error;
  }
}

/**
 * Lister les backups automatiques disponibles
 */
export async function listAutoBackups(backupPath: string) {
  try {
    const response = await fetch(`/api/backup?backupPath=${encodeURIComponent(backupPath)}`);
    
    if (!response.ok) {
      throw new Error('Failed to list backups');
    }
    
    return await response.json();
  } catch (error) {
    console.error('List backups error:', error);
    throw error;
  }
}

/**
 * Supprimer un backup automatique
 */
export async function deleteAutoBackup(filename: string, backupPath: string) {
  try {
    const response = await fetch(
      `/api/backup?filename=${encodeURIComponent(filename)}&backupPath=${encodeURIComponent(backupPath)}`,
      { method: 'DELETE' }
    );
    
    if (!response.ok) {
      throw new Error('Failed to delete backup');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Delete backup error:', error);
    throw error;
  }
}
