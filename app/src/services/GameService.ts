import GameRepository from '../repositories/GameRepo'
import TagService from './TagService'
import { Tag } from '../models/Tag'
import { GameSorting } from '../repositories/ISorting'
import fetch from 'node-fetch'
import SteamService from './SteamService'

const gameRepository = new GameRepository()
const tagService = new TagService()
const steamService = new SteamService()

class GameService {
    async getById(id: number) {
        return gameRepository.readById(id)
    }

    async getByGameId(gameId: number) {
        return gameRepository.readByGameId(gameId)
    }

    async getFilteredGames(
        tagsIds: number[] | null,
        sortOption: string,
        directionOption: string,
        limit: number,
        offset: number,
        searchString: string,
        usernameString: string
    ) {
        const gameSorting = new GameSorting(sortOption, directionOption)
        let gamesWithCount = await gameRepository.readAll(searchString)
        let games = gamesWithCount[0]

        if (tagsIds) {
            const tags: Tag[] = await tagService.getAllByIds(tagsIds)
            for (let i = 0; i < tags.length; i++) {
                const tagGames = tags[i].games
                games = games.filter(
                    ({ id }) =>
                        tagGames.findIndex((game) => game.id === id) > -1
                )
            }
        }

        if (usernameString != '') {
            let userId
            if (usernameString.startsWith('https://steamcommunity.com/id/')) {
                usernameString = usernameString
                    .split('/')
                    .filter((item) => item)
                    .slice(-1)[0]
                userId = await steamService.GetSteamID(usernameString)
            } else if (
                usernameString.startsWith(
                    'https://steamcommunity.com/profiles/'
                )
            ) {
                userId = usernameString
                    .split('/')
                    .filter((item) => item)
                    .slice(-1)[0]
            } else {
                userId = await steamService.GetSteamID(usernameString)
            }
            if (userId) {
                const userGames = await steamService.GetUserGames(userId)
                if (userGames) {
                    games = games.filter(
                        ({ gameId }) =>
                            userGames.findIndex(
                                (game) => game.appid === gameId
                            ) > -1
                    )
                }
            }
        }

        const ids = games.map((game) => game.gameId)

        gamesWithCount = await gameRepository.readByIdsAndCount(
            ids,
            limit,
            offset,
            gameSorting
        )

        return gamesWithCount
    }

    async getByIds(ids: number[]) {
        const games = await gameRepository.readByIds(ids)
        games.sort(function (a, b) {
            return ids.indexOf(a.gameId) - ids.indexOf(b.gameId)
        })
        for (let i = 0; i < games.length; i++) {
            if (games[i].description == null) {
                games[i] = await this.getDescriptionFromSteam(games[i].gameId)
            }
        }
        return games
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

    async update(id: number, description: string) {
        return gameRepository.update(id, description)
    }

    async delete(id: number) {
        return gameRepository.delete(id)
    }

    async updateByGameId(gameId: number, description: string) {
        return gameRepository.updateByGameId(gameId, description)
    }

    async getDescriptionFromSteam(gameId: number) {
        const steamData = await fetch(
            'https://store.steampowered.com/api/appdetails?' +
                new URLSearchParams({
                    l: 'english',
                    appids: String(gameId),
                }),
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        )

        const steamDataJson = await steamData.json()
        let description = null
        if (steamDataJson[gameId]['success'] == true) {
            description = steamDataJson[gameId]['data']['short_description']
        }

        return await this.updateByGameId(gameId, description)
    }
}

export default GameService
