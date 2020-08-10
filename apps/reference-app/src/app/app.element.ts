import { customElement } from '@mr/core';
import {
  CSSResult,
  html,
  LitElement,
  PropertyDeclarations,
  TemplateResult,
} from 'lit-element';

import { styles } from './app.element.css';
import { setupRoutes } from './app.routes';
import { Foo } from './services/foo.service';

@customElement('mr-root')
export class AppElement extends LitElement {
  static get styles(): CSSResult {
    return styles;
  }

  static get properties(): PropertyDeclarations {
    return {
      appTitle: { type: String },
    };
  }

  public appTitle = 'the-reference-app';

  constructor(private readonly foo: Foo) {
    super();
    this.foo.doSomething();
  }

  public firstUpdated(): void {
    const outlet = this.shadowRoot?.getElementById('outlet') as HTMLElement;
    this.setupRouter(outlet);
  }

  public render(): TemplateResult {
    return html`
      <h1>Welcome to ${this.appTitle}!</h1>

      <div id="outlet"></div>
    `;
  }

  private setupRouter(outlet: HTMLElement): void {
    setupRoutes(outlet);
  }
}
