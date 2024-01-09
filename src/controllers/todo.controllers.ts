import { Request, Response } from 'express';

import { Todo } from '../models/todo.model';
import { User } from '../models/user.model';

interface TodoBody {
    id?: string
    todo?: string
    completed?: boolean
    byAdmin?: boolean
    userId?: string
}
interface UsersForTodo {
    users?: number[]
}

interface TodoAttributes {
    userId: number,
    todo: string,
    byAdmin: boolean,
}

const postTodo = async (req: Request<{}, {}, TodoBody>, res: Response) => {

    const { todo } = req.body

    try {
        const { id, username, email, password, isAdmin } = req.user as User
        const user = new User({ id, email, username, password, isAdmin })
        const newTodo: Todo = await user.$create('todo', { todo: todo } as Todo)
        res.status(200).json({ todo: newTodo.toJSON() })
    } catch (err) {
        console.log(err);
        res.sendStatus(400)
    }
}

const getTodos = async (req: Request<{}, {}, TodoBody>, res: Response) => {
    try {
        const { id, username, email, password, isAdmin } = req.user as User
        const user: User = new User({ id, email, username, password, isAdmin })
        const todos: Array<Todo> = await user.$get('todos')

        res.status(200).json({ todos })
    } catch (err) {
        console.log(err);
        res.sendStatus(400)
    }
}
const getTodo = async (req: Request<{ tid: string }>, res: Response) => {
    try {
        const { id } = req.user as User
        const { tid } = req.params

        const todo: Todo = await Todo.findOne({ where: { id: tid, userId: id } })
        res.status(200).json({ todo })

    } catch (err) {
        console.log(err);
        res.sendStatus(400)
    }
}
const putTodo = async (req: Request<{}, {}, TodoBody>, res: Response) => {
    try {
        const { id, userId, todo, completed } = req.body

        if (todo === '' || typeof completed !== 'boolean') res.sendStatus(400)

        const [upated] = await Todo.update({ todo, completed }, { where: { id: id, userId: userId } })
        let statusCode = upated > 0 ? 200 : 400
        res.sendStatus(statusCode)

    } catch (err) {
        console.log(err);
        res.sendStatus(400)
    }
}
const deleteTodo = async (req: Request<{ tid: string }>, res: Response) => {
    try {
        const { id } = req.user as User
        const { tid } = req.params

        const deleted = await Todo.destroy({ where: { id: tid, userId: id } })
        let statusCode = deleted > 0 ? 200 : 400
        res.sendStatus(statusCode)

    } catch (err) {
        console.log(err);
        res.sendStatus(400)
    }
}

const postTodoByAdmin = async (req: Request<{}, {}, TodoBody & UsersForTodo>, res: Response) => {
    const { todo, users } = req.body

    try {

        if (users === undefined || users.length === 0) return res.sendStatus(400)

        const todoList: TodoAttributes[] = users.map((userId) => {
            return {
                userId: userId,
                todo: todo,
                byAdmin: true,
            }
        });

        const todos = await Todo.bulkCreate(todoList)
        res.status(200).json({ todos })
    } catch (err) {
        console.log(err);
        res.sendStatus(400)
    }
}

const getTodosByAdmin = async (req: Request<{}, {}, TodoBody>, res: Response) => {
    try {
        const todos: Array<Todo> = await Todo.findAll()
        res.status(200).json({ todos })
    } catch (err) {
        console.log(err);
        res.sendStatus(400)
    }
}

const getTodoByAdmin = async (req: Request<{ tid: string }>, res: Response) => {
    try {
        const { tid } = req.params

        const todo: Todo = await Todo.findOne({ where: { id: tid } })
        res.status(200).json({ todo })

    } catch (err) {
        console.log(err);
        res.sendStatus(400)
    }
}

const putTodoByAdmin = async (req: Request<{}, {}, TodoBody>, res: Response) => {
    try {
        const { id, userId, todo, completed } = req.body

        if (todo === '' || typeof completed !== 'boolean') res.sendStatus(400)

        const [upated] = await Todo.update({ todo, completed }, { where: { id: id, userId: userId } })
        let statusCode = upated > 0 ? 200 : 400
        res.sendStatus(statusCode)

    } catch (err) {
        console.log(err);
        res.sendStatus(400)
    }
}

const deleteTodoByAdmin = async (req: Request<{ tid: string }>, res: Response) => {
    try {
        const { tid } = req.params

        const deleted = await Todo.destroy({ where: { id: tid } })
        let statusCode = deleted > 0 ? 200 : 400
        res.sendStatus(statusCode)

    } catch (err) {
        console.log(err);
        res.sendStatus(400)
    }
}

export default {
    postTodo,
    getTodos,
    getTodo,
    putTodo,
    deleteTodo,
    postTodoByAdmin,
    getTodosByAdmin,
    getTodoByAdmin,
    putTodoByAdmin,
    deleteTodoByAdmin
}