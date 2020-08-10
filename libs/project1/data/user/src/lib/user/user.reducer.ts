import { createReducer } from '@reduxjs/toolkit';

import {
  fetchUsers,
  fetchUsersFailure,
  fetchUsersSuccess,
} from './user.actions';
import { userAdapter } from './user.adapter';

export enum RequestState {
  Initial = 'Initial',
  Pending = 'Pending',
  Successful = 'Successful',
  Failed = 'Failed',
}

const initialState = userAdapter.getInitialState({
  requestState: RequestState.Initial,
  error: null,
});

export const userReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(fetchUsers, (state) => ({
      ...state,
      requestState: RequestState.Pending,
    }))
    .addCase(fetchUsersSuccess, (state, { payload }) =>
      userAdapter.setAll(
        { ...state, requestState: RequestState.Successful },
        payload
      )
    )
    .addCase(fetchUsersFailure, (state, { payload }) => ({
      ...state,
      error: payload,
      requestState: RequestState.Failed,
    }))
);

export type UserState = ReturnType<typeof userReducer>;
