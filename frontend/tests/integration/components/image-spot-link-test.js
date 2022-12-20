import { module, test } from 'qunit';
import { setupRenderingTest } from 'frontend/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | image-spot-link', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<ImageSpotLink />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <ImageSpotLink>
        template block text
      </ImageSpotLink>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
