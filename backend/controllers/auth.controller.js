const User = require("../schemas/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  toLowerCaseNonAccentVietnamese,
} = require("../helper/vietnameseTextToLowerCase");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({ message: "Email or password is invalid!" });
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword)
      return res.status(400).json({ message: "Email or password is invalid!" });
    const accessToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
    const { password: userPassword, ...userWithoutPassword } = user._doc;
    return res.status(200).json({
      ...userWithoutPassword,
      accessToken: accessToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const logout = async (req, res) => {
  return res.status(200).json({ message: "Logout successfully!" });
};
const signup = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(4);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    let user = new User({
      username: req.body.username,
      searchTitle: toLowerCaseNonAccentVietnamese(req.body.username),
      email: req.body.email,
      password: hashPassword,
      following: [],
      artistFollowed: [],
      playlists: [],
      albumsFollowed: [],
      preferedGenre: [],
    });
    user.save(function (err) {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(201).json({ message: "Signup successfully" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { login, logout, signup };
