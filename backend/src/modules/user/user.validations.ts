import * as z from 'zod';

// import { TODO_STATUS } from './user.const';

// Status enum for validation (derived from TODO_STATUS constant)
// const userStatusEnum = z.enum(TODO_STATUS);

// Create User validation schema
export const createUserSchema = z.object({
  user_name: z
    .string()
    .min(1, 'Name is required')
    .max(255, 'Title must be less than 255 characters'),
  email: z
    .string()
    .min(1, 'Name is required')
    .max(255, 'Title must be less than 255 characters'),
  is_admin: z.number().int().min(0).max(1).default(0),
  password: z
    .string()
    .min(1, 'Password is required')
    .max(255, 'Title must be less than 255 characters'),
});

// Update User validation schema
export const updateUserSchema = z.object({
  user_name: z.string().min(1).max(255).optional(),
  email: z.string().max(1000).optional().nullable(),
  password: z.string().max(1000).optional().nullable(),
  is_admin: z.number().int().min(0).max(1).default(0),
});

// Get User by ID validation schema
export const getUserByIdSchema = z.object({
  user_id: z.coerce
    .number()
    .int()
    .positive('User ID must be a positive integer'),
});

// Delete User validation schema
export const deleteUserSchema = z.object({
  user_id: z.coerce
    .number()
    .int()
    .positive('User ID must be a positive integer'),
});
