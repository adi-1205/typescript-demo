import { Request, Response, NextFunction } from 'express';
import { RequestHandlerParams } from 'express-serve-static-core';
import { User } from '../models/user.model';

const isUser: RequestHandlerParams = (req: Request, res: Response, next: NextFunction): void => {
    if (!(req.user as User).isAdmin) {
        next()
    } else {
        res.send('Unauthorized')
    }
}

export default isUser