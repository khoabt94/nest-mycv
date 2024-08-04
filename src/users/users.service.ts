import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    create(email: string, password: string) {
        const user = this.repo.create({ email, password })
        return this.repo.save(user)
    }

    async find(email: string) {
        return await this.repo.find({ where: { email } })
    }

    async findOne(id: string) {
        const findUser = await this.repo.findOneBy({ id })
        if (!findUser) {
            return new NotFoundException('User not found!')
        }
        return findUser
    }

    async update(id: string, data: Partial<User>) {
        const findUser = await this.repo.findOneBy({ id })
        if (!findUser) {
            return new NotFoundException('User not found!')
        }
        Object.assign(findUser, data)
        this.repo.save(findUser)
    }

    async remove(id: string) {
        const findUser = await this.repo.findOneBy({ id })
        if (!findUser) {
            return new NotFoundException('User not found!')
        }
        this.repo.remove(findUser)
    }
}
