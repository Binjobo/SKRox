const jwt = require("jsonwebtoken");

// Middleware function to verify JWT token
const authenticate = (req, res, next) => {
  // const token = req.header("Authorization");
  const token = req.get("Authorization")?.split(" ")?.[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// to check if user is admin
const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Unauthorized access" });
  }
  next();
};

// const jwt = require("jsonwebtoken");

// exports.isAdmin = (req, res, next) => {
//   // Get the token from the request headers
//   const token = req.headers.authorization.split(" ")[1];

//   // Verify the token
//   jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
//     if (err) {
//       return res.status(401).json({ message: "Invalid token" });
//     } else {
//       // Check if the user is an admin
//       if (decodedToken.isAdmin) {
//         next(); // Proceed to the next middleware or route handler
//       } else {
//         return res.status(403).json({ message: "Unauthorized" });
//       }
//     }
//   });
// };

module.exports = { isAdmin, authenticate };
