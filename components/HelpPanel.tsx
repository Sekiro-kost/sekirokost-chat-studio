'use client';

import { X, Keyboard, Zap, Folder, MessageSquare, Home, Settings as SettingsIcon } from 'lucide-react';

interface HelpPanelProps {
  onClose: () => void;
}

export function HelpPanel({ onClose }: HelpPanelProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Guide d'utilisation</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-lg transition"
          >
            <X size={20} className="text-zinc-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Organisation */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Folder size={20} className="text-blue-500" />
              <h3 className="text-lg font-semibold text-white">Organisation</h3>
            </div>
            <div className="space-y-2 text-sm text-zinc-400">
              <p className="flex items-start gap-2">
                <span className="font-mono bg-zinc-800 px-2 py-1 rounded text-blue-400 min-w-[120px]">Workspace</span>
                <span>Espace de travail principal (ex: "Projets Web")</span>
              </p>
              <p className="flex items-start gap-2 ml-4">
                <span className="font-mono bg-zinc-800 px-2 py-1 rounded text-purple-400 min-w-[120px]">└─ Projet</span>
                <span>Regroupement de sessions (ex: "E-commerce")</span>
              </p>
              <p className="flex items-start gap-2 ml-8">
                <span className="font-mono bg-zinc-800 px-2 py-1 rounded text-green-400 min-w-[120px]">└─ Session</span>
                <span>Conversation avec Claude (ex: "Refactoring")</span>
              </p>
            </div>
          </section>

          {/* Raccourcis clavier */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Keyboard size={20} className="text-purple-500" />
              <h3 className="text-lg font-semibold text-white">Raccourcis clavier</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 bg-zinc-800/50 rounded">
                <span className="text-zinc-300">Envoyer le message</span>
                <kbd className="px-2 py-1 bg-zinc-700 border border-zinc-600 rounded text-xs">Entrée</kbd>
              </div>
              <div className="flex items-center justify-between p-2 bg-zinc-800/50 rounded">
                <span className="text-zinc-300">Nouvelle ligne</span>
                <kbd className="px-2 py-1 bg-zinc-700 border border-zinc-600 rounded text-xs">Shift + Entrée</kbd>
              </div>
            </div>
          </section>

          {/* Fonctionnalités */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Zap size={20} className="text-yellow-500" />
              <h3 className="text-lg font-semibold text-white">Fonctionnalités clés</h3>
            </div>
            <div className="space-y-3 text-sm text-zinc-400">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 animate-pulse-green"></div>
                <div>
                  <p className="font-medium text-white">Point vert</p>
                  <p>Indique que Claude est prêt (en bas à gauche)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 animate-pulse"></div>
                <div>
                  <p className="font-medium text-white">Point jaune</p>
                  <p>Claude est en train de traiter votre demande</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageSquare size={20} className="text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Textarea fixe</p>
                  <p>Vous pouvez écrire pendant que vous scrollez les réponses</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap size={20} className="text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Suivi des tokens</p>
                  <p>Monitoring en temps réel de la consommation (Input/Output/Total)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Home size={20} className="text-purple-500 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Retour à l'accueil</p>
                  <p>Cliquez sur l'icône maison dans la sidebar pour revenir à l'écran d'accueil</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <SettingsIcon size={20} className="text-orange-500 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Configuration API</p>
                  <p>Configurez votre clé API Claude dans les Paramètres pour des réponses réelles</p>
                </div>
              </div>
            </div>
          </section>

          {/* Astuces */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-3">💡 Astuces</h3>
            <div className="space-y-2 text-sm text-zinc-400">
              <p className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <strong className="text-orange-400">Nouveau :</strong> Configurez votre clé API dans Paramètres pour des vraies conversations avec Claude !
              </p>
              <p className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <strong className="text-blue-400">Astuce :</strong> Toutes vos données sont sauvegardées automatiquement dans votre navigateur
              </p>
              <p className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <strong className="text-purple-400">Astuce :</strong> Utilisez le bouton de réinitialisation (↻) pour tout effacer
              </p>
              <p className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <strong className="text-green-400">Astuce :</strong> Un flash apparaît à l'écran quand Claude a terminé de répondre
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-800 p-4 bg-zinc-900/50">
          <p className="text-sm text-zinc-500 text-center">
            Besoin d'aide supplémentaire ? Consultez le{' '}
            <a
              href="https://github.com/julien/claude-interface"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              README sur GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
