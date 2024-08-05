import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, Session, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';

@Controller('auth')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) { }

    @Get()
    findAllUser(@Query('email') email: string) {
        return this.userService.find(email)
    }

    @Get('/myinfo')
    getMyInfo(@CurrentUser() user: User) {
        return user
    }

    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.userService.findOne(id)
    }

    @Post('signup')
    async createUser(@Body() createUserDto: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(createUserDto.email, createUserDto.password)
        session.userId = user.id
        return user
    }

    @Post('signin')
    async signin(@Body() createUserDto: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(createUserDto.email, createUserDto.password)
        session.userId = user.id
        return user
    }

    @Post('signout')
    async signout(@Session() session: any) {
        session.userId = null
    }

    @Patch('/:id')
    updateUser(
        @Param('id') id: string,
        @Body() data: UpdateUserDto
    ) {
        return this.userService.update(id, data)
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.userService.remove(id)
    }
}
