import { customElement } from '@mr/core';
import { UserDto } from '@mr/project1/data/user';
import {
  html,
  LitElement,
  PropertyDeclarations,
  TemplateResult,
} from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';

@customElement('mr-users')
export class UsersElement extends LitElement {
  static get properties(): PropertyDeclarations {
    return {
      users: { type: Array },
    };
  }
  public users: ReadonlyArray<UserDto> = [];

  public render(): TemplateResult {
    return html`
      <h2>Users</h2>
      <ul>
        ${repeat(
          this.users,
          (user) => html` <li>${user.firstName} ${user.lastName}</li> `
        )}
      </ul>
    `;
  }
}
