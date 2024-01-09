import { Router } from 'express';

import inviteController from '../../controllers/invite.controllers';
import todoControllers from '../../controllers/todo.controllers';

import Auth from '../../middlewares/auth';
import isAdmin from '../../middlewares/isAdmin';

const router: Router = Router()

router.post('/invite', Auth, isAdmin, inviteController.postInvite)

router.post('/todo', Auth, isAdmin, todoControllers.postTodoByAdmin)
router.get('/todo', Auth, isAdmin, todoControllers.getTodosByAdmin)
router.put('/todo', Auth, isAdmin, todoControllers.putTodoByAdmin)
router.delete('/todo/:tid', Auth, isAdmin, todoControllers.deleteTodoByAdmin)
router.get('/todo/:tid', Auth, isAdmin, todoControllers.getTodoByAdmin)

export default router