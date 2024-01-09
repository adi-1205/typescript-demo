import express, { Application, Request, Response } from "express"
import bodyParser from 'body-parser';
import passport from 'passport';

import sequelize from './config/db.config';
import authRoutes from './routes/auth/auth.routes';
import adminRoutes from './routes/admin/admin.routes';
import userRoutes from './routes/user/user.routes';
import todoRoutes from './routes/todo/todo.routes';
import configurePassport from './middlewares/passport';

const app: Application = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize())
configurePassport(passport)

app.use('/auth', authRoutes)
app.use('/admin', adminRoutes)
app.use('/todo', todoRoutes)
app.use('/', userRoutes)


app.get('/', (req: Request, res: Response) => {
    res.send('hello')
})

sequelize.sync()
    .then(() => {
        app.listen(8000, () => {
            console.log(`listening on  http://localhost:8000/`);
        })
    })
    .catch(err => {
        console.log(err);
    })

