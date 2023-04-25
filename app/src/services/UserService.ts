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
        const likedGame = await gameService.getById(gameId)
        return userRepository.updateUserLikedMovies(username, likedGame, true)
    }

    async deleteLikedGame(username: string, gameId: number) {
        const dislikedGame = await gameService.getById(gameId)
        return await userRepository.updateUserLikedMovies(
            username,
            dislikedGame,
            false
        )
    }
}

export default UserService
