import { Request, Response } from 'express'
import GameService from '../services/GameService'
import Convertor from '../utils/Convertor'
import StringClean from '../utils/StringClean'

const gameService = new GameService()
const convertor = new Convertor()
const stringClean = new StringClean()

class GameController {
    getAllGames = async (request: Request, response: Response) => {
        const tagsQuery = request.query.tag
        const sortQuery = request.query.sort || 'reviews'
        const orderQuery = request.query.order || 'DESC'
        const limitQuery = request.query.limit || 50
        const offsetQuery = request.query.offset || 0
        let searchQuery = request.query.search
        let usernameQuery = request.query.username

        if (searchQuery) {
            searchQuery = stringClean.cleanString(String(searchQuery))
        } else {
            searchQuery = '%'
        }

        if (usernameQuery) {
            usernameQuery = String(usernameQuery).trim()
        } else {
            usernameQuery = ''
        }

        let tagsIds = null
        if (tagsQuery) {
            tagsIds = convertor.convertQueryToNumbers(tagsQuery)
        }

        const allGames = await gameService.getFilteredGames(
            tagsIds,
            String(sortQuery),
            String(orderQuery),
            Number(limitQuery),
            Number(offsetQuery),
            searchQuery,
            usernameQuery
        )

        return response.send(allGames)
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
        const { description } = request.body
        const results = await gameService.update(id, description)
        return response.send(results)
    }

    deleteGame = async (request: Request, response: Response) => {
        const id = Number(request.params.id)
        const results = await gameService.delete(id)
        return response.send(results)
    }
}

export default GameController
