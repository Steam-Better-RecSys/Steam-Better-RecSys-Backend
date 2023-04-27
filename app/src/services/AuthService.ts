import UserRepository from '../repositories/UserRespo'

const userRepository = new UserRepository()

class AuthService {
    async getUserTokenVersion(username: string) {
        return userRepository.readOneByUsername(username)
    }

    async updateUserTokenVersion(username: string) {
        return userRepository.updateTokenVersion(username)
    }
}

export default AuthService