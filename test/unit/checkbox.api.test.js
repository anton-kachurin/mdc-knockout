import {assert} from 'chai';
import {MDCCheckbox} from '@material/checkbox';
import {excludeExpectedProperties} from './helpers/api.js';

const expected = ['checked', 'disabled', 'indeterminate', 'value', 'ripple'];

suite('checkbox api');

test('contains only expected properties', () => {
  const properties = Object.getOwnPropertyDescriptors(MDCCheckbox.prototype);
  excludeExpectedProperties(properties, expected);

  assert.deepEqual(properties, {});
});
