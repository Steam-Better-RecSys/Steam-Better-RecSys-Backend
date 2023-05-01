import { AppDataSource } from '../database/data-source'
import { Tag } from '../models/Tag'
import { In } from 'typeorm'

const tagRepository = AppDataSource.getRepository(Tag)

class TagRepository {
    async readById(id: number) {
        return await tagRepository.findOneOrFail({
            where: { id: id },
        })
    }

    async readAllByIds(ids: number[], showRelations = true) {
        return await tagRepository.find({
            relations: {
                games: showRelations,
            },
            where: { id: In(ids) },
        })
    }

    async readAll() {
        return await tagRepository.find()
    }

    async create(name: string) {
        const tag = new Tag()
        tag.name = name
        return await tagRepository.save(tag)
    }
}

export default TagRepository
