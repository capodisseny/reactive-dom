
 // comparison.toReposition.forEach(([key, _item, oldKey])=>{
                //     const obj = loopNodes.get(oldKey)
                //     const newObj = loopNodes.get(key)
                //     const nodes = [...obj.nodes]
                    
                //     afterUpdate.push(()=>{
                //         loopNodes.set(key, obj)
                //          newObj.nodes = nodes
                //     })

                //     registerNodeUpdate(nodes, newObj.ctx)
                //     // updateNode(nodes, newObj.ctx)
        
                // })

                 // in chrome performance  around 140ms
                //next tick 65ms //is les because there is node modifications here, are made on the trigger
                //loop task 90ms
                //here it seems that 
                //FASTEST
                comparison.toReposition.forEach(([key, _item, oldKey])=>{
                    const obj = loopNodes.get(oldKey)
                  
                    const [_, item] = comparison.toReposition[key]

                    obj.ctx.data[loopKey] = item
                    obj.ctx.data[loopIndex] = key

        
                })


                // chrome performance 200ms
              //next tick 43ms //this is not real, because the task are splited
                comparison.toReposition.forEach(([key, item, oldKey], index)=>{

                
                    const obj = loopNodes.get(oldKey)
        
                    afterUpdate.push(()=> loopNodes.set(key, obj))
     
                    const newObj = inLoop ? createFragment(holders):document.createDocumentFragment()
    
                    if(!obj)debugger
                    newObj.append(...obj.nodes)
                    
                    newUpdate[key] = newObj
                 })