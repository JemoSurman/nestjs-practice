import { Injectable } from '@nestjs/common';

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
            return this.users.filter(user => user.role === role)
        }
        return this.users;
    }

    findOne(id: number){
        const user = this.users.find(user => user.id === id);

        return user; 
    }

    create(user: { name:string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}){
        const userByHighestId = [...this.users].sort((a,b) => b.id - a.id);
        const newUser = {
            id: userByHighestId[0].id + 1,
            ...user
        }

        this.users.push(newUser);
        return newUser; 
    }

    update(id: number, updatedUser: { name: string; email: string; role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updatedUser };
            }
            return user;
        });

        return this.findOne(id);
    } 

    delete(id: number){
        const removedUser = this.findOne(id);

        this.users.filter(user => user.id !== id);

        return removedUser;
    }

}
