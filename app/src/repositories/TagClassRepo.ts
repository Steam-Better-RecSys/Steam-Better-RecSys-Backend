import { AppDataSource } from '../database/data-source'
import { TagClass } from '../models/TagClass'
import { In } from 'typeorm'
import { Tag } from '../models/Tag'

const tagClassRepository = AppDataSource.getRepository(TagClass)

class TagRepository {
    async readById(id: number) {
        return await tagClassRepository.findOneOrFail({
            relations: {
                tags: true,
            },
            where: { id: id },
        })
    }

    async readAll() {
        return await tagClassRepository.find({
            relations: {
                tags: true,
            }
        })
    }

    async create(name: string, tags: Tag[]) {
        const tag = new TagClass()
        tag.name = name
        tag.tags = tags
        return await tagClassRepository.save(tag)
    }

    async readAllByIds(ids: number[]) {
        return await tagClassRepository.find({
            relations: {
                tags: true,
            },
            where: { id: In(ids) },
        })
    }
}

export default TagRepository
