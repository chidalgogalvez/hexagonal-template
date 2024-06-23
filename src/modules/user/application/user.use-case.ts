import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../infraestructure/persistence/user.port';
import { IUser } from '../domain/user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepositoryPort') private userRepository: UserRepositoryPort,
  ) { }

  async findById(id: string): Promise<IUser | string> {
    return this.userRepository.findById(id);
  }
}
