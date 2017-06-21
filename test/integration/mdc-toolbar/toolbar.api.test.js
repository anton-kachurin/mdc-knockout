import {assert} from 'chai';
import {MDCToolbar} from '@material/toolbar';
import {excludeExpectedProperties} from '../../helpers/api.js';

const expected = ['fixedAdjustElement'];

suite('toolbar api');

test('contains only expected properties', () => {
  const properties = Object.getOwnPropertyDescriptors(MDCToolbar.prototype);
  excludeExpectedProperties(properties, expected);

  assert.deepEqual(properties, {});
});
