import { addReducer } from '@mr/core';
import { container } from 'tsyringe';

import { UserEffects } from './user.effects';
import { userReducer } from './user.reducer';

export * from './user.actions';
export * from './user.facade';
export { UserDto } from './user.dto';

export const userEffects = container.resolve<UserEffects>(UserEffects);

addReducer({ key: 'users', reducer: userReducer });
