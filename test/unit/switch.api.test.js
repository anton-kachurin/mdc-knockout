import {assert} from 'chai';
suite('switch api');

test('MDCSwitch is not available', () => {
  var componentError = false;
  try {
    require('@material/switch');
  }
  catch (e) {
    componentError = true;
  }

  assert.isOk(componentError);
});
