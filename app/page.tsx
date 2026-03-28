'use client';

import { Sidebar } from '@/components/Sidebar';
import { ChatView } from '@/components/ChatView';
import { StatusIndicator } from '@/components/StatusIndicator';
import { WelcomeScreen } from '@/components/WelcomeScreen';

export default function Home() {
  return (
    <main className="flex h-screen overflow-hidden bg-zinc-950">
      <Sidebar />
      <ChatView />
      <StatusIndicator />
      <WelcomeScreen />
    </main>
  );
}
