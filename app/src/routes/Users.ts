import express from 'express'
import UserController from '../controllers/UserController'
import { checkJWT } from '../middlewares/checkJWT'

const router: express.Router = express.Router()

const userController = new UserController()

router.route('/').get(userController.getAllUsers)

router
    .route('/my_random_entities')
    .get(checkJWT, userController.getMyLikedGames)

router
    .route('/my_random_entities/:id')
    .post(checkJWT, userController.addUserLikedGame)

router
    .route('/my_random_entities/:id')
    .delete(checkJWT, userController.removeUserLikedGame)

export default router
