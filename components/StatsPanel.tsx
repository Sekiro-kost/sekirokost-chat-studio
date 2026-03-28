'use client';

import { useAppStore } from '@/store/useAppStore';
import { useMemo } from 'react';
import { BarChart3, MessageSquare, Zap, Clock } from 'lucide-react';
import { formatTokenCount } from '@/lib/utils';

export function StatsPanel() {
  const { workspaces } = useAppStore();

  const stats = useMemo(() => {
    let totalSessions = 0;
    let totalMessages = 0;
    let totalTokens = 0;
    
    workspaces.forEach((workspace) => {
      workspace.projects.forEach((project) => {
        totalSessions += project.sessions.length;
        project.sessions.forEach((session) => {
          totalMessages += session.messages.length;
          totalTokens += session.tokenUsage.total;
        });
      });
    });

    return {
      workspaces: workspaces.length,
      sessions: totalSessions,
      messages: totalMessages,
      tokens: totalTokens,
    };
  }, [workspaces]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <div className="flex items-center gap-2 text-zinc-400 mb-2">
          <BarChart3 size={16} />
          <span className="text-xs font-medium">Workspaces</span>
        </div>
        <div className="text-2xl font-bold text-white">{stats.workspaces}</div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <div className="flex items-center gap-2 text-zinc-400 mb-2">
          <MessageSquare size={16} />
          <span className="text-xs font-medium">Sessions</span>
        </div>
        <div className="text-2xl font-bold text-white">{stats.sessions}</div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <div className="flex items-center gap-2 text-zinc-400 mb-2">
          <Clock size={16} />
          <span className="text-xs font-medium">Messages</span>
        </div>
        <div className="text-2xl font-bold text-white">{stats.messages}</div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <div className="flex items-center gap-2 text-zinc-400 mb-2">
          <Zap size={16} />
          <span className="text-xs font-medium">Tokens</span>
        </div>
        <div className="text-2xl font-bold text-white">{formatTokenCount(stats.tokens)}</div>
      </div>
    </div>
  );
}
