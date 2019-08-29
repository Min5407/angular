module.exports = function(app, path) {
  var fs = require("fs");

  // users = [
  //   {
  //     username: "Super",
  //     birthday: "10/01/1990",
  //     age: "19",
  //     email: "test1@test.com",
  //     password: "111",
  //     valid: "",
  //     type: "super",
  //     groups: ["group1", "group2"]
  //   },
  //   {
  //     username: "test2",
  //     birthday: "22/05/2011",
  //     age: "15",
  //     email: "test2@test.com",
  //     password: "222",
  //     valid: "",
  //     type: "group",
  //     groups: ["group2", "group3"]
  //   },
  //   {
  //     username: "test3",
  //     birthday: "01/01/2012",
  //     age: "21",
  //     email: "test3@test.com",
  //     password: "333",
  //     valid: "",
  //     type: "group assis",
  //     groups: ["group3", "group1"]
  //   },
  //   {
  //     username: "test4",
  //     birthday: "01/01/2012",
  //     age: "22",
  //     email: "test4@test.com",
  //     password: "444",
  //     valid: "",
  //     type: "normal",
  //     groups: ["group2"]
  //   }
  // ];
  app.get("/groups", (req, res) => {
    let data = fs.readFileSync("data.json", "utf8", function(err, data) {
      if (err) {
        console.log(err);
      }
    });
    data = JSON.parse(data);
    res.send(data.groups);
  });
  app.get("/users", (req, res) => {
    let data = fs.readFileSync("data.json", "utf8", function(err, data) {
      if (err) {
        console.log(err);
      }
    });
    data = JSON.parse(data);

    res.send(data.users);
  });
  app.post("/api/register", (req, res) => {
    let data = fs.readFileSync("data.json", "utf8", function(err, data) {
      if (err) {
        console.log(err);
      }
    });
    data = JSON.parse(data);

    if (!req.body) {
      return res.sendStatus(400);
    }
    let newUser = {};

    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.username = req.body.username;
    newUser.birthday = req.body.birthday;
    newUser.type = req.body.type;
    newUser.valid = "";
    newUser.groups = [];

    data.users.forEach(user => {
      if (user.email == newUser.email && user.username == newUser.username) {
        newUser.valid = "bothFalse";
        return;
      } else if (user.email == newUser.email) {
        newUser.valid = "emailFalse";
        return;
      } else if (user.username == newUser.username) {
        newUser.valid = "usernameFalse";
        return;
      }
    });
    if (newUser.valid == "") {
      data.users.push(newUser);
      data = JSON.stringify(data);
      fs.writeFile("data.json", data, function(err, result) {
        if (err) console.log("error", err);
      });
    }
    res.send(newUser);
  });
  app.post("/group/create", (req, res) => {
    let data = fs.readFileSync("data.json", "utf8", function(err, data) {
      if (err) {
        console.log(err);
      } else {
        return data;
      }
    });
    data = JSON.parse(data);
    let valid = true;

    if (!req.body) {
      return res.sendStatus(400);
    }
    let newGroup = {};
    newGroup.group = req.body.group;
    newGroup.members = req.body.members;
    newGroup.assis = req.body.selectedAssis;
    newGroup.groupAdmin = req.body.groupAdmin;

    req.body.members.forEach(member => {
      data.users.forEach(user => {
        if (member == user.username) {
          user.groups.push(req.body.group);
        }
      });
    });

    data.groups.forEach(group => {
      if (group.group == newGroup.group) {
        valid = false;
      }
    });

    if (!valid) {
      res.send(false);
    } else {
      data.groups.push(newGroup);
      res.send(data.groups);
      data = JSON.stringify(data);

      fs.writeFile("data.json", data, function(err, result) {
        if (err) console.log("error", err);
      });
    }
  });

  app.post("/group/deleteMember", (req, res) => {
    let data = fs.readFileSync("data.json", "utf8", function(err, data) {
      if (err) {
        console.log(err);
      } else {
        return data;
      }
    });

    data = JSON.parse(data);

    if (!req.body) {
      return res.sendStatus(400);
    }
    data.groups.forEach(group => {
      group.members.forEach((member, index) => {
        if (member == req.body.member) {
          group.members.splice(index, 1);
        }
      });
    });
    // data.users.forEach(user => {
    //   if (user.username == req.body.member) {
    //     user.groups.forEach();
    //   }
    //   user.groups.forEach((userGroup, index) => {
    //     if (group.group == userGroup) {
    //       user.groups.splice(index, 1);
    //     }
    //   });
    // });

    res.send(data.groups);
    data = JSON.stringify(data);
    fs.writeFile("data.json", data, function(err, result) {
      if (err) console.log("error", err);
    });
  });

  app.post("/api/delete", function(req, res) {
    let data = fs.readFileSync("data.json", "utf8", function(err, data) {
      if (err) {
        console.log(err);
      } else {
        return data;
      }
    });
    data = JSON.parse(data);

    if (!req.body) {
      return res.sendStatus(400);
    }

    data.users.forEach((user, index) => {
      if (user.email == req.body.email) {
        data.users.splice(index, 1);
        res.send(data.users);
        data = JSON.stringify(data);

        fs.writeFile("data.json", data, function(err, result) {
          if (err) console.log("error", err);
        });
      }
    });
  });

  app.post("/group/delete", function(req, res) {
    let data = fs.readFileSync("data.json", "utf8", function(err, data) {
      if (err) {
        console.log(err);
      } else {
        return data;
      }
    });
    data = JSON.parse(data);
    if (!req.body) {
      return res.sendStatus(400);
    }

    data.groups.forEach((group, index) => {
      if (group.group == req.body.group) {
        data.groups.splice(index, 1);

        data.users.forEach(user => {
          user.groups.forEach((userGroup, index) => {
            if (group.group == userGroup) {
              user.groups.splice(index, 1);
            }
          });
        });
        res.send(data.groups);

        data = JSON.stringify(data);

        fs.writeFile("data.json", data, function(err, result) {
          if (err) console.log("error", err);
        });
      }
    });
  });

  app.post("/api/auth", function(req, res) {
    let data = fs.readFileSync("data.json", "utf8", function(err, data) {
      if (err) {
        console.log(err);
      } else {
        return data;
      }
    });
    if (!req.body) {
      return res.sendStatus(400);
    }
    var customer = {};
    data = JSON.parse(data);
    data.users.forEach(user => {
      if (req.body.email == user.email && req.body.password == user.password) {
        customer.email = user.email;
        customer.password = user.password;
        customer.username = user.username;
        customer.birthday = user.birthday;
        customer.age = user.age;
        customer.type = user.type;
        customer.valid = true;
        customer.groups = user.groups;
      }
    });

    if (customer.valid == true) {
      res.send(customer);
    } else {
      res.send(false);
    }
  });
};
