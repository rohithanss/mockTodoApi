const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  taskname: String,
  status: String,
  tag: String,
});

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = TodoModel;
