
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  files?: File[];
}

export interface Conversation {
  id: string;
  title: string;
  updatedAt: Date;
  messages: Message[];
}

export interface File {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}
