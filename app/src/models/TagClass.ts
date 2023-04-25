import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm'
import { Tag } from './Tag'

@Entity()
export class TagClass {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Tag, (tag) => tag.class)
    tags: Tag[]
}
