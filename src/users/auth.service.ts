import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) { }

  async signup(email: string, password: string) {
    const findUser = await this.userService.find(email)

    if (findUser.length > 0) {
      throw new BadRequestException('Email in use!')
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await this.userService.create(email, hashedPassword)

    return user
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email)
    if (!user) {
      throw new NotFoundException('User not found!')
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Wrong password!')
    }

    return user
  }
}