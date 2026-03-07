import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
    /*
    POST /users
    PATCH /users
    DELETE /users/:id
    */
    
    @Get() // GET /users
    findAll(){
        return []
    }

    @Get(':id') // GET /users/:id
    findOne(@Param('id') id: string){
        return { id }
    }

    @Get('interns') // GET /users/interns
    findAllInterns(){
        return []
    }


}
