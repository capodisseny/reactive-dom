

function compare(source, target) {
    const toAdd = [];
    const toRemove = [];
    const toReposition = [];
  
    // Determine if we're comparing arrays or objects
    const isArray = Array.isArray(source) && Array.isArray(target);
  
    if (isArray) {
      // Step 1: Compare arrays element by element
      const maxLength = Math.max(source.length, target.length);
  
      // Track which elements in the target array have been visited
      const targetVisited = new Array(target.length).fill(false);
  
      // Compare elements in the source array with the target array
      for (let i = 0; i < source.length; i++) {
        const sourceValue = source[i];
        let found = false;
  
        // Check if the source value exists in the target array
        for (let j = 0; j < target.length; j++) {
          if (!targetVisited[j] && sourceValue === target[j]) {
            targetVisited[j] = true;  // Mark this target value as visited
            found = true;
            // If found but at a different index, mark for repositioning
            if (i !== j) {
              toReposition.push([i, sourceValue]);  // Needs to be moved to index i
            }
            break;
          }
        }
  
        if (!found) {
          // If the value doesn't exist in the target array, add it
          toAdd.push([i, sourceValue]);
        }
      }
  
      // Step 2: Find elements in the target that aren't in the source
      for (let j = 0; j < target.length; j++) {
        if (!targetVisited[j]) {
          // If the target element was not found in the source array, remove it
          toRemove.push([j, target[j]]);
        }
      }
    } else {
      // Step 3: Compare objects key by key
      const sourceKeys = new Set(Object.keys(source));
      const targetKeys = new Set(Object.keys(target));
  
      // Loop over source keys to find what needs to be added or updated
      sourceKeys.forEach((key) => {
        if (!targetKeys.has(key)) {
          // Key exists in source but not in target -> Add it
          toAdd.push([key, source[key]]);
        } else if (source[key] !== target[key]) {
          // Key exists in both but values differ -> Add or update
          toAdd.push([key, source[key]]);
        }
      });
  
      // Loop over target keys to find what needs to be removed
      targetKeys.forEach((key) => {
        if (!sourceKeys.has(key)) {
          // Key exists in target but not in source -> Remove it
          toRemove.push([key, target[key]]);
        }
      });
    }
  
    return { toAdd, toRemove, toReposition };
  }



// ///about 3ms for 1000 items
//   function compare(source, target) {
//     const toAdd = [];
//     const toRemove = [];
//     const toReposition = [];
//     const toKeep = [];
  
//     // Determine if we're comparing arrays or objects
//     const isArray = Array.isArray(source) && Array.isArray(target);
  
//     const types = new Set()
//     if (isArray) {
//       // Step 1: Compare arrays element by element
//       const maxLength = Math.max(source.length, target.length);
  
//       // Track which elements in the target array have been visited
//       const targetVisited = new Array(target.length).fill(false);
  
//       // Compare elements in the source array with the target array
//       for (let i = 0; i < source.length; i++) {
//         const sourceValue = source[i];

//         types.add(typeof sourceValue)


//         let found = false;
  
//         // Check if the source value exists in the target array
//         for (let j = 0; j < target.length; j++) {
//           if (!targetVisited[j] && sourceValue === target[j]) {
//             targetVisited[j] = true;  // Mark this target value as visited
//             found = true;
//             if (i === j) {
//               // If found and at the same index, mark as kept
//               toKeep.push([i, sourceValue]);
//             } else {
//               // If found but at a different index, mark for repositioning
//               toReposition.push([i, sourceValue, j,target[j]]);
//             }
//             break;
//           }
//         }
  
//         if (!found) {
//           // If the value doesn't exist in the target array, add it
//           toAdd.push([i, sourceValue]);
//         }
//       }
  
//       // Step 2: Find elements in the target that aren't in the source
//       for (let j = 0; j < target.length; j++) {
//          types.add(typeof target[j])
//         if (!targetVisited[j]) {
//           // If the target element was not found in the source array, remove it
//           toRemove.push([j, target[j], ]);
//         }
//       }
//     } else {
//       // Step 3: Compare objects key by key
//       const sourceKeys = new Set(Object.keys(source));
//       const targetKeys = new Set(Object.keys(target));
  
//       // Loop over source keys to find what needs to be added or updated
//       sourceKeys.forEach((key) => {
//         const sourceValue = source[key]
//         if (!targetKeys.has(key)) {
//           // Key exists in source but not in target -> Add it
         
//           toAdd.push([key, sourceValue]);
//         } else if (source[key] === sourceValue) {
//           // Key exists in both and values are the same -> Keep it
//           toKeep.push([key, sourceValue]);
//         } else {
//           // Key exists in both but values differ -> Add or update
//           toAdd.push([key, sourceValue]);
//         }

//         types.add(typeof sourceValue)
//       });
  
//       // Loop over target keys to find what needs to be removed
//       targetKeys.forEach((key) => {
//         const targetValue = target[key]
//         types.add(typeof targetValue)
//         if (!sourceKeys.has(key)) {
//           // Key exists in target but not in source -> Remove it
//           toRemove.push([key, targetValue]);
//         }
//       });
//     }
  
//     return { toAdd, toRemove, toReposition, toKeep, types:[...types] };
//   }

