const router = require("express").Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const todos = await pool.query(
      "SELECT t.id, t.description FROM todo AS t INNER JOIN users AS u ON t.user_id=u.id WHERE u.id = $1;",
      [req.user]
    );
    res.json(todos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);
    if (!todo.rows[0]) return res.json("No todo found");
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/", async (req, res) => {
  const { description } = req.body;
  const userId = req.user;

  try {
    const todo = await pool.query(
      "INSERT INTO todo (user_id, description) VALUES ($1, $2) RETURNING *",
      [userId, description]
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
      "UPDATE todo SET description = $1 Where id = $2",
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
    const todo = await pool.query("DELETE FROM todo WHERE id = $1", [id]);
    res.json("Todo Deleted successfully!");
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
