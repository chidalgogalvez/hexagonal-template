import { IUser } from '../../domain/user.interface';

export interface UserRepositoryPort {
  findById(id: string): Promise<IUser | undefined>;
  create(user: any): Promise<IUser>;
}
