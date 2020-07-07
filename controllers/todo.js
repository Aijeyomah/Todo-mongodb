import { Todo } from "../models";
import {
  createdOkResponse,
  successResponse,
  
} from "../utils";
import user from "../models/user";

const addTodo = async (req, res) => {
  const { _id } = req.user;
  req.body.user = _id;
  const newTodo = new Todo({ ...req.body });
  await newTodo.save();
  createdOkResponse(res, newTodo, "Todo created successfully");
};

const editStatusToDone = async (req, res) => {
  const { todoId } = req.params;
  const data = await Todo.findOneAndUpdate(
    { _id: todoId },
    { $set: { status: "done", updatedAt: Date.now() } },
    { new: true }
  );
  return successResponse(res, data, "status updated successfully");
};

const fetchAllPostByUser = async (req, res) => {
  const { _id } = req.user;
  const data = await Todo.find({ user: _id });
  return successResponse(res, data, "user's tasks");
};
const fetchAllPendingTaskByUser = async (req, res) => {
  const { _id } = req.user;
  const data = await Todo.find({ user: _id, status: "pending" });
  return successResponse(res, data, "user's pending task");
};

const fetchTaskById = async (req, res) => {
  const { todoId } = req.params;
  const data = await Todo.findOne({ _id: todoId }).populate("user");
  return successResponse(res, data, "user's task");
};

const fetchAllCompletedTaskByUser = async (req, res) => {
  const { _id } = req.user;
  const data = await Todo.find({ user: _id, status: "done" });
  return successResponse(res, data, "user's completed task");
};

const deleteUserTask = async (req, res) => {
  const { todoId } = req.params;
  await Todo.deleteOne({ _id: todoId, status: "pending" });
  return successResponse(res, "user's task deleted");
};

const updateTask = async (req, res) => {
  const todoDetails = { ...req.data, ...req.body };
  const update = await Todo.findOneAndUpdate(
    { _id: req.data._id },
    {
      $set: {
        title: todoDetails.title,
        desc: todoDetails.desc,
        updatedAt: Date.now(),
      },
    },
    { new: true }
  );
  return successResponse(res, update, "status updated successfully");
};

export {
  addTodo,
  editStatusToDone,
  fetchAllPostByUser,
  fetchAllPendingTaskByUser,
  fetchAllCompletedTaskByUser,
  deleteUserTask,
  updateTask,
  fetchTaskById
};
