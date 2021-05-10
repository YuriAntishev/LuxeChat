import * as express from 'express';
import * as cors from 'cors';
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import {
    addUser,
    removeUser,
    getUsersInRoom
} from "./actions";

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.on("connection", (socket: Socket) => {
    console.log("connection created");

    // Join a conversation
    const { room, name } = socket.handshake.query;

    const { user } = addUser({ id: socket.id, name: name, room: room });

    socket.join(user.room);

    io.in(user.room).emit('allUsersData', {
        room: user.room,
        users: getUsersInRoom(user.room)
    });
    console.log("getUsersInRoom", getUsersInRoom(user.room))

    // Listen for new messages
    socket.on("send message", (data) => {
        io.in(user.room).emit("send message", data);
    });

    // Listen typing events
    socket.on("start typing message", (data) => {
        io.in(user.room).emit("start typing message", data);
    });
    socket.on("stop typing message", (data) => {
        io.in(user.room).emit("stop typing message", data);
    });

    socket.on("disconnect", () => {
        console.log(`${socket.id} left chat!`);
        removeUser(socket.id);
        io.in(user.room).emit("user leave chat", user);
        socket.leave(user.room as string);
    });
});

app.get('/', function (req, res) {
    res.send("Backend is up running");
});

server.listen(port, () =>
    console.log(`App running on port ${port}.`)
);