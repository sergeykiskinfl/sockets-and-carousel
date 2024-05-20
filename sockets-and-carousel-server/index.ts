import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import {
  ServerToClientEvents,
  ClientToServerEvents,
  PartialUser,
  User,
  Message,
} from "../interfaces";

let manager: User | null = null;

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.static("assets"));

const server = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("initUser", (partialUser: PartialUser) => {
    const user: User = { ...partialUser, id: socket.id, status: "user" };

    if (manager) {
      console.log(`${user.name} was assigned as a regular user!`);
      io.to(manager.id).emit("setNewUser", user);
      io.to(user.id).emit("setNewUser", manager);
    } else {
      // Назначение единственного менеджера, который сможет переписываться со всеми остальными пользователями
      manager = user;
      user.status = "manager";
      console.log(`${user.name} was assigned as a manager!`);
    }

    io.to(user.id).emit("assignManager", manager.id, user.id, user);
  });

  socket.on("sendMessage", (message: Message) => {
    console.log(
      `Sending a message ${message.content} from ${message.senderId} to ${message.receiverId}`
    );
    io.to(message.receiverId).emit("receiveMessage", message);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
