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
    applyBindingsToNode: () => {},
    utils: {
      domNodeDisposal: {
        addDisposeCallback: () => {}
      }
    }
  }
}

export {koMock};
