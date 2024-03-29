import * as z from 'zod';

export const createUserSchema = z.object({
  username: z.string(),
});
export type CreateUserDto = z.infer<typeof createUserSchema>;
