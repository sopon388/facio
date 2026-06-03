import { io } from "socket.io-client";

const socket = io(
  "https://facio-1-y5eh.onrender.com"
);

export default socket;