module.exports = function(app, path) {
  groups = [
    {
      group: "group1",
      assis: "test3",
      members: ["Super", "test2", "test4"]
    },
    {
      group: "group2",
      assis: "test2",
      members: ["test2", "test3", "test4"]
    },
    {
      group: "group3",
      assis: "test4",
      members: ["Super", "test4"]
    }
  ];

  users = [
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
  ];
  app.get("/groups", (req, res) => {
    res.send(groups);
  });
  app.get("/users", (req, res) => {
    res.send(users);
  });
  app.post("/api/register", (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    let newUser = {};

    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.username = req.body.username;
    newUser.birthday = req.body.birthday;
    newUser.age = req.body.age;
    newUser.type = "normal";
    newUser.valid = "";
    newUser.groups = [];

    users.forEach(user => {
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
      users.push(newUser);
    }
    res.send(newUser);
  });
  app.post("/group/create", (req, res) => {
    let valid = true;

    if (!req.body) {
      return res.sendStatus(400);
    }
    let newGroup = {};
    newGroup.group = req.body.group;
    newGroup.members = req.body.members;
    newGroup.assis = req.body.selectedAssis;

    groups.forEach(group => {
      if (group.group == newGroup.group) {
        valid = false;
      }
    });

    if (!valid) {
      res.send(false);
    } else {
      groups.push(newGroup);
      res.send(groups);
    }
  });

  app.post("/group/deleteMember", (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    groups.forEach(group => {
      group.members.forEach((member, index) => {
        if (member == req.body.member) {
          group.members.splice(index, 1);
        }
      });
    });
    res.send(groups);
  });

  app.post("/api/delete", function(req, res) {
    if (!req.body) {
      return res.sendStatus(400);
    }

    users.forEach((user, index) => {
      if (user.email == req.body.email) {
        users.splice(index, 1);
      }
    });
    res.send(users);
  });

  app.post("/group/delete", function(req, res) {
    if (!req.body) {
      return res.sendStatus(400);
    }

    groups.forEach((group, index) => {
      if (group.group == req.body.group) {
        groups.splice(index, 1);
      }
    });
    res.send(groups);
  });

  app.post("/api/auth", function(req, res) {
    if (!req.body) {
      return res.sendStatus(400);
    }
    var customer = {};

    users.forEach(user => {
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
