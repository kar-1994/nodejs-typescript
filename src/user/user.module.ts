import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
import { JWTStrategy } from "./auth.strategy";
import { RedisService } from "./redis/redis-service";
import { UserCacheService } from "./user.cache";
import { UserController } from "./user.controller";
import { Users } from "./user.entity";
import { UserService } from "./user.service";

@Module(
    {
        imports: [TypeOrmModule.forFeature([Users]), 
    
        JwtModule.register({secret: 'DEVIARCHANAKAR2@23', signOptions: {expiresIn: '900s'}}),],
        controllers: [UserController],
        providers: [UserService,AuthService, JWTStrategy, UserCacheService, RedisService], 
    }
)
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserCacheService)
        .forRoutes('username/*')
    }

}