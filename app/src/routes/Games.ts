import express from 'express'
import GameController from '../controllers/GameController'

const router: express.Router = express.Router()

const gameController = new GameController()

router.route('/').get(gameController.getAllGames)

router.route('/:id').get(gameController.getGame)

/*
router.route('/').post(gameController.createGame)

router.route('/:id').delete(gameController.deleteGame)

router.route('/:id').put(gameController.updateGame)
 */

export default router
