
/**
 * 
 Framework to manipulate directly de the DOM using reactive programming.
 */


 const prefix = "s-"
 const events = {
    // Mouse Events
    onclick: true,
    ondblclick: true,
    onmousedown: true,
    onmouseup: true,
    onmousemove: true,
    onmouseover: true,
    onmouseout: true,
    onmouseenter: true,
    onmouseleave: true,
    oncontextmenu: true,
  
    // Keyboard Events
    onkeydown: true,
    onkeyup: true,
    onkeypress: true,
  
    // Form Events
    onchange: true,
    onsubmit: true,
    onreset: true,
    oninput: true,
    oninvalid: true,
    onselect: true,
  
    // Window Events
    onload: true,
    onunload: true,
    onresize: true,
    onscroll: true,
    onbeforeunload: true,
    onhashchange: true,
    onerror: true,
  
    // Document Events
    onDOMContentLoaded: true,
    onreadystatechange: true,
  
    // Clipboard Events
    oncopy: true,
    oncut: true,
    onpaste: true,
  
    // Drag and Drop Events
    ondrag: true,
    ondragstart: true,
    ondragend: true,
    ondragover: true,
    ondragenter: true,
    ondragleave: true,
    ondrop: true,
  
    // Media Events
    onplay: true,
    onpause: true,
    onended: true,
    ontimeupdate: true,
    onvolumechange: true,
    onseeked: true,
    onseeking: true,
    ondurationchange: true,
    oncanplay: true,
    oncanplaythrough: true,
  
    // Touch Events
    ontouchstart: true,
    ontouchend: true,
    ontouchmove: true,
    ontouchcancel: true,
  
    // Pointer Events
    onpointerdown: true,
    onpointerup: true,
    onpointermove: true,
    onpointerover: true,
    onpointerout: true,
    onpointerenter: true,
    onpointerleave: true,
    onpointercancel: true,
  
    // Focus Events
    onfocus: true,
    onblur: true,
    onfocusin: true,
    onfocusout: true,
  
    // Device Events
    ondeviceorientation: true,
    ondevicemotion: true,
  
    // Miscellaneous Events
    ontransitionend: true,
    onanimationstart: true,
    onanimationend: true,
    onanimationiteration: true,
    onmessage: true,
    ononline: true,
    onoffline: true,
    onstorage: true,
  };


 const directives = {
    

    bind: {
        updateFunction(node, { oldValue, value}){

            if(typeof value === "object"){
    
                Object.entries(value).forEach(([key, value]) => {
                    
                    node.setAttribute(key, value)
                });
            }

        },

        
    },
    show: {
   
        updateFunction:(node, { value})=>{

            const args = value ? [""]: ["none", "important"]
             node.style.setProperty('display',...args);
            // return {
            //     style: {display: args}
            // }
            
        },
       
    },

    if:{

        updateFunction(node, { value}){
            let ref = nodeRef.commentRef = nodeRef.commentRef || document.createComment("if")
    
            if(value){
                
                if(node.parentNode) return
                ref.replaceWith(node)
 
            }else{

                node.replaceWith(ref)
                
            }
        },
       
    },


    //loop first to pass the apropiate data to the children
    loop: {

        //set deep to one to avoid nested updates
        deep:1,
        resolveExpression(expression){
            //[m,loopKey, loopIndex,  path]
            return expression.match(/([a-zA-Z]+)(?:\s*,\s*([a-zA-Z]+))?\s+in\s+([a-zA-Z.]+)/).slice(1)
        },
        getValue({expression}, data){

            const [ loopKey, loopIndex, path ] = expression

            return get(data, path)
        
        },
 
        createChildContext({path, obj,ctx, loopKey, loopIndex}){
            return {data:new Proxy(ctx.data, {
                get(target, prop){

                    if(prop == loopIndex){
                         return obj.key
                    }
                    if(prop == loopKey){
                        
                        const key = obj.key
                        
                        const v =  get(target, `${path}.${key}`)

                        return v
                    }
                    return Reflect.get(target,prop)

                },
        
                set(target, prop, v){
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

             if(oneJob =="keep") {
          
                return
             }

             debugger

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
            // let loopNodes = nodeObj.loopValues = nodeObj.loopValues || []
                 //clean deleted refences
            // loopNodes = loopNodes.filter(v=>v)
            const newUpdate = []

            const holders = []
            const inLoop = ctx.isLoop
            const sameLength = ( comparison.toAdd.length == comparison.toRemove.length  
                && !comparison.toReposition.length 
              );
       
            //skip update when the length is the same and all the values are the same type
            if(sameLength && comparison.types.length == 1 && comparison.types[0] != "object") return


            console.log("proceeed")

            const afterUpdate = []
            comparison.toKeep.forEach(([key, item], index)=>{

                const obj = loopNodes.get(key)

                if(!obj)debugger
                const newObj = inLoop ? createFragment(holders):document.createDocumentFragment()
                newObj.append(...obj.nodes)

                newUpdate[key] = newObj

            
             })

            
             console.log("UPDATE LOOP", {comparison, loopNodes, items})
            //remove old
            comparison.toRemove.forEach(([key, item], index)=>{


                // //string udpate 
                // if(sameLength && typeof item !== "object" &&  typeof item == typeof comparison.toAdd[index][1]){
                //     return
                //  }

                const obj = loopNodes.get(key)
               

                //delete on next, so i have access on the same update
                 afterUpdate.push(()=> loopNodes.delete(key))
            

                if(!obj) debugger

                obj.nodes.forEach(node=>node.remove())

             })


            //  if(!jobs.includes("add")) {

            //     Object.entries(items).forEach(([key, item])=>{
            //          const obj = loopNodes.get(key)
            //         const childCtx = this.createChildContext({path, obj,ctx, loopKey, loopIndex})
                    
            //         obj.nodes.forEach(node=>updateNode(node, childCtx))
            //     })
            //     console.log("only removed")

            //     afterUpdate.forEach(fn=>fn())
            //     return
            //  } 
            
            //update position
             comparison.toReposition.forEach(([key, item, oldKey], index)=>{

                
                const obj = loopNodes.get(oldKey)
    
                afterUpdate.push(()=> loopNodes.set(key, obj))
 
                const newObj = inLoop ? createFragment(holders):document.createDocumentFragment()

                if(!obj)debugger
                newObj.append(...obj.nodes)

                obj.key = key
                //update for the index....
                  updateNode(newObj, obj.ctx)
                  
               
                newUpdate[key] = newObj
             })


             //add new
             comparison.toAdd.forEach(([key, item], index)=>{
                
          
                //set obj before update 
                const obj = { key, item}
                const childCtx = this.createChildContext({path, obj,ctx, loopKey, loopIndex})
        
          
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

            updateQueue()

              requestAnimationFrame(()=>{
                node.before(...newUpdate)
              })
          


            holders.forEach(holder=>holder.replaceWith(...holder.childNodes))

            nodeObj.lastLoop = [...items]

            return 


            
        },
        

    }
    
    
}
 

window.createContext = createContext
window.reactive = reactive
window.watch = watch
window.nextTick = nextTick

function createContext(data, root){

  
     root = root || getPrevious() || document.body

 

    if(typeof data === "string") {
        data = reactive({})
    }
        
    const ctx =   {
        data,
        root,
    }

    console.time("Compilation")
    //  let compiled = compileNodes(root,  ctx )
     let compiled = compileHelpers(root )

     console.timeEnd("Compilation")

     console.log("compiled", compiled)


      runUpdates(ctx)
    //  initializeNodes(ctx)
     
     return {}
}



const proxies = {
    reactive: new WeakMap()
}

const isProxyFlag = Symbol('__isProxy');

function isReactive(obj){
    if(!obj) return false
    // if(typeof obj !== "object") return false
    // console.log(obj)
    //  return obj.__raw ? true: false
     return obj?.__isReactive

}
const interceptors = {

    //chat gpt solution for check proxies with prototypes
    //IMPORTANT: do not delete this
     // Intercept and return `false` for the `hasOwnProperty` check on the flag
    //  hasOwnProperty:{
    //     get(target, key, value, receiver){

    //         if (prop === 'hasOwnProperty') {
    //             return (key) => key !== isProxyFlag;
    //           }
    //           return Reflect.get(target, key, receiver);
    //     }
    //  },
     
      
    //   [isProxyFlag]:{
    //         get(target, key){
    //               // Intercept access to the symbol-based flag
    //             if (prop === isProxyFlag) {
    //                 return true;  // Indicate that this object is proxied
    //             }
    //             return Reflect.get(target, key, receiver);
    //         }
    //   },

    __isReactive:{

        get(target, key, value, reciever){
            
    
            return this.proxy == reciever

            return reciever == this.target
        },

    },
    __raw:{
        get(target){
            // console.log("the targettt", target)
            return target
            return this.target
        }
    },
    __parent:{
        set(target, k, v){
            return this.parent = v
        }
    },
    __key:{
        set(target, k, v){
            return this.key = v
        }
    }
    
  
 }
 


function reactive(obj, callbacks = [],  parent,key,  origin){

    if(typeof obj !== "object") return obj

    if(isReactive(obj)) {
       
        obj.__parent  = parent
        obj.__key = key

         return obj
 
     }
 

    let current =  proxies.reactive.get(obj)

    if(current ) {
            return current
    }

    let handler =   new ReactiveHandler({target:obj, parent,key, origin:origin || obj,callbacks })
    let proxy =  new Proxy(obj, handler)

    handler.proxy = proxy
    proxies.reactive.set(obj,proxy)

        return proxy
 } 


  const effectStack = []
 class ReactiveHandler{

    static handlers = []
    
    static queue = []
    static handlersByObject = new WeakMap()
    constructor(options = {}){

        this.effects = new Set()

        this.constructor.handlers.push(this)

        this.origin = options.origin
        this.target = options.target

        this.queue = []

        //instead of an array of parents just pass the 
        this.parent = options.parent
        this.key = options.key

        this.deepEffects  = new Set()

        
        if(options.callbacks){
            this.addDeepEffect(options.callbacks)
        }

    
        this.constructor.handlersByObject.set(this.target, this)
    }
  
    //use the handler to run the logic, since the handler has control on the time and data to update
    runEffect(effect, depth ){

        if(effect.ran) return
        nextTick(()=> effect.ran = false)//setTimeout(()=> effect.ran = false)

        
        const isFunction = typeof effect == "function" 
        const deep = isFunction?true:effect.deep
        if(depth && deep){
     
            //check depth
            if( deep !== true && depth > deep)  return

            this.runNextUpdate(effect)            

        }
        //without depth only run the obersving props
        if(!depth){

            const observingProps = effect.observing.get( this)

            this.runNextUpdate(effect, observingProps)

        }
  

       
    }

    runDeep(){

            //generate an inverted deep   // src/explanations.txt #invertedDeep
            let deep = 1
            let current = this
            const parents = []
    
            console.log("hadn", this, this.nextUpdate)
            // let path = []
            let path = ""
            while(current){

                if(current.key){
                    // path.unshift(current.key)
                    path = `${current.key}.${path}`
                }
                
                parents.push([current, deep, path])
                current = current.parent
                deep++
            }

            console.log("parents", parents)
            //run first main parent effect
            parents.reverse()
    
            parents.forEach(([handler, depth, path])=>{

                const payload = {path}
                console.log(payload)
              
                handler.deepEffects.forEach(effect=>{

                
                    this.runEffect(effect, depth)
              
                })
            })
    }

    runNextUpdate(effect, observingProps = this.nextUpdate){

        if(!observingProps)debugger

 
        Object.keys(observingProps).forEach((key)=>{
            if(!observingProps[key])return 
            if(typeof effect == "function"){
                effect(this.nextUpdate[key], this)
                return 
            }


            effect.runWithPayload(this.nextUpdate[key], this)
        })


    }

    addDeepEffect(deepEffect){
        

        const deepEffects = this.deepEffects
        if(typeof deepEffect  == "function" || deepEffect instanceof Effect){
        
            deepEffects.add(deepEffect)

        }
        else if(Array.isArray(deepEffect) ){
            deepEffects.forEach(effect=>{
                this.addDeepEffect(effect)
            })
           
        }
        else{
            console.warn("deepEffects must be an array, a function or an Effect")
        }
    }

    static get currentEffect(){
        return effectStack.at(-1)
     }
     static set currentEffect(v){
         if(v){
             effectStack.push(v)
         }else{
             effectStack.pop()
         }
         return true
      }

    static getHandler(obj){

       return  this.handlersByObject.get(toRaw(obj))
    }

    addEffect(effect, key, target){

  
        if(!this.effects.has(effect)) this.effects.add(effect )

        //ad property to the list of observing propertis of the effect
        effect.observeProp(this, key)
      

    }
    
    get(target, key, reciever){

         let value = target[key]
        // let value = Reflect.get(target, key)

        if(interceptors[key]?.["get"]){
            return interceptors[key]["get"].call(this,target, key, value, reciever )
        }



        //trigger get
        const currentEffect = this.constructor.currentEffect


        // if(Array.isArray(target) && target.length == 3) debugger
        if( currentEffect){
                // if(key == "style" &&  this.origin.attrs)debugger
             this.addEffect(currentEffect, key)
            // this.addDeepEffect(currentEffect)

        }   

    
        if(typeof value === "object"){
            return reactive(value, false, this ,key, this.origin,  )
        }

   

       
        if(Array.isArray(target) ){

            // return handleArrayFunctions(key, target, value, this)

        }

        
        return value
    }

    
      


    // apply(target, thisArg, args){

    // }
    set(target, key, value, reciever){

        //trigger update
       

        if(interceptors[key]?.["set"]){
            return interceptors[key]["set"].call(this,target, key, value, reciever,  )
        }


        let oldKey 

        const oldValue = target[key]

        if(Array.isArray(target)){
        
            // if (key === 'length') {
            //     // Handle changes to the array's length, especially when removing elements
            //     updateViewCallback('lengthChange', target);
            // }
              
            //   // Handle direct changes to array elements (e.g., arr[2] = 'new value')
            //   const oldValue = target[key];
            //   target[key] = value;
            // if (oldValue !== value) {
            //     updateViewCallback('elementChange', target, key);
            // }


         
            // if(Array.isArray(target)){
            //   oldKey = target.indexOf(oldValue)
            // }

            // debugger

          
        }


        // Reflect.set(target, key, value)
         target[key] = value

        //has no much difference on performance
        //but it creates so many updates, is better just to send the updat eon the length
        //but with mutations like reverse, sort, etc, I need to send the update
        //just check if is queued
        if(Array.isArray(target) && this.nextUpdate) {

            return true
        }
        console.log("queueeeinggg", target, key, value)
        this.queueMutation({type:"set", target, key,oldKey, value, oldValue, origin:this.origin})
        
        return true
    }
    deleteProperty(target, key) {
        if (key in target) {

                    
            const oldValue = target[key]
            let oldKey 
            if(Array.isArray(target)){
              oldKey = target.indexOf(oldValue)
            }

          delete target[key];


          this.queueMutation( {type: "delete",value:target[key],oldKey, target, key,oldValue,  origin:this.origin} )

          return true
          // Expected output: "property removed: texture"
        }
      }      

    triggerUpdate(){

        // TODO: I think that I can merge all this in to the same funtions, 
        // I don't need deepEffects and effects, just one Set of effects

        //run deep effects
        this.runDeep()

       //handle own effects
        this.effects.forEach(effect=>{


            this.runEffect(effect)

            // effect.updateWithHandler(this)
           
            
        })
       
        this.nextUpdate = false
    }

    static runUpdates(){

        // console.log(":::::RRRRunning update")
        // this.queue.forEach((reactiveHandler )=> {
        //     reactiveHandler.triggerUpdate()
        // })
        // this.queue.length = 0


        while(this.queue.length) {
            const reactiveHandler =  this.queue.shift()
            reactiveHandler.triggerUpdate()
        }
 
        this.updating = false

         Manager.runNextTick()
    }

    

    queueMutation(payload){

        //push mutation to the queue
        ReactiveHandler.queue.includes(this) ||  ReactiveHandler.queue.push(this)


        //prepare set properties changes in this object
        this.nextUpdate = this.nextUpdate || {}
        //  new Proxy({}, {set(t,k,v){
        //     if(k == "more") debugger
        //     return t[k] = v
        // }})


        console.log("neewww", payload, this)
        // if(Array.isArray(payload.target))debugger
        //save payload in an object, so last value update is triggered only
        this.nextUpdate[payload.key] = payload

        if(!ReactiveHandler.updating){
            ReactiveHandler.updating = true
        
            console.time("Collect updates")
            // console.trace();

            // ReactiveHandler.runUpdate()
            // (async ()=>{

            //     ReactiveHandler.runUpdate()
            // })(window)
            //  requestAnimationFrame(()=>{
            //     // console.log("tringgering update")
            //     console.timeEnd("Collect updates")
              
            //     ReactiveHandler.runUpdates()
            //   })

              Promise.resolve().then(()=>{


                console.log("tringgering update")
                console.timeEnd("Collect updates")
              
                ReactiveHandler.runUpdates()
              })
         
        }else{

            console.warn("is this mutation registering", payload)

            // debugger
        }
    }


 }




 function compute(computation){


    let val 

    effect((payload)=>{

        val = computation(payload)
    })

    return val



 }

 function effect(callback, options){

    options = {
        ...(options||{})
    }
     new Effect(callback, options)

 }



 class Effect{

    onTrigger = false
    handler = false
    immediate = true
    deep = false

    static eventTarget = new EventTarget()
    static observingTarget = new WeakMap()

    static setTargetObserver(effect, target){

        target = toRaw(target)

       let handler =  ReactiveHandler.getHandler(target)

       if(handler){

            if(typeof effect == "function")debugger
            handler.addDeepEffect(effect)
            
       }else{

        console.warn("no handler found", target)
       }
      
  
    }
    constructor(source, options){

        const props = ["immediate", "callback",  "onTrigger", "deep", "updater"]

        this.source = source

        if(typeof source == "object"){
            
            this.deep = 1
            Effect.setTargetObserver(this, source)
        }

        props.forEach(prop=>{
            if(options.hasOwnProperty(prop)) this[prop] = options[prop]
        })

        //[handler] - {[key]:true} observing
        this.observing = new WeakMap()

        //initiliaze the effect
        let value = this.runWithPayload({})


        //run callback
        if(this.immediate && this.callback){

            this.callback.call(undefined, {value})
        }

        this.nextUpdate = {}

    }


    runWithPayload(payload, handler){

        //the effect can run on multiple payload, since updats are collected 
        let source = this.source

        let value 

        ReactiveHandler.currentEffect = this

        if(typeof source == "function") value = source(payload, handler)

        this.lastValue = value
         
        //observe result object
       if(this.deep && isReactive(value)){
    
            Effect.setTargetObserver(this, value)
       }

       ReactiveHandler.currentEffect = false

       if(this.callback ){
            this.callback.call(undefined, payload)
        }

       return value

    }
   
    observeProp(reactiveHandler, prop){

        let observing = this.observing.get(reactiveHandler) 
        if(!observing) {
            observing = {}
            this.observing.set(reactiveHandler, observing)
        }

        observing[prop] = true
    }
 }




 function watch(source, callback, runOrOption ){

    const run = typeof runOrOption === "boolean" ? runOrOption : false
   
    
    const options = {
        callback, immediate: run,
        ...(runOrOption ||{})
    }
    let t = typeof source 


    if(t !== "object" && t !== "function"){

        console.warn("watch source must be an object or a function")
        return
    } 
    

    effect(source, options)
    
    
 }





    function set(obj, path, value){
            
        if(!path?.split)debugger
            let keys = path.split(".")

            let target = obj
            let lastKey = keys.pop()
    
            for(let key of keys){
                if(!target) return 
                target = target[key]
            }
    
            target[lastKey] = value

    }


    class Manager{
        static isRendering = false
        static runNextTick(){

            if(this.isRendering ) {
                // setTimeout(()=>this.runNextTick(), 0)
              
                // requestAnimationFrame(()=>{
                //     this.runNextTick()
                // })
                 return
            } 
            this.isRendering = true;


            // const queue = [...Manager.nextTickQueue]
            const queue = Manager.nextTickQueue
             // Execute all the queued callbacks
             //this makes inputs be able to focus on the nextTick
             //this doesn't affect the real time of renderization
             requestAnimationFrame(()=>{
                while ( queue.length) {
                    const callback = queue.shift();
                    callback();  // Run the callback
                }
                 // Mark rendering as done, so further nextTicks can be scheduled
                 this.isRendering = false;
              })

        }
       

       static nextTickQueue = []
    }


    function nextTick(callback){
            
        Manager.nextTickQueue.push(callback)

      
 
    }



    const getCache = new Map()

    Manager.getCache = getCache
    
    function get(obj, path){

        // let cache = getCache.get(obj) 
        
        // if(cache && cache[path]){
        //     return cache[path]
        // }
        if(!path?.split)debugger

        const keys = path.split(".")
        let target = obj

        let val
        for(let key of keys){
            if(!target) {
                val = undefined
                break;
            } 
            target = target[key]
        }

        val = target
        
        // if(!cache){
        //     cache = {}
           
        //     //   getCache.set(obj, {[path]:val})
        // }
        // cache[path] = val

        return val

    }






      function getPrevious(){
        // Select the script element
        const currentScript = document.currentScript;
        // Get the previous sibling element

        return currentScript.previousElementSibling;


      }

      

/**
 * 
  Compile the nodes of the root element into an referenced object

{
  node: <Node>,
  textContent: <String>,
    attrs: {
        <attrName>: <attrValue>,
        ...
    },
    events: {
        <eventName>: <eventHandler>,
        ...
    }
  }
 */


class CompiledRef {
    constructor(){

        this.map = new Map()
        this.idMap = new Map()
    }
    get(v){
        // if(!v?.__sId) debugger
        if(v?.__sId){
            
          return this.idMap.get(v.__sId)
        }
        let attr = v?.getAttribute?v.getAttribute("__sId"):false
        if(attr){
            return this.idMap.get(attr)
        }
       return  this.map.get(v)
    }
    set(k, ref){
         this.map.set(k, ref)

       return  this.idMap.set(ref.id, ref)
    }
    has(v){
        return this.map.has(v)
    }
    getByDepth(id){

        return this.idMap.get(id)

    }
}
const compiledRefs = new CompiledRef()
const updateNodesQueue = new WeakMap()

let idCounter = 0;


const nodeUpdateQueue = []
function registerNodeUpdate(template, node, ctx){

    nodeUpdateQueue.push([template, node, ctx])

}
let runningQueue = false
function updateQueue(ctx){
    
        if(runningQueue)return 
        runningQueue = true
       
        // console.log("running queue")
        // nodeUpdateQueue.reverse()
        while(nodeUpdateQueue.length){
            const [node, cloneOrCtx, childCtx] = nodeUpdateQueue.pop()
      
            if(childCtx){
                
                debugger
                parallelUpdate(node, cloneOrCtx, childCtx)
            }else{

                compiledRefs.get(node).runNodeUpdates(node, childCtx || ctx)

            }
        }

        runningQueue = false
        // nodeUpdateQueue.length = 0
}
function compileHelper(node, isTemplate){


       
        if( node.__sCompiled ) return compiledRefs.get(node)
         //save compiled prop for faster access

        let  nodeRef = {
            updaters:{}
        }
      
    
        //set the id 
        if(node.dataset) {
            // node.dataset.__sId = nodeRef.id
            // node.setAttribute("__sId", nodeRef.id)
        }
    
        let setNode = false

       
        if(node.tagName !== "TEMPLATE") node.__inTemplate = isTemplate



        //compile text nodes
        if ( node.nodeType == node.TEXT_NODE && node.textContent.includes("{{") ) {
         
            setNode = true
    
            let children = fastParse( node.textContent)
            
            children = children.map(child=>{
                if(child.path){
                              
                    const node = document.createTextNode(`{{${child.path}}}`)
                    node.__inTemplate = isTemplate
                    
                    const helper =  new NodeHelper(node )
                    helper.addUpdate("text", {expression:child.path})

                    return node
                }

                const node = document.createTextNode(child)
                node.__inTemplate = isTemplate

                return node
                
            })


             node.replaceWith(...children)
                
        }
    
        //compile other nodes
        if(node.attributes?.length){
           
            let helper 
                
            const attrs = node.attributes; // Get all attributes of the element
            Object.values(attrs).forEach((attr) => {
                let value = attr.value;
                let key = attr.name
    
                //DIRECTIVES
                if(key.startsWith(prefix)){

                        helper = helper || new NodeHelper(node )
                    
                    let directiveKey = key.slice(2)
                    if(directives[directiveKey]){
                        
                        setNode = true

                        helper.addUpdate(directiveKey, {expression:value.slice(2, -2)})
                        
                        node.removeAttribute(key)
                    }
                    return 
                }

                //EVENTS
                if(events[key]){
                    helper = helper || new NodeHelper(node )


                    helper.addUpdate("events", {expression:value, key:key.slice(2) })
                    // nodeRef.events = nodeRef.events || {}
                    // nodeRef.events[key.slice(2)] = value
                    
                    node.removeAttribute(key)
                    return 
                }

                //ATTRIBUTES
                if(value.includes("{{")){
                    helper = helper || new NodeHelper(node )

                    helper.addUpdate("attrs", {expression:value.trim().slice(2, -2), key,})
                    // dynamic =  value.trim().slice(2, -2) || false

           
                }
                
            })
        }


        if(node.tagName == "TEMPLATE"){

            // const templateRef = document.createElement("reactive-template")
            const templateRef = document.createComment("template")
       
            templateRef.__inTemplate = isTemplate
            const ref = compiledRefs.get(node)
            node.replaceWith(templateRef)
            templateRef.__sId = ref.id

            templateRef.id= ref.id

            registerNodeUpdate(templateRef)

            ref.root = templateRef


            // templateRef.setAttribute("id", ref.id)
    
             document.body.append(node)
           
        }

        return {}
    
}

function compileHelpers(root){

    let isTemplate = false
    fastTraverseDOM(root, (node)=>{
      

         

        if(node.parentNode?.nodeType === 11 || node.textContent =="template" ) isTemplate = node.parentNode
        if(node.previousSibling?.tagName == "TEMPLATE" || node.previousSibling?.textContent =="template") isTemplate = false
   
        compileHelper(node , isTemplate) 
        
    })


    return compiledRefs


}




      /**
       * 
       *
       * Update order from chatgpt
       
        Style Updates: Apply layout-affecting styles first (e.g., width, height, display).
        Class Updates: Modify classes next (especially if they affect styles or layout).
        Child Modifications: Add, remove, or reorder child nodes.
        Text Content Updates: Update the text content or innerHTML (after structural changes).
        Other Attributes: Modify attributes that don’t affect layout (e.g., data-*, aria-*).
        Event Listeners: Add event listeners last, after the DOM is fully updated.
       */
        function runUpdates(ctx){
        

            let {show, text, loop,attrs } =  NodeUpdater.updaters
             //update attrs
     
             
             // //show
             // NodeUpdater.updaters
     
             // Object.values(NodeUpdater.updaters).forEach(updater=>{
             //     updater.runUpdate(ctx)
             // })
     
            //  debugger
            //  nodeUpdateQueue.forEach(([node])=>{
                
            //  })
             updateQueue(ctx)
            //  compiledRefs.map.forEach(ref=>{
            //     if(ref.inTemplate)return
            //      ref.runNodeUpdates(ref.node, ctx)
            //  })
     
     
     
             // show.runUpdate(ctx)
            
     
             // loop.runUpdate(ctx)
     
             // attrs.runUpdate(ctx)
     
     
             // text.runUpdate(ctx)
     
             //event listeners
             
           }


/**
 * 


{
    childNodes:[
        Node{
            childNodes:[
                 Node{
                 },
                 Node{
                 }
            ]
        }
        NextNode{

        }
    ]
}

 */


//this will create a an stack like this

/**
 * 
 * 
 * 
 */

//generates a stack like  stack = [child1, child2, child3, parent]

function fastTraverseDOM(root, processNode) {


    const stack = [root];
    

    while (stack.length > 0) {

        let  node = stack.pop();
    
       
        //is is an element instead of a template
        if( node.hasAttribute && node.hasAttribute("s-loop") && node.tagName !== "TEMPLATE"){
            // let ref =  document.createTextNode("")
            const newTemplate = document.createElement("template")
            // let newTemplate = document.createDocumentFragment()

            newTemplate.setAttribute("s-loop", node.getAttribute("s-loop"))

    
            //remove s-llop to avoid inifinite loop
            node.removeAttribute("s-loop")
            node.after(newTemplate)
            newTemplate.content.appendChild(node)


            node = newTemplate



        }


         //also process template children
         const childNodes = (node.tagName == "TEMPLATE" )? node.content.childNodes:node.childNodes


        //set a node id
         processNode(node );

       
        // Push child nodes to the stack in reverse order
        // This ensures we process them in the correct order when popping       
        for (let i = childNodes.length - 1; i >= 0; i--) {

             stack.push(childNodes[i]);
        }


    

    }

  

}




//converts a string text that contain "{{some}}" into multiple text nodes
function fastParse(str) {
    let result = [];
    let start = 0;
    let openBrace = str.indexOf('{{');
    
    while (openBrace !== -1) {
        if (start !== openBrace) {
            const noExpression= str.slice(start, openBrace)
            // result.push(document.createTextNode(noExpression));
            result.push(noExpression);
        }
        
        let closeBrace = str.indexOf('}}', openBrace);
        if (closeBrace === -1) break;
        
        let path = str.slice(openBrace + 2, closeBrace).trim();
         result.push({path});
        // result.push(document.createTextNode(path))
        start = closeBrace + 2;
        openBrace = str.indexOf('{{', start);
    }
    
    if (start < str.length) {
        const noExpression= str.slice(start)
        result.push(noExpression)
        // result.push(document.createTextNode(noExpression));
    }
    
    return result;
}







function createComponent(template){

    

  customElements.define(
    "reactive-template",
    class extends HTMLElement {
    static observedAttributes = ["id"];
      constructor() {
        super();

        debugger
        // let template = document.getElementById("custom-paragraph");
        // let templateContent = template.content;
  
        // const shadowRoot = this.attachShadow({ mode: "open" });
        // shadowRoot.appendChild(templateContent.cloneNode(true));
      }
      attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
        if(name == "id"){
            let ref = compiledRefs.idMap.get(newValue)
            if(!ref) debugger
            let template = ref.node 

            
            // const shadowRoot = this.attachShadow({ mode: "open" });
            // shadowRoot.appendChild(templateContent.cloneNode(true));
         
            this.replaceWith(template.content.cloneNode(true))
        }
      }
    },
  );



  }



  function updateNode(root, ctx){


    const stack = [root]

    while(stack.length){
        const node = stack.pop()
        const ref = compiledRefs.get(node)

        if(ref){


             ref.runNodeUpdates(node, ctx, true)
        }
        // const childNodes = (node.tagName == "TEMPLATE" )? node.content.childNodes:node.childNodes
        const childNodes = node.childNodes

        for(let i = childNodes?.length - 1; i >= 0; i--){
           
            stack.push(childNodes[i])
           
        }
    }
  }

function parallelTraverse(root, clone, callback){

    let stack = [[root, clone]]
    while(stack.length){
        let [node, clone] = stack.pop()

        if(!clone?.childNodes)debugger
        let children = node.childNodes
        let cloneChildren = clone.childNodes

        callback(node, clone)

        for(let i = children.length - 1; i >= 0; i--){
            stack.push([children[i], cloneChildren[i]])
        }
    }

}

function  cloneDeep(template, callback, ){ 


    const stack = [[template]]
    let root 
   while(stack.length){
        let [node,parent, ] = stack.pop()

        if(!node)debugger
        const isTemplate = node.tagName == "TEMPLATE" 

        //do not clone templates
        const newNode = isTemplate?node: node.cloneNode()
        const ref = compiledRefs.get(node)

        if(ref) newNode.__sId = ref.id

        if(!root) {
            root = newNode
           
        }
        
        if( parent && !parent.__inTemplate && !isTemplate) {
            parent.appendChild(newNode)
        }
       
     
        //IF IS A TEMPLATE, PASS the parent of the template as a parent
        const nodeParent = node.tagName == "TEMPLATE"?newNode.parentNode:newNode
        //get child nodes of the fragment
        const childNodes = (node.tagName == "TEMPLATE" )? node.content.childNodes:node.childNodes

        if(callback) callback(newNode, ref, )

        if(node.textContent == "template") {
            debugger
            continue
        }
        if(isTemplate){
            debugger
        };
        


        for(let i = childNodes?.length - 1; i >= 0; i--){
                       
            stack.push([childNodes[i], nodeParent])
           
        }
    }

    return root

}








      class NodeHelper{

        // directives = false
        // attrs = false
        // events = false
        // textContent = false

        node = false
        updates = []


        constructor(node, updaters = {}){

            const validOptions = [ "updaters"]


   
            this.id = `id-${idCounter++}`
         
            this.node = node


            if(node.inTemplate) this.inTemplate = true
            else if(node.tagName !== "TEMPLATE") {

                registerNodeUpdate(node)
            }
            // if(updaters){
            //     Object.entries(updaters).forEach(([id, updater])=>{
            //         this.addUpdate(id, updater)
            //     })
            // }

            compiledRefs.set(node, this)
            node.__sCompiled 
            // Object.keys(options).forEach(key => {
            //     if(validOptions.includes(key)) this[key] = options[key]
            // });

        }
        addUpdate(id, config){

            let updater = NodeUpdater.getInstance(id)

            if(!updater){
                console.warn(`Updater ${id} not found`)
                return
            }


            const payload =  updater.registerHelper(this, config)
     
            this.updates.push({updater, payload})
        }
        runNodeUpdates(node, ctx, force){
    
            if(!node.__sId) node.__sId = this.id
            Object.values(this.updates).forEach(update=>{
               
                if(force){
                    update.updater.forceUpdate(node, update.payload ,ctx )
                }else{
                   
                    update.updater.runNodeUpdate(node, update.payload ,ctx, update )
                }
            })

        }
    
      


      }

      /**
       * IMPORTANT:
       * 
       Summary of Optimal Update Order:
        Styles (especially layout-affecting styles like width, height, margin)
        Classes (if they affect styles or layout)
        Text Content (textContent or innerHTML)
        Other Attributes (e.g., data-*, aria-*, non-layout attributes)
       */

    class NodeUpdater{
        priority = 10

        static updaters = {}
        constructor(options){
            this.constructor.updaters[options.id] = this

            this.updateFunction = options.updateFunction

            let validOptions = ["getValue", "resolveExpression", "effect", "type", "priority", "id"]
            Object.keys(options).forEach(key => {
                // if(!validOptions.includes(key)) return
                      this[key] = options[key]
 
            });
        }
        static getInstance(id){
           return  this.updaters[id] 
        }
        type = false // text or attribute or false //with false you handle the 
        init(ctx){

        }
    
        
        updateFunction(){

            console.warn("Update function not created for this nodeUpdater")
            
        }
        
    
  
       
   
        nodes = new WeakMap()
        registerHelper(helper, payload){

            const[exp, debug] = payload.expression.split(":")
            payload.expression = exp
            payload.debug = debug

            this.registerExpression( exp )
            // this.nodes.push({node, payload})

            const raw = exp
            const expression = this.expressions[raw]

            return {...payload, expression, raw, helper}
        }
        getNodeObject(node){
            if(this.nodes.has(node)){
                return this.nodes.get(node)
            }
            const obj = { expressions:{}}
            this.nodes.set(node, obj)
            return obj
        }
        
        getUpdatePayload(){
            return {
                ctx:this.ctx,
            }
        }
        runUpdate(ctx){

            this.nodes.forEach(({node, payload})=>{

                 this.runNodeUpdate(node, payload, ctx)
            })
        }

        effect(){
            return this.getValue(...arguments)
        }
        getValue({expression,} , data){
            
            return get(data, expression)
        }
      
        getPropertyTarget(obj, prop){

            while(!obj.hasOwnProperty(prop)){
                
               if( obj.hasOwnProperty(prop)) return obj
               let proto = Object.getPrototypeOf(obj)
               if(proto) obj = proto
               else return obj
            }
            return obj
        }

        getValueWithPayload( payload, ctx){
            
            let expression = payload.expression || payload
            const raw = expression
            expression = this.expressions[expression]

            return this.getValue(payload, ctx.data)
        }

        expressions = {}
        registerExpression( expression){

            if(this.expressions[expression] ) return 
            
            let expressionValue = expression
            if(this.resolveExpression) expressionValue = this.resolveExpression(expression)

            this.expressions[expression] = expressionValue

        }

        forceUpdate(node, payload, ctx){

            if(node.__inTemplate) {                    
               return;
            }
                     
           const value = this.getValueWithPayload( payload, ctx)
                                      
           this.updateFunction(node, { value} ,payload, ctx)


        }

        runNodeUpdate(node, payload, ctx, originalUpdate){

                 if(node.__inTemplate) {                    
                    return;
                 }
                         
                const value = this.getValueWithPayload( payload, ctx)
                 
                //filter by original update object and node to avoid adding new updates
                let nodeObj =this.getNodeObject(node)

                if(nodeObj.originalUpdate) {

                    return
                } 

                nodeObj.originalUpdate = originalUpdate


                //skip the ones that just need one update
                if(!this.effect)  {
                    this.updateFunction(node, {value}, payload, ctx)
                    return
                }
                
                //SAVE update BY ORIGINAL UPDATE
                const updatesByOriginal = this._effectUpdates = this._effectUpdates || new WeakMap()

            
                let createEffect = !updatesByOriginal.get(originalUpdate)

                let updates = updatesByOriginal.get(originalUpdate) 

                if(!updates){
                    updates = []
                    updatesByOriginal.set(originalUpdate, updates)
                }


                // if(node.nodeType == node.TEXT_NODE && raw == "attrs") debugger

    
                updates.push({payload, node, ctx})
                
                this.updateFunction(node, {value}, payload, ctx)
                if(!createEffect) {
          
                //    if(raw.includes("task,")) console.log("skipping effect",raw, node)
                    return 
                }
  

                if(payload.expression.includes(","))debugger
        
                if(!this.effect)debugger
   
                     watch( 
                        //    this.effect({expression, data:ctx.data})
                             ()=>{
                             
                                return this.getValueWithPayload( payload, ctx)
                             }
                            //  ()=>this.updateFunction(node, {value}, payload, ctx)
                        
                        , (updatePayload)=>{
                                      
                         
                            const updates = updatesByOriginal.get(originalUpdate)
                            
                            //IMPORTANT: updates only sould be larger than one  for loops
                            //so basically this is a loop feature and I can check index
                            //to skip other updates
                            //run mulitple updates of the same nodeHelper update with the same effect
                            updates.forEach(({node, payload, ctx}, index)=>{
                              
                                // if(updates.length > 1 && index != updatePayload.key) return
                                const value = this.getValueWithPayload( payload, ctx)
                                                       
                                if(payload.debug) debugger

                                this.updateFunction(node, {...updatePayload, value} ,payload, ctx)
                            })
                            
                    },{deep:this.deep ?? true, updater:this})
          

                   
            

        }

      }



      const textUpdater = new NodeUpdater({

            priority:3,
            id:"text",
            updateFunction(node , { value}, {expression, debug}, ctx){

                if(debug)debugger
                if(node.dataset && node.dataset.la )debugger
                // value = get(ctx.data, expression)
                if(value && value.attrs) debugger
                if(typeof value == "object") value = JSON.stringify(value)

                // if(value?.includes && value.includes("{{")){
                //     value = value.split(/({{.+?}})/g).reduce((c, v)=>{
                //         if(!v.includes("{{"))return c+v
                //         const path = v.slice(2, -2)
                //         return c + get(ctx.data, path)
                //     }, "")
                // }

                node.textContent = value
            }
      })

      const attrsUpdater = new NodeUpdater({
            
            priority:4,
            id:"attrs",
            updateFunction(node,{value, oldValue}, { key,expression, }, ctx){

       
                // if(value === oldValue)return
                if(key == "onkeypress")debugger
                node.setAttribute(key, value)
                if(key == "value"){
                     node.value = value

                    if(!node.__inputEvent){

                        node.__inputEvent = true
                        nextTick(()=>{
                            node.addEventListener("input", (e)=>{
                                 console.log(ctx.data, expression, e.target.value)
                                set(ctx.data, expression , e.target.value)  
                                nextTick(()=>{
                                    
                                     node.focus()
                                })
                            })
                        })
                    }
                    
                }
                
            }
      })


      const listenerRefs = new Map()
      const eventsUpdater = new NodeUpdater({

            priority:5,
            id:"events",
            effect:false,
            updateFunction(node, { value}, { expression, key, }, ctx){

                nextTick(()=>{
                    this.setupEvent(node, key, expression,  ctx)
                })
                
            },

      })

      Object.assign(eventsUpdater,{
        setupEvent(node, event,expression, context){

            let nodeRef = this.nodes.get(node)
            if(!nodeRef) {
                nodeRef = {}
                listenerRefs.set(node, nodeRef)
            }

            const eventName = event
            const listening = nodeRef.listening = nodeRef.listening || {}
            const ctx = context.data
            if(listening[event]){
                if(listening[event].includes(node)) return
                listening[event].push(node)
        
               const fn =  nodeRef.eventCallbacks[event] 
                
                nextTick(()=>{
                        node.addEventListener(eventName,  (e)=>{
                            
                            // console.log("evenntntntntnntntnt", e, eventName)
                         if( !listeners.includes(node))return 
                        fn.call(ctx, e,  node, ctx)    
                    })
                })
               
                return 
            }
            const listeners = listening[event] = listening[event]  ||  []
        
            if(nodeRef.listening[event].includes(node) )return 
           
            nodeRef.listening[event].push(node)
        
        
            const value = expression
        
        
            if(!events["on"+event]) {
                console.warn(`Event ${event} not found`)
                return  
            } 
        
        
        
            const fn = this.getEventFunction(value)
        
            nodeRef.eventCallbacks = nodeRef.eventCallbacks || {}
            nodeRef.eventCallbacks[event] = fn
           
            nextTick(()=>{
    
                node.addEventListener(eventName,  (e)=>{
        
                    // console.log("evenntntntntnntntnt", node, e, eventName)
                    if( !listeners.includes(node))return 
                   fn.call(ctx, e,  node, ctx )    
               })
            })
        
        
        },
        getEventFunction(value){

            let isExpression, isAnonymous,  isNamed, isFunction, caller = "";
            if(value.startsWith("(")) isAnonymous = true
            if(value.match(/^[a-zA-Z]/)) isNamed = true
             if(!value.includes("(")) caller = "(event, node)"
        
             let args = ""
           
            let stringFn = `this.${value}${caller}`
            
           if(isAnonymous){
        
                args = value.match(/\{.+\(([^)]+)\)/)?.[1] || ""
            
                stringFn =`(${value})(event)`
            }
           
            if(isNamed){
                args = value.match(/\(([^)]+)\)/)?.[1] || ""
            }
        
        
            const code =  `
            
                let {${args}} = this
        
                ${stringFn}   
            `
            const  fn = new Function("event",  "node", "ctx", "window" , code )
        
            return fn
        
        }
      })



      //directive updaters
      Object.entries(directives).forEach(([key, value])=>{

            new NodeUpdater({id:key, ...value})
      })

  

      


      function toRaw(obj){
        if(typeof obj != "object") return obj

        return obj.__raw || obj

      }



  

      function compare(source, target) {
        const toAdd = [];
        const toRemove = [];
        const toReposition = [];
        const toKeep = [];
        const types = new Set(); // Store unique types of values
        const jobs = new Set();
      
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
                jobs.add("keep")
              } else {
                // Different position -> toReposition
                toReposition.push([i, sourceValue, targetIndex, target[targetIndex]]);
                jobs.add("move")
              }
              // Remove it from the targetMap to track unvisited elements
              targetMap.delete(sourceValue);
            } else {
              // Element not found in the target array -> toAdd
              toAdd.push([i, sourceValue]);
              jobs.add("add")
            }
          }
      
          // Step 3: Remaining elements in the targetMap are toRemove (index, value)
          targetMap.forEach(( index, value) => {
            types.add(typeof value); // Track unique types

            if(typeof index =="object")debugger
            toRemove.push([index, value]);  // Correct order: [index, value]
            jobs.add("remove")
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
                jobs.add("keep")
              } else {
                // Different value -> toReposition
                toReposition.push([key, source[key], key, target[key]]);
                jobs.add("move")
              }
              targetKeySet.delete(key);  // Mark key as visited
            } else {
              // Key exists in source but not in target -> toAdd
              toAdd.push([key, source[key]]);
              jobs.add("add")
            }
          });
      
          // Step 2: Remaining keys in targetKeySet -> toRemove (key, value)
          targetKeySet.forEach((key) => {
            types.add(typeof target[key]); // Track unique types for target
            toRemove.push([key, target[key]]);  // Correct order: [key, value]
            jobs.add("remove")
          });
        }
      
        return {
            jobs: Array.from(jobs),
          toAdd,
          toRemove,
          toReposition,
          toKeep,
          types: Array.from(types)  // Return unique types as an array
        };
      }
      
  function parallelUpdate(template, newNode, ctx){

    parallelTraverse(template, newNode, (node, clone)=>{

        let ref = compiledRefs.get(node)
        if(!newNode)debugger
    
        if(ref){

            ref.runNodeUpdates(clone, ctx)
        }
    
      })
  }


  function check(root){

    const stack = [root]
    const nodes = []
    while(stack.length){
        const node = stack.pop()

        const childNodes = node.tagName == "TEMPLATE"?node.content.childNodes: node.childNodes

        if(!node.__inTemplate)nodes.push(node)
        for(let i = childNodes?.length - 1; i >= 0; i--){
           
            stack.push(childNodes[i])
           
        }
    }

    return nodes

  }

