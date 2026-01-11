# 🚀 PetPlaza Strategy Doc (Service-First Edition)

**Target Audience:** Pet Owners who want a "One-Stop Shop" but value Community first.
**Core Value:** A unified Service Platform, starting with Community.
**Current Phase:** Pioneer Launch (Community Active, Services in Waitlist mode).

## 1. Feature Breakdown
| Feature | User Value | Technical Implementation |
| :--- | :--- | :--- |
| **Service Grid (Home)** | Shows the roadmap/vision instantly. | `Home.tsx` renders a grid. Non-active services capture interest in DB. |
| **The Community Feed** | The active engagement layer. | `Feed.tsx`. Now separated from Home. |
| **Post Creation** | User Generated Content. | `CreatePostModal.tsx`. Supports Text (Question) or Image (Media). Max 5MB. |
| **Edit/Delete Logic** | Quality Control. | Users can Delete own posts. Can Edit *only* if no interactions (likes/comments). |
| **Feedback Loop** | Continuous Improvement. | `FeedbackModal.tsx` saves directly to Firebase. |

## 2. Deployment Roadmap (Founder's Guide)
To keep the launch simple, we follow a two-step hosting strategy:

### Phase A: Manual "Pioneer" Launch (Current)
*   **Method:** Run `npx firebase deploy` from your computer.
*   **Why:** Fastest way to go live. No complex "Robot" setup required.
*   **Status:** Active.

### Phase B: Automated "Professional" Pipeline (Next)
*   **Method:** Connect GitHub Actions (The 'Y' option in Firebase Init).
*   **Why:** Every time you save code, the site updates automatically.
*   **When:** Move to this once the Pilot group exceeds 50 users.

## 3. Data Structure
- `users`: Profiles, roles (Pet Owner/Lover), and pet details.
- `posts`: Feed content, including "Lost Pet" high-priority alerts.
- `serviceInterests`: Lead generation for future Vet/Grooming modules.
- `feedback`: Direct line from users to the founder.
