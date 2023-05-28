import { Request, Response } from 'express'
import 'dotenv/config'
import fetch from 'node-fetch'

class ReviewsController {
    mlUrl: string = String(process.env.ML_HOST)

    getReviews = async (request: Request, response: Response) => {
        const id = Number(request.params.id)

        const reviews = await fetch(this.mlUrl + 'reviews/' + id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })

        const reviewsData = await reviews.json()

        return response.send(reviewsData)
    }
}

export default ReviewsController
