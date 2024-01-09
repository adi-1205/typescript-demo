import { Request, Response } from 'express';
import { SendMailOptions } from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

import { Invited } from '../models/invited.model';
import mailer from '../config/mailer';
import makePassword from '../helpers/randomPassword';

const postInvite = async (req: Request, res: Response) => {
    const { email }: { email: string } = req.body

    try {

        const inviteToken = crypto.randomBytes(48).toString('hex')
        const invite: Invited = await Invited.create({ email: email, invitetoken: inviteToken })

        if (!invite) res.sendStatus(400)

        const mailOption: SendMailOptions = {
            from: '81adityavyas@gmail.com',
            to: email,
            subject: 'Invitind to ToDo',
            html: `<h1> Hey there! </h1>
                <h2> I invite you to join our platform, ToDo!</h2>
                <a href="http://localhost:8000/invite?tk=${inviteToken}&ac=1"><button style="margin: 1em;padding:1em;background: white;border: none;border-radius: 3px;color: white;background: rgb(36, 210, 36);cursor:pointer;">Accept</button></a>
                <a href="http://localhost:8000/invite?tk=${inviteToken}&ac=0"><button style="margin: 1em;padding:1em;background: white;border: none;border-radius: 3px;color: white;background: rgb(178, 178, 178);cursor:pointer;"> Reject</button></a>`
        }
        mailer.sendMail(mailOption, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json({ message: 'Invited!' })
            }
        })

    } catch (err) {
        console.log(err);
        res.sendStatus(400)
    }
}

const getInviteAction = async (req: Request<{}, {}, {}, { tk: string, ac: string }>, res: Response) => {
    const { tk: inviteToken, ac: wasAccepted } = req.query
    console.log(inviteToken, wasAccepted);

    try {

        const invite: Invited = await Invited.findOne({ where: { invitetoken: inviteToken, valid: true } })

        if (!invite) {
            res.status(400).json({ message: 'no invitation' })
        }

        if (wasAccepted === '1') {

            const tempPassword: string = makePassword()
            const hashedPassword: string = await bcrypt.hash(tempPassword, 12)
            await Invited.update({ tempPassword: hashedPassword, valid: false }, { where: { invitetoken: inviteToken } })

            const mailOption: SendMailOptions = {
                from: '81adityavyas@gmail.com',
                to: invite.email,
                subject: 'Signup credential',
                html: `<h1>${tempPassword}</h1>
                <h3>this is your temporary password for signup</h3>
                <a href="http://localhost:8000/auth/register">Signup here!</a>`
            }

            mailer.sendMail(mailOption, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).json({ message: 'check your invitation email for more details!' })
                }
            })

        } else if (wasAccepted === '0') {

            await Invited.update({ valid: false }, { where: { invitetoken: inviteToken } })
            res.status(200).json({message:'Invitaion declined!'})

        } else {
            res.status(400).json({message:'invalid'})
        }
    } catch (err) {
        console.log(err);
        res.status(400)
    }

}


export default {
    postInvite,
    getInviteAction
}