export enum UserRole {
  PET_OWNER = 'PET_OWNER',
  PET_LOVER = 'PET_LOVER',
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  petName?: string;
  petType?: string;
  avatarUrl?: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  text: string;
  createdAt: number;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  imageUrl?: string; 
  caption: string;
  type: 'media' | 'question' | 'lost-pet';
  likes: number;
  comments: Comment[];
  createdAt: number;
  likedByCurrentUser?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  color?: string;
}

export interface ServiceInterest {
  userId: string;
  serviceId: string;
  timestamp: number;
}

export interface Feedback {
  userId: string;
  message: string;
  type: 'bug' | 'feature' | 'general';
  timestamp: number;
}
