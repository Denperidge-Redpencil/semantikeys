import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { set } from '@ember/object';
import { action } from '@ember/object';

function checkNav(currentRouteName) {
  let renderNav;
  if (
    currentRouteName.startsWith('thirteen') ||
    currentRouteName.startsWith('start') ||
    currentRouteName.startsWith('navigation')
  ) {
    renderNav = false;
  }
  else {
    renderNav = [];
    let routes = currentRouteName.split('.');
    for (let i = 0; i < routes.length; i++) {
      let routecomponents = routes.slice(0, i+1);
      renderNav.push( { 
        route: routecomponents.join('.'),
        text: routes[i]
      });
    }

  }

  return renderNav;
}

export default class ApplicationRoute extends Route {
  @service router;
  @service menuService;
  @tracked opts;

  model(params, transition) {
    this.opts = {
      nav: checkNav(transition.to.name),
    };

    this.router.on('routeDidChange', (transition) => {
      this.opts.nav = checkNav(transition.to.name);

      //this.menuService.music = transition.to.name;
      set(this.menuService, 'music', transition.to.name);
      //document.querySelector('#music-component audio').src = `/audio/music/${transition.to.name}.mp3`;
    });
    return this.opts;
  }
}
