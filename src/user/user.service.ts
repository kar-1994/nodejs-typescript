import { Injectable } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm';
import * as redis from 'redis';
import { Repository } from 'typeorm';
import { UserDTO } from './user-dto';
import { Users } from './user.entity';
import { Md5 } from 'ts-md5';
import { NotFoundException } from '@nestjs/common/exceptions';
import { RedisService } from './redis/redis-service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private redisService: RedisService
    ) {}

    getUserDetails(): Promise<Users[]>{
       return this.usersRepository.find();
    }

    async createUser(user:UserDTO): Promise<string> {
        let users= new Users();
        users.username=user.username;
        users.email=user.email;
        users.password = Md5.hashStr(user.password);
        this.usersRepository.save(users)
        return "User created successfully.";
    }

    async findUserByUserName(userName:string):Promise<Users>{
        
    return this.usersRepository.findOneBy({username:userName})
    }

    async updateUser(dto: UserDTO): Promise<string> {
        const user = await this.usersRepository.findOneBy({username:dto.username});
        if(user == null) {
            throw new NotFoundException();
        }
        user.username = dto.username;
        user.password = dto.password;
        user.email = dto.email;
        await this.usersRepository.update(user.user_id, user);
        this.redisService.setUser(user);
        return "User Updated Successfully";

    }

}