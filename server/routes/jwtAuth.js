const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rowCount > 0) {
      return res.status(409).json("User with this email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const insertUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    const token = jwtGenerator(insertUser.rows[0].id);

    res.cookie("token", token, {
      maxAge: 48 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.json({
      user: { name: insertUser.rows[0].name, email: insertUser.rows[0].email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rowCount != 1) {
      return res.status(401).json("No user found for this email!");
    }

    const validatepassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validatepassword) {
      return res.status(401).json("Password is incorrect!");
    }

    const token = jwtGenerator(user.rows[0].id);

    res.cookie("token", token, {
      maxAge: 48 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.json({
      token,
      user: { name: user.rows[0].name, email: user.rows[0].email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
