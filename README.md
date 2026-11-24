# Brain Face Scanner Server

The back end for [Brain Face Scanner](https://github.com/MelissaBuie/brain-face-scanner), a React app that finds faces in photos. It handles sign-up and sign-in and keeps each user's entry count in PostgreSQL. Face detection runs in the browser with MediaPipe, so the API needs no AI service key.

## Built with

- Node.js and Express
- PostgreSQL with Knex
- bcrypt for password hashing

## Routes

| Method | Route | What it does |
| --- | --- | --- |
| GET | `/` | Health check |
| POST | `/signup` | Creates a user and stores a bcrypt hash of the password |
| POST | `/signin` | Checks email and password, returns the user |
| GET | `/profile/:id` | Returns one user's profile |
| PUT | `/image` | Adds one to the user's entry count |

## Run it locally

You need Node.js 20 and a PostgreSQL database. The server creates its `users` and `login` tables on first start.

```bash
git clone https://github.com/MelissaBuie/brain-face-scanner-server.git
cd brain-face-scanner-server
npm install
cp .env.example .env   # then fill in DATABASE_URL
npm run start:dev
```

## Environment variables

| Name | What it is |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `PORT` | Port to run on (defaults to 3000) |
| `DATABASE_SSL` | Set to `false` for a local database without SSL |

## Deploy for free

1. Create a free PostgreSQL database on [Neon](https://neon.tech) and copy its connection string.
2. On [Render](https://render.com), choose **New > Blueprint** and pick this repo. `render.yaml` sets up a free web service.
3. Paste the Neon connection string as `DATABASE_URL` when Render asks for it.

Render's free plan sleeps after 15 minutes without visits, so the first request after a break takes about a minute.
