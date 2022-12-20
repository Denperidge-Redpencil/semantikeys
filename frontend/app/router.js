import EmberRouter from '@ember/routing/router';
import config from 'frontend/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('start', { path: '/' });
  this.route('thirteen', { path: '/13' }, function () {
    this.route('pt1', { path: '' });
    this.route('pt2', { path: '2' });
    this.route('pt3', { path: 'there' });
    this.route('pt4', { path: 'for' });
    this.route('pt5', { path: '5' });
    this.route('pt6', { path: 'key' });
  });
  this.route('navigation');
  this.route('cbrpnk', function () {
    this.route('pc');
    this.route('f12-console');
  });
});
