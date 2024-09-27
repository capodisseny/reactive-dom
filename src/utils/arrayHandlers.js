

function handleArrayFunctions(key, target, value,handler){

    //mutator methods

   /**
    * const arr = [1, 2, 3];
       arr.push(4);      // [1, 2, 3, 4]
       arr.pop();        // [1, 2, 3]
       arr.shift();      // [2, 3]
       arr.unshift(0);   // [0, 2, 3]
       arr.splice(1, 1); // [0, 3]
       arr.sort();       // [0, 3]
       arr.reverse();    // [3, 0]
       arr.copyWithin(0, 1); // [0, 0]
       arr.fill(1); // [1, 1]
   */


       if (typeof target[property] === 'function') {
           // Intercept array methods
           return function (...args) {
             let updateObject = { add: [], remove: [] };
   
             let result;  // The result of the original method call
             switch (property) {
               case 'push':
                 const startPushIndex = target.length;
                 result = target.push(...args);
                 args.forEach((value, i) => {
                   updateObject.add.push({ index: startPushIndex + i, value });
                 });
                 break;
               case 'pop':
                 const removedPop = target.pop();
                 if (removedPop !== undefined) {
                   updateObject.remove.push({ index: target.length, value: removedPop });
                 }
                 result = removedPop;
                 break;
               case 'shift':
                 const removedShift = target.shift();
                 if (removedShift !== undefined) {
                   updateObject.remove.push({ index: 0, value: removedShift });
                 }
                 result = removedShift;
                 break;
               case 'unshift':
                 result = target.unshift(...args);
                 args.forEach((value, i) => {
                   updateObject.add.push({ index: i, value });
                 });
                 break;
               case 'splice':
                 const startSpliceIndex = args[0];
                 const deleteCount = args[1];
                 const removedSplice = target.splice(...args);
                 
                 // Track removed values
                 removedSplice.forEach((value, i) => {
                   updateObject.remove.push({ index: startSpliceIndex + i, value });
                 });
                 
                 // Track added values
                 const addedItems = args.slice(2);
                 addedItems.forEach((value, i) => {
                   updateObject.add.push({ index: startSpliceIndex + i, value });
                 });
                 
                 result = removedSplice;
                 break;
               case 'sort':
                 result = target.sort(...args);
                 // Sorting doesn't add or remove but reorders, so no need to track here
                 break;
               case 'reverse':
                 result = target.reverse(...args);
                 // Reverse doesn't add or remove but reorders, so no need to track here
                 break;
               default:
                 result = target[property](...args);
             }
   
             // Pass the update object to the callback (onUpdate)
             if (updateObject.add.length > 0 || updateObject.remove.length > 0) {
               onUpdate(updateObject);
             }
             
             return result;
           };
         }
   // if (key === 'splice') {

   //     return function(start, deleteCount, ...items) {
   //       // Track the splice operation
   //       const removedItems = target.slice(start, start + deleteCount);
   //       const addedItems = items;

   //       // Perform the splice operation on the original array
   //       const result = Array.prototype.splice.apply(target, arguments);

   //       // Call the updateViewCallback to update the DOM based on the splice operation
   //       updateViewCallback('splice', target, { start, deleteCount, removedItems, addedItems,  });

       
   //       handler.queueMutation({type:"set",  start, deleteCount, removedItems, addedItems,target, value:result})

   //       return result;  // Return the result of the splice operation
   //     };
   //   }

   //   if(key == "push"){
   //     return function(...items){
           

   //         const result = Array.prototype.push.apply(target, items)

           
   //         handler.queueMutation({type:"add", target, key, value:target})

   //         return result
   //     }
   //   }
 }