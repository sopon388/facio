import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";

import Navbar from "../../components/Navbar/Navbar";

import ChatBox from "../../components/ChatBox/ChatBox";

import "./Messages.css";

const Messages = () => {

  const [users, setUsers] =
    useState([]);

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [currentUser, setCurrentUser] =
    useState(null);

  // =========================
  // GET CURRENT USER
  // =========================
  const fetchCurrentUser =
    async () => {

      try {

        const { data } =
          await API.get(
            "/auth/me"
          );

        setCurrentUser(
          data.user
        );

      } catch (error) {

        console.log(error);
      }
    };

  // =========================
  // GET FRIENDS ONLY
  // =========================
  const fetchUsers =
    async () => {

      try {

        const { data } =
          await API.get(
            "/friends/my-friends"
          );

        setUsers(
          data.friends
        );

      } catch (error) {

        console.log(error);
      }
    };

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {

    const loadData =
      async () => {

        await fetchCurrentUser();

        await fetchUsers();
      };

    loadData();

  }, []);

  return (

    <div>

      <Navbar />

      <div className="messages-page">

        <div className="messages-sidebar">

          <h2>
            Friends
          </h2>

          {users.length > 0 ? (

            users.map((user) => (

              <div
                className="message-user-card"
                key={user._id}
              >

                <div className="message-user-left">

                  <img
                    src={
                      user.profilePic ||
                      "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt="profile"
                  />

                  <div>

                    <h3>
                      {user.name}
                    </h3>

                    <p>
                      {user.email}
                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    setSelectedUser(
                      user
                    )
                  }
                >
                  Message
                </button>

              </div>

            ))

          ) : (

            <p>
              No Friends Found
            </p>

          )}

        </div>

      </div>

      {/* CHAT POPUP */}

      {selectedUser && (

        <div className="chat-popup">

          <div className="chat-header">

            <h3>
              {selectedUser.name}
            </h3>

            <button
              className="close-chat"
              onClick={() =>
                setSelectedUser(null)
              }
            >
              ✕
            </button>

          </div>

          <ChatBox
            currentUser={
              currentUser
            }
            selectedUser={
              selectedUser
            }
          />

        </div>

      )}

    </div>
  );
};

export default Messages;