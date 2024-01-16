import { Module } from '@nestjs/common';
import { UsersRepository } from '@server/users/users.repository';
import { PrismaModule } from '@server/database/prisma.module';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule],
  providers: [UsersRepository, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
