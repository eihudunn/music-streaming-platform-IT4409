const requireAuth = (req, res, next) => {
  if (!req.currentUser) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
  next();
};

module.exports = { requireAuth };
