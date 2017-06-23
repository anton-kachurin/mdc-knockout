function koMock () {
  return {
    bindingHandlers: {},
    virtualElements: {
      allowedBindings: []
    },
    components: {
      register: () => {}
    },
    applyBindingsToDescendants: () => {},
    applyBindingsToNode: () => {}
  }
}

export {koMock};
