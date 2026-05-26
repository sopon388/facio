const express = require("express");

const cors = require("cors");

const helmet = require("helmet");

const morgan = require("morgan");

const rateLimit = require("express-rate-limit");

const cookieParser = require("cookie-parser");

require("dotenv").config();


// Routes
const authRoutes = require("./routes/auth");

const postRoutes = require("./routes/posts");

const friendRoutes = require("./routes/friends");

const messageRoutes = require("./routes/messages");

const testRoutes = require("./routes/test");


// Error Middleware
const errorMiddleware = require("./middleware/errorMiddleware");


const app = express();


// ==========================
// SECURITY HEADERS
// ==========================
app.use(helmet());


// ==========================
// BODY PARSER
// ==========================
app.use(
  express.json({
    limit: "10mb"
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb"
  })
);


// ==========================
// COOKIE PARSER
// ==========================
app.use(cookieParser());


// ==========================
// CORS
// ==========================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL
    ],

    credentials: true
  })
);


// ==========================
// API RATE LIMIT
// ==========================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 200,

  message: "Too many requests from this IP"
});

app.use(limiter);


// ==========================
// LOGGER
// ==========================
app.use(morgan("dev"));


// ==========================
// HEALTH CHECK ROUTE
// ==========================
app.get("/", (req, res) => {

  res.status(200).json({
    success: true,

    message: "🚀 Social Media API Running"
  });
});


// ==========================
// API ROUTES
// ==========================
app.use("/api/auth", authRoutes);

app.use("/api/posts", postRoutes);

app.use("/api/friends", friendRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/test", testRoutes);


// ==========================
// 404 ROUTE
// ==========================
app.use((req, res) => {

  res.status(404).json({
    success: false,

    message: "API Route Not Found"
  });
});


// ==========================
// ERROR MIDDLEWARE
// ==========================
app.use(errorMiddleware);


module.exports = app;