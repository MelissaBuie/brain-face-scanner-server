# Brain Face Scanner Server

The back end for [Brain Face Scanner](https://github.com/the-codingphoenix/brain-face-scanner), a React app that finds faces in photos. It handles sign-up and sign-in and keeps each user's entry count in PostgreSQL. Face detection runs in the browser with MediaPipe, so the API needs no AI service key.

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

You need Node.js 20 and a PostgreSQL database with `users` and `login` tables.

```bash
git clone https://github.com/the-codingphoenix/brain-face-scanner-server.git
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
