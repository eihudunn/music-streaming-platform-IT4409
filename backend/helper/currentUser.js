const jwt = require("jsonwebtoken");
const currentUser = (req, res, next) => {
  const authenticationHeaders =
    req.headers.authorization || req.headers.Authorization;
  if (!authenticationHeaders) next();
  else {
    try {
      const token = authenticationHeaders.split(" ")[1];
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      req.currentUser = payload;
    } catch (error) {
      return res.status(400).json({ message: "Bad request, invalid token!" });
    }
    next();
  }
};
module.exports = { currentUser };
