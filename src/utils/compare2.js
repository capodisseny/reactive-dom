function compare(source, target) {
    const toAdd = [];
    const toRemove = [];
    const toReposition = [];
    const toKeep = [];
    const types = new Set(); // Store unique types of values
  
    const isArray = Array.isArray(source) && Array.isArray(target);
  
    if (isArray) {
      // Step 1: Create a map for fast lookups in the target array
      const targetMap = new Map();
      target.forEach((value, index) => targetMap.set(value, index));
  
      // Step 2: Compare source array with the target array
      for (let i = 0; i < source.length; i++) {
        const sourceValue = source[i];
        types.add(typeof sourceValue);  // Track unique types
  
        const targetIndex = targetMap.get(sourceValue);
  
        if (targetIndex !== undefined) {
          // Element found in the target array
          if (i === targetIndex) {
            // Same position -> toKeep
            toKeep.push([i, sourceValue]);
          } else {
            // Different position -> toReposition
            toReposition.push([i, sourceValue, targetIndex, target[targetIndex]]);
          }
          // Remove it from the targetMap to track unvisited elements
          targetMap.delete(sourceValue);
        } else {
          // Element not found in the target array -> toAdd
          toAdd.push([i, sourceValue]);
        }
      }
  
      // Step 3: Remaining elements in the targetMap are toRemove
      targetMap.forEach((value, index) => {
        types.add(typeof value); // Track unique types
        toRemove.push([index, value]);  // Old index and value to be removed
      });
  
    } else {
      // Comparing objects key by key
      const sourceKeys = Object.keys(source);
      const targetKeys = Object.keys(target);
  
      // Create a Set for fast lookup in target keys
      const targetKeySet = new Set(targetKeys);
  
      // Step 1: Compare source object keys with target
      sourceKeys.forEach((key) => {
        types.add(typeof source[key]);  // Track unique types for source
  
        if (target.hasOwnProperty(key)) {
          if (source[key] === target[key]) {
            // Same value -> toKeep
            toKeep.push([key, source[key]]);
          } else {
            // Different value -> toReposition
            toReposition.push([key, source[key], key, target[key]]);
          }
          targetKeySet.delete(key);  // Mark key as visited
        } else {
          // Key exists in source but not in target -> toAdd
          toAdd.push([key, source[key]]);
        }
      });
  
      // Step 2: Remaining keys in targetKeySet -> toRemove
      targetKeySet.forEach((key) => {
        types.add(typeof target[key]); // Track unique types for target
        toRemove.push([key, target[key]]);  // Old key and value to be removed
      });
    }
  
    return {
      toAdd,
      toRemove,
      toReposition,
      toKeep,
      types: Array.from(types)  // Return unique types as an array
    };
  }
  