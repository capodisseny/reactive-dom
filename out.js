(()=>{var re="s-",Z={onclick:!0,ondblclick:!0,onmousedown:!0,onmouseup:!0,onmousemove:!0,onmouseover:!0,onmouseout:!0,onmouseenter:!0,onmouseleave:!0,oncontextmenu:!0,onkeydown:!0,onkeyup:!0,onkeypress:!0,onchange:!0,onsubmit:!0,onreset:!0,oninput:!0,oninvalid:!0,onselect:!0,onload:!0,onunload:!0,onresize:!0,onscroll:!0,onbeforeunload:!0,onhashchange:!0,onerror:!0,onDOMContentLoaded:!0,onreadystatechange:!0,oncopy:!0,oncut:!0,onpaste:!0,ondrag:!0,ondragstart:!0,ondragend:!0,ondragover:!0,ondragenter:!0,ondragleave:!0,ondrop:!0,onplay:!0,onpause:!0,onended:!0,ontimeupdate:!0,onvolumechange:!0,onseeked:!0,onseeking:!0,ondurationchange:!0,oncanplay:!0,oncanplaythrough:!0,ontouchstart:!0,ontouchend:!0,ontouchmove:!0,ontouchcancel:!0,onpointerdown:!0,onpointerup:!0,onpointermove:!0,onpointerover:!0,onpointerout:!0,onpointerenter:!0,onpointerleave:!0,onpointercancel:!0,onfocus:!0,onblur:!0,onfocusin:!0,onfocusout:!0,ondeviceorientation:!0,ondevicemotion:!0,ontransitionend:!0,onanimationstart:!0,onanimationend:!0,onanimationiteration:!0,onmessage:!0,ononline:!0,onoffline:!0,onstorage:!0},J={bind:{updateFunction(t,{oldValue:e,value:n}){typeof n=="object"&&Object.entries(n).forEach(([s,r])=>{t.setAttribute(s,r)})}},show:{updateFunction:(t,{value:e})=>{let n=e?[""]:["none","important"];t.style.setProperty("display",...n)}},if:{updateFunction(t,{value:e}){let n=nodeRef.commentRef=nodeRef.commentRef||document.createComment("if");if(e){if(t.parentNode)return;n.replaceWith(t)}else t.replaceWith(n)}},loop:{deep:1,resolveExpression(t){return t.match(/([a-zA-Z]+)(?:\s*,\s*([a-zA-Z]+))?\s+in\s+([a-zA-Z.]+)/).slice(1)},getValue({expression:t},e){let[n,s,r]=t;return I(e,r)},createChildContext({path:t,obj:e,ctx:n,loopKey:s,loopIndex:r}){return{data:new Proxy(n.data,{get(i,o){if(o==r)return e.key;if(o==s){let a=e.key;return I(i,`${t}.${a}`)}return Reflect.get(i,o)},set(i,o,a){return o==r?!0:o==s?Y(i,`${t}.${e.key}`,a):Reflect.set(i,o,a)}}),isLoop:!0}},updateFunction(t,e,{expression:n,helper:s},r){let{type:i,target:o,key:a,value:u,updateId:f,oldValue:p}=e,[d,c,C]=n,T=u,P=(l,m)=>{let b=document.createElement("div");return l.push(b),m&&b.append(...m.childNodes),b},L=s.node.content;if(t.parentNode,!T)return;let j=this.getNodeObject(t),se=j.lastLoop||[],h=we(T,se),Q=h.jobs;if((Q.length==1?Q[0]:!1)=="keep")return;let w=j.loopValues=j.loopValues||new Map,A=[],M=[],S=r.isLoop,$=h.toAdd.length==h.toRemove.length&&!h.toReposition.length;if($&&h.types.length==1&&h.types[0]!="object")return;let k=[];h.toKeep.forEach(([l,m],b)=>{let E=w.get(l),g=S?P(M):document.createDocumentFragment();g.append(...E.nodes),A[l]=g}),h.toRemove.forEach(([l,m],b)=>{if($&&typeof m!="object"&&typeof m==typeof h.toAdd[b][1])return;let E=w.get(l);k.push(()=>w.delete(l)),E.nodes.forEach(g=>g.remove())}),h.toReposition.forEach(([l,m,b],E)=>{let g=w.get(b);k.push(()=>w.set(l,g));let v=S?P(M):document.createDocumentFragment();v.append(...g.nodes),g.key=l,ge(v,g.ctx),A[l]=v}),h.toAdd.forEach(([l,m],b)=>{if($&&typeof m!="object"&&typeof m==typeof h.toRemove[b][1]){let _=w.get(h.toRemove[b][0]);k.push(()=>w.set(l,_));let W=S?P(M):document.createDocumentFragment();W.append(..._.nodes),_.key=l,_.item=m,A[l]=W;return}let E={key:l,item:m},g=this.createChildContext({path:C,obj:E,ctx:r,loopKey:d,loopIndex:c});k.push(()=>w.set(l,E)),E.ctx=g;let v=L.cloneNode(!0);L.childNodes.forEach((_,W)=>{ne(_,v.childNodes[W],g)}),r.isLoop&&v.nodeType==11&&(v=P(M,v)),E.nodes=[...v.childNodes],A[l]=v}),k.forEach(l=>l()),T.length!=A.length,t.__inTemplate,te(),requestAnimationFrame(()=>{t.before(...A)}),M.forEach(l=>l.replaceWith(...l.childNodes)),j.lastLoop=[...T]}}};window.createContext=ie;window.reactive=B;window.watch=G;window.nextTick=x;function ie(t,e){e=e||ue()||document.body,typeof t=="string"&&(t=B({}));let n={data:t,root:e},s=de(e);return pe(n),{}}var z={reactive:new WeakMap},ye=Symbol("__isProxy");function X(t){return t?t?.__isReactive:!1}var V={__isReactive:{get(t,e,n,s){return this.proxy==s}},__raw:{get(t){return t}},__setEffect:{set(t,e,n){return this.effects.has(n)||this.effects.add(n),!0}}};function B(t,e=[],n,s){if(typeof t!="object"||X(t))return t;let r=z.reactive.get(t);if(r)return r;let i=new O({target:t,parents:n,origin:s||t,callbacks:e}),o=new Proxy(t,i);return i.proxy=o,z.reactive.set(t,o),o}var D=[],O=class t{static handlers=[];static queue=[];static handlersByObject=new WeakMap;constructor(e={}){this.effects=new Set,this.constructor.handlers.push(this),this.origin=e.origin,this.target=e.target,this.queue=[],this.parents=[],this.deepEffects=new Set,e.callbacks&&this.addDeepEffect(e.callbacks),e.parents&&this.parents.push(...e.parents),this.constructor.handlersByObject.set(this.target,this)}addDeepEffect(e){let n=this.deepEffects;typeof e=="function"||e instanceof F?n.add(e):Array.isArray(e)&&n.forEach(s=>{this.addDeepEffect(s)})}static get currentEffect(){return D.at(-1)}static set currentEffect(e){return e?D.push(e):D.pop(),!0}static getHandler(e){return this.handlersByObject.get(e)}addEffect(e,n,s){this.effects.has(e)||this.effects.add(e),e.observeProp(this,n)}get(e,n,s){let r=e[n];if(V[n]?.get)return V[n].get.call(this,e,n,r,s);let i=this.constructor.currentEffect;return i&&this.addEffect(i,n),typeof r=="object"?B(r,!1,[this,...this.parents],this.origin):(Array.isArray(e),r)}set(e,n,s,r){if(V[n]?.set)return V[n].set.call(this,e,n,s,r);let i,o=e[n];return Array.isArray(e),e[n]=s,this.queueMutation({type:"set",target:e,key:n,oldKey:i,value:s,oldValue:o,origin:this.origin}),!0}deleteProperty(e,n){if(n in e){let s=e[n],r;return Array.isArray(e)&&(r=e.indexOf(s)),delete e[n],this.queueMutation({type:"delete",value:e[n],oldKey:r,target:e,key:n,oldValue:s,origin:this.origin}),!0}}triggerUpdate(){let e=F.eventTarget,n=new CustomEvent("deepEffect",{detail:{handler:this,target:this.target,parents:[this,...this.parents]}});e.dispatchEvent(n),this.effects.forEach(s=>{s.ran||(typeof s=="function"&&(s(this.nextUpdate),s.ran=!0,x(()=>s.ran=!1)),s.updateWithHandler(this))}),this.nextUpate=!1}static runUpdates(){for(;this.queue.length;)this.queue.shift().triggerUpdate();this.updating=!1,R.runNextTick()}queueMutation(e){t.queue.includes(this)||t.queue.push(this),this.nextUpdate=this.nextUpdate||{},this.nextUpdate[e.key]=e,t.updating||(t.updating=!0,Promise.resolve().then(()=>{t.runUpdates()}))}};function oe(t,e){e={...e||{}},new F(t,e)}var F=class t{onTrigger=!1;handler=!1;immediate=!0;deep=!1;static eventTarget=new EventTarget;static observingTarget=new WeakMap;static _=(()=>{this.eventTarget.addEventListener("deepEffect",e=>{let n=e.detail,{target:s,parents:r,handler:i}=n,o=0;r.forEach(a=>{o++,a.deepEffects.forEach(u=>{if(typeof u=="function"){u(i.nextUpdate);return}u.deep&&(u.deep!==!0&&o>u.deep||u.updateWithHandler(i,!0))})})})})();static setTargetObserver(e,n){n=ve(n);let s=O.getHandler(n);e.deep&&s.addDeepEffect(e)}constructor(e,n){let s=["immediate","callback","onTrigger","deep","updater"];this.source=e,typeof e=="object"&&(this.deep=1,t.setTargetObserver(this,e)),s.forEach(i=>{n.hasOwnProperty(i)&&(this[i]=n[i])}),this.observing=new WeakMap;let r=this.runEffect({});this.immediate&&this.callback&&this.callback.call(void 0,{value:r}),this.nextUpate={}}runEffect(e,n){if(this.ran)return;let s=this.source,r;return O.currentEffect=this,typeof s=="function"&&(r=s(e,n)),this.lastValue=r,this.deep&&X(r)&&t.setTargetObserver(this,r),O.currentEffect=!1,this.callback&&this.callback.call(void 0,e),this.ran=!0,x(()=>{this.ran=!1}),r}updateWithHandler(e,n){if(this.ran)return;let s=this.observing.get(e);!s&&!n||(s&&Object.keys(s).forEach(r=>{e.nextUpdate.hasOwnProperty(r)&&this.runEffect(e.nextUpdate[r],e)}),n&&this.deep&&this.runEffect(e.nextUpdate,e))}observeProp(e,n){let s=this.observing.get(e);s||(s={},this.observing.set(e,s)),s[n]=!0}};function G(t,e,n){let r={callback:e,immediate:typeof n=="boolean"?n:!1,...n||{}},i=typeof t;i!=="object"&&i!=="function"||oe(t,r)}function Y(t,e,n){e?.split;let s=e.split("."),r=t,i=s.pop();for(let o of s){if(!r)return;r=r[o]}r[i]=n}var R=class t{static isRendering=!1;static runNextTick(){if(this.isRendering)return;this.isRendering=!0;let e=t.nextTickQueue;requestAnimationFrame(()=>{for(;e.length;)e.shift()();this.isRendering=!1})}static nextTickQueue=[]};function x(t){R.nextTickQueue.push(t)}var ae=new Map;R.getCache=ae;function I(t,e){e?.split;let n=e.split("."),s=t,r;for(let i of n){if(!s){r=void 0;break}s=s[i]}return r=s,r}function ue(){return document.currentScript.previousElementSibling}var K=class{constructor(){this.map=new Map,this.idMap=new Map}get(e){if(e?.__sId)return this.idMap.get(e.__sId);let n=e?.getAttribute?e.getAttribute("__sId"):!1;return n?this.idMap.get(n):this.map.get(e)}set(e,n){return this.map.set(e,n),this.idMap.set(n.id,n)}has(e){return this.map.has(e)}getByDepth(e){return this.idMap.get(e)}},N=new K;var ce=0,H=[];function ee(t,e,n){H.push([t,e,n])}var q=!1;function te(t){if(!q){for(q=!0;H.length;){let[e,n,s]=H.pop();s?ne(e,n,s):N.get(e).runNodeUpdates(e,s||t)}q=!1}}function le(t,e){if(t.__sCompiled)return N.get(t);let n={updaters:{}};t.dataset;let s=!1;if(t.tagName!=="TEMPLATE"&&(t.__inTemplate=e),t.nodeType==t.TEXT_NODE&&t.textContent.includes("{{")){s=!0;let r=he(t.textContent);r=r.map(i=>{if(i.path){let a=document.createTextNode(`{{${i.path}}}`);return a.__inTemplate=e,new U(a).addUpdate("text",{expression:i.path}),a}let o=document.createTextNode(i);return o.__inTemplate=e,o}),t.replaceWith(...r)}if(t.attributes?.length){let r,i=t.attributes;Object.values(i).forEach(o=>{let a=o.value,u=o.name;if(u.startsWith(re)){r=r||new U(t);let f=u.slice(2);J[f]&&(s=!0,r.addUpdate(f,{expression:a.slice(2,-2)}),t.removeAttribute(u));return}if(Z[u]){r=r||new U(t),r.addUpdate("events",{expression:a,key:u.slice(2)}),t.removeAttribute(u);return}a.includes("{{")&&(r=r||new U(t),r.addUpdate("attrs",{expression:a.trim().slice(2,-2),key:u}))})}if(t.tagName=="TEMPLATE"){let r=document.createComment("template");r.__inTemplate=e;let i=N.get(t);t.replaceWith(r),r.__sId=i.id,r.id=i.id,ee(r),i.root=r,document.body.append(t)}return{}}function de(t){let e=!1;return fe(t,n=>{(n.parentNode?.nodeType===11||n.textContent=="template")&&(e=n.parentNode),(n.previousSibling?.tagName=="TEMPLATE"||n.previousSibling?.textContent=="template")&&(e=!1),le(n,e)}),N}function pe(t){let{show:e,text:n,loop:s,attrs:r}=y.updaters;te(t)}function fe(t,e){let n=[t];for(;n.length>0;){let s=n.pop();if(s.hasAttribute&&s.hasAttribute("s-loop")&&s.tagName!=="TEMPLATE"){let i=document.createElement("template");i.setAttribute("s-loop",s.getAttribute("s-loop")),s.removeAttribute("s-loop"),s.after(i),i.content.appendChild(s),s=i}let r=s.tagName=="TEMPLATE"?s.content.childNodes:s.childNodes;e(s);for(let i=r.length-1;i>=0;i--)n.push(r[i])}}function he(t){let e=[],n=0,s=t.indexOf("{{");for(;s!==-1;){if(n!==s){let o=t.slice(n,s);e.push(o)}let r=t.indexOf("}}",s);if(r===-1)break;let i=t.slice(s+2,r).trim();e.push({path:i}),n=r+2,s=t.indexOf("{{",n)}if(n<t.length){let r=t.slice(n);e.push(r)}return e}function ge(t,e){let n=[t];for(;n.length;){let s=n.pop(),r=N.get(s);r&&r.runNodeUpdates(s,e,!0);let i=s.childNodes;for(let o=i?.length-1;o>=0;o--)n.push(i[o])}}function me(t,e,n){let s=[[t,e]];for(;s.length;){let[r,i]=s.pop();i?.childNodes;let o=r.childNodes,a=i.childNodes;n(r,i);for(let u=o.length-1;u>=0;u--)s.push([o[u],a[u]])}}var U=class{node=!1;updates=[];constructor(e,n={}){let s=["updaters"];this.id=`id-${ce++}`,this.node=e,e.inTemplate?this.inTemplate=!0:e.tagName!=="TEMPLATE"&&ee(e),N.set(e,this),e.__sCompiled}addUpdate(e,n){let s=y.getInstance(e);if(!s)return;let r=s.registerHelper(this,n);this.updates.push({updater:s,payload:r})}runNodeUpdates(e,n,s){e.__sId||(e.__sId=this.id),Object.values(this.updates).forEach(r=>{s?r.updater.forceUpdate(e,r.payload,n):r.updater.runNodeUpdate(e,r.payload,n,r)})}},y=class{priority=10;static updaters={};constructor(e){this.constructor.updaters[e.id]=this,this.updateFunction=e.updateFunction;let n=["getValue","resolveExpression","effect","type","priority","id"];Object.keys(e).forEach(s=>{this[s]=e[s]})}static getInstance(e){return this.updaters[e]}type=!1;init(e){}updateFunction(){}nodes=new WeakMap;registerHelper(e,n){let[s,r]=n.expression.split(":");n.expression=s,n.debug=r,this.registerExpression(s);let i=s,o=this.expressions[i];return{...n,expression:o,raw:i,helper:e}}getNodeObject(e){if(this.nodes.has(e))return this.nodes.get(e);let n={expressions:{}};return this.nodes.set(e,n),n}getUpdatePayload(){return{ctx:this.ctx}}runUpdate(e){this.nodes.forEach(({node:n,payload:s})=>{this.runNodeUpdate(n,s,e)})}effect(){return this.getValue(...arguments)}getValue({expression:e},n){return I(n,e)}getPropertyTarget(e,n){for(;!e.hasOwnProperty(n);){if(e.hasOwnProperty(n))return e;let s=Object.getPrototypeOf(e);if(s)e=s;else return e}return e}getValueWithPayload(e,n){let s=e.expression||e,r=s;return s=this.expressions[s],this.getValue(e,n.data)}expressions={};registerExpression(e){if(this.expressions[e])return;let n=e;this.resolveExpression&&(n=this.resolveExpression(e)),this.expressions[e]=n}forceUpdate(e,n,s){if(e.__inTemplate)return;let r=this.getValueWithPayload(n,s);this.updateFunction(e,{value:r},n,s)}runNodeUpdate(e,n,s,r){if(e.__inTemplate)return;let i=this.getValueWithPayload(n,s),o=this.getNodeObject(e);if(o.originalUpdate)return;if(o.originalUpdate=r,!this.effect){this.updateFunction(e,{value:i},n,s);return}let a=this._effectUpdates=this._effectUpdates||new WeakMap,u=!a.get(r),f=a.get(r);f||(f=[],a.set(r,f)),f.push({payload:n,node:e,ctx:s}),this.updateFunction(e,{value:i},n,s),u&&(n.expression.includes(","),this.effect,G(()=>this.getValueWithPayload(n,s),p=>{a.get(r).forEach(({node:c,payload:C,ctx:T},P)=>{let L=this.getValueWithPayload(C,T);C.debug,this.updateFunction(c,{...p,value:L},C,T)})},{deep:this.deep??!0,updater:this}))}},Te=new y({priority:3,id:"text",updateFunction(t,{value:e},{expression:n,debug:s},r){t.dataset&&t.dataset.la,e&&e.attrs,typeof e=="object"&&(e=JSON.stringify(e)),t.textContent=e}}),Ne=new y({priority:4,id:"attrs",updateFunction(t,{value:e,oldValue:n},{key:s,expression:r},i){s=="onkeypress",t.setAttribute(s,e),s=="value"&&(t.value=e,t.__inputEvent||(t.__inputEvent=!0,x(()=>{t.addEventListener("input",o=>{Y(i.data,r,o.target.value),x(()=>{t.focus()})})})))}}),be=new Map,Ee=new y({priority:5,id:"events",effect:!1,updateFunction(t,{value:e},{expression:n,key:s},r){x(()=>{this.setupEvent(t,s,n,r)})}});Object.assign(Ee,{setupEvent(t,e,n,s){let r=this.nodes.get(t);r||(r={},be.set(t,r));let i=e,o=r.listening=r.listening||{},a=s.data;if(o[e]){if(o[e].includes(t))return;o[e].push(t);let d=r.eventCallbacks[e];x(()=>{t.addEventListener(i,c=>{u.includes(t)&&d.call(a,c,t,a)})});return}let u=o[e]=o[e]||[];if(r.listening[e].includes(t))return;r.listening[e].push(t);let f=n;if(!Z["on"+e])return;let p=this.getEventFunction(f);r.eventCallbacks=r.eventCallbacks||{},r.eventCallbacks[e]=p,x(()=>{t.addEventListener(i,d=>{u.includes(t)&&p.call(a,d,t,a)})})},getEventFunction(t){let e,n,s,r,i="";t.startsWith("(")&&(n=!0),t.match(/^[a-zA-Z]/)&&(s=!0),t.includes("(")||(i="(event, node)");let o="",a=`this.${t}${i}`;n&&(o=t.match(/\{.+\(([^)]+)\)/)?.[1]||"",a=`(${t})(event)`),s&&(o=t.match(/\(([^)]+)\)/)?.[1]||"");let u=`
            
                let {${o}} = this
        
                ${a}   
            `;return new Function("event","node","ctx","window",u)}});Object.entries(J).forEach(([t,e])=>{new y({id:t,...e})});function ve(t){return typeof t!="object"?t:t.__raw||t}function we(t,e){let n=[],s=[],r=[],i=[],o=new Set,a=new Set;if(Array.isArray(t)&&Array.isArray(e)){let f=new Map;e.forEach((p,d)=>f.set(p,d));for(let p=0;p<t.length;p++){let d=t[p];o.add(typeof d);let c=f.get(d);c!==void 0?(p===c?(i.push([p,d]),a.add("keep")):(r.push([p,d,c,e[c]]),a.add("move")),f.delete(d)):(n.push([p,d]),a.add("add"))}f.forEach((p,d)=>{o.add(typeof d),s.push([p,d]),a.add("remove")})}else{let f=Object.keys(t),p=Object.keys(e),d=new Set(p);f.forEach(c=>{o.add(typeof t[c]),e.hasOwnProperty(c)?(t[c]===e[c]?(i.push([c,t[c]]),a.add("keep")):(r.push([c,t[c],c,e[c]]),a.add("move")),d.delete(c)):(n.push([c,t[c]]),a.add("add"))}),d.forEach(c=>{o.add(typeof e[c]),s.push([c,e[c]]),a.add("remove")})}return{jobs:Array.from(a),toAdd:n,toRemove:s,toReposition:r,toKeep:i,types:Array.from(o)}}function ne(t,e,n){me(t,e,(s,r)=>{let i=N.get(s);i&&i.runNodeUpdates(r,n)})}})();
//# sourceMappingURL=out.js.map