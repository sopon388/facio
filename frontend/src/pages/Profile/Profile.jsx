import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

import MainLayout from "../../layouts/MainLayout";

import "./Profile.css";

const Profile = () => {

  const { user } =
    useContext(AuthContext);

  return (

    <MainLayout>

      <div className="profile-page">

        <div className="profile-card">

          <img
            src={
              user?.profilePic ||
              "https://via.placeholder.com/120"
            }
            alt="profile"
          />

          <h2>
            {user?.name}
          </h2>

          <p>
            {user?.email}
          </p>

        </div>

      </div>

    </MainLayout>
  );
};

export default Profile;