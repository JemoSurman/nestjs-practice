import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto'; 
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common'; 

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "გიორგი ბერიძე",
            "email": "giorgi.beridze@example.com",
            "role": "ADMIN"
        },
        {
            "id": 2,
            "name": "ნინო ტაბატაძე",
            "email": "nino.tabatadze@example.com",
            "role": "user"
        },
        {
            "id": 3,
            "name": "ლუკა კაპანაძე",
            "email": "luka.kapanadze@example.com",
            "role": "ENGINEER"
        },
        {
            "id": 4,
            "name": "მარიამ მახარაძე",
            "email": "mariam.makharadze@example.com",
            "role": "user"
        },
        {
            "id": 5,
            "name": "დავით გელაშვილი",
            "email": "davit.gelashvili@example.com",
            "role": "INTERN"
        }
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
        if(role) {
            const rolesArray = this.users.filter(user => user.role === role);

            if(rolesArray.length === 0){
                throw new NotFoundException('User Role Not Found');
            }
            return rolesArray;
        }
        
    }

    findOne(id: number){
        const user = this.users.find(user => user.id === id);

        if(!user) throw new NotFoundException('User Not Found');

        return user; 
    }

    create(createUserDto: CreateUserDto){
        const userByHighestId = [...this.users].sort((a,b) => b.id - a.id);
        const newUser = {
            id: userByHighestId[0].id + 1,
            ...createUserDto
        }

        this.users.push(newUser);
        return newUser; 
    }

    update(id: number, updatedUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updatedUserDto };
            }
            return user;
        });

        return this.findOne(id);
    } 

    delete(id: number){
        const removedUser = this.findOne(id);

        this.users = this.users.filter(user => user.id !== id);

        return removedUser;
    }

}
