const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const validateUser = require("./middleware/validateUser");

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));

app.use("/auth", require("./routes/jwtAuth"));
app.use("/todos", validateUser, require("./routes/todos"));

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(PORT, () => {
  console.log(`App runnign and listing on ${PORT}`);
});
