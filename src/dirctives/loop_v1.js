export const loop =  {

    //set deep to one to avoid nested updates
    deep:1,
    resolveExpression(expression){
        //[m,loopKey, loopIndex,  path]
        return expression.match(/([a-zA-Z]+)(?:\s*,\s*([a-zA-Z]+))?\s+in\s+([a-zA-Z.]+)/).slice(1)
    },
    getValue( ctx, expression){

        const [ loopKey, loopIndex, path ] = expression

        return get(ctx.data, path)
    
    },

    createChildContext({path, obj,ctx, loopKey, loopIndex, key}){


        let childData = reactive({ 
            [loopKey]:obj.item, 
             [loopIndex]:key,
      
        }, (payload)=>{

            // debugger
        }
    )


       Object.setPrototypeOf(  childData,ctx.data)

            // debugger
        let childCtx = {data:childData, isLoop:true}

        return childCtx 
        return {data:new Proxy(ctx.data, {
            get(target, prop){

                if(prop == loopIndex){
                     return obj.reactive.key
                }
                if(prop == loopKey){
                    
                    const key = obj.key
                    
                    const v =  get(target, `${path}.${key}`)

                    return v
                }
                return Reflect.get(target,prop)

            },
    
            set(target, prop, v){
                // if(prop == loopIndex){
                //     return o.value = v
                // }
                if(prop == loopIndex){
                    return true
                }
                if(prop == loopKey){
  
                    return set(target, `${path}.${obj.key}`, v)
                   
                }
                return Reflect.set(target,prop, v)
            }
        }), isLoop:true}
    },
    updateFunction(node, update, {expression, helper} , ctx){

        const {type, target, key,value, updateId, oldValue} = update

        const  [ loopKey, loopIndex , path] = expression 
        const items = value

        const createFragment = (holders, oldFragment)=>{
            const holder = document.createElement("div")
            holders.push(holder)
            if(oldFragment) holder.append(...oldFragment.childNodes)
            return holder
        }


        let template = helper.node.content

        if(!node.parentNode)debugger

        if(!items) return 
        
        
        const nodeObj = this.getNodeObject(node)  
        const last = nodeObj.lastLoop ||[]
         console.time("Comparison")
        const comparison = compare( items,last)

        const jobs = comparison.jobs
         console.timeEnd("Comparison")

       

         const oneJob = jobs.length === 1?jobs[0]:false

     


         //TODO: UPDATE NODES EACH TIME to overwrite the context
         // just update new nodes
         // remove old nodes
         // advantatges:
            // no need of references and other staff like loopNodes, etc

         //TODO: SELECTIVE UPDATE
         // try to find way to add the nodes in the corresponding position
         //cons: 
            //the unique con of this is that I need to manipulate the DOM
            //but maybe there is no such operations where there differents indexes...
            // the most comomn is splice which will delete and add lists of nodes so == one reflow


         const loopNodes = nodeObj.loopValues = nodeObj.loopValues || new Map()

         console.log("UPDATE LOOP", {comparison, loopNodes, items})


         if(oneJob =="keep")  return

        // let loopNodes = nodeObj.loopValues = nodeObj.loopValues || []
             //clean deleted refences
        // loopNodes = loopNodes.filter(v=>v)
        const newUpdate = []

        const holders = []
        const inLoop = ctx.isLoop
        const sameLength = ( comparison.toAdd.length == comparison.toRemove.length  
             && !comparison.toReposition.length 
          );

        const equalSize = comparison.toReposition.length  == Object.keys(items).length
        const afterUpdate = []

        if(equalSize && false){
        
            console.log("reverse?????")
            //another way 
            // in chrome performance  around 160ms
            //next tick 110ms
             //loop task 110ms
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

            // updateQueue()
            nextTick(()=>{
               
     
                nodeObj.lastLoop = [...items]
            })

      

           
            return 
        }

        //skip update when the length is the same and all the values are the same type
        if(sameLength && comparison.types.length == 1 && comparison.types[0] != "object") return


     
        comparison.toKeep.forEach(([key, item], index)=>{

            const obj = loopNodes.get(key)

            if(!obj)debugger
            const newObj = inLoop ? createFragment(holders):document.createDocumentFragment()
            newObj.append(...obj.nodes)

            newUpdate[key] = newObj

        
         })

        

        //remove old
        comparison.toRemove.forEach(([key, item], index)=>{

            const obj = loopNodes.get(key)
           

            //delete on next, so i have access on the same update
             afterUpdate.push(()=> loopNodes.delete(key))
        

            if(!obj) debugger

            obj.nodes.forEach(node=>node.remove())

         })

        
        //update position
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


         //add new
         comparison.toAdd.forEach(([key, item], index)=>{
            
      
            //set obj before update 
            const obj = {  item}
            // obj.reactive = reactive(obj, (payload)=>{
            //     console.log("update objjjj",payload,  obj)
            //     // debugger
            // })
            const childCtx = this.createChildContext({path, obj,ctx, loopKey, loopIndex, key})
    
      
            afterUpdate.push(()=> loopNodes.set(key, obj))
           
            obj.ctx = childCtx


            // faster 100ms //without console around 55ms
              let newNode = template.cloneNode(true)
              template.childNodes.forEach((child, i)=>{
                    parallelUpdate(child, newNode.childNodes[i], childCtx)
                    //i don't know why if I register and run it on the queue 
                    //doesn't trigger the update on {{task.name}}
                //   registerNodeUpdate(child, newNode.childNodes[i], childCtx)
              })


             
              //slower: from 100ms to 130ms //without console aroudn 65ms
            // let newNode = cloneDeep(template, (node, ref, )=>{
        
            //     if(node.tagName == "TEMPLATE")debugger
            //     if(!ref) return   
            //      ref.runNodeUpdates(node, childCtx)
    
            // }, )
    
            if(ctx.isLoop && newNode.nodeType == 11){
            
                newNode = createFragment(holders, newNode)
            }


            obj.nodes = [...newNode.childNodes]
      
            newUpdate[key] = newNode

           
           
         })


         //do local updates
         afterUpdate.forEach(fn=>fn())

         //check duplicated
        //  nextTick(()=>{
        //     const duplicated = [...loopNodes.values()].reduce((c,v, i, a)=>a.indexOf(v) !== i?c.concat(v):c, [])
        //     if(duplicated.length){
        //         debugger
        //     }
        //  })


         if(items.length != newUpdate.length) debugger

        //  debugger
        // newUpdate = newUpdate.filter(v=>v)

        if(node.__inTemplate)debugger

        
    
        if(!this.inRequest){
            console.log("no request.....:::::::::::::::", this)
            this.inRequest = true
            requestAnimationFrame(()=>{
                this.updateLoop(node, newUpdate,holders)
                
            })
            nextTick(()=>{
                this.inRequest = false
            })
        }else{
            // debugger
            this.updateLoop(node, newUpdate,holders)
        }
        // requestAnimationFrame(()=>{

           
           
        // })
      

        nodeObj.lastLoop = [...items]

        return 


        
    },
    

}