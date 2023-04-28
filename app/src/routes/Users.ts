import express from 'express'
import UserController from '../controllers/UserController'
import { checkJWT } from '../middlewares/checkJWT'

const router: express.Router = express.Router()

const userController = new UserController()

router
    .route('/wishlist/:id')
    .post(checkJWT, userController.addLikedGame)

router
    .route('/wishlist/:id')
    .delete(checkJWT, userController.removeLikedGame)

router
    .route('/blacklist/:id')
    .post(checkJWT, userController.addDislikedGame)

router
    .route('/blacklist/:id')
    .delete(checkJWT, userController.addDislikedGame)

export default router
