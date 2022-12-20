import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { service } from '@ember/service';

let key = false;
export default class ThirteenPt5Route extends Route {
  @service router;

  keyDrag(event) {
    key = true;
  }

  keyDrop(event) {
    key = false;
  }

  keyholeDragover(event) {
    event.preventDefault();
  }

  @action
  keyholeDrop(event) {
    if (key) {
      this.router.transitionTo('thirteen.pt6');
    }
  }

  model() {
    return {
      keyDrag: this.keyDrag,
      keyDrop: this.keyDrop,
      keyholeDragover: this.keyholeDragover,
      keyholeDrop: this.keyholeDrop,
    };
  }
}
