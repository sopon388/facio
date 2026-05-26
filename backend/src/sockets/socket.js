const onlineUsers = new Map();

const socketHandler = (io) => {

  io.on("connection", (socket) => {

    console.log(`⚡ User Connected: ${socket.id}`);


    // =========================
    // USER ONLINE
    // =========================
    socket.on("join", (userId) => {

      onlineUsers.set(userId, socket.id);

      io.emit(
        "onlineUsers",
        Array.from(onlineUsers.keys())
      );

      console.log(`✅ User Online: ${userId}`);
    });


    // =========================
    // SEND MESSAGE
    // =========================
    socket.on("sendMessage", (messageData) => {

      const {
        receiverId
      } = messageData;

      const receiverSocketId =
        onlineUsers.get(receiverId);

      if (receiverSocketId) {

        io.to(receiverSocketId).emit(
          "receiveMessage",
          messageData
        );
      }
    });


    // =========================
    // TYPING INDICATOR
    // =========================
    socket.on("typing", ({
      receiverId,
      senderName
    }) => {

      const receiverSocketId =
        onlineUsers.get(receiverId);

      if (receiverSocketId) {

        io.to(receiverSocketId).emit(
          "typing",
          {
            senderName
          }
        );
      }
    });


    // =========================
    // STOP TYPING
    // =========================
    socket.on("stopTyping", ({
      receiverId
    }) => {

      const receiverSocketId =
        onlineUsers.get(receiverId);

      if (receiverSocketId) {

        io.to(receiverSocketId).emit(
          "stopTyping"
        );
      }
    });


    // =========================
    // DISCONNECT
    // =========================
    socket.on("disconnect", () => {

      for (const [userId, socketId] of onlineUsers.entries()) {

        if (socketId === socket.id) {

          onlineUsers.delete(userId);

          break;
        }
      }

      io.emit(
        "onlineUsers",
        Array.from(onlineUsers.keys())
      );

      console.log(`❌ User Disconnected`);
    });

  });
};

module.exports = socketHandler;