const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.render("index", { users });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, phone } = req.body;
  try {
    await User.findByIdAndUpdate(id, { name, phone });
    res.redirect("/home");
  } catch (error) {
    res.status(400).send("Error updating user");
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.redirect("/home");
  } catch (error) {
    res.status(400).send("Error deleting user");
  }
};
