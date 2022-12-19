import EmberRouter from '@ember/routing/router';
import config from 'frontend/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('start', { path: '/' });
  this.route('thirteen', { path: '/13' }, function () {
    this.route('pt1', {path: '1'});
  });
});
