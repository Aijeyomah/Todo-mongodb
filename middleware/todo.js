import { Todo } from "../models";
import {
  serverError,
  unauthorizedError,
  notFoundError,
  noContent,
} from "../utils";

const checkIfOwner = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const userId = req.data.user[0].toString();
    if (_id === userId) {
      return next();
    }
    return unauthorizedError(res, "you can't edit this post");
  } catch (error) {
    serverError(res, "server error");
  }
};

const checkIfTaskExist = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    // console.log(todoId);
    const data = await Todo.findById(todoId);
    console.log(data);
    
    if (data) {
      req.data = data;
      console.log(req.data);
      
      return next();
    }
    return notFoundError(res, "task not found");
  } catch (error) {
    console.log(error);
    serverError(res, "server error");
  }
};

const IsTaskDone = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const data = await Todo.findById(todoId);
    if (data.status !== "pending") {
      return unauthorizedError(res, "cannot update a completed task");
    }
    req.data = data
    return next()


  } catch (error) {
    console.log(error);
    serverError(res, "server error");
  }
};


export { checkIfOwner, checkIfTaskExist ,IsTaskDone};
