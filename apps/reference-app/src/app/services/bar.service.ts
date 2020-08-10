import { Actions, addEffect } from '@mr/core';
import { AnyAction } from '@reduxjs/toolkit';
import { Observable } from 'rxjs';
import { delay, filter, mapTo, tap } from 'rxjs/operators';
import { singleton } from 'tsyringe';

@singleton()
export class Bar {
  public readonly bar$: Observable<AnyAction> = addEffect(() =>
    this.actions$.pipe(
      filter((action) => action.type === 'INCREMENT'),
      mapTo({ type: 'BAR' })
    )
  );

  public readonly delayedBar$: Observable<AnyAction> = addEffect(() =>
    this.actions$.pipe(
      filter((action) => action.type === 'INCREMENT'),
      delay(2000),
      mapTo({ type: 'LATER_BAR' })
    )
  );

  public readonly sideEffect$: Observable<AnyAction | void> = addEffect(
    () =>
      this.actions$.pipe(
        filter((action) => action.type === 'INCREMENT'),
        tap(() => {
          console.log('SIDE EFFECT!!!!');
        })
      ),
    { dispatch: false }
  );

  private counter = 0;

  constructor(private readonly actions$: Actions) {
    console.log('Bar');
  }

  public doSomething(): void {
    this.counter++;
    console.log('doing something in Bar', this.counter);
  }
}
