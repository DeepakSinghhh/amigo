export enum ViewState {
  HOME = 'HOME',
  CHAT = 'CHAT',
  BOOKING = 'BOOKING',
  RESOURCES = 'RESOURCES',
  FORUM = 'FORUM',
  ADMIN = 'ADMIN',
  GAMES = 'GAMES'
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'audio' | 'guide';
  category: string;
  description: string;
  imageUrl?: string;
  language: string;
}

export interface Counselor {
  id: string;
  name: string;
  specialization: string;
  availableSlots: string[];
  imageUrl: string;
}

export interface ForumPost {
  id: string;
  authorAlias: string; // Anonymized
  content: string;
  likes: number;
  replies: number;
  tags: string[];
  isVerifiedPeer?: boolean;
}

export interface AnalyticsData {
  name: string;
  value: number;
}