import { ActionCreatorWithOptionalPayload, AnyAction } from '@reduxjs/toolkit';
import { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

export function ofType<T extends AnyAction>(
  ...actions: Array<ActionCreatorWithOptionalPayload<any>>
): OperatorFunction<T, any> {
  return (input$: Observable<T>) =>
    input$.pipe(
      filter((action: AnyAction) => {
        return actions.some((act) => act.match(action));
      })
    );
}
