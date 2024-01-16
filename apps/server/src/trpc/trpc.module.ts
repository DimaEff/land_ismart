import { Module } from '@nestjs/common';
import { TrpcRouter } from '@server/trpc/trpc.router';
import { TrpcService } from '@server/trpc/trpc.service';
import { UsersModule } from '@server/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [TrpcService, TrpcRouter],
})
export class TrpcModule {}
