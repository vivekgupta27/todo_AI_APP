import express from 'express';
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} from '../controllers/todoController.js';
import summarize, { fetchAndSummarize } from '../controllers/summarizeController.js';

const router = express.Router();

router.get('/api/todos', getTodos);
router.post('/add-todo', addTodo);
router.delete('/delete-todo/:id', deleteTodo);
router.patch('/update-todo/:id', updateTodo);
router.post('/summarize', fetchAndSummarize, summarize);

export default router;