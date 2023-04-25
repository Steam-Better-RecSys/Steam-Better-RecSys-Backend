import { Request, Response } from 'express'
import GameService from '../services/GameService'
import Convertor from '../utils/Convertor'

const gameService = new GameService()
const convertor = new Convertor()

class GameController {
    getAllGames = async (request: Request, response: Response) => {
        const tagsQuery = request.query.tag
        if (tagsQuery) {
            const tagsIds = convertor.convertQueryToNumbers(tagsQuery)
            const allGames = await gameService.getByTags(tagsIds)
            return response.send(allGames)
        } else {
            const allGames = await gameService.getAll()
            return response.send(allGames)
        }
    }

    getGame = async (request: Request, response: Response) => {
        const id = Number(request.params.id)
        const game = await gameService.getById(id)
        return response.send(game)
    }

    createGame = async (request: Request, response: Response) => {
        const { gameId, title, description, nameSlug, tags } = request.body
        const results = await gameService.create(
            gameId,
            title,
            description,
            nameSlug,
            tags
        )
        return response.send(results)
    }

    updateGame = async (request: Request, response: Response) => {
        const id = Number(request.params.id)
        const { title } = request.body
        const results = await gameService.update(id, title)
        return response.send(results)
    }

    deleteGame = async (request: Request, response: Response) => {
        const id = Number(request.params.id)
        const results = await gameService.delete(id)
        return response.send(results)
    }
}

export default GameController
