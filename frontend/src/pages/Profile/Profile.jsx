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

            <button>
              Change Profile Pic
            </button>

            <button>
              Change Cover Pic
            </button>

          </div>

        </div>

      </div>

    </MainLayout>

  );
};

export default Profile;