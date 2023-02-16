import * as redis from 'redis';
import { Users } from '../user.entity';

export class RedisService {
    redisClient: any;
    constructor() {
        this.redisClient =  redis.createClient({
            url: 'redis://redis:6379'
        });
        //this.redisClient =  redis.createClient();
        
        this.redisClient.connect();
    }
    setUser(user: Users): void {
        this.redisClient.set(user.username, JSON.stringify(user));
    }
    
    async getUser(userName: string): Promise<Users> {
        const usr = await this.redisClient.get(userName);
        return JSON.parse(usr);
    }
}