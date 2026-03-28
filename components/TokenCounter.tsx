'use client';

import { useAppStore } from '@/store/useAppStore';
import { formatTokenCount, calculateCost, formatCost } from '@/lib/utils';
import { Zap, DollarSign } from 'lucide-react';

export function TokenCounter() {
  const { getCurrentSession, selectedModel, provider } = useAppStore();
  const session = getCurrentSession();

  if (!session) return null;

  const { input, output, total } = session.tokenUsage;
  const estimatedCost = provider === 'anthropic' ? calculateCost(input, output, selectedModel) : null;

  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm">
      <div className="flex items-center gap-2">
        <Zap size={16} className="text-yellow-500" />
        <span className="text-zinc-400">Total:</span>
        <span className="font-bold text-white">{formatTokenCount(total)}</span>
      </div>
      
      <div className="h-4 w-px bg-zinc-700" />
      
      <div className="flex items-center gap-2">
        <span className="text-zinc-500">In:</span>
        <span className="text-blue-400">{formatTokenCount(input)}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-zinc-500">Out:</span>
        <span className="text-green-400">{formatTokenCount(output)}</span>
      </div>

      {estimatedCost !== null && (
        <>
          <div className="h-4 w-px bg-zinc-700" />
          
          <div className="flex items-center gap-2" title="Coût estimé de cette session">
            <DollarSign size={16} className="text-emerald-500" />
            <span className="font-medium text-emerald-400">{formatCost(estimatedCost)}</span>
          </div>
        </>
      )}
    </div>
  );
}
