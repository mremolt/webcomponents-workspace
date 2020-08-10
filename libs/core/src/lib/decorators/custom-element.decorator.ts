import { LitElement } from 'lit-element';
import { container, InjectionToken } from 'tsyringe';

import { Constructor } from '../models/constructor.type';

export function customElement(selector: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target: Constructor<LitElement>): any => {
    const paramTypes = (Reflect.getMetadata('design:paramtypes', target) ||
      []) as Array<InjectionToken>;

    const elementProxy = new Proxy(target, {
      construct(
        targetClass: Constructor<LitElement>,
        _args: ConstructorParameters<typeof LitElement>,
        extended: Constructor<LitElement>
      ) {
        const constructorArgs = paramTypes.map((t: InjectionToken) =>
          container.resolve(t)
        );

        return Reflect.construct(targetClass, constructorArgs, extended);
      },
    });

    window.customElements.define(selector, elementProxy);

    return elementProxy;
  };
}
