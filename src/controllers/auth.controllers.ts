import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../models/user.model';
import { Invited } from '../models/invited.model';

interface RegistrationBody {
    email: string,
    username: string,
    tempPassword: string,
    newPassword: string
}

const postLogin = async (req: Request, res: Response) => {

    const { email, password } = req.body

    try {

        const user: User = await User.findOne({ where: { email: email } })

        if (!user) return res.sendStatus(400)

        let isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return res.sendStatus(400)

        const payload = {
            id: user.id,
            username: user.username,
            email: user.email
        }

        const token: string = jwt.sign(payload, 'wepinfe9newvipune', { expiresIn: '1d' })

        return res.status(200).json({
            _token: token
        })

    } catch (err) {
        console.log(err);
        res.sendStatus(400)
    }
}

const postInviteRegister = async (req: Request<{}, {}, RegistrationBody, {}>, res: Response) => {

    const { email, username, tempPassword, newPassword } = req.body

    try {

        if (!email || !username || !tempPassword || !newPassword) res.sendStatus(400)

        const invite: Invited = await Invited.findOne({ where: { email: email } })

        if (!invite) res.sendStatus(401)

        const isMatch: boolean = await bcrypt.compare(tempPassword, invite.tempPassword)

        if (!isMatch) res.sendStatus(401)

        const user: User = await User.create({
            email: email,
            username: username,
            isAdmin: false,
            password: await bcrypt.hash(newPassword, 12)
        })

        res.status(200).json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            }
        })

    } catch (err) {
        console.log(err);
        res.sendStatus(400)
    }
}

const getCreateAdmin = async (req: Request, res: Response) => {

    const user: User = await User.create({
        email: 'admin@test.com',
        username: 'admin',
        password: await bcrypt.hash('123', 12),
        isAdmin: true
    })

    res.json({
        id: user.id,
        username: user.username,
        email: user.email,
    })

}
const getCreateUser = async (req: Request, res: Response) => {

    const user: User = await User.create({
        email: 'manish@test.com',
        username: 'manish',
        password: await bcrypt.hash('123', 12),
        isAdmin: true
    })

    res.json({
        id: user.id,
        username: user.username,
        email: user.email,
    })

}

export default {
    postLogin,
    postInviteRegister,
    getCreateAdmin,
    getCreateUser
}