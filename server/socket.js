const init = (server) => {
  let io = require("socket.io")(server);
  // var cookie = require("cookies");

  io.on("connection", (socket) => {
    console.log("Connected: ", socket.id);

    socket.on("notify", (msg) => {
      console.log(msg.action);
    });

    // let map = new Map();
    // socket.on("currentUser", (currentUser) => {
    //   map.set(socket.id, currentUser._id);
    //   console.log(map.get(socket.id));
    // });

    socket.on("notify", (msg) => {
      const notification = {
        user: msg.user,
        snippet: msg.snippet,
        event: msg.action,
      };
      // console.log(notification);
      socket.emit("notification", notification);
      // io.to(socket.id).emit("notification", notification);
    });

    socket.on("disconnect", () => console.log("User disconnected"));
  });
};

const message = () => {};

module.exports = { init };
