import Route from '@ember/routing/route';
import { later, cancel } from '@ember/runloop';
import { service } from '@ember/service';

export default class ThirteenPt4Route extends Route {
  @service router;
  model() {
    return {
      array: [
        {
          title: 3,
          delay: 0,
        },
        {
          title: 2,
          delay: 1,
        },
        {
          title: 1,
          delay: 2,
        },
        {
          title: 'Click',
          delay: 4,
        },
      ],
    };
  }

  afterModel() {
    let delay = later(() => {
      this.router.transitionTo('thirteen.pt3');
    }, 5500);
    this.router.on('routeWillChange', (transition) => {
      cancel(delay);
    });
  }
}
