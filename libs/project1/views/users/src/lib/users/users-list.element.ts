import { customElement, resolveObservable, WithSubscriptions } from '@mr/core';
import { UserDto, UserFacade } from '@mr/project1/data/user';
import {
  html,
  LitElement,
  PropertyDeclarations,
  TemplateResult,
} from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { Observable } from 'rxjs';

@customElement('mr-users-list')
export class UsersElement extends WithSubscriptions(LitElement) {
  static get properties(): PropertyDeclarations {
    return {
      users: { type: Array, attribute: false },
    };
  }

  private users: ReadonlyArray<UserDto> = [];
  private users$: Observable<ReadonlyArray<UserDto>>;

  constructor(private readonly userFacade: UserFacade) {
    super();

    this.users$ = this.streamUntilDisconnect(this.userFacade.collection$);
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.subscribeTo(this.userFacade.collection$, (users) => {
      this.users = users;
    });

    this.userFacade.fetch();
  }

  public render(): TemplateResult {
    return html`
      <h2>Users</h2>
      <ul>
        ${repeat(
          this.users,
          (user) => html`<li>${user.firstName} ${user.lastName}</li>`
        )}
      </ul>

      <h2>With resolveObservable and repeat</h2>
      <ul>
        ${resolveObservable(this.users$, (users) =>
          repeat(
            users,
            (user) => html`<li>${user.firstName} ${user.lastName}</li>`
          )
        )}
      </ul>

      <h2>With resolveObservable</h2>
      ${resolveObservable(
        this.users$,
        (users) => html`<div>${users[0].firstName} ${users[0].lastName}</div>`
      )}
    `;
  }
}
