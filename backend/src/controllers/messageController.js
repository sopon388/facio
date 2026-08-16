const Message =
  require("../models/Message");


// =========================
// SEND MESSAGE
// =========================
const sendMessage =
  async (req, res) => {

    try {

      // =========================
      // FILE INFORMATION
      // =========================

      let fileUrl = "";
      let fileType = "";
      let fileName = "";

      if (req.file) {

        fileUrl =
          req.file.path;

        fileName =
          req.file.originalname;

        // Image
        if (
          req.file.mimetype.startsWith("image/")
        ) {

          fileType = "image";

        }

        // Video
        else if (
          req.file.mimetype.startsWith("video/")
        ) {

          fileType = "video";

        }

        // Other files
        else {

          fileType = "file";

        }
      }


      // =========================
      // CREATE MESSAGE
      // =========================

      const message =
        await Message.create({

          sender:
            req.user._id,

          receiver:
            req.params.id,

          text:
            req.body.text || "",

          fileUrl:
            fileUrl,

          fileType:
            fileType,

          fileName:
            fileName
        });


      // =========================
      // RESPONSE
      // =========================

      res.status(201).json({

        success: true,

        message
      });


    } catch (error) {

      res.status(500).json({

        message:
          error.message
      });

    }
  };


// =========================
// GET MESSAGES
// =========================
const getMessages =
  async (req, res) => {

    try {

      const messages =
        await Message.find({

          $or: [

            {
              sender:
                req.user._id,

              receiver:
                req.params.id
            },

            {
              sender:
                req.params.id,

              receiver:
                req.user._id
            }
          ]

        }).sort({

          createdAt: 1

        });


      res.status(200).json({

        success: true,

        messages

      });


    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }
  };


module.exports = {

  sendMessage,

  getMessages

};