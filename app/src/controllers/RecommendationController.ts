import { Request, Response } from 'express'
import 'dotenv/config'
import fetch from 'node-fetch'
import GameService from '../services/GameService'

const gameService = new GameService()

class RecommendationController {
    mlUrl: string = String(process.env.ML_HOST)

    setRecommendations = async (request: Request, response: Response) => {
        const mobile = request.query.mobile || false

        const params = new URLSearchParams()
        request.body.games_ids.forEach(function (game_id) {
            params.append('games_ids', game_id)
        })

        const recommendations = await fetch(
            this.mlUrl + 'recommendations?' + params,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        )

        const recommendationsData = await recommendations.json()

        if (mobile == false) {
            const vector = recommendationsData['vector']
            response.cookie('vector', vector)
            response.cookie('recommendedGames', request.body['games_ids'])
        }
        return response.send(recommendationsData)
    }

    getRecommendations = async (request: Request, response: Response) => {
        const mobile = request.query.mobile || false

        let alreadyRecommendedGames
        let data
        if (mobile == false) {
            alreadyRecommendedGames = request.cookies['recommendedGames']
            data = JSON.stringify(request.cookies)
        } else {
            alreadyRecommendedGames = request.body['games_ids']
            data = JSON.stringify(request.body)
        }

        let gameId = request.query.game_id || '0'
        let gameStatus = request.query.game_status || '0'

        if (gameId != '0') {
            if (mobile) {
                alreadyRecommendedGames.push(Number(gameId))
            } else {
                alreadyRecommendedGames += ' '
                alreadyRecommendedGames += gameId
                response.cookie('recommendedGames', alreadyRecommendedGames)
            }
        }

        let recommendedGamesIds = []
        let vector = 0

        let t = 0
        try {
            while (t < 100 && recommendedGamesIds.length < 10) {
                const params = new URLSearchParams({
                    offset: String(t * 10),
                    limit: String((t + 1) * 10),
                    liked: String(gameStatus),
                    game_id: String(gameId),
                })

                const recommendations = await fetch(
                    this.mlUrl + 'recommendations?' + params,
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: data,
                    }
                )

                const recommendationsData = await recommendations.json()
                vector = recommendationsData['vector']

                recommendedGamesIds.push(...recommendationsData['games'])
                recommendedGamesIds = recommendedGamesIds.filter(
                    (id: number) => alreadyRecommendedGames.indexOf(id) < 0
                )

                t = t + 1
            }

            recommendedGamesIds = recommendedGamesIds.slice(0, 10)
        } catch (e) {
            recommendedGamesIds.push(730)
        }

        const recommendedGames = await gameService.getByIds(recommendedGamesIds)

        if (vector != 0 && mobile == false) {
            response.cookie('vector', vector)
            return response.send(recommendedGames)
        } else {
            return response.send({
                vector: vector,
                games: recommendedGames,
            })
        }
    }
}

export default RecommendationController
