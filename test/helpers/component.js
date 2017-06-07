function componentTest (component, description, callback) {
  test(description, (done) => {
    setTimeout(() => {
      callback(component);
      done();
    });
  });
}

export {componentTest};
