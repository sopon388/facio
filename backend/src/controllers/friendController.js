const User =
  require("../models/User");

const FriendRequest =
  require("../models/FriendRequest");


// =========================
// GET ALL USERS
// =========================
const getAllUsers =
  async (req, res) => {

    try {

      const users =
        await User.find({

          _id: {
            $ne: req.user._id
          }

        }).select(
          "-password"
        );


      res.status(200).json({

        success: true,

        users
      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message
      });
    }
  };


// =========================
// SEND FRIEND REQUEST
// =========================
const sendFriendRequest =
  async (req, res) => {

    try {

      const existing =
        await FriendRequest.findOne({

          sender:
            req.user._id,

          receiver:
            req.params.id
        });


      if (existing) {

        return res.status(400).json({

          message:
            "Request already sent"
        });
      }


      const request =
        await FriendRequest.create({

          sender:
            req.user._id,

          receiver:
            req.params.id
        });


      res.status(201).json({

        success: true,

        request
      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message
      });
    }
  };


// =========================
// GET REQUESTS
// =========================
const getFriendRequests =
  async (req, res) => {

    try {

      const requests =
        await FriendRequest.find({

          receiver:
            req.user._id,

          status:
            "pending"

        }).populate(
          "sender",
          "name email profilePic"
        );


      res.status(200).json({

        success: true,

        requests
      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message
      });
    }
  };


// =========================
// ACCEPT REQUEST
// =========================
const acceptFriendRequest =
  async (req, res) => {

    try {

      const request =
        await FriendRequest.findById(
          req.params.id
        );


      if (!request) {

        return res.status(404).json({

          message:
            "Request not found"
        });
      }


      request.status =
        "accepted";

      await request.save();


      await User.findByIdAndUpdate(

        request.sender,

        {
          $push: {
            friends:
              request.receiver
          }
        }
      );


      await User.findByIdAndUpdate(

        request.receiver,

        {
          $push: {
            friends:
              request.sender
          }
        }
      );


      res.status(200).json({

        success: true,

        message:
          "Friend Request Accepted"
      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message
      });
    }
  };


// =========================
// EXPORTS
// =========================
module.exports = {

  getAllUsers,

  sendFriendRequest,

  getFriendRequests,

  acceptFriendRequest,
  getFriends
};
// =========================
// GET FRIENDS
// =========================
const getFriends = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.user._id
      ).populate(
        "friends",
        "name profilePic email"
      );

    res.status(200).json({

      success: true,

      friends:
        user.friends
    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message
    });
  }
};