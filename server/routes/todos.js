const router = require("express").Router();
const pool = require("../db");
const cookieParser = require("cookie-parser");

router.use(cookieParser());

router.get("/", async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todo ORDER BY todo_id;");
    res.json(todos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    if (!todo.rows[0]) return res.json("No todo found");
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/", async (req, res) => {
  const { description } = req.body;
  try {
    const todo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(todo.rows);
  } catch (error) {
    console.error(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const todo = await pool.query(
      "UPDATE todo SET description = $1 Where todo_id = $2",
      [description, id]
    );
    res.json("Todo updated successfully!");
  } catch (error) {
    console.error(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json("Todo Deleted successfully!");
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
