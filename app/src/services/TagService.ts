import TagRepository from '../repositories/TagRepo'

const tagRepository = new TagRepository()

class TagService {
    async getById(id: number) {
        return tagRepository.readById(id)
    }

    async getAll() {
        return tagRepository.readAll()
    }

    async getAllByIds(ids: number[], showGames = true) {
        return tagRepository.readAllByIds(ids, showGames)
    }

    async create(name: string) {
        return tagRepository.create(name)
    }
}

export default TagService
