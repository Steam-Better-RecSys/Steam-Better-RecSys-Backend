import { Request, Response } from 'express'
import GameService from '../services/GameService'
import Convertor from '../utils/Convertor'
import fetch from 'node-fetch'

const gameService = new GameService()
const convertor = new Convertor()

class GameController {
    getAllGames = async (request: Request, response: Response) => {
        const tagsQuery = request.query.tag
        const sortQuery = request.query.sort || 'title'
        const orderQuery = request.query.order || 'ASC'
        const limitQuery = request.query.limit || 100
        const offsetQuery = request.query.offset || 0

        if (tagsQuery) {
            const tagsIds = convertor.convertQueryToNumbers(tagsQuery)
            const allGames = await gameService.getByTags(
                tagsIds,
                String(sortQuery),
                String(orderQuery),
                Number(limitQuery),
                Number(offsetQuery)
            )
            return response.send(allGames)
        } else {
            const allGames = await gameService.getAll(
                String(sortQuery),
                String(orderQuery),
                Number(limitQuery),
                Number(offsetQuery)
            )
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
        const { description } = request.body
        const results = await gameService.update(id, description)
        return response.send(results)
    }

    deleteGame = async (request: Request, response: Response) => {
        const id = Number(request.params.id)
        const results = await gameService.delete(id)
        return response.send(results)
    }

    getGameDescriptionFromSteam = async (
        request: Request,
        response: Response
    ) => {
        const id = Number(request.params.game_id)
        const steamData = await fetch(
            'https://store.steampowered.com/api/appdetails?' +
                new URLSearchParams({
                    l: 'english',
                    appids: String(id),
                }),
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        )

        const steamDataJson = await steamData.json()
        const description = steamDataJson[id]['data']['about_the_game']

        const results = await gameService.updateByGameId(id, description)
        return response.send(results)
    }
}

export default GameController
