import {utils} from 'knockout';

function koMock () {
  return {
    bindingHandlers: {},
    virtualElements: {
      allowedBindings: []
    },
    components: {
      register: function () {}
    },
    utils: utils
  }
}

export {koMock};
