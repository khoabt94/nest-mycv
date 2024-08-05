import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {

  }

  async intercept(ctx: ExecutionContext, next: CallHandler) {
    const request = ctx.switchToHttp().getRequest()

    const { userId } = request.session || {};

    if (userId) {
      const user = await this.userService.findOne(userId)
      request.currentUser = user
    }

    return next.handle()
  }
}