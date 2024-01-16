import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';
import { UsersService } from '@server/users/users.service';
import { createUserSchema } from '@server/users/dto/CreateUser.dto';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly usersService: UsersService,
  ) {
  }

  appRouter = this.trpc.router({
    hello: this.trpc.procedure
      .input(z.object({ name: z.string().optional() }))
      .query(({ input }) => {
        return `Hello ${input.name ? input.name : `Bilbo`}`;
      }),

    createUser: this.trpc.procedure
      .input(createUserSchema)
      .mutation(async ({ input }) => {
        return this.usersService.createUser(input);
      }),

    getAllUsers: this.trpc.procedure.query(async () => {
      return this.usersService.getAllUsers();
    }),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({ router: this.appRouter }),
    );
  }
}

export type AppRouter = TrpcRouter['appRouter'];
