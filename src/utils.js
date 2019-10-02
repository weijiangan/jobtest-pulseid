const __DEV__ = process.env.NODE_ENV === "development";

export function debugLog(...params) {
  if (__DEV__) {
    console.log(...params);
  }
}

export function throttle(type, name, obj) {
  obj = obj || window;
  var running = false;
  var func = function() {
    if (running) {
      return;
    }
    running = true;
    requestAnimationFrame(function() {
      obj.dispatchEvent(new CustomEvent(name));
      running = false;
    });
  };
  obj.addEventListener(type, func);
}
