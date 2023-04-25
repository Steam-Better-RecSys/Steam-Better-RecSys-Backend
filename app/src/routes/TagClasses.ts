import express from 'express'
import TagClassController from '../controllers/TagClassController'

const router: express.Router = express.Router()

const tagClassController = new TagClassController()

router.route('/').get(tagClassController.getAllClassTags)

router.route('/:id').get(tagClassController.getClassTag)

router.route('/').post(tagClassController.createClassTag)

export default router
