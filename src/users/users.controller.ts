import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto'; 
import { UpdateUserDto } from './dto/update-user.dto';

export class UsersController {

    constructor(private readonly userService: UsersService){}

    @Get() // GET /users or /users?role=value
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN')
    {
        return this.userService.findAll(role);
    }

    @Get(':id') // GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number)
    {
        return this.userService.findOne(id);
    }

    @Post() // POST /users
    create(@Body() createUserDto: CreateUserDto)
    {
        return this.userService.create(createUserDto);
    }

    @Patch(':id') // PATCH /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto)
    {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id') // DELETE /users/id
    delete(@Param('id', ParseIntPipe) id: number)
    {
        return this.userService.delete(id);
    }
}
