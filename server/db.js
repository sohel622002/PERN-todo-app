const Pool = require("pg").Pool;

const pool = new Pool({
  port: 5432,
  database: "todos",
  host: "localhost",
  password: "password",
  user: "postgres",
});

module.exports = pool;
