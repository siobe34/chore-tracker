import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { createTaskSchema, updateTaskSchema } from '@/types/task';
import { z } from 'zod';

export const taskRouter = createTRPCRouter({
  create: publicProcedure
    .input(createTaskSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.create({
        data: input,
      });
    }),
  update: publicProcedure
    .input(updateTaskSchema)
    .mutation(async ({ ctx, input }) => {
      const updatedTask = await ctx.db.task.update({
        where: { id: input.id },
        data: {
          id: input.id,
          description: input.description,
          status: input.status,
          completeBy: input.completeBy,
          userId: input.userId,
        },
        include: { assignedTo: { select: { name: true } } },
      });

      return { ...updatedTask, assignedTo: updatedTask.assignedTo.name };
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.task.delete({ where: { id: input.id } });
        return {
          code: 200,
          success: true,
          message: 'Task deleted successfully.',
        };
      } catch (e) {
        console.error(e);
        return {
          code: 500,
          success: false,
          message: 'Unexpected error occurred, could not delete Task.',
        };
      }
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    // * Query all tasks and include the name of the user related to the task
    const tasks = await ctx.db.task.findMany({
      include: { assignedTo: { select: { name: true } } },
    });

    return tasks.map((task) => ({
      ...task,
      assignedTo: task.assignedTo.name,
    }));
  }),
});
