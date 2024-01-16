import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@server/users/users.repository';
import { CreateUserDto } from '@server/users/dto/CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.usersRepository.createUser({
      data: {
        username: dto.username,
      },
    });

    return user;
  }

  async getAllUsers() {
    return this.usersRepository.getAllUsers({});
  }
}
