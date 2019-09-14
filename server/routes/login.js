module.exports = function (db, app, path, ObjectID) {
  var fs = require("fs");
  const collection = db.collection("data");
  const groupCollection = db.collection("groups");


  // gets certain group infomation
  app.post("/getChannels", (req, res) => {
    let data = fs.readFileSync("data.json", "utf8", function (err, data) {
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

  //get groups
  app.get("/groups", (req, res) => {
    // let data = fs.readFileSync("data.json", "utf8", function (err, data) {
    //   if (err) {
    //     console.log(err);
    //   }
    // });
    // data = JSON.parse(data);
    groupCollection.find().toArray((err, data) => {
      res.send(data);
    })
    collection.find().toArray((err, data) => {
      console.log("helweeeeeee")
      console.log(data);
    })

  });

  //get users
  app.get("/users", (req, res) => {

    collection.find({}).toArray((err, data) => {
      if (err) {
        throw err;
      }
      res.send(data);
    })

  });

  //create user
  app.post("/api/register", (req, res) => {


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

    collection.find({ username: newUser.username }).count((err, count) => {
      if (count == 0) {
        collection.insertOne(newUser, (err, dbres) => {
          if (err) throw err;
          // console.log(dbres);
          res.send(dbres);
        })
      } else {
        res.send(false);
        console.log("same");
      }
    })



  });

  //create group
  app.post("/group/create", (req, res) => {
    // let data = fs.readFileSync("data.json", "utf8", function (err, data) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     return data;
    //   }
    // });
    // data = JSON.parse(data);
    // let valid = true;

    if (!req.body) {
      return res.sendStatus(400);
    }
    let newGroup = {};
    newGroup.group = req.body.group;
    newGroup.members = req.body.members;
    newGroup.assis = req.body.selectedAssis;
    newGroup.groupAdmin = req.body.groupAdmin;



    groupCollection.find({ group: req.body.group }).count((err, count) => {
      if (count == 0) {
        groupCollection.insertOne(newGroup, (err, dbres) => {
          if (err) {
            throw err
          }
          req.body.members.forEach(member => {
            collection.updateOne({ username: member }, { $push: { groups: req.body.group } })
          })

          console.log("add");
          groupCollection.find().toArray((err, data) => {
            console.log(data);
          })
          collection.find().toArray((err, data) => {
            console.log(data);
          })
          res.send(true);
        })

      } else {
        console.log("same")
        res.send(false);
      }
    })

    // req.body.members.forEach(member => {
    //   data.users.forEach(user => {
    //     if (member == user.username) {
    //       user.groups.push(req.body.group);
    //     }
    //   });
    // });

    // data.groups.forEach(group => {
    //   if (group.group == newGroup.group) {
    //     valid = false;
    //   }
    // });

    // if (!valid) {
    //   res.send(false);
    // } else {
    //   data.groups.push(newGroup);
    //   res.send(data.groups);
    //   data = JSON.stringify(data);

    //   fs.writeFile("data.json", data, function (err, result) {
    //     if (err) console.log("error", err);
    //   });
    // }
  });

  //create channel in a group
  app.post("/createChannel", (req, res) => {
    let data = fs.readFileSync("data.json", "utf8", function (err, data) {
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
    fs.writeFile("data.json", data, function (err, result) {
      if (err) console.log("error", err);
    });
  });

  //delete channel
  app.post("/deleteChannel", (req, res) => {
    let data = fs.readFileSync("data.json", "utf8", function (err, data) {
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
    fs.writeFile("data.json", data, function (err, result) {
      if (err) console.log("error", err);
    });
  });

  //delete channel member
  app.post("/channel/deleteMember", (req, res) => {
    let data = fs.readFileSync("data.json", "utf8", function (err, data) {
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
    fs.writeFile("data.json", data, function (err, result) {
      if (err) console.log("error", err);
    });
  });

  //add channel member
  app.post("/channel/invite", (req, res) => {
    let data = fs.readFileSync("data.json", "utf8", function (err, data) {
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
    fs.writeFile("data.json", data, function (err, result) {
      if (err) console.log("error", err);
    });
  });

  //give super type to a user
  app.post("/giveSuper", (req, res) => {


    if (!req.body) {
      return res.sendStatus(400);
    }
    let user = req.body

    var objectId = new ObjectID(user._id);

    collection.updateOne({ _id: objectId }, { $set: { type: "super" } }, () => {
      collection.find().toArray((err, data) => {
        res.send(data)
      })
    })


  });
  //delete channel member
  app.post("/group/deleteMember", (req, res) => {
    // let data = fs.readFileSync("data.json", "utf8", function (err, data) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     return data;
    //   }
    // });

    // data = JSON.parse(data);

    if (!req.body) {
      return res.sendStatus(400);
    }
    // console.log(req.body)

    groupCollection.find({ group: req.body.group }).toArray((err, data) => {
      let groupAd = data[0].groupAdmin;
      if (groupAd == req.body.member) {
        res.send(false)
      } else {
        groupCollection.updateOne({ group: req.body.group }, { $pull: { members: req.body.member } }, () => {
          collection.updateOne({ username: req.body.member }, { $pull: { groups: req.body.group } }, () => {
            groupCollection.find().toArray((err, data) => {
              res.send(data);
            })
          })
        })
      }
    })


    // var group_index = data.groups
    //   .map(group => {
    //     return group.group;
    //   })
    //   .indexOf(req.body.group);

    // var member_index = data.groups[group_index].members.indexOf(
    //   req.body.member
    // );

    // if (data.groups[group_index].groupAdmin == req.body.member) {
    //   console.log("admin");
    //   res.send(false);
    // } else {
    //   console.log("delte");
    //   data.groups[group_index].members.splice(member_index, 1);

    //   res.send(data.groups);
    //   data = JSON.stringify(data);
    //   fs.writeFile("data.json", data, function (err, result) {
    //     if (err) console.log("error", err);
    //   });
    // }
  });

  //delete user

  app.post("/api/delete", function (req, res) {
    // let data = fs.readFileSync("data.json", "utf8", function (err, data) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     return data;
    //   }
    // });
    // data = JSON.parse(data);

    if (!req.body) {
      return res.sendStatus(400);
    }
    console.log(req.body.username);
    collection.deleteOne({ username: req.body.username }, (err, doc) => {
      collection.find().toArray((err, data) => {
        res.send(data);
      })
    })
    // data.users.forEach((user, index) => {
    //   if (user.email == req.body.email) {
    //     data.users.splice(index, 1);
    //     res.send(data.users);
    //     data = JSON.stringify(data);

    //     fs.writeFile("data.json", data, function (err, result) {
    //       if (err) console.log("error", err);
    //     });
    //   }
    // });
  });

  //delete group
  app.post("/group/delete", function (req, res) {
    // let data = fs.readFileSync("data.json", "utf8", function (err, data) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     return data;
    //   }
    // });
    // data = JSON.parse(data);
    if (!req.body) {
      return res.sendStatus(400);
    }

    groupCollection.deleteOne({ group: req.body.group }, () => {
      collection.updateMany({}, { $pull: { groups: req.body.group } }, () => {
        groupCollection.find().toArray((err, data) => {

          res.send(data)
        })
      })
    })


    // data.groups.forEach((group, index) => {
    //   if (group.group == req.body.group) {
    //     data.groups.splice(index, 1);

    //     data.users.forEach(user => {
    //       user.groups.forEach((userGroup, index) => {
    //         if (group.group == userGroup) {
    //           user.groups.splice(index, 1);
    //         }
    //       });
    //     });
    //     res.send(data.groups);

    // data = JSON.stringify(data);

    // fs.writeFile("data.json", data, function (err, result) {
    //   if (err) console.log("error", err);
    // });

  });

  //add group member
  app.post("/groups/group/invite", (req, res) => {
    // let data = fs.readFileSync("data.json", "utf8", function (err, data) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     return data;
    //   }
    // });
    // data = JSON.parse(data);

    if (!req.body) {
      return res.sendStatus(400);
    }


    groupCollection.find({ group: req.body.group }).toArray((err, data) => {
      let membersExist = data[0].members
      if (membersExist.includes(req.body.member)) {
        res.send(false);
      } else {
        groupCollection.updateOne({ group: req.body.group }, { $push: { members: req.body.member } }, () => {
          collection.updateOne({ username: req.body.member }, { $push: { groups: req.body.group } }, () => {
            groupCollection.find().toArray((err, data) => {
              res.send(data);
            })
          })
        })
      }
    })

    // var group_index = data.groups
    //   .map(group => {
    //     return group.group;
    //   })
    //   .indexOf(req.body.group);

    // if (data.groups[group_index].members.includes(req.body.member)) {
    //   res.send(false);
    // } else {
    //   data.groups[group_index].members.push(req.body.member);
    //   console.log(data.groups[group_index].members);
    //   res.send(data.groups);
    // }
    // data = JSON.stringify(data);

    // fs.writeFile("data.json", data, function (err, result) {
    //   if (err) console.log("error", err);
    // });
  });

  //authentication
  app.post("/api/auth", function (req, res) {
    // let data = fs.readFileSync("data.json", "utf8", function (err, data) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     return data;
    //   }
    // });
    if (!req.body) {
      return res.sendStatus(400);
    }


    collection.find({ username: req.body.username }).toArray((err, data) => {
      console.log(data[0])
      if (data[0] == undefined) {
        res.send(false);
      } else {
        data[0].valid = true
        console.log(data[0]);
        res.send(data[0])
      }



    })
    //   var customer = {};
    //   data = JSON.parse(data);
    //   data.users.forEach(user => {
    //     if (req.body.email == user.email && req.body.password == user.password) {
    //       customer.email = user.email;
    //       customer.password = user.password;
    //       customer.username = user.username;
    //       customer.birthday = user.birthday;
    //       customer.age = user.age;
    //       customer.type = user.type;
    //       customer.valid = true;
    //       customer.groups = user.groups;
    //     }
    //   });

    //   if (customer.valid == true) {
    //     res.send(customer);
    //   } else {
    //     res.send(false);
    //   }
  });
};
