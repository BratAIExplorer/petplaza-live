import { Post, User, UserRole } from './types';

// LIVE MODE: Set to false to use the real Firebase Database
export const USE_MOCK_DATA = false; 

export const MOCK_USER: User = {
  id: 'user_123',
  email: 'demo@petplaza.com',
  displayName: 'Sarah Jenkins',
  role: UserRole.PET_OWNER,
  petName: 'Bella',
  petType: 'Golden Retriever',
  avatarUrl: 'https://picsum.photos/id/64/200/200',
};

export const MOCK_POSTS: Post[] = [
  {
    id: 'post_lost_1',
    userId: 'user_999',
    userName: 'Emergency Alert',
    userAvatar: 'https://ui-avatars.com/api/?name=Alert&background=ef4444&color=fff',
    imageUrl: 'https://picsum.photos/id/237/800/800',
    caption: 'MISSING: Golden Retriever named "Rusty". Last seen near Central Park. Please help! 🚨',
    type: 'lost-pet',
    likes: 342,
    comments: [],
    createdAt: Date.now() - 1000000,
    likedByCurrentUser: false,
  }
];
