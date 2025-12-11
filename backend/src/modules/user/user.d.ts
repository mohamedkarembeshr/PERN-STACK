/**
 * User Module Type Definitions
 *
 * Note: TUserStatus is also exported from User.const.ts for runtime use with User_STATUS array
 */

type TUserStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';

interface IUser extends IBase {
  user_id: number;
  user_name: string;
  email: string;
  is_admin: int;
  password: string;
}

interface IUserInsertDTO extends Omit<IUser, 'user_id'> {
  user_id?: number;
}

interface IUserUpdateDTO extends Partial<Omit<IUserInsertDTO, 'user_id'>> {}
