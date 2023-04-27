import GameRepository from '../repositories/GameRepo'
import TagService from './TagService'
import { Tag } from '../models/Tag'
import { GameSorting } from '../repositories/ISorting'

const gameRepository = new GameRepository()
const tagService = new TagService()

class GameService {
    async getById(id: number) {
        return gameRepository.readById(id)
    }

    async getAll(
        sortOption: string,
        directionOption: string,
        limit: number,
        offset: number
    ) {
        const gameSorting = new GameSorting(sortOption, directionOption)
        return gameRepository.readAll(gameSorting, limit, offset)
    }

    async getByIds(ids: number[]) {
        const games = await gameRepository.readByIds(ids)
        games.sort(function (a, b) {
            return ids.indexOf(a.gameId) - ids.indexOf(b.gameId)
        })
        return games
    }

    async getByTags(
        tagsIds: number[],
        sortOption: string,
        directionOption: string,
        limit: number,
        offset: number
    ) {
        const gameSorting = new GameSorting(sortOption, directionOption)
        const tags: Tag[] = await tagService.getAllByIds(tagsIds)
        let games = tags[0].games

        for (let i = 1; i < tags.length; i++) {
            const tagGames = tags[i].games
            games = games.filter(
                ({ id }) => tagGames.findIndex((game) => game.id === id) > -1
            )
        }

        const gameIds = games.map((game) => game.gameId)

        return gameRepository.readByIdsAndSort(
            gameIds,
            gameSorting,
            limit,
            offset
        )
    }

    async create(
        gameId: number,
        title: string,
        description: string,
        nameSlug: string,
        tagsIds: number[]
    ) {
        const tags = await tagService.getAllByIds(tagsIds, false)
        return gameRepository.create(gameId, title, description, nameSlug, tags)
    }

    async update(id: number, title: string) {
        return gameRepository.update(id, title)
    }

    async delete(id: number) {
        return gameRepository.delete(id)
    }
}

export default GameService
