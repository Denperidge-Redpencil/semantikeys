import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { set } from '@ember/object';

export default class ApplicationRoute extends Route {
  @service router;
  @service menuService;

  model() {
    this.router.on('routeDidChange', (transition) => {
      console.log(transition.to.name);
      //this.menuService.music = transition.to.name;
      set(this.menuService, 'music', transition.to.name);
      //document.querySelector('#music-component audio').src = `/audio/music/${transition.to.name}.mp3`;
    });
  }
}
