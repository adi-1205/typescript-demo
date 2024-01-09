import { Model, Column, DataType, Table, HasMany } from 'sequelize-typescript';

import { Todo } from './todo.model';

interface UserAttributes {
    id?: number;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

@Table
export class User extends Model<UserAttributes>{
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    isAdmin: boolean;

    @HasMany(() => Todo)
    todos: Todo[]
}
