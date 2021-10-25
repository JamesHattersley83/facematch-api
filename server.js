// create express server
const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
require('dotenv').config();
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: process.env.DB_PASSWORD,
    database: 'facematch',
  },
});

// middlewear
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// signin endpoint --> POST
app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

// register endpoint --> POST
app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

// profile:id endpoint --> GET
app.get('/profile/:id', (req, res) => {
  profile.handleProfile(req, res, db);
});

// image endpoint --> PUT
app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});

// image endpoint --> POST
app.post('/imageUrl', (req, res) => {
  image.handleApiCall(req, res);
});

// server listening on port 3000
app.listen(process.env.PORT || 4000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
