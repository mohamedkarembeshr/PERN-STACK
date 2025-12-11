/**
 * Todo Module Constants
 */

// eslint-disable-next-line @typescript-eslint/naming-convention
export const USER_TYPE = ['admin', 'user'] as const;

export type TUserType = (typeof USER_TYPE)[number];
