const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(403).json({
      message: "Forbidden",
    });
  } else {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRT, (error, payload) => {
      if (error) {
        
        
        res.status(401).json({
          error: error,
          message: "The token is invalid or expired",
        });
      } else {
        req.token = payload;
        next();
      }
    });
  }
};
module.exports = authentication;
