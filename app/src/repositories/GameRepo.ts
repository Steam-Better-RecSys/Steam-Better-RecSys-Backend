import { AppDataSource } from '../database/data-source'
import { Game } from '../models/Game'
import { Tag } from '../models/Tag'
import { GameSorting } from './ISorting'
import { In } from 'typeorm'

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

    async readByGameId(gameId: number) {
        return await gameRepository.findOneOrFail({
            relations: {
                tags: false,
            },
            where: { gameId: gameId },
        })
    }

    async readByIds(ids: number[]) {
        return await gameRepository.find({
            where: {
                gameId: In([...ids]),
            },
        })
    }

    async readByIdsAndSort(
        ids: number[],
        gameSorting: GameSorting,
        limit: number,
        offset: number
    ) {
        return await gameRepository.findAndCount({
            where: {
                gameId: In([...ids]),
            },
            order: {
                [gameSorting.parameter]: gameSorting.direction,
            },
            take: limit,
            skip: offset,
        })
    }

    async readAll(gameSorting: GameSorting, limit: number, offset: number) {
        return await gameRepository.findAndCount({
            relations: {
                tags: true,
            },
            order: {
                [gameSorting.parameter]: gameSorting.direction,
            },
            take: limit,
            skip: offset,
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

    async update(id: number, description: string) {
        const game = await this.readById(id)
        game.description = description
        return await gameRepository.save(game)
    }

    async updateByGameId(gameId: number, description: string) {
        const game = await this.readByGameId(gameId)
        game.description = description
        return await gameRepository.save(game)
    }

    async delete(id: number) {
        const game = await this.readById(id)
        return await gameRepository.remove(game)
    }
}

export default GameRepository
