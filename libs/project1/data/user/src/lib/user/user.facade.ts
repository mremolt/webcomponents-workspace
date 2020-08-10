import { EntityFacade, Store } from '@mr/core';
import { singleton } from 'tsyringe';

import { fetchUsers } from './user.actions';
import { userAdapter } from './user.adapter';
import { UserDto } from './user.dto';
import { selectUserState } from './user.selectors';

@singleton()
export class UserFacade extends EntityFacade<UserDto> {
  constructor(store: Store<any>) {
    super(store, userAdapter, selectUserState);
  }

  public fetch(): void {
    this.store.dispatch(fetchUsers());
  }
}
