
  //GPT version, 
  //not skiping innecessary moves 

  function minimalMovesToTransformArray(oldArray, newArray) {
    const toAdd = [];
    const toRemove = [];
    const toMove = [];
    
    const oldMap = new Map();
    const newMap = new Map();
    const jobs = new Set();
    
    // Step 1: Create maps of elements with their indices for quick lookup
    oldArray.forEach((value, index) => oldMap.set(value, index));
    newArray.forEach((value, index) => newMap.set(value, index));
    
    let offset = 0; // This offset will account for shifts due to additions and removals
    
    // Step 2: Identify items to remove (in oldArray but not in newArray)
    oldArray.forEach((value, oldIndex) => {
      if (!newMap.has(value)) {
        toRemove.push([oldIndex, value]);
        offset--; // Decrease offset because we remove an element
      }
    });
    
    // Step 3: Identify items to add (in newArray but not in oldArray)
    newArray.forEach((value, newIndex) => {
      if (!oldMap.has(value)) {
        toAdd.push([newIndex, value]);
        offset++; // Increase offset because we add an element
      }
    });
    
    // Step 4: Identify items to move (present in both arrays but in different positions)
    oldArray.forEach((value, oldIndex) => {
      if (newMap.has(value)) {
        const newIndex = newMap.get(value);
        // If the element is not where it should be considering the offset
        if (oldIndex + offset !== newIndex) {
          toMove.push([oldIndex,  newIndex, value]);
        }
      }
    });
  
    return {
        jobs,
      add:toAdd,
      remove:toRemove,
      move:toMove
    };
  }
  