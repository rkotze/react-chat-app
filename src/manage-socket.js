import io from "socket.io-client";

export default function manageSocket() {
  const socket = io("http://localhost:3000");

  return {
    connect(fn) {
      socket.on("connect", fn);
    },
    updateChat(fn) {
      socket.on("updateChat", fn);
    },
    updateRooms(fn) {
      socket.on("updateRooms", fn);
    },
    sendChat(message) {
      socket.emit("sendChat", message);
    },
    addUser(username) {
      socket.emit("addUser", username);
    },
    switchRoom(room) {
      socket.emit("switchRoom", room);
    }
  };
}
