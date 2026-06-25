const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const newUser = await pool.query(
      `INSERT INTO users
      (username,email,password)
      VALUES ($1,$2,$3)
      RETURNING id,username,email`,
      [username, email, hashedPassword]
    );

    res.status(201).json({
      message: "Registration Successful",
      user: newUser.rows[0]
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({
        message: "User Not Found"
      });
    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.rows[0].password
      );

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid Credentials"
      });
    }

    res.json({
      token: generateToken(user.rows[0].id),
      user: {
        id: user.rows[0].id,
        username: user.rows[0].username,
        email: user.rows[0].email
      }
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};