// auth.controller.js
const authService = require("../services/auth.service");

async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    const user = await authService.signup(name, email, password);

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function signin(req, res) {
  try {
    const { email, password } = req.body;

    console.log("Signin called with:", email, password);
    const result = await authService.signin(email, password);
    console.log("Signin result:", result);

    return res.json({
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {
  signup,
  signin,
};
