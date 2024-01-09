import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table
export class Invited extends Model {
    @Column({
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    })
    email: string

    @Column({
        type: DataTypes.STRING,
        unique: true
    })
    invitetoken: string

    @Column({
        type: DataTypes.STRING
    })
    tempPassword: string

    @Column({
        type: DataTypes.BOOLEAN,
        defaultValue: true
    })
    valid: boolean
}
