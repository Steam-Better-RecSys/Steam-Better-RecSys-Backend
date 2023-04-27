import { request, Request, Response } from 'express'
import TagClassService from '../services/TagClassService'

const tagClassService = new TagClassService()

class TagClassController {
    getAllClassTags = async (request: Request, response: Response) => {
        const allClassTags = await tagClassService.getAll()
        return response.send(allClassTags)
    }

    getClassTag = async (request: Request, response: Response) => {
        const classId = Number(request.params.id)
        const classTag = await tagClassService.getById(classId)
        return response.send(classTag)
    }

    createClassTag = async (request: Request, response: Response) => {
        const { name, tags } = request.body
        const result = await tagClassService.create(name, tags)
        return response.send(result)
    }
}

export default TagClassController
