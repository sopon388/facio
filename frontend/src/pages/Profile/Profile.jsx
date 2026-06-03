import { useContext, useRef } from "react";

import { AuthContext } from "../../context/AuthContext";

import MainLayout from "../../layouts/MainLayout";

import API from "../../api/axios";

import "./Profile.css";

const Profile = () => {

  const { user } =
    useContext(AuthContext);

  const profileInputRef =
    useRef(null);

  const coverInputRef =
    useRef(null);

  // =========================
  // PROFILE PIC UPLOAD
  // =========================
  const handleProfileUpload =
    async (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      try {

        const formData =
          new FormData();

        formData.append(
          "profilePic",
          file
        );

        await API.put(
          "/auth/update-profile",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data"
            }
          }
        );

        window.location.reload();

      } catch (error) {

        console.log(error);
      }
    };

  // =========================
  // COVER PIC UPLOAD
  // =========================
  const handleCoverUpload =
    async (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      try {

        const formData =
          new FormData();

        formData.append(
          "coverPic",
          file
        );

        await API.put(
          "/auth/update-profile",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data"
            }
          }
        );

        window.location.reload();

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <MainLayout>

      <div className="profile-page">

        {/* COVER PHOTO */}

        <div className="cover-photo-container">

          <img
            src={
              user?.coverPic ||
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200"
            }
            alt="cover"
            className="cover-photo"
          />

        </div>

        {/* PROFILE CARD */}

        <div className="profile-card">

          <img
            src={
              user?.profilePic ||
              "https://via.placeholder.com/120"
            }
            alt="profile"
            className="profile-image"
          />

          <h2>
            {user?.name}
          </h2>

          <p>
            {user?.email}
          </p>

          <p className="profile-bio">
            {user?.bio ||
              "No bio added yet"}
          </p>

          <div className="profile-stats">

            <div>

              <h4>
                Friends
              </h4>

              <p>
                {
                  user?.friends
                    ?.length || 0
                }
              </p>

            </div>

            <div>

              <h4>
                Joined
              </h4>

              <p>
                {user?.createdAt
                  ? new Date(
                      user.createdAt
                    ).toLocaleDateString()
                  : "N/A"}
              </p>

            </div>

          </div>

          <div className="profile-buttons">

            <button
              onClick={() =>
                profileInputRef.current.click()
              }
            >
              Change Profile Pic
            </button>

            <button
              onClick={() =>
                coverInputRef.current.click()
              }
            >
              Change Cover Pic
            </button>

          </div>

          {/* HIDDEN INPUTS */}

          <input
            type="file"
            accept="image/*"
            ref={profileInputRef}
            onChange={
              handleProfileUpload
            }
            style={{
              display: "none"
            }}
          />

          <input
            type="file"
            accept="image/*"
            ref={coverInputRef}
            onChange={
              handleCoverUpload
            }
            style={{
              display: "none"
            }}
          />

        </div>

      </div>

    </MainLayout>

  );
};

export default Profile;