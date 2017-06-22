import {assert} from 'chai';
import bel from 'bel';
import td from 'testdouble';
import augment from '../../src/mdc-knockout-augment';
import ComponentViewModel from '../../src/mdc-knockout-base';

import {koMock} from '../helpers/knockout';

import ko from 'knockout';
augment.registerBindings(ko);

function expectBindings () {
  return [
    'mdc-bindings', 'mdc-attrs', 'mdc-parent-bindings', 'mdc-parent-attrs',
    'mdc-child', 'mdc-ripple', 'mdc-instance', 'mdc-children-transform',
    'mdc-children-filter'
  ];
}

function allowedVirtual (name) {
  assert.isOk(ko.virtualElements.allowedBindings[name]);
}

suite('augment bindings');

test('registerBindings sets a complete list of bindings', () => {
  const ko = koMock();
  augment.registerBindings(ko);

  const handlers = ko.bindingHandlers;
  const bindings = expectBindings();

  bindings.forEach(binding => {
    if (handlers[binding]) {
      delete handlers[binding];
    }
    else {
      handlers[binding] = 'is missing';
    }
  });
  assert.deepEqual(handlers, {});
});

test('mdc-bindings applies given bindings to the node', () => {
  const element = bel`<div data-bind="mdc-bindings: bindings"></div>`;
  assert.equal(element.textContent, '');

  const textContent = ko.observable('text content');

  ko.applyBindings({bindings: {text: textContent}}, element);
  assert.equal(element.textContent, 'text content');

  textContent('changed content');
  assert.equal(element.textContent, 'changed content');
});

test('mdc-bindings wraps non-observables as observables', () => {
  const element = bel`<div data-bind="mdc-bindings: bindings"></div>`;
  const textContent = 'text content';
  const vm = {bindings: {text: textContent}};
  ko.applyBindings(vm, element);

  assert.isOk(ko.isObservable(vm.bindings.text));
  assert.equal(vm.bindings.text(), 'text content');
});

test('mdc-bindings binding provides a default "bindings" value', () => {
  const element = bel`<div data-bind="mdc-bindings"></div>`;
  assert.equal(element.textContent, '');

  const textContent = ko.observable('text content');

  ko.applyBindings({bindings: {text: textContent}}, element);
  assert.equal(element.textContent, 'text content');
});

test('mdc-parent-bindings applies given bindings to the parent of the node', () => {
  const element = bel`<div data-bind="mdc-parent-bindings: bindings"></div>`;
  const parentElement = bel`<span class="class1">${element}</span>`;
  assert.equal(parentElement.className, 'class1');

  const className = ko.observable('class2');

  ko.applyBindings({bindings: {css: className}}, element);
  assert.equal(parentElement.className, 'class1 class2');

  className('class3');
  assert.equal(parentElement.className, 'class1 class3');
});

test('mdc-parent-bindings binding provides a default "bindings" value', () => {
  const element = bel`<div data-bind="mdc-parent-bindings"></div>`;
  const parentElement = bel`<span class="class1">${element}</span>`;
  assert.equal(parentElement.className, 'class1');

  const className = ko.observable('class2');

  ko.applyBindings({bindings: {css: className}}, element);
  assert.equal(parentElement.className, 'class1 class2');
});

test('mdc-parent-bindings binding is allowed for virtual elements', () => {
  allowedVirtual('mdc-parent-bindings');
});

test('mdc-attrs binding adds given attributes to the node', () => {
  const element = bel`<div data-bind="mdc-attrs: attrs"></div>`;
  assert.equal(element.id, '');

  const id = 'element_id';
  const attr1 = ko.observable('a');

  ko.applyBindings({attrs: {id: id, attr1: attr1}}, element);
  assert.equal(element.id, id);
  assert.equal(element.getAttribute('attr1'), 'a');

  attr1('b');
  assert.equal(element.getAttribute('attr1'), 'b');
});

test('mdc-attrs binding provides a default "attrs" value', () => {
  const element = bel`<div data-bind="mdc-attrs"></div>`;
  assert.equal(element.id, '');

  const id = 'element_id';

  ko.applyBindings({attrs: {id: id}}, element);
  assert.equal(element.id, id);
});

test('mdc-parent-attrs binding adds given attributes to the parent node', () => {
  const element = bel`<div data-bind="mdc-parent-attrs: attrs"></div>`;
  const parentElement = bel`<span>${element}</span>`;

  const id = 'element_id';
  const attr1 = ko.observable('a');

  ko.applyBindings({attrs: {id: id, attr1: attr1}}, element);
  assert.equal(parentElement.id, id);
  assert.equal(parentElement.getAttribute('attr1'), 'a');

  attr1('b');
  assert.equal(parentElement.getAttribute('attr1'), 'b');
});

