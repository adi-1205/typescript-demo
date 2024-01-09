import { Router } from 'express';


import Auth from '../../middlewares/auth';
import isUser from '../../middlewares/isUser';
import todoControllers from '../../controllers/todo.controllers';

const router: Router = Router()

router.post('/', Auth, isUser, todoControllers.postTodo)
router.get('/', Auth, isUser, todoControllers.getTodos)
router.put('/', Auth, isUser, todoControllers.putTodo)
router.delete('/:tid', Auth, isUser, todoControllers.deleteTodo)
router.get('/:tid', Auth, isUser, todoControllers.getTodo)

export default router