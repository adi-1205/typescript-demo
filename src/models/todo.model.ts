import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';

interface TodoAttributes {
    id?: number;
    todo?: string;
    completed?: boolean;
    byAdmin?: boolean;
    userId?: number; 
  }

@Table
export class Todo extends Model<TodoAttributes> {

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    todo: string

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    completed: boolean

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    byAdmin: boolean;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User

    
}