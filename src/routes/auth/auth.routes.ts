import { Router } from 'express';

import authController from '../../controllers/auth.controllers';
const router: Router = Router()

router.post('/login', authController.postLogin)
router.post('/register', authController.postInviteRegister)
router.get('/create', authController.getCreateAdmin)
router.get('/create_user', authController.getCreateUser)

export default router