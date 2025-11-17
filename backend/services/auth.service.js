// auth.service.js
const pool = require("../config/db.config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signup(name, email, password) {
  // Check existing user
  const exists = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email]
  );

  if (exists.rows.length > 0) {
    throw new Error("User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert new user
  const newUser = await pool.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, name, email`,
    [name, email, hashedPassword]
  );

  return newUser.rows[0];
}

async function signin(email, password) {
  // Find user
  const userQuery = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (userQuery.rows.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = userQuery.rows[0];

  // Validate password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Create JWT
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
}

module.exports = {
  signup,
  signin,
};
