import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../../application/user.use-case';
import { Logger } from '../../../../config/loggerConfig/AppLogger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Get(':id')
  findOne(@Param('id') id: string) {
    Logger.info(`UserController:findOne - id: ${id}`);
    return this.userService.findById(id);
  }
}
