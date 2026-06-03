import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import API from "../../api/axios";

import "./Friends.css";

const Friends = () => {

  const [users, setUsers] =
    useState([]);

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

  const handleAddFriend =
    async (userId) => {

      try {

        await API.post(
          `/friends/send/${userId}`
        );

        alert(
          "Friend Request Sent"
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

        {users.map((user) => (

          <div
            className="friend-card"
            key={user._id}
          >

            <div className="friend-info">

              <img
                src={
                  user.profilePic
                }
                alt="profile"
              />

              <h3>
                {user.name}
              </h3>

            </div>

            <button
              onClick={() =>
                handleAddFriend(
                  user._id
                )
              }
            >
              Add Friend
            </button>

          </div>

        ))}

      </div>

    </MainLayout>
  );
};

export default Friends;