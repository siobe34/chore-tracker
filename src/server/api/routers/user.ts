import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { createUserSchema, updateUserSchema } from '@/types/user';
import { z } from 'zod';

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          name: input.name,
        },
      });
    }),
  update: publicProcedure
    .input(updateUserSchema)
    .mutation(async ({ ctx, input }) => {
      const updatedUser = await ctx.db.user.update({
        where: { id: input.id },
        data: {
          id: input.id,
          name: input.name,
        },
      });

      return updatedUser;
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.user.delete({ where: { id: input.id } });
        return {
          code: 200,
          success: true,
          message: 'User deleted successfully.',
        };
      } catch (e) {
        console.error(e);
        return {
          code: 500,
          success: false,
          message: 'Unexpected error occurred, could not delete User.',
        };
      }
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),
});
