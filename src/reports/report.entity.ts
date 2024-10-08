import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: false })
    approved: boolean

    @Column()
    price: number

    @Column()
    make: string

    @Column()
    model: string

    @Column()
    year: number

    @Column()
    lat: number

    @Column()
    lng: number

    @Column()
    milage: number

    @ManyToOne(() => User, (user) => user.reports)
    user: User
}