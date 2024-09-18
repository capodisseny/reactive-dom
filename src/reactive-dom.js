// import { HybridWeakMap } from "./utils/HybridWeakMap.js"

/**
 * 
 Framework to manipulate directly de the DOM using reactive programming.
 */


 const liElement = {
    type: 'li',
    children: [
        {
            type: 'text',
            textContent:[{path:"i"}]
        }, ' ',{
            type: 'text',
            textContent:[{path:"task"}]
        },
      {
        type: 'div',
        directives: { show: 'activeTab' },
        children: [{
            type: 'text',
            textContent:["Showw tabss"]
        }, ' ', {
            type: 'text',
            textContent:[{path:"i"}]
        }]
      },
      {
        type: 'div',
        children: [
          {
            type: 'button',
            attributes: {
                 onclick: 'removeTask'
             },

            children: ['Remove ', {
                type: 'text',
                textContent:[{path:"task"}]
            }]
          },
          {
            type: 'div',
            attributes: { 'show': 'activeTab' },
            children: ['Show tabsss', ' ', {
                type: 'text',
                textContent:[{path:"i"}]
            }],

          }
        ]
      }
    ]
  };

 const prefix = "s-"
 const events = {
    // Mouse Events
    onclick: { type: "MouseEvent" },
    ondblclick: { type: "MouseEvent" },
    onmousedown: { type: "MouseEvent" },
    onmouseup: { type: "MouseEvent" },
    onmousemove: { type: "MouseEvent" },
    onmouseover: { type: "MouseEvent" },
    onmouseout: { type: "MouseEvent" },
    onmouseenter: { type: "MouseEvent" },
    onmouseleave: { type: "MouseEvent" },
    oncontextmenu: { type: "MouseEvent" },
  
    // Keyboard Events
    onkeydown: { type: "KeyboardEvent" },
    onkeyup: { type: "KeyboardEvent" },
    onkeypress: { type: "KeyboardEvent" },
  
    // Form Events
    onchange: { type: "Event" },
    onsubmit: { type: "Event" },
    onreset: { type: "Event" },
    oninput: { type: "InputEvent" },
    oninvalid: { type: "Event" },
    onselect: { type: "Event" },
  
    // Window Events
    onload: { type: "Event" },
    onunload: { type: "Event" },
    onresize: { type: "UIEvent" },
    onscroll: { type: "UIEvent" },
    onbeforeunload: { type: "BeforeUnloadEvent" },
    onhashchange: { type: "HashChangeEvent" },
    onerror: { type: "ErrorEvent" },
  
    // Document Events
    onDOMContentLoaded: { type: "Event" },
    onreadystatechange: { type: "Event" },
  
    // Clipboard Events
    oncopy: { type: "ClipboardEvent" },
    oncut: { type: "ClipboardEvent" },
    onpaste: { type: "ClipboardEvent" },
  
    // Drag and Drop Events
    ondrag: { type: "DragEvent" },
    ondragstart: { type: "DragEvent" },
    ondragend: { type: "DragEvent" },
    ondragover: { type: "DragEvent" },
    ondragenter: { type: "DragEvent" },
    ondragleave: { type: "DragEvent" },
    ondrop: { type: "DragEvent" },
  
    // Media Events
    onplay: { type: "Event" },
    onpause: { type: "Event" },
    onended: { type: "Event" },
    ontimeupdate: { type: "Event" },
    onvolumechange: { type: "Event" },
    onseeked: { type: "Event" },
    onseeking: { type: "Event" },
    ondurationchange: { type: "Event" },
    oncanplay: { type: "Event" },
    oncanplaythrough: { type: "Event" },
  
    // Touch Events
    ontouchstart: { type: "TouchEvent" },
    ontouchend: { type: "TouchEvent" },
    ontouchmove: { type: "TouchEvent" },
    ontouchcancel: { type: "TouchEvent" },
  
    // Pointer Events
    onpointerdown: { type: "PointerEvent" },
    onpointerup: { type: "PointerEvent" },
    onpointermove: { type: "PointerEvent" },
    onpointerover: { type: "PointerEvent" },
    onpointerout: { type: "PointerEvent" },
    onpointerenter: { type: "PointerEvent" },
    onpointerleave: { type: "PointerEvent" },
    onpointercancel: { type: "PointerEvent" },
  
    // Focus Events
    onfocus: { type: "FocusEvent" },
    onblur: { type: "FocusEvent" },
    onfocusin: { type: "FocusEvent" },
    onfocusout: { type: "FocusEvent" },
  
    // Device Events
    ondeviceorientation: { type: "DeviceOrientationEvent" },
    ondevicemotion: { type: "DeviceMotionEvent" },
  
    // Miscellaneous Events
    ontransitionend: { type: "TransitionEvent" },
    onanimationstart: { type: "AnimationEvent" },
    onanimationend: { type: "AnimationEvent" },
    onanimationiteration: { type: "AnimationEvent" },
    onmessage: { type: "MessageEvent" },
    ononline: { type: "Event" },
    onoffline: { type: "Event" },
    onstorage: { type: "StorageEvent" }
  };


 const manipulators = new WeakMap()
 function evaluateDynamic(str){


    return  

 }

 const directives = {
    

    bind: function({ node, value, data, ctx}){

        let path = value
        //watch the enetire result
         watch(get(data, path),  ()=>{

            let value = get(data, path)

            if(typeof value === "object"){

                Object.entries(value).forEach(([key, value]) => {
                    
                    node.setAttribute(key, value)
                });
            }
        }, true);

    },
    show: function({node,nodeRef, data, value, ctx}){

        if(ctx.isLoop){

           
   

        } 

        effect(()=>{

            const args = get(data, value) ? [""]: ["none", "important"]

            node.style.setProperty('display',...args);
 
         })
   
        
    },
    if({node,nodeRef, data, value, ctx}){


        effect(()=>{

            let show = get(data, value)

            let ref = nodeRef.commentRef = nodeRef.commentRef || document.createComment("if")

            if(show){
                
                if(node.parentNode) return
                ref.replaceWith(node)
 
            }else{

                node.replaceWith(ref)
                
            }

        }, true)
        
    },

    //loop first to pass the apropiate data to the children
    loop: function({node,nodeRef,data, value }){
        
        let expression = value


        const [m,loopKey, loopIndex,  path] = expression.match(/([a-zA-Z]+)(?:\s*,\s*([a-zA-Z]+))?\s+in\s+([a-zA-Z]+)/)
    
        let loop = get(data, path)
        const startRef = document.createComment('Start Loop');
        const endRef = document.createComment('End Loop');

        const cleanRef = document.createComment('Clean Loop');
        

        let isTemplate = node.tagName == "TEMPLATE"

        //is is an element instead of a template
        if(!isTemplate){
            // let ref =  document.createTextNode("")
            let newTemplate = document.createElement("template")
            // let newTemplate = document.createDocumentFragment()

            newTemplate.setAttribute("s-loop", node.getAttribute("s-loop"))
 
            //remove s-llop to avoid inifinite loop
            node.removeAttribute("s-loop")
            node.after(newTemplate)
            newTemplate.content.appendChild(node)

            node = newTemplate

        }

      
        
        const parentNode = node.parentNode
        //remove template
        // node.replaceWith(startRef, endRef)
        node.before(cleanRef, endRef)

        let template = node.content

        //compile template nodes because here are not compiled yet
        //use the document fragment, since the template is already compiled and will not compile children
        //  compileNodes(template)

        //  node.remove()

        let lastRef = startRef

        let loopValues = []
        let lastIndex = -1
        const removeIndexes = []
        const addIndexes = []


        watch(loop, ({type, target, key,value, updateId, oldValue})=>{
    


            if(type == "delete") removeIndexes.push(key)
            if(type == "set") addIndexes.push([key,value] )


            if(Array.isArray(target) && key !== "length") return 
           
            console.log(key, value)
            const initialization = !target

            const newUpdate = document.createDocumentFragment()

                // new WeakMap()
                let currentIndex = 0
                //an array of loop values that needs to be removed, initially all and remove the ones still there
                const deleteIndex = Object.keys(loopValues)

                let loopKeys = Object.keys(loop)
            
                console.time("loop")

                const updateContext = []
                loopKeys.forEach((key)=>{

                    deleteIndex.shift()
                    loopKeys
                    loop
           
                    const loopValue = loopValues[currentIndex] = loopValues[currentIndex] || { __loopValue:true, nodes:[]}                
            
                    const item = loop[key]
                    //save value to check if needs to update
                    const needUpdate =  loopValue.hasOwnProperty("value")?(loopValue.value != item):false
                    loopValue.value = item
                
                    
                    // let childData ={...manipulator.ctx.data, [loopKey]:item, [loopIndex]:currentIndex}
                    let childData = Object.setPrototypeOf({ [loopKey]:item, [loopIndex]:currentIndex},data)
                    let childCtx = {data: reactive(childData), isLoop:true}

                    if(lastIndex < currentIndex || needUpdate) {
                
                        //clean old value 
                        if(needUpdate && loopValue.nodes.length){
                            loopValue.nodes.forEach(node=>node.remove())
                            loopValue.nodes = []
                        }
            
                   
                        // const fragmentClone = cloneNode(template)
                        //append new nodes
                        let i = 0
                        template.childNodes.forEach((child, i)=>{
                            //this is x2 faster than a lconeWithRef
                            //so clone it like this and find a way to find the ref
                                //   let newChild =  child.cloneNode(true)
                            //fastests way
                                let newChild = cloneDeep(child, (node, ref)=>{
                                    updateWithRef(node,  ref,childCtx)
                                })
                            //  const newChild = cloneWithRef(child)
                                // if(i > 0) return
                                // i++
                                // let newChild =renderObject(liElement)
                            //    debugger
                            //   const newChild = initializeWithTemplate( child , childCtx)
                            //  const newChild = updateWithRef(fragmentClone.childNodes[i], childCtx)
                       
                            lastRef = newChild

                            newUpdate.appendChild(newChild)
                            // updateContext.push([newChild, childCtx])


                            loopValue.nodes.push(newChild)
                           
        
                            if(!isTemplate)debugger

                        })
                        // endRef.parentNode.insertBefore(cleanRef, endRef)

                    
                    //update last index
                        lastIndex = currentIndex
                        
                    } 

                    //update the clean 

                    currentIndex++
                                

                })



           
                // //remove old values
                // while(cleanRef.nextSibling != endRef){
                //     cleanRef.nextSibling.remove()
                // }


                // //clean old loop values
                // deleteIndex.forEach(i => {
                //         loopValues[i].nodes.forEach(node=>node.remove())
                // });

                // updateContext.forEach(([node, childCtx])=>{

                //     updateWithRef(node, childCtx)

            
                // })


        
                endRef.before(newUpdate)

                 
                // const walker = document.createTreeWalker(endRef.parentNode, NodeFilter.SHOW_ALL);

               
                console.timeEnd("loop")
                // updateNodes(parentNode.childNodes)
            
                // manipulator.children = children
   
            
        }, true)
    },
    
}
 