test('mdc-parent-attrs binding provides a default "attrs" value', () => {
  const element = bel`<div data-bind="mdc-parent-attrs"></div>`;
  const parentElement = bel`<span>${element}</span>`;

  const id = 'element_id';

  ko.applyBindings({attrs: {id: id}}, element);
  assert.equal(parentElement.id, id);
});

test('mdc-parent-attrs binding is allowed for virtual elements', () => {
  allowedVirtual('mdc-parent-attrs');
});

test('mdc-child binding receives inner HTML of the component', (done) => {
  ko.components.register('mdc-test', {
    template: {
      element: bel`
        <div id="container">
          <div id="a">
            <div id="b" data-bind="mdc-child"></div>
          </div>
        </div>
      `}
    }
  );

  const child = bel`<span>child</span>`;
  const component = bel`<mdc-test id="c">${child}</mdc-test>`;
  assert.equal(child.parentNode.id, 'c');

  ko.applyBindings({}, component);
  setTimeout(() => {
    assert.equal(child.parentNode.id, 'b');
    assert.equal(child.parentNode.parentNode.id, 'a');
    assert.equal(child.parentNode.parentNode.parentNode.id, 'c');

    ko.components.unregister('mdc-test');
    done();
  });
});

test('mdc-child binding persists the order of the inner elements', (done) => {
  ko.components.register('mdc-test', {
    template: {
      element: bel`
        <div id="container">
          <div data-bind="mdc-child"></div>
        </div>
      `}
    }
  );

  const child1 = bel`<span>child1</span>`;
  const child2 = bel`<span>child2</span>`;
  const component = bel`<mdc-test>${child1}${child2}</mdc-test>`;
  assert.equal(component.children[0].textContent, 'child1');
  assert.equal(component.children[1].textContent, 'child2');

  ko.applyBindings({}, component);
  setTimeout(() => {
    assert.equal(component.children[0].children.length, 2);
    assert.equal(component.children[0].children[0].textContent, 'child1');
    assert.equal(component.children[0].children[1].textContent, 'child2');

    ko.components.unregister('mdc-test');
    done();
  });
});

test('mdc-child binding allows to filter what HTML elements are included', (done) => {
  ko.components.register('mdc-test', {
    template: {
      element:bel`
        <div id="container">
          <div id="wrapper" data-bind="mdc-child: function (element) {
            return element.nodeType == 1 && element.classList.contains('use');
          }"></div>
        </div>
      `}
    }
  );

  const component = bel`
    <mdc-test>
      <span class="ignore1">child1</span>
      <span class="use">child2</span>
      <span class="ignore2">child3</span>
    </mdc-test>
  `;
  assert.equal(component.children.length, 3);

  ko.applyBindings({}, component);
  setTimeout(() => {
    assert.equal(component.children.length, 1);
    assert.equal(component.children[0].id, 'wrapper');
    assert.equal(component.children[0].children.length, 1);
    assert.equal(component.children[0].children[0].textContent, 'child2');

    ko.components.unregister('mdc-test');
    done();
  });
});

test('mdc-child binding keeps track of the inheritance of components', (done) => {
  ko.components.register('mdc-inner', {
    template: {
      element:bel`
        <div id="container-inner">
          inner
        </div>
      `}
    }
  );
  ko.components.register('mdc-outer', {
    template: {
      element:bel`
        <div id="container-outer">
          <span data-bind="mdc-child"></span>
        </div>
      `}
    }
  );

  const components = bel`<mdc-outer><mdc-inner></mdc-inner></mdc-outer>`;

  ko.applyBindings({}, components);
  setTimeout(() => {
    const outerContext = ko.contextFor(components.children[0]);
    const innerContext = ko.contextFor(components.children[0].children[0]);
    assert.strictEqual(innerContext['mdc-parent'], outerContext.$component);

    ko.components.unregister('mdc-inner');
    ko.components.unregister('mdc-outer');
    done();
  });
});

test('mdc-child binding is allowed for virtual elements', () => {
  allowedVirtual('mdc-child');
});

