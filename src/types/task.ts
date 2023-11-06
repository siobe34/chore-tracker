import { z } from 'zod';

export const queryTaskSchema = z.object({
  id: z.number(),
  description: z.string(),
  status: z.enum(['NOTSTARTED', 'INPROGRESS', 'COMPLETE']),
  assignedTo: z.string(),
  userId: z.number(),
  completeBy: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createTaskSchema = z.object({
  description: z
    .string({
      invalid_type_error: 'The task description must be a text value.',
      required_error:
        'The task description is required to have at least 1 character.',
    })
    .min(1),
  status: z.enum(['NOTSTARTED', 'INPROGRESS', 'COMPLETE'], {
    invalid_type_error:
      'The status must be set to "Not Started", "In Progress", or "Complete".',
    required_error: 'An initial status for the task is required.',
  }),
  userId: z.number({
    invalid_type_error: 'Invalid user type error.',
    required_error: 'A user to assign the task to is required.',
  }),
  completeBy: z.date({
    invalid_type_error:
      'A valid date must be provided for the "Complete By" field.',
    required_error: 'A "Complete By" field is required.',
  }),
});

export const updateTaskSchema = createTaskSchema.extend({
  id: z.number({
    invalid_type_error: 'Task could not be identified.',
    required_error:
      'No identifier provided for the Task. Unexpected error occurred. Please try again.',
  }),
});

export type TQueryTask = z.infer<typeof queryTaskSchema>;
export type TCreateUpdateTask = z.infer<typeof createTaskSchema>;
