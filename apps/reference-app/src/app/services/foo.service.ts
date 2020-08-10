import { singleton } from 'tsyringe';

import { Bar } from './bar.service';

@singleton()
export class Foo {
  private counter = 0;

  constructor(private readonly bar: Bar) {
    console.log('FOO', this.bar);
  }

  public doSomething(): void {
    this.counter++;
    console.log('doing something', this.counter);
    this.bar.doSomething();
  }
}
