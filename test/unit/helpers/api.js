const ignoredProperties = ['constructor', 'destroy', 'getDefaultFoundation'];

function excludeExpectedProperties (properties, expected) {
  // ignore MDCComponent properties
  ignoredProperties.forEach(property => {
    delete properties[property];
  });

  // ignore private properties (ending with _ )
  Object.keys(properties).forEach(property => {
    if (property[property.length - 1] === '_') {
      delete properties[property];
    }
  });

  expected.forEach(property => {
    if (properties[property]) {
      delete properties[property];
    }
    else {
      properties[property] = 'is missing';
    }
  });
}

export {excludeExpectedProperties};
