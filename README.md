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

## Vercel Edge

This starter site is configured to deploy to [Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions), which means it will be rendered at an edge location near to your users.

## Installation

The adaptor will add a new `vite.config.ts` within the `adapters/` directory, and a new entry file will be created, such as:

```
└── adapters/
    └── vercel-edge/
        └── vite.config.ts
└── src/
    └── entry.vercel-edge.tsx
```

Additionally, within the `package.json`, the `build.server` script will be updated with the Vercel Edge build.

## Production build

To build the application for production, use the `build` command, this command will automatically run `npm run build.server` and `npm run build.client`:

```shell
npm run build
```

[Read the full guide here](https://github.com/BuilderIO/qwik/blob/main/starters/adapters/vercel-edge/README.md)

## Dev deploy

To deploy the application for development:

```shell
npm run deploy
```

Notice that you might need a [Vercel account](https://docs.Vercel.com/get-started/) in order to complete this step!

## Production deploy

The project is ready to be deployed to Vercel. However, you will need to create a git repository and push the code to it.

You can [deploy your site to Vercel](https://vercel.com/docs/concepts/deployments/overview) either via a Git provider integration or through the Vercel CLI.
