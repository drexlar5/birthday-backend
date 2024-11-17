// const express = require("express");
// const Post = require("../models/postModel");
// const { isAdmin } = require("../middlewares/authMiddleware");

// module.exports = (app) => {
//   // Get posts based on email
//   app.get("/posts", isAdmin, async (req, res) => {
//     try {
//       let posts;
//       if (req.isAdmin) {
//         posts = await Post.find(); // Admin sees all posts
//       } else {
//         posts = await Post.find({ email: req.user.email }); // User sees only their posts
//       }
//       res.status(200).json({ success: true, posts });
//     } catch (err) {
//       res
//         .status(500)
//         .json({ success: false, message: "Server Error", error: err.message });
//     }
//   });
// };
// /