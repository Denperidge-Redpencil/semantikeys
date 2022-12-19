import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service router;
  @service menuService;

  model() {
    this.router.on('routeDidChange', (transition) => {
        console.log(transition.to.name)
        this.menuService.music = transition.to.name;

    });
  }
}
