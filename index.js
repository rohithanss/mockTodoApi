const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connection = require("./config/db.js");
const todosRouter = require("./routers/todosRouter.js");
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Todo API base end point");
});

app.use("/todos", todosRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected To Db successfully");
  } catch (err) {
    console.log(err);
    console.log("error while connecting to the DB");
  }
  console.log(`Listening at \nhttp://localhost:${PORT}/`);
});
