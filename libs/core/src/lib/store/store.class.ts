import {
  AnyAction,
  combineReducers,
  configureStore,
  EnhancedStore,
  Reducer,
  Selector,
} from '@reduxjs/toolkit';
import { merge, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { injectAll, singleton } from 'tsyringe';

import { Actions } from './actions.class';
import { ReducerConfiguration } from './models/reducer-configuration.interface';
import { FEATURE_EFFECTS, FEATURE_REDUCER } from './tokens';

@singleton()
export class Store<T extends Record<string, any>> {
  public readonly state$: Observable<T>;
  public readonly actions$: Observable<AnyAction>;

  private store!: EnhancedStore;
  private readonly _state$: ReplaySubject<T> = new ReplaySubject(1);

  constructor(
    @injectAll(FEATURE_REDUCER) reducers: Array<ReducerConfiguration>,
    @injectAll(FEATURE_EFFECTS) effects: Array<Observable<AnyAction>>,
    private readonly _actions$: Actions
  ) {
    this.state$ = this._state$.asObservable();
    this.actions$ = this._actions$.pipe(distinctUntilChanged());

    this.setupStore(reducers);
    this.setupEffects(effects);
  }

  public dispatch(action: AnyAction): AnyAction {
    this.store.dispatch(action);
    this._actions$.next(action);

    return action;
  }

  public select<T>(selector: Selector<any, T>): Observable<T> {
    return this.state$.pipe(
      map((state) => selector(state)),
      distinctUntilChanged(),
      shareReplay(1)
    );
  }

  private setupStore(reducerConfigs: Array<ReducerConfiguration>): void {
    const reducerMap = reducerConfigs.reduce((result, config) => {
      result[config.key] = config.reducer;

      return result;
    }, {} as Record<string, Reducer>);

    const rootReducer = combineReducers(reducerMap);
    const store = configureStore({ reducer: rootReducer });

    this.store = store;

    this._state$.next(this.store.getState());
    this.store.subscribe(() => {
      this._state$.next(this.store.getState());
    });
  }

  private setupEffects(effects: Array<Observable<AnyAction>>): void {
    const mergedEffects$ = merge(...effects);

    mergedEffects$.subscribe((action) => {
      this.store.dispatch(action);
    });
  }
}
