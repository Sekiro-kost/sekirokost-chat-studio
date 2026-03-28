// Modèles Ollama populaires et leurs caractéristiques
export const OLLAMA_MODELS = {
  // Modèles Cloud (hébergés, rapides, pas de téléchargement)
  'kimi-k2.5:cloud': {
    name: 'Kimi K2.5 (Cloud)',
    size: 'Cloud',
    description: 'Raisonnement multimodal avec sous-agents, hébergé',
    recommended: true,
    type: 'cloud' as const,
  },
  'qwen3.5:cloud': {
    name: 'Qwen 3.5 (Cloud)',
    size: 'Cloud',
    description: 'Raisonnement, code et vision, hébergé',
    recommended: true,
    type: 'cloud' as const,
  },
  'glm-5:cloud': {
    name: 'GLM-5 (Cloud)',
    size: 'Cloud',
    description: 'Raisonnement et génération de code, hébergé',
    recommended: true,
    type: 'cloud' as const,
  },
  'minimax-m2.7:cloud': {
    name: 'MiniMax M2.7 (Cloud)',
    size: 'Cloud',
    description: 'Rapide et efficace pour le code et la productivité',
    recommended: false,
    type: 'cloud' as const,
  },
  
  // Modèles Locaux (téléchargés, privés, hors ligne)
  'qwen3.5': {
    name: 'Qwen 3.5',
    size: '~11GB',
    description: 'Raisonnement, code et vision locale',
    recommended: true,
    type: 'local' as const,
  },
  'glm-4.7-flash': {
    name: 'GLM-4.7 Flash',
    size: '~25GB',
    description: 'Raisonnement et code locale, modèle puissant',
    recommended: false,
    type: 'local' as const,
  },
} as const;

export type OllamaModelId = keyof typeof OLLAMA_MODELS;

// Commandes d'installation (modèles locaux seulement)
export const OLLAMA_INSTALL_COMMANDS: Record<string, string> = {
  'qwen3.5': 'ollama pull qwen3.5',
  'glm-4.7-flash': 'ollama pull glm-4.7-flash',
  // Les modèles cloud ne nécessitent pas de téléchargement
};
