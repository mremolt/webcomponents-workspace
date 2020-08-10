import { createSelector } from '@reduxjs/toolkit';

import { userAdapter } from './user.adapter';
import { UserState } from './user.reducer';

export interface UserFeatureState {
  users: UserState;
}

export const selectUserState = (state: UserFeatureState): UserState =>
  state.users;

export const {
  selectAll,
  selectById,
  selectEntities,
  selectIds,
  selectTotal,
} = userAdapter.getSelectors<UserFeatureState>(selectUserState);

export const selectRequestState = createSelector(
  selectUserState,
  (state) => state.requestState
);
