const isSubscribable = instance => {
  if ('ko' in global) {
    return ko.isSubscribable(instance);
  }
  else {
    return instance != null &&
           typeof instance.subscribe == "function" &&
           typeof instance["notifySubscribers"] == "function";
  }
}

const unwrap = instance => {
  if ('ko' in global) {
    return ko.unwrap(instance);
  }
  else {
    if (isSubscribable(instance)) {
      return instance();
    }
    else {
      return instance;
    }
  }
}

const toJS = instance => {
  if ('ko' in global) {
    return ko.toJS(instance);
  }
  else {
    while (isSubscribable(instance)) {
      instance = instance();
    }
    return instance;
  }
}

export {isSubscribable, unwrap, toJS}
