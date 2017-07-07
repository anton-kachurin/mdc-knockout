import {assert} from 'chai';
import {MDCTextfield} from '@material/textfield';
import {excludeExpectedProperties} from '../../helpers/api.js';

const expected = ['disabled', 'initialize'];

suite('textfield api');

test('contains only expected properties', () => {
  const properties = Object.getOwnPropertyDescriptors(MDCTextfield.prototype);
  excludeExpectedProperties(properties, expected);

  assert.deepEqual(properties, {});
});
