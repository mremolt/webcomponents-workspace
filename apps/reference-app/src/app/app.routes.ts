import { Router } from '@vaadin/router';
import { container } from 'tsyringe';

export function setupRoutes(outlet: HTMLElement): Router {
  const router = new Router(outlet);
  router.setRoutes([
    { path: '/', redirect: '/users' },
    {
      path: '/users',
      children: () =>
        import('@mr/project1/views/users').then((module) => module.routes),
    },
  ]);

  container.register(Router, { useValue: router });

  return router;
}
