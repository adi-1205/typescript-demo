import passport from 'passport';
import { RequestHandlerParams } from 'express-serve-static-core';

const Auth: RequestHandlerParams = passport.authenticate('jwt', { session: false })

export default Auth
