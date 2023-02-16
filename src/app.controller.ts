import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { SampleDTO } from './sample-dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/createUser")
  getnewUser(@Body() user: SampleDTO): string {
    return this.appService.getnewUser(user.name, user.email, user.id);
  }
}

