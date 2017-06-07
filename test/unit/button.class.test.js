import {assert} from 'chai';
import {ButtonViewModel} from '../../src/mdc-knockout-button';

function setupTestVM (params = {}, attrs = {}) {
  const vm = new ButtonViewModel(null, params, attrs);
  return vm;
}

const vm = setupTestVM();

suite('button class');

test('"href" property exists', () => {
  assert.property(vm, 'href');
});

test('"href" has a default value of ""', () => {
  assert.equal(vm.href, "");
});

test('"href" property overwrites attrs.href value', () => {
  const vm = setupTestVM({href: 'value1'}, {attrs: 'value2'});
  assert.equal(vm.attrs.href, 'value1');
});

test('"dense" property exists', () => {
  assert.property(vm, 'dense');
});

test('"dense" has a default value of false', () => {
  assert.equal(vm.dense, false);
});

test('"raised" property exists', () => {
  assert.property(vm, 'raised');
});

test('"raised" has a default value of false', () => {
  assert.equal(vm.raised, false);
});

test('"compact" property exists', () => {
  assert.property(vm, 'compact');
});

test('"compact" has a default value of false', () => {
  assert.equal(vm.compact, false);
});

test('"primary" property exists', () => {
  assert.property(vm, 'primary');
});

test('"primary" has a default value of false', () => {
  assert.equal(vm.primary, false);
});

test('"accent" property exists', () => {
  assert.property(vm, 'accent');
});

test('"accent" has a default value of false', () => {
  assert.equal(vm.accent, false);
});
