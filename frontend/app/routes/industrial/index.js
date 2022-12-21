import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class IndustrialIndexRoute extends Route {
  @service menuService;

  model() {
    this.menuService.getKey('acid');
  }
}
