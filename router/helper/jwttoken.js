const jwt = require("jsonwebtoken");

function genAccessToken(user) {
  const userId = user._id;
  const userRole = user.isAdmin;
  tokenPayload = { userId, userRole };
  const accessToken = jwt.sign(tokenPayload, process.env.SEC_KEY);
  return accessToken;
}
function verifyToken(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SEC_KEY, (err, user) => {
      if (err) {
        return res.send("invalid token");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).send("your not allowed");
  }
}
function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.params.id === req.user.userId || req.user.userRole) {
      next();
    } else {
      return res.send("your not allowed");
    }
  });
}
function verifyAdmin(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SEC_KEY, (err, user) => {
      if (err) {
        return res.send("invalid token");
      } else {
        if (user.userRole) {
          next();
        } else {
          return res.send("your not allowed to do that");
        }
      }
    });
  } else {
    return res.status(401).send("your not allowed");
  }
}

module.exports = {
  genAccessToken,
  verifyToken,
  verifyAdmin,
  verifyTokenAndAuthorization,
};
