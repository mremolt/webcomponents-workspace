import { Route } from '@vaadin/router';

export * from './lib/users/users-list.element';

export const routes: Array<Route> = [{ path: '/', component: 'mr-users-list' }];
