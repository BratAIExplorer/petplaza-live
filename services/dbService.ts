import { Feedback, Post, ServiceInterest, Comment } from '../types';
import { USE_MOCK_DATA, MOCK_POSTS } from '../constants';
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  arrayUnion, 
  increment, 
  getDoc,
  getCountFromServer
} from 'firebase/firestore';

const sanitizeData = (data: any) => {
  return JSON.parse(JSON.stringify(data, (key, value) => 
    value === undefined ? null : value
  ));
};

const compressAndConvertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const scaleSize = MAX_WIDTH / img.width;
        const finalScale = scaleSize < 1 ? scaleSize : 1;
        canvas.width = img.width * finalScale;
        canvas.height = img.height * finalScale;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error("Canvas context error")); return; }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
    };
    reader.onerror = (err) => reject(err);
  });
};

export const getAdminStats = async () => {
  if (USE_MOCK_DATA) {
    return {
      posts: MOCK_POSTS.length,
      users: 1,
      interests: 12,
      feedback: 3,
      breakdown: { "community": 5, "relocation": 7 }
    };
  }
  
  try {
    const postsCount = await getCountFromServer(collection(db, 'posts'));
    const usersCount = await getCountFromServer(collection(db, 'users'));
    const interestsCount = await getCountFromServer(collection(db, 'service_interests'));
    const feedbackCount = await getCountFromServer(collection(db, 'feedback'));

    const interestsSnap = await getDocs(collection(db, 'service_interests'));
    const breakdown: Record<string, number> = {};
    interestsSnap.forEach(doc => {
      const sid = doc.data().serviceId;
      breakdown[sid] = (breakdown[sid] || 0) + 1;
    });

    return {
      posts: postsCount.data().count,
      users: usersCount.data().count,
      interests: interestsCount.data().count,
      feedback: feedbackCount.data().count,
      breakdown
    };
  } catch (e) {
    console.error("Stats Fetch Error:", e);
    return { posts: 0, users: 0, interests: 0, feedback: 0, breakdown: {} };
  }
};

export const saveServiceInterest = async (interest: ServiceInterest): Promise<void> => {
  if (USE_MOCK_DATA) return;
  await addDoc(collection(db, 'service_interests'), sanitizeData(interest));
};

export const saveFeedback = async (feedback: Feedback): Promise<void> => {
  if (USE_MOCK_DATA) return;
  await addDoc(collection(db, 'feedback'), sanitizeData(feedback));
};

export const createPost = async (post: Post): Promise<Post> => {
  if (USE_MOCK_DATA) {
    MOCK_POSTS.unshift(post);
    return post;
  }
  const { id, ...postData } = post;
  const cleanPost = sanitizeData(postData);
  await addDoc(collection(db, 'posts'), cleanPost);
  return post;
};

export const uploadPostImage = async (file: File | null): Promise<string | undefined> => {
  if (!file) return undefined;
  return await compressAndConvertToBase64(file);
}

export const deletePost = async (postId: string): Promise<void> => {
  if (USE_MOCK_DATA) return;
  await deleteDoc(doc(db, 'posts', postId));
};

export const updatePost = async (postId: string, newCaption: string): Promise<void> => {
  if (USE_MOCK_DATA) return;
  const postRef = doc(db, 'posts', postId);
  const postSnap = await getDoc(postRef);
  if (postSnap.exists()) {
    const data = postSnap.data();
    if ((data.likes && data.likes > 0) || (data.comments && data.comments.length > 0)) {
      throw new Error("Cannot edit post with interactions.");
    }
    await updateDoc(postRef, { caption: newCaption });
  }
};

export const addComment = async (postId: string, comment: Comment): Promise<void> => {
  if (USE_MOCK_DATA) return;
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, { comments: arrayUnion(sanitizeData(comment)) });
}

export const likePost = async (postId: string, incrementVal: boolean): Promise<void> => {
  if (USE_MOCK_DATA) return;
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, { likes: increment(incrementVal ? 1 : -1) });
}

export const getPosts = async (): Promise<Post[]> => {
  if (USE_MOCK_DATA) return [...MOCK_POSTS];
  try {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Post[];
  } catch (e) {
    console.warn("Firestore collection might be empty or indexes building.", e);
    return [];
  }
};