test('mdc-instance binding instantiates MDCComponent and ' +
     'attaches the instance to the first element of the template', (done) => {
  const attach = td.function();
  class TestViewModel {
    constructor (root) {
      this.root = root;
      this.MDCComponent = {attachTo: attach};

      this.instance = null;
      this.initialize = () => {};
    }
  }
  augment.registerComponent(ko, 'mdc-test', '<input /><span data-bind="mdc-instance"></span>', TestViewModel)

  const component = bel`<mdc-test></mdc-test>`;

  ko.applyBindings({}, component);
  setTimeout(() => {
    td.verify(attach(td.matchers.argThat(
      element => element && element.nodeType && element.tagName === 'INPUT'
    )));

    ko.components.unregister('mdc-test');
    done();
  });
});

test('mdc-instance binding passes mdcInstance into "instance" property of viewmodel', (done) => {
  const setter = td.function();
  class TestViewModel {
    constructor (root) {
      this.root = root;
      this.MDCComponent = {attachTo: () => 'mdcInstance'};

      this.initialize = () => {};
    }

    set instance (value) {
      setter(value);
    }
  }
  augment.registerComponent(ko, 'mdc-test', '<span data-bind="mdc-instance"></span>', TestViewModel)

  const component = bel`<mdc-test></mdc-test>`;

  ko.applyBindings({}, component);
  setTimeout(() => {
    td.verify(setter('mdcInstance'));

    ko.components.unregister('mdc-test');
    done();
  });
});

test('mdc-instance binding makes mdcInstance available at the HTML element', (done) => {
  class TestViewModel {
    constructor (root) {
      this.root = root;
      this.MDCComponent = {attachTo: () => 'mdcInstanceStub', name: 'MDCTestComponent'};

      this.instance = null;
      this.initialize = () => {};
    }
  }
  augment.registerComponent(ko, 'mdc-test', '<span data-bind="mdc-instance"></span>', TestViewModel)

  const component = bel`<mdc-test></mdc-test>`;

  ko.applyBindings({}, component);
  setTimeout(() => {
    assert.equal(component.MDCTestComponent, 'mdcInstanceStub');

    ko.components.unregister('mdc-test');
    done();
  });
});

test('mdc-instance binding initializes viewmodel', (done) => {
  const initialize = td.function();
  class TestViewModel {
    constructor (root) {
      this.root = root;
      this.initialize = initialize;

      this.instance = null;
      this.MDCComponent = {attachTo: () => {}};
    }
  }
  augment.registerComponent(ko, 'mdc-test', '<span data-bind="mdc-instance"></span>', TestViewModel)

  const component = bel`<mdc-test></mdc-test>`;

  ko.applyBindings({}, component);
  setTimeout(() => {
    td.verify(initialize(undefined));

    ko.components.unregister('mdc-test');
    done();
  });
});

test('mdc-instance bindings passes proper parent when initializing viewmodel', (done) => {
  const initialize = td.function();
  class TestViewModel {
    constructor (root) {
      this.root = root;
      this.initialize = initialize;

      this.instance = null;
      this.MDCComponent = {attachTo: () => {}};
    }
  }
  augment.registerComponent(ko, 'mdc-inner', '<span data-bind="mdc-instance"></span>', TestViewModel)
  augment.registerComponent(ko, 'mdc-outer', '<span data-bind="mdc-instance, mdc-child"></span>', TestViewModel)

  const component = bel`<mdc-outer><mdc-inner></mdc-inner></mdc-outer>`;

  ko.applyBindings({}, component);
  setTimeout(() => {
    td.verify(initialize(td.matchers.argThat(
      obj => obj && obj.root && obj.root.tagName === 'MDC-OUTER'
    )), {times: 1});
    td.verify(initialize(undefined), {times: 1});

    ko.components.unregister('mdc-inner');
    ko.components.unregister('mdc-outer');
    done();
  });
});

test('mdc-instance binding is allowed for virtual elements', () => {
  allowedVirtual('mdc-instance');
});

test('mdc-ripple binding attaches MDCRipple instance to the element', (done) => {
  const component = bel`<span data-bind="mdc-ripple"></span>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    assert.property(component, 'MDCRipple');
    done();
  });
});

test('mdc-ripple binding disposes MDCRipple instance on element removal', (done) => {
  const component = bel`<span data-bind="mdc-ripple"></span>`;
  ko.applyBindings({}, component);

  setTimeout(() => {
    const onDispose = td.function();
    component.MDCRipple.destroy = onDispose;

    ko.cleanNode(component);

    td.verify(onDispose());
    done();
  });

});

test('mdc-children-transform binding is allowed for virtual elements', () => {
  allowedVirtual('mdc-children-transform');
});

test('mdc-children-filter binding is allowed for virtual elements', () => {
  allowedVirtual('mdc-children-filter');
});
