class childrenUtil {
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

export {childrenUtil};
