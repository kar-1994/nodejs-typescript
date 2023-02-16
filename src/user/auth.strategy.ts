import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private authService: AuthService) {
        super({secretOrKey: 'DEVIARCHANAKAR2@23',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()});// Calling parent class constructor 
    }

    validate(jwtBody: any) {
        return { userId: jwtBody.sub, username: jwtBody.username };
    }

}