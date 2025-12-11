/**
 * User Module Type Definitions
 *
 * Note: TUserStatus is also exported from todo.const.ts for runtime use with TODO_STATUS array
 */

type TUserStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';

interface IUser extends IBase {
  user_id: number;
  user_name: string;
  email: string;
  is_admin?: number;
  password?: string;
}

interface IUserInsertDTO extends Omit<IUser, 'user_id'> {
  user_id?: number;
}

