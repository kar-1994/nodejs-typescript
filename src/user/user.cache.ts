import { NestMiddleware } from "@nestjs/common";
import * as redis from 'redis';


export class UserCacheService implements NestMiddleware {
    
    async use(req: any, res: any, next:  (error?: any) => void) {
        console.log("MWWWWWWWWWWWWWWWWWWWWWW");
        
        
        let userName = req.params.username;

        const portRedis = process.env.PORT_REDIS || '6379';

        const redisClient =  redis.createClient();
        await redisClient.connect();

        const user = await redisClient.get(userName);

        console.log(user);

        next();
        



    }
    
}