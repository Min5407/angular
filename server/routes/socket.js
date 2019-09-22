module.exports = {

   connect: function (app, io, db) {
      const groupCollection = db.collection("groups");
      var messages = [];
      let valid = false;
      io.on("connection", (socket) => {
         console.log("new connection")

         socket.on("message", data => {
            socket.join(data.channel);
            console.log(data)

            groupCollection.find({ group: data.group }).toArray((err, group) => {
               console.log(group[0])
               let channelIndex = group[0].channels.map(channel => {
                  return channel.channel
               }).indexOf(data.channel)

               group[0].channels[channelIndex].messages.push(data)
               groupCollection.replaceOne({ group: data.group }, group[0], () => {
                  groupCollection.find({ group: data.group }).toArray((err, newGroup) => {
                     console.log(newGroup[0].channels[channelIndex].messages)
                     io.to(data.channel).emit("message", newGroup[0].channels[channelIndex].messages);

                  })
               })
            })


         });

         socket.on("join", data => {


            socket.join(data.channel);
            console.log(data.channel)
            data.message = "Joined the channel:"


            groupCollection.find({ group: data.group }).toArray((err, group) => {
               console.log(group[0].channels + "hellllll")


               let channelIndex = group[0].channels.map(channel => {
                  return channel.channel
               }).indexOf(data.channel)
               if (group[0].channels[channelIndex].messages == undefined) {
                  group[0].channels[channelIndex].messages = []
               }
               for (i = 0; i < group[0].channels[channelIndex].messages.length; i++) {
                  if ((group[0].channels[channelIndex].messages[i].channel == data.channel) && (group[0].channels[channelIndex].messages[i].member == data.member)) {

                     valid = true;
                  }
               }
               console.log(valid);
               if (valid) {
                  console.log("joined already")
               } else {
                  group[0].channels[channelIndex].messages.push(data);

               }

               groupCollection.replaceOne({ group: data.group }, group[0], () => {
                  groupCollection.find({ group: data.group }).toArray((err, newGroup) => {
                     console.log(newGroup[0].channels[channelIndex].messages);
                     io.to(data.channel).emit("joined", newGroup[0].channels[channelIndex].messages);

                  })

               })

            })















         })



      })
   }

}
