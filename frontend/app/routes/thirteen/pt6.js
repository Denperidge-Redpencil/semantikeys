import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ThirteenPt6Route extends Route {
    @service menuService;

    beforeModel() {
        console.log("meow")
        this.menuService.getKey('smoky');
    }
}
