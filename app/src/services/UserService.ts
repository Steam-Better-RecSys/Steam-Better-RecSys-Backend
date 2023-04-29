import UserRepository from '../repositories/UserRespo'
import GameService from './GameService'

const userRepository = new UserRepository()
const gameService = new GameService()

class UserService {
    async getAll() {
        return userRepository.readAll()
    }

    async getByUsername(username: string) {
        return userRepository.readOneByUsername(username)
    }

    async createNewUser(username: string, password: string) {
        return userRepository.createUser(username, password)
    }

    async addLikedGame(username: string, gameId: number) {
        const game = await gameService.getById(gameId)
        return userRepository.updateUserGames(
            username,
            game,
            true,
            'likedGames'
        )
    }

    async deleteLikedGame(username: string, gameId: number) {
        const game = await gameService.getById(gameId)
        return await userRepository.updateUserGames(
            username,
            game,
            false,
            'likedGames'
        )
    }

    async addDislikedGame(username: string, gameId: number) {
        const game = await gameService.getById(gameId)
        return userRepository.updateUserGames(
            username,
            game,
            true,
            'dislikedGames'
        )
    }

    async deleteDislikedGame(username: string, gameId: number) {
        const game = await gameService.getById(gameId)
        return userRepository.updateUserGames(
            username,
            game,
            false,
            'dislikedGames'
        )
    }
}

export default UserService
