// const jwt = require("jsonwebtoken"); //importing jwt
// const dotenv = require("dotenv"); //importing dotenv
// dotenv.config();

// exports.verifyToken = (req, res, next) => {
//   const token = req.headers.authorization; //if the access key or token is not correct it would return the below error messages
//   if (!token) return res.status(401).send("access Denied");
//   jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
//     if (err) return res.status(403).send("invalid token");
//     req.id = user.id;
//     next(); //move to the next function after this is carried out
//   });
// };

// exports.isUser = (req, res, next) => {
//   //middleware for if user is student
//   if (req.id !== "user") return res.status(401).send("Denied");
//   next();
// };



const jwt = require("jsonwebtoken"); //importing jwt
const dotenv = require("dotenv"); //importing dotenv
dotenv.config();

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization; //if the access key or token is not correct it would return the below error messages
  if (!token) return res.status(401).send("access Denied");
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send("invalid token");
    req.id = user.id;
    req.email = user.email; // Added email to the request object
    next(); //move to the next function after this is carried out
  });
};

exports.isUser = (req, res, next) => {
  //middleware for if user is student
  if (req.id !== "user") return res.status(401).send("Denied");
  next();
};

exports.isAdmin = (req, res, next) => {
  // Middleware to check if user is admin
  if (req.email !== "adesanyaoluwamuyiwa12@gmail.com")
    return res.status(403).send("Admin access only");
  next();
};


exports.authenticateUser = async (req, res, next) => {
  try {
    // Get email from request headers, token, or session
    const email = req.headers['user-email'] || req.query.email;
    if (!email) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required"
      });
    }
    req.userEmail = email; // Attach to request object
    next();
  } catch (error) {
    res.status(401).json({
      status: "error",
      message: "Authentication failed"
    });
  }
};
