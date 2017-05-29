import {assert} from 'chai';
import * as mdc from 'material-components-web';

suite('button api');

test('MDCButton is not available', () => {
  assert.notProperty(mdc, 'button');
});
