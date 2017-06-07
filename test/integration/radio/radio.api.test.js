import {assert} from 'chai';
import {MDCRadio} from '@material/radio';
import {excludeExpectedProperties} from './helpers/api.js';

const expected = ['checked', 'disabled', 'value', 'ripple'];

suite('radio api');

test('contains only expected properties', () => {
  const properties = Object.getOwnPropertyDescriptors(MDCRadio.prototype);
  excludeExpectedProperties(properties, expected);

  assert.deepEqual(properties, {});
});
