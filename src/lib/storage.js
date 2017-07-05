import { config } from "./config.js"


// android虚拟了一个storage
var nativeLS = window.localStorage;
if (config.platform == 'android' && window.LocalStorage) {
  nativeLS = window.LocalStorage;
}
const storage = {
  remove: function(key) {
    return nativeLS.removeItem(key);
  },
  get: function(key) {
    return nativeLS.getItem(key);
  },
  set: function(key, value) {
    return nativeLS.setItem(key, value);
  }
};
export {
  storage
}
