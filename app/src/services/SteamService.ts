import fetch from 'node-fetch'
import 'dotenv/config'

class SteamService {
    async GetSteamID(username: string) {
        const userData = await fetch(
            'http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001?' +
                new URLSearchParams({
                    key: process.env.STEAM_API_KEY as string,
                    vanityurl: username,
                }),
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        )

        const userDataJson = await userData.json()
        let steamid = null
        try {
            if (userDataJson['response']['success'] == 1) {
                steamid = userDataJson['response']['steamid']
            }
        } catch (e) {
            steamid = null
        }

        return steamid
    }

    async GetUserGames(steamid: string) {
        try {
            const userData = await fetch(
                'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001?' +
                    new URLSearchParams({
                        key: process.env.STEAM_API_KEY as string,
                        steamid: steamid,
                        format: 'json',
                    }),
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            )

            const userDataJson = await userData.json()

            return userDataJson['response']['games']
        } catch (e) {
            return null
        }
    }
}

export default SteamService
