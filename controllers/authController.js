const User = require("../models/User");

exports.registerUser = async (req, res) => {
  const { name, password, email, phone, profession } = req.body;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send("Please provide a valid email address");
  }

  if (password.length < 8) {
    return res.status(400).send("Password must be at least 8 characters long");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email is already registered");
    }

    const user = new User({ name, password, email, phone, profession });
    await user.save();

    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(400).send("Error registering user");
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send("Please provide a valid email address");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      req.session.user = user;
      res.redirect("/home");
    } else {
      res.status(400).send("Invalid email or password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
};
