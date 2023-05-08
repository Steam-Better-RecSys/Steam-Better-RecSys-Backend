import { AppDataSource } from '../database/data-source'
import { Game } from '../models/Game'
import { Tag } from '../models/Tag'
import { GameSorting } from './ISorting'
import { In, Like } from 'typeorm'

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

    async readByIdsAndSearchStringWithSorting(
        ids: number[],
        searchString: string,
        gameSorting: GameSorting,
        limit: number,
        offset: number
    ) {
        return await gameRepository.findAndCount({
            select: {
                id: true,
                gameId: true,
                title: true,
                nameSlug: true,
            },
            where: {
                gameId: In([...ids]),
                nameSlug: Like(searchString),
            },
            order: {
                [gameSorting.parameter]: gameSorting.direction,
            },
            take: limit,
            skip: offset,
        })
    }

    async readAll(
        gameSorting: GameSorting,
        limit: number,
        offset: number,
        search: string
    ) {
        return await gameRepository.findAndCount({
            select: {
                id: true,
                gameId: true,
                title: true,
                nameSlug: true,
            },
            where: {
                nameSlug: Like(search),
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
