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

var sampledata = {
  users: [
    {
      username: "Super",
      birthday: "10/01/1990",
      age: "19",
      email: "test1@test.com",
      password: "111",
      valid: "",
      type: "super",
      groups: ["group1", "group2"]
    },
    {
      username: "test2",
      birthday: "22/05/2011",
      age: "15",
      email: "test2@test.com",
      password: "222",
      valid: "",
      type: "group",
      groups: ["group2", "group3"]
    },
    {
      username: "test3",
      birthday: "01/01/2012",
      age: "21",
      email: "test3@test.com",
      password: "333",
      valid: "",
      type: "group assis",
      groups: ["group3", "group1"]
    },
    {
      username: "test4",
      birthday: "01/01/2012",
      age: "22",
      email: "test4@test.com",
      password: "444",
      valid: "",
      type: "normal",
      groups: ["group2"]
    }
  ],
  groups: [
    {
      group: "group1",
      members: ["Super", "test3@test.com"]
    },
    {
      group: "group2",
      members: ["test2@test.com", "test3@test.com"]
    },
    {
      group: "group1",
      members: ["Super", "test4@test.com"]
    }
  ]
};

// fs.writeFile("data.json", JSON.stringify(sampledata), "utf8", function(err) {
//   if (err) {
//     console.log(err);
//   }
// });

app.listen(3000, "127.0.0.1", function() {
  console.log("My Server is starting");
});

require("./routes/login.js")(app, path);
