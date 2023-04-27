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

        return response.send(recommendationsData)
    }

    getRecommendations = async (request: Request, response: Response) => {
        const recommendations = await fetch(this.mlUrl + 'recommendations', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request.cookies),
        })

        const recommendationsData = await recommendations.json()

        const vector = recommendationsData['vector']
        const gameIds = recommendationsData['games']

        response.cookie('vector', vector)
        const games = await gameService.getByIds(gameIds)

        return response.send(games)
    }
}

export default RecommendationController
