import { AnyAction } from '@reduxjs/toolkit';
import { NEVER, Observable } from 'rxjs';
import { container } from 'tsyringe';

import { ReducerConfiguration } from './models/reducer-configuration.interface';
import { FEATURE_EFFECTS, FEATURE_REDUCER } from './tokens';

export function addReducer(reducer: ReducerConfiguration): void {
  container.register(FEATURE_REDUCER, { useValue: reducer });
}

export function addEffect<T extends AnyAction = AnyAction>(
  effectFn: () => Observable<T>,
  config: { dispatch: boolean } = { dispatch: true }
): Observable<T> {
  const effect$ = effectFn();
  container.register(FEATURE_EFFECTS, { useValue: effect$ });

  if (config.dispatch) {
    return effect$;
  }

  return NEVER;
}
