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

    @Column({
        nullable: true,
    })
    description: string

    @Column({
        nullable: true,
    })
    nameSlug: string

    @Column()
    reviews: number

    @Column({
        type: 'date',
    })
    releaseDate: string

    protected horizontalImageUrl: string

    protected verticalImageUrl: string

    @AfterLoad()
    getHorizontalImageUrl() {
        this.horizontalImageUrl =
            'https://cdn.cloudflare.steamstatic.com/steam/apps/' +
            String(this.gameId) +
            '/header.jpg'
    }

    @AfterLoad()
    getVerticalImageUrl() {
        this.verticalImageUrl =
            'https://cdn.cloudflare.steamstatic.com/steam/apps/' +
            String(this.gameId) +
            '/library_600x900.jpg'
    }

    @ManyToMany((type) => Tag, (tag) => tag.games, {
        cascade: true,
    })
    @JoinTable()
    tags: Tag[]
}
