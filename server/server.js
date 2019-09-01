var express = require("express");
var app = express();
var path = require("path");
var cors = require("cors");
var http = require("http").Server(app);
var fs = require("fs");

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../dist/assignment1")));

app.listen(3000, "127.0.0.1", function() {
  console.log("My Server is starting");
});

require("./routes/login.js")(app, path);
