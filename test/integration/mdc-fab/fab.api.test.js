import {assert} from 'chai';
import * as mdc from 'material-components-web';

suite('fab api');

test('MDCFab is not available', () => {
  assert.notProperty(mdc, 'fab');
});
