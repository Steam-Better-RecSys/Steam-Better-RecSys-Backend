import express from 'express'
import ReviewsController from '../controllers/ReviewsController'

const router: express.Router = express.Router()

const reviewsController = new ReviewsController()

router.route('/:id').get(reviewsController.getReviews)

export default router
