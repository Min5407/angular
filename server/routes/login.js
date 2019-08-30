module.exports = function(app, path) {
  var fs = require("fs");

  app.post("/getChannels", (req, res) => {
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

    let groupIndex = data.groups
      .map(group => {
        return group.group;
      })
      .indexOf(req.body.group);
    res.send(data.groups[groupIndex]);
  });
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

  app.post("/createChannel", (req, res) => {
    let data = fs.readFileSync("data.json", "utf8", function(err, data) {
      if (err) {
        console.log(err);
      } else {
        return data;
      }
    });
    data = JSON.parse(data);

    let groupIndex = data.groups
      .map(group => {
        return group.group;
      })
      .indexOf(req.body.group);
    console.log(req.body.channel);
    console.log(req.body.group);

    let newChannel = {};
    newChannel.channel = req.body.channel;
    newChannel.members = [];
    if (data.groups[groupIndex].channels == undefined) {
      data.groups[groupIndex].channels = [];
    }
    let channelName = data.groups[groupIndex].channels
      .map(channel => {
        return channel.channel;
      })
      .indexOf(req.body.channel);

    if (channelName == -1) {
      data.groups[groupIndex].channels.push(newChannel);
      res.send(true);
    } else {
      res.send(false);
    }

    data = JSON.stringify(data);
    fs.writeFile("data.json", data, function(err, result) {
      if (err) console.log("error", err);
    });
  });

  app.post("/deleteChannel", (req, res) => {
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

    console.log(req.body.channel, req.body.group);

    let groupIndex = data.groups
      .map(group => {
        return group.group;
      })
      .indexOf(req.body.group);
    console.log(data.groups[groupIndex].channels);
    let channelIndex = data.groups[groupIndex].channels
      .map(channel => {
        return channel.channel;
      })
      .indexOf(req.body.channel);

    data.groups[groupIndex].channels.splice(channelIndex, 1);

    res.send(data.groups[groupIndex].channels);

    data = JSON.stringify(data);
    fs.writeFile("data.json", data, function(err, result) {
      if (err) console.log("error", err);
    });
  });

  app.post("/channel/deleteMember", (req, res) => {
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
    let groupIndex = data.groups
      .map(group => {
        return group.group;
      })
      .indexOf(req.body.group);

    let channelIndex = data.groups[groupIndex].channels
      .map(channel => {
        return channel.channel;
      })
      .indexOf(req.body.channel);

    let memberIndex = data.groups[groupIndex].channels[channelIndex].members
      .map(member => {
        return member;
      })
      .indexOf(req.body.member);

    data.groups[groupIndex].channels[channelIndex].members.splice(
      memberIndex,
      1
    );
    res.send(data.groups[groupIndex].channels);

    data = JSON.stringify(data);
    fs.writeFile("data.json", data, function(err, result) {
      if (err) console.log("error", err);
    });
  });

  app.post("/channel/invite", (req, res) => {
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

    console.log(req.body.channel, req.body.member, req.body.group);

    let groupIndex = data.groups
      .map(group => {
        return group.group;
      })
      .indexOf(req.body.group);

    let channelIndex = data.groups[groupIndex].channels
      .map(channel => {
        return channel.channel;
      })
      .indexOf(req.body.channel);

    let check = data.groups[groupIndex].channels[channelIndex].members.includes(
      req.body.member
    );
    if (!check) {
      data.groups[groupIndex].channels[channelIndex].members.push(
        req.body.member
      );
      res.send(data.groups[groupIndex].channels);
    } else {
      res.send(false);
    }

    let userIndex = data.users
      .map(user => {
        console.log(user);
        return user.username;
      })
      .indexOf(req.body.member);

    if (data.users[userIndex].channels == undefined) {
      data.users[userIndex].channels = [];
    }
    let userChannelIndex = data.users[userIndex].channels
      .map(channel => {
        return channel.group;
      })
      .indexOf(req.body.group);

    if (userChannelIndex == -1) {
      let newChannel = {};
      newChannel.group = req.body.group;
      newChannel.groupChannels = [];
      newChannel.groupChannels.push(req.body.channel);
      data.users[userIndex].channels.push(newChannel);
    } else {
      let newChannel = {};
      newChannel.group = req.body.group;
      newChannel.groupChannels = [];
      newChannel.groupChannels.push(req.body.channel);
      data.users[userIndex].channels.push(newChannel);
    }

    data = JSON.stringify(data);
    fs.writeFile("data.json", data, function(err, result) {
      if (err) console.log("error", err);
    });
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
    console.log(req.body.group, req.body.member);

    var group_index = data.groups
      .map(group => {
        return group.group;
      })
      .indexOf(req.body.group);

    var member_index = data.groups[group_index].members.indexOf(
      req.body.member
    );

    console.log(member_index);

    data.groups[group_index].members.splice(member_index, 1);

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
  app.post("/groups/group/invite", (req, res) => {
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
    var group_index = data.groups
      .map(group => {
        return group.group;
      })
      .indexOf(req.body.group);

    if (data.groups[group_index].members.includes(req.body.member)) {
      res.send(false);
    } else {
      data.groups[group_index].members.push(req.body.member);
      console.log(data.groups[group_index].members);
      res.send(data.groups);
    }
    data = JSON.stringify(data);

    fs.writeFile("data.json", data, function(err, result) {
      if (err) console.log("error", err);
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
