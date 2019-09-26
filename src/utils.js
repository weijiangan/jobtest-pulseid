const __DEV__ = process.env.NODE_ENV === "development";

export function debugLog(...params) {
  if (__DEV__) {
    console.log(...params);
  }
}
