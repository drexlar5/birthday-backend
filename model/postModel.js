// const mongoose = require("mongoose");

// const { Schema } = mongoose;

// const PostSchema = new Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//     },
//     postDescription: {
//       type: String,
//       required: true,
//     },
//     postImage: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Post = mongoose.model("Post", PostSchema);
// module.exports = Post;



const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    postDescription: {
      type: String,
      required: true,
    },
    postImage: {
      type: String,
      required: true,
    },
    email: {
      // New field added for associating posts with an email
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
