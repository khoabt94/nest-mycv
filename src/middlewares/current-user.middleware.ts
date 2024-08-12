import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { User } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";

declare global {
  namespace Express {
    interface Request {
      currentUser?: User
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) { }

  async use(request: Request, response: Response, next: NextFunction) {

    const { userId } = request.session || {};

    if (userId) {
      const user = await this.userService.findOne(userId)
      request.currentUser = user
    }

    return next()
  }
}