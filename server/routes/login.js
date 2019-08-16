module.exports = function(app, path) {
  users = [
    {
      username: "test1",
      birthday: "10/01/1990",
      age: "19",
      email: "test1@test.com",
      password: "111",
      valid: "",
      type: "super"
    },
    {
      username: "test2",
      birthday: "22/05/2011",
      age: "15",
      email: "test2@test.com",
      password: "222",
      valid: "",
      type: "group"
    },
    {
      username: "test3",
      birthday: "01/01/2012",
      age: "21",
      email: "test3@test.com",
      password: "333",
      valid: "",
      type: "normal"
    },
    {
      username: "test4",
      birthday: "01/01/2012",
      age: "22",
      email: "test4@test.com",
      password: "444",
      valid: "",
      type: "normal"
    }
  ];

  app.get("/users", (req, res) => {
    res.send(users);
  });
  app.post("/api/register", (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    let newUser = {};

    newUser.valid = false;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.username = req.body.username;
    newUser.birthday = req.body.birthday;
    newUser.age = req.body.age;
    newUser.type = "normal";

    users.push(newUser);
    res.send(newUser);
  });

  app.post("/api/auth", function(req, res) {
    if (!req.body) {
      return res.sendStatus(400);
    }
    var customer = {};
    customer.email = "";
    customer.username = "";
    customer.password = "";
    customer.birthday = "";
    customer.age = 0;
    customer.valid = false;
    customer.type = "";

    for (let i = 0; i < users.length; i++) {
      if (
        req.body.email == users[i].email &&
        req.body.password == users[i].password
      ) {
        customer.valid = true;
        customer.email = users[i].email;
        customer.password = users[i].password;
        customer.username = users[i].username;
        customer.birthday = users[i].birthday;
        customer.age = users[i].age;
        customer.type = users[i].type;
        res.send(customer);
      } else {
        // res.send(check);
      }
    }
  });
};
