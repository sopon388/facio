import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import API from "../../api/axios";

import Navbar from "../../components/Navbar/Navbar";

import "./Messages.css";

const Messages = () => {

  const [users, setUsers] =
    useState([]);

  const navigate =
    useNavigate();

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

    fetchUsers();

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

                  </div>

                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/chat/${user._id}`
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

    </div>
  );
};

export default Messages;