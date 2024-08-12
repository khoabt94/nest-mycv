import { Report } from "src/reports/report.entity"
import { AfterInsert, AfterUpdate, AfterRemove, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({ default: false })
    admin: boolean

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

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[]
}