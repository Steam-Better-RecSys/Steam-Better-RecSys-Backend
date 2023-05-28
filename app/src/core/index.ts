import express from 'express'
import cors = require('cors')
import cookieParser = require('cookie-parser')
import compression = require('compression')
import { createServer, Server } from 'http'
import {
    Recommendations,
    Reviews,
    Auth,
    Users,
    Games,
    Tags,
    TagClasses,
} from '../routes'
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
        app.use(
            compression({
                level: 7,
            })
        )

        app.use('/users', Users)
        app.use('/auth', Auth)
        app.use('/games', Games)
        app.use('/tags', Tags)
        app.use('/classes', TagClasses)
        app.use('/recommendations', Recommendations)
        app.use('/reviews', Reviews)

        app.get('/health', (request, response) => {
            response.json({ status: 'up' })
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
