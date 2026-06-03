import { useEffect, useState }
from "react";

import { useParams }
from "react-router-dom";

import API
from "../../api/axios";

import Navbar
from "../../components/Navbar/Navbar";

import socket from "../../socket/socket";

import ChatBox
from "../../components/ChatBox/ChatBox";
import "./ChatPage.css";

const ChatPage = () => {

  const { id } =
    useParams();

  const [friend,
    setFriend] =
      useState(null);

  const [currentUser,
    setCurrentUser] =
      useState(null);





useEffect(() => {

  if (currentUser?._id) {

    socket.emit(
      "join",
      currentUser._id
    );
  }

}, [currentUser]);












  useEffect(() => {

    const loadData =
      async () => {

      try {

        const userRes =
          await API.get(
            "/auth/me"
          );

        setCurrentUser(
          userRes.data.user
        );

        const friendsRes =
          await API.get(
            "/friends/my-friends"
          );

        const selectedFriend =
          friendsRes.data.friends.find(
            (f) =>
              f._id === id
          );

        setFriend(
          selectedFriend
        );

      } catch (error) {

        console.log(error);
      }
    };

    loadData();

  }, [id]);

  if (
    !friend ||
    !currentUser
  ) {

    return (
      <div>
        Loading...
      </div>
    );
  }

  return (

    <div>

      <Navbar />

      <ChatBox
        currentUser={
          currentUser
        }
        selectedUser={
          friend
        }
      />

    </div>
  );
};

export default ChatPage;