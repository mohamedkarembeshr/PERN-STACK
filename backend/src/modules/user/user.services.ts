import type UserRepository from './user.repo';
import {
  createUserSchema,
  getUserByIdSchema,
  updateUserSchema,
  deleteUserSchema,
} from './user.validations';
import ErrorHandling from '../../helpers/error-handling';

export default class UserService {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Get all users
   */
  public async getAllUsers(isAdmin?: number): Promise<IDataResponse<IUser[]>> {
    // validate status if provided with zod
    if (isAdmin) {
      const validation = createUserSchema.shape.is_admin.safeParse(isAdmin);
      if (!validation.success) {
        return {
          success: false,
          message: ErrorHandling.getErrorMessage(validation.error),
        };
      }
    }
    return this.userRepository.getAllUsersRepo(isAdmin);
  }

  /**
   * Get user by ID
   */
  public async getUserById(userId: number): Promise<IDataResponse<IUser>> {
    const validation = getUserByIdSchema.safeParse({ user_id: userId });
    if (!validation.success) {
      return {
        success: false,
        message: ErrorHandling.getErrorMessage(validation.error),
      };
    }

    return this.userRepository.getUserByIdRepo(userId);
  }

  /**
   * Create a new user
   */
  public async createUser(
    userData: IUserInsertDTO,
  ): Promise<IDataResponse<IUser>> {
    const validation = createUserSchema.safeParse(userData);
    if (!validation.success) {
      return {
        success: false,
        message: ErrorHandling.getErrorMessage(validation.error),
      };
    }

    const validatedData: IUserInsertDTO = {
      user_name: validation.data.user_name,
      email: validation.data.email,
      password: validation.data.password,
      is_admin: validation.data.is_admin,
    };

    return this.userRepository.createUserRepo(validatedData);
  }

  /**
   * Update a user by ID
   */
  public async updateUserById(
    userId: number,
    updateData: IUserUpdateDTO,
  ): Promise<IDataResponse<IUser>> {
    const idValidation = getUserByIdSchema.safeParse({ user_id: userId });
    if (!idValidation.success) {
      return {
        success: false,
        message: ErrorHandling.getErrorMessage(idValidation.error),
      };
    }

    const validation = updateUserSchema.safeParse(updateData);
    if (!validation.success) {
      return {
        success: false,
        message: ErrorHandling.getErrorMessage(validation.error),
      };
    }

    const validatedData: IUserUpdateDTO = {
      user_name: validation.data.user_name,
      email: validation.data.email ?? undefined,
      password: validation.data.password ?? undefined,
      is_admin: validation.data.is_admin ?? undefined,
    };

    return this.userRepository.updateUserByIdRepo(userId, validatedData);
  }

  /**
   * Delete a user by ID
   */
  public async deleteUserById(userId: number): Promise<IBasicResponse> {
    const validation = deleteUserSchema.safeParse({ user_id: userId });
    if (!validation.success) {
      return {
        success: false,
        message: ErrorHandling.getErrorMessage(validation.error),
      };
    }

    return this.userRepository.deleteUserByIdRepo(userId);
  }
}
