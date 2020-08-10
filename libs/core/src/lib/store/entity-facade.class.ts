import {
  Dictionary,
  EntityAdapter,
  EntityId,
  EntitySelectors,
  EntityState,
  Selector,
} from '@reduxjs/toolkit';
import { Observable } from 'rxjs';

import { Store } from './store.class';

export class EntityFacade<T extends any> {
  private readonly selectors: EntitySelectors<T, any>;

  public readonly collection$: Observable<ReadonlyArray<T>>;

  public readonly entities$: Observable<Dictionary<T>>;

  public readonly ids$: Observable<ReadonlyArray<EntityId>>;

  constructor(
    protected readonly store: Store<any>,
    protected readonly adapter: EntityAdapter<T>,
    featureSelector: Selector<any, EntityState<T>>
  ) {
    this.selectors = this.adapter.getSelectors(featureSelector);

    this.collection$ = this.store.select(this.selectors.selectAll);
    this.entities$ = this.store.select(this.selectors.selectEntities);
    this.ids$ = this.store.select(this.selectors.selectIds);
  }
}
