import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // TEST ONLY
  @Get('publish') pub() {
    this.usersService.publishTest();
    return 'Message published';
  }
}
