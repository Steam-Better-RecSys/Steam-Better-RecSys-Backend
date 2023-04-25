import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    ManyToOne,
} from 'typeorm'
import { Game } from './Game'
import { TagClass } from './TagClass'

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => Game, (game) => game.tags)
    games: Game[]

    @ManyToOne(() => TagClass, (tagClass) => tagClass.tags)
    class: TagClass
}
