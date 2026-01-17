import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDTO } from './dto/upsert-dto.users';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    
    @Get('')
    async findAllUsers(){
        const users = await this.usersService.getAll()
        return users
    }

    @UseGuards(JwtAuthGuard)
    @Get(':email')
    async findUser(@Param('email') email: string){
        const getUser = await this.usersService.findByEmail(email)
        return getUser
    }


    @Post('')
    async createUser(@Body() userBody: UsersDTO){
        const createUser= await this.usersService.createUser(userBody)
        return createUser
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: number){
        const deleteUser = await this.usersService.deleteUser(id)
        return deleteUser
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() userBody: UsersDTO){
        const updateUser = await this.usersService.updateUser(id, userBody)
        return updateUser
    }
    }

