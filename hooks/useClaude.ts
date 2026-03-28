import { useState, useCallback } from 'react';
import { useAppStore } from '@/store/useAppStore';

interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ClaudeResponse {
  content: string;
  tokens: {
    input: number;
    output: number;
  };
}

/**
 * Hook pour interagir avec l'API Claude
 * Configure ta clé API dans les Paramètres de l'application
 */
export function useClaude() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addMessage, updateSessionStatus, updateTokenUsage, apiKey, apiUrl, selectedModel, provider, ollamaUrl } = useAppStore();

  const sendMessage = useCallback(
    async (sessionId: string, message: string, history: ClaudeMessage[] = []): Promise<ClaudeResponse | null> => {
      setIsLoading(true);
      setError(null);
      updateSessionStatus(sessionId, 'processing');

      try {
        // Vérifier si l'API est configurée
        if (provider === 'anthropic' && !apiKey) {
          // Mode simulation
          await new Promise((resolve) => setTimeout(resolve, 2000));
          
          const mockResponse = `Voici une réponse simulée à : "${message}"\n\n⚙️ Pour activer l'API Claude réelle :\n1. Cliquez sur "Paramètres" dans la sidebar\n2. Obtenez une clé API sur console.anthropic.com\n3. Collez votre clé et testez la connexion\n4. Sauvegardez !`;
          
          const tokens = {
            input: Math.ceil(message.length / 4),
            output: Math.ceil(mockResponse.length / 4),
          };

          addMessage(sessionId, {
            role: 'assistant',
            content: mockResponse,
            tokenCount: tokens.output,
          });

          updateTokenUsage(sessionId, tokens);
          updateSessionStatus(sessionId, 'completed');

          setIsLoading(false);
          return { content: mockResponse, tokens };
        }

        // Choisir l'endpoint selon le provider
        const endpoint = provider === 'ollama' ? '/api/ollama' : '/api/claude';
        const requestBody = provider === 'ollama' 
          ? {
              ollamaUrl,
              model: selectedModel,
              messages: [...history, { role: 'user', content: message }],
            }
          : {
              apiKey,
              apiUrl,
              model: selectedModel,
              messages: [...history, { role: 'user', content: message }],
            };

        // Appel via notre backend proxy
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'Erreur API Claude');
        }

        const data = await response.json();
        const assistantMessage = data.content[0].text;
        const tokens = {
          input: data.usage.input_tokens,
          output: data.usage.output_tokens,
        };

        addMessage(sessionId, {
          role: 'assistant',
          content: assistantMessage,
          tokenCount: tokens.output,
        });

        updateTokenUsage(sessionId, tokens);
        updateSessionStatus(sessionId, 'completed');

        setIsLoading(false);
        return { content: assistantMessage, tokens };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
        setError(errorMessage);
        updateSessionStatus(sessionId, 'error');
        setIsLoading(false);
        return null;
      }
    },
    [addMessage, updateSessionStatus, updateTokenUsage, apiKey, apiUrl, selectedModel, provider, ollamaUrl]
  );

  return {
    sendMessage,
    isLoading,
    error,
  };
}
