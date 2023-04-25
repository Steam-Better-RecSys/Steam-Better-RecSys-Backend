import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    AfterLoad,
} from 'typeorm'
import { Tag } from './Tag'

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
    })
    gameId: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    nameSlug: string

    protected verticalImageUrl: string

    protected horizontalImageUrl: string

    @AfterLoad()
    getVerticalImageUrl() {
        this.verticalImageUrl =
            'https://cdn.cloudflare.steamstatic.com/steam/apps/' +
            String(this.gameId) +
            '/header.jpg'
    }

    @AfterLoad()
    getHorizontalImageUrl() {
        this.horizontalImageUrl =
            'https://cdn.cloudflare.steamstatic.com/steam/apps/' +
            String(this.gameId) +
            '/hero_capsule.jpg'
    }

    @ManyToMany((type) => Tag, (tag) => tag.games, {
        cascade: true,
    })
    @JoinTable()
    tags: Tag[]
}
