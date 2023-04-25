import GameRepository from '../repositories/GameRepo'
import TagService from './TagService'
import { Tag } from '../models/Tag'

const gameRepository = new GameRepository()
const tagService = new TagService()

class GameService {
    async getById(id: number) {
        return gameRepository.readById(id)
    }

    async getAll() {
        return gameRepository.readAll()
    }

    async getByTags(tagsIds: number[]) {
        const tags: Tag[] = await tagService.getAllByIds(tagsIds)
        let allGames = tags[0].games

        for (let i = 1; i < tags.length; i++) {
            const tagGames = tags[i].games
            allGames = allGames.filter(
                ({ id }) => tagGames.findIndex((game) => game.id === id) > -1
            )
        }

        return Array.from(allGames)
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
