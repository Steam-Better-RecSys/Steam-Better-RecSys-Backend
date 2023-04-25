import { Request, Response } from 'express'
import UserService from '../services/UserService'

const userService = new UserService()

class UserController {
    getAllUsers = async (request: Request, response: Response) => {
        const allUsers = userService.getAll()
        return response.send(allUsers)
    }

    addUserLikedGame = async (request: Request, response: Response) => {
        const gameId = Number(request.params.id)
        const username = response.locals.jwtPayload.username
        const user = await userService.addLikedGame(username, gameId)
        return response.send(user)
    }

    removeUserLikedGame = async (request: Request, response: Response) => {
        const gameId = Number(request.params.id)
        const username = response.locals.jwtPayload.username
        const user = await userService.deleteLikedGame(username, gameId)
        return response.send(user)
    }

    getMyLikedGames = async (request: Request, response: Response) => {
        const username = response.locals.jwtPayload.username
        const user = await userService.getByUsername(username)
        return response.send(user)
    }
}

export default UserController
