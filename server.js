require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');


const signup = require('./controllers/signup');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const { setupDatabase } = require('./db/setup');


const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        // Hosted databases (Neon, Render) need SSL; a local one usually doesn't.
        ssl: process.env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false },
    },
});

const app = express();

app.use(cors());

app.use(bodyParser.json());


app.get('/', (req, res) => {res.send('success')})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

app.post('/signup', (req, res) => {signup.handleSignup(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});

app.put('/image', (req, res) => {image.handleImagePut(req, res, db)});



const PORT = process.env.PORT || 3000;

setupDatabase(db)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`app is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Could not set up the database:', err.message);
        process.exit(1);
    });
