import { Sequelize } from 'sequelize-typescript';

import { User } from '../models/user.model';
import { Invited } from '../models/invited.model';
import { Todo } from '../models/todo.model';

const sequelize: Sequelize = new Sequelize({
    database: 'todos',
    dialect: 'mysql',
    username: 'root',
    password: '',
    models: [User, Invited, Todo],
});


sequelize.authenticate()
    .then(() => {
        console.log('DB connected');
    })
    .catch(err => {
        console.log(err);
    })

export default sequelize