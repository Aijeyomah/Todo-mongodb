import { Todo } from "../models";

const addTodo = async (req, res, next) => {
  const { title } = req.body;
  const data = await Todo.find({title, status: { $in: ['done'] }}, 'title desc')
  `select title, desc from todo, where title=$1 and status='done' limit=1`
};
