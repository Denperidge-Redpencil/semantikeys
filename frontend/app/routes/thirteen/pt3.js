import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class ThirteenPt3Route extends Route {
  @service router;

  @action
  navigate() {
    this.router.transitionTo('thirteen.pt4');
  }
}
