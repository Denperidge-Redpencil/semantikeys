import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { action } from '@ember/object';

// Sometimes the target is svg or even a path within, so this function gets the div
function getLock(element) {
  if (element.tagName.toLowerCase() != 'div') {
    return getLock(element.parentElement);
  }
  return element;
}

export default class LocksIndexRoute extends Route {
  @service router;
  @service menuService;

  model() {
    /*
    this.menuService.getKey('frostbite');
    this.menuService.getKey('smoky');
    this.menuService.getKey('maxi');
    this.menuService.getKey('acid');
    */
    return {
      keys: this.menuService.keys,
      keyDragover: this.keyDragover,
      keyDrop: this.keyDrop,
    };
  }

  keyDragover(event) {
    event.preventDefault();
  }

  @action
  keyDrop(event) {
    console.log(event);
    let lock = getLock(event.target);

    console.log(lock.id);
    console.log(this.menuService.key);

    if (lock.id == 'l-' + this.menuService.key) {
      lock.className += ' unlock';

      let lockAmount = document.querySelectorAll('.lock').length;
      let unlockedAmount = document.querySelectorAll('.lock.unlock').length;

      if (unlockedAmount >= lockAmount) {
        this.router.transitionTo('locks.credits');
      }
    }
  }
}
