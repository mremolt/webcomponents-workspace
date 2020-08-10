import { instance, mock, resetCalls, verify } from 'ts-mockito';
import { container } from 'tsyringe';

import { AppElement } from './app.element';
import { Foo } from './services/foo.service';

describe('AppElement', () => {
  const FooMock = mock(Foo);
  let app: AppElement;

  beforeAll(async () => {
    container.register<Foo>(Foo, { useFactory: () => instance(FooMock) });
  });

  beforeEach(() => {
    container.clearInstances();
    resetCalls(FooMock);

    app = new AppElement(instance(FooMock));
  });

  it('should create successfully', () => {
    expect(app).toBeTruthy();
  });

  it('should call Foo#doSomething', () => {
    verify(FooMock.doSomething()).once();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      app.connectedCallback();
      await app.requestUpdate();
    });

    it('should have a greeting', () => {
      expect(app.shadowRoot.querySelector('h1').innerHTML).toEqual(
        'Welcome to the-reference-app!'
      );
    });
  });
});
