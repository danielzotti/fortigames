# Fortigames

A companion app for the Fortitude Group Convention since 2023, developed in less than a week with a couple of colleagues of
mine.

## Blog post

I wrote an in-depth [article](https://dev.to/danielzotti/how-we-built-an-app-in-less-than-5-days-with-qwik-supabase-and-vercel-1b3n) about the project.

## Technologies used

- [Balsamiq](https://balsamiq.com): wireframe
- [Figma](https://www.figma.com): app design
- [Qwik](): main framework
    - [Fontawesome](https://fontawesome.com/) for icons
    - SCSS structure from [danielzotti.it](https://github.com/danielzotti/new.danielzotti.it) website for components and
      dark/light theme
- [Supabase](https://supabase.com/): realtime database + Google authentication (every Fortitude Group member has their
  company Google account)
- [GitHub](https://github.com/): open source project
- [Vercel](https://vercel.com): deploy

## History

### 2023-09-22

- Create Google OAuth Client
- Create Supabase Project
- Login with Google using Supabase client and show email
- Read `users` table using Supabase client with public policy
- Brainstorming + first wireframes

### 2023-09-23

- Detailed wireframes
- App pages structure definition
- Read `users` table using Supabase client with "user authenticated" policy
- `SCSS` files for reusable components and theme dark/light
- CSS modules for components
- Add FontAwesome
- Add Google Fonts
- Reusable layout
- Bottom navigation
- Manage Supabase sessions with `useAuth` hook (with a trick, better usa a `Context`)
- Teams page + filters

### 2023-09-25

- Admin section
- Generate DB types from Supabase
- Back button
- Filter teams by sport
- Sports icons in teams
- Game results component
- Favicons
- New fonts
- Manage session in local storage
- Profile avatar
- Admin set game results
- Filter out Google authenticated users if email not in users table

### 2023-09-26

- reusable layout component "Main layout"
- New background images
- Time manager (aka countdown)
- First Vercel deploy
- Loaders UI
- Agenda component
- New fonts
- Reusable Button component

### 2023-09-27

- Boardgames section
- Teams badges
- Realtime for score
- Map with dark/light theme
- Profile page
- Dashboard realtime agenda
- Realtime for participants
- Realtime for boardgamers

### 2023-09-28
- Section to manage games: start/pause/stop/restart
- Winner page
- Trophy
- Login background
- "Testing session"

## Regenerate DB TypeScript models

run `npm run generate-db-ts` it will create (or update) types in `src/types/database.types.ts`:

Prerequisites:

- `supabase login`
    - Create API token in `https://supabase.com/dashboard/account/tokens`
- `supabase init`

## Useful links

- [Qwik](https://qwik.builder.io/)
- [Supabase](https://supabase.com/docs)
- [Vercel](https://vercel.com/docs)
- [Vite](https://vitejs.dev/)
