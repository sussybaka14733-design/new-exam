# KNU Exam Prep Board

An interactive daily check-in board and progress tracker for a 19-day B.Sc Computer Science Semester 2 exam preparation plan (Data Structures & Maths), built for Banwarilal Bhalotia College (Kazi Nazrul University).

Progress syncs to Firebase (with local-storage/offline fallback), so you can check off study and practice items day-by-day and see your overall completion in a visual dashboard.

## Tech stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- Firebase (Auth + Firestore)
- Recharts (progress dashboard)

## Run locally

**Prerequisites:** Node.js 20+

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:3000`.

## Build

```bash
npm run build
```

Output is written to `dist/`.

## Deploying to GitHub Pages

This repo includes a ready-to-go workflow at `.github/workflows/deploy.yml` that builds the app and deploys `dist/` to GitHub Pages on every push to `main`.

To enable it:

1. Push this repo to GitHub.
2. Go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).

Your site will be published at `https://<username>.github.io/<repo-name>/`.

## Firebase setup

The app ships wired up to a Firebase project for Auth (email/password + anonymous) and Firestore (progress storage). The Firebase web config in `src/lib/firebase.ts` is a public client identifier, not a secret — access control is enforced entirely by `firestore.rules`, which only allows a signed-in user to read/write their own data.

If you want to point the app at your own Firebase project instead:

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. Enable **Authentication → Email/Password** and **Authentication → Anonymous**.
3. Create a **Firestore** database.
4. Deploy the included security rules: `firebase deploy --only firestore:rules` (requires the [Firebase CLI](https://firebase.google.com/docs/cli)).
5. Replace the `firebaseConfig` object in `src/lib/firebase.ts` with your own project's config (found in Project Settings → General → Your apps).

## Project structure

```
src/
  components/
    Auth.tsx         # Sign in / sign up / guest access
    DailyBoard.tsx    # Day-by-day checklist view
    Dashboard.tsx     # Visual progress charts
  data/
    plan.ts           # The 19-day study plan content
  lib/
    firebase.ts        # Firebase initialization
  types.ts             # Shared TypeScript types
firestore.rules         # Firestore security rules
```

## License

For personal academic use.
