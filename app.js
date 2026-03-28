require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./db");

const userRouter = require("./routes/usersapi");

app.use(cors());
app.use(bodyParser.json());
app.use("/api/user", userRouter);

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on : http://localhost:${port}`);
});
