/**
 * 
 * 
 * Cross browser WeakMap polyfill
 */

(function () {
    if (typeof WeakMap === "undefined") {
      window.WeakMap = function () {
        this._keys = [];
        this._values = [];
      };
  
      // Polyfill methods for WeakMap
      WeakMap.prototype.set = function (key, value) {
        if (typeof key !== "object" || key === null) {
          throw new TypeError("Invalid value used as weak map key");
        }
        var index = this._keys.indexOf(key);
        if (index === -1) {
          this._keys.push(key);
          this._values.push(value);
        } else {
          this._values[index] = value;
        }
        return this;
      };
  
      WeakMap.prototype.get = function (key) {
        var index = this._keys.indexOf(key);
        return index === -1 ? undefined : this._values[index];
      };
  
      WeakMap.prototype.has = function (key) {
        return this._keys.indexOf(key) !== -1;
      };
  
      WeakMap.prototype.delete = function (key) {
        var index = this._keys.indexOf(key);
        if (index === -1) {
          return false;
        }
        this._keys.splice(index, 1);
        this._values.splice(index, 1);
        return true;
      };
    }
  })();