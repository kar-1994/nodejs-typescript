import { Injectable } from "@nestjs/common/decorators";
import { UserDTO } from "./user-dto";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
import { Md5 } from 'ts-md5';

@Injectable()
export class AuthService {

    constructor(private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(userDTO: UserDTO) {
        const user = await this.userService.findUserByUserName(userDTO.username);
        if (user != null) {
           return user.password ? (user.password === Md5.hashStr(userDTO.password) ? await this.authJwt(user) : null) : null
        } else {
            return "user not found in database .";
        }

    }
    async authJwt(user: any): Promise<any> {
        const jwtBody = { username: user.username, sub: user.user_id };
        return {
            access_token: await this.jwtService.sign(jwtBody)
        }
    }
}