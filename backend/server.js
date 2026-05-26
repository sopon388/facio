require("dotenv").config();

const http = require("http");

const mongoose = require("mongoose");

const app = require("./src/app");

const connectDB = require("./src/config/db");

const socketHandler = require("./src/sockets/socket");


// ==============================
// HANDLE UNCAUGHT EXCEPTIONS
// ==============================
process.on("uncaughtException", (err) => {

  console.error("❌ Uncaught Exception:", err.message);

  process.exit(1);
});


// ==============================
// CONNECT DATABASE
// ==============================
connectDB();


// ==============================
// CREATE HTTP SERVER
// ==============================
const server = http.createServer(app);


// ==============================
// SOCKET.IO SETUP
// ==============================
const io = require("socket.io")(server, {

  cors: {

    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL
    ],

    methods: ["GET", "POST"],

    credentials: true
  }
});


// ==============================
// SOCKET HANDLER
// ==============================
socketHandler(io);


// ==============================
// DEFAULT ROUTE
// ==============================
app.get("/", (req, res) => {

  res.status(200).json({
    success: true,

    message: "🚀 Social Media Backend Running"
  });
});


// ==============================
// SERVER LISTEN
// ==============================
const PORT = process.env.PORT || 5000;

const appServer = server.listen(PORT, () => {

  console.log(
    `🚀 Server Running On Port ${PORT}`
  );
});


// ==============================
// HANDLE UNHANDLED REJECTION
// ==============================
process.on("unhandledRejection", (err) => {

  console.error(
    `❌ Unhandled Rejection: ${err.message}`
  );

  appServer.close(() => {

    process.exit(1);
  });
});


// ==============================
// HANDLE SIGTERM
// ==============================
process.on("SIGTERM", () => {

  console.log("⚠️ SIGTERM RECEIVED");

  appServer.close(() => {

    console.log("💤 Process Terminated");
  });
});