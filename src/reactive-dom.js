
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
        getValue( ctx, expression){

            const [ loopKey, loopIndex, path ] = expression

            return get(ctx.data, path)
        
        },
 
        createChildContext({ item,ctx, loopKey, loopIndex, key}){


            let childData = reactive({ 
                [loopKey]:item, 
                 [loopIndex]:key,
                }, (payload)=>{

                    // debugger
                }
        )


           Object.setPrototypeOf(  childData,ctx.data)

                // debugger
            let childCtx = {data:childData, isLoop:true}

            return childCtx 
         
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

             const loop = Object.values(items)
            const comparison = myCompare( last, loop, true)

            // const comparison = minimalMovesToTransformArray(last, loop)
            const jobs = comparison.jobs
             console.timeEnd("Comparison")

             const indexMap = nodeObj.indexMap = nodeObj.indexMap || new Map()
            const valueMap = nodeObj.indexValue = nodeObj.indexValue || new Map()

             const oneJob = jobs.size === 1?[...jobs][0]:false

             this.currentIsNested = this.isNested
             this.isNested = true
  
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


             console.log("UPDATE LOOP", {comparison, indexMap, items,  last, loop})

            // if(jobs.size === 0) {
            //     console.warn("whyyyyy")
            //     return
            // }
            const newUpdate = [] 


         


            const groupState = {
                indexGroup:false,
                lastInGroup:0
            }

            comparison.remove.forEach(([index, item])=>{
                const obj = indexMap.get(index)

                nextTick(()=>{
                    
                    obj.nodes.forEach(node=>node.remove())
                    indexMap.delete(index)
                })

            })



            //items that are not moved manually moved becaause are pushed up the array
            comparison.updated.forEach(( [from,  to, item])=>{

                const obj = indexMap.get(from)

                // debugger
                 obj.ctx.data[loopIndex] = to

                 nextTick(()=>{
                     indexMap.set(to, obj)
                    // obj.ctx.data[loopIndex] = index
                 })
          
            })

            //items that especified to be moved
            const entireMove = comparison.move.length == items.length
         
            comparison.move.forEach(( [fromIndex,toIndex])=>{

    
                const obj = indexMap.get(fromIndex)
                const toObj = indexMap.get(toIndex)
                // debugger

                 //add reference
                 const fromRef = new Text("")
                 obj.ref = fromRef
                 obj.nodes[0].before(fromRef)
       
                //place nodes
                 const ref = toObj.ref || toObj.nodes[0]
                
                 const newNode = document.createDocumentFragment()
                 newNode.append(...obj.nodes)


                 //index is not update
                //  this.addToUpdate(newNode, fromIndex, newUpdate, groupState , indexMap, node)
                 ref.before(...obj.nodes)
                //  if(entireMove){
                //  }else{
                //     ref.before(...obj.nodes)
                //  }
             

                 obj.ctx.data[loopIndex] = toIndex


                 nextTick(()=>{
                     indexMap.set(toIndex, obj)

                     obj.ref.remove()
                    delete obj.ref
                 })
          
            })

            
            comparison.add.forEach(([index, item])=>{
                index = parseInt(index) // ensure integers

                if(typeof index === "string") {

                   throw new Error("Index must be a number")
                }

              

                   //create a new context
                   const childCtx = this.createChildContext({path, item,ctx, loopKey, loopIndex, key:index})

                   //create a node
                   const newNode =  template.cloneNode(true)
                   //   registerNodeUpdate(child, childCtx)
                   template.childNodes.forEach((child, i)=>{
                        parallelUpdate(child, newNode.childNodes[i], childCtx)
                    })
                  
                   this.addToUpdate(newNode, index, newUpdate, groupState , indexMap, node)
                   


                   const obj =  {
                       nodes:[...newNode.childNodes], 
                       ctx:childCtx,
                       item,
                    //    index
                   }

                //    valueMap.set(item, obj)
                   indexMap.set(index, obj)
            })



            // newUpdate.forEach((group, index)=>{


                
            //    debugger 
            // })

            
            if(!this.currentIsNested){
                
                this.updateLoop( newUpdate)

                nextTick(()=> this.isNested = false)

            }else{
                // debugger
    
                this.updateLoop(newUpdate)
                
            }
    
        
            nodeObj.lastLoop  = loop
            
        },
        addToUpdate(newNode, index, newUpdate, groupState , indexMap, node){
            let { indexGroup, lastInGroup} = groupState
              //create a group index
              if( indexGroup === false || index > (lastInGroup + 1) ){
                indexGroup = groupState.indexGroup = index 
                newUpdate[indexGroup] = newUpdate[indexGroup] || {nodes:[]}
            
            }

            debugger

            const group = newUpdate[indexGroup] 
            //add rerefence where to attach new group
            if(!group.ref){

                //index group found or node
                const obj = indexMap.get(index)
    
                group.ref = obj?.ref || obj?.nodes[0] || node
            }

            groupState.lastInGroup = index

             group.nodes.push(newNode)
        },
        updateLoop( newUpdate){

        
            newUpdate.forEach((group, index)=>{
                const {nodes, ref} = group
      
                ref.before(...nodes)
            }) 


  
        }
        

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
    if(!obj)return  

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

        if(typeof this.target != "object")debugger
    
        this.constructor.handlersByObject.set(this.target, this)
    }
  
    //use the handler to run the logic, since the handler has control on the time and data to update
    runEffect(effect, depth , payload){

        if(effect.ran) return
        nextTick(()=> effect.ran = false)//setTimeout(()=> effect.ran = false)

        
        const isFunction = typeof effect == "function" 
        const deep = isFunction?true:effect.deep
        if(depth && deep){
     
            //check depth
            if( deep !== true && depth > deep)  return

            this.runNextUpdate(effect, depth, false, payload)            

        }
        //without depth only run the obersving props
        if(!depth){

            const observingProps = effect.observing.get( this)

            this.runNextUpdate(effect, 0, observingProps, payload)

        }
  

       
    }

    runDeep(){

            //generate an inverted deep   // src/explanations.txt #invertedDeep
            let deep = 1
            let current = this
            const parents = []
    
            // let path = []
            let path = false
            while(current){

                if(current.key){
                    // path.unshift(current.key)
                    if(!path ) path = current.key
                    else path = `${current.key}.${path}`
                }
                
                parents.push([current, deep, path])
                current = current.parent
                deep++
            }

            //run first main parent effect
            parents.reverse()
    
            parents.forEach(([handler, depth, path])=>{

                const payload = {path, sourceTarget:handler.target}
                
                handler.deepEffects.forEach(effect=>{

                    this.runEffect(effect, depth, payload)
              
                })
            })
    }

    runNextUpdate(effect, depth,observingProps , payload ){

     
        if(!observingProps){
            observingProps = this.nextUpdate
        }
 
        
        Object.keys(observingProps).forEach((key)=>{

            if(!observingProps[key])return 
            if(!this.nextUpdate.hasOwnProperty(key)) return 

            // const payload = depth?this.target: this.nextUpdate[key]
            if(!payload) payload = this.nextUpdate[key]
            else Object.assign(payload, this.nextUpdate[key])

            if(typeof effect == "function"){
                effect(payload, this)
                return 
            }
            effect.runWithPayload(payload, this)
        })


    }

    addDeepEffect(deepEffect){
        

        const deepEffects = this.deepEffects
        if(typeof deepEffect  == "function" || deepEffect instanceof Effect){
        
            // if(deepEffect.toString().includes("update child")) debugger
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

            // if(key == "i") debugger
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

  
        if(interceptors[key]?.["set"]){
            return interceptors[key]["set"].call(this,target, key, value, reciever,  )
        }


        const oldValue = target[key]

        // Reflect.set(target, key, value)
         target[key] = value

        //has no much difference on performance
        //but it creates so many updates, is better just to send the updat eon the length
        //but with mutations like reverse, sort, etc, I need to send the update
        //just check if is queued
        if(Array.isArray(target) && this.nextUpdate) {

            return true
        }

        this.queueMutation({type:"set", target, key, value, oldValue, origin:this.origin})
        
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

         if(Array.isArray(target) && this.nextUpdate) {

            return true
        }
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

            //Like this looks better, 
            //request animation frame can go on the loop, so first will happen the updates
            //and then at requestAnimationFrame, will be appended.
              Promise.resolve().then(()=>{


                console.log("tringgering update")
                console.timeEnd("Collect updates")
              
                ReactiveHandler.runUpdates()
              })
         
        }else{

            // console.warn("is this mutation registering", payload)

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
     return new Effect(callback, options)

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
        let value = this.run()


        //run callback
        if(this.immediate && this.callback){

            this.callback.call(undefined, {value})
        }

        this.nextUpdate = {}

    }

    run(payload = {}, handler){

         //the effect can run on multiple payload, since updats are collected 
        const source = this.source

        let value 

        ReactiveHandler.currentEffect = this

        if(typeof source == "function") value = source(payload, handler)

        this.lastValue = value
         
        //observe result object
       if(this.deep && isReactive(value)){
    
            Effect.setTargetObserver(this, value)
       }

       ReactiveHandler.currentEffect = false


    }

    runWithPayload(payload, handler){

        this.run(payload, handler )

       if(  this.callback ){
            this.callback.call(undefined, payload)
        }

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
    

   return effect(source, options)
    
    
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
                //  setTimeout(()=>this.runNextTick(), 0)
              
                // requestAnimationFrame(()=>{
                //     this.runNextTick()
                // })
                 return
            } 
            this.isRendering = true;


            //  const queue = [...Manager.nextTickQueue]
            //  //reset queue
            //  Manager.nextTickQueue.length = 0
             const queue = Manager.nextTickQueue
             // Execute all the queued callbacks
             //this makes inputs be able to focus on the nextTick
             //this doesn't affect the real time of renderization
             setTimeout(()=>{
                while ( queue.length) {
                    const callback = queue.shift();
                    if(!callback?.call){
                        
                        continue;
                    }
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

        if(Manager.isRendering){
        //    setTimeout( ()=>Manager.runNextTick(), 0)
        }

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


                if(ctx){
                    compiledRefs.get(node).runNodeUpdates(node, childCtx || ctx)
                }else{
                    updateNode(node, cloneOrCtx)
                }

                // updateNode(node, cloneOrCtx)

                // compiledRefs.get(node).runNodeUpdates(node, childCtx || ctx)

            }
        }

        runningQueue = false
        // nodeUpdateQueue.length = 0
}
function compileHelper(node, isTemplate){

       
        if( node.__sCompiled ) return compiledRefs.get(node)
         //save compiled prop for faster access

        //set the id 
        if(node.dataset) {
            // node.dataset.__sId = nodeRef.id
            // node.setAttribute("__sId", nodeRef.id)
        }

       
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
                    helper.addUpdate("text", child.path)

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

                        helper.addUpdate(directiveKey, value.slice(2, -2))
                        
                        node.removeAttribute(key)
                    }
                    return 
                }



                //EVENTS
                if(events[key]){
                    helper = helper || new NodeHelper(node )
                    

                    helper.addUpdate("events", value, {key:key.slice(2) })
                    
                    node.removeAttribute(key)
                    return 
                }


                //ATTRIBUTES
                if(value.includes("{{")){
                    helper = helper || new NodeHelper(node )

                    helper.addUpdate("attrs",value.trim().slice(2, -2),  { key})
                
           
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
       

             updateQueue(ctx)
       
             
           }



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


    if(!Array.isArray(root)) root = [root]
    const stack = [...root]

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

        constructor(node, updaters = {}){

            this.id = `id-${idCounter++}`
         
            this.node = node
            this.updates = new Set();

            if(node.inTemplate) this.inTemplate = true
            else if(node.tagName !== "TEMPLATE") {

                registerNodeUpdate(node)
            }

            compiledRefs.set(node, this)
            node.__sCompiled 

        }
        addUpdate(id, expression, config){

            let updater = NodeUpdater.getInstance(id)

            if(!updater){
                console.warn(`Updater ${id} not found`)
                return
            }
    
            const update =  new NodeUpdate(updater, expression, config)

            update.helper = this

            this.updates.add(update)

        }
        runNodeUpdates(node, ctx, force){
    
            if(!node.__sId) node.__sId = this.id
            this.updates.forEach(update=>{
               
                if(force){
                    update.forceUpdate(node ,ctx )
                }else{
                   
                    update.setupNode(node, ctx)

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
        static updaters = {}
        priority = 10
 
        constructor(options){
            this.constructor.updaters[options.id] = this

            this.updateFunction = options.updateFunction

            // let validOptions = ["getValue", "resolveExpression", "effect", "type", "priority", "id"]
            Object.keys(options).forEach(key => {
                // if(!validOptions.includes(key)) return
                      this[key] = options[key]
 
            });
        }

        static getInstance(id){
           return  this.updaters[id] 
        }
           
        updateFunction(){

            console.warn("Update function not created for this nodeUpdater")
            
        }
        
        nodes = new WeakMap()
    
        getNodeObject(node){
            if(this.nodes.has(node)){
                return this.nodes.get(node)
            }
            const obj = { expressions:{}}
            this.nodes.set(node, obj)
            return obj
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

        resolveExpression(expression){

            expression = expression.trim()

            if(expression.startsWith("(")){

                return new Function("return " + expression)
            }

            return expression
        }
        

      }




  class Context {
   
    
    constructor(ctx ){
    


    }

}




class NodeUpdate {
    constructor( updater, rawExpression, config ){
    
       
        this.ctxs = new Set()
        this.ctxNodes = new WeakMap()
        this.updater = updater

        const[exp, debug] = rawExpression.split(":")

        this.debug = debug
        this.raw = exp   
       
        if(config) this.config = config

        this.expression = updater.resolveExpression(exp)

    }

    forceUpdate(node, ctx){

        //no rerun update on ones without effect
        if(this.updater.effect === false) return


        if(node.__inTemplate) {                    
           return;
        }
        const updater = this.updater
                 
       const value = this.getValue(ctx)
                        
       if(!updater.updateFunction)debugger
       
        updater.updateFunction(node, { value} ,this, ctx)


    }

    getValue(ctx){

       
        if( this.updater.getValue) return this.updater.getValue(ctx, this.expression)


        if(typeof this.expression == "function"){

            return this.expression.call(ctx.data)
        }


        return get(ctx.data, this.expression)
       
     
    }

    //steup the effect of that expression for each context
    setupEffect( ctx){

    

        if(this.ctxNodes.has(ctx)) return  this.ctxNodes.get(ctx)

        const nodes = new Set()
        this.ctxNodes.set(ctx, nodes)

        if(this.updater.effect === false) return nodes


        this.effect = watch(
                ()=>this.getValue(ctx),

                (payload)=>{

                //   if(this.expression == "attrs")debugger
                    //update each node
                    // this.ctxs.forEach(ctx=>{
                       
                    // })
                    this.ctxNodes.get(ctx).forEach((node)=>{
                        const value = this.getValue(ctx)
                        //do not use effect.lastValue, since effect is shared across the ctxs

                        this.updater.updateFunction(node, {value}, this, ctx)

                    })
                },
                {
                    deep:this.updater.deep ?? true, 
                    updater:this.updater,   
                }
            
        )

        return nodes

    }
    getCtxNodes(ctx){

        if(this.ctxNodes.has(ctx)) return  this.ctxNodes.get(ctx)
        
        const nodes = new Set()
        this.ctxNodes.set(ctx, nodes)

        return nodes

    }
    setupNode(node , ctx){

        const nodes = this.setupEffect(ctx)

        if(nodes.has(node) ) return    

        this.setupEffect(ctx)

        nodes.add(node)

        this.updater.updateFunction(node, {value: this.effect?.lastValue}, this, ctx)
    

    }



    removeNode(){

        
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
                // if(typeof expression == "function"){

                //     debugger
                //     value = value.call(ctx.data)
                // }

                if(value && typeof value == "object") value = JSON.stringify(value)

   
                // if(value?.includes && value.includes("{{")){
                //     value = value.split(/({{.+?}})/g).reduce((c, v)=>{
                //         if(!v.includes("{{"))return c+v
                //         const path = v.slice(2, -2)
                //         return c + get(ctx.data, path)
                //     }, "")
                // }
                
                if(!value && value !== 0) value = ""

                
                node.textContent = value
            }
      })

      const attrsUpdater = new NodeUpdater({
            
            priority:4,
            id:"attrs",
            updateFunction(node,{value, oldValue}, { config,expression, }, ctx){

                const key = config.key
       
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

                                 const value = getValueByInputType(e.target)
                                set(ctx.data, expression , value)  

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

            // setupNode(node, payload, ctx, originalUpdate){

            //     if(node.__inTemplate) {  
            //         console.warn("klasdjklajsdklan eventntt")                  
            //         return;
            //      }
                      
            //      this.updateFunction(node, payload, ctx)
                
            // },
            forceUpdate(){
                //do nothing on an update
            },
            updateFunction(node,_,  { expression, config}, ctx){

                if(!config)debugger
                const key = config.key
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
            
      
        

        
            const fn = value


            if(typeof value !== "function"){

                debugger
            }
        
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
        resolveExpression(value){
            let isExpression, isAnonymous,  isNamed, isFunction, caller = "";

            if(!value.startsWith) debugger
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
        },
        getEventFunction(value){

            let isExpression, isAnonymous,  isNamed, isFunction, caller = "";

            if(!value.startsWith) debugger
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



  function getValueByInputType(input) {
    const { type, value, checked } = input;
  
    switch (type) {
      case 'number':
        // Convert value to number (or NaN if the value is empty)
        return value === '' ? null : +value;
      case 'checkbox':
        // Return the checked property for checkboxes
        return checked;
      case 'radio':
        // Return the checked property for radio buttons
        return checked;
      case 'date':
        // For date inputs, return the value as a Date object (or null if empty)
        return value === '' ? null : new Date(value);
      case 'range':
        // Range is a number, but it's still returned as a string, so convert to number
        return value === '' ? null : +value;
      case 'file':
        // Return the FileList object for file inputs
        return input.files;
      default:
        // Default case for text, password, email, etc., returns the value as a string
        return value;
    }
  }







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






//splice like
//a = [1,2,3,4,5]
///b = [1,2,8, 9, 3,4,5]
//
function myCompare(a , b, alreadyValues){

    const oldV = alreadyValues ? a : Object.values(a)
    const newV = alreadyValues ? b : Object.values(b)

    const largest = oldV.length > newV.length?oldV:newV
    const len = largest.length
    const jobs = new Set()

    const move = []
    const remove = []
    const add = []
    const updated =[]
    const oldValueIndexes = new HybridWeakMap()
    const newValueMap = new HybridWeakMap()

    // oldV.forEach((value, index) => oldValueMap.set(value, index));
    // newV.forEach((value, index) => newValueMap.set(value, index));

    const oldValueMoves = new HybridWeakMap()

    const pendingMoves = new Set()
    let index = -1
    let added = 0
    let removed = 0
    const firstEmpty = oldV.length == 0

    let  offset = 0
    while(++index < len){
               
        //just add
        if(firstEmpty){

              add.push(...Object.entries(newV))

              jobs.add("add")
    
            break;
        }



        //  offset = - removed + added 
        const oldVal = oldV[index]
        const newVal = newV[index]
        const existOld = oldV.hasOwnProperty(index)
        const existNew = newV.hasOwnProperty(index)

 
        if(existNew){
            
             //save indexes of the old values
            if(!oldValueIndexes.has(newVal)){
                oldValueIndexes.set(newVal, [index])
            }else{
                oldValueIndexes.get(newVal).push(index)
            }

        }
       
   

        

        let oldDone 
        let newDone


        if(oldVal == newVal) continue;

        //check if the value is in the array because of the mutations theorically made
        //[1,2,3,4,5]
        //[1,2, -remove, +new, +new, 3,4,5 ]

        //  if(2 < index)debugger
         if(existNew && oldV.hasOwnProperty(index-offset) && oldV[index-offset] == newVal) {

        
            // if(!oldVal)debugger
            updated.push([ index-offset, index, oldVal, offset,"mutation"])
            // jobs.add("update")
            continue;
         }
       

             
        //new indexes
         if(!existOld ){
            // if(index >= oldV.length  ){
          
            offset++
            
            add.push([index, newVal, "existOld"])
            jobs.add("add")
  
            continue;
        }

        //ADD
       
        //
        if(existNew && !oldV.includes(newVal)){

            added++
           
            offset++
            add.push([index, newVal, "default"])
           
            jobs.add("add")

            //if it's  in the old, will be shift, otherwise is a delete
            // if(newV.includes(oldVal)){
            //     updated.push([index, oldVal, newVal , "mutation"])
            // }
          
            oldDone = true
             
            newDone = true
        }


        //REMOVE
        if( index < oldV.length && !newV.includes(oldVal)){

            removed++
            offset--
            remove.push([ index, oldVal, newVal])

            jobs.add("remove")

            

            oldDone = true
       
            continue;
        }

        //MOVE
        //from old to new
        //
        if(!newDone && newV.includes(oldVal)){

 
            const obj = [index, undefined,  oldVal, newVal, "oldToNew"]
            
            move.push(obj)

            // oldValueMoves.set(newVal, )
   
            jobs.add("move")
            continue
        }

        //from new to old
        if(!oldDone &&  oldV.includes(newVal)){
            let oldIndex = newIndexMap.get(oldVal)

            throw new Error("Not implemented")
            if(!oldIndex)debugger
            move.push([index, oldIndex,   oldVal, newVal , "newToOld"])

            jobs.add("move")
        }
        
        if(!oldDone || !newDone){
            // console.warn("iplement", {oldDone, newDone, index, oldV, newV, oldVal, newVal})
        }
       

    }

   
    //update index of moves
  
    move.forEach((move)=>{

        if(!oldValueIndexes.has(move[2])){
            debugger
        }
        //if the value is repeated the could have multiple indexes
        //so go removing indexes
        const indexes = oldValueIndexes.get(move[2])

        const index = indexes.shift()

        if(typeof index !== "number")debugger
        move[1] = index

    })
   

    return { 
        jobs,
        add ,
        remove,
        move,

        updated,
        offset
    }

}


o1 = { v:"1"};
o2 = { v:"2"};
o3 = { v:"3"};
o4 = { v:"4"};
o5 = { v:"5"};


//splice like
 a = [o1, o2,o3, o4,o5] // len 5
 b = [o1, o2, {v:"6"}, {v:"7"}, o4,o5,]  // ln 6

 console.time("myCompare")
 console.log(myCompare(a,b))
 console.timeEnd("myCompare")
 console.time("minimalMovesToTransformArray")
 console.log(minimalMovesToTransformArray(a,b))
 console.timeEnd("minimalMovesToTransformArray")
  //delete one 
  a = [o1, o2,o3, o4,o5]
  b = [o1, o2, o4,o5,]  

  console.time("myCompare")
  console.log(myCompare(a,b))
  console.timeEnd("myCompare")
  console.time("minimalMovesToTransformArray")
  console.log(minimalMovesToTransformArray(a,b))
  console.timeEnd("minimalMovesToTransformArray")


  //same value twice 
 a = [o1, o2,o3, o4,o5]
 b = [o1, o2,o1 , o4,o5, o3]  
  console.time("myCompare")
 console.log(myCompare(a,b))
 console.timeEnd("myCompare")
 console.time("minimalMovesToTransformArray")
 console.log(minimalMovesToTransformArray(a,b))
 console.timeEnd("minimalMovesToTransformArray")

   //same value twice 
   a = [o1, o2,o4, o3, o4,o5]
   b = [o1, o2,o1 , o4,o5, o3]  
  console.time("myCompare")
 console.log(myCompare(a,b))
 console.timeEnd("myCompare")
 console.time("minimalMovesToTransformArray")
 console.log(minimalMovesToTransformArray(a,b))
 console.timeEnd("minimalMovesToTransformArray")


 a = []
 b = [o1, o2,o1 , o4,o5, o3]  
console.time("myCompare")
console.log(myCompare(a,b))
console.timeEnd("myCompare")
console.time("minimalMovesToTransformArray")
console.log(minimalMovesToTransformArray(a,b))
console.timeEnd("minimalMovesToTransformArray")

a = [o1, o2,o4, o3, o4,o5]
b = []  
console.time("myCompare")
console.log(myCompare(a,b))
console.timeEnd("myCompare")
console.time("minimalMovesToTransformArray")
console.log(minimalMovesToTransformArray(a,b))
console.timeEnd("minimalMovesToTransformArray")

//reverse
a = [o1, o2, o3, o4,o5]
b = [  o5,o4,o2,o3,o1,]  
console.time("myCompare")
console.log(myCompare(a,b))
console.timeEnd("myCompare")
console.time("minimalMovesToTransformArray")
console.log(minimalMovesToTransformArray(a,b))
console.timeEnd("minimalMovesToTransformArray")


    //lon array 
    //myCompare is faster with long arrays since traverse only one time

    a = [ ...Array.from(Array(10000)),o1, o2,o4, o3, o4,o5]
    b = [...Array.from(Array(10000)), o1, o2,o1 , o4,o5, o3]  
   console.time("myCompare")
  console.log(myCompare(a,b))
  console.timeEnd("myCompare")
  console.time("minimalMovesToTransformArray")
  console.log(minimalMovesToTransformArray(a,b))
  console.timeEnd("minimalMovesToTransformArray")

  //add one
  a = [o1, o2,o4, o3, o4,o5]
  b = [o1, o2,o1 , o4,o5, o3, {"v":"6"}]  
 console.time("myCompare")
console.log(myCompare(a,b))
console.timeEnd("myCompare")
console.time("minimalMovesToTransformArray")
console.log(minimalMovesToTransformArray(a,b))
console.timeEnd("minimalMovesToTransformArray")

a = [o1, o2, o3, o4,o5]
b = [o1, o2, o3, o4,o5, {"v":"6"}]  
console.time("myCompare")
console.log(myCompare(a,b))
console.timeEnd("myCompare")
console.time("minimalMovesToTransformArray")
console.log(minimalMovesToTransformArray(a,b))
console.timeEnd("minimalMovesToTransformArray")



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
  