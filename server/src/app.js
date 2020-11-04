const express = require("express");
const socket = require("socket.io");
const http = require("http");
const router = require("./routes");
const { addUser, getUser, getUsersInRoom, removeUser } = require("./users");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socket(server);

io.on("connection", (socket) => {
    socket.on("join", ({ name, room }, callback) => {
        console.log(socket.id);
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);

        socket.emit("message", {
            user: "admin",
            text: `${user.name}, welcome to the room ${user.room}`,
        });
        socket.broadcast.to(user.room).emit("message", {
            user: "admin",
            text: `${user.name} has joined!`,
        });

        socket.join(user.room);
    });
    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);
        console.log("here");
        console.log(socket.id);
        io.to(user.room).emit("message", { user: user.name, text: message });
        callback();
    });

    socket.on("disconnect", () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit("message", {
                user: "admin",
                text: `${user.name} has left`,
            });
        }
    });
});

// app.use(router);

server.listen(PORT, () => console.log(`Server has started on ${PORT}`));
