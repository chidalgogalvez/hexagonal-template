import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from '../application/user.use-case';
import { MongooseUserRepository } from './persistence/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './persistence/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserRepositoryPort',
      useClass: MongooseUserRepository,
    },
  ],
})
export class UserInfrastructureModule { }
