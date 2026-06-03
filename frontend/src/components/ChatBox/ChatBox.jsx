import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";

import "./ChatBox.css";

import socket from "../../socket/socket";

const ChatBox = ({
  currentUser,
  selectedUser
}) => {

  const [messages, setMessages] =
    useState([]);

  const [text, setText] =
    useState("");

  // =========================
  // FETCH MESSAGES
  // =========================
  const fetchMessages =
    async () => {

      try {

        const { data } =
          await API.get(
            `/messages/${selectedUser._id}`
          );

        setMessages(
          data.messages
        );

      } catch (error) {

        console.log(error);
      }
    };

  // =========================
  // SEND MESSAGE
  // =========================
  const handleSendMessage =
    async () => {

      if (!text.trim()) return;

      try {

        const { data } =
          await API.post(

            `/messages/send/${selectedUser._id}`,

            {
              text
            }
          );

        setMessages((prev) => [

          ...prev,

          data.message

        ]);

        // SOCKET SEND
        socket.emit(
          "sendMessage",
          {
            ...data.message,

            receiverId:
              selectedUser._id
          }
        );

        setText("");

      } catch (error) {

        console.log(error);
      }
    };

  // =========================
  // RECEIVE REALTIME MESSAGE
  // =========================
  useEffect(() => {

    socket.on(
      "receiveMessage",
      (message) => {

        setMessages(
          (prev) => [

            ...prev,

            message

          ]
        );
      }
    );

    return () => {

      socket.off(
        "receiveMessage"
      );
    };

  }, []);

  // =========================
  // LOAD CHAT
  // =========================
  useEffect(() => {

    const loadMessages =
      async () => {

        if (selectedUser) {

          await fetchMessages();
        }
      };

    loadMessages();

  }, [selectedUser]);

  return (

    <div className="chatbox">

      {/* HEADER */}
      <div className="chatbox-header">

        <img
          src={
            selectedUser.profilePic ||
            "https://i.ibb.co/4pDNDk1/avatar.png"
          }
          alt="profile"
        />

        <h3>
          {selectedUser.name}
        </h3>

      </div>

      {/* MESSAGES */}
      <div className="chatbox-messages">

        {messages.map((msg, index) => (

          <div
            key={msg._id || index}
            className={
              String(msg.sender) ===
              String(currentUser._id)

                ? "my-message"

                : "other-message"
            }
          >
            {msg.text}
          </div>

        ))}

      </div>

      {/* INPUT */}
      <div className="chatbox-input">

        <input
          type="text"
          placeholder="Type message..."
          value={text}
          onChange={(e) =>
            setText(
              e.target.value
            )
          }
          onKeyDown={(e) =>
            e.key === "Enter" &&
            handleSendMessage()
          }
        />

        <button
          onClick={
            handleSendMessage
          }
        >
          Send
        </button>

      </div>

    </div>
  );
};

export default ChatBox;