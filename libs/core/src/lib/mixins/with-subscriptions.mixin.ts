import { LitElement } from 'lit-element';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, take, takeUntil } from 'rxjs/operators';

import { Constructor } from '../models/constructor.type';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function WithSubscriptions<B extends Constructor<LitElement>>(
  baseClass: B
) {
  return class extends baseClass {
    protected onDisconnect$: Subject<void> = new Subject();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: Array<any>) {
      super(...args);
    }

    public disconnectedCallback() {
      super.disconnectedCallback();

      this.onDisconnect$.next();
    }

    public subscribeTo<T>(
      obs: Observable<T>,
      callback: (value: T) => void
    ): void {
      obs
        .pipe(takeUntil(this.onDisconnect$), distinctUntilChanged())
        .subscribe((value: T) => {
          callback.call(this, value);
        });
    }

    public streamUntilDisconnect<T>(obs: Observable<T>): Observable<T> {
      return obs.pipe(takeUntil(this.onDisconnect$), distinctUntilChanged());
    }

    public async getLatest<T>(obs: Observable<T>): Promise<T> {
      return obs
        .pipe(
          filter((value) => !!value),
          take(1)
        )
        .toPromise();
    }
  };
}
