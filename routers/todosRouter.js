const { Router } = require("express");

const TodoModel = require("../models/TodoModel.js");

const todosRouter = Router();

todosRouter.get("/", async (req, res) => {
  const limit = 5;
  let page = req.query.page || 1;
  let skip = (page - 1) * limit;

  console.log("page:", page);

  try {
    let todos = await TodoModel.find().limit(limit).skip(skip);
    return res
      .status(200)
      .send({ msg: "todos fetched successfully", status: "success", todos });
  } catch (err) {
    return res
      .status(500)
      .send({ msg: "error while fetching todos", status: "error" });
  }
});

todosRouter.get("/:todoId", async (req, res) => {
  try {
    let todo = await TodoModel.find({ _id: todoId });
    return res
      .status(200)
      .send({ msg: "todos fetched successfully", status: "success", todo });
  } catch (err) {
    return res
      .status(500)
      .send({ msg: "error while fetching todo", status: "error" });
  }
});

todosRouter.post("/add", async (req, res) => {
  let { taskname, status, tag } = req.body;
  if (taskname == undefined || status == undefined || tag == undefined) {
    return res.status(400).send({ msg: "payload missing", status: "fail" });
  }
  try {
    let todo = TodoModel({ taskname, status, tag });
    await todo.save();
    return res
      .status(201)
      .send({ msg: "todo added successfully", status: "success" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ msg: "error while adding todo", status: "error" });
  }
});

todosRouter.patch("/:todoId", async (req, res) => {
  let todoId = req.params.todoId;
  let payload = req.body;
  try {
    let todo = await TodoModel.findOneAndUpdate({ _id: todoId }, payload);
    if (todo) {
      return res
        .status(200)
        .send({ msg: "todo updated successfully", status: "success" });
    } else {
      return res
        .status(401)
        .send({ msg: "you can not update this todo", status: "fail" });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ msg: "error while updating todo", status: "error" });
  }
});

todosRouter.delete("/:todoId", async (req, res) => {
  let todoId = req.params.todoId;
  try {
    let todo = await TodoModel.findOneAndDelete({ _id: todoId });
    if (todo) {
      return res
        .status(200)
        .send({ msg: "todo deleted successfully", status: "success" });
    } else {
      return res
        .status(401)
        .send({ msg: "you can not delete this todo", status: "fail" });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ msg: "error while deleting todo", status: "error" });
  }
});
module.exports = todosRouter;
