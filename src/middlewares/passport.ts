import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import { PassportStatic } from 'passport';

import { User } from '../models/user.model';



const opt: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'wepinfe9newvipune'
}

export default (passport: PassportStatic): void => {
    passport.use(
        new JwtStrategy(opt, (payload, done) => {
            User.findOne({ where: { email: payload.email } })
                .then(user => {
                    if (user) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'bad password' });
                    }
                })
                .catch(err => {
                    return done(err, false);
                })
        })
    )
}