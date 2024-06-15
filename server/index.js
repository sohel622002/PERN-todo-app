const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const validateUser = require("./middleware/validateUser");

const PORT = 3000;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/auth", require("./routes/jwtAuth"));
app.use("/todos", validateUser, require("./routes/todos"));

app.get("/", (req, res) => {
  res.send("OK");
});

app.get("/set-cookie", (req, res) => {
  res.cookie("foo", "bar");
  res.send("cookie send");
});

app.listen(PORT, () => {
  console.log(`App runnign and listing on ${PORT}`);
});
