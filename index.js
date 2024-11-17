// const express = require("express");
// const dotenv = require("dotenv");
// const { storage } = require("./storage");
// const multer = require("multer");
// const upload = multer({ storage });
// const cors = require("cors");
// const mongoose = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;
// const Post = require("./model/postModel");
// const authRoute = require("./auth/authRoute");
// const db = require("./db");

// const { verifyToken, isUser } = require("./auth/authMiddleware");

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// db.on("error", (error) => console.log(error));
// db.once("open", () => console.log("connected to database"));

// app.post("/upload", upload.single("image"), (req, res) => {
//   console.log(req.file);

//   res.status(200).send({
//     status: "success",
//     message: "Image uploaded successfully",
//   url: {
//       path: req.file.path, 
//     },  });
// });

// app.post("/create-post", async (req, res) => {
//   const body = req.body;
//   try {
//     const post = new Post(body);
//     await post.save();
//     res.status(200).send({
//       status: "success",
//       message: "Post created successfully",
//       data: post,
//     });
//   } catch (error) {
//     res.status(500).send({
//       status: "error",
//       message: "Error creating post",
//       error: error,
//     });
//   }
// });

// app.get("/posts", async (req, res) => {
//   try {
//     const posts = await Post.find();
//     res.status(200).send({
//       count: posts.length,
//       status: "success",
//       message: "Posts retrieved successfully",
//       data: posts,
//     });
//   } catch (error) {
//     res.status(500).send({
//       status: "error",
//       message: "Error retrieving posts",
//       error: error,
//     });
//   }
// });

// app.get("/post/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     res.status(200).send({
//       status: "success",
//       message: "Post retrieved successfully",
//       data: post,
//     });
//   } catch (error) {
//     res.status(500).send({
//       status: "error",
//       message: "Error retrieving post",
//       error: error,
//     });
//   }
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });

// app.use("/", authRoute);
// app.use("/", verifyToken, isUser, authRoute);




const express = require("express");
const dotenv = require("dotenv");
const { storage } = require("./storage");
const multer = require("multer");
const upload = multer({ storage });
const cors = require("cors");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Post = require("./model/postModel");
const authRoute = require("./auth/authRoute");
const db = require("./db");

const { verifyToken, isUser, authenticateUser } = require("./auth/authMiddleware");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to database"));

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);

  res.status(200).send({
    status: "success",
    message: "Image uploaded successfully",
    url: {
      path: req.file.path,
    },
  });
});

app.post("/create-post", async (req, res) => {
  // Ensure the post includes the user's email
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(200).send({
      status: "success",
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: "error",
      message: "Error creating post",
      error: error,
    });
  }
});

app.get("/posts", authenticateUser, async (req, res) => {
  try {
    let posts;
    if (req.userEmail === "adesanyaoluwamuyiwa12@gmail.com") {
      // Admin sees all posts
      posts = await Post.find();
    } else {
      // Regular users see only their posts
      posts = await Post.find({ email: req.userEmail });
    }
    res.status(200).send({
      count: posts.length,
      status: "success",
      message: "Posts retrieved successfully",
      data: posts,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Error retrieving posts",
      error: error,
    });
  }
});

app.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send({
      status: "success",
      message: "Post retrieved successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Error retrieving post",
      error: error,
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.use("/", authRoute);
app.use("/", verifyToken, isUser, authRoute);
