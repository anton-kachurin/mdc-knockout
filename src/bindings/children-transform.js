class childrenTransformUtil {
  static transform (children, transformFunction, boundThis) {
    transformFunction = transformFunction.bind(boundThis);
    return transformFunction(children);
  }

  static makeList (result, nodes, maxDepth, depth = 0) {
    nodes.forEach(node => {
      result.push(node);
      if (depth < maxDepth) {
        if (node.children && node.children.length) {
          this.makeList(result, [...node.children], maxDepth, depth + 1);
        }
      }
    });
  }

  static addClasses (list, parameters) {
    list.forEach(node => {
      const tagClassName = parameters[node.tagName];
      if (tagClassName) {
        node.classList.add(tagClassName);
      }
    });
  }

  static replaceAttrs (list, parameters) {
    list.forEach(node => {
      if (node.attributes && node.attributes.length) {
        [...node.attributes].forEach(attr => {
          const attrClassName = parameters[attr.name];
          if (attrClassName) {
            node.classList.add(attrClassName);
            node.removeAttributeNode(attr);
          }
        });
      }
    });
  }

  static output (ko, children, element) {
    children.reverse().forEach(child => {
      ko.virtualElements.prepend(element, child);
    });
  }

  static apply (ko, bindingContext, element) {
    const newBindingContext = bindingContext.$parentContext;
    ko.applyBindingsToDescendants(newBindingContext, element);
  }
}

class childrenTransformBinding {
  constructor (ko, util) {
    this.ko = ko;
    this.util = util;
    this.init = this.init.bind(this);
  }

  init (element, valueAccessor, allBindings, viewModel, bindingContext) {
    const parameters = valueAccessor();
    const $component = bindingContext.$component;
    let children = bindingContext.$componentTemplateNodes;

    if ($component.childrenTransform) {
      children = this.util.transform(children, $component.childrenTransform, $component);
    }

    if (parameters.depth) {
      const list = [];
      this.util.makeList(list, children, parameters.depth);

      if (parameters.node) {
        this.util.addClasses(list, parameters.node);
      }

      if (parameters.attr) {
        this.util.replaceAttrs(list, parameters.attr);
      }
    }

    if (children.length) {
      this.util.output(this.ko, children, element);
      this.util.apply(this.ko, bindingContext, element);
    }

    return { controlsDescendantBindings: true }
  }
}

export {childrenTransformBinding, childrenTransformUtil};
