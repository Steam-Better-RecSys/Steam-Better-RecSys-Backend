import express from 'express'
import TagController from '../controllers/TagController'

const router: express.Router = express.Router()

const tagController = new TagController()

router.route('/').get(tagController.getAllTags)

router.route('/:id').get(tagController.getTag)

/*
router.route('/').post(tagController.createTag)
 */

export default router
