# Welcome to Project!

## Getting Started

Clone the repo and create .env file with the following content:

```shellscript
 touch .env && echo "DATABASE_URL=postgresql://postgres:password@localhost:5432/emailmanager_db" > .env
```

Start the database:

```shellscript
docker compose up -d
```

Install dependencies:

```shellscript
npm install
```

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

## And keep studying!

- 📖 [Remix docs](https://remix.run/docs)
