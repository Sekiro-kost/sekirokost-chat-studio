'use client';

import { useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { initializeDemoData } from '@/lib/demo';

export function WelcomeScreen() {
  const { workspaces, showWelcomeScreen, setShowWelcomeScreen } = useAppStore();

  useEffect(() => {
    // Afficher automatiquement l'écran de bienvenue s'il n'y a pas de workspaces
    if (workspaces.length === 0) {
      setShowWelcomeScreen(true);
    }
  }, [workspaces.length, setShowWelcomeScreen]);

  const handleStartDemo = () => {
    initializeDemoData();
    setShowWelcomeScreen(false);
  };

  const handleStartFresh = () => {
    setShowWelcomeScreen(false);
  };

  if (!showWelcomeScreen) return null;

  return (
    <div className="fixed inset-0 bg-zinc-950 z-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center px-6">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6">
            <Sparkles size={40} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Bienvenue sur SekiroKost Chat Studio
          </h1>
          <p className="text-xl text-zinc-400">
            Organisez vos sessions LLM (Claude, Ollama) par workspaces et projets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-semibold text-white mb-2">Organisation</h3>
            <p className="text-sm text-zinc-500">
              Structurez vos conversations par workspaces et projets
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-white mb-2">Temps réel</h3>
            <p className="text-sm text-zinc-500">
              Notifications visuelles et suivi live des tokens
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="text-3xl mb-3">💾</div>
            <h3 className="font-semibold text-white mb-2">Persistance</h3>
            <p className="text-sm text-zinc-500">
              Vos sessions sont sauvegardées automatiquement
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleStartDemo}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            Essayer avec des données de démo
          </button>
          <button
            onClick={handleStartFresh}
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition"
          >
            Commencer de zéro
          </button>
        </div>

        <p className="mt-8 text-sm text-zinc-600">
          Astuce : Créez un workspace avec le bouton "Nouveau workspace" dans la sidebar
        </p>
      </div>
    </div>
  );
}
