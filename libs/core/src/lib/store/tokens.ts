import { AnyAction } from '@reduxjs/toolkit';
import { Observable } from 'rxjs';
import { InjectionToken } from 'tsyringe';

import { ReducerConfiguration } from './models/reducer-configuration.interface';

export const FEATURE_REDUCER: InjectionToken<ReducerConfiguration> = Symbol(
  'FEATURE_REDUCER'
);

export const ACTIONS_OBSERVABLE: InjectionToken<Observable<AnyAction>> = Symbol(
  'ACTIONS_OBSERVABLE'
);

export const FEATURE_EFFECTS: InjectionToken<Observable<AnyAction>> = Symbol(
  'FEATURE_EFFECTS'
);
