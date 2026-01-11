# 🛠️ PetPlaza "One-Click" Setup Guide

## Phase 1: The "Magic Script" Setup
Since I have already generated the code files for you, you just need to run the application!

1.  **Open PowerShell** on your Windows PC.
2.  **Navigate** to the folder where you saved these files.
3.  **Run the helper script** (created as `setup_petplaza.ps1` in the project root):
    ```powershell
    ./setup_petplaza.ps1
    ```
    *Note: If you see a permission error, type `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` and try again.*

## Phase 2: Connecting Firebase (When You Are Ready)
Currently, the app uses **Mock Data** so you can see the design immediately.

1.  Go to [Firebase Console](https://console.firebase.google.com/).
2.  Create a project -> Add Web App -> Copy `firebaseConfig`.
3.  Open `src/services/firebaseService.ts` (create it if missing) and paste your config.
4.  Open `src/constants.ts` and set `export const USE_MOCK_DATA = false;`.

## Phase 3: Deploy to Netlify
1.  Run `npm run build` in your terminal.
2.  A `dist` folder will appear in your project.
3.  Drag and drop that `dist` folder onto the Netlify dashboard.
4.  **Done!** You are live.