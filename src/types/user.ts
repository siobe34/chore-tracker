import { z } from 'zod';

export const queryUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createUserSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name of the user must be a text value.',
      required_error: 'The name of the user must have at least one character.',
    })
    .min(1),
});

export const updateUserSchema = createUserSchema.extend({
  id: z.number({
    invalid_type_error: 'User cannot be identified.',
    required_error:
      'No identifier provided for the User. Unexpected error occurred. Please try again.',
  }),
});

export type TQueryUser = z.infer<typeof queryUserSchema>;
export type TCreateUpdateUser = z.infer<typeof createUserSchema>;
