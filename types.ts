export enum ViewState {
  HOME = 'HOME',
  CHAT = 'CHAT',
  BOOKING = 'BOOKING',
  RESOURCES = 'RESOURCES',
  FORUM = 'FORUM',
  ADMIN = 'ADMIN', // Institution Admin
  GAMES = 'GAMES',
  LOGIN = 'LOGIN',
  PROFILE = 'PROFILE',
  COUNSELOR_PORTAL = 'COUNSELOR_PORTAL',
  PARENT_PORTAL = 'PARENT_PORTAL',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export type UserRole = 'student' | 'counselor' | 'parent' | 'institution_admin' | 'super_admin';

export interface UserProfile {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  avatar?: string;
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

export interface MoodLog {
  date: string; // ISO date string
  mood: 'great' | 'good' | 'okay' | 'bad' | 'awful';
  score: number; // 1 to 5
}

export interface AssessmentResult {
  date: string;
  type: string;
  score: number;
  severity: string;
  recommendation: string;
}