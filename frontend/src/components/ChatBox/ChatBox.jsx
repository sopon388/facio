import {
  useEffect,
  useState,
  useRef
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

  const [selectedFile, setSelectedFile] =
    useState(null);

  // =========================
  // FILE INPUT REF
  // =========================
  const fileInputRef =
    useRef(null);

  // =========================
  // AUTO SCROLL REF
  // =========================
  const messagesEndRef =
    useRef(null);


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
  // SELECT FILE
  // =========================
  const handleFileChange =
    (e) => {

      const file =
        e.target.files[0];

      if (!file) return;


      // 50 MB LIMIT
      if (
        file.size >
        50 * 1024 * 1024
      ) {

        alert(
          "File size must be less than 50 MB"
        );

        e.target.value = "";

        return;
      }


      setSelectedFile(file);

    };


  // =========================
  // SEND MESSAGE
  // =========================
  const handleSendMessage =
    async () => {

      // Don't send empty message
      if (
        !text.trim() &&
        !selectedFile
      ) {

        return;

      }


      try {

        // =========================
        // FORM DATA
        // =========================

        const formData =
          new FormData();


        // Add text
        formData.append(
          "text",
          text
        );


        // Add file
        if (selectedFile) {

          formData.append(
            "file",
            selectedFile
          );

        }


        // =========================
        // SEND TO BACKEND
        // =========================

        const { data } =
          await API.post(

            `/messages/send/${selectedUser._id}`,

            formData

          );


        // =========================
        // ADD MESSAGE LOCALLY
        // =========================

        setMessages((prev) => [

          ...prev,

          data.message

        ]);


        // =========================
        // SOCKET SEND
        // =========================

        socket.emit(
          "sendMessage",
          {

            ...data.message,

            receiverId:
              selectedUser._id

          }
        );


        // =========================
        // CLEAR INPUT
        // =========================

        setText("");

        setSelectedFile(null);


        // Clear actual file input
        if (
          fileInputRef.current
        ) {

          fileInputRef.current.value =
            "";

        }


      } catch (error) {

        console.log(
          "Send message error:",
          error
        );

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


  // =========================
  // AUTO SCROLL
  // =========================
  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages]);


  // =========================
  // DISPLAY MESSAGE
  // =========================
  const renderMessage =
    (msg) => {

      return (

        <>

          {/* TEXT */}
          {msg.text && (

            <div className="message-text">

              {msg.text}

            </div>

          )}


          {/* IMAGE */}
          {msg.fileType === "image" && (
            
            <img
              src={msg.fileUrl}
              alt={msg.fileName || "image"}
              className="chat-image"
              onClick={() =>
                window.open(
                  msg.fileUrl,
                  "_blank"
                )
              }
            />

          )}


          {/* VIDEO */}
          {msg.fileType === "video" && (

            <video
              src={msg.fileUrl}
              controls
              className="chat-video"
            />

          )}


          {/* OTHER FILE */}
          {msg.fileType === "file" && (

            <a
              href={msg.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="chat-file"
            >

              📎 {msg.fileName || "Open file"}

            </a>

          )}

        </>

      );

    };


  return (

    <div className="chatbox">

      {/* =========================
          HEADER
      ========================= */}

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


      {/* =========================
          MESSAGES
      ========================= */}

      <div className="chatbox-messages">

        {messages.map((msg, index) => (

          <div
            key={
              msg._id || index
            }

            className={
              String(msg.sender) ===
              String(currentUser._id)

                ? "my-message"

                : "other-message"
            }
          >

            {renderMessage(msg)}

          </div>

        ))}


        {/* AUTO SCROLL TARGET */}
        <div
          ref={messagesEndRef}
        />

      </div>


      {/* =========================
          SELECTED FILE PREVIEW
      ========================= */}

      {selectedFile && (

        <div className="selected-file">

          📎 {selectedFile.name}

          <button
            onClick={() => {

              setSelectedFile(null);

              if (
                fileInputRef.current
              ) {

                fileInputRef.current.value =
                  "";

              }

            }}
          >
            ✕
          </button>

        </div>

      )}


      {/* =========================
          INPUT
      ========================= */}

      <div className="chatbox-input">


        {/* FILE BUTTON */}

        <button
          type="button"
          className="file-button"
          onClick={() =>
            fileInputRef.current?.click()
          }
        >
          📎
        </button>


        {/* HIDDEN FILE INPUT */}

        <input
          ref={fileInputRef}
          type="file"
          hidden
          accept="
            image/*,
            video/*,
            .pdf,
            .doc,
            .docx,
            .xls,
            .xlsx,
            .ppt,
            .pptx,
            .txt,
            .zip
          "
          onChange={
            handleFileChange
          }
        />


        {/* TEXT INPUT */}

        <input
          type="text"
          placeholder="Type message..."
          value={text}
          onChange={(e) =>
            setText(
              e.target.value
            )
          }
          onKeyDown={(e) => {

            if (
              e.key === "Enter"
            ) {

              handleSendMessage();

            }

          }}
        />


        {/* SEND BUTTON */}

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