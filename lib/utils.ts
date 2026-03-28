import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTokenCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(2)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

export function formatDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "à l'instant";
  if (diffMins < 60) return `il y a ${diffMins}min`;
  if (diffHours < 24) return `il y a ${diffHours}h`;
  if (diffDays < 7) return `il y a ${diffDays}j`;
  
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: new Date(date).getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  }).format(new Date(date));
}

// Prix des modèles Claude (par million de tokens)
export const MODEL_PRICING = {
  'claude-3-5-sonnet-20241022': { input: 3, output: 15, name: 'Claude 3.5 Sonnet' },
  'claude-3-opus-20240229': { input: 15, output: 75, name: 'Claude 3 Opus' },
  'claude-3-sonnet-20240229': { input: 3, output: 15, name: 'Claude 3 Sonnet' },
  'claude-3-haiku-20240307': { input: 0.25, output: 1.25, name: 'Claude 3 Haiku' },
};

export function calculateCost(inputTokens: number, outputTokens: number, model: string): number {
  const pricing = MODEL_PRICING[model as keyof typeof MODEL_PRICING] || MODEL_PRICING['claude-3-5-sonnet-20241022'];
  
  const inputCost = (inputTokens / 1000000) * pricing.input;
  const outputCost = (outputTokens / 1000000) * pricing.output;
  
  return inputCost + outputCost;
}

export function formatCost(cost: number): string {
  if (cost < 0.001) return '< $0.001';
  if (cost < 0.01) return `$${cost.toFixed(4)}`;
  if (cost < 1) return `$${cost.toFixed(3)}`;
  return `$${cost.toFixed(2)}`;
}
