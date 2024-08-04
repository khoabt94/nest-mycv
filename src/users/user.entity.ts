import { Exclude } from "class-transformer"
import { AfterInsert, AfterUpdate, AfterRemove, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    email: string

    @Column()
    password: string

    @AfterInsert()
    logInsert() {
        console.log(`Created new user with id ${this.id}`)
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`Updated user with id ${this.id}`)
    }

    @AfterRemove()
    logRemove() {
        console.log(`Deleted user with id ${this.id}`)
    }
}