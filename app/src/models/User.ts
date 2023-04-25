import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { Game } from './Game'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @Column()
    tokenVersion: number

    @ManyToMany(() => Game, {
        cascade: true,
    })
    @JoinTable()
    likesGames: Game[]

    @ManyToMany(() => Game, {
        cascade: true,
    })
    @JoinTable()
    dislikedGames: Game[]

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8)
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password)
    }
}
