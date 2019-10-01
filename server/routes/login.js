module.exports = function (db, app, path, ObjectID, formidable) {
  const collection = db.collection("data");
  const groupCollection = db.collection("groups");

  //  image upload
  app.post('/api/upload', (req, res) => {
    var form = new formidable.IncomingForm({ uploadDir: './userImages' })
    form.keepExtenstions = true;

    form.on('fileBegin', (name, file) => {
      file.path = form.uploadDir + "/" + file.name;
    })
    form.parse(req);
  })



  // gets certain group infomation
  app.post("/getChannels", (req, res) => {


    if (!req.body) {
      return res.sendStatus(400);
    }

    groupCollection.find({ group: req.body.group }).toArray((err, data) => {
      res.send(data[0]);
    })

  });

  //get groups
  app.get("/groups", (req, res) => {

    groupCollection.find().toArray((err, data) => {
      res.send(data);
    })
    collection.find().toArray((err, data) => {
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
  //get channel users
  app.post("/channelUsers", (req, res) => {

    groupCollection.find({ group: req.body.group }).toArray((err, data) => {

      let channelIndex = data[0].channels.map(channel => {
        return channel.channel
      }).indexOf(req.body.channel)
      let channelUsers = data[0].channels[channelIndex].members;
      res.send(channelUsers);
    })
  })

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
    newUser.imageName = req.body.imageName;
    newUser.valid = "";
    newUser.groups = [];
    collection.find({ username: newUser.username }).count((err, count) => {
      if (count == 0) {
        collection.insertOne(newUser, (err, dbres) => {
          if (err) throw err;
          res.send(dbres);
        })
      } else {
        res.send(false);
      }
    })



  });

  //create group
  app.post("/group/create", (req, res) => {


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

          groupCollection.find().toArray((err, data) => {
          })
          collection.find().toArray((err, data) => {
          })
          res.send(true);
        })

      } else {
        console.log("same")
        res.send(false);
      }
    })

  });

  //create channel in a group
  app.post("/createChannel", (req, res) => {

    groupCollection.find({ group: req.body.group }).toArray((err, data) => {




      if (data[0].channels == undefined) {
        groupCollection.updateOne({ group: req.body.group }, { $push: { channels: { channel: req.body.channel, members: [] } } }, () => {
          res.send(true);
        })
      } else if (data[0].channels != undefined) {
        let channelName = data[0].channels
          .map(channel => {
            return channel.channel;
          })
          .indexOf(req.body.channel);
        if (channelName != -1) {

          res.send(false);
        } else {
          console.log("add")

          groupCollection.updateOne({ group: req.body.group }, { $push: { channels: { channel: req.body.channel, members: [] } } }, () => {
            res.send(true)
          })
        }

      }



    })


  });

  //delete channel
  app.post("/deleteChannel", (req, res) => {

    if (!req.body) {
      return res.sendStatus(400);
    }


    groupCollection.updateOne({ group: req.body.group }, { $pull: { channels: { channel: req.body.channel } } }, () => {
      groupCollection.find({ group: req.body.group }).toArray((err, data) => {
        res.send(data[0].channels);
        console.log(req.body);
      })
    });



  });

  //delete channel member
  app.post("/channel/deleteMember", (req, res) => {


    console.log(req.body)
    console.log("--------------")

    if (!req.body) {
      return res.sendStatus(400);
    }
    groupCollection.find({ group: req.body.group }).toArray((err, data) => {

      let channelIndex = data[0].channels
        .map(channel => {
          return channel.channel;
        })
        .indexOf(req.body.channel);

      let memberIndex = data[0].channels[channelIndex].members
        .map(member => {
          return member;
        })
        .indexOf(req.body.member);

      data[0].channels[channelIndex].members.splice(
        memberIndex,
        1
      );
      groupCollection.replaceOne({ group: req.body.group }, data[0], () => {
        groupCollection.find({ group: req.body.group }).toArray((err, data) => {
          res.send(data[0].channels)
        })
      })

    })


  });

  //add channel member
  app.post("/channel/invite", (req, res) => {

    console.log(req.body)

    if (!req.body) {
      return res.sendStatus(400);
    }



    groupCollection.find({ group: req.body.group }).toArray((err, data) => {
      let channelIndex = data[0].channels.map(channel => {
        return channel.channel
      }).indexOf(req.body.channel)

      let check = data[0].channels[channelIndex].members.includes(
        req.body.member)
      data[0].channels[channelIndex].members;




      if (!check) {
        data[0].channels[channelIndex].members.push(req.body.member);

        groupCollection.replaceOne({ group: req.body.group }, data[0], () => {
          groupCollection.find({ group: req.body.group }).toArray((err, data) => {
            res.send(data[0].channels)
          })
        })

      } else {

        res.send(false);
      }


    })


  });

  //give super type to a user
  app.post("/giveSuper", (req, res) => {

    console.log(req.body)

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
    console.log(req.body)

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



  });

  //delete user

  app.post("/api/delete", function (req, res) {


    if (!req.body) {
      return res.sendStatus(400);
    }
    collection.deleteOne({ username: req.body.username }, (err, doc) => {
      collection.find().toArray((err, data) => {
        res.send(data);
      })
    })

  });

  //delete group
  app.post("/group/delete", function (req, res) {

    if (!req.body) {
      return res.sendStatus(400);
    }
    console.log("-----")

    console.log(req.body)
    console.log("-----")

    groupCollection.deleteOne({ group: req.body.group }, () => {
      collection.updateMany({}, { $pull: { groups: req.body.group } }, () => {
        groupCollection.find().toArray((err, data) => {

          res.send(data)
        })
      })
    })




  });

  //add group member
  app.post("/groups/group/invite", (req, res) => {

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

  });

  //authentication
  app.post("/api/auth", function (req, res) {

    if (!req.body) {
      return res.sendStatus(400);
    }

    collection.find({ username: req.body.username }).toArray((err, data) => {

      if (data[0] == undefined) {
        res.send(false);

      }
      else if (data[0].password == req.body.password) {
        data[0].valid = true
        res.send(data[0])

      } else {
        res.send(false);
      }




    })

  });
};
