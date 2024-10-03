


const isObj = (k)=>  k  && typeof k === "object" || typeof k === "function" ; 

class HybridWeakMap {
  constructor() {
    this.weakMap = new WeakMap(); // To store object keys
    this.map = new Map();         // To store string keys
  }

  set(key, value) {
    if (isObj(key)) {

      this.weakMap.set(key, value);

    } else{
      //   else if (typeof key !== "string") 
      // If the key is a string, store it in the Map
      this.map.set(key, value);
    } 

    return this; // For chaining
  }

  get(key) {
    if (isObj(key)) {
      // Retrieve from WeakMap if the key is an object
      return this.weakMap.get(key);
    } else {
      // Retrieve from Map if the key is a string
      return this.map.get(key);
    }
    return undefined; // If key is neither an object nor a string
  }

  has(key) {
    if (isObj(key)) {
      // Check in WeakMap if the key is an object
      return this.weakMap.has(key);
    } else  {
      // Check in Map if the key is a string
      return this.map.has(key);
    }
    return false; // If key is neither an object nor a string
  }

  delete(key) {
    if (isObj(key)) {
      // Delete from WeakMap if the key is an object
      return this.weakMap.delete(key);
    } else  {
      // Delete from Map if the key is a string
      return this.map.delete(key);
    }
    return false; // If key is neither an object nor a string
  }
}


export class HybridWeakMap {
    constructor() {
      this.weakMap = new WeakMap(); // To store object keys
      this.map = new Map();         // To store string keys
    }
  
    set(key, value) {
      if (typeof key === "object" && key !== null) {
        // If the key is an object, store it in the WeakMap
        this.weakMap.set(key, value);
      } else 
        if (typeof key === "string")
         {
        // If the key is a string, store it in the Map
        this.map.set(key, value);
      }
      //  else {
      //   throw new TypeError("Key must be an object or a string.");
      // }
      return this; // For chaining
    }
  
    get(key) {
      if (typeof key === "object" && key !== null) {
        // Retrieve from WeakMap if the key is an object
        return this.weakMap.get(key);
      } else  {
        // Retrieve from Map if the key is a string
        return this.map.get(key);
      }
      return undefined; // If key is neither an object nor a string
    }
  
    has(key) {
      if (typeof key === "object" && key !== null) {
        // Check in WeakMap if the key is an object
        return this.weakMap.has(key);
      } else if (typeof key === "string") {
        // Check in Map if the key is a string
        return this.map.has(key);
      }
      return false; // If key is neither an object nor a string
    }
  
    delete(key) {
      if (typeof key === "object" && key !== null) {
        // Delete from WeakMap if the key is an object
        return this.weakMap.delete(key);
      } else if (typeof key === "string") {
        // Delete from Map if the key is a string
        return this.map.delete(key);
      }
      return false; // If key is neither an object nor a string
    }
  }
  