import Route from '@ember/routing/route';
import { later, cancel } from '@ember/runloop';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class ThirteenPt4Route extends Route {
  @service router;
  contTimeout;

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

  @action
  displayCont() {
    this.contTimeout = setTimeout(function() {
      document.getElementById('cont').style.display = 'initial';
    }, 4000);
  }

  afterModel() {
    this.displayCont();

    let delay = setTimeout(() => {
      this.router.transitionTo('thirteen.pt3');
    }, 5500);
    this.router.on('routeWillChange', (transition) => {
      clearTimeout(delay);
      clearTimeout(this.contTimeout);
    });
  }
}
