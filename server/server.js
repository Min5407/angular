var express = require("express");
var app = express();
var path = require("path");
var cors = require("cors");
var http = require("http").Server(app);
const MongoClient = require("mongodb").MongoClient; // require MongoClient functionality
var ObjectID = require("mongodb").ObjectID; //require ObjectID functionality
const io = require('socket.io')(http);
const sockets = require('./routes/socket.js');

var fs = require("fs");

var bodyParser = require("body-parser");
const url = "mongodb://localhost:27017";
app.use(bodyParser.json());
app.use(cors());
// app.use(express.static(path.join(__dirname, "../dist/assignment1")));

MongoClient.connect(url, { poolSize: 10, useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    return console.log(err);
  }
  const dbName = "mydb"
  const db = client.db(dbName);
  sockets.connect(app, io, db);
  require("./listen.js")(http);
  require("./routes/login.js")(db, app, path, ObjectID);


})


