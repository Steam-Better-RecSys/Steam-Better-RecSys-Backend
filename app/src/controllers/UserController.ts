import { Request, Response } from 'express'
import UserService from '../services/UserService'

const userService = new UserService()

class UserController {
    addLikedGame = async (request: Request, response: Response) => {
        const gameId = Number(request.params.id)
        const username = response.locals.jwtPayload.username
        const user = await userService.addLikedGame(username, gameId)
        return response.send(user)
    }

    removeLikedGame = async (request: Request, response: Response) => {
        const gameId = Number(request.params.id)
        const username = response.locals.jwtPayload.username
        const user = await userService.deleteLikedGame(username, gameId)
        return response.send(user)
    }

    addDislikedGame = async (request: Request, response: Response) => {
        const gameId = Number(request.params.id)
        const username = response.locals.jwtPayload.username
        const user = await userService.addDislikedGame(username, gameId)
        return response.send(user)
    }

    removeDislikedGame = async (request: Request, response: Response) => {
        const gameId = Number(request.params.id)
        const username = response.locals.jwtPayload.username
        const user = await userService.deleteDislikedGame(username, gameId)
        return response.send(user)
    }
}

export default UserController
