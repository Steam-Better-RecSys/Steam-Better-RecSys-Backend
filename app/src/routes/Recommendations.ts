import express from 'express'
import RecommendationController from '../controllers/RecommendationController'

const router: express.Router = express.Router()

const recommendationsController = new RecommendationController()

router.route('/').get(recommendationsController.getRecommendations)

router.route('/').post(recommendationsController.setRecommendations)

export default router
