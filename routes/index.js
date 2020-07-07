import { Router } from "express";
import {
  checkIfUserNameExist,
  checkIfEmailExist,
  checkIfEmailExistForLogin,
  checkPasswordMatch,
} from "../middleware/user";
import { register, userLogin } from "../controllers/user";
import {
  addTodo,
  editStatusToDone,
  fetchAllPostByUser,
  fetchAllPendingTaskByUser,
  fetchAllCompletedTaskByUser,
  deleteUserTask,
  updateTask,
  fetchTaskById
} from "../controllers/todo";
import { isTokenPresent } from "../validation/authentication";
import { checkIfTaskExist, checkIfOwner, IsTaskDone } from "../middleware/todo";

const router = Router();
router.use("/todo", isTokenPresent);
/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({ message: "Welcome to Todo" });
});

router.post("/register", checkIfUserNameExist, checkIfEmailExist, register);
router.post("/login", checkIfEmailExistForLogin, checkPasswordMatch, userLogin);
router.post("/todo", addTodo);
router.patch("/todo/:todoId", checkIfTaskExist, checkIfOwner, editStatusToDone);
router.get("/todo", fetchAllPostByUser);
router.get("/todo/pending", fetchAllPendingTaskByUser);
router.get("/todo/:todoId",checkIfTaskExist,checkIfOwner, fetchTaskById)
router.get("/todo/done", fetchAllCompletedTaskByUser);
router.delete("/todo/:todoId", checkIfTaskExist, deleteUserTask);
router.put("/todo/update/:todoId", IsTaskDone, updateTask);
export default router;
