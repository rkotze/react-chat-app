import io from "socket.io-client";

export default function manageSocket() {
  const socket = io("http://localhost:3000");

  return {
    id: null,
    connect(fn) {
      socket.on("connect", () => {
        this.id = socket.id;
        fn();
      });
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
