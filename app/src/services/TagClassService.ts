import TagClassRepository from '../repositories/TagClassRepo'
import TagService from './TagService'

const tagClassRepository = new TagClassRepository()

const tagService = new TagService()

class TagClassService {
    async getById(id: number) {
        return tagClassRepository.readById(id)
    }

    async getAll() {
        return tagClassRepository.readAll()
    }

    async getAllByIds(ids: number[]) {
        return tagClassRepository.readAllByIds(ids)
    }

    async create(name: string, tagsIds: number[]) {
        const tags = await tagService.getAllByIds(tagsIds)
        return tagClassRepository.create(name, tags)
    }
}

export default TagClassService
