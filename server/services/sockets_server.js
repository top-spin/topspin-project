const ioApp = require("http").createServer();
const io = require("socket.io")(ioApp);
const ioPort = 3100;

module.exports = app => {
  let socketCount = 0;
  io.on("connection", socket => {
    socketCount++;
    console.log(`Socket opened: ${socket.id} Socket count: ${socketCount}`);

    socket.on("saveMessage", (message,player_sending,player_receiving) => {
      const db = app.get("db");
      db.messages.insert(message).then(newMessage=>{
          io.emit("updateMessage", {
            player_sending,
            player_receiving
          });
      }).catch(console.log)
    }); 
  });
  io.listen(ioPort);
  console.log(`Sockets listening on port ${ioPort}`);
};