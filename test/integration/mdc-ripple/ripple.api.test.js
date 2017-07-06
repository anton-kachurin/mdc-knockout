import {assert} from 'chai';
import {MDCRipple} from '@material/ripple';
import {excludeExpectedProperties} from '../../helpers/api.js';

const expected = ['activate', 'deactivate', 'unbounded', 'layout'];

suite('ripple api');

test('contains only expected properties', () => {
  const properties = Object.getOwnPropertyDescriptors(MDCRipple.prototype);
  excludeExpectedProperties(properties, expected);

  assert.deepEqual(properties, {});
});
