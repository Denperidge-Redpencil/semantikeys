import Route from '@ember/routing/route';

export default class ThirteenPt2Route extends Route {
  model() {
    return [
      {
        title: 'The left choice',
        link: 'thirteen.pt1',
      },
      {
        title: 'The middle choice',
        link: 'thirteen.pt2',
      },
      {
        title: 'The right choice',
        link: 'thirteen.pt3',
      },
    ];
  }
}
