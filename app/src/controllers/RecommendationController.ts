import { Request, Response } from 'express'
import 'dotenv/config'
import fetch from 'node-fetch'
import GameService from '../services/GameService'

const gameService = new GameService()

class RecommendationController {
    mlUrl: string = String(process.env.ML_HOST)

    test = async (request: Request, response: Response) => {
        const recommendations = await fetch(this.mlUrl + 'test', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })

        const recommendationsData = await recommendations.json()

        return response.send(recommendationsData)
    }

    setRecommendations = async (request: Request, response: Response) => {
        const recommendations = await fetch(this.mlUrl + 'selected_games', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request.body),
        })

        const recommendationsData = await recommendations.json()
        const vector = recommendationsData['vector']

        response.cookie('vector', vector)
        response.cookie('recommendedGames', request.body['games_ids'])

        return response.send(recommendationsData)
    }

    getRecommendations = async (request: Request, response: Response) => {
        let gameIds = request.cookies['recommendedGames']
        let recommendedGamesIds = []
        let vector = 0

        let t = 0
        try {
            while (t < 10 && recommendedGamesIds.length < 10) {
                const params = new URLSearchParams({
                    offset: String(t * 10),
                    limit: String((t + 1) * 10),
                })

                const recommendations = await fetch(
                    this.mlUrl + 'recommendations?' + params,
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(request.cookies),
                    }
                )

                const recommendationsData = await recommendations.json()
                vector = recommendationsData['vector']

                recommendedGamesIds.push(...recommendationsData['games'])
                recommendedGamesIds = recommendedGamesIds.filter(
                    (id: number) => gameIds.indexOf(id) < 0
                )

                t = t + 1
            }
        } catch (e) {
            recommendedGamesIds.push(730)
        }

        let games = []
        for (let i = 0; i < Math.min(10, recommendedGamesIds.length); i++) {
            const game = await gameService.getByGameId(recommendedGamesIds[i])
            games.push(game)
        }

        response.cookie('vector', vector)
        // TO-DO: update recommended games

        return response.send(games)
    }
}

export default RecommendationController
