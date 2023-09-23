# Fortigames 2023

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
- Add FontAwesome
- Add Google Fonts
- Reusable layout
- Manage Supabase sessions with `useAuth` hook (with a trick, better usa a `Context`)
- Teams page + filters

## Regenerate DB TypeScript models

run `npm run generate-db-ts` it will create (or update) types in `src/types/database.types.ts`:

Prerequisites:

- `supabase login`
    - Create API token in `https://supabase.com/dashboard/account/tokens`
- `supabase init`

## Useful links

- [Qwik Docs](https://qwik.builder.io/)
- [Discord](https://qwik.builder.io/chat)
- [Qwik GitHub](https://github.com/BuilderIO/qwik)
- [@QwikDev](https://twitter.com/QwikDev)
- [Vite](https://vitejs.dev/)
