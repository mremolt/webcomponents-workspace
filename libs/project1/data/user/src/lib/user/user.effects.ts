import { Actions, addEffect, ofType } from '@mr/core';
import { AnyAction } from '@reduxjs/toolkit';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { singleton } from 'tsyringe';

import { fetchUsers, fetchUsersSuccess } from './user.actions';

@singleton()
export class UserEffects {
  public readonly fetchUsers$: Observable<AnyAction> = addEffect(() =>
    this.actions$.pipe(
      ofType(fetchUsers),
      delay(1000),
      map((action: ReturnType<typeof fetchUsers>) => {
        console.log(action);
        return fetchUsersSuccess([
          { id: '42', firstName: 'Arthur', lastName: 'Dent' },
        ]);
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
