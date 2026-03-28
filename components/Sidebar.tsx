'use client';

import { useAppStore } from '@/store/useAppStore';
import { Briefcase, FolderOpen, Plus, MessageSquare, Trash2, RotateCcw, Home, HelpCircle, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { HelpPanel } from './HelpPanel';
import { SettingsPanel } from './SettingsPanel';

export function Sidebar() {
  const {
    workspaces,
    currentWorkspaceId,
    currentProjectId,
    currentSessionId,
    addWorkspace,
    addProject,
    addSession,
    setCurrentWorkspace,
    setCurrentProject,
    setCurrentSession,
    deleteWorkspace,
    deleteProject,
    deleteSession,
    resetAll,
    setShowWelcomeScreen,
    apiKey,
    provider,
  } = useAppStore();

  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [showNewWorkspace, setShowNewWorkspace] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleAddWorkspace = () => {
    if (newWorkspaceName.trim()) {
      const colors = ['#3b82f6', '#ef4444', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      addWorkspace(newWorkspaceName, color);
      setNewWorkspaceName('');
      setShowNewWorkspace(false);
    }
  };

  const handleAddProject = (workspaceId: string) => {
    const name = prompt('Nom du projet :');
    if (name) {
      addProject(workspaceId, name);
    }
  };

  const handleAddSession = (projectId: string) => {
    const name = prompt('Nom de la session :');
    if (name) {
      addSession(projectId, name);
    }
  };

  const handleReset = () => {
    if (confirm('⚠️ Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cette action est irréversible.')) {
      resetAll();
    }
  };

  return (
    <div className="w-80 bg-zinc-900 border-r border-zinc-800 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-white">SekiroKost Chat Studio</h1>
          {workspaces.length > 0 && (
            <button
              onClick={handleReset}
              className="p-2 hover:bg-zinc-800 rounded-lg transition group"
              title="Réinitialiser toutes les données"
            >
              <RotateCcw size={16} className="text-zinc-500 group-hover:text-red-400 transition" />
            </button>
          )}
        </div>
        
        {showNewWorkspace ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={newWorkspaceName}
              onChange={(e) => setNewWorkspaceName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddWorkspace()}
              placeholder="Nom du workspace..."
              className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              autoFocus
            />
            <button
              onClick={handleAddWorkspace}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium"
            >
              OK
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowNewWorkspace(true)}
            className="w-full flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium transition"
          >
            <Plus size={16} />
            Nouveau workspace
          </button>
        )}
      </div>

      {/* Workspaces */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-2">
        {workspaces.map((workspace) => (
          <div key={workspace.id} className="mb-2">
            <div
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer group',
                currentWorkspaceId === workspace.id
                  ? 'bg-zinc-800 text-white'
                  : 'hover:bg-zinc-800/50 text-zinc-400'
              )}
              onClick={() => setCurrentWorkspace(workspace.id)}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: workspace.color }}
              />
              <Briefcase size={16} />
              <span className="flex-1 text-sm font-medium">{workspace.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('Supprimer ce workspace ?')) {
                    deleteWorkspace(workspace.id);
                  }
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-600/20 rounded"
              >
                <Trash2 size={14} className="text-red-400" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddProject(workspace.id);
                }}
                className="opacity-0 group-hover:opacity-100"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Projects */}
            {currentWorkspaceId === workspace.id && workspace.projects.length > 0 && (
              <div className="ml-5 mt-1 space-y-1">
                {workspace.projects.map((project) => (
                  <div key={project.id}>
                    <div
                      className={cn(
                        'flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer text-sm group',
                        currentProjectId === project.id
                          ? 'bg-zinc-800 text-white'
                          : 'hover:bg-zinc-800/50 text-zinc-500'
                      )}
                      onClick={() => setCurrentProject(project.id)}
                    >
                      <FolderOpen size={14} />
                      <span className="flex-1">{project.name}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Supprimer ce projet ?')) {
                            deleteProject(project.id);
                          }
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-600/20 rounded"
                      >
                        <Trash2 size={12} className="text-red-400" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddSession(project.id);
                        }}
                        className="opacity-0 group-hover:opacity-100"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Sessions */}
                    {currentProjectId === project.id && project.sessions.length > 0 && (
                      <div className="ml-5 mt-1 space-y-0.5">
                        {project.sessions.map((session) => (
                          <div
                            key={session.id}
                            className={cn(
                              'flex items-center gap-2 px-3 py-1 rounded-lg cursor-pointer text-xs group',
                              currentSessionId === session.id
                                ? 'bg-blue-600 text-white'
                                : 'hover:bg-zinc-800/50 text-zinc-600'
                            )}
                            onClick={() => setCurrentSession(session.id)}
                          >
                            <MessageSquare size={12} />
                            <span className="flex-1 truncate">{session.name}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm('Supprimer cette session ?')) {
                                  deleteSession(session.id);
                                }
                              }}
                              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-600/20 rounded"
                            >
                              <Trash2 size={10} className="text-red-400" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer - Accueil et Aide */}
      <div className="border-t border-zinc-800 p-2 space-y-1">
        <button
          onClick={() => setShowWelcomeScreen(true)}
          className="w-full flex items-center gap-2 px-3 py-2 text-zinc-400 hover:bg-zinc-800 hover:text-white rounded-lg text-sm transition"
        >
          <Home size={16} />
          <span>Retour à l'accueil</span>
        </button>
        <button
          onClick={() => setShowSettings(true)}
          className="w-full flex items-center gap-2 px-3 py-2 text-zinc-400 hover:bg-zinc-800 hover:text-white rounded-lg text-sm transition relative group"
        >
          <Settings size={16} />
          <span>Paramètres</span>
          {(provider === 'anthropic' && !apiKey) && (
            <div className="ml-auto flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" title="API non configurée" />
              <span className="text-xs text-red-400 opacity-0 group-hover:opacity-100 transition">API</span>
            </div>
          )}
          {(provider === 'ollama' || (provider === 'anthropic' && apiKey)) && (
            <div className="ml-auto flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" title="Configuré" />
            </div>
          )}
        </button>
        <button
          onClick={() => setShowHelp(true)}
          className="w-full flex items-center gap-2 px-3 py-2 text-zinc-400 hover:bg-zinc-800 hover:text-white rounded-lg text-sm transition"
        >
          <HelpCircle size={16} />
          <span>Aide</span>
        </button>
      </div>

      {/* Panels */}
      {showHelp && <HelpPanel onClose={() => setShowHelp(false)} />}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </div>
  );
}
