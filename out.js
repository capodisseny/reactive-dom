(()=>{var ie="s-",J={onclick:!0,ondblclick:!0,onmousedown:!0,onmouseup:!0,onmousemove:!0,onmouseover:!0,onmouseout:!0,onmouseenter:!0,onmouseleave:!0,oncontextmenu:!0,onkeydown:!0,onkeyup:!0,onkeypress:!0,onchange:!0,onsubmit:!0,onreset:!0,oninput:!0,oninvalid:!0,onselect:!0,onload:!0,onunload:!0,onresize:!0,onscroll:!0,onbeforeunload:!0,onhashchange:!0,onerror:!0,onDOMContentLoaded:!0,onreadystatechange:!0,oncopy:!0,oncut:!0,onpaste:!0,ondrag:!0,ondragstart:!0,ondragend:!0,ondragover:!0,ondragenter:!0,ondragleave:!0,ondrop:!0,onplay:!0,onpause:!0,onended:!0,ontimeupdate:!0,onvolumechange:!0,onseeked:!0,onseeking:!0,ondurationchange:!0,oncanplay:!0,oncanplaythrough:!0,ontouchstart:!0,ontouchend:!0,ontouchmove:!0,ontouchcancel:!0,onpointerdown:!0,onpointerup:!0,onpointermove:!0,onpointerover:!0,onpointerout:!0,onpointerenter:!0,onpointerleave:!0,onpointercancel:!0,onfocus:!0,onblur:!0,onfocusin:!0,onfocusout:!0,ondeviceorientation:!0,ondevicemotion:!0,ontransitionend:!0,onanimationstart:!0,onanimationend:!0,onanimationiteration:!0,onmessage:!0,ononline:!0,onoffline:!0,onstorage:!0},X={bind:{updateFunction(n,{oldValue:e,value:t}){typeof t=="object"&&Object.entries(t).forEach(([s,r])=>{n.setAttribute(s,r)})}},show:{updateFunction:(n,{value:e})=>{let t=e?[""]:["none","important"];n.style.setProperty("display",...t)}},if:{updateFunction(n,{value:e}){let t=nodeRef.commentRef=nodeRef.commentRef||document.createComment("if");if(e){if(n.parentNode)return;t.replaceWith(n)}else n.replaceWith(t)}},loop:{deep:1,resolveExpression(n){return n.match(/([a-zA-Z]+)(?:\s*,\s*([a-zA-Z]+))?\s+in\s+([a-zA-Z.]+)/).slice(1)},getValue(n,e){let[t,s,r]=e;return te(n.data,r)},createChildContext({item:n,ctx:e,loopKey:t,loopIndex:s,key:r}){let i=$({[t]:n,[s]:r},a=>{});return Object.setPrototypeOf(i,e.data),{data:i,isLoop:!0}},updateFunction(n,e,{expression:t,helper:s},r){let{type:i,target:o,key:a,value:u,updateId:m,oldValue:y}=e,[v,h,l]=t,P=u,b=(g,w)=>{let f=document.createElement("div");return g.push(f),w&&f.append(...w.childNodes),f},V=s.node.content;if(n.parentNode,!P)return;let T=this.getNodeObject(n),k=T.lastLoop||[],N=Object.values(P),c=ve(k,N,!0),d=c.jobs,p=T.indexMap=T.indexMap||new Map,_=T.indexValue=T.indexValue||new Map,R=d.size===1?[...d][0]:!1;this.currentIsNested=this.isNested,this.isNested=!0;let F=[],L={indexGroup:!1,lastInGroup:0};c.remove.forEach(([g,w])=>{let f=p.get(g);E(()=>{f.nodes.forEach(x=>x.remove()),p.delete(g)})}),c.updated.forEach(([g,w,f])=>{let x=p.get(g);x.ctx.data[h]=w,E(()=>{p.set(w,x)})});let Te=c.move.length==P.length;c.move.forEach(([g,w])=>{let f=p.get(g),x=p.get(w),j=new Text("");f.ref=j,f.nodes[0].before(j);let S=x.ref||x.nodes[0];document.createDocumentFragment().append(...f.nodes),S.before(...f.nodes),f.ctx.data[h]=w,E(()=>{p.set(w,f),f.ref.remove(),delete f.ref})}),c.add.forEach(([g,w])=>{if(g=parseInt(g),typeof g=="string")throw new Error("Index must be a number");let f=this.createChildContext({path:l,item:w,ctx:r,loopKey:v,loopIndex:h,key:g}),x=V.cloneNode(!0);V.childNodes.forEach((S,Z)=>{re(S,x.childNodes[Z],f)}),this.addToUpdate(x,g,F,L,p,n);let j={nodes:[...x.childNodes],ctx:f,item:w};E(()=>{p.set(g,j)})}),this.currentIsNested?this.updateLoop(F):(this.updateLoop(F),E(()=>this.isNested=!1)),T.lastLoop=N},addToUpdate(n,e,t,s,r,i){let{indexGroup:o,lastInGroup:a}=s;(o===!1||e>a+1)&&(o=s.indexGroup=e,t[o]=t[o]||{nodes:[]});let u=t[o];if(!u.ref){let m=r.get(e);u.ref=m?.ref||m?.nodes[0]||i}s.lastInGroup=e,u.nodes.push(n)},updateLoop(n){n.forEach((e,t)=>{let{nodes:s,ref:r}=e;r.before(...s)})}}};window.createContext=oe;window.reactive=$;window.watch=ee;window.nextTick=E;function oe(n,e){e=e||le()||document.body,typeof n=="string"&&(n=$({}));let t={data:n,root:e},s=pe(e);return ge(t),{}}var H={reactive:new WeakMap},ke=Symbol("__isProxy");function Y(n){return n?n?.__isReactive:!1}var I={__isReactive:{get(n,e,t,s){return this.proxy==s}},__raw:{get(n){return n}},__parent:{set(n,e,t){return this.parent=t}},__key:{set(n,e,t){return this.key=t}}};function $(n,e=[],t,s,r){if(typeof n!="object")return n;if(!n)return;if(Y(n))return n.__parent=t,n.__key=s,n;let i=H.reactive.get(n);if(i)return i;let o=new C({target:n,parent:t,key:s,origin:r||n,callbacks:e}),a=new Proxy(n,o);return o.proxy=a,H.reactive.set(n,a),a}var q=[],C=class n{static handlers=[];static queue=[];static handlersByObject=new WeakMap;constructor(e={}){this.effects=new Set,this.constructor.handlers.push(this),this.origin=e.origin,this.target=e.target,this.queue=[],this.parent=e.parent,this.key=e.key,this.deepEffects=new Set,e.callbacks&&this.addDeepEffect(e.callbacks),this.target,this.constructor.handlersByObject.set(this.target,this)}runEffect(e,t,s){if(e.ran)return;E(()=>e.ran=!1);let i=typeof e=="function"?!0:e.deep;if(t&&i){if(i!==!0&&t>i)return;this.runNextUpdate(e,t,!1,s)}if(!t){let o=e.observing.get(this);this.runNextUpdate(e,0,o,s)}}runDeep(){let e=1,t=this,s=[],r=!1;for(;t;)t.key&&(r?r=`${t.key}.${r}`:r=t.key),s.push([t,e,r]),t=t.parent,e++;s.reverse(),s.forEach(([i,o,a])=>{let u={path:a,sourceTarget:i.target};i.deepEffects.forEach(m=>{this.runEffect(m,o,u)})})}runNextUpdate(e,t,s,r){s||(s=this.nextUpdate),Object.keys(s).forEach(i=>{if(s[i]&&this.nextUpdate.hasOwnProperty(i)){if(r?Object.assign(r,this.nextUpdate[i]):r=this.nextUpdate[i],typeof e=="function"){e(r,this);return}e.runWithPayload(r,this)}})}addDeepEffect(e){let t=this.deepEffects;typeof e=="function"||e instanceof D?t.add(e):Array.isArray(e)&&t.forEach(s=>{this.addDeepEffect(s)})}static get currentEffect(){return q.at(-1)}static set currentEffect(e){return e?q.push(e):q.pop(),!0}static getHandler(e){return this.handlersByObject.get(se(e))}addEffect(e,t,s){this.effects.has(e)||this.effects.add(e),e.observeProp(this,t)}get(e,t,s){let r=e[t];if(I[t]?.get)return I[t].get.call(this,e,t,r,s);let i=this.constructor.currentEffect;return i&&this.addEffect(i,t),typeof r=="object"?$(r,!1,this,t,this.origin):(Array.isArray(e),r)}set(e,t,s,r){if(I[t]?.set)return I[t].set.call(this,e,t,s,r);let i=e[t];return e[t]=s,Array.isArray(e)&&this.nextUpdate||this.queueMutation({type:"set",target:e,key:t,value:s,oldValue:i,origin:this.origin}),!0}deleteProperty(e,t){if(t in e){let s=e[t],r;return Array.isArray(e)&&(r=e.indexOf(s)),delete e[t],Array.isArray(e)&&this.nextUpdate||this.queueMutation({type:"delete",value:e[t],oldKey:r,target:e,key:t,oldValue:s,origin:this.origin}),!0}}triggerUpdate(){this.runDeep(),this.effects.forEach(e=>{this.runEffect(e)}),this.nextUpdate=!1}static runUpdates(){for(;this.queue.length;)this.queue.shift().triggerUpdate();this.updating=!1,U.runNextTick()}queueMutation(e){n.queue.includes(this)||n.queue.push(this),this.nextUpdate=this.nextUpdate||{},this.nextUpdate[e.key]=e,n.updating||(n.updating=!0,Promise.resolve().then(()=>{n.runUpdates()}))}};function ae(n,e){return e={...e||{}},new D(n,e)}var D=class n{onTrigger=!1;handler=!1;immediate=!0;deep=!1;static eventTarget=new EventTarget;static observingTarget=new WeakMap;static setTargetObserver(e,t){t=se(t);let s=C.getHandler(t);s&&s.addDeepEffect(e)}constructor(e,t){let s=["immediate","callback","onTrigger","deep","updater"];this.source=e,typeof e=="object"&&(this.deep=1,n.setTargetObserver(this,e)),s.forEach(i=>{t.hasOwnProperty(i)&&(this[i]=t[i])}),this.observing=new WeakMap;let r=this.run();this.immediate&&this.callback&&this.callback.call(void 0,{value:r}),this.nextUpdate={}}run(e={},t){let s=this.source,r;C.currentEffect=this,typeof s=="function"&&(r=s(e,t)),this.lastValue=r,this.deep&&Y(r)&&n.setTargetObserver(this,r),C.currentEffect=!1}runWithPayload(e,t){this.run(e,t),this.callback&&this.callback.call(void 0,e)}observeProp(e,t){let s=this.observing.get(e);s||(s={},this.observing.set(e,s)),s[t]=!0}};function ee(n,e,t){let r={callback:e,immediate:typeof t=="boolean"?t:!1,...t||{}},i=typeof n;if(!(i!=="object"&&i!=="function"))return ae(n,r)}function ue(n,e,t){e?.split;let s=e.split("."),r=n,i=s.pop();for(let o of s){if(!r)return;r=r[o]}r[i]=t}var U=class n{static isRendering=!1;static runNextTick(){if(this.isRendering)return;this.isRendering=!0;let e=n.nextTickQueue;setTimeout(()=>{for(;e.length;){let t=e.shift();t?.call&&t()}this.isRendering=!1})}static nextTickQueue=[]};function E(n){U.nextTickQueue.push(n),U.isRendering}var ce=new Map;U.getCache=ce;function te(n,e){e?.split;let t=e.split("."),s=n,r;for(let i of t){if(!s){r=void 0;break}s=s[i]}return r=s,r}function le(){return document.currentScript.previousElementSibling}var B=class{constructor(){this.map=new Map,this.idMap=new Map}get(e){if(e?.__sId)return this.idMap.get(e.__sId);let t=e?.getAttribute?e.getAttribute("__sId"):!1;return t?this.idMap.get(t):this.map.get(e)}set(e,t){return this.map.set(e,t),this.idMap.set(t.id,t)}has(e){return this.map.has(e)}getByDepth(e){return this.idMap.get(e)}},A=new B;var de=0,Q=[];function ne(n,e,t){Q.push([n,e,t])}var z=!1;function fe(n){if(!z){for(z=!0;Q.length;){let[e,t,s]=Q.pop();s?re(e,t,s):n?A.get(e).runNodeUpdates(e,s||n):we(e,t)}z=!1}}function he(n,e){if(n.__sCompiled)return A.get(n);if(n.dataset,n.tagName!=="TEMPLATE"&&(n.__inTemplate=e),n.nodeType==n.TEXT_NODE&&n.textContent.includes("{{")){setNode=!0;let t=be(n.textContent);t=t.map(s=>{if(s.path){let i=document.createTextNode(`{{${s.path}}}`);return i.__inTemplate=e,new O(i).addUpdate("text",s.path),i}let r=document.createTextNode(s);return r.__inTemplate=e,r}),n.replaceWith(...t)}if(n.attributes?.length){let t,s=n.attributes;Object.values(s).forEach(r=>{let i=r.value,o=r.name;if(o.startsWith(ie)){t=t||new O(n);let a=o.slice(2);X[a]&&(setNode=!0,t.addUpdate(a,i.slice(2,-2)),n.removeAttribute(o));return}if(J[o]){t=t||new O(n),t.addUpdate("events",i,{key:o.slice(2)}),n.removeAttribute(o);return}i.includes("{{")&&(t=t||new O(n),t.addUpdate("attrs",i.trim().slice(2,-2),{key:o}))})}if(n.tagName=="TEMPLATE"){let t=document.createComment("template");t.__inTemplate=e;let s=A.get(n);n.replaceWith(t),t.__sId=s.id,t.id=s.id,ne(t),s.root=t,document.body.append(n)}return{}}function pe(n){let e=!1;return me(n,t=>{(t.parentNode?.nodeType===11||t.textContent=="template")&&(e=t.parentNode),(t.previousSibling?.tagName=="TEMPLATE"||t.previousSibling?.textContent=="template")&&(e=!1),he(t,e)}),A}function ge(n){let{show:e,text:t,loop:s,attrs:r}=M.updaters;fe(n)}function me(n,e){let t=[n];for(;t.length>0;){let s=t.pop();if(s.hasAttribute&&s.hasAttribute("s-loop")&&s.tagName!=="TEMPLATE"){let i=document.createElement("template");i.setAttribute("s-loop",s.getAttribute("s-loop")),s.removeAttribute("s-loop"),s.after(i),i.content.appendChild(s),s=i}let r=s.tagName=="TEMPLATE"?s.content.childNodes:s.childNodes;e(s);for(let i=r.length-1;i>=0;i--)t.push(r[i])}}function be(n){let e=[],t=0,s=n.indexOf("{{");for(;s!==-1;){if(t!==s){let o=n.slice(t,s);e.push(o)}let r=n.indexOf("}}",s);if(r===-1)break;let i=n.slice(s+2,r).trim();e.push({path:i}),t=r+2,s=n.indexOf("{{",t)}if(t<n.length){let r=n.slice(t);e.push(r)}return e}function we(n,e){Array.isArray(n)||(n=[n]);let t=[...n];for(;t.length;){let s=t.pop(),r=A.get(s);r&&r.runNodeUpdates(s,e,!0);let i=s.childNodes;for(let o=i?.length-1;o>=0;o--)t.push(i[o])}}function Ee(n,e,t){let s=[[n,e]];for(;s.length;){let[r,i]=s.pop();i?.childNodes;let o=r.childNodes,a=i.childNodes;t(r,i);for(let u=o.length-1;u>=0;u--)s.push([o[u],a[u]])}}var O=class{node=!1;constructor(e,t={}){this.id=`id-${de++}`,this.node=e,this.updates=new Set,e.inTemplate?this.inTemplate=!0:e.tagName!=="TEMPLATE"&&ne(e),A.set(e,this),e.__sCompiled}addUpdate(e,t,s){let r=M.getInstance(e);if(!r)return;let i=new G(r,t,s);i.helper=this,this.updates.add(i)}runNodeUpdates(e,t,s){e.__sId||(e.__sId=this.id),this.updates.forEach(r=>{s?r.forceUpdate(e,t):r.setupNode(e,t)})}},M=class{static updaters={};priority=10;constructor(e){this.constructor.updaters[e.id]=this,this.updateFunction=e.updateFunction,Object.keys(e).forEach(t=>{this[t]=e[t]})}static getInstance(e){return this.updaters[e]}updateFunction(){}nodes=new WeakMap;getNodeObject(e){if(this.nodes.has(e))return this.nodes.get(e);let t={expressions:{}};return this.nodes.set(e,t),t}getPropertyTarget(e,t){for(;!e.hasOwnProperty(t);){if(e.hasOwnProperty(t))return e;let s=Object.getPrototypeOf(e);if(s)e=s;else return e}return e}resolveExpression(e){return e=e.trim(),e.startsWith("(")?new Function("return "+e):e}};var G=class{constructor(e,t,s){this.ctxs=new Set,this.ctxNodes=new WeakMap,this.updater=e;let[r,i]=t.split(":");this.debug=i,this.raw=r,s&&(this.config=s),this.expression=e.resolveExpression(r)}forceUpdate(e,t){if(this.updater.effect===!1||e.__inTemplate)return;let s=this.updater,r=this.getValue(t);s.updateFunction,s.updateFunction(e,{value:r},this,t)}getValue(e){return this.updater.getValue?this.updater.getValue(e,this.expression):typeof this.expression=="function"?this.expression.call(e.data):te(e.data,this.expression)}setupEffect(e){if(this.ctxNodes.has(e))return this.ctxNodes.get(e);let t=new Set;return this.ctxNodes.set(e,t),this.updater.effect===!1||(this.effect=ee(()=>this.getValue(e),s=>{this.ctxNodes.get(e).forEach(r=>{let i=this.getValue(e);this.updater.updateFunction(r,{value:i},this,e)})},{deep:this.updater.deep??!0,updater:this.updater})),t}getCtxNodes(e){if(this.ctxNodes.has(e))return this.ctxNodes.get(e);let t=new Set;return this.ctxNodes.set(e,t),t}setupNode(e,t){let s=this.setupEffect(t);s.has(e)||(this.setupEffect(t),s.add(e),this.updater.updateFunction(e,{value:this.effect?.lastValue},this,t))}removeNode(){}},_e=new M({priority:3,id:"text",updateFunction(n,{value:e},{expression:t,debug:s},r){n.dataset&&n.dataset.la,e&&e.attrs,e&&typeof e=="object"&&(e=JSON.stringify(e)),!e&&e!==0&&(e=""),n.textContent=e}}),Me=new M({priority:4,id:"attrs",updateFunction(n,{value:e,oldValue:t},{config:s,expression:r},i){let o=s.key;o=="onkeypress",n.setAttribute(o,e),o=="value"&&(n.value=e,n.__inputEvent||(n.__inputEvent=!0,E(()=>{n.addEventListener("input",a=>{let u=Ne(a.target);ue(i.data,r,u),E(()=>{n.focus()})})})))}}),xe=new Map,ye=new M({priority:5,id:"events",effect:!1,forceUpdate(){},updateFunction(n,e,{expression:t,config:s},r){let i=s.key;E(()=>{this.setupEvent(n,i,t,r)})}});Object.assign(ye,{setupEvent(n,e,t,s){let r=this.nodes.get(n);r||(r={},xe.set(n,r));let i=e,o=r.listening=r.listening||{},a=s.data;if(o[e]){if(o[e].includes(n))return;o[e].push(n);let v=r.eventCallbacks[e];E(()=>{n.addEventListener(i,h=>{u.includes(n)&&v.call(a,h,n,a)})});return}let u=o[e]=o[e]||[];if(r.listening[e].includes(n))return;r.listening[e].push(n);let m=t;if(!J["on"+e])return;let y=m;r.eventCallbacks=r.eventCallbacks||{},r.eventCallbacks[e]=y,E(()=>{n.addEventListener(i,v=>{u.includes(n)&&y.call(a,v,n,a)})})},resolveExpression(n){let e,t,s,r,i="";n.startsWith,n.startsWith("(")&&(t=!0),n.match(/^[a-zA-Z]/)&&(s=!0),n.includes("(")||(i="(event, node)");let o="",a=`this.${n}${i}`;t&&(o=n.match(/\{.+\(([^)]+)\)/)?.[1]||"",a=`(${n})(event)`),s&&(o=n.match(/\(([^)]+)\)/)?.[1]||"");let u=`
            
                let {${o}} = this
        
                ${a}   
            `;return new Function("event","node","ctx","window",u)},getEventFunction(n){let e,t,s,r,i="";n.startsWith,n.startsWith("(")&&(t=!0),n.match(/^[a-zA-Z]/)&&(s=!0),n.includes("(")||(i="(event, node)");let o="",a=`this.${n}${i}`;t&&(o=n.match(/\{.+\(([^)]+)\)/)?.[1]||"",a=`(${n})(event)`),s&&(o=n.match(/\(([^)]+)\)/)?.[1]||"");let u=`
            
                let {${o}} = this
        
                ${a}   
            `;return new Function("event","node","ctx","window",u)}});Object.entries(X).forEach(([n,e])=>{new M({id:n,...e})});function se(n){return typeof n!="object"?n:n.__raw||n}function re(n,e,t){Ee(n,e,(s,r)=>{let i=A.get(s);i&&i.runNodeUpdates(r,t)})}function Ne(n){let{type:e,value:t,checked:s}=n;switch(e){case"number":return t===""?null:+t;case"checkbox":return s;case"radio":return s;case"date":return t===""?null:new Date(t);case"range":return t===""?null:+t;case"file":return n.files;default:return t}}var W=n=>n&&typeof n=="object"||typeof n=="function",K=class{constructor(){this.weakMap=new WeakMap,this.map=new Map}set(e,t){return W(e)?this.weakMap.set(e,t):this.map.set(e,t),this}get(e){return W(e)?this.weakMap.get(e):this.map.get(e)}has(e){return W(e)?this.weakMap.has(e):this.map.has(e)}delete(e){return W(e)?this.weakMap.delete(e):this.map.delete(e)}};function ve(n,e,t){let s=t?n:Object.values(n),r=t?e:Object.values(e),o=(s.length>r.length?s:r).length,a=new Set,u=[],m=[],y=[],v=[],h=new K,l=-1,P=s.length==0,b=0,V=[];for(;++l<o;){let N=V[l]=[];if(P){b=r.length,y.push(...Object.entries(r)),a.add("add");break}let c=s[l],d=r[l],p=s.hasOwnProperty(l),_=r.hasOwnProperty(l);_&&(h.has(d)||h.set(d,[]),h.has(c)?h.has(c)&&h.get(c).push(l):h.set(c,[l]));let R,F;if(c!=d){if(_&&s.hasOwnProperty(l-b)&&s[l-b]==d){v.push([l-b,l,c,b,"mutation"]);continue}if(!p){b++,y.push([l,d,"existOld"]),a.add("add"),N.push(["add",[l,d,"existOld"]]);continue}if(_&&!s.includes(d)&&(b++,y.push([l,d,"default"]),N.push(["add",[l,d,"default"]]),a.add("add"),R=!0,F=!0),l<s.length&&!r.includes(c)&&(b--,m.push([l,c,d]),N.push(["remove",[l,c,d]]),a.add("remove"),R=!0),s.includes(d)){let L=[void 0,l,c,d,"oldToNew"];u.push(L),N.push(["move",L]),a.add("move");continue}}}let T=u.length,k=-1;for(let N=0;N<T;N++){k++;let c=u[k],d=c[3];h.has(d);let p=h.get(d);if(!p)throw new Error("The value should have index");if(!p.length){k--,u.splice(k,1),y.push([c[1],c[3],"move"]),a.add("add"),b++;continue}let _=p.shift();if(_==c[1]){k--,u.splice(k,1),y.push([c[1],c[3],"move"]),a.add("add"),b++;continue}c[0]=_}return u.length==0&&a.has("move")&&a.delete("move"),b+s.length,r.length,{indexActions:V,jobs:a,add:y,remove:m,move:u,oldValueIndexes:h,updated:v,offset:b}}})();
//# sourceMappingURL=out.js.map
