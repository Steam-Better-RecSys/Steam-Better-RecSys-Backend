import { Request, Response } from 'express'
import 'dotenv/config'
import fetch from 'node-fetch'
import GameService from '../services/GameService'

const gameService = new GameService()

class RecommendationController {
    mlUrl: string = String(process.env.ML_HOST)

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
        let alreadyRecommendedGames = request.cookies['recommendedGames']

        let gameId = String(request.query.game_id) || '0'
        let gameStatus = String(request.query.game_status) || '0'

        if (gameId != '0') {
            alreadyRecommendedGames += ' '
            alreadyRecommendedGames += gameId
            response.cookie('recommendedGames', alreadyRecommendedGames)
        }

        let recommendedGamesIds = []
        let vector = 0

        let t = 0
        try {
            while (t < 100 && recommendedGamesIds.length < 10) {
                const params = new URLSearchParams({
                    offset: String(t * 10),
                    limit: String((t + 1) * 10),
                    liked: gameStatus,
                    game_id: gameId,
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
                    (id: number) => alreadyRecommendedGames.indexOf(id) < 0
                )

                t = t + 1
            }

            recommendedGamesIds = recommendedGamesIds.slice(0, 10)
        } catch (e) {
            recommendedGamesIds.push(730)
        }

        const recommendedGames = await gameService.getByIds(recommendedGamesIds)

        if (vector != 0) {
            response.cookie('vector', vector)
        }

        return response.send(recommendedGames)
    }
}

export default RecommendationController
