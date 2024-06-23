import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../../application/user.use-case';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}
