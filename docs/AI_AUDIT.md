# 🤖 PetPlaza AI Audit Log

**Purpose:** Technical context for AI Agents.

## Business Logic Rules
1.  **Post Editing:** STRICT. A post can only be edited if `likes === 0` AND `comments.length === 0`. This preserves conversation integrity.
2.  **Post Deletion:** Owners can always delete their own posts.
3.  **Image Uploads:** Client-side validation required. Max file size: 5MB.
4.  **Service Access:** Only `id: 'community'` is active. All others must trigger the "Interest Capture" modal.

## Architecture Decisions
1.  **Routing:** Currently using `useState` (`currentView`) in `App.tsx` for simplicity in the "One-Click" setup. Migrating to `react-router-dom` is the next technical debt item.
2.  **Database:** `dbService.ts` acts as the abstraction layer. Currently mocks data but is structured to swap in `firebase.firestore().add()` easily.

## Deployment Status
*   **Git:** Ready for init.
*   **Firebase:** Config slots ready in `services/authService` and `services/dbService`.
*   **Netlify:** Ready for `dist` drag-and-drop.