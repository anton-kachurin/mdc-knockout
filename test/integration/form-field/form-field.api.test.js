import {assert} from 'chai';
import {MDCFormField} from '@material/form-field';
import {excludeExpectedProperties} from './helpers/api.js';

const expected = ['input'];

suite('form-field api');

test('contains only expected properties', () => {
  const properties = Object.getOwnPropertyDescriptors(MDCFormField.prototype);
  excludeExpectedProperties(properties, expected);

  assert.deepEqual(properties, {});
});
