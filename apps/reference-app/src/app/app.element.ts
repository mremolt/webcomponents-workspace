import './user/users.element';

import { customElement, Store } from '@mr/core';
import { UserDto, UserFacade } from '@mr/project1/data/user';
import {
  CSSResult,
  html,
  LitElement,
  PropertyDeclarations,
  TemplateResult,
} from 'lit-element';

import { styles } from './app.element.css';
import { Foo } from './services/foo.service';

@customElement('mr-root')
export class AppElement extends LitElement {
  static get styles(): CSSResult {
    return styles;
  }

  static get properties(): PropertyDeclarations {
    return {
      appTitle: { type: String },
      users: { type: Array, attribute: false },
    };
  }

  public appTitle = 'the-reference-app';
  private users: ReadonlyArray<UserDto> = [];

  constructor(
    private readonly foo: Foo,
    private readonly store: Store<any>,
    private readonly userFacade: UserFacade
  ) {
    super();
    this.foo.doSomething();

    this.userFacade.collection$.subscribe((users) => {
      this.users = users;
    });

    this.store.dispatch({ type: 'INCREMENT' });
    this.store.dispatch({ type: 'DECREMENT' });
    this.userFacade.fetch();
  }

  public render(): TemplateResult {
    return html`
      <h1>Welcome to ${this.appTitle}!</h1>

      <mr-users .users="${this.users}"></mr-users>
    `;
  }
}
