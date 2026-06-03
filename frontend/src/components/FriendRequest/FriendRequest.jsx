import { useEffect, useState } from "react";

import API from "../../api/axios";

import "./FriendRequest.css";

const FriendRequest = () => {

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // GET FRIEND REQUESTS
  // =========================
  const fetchRequests = async () => {

    try {

      const { data } = await API.get(
        "/friends/requests"
      );

      console.log(
        "REQUEST DATA:",
        data
      );

      setRequests(data.requests);

    } catch (error) {

      console.log(
        "REQUEST ERROR:",
        error.response?.data || error
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // ACCEPT REQUEST
  // =========================
  const acceptRequest = async (id) => {

    try {

      await API.put(
        `/friends/accept/${id}`
      );

      setRequests((prev) =>
        prev.filter(
          (request) =>
            request._id !== id
        )
      );

    } catch (error) {

      console.log(
        "ACCEPT ERROR:",
        error.response?.data || error
      );
    }
  };

  // =========================
  // LOAD REQUESTS
  // =========================
  useEffect(() => {

    fetchRequests();

  }, []);

  if (loading) {

    return (
      <div className="friend-loading">
        Loading...
      </div>
    );
  }

  return (

    <div className="friend-request-container">

      <h2>
        Friend Requests
      </h2>

      <p>
        Total Requests:
        {requests.length}
      </p>

      {requests.length === 0 ? (

        <div className="no-requests">

          No Friend Requests

        </div>

      ) : (

        requests.map((request) => (

          <div
            className="friend-card"
            key={request._id}
          >

            <div className="friend-info">

              <img
                src={
                  request.sender?.profilePic ||
                  "https://via.placeholder.com/50"
                }
                alt="profile"
              />

              <div>

                <h4>
                  {request.sender?.name}
                </h4>

                <p>
                  Sent you a friend request
                </p>

              </div>

            </div>

            <button
              onClick={() =>
                acceptRequest(request._id)
              }
            >
              Accept
            </button>

          </div>

        ))
      )}

    </div>
  );
};

export default FriendRequest;