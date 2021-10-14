// create express server
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();

// create dummy database to test endpoints
const database = {
  users: [
    {
      id: '123',
      name: 'James',
      email: 'james@gmail.com',
      password: 'leeds',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '456',
      name: 'John',
      email: 'john@gmail.com',
      password: 'password',
      entries: 0,
      joined: new Date(),
    },
  ],
};

// middlewear
app.use(bodyParser.json());
app.use(cors());

// test server is working with GET request
app.get('/', (req, res) => {
  res.send(database.users);
});

// signin endpoint --> POST
app.post('/signin', (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json('success');
  } else {
    res.status(400).json('error logging in');
  }
  res.json();
});

// register endpoint --> POST
app.post('/register', (req, res) => {
  const { email, name, password } = req.body;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // Store hash in your password DB.
      console.log(hash);
    });
  });

  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

// profile:id endpoint --> GET
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  // loop through dummy database to check endpoint
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json('user not found');
  }
});

// image endpoint --> PUT
app.post('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  // loop through dummy database to check endpoint
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json('user not found');
  }
});

// server listening on port 3000
app.listen(4000, () => {
  console.log('app is running on port 4000');
});
