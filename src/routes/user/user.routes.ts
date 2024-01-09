import { Router } from 'express';

import inviteControllers from '../../controllers/invite.controllers';
const router: Router = Router()

router.get('/invite', inviteControllers.getInviteAction)

export default router