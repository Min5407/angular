module.exports = {
   connect: function (app, io, db) {
      var messages = [];
      io.on("connection", (socket) => {
         console.log("new connection")

         socket.on("message", data => {
            io.emit("message", data);
            console.log("send" + data.member + data.message);
         });

         socket.on("join", (data) => {

            socket.join(data.channel);
            console.log(data.member + " joined the room: " + data.channel)
            socket.broadcast.to(data.channel).emit("joined", { member: data.user, message: "has joined the channel." })
         })


         // socket.on("message", function (data) {
         //    console.log(data);
         //    io.in(data.channel).emit("newMessage", { member: data.user, message: data.message, channel: data.channel })
         // })
      })
   }
}