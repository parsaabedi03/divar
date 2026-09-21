# Divar Clone (rts-divar)

A modern, full-featured clone of [Divar](https://divar.ir) — Iran's largest online classifieds marketplace — built to practice and demonstrate real-world React + TypeScript architecture.

> ⚠️ Educational project. Built for learning purposes and portfolio demonstration, not affiliated with the original Divar.

<img width="1351" height="608" alt="Screenshot from 2026-09-22 01-33-09" src="https://github.com/user-attachments/assets/972a4ff6-5ff2-4a9c-96a1-d8cb39445a3a" />

## 🔗 Live Demo

**Frontend:** [your-vercel-url.vercel.app](https://divar-gamma.vercel.app/)
**Backend API:** [your-app.up.railway.app](https://divar-api-production.up.railway.app)

### 🔑 Demo Login (no real SMS required)

The login flow uses OTP (one-time password) sent by SMS. Since this is a demo project without a paid SMS provider connected, use the following test account to log in:

| Field | Value |
|---|---|
| Phone number | `09120000000` |
| Verification code | `11111` |

## ✨ Features

- 🔐 **OTP-based Authentication** — phone number login/verification flow (send code → verify code)
- 🗂️ **Category Browsing** — explore listings by category
- 📝 **Multi-step Post Creation** — a guided, step-by-step form for creating a listing:
  - Step 1: Title, description & images
  - Step 2: Category, price, and location
  - Step 3: Review before submitting
- 📍 **Location Picker** — pick a precise location on an interactive map (Mapbox GL)
- 📄 **Post Listing & Detail Pages** — browse posts and view full details
- 👤 **User Dashboard** — manage your own posts and account
- 🔔 **Toast Notifications** for user feedback
- 🔄 **Automatic Token Refresh** — seamless session handling via Axios interceptors

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Build Tool | [Vite](https://vitejs.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Routing | [React Router](https://reactrouter.com/) |
| Server State | [TanStack React Query](https://tanstack.com/query) |
| Forms & Validation | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| HTTP Client | [Axios](https://axios-http.com/) (with auth & refresh-token interceptors) |
| Maps | [Mapbox GL JS](https://www.mapbox.com/mapbox-gljs) |
| Icons | [Lucide React](https://lucide.dev/) |
| Notifications | [React Hot Toast](https://react-hot-toast.com/) |
| Linting | [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) |

## 🏗️ Project Structure

The project follows a **feature-based architecture**, keeping each domain (auth, posts, category) self-contained with its own API layer, hooks, schemas, and components — instead of grouping files by type.

```
src/
├── app/
│   ├── providers/      # App-level context/providers (React Query, etc.)
│   └── router/         # Route definitions & app router
├── config/
│   ├── env.ts           # Type-safe environment variable access
│   └── routes.ts        # Route path constants
├── features/
│   ├── auth/            # OTP send/verify — api, hooks, schemas, components
│   ├── category/        # Category listing — api, hooks, schemas, components
│   └── posts/           # Post CRUD, multi-step creation flow
├── lib/
│   ├── axios.ts          # Configured Axios instance + interceptors
│   └── queryClient.ts    # React Query client configuration
├── pages/                # Route-level page components
├── shared/
│   ├── components/       # Reusable UI components
│   ├── helper/
│   ├── hooks/
│   └── utils/
└── styles/                # Global styles & fonts
```

Each feature module typically contains:
```
features/posts/
├── api/          # API request functions + React Query keys
├── components/   # Feature-specific UI components
├── hooks/        # Custom hooks (data fetching/mutations)
├── schemas/      # Zod validation schemas
└── index.ts      # Public exports (barrel file)
```

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/parsaabedi03/divar.git
cd divar

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_BASE_URL=your_backend_api_url
VITE_MAP_API_KEY=your_mapbox_access_token
```

> Both variables are required — the app will throw an error on startup if either is missing (see `src/config/env.ts`).

### Running the App

```bash
# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview

# Run the linter
npm run lint
```

The app will be available at `http://localhost:5173` by default.

## 🔗 Backend / API

This frontend is powered by a separate backend service, deployed from:

**[rjs-divar-api](https://github.com/milad-azami/rjs-divar-api)** (original) — an Express.js + MongoDB REST API providing authentication (OTP-based), categories, posts, and user management, with Swagger API docs.

The backend is deployed on **Railway**, with MongoDB Atlas as the database. To run this project fully yourself, you'll need that backend running (locally or deployed) and pointed to via the `VITE_BASE_URL` environment variable described above.

## 📄 License

This project is for educational purposes. Feel free to explore the code and use it as a learning reference.

## 🙋 Author

**Parsa Abedi** — [@parsaabedi03](https://github.com/parsaabedi03)
