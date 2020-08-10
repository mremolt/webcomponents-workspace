// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T = any> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
};
