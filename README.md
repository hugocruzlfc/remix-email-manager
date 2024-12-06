# Welcome to Project!

## Getting Started

Clone the repo and create .env file with the following content:

```shellscript
 touch .env && echo "DATABASE_URL=postgresql://postgres:postgres@localhost:5432/emailmanager_db?schema=public" > .env
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

## Understanding the project

This project is a simple email manager. It has a list of emails and you can add simulating a user and delete if you are an admin.

The project has 3 main routes.

“/” the landing page to create the emails, simulating that it is a random user who enters the app.

“/admin-dashboard” for the core of the app where the administrator reviews the available emails. He has the possibility to filter them, paginate them and see their details.

“/email-details” where the administrator can read the emails.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

## And keep studying!

- 📖 [Remix docs](https://remix.run/docs)
