import { createEntityAdapter } from '@reduxjs/toolkit';

import { UserDto } from './user.dto';

export const userAdapter = createEntityAdapter<UserDto>();
