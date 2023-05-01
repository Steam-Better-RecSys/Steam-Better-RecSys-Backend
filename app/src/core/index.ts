import express from 'express'
import cors = require('cors')
import cookieParser = require('cookie-parser')
import { createServer, Server } from 'http'
import users from '../routes/Users'
import auth from '../routes/Auth'
import games from '../routes/Games'
import tags from '../routes/Tags'
import recommendations from '../routes/Recommendations'
import tagClasses from '../routes/TagClasses'
import { AppDataSource } from '../database/data-source'

class App {
    public port: number
    public host: string

    private app: express.Application
    private server: Server

    constructor(port = 8000, host = 'localhost') {
        this.port = port
        this.host = host

        this.app = this.createApp()
        this.server = this.createServer()
    }

    private createApp(): express.Application {
        const app = express()

        app.use(cors({ origin: true, credentials: true }))
        app.use(cookieParser())
        app.use(express.urlencoded({ extended: true }))
        app.use(express.json())

        app.use('/users', users)
        app.use('/auth', auth)
        app.use('/games', games)
        app.use('/tags', tags)
        app.use('/classes', tagClasses)
        app.use('/recommendations', recommendations)

        app.get('/', (request, response) => {
            response.send('{health_check: OK}')
        })

        return app
    }

    private createServer(): Server {
        return createServer(this.app)
    }

    public start(): void {
        AppDataSource.initialize().then(() =>
            this.server.listen(this.port, () => {
                console.log(`Running server on port ${this.port}`)
            })
        )
    }
}

export default App