const directiveSelectors = Object.keys(directives).map(v=>`s-${v}`)
class ContextHandler{
    constructor(){
        this.data = {}
        this.context = {}
    }
    get(target){
        return target.data[key] || target.context[key]
    }
    set(){
       
    }
}

  function createContext(...ids){

  
    let root = getPrevious() || document.body

 
    let data = ids.at(-1) 
    if(typeof data === "string") {
        data = reactive({})
    }
        
    const ctx =   {
        data,
        root,
    }

    console.time("Compilation")
     let compiled = compileNodes(root,  ctx, 
        // initializeNode
     )
    
    

     console.timeEnd("Compilation")

     console.log("compiled", compiled)


     initializeNodes(ctx)
     
     return {}
}



    const proxies = {
        reactive: new WeakMap()
    }




  function reactive(obj, watcher, origin){

   let current =  proxies.reactive.get(obj)

   if(current ) return current

   let handler =   new ReactiveHandler({target:obj, origin:origin || obj, watcher})
   let proxy =  new Proxy(obj, handler)

   proxies.reactive.set(obj,proxy)

    return proxy
 } 

 const interceptors = {

    __isReactive:{
        get(){
            return true
        },

    },
    __setEffect:{
        set(target, key, value){

            this.effects.add(value)

            return true
        }
    }
  
 }
 
 class ReactiveHandler{

    static handlers = []

    static queue = []
    constructor(options = {}){

        this.effects = new Set()

        this.constructor.handlers.push(this)

        this.origin = options.origin
        this.target = options.target

        this.queue = []
    }

    addEffect(effect, key, target){

  
        if(!this.effects.has(effect)) this.effects.add(effect )

        //ad property to the list of observing propertis of the effect
        effect.observeProp(this, key)
      

    }
    
    get(target, key, reciever){

        let value = target[key]

        if(interceptors[key]?.["get"]){
            return interceptors[key]["get"].call(this,target, key, value, reciever )
        }

        //trigger get
        const currentEffect = this.constructor.currentEffect
        if( currentEffect){

                this.addEffect(currentEffect, key)

        }   

        if(value instanceof ContextValue){

            return value.get(target, key)
        }


        if(typeof value === "object"){
            return reactive(value, false, this.origin )
        }


        
        return value
    }


    // apply(target, thisArg, args){

    // }
    set(target, key, value, reciever){

        //trigger update
       

        if(interceptors[key]?.["set"]){
            return interceptors[key]["set"].call(this,target, key, value, reciever )
        }

        const oldValue = target[key]

        target[key] = value

        // if(Array.isArray(target) && key == "length") return true

        this.queueMutation({type:"set", target, key, value, oldValue})
        
        return true
    }
    deleteProperty(target, key) {
        if (prop in target) {

          delete target[prop];


          this.queueMutation( {type: "delete", target, key} )
          // Expected output: "property removed: texture"
        }
      }      

    triggerUpdate(){

        this.effects.forEach(effect=>{

            const observingProps = effect.observing.get( this)

            //if no observing props, a no target, skip update
            if(!observingProps && !effect.observeTarget) return

            //loop updated payloads
            Object.keys(this.nextUpdate).forEach((key)=>{

                //observe all properties
                if(effect.observeTarget) {
                    effect.runUpdate(this.nextUpdate[key])   
                }
                //observe specific properties
                else if(observingProps[key]){
                     effect.runUpdate(this.nextUpdate[key])
                }
            })
            
        })
       
        this.nextUpate = {}
    }

    static runUpdate(){

        this.queue.forEach((reactiveHandler )=> {
            reactiveHandler.triggerUpdate()
        })

        this.queue.length = 0

      

        this.update = false

         Manager.runNextTick()
    }

    

    queueMutation(payload){

        //push mutation to the queue
        ReactiveHandler.queue.includes(this) ||  ReactiveHandler.queue.push(this)

        //prepare set properties changes in this object
        this.nextUpdate = this.nextUpdate || {}

        //save payload in an object, so last value update is triggered only
        this.nextUpdate[payload.key] = payload

        if(!ReactiveHandler.update){
            ReactiveHandler.update = true
            console.log("collection")
            console.time("Collect updates")
            requestAnimationFrame(()=>{
                console.timeEnd("Collect updates")
                console.log("last udpate")
                ReactiveHandler.runUpdate()
                
            })
         
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
    constructor(source, options){

        const props = ["immediate", "callback",  "onTrigger"]

        this.source = source

        if(typeof source == "object"){
            this.observeTarget = source
        }

        props.forEach(prop=>{
            if(options.hasOwnProperty(prop)) this[prop] = options[prop]
        })

        //[handler] - {[key]:true} observing
        this.observing = new WeakMap()

        //initiliaze the effect
        let value = this.runEffect({})


        //run callback
        if(this.immediate && this.callback){

            this.callback.call(undefined, {value})
        }

        this.nextUpate = {}

    }


    runEffect(payload, handler){

        let source = this.source
        ReactiveHandler.currentEffect = this

        let value
        if(typeof source == "function") value = source(payload, handler)

       if(typeof source == "object"){
            source.__setEffect = this
       }

       ReactiveHandler.currentEffect = false

       return value

    }
    runUpdate(payload, handler){

        this.runEffect(payload, handler)

        if(this.callback){
            this.callback.call(undefined, payload)
        }
    }

    onTrack(e) {
        debugger
    }
    onTrigger(e) {
    debugger
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




 function watch(source, callback, run ){

    let options = {callback, immediate: run || false}
    let t = typeof source 
    if(t === "function"){


    }

    if(t !== "object" && t !== "function")return 
    

    effect(source, options)
    
  
    
 }


 class ContextValue{

    constructor(options = {}){
     
        this.data = options.data
        this.path = options.path
    }

    path = ""
    get(){
        debugger
        get(this.data, this.path) 
    }

    set(value){
        debugger
        this.value = value
    }

 }





function updateAttrs(node,  nodeRef, ctx){
        
        const attrs = nodeRef.attrs

        Object.keys(attrs).forEach(key => {

            let val = get(ctx.data, attrs[key])

            if(!val && key !== "value") return node.removeAttribute(key)

            node.setAttribute(key, val)
            node[key] = val

   
        });


        if(nodeRef.setInputEvent !== false && attrs.value){
            
            node.addEventListener("input", (e)=>{
          
                set(ctx.data, attrs.value , e.target.value)  
    
            })

            nodeRef.setInputEvent = false
        }
        
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

     
            // Execute all the queued callbacks
            while ( Manager.nextTickQueue.length) {
                const callback = Manager.nextTickQueue.shift();
                callback();  // Run the callback
            }

            // Mark rendering as done, so further nextTicks can be scheduled
            this.isRendering = false;

     
        }
       

       static nextTickQueue = []
    }


    function nextTick(callback){
            
        Manager.nextTickQueue.push(callback)

         // Only schedule a queue flush if it's not already in progress
        if (!Manager.isRendering) {
            Manager.isRendering = true;
            // Use setTimeout, requestAnimationFrame, or similar to flush the queue in the next event loop
            // setTimeout(() => {
            //     Manager.runNextTick();
            // }, 0);
        }

        debugger
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


    function queryNodeByText(text) {
        // Get all elements in the document
        const allElements = document.querySelectorAll('*');
      
        // Filter elements by their text content
        const matchingElements = Array.from(allElements).find(element =>
          element.textContent.includes(text)
        );
      
        return matchingElements; // Return an array of matching elements
      }



      //in theory is mor efficient said chatgpt but doesn't look like it
      //console.time(1);queryNodesByText("{{some.prop}}"); console.timeEnd(1) //0.08
        //console.time(2);queryNodesByTextXPath("{{some.prop}}"); console.timeEnd(2) //0.36
      function queryNodesByTextXPath(text) {
        // Construct the XPath expression to match any node containing the specified text
        const xpathExpression = `//*[contains(text(), '${text}')]`;
        const matchingNodes = [];
        
        // Use `document.evaluate` to find nodes matching the expression
        const iterator = document.evaluate(xpathExpression, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
        let currentNode = iterator.iterateNext();
        
        // Iterate through the result set and collect matching nodes
        while (currentNode) {
          matchingNodes.push(currentNode);
          currentNode = iterator.iterateNext();
        }
        
        return matchingNodes;
      }
      


      function findDeepestNodeByText(root, text) {
        let deepestNode = null;
        let maxDepth = -1;
      
        // Helper function to perform Depth-First Search (DFS)
        function dfs(node, depth) {
          // If the current node contains the specified text
          if (node.textContent.includes(text)) {
            // Check if this is the deepest node found so far
            if (depth > maxDepth) {
              maxDepth = depth;
              deepestNode = node;
            }
          }
      
          // Recursively traverse child nodes
          node.childNodes.forEach(child => {
            if (child.nodeType === Node.ELEMENT_NODE) {
              dfs(child, depth + 1); // Increase depth when moving to a child node
            }
          });
        }
      
        // Start DFS from the root element with depth 0
        dfs(root, 0);
      
        return deepestNode;
      }



      function getPrevious(){
        // Select the script element
        const currentScript = document.currentScript;
        // Get the previous sibling element

        return currentScript.previousElementSibling;


      }

      
     




 function getNodeIndex(node) {
    let index = 0;
    while ((node = node.previousElementSibling) !== null) {
      index++;
    }
    return index;
  }



//   const  parseNode = (node, context, updateId)=>{

//     if ( node.nodeType == node.TEXT_NODE && node.__update !== updateId && node.textContent.includes("{{") ) {
//         // Save the original text for future updates
//         node.__originalContent = node.textContent;
        
//         // Replace all dynamic paths with the corresponding data
//         node.textContent = node.textContent.replace(/{{(.+?)}}/g, (match, path) => {
//           return get(context, path.trim());
//         });


        
//       }


//       if(node.attributes?.length){
//                 const attrs = node.attributes; // Get all attributes of the element
//                 Object.values(attrs).forEach((attr) => {
//                     let value = attr.value;
//                     let key = attr.name
//                     let dynamic = false
//                     if(value.includes("{{")){
//                         dynamic =  value.trim().slice(2, -2) || false
//                     }
//                     if(dynamic){
//                         attr.value = get(context, dynamic)
//                     }
//                 })
//             }
//       node.__update = updateId
    
//   }


  function parseNodes( root, context ={}) {
    // Find all nodes that contain the dynamic path placeholders
    // console.time("parseNodes")

    let updateId = Math.random()


    fastTraverseDOM(root,node=>{

        parseNode(node, context, updateId)
    })



    // const nodes = getAllNodes(root)


    // nodes.forEach(node=>{

    //     parseNode(node, context, updateId)
       
    // })
    

        
    // traverse(root, (node)=>{

    //     debugger

    //     // parseNode(node, update)
    //     //REPLACE CONTENT
    //     if ( node.nodeType == node.TEXT_NODE &&  node.__update !== updateId && node.textContent.includes("{{") ) {

    //         debugger
    //         // Save the original text for future updates
    //         node.__originalContent = node.textContent;
            
    //         // Replace all dynamic paths with the corresponding data
    //         node.textContent = node.textContent.replace(/{{(.+?)}}/g, (match, path) => {
    //         return get(context, path.trim());
    //         });
    
    //     }


    //     //replace attributes
    //     if(node.attributes){
    //         const attrs = node.attributes; // Get all attributes of the element
    //         Object.values(attrs).forEach((attr) => {
    //             let value = attr.value;
    //             let key = attr.name
    //             let dynamic = false
    //             if(value.includes("{{")){
    //                 dynamic =  value.trim().slice(2, -2) || false
    //             }
    //             if(dynamic){
    //                 attr.value = get(context, dynamic)
    //             }
    //         })
    //     }

    //     node.__update = updateId
    // })

    // console.timeEnd("parseNodes")
  }

  function getAllTextNodes(node) {
    const allNodes = [];
    if (node.nodeType === Node.TEXT_NODE) {
        allNodes.push(node);
    } else {
        for (let childNode of node.childNodes) {
            allNodes.push(...getAllTextNodes(childNode));
        }
    }
    return allNodes;
}

function getAllNodes(rootNode) {
    const allNodes = [];
    traverseCollect(rootNode, allNodes);
    return allNodes;
}
function traverseCollect(node, allNodes) {
    allNodes.push(node);
    for (let childNode of node.childNodes) {
        traverseCollect(childNode, allNodes);
    }
}

function traverse(node, callback) {

    if(callback ) callback(node)
    for (let childNode of node.childNodes) {
        traverse(childNode, callback);
    }
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
function compileNode(node, context, updateFn){

    if( node.__sCompiled ) return compiledRefs.get(node)

    const nodeRef = {
        node,
        ctx:0,
        id:`id-${idCounter++}`,
        // get allChildren(){
            
        // }
    }
    node.__sId = nodeRef.id

    //set the id 
    if(node.dataset) {
        // node.dataset.__sId = nodeRef.id
        node.setAttribute("__sId", nodeRef.id)
    }

    let setNode = false


    if ( node.nodeType == node.TEXT_NODE && node.textContent.includes("{{") ) {

        setNode = true

       let parentRef =  compiledRefs.get(node.parentNode)

        nodeRef.textContent = fastParse( node.textContent)
            
        node.textContent = nodeRef.textContent.filter(v=>typeof v == "string").join("")
      }

      if(node.attributes?.length){
            const attrs = node.attributes; // Get all attributes of the element
            Object.values(attrs).forEach((attr) => {
                let value = attr.value;
                let key = attr.name
   
                if(key.startsWith(prefix)){
                    let directiveKey = key.slice(2)
                    if(directives[directiveKey]){
                        setNode = true

                        nodeRef.directives = nodeRef.directives || {}

                        nodeRef.directives[directiveKey] = value.slice(2, -2) 

                        node.removeAttribute(key)
                    }
                    return 
                }

                if(events[key]){
                    setNode = true
                    nodeRef.events = nodeRef.events || {}
                    nodeRef.events[key.slice(2)] = value
           
                    node.removeAttribute(key)
                    return 
                }

                if(value.includes("{{")){
                    setNode = true
                    nodeRef.attrs = nodeRef.attrs || {}

                    dynamic =  value.trim().slice(2, -2) || false

                    nodeRef.attrs[key] = dynamic
                }
              
            })
        }


        //save compiled prop for faster access
        node.__sCompiled  = true
        
 
        if(setNode){
            compiledRefs.set(node, nodeRef)

            nodeRef.childNodes = node.childNodes
            
            if(updateFn) updateFn(nodeRef, context)
            
            return nodeRef
        }
    

        
   
}

function compileNodes(root, context, updateFn){

    
    let ctxLevel = 0
    let parent 

    let childrenByDepth = {}
    
    const parentStack = []
    let lastDepth = 0
    let ctxId = 0
    const deepStack = []
    fastTraverseDOM(root, (node, i, depth, last, hasChildren,  path)=>{

        
   
        const ref = compileNode(node )  

      
        //node with no changes
        if(ref){
            ref.depth = depth
    

            ref.parentStack = [...parentStack]
            ref.deepStack = [...deepStack]
            ref.path = path
            let depthMap = []
            parentStack.forEach(parent => {
                const childrefs = parent.childRefs = parent.childRefs ||[]
                ref.parentRef = parent
                //set the reference of the aprent context
                //[parent1, parent2, parent3 ]
                if(parent.directives?.loop && !ref.loopRef ){
                    ref.loopRef = parent
                }
                childrefs.push(ref)
    
            });
      
        }



        //hoing up
        if(depth < lastDepth){
            parentStack.pop()
            deepStack.pop()
        }
        if(depth > lastDepth){
          
            deepStack.push(depth)
        }


        //going down
        if(ref  && !parentStack.length || hasChildren ){
            if(ref) {

                parentStack.push(ref)
            
                if(ref?.directives?.loop){
                    
                }
            }
        }


        lastDepth = depth
        
        
        // let childrenByDepth[depth] = childrenByDepth[depth] || []

       


        
   
    })


    console.log(parentStack)
    return compiledRefs
}

function getParentRef(node){

    while(node.parentNode ){
        const parent = node.parentNode
    
        let ref = compiledRefs.get(parent)
        if(ref) return ref
        node = parent
    }
}


function updateTextContent(node, nodeRef, ctx){

    // Replace all dynamic paths with the corresponding data
    node.textContent = nodeRef.textContent.reduce((str , v)=>{

    if(typeof v === "object") {
        v = get(ctx.data, v.path)

        if(!v) v = ""
        if(typeof v == "object") v = JSON.stringify(v)
    }
    return str + v

}, "")

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


function initializeWithTemplate( templateRoot, context ){
    
    // const payload = {nextNode:root}
  

    const newChild = templateRoot.cloneNode(true)


    let parent = newChild
    let lastIndex = -1
    // fastTraverseDOM will create a stack like this
    //first root
    //[root]
    // [child1, child2, child3, ]
    //[chidl1-1, child1-2, child1-3]
    // [chidl2-1, child2-2, child2-3]

    let lastNode = newChild
    fastTraverseDOM(templateRoot, (templateNode, i, depth, last)=>{
        const isRoot = !templateNode.parentNode
        if(isRoot){
            parent = newChild
        }else{
            
            if(!parent.childNodes[i]){
                parent = parent.nextSibling || parent.parentNode
            }      

        }

        const child = i === -1 ?  newChild:parent?.childNodes?.[i]

        lastNode = child

        if(!child) debugger
        
        let childRef = compiledRefs.get(templateNode)
        if(childRef) initializeNode({...childRef, node:child}, context)

        //change parent
        if(!isRoot){
            //go down
            if( child?.childNodes?.length){
                parent = child
            }
            //go up
            else if(templateNode == last){
                        
                parent = parent.parentNode
            
            }else{
                //same parent
            }
        }


        if(!parent) debugger
        lastIndex = i

        // const isRoot = !templateNode.parentNode
        // if(isRoot){
        //     parent = newChild
        // }else{
            
        //     if(!parent.childNodes[i]){
        //         parent = parent.nextSibling || parent.parentNode
        //     }      

        // }

    
        // const child = i === -1 ?  newChild:parent?.childNodes?.[i]

        // lastNode = child

        // if(!child) debugger
        
        // let childRef = compiledRefs.get(templateNode)
        // if(childRef) initializeNode({...childRef, node:child}, context)

        // //change parent
        // if(!isRoot){
        //     //go down
        //     if( child.childNodes.length){
        //         parent = child
        //     }
        //     //go up
        //     else if(last){
                        
        //         parent = parent.parentNode
            
        //     }else{
        //         //same parent
        //     }
        // }


        // if(!parent) debugger
        // lastIndex = i

        
    })



    return newChild
        
    
}

function initializeNodes( ctx){

    for (const [node, ref] of compiledRefs.map) {
       
        initializeNode(ref, ctx)
    }
}

function initializeNode( nodeRef, ctx, updateId){

    let node = nodeRef.node

    if(ctx.isLoop)return 

    if ( nodeRef.textContent ) {


        effect((payload = {}, handler)=>{

            let {target, key, value} = payload

            updateTextContent(nodeRef.node, nodeRef,ctx)
        })

        
      }

      if(nodeRef.attrs){



        effect(()=>{
            updateAttrs(nodeRef.node, nodeRef, ctx)
        })
           

      }

      if( nodeRef.events){

            const events = nodeRef.events

            Object.keys(events).forEach(event=>{

                setupEvent(event, events[event], nodeRef, ctx)
  
            })
            
      }

      if(nodeRef.directives){

           updateDirectives(nodeRef.node, nodeRef, ctx)

      }


}



//this will create a an stack like this

/**
 * 
 * 
 * 
 */

//generates a stack like  stack = [child1, child2, child3, parent]

function fastTraverseDOM(root, processNode) {

    console.time("fastTraverseDOM")


    const stack = [[root, -1, 0, null]];
    

    while (stack.length > 0) {

        const [node, index, depth, last,  path, parentNode] = stack.pop();
    
        //also process template children
        const childNodes = (node.tagName == "TEMPLATE" )? node.content.childNodes:node.childNodes
        //no deep first
        if(node.setAttribute) node.setAttribute("data-depth", depth)    
        
        //set a node id


         processNode(node , index, depth, last,  childNodes.length, path, parentNode);

       
        // Push child nodes to the stack in reverse order
        // This ensures we process them in the correct order when popping
        //pus to the stack [child1, child2, child3]

       
        for (let i = childNodes.length - 1; i >= 0; i--) {
            const last = i == (childNodes.length - 1)

               let  childPath = path ? [...path, i] : [i]
            stack.push([childNodes[i], i, depth + 1 , last, childPath ,node, ]);
        }


        // deep first
        // stack [level3, level2, level1]
        // processNode(node , index, parentNode, last, childNodes.length);
        

    }

    // const walker = document.createTreeWalker(rootOrArray,
    //     //  NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT
    //      NodeFilter.SHOW_ALL
    //      , {
    //     acceptNode: function (node) {
    //       // Only accept nodes that have dynamic content or need updates
    //       return true
    //       if (true) {
    //         return NodeFilter.FILTER_ACCEPT;
    //       } else {
    //         return NodeFilter.FILTER_SKIP;
    //       }
    //     }
    //   });
      
    
    //   let parent = walker.currentNode.parentNode
    //   let i = 0
    //   while (walker.nextNode()) {
    //     const currentNode = walker.currentNode;

    //     console.log(currentNode)
    //     if(parent !== walker.currentNode.parentNode){
    //         parent = currentNode.parentNode
    //         i = 0
    //     }
    //     processNode(currentNode ,i, parent,  walker.lastChild() ); // Update only the necessary nodes

       
    //     i++
    //   }


    console.timeEnd("fastTraverseDOM")
}




function fastParse(str) {
    let result = [];
    let start = 0;
    let openBrace = str.indexOf('{{');
    
    while (openBrace !== -1) {
        if (start !== openBrace) {
            result.push(str.slice(start, openBrace));
        }
        
        let closeBrace = str.indexOf('}}', openBrace);
        if (closeBrace === -1) break;
        
        result.push({path: str.slice(openBrace + 2, closeBrace).trim()});
        start = closeBrace + 2;
        openBrace = str.indexOf('{{', start);
    }
    
    if (start < str.length) {
        result.push(str.slice(start));
    }
    
    return result;
}



//function provided by cloude.ia as optimizate way to updat nodes without repainting

function fastBatchUpdate(nodes, getNewContent) {
    // Create a document fragment
    const fragment = document.createDocumentFragment();
    
    // Use requestAnimationFrame to batch updates
    requestAnimationFrame(() => {
        nodes.forEach((node, index) => {
            // Clone the node
            const clone = node.cloneNode(false);
            
            // Update the clone's textContent
            clone.textContent = getNewContent(node, index);
            
            // Append the clone to the fragment
            fragment.appendChild(clone);
        });

        // Replace all nodes in a single operation
        nodes.forEach((node, index) => {
            node.parentNode.replaceChild(fragment.children[0], node);
        });
    });
}

// Usage example:
const nodesToUpdate = Array.from(document.querySelectorAll('.update-me'));
fastBatchUpdate(nodesToUpdate, (node, index) => `New content ${index}`);




function setupEvent(event, value, nodeRef, context){

    let node = nodeRef.node
    let eventName = event


    if(!events["on"+event]) {
        console.warn(`Event ${event} not found`)
        return  
    } 

    const ctx = context.data

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
    let  fn = new Function("event",  "node", "ctx", "window" , code )


    node.addEventListener(eventName, (e)=>{

        fn.call(ctx, e,  node, ctx )    
    })

   


}



function parseNode(node, context) {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        // Only accept nodes that have dynamic content or need updates
        if (shouldUpdateNode(node, context)) {
          return NodeFilter.FILTER_ACCEPT;
        } else {
          return NodeFilter.FILTER_SKIP;
        }
      }
    });
  
    while (walker.nextNode()) {
      updateNode(walker.currentNode, context); // Update only the necessary nodes
    }
  }

  const nodeContextMap = new WeakMap();

function updateNode(node, context) {
  const nodeContext = nodeContextMap.get(node);
  if (nodeContext) {
    // Update node based on its specific context
    applyContext(node, nodeContext, context);
  }
}


function cloneWithRef(template){
    

        let root 

       const walker =  document.createTreeWalker(template, NodeFilter.SHOW_ALL)

    //    const parentRelation = new WeakMap()


    //    while(walker.nextNode() || !root){
    //         const template = walker.currentNode
    //         const newNode = template.cloneNode()
        
    //     debugger
    //         if(!root) root = newNode

    //         const ref = compiledRefs.get(template)

    //         if(ref)  newNode.__sId = ref.id

    //         const parent = parentRelation.get(template.parentNode)

    //         if(parent ) parent.appendChild(newNode)
            
    //          parentRelation.set(template, newNode)

    //    }    

    //    debugger
           
       const stack = [[template]]
        while(stack.length){
                const [template, parent] = stack.pop()
                const newNode = template.cloneNode()
               
                if(!root) root = newNode

                const ref = compiledRefs.get(template)

                if(ref)  newNode.__sId = ref.id

                if(parent ) parent.appendChild(newNode)

                const childNodes = template.childNodes
                for (let i = childNodes.length - 1; i >= 0; i--) {

                    stack.push([childNodes[i], newNode]);
                }
              

        }

        return root
        

}
function updateWithRef(node,   ref, ctx){

    // let template 
    // if(isTemplate) {
    //     template = node
    //     node = node.cloneNode()
    // }
    if(!ref) return 
    
    const nodeRef = ref 
    if(nodeRef ){

     
        if ( nodeRef.textContent ) {

            updateTextContent(node, nodeRef,ctx)
        
        }

        if(nodeRef.attrs){

            updateAttrs(node, nodeRef, ctx)

        }

        if(  nodeRef.events){

            const events = nodeRef.events

            nodeRef.listening = nodeRef.listening || {}

            if(nodeRef.listening.includes(node)) return 
           
               
            Object.keys(events).forEach(event=>{

                nodeRef.listening[event] = []
                nodeRef.listening[event].includes(node) || nodeRef.listening[event].push(node)
                if(nodeRef.eventsSetup) {
                    setupEvent(event, events[event], nodeRef, ctx)
                }
    
            })
     
          nodeRef.eventsSetup = true
        }


        if(nodeRef.directives){

            updateDirectives(node, nodeRef, ctx)

        }  


    }

    // const stack = [node]

    // while(stack.length){

    //     const node = stack.pop()
    //     const  nodeRef = compiledRefs.get(node)
    //      //Has dynamic content
        

    //     const childNodes = node.childNodes

    //     for (let i = childNodes.length - 1; i >= 0; i--) {
     
    //         stack.push(childNodes[i]);
    //     }
    // }

   
    // if(isTemplate && template.childNodes.length){
   
    //     // const stack = [template.childNodes]
    //     // let parent = node
    //     // while(stack.length){
    //     //         const template = stack.pop()
    //     //         const childNodes = template.childNodes

    //     //         const childRef = compiledRefs.get(child)
    //     //         const newChild = updateWithRef(child, childRef, ctx)

    //     //         node.appendChild(newChild)

    //     //         for (let i = childNodes.length - 1; i >= 0; i--) {
    //     //             const last = i == (childNodes.length - 1)
                    
    //     //             if(parent) parent.appendChild(newChild)
    //     //             stack.push([childNodes[i], i, depth + 1 , last, node, ]);
    //     //         }
    //     //         parent = false

    //     // }
    //     // template.childNodes.forEach(child=>{
    //     //     const childRef = compiledRefs.get(child)
    //     //     const newChild = updateWithRef(child, childRef, ctx, isTemplate)

    //     //     node.appendChild(newChild)
           
    //     // })

        
    // }
       


    return node


}


function updateDirectives(node, nodeRef, ctx){  
    Object.keys(nodeRef.directives).forEach(key => {
   
        const value = nodeRef.directives[key]
        const directiveHandler = directives[key]

        if(directiveHandler){
            directiveHandler({ init:nodeRef.directivesSetup , value, node, nodeRef, data:ctx.data, ctx})

        }
    });
}




function createComponent(template){

    customElements.define(
        "my-paragraph",
        class extends HTMLElement {
          constructor() {
            super();
            let template = document.getElementById("custom-paragraph");
            let templateContent = template.content;
      
            const shadowRoot = this.attachShadow({ mode: "open" });
            shadowRoot.appendChild(templateContent.cloneNode(true));
          }
        },
      );


  }



function  cloneNode(node, ref){

    const newNode = node.cloneNode(true)
    newNode.__sId = ref.id

    return newNode
}



function  cloneDeep(template, callback){ 


    const stack = [[template]]
    let root 
    while(stack.length){
        const [node,parent] = stack.pop()
        const newNode = node.cloneNode()
        const ref = compiledRefs.get(node)
        if(ref) newNode.__sId = ref.id
        if(!root) root = newNode
        if(parent)  parent.appendChild(newNode)
        const childNodes = node.childNodes

        if(callback) callback(newNode, ref, )

        for(let i = childNodes?.length - 1; i >= 0; i--){
           
            stack.push([childNodes[i], newNode])
           
        }
    }

    return root

    // const newNode = template.cloneNode()
    // const ref = compiledRefs.get(template)

    // if(ref) newNode.__sId = ref.id

    // for(let child of template.childNodes){

    //     const newChild = cloneDeep(child)
    //     newNode.appendChild(newChild)
    // }

    // return newNode
}





function renderObject(obj){


        if(typeof obj != "object") return document.createTextNode(obj)

        if(obj.type == "text") {
             return   document.createTextNode(obj.textContent.filter(v=>typeof v == "string").join(""))
        }
 
        const element = document.createElement(obj.type)


        if(!obj.children) return element
        obj.children.forEach(child => {
            child = renderObject(child)
            element.appendChild(child)
        });

        return element
    
    }

    function getNodeByPath(root, path) {
        let currentNode = root;
        for (let i = 0; i < path.length; i++) {
          currentNode = currentNode.childNodes[path[i]];
        }
        return currentNode;
      }