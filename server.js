// create express server
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// create dummy database to test endpoints
const database = {
  users: [
    {
      id: 123,
      name: "James",
      email: "james@gmail.com",
      password: "leeds",
      entries: 0,
      joined: new Date()
    },
    {
      id: 456,
      name: "John",
      email: "john@gmail.com",
      password: "password",
      entries: 0,
      joined: new Date()
    }
  ]
};

// body-parser middlewear
app.use(bodyParser.json());

// test server is working with GET request
app.get("/", (req, res) => {
  res.send(database.users);
});

// signin endpoint --> POST
app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("error logging in");
  }
  res.json();
});

// register endpoint --> POST
app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: 125,
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  });
  res.json(database.users[database.users.length - 1]);
});

// server listening on port 3000
app.listen(3000, () => {
  console.log("app is running on port 3000");
});
