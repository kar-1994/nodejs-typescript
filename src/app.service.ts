import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getnewUser(name:string,email:string,id:number):string{
    return `New user created ${name}`
  }
  getHello(): string {
    return 'Hello World!';
  }
}


