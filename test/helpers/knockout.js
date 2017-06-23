function koMock () {
  return {
    bindingHandlers: {},
    virtualElements: {
      allowedBindings: []
    },
    components: {
      register: () => {}
    },
    applyBindingsToDescendants: () => {}
  }
}

export {koMock};
