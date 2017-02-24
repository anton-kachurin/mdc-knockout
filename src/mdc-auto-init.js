window.register = window.register || function (name, viewModelConstructor, template) {
  ko.components.register(name, {
      viewModel: {
        createViewModel: function(params, componentInfo) {
          var element = componentInfo.element;
          var root = element.children[0];
          var attributes = element.attributes;
          var attrs = {}
          var names = [];
          ko.utils.arrayForEach(attributes, function (attr) {
            var attrName = attr.name.toLowerCase();
            if (attrName != 'params'
             && attrName != 'class'
             && attrName != 'data-bind') {
              attrs[attr.name] = attr.value;
              names.push(attr.name);
            }
          });
          ko.utils.arrayForEach(names, function (name) {
            element.removeAttribute(name);
          });
          return new viewModelConstructor(root, params, attrs);
        }
      },
      template: template
  });
};
