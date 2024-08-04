import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Get()
    findAllUser(@Query('email') email: string) {
        return this.userService.find(email)
    }

    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.userService.findOne(id)
    }

    @Post('signup')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto.email, createUserDto.password)
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
