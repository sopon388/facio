const express =
  require("express");

const router =
  express.Router();

const {
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  getAllUsers,
  getFriends
} = require(
  "../controllers/friendController"
);

const protect =
  require(
    "../middleware/authMiddleware"
  );


// ALL USERS
router.get(
  "/users",
  protect,
  getAllUsers
);
router.get(
  "/my-friends",
  protect,
  getFriends
);

// SEND REQUEST
router.post(
  "/send/:id",
  protect,
  sendFriendRequest
);


// GET REQUESTS
router.get(
  "/requests",
  protect,
  getFriendRequests
);


// ACCEPT REQUEST
router.put(
  "/accept/:id",
  protect,
  acceptFriendRequest
);

module.exports =
  router;