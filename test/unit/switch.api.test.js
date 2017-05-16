import {assert} from 'chai';
import * as mdc from 'material-components-web';

suite('switch api');

test('MDCSwitch is not available', () => {
  assert.notProperty(mdc, 'switch');
});
