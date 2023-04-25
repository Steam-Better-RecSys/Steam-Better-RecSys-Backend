import { AppDataSource } from '../database/data-source'
import { Game } from '../models/Game'
import { Tag } from '../models/Tag'

const gameRepository = AppDataSource.getRepository(Game)

class GameRepository {
    async readById(id: number) {
        return await gameRepository.findOneOrFail({
            relations: {
                tags: true,
            },
            where: { id: id },
        })
    }

    async readAll() {
        return await gameRepository.find({
            relations: {
                tags: true,
            },
        })
    }

    async create(
        gameId: number,
        title: string,
        description: string,
        nameSlug: string,
        tags: Tag[]
    ) {
        const game = new Game()
        game.gameId = gameId
        game.title = title
        game.description = description
        game.nameSlug = nameSlug
        game.tags = tags
        return await gameRepository.save(game)
    }

    async update(id: number, title: string) {
        const game = await this.readById(id)
        game.title = title
        return await gameRepository.save(game)
    }

    async delete(id: number) {
        const game = await this.readById(id)
        return await gameRepository.remove(game)
    }
}

export default GameRepository
