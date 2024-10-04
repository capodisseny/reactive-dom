"use strict";
var PetiteVue = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // other-libraries/petite-vue/src/index.ts
  var src_exports = {};
  __export(src_exports, {
    createApp: () => createApp,
    nextTick: () => nextTick,
    reactive: () => reactive
  });

  // other-libraries/petite-vue/node_modules/@vue/shared/dist/shared.esm-bundler.js
  // @__NO_SIDE_EFFECTS__
  function makeMap(str) {
    const map = /* @__PURE__ */ Object.create(null);
    for (const key of str.split(",")) map[key] = 1;
    return (val) => val in map;
  }
  __name(makeMap, "makeMap");
  var EMPTY_OBJ = true ? Object.freeze({}) : {};
  var EMPTY_ARR = true ? Object.freeze([]) : [];
  var extend = Object.assign;
  var remove = /* @__PURE__ */ __name((arr, el) => {
    const i = arr.indexOf(el);
    if (i > -1) {
      arr.splice(i, 1);
    }
  }, "remove");
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var hasOwn = /* @__PURE__ */ __name((val, key) => hasOwnProperty.call(val, key), "hasOwn");
  var isArray = Array.isArray;
  var isMap = /* @__PURE__ */ __name((val) => toTypeString(val) === "[object Map]", "isMap");
  var isDate = /* @__PURE__ */ __name((val) => toTypeString(val) === "[object Date]", "isDate");
  var isString = /* @__PURE__ */ __name((val) => typeof val === "string", "isString");
  var isSymbol = /* @__PURE__ */ __name((val) => typeof val === "symbol", "isSymbol");
  var isObject = /* @__PURE__ */ __name((val) => val !== null && typeof val === "object", "isObject");
  var objectToString = Object.prototype.toString;
  var toTypeString = /* @__PURE__ */ __name((value) => objectToString.call(value), "toTypeString");
  var toRawType = /* @__PURE__ */ __name((value) => {
    return toTypeString(value).slice(8, -1);
  }, "toRawType");
  var isIntegerKey = /* @__PURE__ */ __name((key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key, "isIntegerKey");
  var cacheStringFunction = /* @__PURE__ */ __name((fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  }, "cacheStringFunction");
  var camelizeRE = /-(\w)/g;
  var camelize = cacheStringFunction(
    (str) => {
      return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
    }
  );
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cacheStringFunction(
    (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
  );
  var capitalize = cacheStringFunction((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  var toHandlerKey = cacheStringFunction(
    (str) => {
      const s2 = str ? `on${capitalize(str)}` : ``;
      return s2;
    }
  );
  var hasChanged = /* @__PURE__ */ __name((value, oldValue) => !Object.is(value, oldValue), "hasChanged");
  var toNumber = /* @__PURE__ */ __name((val) => {
    const n = isString(val) ? Number(val) : NaN;
    return isNaN(n) ? val : n;
  }, "toNumber");
  function normalizeStyle(value) {
    if (isArray(value)) {
      const res = {};
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
        if (normalized) {
          for (const key in normalized) {
            res[key] = normalized[key];
          }
        }
      }
      return res;
    } else if (isString(value) || isObject(value)) {
      return value;
    }
  }
  __name(normalizeStyle, "normalizeStyle");
  var listDelimiterRE = /;(?![^(]*\))/g;
  var propertyDelimiterRE = /:([^]+)/;
  var styleCommentRE = /\/\*[^]*?\*\//g;
  function parseStringStyle(cssText) {
    const ret = {};
    cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return ret;
  }
  __name(parseStringStyle, "parseStringStyle");
  function normalizeClass(value) {
    let res = "";
    if (isString(value)) {
      res = value;
    } else if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const normalized = normalizeClass(value[i]);
        if (normalized) {
          res += normalized + " ";
        }
      }
    } else if (isObject(value)) {
      for (const name in value) {
        if (value[name]) {
          res += name + " ";
        }
      }
    }
    return res.trim();
  }
  __name(normalizeClass, "normalizeClass");
  var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  var isBooleanAttr = /* @__PURE__ */ makeMap(
    specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`
  );
  function looseCompareArrays(a, b) {
    if (a.length !== b.length) return false;
    let equal = true;
    for (let i = 0; equal && i < a.length; i++) {
      equal = looseEqual(a[i], b[i]);
    }
    return equal;
  }
  __name(looseCompareArrays, "looseCompareArrays");
  function looseEqual(a, b) {
    if (a === b) return true;
    let aValidType = isDate(a);
    let bValidType = isDate(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? a.getTime() === b.getTime() : false;
    }
    aValidType = isSymbol(a);
    bValidType = isSymbol(b);
    if (aValidType || bValidType) {
      return a === b;
    }
    aValidType = isArray(a);
    bValidType = isArray(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? looseCompareArrays(a, b) : false;
    }
    aValidType = isObject(a);
    bValidType = isObject(b);
    if (aValidType || bValidType) {
      if (!aValidType || !bValidType) {
        return false;
      }
      const aKeysCount = Object.keys(a).length;
      const bKeysCount = Object.keys(b).length;
      if (aKeysCount !== bKeysCount) {
        return false;
      }
      for (const key in a) {
        const aHasKey = a.hasOwnProperty(key);
        const bHasKey = b.hasOwnProperty(key);
        if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
          return false;
        }
      }
    }
    return String(a) === String(b);
  }
  __name(looseEqual, "looseEqual");
  function looseIndexOf(arr, val) {
    return arr.findIndex((item) => looseEqual(item, val));
  }
  __name(looseIndexOf, "looseIndexOf");

  // other-libraries/petite-vue/node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
  function warn(msg, ...args) {
  }
  __name(warn, "warn");
  var activeEffectScope;
  var activeSub;
  var pausedQueueEffects = /* @__PURE__ */ new WeakSet();
  var ReactiveEffect = class {
    static {
      __name(this, "ReactiveEffect");
    }
    constructor(fn) {
      this.fn = fn;
      this.deps = void 0;
      this.depsTail = void 0;
      this.flags = 1 | 4;
      this.next = void 0;
      this.cleanup = void 0;
      this.scheduler = void 0;
      if (activeEffectScope && activeEffectScope.active) {
        activeEffectScope.effects.push(this);
      }
    }
    pause() {
      this.flags |= 64;
    }
    resume() {
      if (this.flags & 64) {
        this.flags &= ~64;
        if (pausedQueueEffects.has(this)) {
          pausedQueueEffects.delete(this);
          this.trigger();
        }
      }
    }
    /**
     * @internal
     */
    notify() {
      if (this.flags & 2 && !(this.flags & 32)) {
        return;
      }
      if (!(this.flags & 8)) {
        batch(this);
      }
    }
    run() {
      if (!(this.flags & 1)) {
        return this.fn();
      }
      this.flags |= 2;
      cleanupEffect(this);
      prepareDeps(this);
      const prevEffect = activeSub;
      const prevShouldTrack = shouldTrack;
      activeSub = this;
      shouldTrack = true;
      try {
        return this.fn();
      } finally {
        if (activeSub !== this) {
          warn(
            "Active effect was not restored correctly - this is likely a Vue internal bug."
          );
        }
        cleanupDeps(this);
        activeSub = prevEffect;
        shouldTrack = prevShouldTrack;
        this.flags &= ~2;
      }
    }
    stop() {
      if (this.flags & 1) {
        for (let link = this.deps; link; link = link.nextDep) {
          removeSub(link);
        }
        this.deps = this.depsTail = void 0;
        cleanupEffect(this);
        this.onStop && this.onStop();
        this.flags &= ~1;
      }
    }
    trigger() {
      if (this.flags & 64) {
        pausedQueueEffects.add(this);
      } else if (this.scheduler) {
        this.scheduler();
      } else {
        this.runIfDirty();
      }
    }
    /**
     * @internal
     */
    runIfDirty() {
      if (isDirty(this)) {
        this.run();
      }
    }
    get dirty() {
      return isDirty(this);
    }
  };
  var batchDepth = 0;
  var batchedSub;
  var batchedComputed;
  function batch(sub, isComputed = false) {
    sub.flags |= 8;
    if (isComputed) {
      sub.next = batchedComputed;
      batchedComputed = sub;
      return;
    }
    sub.next = batchedSub;
    batchedSub = sub;
  }
  __name(batch, "batch");
  function startBatch() {
    batchDepth++;
  }
  __name(startBatch, "startBatch");
  function endBatch() {
    if (--batchDepth > 0) {
      return;
    }
    if (batchedComputed) {
      let e = batchedComputed;
      batchedComputed = void 0;
      while (e) {
        const next = e.next;
        e.next = void 0;
        e.flags &= ~8;
        e = next;
      }
    }
    let error;
    while (batchedSub) {
      let e = batchedSub;
      batchedSub = void 0;
      while (e) {
        const next = e.next;
        e.next = void 0;
        e.flags &= ~8;
        if (e.flags & 1) {
          try {
            ;
            e.trigger();
          } catch (err) {
            if (!error) error = err;
          }
        }
        e = next;
      }
    }
    if (error) throw error;
  }
  __name(endBatch, "endBatch");
  function prepareDeps(sub) {
    for (let link = sub.deps; link; link = link.nextDep) {
      link.version = -1;
      link.prevActiveLink = link.dep.activeLink;
      link.dep.activeLink = link;
    }
  }
  __name(prepareDeps, "prepareDeps");
  function cleanupDeps(sub) {
    let head;
    let tail = sub.depsTail;
    let link = tail;
    while (link) {
      const prev = link.prevDep;
      if (link.version === -1) {
        if (link === tail) tail = prev;
        removeSub(link);
        removeDep(link);
      } else {
        head = link;
      }
      link.dep.activeLink = link.prevActiveLink;
      link.prevActiveLink = void 0;
      link = prev;
    }
    sub.deps = head;
    sub.depsTail = tail;
  }
  __name(cleanupDeps, "cleanupDeps");
  function isDirty(sub) {
    for (let link = sub.deps; link; link = link.nextDep) {
      if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
        return true;
      }
    }
    if (sub._dirty) {
      return true;
    }
    return false;
  }
  __name(isDirty, "isDirty");
  function refreshComputed(computed) {
    if (computed.flags & 4 && !(computed.flags & 16)) {
      return;
    }
    computed.flags &= ~16;
    if (computed.globalVersion === globalVersion) {
      return;
    }
    computed.globalVersion = globalVersion;
    const dep = computed.dep;
    computed.flags |= 2;
    if (dep.version > 0 && !computed.isSSR && computed.deps && !isDirty(computed)) {
      computed.flags &= ~2;
      return;
    }
    const prevSub = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = computed;
    shouldTrack = true;
    try {
      prepareDeps(computed);
      const value = computed.fn(computed._value);
      if (dep.version === 0 || hasChanged(value, computed._value)) {
        computed._value = value;
        dep.version++;
      }
    } catch (err) {
      dep.version++;
      throw err;
    } finally {
      activeSub = prevSub;
      shouldTrack = prevShouldTrack;
      cleanupDeps(computed);
      computed.flags &= ~2;
    }
  }
  __name(refreshComputed, "refreshComputed");
  function removeSub(link, soft = false) {
    const { dep, prevSub, nextSub } = link;
    if (prevSub) {
      prevSub.nextSub = nextSub;
      link.prevSub = void 0;
    }
    if (nextSub) {
      nextSub.prevSub = prevSub;
      link.nextSub = void 0;
    }
    if (dep.subs === link) {
      dep.subs = prevSub;
    }
    if (dep.subsHead === link) {
      dep.subsHead = nextSub;
    }
    if (!dep.subs && dep.computed) {
      dep.computed.flags &= ~4;
      for (let l = dep.computed.deps; l; l = l.nextDep) {
        removeSub(l, true);
      }
    }
    if (!soft && !--dep.sc && dep.map) {
      dep.map.delete(dep.key);
    }
  }
  __name(removeSub, "removeSub");
  function removeDep(link) {
    const { prevDep, nextDep } = link;
    if (prevDep) {
      prevDep.nextDep = nextDep;
      link.prevDep = void 0;
    }
    if (nextDep) {
      nextDep.prevDep = prevDep;
      link.nextDep = void 0;
    }
  }
  __name(removeDep, "removeDep");
  function effect(fn, options) {
    if (fn.effect instanceof ReactiveEffect) {
      fn = fn.effect.fn;
    }
    const e = new ReactiveEffect(fn);
    if (options) {
      extend(e, options);
    }
    try {
      e.run();
    } catch (err) {
      e.stop();
      throw err;
    }
    const runner = e.run.bind(e);
    runner.effect = e;
    return runner;
  }
  __name(effect, "effect");
  function stop(runner) {
    runner.effect.stop();
  }
  __name(stop, "stop");
  var shouldTrack = true;
  var trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  __name(pauseTracking, "pauseTracking");
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }
  __name(resetTracking, "resetTracking");
  function cleanupEffect(e) {
    const { cleanup } = e;
    e.cleanup = void 0;
    if (cleanup) {
      const prevSub = activeSub;
      activeSub = void 0;
      try {
        cleanup();
      } finally {
        activeSub = prevSub;
      }
    }
  }
  __name(cleanupEffect, "cleanupEffect");
  var globalVersion = 0;
  var Link = class {
    static {
      __name(this, "Link");
    }
    constructor(sub, dep) {
      this.sub = sub;
      this.dep = dep;
      this.version = dep.version;
      this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
    }
  };
  var Dep = class {
    static {
      __name(this, "Dep");
    }
    constructor(computed) {
      this.computed = computed;
      this.version = 0;
      this.activeLink = void 0;
      this.subs = void 0;
      this.map = void 0;
      this.key = void 0;
      this.sc = 0;
      if (true) {
        this.subsHead = void 0;
      }
    }
    track(debugInfo) {
      if (!activeSub || !shouldTrack || activeSub === this.computed) {
        return;
      }
      let link = this.activeLink;
      if (link === void 0 || link.sub !== activeSub) {
        link = this.activeLink = new Link(activeSub, this);
        if (!activeSub.deps) {
          activeSub.deps = activeSub.depsTail = link;
        } else {
          link.prevDep = activeSub.depsTail;
          activeSub.depsTail.nextDep = link;
          activeSub.depsTail = link;
        }
        addSub(link);
      } else if (link.version === -1) {
        link.version = this.version;
        if (link.nextDep) {
          const next = link.nextDep;
          next.prevDep = link.prevDep;
          if (link.prevDep) {
            link.prevDep.nextDep = next;
          }
          link.prevDep = activeSub.depsTail;
          link.nextDep = void 0;
          activeSub.depsTail.nextDep = link;
          activeSub.depsTail = link;
          if (activeSub.deps === link) {
            activeSub.deps = next;
          }
        }
      }
      if (activeSub.onTrack) {
        activeSub.onTrack(
          extend(
            {
              effect: activeSub
            },
            debugInfo
          )
        );
      }
      return link;
    }
    trigger(debugInfo) {
      this.version++;
      globalVersion++;
      this.notify(debugInfo);
    }
    notify(debugInfo) {
      startBatch();
      try {
        if (true) {
          for (let head = this.subsHead; head; head = head.nextSub) {
            if (head.sub.onTrigger && !(head.sub.flags & 8)) {
              head.sub.onTrigger(
                extend(
                  {
                    effect: head.sub
                  },
                  debugInfo
                )
              );
            }
          }
        }
        for (let link = this.subs; link; link = link.prevSub) {
          if (link.sub.notify()) {
            ;
            link.sub.dep.notify();
          }
        }
      } finally {
        endBatch();
      }
    }
  };
  function addSub(link) {
    link.dep.sc++;
    if (link.sub.flags & 4) {
      const computed = link.dep.computed;
      if (computed && !link.dep.subs) {
        computed.flags |= 4 | 16;
        for (let l = computed.deps; l; l = l.nextDep) {
          addSub(l);
        }
      }
      const currentTail = link.dep.subs;
      if (currentTail !== link) {
        link.prevSub = currentTail;
        if (currentTail) currentTail.nextSub = link;
      }
      if (link.dep.subsHead === void 0) {
        link.dep.subsHead = link;
      }
      link.dep.subs = link;
    }
  }
  __name(addSub, "addSub");
  var targetMap = /* @__PURE__ */ new WeakMap();
  var ITERATE_KEY = Symbol(
    true ? "Object iterate" : ""
  );
  var MAP_KEY_ITERATE_KEY = Symbol(
    true ? "Map keys iterate" : ""
  );
  var ARRAY_ITERATE_KEY = Symbol(
    true ? "Array iterate" : ""
  );
  function track(target, type, key) {
    if (shouldTrack && activeSub) {
      let depsMap = targetMap.get(target);
      if (!depsMap) {
        targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
      }
      let dep = depsMap.get(key);
      if (!dep) {
        depsMap.set(key, dep = new Dep());
        dep.map = depsMap;
        dep.key = key;
      }
      if (true) {
        dep.track({
          target,
          type,
          key
        });
      } else {
        dep.track();
      }
    }
  }
  __name(track, "track");
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      globalVersion++;
      return;
    }
    const run = /* @__PURE__ */ __name((dep) => {
      if (dep) {
        if (true) {
          dep.trigger({
            target,
            type,
            key,
            newValue,
            oldValue,
            oldTarget
          });
        } else {
          dep.trigger();
        }
      }
    }, "run");
    startBatch();
    if (type === "clear") {
      depsMap.forEach(run);
    } else {
      const targetIsArray = isArray(target);
      const isArrayIndex = targetIsArray && isIntegerKey(key);
      if (targetIsArray && key === "length") {
        const newLength = Number(newValue);
        depsMap.forEach((dep, key2) => {
          if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
            run(dep);
          }
        });
      } else {
        if (key !== void 0) {
          run(depsMap.get(key));
        }
        if (isArrayIndex) {
          run(depsMap.get(ARRAY_ITERATE_KEY));
        }
        switch (type) {
          case "add":
            if (!targetIsArray) {
              run(depsMap.get(ITERATE_KEY));
              if (isMap(target)) {
                run(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            } else if (isArrayIndex) {
              run(depsMap.get("length"));
            }
            break;
          case "delete":
            if (!targetIsArray) {
              run(depsMap.get(ITERATE_KEY));
              if (isMap(target)) {
                run(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            }
            break;
          case "set":
            if (isMap(target)) {
              run(depsMap.get(ITERATE_KEY));
            }
            break;
        }
      }
    }
    endBatch();
  }
  __name(trigger, "trigger");
  function reactiveReadArray(array) {
    const raw = toRaw(array);
    if (raw === array) return raw;
    track(raw, "iterate", ARRAY_ITERATE_KEY);
    return isShallow(array) ? raw : raw.map(toReactive);
  }
  __name(reactiveReadArray, "reactiveReadArray");
  function shallowReadArray(arr) {
    track(arr = toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
    return arr;
  }
  __name(shallowReadArray, "shallowReadArray");
  var arrayInstrumentations = {
    __proto__: null,
    [Symbol.iterator]() {
      return iterator(this, Symbol.iterator, toReactive);
    },
    concat(...args) {
      return reactiveReadArray(this).concat(
        ...args.map((x) => isArray(x) ? reactiveReadArray(x) : x)
      );
    },
    entries() {
      return iterator(this, "entries", (value) => {
        value[1] = toReactive(value[1]);
        return value;
      });
    },
    every(fn, thisArg) {
      return apply(this, "every", fn, thisArg, void 0, arguments);
    },
    filter(fn, thisArg) {
      return apply(this, "filter", fn, thisArg, (v) => v.map(toReactive), arguments);
    },
    find(fn, thisArg) {
      return apply(this, "find", fn, thisArg, toReactive, arguments);
    },
    findIndex(fn, thisArg) {
      return apply(this, "findIndex", fn, thisArg, void 0, arguments);
    },
    findLast(fn, thisArg) {
      return apply(this, "findLast", fn, thisArg, toReactive, arguments);
    },
    findLastIndex(fn, thisArg) {
      return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
    },
    // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
    forEach(fn, thisArg) {
      return apply(this, "forEach", fn, thisArg, void 0, arguments);
    },
    includes(...args) {
      return searchProxy(this, "includes", args);
    },
    indexOf(...args) {
      return searchProxy(this, "indexOf", args);
    },
    join(separator) {
      return reactiveReadArray(this).join(separator);
    },
    // keys() iterator only reads `length`, no optimisation required
    lastIndexOf(...args) {
      return searchProxy(this, "lastIndexOf", args);
    },
    map(fn, thisArg) {
      return apply(this, "map", fn, thisArg, void 0, arguments);
    },
    pop() {
      return noTracking(this, "pop");
    },
    push(...args) {
      return noTracking(this, "push", args);
    },
    reduce(fn, ...args) {
      return reduce(this, "reduce", fn, args);
    },
    reduceRight(fn, ...args) {
      return reduce(this, "reduceRight", fn, args);
    },
    shift() {
      return noTracking(this, "shift");
    },
    // slice could use ARRAY_ITERATE but also seems to beg for range tracking
    some(fn, thisArg) {
      return apply(this, "some", fn, thisArg, void 0, arguments);
    },
    splice(...args) {
      return noTracking(this, "splice", args);
    },
    toReversed() {
      return reactiveReadArray(this).toReversed();
    },
    toSorted(comparer) {
      return reactiveReadArray(this).toSorted(comparer);
    },
    toSpliced(...args) {
      return reactiveReadArray(this).toSpliced(...args);
    },
    unshift(...args) {
      return noTracking(this, "unshift", args);
    },
    values() {
      return iterator(this, "values", toReactive);
    }
  };
  function iterator(self2, method, wrapValue) {
    const arr = shallowReadArray(self2);
    const iter = arr[method]();
    if (arr !== self2 && !isShallow(self2)) {
      iter._next = iter.next;
      iter.next = () => {
        const result = iter._next();
        if (result.value) {
          result.value = wrapValue(result.value);
        }
        return result;
      };
    }
    return iter;
  }
  __name(iterator, "iterator");
  var arrayProto = Array.prototype;
  function apply(self2, method, fn, thisArg, wrappedRetFn, args) {
    const arr = shallowReadArray(self2);
    const needsWrap = arr !== self2 && !isShallow(self2);
    const methodFn = arr[method];
    if (methodFn !== arrayProto[method]) {
      const result2 = methodFn.apply(self2, args);
      return needsWrap ? toReactive(result2) : result2;
    }
    let wrappedFn = fn;
    if (arr !== self2) {
      if (needsWrap) {
        wrappedFn = /* @__PURE__ */ __name(function(item, index) {
          return fn.call(this, toReactive(item), index, self2);
        }, "wrappedFn");
      } else if (fn.length > 2) {
        wrappedFn = /* @__PURE__ */ __name(function(item, index) {
          return fn.call(this, item, index, self2);
        }, "wrappedFn");
      }
    }
    const result = methodFn.call(arr, wrappedFn, thisArg);
    return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
  }
  __name(apply, "apply");
  function reduce(self2, method, fn, args) {
    const arr = shallowReadArray(self2);
    let wrappedFn = fn;
    if (arr !== self2) {
      if (!isShallow(self2)) {
        wrappedFn = /* @__PURE__ */ __name(function(acc, item, index) {
          return fn.call(this, acc, toReactive(item), index, self2);
        }, "wrappedFn");
      } else if (fn.length > 3) {
        wrappedFn = /* @__PURE__ */ __name(function(acc, item, index) {
          return fn.call(this, acc, item, index, self2);
        }, "wrappedFn");
      }
    }
    return arr[method](wrappedFn, ...args);
  }
  __name(reduce, "reduce");
  function searchProxy(self2, method, args) {
    const arr = toRaw(self2);
    track(arr, "iterate", ARRAY_ITERATE_KEY);
    const res = arr[method](...args);
    if ((res === -1 || res === false) && isProxy(args[0])) {
      args[0] = toRaw(args[0]);
      return arr[method](...args);
    }
    return res;
  }
  __name(searchProxy, "searchProxy");
  function noTracking(self2, method, args = []) {
    pauseTracking();
    startBatch();
    const res = toRaw(self2)[method].apply(self2, args);
    endBatch();
    resetTracking();
    return res;
  }
  __name(noTracking, "noTracking");
  var isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
  var builtInSymbols = new Set(
    /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
  );
  function hasOwnProperty2(key) {
    if (!isSymbol(key)) key = String(key);
    const obj = toRaw(this);
    track(obj, "has", key);
    return obj.hasOwnProperty(key);
  }
  __name(hasOwnProperty2, "hasOwnProperty");
  var BaseReactiveHandler = class {
    static {
      __name(this, "BaseReactiveHandler");
    }
    constructor(_isReadonly = false, _isShallow = false) {
      this._isReadonly = _isReadonly;
      this._isShallow = _isShallow;
    }
    get(target, key, receiver) {
      const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_isShallow") {
        return isShallow2;
      } else if (key === "__v_raw") {
        if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
        // this means the receiver is a user proxy of the reactive proxy
        Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
          return target;
        }
        return;
      }
      const targetIsArray = isArray(target);
      if (!isReadonly2) {
        let fn;
        if (targetIsArray && (fn = arrayInstrumentations[key])) {
          return fn;
        }
        if (key === "hasOwnProperty") {
          return hasOwnProperty2;
        }
      }
      const res = Reflect.get(
        target,
        key,
        // if this is a proxy wrapping a ref, return methods using the raw ref
        // as receiver so that we don't have to call `toRaw` on the ref in all
        // its class methods
        isRef(target) ? target : receiver
      );
      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly2) {
        track(target, "get", key);
      }
      if (isShallow2) {
        return res;
      }
      if (isRef(res)) {
        return targetIsArray && isIntegerKey(key) ? res : res.value;
      }
      if (isObject(res)) {
        return isReadonly2 ? readonly(res) : reactive(res);
      }
      return res;
    }
  };
  var MutableReactiveHandler = class extends BaseReactiveHandler {
    static {
      __name(this, "MutableReactiveHandler");
    }
    constructor(isShallow2 = false) {
      super(false, isShallow2);
    }
    set(target, key, value, receiver) {
      let oldValue = target[key];
      if (!this._isShallow) {
        const isOldValueReadonly = isReadonly(oldValue);
        if (!isShallow(value) && !isReadonly(value)) {
          oldValue = toRaw(oldValue);
          value = toRaw(value);
        }
        if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
          if (isOldValueReadonly) {
            return false;
          } else {
            oldValue.value = value;
            return true;
          }
        }
      }
      const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
      const result = Reflect.set(
        target,
        key,
        value,
        isRef(target) ? target : receiver
      );
      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value, oldValue);
        }
      }
      return result;
    }
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key);
      const oldValue = target[key];
      const result = Reflect.deleteProperty(target, key);
      if (result && hadKey) {
        trigger(target, "delete", key, void 0, oldValue);
      }
      return result;
    }
    has(target, key) {
      const result = Reflect.has(target, key);
      if (!isSymbol(key) || !builtInSymbols.has(key)) {
        track(target, "has", key);
      }
      return result;
    }
    ownKeys(target) {
      track(
        target,
        "iterate",
        isArray(target) ? "length" : ITERATE_KEY
      );
      return Reflect.ownKeys(target);
    }
  };
  var ReadonlyReactiveHandler = class extends BaseReactiveHandler {
    static {
      __name(this, "ReadonlyReactiveHandler");
    }
    constructor(isShallow2 = false) {
      super(true, isShallow2);
    }
    set(target, key) {
      if (true) {
        warn(
          `Set operation on key "${String(key)}" failed: target is readonly.`,
          target
        );
      }
      return true;
    }
    deleteProperty(target, key) {
      if (true) {
        warn(
          `Delete operation on key "${String(key)}" failed: target is readonly.`,
          target
        );
      }
      return true;
    }
  };
  var mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
  var readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
  var toShallow = /* @__PURE__ */ __name((value) => value, "toShallow");
  var getProto = /* @__PURE__ */ __name((v) => Reflect.getPrototypeOf(v), "getProto");
  function get(target, key, isReadonly2 = false, isShallow2 = false) {
    target = target["__v_raw"];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (!isReadonly2) {
      if (hasChanged(key, rawKey)) {
        track(rawTarget, "get", key);
      }
      track(rawTarget, "get", rawKey);
    }
    const { has: has2 } = getProto(rawTarget);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    if (has2.call(rawTarget, key)) {
      return wrap(target.get(key));
    } else if (has2.call(rawTarget, rawKey)) {
      return wrap(target.get(rawKey));
    } else if (target !== rawTarget) {
      target.get(key);
    }
  }
  __name(get, "get");
  function has(key, isReadonly2 = false) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (!isReadonly2) {
      if (hasChanged(key, rawKey)) {
        track(rawTarget, "has", key);
      }
      track(rawTarget, "has", rawKey);
    }
    return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
  }
  __name(has, "has");
  function size(target, isReadonly2 = false) {
    target = target["__v_raw"];
    !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
    return Reflect.get(target, "size", target);
  }
  __name(size, "size");
  function add(value, _isShallow = false) {
    if (!_isShallow && !isShallow(value) && !isReadonly(value)) {
      value = toRaw(value);
    }
    const target = toRaw(this);
    const proto = getProto(target);
    const hadKey = proto.has.call(target, value);
    if (!hadKey) {
      target.add(value);
      trigger(target, "add", value, value);
    }
    return this;
  }
  __name(add, "add");
  function set(key, value, _isShallow = false) {
    if (!_isShallow && !isShallow(value) && !isReadonly(value)) {
      value = toRaw(value);
    }
    const target = toRaw(this);
    const { has: has2, get: get2 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else if (true) {
      checkIdentityKeys(target, has2, key);
    }
    const oldValue = get2.call(target, key);
    target.set(key, value);
    if (!hadKey) {
      trigger(target, "add", key, value);
    } else if (hasChanged(value, oldValue)) {
      trigger(target, "set", key, value, oldValue);
    }
    return this;
  }
  __name(set, "set");
  function deleteEntry(key) {
    const target = toRaw(this);
    const { has: has2, get: get2 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else if (true) {
      checkIdentityKeys(target, has2, key);
    }
    const oldValue = get2 ? get2.call(target, key) : void 0;
    const result = target.delete(key);
    if (hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  __name(deleteEntry, "deleteEntry");
  function clear() {
    const target = toRaw(this);
    const hadItems = target.size !== 0;
    const oldTarget = true ? isMap(target) ? new Map(target) : new Set(target) : void 0;
    const result = target.clear();
    if (hadItems) {
      trigger(target, "clear", void 0, void 0, oldTarget);
    }
    return result;
  }
  __name(clear, "clear");
  function createForEach(isReadonly2, isShallow2) {
    return /* @__PURE__ */ __name(function forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = toRaw(target);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    }, "forEach");
  }
  __name(createForEach, "createForEach");
  function createIterableMethod(method, isReadonly2, isShallow2) {
    return function(...args) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const targetIsMap = isMap(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(
        rawTarget,
        "iterate",
        isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
      );
      return {
        // iterator protocol
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        },
        // iterable protocol
        [Symbol.iterator]() {
          return this;
        }
      };
    };
  }
  __name(createIterableMethod, "createIterableMethod");
  function createReadonlyMethod(type) {
    return function(...args) {
      if (true) {
        const key = args[0] ? `on key "${args[0]}" ` : ``;
        warn(
          `${capitalize(type)} operation ${key}failed: target is readonly.`,
          toRaw(this)
        );
      }
      return type === "delete" ? false : type === "clear" ? void 0 : this;
    };
  }
  __name(createReadonlyMethod, "createReadonlyMethod");
  function createInstrumentations() {
    const mutableInstrumentations2 = {
      get(key) {
        return get(this, key);
      },
      get size() {
        return size(this);
      },
      has,
      add,
      set,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, false)
    };
    const shallowInstrumentations2 = {
      get(key) {
        return get(this, key, false, true);
      },
      get size() {
        return size(this);
      },
      has,
      add(value) {
        return add.call(this, value, true);
      },
      set(key, value) {
        return set.call(this, key, value, true);
      },
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, true)
    };
    const readonlyInstrumentations2 = {
      get(key) {
        return get(this, key, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has.call(this, key, true);
      },
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear"),
      forEach: createForEach(true, false)
    };
    const shallowReadonlyInstrumentations2 = {
      get(key) {
        return get(this, key, true, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has.call(this, key, true);
      },
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear"),
      forEach: createForEach(true, true)
    };
    const iteratorMethods = [
      "keys",
      "values",
      "entries",
      Symbol.iterator
    ];
    iteratorMethods.forEach((method) => {
      mutableInstrumentations2[method] = createIterableMethod(method, false, false);
      readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
      shallowInstrumentations2[method] = createIterableMethod(method, false, true);
      shallowReadonlyInstrumentations2[method] = createIterableMethod(
        method,
        true,
        true
      );
    });
    return [
      mutableInstrumentations2,
      readonlyInstrumentations2,
      shallowInstrumentations2,
      shallowReadonlyInstrumentations2
    ];
  }
  __name(createInstrumentations, "createInstrumentations");
  var [
    mutableInstrumentations,
    readonlyInstrumentations,
    shallowInstrumentations,
    shallowReadonlyInstrumentations
  ] = /* @__PURE__ */ createInstrumentations();
  function createInstrumentationGetter(isReadonly2, shallow) {
    const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
    return (target, key, receiver) => {
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_raw") {
        return target;
      }
      return Reflect.get(
        hasOwn(instrumentations, key) && key in target ? instrumentations : target,
        key,
        receiver
      );
    };
  }
  __name(createInstrumentationGetter, "createInstrumentationGetter");
  var mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, false)
  };
  var readonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, false)
  };
  function checkIdentityKeys(target, has2, key) {
    const rawKey = toRaw(key);
    if (rawKey !== key && has2.call(target, rawKey)) {
      const type = toRawType(target);
      warn(
        `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
      );
    }
  }
  __name(checkIdentityKeys, "checkIdentityKeys");
  var reactiveMap = /* @__PURE__ */ new WeakMap();
  var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
  var readonlyMap = /* @__PURE__ */ new WeakMap();
  var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  __name(targetTypeMap, "targetTypeMap");
  function getTargetType(value) {
    return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
  }
  __name(getTargetType, "getTargetType");
  function reactive(target) {
    if (isReadonly(target)) {
      return target;
    }
    return createReactiveObject(
      target,
      false,
      mutableHandlers,
      mutableCollectionHandlers,
      reactiveMap
    );
  }
  __name(reactive, "reactive");
  function readonly(target) {
    return createReactiveObject(
      target,
      true,
      readonlyHandlers,
      readonlyCollectionHandlers,
      readonlyMap
    );
  }
  __name(readonly, "readonly");
  function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) {
      if (true) {
        warn(
          `value cannot be made ${isReadonly2 ? "readonly" : "reactive"}: ${String(
            target
          )}`
        );
      }
      return target;
    }
    if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
      return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    const targetType = getTargetType(target);
    if (targetType === 0) {
      return target;
    }
    const proxy = new Proxy(
      target,
      targetType === 2 ? collectionHandlers : baseHandlers
    );
    proxyMap.set(target, proxy);
    return proxy;
  }
  __name(createReactiveObject, "createReactiveObject");
  function isReadonly(value) {
    return !!(value && value["__v_isReadonly"]);
  }
  __name(isReadonly, "isReadonly");
  function isShallow(value) {
    return !!(value && value["__v_isShallow"]);
  }
  __name(isShallow, "isShallow");
  function isProxy(value) {
    return value ? !!value["__v_raw"] : false;
  }
  __name(isProxy, "isProxy");
  function toRaw(observed) {
    const raw = observed && observed["__v_raw"];
    return raw ? toRaw(raw) : observed;
  }
  __name(toRaw, "toRaw");
  var toReactive = /* @__PURE__ */ __name((value) => isObject(value) ? reactive(value) : value, "toReactive");
  var toReadonly = /* @__PURE__ */ __name((value) => isObject(value) ? readonly(value) : value, "toReadonly");
  function isRef(r) {
    return r ? r["__v_isRef"] === true : false;
  }
  __name(isRef, "isRef");

  // other-libraries/petite-vue/src/scheduler.ts
  var queued = false;
  var queue = [];
  var p = Promise.resolve();
  var nextTick = /* @__PURE__ */ __name((fn) => p.then(fn), "nextTick");
  var queueJob = /* @__PURE__ */ __name((job) => {
    if (!queue.includes(job)) queue.push(job);
    if (!queued) {
      queued = true;
      nextTick(flushJobs);
    }
  }, "queueJob");
  var flushJobs = /* @__PURE__ */ __name(() => {
    for (const job of queue) {
      job();
    }
    queue.length = 0;
    queued = false;
  }, "flushJobs");

  // other-libraries/petite-vue/src/directives/bind.ts
  var forceAttrRE = /^(spellcheck|draggable|form|list|type)$/;
  var bind = /* @__PURE__ */ __name(({
    el,
    get: get2,
    effect: effect3,
    arg,
    modifiers
  }) => {
    let prevValue;
    if (arg === "class") {
      el._class = el.className;
    }
    effect3(() => {
      let value = get2();
      if (arg) {
        if (modifiers?.camel) {
          arg = camelize(arg);
        }
        setProp(el, arg, value, prevValue);
      } else {
        for (const key in value) {
          setProp(el, key, value[key], prevValue && prevValue[key]);
        }
        for (const key in prevValue) {
          if (!value || !(key in value)) {
            setProp(el, key, null);
          }
        }
      }
      prevValue = value;
    });
  }, "bind");
  var setProp = /* @__PURE__ */ __name((el, key, value, prevValue) => {
    if (key === "class") {
      el.setAttribute(
        "class",
        normalizeClass(el._class ? [el._class, value] : value) || ""
      );
    } else if (key === "style") {
      value = normalizeStyle(value);
      const { style } = el;
      if (!value) {
        el.removeAttribute("style");
      } else if (isString(value)) {
        if (value !== prevValue) style.cssText = value;
      } else {
        for (const key2 in value) {
          setStyle(style, key2, value[key2]);
        }
        if (prevValue && !isString(prevValue)) {
          for (const key2 in prevValue) {
            if (value[key2] == null) {
              setStyle(style, key2, "");
            }
          }
        }
      }
    } else if (!(el instanceof SVGElement) && key in el && !forceAttrRE.test(key)) {
      el[key] = value;
      if (key === "value") {
        el._value = value;
      }
    } else {
      if (key === "true-value") {
        ;
        el._trueValue = value;
      } else if (key === "false-value") {
        ;
        el._falseValue = value;
      } else if (value != null) {
        el.setAttribute(key, value);
      } else {
        el.removeAttribute(key);
      }
    }
  }, "setProp");
  var importantRE = /\s*!important$/;
  var setStyle = /* @__PURE__ */ __name((style, name, val) => {
    if (isArray(val)) {
      val.forEach((v) => setStyle(style, name, v));
    } else {
      if (name.startsWith("--")) {
        style.setProperty(name, val);
      } else {
        if (importantRE.test(val)) {
          style.setProperty(
            hyphenate(name),
            val.replace(importantRE, ""),
            "important"
          );
        } else {
          style[name] = val;
        }
      }
    }
  }, "setStyle");

  // other-libraries/petite-vue/src/utils.ts
  var checkAttr = /* @__PURE__ */ __name((el, name) => {
    const val = el.getAttribute(name);
    if (val != null) el.removeAttribute(name);
    return val;
  }, "checkAttr");
  var listen = /* @__PURE__ */ __name((el, event, handler, options) => {
    el.addEventListener(event, handler, options);
  }, "listen");

  // other-libraries/petite-vue/src/directives/on.ts
  var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;
  var systemModifiers = ["ctrl", "shift", "alt", "meta"];
  var modifierGuards = {
    stop: /* @__PURE__ */ __name((e) => e.stopPropagation(), "stop"),
    prevent: /* @__PURE__ */ __name((e) => e.preventDefault(), "prevent"),
    self: /* @__PURE__ */ __name((e) => e.target !== e.currentTarget, "self"),
    ctrl: /* @__PURE__ */ __name((e) => !e.ctrlKey, "ctrl"),
    shift: /* @__PURE__ */ __name((e) => !e.shiftKey, "shift"),
    alt: /* @__PURE__ */ __name((e) => !e.altKey, "alt"),
    meta: /* @__PURE__ */ __name((e) => !e.metaKey, "meta"),
    left: /* @__PURE__ */ __name((e) => "button" in e && e.button !== 0, "left"),
    middle: /* @__PURE__ */ __name((e) => "button" in e && e.button !== 1, "middle"),
    right: /* @__PURE__ */ __name((e) => "button" in e && e.button !== 2, "right"),
    exact: /* @__PURE__ */ __name((e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers[m]), "exact")
  };
  var on = /* @__PURE__ */ __name(({ el, get: get2, exp, arg, modifiers }) => {
    if (!arg) {
      if (false) {
      }
      return;
    }
    let handler = simplePathRE.test(exp) ? get2(`(e => ${exp}(e))`) : get2(`($event => { ${exp} })`);
    if (false) {
    }
    if (arg === "vue:mounted") {
      nextTick(handler);
      return;
    } else if (arg === "vue:unmounted") {
      return () => handler();
    }
    if (modifiers) {
      if (arg === "click") {
        if (modifiers.right) arg = "contextmenu";
        if (modifiers.middle) arg = "mouseup";
      }
      const raw = handler;
      handler = /* @__PURE__ */ __name((e) => {
        if ("key" in e && !(hyphenate(e.key) in modifiers)) {
          return;
        }
        for (const key in modifiers) {
          const guard = modifierGuards[key];
          if (guard && guard(e, modifiers)) {
            return;
          }
        }
        return raw(e);
      }, "handler");
    }
    listen(el, arg, handler, modifiers);
  }, "on");

  // other-libraries/petite-vue/src/directives/show.ts
  var show = /* @__PURE__ */ __name(({ el, get: get2, effect: effect3 }) => {
    const initialDisplay = el.style.display;
    effect3(() => {
      el.style.display = get2() ? initialDisplay : "none";
    });
  }, "show");

  // other-libraries/petite-vue/src/directives/text.ts
  var text = /* @__PURE__ */ __name(({ el, get: get2, effect: effect3 }) => {
    effect3(() => {
      el.textContent = toDisplayString(get2());
    });
  }, "text");
  var toDisplayString = /* @__PURE__ */ __name((value) => value == null ? "" : isObject(value) ? JSON.stringify(value, null, 2) : String(value), "toDisplayString");

  // other-libraries/petite-vue/src/directives/html.ts
  var html = /* @__PURE__ */ __name(({ el, get: get2, effect: effect3 }) => {
    effect3(() => {
      el.innerHTML = get2();
    });
  }, "html");

  // other-libraries/petite-vue/src/directives/model.ts
  var model = /* @__PURE__ */ __name(({ el, exp, get: get2, effect: effect3, modifiers }) => {
    const type = el.type;
    const assign = get2(`(val) => { ${exp} = val }`);
    const { trim, number = type === "number" } = modifiers || {};
    if (el.tagName === "SELECT") {
      const sel = el;
      listen(el, "change", () => {
        const selectedVal = Array.prototype.filter.call(sel.options, (o) => o.selected).map(
          (o) => number ? toNumber(getValue(o)) : getValue(o)
        );
        assign(sel.multiple ? selectedVal : selectedVal[0]);
      });
      effect3(() => {
        const value = get2();
        const isMultiple = sel.multiple;
        for (let i = 0, l = sel.options.length; i < l; i++) {
          const option = sel.options[i];
          const optionValue = getValue(option);
          if (isMultiple) {
            if (isArray(value)) {
              option.selected = looseIndexOf(value, optionValue) > -1;
            } else {
              option.selected = value.has(optionValue);
            }
          } else {
            if (looseEqual(getValue(option), value)) {
              if (sel.selectedIndex !== i) sel.selectedIndex = i;
              return;
            }
          }
        }
        if (!isMultiple && sel.selectedIndex !== -1) {
          sel.selectedIndex = -1;
        }
      });
    } else if (type === "checkbox") {
      listen(el, "change", () => {
        const modelValue = get2();
        const checked = el.checked;
        if (isArray(modelValue)) {
          const elementValue = getValue(el);
          const index = looseIndexOf(modelValue, elementValue);
          const found = index !== -1;
          if (checked && !found) {
            assign(modelValue.concat(elementValue));
          } else if (!checked && found) {
            const filtered = [...modelValue];
            filtered.splice(index, 1);
            assign(filtered);
          }
        } else {
          assign(getCheckboxValue(el, checked));
        }
      });
      let oldValue;
      effect3(() => {
        const value = get2();
        if (isArray(value)) {
          ;
          el.checked = looseIndexOf(value, getValue(el)) > -1;
        } else if (value !== oldValue) {
          ;
          el.checked = looseEqual(
            value,
            getCheckboxValue(el, true)
          );
        }
        oldValue = value;
      });
    } else if (type === "radio") {
      listen(el, "change", () => {
        assign(getValue(el));
      });
      let oldValue;
      effect3(() => {
        const value = get2();
        if (value !== oldValue) {
          ;
          el.checked = looseEqual(value, getValue(el));
        }
      });
    } else {
      const resolveValue = /* @__PURE__ */ __name((val) => {
        if (trim) return val.trim();
        if (number) return toNumber(val);
        return val;
      }, "resolveValue");
      listen(el, "compositionstart", onCompositionStart);
      listen(el, "compositionend", onCompositionEnd);
      listen(el, modifiers?.lazy ? "change" : "input", () => {
        if (el.composing) return;
        assign(resolveValue(el.value));
      });
      if (trim) {
        listen(el, "change", () => {
          el.value = el.value.trim();
        });
      }
      effect3(() => {
        if (el.composing) {
          return;
        }
        const curVal = el.value;
        const newVal = get2();
        if (document.activeElement === el && resolveValue(curVal) === newVal) {
          return;
        }
        if (curVal !== newVal) {
          el.value = newVal;
        }
      });
    }
  }, "model");
  var getValue = /* @__PURE__ */ __name((el) => "_value" in el ? el._value : el.value, "getValue");
  var getCheckboxValue = /* @__PURE__ */ __name((el, checked) => {
    const key = checked ? "_trueValue" : "_falseValue";
    return key in el ? el[key] : checked;
  }, "getCheckboxValue");
  var onCompositionStart = /* @__PURE__ */ __name((e) => {
    ;
    e.target.composing = true;
  }, "onCompositionStart");
  var onCompositionEnd = /* @__PURE__ */ __name((e) => {
    const target = e.target;
    if (target.composing) {
      target.composing = false;
      trigger2(target, "input");
    }
  }, "onCompositionEnd");
  var trigger2 = /* @__PURE__ */ __name((el, type) => {
    const e = document.createEvent("HTMLEvents");
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
  }, "trigger");

  // other-libraries/petite-vue/src/eval.ts
  var evalCache = /* @__PURE__ */ Object.create(null);
  var evaluate = /* @__PURE__ */ __name((scope, exp, el) => execute(scope, `return(${exp})`, el), "evaluate");
  var execute = /* @__PURE__ */ __name((scope, exp, el) => {
    const fn = evalCache[exp] || (evalCache[exp] = toFunction(exp));
    try {
      return fn(scope, el);
    } catch (e) {
      if (false) {
      }
    }
  }, "execute");
  var toFunction = /* @__PURE__ */ __name((exp) => {
    try {
      return new Function(`$data`, `$el`, `with($data){${exp}}`);
    } catch (e) {
      return () => {
      };
    }
  }, "toFunction");

  // other-libraries/petite-vue/src/directives/effect.ts
  var effect2 = /* @__PURE__ */ __name(({ el, ctx, exp, effect: effect3 }) => {
    nextTick(() => effect3(() => execute(ctx.scope, exp, el)));
  }, "effect");

  // other-libraries/petite-vue/src/directives/index.ts
  var builtInDirectives = {
    bind,
    on,
    show,
    text,
    html,
    model,
    effect: effect2
  };

  // other-libraries/petite-vue/src/directives/if.ts
  var _if = /* @__PURE__ */ __name((el, exp, ctx) => {
    if (false) {
    }
    const parent = el.parentElement;
    const anchor = new Comment("v-if");
    parent.insertBefore(anchor, el);
    const branches = [
      {
        exp,
        el
      }
    ];
    let elseEl;
    let elseExp;
    while (elseEl = el.nextElementSibling) {
      elseExp = null;
      if (checkAttr(elseEl, "v-else") === "" || (elseExp = checkAttr(elseEl, "v-else-if"))) {
        parent.removeChild(elseEl);
        branches.push({ exp: elseExp, el: elseEl });
      } else {
        break;
      }
    }
    const nextNode = el.nextSibling;
    parent.removeChild(el);
    let block;
    let activeBranchIndex = -1;
    const removeActiveBlock = /* @__PURE__ */ __name(() => {
      if (block) {
        parent.insertBefore(anchor, block.el);
        block.remove();
        block = void 0;
      }
    }, "removeActiveBlock");
    ctx.effect(() => {
      for (let i = 0; i < branches.length; i++) {
        const { exp: exp2, el: el2 } = branches[i];
        if (!exp2 || evaluate(ctx.scope, exp2)) {
          if (i !== activeBranchIndex) {
            removeActiveBlock();
            block = new Block(el2, ctx);
            block.insert(parent, anchor);
            parent.removeChild(anchor);
            activeBranchIndex = i;
          }
          return;
        }
      }
      activeBranchIndex = -1;
      removeActiveBlock();
    });
    return nextNode;
  }, "_if");

  // other-libraries/petite-vue/src/directives/for.ts
  var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
  var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
  var stripParensRE = /^\(|\)$/g;
  var destructureRE = /^[{[]\s*((?:[\w_$]+\s*,?\s*)+)[\]}]$/;
  var _for = /* @__PURE__ */ __name((el, exp, ctx) => {
    const inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      return;
    }
    const nextNode = el.nextSibling;
    const parent = el.parentElement;
    const anchor = new Text("");
    parent.insertBefore(anchor, el);
    parent.removeChild(el);
    const sourceExp = inMatch[2].trim();
    let valueExp = inMatch[1].trim().replace(stripParensRE, "").trim();
    let destructureBindings;
    let isArrayDestructure = false;
    let indexExp;
    let objIndexExp;
    let keyAttr = "key";
    let keyExp = el.getAttribute(keyAttr) || el.getAttribute(keyAttr = ":key") || el.getAttribute(keyAttr = "v-bind:key");
    if (keyExp) {
      el.removeAttribute(keyAttr);
      if (keyAttr === "key") keyExp = JSON.stringify(keyExp);
    }
    let match;
    if (match = valueExp.match(forIteratorRE)) {
      valueExp = valueExp.replace(forIteratorRE, "").trim();
      indexExp = match[1].trim();
      if (match[2]) {
        objIndexExp = match[2].trim();
      }
    }
    if (match = valueExp.match(destructureRE)) {
      destructureBindings = match[1].split(",").map((s2) => s2.trim());
      isArrayDestructure = valueExp[0] === "[";
    }
    let mounted = false;
    let blocks;
    let childCtxs;
    let keyToIndexMap;
    const createChildContexts = /* @__PURE__ */ __name((source) => {
      const map = /* @__PURE__ */ new Map();
      const ctxs = [];
      if (isArray(source)) {
        for (let i = 0; i < source.length; i++) {
          ctxs.push(createChildContext(map, source[i], i));
        }
      } else if (typeof source === "number") {
        for (let i = 0; i < source; i++) {
          ctxs.push(createChildContext(map, i + 1, i));
        }
      } else if (isObject(source)) {
        let i = 0;
        for (const key in source) {
          ctxs.push(createChildContext(map, source[key], i++, key));
        }
      }
      return [ctxs, map];
    }, "createChildContexts");
    const createChildContext = /* @__PURE__ */ __name((map, value, index, objKey) => {
      const data = {};
      if (destructureBindings) {
        destructureBindings.forEach(
          (b, i) => data[b] = value[isArrayDestructure ? i : b]
        );
      } else {
        data[valueExp] = value;
      }
      if (objKey) {
        indexExp && (data[indexExp] = objKey);
        objIndexExp && (data[objIndexExp] = index);
      } else {
        indexExp && (data[indexExp] = index);
      }
      const childCtx = createScopedContext(ctx, data);
      const key = keyExp ? evaluate(childCtx.scope, keyExp) : index;
      map.set(key, index);
      childCtx.key = key;
      return childCtx;
    }, "createChildContext");
    const mountBlock = /* @__PURE__ */ __name((ctx2, ref2) => {
      const block = new Block(el, ctx2);
      block.key = ctx2.key;
      block.insert(parent, ref2);
      return block;
    }, "mountBlock");
    ctx.effect(() => {
      const source = evaluate(ctx.scope, sourceExp);
      const prevKeyToIndexMap = keyToIndexMap;
      [childCtxs, keyToIndexMap] = createChildContexts(source);
      if (!mounted) {
        blocks = childCtxs.map((s2) => mountBlock(s2, anchor));
        mounted = true;
      } else {
        for (let i2 = 0; i2 < blocks.length; i2++) {
          if (!keyToIndexMap.has(blocks[i2].key)) {
            blocks[i2].remove();
          }
        }
        const nextBlocks = [];
        let i = childCtxs.length;
        let nextBlock;
        let prevMovedBlock;
        while (i--) {
          const childCtx = childCtxs[i];
          const oldIndex = prevKeyToIndexMap.get(childCtx.key);
          let block;
          if (oldIndex == null) {
            block = mountBlock(
              childCtx,
              nextBlock ? nextBlock.el : anchor
            );
          } else {
            block = blocks[oldIndex];
            Object.assign(block.ctx.scope, childCtx.scope);
            if (oldIndex !== i) {
              if (blocks[oldIndex + 1] !== nextBlock || // If the next has moved, it must move too
              prevMovedBlock === nextBlock) {
                prevMovedBlock = block;
                block.insert(parent, nextBlock ? nextBlock.el : anchor);
              }
            }
          }
          nextBlocks.unshift(nextBlock = block);
        }
        blocks = nextBlocks;
      }
    });
    return nextNode;
  }, "_for");

  // other-libraries/petite-vue/src/directives/ref.ts
  var ref = /* @__PURE__ */ __name(({
    el,
    ctx: {
      scope: { $refs }
    },
    get: get2,
    effect: effect3
  }) => {
    let prevRef;
    effect3(() => {
      const ref2 = get2();
      $refs[ref2] = el;
      if (prevRef && ref2 !== prevRef) {
        delete $refs[prevRef];
      }
      prevRef = ref2;
    });
    return () => {
      prevRef && delete $refs[prevRef];
    };
  }, "ref");

  // other-libraries/petite-vue/src/walk.ts
  var dirRE = /^(?:v-|:|@)/;
  var modifierRE = /\.([\w-]+)/g;
  var inOnce = false;
  var walk = /* @__PURE__ */ __name((node, ctx) => {
    const type = node.nodeType;
    if (type === 1) {
      const el = node;
      if (el.hasAttribute("v-pre")) {
        return;
      }
      checkAttr(el, "v-cloak");
      let exp;
      if (exp = checkAttr(el, "v-if")) {
        return _if(el, exp, ctx);
      }
      if (exp = checkAttr(el, "v-for")) {
        return _for(el, exp, ctx);
      }
      if ((exp = checkAttr(el, "v-scope")) || exp === "") {
        const scope = exp ? evaluate(ctx.scope, exp) : {};
        ctx = createScopedContext(ctx, scope);
        if (scope.$template) {
          resolveTemplate(el, scope.$template);
        }
      }
      const hasVOnce = checkAttr(el, "v-once") != null;
      if (hasVOnce) {
        inOnce = true;
      }
      if (exp = checkAttr(el, "ref")) {
        applyDirective(el, ref, `"${exp}"`, ctx);
      }
      walkChildren(el, ctx);
      const deferred = [];
      for (const { name, value } of [...el.attributes]) {
        if (dirRE.test(name) && name !== "v-cloak") {
          if (name === "v-model") {
            deferred.unshift([name, value]);
          } else if (name[0] === "@" || /^v-on\b/.test(name)) {
            deferred.push([name, value]);
          } else {
            processDirective(el, name, value, ctx);
          }
        }
      }
      for (const [name, value] of deferred) {
        processDirective(el, name, value, ctx);
      }
      if (hasVOnce) {
        inOnce = false;
      }
    } else if (type === 3) {
      const data = node.data;
      if (data.includes(ctx.delimiters[0])) {
        let segments = [];
        let lastIndex = 0;
        let match;
        while (match = ctx.delimitersRE.exec(data)) {
          const leading = data.slice(lastIndex, match.index);
          if (leading) segments.push(JSON.stringify(leading));
          segments.push(`$s(${match[1]})`);
          lastIndex = match.index + match[0].length;
        }
        if (lastIndex < data.length) {
          segments.push(JSON.stringify(data.slice(lastIndex)));
        }
        applyDirective(node, text, segments.join("+"), ctx);
      }
    } else if (type === 11) {
      walkChildren(node, ctx);
    }
  }, "walk");
  var walkChildren = /* @__PURE__ */ __name((node, ctx) => {
    let child = node.firstChild;
    while (child) {
      child = walk(child, ctx) || child.nextSibling;
    }
  }, "walkChildren");
  var processDirective = /* @__PURE__ */ __name((el, raw, exp, ctx) => {
    let dir;
    let arg;
    let modifiers;
    raw = raw.replace(modifierRE, (_, m) => {
      ;
      (modifiers || (modifiers = {}))[m] = true;
      return "";
    });
    if (raw[0] === ":") {
      dir = bind;
      arg = raw.slice(1);
    } else if (raw[0] === "@") {
      dir = on;
      arg = raw.slice(1);
    } else {
      const argIndex = raw.indexOf(":");
      const dirName = argIndex > 0 ? raw.slice(2, argIndex) : raw.slice(2);
      dir = builtInDirectives[dirName] || ctx.dirs[dirName];
      arg = argIndex > 0 ? raw.slice(argIndex + 1) : void 0;
    }
    if (dir) {
      if (dir === bind && arg === "ref") dir = ref;
      applyDirective(el, dir, exp, ctx, arg, modifiers);
      el.removeAttribute(raw);
    } else if (false) {
    }
  }, "processDirective");
  var applyDirective = /* @__PURE__ */ __name((el, dir, exp, ctx, arg, modifiers) => {
    const get2 = /* @__PURE__ */ __name((e = exp) => evaluate(ctx.scope, e, el), "get");
    const cleanup = dir({
      el,
      get: get2,
      effect: ctx.effect,
      ctx,
      exp,
      arg,
      modifiers
    });
    if (cleanup) {
      ctx.cleanups.push(cleanup);
    }
  }, "applyDirective");
  var resolveTemplate = /* @__PURE__ */ __name((el, template) => {
    if (template[0] === "#") {
      const templateEl = document.querySelector(template);
      if (false) {
      }
      el.appendChild(templateEl.content.cloneNode(true));
      return;
    }
    el.innerHTML = template;
  }, "resolveTemplate");

  // other-libraries/petite-vue/src/context.ts
  var createContext = /* @__PURE__ */ __name((parent) => {
    const ctx = {
      delimiters: ["{{", "}}"],
      delimitersRE: /\{\{([^]+?)\}\}/g,
      ...parent,
      scope: parent ? parent.scope : reactive({}),
      dirs: parent ? parent.dirs : {},
      effects: [],
      blocks: [],
      cleanups: [],
      effect: /* @__PURE__ */ __name((fn) => {
        if (inOnce) {
          queueJob(fn);
          return fn;
        }
        const e = effect(fn, {
          scheduler: /* @__PURE__ */ __name(() => queueJob(e), "scheduler")
        });
        ctx.effects.push(e);
        return e;
      }, "effect")
    };
    return ctx;
  }, "createContext");
  var createScopedContext = /* @__PURE__ */ __name((ctx, data = {}) => {
    const parentScope = ctx.scope;
    const mergedScope = Object.create(parentScope);
    Object.defineProperties(mergedScope, Object.getOwnPropertyDescriptors(data));
    mergedScope.$refs = Object.create(parentScope.$refs);
    const reactiveProxy = reactive(
      new Proxy(mergedScope, {
        set(target, key, val, receiver) {
          if (receiver === reactiveProxy && !target.hasOwnProperty(key)) {
            return Reflect.set(parentScope, key, val);
          }
          return Reflect.set(target, key, val, receiver);
        }
      })
    );
    bindContextMethods(reactiveProxy);
    return {
      ...ctx,
      scope: reactiveProxy
    };
  }, "createScopedContext");
  var bindContextMethods = /* @__PURE__ */ __name((scope) => {
    for (const key of Object.keys(scope)) {
      if (typeof scope[key] === "function") {
        scope[key] = scope[key].bind(scope);
      }
    }
  }, "bindContextMethods");

  // other-libraries/petite-vue/src/block.ts
  var Block = class {
    static {
      __name(this, "Block");
    }
    template;
    ctx;
    key;
    parentCtx;
    isFragment;
    start;
    end;
    get el() {
      return this.start || this.template;
    }
    constructor(template, parentCtx, isRoot = false) {
      this.isFragment = template instanceof HTMLTemplateElement;
      if (isRoot) {
        this.template = template;
      } else if (this.isFragment) {
        this.template = template.content.cloneNode(
          true
        );
      } else {
        this.template = template.cloneNode(true);
      }
      if (isRoot) {
        this.ctx = parentCtx;
      } else {
        this.parentCtx = parentCtx;
        parentCtx.blocks.push(this);
        this.ctx = createContext(parentCtx);
      }
      walk(this.template, this.ctx);
    }
    insert(parent, anchor = null) {
      if (this.isFragment) {
        if (this.start) {
          let node = this.start;
          let next;
          while (node) {
            next = node.nextSibling;
            parent.insertBefore(node, anchor);
            if (node === this.end) break;
            node = next;
          }
        } else {
          this.start = new Text("");
          this.end = new Text("");
          parent.insertBefore(this.end, anchor);
          parent.insertBefore(this.start, this.end);
          parent.insertBefore(this.template, this.end);
        }
      } else {
        parent.insertBefore(this.template, anchor);
      }
    }
    remove() {
      if (this.parentCtx) {
        remove(this.parentCtx.blocks, this);
      }
      if (this.start) {
        const parent = this.start.parentNode;
        let node = this.start;
        let next;
        while (node) {
          next = node.nextSibling;
          parent.removeChild(node);
          if (node === this.end) break;
          node = next;
        }
      } else {
        this.template.parentNode.removeChild(this.template);
      }
      this.teardown();
    }
    teardown() {
      this.ctx.blocks.forEach((child) => {
        child.teardown();
      });
      this.ctx.effects.forEach(stop);
      this.ctx.cleanups.forEach((fn) => fn());
    }
  };

  // other-libraries/petite-vue/src/app.ts
  var escapeRegex = /* @__PURE__ */ __name((str) => str.replace(/[-.*+?^${}()|[\]\/\\]/g, "\\$&"), "escapeRegex");
  var createApp = /* @__PURE__ */ __name((initialData) => {
    const ctx = createContext();
    if (initialData) {
      ctx.scope = reactive(initialData);
      bindContextMethods(ctx.scope);
      if (initialData.$delimiters) {
        const [open, close] = ctx.delimiters = initialData.$delimiters;
        ctx.delimitersRE = new RegExp(
          escapeRegex(open) + "([^]+?)" + escapeRegex(close),
          "g"
        );
      }
    }
    ctx.scope.$s = toDisplayString;
    ctx.scope.$nextTick = nextTick;
    ctx.scope.$refs = /* @__PURE__ */ Object.create(null);
    let rootBlocks;
    return {
      directive(name, def2) {
        if (def2) {
          ctx.dirs[name] = def2;
          return this;
        } else {
          return ctx.dirs[name];
        }
      },
      mount(el) {
        if (typeof el === "string") {
          el = document.querySelector(el);
          if (!el) {
            return;
          }
        }
        el = el || document.documentElement;
        let roots;
        if (el.hasAttribute("v-scope")) {
          roots = [el];
        } else {
          roots = [...el.querySelectorAll(`[v-scope]`)].filter(
            (root) => !root.matches(`[v-scope] [v-scope]`)
          );
        }
        if (!roots.length) {
          roots = [el];
        }
        if (false) {
        }
        rootBlocks = roots.map((el2) => new Block(el2, ctx, true));
        return this;
      },
      unmount() {
        rootBlocks.forEach((block) => block.teardown());
      }
    };
  }, "createApp");

  // other-libraries/petite-vue/src/index.ts
  var s = document.currentScript;
  if (s && s.hasAttribute("init")) {
    createApp().mount();
  }
  return __toCommonJS(src_exports);
})();
/*! Bundled license information:

@vue/shared/dist/shared.esm-bundler.js:
  (**
  * @vue/shared v3.5.11
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)
  (*! #__NO_SIDE_EFFECTS__ *)

@vue/reactivity/dist/reactivity.esm-bundler.js:
  (**
  * @vue/reactivity v3.5.11
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)
*/
