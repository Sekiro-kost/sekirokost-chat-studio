export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  tokenCount?: number;
}

export interface Session {
  id: string;
  name: string;
  workspaceId: string;
  projectId?: string;
  messages: Message[];
  status: 'idle' | 'processing' | 'completed' | 'error';
  tokenUsage: {
    input: number;
    output: number;
    total: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Workspace {
  id: string;
  name: string;
  color: string;
  projects: Project[];
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  sessions: Session[];
  createdAt: Date;
}

export interface NotificationState {
  show: boolean;
  type: 'success' | 'error' | 'info';
  message: string;
}
