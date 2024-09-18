// socket.js
const socketio = require("socket.io");
const session = require("express-session");
const { sessionMiddleware } = require("./utils");

let io = null;

module.exports = {
  init: (server) => {
    io = new socketio.Server(server, {
      cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    // io.engine.use(session({
    //     name: 'session',
    //     secret: process.env.SESSION_SECRET,
    //     resave: false,
    //     saveUninitialized: true,
    //     cookie: {secure: false} // Set to true for HTTPS environments
    // }));

    io.use((socket, next) => {
      sessionMiddleware(socket.request, {}, next);
    });

    // Your Socket.IO event handlers
    io.on("connection", (socket) => {
      const session = socket.request.session;

      if (session?.user) {
        // join the user's room
        socket.join(session.user.id);

        console.log("User is logged in:", session.user.id);
      } else {
        console.log("User is not logged in");
        // do disconnect
        socket.disconnect();
        return;
      }

      console.log("Client connected");

      socket.on("disconnect", () => {
        // leave the user's room
        socket.leave(session.user.id);

        console.log("Client disconnected");
      });

      socket.on("foo", (data) => {
        console.log("foo", data);
        io.emit("foo", data);
      });
    });
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.IO not initialized!");
    }
    return io;
  },
};
