import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import API from "../../api/axios";

import FriendRequest from "../../components/FriendRequest/FriendRequest";

import "./Friends.css";

const Friends = () => {

  const [users, setUsers] =
    useState([]);

  const [sentRequests, setSentRequests] =
    useState([]);

  // =========================
  // GET ALL USERS
  // =========================
  const fetchUsers = async () => {

    try {

      const { data } =
        await API.get(
          "/friends/users"
        );

      setUsers(data.users);

    } catch (error) {

      console.log(error);
    }
  };

  // =========================
  // SEND FRIEND REQUEST
  // =========================
  const handleAddFriend =
    async (userId) => {

      try {

        await API.post(
          `/friends/send/${userId}`
        );

        setSentRequests(
          (prev) => [
            ...prev,
            userId
          ]
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchUsers();

  }, []);

  return (

    <MainLayout>

      <div className="friends-page">

        {/* FRIEND REQUESTS */}

        <FriendRequest />

        {/* ALL USERS */}

        <div className="all-users">

          <h2>
            All Users
          </h2>

          {users.map((user) => (

            <div
              className="friend-card"
              key={user._id}
            >

              <div className="friend-info">

                <img
                  src={
                    user.profilePic ||
                    "https://via.placeholder.com/50"
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

              {sentRequests.includes(
                user._id
              ) ? (

                <button
                  className="sent-btn"
                >
                  Request Sent
                </button>

              ) : (

                <button
                  onClick={() =>
                    handleAddFriend(
                      user._id
                    )
                  }
                >
                  Add Friend
                </button>

              )}

            </div>

          ))}

        </div>

      </div>

    </MainLayout>
  );
};

export default Friends;