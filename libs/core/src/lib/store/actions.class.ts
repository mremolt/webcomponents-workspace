import { AnyAction } from '@reduxjs/toolkit';
import { Observable, Subject } from 'rxjs';
import { container, singleton } from 'tsyringe';

import { ACTIONS_OBSERVABLE } from './tokens';

export const ACTIONS$: Subject<AnyAction> = new Subject();

container.register(ACTIONS_OBSERVABLE, {
  useValue: ACTIONS$,
});

@singleton()
export class Actions extends Observable<AnyAction> {
  constructor() {
    super();

    this.source = ACTIONS$;
  }

  public next(action: AnyAction): void {
    ACTIONS$.next(action);
  }
}
