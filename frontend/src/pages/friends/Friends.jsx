import FriendRequest from "../../components/FriendRequest/FriendRequest";

import MainLayout from "../../layouts/MainLayout";

import "./Friends.css";

const Friends = () => {

  return (

    <MainLayout>

      <div className="friends-page">

        <FriendRequest />

      </div>

    </MainLayout>
  );
};

export default Friends;