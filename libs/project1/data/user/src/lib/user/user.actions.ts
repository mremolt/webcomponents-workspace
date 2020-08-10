import { createAction } from '@reduxjs/toolkit';

import { UserDto } from './user.dto';

export const fetchUsers = createAction('[Users] Fetch Users');
export const fetchUsersSuccess = createAction(
  '[Users] Fetch Users Success',
  (payload: Array<UserDto>) => ({ payload })
);
export const fetchUsersFailure = createAction(
  '[Users] Fetch Users Failure',
  (payload: any) => ({ payload })
);
