import { Request, Response } from 'express'
import TagService from '../services/TagService'

const tagService = new TagService()

class TagController {
    getTag = async (request: Request, response: Response) => {
        const id = Number(request.params.id)
        const tag = await tagService.getById(id)
        return response.send(tag)
    }

    getAllTags = async (request: Request, response: Response) => {
        const allTags = await tagService.getAll()
        return response.send(allTags)
    }

    createTag = async (request: Request, response: Response) => {
        const { name } = request.body
        const result = await tagService.create(name)
        return response.send(result)
    }
}

export default TagController
