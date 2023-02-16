import { Controller, Get, Post, Body, UseGuards, Param, Request } from "@nestjs/common";
import { UserDTO } from "./user-dto";
import { Users } from "./user.entity";
import { UserService } from "./user.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import * as redis from 'redis';
import { ForbiddenException } from "@nestjs/common/exceptions";
import { Put } from "@nestjs/common/decorators";
import { RedisService } from "./redis/redis-service";

@Controller("/user")
export class UserController {

    constructor(private userService: UserService,
        private AuthService: AuthService, 
        private redisService: RedisService) { }

    @Get("/all")
    userDetails(): Promise<Users[]> {
        return this.userService.getUserDetails();
    }

    @Post("/registration")
    insertUserDetails(@Body() user: UserDTO): Promise<string> {
        return this.userService.createUser(user);
    }

    @Post("/login")
    login(@Body() user: UserDTO): Promise<string> {
        return this.AuthService.validateUser(user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get("/by/username/:username")
    async findByUserName(@Param('username') username: string) {

        const u = this.redisService.getUser(username);

        if( u == null ) {
            const user = await this.userService.findUserByUserName(username);
            this.redisService.setUser(user);
            return user;
        } 
        return u;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put("/update")
    async updateUser(@Body() user: UserDTO, @Request() req): Promise<string> {
        if(req.user.username != user.username) {
            throw new ForbiddenException();
        }
        return await this.userService.updateUser(user);
        
    }
}