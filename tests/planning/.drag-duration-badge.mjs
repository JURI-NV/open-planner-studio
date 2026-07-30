var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/react/cjs/react.production.js
var require_react_production = __commonJS({
  "node_modules/react/cjs/react.production.js"(exports) {
    "use strict";
    var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element");
    var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
    var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
    var REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode");
    var REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler");
    var REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer");
    var REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context");
    var REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref");
    var REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense");
    var REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo");
    var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
    var REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity");
    var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
    function getIteratorFn(maybeIterable) {
      if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
      maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
      return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    var ReactNoopUpdateQueue = {
      isMounted: function() {
        return false;
      },
      enqueueForceUpdate: function() {
      },
      enqueueReplaceState: function() {
      },
      enqueueSetState: function() {
      }
    };
    var assign = Object.assign;
    var emptyObject = {};
    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    Component.prototype.isReactComponent = {};
    Component.prototype.setState = function(partialState, callback) {
      if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, partialState, callback, "setState");
    };
    Component.prototype.forceUpdate = function(callback) {
      this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
    };
    function ComponentDummy() {
    }
    ComponentDummy.prototype = Component.prototype;
    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent;
    assign(pureComponentPrototype, Component.prototype);
    pureComponentPrototype.isPureReactComponent = true;
    var isArrayImpl = Array.isArray;
    function noop() {
    }
    var ReactSharedInternals = { H: null, A: null, T: null, S: null };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function ReactElement(type, key, props) {
      var refProp = props.ref;
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref: void 0 !== refProp ? refProp : null,
        props
      };
    }
    function cloneAndReplaceKey(oldElement, newKey) {
      return ReactElement(oldElement.type, newKey, oldElement.props);
    }
    function isValidElement(object) {
      return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function escape(key) {
      var escaperLookup = { "=": "=0", ":": "=2" };
      return "$" + key.replace(/[=:]/g, function(match) {
        return escaperLookup[match];
      });
    }
    var userProvidedKeyEscapeRegex = /\/+/g;
    function getElementKey(element, index) {
      return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
    }
    function resolveThenable(thenable) {
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
        default:
          switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
            function(fulfilledValue) {
              "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
            },
            function(error) {
              "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
            }
          )), thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
      }
      throw thenable;
    }
    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
      var type = typeof children;
      if ("undefined" === type || "boolean" === type) children = null;
      var invokeCallback = false;
      if (null === children) invokeCallback = true;
      else
        switch (type) {
          case "bigint":
          case "string":
          case "number":
            invokeCallback = true;
            break;
          case "object":
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
                break;
              case REACT_LAZY_TYPE:
                return invokeCallback = children._init, mapIntoArray(
                  invokeCallback(children._payload),
                  array,
                  escapedPrefix,
                  nameSoFar,
                  callback
                );
            }
        }
      if (invokeCallback)
        return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
          return c;
        })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(
          callback,
          escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(
            userProvidedKeyEscapeRegex,
            "$&/"
          ) + "/") + invokeCallback
        )), array.push(callback)), 1;
      invokeCallback = 0;
      var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
      if (isArrayImpl(children))
        for (var i = 0; i < children.length; i++)
          nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
            nameSoFar,
            array,
            escapedPrefix,
            type,
            callback
          );
      else if (i = getIteratorFn(children), "function" === typeof i)
        for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
          nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
            nameSoFar,
            array,
            escapedPrefix,
            type,
            callback
          );
      else if ("object" === type) {
        if ("function" === typeof children.then)
          return mapIntoArray(
            resolveThenable(children),
            array,
            escapedPrefix,
            nameSoFar,
            callback
          );
        array = String(children);
        throw Error(
          "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
        );
      }
      return invokeCallback;
    }
    function mapChildren(children, func, context) {
      if (null == children) return children;
      var result = [], count = 0;
      mapIntoArray(children, result, "", "", function(child) {
        return func.call(context, child, count++);
      });
      return result;
    }
    function lazyInitializer(payload) {
      if (-1 === payload._status) {
        var ctor = payload._result;
        ctor = ctor();
        ctor.then(
          function(moduleObject) {
            if (0 === payload._status || -1 === payload._status)
              payload._status = 1, payload._result = moduleObject;
          },
          function(error) {
            if (0 === payload._status || -1 === payload._status)
              payload._status = 2, payload._result = error;
          }
        );
        -1 === payload._status && (payload._status = 0, payload._result = ctor);
      }
      if (1 === payload._status) return payload._result.default;
      throw payload._result;
    }
    var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
      if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
        var event = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
          error
        });
        if (!window.dispatchEvent(event)) return;
      } else if ("object" === typeof process && "function" === typeof process.emit) {
        process.emit("uncaughtException", error);
        return;
      }
      console.error(error);
    };
    var Children = {
      map: mapChildren,
      forEach: function(children, forEachFunc, forEachContext) {
        mapChildren(
          children,
          function() {
            forEachFunc.apply(this, arguments);
          },
          forEachContext
        );
      },
      count: function(children) {
        var n = 0;
        mapChildren(children, function() {
          n++;
        });
        return n;
      },
      toArray: function(children) {
        return mapChildren(children, function(child) {
          return child;
        }) || [];
      },
      only: function(children) {
        if (!isValidElement(children))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return children;
      }
    };
    exports.Activity = REACT_ACTIVITY_TYPE;
    exports.Children = Children;
    exports.Component = Component;
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.Profiler = REACT_PROFILER_TYPE;
    exports.PureComponent = PureComponent;
    exports.StrictMode = REACT_STRICT_MODE_TYPE;
    exports.Suspense = REACT_SUSPENSE_TYPE;
    exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
    exports.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function(size2) {
        return ReactSharedInternals.H.useMemoCache(size2);
      }
    };
    exports.cache = function(fn) {
      return function() {
        return fn.apply(null, arguments);
      };
    };
    exports.cacheSignal = function() {
      return null;
    };
    exports.cloneElement = function(element, config, children) {
      if (null === element || void 0 === element)
        throw Error(
          "The argument must be a React element, but you passed " + element + "."
        );
      var props = assign({}, element.props), key = element.key;
      if (null != config)
        for (propName in void 0 !== config.key && (key = "" + config.key), config)
          !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
      var propName = arguments.length - 2;
      if (1 === propName) props.children = children;
      else if (1 < propName) {
        for (var childArray = Array(propName), i = 0; i < propName; i++)
          childArray[i] = arguments[i + 2];
        props.children = childArray;
      }
      return ReactElement(element.type, key, props);
    };
    exports.createContext = function(defaultValue) {
      defaultValue = {
        $$typeof: REACT_CONTEXT_TYPE,
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      };
      defaultValue.Provider = defaultValue;
      defaultValue.Consumer = {
        $$typeof: REACT_CONSUMER_TYPE,
        _context: defaultValue
      };
      return defaultValue;
    };
    exports.createElement = function(type, config, children) {
      var propName, props = {}, key = null;
      if (null != config)
        for (propName in void 0 !== config.key && (key = "" + config.key), config)
          hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
      var childrenLength = arguments.length - 2;
      if (1 === childrenLength) props.children = children;
      else if (1 < childrenLength) {
        for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
          childArray[i] = arguments[i + 2];
        props.children = childArray;
      }
      if (type && type.defaultProps)
        for (propName in childrenLength = type.defaultProps, childrenLength)
          void 0 === props[propName] && (props[propName] = childrenLength[propName]);
      return ReactElement(type, key, props);
    };
    exports.createRef = function() {
      return { current: null };
    };
    exports.forwardRef = function(render) {
      return { $$typeof: REACT_FORWARD_REF_TYPE, render };
    };
    exports.isValidElement = isValidElement;
    exports.lazy = function(ctor) {
      return {
        $$typeof: REACT_LAZY_TYPE,
        _payload: { _status: -1, _result: ctor },
        _init: lazyInitializer
      };
    };
    exports.memo = function(type, compare) {
      return {
        $$typeof: REACT_MEMO_TYPE,
        type,
        compare: void 0 === compare ? null : compare
      };
    };
    exports.startTransition = function(scope) {
      var prevTransition = ReactSharedInternals.T, currentTransition = {};
      ReactSharedInternals.T = currentTransition;
      try {
        var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
        null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
        "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
      } catch (error) {
        reportGlobalError(error);
      } finally {
        null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
      }
    };
    exports.unstable_useCacheRefresh = function() {
      return ReactSharedInternals.H.useCacheRefresh();
    };
    exports.use = function(usable) {
      return ReactSharedInternals.H.use(usable);
    };
    exports.useActionState = function(action, initialState, permalink) {
      return ReactSharedInternals.H.useActionState(action, initialState, permalink);
    };
    exports.useCallback = function(callback, deps) {
      return ReactSharedInternals.H.useCallback(callback, deps);
    };
    exports.useContext = function(Context) {
      return ReactSharedInternals.H.useContext(Context);
    };
    exports.useDebugValue = function() {
    };
    exports.useDeferredValue = function(value, initialValue) {
      return ReactSharedInternals.H.useDeferredValue(value, initialValue);
    };
    exports.useEffect = function(create3, deps) {
      return ReactSharedInternals.H.useEffect(create3, deps);
    };
    exports.useEffectEvent = function(callback) {
      return ReactSharedInternals.H.useEffectEvent(callback);
    };
    exports.useId = function() {
      return ReactSharedInternals.H.useId();
    };
    exports.useImperativeHandle = function(ref2, create3, deps) {
      return ReactSharedInternals.H.useImperativeHandle(ref2, create3, deps);
    };
    exports.useInsertionEffect = function(create3, deps) {
      return ReactSharedInternals.H.useInsertionEffect(create3, deps);
    };
    exports.useLayoutEffect = function(create3, deps) {
      return ReactSharedInternals.H.useLayoutEffect(create3, deps);
    };
    exports.useMemo = function(create3, deps) {
      return ReactSharedInternals.H.useMemo(create3, deps);
    };
    exports.useOptimistic = function(passthrough, reducer) {
      return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
    };
    exports.useReducer = function(reducer, initialArg, init) {
      return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
    };
    exports.useRef = function(initialValue) {
      return ReactSharedInternals.H.useRef(initialValue);
    };
    exports.useState = function(initialState) {
      return ReactSharedInternals.H.useState(initialState);
    };
    exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
      return ReactSharedInternals.H.useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
      );
    };
    exports.useTransition = function() {
      return ReactSharedInternals.H.useTransition();
    };
    exports.version = "19.2.4";
  }
});

// node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "node_modules/react/cjs/react.development.js"(exports, module) {
    "use strict";
    "production" !== process.env.NODE_ENV && (function() {
      function defineDeprecationWarning(methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              info[0],
              info[1]
            );
          }
        });
      }
      function getIteratorFn(maybeIterable) {
        if (null === maybeIterable || "object" !== typeof maybeIterable)
          return null;
        maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
        return "function" === typeof maybeIterable ? maybeIterable : null;
      }
      function warnNoop(publicInstance, callerName) {
        publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
        var warningKey = publicInstance + "." + callerName;
        didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          callerName,
          publicInstance
        ), didWarnStateUpdateForUnmountedComponent[warningKey] = true);
      }
      function Component(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      function ComponentDummy() {
      }
      function PureComponent(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      function noop() {
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        try {
          testStringCoercion(value);
          var JSCompiler_inline_result = false;
        } catch (e) {
          JSCompiler_inline_result = true;
        }
        if (JSCompiler_inline_result) {
          JSCompiler_inline_result = console;
          var JSCompiler_temp_const = JSCompiler_inline_result.error;
          var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          JSCompiler_temp_const.call(
            JSCompiler_inline_result,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            JSCompiler_inline_result$jscomp$0
          );
          return testStringCoercion(value);
        }
      }
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if ("object" === typeof type)
          switch ("number" === typeof type.tag && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x) {
              }
          }
        return null;
      }
      function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
          return "<...>";
        try {
          var name = getComponentNameFromType(type);
          return name ? "<" + name + ">" : "<...>";
        } catch (x) {
          return "<...>";
        }
      }
      function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
      }
      function UnknownOwner() {
        return Error("react-stack-top-frame");
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning) return false;
        }
        return void 0 !== config.key;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            displayName
          ));
        }
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        ));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
      }
      function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          props,
          _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
          enumerable: false,
          get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: null
        });
        Object.defineProperty(type, "_debugStack", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
      }
      function cloneAndReplaceKey(oldElement, newKey) {
        newKey = ReactElement(
          oldElement.type,
          newKey,
          oldElement.props,
          oldElement._owner,
          oldElement._debugStack,
          oldElement._debugTask
        );
        oldElement._store && (newKey._store.validated = oldElement._store.validated);
        return newKey;
      }
      function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
      }
      function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function escape(key) {
        var escaperLookup = { "=": "=0", ":": "=2" };
        return "$" + key.replace(/[=:]/g, function(match) {
          return escaperLookup[match];
        });
      }
      function getElementKey(element, index) {
        return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
      }
      function resolveThenable(thenable) {
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
          default:
            switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
              function(fulfilledValue) {
                "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
              },
              function(error) {
                "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
              }
            )), thenable.status) {
              case "fulfilled":
                return thenable.value;
              case "rejected":
                throw thenable.reason;
            }
        }
        throw thenable;
      }
      function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        if ("undefined" === type || "boolean" === type) children = null;
        var invokeCallback = false;
        if (null === children) invokeCallback = true;
        else
          switch (type) {
            case "bigint":
            case "string":
            case "number":
              invokeCallback = true;
              break;
            case "object":
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = true;
                  break;
                case REACT_LAZY_TYPE:
                  return invokeCallback = children._init, mapIntoArray(
                    invokeCallback(children._payload),
                    array,
                    escapedPrefix,
                    nameSoFar,
                    callback
                  );
              }
          }
        if (invokeCallback) {
          invokeCallback = children;
          callback = callback(invokeCallback);
          var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
          isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
            return c;
          })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(
            callback,
            escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(
              userProvidedKeyEscapeRegex,
              "$&/"
            ) + "/") + childKey
          ), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
          return 1;
        }
        invokeCallback = 0;
        childKey = "" === nameSoFar ? "." : nameSoFar + ":";
        if (isArrayImpl(children))
          for (var i = 0; i < children.length; i++)
            nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if (i = getIteratorFn(children), "function" === typeof i)
          for (i === children.entries && (didWarnAboutMaps || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), didWarnAboutMaps = true), children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
            nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if ("object" === type) {
          if ("function" === typeof children.then)
            return mapIntoArray(
              resolveThenable(children),
              array,
              escapedPrefix,
              nameSoFar,
              callback
            );
          array = String(children);
          throw Error(
            "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return invokeCallback;
      }
      function mapChildren(children, func, context) {
        if (null == children) return children;
        var result = [], count = 0;
        mapIntoArray(children, result, "", "", function(child) {
          return func.call(context, child, count++);
        });
        return result;
      }
      function lazyInitializer(payload) {
        if (-1 === payload._status) {
          var ioInfo = payload._ioInfo;
          null != ioInfo && (ioInfo.start = ioInfo.end = performance.now());
          ioInfo = payload._result;
          var thenable = ioInfo();
          thenable.then(
            function(moduleObject) {
              if (0 === payload._status || -1 === payload._status) {
                payload._status = 1;
                payload._result = moduleObject;
                var _ioInfo = payload._ioInfo;
                null != _ioInfo && (_ioInfo.end = performance.now());
                void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
              }
            },
            function(error) {
              if (0 === payload._status || -1 === payload._status) {
                payload._status = 2;
                payload._result = error;
                var _ioInfo2 = payload._ioInfo;
                null != _ioInfo2 && (_ioInfo2.end = performance.now());
                void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
              }
            }
          );
          ioInfo = payload._ioInfo;
          if (null != ioInfo) {
            ioInfo.value = thenable;
            var displayName = thenable.displayName;
            "string" === typeof displayName && (ioInfo.name = displayName);
          }
          -1 === payload._status && (payload._status = 0, payload._result = thenable);
        }
        if (1 === payload._status)
          return ioInfo = payload._result, void 0 === ioInfo && console.error(
            "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
            ioInfo
          ), "default" in ioInfo || console.error(
            "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
            ioInfo
          ), ioInfo.default;
        throw payload._result;
      }
      function resolveDispatcher() {
        var dispatcher = ReactSharedInternals.H;
        null === dispatcher && console.error(
          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
        );
        return dispatcher;
      }
      function releaseAsyncTransition() {
        ReactSharedInternals.asyncTransitions--;
      }
      function enqueueTask(task) {
        if (null === enqueueTaskImpl)
          try {
            var requireString = ("require" + Math.random()).slice(0, 7);
            enqueueTaskImpl = (module && module[requireString]).call(
              module,
              "timers"
            ).setImmediate;
          } catch (_err) {
            enqueueTaskImpl = function(callback) {
              false === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = true, "undefined" === typeof MessageChannel && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var channel = new MessageChannel();
              channel.port1.onmessage = callback;
              channel.port2.postMessage(void 0);
            };
          }
        return enqueueTaskImpl(task);
      }
      function aggregateErrors(errors2) {
        return 1 < errors2.length && "function" === typeof AggregateError ? new AggregateError(errors2) : errors2[0];
      }
      function popActScope(prevActQueue, prevActScopeDepth) {
        prevActScopeDepth !== actScopeDepth - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        );
        actScopeDepth = prevActScopeDepth;
      }
      function recursivelyFlushAsyncActWork(returnValue, resolve2, reject) {
        var queue = ReactSharedInternals.actQueue;
        if (null !== queue)
          if (0 !== queue.length)
            try {
              flushActQueue(queue);
              enqueueTask(function() {
                return recursivelyFlushAsyncActWork(returnValue, resolve2, reject);
              });
              return;
            } catch (error) {
              ReactSharedInternals.thrownErrors.push(error);
            }
          else ReactSharedInternals.actQueue = null;
        0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve2(returnValue);
      }
      function flushActQueue(queue) {
        if (!isFlushing) {
          isFlushing = true;
          var i = 0;
          try {
            for (; i < queue.length; i++) {
              var callback = queue[i];
              do {
                ReactSharedInternals.didUsePromise = false;
                var continuation = callback(false);
                if (null !== continuation) {
                  if (ReactSharedInternals.didUsePromise) {
                    queue[i] = callback;
                    queue.splice(0, i);
                    return;
                  }
                  callback = continuation;
                } else break;
              } while (1);
            }
            queue.length = 0;
          } catch (error) {
            queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
          } finally {
            isFlushing = false;
          }
        }
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
        isMounted: function() {
          return false;
        },
        enqueueForceUpdate: function(publicInstance) {
          warnNoop(publicInstance, "forceUpdate");
        },
        enqueueReplaceState: function(publicInstance) {
          warnNoop(publicInstance, "replaceState");
        },
        enqueueSetState: function(publicInstance) {
          warnNoop(publicInstance, "setState");
        }
      }, assign = Object.assign, emptyObject = {};
      Object.freeze(emptyObject);
      Component.prototype.isReactComponent = {};
      Component.prototype.setState = function(partialState, callback) {
        if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, partialState, callback, "setState");
      };
      Component.prototype.forceUpdate = function(callback) {
        this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
      };
      var deprecatedAPIs = {
        isMounted: [
          "isMounted",
          "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
          "replaceState",
          "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
      };
      for (fnName in deprecatedAPIs)
        deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
      ComponentDummy.prototype = Component.prototype;
      deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
      deprecatedAPIs.constructor = PureComponent;
      assign(deprecatedAPIs, Component.prototype);
      deprecatedAPIs.isPureReactComponent = true;
      var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference"), ReactSharedInternals = {
        H: null,
        A: null,
        T: null,
        S: null,
        actQueue: null,
        asyncTransitions: 0,
        isBatchingLegacy: false,
        didScheduleLegacyUpdate: false,
        didUsePromise: false,
        thrownErrors: [],
        getCurrentStack: null,
        recentlyCreatedOwnerStacks: 0
      }, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
        return null;
      };
      deprecatedAPIs = {
        react_stack_bottom_frame: function(callStackForError) {
          return callStackForError();
        }
      };
      var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
      var didWarnAboutElementRef = {};
      var unknownOwnerDebugStack = deprecatedAPIs.react_stack_bottom_frame.bind(
        deprecatedAPIs,
        UnknownOwner
      )();
      var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
      var didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
        if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
          var event = new window.ErrorEvent("error", {
            bubbles: true,
            cancelable: true,
            message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
            error
          });
          if (!window.dispatchEvent(event)) return;
        } else if ("object" === typeof process && "function" === typeof process.emit) {
          process.emit("uncaughtException", error);
          return;
        }
        console.error(error);
      }, didWarnAboutMessageChannel = false, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = false, isFlushing = false, queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function(callback) {
        queueMicrotask(function() {
          return queueMicrotask(callback);
        });
      } : enqueueTask;
      deprecatedAPIs = Object.freeze({
        __proto__: null,
        c: function(size2) {
          return resolveDispatcher().useMemoCache(size2);
        }
      });
      var fnName = {
        map: mapChildren,
        forEach: function(children, forEachFunc, forEachContext) {
          mapChildren(
            children,
            function() {
              forEachFunc.apply(this, arguments);
            },
            forEachContext
          );
        },
        count: function(children) {
          var n = 0;
          mapChildren(children, function() {
            n++;
          });
          return n;
        },
        toArray: function(children) {
          return mapChildren(children, function(child) {
            return child;
          }) || [];
        },
        only: function(children) {
          if (!isValidElement(children))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return children;
        }
      };
      exports.Activity = REACT_ACTIVITY_TYPE;
      exports.Children = fnName;
      exports.Component = Component;
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.Profiler = REACT_PROFILER_TYPE;
      exports.PureComponent = PureComponent;
      exports.StrictMode = REACT_STRICT_MODE_TYPE;
      exports.Suspense = REACT_SUSPENSE_TYPE;
      exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
      exports.__COMPILER_RUNTIME = deprecatedAPIs;
      exports.act = function(callback) {
        var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
        actScopeDepth++;
        var queue = ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [], didAwaitActCall = false;
        try {
          var result = callback();
        } catch (error) {
          ReactSharedInternals.thrownErrors.push(error);
        }
        if (0 < ReactSharedInternals.thrownErrors.length)
          throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
        if (null !== result && "object" === typeof result && "function" === typeof result.then) {
          var thenable = result;
          queueSeveralMicrotasks(function() {
            didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          });
          return {
            then: function(resolve2, reject) {
              didAwaitActCall = true;
              thenable.then(
                function(returnValue) {
                  popActScope(prevActQueue, prevActScopeDepth);
                  if (0 === prevActScopeDepth) {
                    try {
                      flushActQueue(queue), enqueueTask(function() {
                        return recursivelyFlushAsyncActWork(
                          returnValue,
                          resolve2,
                          reject
                        );
                      });
                    } catch (error$0) {
                      ReactSharedInternals.thrownErrors.push(error$0);
                    }
                    if (0 < ReactSharedInternals.thrownErrors.length) {
                      var _thrownError = aggregateErrors(
                        ReactSharedInternals.thrownErrors
                      );
                      ReactSharedInternals.thrownErrors.length = 0;
                      reject(_thrownError);
                    }
                  } else resolve2(returnValue);
                },
                function(error) {
                  popActScope(prevActQueue, prevActScopeDepth);
                  0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(
                    ReactSharedInternals.thrownErrors
                  ), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
                }
              );
            }
          };
        }
        var returnValue$jscomp$0 = result;
        popActScope(prevActQueue, prevActScopeDepth);
        0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function() {
          didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), ReactSharedInternals.actQueue = null);
        if (0 < ReactSharedInternals.thrownErrors.length)
          throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
        return {
          then: function(resolve2, reject) {
            didAwaitActCall = true;
            0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
              return recursivelyFlushAsyncActWork(
                returnValue$jscomp$0,
                resolve2,
                reject
              );
            })) : resolve2(returnValue$jscomp$0);
          }
        };
      };
      exports.cache = function(fn) {
        return function() {
          return fn.apply(null, arguments);
        };
      };
      exports.cacheSignal = function() {
        return null;
      };
      exports.captureOwnerStack = function() {
        var getCurrentStack = ReactSharedInternals.getCurrentStack;
        return null === getCurrentStack ? null : getCurrentStack();
      };
      exports.cloneElement = function(element, config, children) {
        if (null === element || void 0 === element)
          throw Error(
            "The argument must be a React element, but you passed " + element + "."
          );
        var props = assign({}, element.props), key = element.key, owner = element._owner;
        if (null != config) {
          var JSCompiler_inline_result;
          a: {
            if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(
              config,
              "ref"
            ).get) && JSCompiler_inline_result.isReactWarning) {
              JSCompiler_inline_result = false;
              break a;
            }
            JSCompiler_inline_result = void 0 !== config.ref;
          }
          JSCompiler_inline_result && (owner = getOwner());
          hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
          for (propName in config)
            !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
        }
        var propName = arguments.length - 2;
        if (1 === propName) props.children = children;
        else if (1 < propName) {
          JSCompiler_inline_result = Array(propName);
          for (var i = 0; i < propName; i++)
            JSCompiler_inline_result[i] = arguments[i + 2];
          props.children = JSCompiler_inline_result;
        }
        props = ReactElement(
          element.type,
          key,
          props,
          owner,
          element._debugStack,
          element._debugTask
        );
        for (key = 2; key < arguments.length; key++)
          validateChildKeys(arguments[key]);
        return props;
      };
      exports.createContext = function(defaultValue) {
        defaultValue = {
          $$typeof: REACT_CONTEXT_TYPE,
          _currentValue: defaultValue,
          _currentValue2: defaultValue,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        };
        defaultValue.Provider = defaultValue;
        defaultValue.Consumer = {
          $$typeof: REACT_CONSUMER_TYPE,
          _context: defaultValue
        };
        defaultValue._currentRenderer = null;
        defaultValue._currentRenderer2 = null;
        return defaultValue;
      };
      exports.createElement = function(type, config, children) {
        for (var i = 2; i < arguments.length; i++)
          validateChildKeys(arguments[i]);
        i = {};
        var key = null;
        if (null != config)
          for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = true, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key), config)
            hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
        var childrenLength = arguments.length - 2;
        if (1 === childrenLength) i.children = children;
        else if (1 < childrenLength) {
          for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)
            childArray[_i] = arguments[_i + 2];
          Object.freeze && Object.freeze(childArray);
          i.children = childArray;
        }
        if (type && type.defaultProps)
          for (propName in childrenLength = type.defaultProps, childrenLength)
            void 0 === i[propName] && (i[propName] = childrenLength[propName]);
        key && defineKeyPropWarningGetter(
          i,
          "function" === typeof type ? type.displayName || type.name || "Unknown" : type
        );
        var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return ReactElement(
          type,
          key,
          i,
          getOwner(),
          propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
      exports.createRef = function() {
        var refObject = { current: null };
        Object.seal(refObject);
        return refObject;
      };
      exports.forwardRef = function(render) {
        null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error(
          "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
        ) : "function" !== typeof render ? console.error(
          "forwardRef requires a render function but was given %s.",
          null === render ? "null" : typeof render
        ) : 0 !== render.length && 2 !== render.length && console.error(
          "forwardRef render functions accept exactly two parameters: props and ref. %s",
          1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
        );
        null != render && null != render.defaultProps && console.error(
          "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
        );
        var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render }, ownName;
        Object.defineProperty(elementType, "displayName", {
          enumerable: false,
          configurable: true,
          get: function() {
            return ownName;
          },
          set: function(name) {
            ownName = name;
            render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
          }
        });
        return elementType;
      };
      exports.isValidElement = isValidElement;
      exports.lazy = function(ctor) {
        ctor = { _status: -1, _result: ctor };
        var lazyType = {
          $$typeof: REACT_LAZY_TYPE,
          _payload: ctor,
          _init: lazyInitializer
        }, ioInfo = {
          name: "lazy",
          start: -1,
          end: -1,
          value: null,
          owner: null,
          debugStack: Error("react-stack-top-frame"),
          debugTask: console.createTask ? console.createTask("lazy()") : null
        };
        ctor._ioInfo = ioInfo;
        lazyType._debugInfo = [{ awaited: ioInfo }];
        return lazyType;
      };
      exports.memo = function(type, compare) {
        null == type && console.error(
          "memo: The first argument must be a component. Instead received: %s",
          null === type ? "null" : typeof type
        );
        compare = {
          $$typeof: REACT_MEMO_TYPE,
          type,
          compare: void 0 === compare ? null : compare
        };
        var ownName;
        Object.defineProperty(compare, "displayName", {
          enumerable: false,
          configurable: true,
          get: function() {
            return ownName;
          },
          set: function(name) {
            ownName = name;
            type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
          }
        });
        return compare;
      };
      exports.startTransition = function(scope) {
        var prevTransition = ReactSharedInternals.T, currentTransition = {};
        currentTransition._updatedFibers = /* @__PURE__ */ new Set();
        ReactSharedInternals.T = currentTransition;
        try {
          var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
          null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
          "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && (ReactSharedInternals.asyncTransitions++, returnValue.then(releaseAsyncTransition, releaseAsyncTransition), returnValue.then(noop, reportGlobalError));
        } catch (error) {
          reportGlobalError(error);
        } finally {
          null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), null !== prevTransition && null !== currentTransition.types && (null !== prevTransition.types && prevTransition.types !== currentTransition.types && console.error(
            "We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."
          ), prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
        }
      };
      exports.unstable_useCacheRefresh = function() {
        return resolveDispatcher().useCacheRefresh();
      };
      exports.use = function(usable) {
        return resolveDispatcher().use(usable);
      };
      exports.useActionState = function(action, initialState, permalink) {
        return resolveDispatcher().useActionState(
          action,
          initialState,
          permalink
        );
      };
      exports.useCallback = function(callback, deps) {
        return resolveDispatcher().useCallback(callback, deps);
      };
      exports.useContext = function(Context) {
        var dispatcher = resolveDispatcher();
        Context.$$typeof === REACT_CONSUMER_TYPE && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        );
        return dispatcher.useContext(Context);
      };
      exports.useDebugValue = function(value, formatterFn) {
        return resolveDispatcher().useDebugValue(value, formatterFn);
      };
      exports.useDeferredValue = function(value, initialValue) {
        return resolveDispatcher().useDeferredValue(value, initialValue);
      };
      exports.useEffect = function(create3, deps) {
        null == create3 && console.warn(
          "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useEffect(create3, deps);
      };
      exports.useEffectEvent = function(callback) {
        return resolveDispatcher().useEffectEvent(callback);
      };
      exports.useId = function() {
        return resolveDispatcher().useId();
      };
      exports.useImperativeHandle = function(ref2, create3, deps) {
        return resolveDispatcher().useImperativeHandle(ref2, create3, deps);
      };
      exports.useInsertionEffect = function(create3, deps) {
        null == create3 && console.warn(
          "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useInsertionEffect(create3, deps);
      };
      exports.useLayoutEffect = function(create3, deps) {
        null == create3 && console.warn(
          "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useLayoutEffect(create3, deps);
      };
      exports.useMemo = function(create3, deps) {
        return resolveDispatcher().useMemo(create3, deps);
      };
      exports.useOptimistic = function(passthrough, reducer) {
        return resolveDispatcher().useOptimistic(passthrough, reducer);
      };
      exports.useReducer = function(reducer, initialArg, init) {
        return resolveDispatcher().useReducer(reducer, initialArg, init);
      };
      exports.useRef = function(initialValue) {
        return resolveDispatcher().useRef(initialValue);
      };
      exports.useState = function(initialState) {
        return resolveDispatcher().useState(initialState);
      };
      exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
        return resolveDispatcher().useSyncExternalStore(
          subscribe,
          getSnapshot,
          getServerSnapshot
        );
      };
      exports.useTransition = function() {
        return resolveDispatcher().useTransition();
      };
      exports.version = "19.2.4";
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/react/index.js"(exports, module) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module.exports = require_react_production();
    } else {
      module.exports = require_react_development();
    }
  }
});

// node_modules/@tauri-apps/api/external/tslib/tslib.es6.js
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
var init_tslib_es6 = __esm({
  "node_modules/@tauri-apps/api/external/tslib/tslib.es6.js"() {
  }
});

// node_modules/@tauri-apps/api/core.js
function transformCallback(callback, once = false) {
  return window.__TAURI_INTERNALS__.transformCallback(callback, once);
}
async function invoke(cmd, args = {}, options) {
  return window.__TAURI_INTERNALS__.invoke(cmd, args, options);
}
var _Channel_onmessage, _Channel_nextMessageIndex, _Channel_pendingMessages, _Channel_messageEndIndex, _Resource_rid, SERIALIZE_TO_IPC_FN, Channel, Resource;
var init_core = __esm({
  "node_modules/@tauri-apps/api/core.js"() {
    init_tslib_es6();
    SERIALIZE_TO_IPC_FN = "__TAURI_TO_IPC_KEY__";
    Channel = class {
      constructor(onmessage) {
        _Channel_onmessage.set(this, void 0);
        _Channel_nextMessageIndex.set(this, 0);
        _Channel_pendingMessages.set(this, []);
        _Channel_messageEndIndex.set(this, void 0);
        __classPrivateFieldSet(this, _Channel_onmessage, onmessage || (() => {
        }), "f");
        this.id = transformCallback((rawMessage) => {
          const index = rawMessage.index;
          if ("end" in rawMessage) {
            if (index == __classPrivateFieldGet(this, _Channel_nextMessageIndex, "f")) {
              this.cleanupCallback();
            } else {
              __classPrivateFieldSet(this, _Channel_messageEndIndex, index, "f");
            }
            return;
          }
          const message2 = rawMessage.message;
          if (index == __classPrivateFieldGet(this, _Channel_nextMessageIndex, "f")) {
            __classPrivateFieldGet(this, _Channel_onmessage, "f").call(this, message2);
            __classPrivateFieldSet(this, _Channel_nextMessageIndex, __classPrivateFieldGet(this, _Channel_nextMessageIndex, "f") + 1, "f");
            while (__classPrivateFieldGet(this, _Channel_nextMessageIndex, "f") in __classPrivateFieldGet(this, _Channel_pendingMessages, "f")) {
              const message3 = __classPrivateFieldGet(this, _Channel_pendingMessages, "f")[__classPrivateFieldGet(this, _Channel_nextMessageIndex, "f")];
              __classPrivateFieldGet(this, _Channel_onmessage, "f").call(this, message3);
              delete __classPrivateFieldGet(this, _Channel_pendingMessages, "f")[__classPrivateFieldGet(this, _Channel_nextMessageIndex, "f")];
              __classPrivateFieldSet(this, _Channel_nextMessageIndex, __classPrivateFieldGet(this, _Channel_nextMessageIndex, "f") + 1, "f");
            }
            if (__classPrivateFieldGet(this, _Channel_nextMessageIndex, "f") === __classPrivateFieldGet(this, _Channel_messageEndIndex, "f")) {
              this.cleanupCallback();
            }
          } else {
            __classPrivateFieldGet(this, _Channel_pendingMessages, "f")[index] = message2;
          }
        });
      }
      cleanupCallback() {
        window.__TAURI_INTERNALS__.unregisterCallback(this.id);
      }
      set onmessage(handler) {
        __classPrivateFieldSet(this, _Channel_onmessage, handler, "f");
      }
      get onmessage() {
        return __classPrivateFieldGet(this, _Channel_onmessage, "f");
      }
      [(_Channel_onmessage = /* @__PURE__ */ new WeakMap(), _Channel_nextMessageIndex = /* @__PURE__ */ new WeakMap(), _Channel_pendingMessages = /* @__PURE__ */ new WeakMap(), _Channel_messageEndIndex = /* @__PURE__ */ new WeakMap(), SERIALIZE_TO_IPC_FN)]() {
        return `__CHANNEL__:${this.id}`;
      }
      toJSON() {
        return this[SERIALIZE_TO_IPC_FN]();
      }
    };
    Resource = class {
      get rid() {
        return __classPrivateFieldGet(this, _Resource_rid, "f");
      }
      constructor(rid) {
        _Resource_rid.set(this, void 0);
        __classPrivateFieldSet(this, _Resource_rid, rid, "f");
      }
      /**
       * Destroys and cleans up this resource from memory.
       * **You should not call any method on this object anymore and should drop any reference to it.**
       */
      async close() {
        return invoke("plugin:resources|close", {
          rid: this.rid
        });
      }
    };
    _Resource_rid = /* @__PURE__ */ new WeakMap();
  }
});

// node_modules/@tauri-apps/plugin-dialog/dist-js/index.js
var dist_js_exports = {};
__export(dist_js_exports, {
  ask: () => ask,
  confirm: () => confirm,
  message: () => message,
  open: () => open,
  save: () => save
});
function buttonsToRust(buttons) {
  if (buttons === void 0) {
    return void 0;
  }
  if (typeof buttons === "string") {
    return buttons;
  } else if ("ok" in buttons && "cancel" in buttons) {
    return { OkCancelCustom: [buttons.ok, buttons.cancel] };
  } else if ("yes" in buttons && "no" in buttons && "cancel" in buttons) {
    return {
      YesNoCancelCustom: [buttons.yes, buttons.no, buttons.cancel]
    };
  } else if ("ok" in buttons) {
    return { OkCustom: buttons.ok };
  }
  return void 0;
}
async function open(options = {}) {
  if (typeof options === "object") {
    Object.freeze(options);
  }
  return await invoke("plugin:dialog|open", { options });
}
async function save(options = {}) {
  if (typeof options === "object") {
    Object.freeze(options);
  }
  return await invoke("plugin:dialog|save", { options });
}
async function messageCommand(message2, options) {
  return await invoke("plugin:dialog|message", {
    message: message2,
    title: options?.title,
    kind: options?.kind,
    buttons: buttonsToRust(options?.buttons)
  });
}
async function message(message2, options) {
  const opts = typeof options === "string" ? { title: options } : options;
  if (opts && !opts.buttons && opts.okLabel) {
    opts.buttons = { ok: opts.okLabel };
  }
  return messageCommand(message2, opts);
}
async function ask(message2, options) {
  const opts = typeof options === "string" ? { title: options } : options;
  const customButtons = opts?.okLabel || opts?.cancelLabel;
  const okLabel = opts?.okLabel ?? "Yes";
  return await messageCommand(message2, {
    title: opts?.title,
    kind: opts?.kind,
    buttons: customButtons ? { ok: okLabel, cancel: opts.cancelLabel ?? "No" } : "YesNo"
  }) === okLabel;
}
async function confirm(message2, options) {
  const opts = typeof options === "string" ? { title: options } : options;
  const customButtons = opts?.okLabel || opts?.cancelLabel;
  const okLabel = opts?.okLabel ?? "Ok";
  return await messageCommand(message2, {
    title: opts?.title,
    kind: opts?.kind,
    buttons: customButtons ? { ok: okLabel, cancel: opts.cancelLabel ?? "Cancel" } : "OkCancel"
  }) === okLabel;
}
var init_dist_js = __esm({
  "node_modules/@tauri-apps/plugin-dialog/dist-js/index.js"() {
    init_core();
  }
});

// node_modules/@tauri-apps/api/path.js
var path_exports = {};
__export(path_exports, {
  BaseDirectory: () => BaseDirectory,
  appCacheDir: () => appCacheDir,
  appConfigDir: () => appConfigDir,
  appDataDir: () => appDataDir,
  appLocalDataDir: () => appLocalDataDir,
  appLogDir: () => appLogDir,
  audioDir: () => audioDir,
  basename: () => basename,
  cacheDir: () => cacheDir,
  configDir: () => configDir,
  dataDir: () => dataDir,
  delimiter: () => delimiter,
  desktopDir: () => desktopDir,
  dirname: () => dirname,
  documentDir: () => documentDir,
  downloadDir: () => downloadDir,
  executableDir: () => executableDir,
  extname: () => extname,
  fontDir: () => fontDir,
  homeDir: () => homeDir,
  isAbsolute: () => isAbsolute,
  join: () => join,
  localDataDir: () => localDataDir,
  normalize: () => normalize,
  pictureDir: () => pictureDir,
  publicDir: () => publicDir,
  resolve: () => resolve,
  resolveResource: () => resolveResource,
  resourceDir: () => resourceDir,
  runtimeDir: () => runtimeDir,
  sep: () => sep,
  tempDir: () => tempDir,
  templateDir: () => templateDir,
  videoDir: () => videoDir
});
async function appConfigDir() {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.AppConfig
  });
}
async function appDataDir() {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.AppData
  });
}
async function appLocalDataDir() {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.AppLocalData
  });
}
async function appCacheDir() {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.AppCache
  });
}
async function audioDir() {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.Audio
  });
}
async function cacheDir() {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.Cache
  });
}
async function configDir() {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.Config
  });
}
async function dataDir() {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.Data
  });
}
async function desktopDir() {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.Desktop
  });
}
async function documentDir() {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.Document
  });
}
async function downloadDir() {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.Download
  });
}
async function executableDir() {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.Executable
  });
}
async function fontDir() {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.Font
  });
}
async function homeDir() {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.Home
  });
}
async function localDataDir() {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.LocalData
  });
}
async function pictureDir() {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.Picture
  });
}
async function publicDir() {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.Public
  });
}
async function resourceDir() {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.Resource
  });
}
async function resolveResource(resourcePath) {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.Resource,
    path: resourcePath
  });
}
async function runtimeDir() {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.Runtime
  });
}
async function templateDir() {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.Template
  });
}
async function videoDir() {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.Video
  });
}
async function appLogDir() {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.AppLog
  });
}
async function tempDir() {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.Temp
  });
}
function sep() {
  return window.__TAURI_INTERNALS__.plugins.path.sep;
}
function delimiter() {
  return window.__TAURI_INTERNALS__.plugins.path.delimiter;
}
async function resolve(...paths) {
  return invoke("plugin:path|resolve", { paths });
}
async function normalize(path) {
  return invoke("plugin:path|normalize", { path });
}
async function join(...paths) {
  return invoke("plugin:path|join", { paths });
}
async function dirname(path) {
  return invoke("plugin:path|dirname", { path });
}
async function extname(path) {
  return invoke("plugin:path|extname", { path });
}
async function basename(path, ext) {
  return invoke("plugin:path|basename", { path, ext });
}
async function isAbsolute(path) {
  return invoke("plugin:path|is_absolute", { path });
}
var BaseDirectory;
var init_path = __esm({
  "node_modules/@tauri-apps/api/path.js"() {
    init_core();
    (function(BaseDirectory2) {
      BaseDirectory2[BaseDirectory2["Audio"] = 1] = "Audio";
      BaseDirectory2[BaseDirectory2["Cache"] = 2] = "Cache";
      BaseDirectory2[BaseDirectory2["Config"] = 3] = "Config";
      BaseDirectory2[BaseDirectory2["Data"] = 4] = "Data";
      BaseDirectory2[BaseDirectory2["LocalData"] = 5] = "LocalData";
      BaseDirectory2[BaseDirectory2["Document"] = 6] = "Document";
      BaseDirectory2[BaseDirectory2["Download"] = 7] = "Download";
      BaseDirectory2[BaseDirectory2["Picture"] = 8] = "Picture";
      BaseDirectory2[BaseDirectory2["Public"] = 9] = "Public";
      BaseDirectory2[BaseDirectory2["Video"] = 10] = "Video";
      BaseDirectory2[BaseDirectory2["Resource"] = 11] = "Resource";
      BaseDirectory2[BaseDirectory2["Temp"] = 12] = "Temp";
      BaseDirectory2[BaseDirectory2["AppConfig"] = 13] = "AppConfig";
      BaseDirectory2[BaseDirectory2["AppData"] = 14] = "AppData";
      BaseDirectory2[BaseDirectory2["AppLocalData"] = 15] = "AppLocalData";
      BaseDirectory2[BaseDirectory2["AppCache"] = 16] = "AppCache";
      BaseDirectory2[BaseDirectory2["AppLog"] = 17] = "AppLog";
      BaseDirectory2[BaseDirectory2["Desktop"] = 18] = "Desktop";
      BaseDirectory2[BaseDirectory2["Executable"] = 19] = "Executable";
      BaseDirectory2[BaseDirectory2["Font"] = 20] = "Font";
      BaseDirectory2[BaseDirectory2["Home"] = 21] = "Home";
      BaseDirectory2[BaseDirectory2["Runtime"] = 22] = "Runtime";
      BaseDirectory2[BaseDirectory2["Template"] = 23] = "Template";
    })(BaseDirectory || (BaseDirectory = {}));
  }
});

// node_modules/@tauri-apps/plugin-fs/dist-js/index.js
var dist_js_exports2 = {};
__export(dist_js_exports2, {
  BaseDirectory: () => BaseDirectory,
  FileHandle: () => FileHandle,
  SeekMode: () => SeekMode,
  copyFile: () => copyFile,
  create: () => create2,
  exists: () => exists,
  lstat: () => lstat,
  mkdir: () => mkdir,
  open: () => open2,
  readDir: () => readDir,
  readFile: () => readFile,
  readTextFile: () => readTextFile,
  readTextFileLines: () => readTextFileLines,
  remove: () => remove,
  rename: () => rename,
  size: () => size,
  startAccessingSecurityScopedResource: () => startAccessingSecurityScopedResource,
  stat: () => stat,
  stopAccessingSecurityScopedResource: () => stopAccessingSecurityScopedResource,
  truncate: () => truncate,
  watch: () => watch,
  watchImmediate: () => watchImmediate,
  writeFile: () => writeFile,
  writeTextFile: () => writeTextFile
});
function parseFileInfo(r) {
  return {
    isFile: r.isFile,
    isDirectory: r.isDirectory,
    isSymlink: r.isSymlink,
    size: r.size,
    mtime: r.mtime !== null ? new Date(r.mtime) : null,
    atime: r.atime !== null ? new Date(r.atime) : null,
    birthtime: r.birthtime !== null ? new Date(r.birthtime) : null,
    readonly: r.readonly,
    fileAttributes: r.fileAttributes,
    dev: r.dev,
    ino: r.ino,
    mode: r.mode,
    nlink: r.nlink,
    uid: r.uid,
    gid: r.gid,
    rdev: r.rdev,
    blksize: r.blksize,
    blocks: r.blocks
  };
}
function fromBytes(buffer2) {
  const bytes = new Uint8ClampedArray(buffer2);
  const size2 = bytes.byteLength;
  let x = 0;
  for (let i = 0; i < size2; i++) {
    const byte = bytes[i];
    x *= 256;
    x += byte;
  }
  return x;
}
async function create2(path, options) {
  if (path instanceof URL && path.protocol !== "file:") {
    throw new TypeError("Must be a file URL.");
  }
  const rid = await invoke("plugin:fs|create", {
    path: path instanceof URL ? path.toString() : path,
    options
  });
  return new FileHandle(rid);
}
async function open2(path, options) {
  if (path instanceof URL && path.protocol !== "file:") {
    throw new TypeError("Must be a file URL.");
  }
  const rid = await invoke("plugin:fs|open", {
    path: path instanceof URL ? path.toString() : path,
    options
  });
  return new FileHandle(rid);
}
async function copyFile(fromPath, toPath, options) {
  if (fromPath instanceof URL && fromPath.protocol !== "file:" || toPath instanceof URL && toPath.protocol !== "file:") {
    throw new TypeError("Must be a file URL.");
  }
  await invoke("plugin:fs|copy_file", {
    fromPath: fromPath instanceof URL ? fromPath.toString() : fromPath,
    toPath: toPath instanceof URL ? toPath.toString() : toPath,
    options
  });
}
async function mkdir(path, options) {
  if (path instanceof URL && path.protocol !== "file:") {
    throw new TypeError("Must be a file URL.");
  }
  await invoke("plugin:fs|mkdir", {
    path: path instanceof URL ? path.toString() : path,
    options
  });
}
async function readDir(path, options) {
  if (path instanceof URL && path.protocol !== "file:") {
    throw new TypeError("Must be a file URL.");
  }
  return await invoke("plugin:fs|read_dir", {
    path: path instanceof URL ? path.toString() : path,
    options
  });
}
async function readFile(path, options) {
  if (path instanceof URL && path.protocol !== "file:") {
    throw new TypeError("Must be a file URL.");
  }
  const arr = await invoke("plugin:fs|read_file", {
    path: path instanceof URL ? path.toString() : path,
    options
  });
  return arr instanceof ArrayBuffer ? new Uint8Array(arr) : Uint8Array.from(arr);
}
async function readTextFile(path, options) {
  if (path instanceof URL && path.protocol !== "file:") {
    throw new TypeError("Must be a file URL.");
  }
  const arr = await invoke("plugin:fs|read_text_file", {
    path: path instanceof URL ? path.toString() : path,
    options
  });
  const bytes = arr instanceof ArrayBuffer ? arr : Uint8Array.from(arr);
  return new TextDecoder(options?.encoding ?? "utf-8").decode(bytes);
}
async function readTextFileLines(path, options) {
  if (path instanceof URL && path.protocol !== "file:") {
    throw new TypeError("Must be a file URL.");
  }
  const pathStr = path instanceof URL ? path.toString() : path;
  return await Promise.resolve({
    path: pathStr,
    rid: null,
    async next() {
      const decoder = new TextDecoder(options?.encoding ?? "utf-8");
      if (this.rid === null) {
        const encoding = decoder.encoding;
        this.rid = await invoke("plugin:fs|read_text_file_lines", {
          path: pathStr,
          options: options != null ? { ...options, encoding } : void 0
        });
      }
      const arr = await invoke("plugin:fs|read_text_file_lines_next", { rid: this.rid });
      const bytes = arr instanceof ArrayBuffer ? new Uint8Array(arr) : Uint8Array.from(arr);
      const done = bytes[bytes.byteLength - 1] === 1;
      if (done) {
        this.rid = null;
        return { value: null, done };
      }
      const line = decoder.decode(bytes.slice(0, bytes.byteLength - 1));
      return {
        value: line,
        done
      };
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  });
}
async function remove(path, options) {
  if (path instanceof URL && path.protocol !== "file:") {
    throw new TypeError("Must be a file URL.");
  }
  await invoke("plugin:fs|remove", {
    path: path instanceof URL ? path.toString() : path,
    options
  });
}
async function rename(oldPath, newPath, options) {
  if (oldPath instanceof URL && oldPath.protocol !== "file:" || newPath instanceof URL && newPath.protocol !== "file:") {
    throw new TypeError("Must be a file URL.");
  }
  await invoke("plugin:fs|rename", {
    oldPath: oldPath instanceof URL ? oldPath.toString() : oldPath,
    newPath: newPath instanceof URL ? newPath.toString() : newPath,
    options
  });
}
async function stat(path, options) {
  const res = await invoke("plugin:fs|stat", {
    path: path instanceof URL ? path.toString() : path,
    options
  });
  return parseFileInfo(res);
}
async function lstat(path, options) {
  const res = await invoke("plugin:fs|lstat", {
    path: path instanceof URL ? path.toString() : path,
    options
  });
  return parseFileInfo(res);
}
async function truncate(path, len, options) {
  if (path instanceof URL && path.protocol !== "file:") {
    throw new TypeError("Must be a file URL.");
  }
  await invoke("plugin:fs|truncate", {
    path: path instanceof URL ? path.toString() : path,
    len,
    options
  });
}
async function writeFile(path, data, options) {
  if (path instanceof URL && path.protocol !== "file:") {
    throw new TypeError("Must be a file URL.");
  }
  if (data instanceof ReadableStream) {
    const file = await open2(path, {
      read: false,
      create: true,
      write: true,
      ...options
    });
    const reader = data.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done)
          break;
        await file.write(value);
      }
    } finally {
      reader.releaseLock();
      await file.close();
    }
  } else {
    await invoke("plugin:fs|write_file", data, {
      headers: {
        path: encodeURIComponent(path instanceof URL ? path.toString() : path),
        options: JSON.stringify(options)
      }
    });
  }
}
async function writeTextFile(path, data, options) {
  if (path instanceof URL && path.protocol !== "file:") {
    throw new TypeError("Must be a file URL.");
  }
  const encoder = new TextEncoder();
  await invoke("plugin:fs|write_text_file", encoder.encode(data), {
    headers: {
      path: encodeURIComponent(path instanceof URL ? path.toString() : path),
      options: JSON.stringify(options)
    }
  });
}
async function exists(path, options) {
  if (path instanceof URL && path.protocol !== "file:") {
    throw new TypeError("Must be a file URL.");
  }
  return await invoke("plugin:fs|exists", {
    path: path instanceof URL ? path.toString() : path,
    options
  });
}
async function watchInternal(paths, cb, options) {
  const watchPaths = Array.isArray(paths) ? paths : [paths];
  for (const path of watchPaths) {
    if (path instanceof URL && path.protocol !== "file:") {
      throw new TypeError("Must be a file URL.");
    }
  }
  const onEvent = new Channel();
  onEvent.onmessage = cb;
  const rid = await invoke("plugin:fs|watch", {
    paths: watchPaths.map((p) => p instanceof URL ? p.toString() : p),
    options,
    onEvent
  });
  const watcher = new Watcher(rid);
  return () => {
    void watcher.close();
  };
}
async function watch(paths, cb, options) {
  return await watchInternal(paths, cb, {
    delayMs: 2e3,
    ...options
  });
}
async function watchImmediate(paths, cb, options) {
  return await watchInternal(paths, cb, {
    ...options,
    delayMs: void 0
  });
}
async function size(path) {
  if (path instanceof URL && path.protocol !== "file:") {
    throw new TypeError("Must be a file URL.");
  }
  return await invoke("plugin:fs|size", {
    path: path instanceof URL ? path.toString() : path
  });
}
async function startAccessingSecurityScopedResource(path) {
  if (path instanceof URL && path.protocol !== "file:") {
    throw new TypeError("Must be a file URL.");
  }
  await invoke("plugin:fs|start_accessing_security_scoped_resource", {
    path: path instanceof URL ? path.toString() : path
  });
}
async function stopAccessingSecurityScopedResource(path) {
  if (path instanceof URL && path.protocol !== "file:") {
    throw new TypeError("Must be a file URL.");
  }
  await invoke("plugin:fs|stop_accessing_security_scoped_resource", {
    path: path instanceof URL ? path.toString() : path
  });
}
var SeekMode, FileHandle, Watcher;
var init_dist_js2 = __esm({
  "node_modules/@tauri-apps/plugin-fs/dist-js/index.js"() {
    init_path();
    init_core();
    (function(SeekMode2) {
      SeekMode2[SeekMode2["Start"] = 0] = "Start";
      SeekMode2[SeekMode2["Current"] = 1] = "Current";
      SeekMode2[SeekMode2["End"] = 2] = "End";
    })(SeekMode || (SeekMode = {}));
    FileHandle = class extends Resource {
      /**
       * Reads up to `p.byteLength` bytes into `p`. It resolves to the number of
       * bytes read (`0` < `n` <= `p.byteLength`) and rejects if any error
       * encountered. Even if `read()` resolves to `n` < `p.byteLength`, it may
       * use all of `p` as scratch space during the call. If some data is
       * available but not `p.byteLength` bytes, `read()` conventionally resolves
       * to what is available instead of waiting for more.
       *
       * When `read()` encounters end-of-file condition, it resolves to EOF
       * (`null`).
       *
       * When `read()` encounters an error, it rejects with an error.
       *
       * Callers should always process the `n` > `0` bytes returned before
       * considering the EOF (`null`). Doing so correctly handles I/O errors that
       * happen after reading some bytes and also both of the allowed EOF
       * behaviors.
       *
       * @example
       * ```typescript
       * import { open, BaseDirectory } from "@tauri-apps/plugin-fs"
       * // if "$APPCONFIG/foo/bar.txt" contains the text "hello world":
       * const file = await open("foo/bar.txt", { baseDir: BaseDirectory.AppConfig });
       * const buf = new Uint8Array(100);
       * const numberOfBytesRead = await file.read(buf); // 11 bytes
       * const text = new TextDecoder().decode(buf);  // "hello world"
       * await file.close();
       * ```
       *
       * @since 2.0.0
       */
      async read(buffer2) {
        if (buffer2.byteLength === 0) {
          return 0;
        }
        const data = await invoke("plugin:fs|read", {
          rid: this.rid,
          len: buffer2.byteLength
        });
        const nread = fromBytes(data.slice(-8));
        const bytes = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
        buffer2.set(bytes.slice(0, bytes.length - 8));
        return nread === 0 ? null : nread;
      }
      /**
       * Seek sets the offset for the next `read()` or `write()` to offset,
       * interpreted according to `whence`: `Start` means relative to the
       * start of the file, `Current` means relative to the current offset,
       * and `End` means relative to the end. Seek resolves to the new offset
       * relative to the start of the file.
       *
       * Seeking to an offset before the start of the file is an error. Seeking to
       * any positive offset is legal, but the behavior of subsequent I/O
       * operations on the underlying object is implementation-dependent.
       * It returns the number of cursor position.
       *
       * @example
       * ```typescript
       * import { open, SeekMode, BaseDirectory } from '@tauri-apps/plugin-fs';
       *
       * // Given hello.txt pointing to file with "Hello world", which is 11 bytes long:
       * const file = await open('hello.txt', { read: true, write: true, truncate: true, create: true, baseDir: BaseDirectory.AppLocalData });
       * await file.write(new TextEncoder().encode("Hello world"));
       *
       * // Seek 6 bytes from the start of the file
       * console.log(await file.seek(6, SeekMode.Start)); // "6"
       * // Seek 2 more bytes from the current position
       * console.log(await file.seek(2, SeekMode.Current)); // "8"
       * // Seek backwards 2 bytes from the end of the file
       * console.log(await file.seek(-2, SeekMode.End)); // "9" (e.g. 11-2)
       *
       * await file.close();
       * ```
       *
       * @since 2.0.0
       */
      async seek(offset, whence) {
        return await invoke("plugin:fs|seek", {
          rid: this.rid,
          offset,
          whence
        });
      }
      /**
       * Returns a {@linkcode FileInfo } for this file.
       *
       * @example
       * ```typescript
       * import { open, BaseDirectory } from '@tauri-apps/plugin-fs';
       * const file = await open("file.txt", { read: true, baseDir: BaseDirectory.AppLocalData });
       * const fileInfo = await file.stat();
       * console.log(fileInfo.isFile); // true
       * await file.close();
       * ```
       *
       * @since 2.0.0
       */
      async stat() {
        const res = await invoke("plugin:fs|fstat", {
          rid: this.rid
        });
        return parseFileInfo(res);
      }
      /**
       * Truncates or extends this file, to reach the specified `len`.
       * If `len` is not specified then the entire file contents are truncated.
       *
       * @example
       * ```typescript
       * import { open, BaseDirectory } from '@tauri-apps/plugin-fs';
       *
       * // truncate the entire file
       * const file = await open("my_file.txt", { read: true, write: true, create: true, baseDir: BaseDirectory.AppLocalData });
       * await file.truncate();
       *
       * // truncate part of the file
       * const file = await open("my_file.txt", { read: true, write: true, create: true, baseDir: BaseDirectory.AppLocalData });
       * await file.write(new TextEncoder().encode("Hello World"));
       * await file.truncate(7);
       * const data = new Uint8Array(32);
       * await file.read(data);
       * console.log(new TextDecoder().decode(data)); // Hello W
       * await file.close();
       * ```
       *
       * @since 2.0.0
       */
      async truncate(len) {
        await invoke("plugin:fs|ftruncate", {
          rid: this.rid,
          len
        });
      }
      /**
       * Writes `data.byteLength` bytes from `data` to the underlying data stream. It
       * resolves to the number of bytes written from `data` (`0` <= `n` <=
       * `data.byteLength`) or reject with the error encountered that caused the
       * write to stop early. `write()` must reject with a non-null error if
       * would resolve to `n` < `data.byteLength`. `write()` must not modify the
       * slice data, even temporarily.
       *
       * @example
       * ```typescript
       * import { open, write, BaseDirectory } from '@tauri-apps/plugin-fs';
       * const encoder = new TextEncoder();
       * const data = encoder.encode("Hello world");
       * const file = await open("bar.txt", { write: true, baseDir: BaseDirectory.AppLocalData });
       * const bytesWritten = await file.write(data); // 11
       * await file.close();
       * ```
       *
       * @since 2.0.0
       */
      async write(data) {
        return await invoke("plugin:fs|write", {
          rid: this.rid,
          data
        });
      }
    };
    Watcher = class extends Resource {
    };
  }
});

// node_modules/zustand/esm/vanilla.mjs
var createStoreImpl = (createState) => {
  let state;
  const listeners2 = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners2.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners2.add(listener);
    return () => listeners2.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
var createStore = ((createState) => createState ? createStoreImpl(createState) : createStoreImpl);

// node_modules/zustand/esm/react.mjs
var import_react = __toESM(require_react(), 1);
var identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = import_react.default.useSyncExternalStore(
    api.subscribe,
    import_react.default.useCallback(() => selector(api.getState()), [api, selector]),
    import_react.default.useCallback(() => selector(api.getInitialState()), [api, selector])
  );
  import_react.default.useDebugValue(slice);
  return slice;
}
var createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
var create = ((createState) => createState ? createImpl(createState) : createImpl);

// node_modules/immer/dist/immer.mjs
var NOTHING = /* @__PURE__ */ Symbol.for("immer-nothing");
var DRAFTABLE = /* @__PURE__ */ Symbol.for("immer-draftable");
var DRAFT_STATE = /* @__PURE__ */ Symbol.for("immer-state");
var errors = process.env.NODE_ENV !== "production" ? [
  // All error codes, starting by 0:
  function(plugin) {
    return `The plugin for '${plugin}' has not been loaded into Immer. To enable the plugin, import and call \`enable${plugin}()\` when initializing your application.`;
  },
  function(thing) {
    return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${thing}'`;
  },
  "This object has been frozen and should not be mutated",
  function(data) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + data;
  },
  "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  "Immer forbids circular references",
  "The first or second argument to `produce` must be a function",
  "The third argument to `produce` must be a function or undefined",
  "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  "First argument to `finishDraft` must be a draft returned by `createDraft`",
  function(thing) {
    return `'current' expects a draft, got: ${thing}`;
  },
  "Object.defineProperty() cannot be used on an Immer draft",
  "Object.setPrototypeOf() cannot be used on an Immer draft",
  "Immer only supports deleting array indices",
  "Immer only supports setting array indices and the 'length' property",
  function(thing) {
    return `'original' expects a draft, got: ${thing}`;
  }
  // Note: if more errors are added, the errorOffset in Patches.ts should be increased
  // See Patches.ts for additional errors
] : [];
function die(error, ...args) {
  if (process.env.NODE_ENV !== "production") {
    const e = errors[error];
    const msg = isFunction(e) ? e.apply(null, args) : e;
    throw new Error(`[Immer] ${msg}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var O = Object;
var getPrototypeOf = O.getPrototypeOf;
var CONSTRUCTOR = "constructor";
var PROTOTYPE = "prototype";
var CONFIGURABLE = "configurable";
var ENUMERABLE = "enumerable";
var WRITABLE = "writable";
var VALUE = "value";
var isDraft = (value) => !!value && !!value[DRAFT_STATE];
function isDraftable(value) {
  if (!value)
    return false;
  return isPlainObject(value) || isArray(value) || !!value[DRAFTABLE] || !!value[CONSTRUCTOR]?.[DRAFTABLE] || isMap(value) || isSet(value);
}
var objectCtorString = O[PROTOTYPE][CONSTRUCTOR].toString();
var cachedCtorStrings = /* @__PURE__ */ new WeakMap();
function isPlainObject(value) {
  if (!value || !isObjectish(value))
    return false;
  const proto = getPrototypeOf(value);
  if (proto === null || proto === O[PROTOTYPE])
    return true;
  const Ctor = O.hasOwnProperty.call(proto, CONSTRUCTOR) && proto[CONSTRUCTOR];
  if (Ctor === Object)
    return true;
  if (!isFunction(Ctor))
    return false;
  let ctorString = cachedCtorStrings.get(Ctor);
  if (ctorString === void 0) {
    ctorString = Function.toString.call(Ctor);
    cachedCtorStrings.set(Ctor, ctorString);
  }
  return ctorString === objectCtorString;
}
function original(value) {
  if (!isDraft(value))
    die(15, value);
  return value[DRAFT_STATE].base_;
}
function each(obj, iter, strict = true) {
  if (getArchtype(obj) === 0) {
    const keys = strict ? Reflect.ownKeys(obj) : O.keys(obj);
    keys.forEach((key) => {
      iter(key, obj[key], obj);
    });
  } else {
    obj.forEach((entry, index) => iter(index, entry, obj));
  }
}
function getArchtype(thing) {
  const state = thing[DRAFT_STATE];
  return state ? state.type_ : isArray(thing) ? 1 : isMap(thing) ? 2 : isSet(thing) ? 3 : 0;
}
var has = (thing, prop, type = getArchtype(thing)) => type === 2 ? thing.has(prop) : O[PROTOTYPE].hasOwnProperty.call(thing, prop);
var get = (thing, prop, type = getArchtype(thing)) => (
  // @ts-ignore
  type === 2 ? thing.get(prop) : thing[prop]
);
var set = (thing, propOrOldValue, value, type = getArchtype(thing)) => {
  if (type === 2)
    thing.set(propOrOldValue, value);
  else if (type === 3) {
    thing.add(value);
  } else
    thing[propOrOldValue] = value;
};
function is(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
var isArray = Array.isArray;
var isMap = (target) => target instanceof Map;
var isSet = (target) => target instanceof Set;
var isObjectish = (target) => typeof target === "object";
var isFunction = (target) => typeof target === "function";
var isBoolean = (target) => typeof target === "boolean";
function isArrayIndex(value) {
  const n = +value;
  return Number.isInteger(n) && String(n) === value;
}
var getProxyDraft = (value) => {
  if (!isObjectish(value))
    return null;
  return value?.[DRAFT_STATE];
};
var latest = (state) => state.copy_ || state.base_;
var getValue = (value) => {
  const proxyDraft = getProxyDraft(value);
  return proxyDraft ? proxyDraft.copy_ ?? proxyDraft.base_ : value;
};
var getFinalValue = (state) => state.modified_ ? state.copy_ : state.base_;
function shallowCopy(base, strict) {
  if (isMap(base)) {
    return new Map(base);
  }
  if (isSet(base)) {
    return new Set(base);
  }
  if (isArray(base))
    return Array[PROTOTYPE].slice.call(base);
  const isPlain = isPlainObject(base);
  if (strict === true || strict === "class_only" && !isPlain) {
    const descriptors = O.getOwnPropertyDescriptors(base);
    delete descriptors[DRAFT_STATE];
    let keys = Reflect.ownKeys(descriptors);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const desc = descriptors[key];
      if (desc[WRITABLE] === false) {
        desc[WRITABLE] = true;
        desc[CONFIGURABLE] = true;
      }
      if (desc.get || desc.set)
        descriptors[key] = {
          [CONFIGURABLE]: true,
          [WRITABLE]: true,
          // could live with !!desc.set as well here...
          [ENUMERABLE]: desc[ENUMERABLE],
          [VALUE]: base[key]
        };
    }
    return O.create(getPrototypeOf(base), descriptors);
  } else {
    const proto = getPrototypeOf(base);
    if (proto !== null && isPlain) {
      return { ...base };
    }
    const obj = O.create(proto);
    return O.assign(obj, base);
  }
}
function freeze(obj, deep = false) {
  if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj))
    return obj;
  if (getArchtype(obj) > 1) {
    O.defineProperties(obj, {
      set: dontMutateMethodOverride,
      add: dontMutateMethodOverride,
      clear: dontMutateMethodOverride,
      delete: dontMutateMethodOverride
    });
  }
  O.freeze(obj);
  if (deep)
    each(
      obj,
      (_key, value) => {
        freeze(value, true);
      },
      false
    );
  return obj;
}
function dontMutateFrozenCollections() {
  die(2);
}
var dontMutateMethodOverride = {
  [VALUE]: dontMutateFrozenCollections
};
function isFrozen(obj) {
  if (obj === null || !isObjectish(obj))
    return true;
  return O.isFrozen(obj);
}
var PluginMapSet = "MapSet";
var PluginPatches = "Patches";
var PluginArrayMethods = "ArrayMethods";
var plugins = {};
function getPlugin(pluginKey) {
  const plugin = plugins[pluginKey];
  if (!plugin) {
    die(0, pluginKey);
  }
  return plugin;
}
var isPluginLoaded = (pluginKey) => !!plugins[pluginKey];
function loadPlugin(pluginKey, implementation) {
  if (!plugins[pluginKey])
    plugins[pluginKey] = implementation;
}
var currentScope;
var getCurrentScope = () => currentScope;
var createScope = (parent_, immer_) => ({
  drafts_: [],
  parent_,
  immer_,
  // Whenever the modified draft contains a draft from another scope, we
  // need to prevent auto-freezing so the unowned draft can be finalized.
  canAutoFreeze_: true,
  unfinalizedDrafts_: 0,
  handledSet_: /* @__PURE__ */ new Set(),
  processedForPatches_: /* @__PURE__ */ new Set(),
  mapSetPlugin_: isPluginLoaded(PluginMapSet) ? getPlugin(PluginMapSet) : void 0,
  arrayMethodsPlugin_: isPluginLoaded(PluginArrayMethods) ? getPlugin(PluginArrayMethods) : void 0
});
function usePatchesInScope(scope, patchListener) {
  if (patchListener) {
    scope.patchPlugin_ = getPlugin(PluginPatches);
    scope.patches_ = [];
    scope.inversePatches_ = [];
    scope.patchListener_ = patchListener;
  }
}
function revokeScope(scope) {
  leaveScope(scope);
  scope.drafts_.forEach(revokeDraft);
  scope.drafts_ = null;
}
function leaveScope(scope) {
  if (scope === currentScope) {
    currentScope = scope.parent_;
  }
}
var enterScope = (immer22) => currentScope = createScope(currentScope, immer22);
function revokeDraft(draft) {
  const state = draft[DRAFT_STATE];
  if (state.type_ === 0 || state.type_ === 1)
    state.revoke_();
  else
    state.revoked_ = true;
}
function processResult(result, scope) {
  scope.unfinalizedDrafts_ = scope.drafts_.length;
  const baseDraft = scope.drafts_[0];
  const isReplaced = result !== void 0 && result !== baseDraft;
  if (isReplaced) {
    if (baseDraft[DRAFT_STATE].modified_) {
      revokeScope(scope);
      die(4);
    }
    if (isDraftable(result)) {
      result = finalize(scope, result);
    }
    const { patchPlugin_ } = scope;
    if (patchPlugin_) {
      patchPlugin_.generateReplacementPatches_(
        baseDraft[DRAFT_STATE].base_,
        result,
        scope
      );
    }
  } else {
    result = finalize(scope, baseDraft);
  }
  maybeFreeze(scope, result, true);
  revokeScope(scope);
  if (scope.patches_) {
    scope.patchListener_(scope.patches_, scope.inversePatches_);
  }
  return result !== NOTHING ? result : void 0;
}
function finalize(rootScope, value) {
  if (isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  if (!state) {
    const finalValue = handleValue(value, rootScope.handledSet_, rootScope);
    return finalValue;
  }
  if (!isSameScope(state, rootScope)) {
    return value;
  }
  if (!state.modified_) {
    return state.base_;
  }
  if (!state.finalized_) {
    const { callbacks_ } = state;
    if (callbacks_) {
      while (callbacks_.length > 0) {
        const callback = callbacks_.pop();
        callback(rootScope);
      }
    }
    generatePatchesAndFinalize(state, rootScope);
  }
  return state.copy_;
}
function maybeFreeze(scope, value, deep = false) {
  if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
    freeze(value, deep);
  }
}
function markStateFinalized(state) {
  state.finalized_ = true;
  state.scope_.unfinalizedDrafts_--;
}
var isSameScope = (state, rootScope) => state.scope_ === rootScope;
var EMPTY_LOCATIONS_RESULT = [];
function updateDraftInParent(parent, draftValue, finalizedValue, originalKey) {
  const parentCopy = latest(parent);
  const parentType = parent.type_;
  if (originalKey !== void 0) {
    const currentValue = get(parentCopy, originalKey, parentType);
    if (currentValue === draftValue) {
      set(parentCopy, originalKey, finalizedValue, parentType);
      return;
    }
  }
  if (!parent.draftLocations_) {
    const draftLocations = parent.draftLocations_ = /* @__PURE__ */ new Map();
    each(parentCopy, (key, value) => {
      if (isDraft(value)) {
        const keys = draftLocations.get(value) || [];
        keys.push(key);
        draftLocations.set(value, keys);
      }
    });
  }
  const locations = parent.draftLocations_.get(draftValue) ?? EMPTY_LOCATIONS_RESULT;
  for (const location of locations) {
    set(parentCopy, location, finalizedValue, parentType);
  }
}
function registerChildFinalizationCallback(parent, child, key) {
  parent.callbacks_.push(function childCleanup(rootScope) {
    const state = child;
    if (!state || !isSameScope(state, rootScope)) {
      return;
    }
    rootScope.mapSetPlugin_?.fixSetContents(state);
    const finalizedValue = getFinalValue(state);
    updateDraftInParent(parent, state.draft_ ?? state, finalizedValue, key);
    generatePatchesAndFinalize(state, rootScope);
  });
}
function generatePatchesAndFinalize(state, rootScope) {
  const shouldFinalize = state.modified_ && !state.finalized_ && (state.type_ === 3 || state.type_ === 1 && state.allIndicesReassigned_ || (state.assigned_?.size ?? 0) > 0);
  if (shouldFinalize) {
    const { patchPlugin_ } = rootScope;
    if (patchPlugin_) {
      const basePath = patchPlugin_.getPath(state);
      if (basePath) {
        patchPlugin_.generatePatches_(state, basePath, rootScope);
      }
    }
    markStateFinalized(state);
  }
}
function handleCrossReference(target, key, value) {
  const { scope_ } = target;
  if (isDraft(value)) {
    const state = value[DRAFT_STATE];
    if (isSameScope(state, scope_)) {
      state.callbacks_.push(function crossReferenceCleanup() {
        prepareCopy(target);
        const finalizedValue = getFinalValue(state);
        updateDraftInParent(target, value, finalizedValue, key);
      });
    }
  } else if (isDraftable(value)) {
    target.callbacks_.push(function nestedDraftCleanup() {
      const targetCopy = latest(target);
      if (target.type_ === 3) {
        if (targetCopy.has(value)) {
          handleValue(value, scope_.handledSet_, scope_);
        }
      } else {
        if (get(targetCopy, key, target.type_) === value) {
          if (scope_.drafts_.length > 1 && (target.assigned_.get(key) ?? false) === true && target.copy_) {
            handleValue(
              get(target.copy_, key, target.type_),
              scope_.handledSet_,
              scope_
            );
          }
        }
      }
    });
  }
}
function handleValue(target, handledSet, rootScope) {
  if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
    return target;
  }
  if (isDraft(target) || handledSet.has(target) || !isDraftable(target) || isFrozen(target)) {
    return target;
  }
  handledSet.add(target);
  each(target, (key, value) => {
    if (isDraft(value)) {
      const state = value[DRAFT_STATE];
      if (isSameScope(state, rootScope)) {
        const updatedValue = getFinalValue(state);
        set(target, key, updatedValue, target.type_);
        markStateFinalized(state);
      }
    } else if (isDraftable(value)) {
      handleValue(value, handledSet, rootScope);
    }
  });
  return target;
}
function createProxyProxy(base, parent) {
  const baseIsArray = isArray(base);
  const state = {
    type_: baseIsArray ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: parent ? parent.scope_ : getCurrentScope(),
    // True for both shallow and deep changes.
    modified_: false,
    // Used during finalization.
    finalized_: false,
    // Track which properties have been assigned (true) or deleted (false).
    // actually instantiated in `prepareCopy()`
    assigned_: void 0,
    // The parent draft state.
    parent_: parent,
    // The base state.
    base_: base,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: false,
    // `callbacks` actually gets assigned in `createProxy`
    callbacks_: void 0
  };
  let target = state;
  let traps = objectTraps;
  if (baseIsArray) {
    target = [state];
    traps = arrayTraps;
  }
  const { revoke, proxy } = Proxy.revocable(target, traps);
  state.draft_ = proxy;
  state.revoke_ = revoke;
  return [proxy, state];
}
var objectTraps = {
  get(state, prop) {
    if (prop === DRAFT_STATE)
      return state;
    let arrayPlugin = state.scope_.arrayMethodsPlugin_;
    const isArrayWithStringProp = state.type_ === 1 && typeof prop === "string";
    if (isArrayWithStringProp) {
      if (arrayPlugin?.isArrayOperationMethod(prop)) {
        return arrayPlugin.createMethodInterceptor(state, prop);
      }
    }
    const source = latest(state);
    if (!has(source, prop, state.type_)) {
      return readPropFromProto(state, source, prop);
    }
    const value = source[prop];
    if (state.finalized_ || !isDraftable(value)) {
      return value;
    }
    if (isArrayWithStringProp && state.operationMethod && arrayPlugin?.isMutatingArrayMethod(
      state.operationMethod
    ) && isArrayIndex(prop)) {
      return value;
    }
    if (value === peek(state.base_, prop)) {
      prepareCopy(state);
      const childKey = state.type_ === 1 ? +prop : prop;
      const childDraft = createProxy(state.scope_, value, state, childKey);
      return state.copy_[childKey] = childDraft;
    }
    return value;
  },
  has(state, prop) {
    return prop in latest(state);
  },
  ownKeys(state) {
    return Reflect.ownKeys(latest(state));
  },
  set(state, prop, value) {
    const desc = getDescriptorFromProto(latest(state), prop);
    if (desc?.set) {
      desc.set.call(state.draft_, value);
      return true;
    }
    if (!state.modified_) {
      const current2 = peek(latest(state), prop);
      const currentState = current2?.[DRAFT_STATE];
      if (currentState && currentState.base_ === value) {
        state.copy_[prop] = value;
        state.assigned_.set(prop, false);
        return true;
      }
      if (is(value, current2) && (value !== void 0 || has(state.base_, prop, state.type_)))
        return true;
      prepareCopy(state);
      markChanged(state);
    }
    if (state.copy_[prop] === value && // special case: handle new props with value 'undefined'
    (value !== void 0 || prop in state.copy_) || // special case: NaN
    Number.isNaN(value) && Number.isNaN(state.copy_[prop]))
      return true;
    state.copy_[prop] = value;
    state.assigned_.set(prop, true);
    handleCrossReference(state, prop, value);
    return true;
  },
  deleteProperty(state, prop) {
    prepareCopy(state);
    if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
      state.assigned_.set(prop, false);
      markChanged(state);
    } else {
      state.assigned_.delete(prop);
    }
    if (state.copy_) {
      delete state.copy_[prop];
    }
    return true;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(state, prop) {
    const owner = latest(state);
    const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
    if (!desc)
      return desc;
    return {
      [WRITABLE]: true,
      [CONFIGURABLE]: state.type_ !== 1 || prop !== "length",
      [ENUMERABLE]: desc[ENUMERABLE],
      [VALUE]: owner[prop]
    };
  },
  defineProperty() {
    die(11);
  },
  getPrototypeOf(state) {
    return getPrototypeOf(state.base_);
  },
  setPrototypeOf() {
    die(12);
  }
};
var arrayTraps = {};
for (let key in objectTraps) {
  let fn = objectTraps[key];
  arrayTraps[key] = function() {
    const args = arguments;
    args[0] = args[0][0];
    return fn.apply(this, args);
  };
}
arrayTraps.deleteProperty = function(state, prop) {
  if (process.env.NODE_ENV !== "production" && isNaN(parseInt(prop)))
    die(13);
  return arrayTraps.set.call(this, state, prop, void 0);
};
arrayTraps.set = function(state, prop, value) {
  if (process.env.NODE_ENV !== "production" && prop !== "length" && isNaN(parseInt(prop)))
    die(14);
  return objectTraps.set.call(this, state[0], prop, value, state[0]);
};
function peek(draft, prop) {
  const state = draft[DRAFT_STATE];
  const source = state ? latest(state) : draft;
  return source[prop];
}
function readPropFromProto(state, source, prop) {
  const desc = getDescriptorFromProto(source, prop);
  return desc ? VALUE in desc ? desc[VALUE] : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    desc.get?.call(state.draft_)
  ) : void 0;
}
function getDescriptorFromProto(source, prop) {
  if (!(prop in source))
    return void 0;
  let proto = getPrototypeOf(source);
  while (proto) {
    const desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (desc)
      return desc;
    proto = getPrototypeOf(proto);
  }
  return void 0;
}
function markChanged(state) {
  if (!state.modified_) {
    state.modified_ = true;
    if (state.parent_) {
      markChanged(state.parent_);
    }
  }
}
function prepareCopy(state) {
  if (!state.copy_) {
    state.assigned_ = /* @__PURE__ */ new Map();
    state.copy_ = shallowCopy(
      state.base_,
      state.scope_.immer_.useStrictShallowCopy_
    );
  }
}
var Immer2 = class {
  constructor(config) {
    this.autoFreeze_ = true;
    this.useStrictShallowCopy_ = false;
    this.useStrictIteration_ = false;
    this.produce = (base, recipe, patchListener) => {
      if (isFunction(base) && !isFunction(recipe)) {
        const defaultBase = recipe;
        recipe = base;
        const self = this;
        return function curriedProduce(base2 = defaultBase, ...args) {
          return self.produce(base2, (draft) => recipe.call(this, draft, ...args));
        };
      }
      if (!isFunction(recipe))
        die(6);
      if (patchListener !== void 0 && !isFunction(patchListener))
        die(7);
      let result;
      if (isDraftable(base)) {
        const scope = enterScope(this);
        const proxy = createProxy(scope, base, void 0);
        let hasError = true;
        try {
          result = recipe(proxy);
          hasError = false;
        } finally {
          if (hasError)
            revokeScope(scope);
          else
            leaveScope(scope);
        }
        usePatchesInScope(scope, patchListener);
        return processResult(result, scope);
      } else if (!base || !isObjectish(base)) {
        result = recipe(base);
        if (result === void 0)
          result = base;
        if (result === NOTHING)
          result = void 0;
        if (this.autoFreeze_)
          freeze(result, true);
        if (patchListener) {
          const p = [];
          const ip = [];
          getPlugin(PluginPatches).generateReplacementPatches_(base, result, {
            patches_: p,
            inversePatches_: ip
          });
          patchListener(p, ip);
        }
        return result;
      } else
        die(1, base);
    };
    this.produceWithPatches = (base, recipe) => {
      if (isFunction(base)) {
        return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
      }
      let patches, inversePatches;
      const result = this.produce(base, recipe, (p, ip) => {
        patches = p;
        inversePatches = ip;
      });
      return [result, patches, inversePatches];
    };
    if (isBoolean(config?.autoFreeze))
      this.setAutoFreeze(config.autoFreeze);
    if (isBoolean(config?.useStrictShallowCopy))
      this.setUseStrictShallowCopy(config.useStrictShallowCopy);
    if (isBoolean(config?.useStrictIteration))
      this.setUseStrictIteration(config.useStrictIteration);
  }
  createDraft(base) {
    if (!isDraftable(base))
      die(8);
    if (isDraft(base))
      base = current(base);
    const scope = enterScope(this);
    const proxy = createProxy(scope, base, void 0);
    proxy[DRAFT_STATE].isManual_ = true;
    leaveScope(scope);
    return proxy;
  }
  finishDraft(draft, patchListener) {
    const state = draft && draft[DRAFT_STATE];
    if (!state || !state.isManual_)
      die(9);
    const { scope_: scope } = state;
    usePatchesInScope(scope, patchListener);
    return processResult(void 0, scope);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(value) {
    this.autoFreeze_ = value;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(value) {
    this.useStrictShallowCopy_ = value;
  }
  /**
   * Pass false to use faster iteration that skips non-enumerable properties
   * but still handles symbols for compatibility.
   *
   * By default, strict iteration is enabled (includes all own properties).
   */
  setUseStrictIteration(value) {
    this.useStrictIteration_ = value;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(base, patches) {
    let i;
    for (i = patches.length - 1; i >= 0; i--) {
      const patch = patches[i];
      if (patch.path.length === 0 && patch.op === "replace") {
        base = patch.value;
        break;
      }
    }
    if (i > -1) {
      patches = patches.slice(i + 1);
    }
    const applyPatchesImpl = getPlugin(PluginPatches).applyPatches_;
    if (isDraft(base)) {
      return applyPatchesImpl(base, patches);
    }
    return this.produce(
      base,
      (draft) => applyPatchesImpl(draft, patches)
    );
  }
};
function createProxy(rootScope, value, parent, key) {
  const [draft, state] = isMap(value) ? getPlugin(PluginMapSet).proxyMap_(value, parent) : isSet(value) ? getPlugin(PluginMapSet).proxySet_(value, parent) : createProxyProxy(value, parent);
  const scope = parent?.scope_ ?? getCurrentScope();
  scope.drafts_.push(draft);
  state.callbacks_ = parent?.callbacks_ ?? [];
  state.key_ = key;
  if (parent && key !== void 0) {
    registerChildFinalizationCallback(parent, state, key);
  } else {
    state.callbacks_.push(function rootDraftCleanup(rootScope2) {
      rootScope2.mapSetPlugin_?.fixSetContents(state);
      const { patchPlugin_ } = rootScope2;
      if (state.modified_ && patchPlugin_) {
        patchPlugin_.generatePatches_(state, [], rootScope2);
      }
    });
  }
  return draft;
}
function current(value) {
  if (!isDraft(value))
    die(10, value);
  return currentImpl(value);
}
function currentImpl(value) {
  if (!isDraftable(value) || isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  let copy;
  let strict = true;
  if (state) {
    if (!state.modified_)
      return state.base_;
    state.finalized_ = true;
    copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
    strict = state.scope_.immer_.shouldUseStrictIteration();
  } else {
    copy = shallowCopy(value, true);
  }
  each(
    copy,
    (key, childValue) => {
      set(copy, key, currentImpl(childValue));
    },
    strict
  );
  if (state) {
    state.finalized_ = false;
  }
  return copy;
}
function enableMapSet() {
  class DraftMap extends Map {
    constructor(target, parent) {
      super();
      this[DRAFT_STATE] = {
        type_: 2,
        parent_: parent,
        scope_: parent ? parent.scope_ : getCurrentScope(),
        modified_: false,
        finalized_: false,
        copy_: void 0,
        assigned_: void 0,
        base_: target,
        draft_: this,
        isManual_: false,
        revoked_: false,
        callbacks_: []
      };
    }
    get size() {
      return latest(this[DRAFT_STATE]).size;
    }
    has(key) {
      return latest(this[DRAFT_STATE]).has(key);
    }
    set(key, value) {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      if (!latest(state).has(key) || latest(state).get(key) !== value) {
        prepareMapCopy(state);
        markChanged(state);
        state.assigned_.set(key, true);
        state.copy_.set(key, value);
        state.assigned_.set(key, true);
        handleCrossReference(state, key, value);
      }
      return this;
    }
    delete(key) {
      if (!this.has(key)) {
        return false;
      }
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      prepareMapCopy(state);
      markChanged(state);
      if (state.base_.has(key)) {
        state.assigned_.set(key, false);
      } else {
        state.assigned_.delete(key);
      }
      state.copy_.delete(key);
      return true;
    }
    clear() {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      if (latest(state).size) {
        prepareMapCopy(state);
        markChanged(state);
        state.assigned_ = /* @__PURE__ */ new Map();
        each(state.base_, (key) => {
          state.assigned_.set(key, false);
        });
        state.copy_.clear();
      }
    }
    forEach(cb, thisArg) {
      const state = this[DRAFT_STATE];
      latest(state).forEach((_value, key, _map) => {
        cb.call(thisArg, this.get(key), key, this);
      });
    }
    get(key) {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      const value = latest(state).get(key);
      if (state.finalized_ || !isDraftable(value)) {
        return value;
      }
      if (value !== state.base_.get(key)) {
        return value;
      }
      const draft = createProxy(state.scope_, value, state, key);
      prepareMapCopy(state);
      state.copy_.set(key, draft);
      return draft;
    }
    keys() {
      return latest(this[DRAFT_STATE]).keys();
    }
    values() {
      const iterator = this.keys();
      return {
        [Symbol.iterator]: () => this.values(),
        next: () => {
          const r = iterator.next();
          if (r.done)
            return r;
          const value = this.get(r.value);
          return {
            done: false,
            value
          };
        }
      };
    }
    entries() {
      const iterator = this.keys();
      return {
        [Symbol.iterator]: () => this.entries(),
        next: () => {
          const r = iterator.next();
          if (r.done)
            return r;
          const value = this.get(r.value);
          return {
            done: false,
            value: [r.value, value]
          };
        }
      };
    }
    [(DRAFT_STATE, Symbol.iterator)]() {
      return this.entries();
    }
  }
  function proxyMap_(target, parent) {
    const map = new DraftMap(target, parent);
    return [map, map[DRAFT_STATE]];
  }
  function prepareMapCopy(state) {
    if (!state.copy_) {
      state.assigned_ = /* @__PURE__ */ new Map();
      state.copy_ = new Map(state.base_);
    }
  }
  class DraftSet extends Set {
    constructor(target, parent) {
      super();
      this[DRAFT_STATE] = {
        type_: 3,
        parent_: parent,
        scope_: parent ? parent.scope_ : getCurrentScope(),
        modified_: false,
        finalized_: false,
        copy_: void 0,
        base_: target,
        draft_: this,
        drafts_: /* @__PURE__ */ new Map(),
        revoked_: false,
        isManual_: false,
        assigned_: void 0,
        callbacks_: []
      };
    }
    get size() {
      return latest(this[DRAFT_STATE]).size;
    }
    has(value) {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      if (!state.copy_) {
        return state.base_.has(value);
      }
      if (state.copy_.has(value))
        return true;
      if (state.drafts_.has(value) && state.copy_.has(state.drafts_.get(value)))
        return true;
      return false;
    }
    add(value) {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      if (!this.has(value)) {
        prepareSetCopy(state);
        markChanged(state);
        state.copy_.add(value);
        handleCrossReference(state, value, value);
      }
      return this;
    }
    delete(value) {
      if (!this.has(value)) {
        return false;
      }
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      prepareSetCopy(state);
      markChanged(state);
      return state.copy_.delete(value) || (state.drafts_.has(value) ? state.copy_.delete(state.drafts_.get(value)) : (
        /* istanbul ignore next */
        false
      ));
    }
    clear() {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      if (latest(state).size) {
        prepareSetCopy(state);
        markChanged(state);
        state.copy_.clear();
      }
    }
    values() {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      prepareSetCopy(state);
      return state.copy_.values();
    }
    entries() {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      prepareSetCopy(state);
      return state.copy_.entries();
    }
    keys() {
      return this.values();
    }
    [(DRAFT_STATE, Symbol.iterator)]() {
      return this.values();
    }
    forEach(cb, thisArg) {
      const iterator = this.values();
      let result = iterator.next();
      while (!result.done) {
        cb.call(thisArg, result.value, result.value, this);
        result = iterator.next();
      }
    }
  }
  function proxySet_(target, parent) {
    const set2 = new DraftSet(target, parent);
    return [set2, set2[DRAFT_STATE]];
  }
  function prepareSetCopy(state) {
    if (!state.copy_) {
      state.copy_ = /* @__PURE__ */ new Set();
      state.base_.forEach((value) => {
        if (isDraftable(value)) {
          const draft = createProxy(state.scope_, value, state, value);
          state.drafts_.set(value, draft);
          state.copy_.add(draft);
        } else {
          state.copy_.add(value);
        }
      });
    }
  }
  function assertUnrevoked(state) {
    if (state.revoked_)
      die(3, JSON.stringify(latest(state)));
  }
  function fixSetContents(target) {
    if (target.type_ === 3 && target.copy_) {
      const copy = new Set(target.copy_);
      target.copy_.clear();
      copy.forEach((value) => {
        target.copy_.add(getValue(value));
      });
    }
  }
  loadPlugin(PluginMapSet, { proxyMap_, proxySet_, fixSetContents });
}
var immer = new Immer2();
var produce = immer.produce;

// node_modules/zustand/esm/middleware/immer.mjs
var immerImpl = (initializer) => (set2, get2, store) => {
  store.setState = (updater, replace, ...args) => {
    const nextState = typeof updater === "function" ? produce(updater) : updater;
    return set2(nextState, replace, ...args);
  };
  return initializer(store.setState, get2, store);
};
var immer2 = immerImpl;

// src/engine/calendar/holidays.ts
var utc = (y, month1, day) => new Date(Date.UTC(y, month1 - 1, day));
var iso = (d) => d.toISOString().slice(0, 10);
var addDays = (d, n) => new Date(d.getTime() + n * 864e5);
var dow = (d) => (d.getUTCDay() + 6) % 7 + 1;
var oneDay = (name, d) => ({ name, startDate: iso(d), endDate: iso(d) });
var range = (name, start, days) => ({ name, startDate: iso(start), endDate: iso(addDays(start, Math.max(1, days) - 1)) });
function easterSunday(y) {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g2 = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g2 + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = (h + l - 7 * m + 114) % 31 + 1;
  return new Date(Date.UTC(y, month - 1, day));
}
function nthWeekday(y, month1, weekday, nth) {
  if (nth === "last") {
    let d2 = utc(y, month1 + 1, 1);
    d2 = addDays(d2, -1);
    while (dow(d2) !== weekday) d2 = addDays(d2, -1);
    return d2;
  }
  let d = utc(y, month1, 1);
  while (dow(d) !== weekday) d = addDays(d, 1);
  return addDays(d, (nth - 1) * 7);
}
function weekdayBefore(y, month1, day, weekday) {
  let d = addDays(utc(y, month1, day), -1);
  while (dow(d) !== weekday) d = addDays(d, -1);
  return d;
}
function materialize(def, y) {
  const r = def.rule;
  switch (r.kind) {
    case "fixed": {
      let d = utc(y, r.month, r.day);
      if (r.substitute === "nl-kingsday") {
        if (dow(d) === 7) d = utc(y, 4, 26);
      } else if (r.substitute === "uk-monday") {
        if (dow(d) === 6) d = addDays(d, 2);
        else if (dow(d) === 7) d = addDays(d, 1);
      }
      return range(def.name, d, r.days ?? 1);
    }
    case "easter":
      return range(def.name, addDays(easterSunday(y), r.offset), r.days ?? 1);
    case "nth-weekday":
      return oneDay(def.name, nthWeekday(y, r.month, r.weekday, r.nth));
    case "weekday-before":
      return oneDay(def.name, weekdayBefore(y, r.month, r.day, r.weekday));
  }
}
function ukChristmasBoxing(y) {
  const cdow = dow(utc(y, 12, 25));
  let xmas = utc(y, 12, 25);
  let boxing = utc(y, 12, 26);
  if (cdow === 6) {
    xmas = utc(y, 12, 27);
    boxing = utc(y, 12, 28);
  } else if (cdow === 7) {
    xmas = utc(y, 12, 27);
    boxing = utc(y, 12, 26);
  } else if (cdow === 5) {
    boxing = utc(y, 12, 28);
  }
  return [oneDay("Christmas Day", xmas), oneDay("Boxing Day", boxing)];
}
function generateHolidays(set2, region, fromYear, toYear) {
  const out = [];
  for (let y = fromYear; y <= toYear; y++) {
    for (const def of set2.defs) {
      if (def.regions && def.regions.length > 0) {
        if (!region || !def.regions.includes(region)) continue;
      }
      if (def.lustrumOnly && y % 5 !== 0) continue;
      const h = materialize(def, y);
      if (h) out.push(h);
    }
    if (set2.country === "UK") out.push(...ukChristmasBoxing(y));
  }
  return out;
}
var NL_SET = {
  country: "NL",
  defs: [
    { id: "nl-nieuwjaar", name: "Nieuwjaar", rule: { kind: "fixed", month: 1, day: 1 } },
    { id: "nl-goede-vrijdag", name: "Goede Vrijdag", rule: { kind: "easter", offset: -2 }, optional: true },
    { id: "nl-pasen", name: "Pasen", rule: { kind: "easter", offset: 0, days: 2 } },
    { id: "nl-koningsdag", name: "Koningsdag", rule: { kind: "fixed", month: 4, day: 27, substitute: "nl-kingsday" } },
    // Bevrijdingsdag: alleen in lustrumjaren algemeen erkend vrij; overige jaren opt-in in de UI.
    { id: "nl-bevrijdingsdag", name: "Bevrijdingsdag", rule: { kind: "fixed", month: 5, day: 5 }, lustrumOnly: true, optional: true },
    { id: "nl-hemelvaart", name: "Hemelvaart", rule: { kind: "easter", offset: 39 } },
    { id: "nl-pinksteren", name: "Pinksteren", rule: { kind: "easter", offset: 49, days: 2 } },
    { id: "nl-kerst", name: "Kerst", rule: { kind: "fixed", month: 12, day: 25, days: 2 } }
  ]
};

// src/utils/settingsStore.ts
function loadConstructionMode() {
  if (typeof localStorage === "undefined") return true;
  const raw = localStorage.getItem("ops-constructionMode");
  if (raw === null) return true;
  try {
    return JSON.parse(raw) !== false;
  } catch {
    return true;
  }
}
var MCP_DEFAULT_PORT = 3877;

// src/engine/calendar/defaultCalendar.ts
function createDefaultCalendar(anchorYear = (/* @__PURE__ */ new Date()).getFullYear()) {
  const from = anchorYear - 1;
  const to = anchorYear + 2;
  const construction = loadConstructionMode();
  return {
    id: "cal-default",
    name: construction ? "Bouwkalender NL" : "Standaardkalender",
    description: construction ? "Standaard bouwkalender: ma-vr 07:00-16:00" : "Standaardkalender: ma-vr 07:00-16:00",
    workDays: [1, 2, 3, 4, 5],
    // Monday to Friday
    workStartHour: 7,
    workEndHour: 16,
    hoursPerDay: 8,
    holidays: construction ? generateHolidays(NL_SET, void 0, from, to) : [],
    generation: construction ? { ruleSetId: "NL", generatedFromYear: from, generatedToYear: to } : void 0
  };
}

// src/utils/dateUtils.ts
function parseDate(iso2) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso2);
  if (m) return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  const d = new Date(iso2);
  if (isNaN(d.getTime())) return d;
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}
function formatDate(d) {
  return d.toISOString().split("T")[0];
}
function parseInstant(iso2) {
  if (iso2.includes("T")) {
    const hasTz = /(Z|[+-]\d{2}:?\d{2})$/.test(iso2);
    return new Date(hasTz ? iso2 : `${iso2}Z`);
  }
  return parseDate(iso2);
}
function formatInstant(d, mode) {
  return mode === "hour" ? d.toISOString().slice(0, 16) : formatDate(d);
}
function isoDayOfWeek(d) {
  const day = d.getUTCDay();
  return day === 0 ? 7 : day;
}
function diffCalendarDays(a, b) {
  const msPerDay = 864e5;
  return Math.round((b.getTime() - a.getTime()) / msPerDay);
}
function addCalendarDays(d, days) {
  const result = new Date(d.getTime());
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}
function diffDays(a, b) {
  return diffCalendarDays(parseDate(a), parseDate(b));
}
function getWeekNumber(d) {
  const target = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  target.setUTCDate(target.getUTCDate() + 3 - (target.getUTCDay() + 6) % 7);
  const jan4 = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
  return 1 + Math.round(((target.getTime() - jan4.getTime()) / 864e5 - 3 + (jan4.getUTCDay() + 6) % 7) / 7);
}
function addBusinessDays(start, workDays) {
  if (workDays <= 0 || isNaN(start.getTime())) return new Date(start.getTime());
  let current2 = new Date(start.getTime());
  let scan = 0;
  while (isoDayOfWeek(current2) > 5) {
    current2 = addCalendarDays(current2, 1);
    if (++scan > 366) break;
  }
  let remaining = workDays - 1;
  let steps = 0;
  while (remaining > 0) {
    current2 = addCalendarDays(current2, 1);
    if (isoDayOfWeek(current2) <= 5) remaining--;
    if (++steps > 2e5) break;
  }
  return current2;
}
function getWeekNumberFor(d, startDay = "monday") {
  if (startDay === "monday") return getWeekNumber(d);
  const target = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const jan1 = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const dayOfYear = Math.floor((target.getTime() - jan1.getTime()) / 864e5);
  return Math.floor((dayOfYear + jan1.getUTCDay()) / 7) + 1;
}

// src/utils/taskDefaults.ts
function createDefaultTaskTime(start, durationDays) {
  const startDate = parseDate(start);
  const finish = durationDays > 0 && !isNaN(startDate.getTime()) ? formatDate(addBusinessDays(startDate, durationDays)) : start;
  return {
    durationType: "WORKTIME",
    scheduleDuration: durationDays,
    scheduleStart: start,
    scheduleFinish: finish,
    earlyStart: start,
    earlyFinish: finish,
    lateStart: start,
    lateFinish: finish,
    freeFloat: 0,
    totalFloat: 0,
    isCritical: false,
    completion: 0
  };
}

// src/utils/id.ts
var counter = 0;
function generateId(prefix = "") {
  counter++;
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 6);
  return prefix ? `${prefix}-${ts}${rand}${counter}` : `${ts}${rand}${counter}`;
}

// src/utils/wbs.ts
function flattenOrder(tasks) {
  const out = [];
  const seen = /* @__PURE__ */ new Set();
  const childrenByParent = /* @__PURE__ */ new Map();
  for (const t of tasks) {
    if (t.parentId != null) {
      const list = childrenByParent.get(t.parentId);
      if (list) list.push(t);
      else childrenByParent.set(t.parentId, [t]);
    }
  }
  const addRecursive = (task) => {
    if (seen.has(task.id)) return;
    seen.add(task.id);
    out.push(task);
    const kids = childrenByParent.get(task.id);
    if (kids) {
      for (const child of kids) addRecursive(child);
    }
  };
  for (const root of tasks) {
    if (!root.parentId) addRecursive(root);
  }
  for (const task of tasks) {
    if (!seen.has(task.id)) addRecursive(task);
  }
  return out;
}
function deriveWbsCodes(tasks) {
  const codes = /* @__PURE__ */ new Map();
  const childCount = /* @__PURE__ */ new Map();
  for (const task of flattenOrder(tasks)) {
    const parentCode = task.parentId ? codes.get(task.parentId) : void 0;
    const siblingKey = parentCode !== void 0 ? task.parentId : null;
    const n = (childCount.get(siblingKey) ?? 0) + 1;
    childCount.set(siblingKey, n);
    codes.set(task.id, parentCode !== void 0 ? `${parentCode}.${n}` : String(n));
  }
  return codes;
}
function applyWbsNumbering(tasks) {
  const codes = deriveWbsCodes(tasks);
  for (const task of tasks) {
    const code = codes.get(task.id);
    if (code !== void 0) task.wbsCode = code;
  }
}

// src/engine/scheduler/CalendarEngine.ts
var bandCacheRegistry = /* @__PURE__ */ new WeakMap();
var CalendarEngine = class _CalendarEngine {
  calendar;
  holidaySet;
  // ── Numerieke afgeleide structuren (pakket A1/A2, gedragsneutraal) ─────────────
  // Vervangen de string/dag-voor-dag-hotpaths in isWorkDay/workDaysBetween door
  // O(1)- resp. O(1+#holidays·log)-arithmetiek. NAAST de bestaande string-structuren:
  // de uur-modus (bandsStartingOn/isHoliday) blijft byte-identiek op holidaySet leunen.
  workDayMask;
  // index 1..7 (ISO-weekdag) ⇒ is-werkdag
  workDaysPerWeek;
  // som van true in workDayMask[1..7]
  holidayDaySet;
  // UTC-dagindices van alle holiday-dagen
  holidayWorkdayIdxSorted;
  // holiday-dagindices OP een werk-weekdag, oplopend
  // Veiligheidsgrenzen tegen vastlopen bij een kapotte kalender (geen werkdagen)
  // of een ongeldige/sentinel-datum: MAX_SCAN = max dagen zoeken naar een werkdag;
  // MAX_DAYS = absolute iteratielimiet (~547 jaar) voor de tel-lussen.
  static MAX_SCAN = 366;
  static MAX_DAYS = 2e5;
  // Uur-modus (fase 2.8b): absolute minuut-grens, analoog aan MAX_SCAN/MAX_DAYS. Een duur groter
  // dan dit wordt niet uitgeteld (een kapotte/sentinel-invoer mag de banden-lus niet laten hangen).
  static MAX_MINUTES = _CalendarEngine.MAX_DAYS * 24 * 60;
  static MS_PER_MIN = 6e4;
  static MS_PER_DAY = 864e5;
  // ── Fase 2.8b: uur-modus-state (dood in dag-modus) ─────────────────────────
  mode = "day";
  derivedHpd = 0;
  bandCache;
  constructor(calendar) {
    this.calendar = calendar;
    this.workDayMask = new Array(8).fill(false);
    for (const wd of this.calendar.workDays) this.workDayMask[wd] = true;
    this.workDaysPerWeek = 0;
    for (let wd = 1; wd <= 7; wd++) if (this.workDayMask[wd]) this.workDaysPerWeek++;
    this.holidaySet = /* @__PURE__ */ new Set();
    this.holidayDaySet = /* @__PURE__ */ new Set();
    this.buildHolidaySet();
    this.holidayWorkdayIdxSorted = [...this.holidayDaySet].filter((idx) => this.workDayMask[isoDayOfWeek(new Date(idx * _CalendarEngine.MS_PER_DAY))]).sort((a, b) => a - b);
    this.mode = calendar.workTime ? "hour" : "day";
    if (this.mode === "hour") {
      this.derivedHpd = this.computeDerivedHoursPerDay();
      let cache = bandCacheRegistry.get(calendar);
      if (!cache) {
        cache = { days: /* @__PURE__ */ new Map(), fills: 0 };
        bandCacheRegistry.set(calendar, cache);
      }
      this.bandCache = cache;
    }
  }
  buildHolidaySet() {
    for (const holiday of this.calendar.holidays) {
      const start = parseDate(holiday.startDate);
      const end = parseDate(holiday.endDate);
      const days = diffCalendarDays(start, end);
      for (let i = 0; i <= days; i++) {
        const d = addCalendarDays(start, i);
        this.holidaySet.add(formatDate(d));
        this.holidayDaySet.add(Math.floor(d.getTime() / _CalendarEngine.MS_PER_DAY));
      }
    }
  }
  /** Heeft de kalender überhaupt werkdagen? Een lege werkweek levert anders stil onzin-datums. */
  hasWorkingDays() {
    return Array.isArray(this.calendar.workDays) && this.calendar.workDays.length > 0;
  }
  /** Check if a given date is a working day.
   *  Pakket A1 (gedragsneutraal): numeriek i.p.v. `workDays.includes` + `formatDate`.
   *  `floor(ms/MS_PER_DAY)` = dezelfde UTC-dagindex als `formatDate` (epoch op UTC-middernacht).
   *  Ongeldige datum: `isoDayOfWeek`→NaN ⇒ `workDayMask[NaN]`=undefined ⇒ return false (identiek
   *  aan het oude `workDays.includes(NaN)===false`, dat óók vóór `formatDate` short-circuitte). */
  isWorkDay(date) {
    const dow2 = isoDayOfWeek(date);
    if (!this.workDayMask[dow2]) return false;
    const dayIdx = Math.floor(date.getTime() / _CalendarEngine.MS_PER_DAY);
    if (this.holidayDaySet.has(dayIdx)) return false;
    return true;
  }
  /** Check if a given date string is a holiday */
  isHoliday(dateStr) {
    return this.holidaySet.has(dateStr);
  }
  /**
   * Add working days to a start date.
   * Returns the end date (the last working day).
   * For duration=0 (milestone), returns the start date itself.
   *
   * Byte-identieke `Date`-retour: delegeert naar `addWorkDaysChecked` en pakt `.date` — zo houden alle
   * bestaande aanroepers (o.a. `useBarDrag`, de niet-taakdatum-CPM-plekken) exact dezelfde signatuur.
   */
  addWorkDays(startDate, workDays) {
    return this.addWorkDaysChecked(startDate, workDays).date;
  }
  /**
   * `addWorkDays` mét expliciet CAP-signaal (WP7 "Onwerkbaar-venster-detectie"). `capped: true` zodra
   * een van de twee veiligheidsgrenzen wordt geraakt — de MAX_SCAN-werkdag-zoek (een kalender die het
   * venster onwerkbaar maakt, bv. een aaneengesloten holiday-blok) óf de MAX_DAYS-tellimiet — waarna de
   * teruggegeven `Date` een gecapte (niet-betekenisvolle) datum is i.p.v. de echte laatste werkdag. De
   * datum-uitkomst is per pad IDENTIEK aan de oude `addWorkDays` (dezelfde `current` op elke return/break);
   * alleen het `capped`-veld is nieuw. De solver aggregeert dit tot een zachte `cappedTaskIds`-waarschuwing.
   */
  addWorkDaysChecked(startDate, workDays) {
    if (workDays <= 0) return { date: new Date(startDate.getTime()), capped: false };
    let current2 = new Date(startDate.getTime());
    let scan = 0;
    while (!this.isWorkDay(current2)) {
      current2 = addCalendarDays(current2, 1);
      if (++scan > _CalendarEngine.MAX_SCAN) return { date: current2, capped: true };
    }
    let remaining = workDays - 1;
    let steps = 0;
    while (remaining > 0) {
      current2 = addCalendarDays(current2, 1);
      if (this.isWorkDay(current2)) {
        remaining--;
      }
      if (++steps > _CalendarEngine.MAX_DAYS) return { date: current2, capped: true };
    }
    return { date: current2, capped: false };
  }
  /**
   * Calculate the number of working days between two dates (inclusive).
   *
   * Pakket A2 (gedragsneutraal, de O(n²)-killer): arithmetisch i.p.v. dag-voor-dag scannen.
   * Semantiek die exact wordt gerepliceerd t.o.v. de oude lus:
   *  - De oude lus checkte dagen k=0,1,… met dagindex `startIdx+k` zolang
   *    `startMs + k·MS_PER_DAY ≤ endMs` (elke +1 kalenderdag = +MS_PER_DAY in UTC, geen DST).
   *    Aantal dagen = `floor((endMs−startMs)/MS_PER_DAY)+1` als `endMs≥startMs`, anders 0.
   *  - CAP: de oude lus brak af zodra `steps > MAX_DAYS`; hij checkte dan de dagen k=0..MAX_DAYS
   *    (= MAX_DAYS+1 dagen) vóór hij stopte ⇒ `cappedDays = min(totalDays, MAX_DAYS+1)`.
   * Telling: #werk-weekdagen in het (gecapte) bereik − #(holidays op een werk-weekdag) daarin.
   */
  workDaysBetween(start, end) {
    const startMs = start.getTime();
    const endMs = end.getTime();
    if (!(endMs >= startMs)) return 0;
    const totalDays = Math.floor((endMs - startMs) / _CalendarEngine.MS_PER_DAY) + 1;
    const cappedDays = Math.min(totalDays, _CalendarEngine.MAX_DAYS + 1);
    const startIdx = Math.floor(startMs / _CalendarEngine.MS_PER_DAY);
    const lastIdx = startIdx + cappedDays - 1;
    return this.countWorkWeekdays(startIdx, lastIdx) - this.countHolidayWorkdaysInRange(startIdx, lastIdx);
  }
  /** #werk-weekdagen in het INCLUSIEVE dagindex-bereik [startIdx, lastIdx]. Volledige weken dragen
   *  elk `workDaysPerWeek` bij (elke weekdag komt precies één keer voor); de resterende dagen worden
   *  uitgeteld vanaf de weekdag van `startIdx` (consistent met de per-dag-check in de oude lus). */
  countWorkWeekdays(startIdx, lastIdx) {
    const L = lastIdx - startIdx + 1;
    if (L <= 0) return 0;
    const fullWeeks = Math.floor(L / 7);
    let count = fullWeeks * this.workDaysPerWeek;
    const rem = L - fullWeeks * 7;
    if (rem > 0) {
      let wd = isoDayOfWeek(new Date(startIdx * _CalendarEngine.MS_PER_DAY));
      for (let i = 0; i < rem; i++) {
        if (this.workDayMask[wd]) count++;
        wd = wd === 7 ? 1 : wd + 1;
      }
    }
    return count;
  }
  /** Aantal holiday-dagen ÓP een werk-weekdag in het inclusieve bereik [startIdx, lastIdx], via
   *  lower/upper-bound binary search over de oplopende `holidayWorkdayIdxSorted`. */
  countHolidayWorkdaysInRange(startIdx, lastIdx) {
    const a = this.holidayWorkdayIdxSorted;
    let lo = 0;
    let loHi = a.length;
    while (lo < loHi) {
      const mid = lo + loHi >>> 1;
      if (a[mid] < startIdx) lo = mid + 1;
      else loHi = mid;
    }
    let hi = 0;
    let hiHi = a.length;
    while (hi < hiHi) {
      const mid = hi + hiHi >>> 1;
      if (a[mid] <= lastIdx) hi = mid + 1;
      else hiHi = mid;
    }
    return hi - lo;
  }
  /**
   * Get the next working day on or after the given date.
   */
  nextWorkDay(date) {
    let current2 = new Date(date.getTime());
    let scan = 0;
    while (!this.isWorkDay(current2)) {
      current2 = addCalendarDays(current2, 1);
      if (++scan > _CalendarEngine.MAX_SCAN) return current2;
    }
    return current2;
  }
  /**
   * Get the next working day strictly after the given date.
   */
  nextWorkDayAfter(date) {
    let current2 = addCalendarDays(date, 1);
    let scan = 0;
    while (!this.isWorkDay(current2)) {
      current2 = addCalendarDays(current2, 1);
      if (++scan > _CalendarEngine.MAX_SCAN) return current2;
    }
    return current2;
  }
  /**
   * Eerste werkdag op of vóór de datum (spiegel van nextWorkDay). Gebruikt om een
   * kalenderdag-lag in de backward-pass richtingbewust op een werkdag te snappen:
   * een bovengrens ("niet later dan…") die op een weekend valt, hoort terug naar vrijdag.
   */
  prevWorkDay(date) {
    let current2 = new Date(date.getTime());
    let scan = 0;
    while (!this.isWorkDay(current2)) {
      current2 = addCalendarDays(current2, -1);
      if (++scan > _CalendarEngine.MAX_SCAN) return current2;
    }
    return current2;
  }
  /**
   * Get the next working day strictly before the given date.
   * Spiegel van nextWorkDayAfter — gebruikt door de backward-pass zodat de
   * "successor start de werkdag ná de predecessor"-relatie symmetrisch terugloopt.
   */
  prevWorkDayBefore(date) {
    let current2 = addCalendarDays(date, -1);
    let scan = 0;
    while (!this.isWorkDay(current2)) {
      current2 = addCalendarDays(current2, -1);
      if (++scan > _CalendarEngine.MAX_SCAN) return current2;
    }
    return current2;
  }
  /**
   * Subtract working days from an end date.
   * Returns the start date.
   */
  subtractWorkDays(endDate, workDays) {
    if (workDays <= 0) return new Date(endDate.getTime());
    let current2 = new Date(endDate.getTime());
    let scan = 0;
    while (!this.isWorkDay(current2)) {
      current2 = addCalendarDays(current2, -1);
      if (++scan > _CalendarEngine.MAX_SCAN) return current2;
    }
    let remaining = workDays - 1;
    let steps = 0;
    while (remaining > 0) {
      current2 = addCalendarDays(current2, -1);
      if (this.isWorkDay(current2)) {
        remaining--;
      }
      if (++steps > _CalendarEngine.MAX_DAYS) break;
    }
    return current2;
  }
  /**
   * Verschuif `n` werkdagen vanaf een datum: n=0 => dezelfde (werk)dag, n>0 vooruit, n<0 achteruit.
   * Anders dan addWorkDays/subtractWorkDays telt de begindag hier NIET als "dag 1" — dit is een
   * zuivere offset over werkdagen. Nodig voor correcte lag/lead (positief, negatief én 0) en voor
   * de relatie-logica (FF/SF) in de CPM-solver, waar "N werkdagen verderop/eerder" exact N moet zijn.
   *
   * INVARIANT: de aanroeper voert een wérkdag aan. Alle CPM-paden garanderen dat (early/late-datums
   * zijn altijd werkdagen); een kalenderdag-lag die op een weekend landt wordt op de gebruiksplek
   * eerst richtingbewust gesnapt (forward: nextWorkDay, backward: prevWorkDay) vóór hij hier
   * binnenkomt. Een niet-werkdag zou hier vooruit normaliseren, wat voor n<0 een dag zou schelen.
   */
  addWorkingDaysSigned(date, n) {
    let current2 = this.nextWorkDay(new Date(date.getTime()));
    if (n === 0) return current2;
    const step = n > 0 ? 1 : -1;
    let remaining = Math.abs(n);
    let guard = 0;
    while (remaining > 0) {
      current2 = addCalendarDays(current2, step);
      if (this.isWorkDay(current2)) remaining--;
      if (++guard > _CalendarEngine.MAX_DAYS) break;
    }
    return current2;
  }
  get hoursPerDay() {
    if (this.mode === "hour") return this.derivedHpd;
    return this.calendar.hoursPerDay;
  }
  // ═══════════════════════════════════════════════════════════════════════════
  //  Fase 2.8b — UUR-MODUS (§4). Alles hieronder is DOOD in dag-modus: geen enkele
  //  bestaande dag-lus hierboven roept iets van dit blok aan. De solver (golf 2)
  //  dispatcht per taak via `isHourMode` (§5.1). Conventies (§4.1):
  //    band = [start, end);  nextWorkInstant(t)=t als t∈[start,end);
  //    prevWorkInstant(t)=t als t∈(start,end];  strikte varianten met "After"/"Before".
  // ═══════════════════════════════════════════════════════════════════════════
  /** True ⇒ uur-kalender (`workTime` aanwezig). Vervult het `DurationCalendar`-contract (duration.ts). */
  get isHourMode() {
    return this.mode === "hour";
  }
  /** Afgeleide `hoursPerDay` voor een uur-kalender (§3.2, Bevinding 8): de MODALE band-som over de
   *  werk-weekdagen (meest voorkomende dagsom in uren), bij gelijkspel de HOOGSTE. */
  computeDerivedHoursPerDay() {
    const byWeekday = this.calendar.workTime.byWeekday;
    const sums = [];
    for (let wd = 1; wd <= 7; wd = wd + 1) {
      const bands = byWeekday[wd] ?? [];
      if (bands.length === 0) continue;
      const minutes = bands.reduce((s, b) => s + (b.end - b.start), 0);
      sums.push(minutes / 60);
    }
    if (sums.length === 0) return this.calendar.hoursPerDay;
    const freq = /* @__PURE__ */ new Map();
    for (const h of sums) freq.set(h, (freq.get(h) ?? 0) + 1);
    let best = sums[0];
    let bestCount = 0;
    for (const [h, c] of freq) {
      if (c > bestCount || c === bestCount && h > best) {
        best = h;
        bestCount = c;
      }
    }
    return best;
  }
  // ── Band-materialisatie (venster-gebaseerd, gememoized op het kalender-object, §4.2/§5.6) ──
  /** UTC-middernacht-ms van de dag die `ms` bevat (epoch is op UTC-middernacht uitgelijnd). */
  dayStartMsOf(ms) {
    return Math.floor(ms / _CalendarEngine.MS_PER_DAY) * _CalendarEngine.MS_PER_DAY;
  }
  /** Absolute werk-intervallen voor de banden die op de dag `dayMs` STARTEN (§4.2). Een holiday op
   *  díé dag onderdrukt uitsluitend de banden die er starten (Bevinding 9); de staart na middernacht
   *  van de wrap-band van de vórige dag hoort bij die vorige dag en loopt gewoon door (hij wordt bij
   *  díé dag gematerialiseerd). Gememoized op de gedeelde kalender-cache. */
  bandsStartingOn(dayMs) {
    const cache = this.bandCache;
    const hit = cache.days.get(dayMs);
    if (hit) return hit;
    cache.fills++;
    const d = new Date(dayMs);
    let result;
    if (this.holidaySet.has(formatDate(d))) {
      result = [];
    } else {
      const wd = isoDayOfWeek(d);
      const bands = this.calendar.workTime.byWeekday[wd] ?? [];
      result = bands.map((b) => ({
        start: dayMs + b.start * _CalendarEngine.MS_PER_MIN,
        end: dayMs + b.end * _CalendarEngine.MS_PER_MIN
      }));
    }
    cache.days.set(dayMs, result);
    return result;
  }
  /** De band die `tMs` bevat, of null. `leftOpen=false` ⇒ voorwaartse conventie `[start,end)`;
   *  `leftOpen=true` ⇒ achterwaartse conventie `(start,end]`. Scant de huidige dag plus twee dagen
   *  terug om de staart van een wrap-band (`end ∈ (1440,2880]`) op te vangen. */
  findContaining(tMs, leftOpen) {
    const day0 = this.dayStartMsOf(tMs);
    for (let k = -2; k <= 0; k++) {
      const dayMs = day0 + k * _CalendarEngine.MS_PER_DAY;
      for (const band of this.bandsStartingOn(dayMs)) {
        const inside = leftOpen ? band.start < tMs && tMs <= band.end : band.start <= tMs && tMs < band.end;
        if (inside) return band;
      }
    }
    return null;
  }
  /** Vroegste bandstart strikt > `tMs` (in ms). Dag-scan vooruit; banden zijn per dag gesorteerd en
   *  dag-starts lopen op, dus de eerste hit is globaal de kleinste. */
  nextBandStartStrictAfter(tMs) {
    let dayMs = this.dayStartMsOf(tMs);
    let scan = 0;
    while (scan <= _CalendarEngine.MAX_SCAN) {
      for (const band of this.bandsStartingOn(dayMs)) {
        if (band.start > tMs) return band.start;
      }
      dayMs += _CalendarEngine.MS_PER_DAY;
      scan++;
    }
    return tMs;
  }
  /** Laatste band-eind ≤ `tMs` (of strikt < bij `strict`), in ms. Dag-scan achteruit; stopt zodra
   *  geen eerdere dag het beste resultaat nog kan verbeteren (max mogelijke eind = dagstart+2880m). */
  prevBandEndBound(tMs, strict) {
    let best = Number.NEGATIVE_INFINITY;
    let dayMs = this.dayStartMsOf(tMs);
    let scan = 0;
    const span = 2880 * _CalendarEngine.MS_PER_MIN;
    while (scan <= _CalendarEngine.MAX_SCAN) {
      if (best !== Number.NEGATIVE_INFINITY && dayMs + span <= best) break;
      for (const band of this.bandsStartingOn(dayMs)) {
        const ok = strict ? band.end < tMs : band.end <= tMs;
        if (ok && band.end > best) best = band.end;
      }
      dayMs -= _CalendarEngine.MS_PER_DAY;
      scan++;
    }
    return best === Number.NEGATIVE_INFINITY ? tMs : best;
  }
  // ── Instant-vinders (§4.1) ─────────────────────────────────────────────────
  /** t valt binnen een band `[start,end)`. Uur-tegenhanger van `isWorkDay`. */
  isWorkInstant(t) {
    return this.findContaining(t.getTime(), false) !== null;
  }
  /** t als t ∈ `[bandstart, bandeind)`, anders de eerstvolgende bandstart > t (§4.1). */
  nextWorkInstant(t) {
    const tMs = t.getTime();
    if (this.findContaining(tMs, false)) return new Date(tMs);
    return new Date(this.nextBandStartStrictAfter(tMs));
  }
  /** De eerstvolgende bandstart STRIKT > t (bij band-eindgrens: de volgende band) (§4.1). */
  nextWorkInstantAfter(t) {
    return new Date(this.nextBandStartStrictAfter(t.getTime()));
  }
  /** t als t ∈ `(bandstart, bandeind]`, anders het laatste band-eind ≤ t (§4.1). Een finish exact op
   *  een band-eind is legitiem en blijft staan (rand `(start,end]`). */
  prevWorkInstant(t) {
    const tMs = t.getTime();
    if (this.findContaining(tMs, true)) return new Date(tMs);
    return new Date(this.prevBandEndBound(tMs, false));
  }
  /** Het laatste band-eind STRIKT < t (§4.1). */
  prevWorkInstantBefore(t) {
    return new Date(this.prevBandEndBound(t.getTime(), true));
  }
  // ── Minuut-lussen (§4.2) ───────────────────────────────────────────────────
  /** Tel `minutes` werkminuten op vanaf `startInstant` (§4.2): verbruik over opeenvolgende banden,
   *  spring bij een bandgrens naar de volgende bandstart. Een verbruik dat exact op een band-eind
   *  landt geeft die eindgrens terug (legitiem finish-moment). `minutes ≤ 0` ⇒ start ongewijzigd
   *  (spiegelt `addWorkDays`' `≤0`-tak, voor mijlpalen). */
  addWorkMinutes(startInstant, minutes) {
    if (minutes <= 0) return new Date(startInstant.getTime());
    let remaining = Math.min(minutes, _CalendarEngine.MAX_MINUTES);
    let curMs = this.nextWorkInstant(startInstant).getTime();
    let steps = 0;
    while (remaining > 0) {
      const band = this.findContaining(curMs, false);
      if (!band) break;
      const availMin = (band.end - curMs) / _CalendarEngine.MS_PER_MIN;
      if (remaining <= availMin) {
        curMs += remaining * _CalendarEngine.MS_PER_MIN;
        remaining = 0;
      } else {
        remaining -= availMin;
        curMs = this.nextWorkInstant(new Date(band.end)).getTime();
      }
      if (++steps > _CalendarEngine.MAX_DAYS) break;
    }
    return new Date(curMs);
  }
  /** Trek `minutes` werkminuten af van `endInstant` (spiegel van `addWorkMinutes`, §4.2/§5.2). Een
   *  landing exact op een bandstart is legitiem (rand `(start,end]`). */
  subtractWorkMinutes(endInstant, minutes) {
    if (minutes <= 0) return new Date(endInstant.getTime());
    let remaining = Math.min(minutes, _CalendarEngine.MAX_MINUTES);
    let curMs = this.prevWorkInstant(endInstant).getTime();
    let steps = 0;
    while (remaining > 0) {
      const band = this.findContaining(curMs, true);
      if (!band) break;
      const availMin = (curMs - band.start) / _CalendarEngine.MS_PER_MIN;
      if (remaining <= availMin) {
        curMs -= remaining * _CalendarEngine.MS_PER_MIN;
        remaining = 0;
      } else {
        remaining -= availMin;
        curMs = this.prevWorkInstant(new Date(band.start)).getTime();
      }
      if (++steps > _CalendarEngine.MAX_DAYS) break;
    }
    return new Date(curMs);
  }
  /** Getekende werkminuten in `[a,b)` (§5.5, voor vrije speling). Positief als b>a, negatief als
   *  b<a, 0 als gelijk. */
  workMinutesBetween(a, b) {
    const aMs = a.getTime();
    const bMs = b.getTime();
    if (aMs === bMs) return 0;
    const sign = bMs > aMs ? 1 : -1;
    const lo = Math.min(aMs, bMs);
    const hi = Math.max(aMs, bMs);
    let total = 0;
    let dayMs = this.dayStartMsOf(lo) - 2 * _CalendarEngine.MS_PER_DAY;
    let steps = 0;
    while (dayMs < hi) {
      for (const band of this.bandsStartingOn(dayMs)) {
        const s = Math.max(band.start, lo);
        const e = Math.min(band.end, hi);
        if (e > s) total += (e - s) / _CalendarEngine.MS_PER_MIN;
      }
      dayMs += _CalendarEngine.MS_PER_DAY;
      if (++steps > _CalendarEngine.MAX_DAYS) break;
    }
    return sign * total;
  }
  /** Zuivere getekende offset over werkminuten (uur-tegenhanger van `addWorkingDaysSigned`, voor
   *  lag/lead). m=0 ⇒ genormaliseerd naar `nextWorkInstant(t)`; m>0 vooruit, m<0 achteruit. */
  addWorkingMinutesSigned(t, m) {
    const current2 = this.nextWorkInstant(t);
    if (m === 0) return current2;
    return m > 0 ? this.addWorkMinutes(current2, m) : this.subtractWorkMinutes(current2, -m);
  }
  // ── Cross-modus-primitieven (§4.3) — de solver (golf 2) wisselt hiermee tussen dag- en uur-taken ──
  /** De dag-van-t indien t exact op middernacht valt, anders de volgende dag (§4.3). Modus-agnostisch
   *  (zuivere datum-rekenkunde): een dag-taak kan niet midden op een dag starten. */
  ceilToWorkDay(t) {
    const tMs = t.getTime();
    const dayMs = this.dayStartMsOf(tMs);
    return new Date(tMs === dayMs ? dayMs : dayMs + _CalendarEngine.MS_PER_DAY);
  }
  /** De exclusieve "beschikbaar-vanaf"-instant die een taak op DEZE engine als VOORGANGER levert
   *  (§4.3). Uur-modus ⇒ de exclusieve finish-instant zelf; dag-modus ⇒ `(ef + 1 dag) @ 00:00` (de
   *  dag-taak bezet zijn hele finish-dag). In een puur dag→dag-net levert de combinatie met
   *  `availableStart` exact `nextWorkDayAfter(ef)` — bit-identiek met het huidige gedrag. */
  predDoneAt(ef) {
    if (this.mode === "hour") return new Date(ef.getTime());
    return new Date(this.dayStartMsOf(ef.getTime()) + _CalendarEngine.MS_PER_DAY);
  }
  /** De ES die een taak op DEZE engine als OPVOLGER consumeert uit een `predDoneAt`-instant (§4.3).
   *  Uur-modus ⇒ `nextWorkInstant(predDoneAt)`; dag-modus ⇒ `nextWorkDay(ceilToWorkDay(predDoneAt))`. */
  availableStart(predDoneAt) {
    if (this.mode === "hour") return this.nextWorkInstant(predDoneAt);
    return this.nextWorkDay(this.ceilToWorkDay(predDoneAt));
  }
  /**
   * Werk-intervallen (absolute UTC-`Date`-paren, half-open `[start,end)`) die het venster
   * `[from, to]` snijden — voor de balk-opsplitsing/bar-necking in de Gantt (§6.9). Hergebruikt de
   * op het kalender-object GEMEMOIZEDE band-materialisatie (`bandsStartingOn`), dus geen extra
   * uitrol per frame. Alleen zinvol in uur-modus; een dag-kalender geeft `[]` (dag-taken renderen
   * altijd doorlopend). Scant vanaf de dag vóór `from` om de na-middernacht-staart van een
   * wrap-band (nachtploeg) mee te nemen.
   */
  workIntervalsBetween(from, to) {
    if (this.mode !== "hour") return [];
    const fromMs = from.getTime();
    const toMs = to.getTime();
    if (!(toMs > fromMs)) return [];
    const out = [];
    const lastDay = this.dayStartMsOf(toMs);
    let dayMs = this.dayStartMsOf(fromMs) - _CalendarEngine.MS_PER_DAY;
    let scan = 0;
    while (dayMs <= lastDay && scan <= _CalendarEngine.MAX_SCAN + 2) {
      for (const band of this.bandsStartingOn(dayMs)) {
        const s = Math.max(band.start, fromMs);
        const e = Math.min(band.end, toMs);
        if (e > s) out.push({ start: new Date(s), end: new Date(e) });
      }
      dayMs += _CalendarEngine.MS_PER_DAY;
      scan++;
    }
    out.sort((a, b) => a.start.getTime() - b.start.getTime());
    return out;
  }
  // ── Introspectie voor de memoization-test (§5.6). Twee engines op hetzelfde kalender-object
  //    delen deze cache-identiteit en teller. In dag-modus is er geen cache (0 / undefined). ──
  /** Aantal dag-materialisaties (cache-misses) op de GEDEELDE kalender-object-cache. */
  materializationCount() {
    return this.bandCache ? this.bandCache.fills : 0;
  }
  /** Identiteit van de gedeelde band-cache (voor een `===`-check tussen twee engines). */
  bandCacheRef() {
    return this.bandCache;
  }
};

// src/engine/scheduler/resolveCalendar.ts
function resolveCalendar(calendarId, registry, projectCalendar) {
  if (!calendarId) return projectCalendar;
  return registry.find((c) => c.id === calendarId) ?? projectCalendar;
}

// src/engine/scheduler/duration.ts
function durationMinutesOf(task, effCal) {
  if (effCal.isHourMode) {
    const dm = task.time.durationMinutes;
    if (dm != null) return dm;
  }
  return task.time.scheduleDuration * effCal.hoursPerDay * 60;
}
function durationDaysOf(task, effCal) {
  if (effCal.isHourMode && task.time.durationMinutes != null) {
    return task.time.durationMinutes / (effCal.hoursPerDay * 60);
  }
  return task.time.scheduleDuration;
}

// src/engine/scheduler/graphWalk.ts
function walk(startId, edges, allowedSeqIds) {
  const reached = /* @__PURE__ */ new Set();
  const seen = /* @__PURE__ */ new Set([startId]);
  const stack = [startId];
  while (stack.length > 0) {
    const id = stack.pop();
    for (const e of edges.get(id) ?? []) {
      if (allowedSeqIds && !allowedSeqIds.has(e.seqId)) continue;
      if (seen.has(e.other)) continue;
      seen.add(e.other);
      reached.add(e.other);
      stack.push(e.other);
    }
  }
  return reached;
}
function traceFrom(taskId, sequences, drivingSeqIds) {
  const up = /* @__PURE__ */ new Map();
  const down = /* @__PURE__ */ new Map();
  for (const q of sequences) {
    if (!down.has(q.predecessorId)) down.set(q.predecessorId, []);
    down.get(q.predecessorId).push({ other: q.successorId, seqId: q.id });
    if (!up.has(q.successorId)) up.set(q.successorId, []);
    up.get(q.successorId).push({ other: q.predecessorId, seqId: q.id });
  }
  return {
    predecessors: walk(taskId, up),
    drivingPredecessors: drivingSeqIds ? walk(taskId, up, drivingSeqIds) : /* @__PURE__ */ new Set(),
    successors: walk(taskId, down),
    drivenSuccessors: drivingSeqIds ? walk(taskId, down, drivingSeqIds) : /* @__PURE__ */ new Set()
  };
}

// src/engine/scheduler/scheduleAnalysis.ts
function computeScheduleResults(input) {
  const {
    order,
    earlyDates,
    lateDates,
    outOfSequenceSequenceIds,
    tasks,
    sequences,
    successors,
    seqConstraint,
    schedulingOptions,
    dataDate,
    truncatedLeadIds,
    hardPinViolatedIds,
    hammockNoFinishDriverIds,
    projectEngine,
    calendarFor,
    signedFloat,
    constraintInstant,
    snapOnOrAfter,
    snapOnOrBefore,
    modeOf
  } = input;
  const taskResults = /* @__PURE__ */ new Map();
  const criticalPath = [];
  const sequenceFreeFloat = {};
  const drivingSequenceIds = [];
  const violatedConstraintTaskIds = [];
  const missedDeadlineTaskIds = [];
  const nearCriticalTaskIds = [];
  for (const seq of sequences) {
    const cRaw = seqConstraint.get(seq.id);
    const succEarly = earlyDates.get(seq.successorId);
    const succTask = tasks.get(seq.successorId);
    if (!cRaw || !succEarly || !succTask) continue;
    const succCal = calendarFor(succTask);
    const reqStart = snapOnOrAfter(succCal, cRaw);
    const relFloat = succCal.isHourMode ? succCal.workMinutesBetween(reqStart, succEarly.es) / (succCal.hoursPerDay * 60) : succCal.workDaysBetween(reqStart, succEarly.es) - 1;
    sequenceFreeFloat[seq.id] = relFloat;
    if (relFloat === 0) drivingSequenceIds.push(seq.id);
  }
  const so = schedulingOptions;
  const tfMode = so?.totalFloatMode ?? "smallest";
  const makeOpenEndedCritical = so?.makeOpenEndedCritical === true;
  const nearCriticalThreshold = so?.nearCriticalThreshold;
  const critDef = so?.criticalDefinition;
  const critThreshold = critDef?.threshold ?? 0;
  const useLongestPath = critDef?.mode === "longestPath";
  const longestPathCritical = /* @__PURE__ */ new Set();
  if (useLongestPath) {
    let maxEf = -Infinity;
    for (const { ef } of earlyDates.values()) {
      if (ef.getTime() > maxEf) maxEf = ef.getTime();
    }
    const drivingSet = new Set(drivingSequenceIds);
    for (const [id, { ef }] of earlyDates) {
      if (ef.getTime() !== maxEf) continue;
      if (tasks.get(id)?.isHammock === true) continue;
      longestPathCritical.add(id);
      for (const p of traceFrom(id, sequences, drivingSet).drivingPredecessors) {
        longestPathCritical.add(p);
      }
    }
  }
  let projectEnd = /* @__PURE__ */ new Date(0);
  for (const taskId of order) {
    const early = earlyDates.get(taskId);
    const late = lateDates.get(taskId);
    const taskObj = tasks.get(taskId);
    const cal = calendarFor(taskObj);
    let freeFloat = Infinity;
    const succs = successors.get(taskId) || [];
    if (succs.length === 0) {
      freeFloat = signedFloat(early.ef, late.lf, cal);
    } else {
      for (const seq of succs) {
        const ff = sequenceFreeFloat[seq.id];
        if (ff !== void 0 && ff < freeFloat) freeFloat = ff;
      }
    }
    if (freeFloat === Infinity) freeFloat = 0;
    const tt = taskObj.time;
    const hasProgress = !!dataDate && (!!tt.actualStart || tt.completion > 0);
    const completed = !!dataDate && tt.completion >= 1;
    const finishFloat = signedFloat(early.ef, late.lf, cal);
    const startFloat = signedFloat(early.es, late.ls, cal);
    let tf = hasProgress ? finishFloat : tfMode === "finish" ? finishFloat : tfMode === "start" ? startFloat : Math.min(finishFloat, startFloat);
    if (makeOpenEndedCritical && succs.length === 0 && !completed) {
      tf = 0;
      freeFloat = 0;
    }
    const isHammock = taskObj.isHammock === true;
    if (isHammock) {
      tf = 0;
      freeFloat = 0;
    }
    const isCritical = isHammock ? false : completed ? false : useLongestPath ? longestPathCritical.has(taskId) : tf <= critThreshold;
    if (isCritical) criticalPath.push(taskId);
    const interferingFloat = tf - freeFloat;
    const isNear = nearCriticalThreshold !== void 0 && nearCriticalThreshold !== null ? tf > 0 && tf <= nearCriticalThreshold : void 0;
    if (isNear) nearCriticalTaskIds.push(taskId);
    if (early.ef > projectEnd) projectEnd = early.ef;
    const task = taskObj;
    {
      for (const cc of [task.constraint, task.constraint2]) {
        if (!cc) continue;
        if (cc.hard && (cc.type === "MSO" || cc.type === "MFO")) continue;
        const cd = constraintInstant(cc, cal);
        if (!cd) continue;
        const dW = snapOnOrBefore(cal, cd);
        const ct = cc.type;
        if ((ct === "SNLT" || ct === "MSO") && early.es > dW || (ct === "FNLT" || ct === "MFO") && early.ef > dW) {
          if (!violatedConstraintTaskIds.includes(taskId)) violatedConstraintTaskIds.push(taskId);
        }
      }
      if (task.deadline) {
        const dl = parseDate(task.deadline);
        if (!isNaN(dl.getTime()) && early.ef > cal.prevWorkDay(dl)) {
          missedDeadlineTaskIds.push(taskId);
        }
      }
    }
    const mode = modeOf(cal);
    taskResults.set(taskId, {
      earlyStart: formatInstant(early.es, mode),
      earlyFinish: formatInstant(early.ef, mode),
      lateStart: formatInstant(late.ls, mode),
      lateFinish: formatInstant(late.lf, mode),
      totalFloat: tf,
      freeFloat,
      isCritical,
      interferingFloat,
      ...isNear !== void 0 ? { isNearCritical: isNear } : {}
    });
  }
  for (const id of hardPinViolatedIds) {
    if (!violatedConstraintTaskIds.includes(id)) violatedConstraintTaskIds.push(id);
  }
  const hasSchedule = earlyDates.size > 0;
  let projectDuration = 0;
  let projStart = null;
  for (const { es } of earlyDates.values()) {
    if (!projStart || es < projStart) projStart = es;
  }
  if (projStart) {
    projectDuration = projectEngine.workDaysBetween(projStart, projectEnd);
    if (formatDate(projStart) === formatDate(projectEnd)) {
      const anyRealWork = [...tasks.values()].some(
        (t) => !t.isMilestone && t.time.scheduleDuration > 0
      );
      if (!anyRealWork) projectDuration = 0;
    }
  }
  let criticalPaths = [criticalPath];
  const floatPathByTask = {};
  const fpOpt = so?.floatPaths;
  if (fpOpt?.enabled) {
    const maxPaths = Math.max(0, Math.floor(fpOpt.maxPaths));
    const isHammock = (id) => tasks.get(id)?.isHammock === true;
    const candidates = /* @__PURE__ */ new Set();
    for (const id of order) if (!isHammock(id)) candidates.add(id);
    if (fpOpt.method === "TOTAL_FLOAT") {
      const tfOf = (id) => taskResults.get(id).totalFloat;
      const distinct = [...new Set([...candidates].map(tfOf))].sort((a, b) => a - b);
      const rankOf = /* @__PURE__ */ new Map();
      distinct.forEach((tf, i) => rankOf.set(tf, i + 1));
      for (const id of candidates) {
        const rank = rankOf.get(tfOf(id));
        if (rank <= maxPaths) floatPathByTask[id] = rank;
      }
    } else {
      const drivingSet = new Set(drivingSequenceIds);
      const efMs = (id) => earlyDates.get(id).ef.getTime();
      const peeled = [];
      let p = 0;
      while (candidates.size > 0 && p < maxPaths) {
        let end = null;
        let bestEf = -Infinity;
        for (const id of order) {
          if (!candidates.has(id)) continue;
          const e = efMs(id);
          if (e > bestEf) {
            bestEf = e;
            end = id;
          }
        }
        if (end === null) break;
        p += 1;
        const chain = /* @__PURE__ */ new Set([end]);
        for (const q of traceFrom(end, sequences, drivingSet).drivingPredecessors) {
          if (!isHammock(q)) chain.add(q);
        }
        for (const id of chain) {
          if (floatPathByTask[id] === void 0 && candidates.has(id)) floatPathByTask[id] = p;
        }
        for (const id of chain) candidates.delete(id);
        const ids = [...chain].sort((a, b) => order.indexOf(a) - order.indexOf(b));
        peeled.push({ ids, critical: ids.every((id) => taskResults.get(id)?.isCritical === true) });
      }
      for (let i = 1; i < peeled.length; i++) {
        if (peeled[i].critical) criticalPaths.push(peeled[i].ids);
      }
    }
    for (const [id, r] of taskResults) {
      if (floatPathByTask[id] !== void 0) r.floatPath = floatPathByTask[id];
    }
  }
  return {
    tasks: taskResults,
    criticalPath,
    drivingSequenceIds,
    sequenceFreeFloat,
    truncatedLeadSequenceIds: [...truncatedLeadIds],
    violatedConstraintTaskIds,
    missedDeadlineTaskIds,
    outOfSequenceSequenceIds,
    // Fase 2.9 golf 2/3 — analyse-laag: near-critical-set gevuld bij ingestelde drempel (§4.6);
    // `interferingFloat` altijd per taak geschreven. `criticalPaths`/`floatPathByTask` gevuld door de
    // golf-3-post-pass hierboven (uit ⇒ `[criticalPath]` resp. `{}`, byte-identiek).
    nearCriticalTaskIds,
    criticalPaths,
    floatPathByTask,
    // Hammocks zonder finish-driver (§4.4): waarschuwing (nul-lengte-terugval).
    hammockNoFinishDriverTaskIds: [...hammockNoFinishDriverIds],
    // Projecteinde in de projectkalendermodus (§5.4): dag-project ⇒ `formatDate` (byte-identiek).
    // Zonder early-resultaten leeg (zie `hasSchedule` hierboven) i.p.v. de epoch.
    projectEnd: hasSchedule ? formatInstant(projectEnd, modeOf(projectEngine)) : "",
    projectDuration
  };
}

// src/engine/scheduler/lagCalendar.ts
var LAG_CALENDAR = "predecessor";

// src/engine/scheduler/relationMath.ts
var MS_PER_MIN = 6e4;
var MS_PER_DAY = 864e5;
var HOUR_SCAN = 400;
function relationBoundaryFlags(predTask, succTask) {
  const predIsMilestone = predTask.isMilestone || predTask.time.scheduleDuration <= 0;
  const predKind = predTask.isMilestone ? predTask.milestoneKind : void 0;
  return {
    predEndsBeginOfDay: predIsMilestone && predKind !== "FINISH",
    predStartsNextDay: predIsMilestone && predKind === "FINISH",
    succIsFinishMs: succTask.isMilestone && succTask.milestoneKind === "FINISH",
    succIsStartMs: succTask.isMilestone && succTask.milestoneKind === "START"
  };
}
function forwardConstraint(deps, predResult, predTask, seq, successor, predEng, succEng) {
  const flags = relationBoundaryFlags(predTask, successor);
  if (predEng.isHourMode || succEng.isHourMode) {
    return forwardHour(deps, predResult, predTask, seq, successor, predEng, succEng, flags);
  }
  return forwardDay(deps, predResult, predTask, seq, successor, predEng, succEng, flags);
}
function backwardConstraint(deps, succResult, seq, predTask, succTask, predEng, succEng) {
  const flags = relationBoundaryFlags(predTask, succTask);
  if (predEng.isHourMode || succEng.isHourMode) {
    return backwardHour(deps, succResult, seq, predTask, predEng, succEng, flags);
  }
  return backwardDay(deps, succResult, seq, predTask, predEng, succEng, flags);
}
function forwardDay(deps, predResult, predTask, seq, successor, predEng, succEng, flags) {
  const { days: lag, unit } = deps.resolveLag(seq, predTask, predEng);
  const elapsed = unit === "ELAPSEDTIME";
  const pe = predEng;
  const se = succEng;
  const lagEng = LAG_CALENDAR === "predecessor" ? predEng : succEng;
  const succDur = successor.isMilestone ? 0 : successor.time.scheduleDuration;
  const succBack = succDur > 0 ? succDur - 1 : 0;
  const { predEndsBeginOfDay, predStartsNextDay, succIsFinishMs, succIsStartMs } = flags;
  switch (seq.type) {
    case "START_START": {
      if (elapsed) {
        return addCalendarDays(predResult.es, predStartsNextDay ? lag + 1 : lag);
      }
      const base = predStartsNextDay ? pe.nextWorkDayAfter(predResult.es) : predResult.es;
      return lagEng.addWorkingDaysSigned(base, lag);
    }
    case "FINISH_FINISH": {
      const reqFinish = elapsed ? se.nextWorkDay(addCalendarDays(predResult.ef, lag)) : lagEng.addWorkingDaysSigned(predResult.ef, lag);
      if (succIsStartMs && !predEndsBeginOfDay) return se.nextWorkDayAfter(reqFinish);
      return se.addWorkingDaysSigned(reqFinish, -succBack);
    }
    case "START_FINISH": {
      const reqFinish = elapsed ? se.nextWorkDay(addCalendarDays(predResult.es, predStartsNextDay ? lag + 1 : lag)) : lagEng.addWorkingDaysSigned(
        predStartsNextDay ? pe.nextWorkDayAfter(predResult.es) : predResult.es,
        lag
      );
      return se.addWorkingDaysSigned(reqFinish, -succBack);
    }
    case "FINISH_START":
    default: {
      if (elapsed) {
        const plus = succIsFinishMs || predEndsBeginOfDay ? lag : lag + 1;
        return addCalendarDays(predResult.ef, plus);
      }
      const base = succIsFinishMs || predEndsBeginOfDay ? predResult.ef : pe.nextWorkDayAfter(predResult.ef);
      return lagEng.addWorkingDaysSigned(base, lag);
    }
  }
}
function backwardDay(deps, succResult, seq, predTask, predEng, succEng, flags) {
  const { days: lag, unit } = deps.resolveLag(seq, predTask, predEng);
  const elapsed = unit === "ELAPSEDTIME";
  const pe = predEng;
  const se = succEng;
  const lagEng = LAG_CALENDAR === "predecessor" ? predEng : succEng;
  const predDur = predTask.isMilestone ? 0 : predTask.time.scheduleDuration;
  const predBack = predDur > 0 ? predDur - 1 : 0;
  const { predEndsBeginOfDay, predStartsNextDay, succIsFinishMs, succIsStartMs } = flags;
  switch (seq.type) {
    case "START_START": {
      const predLS = elapsed ? lagEng.prevWorkDay(addCalendarDays(succResult.ls, -(predStartsNextDay ? lag + 1 : lag))) : predStartsNextDay ? pe.prevWorkDayBefore(lagEng.addWorkingDaysSigned(succResult.ls, -lag)) : lagEng.addWorkingDaysSigned(succResult.ls, -lag);
      return pe.addWorkingDaysSigned(predLS, predBack);
    }
    case "FINISH_FINISH": {
      const succLf = succIsStartMs && !predEndsBeginOfDay ? se.prevWorkDayBefore(succResult.lf) : succResult.lf;
      return elapsed ? lagEng.prevWorkDay(addCalendarDays(succLf, -lag)) : lagEng.addWorkingDaysSigned(succLf, -lag);
    }
    case "START_FINISH": {
      const predLS = elapsed ? lagEng.prevWorkDay(addCalendarDays(succResult.lf, -(predStartsNextDay ? lag + 1 : lag))) : predStartsNextDay ? pe.prevWorkDayBefore(lagEng.addWorkingDaysSigned(succResult.lf, -lag)) : lagEng.addWorkingDaysSigned(succResult.lf, -lag);
      return pe.addWorkingDaysSigned(predLS, predBack);
    }
    case "FINISH_START":
    default: {
      if (elapsed) {
        const plus = succIsFinishMs || predEndsBeginOfDay ? lag : lag + 1;
        return lagEng.prevWorkDay(addCalendarDays(succResult.ls, -plus));
      }
      const target = lagEng.addWorkingDaysSigned(succResult.ls, -lag);
      return succIsFinishMs || predEndsBeginOfDay ? target : pe.prevWorkDayBefore(target);
    }
  }
}
function forwardHour(deps, predResult, predTask, seq, successor, pe, se, flags) {
  const elapsed = seq.lagUnit === "ELAPSEDTIME";
  const { predEndsBeginOfDay, predStartsNextDay, succIsFinishMs, succIsStartMs } = flags;
  const elapsedMin = () => deps.resolveElapsedMinutes(seq, predTask) * MS_PER_MIN;
  switch (seq.type) {
    case "START_START": {
      const base = predStartsNextDay ? deps.snapStrictAfter(pe, predResult.es) : predResult.es;
      if (elapsed) {
        return deps.snapOnOrAfter(se, new Date(base.getTime() + elapsedMin()));
      }
      return deps.snapOnOrAfter(se, deps.shiftLagPred(pe, base, seq, predTask, 1));
    }
    case "FINISH_FINISH": {
      const reqFinish = elapsed ? deps.snapOnOrAfter(se, new Date(predResult.ef.getTime() + elapsedMin())) : deps.shiftLagPred(pe, predResult.ef, seq, predTask, 1);
      if (succIsStartMs && !predEndsBeginOfDay) return deps.snapStrictAfter(se, reqFinish);
      return deps.startFromFinish(se, reqFinish, successor);
    }
    case "START_FINISH": {
      const startMoment = predStartsNextDay ? deps.snapStrictAfter(pe, predResult.es) : predResult.es;
      const reqFinish = elapsed ? deps.snapOnOrAfter(se, new Date(startMoment.getTime() + elapsedMin())) : deps.shiftLagPred(pe, startMoment, seq, predTask, 1);
      return deps.startFromFinish(se, reqFinish, successor);
    }
    case "FINISH_START":
    default: {
      if (elapsed) {
        return se.availableStart(new Date(predResult.ef.getTime() + elapsedMin()));
      }
      const predDone = succIsFinishMs || predEndsBeginOfDay ? predResult.ef : pe.predDoneAt(predResult.ef);
      return se.availableStart(deps.shiftLagPred(pe, predDone, seq, predTask, 1));
    }
  }
}
function backwardHour(deps, succResult, seq, predTask, pe, se, flags) {
  const elapsed = seq.lagUnit === "ELAPSEDTIME";
  const { predEndsBeginOfDay, predStartsNextDay, succIsFinishMs, succIsStartMs } = flags;
  const elapsedMin = () => deps.resolveElapsedMinutes(seq, predTask) * MS_PER_MIN;
  switch (seq.type) {
    case "START_START": {
      const shifted = elapsed ? new Date(succResult.ls.getTime() - elapsedMin()) : deps.shiftLagPred(pe, succResult.ls, seq, predTask, -1);
      const predStart = predStartsNextDay ? deps.snapStrictBefore(pe, shifted) : elapsed ? deps.snapOnOrBefore(pe, shifted) : shifted;
      return deps.finishFromStart(pe, predStart, predTask);
    }
    case "FINISH_FINISH": {
      const succLf = succIsStartMs && !predEndsBeginOfDay ? deps.snapStrictBefore(se, succResult.lf) : succResult.lf;
      if (elapsed) {
        return deps.snapOnOrBefore(pe, new Date(succLf.getTime() - elapsedMin()));
      }
      return deps.shiftLagPred(pe, succLf, seq, predTask, -1);
    }
    case "START_FINISH": {
      const shifted = elapsed ? new Date(succResult.lf.getTime() - elapsedMin()) : deps.shiftLagPred(pe, succResult.lf, seq, predTask, -1);
      const predStart = predStartsNextDay ? deps.snapStrictBefore(pe, shifted) : elapsed ? deps.snapOnOrBefore(pe, shifted) : shifted;
      return deps.finishFromStart(pe, predStart, predTask);
    }
    case "FINISH_START":
    default: {
      if (elapsed) {
        return deps.snapOnOrBefore(pe, new Date(succResult.ls.getTime() - elapsedMin()));
      }
      const succDayStart = () => deps.startOfDay(succResult.ls);
      if (pe.isHourMode && se.isHourMode) {
        const lagged = deps.shiftLagPred(pe, succResult.ls, seq, predTask, -1);
        const lagIsZero = lagged.getTime() === pe.nextWorkInstant(succResult.ls).getTime();
        const target = (predEndsBeginOfDay || succIsFinishMs) && lagIsZero ? succResult.ls : lagged;
        if (predEndsBeginOfDay) return target;
        return pe.prevWorkInstant(target);
      }
      if (pe.isHourMode && !se.isHourMode) {
        const target = deps.shiftLagPred(pe, succDayStart(), seq, predTask, -1);
        return pe.prevWorkInstant(target);
      }
      const noDayBoundary = succIsFinishMs || predEndsBeginOfDay;
      const lagDays = deps.resolveEffectiveLagDays(seq, predTask, pe);
      let d = succDayStart();
      for (let scan = 0; scan <= HOUR_SCAN; scan++) {
        if (pe.isWorkDay(d)) {
          const predDone = noDayBoundary ? new Date(d.getTime()) : new Date(d.getTime() + MS_PER_DAY);
          const shifted = pe.addWorkingDaysSigned(predDone, lagDays);
          if (se.nextWorkInstant(shifted).getTime() <= succResult.ls.getTime()) return d;
        }
        d = addCalendarDays(d, -1);
      }
      return deps.snapOnOrBefore(pe, succDayStart());
    }
  }
}

// src/engine/scheduler/CPMSolver.ts
function resolveEffectiveLagDays(seq, predTask, hoursPerDay) {
  if (typeof seq.lagPercent === "number" && Number.isFinite(seq.lagPercent)) {
    const predDur = predTask.isMilestone ? 0 : predTask.time.scheduleDuration;
    return Math.round(predDur * seq.lagPercent / 100);
  }
  const days = Number.isFinite(seq.lagDays) ? seq.lagDays : 0;
  if (days === 0 && typeof hoursPerDay === "number" && hoursPerDay > 0 && typeof seq.lagMinutes === "number" && Number.isFinite(seq.lagMinutes) && seq.lagMinutes !== 0) {
    const raw = seq.lagMinutes / (hoursPerDay * 60);
    return Math.sign(raw) * Math.round(Math.abs(raw));
  }
  return days;
}
function emptyResult(error) {
  return {
    tasks: /* @__PURE__ */ new Map(),
    criticalPath: [],
    drivingSequenceIds: [],
    sequenceFreeFloat: {},
    truncatedLeadSequenceIds: [],
    violatedConstraintTaskIds: [],
    missedDeadlineTaskIds: [],
    outOfSequenceSequenceIds: [],
    nearCriticalTaskIds: [],
    criticalPaths: [[]],
    floatPathByTask: {},
    hammockNoFinishDriverTaskIds: [],
    projectEnd: "",
    projectDuration: 0,
    error
  };
}
var CPMSolver = class _CPMSolver {
  tasks;
  sequences;
  // Per-taak-kalender (fase 2.8a, §5.1): de projectdefault-engine voor project-brede grenslogica,
  // plus een cache van engines per bibliotheek-kalender. `calendarFor(task)` levert de engine waarin
  // de duur/constraints/float van díé taak rekenen; zonder afwijkende `task.calendarId` valt alles
  // terug op `projectEngine` ⇒ byte-identiek aan het één-kalender-gedrag van vóór 2.8a.
  projectCal;
  registry;
  projectEngine;
  engineCache = /* @__PURE__ */ new Map();
  // Adjacency lists
  successors;
  // taskId -> outgoing sequences
  predecessors;
  // taskId -> incoming sequences
  // Per relatie de in de forward-pass gegenereerde (ruwe) vroegst-toegestane start van de
  // opvolger, vóór de projectstart-vloer en de werkdag-snap. Eén bron van waarheid voor
  // vrije speling én driving-markering, ongeacht lag-eenheid.
  seqConstraint = /* @__PURE__ */ new Map();
  // Relaties waarvan de lead in de forward-pass door de projectstart-vloer is afgekapt.
  truncatedLeadIds = [];
  // Taken met een harde MSO/MFO-pin (fase 2.9, §4.2) waarvan de voorganger-druk (`rawMax`) later
  // valt dan de pin ⇒ de logica is gebroken (taak start vóór z'n voorganger klaar is). Verzameld in
  // de forward pass, samengevoegd met `violatedConstraintTaskIds` in `computeResults`.
  hardPinViolatedIds = [];
  // Hammocks (fase 2.9, §4.4) zónder finish-driver: EF valt terug op ES (nul-lengte). Verzameld in de
  // forward pass, gerapporteerd als waarschuwing in `hammockNoFinishDriverTaskIds`.
  hammockNoFinishDriverIds = [];
  // Taken waarvan de earlyFinish-berekening tegen de MAX_SCAN/MAX_DAYS-cap van `addWorkDays` liep
  // (WP7 "Onwerkbaar-venster-detectie"): een onwerkbaar taakvenster (bv. een aaneengesloten holiday-
  // blok). Verzameld in de forward pass, zacht gerapporteerd als `cappedTaskIds`. Geen error, geen
  // rollback — de kalenderwijziging is legitiem; de waarschuwing wijst de te repareren taak aan.
  cappedTaskIds = [];
  options;
  // Werkdag-gesnapte statusdatum (fase 2.6), of null ⇒ geen statusdatum-gedrag. Gezet in solve().
  dataDate = null;
  constructor(tasks, sequences, projectCalendar, registry = [], options = {}) {
    this.tasks = new Map(tasks.map((t) => [t.id, t]));
    this.sequences = sequences;
    this.projectCal = projectCalendar;
    this.registry = registry;
    this.projectEngine = new CalendarEngine(projectCalendar);
    this.engineCache.set(projectCalendar.id, this.projectEngine);
    this.options = options;
    this.successors = /* @__PURE__ */ new Map();
    this.predecessors = /* @__PURE__ */ new Map();
    for (const task of tasks) {
      this.successors.set(task.id, []);
      this.predecessors.set(task.id, []);
    }
    for (const seq of sequences) {
      this.successors.get(seq.predecessorId)?.push(seq);
      this.predecessors.get(seq.successorId)?.push(seq);
    }
  }
  /** Engine voor een concrete kalender (gecachet op kalender-id). */
  engineForCal(cal) {
    let e = this.engineCache.get(cal.id);
    if (!e) {
      e = new CalendarEngine(cal);
      this.engineCache.set(cal.id, e);
    }
    return e;
  }
  /** De kalender-engine waarin de duur/constraints/float van `task` rekenen (§5.2). */
  calendarFor(task) {
    return this.engineForCal(resolveCalendar(task.calendarId, this.registry, this.projectCal));
  }
  // ═══════════════════════════════════════════════════════════════════════════
  //  Fase 2.8b (golf 2) — MODUS-BEWUSTE rekenkern (§5). Elke helper reduceert in
  //  DAG-modus tot exact de bestaande dag-expressie (byte-identiek); alleen een
  //  UUR-kalender (`isHourMode`) activeert het minuut-native pad. Zo blijven de 290
  //  dag-cases + 23 examples ongemoeid — de constructie, niet een her-derivatie (§2.2).
  // ═══════════════════════════════════════════════════════════════════════════
  static MS_PER_DAY = 864e5;
  /** Parse een datum-string in de kalendermodus: dag ⇒ `parseDate` (middernacht, byte-identiek),
   *  uur ⇒ `parseInstant` (behoudt tijd-van-de-dag). */
  parseIn(eng, iso2) {
    return eng.isHourMode ? parseInstant(iso2) : parseDate(iso2);
  }
  /** Snap op-of-ná (voorwaarts): dag ⇒ `nextWorkDay`, uur ⇒ `nextWorkInstant`. */
  snapOnOrAfter(eng, d) {
    return eng.isHourMode ? eng.nextWorkInstant(d) : eng.nextWorkDay(d);
  }
  /** Snap op-of-vóór (achterwaarts): dag ⇒ `prevWorkDay`, uur ⇒ `prevWorkInstant`. */
  snapOnOrBefore(eng, d) {
    return eng.isHourMode ? eng.prevWorkInstant(d) : eng.prevWorkDay(d);
  }
  /** Snap strikt ná: dag ⇒ `nextWorkDayAfter`, uur ⇒ `nextWorkInstantAfter`. */
  snapStrictAfter(eng, d) {
    return eng.isHourMode ? eng.nextWorkInstantAfter(d) : eng.nextWorkDayAfter(d);
  }
  /** Snap strikt vóór: dag ⇒ `prevWorkDayBefore`, uur ⇒ `prevWorkInstantBefore`. */
  snapStrictBefore(eng, d) {
    return eng.isHourMode ? eng.prevWorkInstantBefore(d) : eng.prevWorkDayBefore(d);
  }
  modeOf(eng) {
    return eng.isHourMode ? "hour" : "day";
  }
  /** UTC-middernacht van de dag die `d` bevat (voor de cross-modus-dagrand, §4.3/§5.2). */
  startOfDay(d) {
    return new Date(Math.floor(d.getTime() / _CPMSolver.MS_PER_DAY) * _CPMSolver.MS_PER_DAY);
  }
  /** De mode-bewuste primitieven die de relatie-wiskunde (`relationMath.ts`, audit P15) injectief
   *  krijgt aangereikt. Ze blijven hier gedefinieerd (delen de dag↔uur-reductie met de rest van de
   *  solver); `forwardConstraint`/`backwardConstraint` draaien de FS/SS/FF/SF-formules erop. */
  relDeps = {
    resolveLag: (seq, predTask, predEng) => this.resolveLag(seq, predTask, predEng),
    resolveEffectiveLagDays: (seq, predTask, predEng) => resolveEffectiveLagDays(seq, predTask, predEng.hoursPerDay),
    resolveElapsedMinutes: (seq, predTask) => this.resolveElapsedMinutes(seq, predTask),
    shiftLagPred: (predEng, base, seq, predTask, sign) => this.shiftLagPred(predEng, base, seq, predTask, sign),
    startFromFinish: (eng, finish, task) => this.startFromFinish(eng, finish, task),
    finishFromStart: (eng, start, task) => this.finishFromStart(eng, start, task),
    snapOnOrAfter: (eng, d) => this.snapOnOrAfter(eng, d),
    snapOnOrBefore: (eng, d) => this.snapOnOrBefore(eng, d),
    snapStrictAfter: (eng, d) => this.snapStrictAfter(eng, d),
    snapStrictBefore: (eng, d) => this.snapStrictBefore(eng, d),
    startOfDay: (d) => this.startOfDay(d)
  };
  /** Vroege finish = start ⊕ duur (§5.1). Mijlpaal ⇒ 0; uur ⇒ `addWorkMinutes(durationMinutesOf)`;
   *  dag ⇒ `addWorkDays(durationDaysOf)` — LETTERLIJK de huidige regel (`durationDaysOf` levert op een
   *  dag-kalender altijd de integer `scheduleDuration`, nooit een fractionele dag, Bevinding 2). */
  addDuration(eng, start, task) {
    return this.addDurationChecked(eng, start, task).date;
  }
  /** `addDuration` mét CAP-signaal (WP7): identieke datum-uitkomst, plus `capped` uit de dag-modus-
   *  `addWorkDaysChecked` — een onwerkbaar taakvenster (holiday-blok) dat de earlyFinish tegen de
   *  MAX_SCAN/MAX_DAYS-grens duwt. Mijlpaal en uur-modus cappen hier nooit (`false`): een mijlpaal
   *  heeft geen duur, en de minuut-lussen hebben hun eigen best-effort-terugval buiten dit signaal. */
  addDurationChecked(eng, start, task) {
    if (task.isMilestone) return { date: new Date(start.getTime()), capped: false };
    if (eng.isHourMode) return { date: eng.addWorkMinutes(start, durationMinutesOf(task, eng)), capped: false };
    return eng.addWorkDaysChecked(start, durationDaysOf(task, eng));
  }
  /** Late start = late finish ⊖ duur (§5.1, spiegel van `addDuration`). */
  subDuration(eng, end, task) {
    if (task.isMilestone) return new Date(end.getTime());
    return eng.isHourMode ? eng.subtractWorkMinutes(end, durationMinutesOf(task, eng)) : eng.subtractWorkDays(end, durationDaysOf(task, eng));
  }
  /** WORKTIME-lag in MINUTEN in de voorganger-kalender (§5.2): procent ⇒ uit `durationMinutesOf(pred)`;
   *  `lagMinutes` ⇒ bron; anders `lagDays × pred-hoursPerDay × 60` (naakt getal = werkdagen). */
  resolveLagMinutes(seq, predTask, predEng) {
    if (typeof seq.lagPercent === "number" && Number.isFinite(seq.lagPercent)) {
      const predMin = predTask.isMilestone ? 0 : durationMinutesOf(predTask, predEng);
      return Math.round(predMin * seq.lagPercent / 100);
    }
    if (typeof seq.lagMinutes === "number" && Number.isFinite(seq.lagMinutes)) return seq.lagMinutes;
    const days = Number.isFinite(seq.lagDays) ? seq.lagDays : 0;
    return days * predEng.hoursPerDay * 60;
  }
  /** ELAPSEDTIME-lag in KLOK-minuten (24/7, §5.2): `lagMinutes` ⇒ bron; anders (procent/)dagen × 24 × 60. */
  resolveElapsedMinutes(seq, predTask) {
    if (typeof seq.lagMinutes === "number" && Number.isFinite(seq.lagMinutes)) return seq.lagMinutes;
    return resolveEffectiveLagDays(seq, predTask) * 24 * 60;
  }
  /** Verschuif `base` met de relatie-lag in de VOORGANGER-engine (`LAG_CALENDAR='predecessor'`, §5.2).
   *  Uur-pred ⇒ minuten via `addWorkingMinutesSigned`; dag-pred ⇒ dagen via `addWorkingDaysSigned`
   *  (dag-lag blijft exact als nu). `sign` = +1 voorwaarts, −1 achterwaarts (spiegel). */
  shiftLagPred(predEng, base, seq, predTask, sign) {
    if (predEng.isHourMode) {
      return predEng.addWorkingMinutesSigned(base, sign * this.resolveLagMinutes(seq, predTask, predEng));
    }
    return predEng.addWorkingDaysSigned(
      base,
      sign * resolveEffectiveLagDays(seq, predTask, predEng.hoursPerDay)
    );
  }
  /** Leid de opvolger-START af uit zijn geëiste FINISH (FF/SF, §5.2): uur ⇒ `subtractWorkMinutes`;
   *  dag ⇒ `addWorkingDaysSigned(−(dur−1))` — de bestaande inclusieve-dag-aftrek. */
  startFromFinish(eng, finish, task) {
    if (eng.isHourMode) {
      if (task.isMilestone) return new Date(finish.getTime());
      return eng.subtractWorkMinutes(finish, durationMinutesOf(task, eng));
    }
    const dur = task.isMilestone ? 0 : task.time.scheduleDuration;
    return eng.addWorkingDaysSigned(finish, -(dur > 0 ? dur - 1 : 0));
  }
  /** Leid de voorganger-FINISH af uit zijn late START (SS/SF backward, §5.2, spiegel van
   *  `startFromFinish`): uur ⇒ `addWorkMinutes`; dag ⇒ `addWorkingDaysSigned(dur−1)`. */
  finishFromStart(eng, start, task) {
    if (eng.isHourMode) {
      if (task.isMilestone) return new Date(start.getTime());
      return eng.addWorkMinutes(start, durationMinutesOf(task, eng));
    }
    const dur = task.isMilestone ? 0 : task.time.scheduleDuration;
    return eng.addWorkingDaysSigned(start, dur > 0 ? dur - 1 : 0);
  }
  /** Getekende float in eigen-kalender-WERKDAGEN (§5.5, Bevinding 1): uur ⇒ fractioneel
   *  `workMinutesBetween / (hoursPerDay × 60)`; dag ⇒ de bestaande integer `signedWorkDays`. */
  signedFloat(a, b, eng) {
    if (eng.isHourMode) return eng.workMinutesBetween(a, b) / (eng.hoursPerDay * 60);
    return this.signedWorkDays(a, b, eng);
  }
  solve() {
    this.seqConstraint.clear();
    this.truncatedLeadIds = [];
    this.hardPinViolatedIds = [];
    this.hammockNoFinishDriverIds = [];
    this.cappedTaskIds = [];
    this.dataDate = null;
    const cycle = this.detectCycle();
    if (cycle) {
      const cycleNames = cycle.map((id) => this.tasks.get(id)?.name || id).join(" -> ");
      return emptyResult(`Circular dependency detected: ${cycleNames}`);
    }
    if (!this.projectEngine.hasWorkingDays()) {
      return emptyResult("Kalender heeft geen werkdagen ingesteld");
    }
    for (const task of this.tasks.values()) {
      if (isNaN(parseDate(task.time.scheduleStart).getTime())) {
        return emptyResult(`Ongeldige startdatum voor taak "${task.name}"`);
      }
    }
    const dd = this.options.dataDate ? this.parseIn(this.projectEngine, this.options.dataDate) : null;
    this.dataDate = dd && !isNaN(dd.getTime()) ? this.snapOnOrAfter(this.projectEngine, dd) : null;
    const order = this.topologicalSort();
    const earlyDates = this.forwardPass(order);
    const lateDates = this.backwardPass(order, earlyDates);
    this.applyAlap(order, earlyDates, lateDates);
    const outOfSequenceSequenceIds = this.detectOutOfSequence(earlyDates);
    const result = computeScheduleResults({
      order,
      earlyDates,
      lateDates,
      outOfSequenceSequenceIds,
      tasks: this.tasks,
      sequences: this.sequences,
      successors: this.successors,
      seqConstraint: this.seqConstraint,
      schedulingOptions: this.options.schedulingOptions,
      dataDate: this.dataDate,
      truncatedLeadIds: this.truncatedLeadIds,
      hardPinViolatedIds: this.hardPinViolatedIds,
      hammockNoFinishDriverIds: this.hammockNoFinishDriverIds,
      projectEngine: this.projectEngine,
      calendarFor: (t) => this.calendarFor(t),
      signedFloat: (a, b, eng) => this.signedFloat(a, b, eng),
      constraintInstant: (c, eng) => this.constraintInstant(c, eng),
      snapOnOrAfter: (eng, d) => this.snapOnOrAfter(eng, d),
      snapOnOrBefore: (eng, d) => this.snapOnOrBefore(eng, d),
      modeOf: (eng) => this.modeOf(eng)
    });
    if (this.cappedTaskIds.length > 0) result.cappedTaskIds = [...this.cappedTaskIds];
    return result;
  }
  /** Detect cycles using DFS. Returns array of task IDs in the cycle, or null. */
  detectCycle() {
    const color = /* @__PURE__ */ new Map();
    const parent = /* @__PURE__ */ new Map();
    for (const id of this.tasks.keys()) {
      color.set(id, 0);
    }
    for (const id of this.tasks.keys()) {
      if (color.get(id) === 0) {
        const cycle = this.dfsVisit(id, color, parent);
        if (cycle) return cycle;
      }
    }
    return null;
  }
  dfsVisit(u, color, parent) {
    color.set(u, 1);
    for (const seq of this.successors.get(u) || []) {
      const v = seq.successorId;
      if (!this.tasks.has(v)) continue;
      if (color.get(v) === 1) {
        const cycle = [v, u];
        let current2 = u;
        while (current2 !== v) {
          const p = parent.get(current2);
          if (p === null || p === void 0) break;
          cycle.push(p);
          current2 = p;
          if (current2 === v) break;
        }
        cycle.reverse();
        return cycle;
      }
      if (color.get(v) === 0) {
        parent.set(v, u);
        const cycle = this.dfsVisit(v, color, parent);
        if (cycle) return cycle;
      }
    }
    color.set(u, 2);
    return null;
  }
  topologicalSort() {
    const inDegree = /* @__PURE__ */ new Map();
    for (const id of this.tasks.keys()) {
      inDegree.set(id, 0);
    }
    for (const seq of this.sequences) {
      inDegree.set(seq.successorId, (inDegree.get(seq.successorId) || 0) + 1);
    }
    const queue = [];
    for (const [id, deg] of inDegree) {
      if (deg === 0) queue.push(id);
    }
    const result = [];
    while (queue.length > 0) {
      const id = queue.shift();
      result.push(id);
      for (const seq of this.successors.get(id) || []) {
        const newDeg = (inDegree.get(seq.successorId) || 1) - 1;
        inDegree.set(seq.successorId, newDeg);
        if (newDeg === 0) queue.push(seq.successorId);
      }
    }
    for (const id of this.tasks.keys()) {
      if (!result.includes(id)) result.push(id);
    }
    return result;
  }
  forwardPass(order) {
    const results = /* @__PURE__ */ new Map();
    let projectStart = null;
    for (const t of this.tasks.values()) {
      if ((this.predecessors.get(t.id) || []).length > 0) continue;
      const eng = this.calendarFor(t);
      const s = this.snapOnOrAfter(eng, this.parseIn(eng, t.time.scheduleStart));
      if (!projectStart || s < projectStart) projectStart = s;
    }
    for (const taskId of order) {
      const task = this.tasks.get(taskId);
      const cal = this.calendarFor(task);
      const preds = this.predecessors.get(taskId) || [];
      if (task.isHammock) {
        const es = this.hammockEarlyStart(task, preds, results, projectStart, cal);
        const { ef, hasFinishDriver } = this.hammockEarlyFinish(task, preds, results, es, cal);
        if (!hasFinishDriver) this.hammockNoFinishDriverIds.push(taskId);
        if (cal.isHourMode) {
          const mins = cal.workMinutesBetween(es, ef);
          task.time.durationMinutes = mins;
          task.time.scheduleDuration = mins / (cal.hoursPerDay * 60);
        } else {
          task.time.scheduleDuration = cal.workDaysBetween(es, ef);
        }
        results.set(taskId, { es, ef });
        continue;
      }
      let earlyStart;
      if (preds.length === 0) {
        earlyStart = this.snapOnOrAfter(cal, this.parseIn(cal, task.time.scheduleStart));
        earlyStart = this.applyForwardConstraints(task, earlyStart, null, cal);
        earlyStart = this.snapOnOrAfter(cal, earlyStart);
      } else {
        earlyStart = projectStart ? new Date(projectStart.getTime()) : /* @__PURE__ */ new Date(0);
        let rawMax = null;
        for (const seq of preds) {
          const predResult = results.get(seq.predecessorId);
          const predTask = this.tasks.get(seq.predecessorId);
          if (!predResult || !predTask) continue;
          const constraintDate = forwardConstraint(
            this.relDeps,
            predResult,
            predTask,
            seq,
            task,
            this.calendarFor(predTask),
            cal
          );
          this.seqConstraint.set(seq.id, constraintDate);
          if (!rawMax || constraintDate > rawMax) rawMax = constraintDate;
          if (constraintDate > earlyStart) {
            earlyStart = constraintDate;
          }
        }
        if (rawMax && projectStart && rawMax < projectStart) {
          for (const seq of preds) {
            const c = this.seqConstraint.get(seq.id);
            const predTask = this.tasks.get(seq.predecessorId);
            if (!c || !predTask) continue;
            const predLagDays = resolveEffectiveLagDays(
              seq,
              predTask,
              this.calendarFor(predTask).hoursPerDay
            );
            if (formatDate(c) === formatDate(rawMax) && predLagDays < 0) {
              this.truncatedLeadIds.push(seq.id);
            }
          }
        }
        earlyStart = this.applyForwardConstraints(task, earlyStart, rawMax, cal);
        earlyStart = this.snapOnOrAfter(cal, earlyStart);
      }
      if (task.levelingDelay) {
        earlyStart = cal.addWorkingDaysSigned(earlyStart, task.levelingDelay);
      }
      const dataDate = this.dataDate;
      if (dataDate) {
        const t = task.time;
        if (t.actualFinish && t.completion >= 1) {
          let es = this.snapOnOrAfter(cal, this.parseIn(cal, t.actualStart ?? t.actualFinish));
          let ef = task.isMilestone ? this.snapOnOrAfter(cal, this.parseIn(cal, t.actualFinish)) : this.snapOnOrBefore(cal, this.parseIn(cal, t.actualFinish));
          if (ef < es) es = ef;
          results.set(taskId, { es, ef });
          continue;
        }
        if ((t.actualStart || t.completion > 0) && t.completion < 1) {
          const actualES = t.actualStart ? this.snapOnOrAfter(cal, this.parseIn(cal, t.actualStart)) : earlyStart;
          const remaining = cal.isHourMode ? Math.max(0, t.remainingMinutes ?? Math.round(durationMinutesOf(task, cal) * (1 - t.completion))) : Math.max(0, t.remainingTime ?? Math.round(t.scheduleDuration * (1 - t.completion)));
          let remStart = dataDate;
          if (this.options.progressMode !== "PROGRESS_OVERRIDE") {
            if (earlyStart > remStart) remStart = earlyStart;
          }
          let ef;
          if (cal.isHourMode) {
            ef = cal.addWorkMinutes(remStart, remaining);
          } else {
            const r = cal.addWorkDaysChecked(remStart, remaining);
            ef = r.date;
            if (r.capped) this.cappedTaskIds.push(taskId);
          }
          results.set(taskId, { es: actualES, ef });
          continue;
        }
        if (t.completion === 0 && earlyStart < dataDate) {
          earlyStart = dataDate;
        }
      }
      const { date: earlyFinish, capped } = this.addDurationChecked(cal, earlyStart, task);
      if (capped) this.cappedTaskIds.push(taskId);
      results.set(taskId, { es: earlyStart, ef: earlyFinish });
    }
    return results;
  }
  /** Hammock-ES (§4.4): de gewone forward-`max` over de START-drivers (SS/FS-voorgangers), met de
   *  projectstart als vloer. FF/SF-voorgangers (finish-drivers) doen hier NIET mee — die bepalen de
   *  EF. `forwardConstraint` levert voor SS/FS een start-grens; `seqConstraint` wordt bewust NIET
   *  gezet, zodat de hammock-relaties buiten de driving-/float-path-analyse blijven (§4.4). */
  hammockEarlyStart(task, preds, results, projectStart, cal) {
    let es = projectStart ? new Date(projectStart.getTime()) : /* @__PURE__ */ new Date(0);
    for (const seq of preds) {
      if (seq.type !== "START_START" && seq.type !== "FINISH_START") continue;
      const predResult = results.get(seq.predecessorId);
      const predTask = this.tasks.get(seq.predecessorId);
      if (!predResult || !predTask) continue;
      const c = forwardConstraint(
        this.relDeps,
        predResult,
        predTask,
        seq,
        task,
        this.calendarFor(predTask),
        cal
      );
      if (c > es) es = c;
    }
    return this.snapOnOrAfter(cal, es);
  }
  /** Hammock-EF (§4.4): de `max` over de FINISH-drivers (FF/SF-voorgangers), met ondergrens `es` (een
   *  hammock is nooit negatief lang). `forwardConstraint` levert de start-equivalente grens; die
   *  wordt via `finishFromStart` terug naar de finish-grens vertaald (de duur-conversie valt weg — de
   *  finish is duur-onafhankelijk, dus idempotent ongeacht de genegeerde duur-invoer). Zonder
   *  finish-driver valt EF terug op ES (nul-lengte, met waarschuwing bij de aanroeper). */
  hammockEarlyFinish(task, preds, results, es, cal) {
    let ef = null;
    for (const seq of preds) {
      if (seq.type !== "FINISH_FINISH" && seq.type !== "START_FINISH") continue;
      const predResult = results.get(seq.predecessorId);
      const predTask = this.tasks.get(seq.predecessorId);
      if (!predResult || !predTask) continue;
      const startEquiv = forwardConstraint(
        this.relDeps,
        predResult,
        predTask,
        seq,
        task,
        this.calendarFor(predTask),
        cal
      );
      const finishBound = this.finishFromStart(cal, startEquiv, task);
      if (!ef || finishBound > ef) ef = finishBound;
    }
    const hasFinishDriver = ef !== null;
    let earlyFinish = ef ?? new Date(es.getTime());
    if (earlyFinish < es) earlyFinish = new Date(es.getTime());
    return { ef: earlyFinish, hasFinishDriver };
  }
  /**
   * Out-of-sequence-detectie (fase 2.6, §4.4): relaties waarvan de opvolger progress/actuals heeft
   * die de voorganger-logica tegenspreekt. Waarschuwing, geen correctie — het gedrag volgt uit de
   * die de voorganger-logica tegenspreekt. Waarschuwing, geen correctie — het gedrag volgt uit de
   * gekozen progressMode. Zonder statusdatum: geen detectie (no-op, backwards-compat).
   */
  detectOutOfSequence(earlyDates) {
    if (!this.dataDate) return [];
    const out = [];
    for (const seq of this.sequences) {
      const pred = this.tasks.get(seq.predecessorId);
      const succ = this.tasks.get(seq.successorId);
      if (!pred || !succ) continue;
      const succEng = this.calendarFor(succ);
      const predEng = this.calendarFor(pred);
      const succAS = succ.time.actualStart ? this.parseIn(succEng, succ.time.actualStart) : null;
      const succAF = succ.time.actualFinish ? this.parseIn(succEng, succ.time.actualFinish) : null;
      const predAS = pred.time.actualStart ? this.parseIn(predEng, pred.time.actualStart) : null;
      const predAF = pred.time.actualFinish ? this.parseIn(predEng, pred.time.actualFinish) : null;
      const predEF = earlyDates.get(seq.predecessorId)?.ef ?? null;
      switch (seq.type) {
        case "START_START": {
          if (succAS && predAS && succAS < predAS) out.push(seq.id);
          break;
        }
        case "FINISH_FINISH":
        case "START_FINISH": {
          if (succAF) {
            const predFin = predAF ?? predEF;
            if (!predAF || predFin && succAF < predFin) out.push(seq.id);
          }
          break;
        }
        case "FINISH_START":
        default: {
          if (succAS) {
            const prefEF = predAF ?? predEF;
            if (!predAF || prefEF && succAS < prefEF) out.push(seq.id);
          }
          break;
        }
      }
    }
    return out;
  }
  /** Getekend werkdag-verschil in kalender `eng`: a≤b ⇒ +stappen, a>b ⇒ −stappen (negatief mogelijk). */
  signedWorkDays(a, b, eng) {
    return a <= b ? eng.workDaysBetween(a, b) - 1 : -(eng.workDaysBetween(b, a) - 1);
  }
  /** Constraint-instant in de kalendermodus (§4.1), of null bij afwezig/onparseerbaar (soft:
   *  negeren). Dag ⇒ `parseDate` (middernacht, byte-identiek); uur ⇒ `parseInstant` (behoudt tijd-
   *  van-de-dag). Een date-only-string op een uur-taak = middernacht ⇒ dag-verankerd: de instant-
   *  vinders snappen hem naar de eerste/laatste werk-instant van die dag (S13). Een datetime-string
   *  draagt tijd-van-de-dag en wordt tot de minuut gehonoreerd. */
  constraintInstant(c, eng) {
    const raw = c?.date;
    if (!raw) return null;
    const d = this.parseIn(eng, raw);
    return isNaN(d.getTime()) ? null : d;
  }
  /** De harde-pin-START (§4.2), of null als de PRIMAIRE constraint geen harde MSO/MFO-pin is.
   *  MSO pint de START op de datum; MFO pint de FINISH ⇒ start = finish ⊖ duur. Modus-neutraal
   *  (dag: bevroren dag-primitieven; uur: instant-vinders + minuut-aftrek via `durationMinutesOf`). */
  hardPinStart(task, eng) {
    const c = task.constraint;
    if (!c?.hard || c.type !== "MSO" && c.type !== "MFO") return null;
    const d = this.constraintInstant(c, eng);
    if (!d) return null;
    const snapped = this.snapOnOrAfter(eng, d);
    return c.type === "MSO" ? snapped : this.startFromFinish(eng, snapped, task);
  }
  /** De harde-pin-FINISH (§4.2), spiegel van `hardPinStart` (⇒ EF=LF én ES=LS op de pin, tf=0).
   *  MFO: EF = snap(datum); MSO: EF = gepinde-start ⊕ duur. */
  hardPinFinish(task, eng) {
    const c = task.constraint;
    if (!c?.hard || c.type !== "MSO" && c.type !== "MFO") return null;
    const d = this.constraintInstant(c, eng);
    if (!d) return null;
    const snapped = this.snapOnOrAfter(eng, d);
    return c.type === "MFO" ? snapped : this.addDuration(eng, snapped, task);
  }
  /**
   * Detector-gate voor de harde-pin-logica-schending (fase 2.10, P1). Een taak met een geregistreerd
   * feit (`actualStart` gezet voor MSO, `actualFinish` gezet voor MFO) waarvan dat feit EXACT op de
   * pin valt, heeft de pin al aantoonbaar gerespecteerd — een later/gevloerd berekende voorganger-EF
   * (`rawMax`, bv. via een niet-afgemelde startmijlpaal die door de data-date-vloer omhoog is
   * geschoven) is dan een achterhaald forward-signaal, geen echte logica-schending. Wijkt het
   * geregistreerde feit zelf af van de pin (te vroeg/te laat), of ontbreekt het feit nog, dan gate
   * dit NIETS — de bestaande melding blijft vuren. Bewust smal: alleen dit ene detector-moment,
   * de data-date-vloer zelf (§P6) blijft ongewijzigd.
   */
  hardPinRespectedByActual(task, eng) {
    const c = task.constraint;
    if (!c?.hard || c.type !== "MSO" && c.type !== "MFO") return false;
    const t = task.time;
    if (c.type === "MSO") {
      if (!t.actualStart) return false;
      const pin = this.hardPinStart(task, eng);
      if (!pin) return false;
      const actualES = this.snapOnOrAfter(eng, this.parseIn(eng, t.actualStart));
      return formatDate(actualES) === formatDate(pin);
    }
    if (!t.actualFinish) return false;
    const pinFinish = this.hardPinFinish(task, eng);
    if (!pinFinish) return false;
    const actualEF = this.snapOnOrAfter(eng, this.parseIn(eng, t.actualFinish));
    return formatDate(actualEF) === formatDate(pinFinish);
  }
  /** Forward-ondergrens (start) van ÉÉN soft constraint (§4.1/§4.3), of null zonder forward-effect.
   *  SNET/MSO ⇒ start-ondergrens; FNET/MFO ⇒ finish-ondergrens vertaald naar de start. Dag-modus
   *  reduceert byte-identiek tot `nextWorkDay`/`addWorkingDaysSigned`; uur-modus gebruikt de instant-
   *  vinders + de minuut-aftrek van `startFromFinish` (via `durationMinutesOf`). */
  forwardBoundOf(task, c, eng) {
    const d = this.constraintInstant(c, eng);
    if (!c || !d) return null;
    if (c.type === "SNET" || c.type === "MSO") return this.snapOnOrAfter(eng, d);
    if (c.type === "FNET" || c.type === "MFO") {
      return this.startFromFinish(eng, this.snapOnOrAfter(eng, d), task);
    }
    return null;
  }
  /** Backward-bovengrens (late finish) van ÉÉN soft constraint (§4.1/§4.3), of null zonder backward-
   *  effect. FNLT/MFO ⇒ finish-bovengrens direct; SNLT/MSO ⇒ start-bovengrens vertaald naar de finish.
   *  Dag-modus byte-identiek (`prevWorkDay`/`addWorkingDaysSigned`); uur-modus via de instant-vinders. */
  backwardBoundOf(task, c, eng) {
    const d = this.constraintInstant(c, eng);
    if (!c || !d) return null;
    const dW = this.snapOnOrBefore(eng, d);
    if (c.type === "FNLT" || c.type === "MFO") return dW;
    if (c.type === "SNLT" || c.type === "MSO") return this.finishFromStart(eng, dW, task);
    return null;
  }
  /** Externe-link-lag in MINUTEN (uur-modus, §4.5): `lagMinutes` ⇒ bron; anders `lagDays × hoursPerDay ×
   *  60` (naakt getal = werkdagen — dezelfde conventie als de Sequence-lag, 2.8b §3.3). */
  externalLagMinutes(link, eng) {
    if (typeof link.lagMinutes === "number" && Number.isFinite(link.lagMinutes)) return link.lagMinutes;
    const days = typeof link.lagDays === "number" && Number.isFinite(link.lagDays) ? link.lagDays : 0;
    return days * eng.hoursPerDay * 60;
  }
  /** Externe-link-lag in DAGEN (dag-modus). Afwezig ⇒ 0. */
  externalLagDays(link) {
    return typeof link.lagDays === "number" && Number.isFinite(link.lagDays) ? link.lagDays : 0;
  }
  /**
   * Forward-ondergrens (start-equivalent) van een externe PREDECESSOR-link (§4.5). De bevroren
   * `anchorDate` speelt de rol van de driving-datum van de externe taak (de ververs-actie schrijft
   * daar de source-`earlyFinish` bij FS/FF resp. `earlyStart` bij SS/SF in — §refreshExternalAnchors).
   * Het TWEEDE relType-teken bepaalt de zijde: FS/SS ⇒ START-grens, FF/SF ⇒ FINISH-grens (via
   * `startFromFinish` naar een start terugvertaald). Het EERSTE teken de dag-boundary-overgang:
   * alleen FS (externe finish → mijn start) krijgt de `nextWorkDayAfter`-+1 (spiegel van
   * `forwardConstraint` FS); SS/FF/SF ankeren op dezelfde grens (geen +1). In uur-modus valt de
   * +1 weg (continue tijd) ⇒ `nextWorkInstant`. `sourceMissing` speelt GEEN rol — er wordt altijd op
   * het anker gerekend (P6 External Dates). Retourneert null voor een successor-link.
   */
  externalForwardBound(task, link, eng) {
    if (link.direction !== "predecessor") return null;
    const anchor = this.parseIn(eng, link.anchorDate);
    if (isNaN(anchor.getTime())) return null;
    const rel = link.relType;
    const startSide = rel === "FS" || rel === "SS";
    if (eng.isHourMode) {
      const shifted2 = eng.addWorkingMinutesSigned(anchor, this.externalLagMinutes(link, eng));
      return startSide ? shifted2 : this.startFromFinish(eng, shifted2, task);
    }
    const lag = this.externalLagDays(link);
    const base = rel === "FS" ? eng.nextWorkDayAfter(anchor) : anchor;
    const shifted = eng.addWorkingDaysSigned(base, lag);
    return startSide ? shifted : this.startFromFinish(eng, shifted, task);
  }
  /**
   * Backward-bovengrens (late finish) van een externe SUCCESSOR-link (§4.5). Spiegel van
   * `externalForwardBound`: `anchorDate` is de driving-datum van de externe opvolger. Het EERSTE
   * relType-teken bepaalt mijn zijde: FS/FF ⇒ LF-grens direct; SS/SF ⇒ LS-grens (via `finishFromStart`
   * naar mijn LF vertaald). De dag-boundary-overgang zit alleen op FS (mijn finish → externe start ⇒
   * `prevWorkDayBefore`, spiegel van de forward-FS); SS/FF/SF ankeren op `prevWorkDay`. Uur-modus:
   * continue tijd ⇒ geen −1. Retourneert null voor een predecessor-link.
   */
  externalBackwardBound(task, link, eng) {
    if (link.direction !== "successor") return null;
    const anchor = this.parseIn(eng, link.anchorDate);
    if (isNaN(anchor.getTime())) return null;
    const rel = link.relType;
    const finishSide = rel === "FS" || rel === "FF";
    if (eng.isHourMode) {
      const shifted2 = eng.addWorkingMinutesSigned(anchor, -this.externalLagMinutes(link, eng));
      return finishSide ? shifted2 : this.finishFromStart(eng, shifted2, task);
    }
    const lag = this.externalLagDays(link);
    const base = rel === "FS" ? eng.prevWorkDayBefore(anchor) : eng.prevWorkDay(anchor);
    const shifted = eng.addWorkingDaysSigned(base, -lag);
    return finishSide ? shifted : this.finishFromStart(eng, shifted, task);
  }
  /**
   * Vroege-zijde constraints (fase 2.3, uitgebreid 2.9 §4.1-4.3). Een harde MSO/MFO-pin
   * OVERSCHRIJFT de voorganger-druk onvoorwaardelijk (barrière, §4.2) en registreert een
   * logica-schending zodra die druk (`rawMax`, of null bij een worteltaak) later valt dan de pin
   * — dán start de taak vóór z'n voorganger klaar is. Zonder pin stapelen de PRIMAIRE en
   * SECUNDAIRE forward-constraints (SNET/FNET/MSO/MFO) als max-ondergrenzen. `hard`/`constraint2`
   * afwezig ⇒ exact de bestaande soft-tak (byte-identiek: de 319 cases kennen ze nergens).
   */
  applyForwardConstraints(task, earlyStart, rawMax, eng) {
    const pin = this.hardPinStart(task, eng);
    if (pin) {
      if (rawMax && rawMax > pin && !this.hardPinRespectedByActual(task, eng)) {
        this.hardPinViolatedIds.push(task.id);
      }
      return pin;
    }
    let es = earlyStart;
    for (const cc of [task.constraint, task.constraint2]) {
      const bound = this.forwardBoundOf(task, cc, eng);
      if (bound && bound > es) es = bound;
    }
    if (task.externalLinks && task.externalLinks.length > 0) {
      for (const link of task.externalLinks) {
        const bound = this.externalForwardBound(task, link, eng);
        if (bound && bound > es) es = bound;
      }
    }
    return es;
  }
  /**
   * Late-zijde grenzen (fase 2.3, uitgebreid 2.9 §4.1-4.3). Een harde MSO/MFO-pin zet de late
   * finish ONVOORWAARDELIJK op de gepinde waarde (override de successor-druk) ⇒ LS=ES/LF=EF ⇒
   * tf=0 op de pin, en een strengere late-constraint verder downstream propageert zijn negatieve
   * float NIET dóór de pin heen (P6-barrière, §4.2). Zonder pin stapelen de PRIMAIRE en SECUNDAIRE
   * backward-constraints (SNLT/FNLT/MSO/MFO) + de zachte deadline als min-bovengrenzen; vroege
   * datums bewegen nooit, overschrijding wordt negatieve float.
   */
  applyBackwardBound(task, lateFinish, eng) {
    const pinFinish = this.hardPinFinish(task, eng);
    if (pinFinish) return pinFinish;
    let lf = lateFinish;
    for (const cc of [task.constraint, task.constraint2]) {
      const bound = this.backwardBoundOf(task, cc, eng);
      if (bound && bound < lf) lf = bound;
    }
    if (task.externalLinks && task.externalLinks.length > 0) {
      for (const link of task.externalLinks) {
        const bound = this.externalBackwardBound(task, link, eng);
        if (bound && bound < lf) lf = bound;
      }
    }
    if (task.deadline) {
      const dl = parseDate(task.deadline);
      if (!isNaN(dl.getTime())) {
        const dlW = eng.prevWorkDay(dl);
        if (dlW < lf) lf = dlW;
      }
    }
    return lf;
  }
  /**
   * ALAP (P6-semantiek, zero free float): schuif de vroege datums van ALAP-taken op met
   * hun eigen vrije speling — opvolgers bewegen per definitie niet. Draait ná de backward
   * pass; de constraint-cache van uitgaande relaties wordt geactualiseerd zodat de
   * relatie-floats en driving-markering daarna kloppen (de relatie wordt precies bindend).
   */
  applyAlap(order, earlyDates, lateDates) {
    for (const taskId of order) {
      const task = this.tasks.get(taskId);
      if (task?.constraint?.type !== "ALAP") continue;
      const early = earlyDates.get(taskId);
      const late = lateDates.get(taskId);
      if (!early || !late) continue;
      const cal = this.calendarFor(task);
      const succs = this.successors.get(taskId) || [];
      let ff = Infinity;
      if (succs.length === 0) {
        ff = this.signedWorkDays(early.ef, late.lf, cal);
      } else {
        for (const seq of succs) {
          const cRaw = this.seqConstraint.get(seq.id);
          const succEarly = earlyDates.get(seq.successorId);
          const succTask = this.tasks.get(seq.successorId);
          if (!cRaw || !succEarly || !succTask) continue;
          const succCal = this.calendarFor(succTask);
          const f = succCal.workDaysBetween(succCal.nextWorkDay(cRaw), succEarly.es) - 1;
          if (f < ff) ff = f;
        }
      }
      if (!Number.isFinite(ff) || ff <= 0) continue;
      early.es = cal.addWorkingDaysSigned(early.es, ff);
      early.ef = cal.addWorkingDaysSigned(early.ef, ff);
      for (const seq of succs) {
        const succTask = this.tasks.get(seq.successorId);
        if (!succTask) continue;
        this.seqConstraint.set(
          seq.id,
          forwardConstraint(this.relDeps, early, task, seq, succTask, cal, this.calendarFor(succTask))
        );
      }
    }
  }
  /** Effectieve lag van een relatie: dagen (via resolveEffectiveLagDays) + eenheid. De dag↔minuut-
   *  factor waarmee een `lagMinutes`-only-lag in dagen wordt uitgedrukt volgt de eenheid: WORKTIME
   *  telt in WERKuren van de VOORGANGER-kalender (§5.2), ELAPSEDTIME 24/7 in klokuren — exact de
   *  factoren die `resolveLagMinutes`/`resolveElapsedMinutes` in uur-modus gebruiken. */
  resolveLag(seq, predTask, predEng) {
    const unit = seq.lagUnit === "ELAPSEDTIME" ? "ELAPSEDTIME" : "WORKTIME";
    const hpd = unit === "ELAPSEDTIME" ? 24 : predEng.hoursPerDay;
    return { days: resolveEffectiveLagDays(seq, predTask, hpd), unit };
  }
  backwardPass(order, earlyDates) {
    const results = /* @__PURE__ */ new Map();
    let projectEnd = /* @__PURE__ */ new Date(0);
    for (const { ef } of earlyDates.values()) {
      if (ef > projectEnd) projectEnd = ef;
    }
    const reversed = [...order].reverse();
    for (const taskId of reversed) {
      const task = this.tasks.get(taskId);
      const succs = this.successors.get(taskId) || [];
      if (task.isHammock) {
        const ed = earlyDates.get(taskId);
        results.set(taskId, { ls: new Date(ed.es.getTime()), lf: new Date(ed.ef.getTime()) });
        continue;
      }
      const predCal = this.calendarFor(task);
      let lateFinish = projectEnd;
      for (const seq of succs) {
        const succResult = results.get(seq.successorId);
        const succTask = this.tasks.get(seq.successorId);
        if (!succResult || !succTask) continue;
        if (succTask.isHammock) continue;
        const constraintDate = backwardConstraint(
          this.relDeps,
          succResult,
          seq,
          task,
          succTask,
          predCal,
          this.calendarFor(succTask)
        );
        if (constraintDate < lateFinish) {
          lateFinish = constraintDate;
        }
      }
      lateFinish = this.applyBackwardBound(task, lateFinish, predCal);
      const lateStart = this.subDuration(predCal, lateFinish, task);
      results.set(taskId, { ls: lateStart, lf: lateFinish });
    }
    return results;
  }
};

// src/engine/moveProject.ts
function shiftIso(iso2, deltaDays) {
  if (!iso2) return iso2;
  if (!Number.isFinite(deltaDays) || deltaDays === 0) return iso2;
  const mode = iso2.includes("T") ? "hour" : "day";
  const d = parseInstant(iso2);
  if (isNaN(d.getTime())) return iso2;
  return formatInstant(addCalendarDays(d, deltaDays), mode);
}
function computeMoveDelta(currentStart, newStart) {
  if (!currentStart || !newStart) return NaN;
  const d = diffDays(currentStart, newStart);
  return Number.isFinite(d) ? d : NaN;
}
function isUsableIso(iso2) {
  return !!iso2 && !isNaN(parseInstant(iso2).getTime());
}
function shiftConstraint(c, delta) {
  if (!c) return c;
  if (c.date === void 0) return { ...c };
  return { ...c, date: shiftIso(c.date, delta) };
}
function shiftTask(task, delta) {
  const t = task.time;
  const next = {
    ...task,
    time: {
      ...t,
      scheduleStart: shiftIso(t.scheduleStart, delta),
      scheduleFinish: shiftIso(t.scheduleFinish, delta),
      actualStart: shiftIso(t.actualStart, delta),
      actualFinish: shiftIso(t.actualFinish, delta)
    }
  };
  if (task.constraint) next.constraint = shiftConstraint(task.constraint, delta);
  if (task.constraint2) next.constraint2 = shiftConstraint(task.constraint2, delta);
  if (task.deadline !== void 0) next.deadline = shiftIso(task.deadline, delta);
  if (task.externalLinks) {
    next.externalLinks = task.externalLinks.map((l) => ({
      ...l,
      anchorDate: shiftIso(l.anchorDate, delta)
      // sourceMissing BEWUST ongemoeid (R6): dat veld betekent "bron niet vindbaar", niet
      // "anker verouderd"; misbruiken zou de ghost-weergave vervuilen.
    }));
  }
  return next;
}
function shiftProjectDates(project, delta) {
  const next = {
    ...project,
    startDate: shiftIso(project.startDate, delta),
    endDate: shiftIso(project.endDate, delta)
    // '' blijft ''
  };
  if (project.statusDate !== void 0) next.statusDate = shiftIso(project.statusDate, delta);
  return next;
}
function shiftResource(resource, delta) {
  if (!resource.availabilitySteps?.length) return { ...resource };
  return {
    ...resource,
    availabilitySteps: resource.availabilitySteps.map((s) => ({ ...s, from: shiftIso(s.from, delta) }))
  };
}
function shiftBaseline(baseline, delta) {
  return {
    ...baseline,
    projectEnd: shiftIso(baseline.projectEnd, delta),
    tasks: baseline.tasks.map((bt) => ({
      ...bt,
      start: shiftIso(bt.start, delta),
      finish: shiftIso(bt.finish, delta)
    }))
  };
}
function computeMoveImpact(tasks, resources, baselines, customFieldDefs) {
  const dateDefIds = new Set(customFieldDefs.filter((d) => d.type === "date").map((d) => d.id));
  const impact = {
    taskCount: 0,
    constraintCount: 0,
    hardPinCount: 0,
    deadlineCount: 0,
    actualCount: 0,
    externalLinkCount: 0,
    availabilityStepCount: 0,
    dateCustomFieldCount: 0,
    baselineCount: baselines.length
  };
  for (const t of tasks) {
    const hasConstraintDate = isUsableIso(t.constraint?.date) || isUsableIso(t.constraint2?.date);
    const hasDeadline = isUsableIso(t.deadline);
    const hasActual = isUsableIso(t.time.actualStart) || isUsableIso(t.time.actualFinish);
    const links = t.externalLinks?.filter((l) => isUsableIso(l.anchorDate)) ?? [];
    if (isUsableIso(t.time.scheduleStart) || isUsableIso(t.time.scheduleFinish) || hasConstraintDate || hasDeadline || hasActual || links.length > 0) impact.taskCount++;
    if (hasConstraintDate) impact.constraintCount++;
    if (t.constraint?.hard === true) impact.hardPinCount++;
    if (hasDeadline) impact.deadlineCount++;
    if (hasActual) impact.actualCount++;
    impact.externalLinkCount += links.length;
    for (const defId of dateDefIds) {
      const v = t.customFields?.[defId];
      if (v !== void 0 && v !== null && v !== "") impact.dateCustomFieldCount++;
    }
  }
  for (const r of resources) {
    impact.availabilityStepCount += r.availabilitySteps?.length ?? 0;
  }
  return impact;
}
function computeHolidayGaps(calendars, newStartIso, newEndIso) {
  const yearOf = (iso2) => {
    if (!iso2) return null;
    const d = parseDate(iso2);
    return isNaN(d.getTime()) ? null : d.getUTCFullYear();
  };
  const startYear = yearOf(newStartIso);
  const endYear = yearOf(newEndIso) ?? startYear;
  if (startYear === null || endYear === null) return [];
  const seen = /* @__PURE__ */ new Set();
  const gaps = [];
  for (const cal of calendars) {
    if (!cal?.generation) continue;
    if (seen.has(cal.id)) continue;
    seen.add(cal.id);
    const { generatedFromYear: from, generatedToYear: to } = cal.generation;
    if (endYear > to) gaps.push({ name: cal.name, from, to, year: endYear });
    else if (startYear < from) gaps.push({ name: cal.name, from, to, year: startYear });
  }
  return gaps;
}

// src/state/defaults.ts
function createDefaultProject() {
  return {
    id: generateId("proj"),
    // Een vers project is NAAMLOOS in de data. Hier een (Nederlandse) tekst stempelen zou die taal
    // in het IFC-bestand bakken en nooit meer meeveranderen met de UI-taal; elke weergaveplek valt
    // daarom bij een lege naam terug op `common:project.untitled`.
    name: "",
    description: "",
    startDate: formatDate(/* @__PURE__ */ new Date()),
    endDate: "",
    calendarId: "cal-default",
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    modifiedAt: (/* @__PURE__ */ new Date()).toISOString(),
    author: "",
    company: "",
    // Nieuwe projecten nummeren de WBS automatisch; geladen bestanden zonder
    // vlag blijven op vrije tekst (zie Project.wbsAutoNumber).
    wbsAutoNumber: true
  };
}
function createDefaultView() {
  return {
    scrollX: 0,
    scrollY: 0,
    zoom: 30,
    // pixels per dag
    timeScale: "week",
    viewStartDate: formatDate(/* @__PURE__ */ new Date()),
    filter: null,
    group: [],
    sort: [],
    collapsedGroupKeys: []
  };
}

// src/state/syncProjectCalendar.ts
function syncProjectCalendar(s) {
  const entry = s.calendars.find((c) => c.id === s.project.calendarId);
  if (entry) s.calendar = entry;
  else promoteProjectCalendarToLibrary(s);
}
function promoteProjectCalendarToLibrary(s) {
  if (s.calendars.some((c) => c.id === s.project.calendarId)) return;
  s.calendars = [...s.calendars, { ...s.calendar, name: s.calendar.name || "Projectkalender" }];
}

// src/state/documentContract.ts
function field(d) {
  return d;
}
function normalizeView(v) {
  const legacyGroupBy = v.groupBy;
  const group = v.group && v.group.length > 0 ? v.group : legacyGroupBy ? [{ field: { src: "activityCode", typeId: legacyGroupBy }, dir: "asc" }] : [];
  const out = {
    ...v,
    filter: v.filter ?? null,
    group,
    sort: v.sort ?? [],
    collapsedGroupKeys: v.collapsedGroupKeys ?? []
  };
  delete out.groupBy;
  return out;
}
var DOCUMENT_FIELDS = [
  // Pakket H: `project` doet VOLLEDIG mee in de snapshot (was 'none' met een nauwe wbsAutoNumber-
  // projectie). Voorwaarde daarvoor — elke project-mutator pusht zelf een snapshot — is vervuld in
  // projectSlice; zie de kop van snapshot.ts.
  field({ key: "project", get: (s) => s.project, set: (s, v) => {
    s.project = v;
  }, fresh: createDefaultProject, snapshot: "clone" }),
  // De gedenormaliseerde projectkalender-cache rijdt mee (§9.1): `restoreSnapshot` synct hem ná de
  // restore alsnog uit `calendars`, maar zonder eigen snapshot-waarde zou de undo-orphan-fallback
  // (`promoteProjectCalendarToLibrary`) de NIEUWE cache promoveren i.p.v. de oude.
  field({ key: "calendar", get: (s) => s.calendar, set: (s, v) => {
    s.calendar = v;
  }, fresh: createDefaultCalendar, snapshot: "clone" }),
  field({ key: "tasks", get: (s) => s.tasks, set: (s, v) => {
    s.tasks = v;
  }, fresh: () => [], snapshot: "clone" }),
  field({ key: "sequences", get: (s) => s.sequences, set: (s, v) => {
    s.sequences = v;
  }, fresh: () => [], snapshot: "clone" }),
  field({ key: "resources", get: (s) => s.resources, set: (s, v) => {
    s.resources = v;
  }, fresh: () => [], snapshot: "clone" }),
  field({ key: "assignments", get: (s) => s.assignments, set: (s, v) => {
    s.assignments = v;
  }, fresh: () => [], snapshot: "clone" }),
  field({
    key: "calendars",
    get: (s) => s.calendars,
    set: (s, v) => {
      s.calendars = v;
    },
    fresh: () => [],
    snapshot: "clone",
    // Lees-alias (§4.2): oude payloads dragen `resourceCalendars`; nieuwe `calendars`.
    fromPayload: (p) => p.calendars ?? p.resourceCalendars ?? []
  }),
  field({ key: "activityCodeTypes", get: (s) => s.activityCodeTypes, set: (s, v) => {
    s.activityCodeTypes = v;
  }, fresh: () => [], snapshot: "clone", fromPayload: (p) => p.activityCodeTypes ?? [] }),
  field({ key: "customFieldDefs", get: (s) => s.customFieldDefs, set: (s, v) => {
    s.customFieldDefs = v;
  }, fresh: () => [], snapshot: "clone", fromPayload: (p) => p.customFieldDefs ?? [] }),
  field({ key: "selectedTaskIds", get: (s) => s.selectedTaskIds, set: (s, v) => {
    s.selectedTaskIds = v;
  }, fresh: () => [], snapshot: "none" }),
  field({ key: "cpmResult", get: (s) => s.cpmResult, set: (s, v) => {
    s.cpmResult = v;
  }, fresh: () => null, snapshot: "ref" }),
  field({ key: "resourceLoadResult", get: (s) => s.resourceLoadResult, set: (s, v) => {
    s.resourceLoadResult = v;
  }, fresh: () => null, snapshot: "ref", fromPayload: (p) => p.resourceLoadResult ?? null }),
  field({ key: "scheduleStale", get: (s) => s.scheduleStale, set: (s, v) => {
    s.scheduleStale = v;
  }, fresh: () => false, snapshot: "ref", fromPayload: (p) => p.scheduleStale ?? false }),
  field({ key: "baselines", get: (s) => s.baselines, set: (s, v) => {
    s.baselines = v;
  }, fresh: () => [], snapshot: "clone", fromPayload: (p) => p.baselines ?? [] }),
  field({ key: "activeBaselineId", get: (s) => s.activeBaselineId, set: (s, v) => {
    s.activeBaselineId = v;
  }, fresh: () => null, snapshot: "ref", fromPayload: (p) => p.activeBaselineId ?? null }),
  field({ key: "view", get: (s) => s.view, set: (s, v) => {
    s.view = v;
  }, fresh: createDefaultView, snapshot: "none", fromPayload: (p) => normalizeView(p.view) }),
  // Uitzondering: collapsedTaskIds woont in `s.ui` (wordt wél per-document geswapt).
  field({ key: "collapsedTaskIds", get: (s) => s.ui.collapsedTaskIds, set: (s, v) => {
    s.ui.collapsedTaskIds = v;
  }, fresh: () => [], snapshot: "none" }),
  field({ key: "undoStack", get: (s) => s.undoStack, set: (s, v) => {
    s.undoStack = v;
  }, fresh: () => [], snapshot: "none" }),
  field({ key: "redoStack", get: (s) => s.redoStack, set: (s, v) => {
    s.redoStack = v;
  }, fresh: () => [], snapshot: "none" }),
  field({ key: "filePath", get: (s) => s.filePath, set: (s, v) => {
    s.filePath = v;
  }, fresh: () => null, snapshot: "none" }),
  field({ key: "fileHandle", get: (s) => s.fileHandle, set: (s, v) => {
    s.fileHandle = v;
  }, fresh: () => null, snapshot: "none", fromPayload: (p) => p.fileHandle ?? null }),
  field({ key: "isDirty", get: (s) => s.isDirty, set: (s, v) => {
    s.isDirty = v;
  }, fresh: () => false, snapshot: "none" })
];
function readField(f, s) {
  return f.get(s);
}
function writeField(f, s, v) {
  f.set(s, v);
}
function capturePayload(s) {
  const out = {};
  for (const f of DOCUMENT_FIELDS) out[f.key] = readField(f, s);
  return out;
}
function hydratePayload(s, p) {
  const raw = p;
  for (const f of DOCUMENT_FIELDS) {
    writeField(f, s, f.fromPayload ? f.fromPayload(p) : raw[f.key]);
  }
  promoteProjectCalendarToLibrary(s);
  syncProjectCalendar(s);
}
function freshPayload() {
  const out = {};
  for (const f of DOCUMENT_FIELDS) out[f.key] = f.fresh();
  return out;
}
function payloadFromInput(d) {
  return { ...payloadFromImport(d, d.filePath), isDirty: d.isDirty, scheduleStale: true };
}
function payloadFromImport(parsed, filePath) {
  return {
    ...freshPayload(),
    project: parsed.project,
    calendar: parsed.calendar,
    tasks: parsed.tasks,
    sequences: parsed.sequences,
    resources: parsed.resources,
    assignments: parsed.assignments,
    calendars: parsed.resourceCalendars ?? [],
    activityCodeTypes: parsed.activityCodeTypes ?? [],
    customFieldDefs: parsed.customFieldDefs ?? [],
    baselines: parsed.baselines ?? [],
    activeBaselineId: parsed.activeBaselineId ?? null,
    filePath,
    isDirty: false
  };
}

// src/state/snapshot.ts
function deepClone(v) {
  return JSON.parse(JSON.stringify(v));
}
function createSnapshot(s) {
  const snap = {};
  for (const f of DOCUMENT_FIELDS) {
    if (f.snapshot === "none") continue;
    const v = f.get(s);
    snap[f.key] = f.snapshot === "clone" ? deepClone(v) : v;
  }
  return snap;
}
function migrateSnapshot(raw) {
  const legacy = raw;
  return {
    tasks: raw.tasks ?? [],
    sequences: raw.sequences ?? [],
    resources: raw.resources ?? [],
    assignments: raw.assignments ?? [],
    calendars: raw.calendars ?? legacy.resourceCalendars ?? [],
    activityCodeTypes: raw.activityCodeTypes ?? [],
    customFieldDefs: raw.customFieldDefs ?? [],
    cpmResult: raw.cpmResult ?? null,
    resourceLoadResult: raw.resourceLoadResult ?? null,
    scheduleStale: raw.scheduleStale ?? false,
    baselines: raw.baselines ?? [],
    // `null` ("geen actieve baseline") is een legitieme waarde die een undo moet kunnen terugzetten;
    // alleen een ontbrekend veld (undefined) valt terug op null.
    activeBaselineId: raw.activeBaselineId !== void 0 ? raw.activeBaselineId : null,
    // Bewuste default voor snapshots zonder VOLLEDIG project (pakket H). Pre-H-snapshots droegen
    // alleen de nauwe B3-projectie `{ wbsAutoNumber }`; die herken je aan het ontbreken van `id`.
    // We vervangen zo'n halve projectie niet door een leeg project maar vullen hem AAN met een verse
    // default — de aanwezige projectie (bv. de wbsAutoNumber-vlag) blijft daarbij leidend, inclusief
    // een legitiem `undefined` ("vrije tekst"). Snapshots leven alleen in-memory, dus dit pad is
    // puur defensief.
    project: raw.project?.id ? raw.project : { ...createDefaultProject(), ...raw.project },
    // De gedenormaliseerde projectkalender-cache; `restoreSnapshot` synct hem hierna alsnog uit
    // `calendars` (§9.1), dus deze default is alleen het vangnet voor de orphan-fallback.
    calendar: raw.calendar ?? createDefaultCalendar()
  };
}
function restoreSnapshot(s, raw) {
  const snap = migrateSnapshot(raw);
  const flat = snap;
  for (const f of DOCUMENT_FIELDS) {
    if (f.snapshot === "none") continue;
    f.set(s, flat[f.key]);
  }
  syncProjectCalendar(s);
  s.isDirty = true;
}

// src/state/transaction.ts
var coalesce = null;
var MAX_UNDO = 100;
var undoSeq = 0;
function pushUndoSnapshot(s, base = s) {
  s.undoStack.push(createSnapshot(base));
  if (s.undoStack.length > MAX_UNDO) s.undoStack.shift();
  undoSeq++;
}
function resetUndoCoalescing() {
  coalesce = null;
}
var mcpTransactionActive = false;
var batchDepth = 0;
function beginUndoable(s, opts) {
  if (mcpTransactionActive || batchDepth > 0) return;
  const key = opts?.coalesceKey;
  if (key && coalesce && coalesce.key === key && coalesce.seq === undoSeq && coalesce.docId === s.activeDocumentId) {
    if (s.redoStack.length) s.redoStack = [];
    return;
  }
  const base = original(s) ?? s;
  pushUndoSnapshot(s, base);
  s.redoStack = [];
  coalesce = key ? { key, seq: undoSeq, docId: s.activeDocumentId } : null;
}
function finishMutation(s, opts) {
  s.isDirty = true;
  if (opts?.stale) s.scheduleStale = true;
}

// src/services/extensionEvents.ts
var eventListeners = /* @__PURE__ */ new Map();
function emitExtensionEvent(event, data) {
  eventListeners.get(event)?.forEach((fn) => {
    try {
      fn(data);
    } catch (err) {
      console.error(`[extensies] listener voor "${event}" gooide een fout:`, err);
    }
  });
}
var HOST_EVENTS = {
  /** Een project is geladen (import, bestand openen, of api.data.loadProject). */
  projectLoaded: "host:project-loaded",
  /** Een leeg project is aangemaakt. */
  projectNew: "host:project-new",
  /** Het CPM-schema is (her)berekend. */
  scheduleCalculated: "host:schedule-calculated"
};

// src/state/slices/projectSlice.ts
function sameValue(a, b) {
  if (a === b) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  return JSON.stringify(a) === JSON.stringify(b);
}
function projectChanges(current2, updates) {
  return Object.keys(updates).some((k) => k !== "modifiedAt" && !sameValue(current2[k], updates[k]));
}
var createProjectSlice = (set2, get2) => ({
  project: createDefaultProject(),
  calendar: createDefaultCalendar(),
  isDirty: false,
  filePath: null,
  fileHandle: null,
  setProject: (updates) => set2((s) => {
    if (!projectChanges(s.project, updates)) return;
    beginUndoable(s);
    Object.assign(s.project, updates);
    s.project.modifiedAt = (/* @__PURE__ */ new Date()).toISOString();
    finishMutation(s, { stale: "startDate" in updates });
  }),
  setWbsAutoNumber: (on) => set2((s) => {
    if (!!s.project.wbsAutoNumber === on) return;
    beginUndoable(s);
    s.project.wbsAutoNumber = on;
    if (on) applyWbsNumbering(s.tasks);
    finishMutation(s);
  }),
  setCalendar: (calendar) => set2((s) => {
    const idx = s.calendars.findIndex((c) => c.id === calendar.id);
    if (sameValue(s.calendar, calendar) && (idx < 0 || sameValue(s.calendars[idx], calendar))) return;
    beginUndoable(s);
    s.calendar = calendar;
    if (idx >= 0) s.calendars[idx] = calendar;
    finishMutation(s, { stale: true });
  }),
  setProjectCalendar: (id) => set2((s) => {
    if (!s.calendars.some((c) => c.id === id)) return;
    if (s.project.calendarId === id) return;
    beginUndoable(s);
    s.project.calendarId = id;
    finishMutation(s, { stale: true });
    syncProjectCalendar(s);
  }),
  ensureProjectCalendarInLibrary: () => set2((s) => {
    promoteProjectCalendarToLibrary(s);
  }),
  setStatusDate: (date) => set2((s) => {
    const next = date || void 0;
    if (s.project.statusDate === next) return;
    beginUndoable(s, { coalesceKey: "project.statusDate" });
    if (next) s.project.statusDate = next;
    else delete s.project.statusDate;
    s.project.modifiedAt = (/* @__PURE__ */ new Date()).toISOString();
    finishMutation(s, { stale: true });
  }),
  setProgressMode: (mode) => set2((s) => {
    if (s.project.progressMode === mode) return;
    beginUndoable(s);
    s.project.progressMode = mode;
    s.project.modifiedAt = (/* @__PURE__ */ new Date()).toISOString();
    finishMutation(s, { stale: true });
  }),
  moveProject: (newStartDate, opts) => {
    let out = { moved: false, deltaDays: 0, taskCount: 0 };
    set2((s) => {
      const delta = computeMoveDelta(s.project.startDate, newStartDate);
      if (!Number.isFinite(delta) || delta === 0) return;
      beginUndoable(s);
      s.project = shiftProjectDates(s.project, delta);
      s.project.startDate = newStartDate;
      s.project.modifiedAt = (/* @__PURE__ */ new Date()).toISOString();
      s.tasks = s.tasks.map((t) => shiftTask(t, delta));
      s.resources = s.resources.map((r) => shiftResource(r, delta));
      if (opts?.shiftBaselines) s.baselines = s.baselines.map((b) => shiftBaseline(b, delta));
      finishMutation(s);
      out = { moved: true, deltaDays: delta, taskCount: s.tasks.length };
    });
    if (out.moved) {
      get2().runCPM();
      get2().requestFitToProject();
    }
    return out;
  },
  previewMoveProject: (newStartDate, opts) => {
    const s = get2();
    const delta = computeMoveDelta(s.project.startDate, newStartDate);
    const impact = computeMoveImpact(
      s.tasks,
      s.resources,
      // `baselineCount` telt wat er MEE gaat schuiven, niet hoeveel baselines er zijn: staat de
      // checkbox uit (de default), dan blijven ze staan en is het er nul (§1.6).
      opts?.shiftBaselines ? s.baselines : [],
      s.customFieldDefs
    );
    const empty = {
      deltaDays: delta,
      startBefore: s.project.startDate,
      startAfter: newStartDate,
      endBefore: "",
      endAfter: "",
      durationBefore: 0,
      durationAfter: 0,
      endDeltaDays: 0,
      impact,
      holidayGapCalendars: []
    };
    if (!Number.isFinite(delta)) return empty;
    const solve = (tasks, dataDate) => {
      const leaf = tasks.filter((t) => t.childIds.length === 0);
      return new CPMSolver(leaf, s.sequences, s.calendar, s.calendars, {
        dataDate,
        progressMode: s.project.progressMode,
        schedulingOptions: s.project.schedulingOptions
      }).solve();
    };
    if (s.tasks.length === 0) {
      return {
        ...empty,
        holidayGapCalendars: computeHolidayGaps(
          [s.calendar, ...s.calendars],
          newStartDate,
          shiftIso(s.project.endDate, delta) || newStartDate
        )
      };
    }
    const fresh = s.cpmResult && !s.cpmResult.error && !s.scheduleStale ? s.cpmResult : null;
    const before = fresh ?? solve(s.tasks.map((t) => shiftTask(t, 0)), s.project.statusDate);
    const after = solve(
      s.tasks.map((t) => shiftTask(t, delta)),
      shiftIso(s.project.statusDate, delta)
    );
    if (after.error) return { ...empty, error: after.error };
    const endBefore = before.error ? "" : before.projectEnd;
    const endAfter = after.projectEnd;
    const endDeltaDays = endBefore && endAfter ? diffDays(endBefore, endAfter) : delta;
    return {
      ...empty,
      endBefore,
      endAfter,
      durationBefore: before.error ? 0 : before.projectDuration,
      durationAfter: after.projectDuration,
      endDeltaDays: Number.isFinite(endDeltaDays) ? endDeltaDays : delta,
      // R7: dekt de gematerialiseerde feestdagenspanne de NIEUWE projectperiode nog? De
      // projectkalender-cache én de hele bibliotheek meenemen (dedupe op id gebeurt in de helper).
      holidayGapCalendars: computeHolidayGaps(
        [s.calendar, ...s.calendars],
        newStartDate,
        endAfter || shiftIso(s.project.endDate, delta) || newStartDate
      )
    };
  },
  newProject: () => {
    set2((s) => {
      hydratePayload(s, freshPayload());
      s.ui.showLibraryLinkDialog = false;
      s.ui.libraryRefreshNotice = null;
    });
    emitExtensionEvent(HOST_EVENTS.projectNew);
  },
  createNewProject: (opts) => {
    const st = get2();
    const pristine = st.tasks.length === 0 && st.sequences.length === 0 && st.resources.length === 0 && st.filePath === null && !st.isDirty;
    if (!pristine) get2().newDocument();
    set2((s) => {
      const proj = createDefaultProject();
      proj.name = opts.name.trim() || proj.name;
      proj.description = opts.description ?? "";
      proj.author = opts.author ?? "";
      proj.company = opts.company ?? "";
      proj.startDate = opts.startDate || proj.startDate;
      proj.endDate = opts.endDate ?? "";
      proj.calendarId = opts.calendar.id;
      const payload = freshPayload();
      payload.project = proj;
      payload.calendar = opts.calendar;
      payload.tasks = opts.phaseNames.map((name, i) => ({
        id: generateId("task"),
        name,
        description: "",
        wbsCode: String(i + 1),
        // Bouwmodus (2026-07-13): wizard-fasen krijgen in bouw-agnostische modus een neutraal
        // taaktype (USERDEFINED) i.p.v. CONSTRUCTION.
        taskType: s.ui.constructionMode ? "CONSTRUCTION" : "USERDEFINED",
        status: "NOT_STARTED",
        isMilestone: false,
        priority: 500,
        parentId: null,
        childIds: [],
        time: createDefaultTaskTime(proj.startDate, 5),
        resourceIds: []
      }));
      payload.isDirty = opts.phaseNames.length > 0;
      hydratePayload(s, payload);
      s.ui.showLibraryLinkDialog = false;
      s.ui.libraryRefreshNotice = null;
    });
    emitExtensionEvent(HOST_EVENTS.projectNew);
  },
  setFilePath: (path) => set2((s) => {
    s.filePath = path;
  }),
  loadState: (loaded) => {
    get2().applyLoadedProject(loaded, {
      recompute: false,
      fit: false,
      hourDataNotice: false
    });
  }
});

// src/state/slices/taskSlice.ts
function planTaskPlacement(tasks, id, target, opts) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;
  const newParentId = target.parentId;
  if (newParentId !== null && !tasks.some((t) => t.id === newParentId)) return null;
  if (newParentId !== null) {
    const bezocht = /* @__PURE__ */ new Set();
    let cur = newParentId === id ? task : tasks.find((t) => t.id === newParentId);
    while (cur && !bezocht.has(cur.id)) {
      if (cur.id === id) return null;
      bezocht.add(cur.id);
      cur = cur.parentId ? tasks.find((t) => t.id === cur.parentId) : void 0;
    }
  }
  const oldParentId = task.parentId;
  const oldParent = oldParentId ? tasks.find((t) => t.id === oldParentId) : void 0;
  const newParent = newParentId ? tasks.find((t) => t.id === newParentId) : void 0;
  const siblingIdsAfterRemoval = newParent ? newParent.childIds.filter((cid) => cid !== id) : tasks.filter((t) => !t.parentId && t.id !== id).map((t) => t.id);
  const index = Math.max(0, Math.min(target.childIndex, siblingIdsAfterRemoval.length));
  if (opts.rejectNoOp && newParentId === oldParentId) {
    const curIdx = oldParent ? oldParent.childIds.indexOf(id) : tasks.filter((t) => !t.parentId).map((t) => t.id).indexOf(id);
    if (index === curIdx) return null;
  }
  return { parentId: newParentId, index, siblingIdsAfterRemoval };
}
function applyTaskPlacement(tasks, id, plan) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  const oldParent = task.parentId ? tasks.find((t) => t.id === task.parentId) : void 0;
  const newParent = plan.parentId ? tasks.find((t) => t.id === plan.parentId) : void 0;
  if (oldParent) oldParent.childIds = oldParent.childIds.filter((cid) => cid !== id);
  task.parentId = plan.parentId;
  if (newParent) newParent.childIds.splice(plan.index, 0, id);
  const rawIdx = tasks.findIndex((t) => t.id === id);
  const [node] = tasks.splice(rawIdx, 1);
  if (plan.index >= plan.siblingIdsAfterRemoval.length) {
    const lastSiblingId = plan.siblingIdsAfterRemoval[plan.siblingIdsAfterRemoval.length - 1];
    const lastSiblingRawIdx = lastSiblingId ? tasks.findIndex((t) => t.id === lastSiblingId) : -1;
    if (lastSiblingRawIdx >= 0) tasks.splice(lastSiblingRawIdx + 1, 0, node);
    else tasks.push(node);
  } else {
    const anchorId = plan.siblingIdsAfterRemoval[plan.index];
    const anchorRawIdx = tasks.findIndex((t) => t.id === anchorId);
    if (anchorRawIdx >= 0) tasks.splice(anchorRawIdx, 0, node);
    else tasks.push(node);
  }
}
function siblingIdsOf(tasks, parentId) {
  if (parentId === null) return tasks.filter((t) => !t.parentId).map((t) => t.id);
  return tasks.find((t) => t.id === parentId)?.childIds ?? [];
}
function applyProgressInvariants(task, statusDate) {
  const time = task.time;
  if (time.actualFinish) {
    time.completion = 1;
    if (!time.actualStart) time.actualStart = time.actualFinish;
    task.status = "COMPLETED";
  } else if (time.completion >= 1) {
    time.actualFinish = statusDate || formatDate(/* @__PURE__ */ new Date());
    if (!time.actualStart) time.actualStart = time.actualFinish;
    task.status = "COMPLETED";
  } else if (time.actualStart) {
    task.status = "STARTED";
  } else {
    task.status = "NOT_STARTED";
  }
  time.remainingTime = Math.round(time.scheduleDuration * (1 - time.completion));
}
var createTaskSlice = (set2, get2) => ({
  tasks: [],
  selectedTaskIds: [],
  taskClipboard: null,
  addTask: (partial) => {
    const id = generateId("task");
    set2((s) => {
      beginUndoable(s);
      const now = s.project.startDate || formatDate(/* @__PURE__ */ new Date());
      const anchorTask = partial.position ? s.tasks.find((t) => t.id === partial.position.anchorId) : void 0;
      const parentId = anchorTask ? anchorTask.parentId : partial.parentId || null;
      const task = {
        id,
        name: partial.name,
        description: partial.description || "",
        wbsCode: partial.wbsCode || "",
        // Bouwmodus (2026-07-13): neutraal taaktype-default in bouw-agnostische modus (USERDEFINED)
        // i.p.v. CONSTRUCTION. Alleen de default bij aanmaken verandert; de enum blijft intact.
        taskType: partial.taskType || (s.ui.constructionMode ? "CONSTRUCTION" : "USERDEFINED"),
        status: partial.status || "NOT_STARTED",
        isMilestone: partial.isMilestone || false,
        milestoneKind: partial.milestoneKind,
        mandatory: partial.mandatory,
        // ?? i.p.v. || : priority 0 is een geldige waarde (laagste, levelt als eerste weg) en
        // mag niet stilzwijgend naar de default 500 vallen.
        priority: partial.priority ?? 500,
        parentId,
        childIds: [],
        time: partial.time || createDefaultTaskTime(now, partial.isMilestone ? 0 : 5),
        resourceIds: partial.resourceIds || [],
        color: partial.color,
        constraint: partial.constraint,
        // Fase 2.9 (§3.1/§4.3): secundaire constraint doorgeven zodat de solver hem als tweede
        // grens meerekent. Afwezig ⇒ undefined ⇒ byte-identiek default-document.
        constraint2: partial.constraint2,
        // Fase 2.9 (§3.2/§4.4): hammock/LOE-vlag doorgeven zodat de solver de afgeleide-span-tak
        // draait. Afwezig ⇒ undefined ⇒ byte-identiek default-document.
        isHammock: partial.isHammock,
        // Fase 2.9 (§3.3/§4.5): externe (cross-project) dependencies doorgeven zodat de solver ze als
        // bevroren datum-grenzen meerekent. Afwezig ⇒ undefined ⇒ byte-identiek default-document.
        externalLinks: partial.externalLinks,
        deadline: partial.deadline,
        calendarId: partial.calendarId,
        // QA-fix (fase 2.10, onderdeel 2, bevinding 4): notes werd hier vergeten — de andere
        // optionele velden (constraint2/isHammock/externalLinks/...) volgen wél al dit patroon.
        notes: partial.notes
      };
      if (anchorTask) {
        const anchorIdx = s.tasks.findIndex((t) => t.id === anchorTask.id);
        const insertAt = partial.position.where === "above" ? anchorIdx : anchorIdx + 1;
        s.tasks.splice(insertAt, 0, task);
      } else {
        s.tasks.push(task);
      }
      if (task.parentId) {
        const parent = s.tasks.find((t) => t.id === task.parentId);
        if (parent) {
          if (anchorTask) {
            const anchorChildIdx = parent.childIds.indexOf(anchorTask.id);
            const insertAt = anchorChildIdx >= 0 ? partial.position.where === "above" ? anchorChildIdx : anchorChildIdx + 1 : parent.childIds.length;
            parent.childIds.splice(insertAt, 0, id);
          } else {
            parent.childIds.push(id);
          }
        }
      }
      if (s.project.wbsAutoNumber) {
        applyWbsNumbering(s.tasks);
      } else if (!partial.wbsCode) {
        task.wbsCode = deriveWbsCodes(s.tasks).get(id) ?? "";
      }
      finishMutation(s, { stale: true });
    });
    get2().recomputeViewRows();
    return id;
  },
  updateTask: (id, updates, opts) => {
    set2((s) => {
      const idx = s.tasks.findIndex((t) => t.id === id);
      if (idx < 0) return;
      beginUndoable(s, opts);
      Object.assign(s.tasks[idx], updates);
      finishMutation(s, { stale: true });
    });
    get2().recomputeViewRows();
  },
  setTaskCalendar: (taskId, calendarId) => {
    set2((s) => {
      const task = s.tasks.find((t) => t.id === taskId);
      if (!task) return;
      if (task.calendarId === calendarId) return;
      beginUndoable(s);
      task.calendarId = calendarId;
      finishMutation(s, { stale: true });
    });
    get2().recomputeViewRows();
  },
  addExternalLink: (taskId, link) => {
    const id = generateId("extlink");
    set2((s) => {
      const task = s.tasks.find((t) => t.id === taskId);
      if (!task) return;
      beginUndoable(s);
      const full = { ...link, id };
      task.externalLinks = [...task.externalLinks ?? [], full];
      finishMutation(s, { stale: true });
    });
    get2().recomputeViewRows();
    return id;
  },
  removeExternalLink: (taskId, linkId) => {
    set2((s) => {
      const task = s.tasks.find((t) => t.id === taskId);
      if (!task || !task.externalLinks) return;
      const next = task.externalLinks.filter((l) => l.id !== linkId);
      if (next.length === task.externalLinks.length) return;
      beginUndoable(s);
      task.externalLinks = next.length > 0 ? next : void 0;
      finishMutation(s, { stale: true });
    });
    get2().recomputeViewRows();
  },
  deleteTask: (id) => {
    set2((s) => {
      const task = s.tasks.find((t) => t.id === id);
      if (!task) return;
      beginUndoable(s);
      if (task.parentId) {
        const parent = s.tasks.find((t) => t.id === task.parentId);
        if (parent) {
          parent.childIds = parent.childIds.filter((cid) => cid !== id);
        }
      }
      const removeIds = /* @__PURE__ */ new Set();
      const collectChildren = (taskId) => {
        removeIds.add(taskId);
        const t = s.tasks.find((tt) => tt.id === taskId);
        if (t) t.childIds.forEach(collectChildren);
      };
      collectChildren(id);
      s.tasks = s.tasks.filter((t) => !removeIds.has(t.id));
      s.sequences = s.sequences.filter(
        (seq) => !removeIds.has(seq.predecessorId) && !removeIds.has(seq.successorId)
      );
      s.assignments = s.assignments.filter((a) => !removeIds.has(a.taskId));
      s.selectedTaskIds = s.selectedTaskIds.filter((sid) => !removeIds.has(sid));
      if (s.project.wbsAutoNumber) applyWbsNumbering(s.tasks);
      finishMutation(s, { stale: true });
    });
    get2().recomputeViewRows();
  },
  moveTask: (id, newParentId, position) => {
    set2((s) => {
      const task = s.tasks.find((t) => t.id === id);
      if (!task) return;
      if (newParentId != null) {
        const bezocht = /* @__PURE__ */ new Set();
        let cur = newParentId === id ? task : s.tasks.find((t) => t.id === newParentId);
        while (cur && !bezocht.has(cur.id)) {
          if (cur.id === id) return;
          bezocht.add(cur.id);
          cur = cur.parentId ? s.tasks.find((t) => t.id === cur.parentId) : void 0;
        }
      }
      beginUndoable(s);
      if (task.parentId) {
        const oldParent = s.tasks.find((t) => t.id === task.parentId);
        if (oldParent) {
          oldParent.childIds = oldParent.childIds.filter((c) => c !== id);
        }
      }
      task.parentId = newParentId;
      if (position === void 0) {
        if (newParentId) {
          const newParent = s.tasks.find((t) => t.id === newParentId);
          if (newParent) newParent.childIds.push(id);
        }
      } else {
        if (newParentId) {
          const newParent = s.tasks.find((t) => t.id === newParentId);
          if (newParent) {
            const at2 = Math.max(0, Math.min(position, newParent.childIds.length));
            newParent.childIds.splice(at2, 0, id);
          }
        }
        const fromIdx = s.tasks.findIndex((t) => t.id === id);
        const [moved] = s.tasks.splice(fromIdx, 1);
        const sibIdx = [];
        s.tasks.forEach((t, i) => {
          if (t.parentId === newParentId) sibIdx.push(i);
        });
        const at = Math.max(0, Math.min(position, sibIdx.length));
        let insertAt;
        if (at < sibIdx.length) {
          insertAt = sibIdx[at];
        } else if (sibIdx.length > 0) {
          insertAt = sibIdx[sibIdx.length - 1] + 1;
        } else if (newParentId) {
          const p = s.tasks.findIndex((t) => t.id === newParentId);
          insertAt = p >= 0 ? p + 1 : s.tasks.length;
        } else {
          insertAt = s.tasks.length;
        }
        s.tasks.splice(insertAt, 0, moved);
      }
      if (s.project.wbsAutoNumber) applyWbsNumbering(s.tasks);
      finishMutation(s, { stale: true });
    });
    get2().recomputeViewRows();
  },
  moveTaskTo: (id, target) => {
    set2((s) => {
      const task = s.tasks.find((t) => t.id === id);
      if (!task) return;
      const oldParentId = task.parentId;
      const plan = planTaskPlacement(s.tasks, id, target, { rejectNoOp: true });
      if (!plan) return;
      beginUndoable(s);
      applyTaskPlacement(s.tasks, id, plan);
      if (s.project.wbsAutoNumber) applyWbsNumbering(s.tasks);
      finishMutation(s, { stale: plan.parentId !== oldParentId });
    });
    get2().recomputeViewRows();
  },
  moveTasksTo: (ids, target) => {
    set2((s) => {
      const geselecteerd = new Set(ids.filter((id) => s.tasks.some((t) => t.id === id)));
      const heeftGeselecteerdeVoorouder = (id) => {
        const bezocht = /* @__PURE__ */ new Set([id]);
        let cur = s.tasks.find((t) => t.id === id);
        cur = cur?.parentId ? s.tasks.find((t) => t.id === cur.parentId) : void 0;
        while (cur && !bezocht.has(cur.id)) {
          if (geselecteerd.has(cur.id)) return true;
          bezocht.add(cur.id);
          cur = cur.parentId ? s.tasks.find((t) => t.id === cur.parentId) : void 0;
        }
        return false;
      };
      const teVerplaatsen = [...geselecteerd].filter((id) => !heeftGeselecteerdeVoorouder(id));
      if (teVerplaatsen.length === 0) return;
      const order = flattenOrder(s.tasks).map((t) => t.id);
      const gesorteerd = teVerplaatsen.sort((a, b) => order.indexOf(a) - order.indexOf(b));
      if (target.parentId !== null) {
        const groep = new Set(gesorteerd);
        const bezocht = /* @__PURE__ */ new Set();
        let cur = s.tasks.find((t) => t.id === target.parentId);
        while (cur && !bezocht.has(cur.id)) {
          if (groep.has(cur.id)) return;
          bezocht.add(cur.id);
          cur = cur.parentId ? s.tasks.find((t) => t.id === cur.parentId) : void 0;
        }
      }
      let snapshotPushed = false;
      let reparented = false;
      let vorigeId = null;
      for (const id of gesorteerd) {
        const task = s.tasks.find((t) => t.id === id);
        if (!task) continue;
        let childIndex = target.childIndex;
        if (vorigeId !== null) {
          const siblingsZonderId = siblingIdsOf(s.tasks, target.parentId).filter((x) => x !== id);
          const vorigeIdx = siblingsZonderId.indexOf(vorigeId);
          childIndex = vorigeIdx >= 0 ? vorigeIdx + 1 : siblingsZonderId.length;
        }
        const oudeOuder = task.parentId;
        const plan = planTaskPlacement(s.tasks, id, { parentId: target.parentId, childIndex }, { rejectNoOp: false });
        if (!plan) continue;
        const curIdx = siblingIdsOf(s.tasks, oudeOuder).indexOf(id);
        if (plan.parentId !== oudeOuder || plan.index !== curIdx) {
          if (!snapshotPushed) {
            beginUndoable(s);
            snapshotPushed = true;
          }
          applyTaskPlacement(s.tasks, id, plan);
          if (plan.parentId !== oudeOuder) reparented = true;
        }
        vorigeId = id;
      }
      if (!snapshotPushed) return;
      if (s.project.wbsAutoNumber) applyWbsNumbering(s.tasks);
      finishMutation(s, { stale: reparented });
    });
    get2().recomputeViewRows();
  },
  indentTasks: (ids) => {
    set2((s) => {
      const selected = new Set(ids);
      let changed = false;
      let snapshotPushed = false;
      const order = flattenOrder(s.tasks).map((t) => t.id);
      for (const id of order) {
        if (!selected.has(id)) continue;
        const task = s.tasks.find((t) => t.id === id);
        if (!task) continue;
        const idx = order.indexOf(id);
        let newParentId = null;
        for (let i = idx - 1; i >= 0; i--) {
          const cand = s.tasks.find((t) => t.id === order[i]);
          if (!cand) continue;
          if (cand.parentId === task.parentId && !selected.has(cand.id)) {
            newParentId = cand.id;
            break;
          }
          if (cand.id === task.parentId) break;
        }
        if (!newParentId) continue;
        if (!snapshotPushed) {
          beginUndoable(s);
          snapshotPushed = true;
        }
        if (task.parentId) {
          const oldParent = s.tasks.find((t) => t.id === task.parentId);
          if (oldParent) oldParent.childIds = oldParent.childIds.filter((c) => c !== id);
        }
        task.parentId = newParentId;
        const newParent = s.tasks.find((t) => t.id === newParentId);
        if (newParent) newParent.childIds.push(id);
        changed = true;
      }
      if (!changed) return;
      if (s.project.wbsAutoNumber) applyWbsNumbering(s.tasks);
      finishMutation(s, { stale: true });
    });
    get2().recomputeViewRows();
  },
  outdentTasks: (ids) => {
    set2((s) => {
      const order = flattenOrder(s.tasks).map((t) => t.id);
      const sorted = [...ids].sort((a, b) => order.indexOf(b) - order.indexOf(a));
      let changed = false;
      let snapshotPushed = false;
      for (const id of sorted) {
        const task = s.tasks.find((t) => t.id === id);
        if (!task || !task.parentId) continue;
        const parent = s.tasks.find((t) => t.id === task.parentId);
        if (!parent) continue;
        const parentSiblingIds = parent.parentId ? s.tasks.find((t) => t.id === parent.parentId)?.childIds ?? [] : s.tasks.filter((t) => !t.parentId).map((t) => t.id);
        const parentIdx = parentSiblingIds.indexOf(parent.id);
        const childIndex = parentIdx >= 0 ? parentIdx + 1 : parentSiblingIds.length;
        const plan = planTaskPlacement(
          s.tasks,
          id,
          { parentId: parent.parentId, childIndex },
          { rejectNoOp: false }
        );
        if (!plan) continue;
        if (!snapshotPushed) {
          beginUndoable(s);
          snapshotPushed = true;
        }
        applyTaskPlacement(s.tasks, id, plan);
        changed = true;
      }
      if (!changed) return;
      if (s.project.wbsAutoNumber) applyWbsNumbering(s.tasks);
      finishMutation(s, { stale: true });
    });
    get2().recomputeViewRows();
  },
  selectTask: (id, multi = false, range2 = false) => set2((s) => {
    if (range2 && s.selectedTaskIds.length > 0) {
      const lastSelected = s.selectedTaskIds[s.selectedTaskIds.length - 1];
      const flatIds = s.tasks.map((t) => t.id);
      const fromIdx = flatIds.indexOf(lastSelected);
      const toIdx = flatIds.indexOf(id);
      if (fromIdx >= 0 && toIdx >= 0) {
        const start = Math.min(fromIdx, toIdx);
        const end = Math.max(fromIdx, toIdx);
        const rangeIds = flatIds.slice(start, end + 1);
        const merged = /* @__PURE__ */ new Set([...s.selectedTaskIds, ...rangeIds]);
        s.selectedTaskIds = Array.from(merged);
      } else {
        s.selectedTaskIds = [id];
      }
    } else if (multi) {
      const idx = s.selectedTaskIds.indexOf(id);
      if (idx >= 0) {
        s.selectedTaskIds.splice(idx, 1);
      } else {
        s.selectedTaskIds.push(id);
      }
    } else {
      s.selectedTaskIds = [id];
    }
  }),
  selectTaskRange: (fromId, toId) => set2((s) => {
    const flatIds = s.tasks.map((t) => t.id);
    const fromIdx = flatIds.indexOf(fromId);
    const toIdx = flatIds.indexOf(toId);
    if (fromIdx >= 0 && toIdx >= 0) {
      const start = Math.min(fromIdx, toIdx);
      const end = Math.max(fromIdx, toIdx);
      s.selectedTaskIds = flatIds.slice(start, end + 1);
    }
  }),
  deselectAll: () => set2((s) => {
    s.selectedTaskIds = [];
  }),
  selectAllTasks: () => set2((s) => {
    s.selectedTaskIds = s.viewRows.filter((row) => row.kind === "task").map((row) => row.task.id);
  }),
  selectTasks: (ids, additive) => set2((s) => {
    if (!additive) {
      s.selectedTaskIds = [...ids];
      return;
    }
    const merged = /* @__PURE__ */ new Set([...s.selectedTaskIds, ...ids]);
    s.selectedTaskIds = Array.from(merged);
  }),
  reorderSibling: (taskId, direction) => {
    set2((s) => {
      const task = s.tasks.find((t) => t.id === taskId);
      if (!task) return;
      if (task.parentId) {
        const parent = s.tasks.find((t) => t.id === task.parentId);
        if (!parent) return;
        const idx = parent.childIds.indexOf(taskId);
        if (idx < 0) return;
        const swapIdx = direction === "up" ? idx - 1 : idx + 1;
        if (swapIdx < 0 || swapIdx >= parent.childIds.length) return;
        const otherId = parent.childIds[swapIdx];
        beginUndoable(s);
        const tmp = parent.childIds[idx];
        parent.childIds[idx] = parent.childIds[swapIdx];
        parent.childIds[swapIdx] = tmp;
        const rawIdx = s.tasks.findIndex((t) => t.id === taskId);
        const [node] = s.tasks.splice(rawIdx, 1);
        const otherRawIdx = s.tasks.findIndex((t) => t.id === otherId);
        if (direction === "up") {
          s.tasks.splice(otherRawIdx, 0, node);
        } else {
          s.tasks.splice(otherRawIdx + 1, 0, node);
        }
      } else {
        const rootIds = s.tasks.filter((t) => !t.parentId).map((t) => t.id);
        const idx = rootIds.indexOf(taskId);
        const swapIdx = direction === "up" ? idx - 1 : idx + 1;
        if (swapIdx < 0 || swapIdx >= rootIds.length) return;
        const otherId = rootIds[swapIdx];
        const absA = s.tasks.findIndex((t) => t.id === taskId);
        const absB = s.tasks.findIndex((t) => t.id === otherId);
        beginUndoable(s);
        const tmp = s.tasks[absA];
        s.tasks[absA] = s.tasks[absB];
        s.tasks[absB] = tmp;
      }
      if (s.project.wbsAutoNumber) applyWbsNumbering(s.tasks);
      finishMutation(s);
    });
    get2().recomputeViewRows();
  },
  copyTasks: (ids) => set2((s) => {
    const sourceIds = ids ?? s.selectedTaskIds;
    if (sourceIds.length === 0) return;
    const idSet = /* @__PURE__ */ new Set();
    const collect = (taskId) => {
      if (idSet.has(taskId)) return;
      idSet.add(taskId);
      const t = s.tasks.find((tt) => tt.id === taskId);
      if (t) t.childIds.forEach(collect);
    };
    sourceIds.forEach(collect);
    const tasks = s.tasks.filter((t) => idSet.has(t.id));
    if (tasks.length === 0) return;
    const sequences = s.sequences.filter(
      (seq) => idSet.has(seq.predecessorId) && idSet.has(seq.successorId)
    );
    const assignments = s.assignments.filter((a) => idSet.has(a.taskId));
    s.taskClipboard = JSON.parse(JSON.stringify({ tasks, sequences, assignments }));
  }),
  pasteTasks: () => {
    const newRootIds = [];
    set2((s) => {
      const clip = s.taskClipboard;
      if (!clip || clip.tasks.length === 0) return;
      beginUndoable(s);
      const copiedIds = new Set(clip.tasks.map((t) => t.id));
      const resourceExists = new Set(s.resources.map((r) => r.id));
      const anchor = s.selectedTaskIds.length > 0 ? s.tasks.find((t) => t.id === s.selectedTaskIds[0]) : void 0;
      const targetParentId = anchor ? anchor.parentId : null;
      const idMap = /* @__PURE__ */ new Map();
      for (const t of clip.tasks) idMap.set(t.id, generateId("task"));
      for (const src of clip.tasks) {
        const newId = idMap.get(src.id);
        const parentInClip = !!src.parentId && copiedIds.has(src.parentId);
        if (!parentInClip) newRootIds.push(newId);
        const task = {
          ...JSON.parse(JSON.stringify(src)),
          id: newId,
          parentId: parentInClip ? idMap.get(src.parentId) : targetParentId,
          childIds: src.childIds.filter((c) => copiedIds.has(c)).map((c) => idMap.get(c)),
          // Verweesde resourceverwijzingen overslaan.
          resourceIds: src.resourceIds.filter((r) => resourceExists.has(r))
        };
        s.tasks.push(task);
      }
      if (targetParentId) {
        const parent = s.tasks.find((t) => t.id === targetParentId);
        if (parent) parent.childIds.push(...newRootIds);
      }
      for (const seq of clip.sequences) {
        s.sequences.push({
          ...seq,
          id: generateId("seq"),
          predecessorId: idMap.get(seq.predecessorId),
          successorId: idMap.get(seq.successorId)
        });
      }
      for (const a of clip.assignments) {
        if (!resourceExists.has(a.resourceId)) continue;
        s.assignments.push({
          ...a,
          id: generateId("asgn"),
          taskId: idMap.get(a.taskId)
        });
      }
      if (s.project.wbsAutoNumber) {
        applyWbsNumbering(s.tasks);
      } else {
        const codes = deriveWbsCodes(s.tasks);
        for (const newId of idMap.values()) {
          const t = s.tasks.find((x) => x.id === newId);
          const code = codes.get(newId);
          if (t && code !== void 0) t.wbsCode = code;
        }
      }
      s.selectedTaskIds = newRootIds;
      finishMutation(s, { stale: true });
    });
    get2().recomputeViewRows();
    return newRootIds;
  },
  renumberWbs: () => {
    set2((s) => {
      beginUndoable(s);
      applyWbsNumbering(s.tasks);
      finishMutation(s);
    });
    get2().recomputeViewRows();
  },
  insertWbsTemplate: (template, parentId) => {
    if (template.tasks.length === 0) return null;
    let newRootId = null;
    set2((s) => {
      beginUndoable(s);
      const startDate = s.project.startDate || formatDate(/* @__PURE__ */ new Date());
      const idMap = /* @__PURE__ */ new Map();
      for (const tt of template.tasks) idMap.set(tt.id, generateId("task"));
      for (const tt of template.tasks) {
        const id = idMap.get(tt.id);
        const parent = tt.parentId ? idMap.get(tt.parentId) : parentId;
        if (tt.parentId === null) newRootId = id;
        s.tasks.push({
          id,
          name: tt.name,
          description: tt.description,
          wbsCode: "",
          taskType: tt.taskType,
          status: "NOT_STARTED",
          isMilestone: tt.isMilestone,
          priority: 500,
          parentId: parent ?? null,
          childIds: template.tasks.filter((c) => c.parentId === tt.id).map((c) => idMap.get(c.id)),
          time: createDefaultTaskTime(startDate, tt.isMilestone ? 0 : tt.durationDays),
          resourceIds: []
        });
      }
      if (parentId && newRootId) {
        const parent = s.tasks.find((t) => t.id === parentId);
        if (parent) parent.childIds.push(newRootId);
      }
      for (const q of template.sequences) {
        s.sequences.push({
          ...q,
          id: generateId("seq"),
          predecessorId: idMap.get(q.predecessorId),
          successorId: idMap.get(q.successorId)
        });
      }
      if (s.project.wbsAutoNumber) {
        applyWbsNumbering(s.tasks);
      } else {
        const codes = deriveWbsCodes(s.tasks);
        for (const id of idMap.values()) {
          const task = s.tasks.find((t2) => t2.id === id);
          const code = codes.get(id);
          if (task && code !== void 0) task.wbsCode = code;
        }
      }
      if (newRootId) s.selectedTaskIds = [newRootId];
      finishMutation(s, { stale: true });
    });
    get2().recomputeViewRows();
    return newRootId;
  },
  setTaskProgress: (taskId, raw, opts) => {
    set2((s) => {
      const task = s.tasks.find((t) => t.id === taskId);
      if (!task) return;
      beginUndoable(s, opts);
      const completion = Math.max(0, Math.min(1, raw));
      task.time.completion = completion;
      if (completion > 0 && !task.time.actualStart) {
        task.time.actualStart = task.time.earlyStart || task.time.scheduleStart;
      }
      if (completion < 1) task.time.actualFinish = void 0;
      applyProgressInvariants(task, s.project.statusDate);
      finishMutation(s, { stale: !!s.project.statusDate });
    });
    get2().recomputeViewRows();
  },
  setActualStart: (taskId, date, opts) => {
    let accepted = true;
    set2((s) => {
      const task = s.tasks.find((t) => t.id === taskId);
      if (!task) return;
      if (date && s.project.statusDate && date > s.project.statusDate) {
        accepted = false;
        return;
      }
      beginUndoable(s, opts);
      task.time.actualStart = date || void 0;
      applyProgressInvariants(task, s.project.statusDate);
      finishMutation(s, { stale: !!s.project.statusDate });
    });
    get2().recomputeViewRows();
    return accepted;
  },
  setActualFinish: (taskId, date, opts) => {
    let accepted = true;
    set2((s) => {
      const task = s.tasks.find((t) => t.id === taskId);
      if (!task) return;
      if (date && s.project.statusDate && date > s.project.statusDate) {
        accepted = false;
        return;
      }
      beginUndoable(s, opts);
      task.time.actualFinish = date || void 0;
      if (!date && task.time.completion >= 1) task.time.completion = 0;
      applyProgressInvariants(task, s.project.statusDate);
      finishMutation(s, { stale: !!s.project.statusDate });
    });
    get2().recomputeViewRows();
    return accepted;
  }
});

// src/state/slices/sequenceSlice.ts
var createSequenceSlice = (set2) => ({
  sequences: [],
  addSequence: (seq) => {
    const id = generateId("seq");
    set2((s) => {
      const exists2 = s.sequences.some(
        (e) => e.predecessorId === seq.predecessorId && e.successorId === seq.successorId && e.type === seq.type
      );
      if (exists2) return;
      beginUndoable(s);
      s.sequences.push({ ...seq, id });
      finishMutation(s, { stale: true });
    });
    return id;
  },
  updateSequence: (id, patch) => {
    let applied = false;
    set2((s) => {
      const seq = s.sequences.find((e) => e.id === id);
      if (!seq) return;
      const nextType = patch.type ?? seq.type;
      const collides = nextType !== seq.type && s.sequences.some(
        (e) => e.id !== id && e.predecessorId === seq.predecessorId && e.successorId === seq.successorId && e.type === nextType
      );
      if (collides) return;
      beginUndoable(s);
      if (patch.type !== void 0) seq.type = patch.type;
      if ("lagDays" in patch) seq.lagDays = Number.isFinite(patch.lagDays) ? patch.lagDays : 0;
      if ("lagUnit" in patch) seq.lagUnit = patch.lagUnit;
      if ("lagPercent" in patch) seq.lagPercent = patch.lagPercent;
      finishMutation(s, { stale: true });
      applied = true;
    });
    return applied;
  },
  removeSequence: (id) => set2((s) => {
    if (!s.sequences.some((seq) => seq.id === id)) return;
    beginUndoable(s);
    s.sequences = s.sequences.filter((seq) => seq.id !== id);
    finishMutation(s, { stale: true });
  })
});

// src/state/slices/resourceSlice.ts
var isValidUnits = (n) => typeof n === "number" && Number.isFinite(n) && n > 0;
var createResourceSlice = (set2, get2) => ({
  resources: [],
  assignments: [],
  calendars: [],
  addResource: (res) => {
    const id = generateId("res");
    set2((s) => {
      beginUndoable(s);
      s.resources.push({ ...res, id });
      finishMutation(s);
    });
    get2().recomputeResourceLoad();
    get2().recomputeViewRows();
    return id;
  },
  updateResource: (id, updates) => {
    set2((s) => {
      const idx = s.resources.findIndex((r) => r.id === id);
      if (idx < 0) return;
      let patch = updates;
      if ("maxUnits" in patch && !isValidUnits(patch.maxUnits)) {
        patch = { ...patch };
        delete patch.maxUnits;
      }
      if (Object.keys(patch).length === 0) return;
      beginUndoable(s);
      Object.assign(s.resources[idx], patch);
      finishMutation(s);
    });
    get2().recomputeResourceLoad();
    get2().recomputeViewRows();
  },
  removeResource: (id) => {
    set2((s) => {
      if (!s.resources.some((r) => r.id === id)) return;
      beginUndoable(s);
      s.resources = s.resources.filter((r) => r.id !== id);
      s.assignments = s.assignments.filter((a) => a.resourceId !== id);
      for (const task of s.tasks) {
        const idx = task.resourceIds.indexOf(id);
        if (idx >= 0) task.resourceIds.splice(idx, 1);
      }
      for (const r of s.resources) {
        if (r.parentId === id) r.parentId = void 0;
      }
      finishMutation(s);
    });
    get2().recomputeResourceLoad();
    get2().recomputeViewRows();
  },
  assignResource: (taskId, resourceId, unitsPerDay, curve) => {
    set2((s) => {
      const task = s.tasks.find((t) => t.id === taskId);
      if (!task || task.isMilestone || task.childIds.length > 0) return;
      if (!isValidUnits(unitsPerDay)) return;
      beginUndoable(s);
      const id = generateId("asgn");
      s.assignments.push({ id, taskId, resourceId, unitsPerDay, curve });
      if (!task.resourceIds.includes(resourceId)) {
        task.resourceIds.push(resourceId);
      }
      finishMutation(s);
    });
    get2().recomputeResourceLoad();
    get2().recomputeViewRows();
  },
  updateAssignment: (assignmentId, updates) => {
    set2((s) => {
      const idx = s.assignments.findIndex((a) => a.id === assignmentId);
      if (idx < 0) return;
      let patch = updates;
      if ("unitsPerDay" in patch && !isValidUnits(patch.unitsPerDay)) {
        patch = { ...patch };
        delete patch.unitsPerDay;
      }
      if (Object.keys(patch).length === 0) return;
      beginUndoable(s);
      Object.assign(s.assignments[idx], patch);
      finishMutation(s);
    });
    get2().recomputeResourceLoad();
    get2().recomputeViewRows();
  },
  unassignResource: (assignmentId) => {
    set2((s) => {
      const removed = s.assignments.find((a) => a.id === assignmentId);
      if (!removed) return;
      beginUndoable(s);
      s.assignments = s.assignments.filter((a) => a.id !== assignmentId);
      const stillAssigned = s.assignments.some(
        (a) => a.taskId === removed.taskId && a.resourceId === removed.resourceId
      );
      if (!stillAssigned) {
        const task = s.tasks.find((t) => t.id === removed.taskId);
        const idx = task?.resourceIds.indexOf(removed.resourceId) ?? -1;
        if (task && idx >= 0) task.resourceIds.splice(idx, 1);
      }
      finishMutation(s);
    });
    get2().recomputeResourceLoad();
    get2().recomputeViewRows();
  },
  moveAssignment: (assignmentId, newTaskId) => {
    let moved = false;
    set2((s) => {
      const assignment = s.assignments.find((a) => a.id === assignmentId);
      if (!assignment) return;
      const newTask = s.tasks.find((t) => t.id === newTaskId);
      if (!newTask || newTask.isMilestone || newTask.childIds.length > 0) return;
      const alreadyOnTarget = s.assignments.some(
        (a) => a.taskId === newTaskId && a.resourceId === assignment.resourceId
      );
      if (alreadyOnTarget) return;
      beginUndoable(s);
      const oldTaskId = assignment.taskId;
      assignment.taskId = newTaskId;
      const stillOnOld = s.assignments.some(
        (a) => a.taskId === oldTaskId && a.resourceId === assignment.resourceId
      );
      if (!stillOnOld) {
        const oldTask = s.tasks.find((t) => t.id === oldTaskId);
        const idx = oldTask?.resourceIds.indexOf(assignment.resourceId) ?? -1;
        if (oldTask && idx >= 0) oldTask.resourceIds.splice(idx, 1);
      }
      if (!newTask.resourceIds.includes(assignment.resourceId)) {
        newTask.resourceIds.push(assignment.resourceId);
      }
      finishMutation(s);
      moved = true;
    });
    if (moved) {
      get2().recomputeResourceLoad();
      get2().recomputeViewRows();
    }
    return moved;
  },
  addCalendar: (cal) => {
    const id = generateId("cal");
    set2((s) => {
      beginUndoable(s);
      s.calendars.push({ ...cal, id });
      syncProjectCalendar(s);
      finishMutation(s, { stale: true });
    });
    get2().recomputeResourceLoad();
    return id;
  },
  updateCalendar: (id, updates) => {
    set2((s) => {
      const idx = s.calendars.findIndex((c) => c.id === id);
      if (idx < 0) return;
      beginUndoable(s);
      Object.assign(s.calendars[idx], updates);
      syncProjectCalendar(s);
      const onlyName = Object.keys(updates).length === 1 && "name" in updates;
      finishMutation(s, { stale: !onlyName });
    });
    get2().recomputeResourceLoad();
  },
  removeCalendar: (id) => {
    set2((s) => {
      if (!s.calendars.some((c) => c.id === id)) return;
      beginUndoable(s);
      s.calendars = s.calendars.filter((c) => c.id !== id);
      for (const r of s.resources) {
        if (r.calendarId === id) r.calendarId = void 0;
      }
      for (const t of s.tasks) {
        if (t.calendarId === id) t.calendarId = void 0;
      }
      if (s.project.calendarId === id) {
        const fallback = s.calendars[0];
        if (fallback) {
          s.project.calendarId = fallback.id;
          s.calendar = fallback;
        }
      }
      syncProjectCalendar(s);
      finishMutation(s, { stale: true });
    });
    get2().recomputeResourceLoad();
  },
  commitCalendarLibrary: (calendars, projectCalendarId) => {
    set2((s) => {
      beginUndoable(s);
      s.calendars = calendars;
      const ids = new Set(calendars.map((c) => c.id));
      for (const r of s.resources) {
        if (r.calendarId && !ids.has(r.calendarId)) r.calendarId = void 0;
      }
      for (const t of s.tasks) {
        if (t.calendarId && !ids.has(t.calendarId)) t.calendarId = void 0;
      }
      if (ids.has(projectCalendarId)) {
        s.project.calendarId = projectCalendarId;
      } else if (calendars[0]) {
        s.project.calendarId = calendars[0].id;
      }
      syncProjectCalendar(s);
      finishMutation(s, { stale: true });
    });
    get2().recomputeResourceLoad();
  }
});

// src/services/subdayIo.ts
var MIN_PER_DAY = 1440;
function minutesToClock(min) {
  const m = (min % MIN_PER_DAY + MIN_PER_DAY) % MIN_PER_DAY;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}:00`;
}
function clockToMinutes(clock) {
  const m = clock.trim().match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?/);
  if (!m) return null;
  const h = parseInt(m[1], 10);
  const mm = parseInt(m[2], 10);
  if (!Number.isFinite(h) || !Number.isFinite(mm)) return null;
  return h * 60 + mm;
}
function minutesToIsoDuration(minutes) {
  const rounded = Math.round(minutes);
  const sign = rounded < 0 ? "-" : "";
  const abs = Math.abs(rounded);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `${sign}PT${h}H${m}M0S`;
}
function isoDurationToMinutes(iso2) {
  if (!iso2) return null;
  const tIdx = iso2.indexOf("T");
  if (tIdx < 0) return null;
  const timePart = iso2.slice(tIdx + 1);
  const hMatch = /(-?\d+(?:\.\d+)?)H/.exec(timePart);
  const mMatch = /(-?\d+(?:\.\d+)?)M/.exec(timePart);
  const sMatch = /(-?\d+(?:\.\d+)?)S/.exec(timePart);
  if (!hMatch && !mMatch && !sMatch) return null;
  const mins = (hMatch ? parseFloat(hMatch[1]) * 60 : 0) + (mMatch ? parseFloat(mMatch[1]) : 0) + (sMatch ? parseFloat(sMatch[1]) / 60 : 0);
  const neg = iso2.trimStart().startsWith("-");
  const rounded = Math.round(Math.abs(mins));
  return neg ? -rounded : rounded;
}
function hasNonAnchorTime(iso2, anchorClock) {
  const tIdx = iso2.indexOf("T");
  if (tIdx < 0) return false;
  const time = iso2.slice(tIdx + 1).replace(/[Zz].*$/, "").replace(/[+-]\d\d:?\d\d$/, "");
  return time.slice(0, 5) !== anchorClock.slice(0, 5);
}
function isSubDayMinutes(minutes, hoursPerDay) {
  const perDay = Math.round(hoursPerDay * 60);
  if (perDay <= 0) return true;
  return Math.round(minutes) % perDay !== 0;
}
function canonicalizeBands(raw) {
  const byWeekday = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] };
  let deviates = false;
  for (let wd = 1; wd <= 7; wd = wd + 1) {
    const list = raw[wd] ?? [];
    if (list.length > 1) deviates = true;
    const norm = list.map((b) => {
      let end = b.end;
      if (end <= b.start) end += MIN_PER_DAY;
      if (end > MIN_PER_DAY) deviates = true;
      return { start: b.start, end };
    }).sort((a, b) => a.start - b.start);
    byWeekday[wd] = norm;
  }
  return { bands: { byWeekday }, deviates };
}
function deriveHoursPerDay(bands, fallback) {
  const sums = [];
  for (let wd = 1; wd <= 7; wd = wd + 1) {
    const list = bands.byWeekday[wd];
    if (!list || list.length === 0) continue;
    sums.push(list.reduce((s, b) => s + (b.end - b.start), 0) / 60);
  }
  if (sums.length === 0) return fallback;
  const freq = /* @__PURE__ */ new Map();
  for (const h of sums) freq.set(h, (freq.get(h) ?? 0) + 1);
  let best = sums[0];
  let bestCount = 0;
  for (const [h, c] of freq) {
    if (c > bestCount || c === bestCount && h > best) {
      best = h;
      bestCount = c;
    }
  }
  return best;
}
function workDaysFromBands(bands) {
  const days = [];
  for (let wd = 1; wd <= 7; wd++) {
    if ((bands.byWeekday[wd] ?? []).length > 0) days.push(wd);
  }
  return days;
}
function synthBandsFromScalar(cal) {
  const raw = {};
  const band = { start: cal.workStartHour * 60, end: cal.workEndHour * 60 };
  for (const wd of cal.workDays) if (wd >= 1 && wd <= 7) raw[wd] = [{ ...band }];
  return canonicalizeBands(raw).bands;
}
var bandRegistry = /* @__PURE__ */ new WeakMap();
function registerCalendarBands(cal, info) {
  bandRegistry.set(cal, info);
}
function getCalendarBands(cal) {
  return bandRegistry.get(cal);
}
function promoteHourCalendar(cal, info, signaled, preferCanonicalWhenEmpty) {
  if (!((info?.deviates ?? false) || signaled)) return false;
  if (cal.workTime) return true;
  const canonical = info?.canonical;
  const useCanonical = !!canonical && (preferCanonicalWhenEmpty || workDaysFromBands(canonical).length > 0);
  const bands = useCanonical ? canonical : synthBandsFromScalar(cal);
  cal.workTime = bands;
  const wd = workDaysFromBands(bands);
  if (wd.length > 0) cal.workDays = wd;
  cal.hoursPerDay = deriveHoursPerDay(bands, cal.hoursPerDay);
  return true;
}
function effectiveCalendarByTask(tasks, projectCal, library) {
  const byId = /* @__PURE__ */ new Map();
  for (const c of library) byId.set(c.id, c);
  const result = /* @__PURE__ */ new Map();
  for (const t of tasks) {
    result.set(t.id, t.calendarId && byId.get(t.calendarId) || projectCal);
  }
  return result;
}
function isHourCalendar(cal) {
  return !!cal?.workTime;
}
function fileHasHourData(tasks, calendars) {
  if (calendars.some(isHourCalendar)) return true;
  return tasks.some((t) => t.time.durationMinutes != null);
}
function taskMinutesForWrite(task, hoursPerDay) {
  const dm = task.time.durationMinutes;
  if (dm != null) return dm;
  return Math.round(task.time.scheduleDuration * hoursPerDay * 60);
}

// src/utils/durationFormat.ts
var DEFAULT_DURATION_SUFFIXES = { day: "d", hour: "u", minute: "m" };
function formatDuration(minutes, effHoursPerDay2, unit = "auto", suffixes = DEFAULT_DURATION_SUFFIXES) {
  const minPerDay = effHoursPerDay2 * 60;
  if (unit === "days") {
    const days = minPerDay > 0 ? minutes / minPerDay : 0;
    return `${trimNumber(days)}${suffixes.day}`;
  }
  if (unit === "hours") {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (m === 0) return `${h}${suffixes.hour}`;
    if (h === 0) return `${m}${suffixes.minute}`;
    return `${h}${suffixes.hour} ${m}${suffixes.minute}`;
  }
  if (minPerDay > 0 && minutes % minPerDay === 0) {
    return `${minutes / minPerDay}${suffixes.day}`;
  }
  return formatDuration(minutes, effHoursPerDay2, "hours", suffixes);
}
function trimNumber(n) {
  return String(Number(n.toFixed(4)));
}

// src/utils/taskDuration.ts
function effectiveCalendarOf(task, projectCal, library) {
  return (task.calendarId ? library.find((c) => c.id === task.calendarId) : void 0) || projectCal;
}
function effHoursPerDay(cal) {
  return isHourCalendar(cal) ? deriveHoursPerDay(cal.workTime, cal.hoursPerDay) : cal.hoursPerDay;
}
function taskDurationMinutes(task, cal) {
  const hpd = effHoursPerDay(cal);
  if (isHourCalendar(cal) && task.time.durationMinutes != null) return task.time.durationMinutes;
  return task.time.scheduleDuration * hpd * 60;
}

// src/engine/scheduler/applyCpmResult.ts
function applyCpmResult(tasks, result, cals) {
  for (const task of tasks) {
    const r = result.tasks.get(task.id);
    if (!r) continue;
    task.time.earlyStart = r.earlyStart;
    task.time.earlyFinish = r.earlyFinish;
    task.time.lateStart = r.lateStart;
    task.time.lateFinish = r.lateFinish;
    task.time.totalFloat = r.totalFloat;
    task.time.freeFloat = r.freeFloat;
    task.time.isCritical = r.isCritical;
    task.time.interferingFloat = r.interferingFloat;
    task.time.isNearCritical = r.isNearCritical !== void 0 ? r.isNearCritical : void 0;
    task.time.floatPath = r.floatPath !== void 0 ? r.floatPath : void 0;
    const effCal = effectiveCalendarOf(task, cals.projectCalendar, cals.calendars);
    if (isHourCalendar(effCal)) {
      task.time.scheduleFinish = r.earlyFinish;
      task.time.scheduleStart = formatInstant(parseInstant(task.time.scheduleStart), "hour");
    }
  }
  const byId = new Map(tasks.map((t) => [t.id, t]));
  const updateSummary = (taskId) => {
    const task = byId.get(taskId);
    if (!task || task.childIds.length === 0) return;
    for (const childId of task.childIds) updateSummary(childId);
    const children = task.childIds.map((cid) => byId.get(cid)).filter(Boolean);
    if (children.length > 0) {
      const starts = children.map((c) => c.time.earlyStart).sort();
      const finishes = children.map((c) => c.time.earlyFinish).sort();
      task.time.earlyStart = starts[0];
      task.time.earlyFinish = finishes[finishes.length - 1];
      task.time.isCritical = children.some((c) => c.time.isCritical);
      const lateStarts = children.map((c) => c.time.lateStart).sort();
      const lateFinishes = children.map((c) => c.time.lateFinish).sort();
      task.time.lateStart = lateStarts[0];
      task.time.lateFinish = lateFinishes[lateFinishes.length - 1];
      task.time.totalFloat = Math.min(...children.map((c) => c.time.totalFloat));
      task.time.freeFloat = Math.min(...children.map((c) => c.time.freeFloat));
      task.time.interferingFloat = task.time.totalFloat - task.time.freeFloat;
    }
  };
  for (const task of tasks) {
    if (!task.parentId) updateSummary(task.id);
  }
}

// src/engine/scheduler/ResourceLoad.ts
var CURVE_POINTS = {
  UNIFORM: [[0, 1], [1, 1]],
  FRONT_LOADED: [[0, 1], [1, 0.2]],
  BACK_LOADED: [[0, 0.2], [1, 1]],
  BELL: [[0, 0.2], [0.5, 1], [1, 0.2]],
  EARLY_PEAK: [[0, 0.2], [1 / 3, 1], [1, 0.2]],
  LATE_PEAK: [[0, 0.2], [2 / 3, 1], [1, 0.2]]
};
function distributeUnits(unitsPerDay, durationDays, curve = "UNIFORM") {
  const total = unitsPerDay * durationDays;
  if (durationDays <= 1) return durationDays === 1 ? [total] : [];
  const points = CURVE_POINTS[curve];
  const raw = [];
  for (let i = 0; i < durationDays; i++) {
    const t = i / (durationDays - 1);
    raw.push(interpolate(points, t));
  }
  const sumRaw = raw.reduce((a, b) => a + b, 0);
  const weights = raw.map((r) => r / sumRaw);
  return largestRemainderRound(weights.map((w) => w * total), total, unitsPerDay);
}
function interpolate(points, t) {
  for (let i = 0; i < points.length - 1; i++) {
    const [t0, w0] = points[i];
    const [t1, w1] = points[i + 1];
    if (t >= t0 && t <= t1) {
      const frac = t1 === t0 ? 0 : (t - t0) / (t1 - t0);
      return w0 + frac * (w1 - w0);
    }
  }
  return points[points.length - 1][1];
}
function largestRemainderRound(values, targetSum, unitsPerDay) {
  const scale = Math.abs(unitsPerDay - Math.round(unitsPerDay)) < 1e-9 ? 1 : 100;
  const floors = values.map((v) => Math.floor(v * scale));
  let remainder = Math.round(targetSum * scale) - floors.reduce((a, b) => a + b, 0);
  const fracIdx = values.map((v, i) => ({ i, frac: v * scale - floors[i] })).sort((a, b) => b.frac - a.frac);
  const result = [...floors];
  for (let k = 0; k < fracIdx.length && remainder > 0; k++, remainder--) {
    result[fracIdx[k].i] += 1;
  }
  return result.map((v) => v / scale);
}
function computeResourceLoad(resources, assignments, tasks, projectCalendar, resourceCalendars) {
  const load = {};
  const capacity = {};
  const overallocatedDays = {};
  const taskById = new Map(tasks.map((t) => [t.id, t]));
  const projectEngine = new CalendarEngine(projectCalendar);
  const validAssignments = assignments.filter((a) => {
    const task = taskById.get(a.taskId);
    return !!task && !task.isMilestone && task.childIds.length === 0;
  });
  for (const a of validAssignments) {
    const task = taskById.get(a.taskId);
    const durationDays = task.time.scheduleDuration;
    const days = distributeUnits(a.unitsPerDay, durationDays, a.curve ?? "UNIFORM");
    if (days.length === 0) continue;
    const workDayIsos = enumerateWorkDays(projectEngine, task.time.earlyStart, task.time.earlyFinish);
    if (!load[a.resourceId]) load[a.resourceId] = {};
    const bucket = load[a.resourceId];
    for (let i = 0; i < days.length && i < workDayIsos.length; i++) {
      const iso2 = workDayIsos[i];
      bucket[iso2] = (bucket[iso2] ?? 0) + days[i];
    }
  }
  for (const resource of resources) {
    const bucket = load[resource.id];
    if (!bucket) continue;
    const engine = new CalendarEngine(resolveCalendar(resource.calendarId, resourceCalendars, projectCalendar));
    capacity[resource.id] = {};
    for (const iso2 of Object.keys(bucket)) {
      const date = parseDate(iso2);
      capacity[resource.id][iso2] = engine.isWorkDay(date) ? maxUnitsOn(resource, iso2) : 0;
    }
  }
  for (const resId of Object.keys(load)) {
    const bucket = load[resId];
    const cap = capacity[resId] ?? {};
    const flagged = [];
    for (const iso2 of Object.keys(bucket)) {
      if (bucket[iso2] > (cap[iso2] ?? 0)) flagged.push(iso2);
    }
    if (flagged.length > 0) overallocatedDays[resId] = flagged.sort();
  }
  return { load, capacity, overallocatedDays };
}
function maxUnitsOn(resource, iso2) {
  const steps = resource.availabilitySteps;
  if (!steps || steps.length === 0) return resource.maxUnits;
  let applicable = resource.maxUnits;
  for (const step of [...steps].sort((a, b) => a.from.localeCompare(b.from))) {
    if (step.from <= iso2) applicable = step.maxUnits;
  }
  return applicable;
}
function enumerateWorkDays(engine, startIso, finishIso) {
  const start = parseDate(startIso);
  const finish = parseDate(finishIso);
  const isos = [];
  let current2 = new Date(start.getTime());
  let guard = 0;
  const MAX_DAYS = 2e5;
  while (current2 <= finish) {
    if (engine.isWorkDay(current2)) isos.push(formatDate(current2));
    current2 = addCalendarDays(current2, 1);
    if (++guard > MAX_DAYS) break;
  }
  return isos;
}

// src/engine/scheduler/ResourceLeveler.ts
var EPS = 1e-9;
function levelResources(tasks, sequences, resources, assignments, projectCalendar, resourceCalendars, cpmResult, options, cpmOptions = {}) {
  const projEngine = new CalendarEngine(projectCalendar);
  const renewable = resources.filter((r) => r.type !== "MATERIAL");
  const selectedResources = options.resourceIds ? renewable.filter((r) => options.resourceIds.includes(r.id)) : renewable;
  const selectedIds = new Set(selectedResources.map((r) => r.id));
  const resById = new Map(resources.map((r) => [r.id, r]));
  const engineByRes = /* @__PURE__ */ new Map();
  for (const r of selectedResources) {
    engineByRes.set(r.id, new CalendarEngine(resolveCalendar(r.calendarId, resourceCalendars, projectCalendar)));
  }
  const capacityOf = (resId, iso2) => {
    const r = resById.get(resId);
    const eng = engineByRes.get(resId);
    if (!r || !eng) return 0;
    return eng.isWorkDay(parseDate(iso2)) ? maxUnitsOn(r, iso2) : 0;
  };
  const maxCapacityOf = (resId) => {
    const r = resById.get(resId);
    if (!r) return 0;
    let m = r.maxUnits;
    for (const s of r.availabilitySteps ?? []) m = Math.max(m, s.maxUnits);
    return m;
  };
  const taskById = new Map(tasks.map((t) => [t.id, t]));
  const leafSet = new Set(tasks.map((t) => t.id));
  const creationIndex = new Map(tasks.map((t, i) => [t.id, i]));
  const workTasks = tasks.map((t) => ({ ...t, levelingDelay: void 0, time: { ...t.time } }));
  const workById = new Map(workTasks.map((t) => [t.id, t]));
  const baseline = new CPMSolver(workTasks, sequences, projectCalendar, resourceCalendars, cpmOptions).solve();
  if (baseline.error) {
    const end = cpmResult.projectEnd;
    return { delays: {}, unresolved: {}, unresolvedReasons: {}, shifts: {}, projectEndBefore: end, projectEndAfter: end };
  }
  const baseEs = (id) => baseline.tasks.get(id)?.earlyStart ?? taskById.get(id).time.earlyStart;
  const baseLs = (id) => baseline.tasks.get(id)?.lateStart ?? taskById.get(id).time.lateStart;
  const baseFloat = (id) => baseline.tasks.get(id)?.totalFloat ?? taskById.get(id).time.totalFloat;
  const demandByTask = /* @__PURE__ */ new Map();
  for (const a of assignments) {
    if (!selectedIds.has(a.resourceId)) continue;
    const task = taskById.get(a.taskId);
    if (!task || task.isMilestone || task.childIds.length > 0) continue;
    const dur = task.time.scheduleDuration;
    if (dur <= 0) continue;
    const arr = distributeUnits(a.unitsPerDay, dur, a.curve ?? "UNIFORM");
    let byRes = demandByTask.get(a.taskId);
    if (!byRes) {
      byRes = /* @__PURE__ */ new Map();
      demandByTask.set(a.taskId, byRes);
    }
    const existing = byRes.get(a.resourceId);
    if (existing) {
      for (let i = 0; i < arr.length; i++) existing[i] = (existing[i] ?? 0) + arr[i];
    } else {
      byRes.set(a.resourceId, [...arr]);
    }
  }
  const hasDemand = (id) => demandByTask.has(id);
  const movableIds = [];
  const pinnedIds = [];
  for (const t of tasks) {
    if (!hasDemand(t.id)) continue;
    if (t.priority === 1e3) pinnedIds.push(t.id);
    else movableIds.push(t.id);
  }
  const pinnedSet = new Set(pinnedIds);
  const predsOf = /* @__PURE__ */ new Map();
  for (const t of tasks) predsOf.set(t.id, []);
  for (const seq of sequences) {
    if (leafSet.has(seq.predecessorId) && leafSet.has(seq.successorId)) {
      predsOf.get(seq.successorId).push(seq.predecessorId);
    }
  }
  const booked = {};
  const book = (resId, iso2, amount) => {
    if (!booked[resId]) booked[resId] = {};
    booked[resId][iso2] = (booked[resId][iso2] ?? 0) + amount;
  };
  const bookedOn = (resId, iso2) => booked[resId]?.[iso2] ?? 0;
  const placedStartIso = /* @__PURE__ */ new Map();
  const bookDemandAt = (taskId, startDate) => {
    const task = taskById.get(taskId);
    const dur = task.time.scheduleDuration;
    const occ = nextWorkDays(projEngine, startDate, dur);
    const byRes = demandByTask.get(taskId);
    for (const [resId, arr] of byRes) {
      for (let i = 0; i < arr.length && i < occ.length; i++) book(resId, occ[i], arr[i]);
    }
    return occ;
  };
  const totalWork = tasks.reduce((sum, t) => sum + (t.isMilestone ? 0 : Math.max(0, t.time.scheduleDuration)), 0);
  const scanLimit = Math.max(totalWork + 10, 30);
  const cmp2 = (a, b) => {
    const ta = taskById.get(a), tb = taskById.get(b);
    if (tb.priority !== ta.priority) return tb.priority - ta.priority;
    const fa = baseFloat(a), fb = baseFloat(b);
    if (fa !== fb) return fa - fb;
    const ea = baseEs(a), eb = baseEs(b);
    if (ea !== eb) return ea < eb ? -1 : 1;
    return creationIndex.get(a) - creationIndex.get(b);
  };
  const active = /* @__PURE__ */ new Set([...pinnedIds, ...movableIds]);
  const sortedActive = [...active].sort(cmp2);
  const placed = /* @__PURE__ */ new Set();
  for (const t of tasks) if (!active.has(t.id)) placed.add(t.id);
  const delays = {};
  const unresolved = {};
  const unresolvedReasons = {};
  const allPredsPlaced = (id) => predsOf.get(id).every((p) => placed.has(p));
  let remaining = sortedActive.length;
  let safety = remaining + 1;
  while (remaining > 0 && safety-- > 0) {
    const pick = sortedActive.find((id) => !placed.has(id) && allPredsPlaced(id));
    if (!pick) break;
    const pf = computePF(pick, workTasks, sequences, projectCalendar, resourceCalendars, cpmOptions);
    let startDate;
    let slotUnresolved = [];
    let slotReason;
    if (pinnedSet.has(pick)) {
      startDate = projEngine.nextWorkDay(pf);
    } else {
      const ls = options.constrainToFloat ? parseDate(baseLs(pick)) : null;
      const slot = findSlot(pick, pf, ls);
      startDate = slot.start;
      slotUnresolved = slot.unresolved;
      slotReason = slot.reason;
    }
    bookDemandAt(pick, startDate);
    placedStartIso.set(pick, formatDate(startDate));
    const delay = projEngine.workDaysBetween(pf, startDate) - 1;
    if (delay > 0) delays[pick] = delay;
    if (slotUnresolved.length > 0) {
      unresolved[pick] = slotUnresolved;
      if (slotReason) unresolvedReasons[pick] = slotReason;
    }
    workById.get(pick).levelingDelay = delay > 0 ? delay : void 0;
    placed.add(pick);
    remaining--;
  }
  const trial = new CPMSolver(workTasks, sequences, projectCalendar, resourceCalendars, cpmOptions).solve();
  const projectEndAfter = trial.error ? cpmResult.projectEnd : trial.projectEnd;
  const shifts = {};
  for (const t of tasks) {
    const cur = t.time.earlyStart;
    const tr = trial.tasks.get(t.id)?.earlyStart;
    if (!cur || !tr || cur === tr) continue;
    const from = parseDate(cur), to = parseDate(tr);
    const delta = to >= from ? projEngine.workDaysBetween(from, to) - 1 : -(projEngine.workDaysBetween(to, from) - 1);
    shifts[t.id] = { oldStart: cur, newStart: tr, delta };
  }
  return {
    delays,
    unresolved,
    unresolvedReasons,
    shifts,
    projectEndBefore: cpmResult.projectEnd,
    projectEndAfter
  };
  function findSlot(taskId, pf, ls) {
    const task = taskById.get(taskId);
    const dur = task.time.scheduleDuration;
    const byRes = demandByTask.get(taskId);
    let cand = projEngine.nextWorkDay(pf);
    let calendarFeasibleSeen = false;
    let guard = 0;
    while (guard++ < scanLimit) {
      const occ2 = nextWorkDays(projEngine, cand, dur);
      if (!calendarFeasibleSeen && calendarOk(byRes, occ2)) calendarFeasibleSeen = true;
      if (fits(byRes, occ2)) return { start: cand, unresolved: [] };
      const next = projEngine.nextWorkDayAfter(cand);
      if (ls && next > ls) break;
      cand = next;
    }
    const occ = nextWorkDays(projEngine, pf, dur);
    const conflicts = [];
    for (const [resId, arr] of byRes) {
      for (let i = 0; i < arr.length && i < occ.length; i++) {
        if (bookedOn(resId, occ[i]) + arr[i] > capacityOf(resId, occ[i]) + EPS) conflicts.push(occ[i]);
      }
    }
    return {
      start: projEngine.nextWorkDay(pf),
      unresolved: [...new Set(conflicts)].sort(),
      reason: reasonFor(byRes, calendarFeasibleSeen)
    };
  }
  function reasonFor(byRes, calendarFeasibleSeen) {
    for (const [resId, arr] of byRes) {
      const peak = arr.length > 0 ? Math.max(...arr) : 0;
      if (peak > maxCapacityOf(resId) + EPS) return "INTRINSIC_OVERRUN";
    }
    if (!calendarFeasibleSeen) return "CALENDAR_MISMATCH";
    return "INSUFFICIENT_CAPACITY";
  }
  function calendarOk(byRes, occ) {
    for (const [resId, arr] of byRes) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= 0) continue;
        if (i >= occ.length) return false;
        if (capacityOf(resId, occ[i]) <= 0) return false;
      }
    }
    return true;
  }
  function fits(byRes, occ) {
    for (const [resId, arr] of byRes) {
      for (let i = 0; i < arr.length && i < occ.length; i++) {
        if (arr[i] <= 0) continue;
        if (bookedOn(resId, occ[i]) + arr[i] > capacityOf(resId, occ[i]) + EPS) return false;
      }
    }
    return true;
  }
}
function nextWorkDays(engine, start, count) {
  const isos = [];
  let current2 = engine.nextWorkDay(new Date(start.getTime()));
  let guard = 0;
  while (isos.length < count && guard++ < 2e5) {
    isos.push(formatDate(current2));
    if (isos.length >= count) break;
    current2 = engine.nextWorkDayAfter(current2);
  }
  return isos;
}
function computePF(taskId, workTasks, sequences, projectCalendar, registry, cpmOptions) {
  const solver = new CPMSolver(workTasks, sequences, projectCalendar, registry, cpmOptions);
  const res = solver.solve();
  const r = res.tasks.get(taskId);
  return r ? parseDate(r.earlyStart) : parseDate(workTasks.find((t) => t.id === taskId).time.earlyStart);
}

// src/state/slices/scheduleSlice.ts
var createScheduleSlice = (set2, get2) => ({
  cpmResult: null,
  resourceLoadResult: null,
  scheduleStale: false,
  recomputeResourceLoad: () => {
    set2((s) => {
      s.resourceLoadResult = computeResourceLoad(
        s.resources,
        s.assignments,
        s.tasks,
        s.calendar,
        s.calendars
      );
    });
  },
  runCPM: () => {
    set2((s) => {
      s.scheduleStale = false;
      const leafTasks = s.tasks.filter((t) => t.childIds.length === 0);
      const solver = new CPMSolver(leafTasks, s.sequences, s.calendar, s.calendars, {
        dataDate: s.project.statusDate,
        progressMode: s.project.progressMode,
        // Fase 2.9 golf 0: project-scoped reken-opties doorgeven. De solver leest ze nog nergens
        // gedragswijzigend (afwezig/leeg ⇒ byte-identiek); de latere golven activeren ze.
        schedulingOptions: s.project.schedulingOptions
      });
      const result = solver.solve();
      if (result.error) {
        s.cpmResult = result;
        s.resourceLoadResult = null;
        return;
      }
      applyCpmResult(s.tasks, result, { projectCalendar: s.calendar, calendars: s.calendars });
      s.cpmResult = result;
      s.resourceLoadResult = computeResourceLoad(
        s.resources,
        s.assignments,
        s.tasks,
        s.calendar,
        s.calendars
      );
    });
    get2().recomputeViewRows();
    const cpmError = get2().cpmResult?.error;
    if (cpmError) {
      get2().notify({
        severity: "error",
        messageKey: "notifications.scheduleFailed",
        detail: cpmError,
        dedupeKey: "cpm-error"
      });
    }
    const cpm = get2().cpmResult;
    emitExtensionEvent(HOST_EVENTS.scheduleCalculated, {
      hasError: !!cpm?.error,
      error: cpm?.error ?? null,
      criticalTasks: get2().tasks.filter((t) => t.time.isCritical).length
    });
  },
  levelResources: (options) => {
    const s = get2();
    const cpm = s.cpmResult;
    if (!cpm || cpm.error) {
      const end = cpm?.projectEnd ?? "";
      return { delays: {}, unresolved: {}, unresolvedReasons: {}, shifts: {}, projectEndBefore: end, projectEndAfter: end };
    }
    const leafTasks = s.tasks.filter((t) => t.childIds.length === 0);
    return levelResources(
      leafTasks,
      s.sequences,
      s.resources,
      s.assignments,
      s.calendar,
      s.calendars,
      cpm,
      options,
      { dataDate: s.project.statusDate, progressMode: s.project.progressMode, schedulingOptions: s.project.schedulingOptions }
    );
  },
  applyLeveling: (result) => {
    set2((s) => {
      beginUndoable(s);
      for (const task of s.tasks) {
        const d = result.delays[task.id];
        task.levelingDelay = d !== void 0 && d > 0 ? d : void 0;
      }
      finishMutation(s);
    });
    get2().runCPM();
  },
  clearLeveling: () => {
    let changed = false;
    set2((s) => {
      if (!s.tasks.some((t) => t.levelingDelay !== void 0)) return;
      beginUndoable(s);
      for (const task of s.tasks) task.levelingDelay = void 0;
      finishMutation(s);
      changed = true;
    });
    if (changed) get2().runCPM();
  }
});

// src/state/slices/historySlice.ts
var createHistorySlice = (set2, get2) => ({
  undoStack: [],
  redoStack: [],
  undo: () => {
    resetUndoCoalescing();
    set2((s) => {
      if (s.undoStack.length === 0) return;
      s.redoStack.push(createSnapshot(s));
      restoreSnapshot(s, s.undoStack.pop());
    });
    get2().recomputeViewRows();
  },
  redo: () => {
    resetUndoCoalescing();
    set2((s) => {
      if (s.redoStack.length === 0) return;
      pushUndoSnapshot(s);
      restoreSnapshot(s, s.redoStack.pop());
    });
    get2().recomputeViewRows();
  }
});

// src/engine/renderer/timelineTiers.ts
var TIMESCALE_ZOOM = {
  year: 3,
  quarter: 8,
  month: 18,
  week: 45,
  day: 100,
  // Fase 2.8b (§6.2): uur-preset, midden in de 'hour'-band (zoom≥300 in `scaleFromZoom`), zodat
  // de keuze round-trip-stabiel 'hour' teruggeeft. Ligt onder de dag-max (400) ⇒ altijd bereikbaar,
  // ook zonder kwartier-zoom.
  hour: 350
};
var TIER_CONFIG = {
  year: { tier: "year", minLabelWidth: 60, stepDays: 365 },
  quarter: { tier: "quarter", minLabelWidth: 40, stepDays: 90 },
  month: { tier: "month", minLabelWidth: 50, stepDays: 30 },
  week: { tier: "week", minLabelWidth: 28, stepDays: 7 },
  day: { tier: "day", minLabelWidth: 18, stepDays: 1 },
  hour: { tier: "hour", minLabelWidth: 28, stepDays: 1 / 24 },
  quarterHour: { tier: "quarterHour", minLabelWidth: 28, stepDays: 1 / 96 }
};
function pickTiers(zoom, enableQuarterHour, enableHourTiers = false) {
  if (zoom < 4) return { major: "year", minor: "quarter" };
  if (zoom < 10) return { major: "month", minor: "week" };
  if (zoom < 25) return { major: "month", minor: "week" };
  if (zoom < 80) return { major: "month", mid: "week", minor: "day" };
  if (!enableHourTiers) return { major: "month", mid: "week", minor: "day" };
  if (zoom < 400 || !enableQuarterHour) return { major: "day", minor: "hour" };
  return { major: "hour", minor: "quarterHour" };
}
function nextTickBoundary(from, tier) {
  switch (tier) {
    case "year":
      return new Date(Date.UTC(from.getUTCFullYear() + 1, 0, 1));
    case "quarter": {
      const m = from.getUTCMonth();
      const nextQ = Math.floor(m / 3) * 3 + 3;
      if (nextQ >= 12) return new Date(Date.UTC(from.getUTCFullYear() + 1, 0, 1));
      return new Date(Date.UTC(from.getUTCFullYear(), nextQ, 1));
    }
    case "month": {
      const m = from.getUTCMonth();
      if (m === 11) return new Date(Date.UTC(from.getUTCFullYear() + 1, 0, 1));
      return new Date(Date.UTC(from.getUTCFullYear(), m + 1, 1));
    }
    case "week":
      return addCalendarDays(from, 7);
    case "day":
      return addCalendarDays(from, 1);
    case "hour": {
      const r = new Date(from.getTime());
      r.setUTCHours(r.getUTCHours() + 1, 0, 0, 0);
      return r;
    }
    case "quarterHour": {
      const r = new Date(from.getTime());
      r.setUTCMinutes(r.getUTCMinutes() + 15, 0, 0);
      return r;
    }
  }
}
function snapToTickStart(date, tier, weekStartDay = "monday") {
  switch (tier) {
    case "year":
      return new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    case "quarter": {
      const m = date.getUTCMonth();
      return new Date(Date.UTC(date.getUTCFullYear(), Math.floor(m / 3) * 3, 1));
    }
    case "month":
      return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
    case "week": {
      const r = new Date(date.getTime());
      const dow2 = r.getUTCDay();
      const offset = weekStartDay === "sunday" ? dow2 : dow2 === 0 ? 6 : dow2 - 1;
      r.setUTCDate(r.getUTCDate() - offset);
      r.setUTCHours(0, 0, 0, 0);
      return r;
    }
    case "day": {
      const r = new Date(date.getTime());
      r.setUTCHours(0, 0, 0, 0);
      return r;
    }
    case "hour": {
      const r = new Date(date.getTime());
      r.setUTCMinutes(0, 0, 0);
      return r;
    }
    case "quarterHour": {
      const r = new Date(date.getTime());
      r.setUTCMinutes(Math.floor(r.getUTCMinutes() / 15) * 15, 0, 0);
      return r;
    }
  }
}

// src/utils/ganttViewport.ts
var chartWidth = null;
function getGanttChartWidth() {
  return chartWidth;
}
var maxScrollX = null;
var maxScrollY = null;
function clampGanttScroll(x, y) {
  return {
    x: maxScrollX !== null ? Math.min(x, maxScrollX) : x,
    y: maxScrollY !== null ? Math.min(y, maxScrollY) : y
  };
}

// src/utils/noneLabel.ts
var noneLabel = "(geen)";
function getNoneLabelValue() {
  return noneLabel;
}

// src/engine/view/filterEval.ts
function resourceNames(task, ctx) {
  return ctx.assignments.filter((a) => a.taskId === task.id).map((a) => ctx.resources.find((r) => r.id === a.resourceId)?.name).filter((n) => !!n);
}
function resolveField(field2, task, ctx) {
  switch (field2.src) {
    case "builtin":
      switch (field2.key) {
        case "name":
          return task.name;
        case "wbsCode":
          return task.wbsCode;
        case "duration":
          return task.time.scheduleDuration;
        case "start":
          return task.time.earlyStart || task.time.scheduleStart;
        case "finish":
          return task.time.earlyFinish || task.time.scheduleFinish;
        case "totalFloat":
          return task.time.totalFloat;
        case "isCritical":
          return task.time.isCritical;
        case "completion":
          return task.time.completion;
        case "taskType":
          return task.taskType;
        case "isMilestone":
          return task.isMilestone;
        // Fase 2.9 (§3.5): additieve analyse-velden. freeFloat is altijd aanwezig; de andere drie
        // zijn optioneel (undefined tot de bijbehorende analyse-golf draait) — undefined-tolerant.
        case "freeFloat":
          return task.time.freeFloat;
        case "interferingFloat":
          return task.time.interferingFloat;
        case "isNearCritical":
          return task.time.isNearCritical;
        case "floatPath":
          return task.time.floatPath;
      }
      return void 0;
    case "activityCode":
      return task.activityCodes?.[field2.typeId];
    case "customField":
      return task.customFields?.[field2.defId];
    case "resource":
      return resourceNames(task, ctx);
  }
}
function strOf(v) {
  if (v === void 0 || v === null) return "";
  if (Array.isArray(v)) return v.join(", ");
  return String(v);
}
function asNum(v) {
  if (typeof v === "number") return Number.isFinite(v) ? v : void 0;
  if (typeof v === "string" && v.trim() !== "" && !isNaN(Number(v))) return Number(v);
  return void 0;
}
function looseEq(v, value) {
  if (typeof v === "boolean" || typeof value === "boolean") {
    return String(v) === String(value);
  }
  const na = asNum(v), nb = asNum(value);
  if (na !== void 0 && nb !== void 0) return na === nb;
  return strOf(v) === strOf(value);
}
function cmp(v, value) {
  const na = asNum(v), nb = asNum(value);
  if (na !== void 0 && nb !== void 0) return na - nb;
  const sa = strOf(v), sb = strOf(value);
  return sa < sb ? -1 : sa > sb ? 1 : 0;
}
function applyOperator(operator, v, value, value2) {
  switch (operator) {
    case "isEmpty":
      return v === void 0 || v === null || v === "" || Array.isArray(v) && v.length === 0;
    case "eq":
      return looseEq(v, value);
    case "neq":
      return !looseEq(v, value);
    case "lt":
      return v !== void 0 && cmp(v, value) < 0;
    case "lte":
      return v !== void 0 && cmp(v, value) <= 0;
    case "gt":
      return v !== void 0 && cmp(v, value) > 0;
    case "gte":
      return v !== void 0 && cmp(v, value) >= 0;
    case "contains":
      return strOf(v).toLowerCase().includes(String(value ?? "").toLowerCase());
    case "startsWith":
      return strOf(v).toLowerCase().startsWith(String(value ?? "").toLowerCase());
    case "between":
      return v !== void 0 && cmp(v, value) >= 0 && cmp(v, value2) <= 0;
    case "in": {
      const set2 = Array.isArray(value) ? value.map(String) : value === void 0 ? [] : [String(value)];
      if (Array.isArray(v)) return v.some((x) => set2.includes(String(x)));
      return v !== void 0 && set2.includes(String(v));
    }
  }
}
function evaluate(node, task, ctx) {
  if (node.kind === "group") {
    if (node.children.length === 0) return true;
    return node.op === "AND" ? node.children.every((c) => evaluate(c, task, ctx)) : node.children.some((c) => evaluate(c, task, ctx));
  }
  const v = resolveField(node.field, task, ctx);
  return applyOperator(node.operator, v, node.value, node.value2);
}

// src/engine/view/visibleRows.ts
var NONE_RAWKEY = "\0__none__";
function encodeBandKey(rawKeys) {
  return JSON.stringify(rawKeys);
}
function asNum2(v) {
  if (typeof v === "number") return Number.isFinite(v) ? v : void 0;
  if (typeof v === "string" && v.trim() !== "" && !isNaN(Number(v))) return Number(v);
  return void 0;
}
function cmpValues(a, b) {
  const ea = a === void 0 || Array.isArray(a) && a.length === 0 || a === "";
  const eb = b === void 0 || Array.isArray(b) && b.length === 0 || b === "";
  if (ea && eb) return 0;
  if (ea) return 1;
  if (eb) return -1;
  const na = asNum2(a), nb = asNum2(b);
  if (na !== void 0 && nb !== void 0) return na - nb;
  const sa = Array.isArray(a) ? a.join(", ") : String(a);
  const sb = Array.isArray(b) ? b.join(", ") : String(b);
  return sa < sb ? -1 : sa > sb ? 1 : 0;
}
function sortTasks(tasks, sort, ctx) {
  if (sort.length === 0) return tasks;
  return tasks.map((t, i) => [t, i]).sort(([a, ia], [b, ib]) => {
    for (const lvl of sort) {
      const c = cmpValues(resolveField(lvl.field, a, ctx), resolveField(lvl.field, b, ctx));
      if (c !== 0) return lvl.dir === "asc" ? c : -c;
    }
    return ia - ib;
  }).map(([t]) => t);
}
function bucketsForLeaf(field2, task, ctx) {
  if (field2.src === "resource") {
    const names = resourceNames(task, ctx);
    if (names.length === 0) return [noneBucket(ctx)];
    return names.map((n) => ({ rawKey: n, label: n, order: n, isNone: false }));
  }
  if (field2.src === "activityCode") {
    const valueId = task.activityCodes?.[field2.typeId];
    if (!valueId) return [noneBucket(ctx)];
    const type = ctx.activityCodeTypes.find((t) => t.id === field2.typeId);
    const idx = type ? type.values.findIndex((v2) => v2.id === valueId) : -1;
    const val = idx >= 0 ? type.values[idx] : void 0;
    const label = val ? val.description ? `${val.code} \u2014 ${val.description}` : val.code : valueId;
    return [{ rawKey: valueId, label, order: idx >= 0 ? idx : Number.MAX_SAFE_INTEGER, isNone: false }];
  }
  const v = resolveField(field2, task, ctx);
  if (v === void 0 || v === null || v === "") return [noneBucket(ctx)];
  const s = String(v);
  return [{ rawKey: s, label: s, order: v, isNone: false }];
}
function noneBucket(ctx) {
  return { rawKey: NONE_RAWKEY, label: ctx.noneLabel, order: void 0, isNone: true };
}
function partition(leaves, level, ctx) {
  const real = /* @__PURE__ */ new Map();
  let none = null;
  for (const leaf of leaves) {
    for (const b of bucketsForLeaf(level.field, leaf, ctx)) {
      if (b.isNone) {
        if (!none) none = { label: b.label, leaves: [] };
        none.leaves.push(leaf);
      } else {
        let e = real.get(b.rawKey);
        if (!e) {
          e = { label: b.label, order: b.order, leaves: [] };
          real.set(b.rawKey, e);
        }
        e.leaves.push(leaf);
      }
    }
  }
  const arr = [...real.entries()].map(([rawKey, e]) => ({ rawKey, ...e }));
  arr.sort((a, b) => cmpValues(a.order, b.order));
  if (level.dir === "desc") arr.reverse();
  const out = arr.map(({ rawKey, label, leaves: ls }) => ({ rawKey, label, leaves: ls, isNone: false }));
  if (none) out.push({ rawKey: NONE_RAWKEY, label: none.label, leaves: none.leaves, isNone: true });
  return out;
}
function computeViewRows(tasks, opts, ctx) {
  const { filter, group, sort, collapsedTaskIds, collapsedGroupKeys } = opts;
  const byId = new Map(tasks.map((t) => [t.id, t]));
  const visible = /* @__PURE__ */ new Set();
  const dimmed = /* @__PURE__ */ new Map();
  if (filter === null) {
    for (const t of tasks) {
      visible.add(t.id);
      dimmed.set(t.id, false);
    }
  } else {
    for (const leaf of tasks) {
      if (leaf.childIds.length !== 0) continue;
      if (!evaluate(filter, leaf, ctx)) continue;
      visible.add(leaf.id);
      dimmed.set(leaf.id, false);
      let p = leaf.parentId;
      while (p) {
        if (!visible.has(p)) {
          visible.add(p);
          dimmed.set(p, true);
        }
        p = byId.get(p)?.parentId ?? null;
      }
    }
  }
  if (group.length > 0) {
    const rows2 = [];
    const visibleLeaves = tasks.filter((t) => t.childIds.length === 0 && visible.has(t.id));
    const walk2 = (leaves, levelIndex, path) => {
      if (levelIndex >= group.length) {
        for (const leaf of sortTasks(leaves, sort, ctx)) {
          rows2.push({ kind: "task", task: leaf, depth: group.length, dimmed: false });
        }
        return;
      }
      for (const band of partition(leaves, group[levelIndex], ctx)) {
        const key = encodeBandKey([...path, band.rawKey]);
        const collapsed = collapsedGroupKeys.has(key);
        rows2.push({
          kind: "group",
          key,
          label: band.label,
          count: band.leaves.length,
          depth: levelIndex,
          levelIndex,
          collapsed
        });
        if (!collapsed) walk2(band.leaves, levelIndex + 1, [...path, band.rawKey]);
      }
    };
    walk2(visibleLeaves, 0, []);
    return rows2;
  }
  const rows = [];
  const seen = /* @__PURE__ */ new Set();
  const emit = (task, depth, hidden) => {
    if (seen.has(task.id)) return;
    seen.add(task.id);
    if (!hidden && visible.has(task.id)) {
      rows.push({ kind: "task", task, depth, dimmed: dimmed.get(task.id) ?? false });
    }
    const hideChildren = hidden || collapsedTaskIds.has(task.id);
    const kids = task.childIds.map((id) => byId.get(id)).filter((t) => !!t);
    for (const k of sortTasks(kids, sort, ctx)) emit(k, depth + 1, hideChildren);
  };
  const roots = tasks.filter((t) => !t.parentId);
  for (const r of sortTasks(roots, sort, ctx)) emit(r, 0, false);
  for (const t of tasks) {
    if (!seen.has(t.id) && visible.has(t.id)) {
      rows.push({ kind: "task", task: t, depth: 0, dimmed: dimmed.get(t.id) ?? false });
    }
  }
  return rows;
}
function allBandKeys(tasks, opts, ctx) {
  if (opts.group.length === 0) return [];
  const keys = [];
  for (const row of computeViewRows(tasks, { ...opts, collapsedGroupKeys: /* @__PURE__ */ new Set() }, ctx)) {
    if (row.kind === "group") keys.push(row.key);
  }
  return keys;
}
function firstRowIndexByTask(rows) {
  const map = /* @__PURE__ */ new Map();
  rows.forEach((row, i) => {
    if (row.kind === "task" && !map.has(row.task.id)) map.set(row.task.id, i);
  });
  return map;
}

// src/state/slices/viewSlice.ts
function rowInputs(s) {
  return {
    opts: {
      filter: s.view.filter ?? null,
      group: s.view.group ?? [],
      sort: s.view.sort ?? [],
      collapsedTaskIds: new Set(s.ui.collapsedTaskIds),
      collapsedGroupKeys: new Set(s.view.collapsedGroupKeys ?? [])
    },
    ctx: {
      activityCodeTypes: s.activityCodeTypes,
      customFieldDefs: s.customFieldDefs,
      resources: s.resources,
      assignments: s.assignments,
      // Vertaalde "(geen)"-label, door de consument (App) gezet — engine blijft i18n-vrij (§4.1).
      noneLabel: getNoneLabelValue()
    }
  };
}
var createViewSlice = (set2, get2) => ({
  view: createDefaultView(),
  viewRows: [],
  setZoom: (zoom) => set2((s) => {
    const max = s.ui.enableQuarterHourZoom ? 1e3 : 400;
    s.view.zoom = Math.max(0.5, Math.min(max, zoom));
  }),
  // §3.2/3.3: de schaalkeuze mapt naar een zoom-preset; `view.timeScale` is geen bron van waarheid
  // meer (de getoonde schaal wordt afgeleid via `scaleFromZoom`). Recenter (BESLIST §3.3): de datum
  // onder het viewportmidden blijft onder het midden — dezelfde ankerformule als Ctrl+= /−
  // (useGanttZoom.zoomAt) met anchorX = midden van het chart-gedeelte. Headless (geen
  // geregistreerde viewport-breedte) valt terug op alleen zoomen.
  setTimeScale: (scale) => {
    const s = get2();
    const oldZoom = s.view.zoom;
    const max = s.ui.enableQuarterHourZoom ? 1e3 : 400;
    const newZoom = Math.max(0.5, Math.min(max, TIMESCALE_ZOOM[scale]));
    const chartW = getGanttChartWidth();
    if (chartW !== null && newZoom !== oldZoom) {
      const daysUnderCenter = (s.view.scrollX + chartW / 2) / oldZoom;
      const newScrollX = Math.max(0, daysUnderCenter * newZoom - chartW / 2);
      set2((st) => {
        st.view.zoom = newZoom;
        st.view.scrollX = newScrollX;
      });
    } else {
      get2().setZoom(newZoom);
    }
  },
  // Fix 2 (fase 2.8a QA): boven de ondergrens (§0) ook een bovengrens klemmen op de werkelijke
  // inhoud (GanttCanvas registreert die bij elke render, `ganttViewport.ts`) — anders kan een
  // (per ongeluk) verticale overscroll of een horizontale scroll ná een extreme zoom-cyclus de
  // taakbalken-laag permanent buiten beeld duwen, zonder enige render-pass die dat herstelt.
  // Headless (geen geregistreerde grenzen): identiek aan de oude ondergrens-only-clamp.
  setScroll: (x, y) => set2((s) => {
    const clamped = clampGanttScroll(Math.max(0, x), Math.max(0, y));
    s.view.scrollX = clamped.x;
    s.view.scrollY = clamped.y;
  }),
  setViewStartDate: (date) => set2((s) => {
    s.view.viewStartDate = date;
  }),
  // Issue #16: een planning die pas in (bv.) 2027 start opende op "vandaag", ver links van de
  // balken — en zelfs een verschuiving-naar-begin liet alleen het BEGIN zien. Wens: het HELE
  // project in beeld (zoals Ctrl+0). De fit heeft de viewport-breedte nodig (die de store niet
  // kent), dus we zetten hier enkel een signaal; de GanttCanvas voert de gedeelde
  // computeFitToProject uit en wist het signaal.
  requestFitToProject: () => set2((s) => {
    s.view.pendingFit = true;
  }),
  clearPendingFit: () => set2((s) => {
    s.view.pendingFit = false;
  }),
  setHistogramResource: (resourceId) => set2((s) => {
    s.view.histogramResourceId = resourceId;
  }),
  setSplitView: (splitView) => set2((s) => {
    s.view.splitView = splitView;
  }),
  setColumns: (columns) => {
    set2((s) => {
      s.view.columns = columns;
    });
    get2().recomputeViewRows();
  },
  setFilter: (filter) => {
    set2((s) => {
      s.view.filter = filter;
    });
    get2().recomputeViewRows();
  },
  setGroup: (group) => {
    set2((s) => {
      s.view.group = group;
    });
    get2().recomputeViewRows();
  },
  setSort: (sort) => {
    set2((s) => {
      s.view.sort = sort;
    });
    get2().recomputeViewRows();
  },
  setCollapsedGroupKey: (key, collapsed) => {
    set2((s) => {
      const has2 = s.view.collapsedGroupKeys.includes(key);
      if (collapsed && !has2) s.view.collapsedGroupKeys.push(key);
      else if (!collapsed && has2) {
        s.view.collapsedGroupKeys = s.view.collapsedGroupKeys.filter((k) => k !== key);
      }
    });
    get2().recomputeViewRows();
  },
  collapseAllGroups: () => {
    const s = get2();
    if ((s.view.group?.length ?? 0) === 0) return;
    const { opts, ctx } = rowInputs(s);
    const keys = allBandKeys(s.tasks, opts, ctx);
    set2((st) => {
      st.view.collapsedGroupKeys = keys;
    });
    get2().recomputeViewRows();
  },
  expandAllGroups: () => {
    set2((st) => {
      st.view.collapsedGroupKeys = [];
    });
    get2().recomputeViewRows();
  },
  recomputeViewRows: () => {
    const s = get2();
    const { opts, ctx } = rowInputs(s);
    const rows = computeViewRows(s.tasks, opts, ctx);
    set2((st) => {
      st.viewRows = rows;
    });
  },
  applyLayout: (layout) => {
    set2((s) => {
      s.view.columns = layout.columns;
      s.view.group = layout.group;
      s.view.sort = layout.sort;
      s.view.filter = layout.filter;
    });
    get2().setTimeScale(layout.timeScale);
    get2().recomputeViewRows();
  }
});

// src/state/slices/uiSlice.ts
var MAX_NOTIFICATIONS = 3;
var notificationSeq = 0;
function createDefaultUI() {
  return {
    showTaskDialog: false,
    editingTaskId: null,
    showDependencyMode: false,
    showProjectSettings: false,
    showProjectInfoDialog: false,
    leftPanelWidth: 350,
    rightPanelWidth: 280,
    rightPanelVisible: true,
    rightPanelCollapsed: false,
    activeRibbonTab: "start",
    backstageSection: "recent",
    collapsedTaskIds: [],
    showSettingsDialog: false,
    showCalendarDialog: false,
    showUpdateDialog: false,
    justUpdated: null,
    uiTheme: "dark",
    // Issue #25.4: interface-lettertype — default = huidige stylesheet-defaults + 100% schaal
    // (bestaande gebruikers merken niets; App.tsx hydrateert bij opstart uit localStorage).
    uiFontFamily: "default",
    uiFontScale: 100,
    enableQuarterHourZoom: false,
    weekStartDay: "monday",
    // 'drag' (zoom + slepen, map-style) is sinds issue #22 de standaard: het is de meest
    // intuïtieve navigatie en werkt zonder modifier-toetsen. Wie eerder al een voorkeur opsloeg
    // houdt die — settingsRegistry patcht dit veld alleen bij een aanwezige localStorage-sleutel,
    // en die wordt uitsluitend geschreven als de gebruiker de modus zelf omzet.
    scrollMode: "drag",
    positionDivision: "left-right",
    modifierMap: { plain: "vertical", ctrl: "zoom", shift: "horizontal" },
    debugTerminalEnabled: false,
    debugTerminalOpen: false,
    documentChromeStyle: "tabs",
    ribbonCompact: false,
    showProjectOverview: false,
    pendingCloseDocId: null,
    showNewProjectDialog: false,
    showFeedbackDialog: false,
    showStructureDialog: false,
    traceMode: "off",
    showResourcePanel: false,
    resourcePanelDocked: false,
    showHistogram: false,
    histogramHeight: 160,
    showLevelingDialog: false,
    showBaselineDialog: false,
    showMoveProjectDialog: false,
    showBaselineOverlay: true,
    showProgressLine: true,
    showStatusDateLine: true,
    presentationMode: false,
    showMiniMap: false,
    showColumnsDialog: false,
    showFilterDialog: false,
    showLayoutsDialog: false,
    autoCalcCPM: false,
    // Bouwmodus (2026-07-13): default AAN = huidige bouwgerichte defaults/framing ongewijzigd.
    // App.tsx hydrateert bij opstart uit localStorage (loadConstructionMode).
    constructionMode: true,
    dateNotation: "dmy",
    // Fase 2.8b (§6.8): urenplanning-defaults — hoofdschakelaar uit, gemengd toegestaan,
    // duurweergave automatisch, balk-opsplitsing bij selectie.
    enableHourPlanning: false,
    allowMixedDayHour: true,
    durationDisplay: "auto",
    barSplitMode: "selection",
    // Issue #21 punt 5 (fase 2): default UIT (§0/§7.1 user-besluit).
    compressNonWorkdays: false,
    hourDataNotice: false,
    structureLockedNotice: 0,
    showShortcutsDialog: false,
    showBenchmarkDialog: false,
    showPoolImportDialog: false,
    poolImportCompanyId: null,
    showLibraryLinkDialog: false,
    libraryRefreshNotice: null,
    resourcesView: "project",
    // Issue #48-1: ephemeral verzoek-vlag voor een concept-rij in het resource-paneel (zie UIState).
    pendingNewResource: false,
    // Fase 2.10 onderdeel 3: first-startup — ephemeral, bootstrap-hook in App.tsx zet
    // showWelcomeDialog o.b.v. de persistente `welcomeSeen`-vlag (settingsStore.ts).
    showWelcomeDialog: false,
    showTourOverlay: false,
    tourStepIndex: 0,
    tourSnapshot: null,
    // MCP-bridge / AI-modus (fase 1): AI-modus default uit (geen AI-tabblad); server staat default
    // uit op de default-poort; geen pauze/lezen.
    aiMode: false,
    aiAutostart: false,
    aiServerStatus: { state: "off", port: MCP_DEFAULT_PORT },
    aiPaused: false,
    aiReadOnly: false,
    aiActivityOpen: false,
    notifications: []
  };
}
var createUiSlice = (set2, get2) => ({
  ui: createDefaultUI(),
  setUI: (updates) => set2((s) => {
    if (updates.debugTerminalEnabled === false) {
      updates.debugTerminalOpen = false;
    }
    if (updates.aiMode === false && (updates.activeRibbonTab ?? s.ui.activeRibbonTab) === "ai") {
      updates.activeRibbonTab = "start";
    }
    if (updates.aiMode === false) {
      updates.aiActivityOpen = false;
    }
    const showResourceNext = updates.showResourcePanel ?? s.ui.showResourcePanel;
    const dockedNext = updates.resourcePanelDocked ?? s.ui.resourcePanelDocked;
    if (showResourceNext && dockedNext && !(s.ui.showResourcePanel && s.ui.resourcePanelDocked) && updates.rightPanelCollapsed === void 0) {
      updates.rightPanelCollapsed = false;
    }
    if (updates.rightPanelCollapsed === false && showResourceNext && !dockedNext && updates.showResourcePanel === void 0) {
      updates.showResourcePanel = false;
      updates.resourcePanelDocked = false;
    }
    Object.assign(s.ui, updates);
    const max = s.ui.enableQuarterHourZoom ? 1e3 : 400;
    if (s.view.zoom > max) s.view.zoom = max;
  }),
  // Presentation mode (fase 2.7, §9): ui-flag + echte Fullscreen-API. De fullscreenchange-listener
  // (App.tsx) zet de flag terug op false als de gebruiker fullscreen verlaat buiten onze knop/F11 om
  // (bv. OS-toets), zodat flag en werkelijkheid nooit desyncen.
  setPresentationMode: (on) => {
    set2((s) => {
      s.ui.presentationMode = on;
    });
    if (typeof document === "undefined") return;
    if (on) {
      document.documentElement.requestFullscreen?.().catch(() => {
      });
    } else if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {
      });
    }
  },
  setAiServerStatus: (status) => set2((s) => {
    s.ui.aiServerStatus = status;
  }),
  setAiPaused: (paused) => set2((s) => {
    s.ui.aiPaused = paused;
  }),
  setAiReadOnly: (readOnly) => set2((s) => {
    s.ui.aiReadOnly = readOnly;
  }),
  // issue #26: sessie-UI-state, dus geen undo-snapshot en niet gepersisteerd — puur een signaal
  // waar `StructureLockedNotice` op reageert.
  notifyStructureLocked: () => set2((s) => {
    s.ui.structureLockedNotice += 1;
  }),
  notify: (n) => set2((s) => {
    if (n.dedupeKey) {
      const existing = s.ui.notifications.find((x) => x.dedupeKey === n.dedupeKey);
      if (existing) {
        existing.count += 1;
        existing.severity = n.severity;
        existing.messageKey = n.messageKey;
        existing.params = n.params;
        existing.detail = n.detail;
        return;
      }
    }
    s.ui.notifications.push({ ...n, id: `n${++notificationSeq}`, count: 1 });
    if (s.ui.notifications.length > MAX_NOTIFICATIONS) {
      const idx = s.ui.notifications.findIndex((x) => x.severity === "info");
      if (idx >= 0) s.ui.notifications.splice(idx, 1);
      else s.ui.notifications.shift();
    }
  }),
  dismissNotification: (id) => set2((s) => {
    const idx = s.ui.notifications.findIndex((x) => x.id === id);
    if (idx >= 0) s.ui.notifications.splice(idx, 1);
  }),
  toggleCollapse: (taskId) => {
    set2((s) => {
      const idx = s.ui.collapsedTaskIds.indexOf(taskId);
      if (idx >= 0) {
        s.ui.collapsedTaskIds.splice(idx, 1);
      } else {
        s.ui.collapsedTaskIds.push(taskId);
      }
    });
    get2().recomputeViewRows();
  },
  collapseTasks: (taskIds) => {
    set2((s) => {
      const summaryIds = s.tasks.filter((t) => t.childIds.length > 0).map((t) => t.id);
      if (!taskIds || taskIds.length === 0) {
        s.ui.collapsedTaskIds = summaryIds;
        return;
      }
      const isSummary = new Set(summaryIds);
      const collapsed = new Set(s.ui.collapsedTaskIds);
      for (const id of taskIds) {
        if (!isSummary.has(id) || collapsed.has(id)) continue;
        collapsed.add(id);
        s.ui.collapsedTaskIds.push(id);
      }
    });
    get2().recomputeViewRows();
  },
  expandTasks: (taskIds) => {
    set2((s) => {
      const summaryIds = new Set(s.tasks.filter((t) => t.childIds.length > 0).map((t) => t.id));
      const targets = !taskIds || taskIds.length === 0 ? summaryIds : new Set(taskIds.filter((id) => summaryIds.has(id)));
      s.ui.collapsedTaskIds = s.ui.collapsedTaskIds.filter((id) => !targets.has(id));
    });
    get2().recomputeViewRows();
  },
  // Modus-bewust (issue #35): de enige aanroeper is het bandkop-contextmenu, en dat verschijnt
  // alléén in gegroepeerde weergave — daar bedoelt "alles uit-/inklappen" dus de banden.
  expandAll: () => {
    const s = get2();
    if ((s.view.group?.length ?? 0) > 0) s.expandAllGroups();
    else s.expandTasks();
  },
  collapseAll: () => {
    const s = get2();
    if ((s.view.group?.length ?? 0) > 0) s.collapseAllGroups();
    else s.collapseTasks();
  }
});

// src/services/ifc/ifcConstants.ts
var DEFAULT_PRIORITY = 500;
var IFC_TIME_ANCHOR = "07:00:00";
var FIELD_MEASURE = {
  text: "IfcText",
  number: "IfcReal",
  integer: "IfcInteger",
  cost: "IfcMonetaryMeasure",
  date: "IfcDate",
  boolean: "IfcBoolean"
};
var MEASURE_TO_FIELD = (() => {
  const inv = { ifclabel: "text" };
  for (const [field2, measure] of Object.entries(FIELD_MEASURE)) {
    inv[measure.toLowerCase()] = field2;
  }
  return inv;
})();
var RESOURCE_TYPE_TO_IFC = {
  LABOR: "IFCLABORRESOURCE",
  EQUIPMENT: "IFCCONSTRUCTIONEQUIPMENTRESOURCE",
  MATERIAL: "IFCCONSTRUCTIONMATERIALRESOURCE",
  SUBCONTRACTOR: "IFCSUBCONTRACTRESOURCE",
  CREW: "IFCCREWRESOURCE"
};
var IFC_TO_RESOURCE_TYPE = (() => {
  const inv = { IFCCONSTRUCTIONPRODUCTRESOURCE: "EQUIPMENT" };
  for (const [type, entity] of Object.entries(RESOURCE_TYPE_TO_IFC)) {
    inv[entity] = type;
  }
  return inv;
})();

// src/services/ifc/ifcPsets.ts
var PSET = {
  // Per-taak (de acht met een descriptor in PER_TASK_PSETS).
  Constraints: "OPS_Constraints",
  ExternalLink: "OPS_ExternalLink",
  Hammock: "OPS_Hammock",
  Milestone: "OPS_Milestone",
  Leveling: "OPS_Leveling",
  TaskNotes: "OPS_TaskNotes",
  TaskAppearance: "OPS_TaskAppearance",
  Analysis: "OPS_Analysis",
  // Structuur/waarden op project- of taak-niveau (afwijkende vorm — alleen naam gedeeld).
  ProjectSettings: "OPS_ProjectSettings",
  StructureMeta: "OPS_StructureMeta",
  CustomFields: "OPS_CustomFields",
  ActivityCodes: "OPS_ActivityCodes",
  // Per-resource / per-taak-assignment (afwijkende vorm — alleen naam gedeeld).
  Resource: "OPS_Resource",
  Assignments: "OPS_Assignments",
  // Op de IfcWorkSchedule (autoritaire JSON-blob — alleen naam gedeeld).
  Baselines: "OPS_Baselines",
  SchedulingOptions: "OPS_SchedulingOptions",
  // Per kalender (afwijkende vorm — alleen naam gedeeld).
  Calendar: "OPS_Calendar",
  // Bedrijfsbibliotheek-pool als autoritatief JSON-blob op het IfcProject (spec B1, §4).
  Library: "OPS_Library"
};
function ifcStr(s) {
  if (!s) return "$";
  return `'${s.replace(/'/g, "''")}'`;
}
function ifcBool(b) {
  return b ? ".T." : ".F.";
}
var CONSTRAINT_VALID = ["ASAP", "ALAP", "SNET", "SNLT", "FNET", "FNLT", "MSO", "MFO"];
var PER_TASK_PSETS = [
  // 1. Fase 2.3/2.9 — datum-constraint (+ harde pin + secundaire, P6-native soft) + deadline. IfcTaskTime
  //    heeft geen constraint-/deadline-slots. ASAP (default) wordt niet geschreven.
  {
    name: PSET.Constraints,
    psetSeed: "pset_cst_",
    relSeed: "rel_cst_",
    write(task) {
      const props = [];
      const c = task.constraint;
      if (c && c.type !== "ASAP") {
        props.push({ name: "ConstraintType", value: `IFCLABEL(${ifcStr(c.type)})` });
        if (c.date) props.push({ name: "ConstraintDate", value: `IFCDATE(${ifcStr(c.date)})` });
        if (c.hard) props.push({ name: "Hard", value: "IFCBOOLEAN(.T.)" });
      }
      const c2 = task.constraint2;
      if (c2 && c2.type !== "ASAP") {
        props.push({ name: "ConstraintType2", value: `IFCLABEL(${ifcStr(c2.type)})` });
        if (c2.date) props.push({ name: "ConstraintDate2", value: `IFCDATE(${ifcStr(c2.date)})` });
      }
      if (task.deadline) props.push({ name: "Deadline", value: `IFCDATE(${ifcStr(task.deadline)})` });
      return props;
    },
    apply(task, props) {
      let ctype;
      let cdate;
      let hard = false;
      let ctype2;
      let cdate2;
      for (const { name, value } of props) {
        if (name === "Hard") {
          if (value === true) hard = true;
          continue;
        }
        if (typeof value !== "string") continue;
        if (name === "ConstraintType") ctype = value;
        else if (name === "ConstraintDate") cdate = value;
        else if (name === "ConstraintType2") ctype2 = value;
        else if (name === "ConstraintDate2") cdate2 = value;
        else if (name === "Deadline") task.deadline = value;
      }
      if (ctype && CONSTRAINT_VALID.includes(ctype)) {
        task.constraint = {
          type: ctype,
          ...cdate ? { date: cdate } : {},
          ...hard ? { hard: true } : {}
        };
      }
      if (ctype2 && CONSTRAINT_VALID.includes(ctype2)) {
        task.constraint2 = { type: ctype2, ...cdate2 ? { date: cdate2 } : {} };
      }
    }
  },
  // 2. Fase 2.9 (§4.5/§6) — externe (cross-project) dependencies als één autoritatief JSON-veld.
  {
    name: PSET.ExternalLink,
    psetSeed: "pset_extl_",
    relSeed: "rel_extl_",
    write(task) {
      const links = task.externalLinks;
      if (!links || links.length === 0) return null;
      return [{ name: "Links", value: `IFCTEXT(${ifcStr(JSON.stringify(links))})` }];
    },
    apply(task, props) {
      for (const { name, value } of props) {
        if (name !== "Links" || typeof value !== "string" || !value) continue;
        try {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed) && parsed.length > 0) task.externalLinks = parsed;
        } catch {
        }
      }
    }
  },
  // 3. Fase 2.9 (§3.2/§6) — hammock/LOE-vlag (geen native IfcTaskTypeEnum-waarde).
  {
    name: PSET.Hammock,
    psetSeed: "pset_hmk_",
    relSeed: "rel_hmk_",
    write(task) {
      return task.isHammock ? [{ name: "IsHammock", value: "IFCBOOLEAN(.T.)" }] : null;
    },
    apply(task, props) {
      for (const { name, value } of props) if (name === "IsHammock" && value === true) task.isHammock = true;
    }
  },
  // 4. Fase 2.4 — mijlpaalsoort + verplicht-vlag (IfcTaskTypeEnum kent geen start/finish-onderscheid).
  {
    name: PSET.Milestone,
    psetSeed: "pset_ms_",
    relSeed: "rel_ms_",
    write(task) {
      if (!task.isMilestone) return null;
      const props = [];
      if (task.milestoneKind === "START" || task.milestoneKind === "FINISH") {
        props.push({ name: "MilestoneKind", value: `IFCLABEL(${ifcStr(task.milestoneKind)})` });
      }
      if (task.mandatory) props.push({ name: "Mandatory", value: "IFCBOOLEAN(.T.)" });
      return props;
    },
    apply(task, props) {
      for (const { name, value } of props) {
        if (name === "MilestoneKind" && (value === "START" || value === "FINISH")) task.milestoneKind = value;
        else if (name === "Mandatory" && value === true) task.mandatory = true;
      }
    }
  },
  // 5. Fase 2.5 — nivelleer-vertraging (geen native per-taak-slot; §7.6/§7.7: undefined/0 schrijft niets).
  {
    name: PSET.Leveling,
    psetSeed: "pset_lvl_",
    relSeed: "rel_lvl_",
    write(task) {
      return task.levelingDelay ? [{ name: "LevelingDelay", value: `IFCINTEGER(${Math.round(task.levelingDelay)})` }] : null;
    },
    apply(task, props) {
      for (const { name, value } of props) {
        if (name !== "LevelingDelay") continue;
        if (typeof value === "number" && Number.isFinite(value)) task.levelingDelay = Math.round(value);
      }
    }
  },
  // 6. Fase 2.10 (item 1) — taak-aantekeningen (checklist) als één autoritatief JSON-veld.
  {
    name: PSET.TaskNotes,
    psetSeed: "pset_notes_",
    relSeed: "rel_notes_",
    write(task) {
      const notes = task.notes;
      if (!notes || notes.length === 0) return null;
      return [{ name: "Notes", value: `IFCTEXT(${ifcStr(JSON.stringify(notes))})` }];
    },
    apply(task, props) {
      for (const { name, value } of props) {
        if (name !== "Notes" || typeof value !== "string" || !value) continue;
        try {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed) && parsed.length > 0) task.notes = parsed;
        } catch {
        }
      }
    }
  },
  // 7. Fase 3 (H2) — taak-kleur (IfcTask heeft geen native kleur-attribuut).
  {
    name: PSET.TaskAppearance,
    psetSeed: "pset_appear_",
    relSeed: "rel_appear_",
    write(task) {
      return task.color ? [{ name: "Color", value: `IFCTEXT(${ifcStr(task.color)})` }] : null;
    },
    apply(task, props) {
      for (const { name, value } of props) if (name === "Color" && typeof value === "string" && value) task.color = value;
    }
  },
  // 8. Fase 3 (H2) — fase-2.9-analyse-uitvoer (interfererende float / bijna-kritiek / float-path).
  {
    name: PSET.Analysis,
    psetSeed: "pset_ana_",
    relSeed: "rel_ana_",
    write(task) {
      const t = task.time;
      const props = [];
      if (t.interferingFloat !== void 0) props.push({ name: "InterferingFloat", value: `IFCREAL(${t.interferingFloat})` });
      if (t.isNearCritical !== void 0) props.push({ name: "IsNearCritical", value: `IFCBOOLEAN(${ifcBool(t.isNearCritical)})` });
      if (t.floatPath !== void 0) props.push({ name: "FloatPath", value: `IFCINTEGER(${Math.round(t.floatPath)})` });
      return props;
    },
    apply(task, props) {
      for (const { name, value } of props) {
        if (name === "InterferingFloat" && typeof value === "number") task.time.interferingFloat = value;
        else if (name === "IsNearCritical" && typeof value === "boolean") task.time.isNearCritical = value;
        else if (name === "FloatPath" && typeof value === "number") task.time.floatPath = Math.round(value);
      }
    }
  }
];
var PER_TASK_PSET_BY_NAME = new Map(PER_TASK_PSETS.map((d) => [d.name, d]));

// src/utils/documents.ts
function documentTitle(filePath, projectName) {
  if (filePath) {
    const base = filePath.split(/[\\/]/).pop() || filePath;
    return base.replace(/\.[^.]+$/, "");
  }
  return projectName || "";
}
var DEFAULT_PROJECT_FILE_BASE = "project";
function projectFileBase(projectName) {
  return (projectName ?? "").trim() || DEFAULT_PROJECT_FILE_BASE;
}
function untitledOrdinals(rawTitles) {
  const untitledCount = rawTitles.filter((t) => !t).length;
  let seen = 0;
  return rawTitles.map((t) => {
    if (t) return void 0;
    seen++;
    return untitledCount > 1 && seen > 1 ? seen : void 0;
  });
}

// src/services/ifc/ifcTaskSlots.ts
var IFC_TASKTIME_SLOTS = [
  { key: "name", write: (w) => ifcStr(w.task.name + " Time") },
  { key: "dataOrigin", write: () => ".PREDICTED." },
  { key: "userDefinedDataOrigin", write: () => "$" },
  {
    key: "durationType",
    write: (w) => `.${w.task.time.durationType}.`,
    read: (t, arg) => {
      t.durationType = arg?.includes("ELAPSED") ? "ELAPSEDTIME" : "WORKTIME";
    }
  },
  {
    key: "scheduleDuration",
    write: (w) => w.schedDurArg,
    read: (t, arg, p) => {
      t.scheduleDuration = p.parseDur(arg);
    }
  },
  {
    key: "scheduleStart",
    write: (w) => w.dt(w.task.time.scheduleStart),
    read: (t, arg, p) => {
      t.scheduleStart = p.parseDate(arg);
    }
  },
  {
    key: "scheduleFinish",
    write: (w) => w.dt(w.task.time.scheduleFinish),
    read: (t, arg, p) => {
      t.scheduleFinish = p.parseDate(arg);
    }
  },
  {
    key: "earlyStart",
    write: (w) => w.dt(w.task.time.earlyStart),
    read: (t, arg, p) => {
      t.earlyStart = p.parseDate(arg);
    }
  },
  {
    key: "earlyFinish",
    write: (w) => w.dt(w.task.time.earlyFinish),
    read: (t, arg, p) => {
      t.earlyFinish = p.parseDate(arg);
    }
  },
  {
    key: "lateStart",
    write: (w) => w.dt(w.task.time.lateStart),
    read: (t, arg, p) => {
      t.lateStart = p.parseDate(arg);
    }
  },
  {
    key: "lateFinish",
    write: (w) => w.dt(w.task.time.lateFinish),
    read: (t, arg, p) => {
      t.lateFinish = p.parseDate(arg);
    }
  },
  {
    key: "freeFloat",
    write: (w) => w.ifcDuration(w.task.time.freeFloat),
    read: (t, arg, p) => {
      t.freeFloat = p.parseDur(arg);
    }
  },
  {
    key: "totalFloat",
    write: (w) => w.ifcDuration(w.task.time.totalFloat),
    read: (t, arg, p) => {
      t.totalFloat = p.parseDur(arg);
    }
  },
  {
    key: "isCritical",
    write: (w) => ifcBool(w.task.time.isCritical),
    read: (t, arg) => {
      t.isCritical = arg?.includes("T") || false;
    }
  },
  // StatusTime (14): geschreven als peildatum bij actuals, maar bij het lezen genegeerd — de
  // projectbrede statusdatum komt uit OPS_ProjectSettings (§15.3). Geen `read`.
  { key: "statusTime", write: (w) => w.statusTimeArg },
  {
    key: "actualDuration",
    write: (w) => w.actualDurationArg,
    read: (t, arg, p) => {
      t.actualDuration = p.optDur(arg);
    }
  },
  {
    key: "actualStart",
    write: (w) => w.actualStartArg,
    read: (t, arg, p) => {
      t.actualStart = p.optDate(arg);
    }
  },
  {
    key: "actualFinish",
    write: (w) => w.actualFinishArg,
    read: (t, arg, p) => {
      t.actualFinish = p.optDate(arg);
    }
  },
  {
    key: "remainingTime",
    write: (w) => w.remainingArg,
    read: (t, arg, p) => {
      t.remainingTime = p.optDur(arg);
    }
  },
  {
    key: "completion",
    write: (w) => w.task.time.completion.toFixed(1),
    read: (t, arg) => {
      t.completion = parseFloat(arg || "0") || 0;
    }
  }
];
var IFC_TASK_SLOTS = [
  { key: "globalId", write: (w) => w.guidArg },
  { key: "ownerHistory", write: (w) => `#${w.ownerHistId}` },
  { key: "name", write: (w) => ifcStr(w.task.name) },
  { key: "description", write: (w) => ifcStr(w.task.description) },
  { key: "objectType", write: () => "$" },
  { key: "identification", write: (w) => ifcStr(w.task.wbsCode) },
  { key: "longDescription", write: () => "$" },
  { key: "status", write: () => "$" },
  { key: "workMethod", write: () => "$" },
  { key: "isMilestone", write: (w) => ifcBool(w.task.isMilestone) },
  { key: "priority", write: (w) => w.task.priority !== DEFAULT_PRIORITY ? String(Math.round(w.task.priority)) : "$" },
  { key: "taskTime", write: (w) => `#${w.taskTimeId}` },
  { key: "predefinedType", write: (w) => `.${w.task.taskType}.` }
];
function indexMap(slots) {
  const m = {};
  slots.forEach((s, i) => {
    m[s.key] = i;
  });
  return m;
}
var TASKTIME_SLOT = indexMap(IFC_TASKTIME_SLOTS);
var TASK_SLOT = indexMap(IFC_TASK_SLOTS);

// src/services/ifc/ifcWriter.ts
function ifcGuid(seed) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_$";
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i) | 0;
  }
  let result = "";
  for (let i = 0; i < 22; i++) {
    const idx = Math.abs((hash * (i + 1) * 31 + i * 17) % chars.length);
    result += chars[idx];
    hash = hash << 3 ^ (hash >> 2) + i | 0;
  }
  return result;
}
function ifcDateTime(iso2) {
  if (!iso2) return "$";
  if (iso2.length === 10) return `'${iso2}T${IFC_TIME_ANCHOR}'`;
  return `'${iso2}'`;
}
function ifcDateTimeHour(iso2) {
  if (!iso2) return "$";
  if (iso2.length === 10) return `'${iso2}T00:00:00'`;
  if (iso2.length === 16) return `'${iso2}:00'`;
  return `'${iso2}'`;
}
function ifcDuration(days) {
  return `'P0Y0M${days}D'`;
}
function ifcDurationHour(minutes) {
  return `'${minutesToIsoDuration(minutes)}'`;
}
function guidOf(ctx, seed) {
  const cached = ctx.guids.get(seed);
  if (cached !== void 0) return cached;
  let guid = ifcGuid(seed);
  for (let n = 1; ctx.usedGuids.has(guid); n++) guid = ifcGuid(`${seed}#dup${n}`);
  ctx.guids.set(seed, guid);
  ctx.usedGuids.add(guid);
  return guid;
}
function ref(ctx, key) {
  return `#${ctx.idMap.get(key) || 0}`;
}
function addLine(ctx, key, line) {
  const id = ctx.nextId++;
  ctx.idMap.set(key, id);
  ctx.lines.push(`#${id}=${line};`);
  return id;
}
function writeIFC(input) {
  const {
    project,
    calendar,
    tasks,
    sequences,
    resources,
    assignments,
    activityCodeTypes = [],
    customFieldDefs = [],
    resourceCalendars = [],
    baselines = [],
    activeBaselineId = null,
    libraryPool = void 0
  } = input;
  const ctx = { lines: [], nextId: 1, idMap: /* @__PURE__ */ new Map(), guids: /* @__PURE__ */ new Map(), usedGuids: /* @__PURE__ */ new Set() };
  const now = (/* @__PURE__ */ new Date()).toISOString().split(".")[0];
  const headerText = (s) => s.replace(/[\u0000-\u001F\u007F]+/g, " ");
  const headerFileName = projectFileBase(headerText(project.name)) + ".ifc";
  const header = [
    "ISO-10303-21;",
    "HEADER;",
    "FILE_DESCRIPTION(('ViewDefinition [SchedulingView]'),'2;1');",
    `FILE_NAME(${ifcStr(headerFileName)},${ifcStr(now)},(${ifcStr(headerText(project.author || "Open Planner Studio"))}),(${ifcStr(headerText(project.company || "OpenAEC Foundation"))}),'Open Planner Studio 0.1','Open Planner Studio','');`,
    "FILE_SCHEMA(('IFC4X3'));",
    "ENDSEC;",
    "DATA;",
    ""
  ].join("\n");
  const personId = addLine(ctx, "_person", `IFCPERSON($,${ifcStr(project.author)},$,$,$,$,$,$)`);
  const orgId = addLine(ctx, "_org", `IFCORGANIZATION($,${ifcStr(project.company)},$,$,$)`);
  const personOrgId = addLine(ctx, "_personorg", `IFCPERSONANDORGANIZATION(#${personId},#${orgId},$)`);
  const appOrgId = addLine(ctx, "_apporg", `IFCORGANIZATION($,'OpenAEC Foundation',$,$,$)`);
  const appId = addLine(ctx, "_app", `IFCAPPLICATION(#${appOrgId},'0.1','Open Planner Studio','OPS')`);
  const ownerHistId = addLine(ctx, "_owner", `IFCOWNERHISTORY(#${personOrgId},#${appId},$,.NOCHANGE.,$,$,$,${Math.floor(Date.now() / 1e3)})`);
  const mId = addLine(ctx, "_m", `IFCSIUNIT(*,.LENGTHUNIT.,$,.METRE.)`);
  const sId = addLine(ctx, "_s", `IFCSIUNIT(*,.TIMEUNIT.,$,.SECOND.)`);
  const unitAssId = addLine(ctx, "_units", `IFCUNITASSIGNMENT((#${mId},#${sId}))`);
  const ptId = addLine(ctx, "_pt", `IFCCARTESIANPOINT((0.,0.,0.))`);
  const axId = addLine(ctx, "_ax", `IFCAXIS2PLACEMENT3D(#${ptId},$,$)`);
  const ctxId = addLine(ctx, "_ctx", `IFCGEOMETRICREPRESENTATIONCONTEXT($,'Plan',3,1.0E-05,#${axId},$)`);
  addLine(ctx, "_project", `IFCPROJECT(${ifcStr(guidOf(ctx, project.id))},#${ownerHistId},${ifcStr(project.name)},${ifcStr(project.description)},$,$,$,(#${ctxId}),#${unitAssId})`);
  const projectCalStepId = writeCalendar(ctx, calendar, ownerHistId);
  writeCalendarGenerationMeta(ctx, projectCalStepId, calendar, ownerHistId);
  const startDates = tasks.map((t) => t.time.scheduleStart).filter(Boolean).sort();
  const endDates = tasks.map((t) => t.time.scheduleFinish).filter(Boolean).sort();
  const planStart = startDates[0] || project.startDate;
  const planEnd = endDates[endDates.length - 1] || project.endDate;
  const workPlanId = addLine(
    ctx,
    "_workplan",
    `IFCWORKPLAN(${ifcStr(guidOf(ctx, project.id + "_wp"))},#${ownerHistId},${ifcStr(project.name)},${ifcStr(project.description)},$,$,${ifcDateTime(now)},$,$,$,$,$,${ifcDateTime(planStart)},${ifcDateTime(planEnd)},.PLANNED.)`
  );
  const workSchedId = addLine(
    ctx,
    "_worksched",
    `IFCWORKSCHEDULE(${ifcStr(guidOf(ctx, project.id + "_ws"))},#${ownerHistId},${ifcStr("Construction schedule v1.0")},$,$,$,${ifcDateTime(now)},$,$,$,$,$,${ifcDateTime(planStart)},${ifcDateTime(planEnd)},.PLANNED.)`
  );
  const baselineSchedRefs = [];
  for (const b of baselines) {
    const bId = addLine(
      ctx,
      `_baseline_ws_${b.id}`,
      `IFCWORKSCHEDULE(${ifcStr(guidOf(ctx, "baseline_ws_" + b.id))},#${ownerHistId},${ifcStr(b.name)},$,$,$,${ifcDateTime(b.createdAt)},$,$,$,$,$,$,${ifcDateTime(b.projectEnd)},.BASELINE.)`
    );
    baselineSchedRefs.push(`#${bId}`);
  }
  const schedRefs = [`#${workSchedId}`, ...baselineSchedRefs].join(",");
  addLine(
    ctx,
    "_agg_plan_sched",
    `IFCRELAGGREGATES(${ifcStr(guidOf(ctx, "agg_ps"))},#${ownerHistId},$,$,#${workPlanId},(${schedRefs}))`
  );
  const effCalByTask = effectiveCalendarByTask(tasks, calendar, resourceCalendars);
  for (const task of tasks) {
    const effCal = effCalByTask.get(task.id);
    writeTask(ctx, task, ownerHistId, project.statusDate, isHourCalendar(effCal), effCal?.hoursPerDay ?? calendar.hoursPerDay);
  }
  writeWBSNesting(ctx, tasks, ownerHistId);
  const rootTasks = tasks.filter((t) => !t.parentId);
  if (rootTasks.length > 0) {
    const rootRefs = rootTasks.map((t) => ref(ctx, `task_${t.id}`)).join(",");
    addLine(
      ctx,
      "_nest_sched",
      `IFCRELNESTS(${ifcStr(guidOf(ctx, "nest_root"))},#${ownerHistId},'WBS Hoofd',$,#${workSchedId},(${rootRefs}))`
    );
  }
  for (const seq of sequences) {
    writeSequence(ctx, seq, ownerHistId);
  }
  for (const res of resources) {
    writeResource(ctx, res, ownerHistId);
  }
  writeResourceMeta(ctx, resources, ownerHistId);
  writeCrewNesting(ctx, resources, ownerHistId);
  writeCalendarLibrary(
    ctx,
    resources,
    tasks,
    resourceCalendars.filter((c) => c.id !== project.calendarId),
    ownerHistId
  );
  writeAssignments(ctx, assignments, ownerHistId);
  writeAssignmentMeta(ctx, tasks, assignments, ownerHistId);
  if (tasks.length > 0) {
    const allTaskRefs = tasks.map((t) => ref(ctx, `task_${t.id}`)).join(",");
    addLine(
      ctx,
      "_ctrl",
      `IFCRELASSIGNSTOCONTROL(${ifcStr(guidOf(ctx, "ctrl"))},#${ownerHistId},$,$,(${allTaskRefs}),$,#${workSchedId})`
    );
  }
  writeStructure(ctx, project, tasks, activityCodeTypes, customFieldDefs, ownerHistId);
  writeLibraryPool(ctx, ownerHistId, libraryPool);
  emitPerTaskPsets(ctx, tasks, ownerHistId);
  writeBaselineMeta(ctx, workSchedId, baselines, activeBaselineId, ownerHistId);
  writeSchedulingOptionsMeta(ctx, workSchedId, project.schedulingOptions, ownerHistId);
  const footer = "\nENDSEC;\nEND-ISO-10303-21;\n";
  return header + ctx.lines.join("\n") + footer;
}
function ifcTypedValue(type, value) {
  switch (type) {
    case "text":
      return `IFCTEXT(${ifcStr(String(value))})`;
    case "number":
      return `IFCREAL(${Number(value)})`;
    case "integer":
      return `IFCINTEGER(${Math.round(Number(value))})`;
    case "cost":
      return `IFCMONETARYMEASURE(${Number(value)})`;
    case "date":
      return `IFCDATE(${ifcStr(String(value))})`;
    case "boolean":
      return `IFCBOOLEAN(${value ? ".T." : ".F."})`;
    default: {
      const _exhaustive = type;
      throw new Error(`Onbekend custom-field-type: ${String(_exhaustive)}`);
    }
  }
}
function writeStructure(ctx, project, tasks, activityCodeTypes, customFieldDefs, ownerHistId) {
  const projRef = ref(ctx, "_project");
  const relDefines = (key, objRef, setId) => addLine(
    ctx,
    key,
    `IFCRELDEFINESBYPROPERTIES(${ifcStr(guidOf(ctx, key))},#${ownerHistId},$,$,(${objRef}),#${setId})`
  );
  const projSettingProps = [];
  if (project.wbsAutoNumber !== void 0) {
    projSettingProps.push(addLine(
      ctx,
      "_ps_wbsauto",
      `IFCPROPERTYSINGLEVALUE('wbsAutoNumber',$,IFCBOOLEAN(${project.wbsAutoNumber ? ".T." : ".F."}),$)`
    ));
  }
  if (project.statusDate) {
    projSettingProps.push(addLine(
      ctx,
      "_ps_statusdate",
      `IFCPROPERTYSINGLEVALUE('StatusDate',$,IFCDATE(${ifcStr(project.statusDate)}),$)`
    ));
  }
  if (project.progressMode && project.progressMode !== "RETAINED_LOGIC") {
    projSettingProps.push(addLine(
      ctx,
      "_ps_progressmode",
      `IFCPROPERTYSINGLEVALUE('ProgressMode',$,IFCLABEL(${ifcStr(project.progressMode)}),$)`
    ));
  }
  const contractDateProp = (key, name, value) => addLine(
    ctx,
    key,
    `IFCPROPERTYSINGLEVALUE(${ifcStr(name)},$,${value ? `IFCDATE(${ifcStr(value)})` : "$"},$)`
  );
  projSettingProps.push(contractDateProp("_ps_projstart", "ProjectStartDate", project.startDate));
  projSettingProps.push(contractDateProp("_ps_projend", "ProjectEndDate", project.endDate));
  if (project.createdAt) {
    projSettingProps.push(addLine(
      ctx,
      "_ps_createdat",
      `IFCPROPERTYSINGLEVALUE('CreatedAt',$,IFCTEXT(${ifcStr(project.createdAt)}),$)`
    ));
  }
  if (project.modifiedAt) {
    projSettingProps.push(addLine(
      ctx,
      "_ps_modifiedat",
      `IFCPROPERTYSINGLEVALUE('ModifiedAt',$,IFCTEXT(${ifcStr(project.modifiedAt)}),$)`
    ));
  }
  if (project.companyId) {
    projSettingProps.push(addLine(
      ctx,
      "_ps_companyid",
      `IFCPROPERTYSINGLEVALUE('CompanyId',$,IFCTEXT(${ifcStr(project.companyId)}),$)`
    ));
  }
  if (project.companyName) {
    projSettingProps.push(addLine(
      ctx,
      "_ps_companyname",
      `IFCPROPERTYSINGLEVALUE('CompanyName',$,IFCTEXT(${ifcStr(project.companyName)}),$)`
    ));
  }
  if (projSettingProps.length > 0) {
    const setId = addLine(
      ctx,
      "_pset_projset",
      `IFCPROPERTYSET(${ifcStr(guidOf(ctx, "pset_projset"))},#${ownerHistId},${ifcStr(PSET.ProjectSettings)},$,(${projSettingProps.map((i) => `#${i}`).join(",")}))`
    );
    relDefines("_rel_projset", projRef, setId);
  }
  if (activityCodeTypes.length === 0 && customFieldDefs.length === 0) return;
  const metaJson = JSON.stringify({ activityCodeTypes, customFieldDefs });
  const metaPropId = addLine(
    ctx,
    "_ps_structmeta",
    `IFCPROPERTYSINGLEVALUE('structure',$,IFCTEXT(${ifcStr(metaJson)}),$)`
  );
  const metaSetId = addLine(
    ctx,
    "_pset_structmeta",
    `IFCPROPERTYSET(${ifcStr(guidOf(ctx, "pset_structmeta"))},#${ownerHistId},${ifcStr(PSET.StructureMeta)},$,(#${metaPropId}))`
  );
  relDefines("_rel_structmeta", projRef, metaSetId);
  const templateIds = [];
  if (customFieldDefs.length > 0) {
    const fieldTmplRefs = customFieldDefs.map((def) => {
      const id = addLine(
        ctx,
        `_cft_${def.id}`,
        `IFCSIMPLEPROPERTYTEMPLATE(${ifcStr(guidOf(ctx, "cft_" + def.id))},#${ownerHistId},${ifcStr(def.name)},$,.P_SINGLEVALUE.,${ifcStr(FIELD_MEASURE[def.type])},$,$,$,$,$,$)`
      );
      return `#${id}`;
    });
    templateIds.push(addLine(
      ctx,
      "_psett_fields",
      `IFCPROPERTYSETTEMPLATE(${ifcStr(guidOf(ctx, "psett_fields"))},#${ownerHistId},${ifcStr(PSET.CustomFields)},$,.PSET_OCCURRENCEDRIVEN.,'IfcTask',(${fieldTmplRefs.join(",")}))`
    ));
  }
  if (activityCodeTypes.length > 0) {
    const codeTmplRefs = activityCodeTypes.map((t) => {
      const labels = t.values.map((v) => `IFCLABEL(${ifcStr(v.code)})`).join(",");
      const enumId = addLine(
        ctx,
        `_acte_${t.id}`,
        `IFCPROPERTYENUMERATION(${ifcStr(t.name)},(${labels}),$)`
      );
      const id = addLine(
        ctx,
        `_actt_${t.id}`,
        `IFCSIMPLEPROPERTYTEMPLATE(${ifcStr(guidOf(ctx, "actt_" + t.id))},#${ownerHistId},${ifcStr(t.name)},$,.P_ENUMERATEDVALUE.,$,$,#${enumId},$,$,$,$)`
      );
      return `#${id}`;
    });
    templateIds.push(addLine(
      ctx,
      "_psett_codes",
      `IFCPROPERTYSETTEMPLATE(${ifcStr(guidOf(ctx, "psett_codes"))},#${ownerHistId},${ifcStr(PSET.ActivityCodes)},$,.PSET_OCCURRENCEDRIVEN.,'IfcTask',(${codeTmplRefs.join(",")}))`
    ));
  }
  if (templateIds.length > 0) {
    addLine(
      ctx,
      "_decl_templates",
      `IFCRELDECLARES(${ifcStr(guidOf(ctx, "decl_templates"))},#${ownerHistId},$,$,${projRef},(${templateIds.map((i) => `#${i}`).join(",")}))`
    );
  }
  const typeById = new Map(activityCodeTypes.map((t) => [t.id, t]));
  const defById = new Map(customFieldDefs.map((d) => [d.id, d]));
  for (const task of tasks) {
    const fieldEntries = Object.entries(task.customFields ?? {}).filter(([defId]) => defById.has(defId));
    if (fieldEntries.length > 0) {
      const propRefs = fieldEntries.map(([defId, value]) => {
        const def = defById.get(defId);
        const id = addLine(
          ctx,
          `_cfv_${task.id}_${defId}`,
          `IFCPROPERTYSINGLEVALUE(${ifcStr(def.name)},$,${ifcTypedValue(def.type, value)},$)`
        );
        return `#${id}`;
      });
      const setId = addLine(
        ctx,
        `_pset_cf_${task.id}`,
        `IFCPROPERTYSET(${ifcStr(guidOf(ctx, "pset_cf_" + task.id))},#${ownerHistId},${ifcStr(PSET.CustomFields)},$,(${propRefs.join(",")}))`
      );
      relDefines(`_rel_cf_${task.id}`, ref(ctx, `task_${task.id}`), setId);
    }
    const codeEntries = Object.entries(task.activityCodes ?? {}).filter(([typeId, valueId]) => {
      const t = typeById.get(typeId);
      return !!t && t.values.some((v) => v.id === valueId);
    });
    if (codeEntries.length > 0) {
      const propRefs = codeEntries.map(([typeId, valueId]) => {
        const t = typeById.get(typeId);
        const v = t.values.find((x) => x.id === valueId);
        const id = addLine(
          ctx,
          `_acv_${task.id}_${typeId}`,
          `IFCPROPERTYENUMERATEDVALUE(${ifcStr(t.name)},$,(IFCLABEL(${ifcStr(v.code)})),$)`
        );
        return `#${id}`;
      });
      const setId = addLine(
        ctx,
        `_pset_ac_${task.id}`,
        `IFCPROPERTYSET(${ifcStr(guidOf(ctx, "pset_ac_" + task.id))},#${ownerHistId},${ifcStr(PSET.ActivityCodes)},$,(${propRefs.join(",")}))`
      );
      relDefines(`_rel_ac_${task.id}`, ref(ctx, `task_${task.id}`), setId);
    }
  }
}
function writeLibraryPool(ctx, ownerHistId, pool) {
  if (!pool) return;
  const projRef = ref(ctx, "_project");
  const json = JSON.stringify(pool);
  const propId = addLine(
    ctx,
    "_ps_library",
    `IFCPROPERTYSINGLEVALUE('pool',$,IFCTEXT(${ifcStr(json)}),$)`
  );
  const setId = addLine(
    ctx,
    "_pset_library",
    `IFCPROPERTYSET(${ifcStr(guidOf(ctx, "pset_library"))},#${ownerHistId},${ifcStr(PSET.Library)},$,(#${propId}))`
  );
  addLine(
    ctx,
    "_rel_library",
    `IFCRELDEFINESBYPROPERTIES(${ifcStr(guidOf(ctx, "rel_library"))},#${ownerHistId},$,$,(${projRef}),#${setId})`
  );
}
var WRITTEN_PER_TASK_PSETS = PER_TASK_PSETS.filter((d) => d.name !== PSET.Analysis);
function emitPerTaskPsets(ctx, tasks, ownerHistId) {
  for (const desc of WRITTEN_PER_TASK_PSETS) {
    for (const task of tasks) {
      const specs = desc.write(task);
      if (!specs || specs.length === 0) continue;
      const propRefs = specs.map((s, i) => `#${addLine(
        ctx,
        `_prop_${desc.name}_${task.id}_${i}`,
        `IFCPROPERTYSINGLEVALUE(${ifcStr(s.name)},$,${s.value},$)`
      )}`);
      const setId = addLine(
        ctx,
        `_pset_${desc.name}_${task.id}`,
        `IFCPROPERTYSET(${ifcStr(guidOf(ctx, desc.psetSeed + task.id))},#${ownerHistId},${ifcStr(desc.name)},$,(${propRefs.join(",")}))`
      );
      addLine(
        ctx,
        `_rel_${desc.name}_${task.id}`,
        `IFCRELDEFINESBYPROPERTIES(${ifcStr(guidOf(ctx, desc.relSeed + task.id))},#${ownerHistId},$,$,(${ref(ctx, `task_${task.id}`)}),#${setId})`
      );
    }
  }
}
function writeBaselineMeta(ctx, workSchedId, baselines, activeBaselineId, ownerHistId) {
  if (baselines.length === 0) return;
  const json = JSON.stringify(baselines);
  const props = [];
  props.push(addLine(
    ctx,
    "_ps_baselines_json",
    `IFCPROPERTYSINGLEVALUE('Baselines',$,IFCTEXT(${ifcStr(json)}),$)`
  ));
  const baselineTaskGuids = {};
  for (const b of baselines) {
    for (const bt of b.tasks ?? []) {
      if (bt.taskId) baselineTaskGuids[bt.taskId] = guidOf(ctx, bt.taskId);
    }
  }
  if (Object.keys(baselineTaskGuids).length > 0) {
    props.push(addLine(
      ctx,
      "_ps_baselines_guids",
      `IFCPROPERTYSINGLEVALUE('TaskGuids',$,IFCTEXT(${ifcStr(JSON.stringify(baselineTaskGuids))}),$)`
    ));
  }
  if (activeBaselineId) {
    props.push(addLine(
      ctx,
      "_ps_baselines_active",
      `IFCPROPERTYSINGLEVALUE('ActiveBaselineId',$,IFCTEXT(${ifcStr(activeBaselineId)}),$)`
    ));
  }
  const setId = addLine(
    ctx,
    "_pset_baselines",
    `IFCPROPERTYSET(${ifcStr(guidOf(ctx, "pset_baselines"))},#${ownerHistId},${ifcStr(PSET.Baselines)},$,(${props.map((i) => `#${i}`).join(",")}))`
  );
  addLine(
    ctx,
    "_rel_baselines",
    `IFCRELDEFINESBYPROPERTIES(${ifcStr(guidOf(ctx, "rel_baselines"))},#${ownerHistId},$,$,(#${workSchedId}),#${setId})`
  );
}
function writeSchedulingOptionsMeta(ctx, workSchedId, options, ownerHistId) {
  if (!options || Object.keys(options).length === 0) return;
  const json = JSON.stringify(options);
  const propId = addLine(
    ctx,
    "_ps_schedopts",
    `IFCPROPERTYSINGLEVALUE('SchedulingOptions',$,IFCTEXT(${ifcStr(json)}),$)`
  );
  const setId = addLine(
    ctx,
    "_pset_schedopts",
    `IFCPROPERTYSET(${ifcStr(guidOf(ctx, "pset_schedopts"))},#${ownerHistId},${ifcStr(PSET.SchedulingOptions)},$,(#${propId}))`
  );
  addLine(
    ctx,
    "_rel_schedopts",
    `IFCRELDEFINESBYPROPERTIES(${ifcStr(guidOf(ctx, "rel_schedopts"))},#${ownerHistId},$,$,(#${workSchedId}),#${setId})`
  );
}
function shiftToPredefinedType(shift) {
  switch (shift) {
    case "SECOND":
      return ".SECONDSHIFT.";
    case "THIRD":
      return ".THIRDSHIFT.";
    case "USERDEFINED":
      return ".USERDEFINED.";
    default:
      return ".FIRSTSHIFT.";
  }
}
function writeCalendar(ctx, cal, ownerHistId, key = "_calendar") {
  const dayNums = cal.workDays.join(",");
  let timePeriodRefs;
  if (cal.workTime) {
    const firstDay = cal.workDays[0];
    const bands = firstDay && cal.workTime.byWeekday[firstDay] || [];
    const ids = bands.map(
      (b) => addLine(ctx, "_timeperiod", `IFCTIMEPERIOD('${minutesToClock(b.start)}','${minutesToClock(b.end)}')`)
    );
    timePeriodRefs = ids.map((i) => `#${i}`).join(",");
  } else {
    const startTime = `${String(cal.workStartHour).padStart(2, "0")}:00:00`;
    const endTime = `${String(cal.workEndHour).padStart(2, "0")}:00:00`;
    const timePeriodId = addLine(ctx, "_timeperiod", `IFCTIMEPERIOD('${startTime}','${endTime}')`);
    timePeriodRefs = `#${timePeriodId}`;
  }
  const recurrenceId = addLine(ctx, "_recurrence", `IFCRECURRENCEPATTERN(.WEEKLY.,$,(${dayNums}),$,$,$,$,(${timePeriodRefs}))`);
  const workTimeId = addLine(ctx, "_worktime", `IFCWORKTIME('Standard work week',.PREDICTED.,$,#${recurrenceId},$,$)`);
  const holidayRefs = [];
  for (const holiday of cal.holidays) {
    const hId = addLine(
      ctx,
      `_holiday_${holiday.name}`,
      `IFCWORKTIME(${ifcStr(holiday.name)},.PREDICTED.,$,$,'${holiday.startDate}','${holiday.endDate}')`
    );
    holidayRefs.push(`#${hId}`);
  }
  const exceptStr = holidayRefs.length > 0 ? `(${holidayRefs.join(",")})` : "$";
  const objectType = cal.shift === "USERDEFINED" ? ifcStr("USERDEFINED") : "$";
  return addLine(
    ctx,
    key,
    `IFCWORKCALENDAR(${ifcStr(guidOf(ctx, cal.id))},#${ownerHistId},${ifcStr(cal.name)},${ifcStr(cal.description)},${objectType},(#${workTimeId}),${exceptStr},${shiftToPredefinedType(cal.shift)})`
  );
}
function writeCalendarGenerationMeta(ctx, calStepId, cal, ownerHistId) {
  const gen = cal.generation;
  if (!gen && !cal.libraryOrigin) return;
  const props = [];
  if (gen) {
    props.push(addLine(
      ctx,
      `_opscal_ruleset_${cal.id}`,
      `IFCPROPERTYSINGLEVALUE('RuleSetId',$,IFCLABEL(${ifcStr(gen.ruleSetId)}),$)`
    ));
    if (gen.region) {
      props.push(addLine(
        ctx,
        `_opscal_region_${cal.id}`,
        `IFCPROPERTYSINGLEVALUE('Region',$,IFCLABEL(${ifcStr(gen.region)}),$)`
      ));
    }
    if (gen.breakChoice) {
      props.push(addLine(
        ctx,
        `_opscal_break_${cal.id}`,
        `IFCPROPERTYSINGLEVALUE('BreakChoice',$,IFCLABEL(${ifcStr(gen.breakChoice)}),$)`
      ));
    }
    props.push(addLine(
      ctx,
      `_opscal_from_${cal.id}`,
      `IFCPROPERTYSINGLEVALUE('GeneratedFromYear',$,IFCINTEGER(${gen.generatedFromYear}),$)`
    ));
    props.push(addLine(
      ctx,
      `_opscal_to_${cal.id}`,
      `IFCPROPERTYSINGLEVALUE('GeneratedToYear',$,IFCINTEGER(${gen.generatedToYear}),$)`
    ));
  }
  if (cal.libraryOrigin) {
    props.push(addLine(
      ctx,
      `_opscal_lo_${cal.id}`,
      `IFCPROPERTYSINGLEVALUE('LibraryOrigin',$,IFCTEXT(${ifcStr(JSON.stringify(cal.libraryOrigin))}),$)`
    ));
  }
  const setId = addLine(
    ctx,
    `_pset_opscal_${cal.id}`,
    `IFCPROPERTYSET(${ifcStr(guidOf(ctx, "pset_opscal_" + cal.id))},#${ownerHistId},${ifcStr(PSET.Calendar)},$,(${props.map((i) => `#${i}`).join(",")}))`
  );
  addLine(
    ctx,
    `_rel_opscal_${cal.id}`,
    `IFCRELDEFINESBYPROPERTIES(${ifcStr(guidOf(ctx, "rel_opscal_" + cal.id))},#${ownerHistId},$,$,(#${calStepId}),#${setId})`
  );
}
function writeCalendarLibrary(ctx, resources, tasks, calendars, ownerHistId) {
  for (const cal of calendars) {
    const calStepId = writeCalendar(ctx, cal, ownerHistId, `calendar_${cal.id}`);
    writeCalendarGenerationMeta(ctx, calStepId, cal, ownerHistId);
    const resRefs = resources.filter((r) => r.calendarId === cal.id).map((r) => ref(ctx, `res_${r.id}`)).filter((r) => r !== "#0");
    if (resRefs.length > 0) {
      addLine(
        ctx,
        `resctrl_${cal.id}`,
        `IFCRELASSIGNSTOCONTROL(${ifcStr(guidOf(ctx, "resctrl_" + cal.id))},#${ownerHistId},$,$,(${resRefs.join(",")}),$,#${calStepId})`
      );
    }
    const taskRefs = tasks.filter((t) => t.calendarId === cal.id).map((t) => ref(ctx, `task_${t.id}`)).filter((r) => r !== "#0");
    if (taskRefs.length > 0) {
      addLine(
        ctx,
        `taskctrl_${cal.id}`,
        `IFCRELASSIGNSTOCONTROL(${ifcStr(guidOf(ctx, "taskctrl_" + cal.id))},#${ownerHistId},$,$,(${taskRefs.join(",")}),$,#${calStepId})`
      );
    }
  }
}
function writeTask(ctx, task, ownerHistId, statusDate, isHour, effHoursPerDay2) {
  const t = task.time;
  const dt = isHour ? ifcDateTimeHour : ifcDateTime;
  const schedDurArg = isHour ? ifcDurationHour(taskMinutesForWrite(task, effHoursPerDay2)) : ifcDuration(t.scheduleDuration);
  const hasActuals = !!(t.actualStart || t.actualFinish);
  const statusTimeArg = hasActuals && statusDate ? dt(statusDate) : "$";
  const actualDurationArg = t.actualDuration != null ? ifcDuration(t.actualDuration) : "$";
  const actualStartArg = t.actualStart ? dt(t.actualStart) : "$";
  const actualFinishArg = t.actualFinish ? dt(t.actualFinish) : "$";
  const remainingArg = isHour && t.remainingMinutes != null ? ifcDurationHour(t.remainingMinutes) : t.remainingTime != null ? ifcDuration(t.remainingTime) : "$";
  const ttCtx = {
    task,
    dt,
    ifcDuration,
    schedDurArg,
    statusTimeArg,
    actualDurationArg,
    actualStartArg,
    actualFinishArg,
    remainingArg
  };
  const taskTimeId = addLine(
    ctx,
    `tasktime_${task.id}`,
    `IFCTASKTIME(${IFC_TASKTIME_SLOTS.map((s) => s.write(ttCtx)).join(",")})`
  );
  const taskCtx = {
    task,
    ownerHistId,
    guidArg: ifcStr(guidOf(ctx, task.id)),
    taskTimeId
  };
  addLine(
    ctx,
    `task_${task.id}`,
    `IFCTASK(${IFC_TASK_SLOTS.map((s) => s.write(taskCtx)).join(",")})`
  );
}
function writeWBSNesting(ctx, tasks, ownerHistId) {
  for (const task of tasks) {
    if (task.childIds.length === 0) continue;
    const childRefs = task.childIds.map((cid) => ref(ctx, `task_${cid}`)).filter((r) => r !== "#0").join(",");
    if (childRefs) {
      addLine(
        ctx,
        `nest_${task.id}`,
        `IFCRELNESTS(${ifcStr(guidOf(ctx, "nest_" + task.id))},#${ownerHistId},${ifcStr("WBS " + task.name)},$,${ref(ctx, `task_${task.id}`)},( ${childRefs}))`
      );
    }
  }
}
function ifcLagValue(seq) {
  if (typeof seq.lagPercent === "number" && Number.isFinite(seq.lagPercent)) {
    return `IFCRATIOMEASURE(${seq.lagPercent / 100})`;
  }
  if (typeof seq.lagMinutes === "number" && Number.isFinite(seq.lagMinutes)) {
    return `IFCDURATION('${minutesToIsoDuration(seq.lagMinutes)}')`;
  }
  const d = Number.isFinite(seq.lagDays) ? seq.lagDays : 0;
  return d < 0 ? `IFCDURATION('-P${-d}D')` : `IFCDURATION('P${d}D')`;
}
function writeSequence(ctx, seq, ownerHistId) {
  let lagRef = "$";
  const hasPercent = typeof seq.lagPercent === "number" && Number.isFinite(seq.lagPercent);
  const hasMinutes = typeof seq.lagMinutes === "number" && Number.isFinite(seq.lagMinutes) && seq.lagMinutes !== 0;
  if (seq.lagDays !== 0 || hasPercent || hasMinutes) {
    const durationType = seq.lagUnit === "ELAPSEDTIME" ? "ELAPSEDTIME" : "WORKTIME";
    const lagId = addLine(
      ctx,
      `lag_${seq.id}`,
      `IFCLAGTIME('Lag',.PREDICTED.,$,${ifcLagValue(seq)},.${durationType}.)`
    );
    lagRef = `#${lagId}`;
  }
  addLine(
    ctx,
    `seq_${seq.id}`,
    `IFCRELSEQUENCE(${ifcStr(guidOf(ctx, seq.id))},#${ownerHistId},$,$,${ref(ctx, `task_${seq.predecessorId}`)},${ref(ctx, `task_${seq.successorId}`)},${lagRef},.${seq.type}.,$)`
  );
}
function writeResource(ctx, res, ownerHistId) {
  const entityName = RESOURCE_TYPE_TO_IFC[res.type] ?? "IFCCONSTRUCTIONMATERIALRESOURCE";
  const entity = `${entityName}(${ifcStr(guidOf(ctx, res.id))},#${ownerHistId},${ifcStr(res.name)},${ifcStr(res.description)},$,$,$,$,.USERDEFINED.)`;
  addLine(ctx, `res_${res.id}`, entity);
}
function writeResourceMeta(ctx, resources, ownerHistId) {
  for (const res of resources) {
    const props = [];
    if (res.maxUnits !== 1) {
      const id = addLine(
        ctx,
        `_resmu_${res.id}`,
        `IFCPROPERTYSINGLEVALUE('MaxUnits',$,IFCREAL(${res.maxUnits}),$)`
      );
      props.push(`#${id}`);
    }
    if (res.costPerHour !== void 0) {
      const id = addLine(
        ctx,
        `_resch_${res.id}`,
        `IFCPROPERTYSINGLEVALUE('CostPerHour',$,IFCMONETARYMEASURE(${res.costPerHour}),$)`
      );
      props.push(`#${id}`);
    }
    if (res.unitOfMeasure) {
      const id = addLine(
        ctx,
        `_resuom_${res.id}`,
        `IFCPROPERTYSINGLEVALUE('UnitOfMeasure',$,IFCLABEL(${ifcStr(res.unitOfMeasure)}),$)`
      );
      props.push(`#${id}`);
    }
    if (res.availabilitySteps && res.availabilitySteps.length > 0) {
      const encoded = [...res.availabilitySteps].sort((a, b) => a.from.localeCompare(b.from)).map((s) => `${s.from}:${s.maxUnits}`).join(";");
      const id = addLine(
        ctx,
        `_resas_${res.id}`,
        `IFCPROPERTYSINGLEVALUE('AvailabilitySteps',$,IFCTEXT(${ifcStr(encoded)}),$)`
      );
      props.push(`#${id}`);
    }
    if (res.parentId) {
      const id = addLine(
        ctx,
        `_respg_${res.id}`,
        `IFCPROPERTYSINGLEVALUE('ParentGuid',$,IFCTEXT(${ifcStr(guidOf(ctx, res.parentId))}),$)`
      );
      props.push(`#${id}`);
    }
    if (res.libraryOrigin) {
      const id = addLine(
        ctx,
        `_reslo_${res.id}`,
        `IFCPROPERTYSINGLEVALUE('LibraryOrigin',$,IFCTEXT(${ifcStr(JSON.stringify(res.libraryOrigin))}),$)`
      );
      props.push(`#${id}`);
    }
    if (props.length === 0) continue;
    const setId = addLine(
      ctx,
      `_pset_res_${res.id}`,
      `IFCPROPERTYSET(${ifcStr(guidOf(ctx, "pset_res_" + res.id))},#${ownerHistId},${ifcStr(PSET.Resource)},$,(${props.join(",")}))`
    );
    addLine(
      ctx,
      `_rel_res_${res.id}`,
      `IFCRELDEFINESBYPROPERTIES(${ifcStr(guidOf(ctx, "rel_res_" + res.id))},#${ownerHistId},$,$,(${ref(ctx, `res_${res.id}`)}),#${setId})`
    );
  }
}
function writeCrewNesting(ctx, resources, ownerHistId) {
  const crews = resources.filter((r) => r.type === "CREW");
  for (const crew of crews) {
    const memberRefs = resources.filter((r) => r.parentId === crew.id).map((r) => ref(ctx, `res_${r.id}`)).filter((r) => r !== "#0");
    if (memberRefs.length === 0) continue;
    addLine(
      ctx,
      `nest_res_${crew.id}`,
      `IFCRELNESTS(${ifcStr(guidOf(ctx, "nest_res_" + crew.id))},#${ownerHistId},${ifcStr("Ploeg " + crew.name)},$,${ref(ctx, `res_${crew.id}`)},(${memberRefs.join(",")}))`
    );
  }
}
function writeAssignments(ctx, assignments, ownerHistId) {
  const byTask = /* @__PURE__ */ new Map();
  for (const a of assignments) {
    const resRef = ref(ctx, `res_${a.resourceId}`);
    if (resRef === "#0") continue;
    if (!byTask.has(a.taskId)) byTask.set(a.taskId, []);
    byTask.get(a.taskId).push(resRef);
  }
  for (const [taskId, resRefs] of byTask) {
    const taskRef = ref(ctx, `task_${taskId}`);
    if (taskRef === "#0") continue;
    addLine(
      ctx,
      `assign_${taskId}`,
      `IFCRELASSIGNSTOPROCESS(${ifcStr(guidOf(ctx, "assign_" + taskId))},#${ownerHistId},$,$,(${resRefs.join(",")}),$,${taskRef},$)`
    );
  }
}
function writeAssignmentMeta(ctx, tasks, assignments, ownerHistId) {
  const byTask = /* @__PURE__ */ new Map();
  for (const a of assignments) {
    if (!byTask.has(a.taskId)) byTask.set(a.taskId, []);
    byTask.get(a.taskId).push(a);
  }
  for (const task of tasks) {
    const list = byTask.get(task.id);
    if (!list || list.length === 0) continue;
    const props = list.map((a, index) => {
      const resGuid = guidOf(ctx, a.resourceId);
      const propName = `${resGuid}#${index}`;
      const val = `${a.unitsPerDay}|${a.curve ?? "UNIFORM"}`;
      const propId = addLine(
        ctx,
        `_asgn_${task.id}_${a.id}`,
        `IFCPROPERTYSINGLEVALUE(${ifcStr(propName)},$,IFCTEXT(${ifcStr(val)}),$)`
      );
      return `#${propId}`;
    });
    const setId = addLine(
      ctx,
      `_pset_asgn_${task.id}`,
      `IFCPROPERTYSET(${ifcStr(guidOf(ctx, "pset_asgn_" + task.id))},#${ownerHistId},${ifcStr(PSET.Assignments)},$,(${props.join(",")}))`
    );
    addLine(
      ctx,
      `_rel_asgn_${task.id}`,
      `IFCRELDEFINESBYPROPERTIES(${ifcStr(guidOf(ctx, "rel_asgn_" + task.id))},#${ownerHistId},$,$,(${ref(ctx, `task_${task.id}`)}),#${setId})`
    );
  }
}

// src/types/task.ts
var TASK_TYPE_TABLE = {
  CONSTRUCTION: true,
  INSTALLATION: true,
  DEMOLITION: true,
  LOGISTIC: true,
  ATTENDANCE: true,
  MOVE: true,
  RENOVATION: true,
  MAINTENANCE: true,
  USERDEFINED: true
};
var TASK_TYPES = Object.keys(TASK_TYPE_TABLE);

// src/services/ifc/ifcErrors.ts
var IfcParseError = class _IfcParseError extends Error {
  reason;
  constructor(reason, message2) {
    super(message2);
    this.name = "IfcParseError";
    this.reason = reason;
    Object.setPrototypeOf(this, _IfcParseError.prototype);
  }
};

// src/services/importNormalize.ts
function normalizeImportedProgress(tasks, statusDate) {
  for (const task of tasks) {
    const t = task.time;
    if (!Number.isFinite(t.completion)) t.completion = 0;
    t.completion = Math.min(1, Math.max(0, t.completion));
    const hasProgress = !!(t.actualStart || t.actualFinish || t.completion > 0);
    if (!hasProgress) {
      task.status = "NOT_STARTED";
      continue;
    }
    if (t.actualFinish) {
      t.completion = 1;
      if (!t.actualStart) t.actualStart = t.actualFinish;
      task.status = "COMPLETED";
    } else if (t.completion >= 1) {
      t.completion = 1;
      t.actualFinish = statusDate || formatDate(/* @__PURE__ */ new Date());
      if (!t.actualStart) t.actualStart = t.actualFinish;
      task.status = "COMPLETED";
    } else {
      task.status = "STARTED";
    }
    t.remainingTime = Math.round(t.scheduleDuration * (1 - t.completion));
  }
}
function rebuildWbsHierarchy(tasks) {
  const wbsToId = /* @__PURE__ */ new Map();
  for (const task of tasks) wbsToId.set(task.wbsCode, task.id);
  for (const task of tasks) {
    if (!task.wbsCode || !task.wbsCode.includes(".")) continue;
    const parts = task.wbsCode.split(".");
    parts.pop();
    const parentWbs = parts.join(".");
    const parentId = wbsToId.get(parentWbs);
    if (parentId) {
      task.parentId = parentId;
      const parent = tasks.find((t) => t.id === parentId);
      if (parent && !parent.childIds.includes(task.id)) {
        parent.childIds.push(task.id);
      }
    }
  }
}

// src/services/ifc/ifcReader.ts
var VALID_CURVES = ["UNIFORM", "FRONT_LOADED", "BACK_LOADED", "BELL", "EARLY_PEAK", "LATE_PEAK"];
var STEP_HEADER = "ISO-10303-21;";
var STEP_TERMINATOR = "END-ISO-10303-21;";
var TERMINATOR_PROBE = 4096;
function assertIfcIntegrity(content) {
  let i = content.charCodeAt(0) === 65279 ? 1 : 0;
  while (i < content.length && isSpaceCode(content.charCodeAt(i))) i++;
  if (content.slice(i, i + STEP_HEADER.length).toUpperCase() !== STEP_HEADER) {
    throw new IfcParseError(
      "not-step",
      `Geen IFC/STEP-bestand: de verplichte kop '${STEP_HEADER}' ontbreekt.`
    );
  }
  if (!content.slice(-TERMINATOR_PROBE).toUpperCase().includes(STEP_TERMINATOR)) {
    throw new IfcParseError(
      "truncated",
      `Onvolledig IFC-bestand: de afsluitende '${STEP_TERMINATOR}' ontbreekt \u2014 de tekst is afgekapt (bijvoorbeeld door een crash tijdens het schrijven).`
    );
  }
}
var DEFAULT_IMPORTED_PROJECT_NAME = "Imported project";
function readIFC(content, labels = {}) {
  assertIfcIntegrity(content);
  const entities = parseSTEP(content);
  const entityMap = /* @__PURE__ */ new Map();
  for (const e of entities) {
    entityMap.set(e.id, e);
  }
  const project = extractProject(entities, entityMap, labels);
  const calendar = extractCalendar(entities, entityMap);
  const baselineTaskStepIds = collectBaselineTaskStepIds(entities);
  const { tasks, taskStepIdMap, taskTimeEntities } = extractTasks(entities, entityMap, baselineTaskStepIds);
  const sequences = extractSequences(entities, entityMap, taskStepIdMap);
  extractNesting(entities, entityMap, tasks, taskStepIdMap);
  const { resources, resourceStepIdMap, resourceGuidMap } = extractResources(entities, entityMap);
  extractResourceMeta(entities, entityMap, resources, resourceStepIdMap, resourceGuidMap);
  extractCrewNesting(entities, resources, resourceStepIdMap);
  const resourceCalendars = extractCalendarLibrary(
    entities,
    entityMap,
    resources,
    resourceStepIdMap,
    tasks,
    taskStepIdMap
  );
  applyHourModeIFC(tasks, calendar, resourceCalendars, taskTimeEntities);
  const assignments = extractAssignments(entities, entityMap, taskStepIdMap, resourceStepIdMap);
  reconstructResourceIds(tasks, assignments);
  const libraryPoolOut = { value: void 0 };
  const { activityCodeTypes, customFieldDefs } = extractStructure(
    entities,
    entityMap,
    project,
    tasks,
    taskStepIdMap,
    libraryPoolOut
  );
  const { baselines, activeBaselineId } = extractBaselines(entities, entityMap, taskStepIdMap);
  const schedulingOptions = extractSchedulingOptions(entities, entityMap);
  if (schedulingOptions) project.schedulingOptions = schedulingOptions;
  normalizeImportedProgress(tasks, project.statusDate);
  return {
    project,
    calendar,
    tasks,
    sequences,
    resources,
    assignments,
    activityCodeTypes,
    customFieldDefs,
    resourceCalendars,
    baselines,
    activeBaselineId,
    libraryPool: libraryPoolOut.value
  };
}
var CH_QUOTE = 39;
var CH_STAR = 42;
var CH_SLASH = 47;
var CH_HASH = 35;
var CH_LPAREN = 40;
var CH_RPAREN = 41;
var CH_SEMI = 59;
var CH_EQ = 61;
var CH_E = 69;
function isWordCode(c) {
  return c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || c === 95;
}
function isSpaceCode(c) {
  return c === 32 || c >= 9 && c <= 13;
}
function skipQuotedOrComment(text, i) {
  const c = text.charCodeAt(i);
  if (c === CH_QUOTE) {
    for (let j = i + 1; j < text.length; j++) {
      if (text.charCodeAt(j) !== CH_QUOTE) continue;
      if (text.charCodeAt(j + 1) === CH_QUOTE) {
        j++;
        continue;
      }
      return j + 1;
    }
    return text.length;
  }
  if (c === CH_SLASH && text.charCodeAt(i + 1) === CH_STAR) {
    const end = text.indexOf("*/", i + 2);
    return end < 0 ? text.length : end + 2;
  }
  return -1;
}
function indexOfCode(text, token, from) {
  const first = token.charCodeAt(0);
  for (let i = from; i < text.length; ) {
    const c = text.charCodeAt(i);
    if (c === CH_QUOTE || c === CH_SLASH) {
      const skip = skipQuotedOrComment(text, i);
      if (skip >= 0) {
        i = skip;
        continue;
      }
    }
    if (c === first && text.startsWith(token, i)) return i;
    i++;
  }
  return -1;
}
function stripStepComments(text) {
  if (text.indexOf("/*") < 0) return text;
  let out = "";
  let copiedFrom = 0;
  for (let i = 0; i < text.length; ) {
    const c = text.charCodeAt(i);
    if (c === CH_QUOTE) {
      i = skipQuotedOrComment(text, i);
      continue;
    }
    if (c === CH_SLASH && text.charCodeAt(i + 1) === CH_STAR) {
      out += text.slice(copiedFrom, i);
      i = skipQuotedOrComment(text, i);
      copiedFrom = i;
      continue;
    }
    i++;
  }
  return out + text.slice(copiedFrom);
}
function readEntity(text, at, out) {
  const n = text.length;
  let i = at + 1;
  const idStart = i;
  while (i < n && isWordCode(text.charCodeAt(i))) i++;
  if (i === idStart) return -1;
  const id = text.slice(idStart, i);
  while (i < n && isSpaceCode(text.charCodeAt(i))) i++;
  if (text.charCodeAt(i) !== CH_EQ) return -1;
  i++;
  while (i < n && isSpaceCode(text.charCodeAt(i))) i++;
  const typeStart = i;
  while (i < n && isWordCode(text.charCodeAt(i))) i++;
  if (i === typeStart) return -1;
  const type = text.slice(typeStart, i);
  while (i < n && isSpaceCode(text.charCodeAt(i))) i++;
  if (text.charCodeAt(i) !== CH_LPAREN) return -1;
  const argsStart = i + 1;
  let depth = 0;
  let argsEnd = -1;
  while (i < n) {
    const c = text.charCodeAt(i);
    if (c === CH_QUOTE || c === CH_SLASH) {
      const skip = skipQuotedOrComment(text, i);
      if (skip >= 0) {
        i = skip;
        continue;
      }
    }
    if (c === CH_LPAREN) depth++;
    else if (c === CH_RPAREN) {
      depth--;
      if (depth === 0) {
        argsEnd = i;
        i++;
        break;
      }
    }
    i++;
  }
  if (argsEnd < 0) return -1;
  while (i < n && isSpaceCode(text.charCodeAt(i))) i++;
  if (text.charCodeAt(i) !== CH_SEMI) return -1;
  i++;
  out.push({
    id,
    type: type.toUpperCase(),
    args: splitArgs(text.slice(argsStart, argsEnd)),
    raw: text.slice(at, i)
  });
  return i;
}
function indexOfDataSection(content) {
  const strict = indexOfCode(content, "DATA;", 0);
  if (strict >= 0) return strict;
  const anchored = /^[ \t]*DATA;/m.exec(content);
  return anchored ? anchored.index + anchored[0].indexOf("DATA;") : -1;
}
function parseSTEP(content) {
  const entities = [];
  const dataAt = indexOfDataSection(content);
  if (dataAt < 0) {
    throw new IfcParseError(
      "no-data-section",
      "Onleesbaar IFC-bestand: de verplichte 'DATA;'-sectiegrens ontbreekt."
    );
  }
  const clean = stripStepComments(content.slice(dataAt + "DATA;".length)).replace(/\r\n/g, "\n");
  for (let i = 0; i < clean.length; ) {
    const c = clean.charCodeAt(i);
    if (c === CH_QUOTE) {
      i = skipQuotedOrComment(clean, i);
      continue;
    }
    if (c === CH_HASH) {
      const next = readEntity(clean, i, entities);
      i = next > 0 ? next : i + 1;
      continue;
    }
    if (c === CH_E && clean.startsWith("ENDSEC;", i)) break;
    i++;
  }
  return entities;
}
function splitArgs(argsStr) {
  const args = [];
  let current2 = "";
  let depth = 0;
  let inString = false;
  for (let i = 0; i < argsStr.length; i++) {
    const ch = argsStr[i];
    if (ch === "'" && !inString) {
      inString = true;
      current2 += ch;
    } else if (ch === "'" && inString) {
      if (i + 1 < argsStr.length && argsStr[i + 1] === "'") {
        current2 += "''";
        i++;
      } else {
        inString = false;
        current2 += ch;
      }
    } else if (inString) {
      current2 += ch;
    } else if (ch === "(") {
      depth++;
      current2 += ch;
    } else if (ch === ")") {
      depth--;
      current2 += ch;
    } else if (ch === "," && depth === 0) {
      args.push(current2.trim());
      current2 = "";
    } else {
      current2 += ch;
    }
  }
  if (current2.trim()) args.push(current2.trim());
  return args;
}
function stripQuotes(s) {
  if (s.startsWith("'") && s.endsWith("'")) {
    return s.slice(1, -1).replace(/''/g, "'");
  }
  return s;
}
function ifcSlotText(s) {
  if (!s || s === "$") return "";
  return stripQuotes(s);
}
function parseRef(s) {
  const m = s.trim().match(/^#(\w+)$/);
  return m ? m[1] : null;
}
function parseRefs(s) {
  const refs = [];
  const matches = s.matchAll(/#(\w+)/g);
  for (const m of matches) {
    refs.push(m[1]);
  }
  return refs;
}
function parseDateFromIFC(s) {
  if (!s || s === "$") return formatDate(/* @__PURE__ */ new Date());
  const clean = stripQuotes(s);
  return clean.substring(0, 10);
}
function parseDurationDays(s) {
  if (!s || s === "$") return 0;
  const clean = stripQuotes(s);
  const leadingNeg = clean.startsWith("-");
  const applySign = (n) => leadingNeg && n > 0 ? -n : n;
  const dayMatch = clean.match(/(-?\d+)D/);
  if (dayMatch) return applySign(parseInt(dayMatch[1]));
  const hourMatch = clean.match(/(-?\d+)H/);
  if (hourMatch) {
    const h = parseInt(hourMatch[1]);
    return applySign(h < 0 ? -Math.ceil(-h / 8) : Math.ceil(h / 8));
  }
  return 0;
}
function parseTaskType(s) {
  const clean = s.replace(/\./g, "").trim();
  return TASK_TYPES.includes(clean) ? clean : "CONSTRUCTION";
}
function parseSequenceType(s) {
  const clean = s.replace(/\./g, "").trim();
  const map = {
    "FINISH_START": "FINISH_START",
    "START_START": "START_START",
    "FINISH_FINISH": "FINISH_FINISH",
    "START_FINISH": "START_FINISH"
  };
  return map[clean] || "FINISH_START";
}
function extractProject(entities, entityMap, labels) {
  const proj = entities.find((e) => e.type === "IFCPROJECT");
  const wp = entities.find((e) => e.type === "IFCWORKPLAN");
  let author = "";
  let company = "";
  const owner = entities.find((e) => e.type === "IFCOWNERHISTORY");
  if (owner) {
    const po = entityMap.get(parseRef(owner.args[0] || "") || "");
    if (po && po.type === "IFCPERSONANDORGANIZATION") {
      const person = entityMap.get(parseRef(po.args[0] || "") || "");
      if (person && person.type === "IFCPERSON") author = ifcSlotText(person.args[1]);
      const org = entityMap.get(parseRef(po.args[1] || "") || "");
      if (org && org.type === "IFCORGANIZATION") company = ifcSlotText(org.args[1]);
    }
  }
  return {
    id: generateId("proj"),
    // Twee verschillende gevallen, bewust verschillend afgehandeld:
    //
    //  1. Er ís een IFCPROJECT. Dan telt zijn naamslot — óók als die leeg is. `ifcSlotText`, niet
    //     `stripQuotes`: een naamloos project schrijft de writer als `$` (`ifcStr('')`), en
    //     `stripQuotes` gaf daar letterlijk '$' op terug — dan stond er na opslaan+heropenen een
    //     dollarteken als projectnaam. Leeg blijft leeg, zodat de weergave-fallback
    //     (`common:project.untitled`) ook ná het openen werkt.
    //  2. Er is GEEN IFCPROJECT (kapot/vreemd bestand). Dan stempelen we wél een naam in de data:
    //     leeg laten zou "Nieuwe planning" tonen, en dat suggereert ten onrechte dat de import
    //     mislukt is terwijl er misschien gewoon taken uit het bestand komen. De tekst komt van de
    //     aanroeper (`ImportLabels`), want deze dienstlaag heeft geen `t(...)`.
    name: proj ? ifcSlotText(proj.args[2]) : labels.importedProject || DEFAULT_IMPORTED_PROJECT_NAME,
    // Omschrijving uit de IFCWORKPLAN.Description-slot (waar de writer 'm schrijft), met terugval op
    // de IFCPROJECT.Description-slot; `$`/leeg ⇒ '' (voorheen kwam letterlijk '$' terug — een bug).
    description: ifcSlotText(wp?.args[3]) || ifcSlotText(proj?.args[3]),
    startDate: wp ? parseDateFromIFC(wp.args[12] || "") : formatDate(/* @__PURE__ */ new Date()),
    endDate: wp ? parseDateFromIFC(wp.args[13] || "") : "",
    calendarId: "cal-default",
    // createdAt/modifiedAt: default = nu; overschreven door het OPS_ProjectSettings-pset in
    // extractStructure als het bestand ze draagt (oude bestanden ⇒ deze default blijft staan).
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    modifiedAt: (/* @__PURE__ */ new Date()).toISOString(),
    author,
    company
  };
}
function extractCalendar(entities, entityMap) {
  const cal = entities.find((e) => e.type === "IFCWORKCALENDAR");
  if (!cal) return createDefaultCalendar();
  return buildCalendarFromEntity(cal, entityMap, entities);
}
function applyHourModeIFC(tasks, projectCal, resourceCalendars, taskTimeEntities) {
  const libById = new Map(resourceCalendars.map((c) => [c.id, c]));
  const effCalOf = (t) => t.calendarId && libById.get(t.calendarId) || projectCal;
  const subDayCals = /* @__PURE__ */ new Set();
  for (const t of tasks) {
    const e = taskTimeEntities.get(t.id);
    if (!e) continue;
    const effCal = effCalOf(t);
    const durMin = isoDurationToMinutes(stripQuotes(e.args[TASKTIME_SLOT.scheduleDuration] || ""));
    const durSignal = durMin != null && isSubDayMinutes(durMin, effCal.hoursPerDay);
    const dateSignal = [
      TASKTIME_SLOT.scheduleStart,
      TASKTIME_SLOT.scheduleFinish,
      TASKTIME_SLOT.earlyStart,
      TASKTIME_SLOT.earlyFinish,
      TASKTIME_SLOT.lateStart,
      TASKTIME_SLOT.lateFinish,
      TASKTIME_SLOT.actualStart,
      TASKTIME_SLOT.actualFinish
    ].some((i) => hasNonAnchorTime(stripQuotes(e.args[i] || ""), IFC_TIME_ANCHOR));
    if (durSignal || dateSignal) subDayCals.add(effCal);
  }
  for (const cal of [projectCal, ...resourceCalendars]) {
    promoteHourCalendar(cal, getCalendarBands(cal), subDayCals.has(cal), true);
  }
  for (const t of tasks) {
    const effCal = effCalOf(t);
    if (!effCal.workTime) continue;
    const e = taskTimeEntities.get(t.id);
    if (!e) continue;
    const hpd = effCal.hoursPerDay;
    const durMin = isoDurationToMinutes(stripQuotes(e.args[TASKTIME_SLOT.scheduleDuration] || ""));
    const minutes = durMin != null ? durMin : Math.round(t.time.scheduleDuration * hpd * 60);
    t.time.durationMinutes = minutes;
    if (hpd > 0) t.time.scheduleDuration = minutes / (hpd * 60);
    const toHour = (raw) => {
      const q = stripQuotes(raw || "");
      return q && q !== "$" ? formatInstant(parseInstant(q), "hour") : void 0;
    };
    const ss = toHour(e.args[TASKTIME_SLOT.scheduleStart]);
    if (ss) t.time.scheduleStart = ss;
    const sf = toHour(e.args[TASKTIME_SLOT.scheduleFinish]);
    if (sf) t.time.scheduleFinish = sf;
    const es = toHour(e.args[TASKTIME_SLOT.earlyStart]);
    if (es) t.time.earlyStart = es;
    const ef = toHour(e.args[TASKTIME_SLOT.earlyFinish]);
    if (ef) t.time.earlyFinish = ef;
    const ls = toHour(e.args[TASKTIME_SLOT.lateStart]);
    if (ls) t.time.lateStart = ls;
    const lf = toHour(e.args[TASKTIME_SLOT.lateFinish]);
    if (lf) t.time.lateFinish = lf;
    const as = toHour(e.args[TASKTIME_SLOT.actualStart]);
    if (as) t.time.actualStart = as;
    const af = toHour(e.args[TASKTIME_SLOT.actualFinish]);
    if (af) t.time.actualFinish = af;
    const remMin = isoDurationToMinutes(stripQuotes(e.args[TASKTIME_SLOT.remainingTime] || ""));
    if (remMin != null) t.time.remainingMinutes = remMin;
  }
}
function extractTasks(entities, entityMap, baselineTaskStepIds = /* @__PURE__ */ new Set()) {
  const taskEntities = entities.filter((e) => e.type === "IFCTASK" && !baselineTaskStepIds.has(e.id));
  const tasks = [];
  const taskStepIdMap = /* @__PURE__ */ new Map();
  const taskTimeEntities = /* @__PURE__ */ new Map();
  for (const te of taskEntities) {
    const id = generateId("task");
    taskStepIdMap.set(te.id, id);
    const legacy12 = te.args.length === 12;
    const shift = legacy12 ? 1 : 0;
    const isMilestoneIdx = TASK_SLOT.isMilestone - shift;
    const priorityIdx = TASK_SLOT.priority - shift;
    const taskTimeIdx = TASK_SLOT.taskTime - shift;
    const predefinedTypeIdx = TASK_SLOT.predefinedType - shift;
    const taskTimeRef = parseRef(te.args[taskTimeIdx] || "");
    let time;
    if (taskTimeRef) {
      const ttEntity = entityMap.get(taskTimeRef);
      time = ttEntity ? parseTaskTime(ttEntity) : createDefaultTaskTime(formatDate(/* @__PURE__ */ new Date()), 5);
      if (ttEntity) taskTimeEntities.set(id, ttEntity);
    } else {
      time = createDefaultTaskTime(formatDate(/* @__PURE__ */ new Date()), 5);
    }
    const isMilestone = te.args[isMilestoneIdx]?.includes("T") || false;
    if (isMilestone) time.scheduleDuration = 0;
    const priorityRaw = (te.args[priorityIdx] || "").trim();
    let priority = DEFAULT_PRIORITY;
    if (priorityRaw && priorityRaw !== "$") {
      const p = parseInt(priorityRaw, 10);
      priority = Number.isFinite(p) ? p : DEFAULT_PRIORITY;
    }
    tasks.push({
      id,
      name: stripQuotes(te.args[TASK_SLOT.name] || "") || "Naamloze taak",
      // `$`/leeg/afwezig ⇒ '' (niet de letterlijke '$' — zelfde bug/fix als IFCPROJECT.Description
      // hierboven; de writer schrijft description/identification bewust als bare `$` via `ifcStr`
      // wanneer leeg, zie ifcTaskSlots.ts).
      description: ifcSlotText(te.args[TASK_SLOT.description]),
      wbsCode: ifcSlotText(te.args[TASK_SLOT.identification]),
      taskType: te.args[predefinedTypeIdx] ? parseTaskType(te.args[predefinedTypeIdx]) : "CONSTRUCTION",
      status: "NOT_STARTED",
      isMilestone,
      priority,
      parentId: null,
      childIds: [],
      time,
      resourceIds: []
    });
  }
  return { tasks, taskStepIdMap, taskTimeEntities };
}
function optDate(s) {
  return s && s !== "$" ? parseDateFromIFC(s) : void 0;
}
function optDuration(s) {
  return s && s !== "$" ? parseDurationDays(s) : void 0;
}
var TASKTIME_READ_HELPERS = {
  parseDate: (arg) => parseDateFromIFC(arg || ""),
  parseDur: (arg) => parseDurationDays(arg || ""),
  optDate,
  optDur: optDuration
};
function parseTaskTime(e) {
  const time = {};
  for (let i = 0; i < IFC_TASKTIME_SLOTS.length; i++) {
    IFC_TASKTIME_SLOTS[i].read?.(time, e.args[i], TASKTIME_READ_HELPERS);
  }
  return time;
}
function extractSequences(entities, entityMap, taskStepIdMap) {
  const seqEntities = entities.filter((e) => e.type === "IFCRELSEQUENCE");
  const sequences = [];
  for (const se of seqEntities) {
    const predRef = parseRef(se.args[4] || "");
    const succRef = parseRef(se.args[5] || "");
    if (!predRef || !succRef) continue;
    const predId = taskStepIdMap.get(predRef);
    const succId = taskStepIdMap.get(succRef);
    if (!predId || !succId) continue;
    let lagDays = 0;
    let lagUnit;
    let lagPercent;
    let lagMinutes;
    const lagRef = parseRef(se.args[6] || "");
    if (lagRef) {
      const lagEntity = entityMap.get(lagRef);
      if (lagEntity && lagEntity.type === "IFCLAGTIME") {
        const lagValue = (lagEntity.args[3] || "").trim();
        const durType = (lagEntity.args[4] || "").trim();
        const ratioMatch = lagValue.match(/^IFCRATIOMEASURE\s*\(\s*(-?[\d.]+)\s*\)$/i);
        const durMatch = lagValue.match(/^IFCDURATION\s*\(\s*(.+?)\s*\)$/i);
        if (ratioMatch) {
          lagPercent = Math.round(parseFloat(ratioMatch[1]) * 100 * 1e6) / 1e6;
        } else if (durMatch) {
          lagDays = parseDurationDays(durMatch[1]);
          lagMinutes = isoDurationToMinutes(stripQuotes(durMatch[1])) ?? void 0;
        } else if (lagValue.startsWith("'")) {
          lagDays = parseDurationDays(lagValue);
          lagMinutes = isoDurationToMinutes(stripQuotes(lagValue)) ?? void 0;
        } else {
          lagDays = parseDurationDays(lagEntity.args[4] || "");
        }
        if (/ELAPSEDTIME/i.test(durType)) lagUnit = "ELAPSEDTIME";
      }
    }
    const seq = {
      id: generateId("seq"),
      predecessorId: predId,
      successorId: succId,
      type: parseSequenceType(se.args[7] || ""),
      lagDays
    };
    if (lagUnit) seq.lagUnit = lagUnit;
    if (lagPercent !== void 0) seq.lagPercent = lagPercent;
    if (lagMinutes !== void 0) seq.lagMinutes = lagMinutes;
    sequences.push(seq);
  }
  return sequences;
}
function parseTypedValue(s) {
  const m = (s || "").trim().match(/^IFC\w+\s*\(([\s\S]*)\)$/i);
  if (!m) return void 0;
  const inner = m[1].trim();
  if (inner === ".T.") return true;
  if (inner === ".F.") return false;
  if (inner.startsWith("'")) return stripQuotes(inner);
  const n = parseFloat(inner);
  return Number.isFinite(n) ? n : void 0;
}
function extractStructure(entities, entityMap, project, tasks, taskStepIdMap, libraryPoolOut) {
  let activityCodeTypes = [];
  let customFieldDefs = [];
  for (const e of entities) {
    if (e.type !== "IFCPROPERTYSET" || stripQuotes(e.args[2] || "") !== PSET.StructureMeta) continue;
    for (const propRef of parseRefs(e.args[4] || "")) {
      const prop = entityMap.get(propRef);
      if (!prop || prop.type !== "IFCPROPERTYSINGLEVALUE") continue;
      const raw = parseTypedValue(prop.args[2] || "");
      if (typeof raw !== "string") continue;
      try {
        const meta = JSON.parse(raw);
        if (Array.isArray(meta.activityCodeTypes)) activityCodeTypes = meta.activityCodeTypes;
        if (Array.isArray(meta.customFieldDefs)) customFieldDefs = meta.customFieldDefs;
      } catch {
      }
    }
  }
  if (activityCodeTypes.length === 0 && customFieldDefs.length === 0) {
    for (const e of entities) {
      if (e.type !== "IFCPROPERTYSETTEMPLATE") continue;
      const setName = stripQuotes(e.args[2] || "");
      for (const tmplRef of parseRefs(e.args[6] || "")) {
        const tmpl = entityMap.get(tmplRef);
        if (!tmpl || tmpl.type !== "IFCSIMPLEPROPERTYTEMPLATE") continue;
        const name = stripQuotes(tmpl.args[2] || "");
        const templateType = (tmpl.args[4] || "").replace(/\./g, "").trim();
        if (setName === PSET.CustomFields && templateType === "P_SINGLEVALUE") {
          const measure = stripQuotes(tmpl.args[5] || "").toLowerCase();
          customFieldDefs.push({ id: generateId("cfd"), name, type: MEASURE_TO_FIELD[measure] ?? "text" });
        } else if (setName === PSET.ActivityCodes && templateType === "P_ENUMERATEDVALUE") {
          const enumEntity = entityMap.get(parseRef(tmpl.args[7] || "") || "");
          const values = enumEntity && enumEntity.type === "IFCPROPERTYENUMERATION" ? splitArgs((enumEntity.args[1] || "").replace(/^\(|\)$/g, "")).map((v) => parseTypedValue(v)).filter((v) => typeof v === "string").map((code) => ({ id: generateId("acv"), code })) : [];
          activityCodeTypes.push({ id: generateId("act"), name, values });
        }
      }
    }
  }
  const typeByName = new Map(activityCodeTypes.map((t) => [t.name, t]));
  const defByName = new Map(customFieldDefs.map((d) => [d.name, d]));
  const taskById = new Map(tasks.map((t) => [t.id, t]));
  for (const rel of entities) {
    if (rel.type !== "IFCRELDEFINESBYPROPERTIES") continue;
    const pset = entityMap.get(parseRef(rel.args[5] || "") || "");
    if (!pset || pset.type !== "IFCPROPERTYSET") continue;
    const psetName = stripQuotes(pset.args[2] || "");
    const objectRefs = parseRefs(rel.args[4] || "");
    const props = parseRefs(pset.args[4] || "").map((r) => entityMap.get(r)).filter((p) => !!p);
    const perTask = PER_TASK_PSET_BY_NAME.get(psetName);
    if (perTask) {
      const singleValueProps = props.filter((p) => p.type === "IFCPROPERTYSINGLEVALUE").map((p) => ({ name: stripQuotes(p.args[0] || ""), value: parseTypedValue(p.args[2] || "") }));
      for (const objRef of objectRefs) {
        const taskId = taskStepIdMap.get(objRef);
        const task = taskId ? taskById.get(taskId) : void 0;
        if (task) perTask.apply(task, singleValueProps);
      }
      continue;
    }
    if (psetName === PSET.Library) {
      for (const prop of props) {
        if (prop.type !== "IFCPROPERTYSINGLEVALUE") continue;
        if (stripQuotes(prop.args[0] || "") !== "pool") continue;
        const v = parseTypedValue(prop.args[2] || "");
        if (typeof v === "string" && v) {
          try {
            libraryPoolOut.value = JSON.parse(v);
          } catch {
          }
        }
      }
      continue;
    }
    if (psetName === PSET.ProjectSettings) {
      for (const prop of props) {
        if (prop.type !== "IFCPROPERTYSINGLEVALUE") continue;
        const name = stripQuotes(prop.args[0] || "");
        const v = parseTypedValue(prop.args[2] || "");
        if (name === "wbsAutoNumber") {
          if (typeof v === "boolean") project.wbsAutoNumber = v;
        } else if (name === "StatusDate") {
          if (typeof v === "string" && v) project.statusDate = v.substring(0, 10);
        } else if (name === "ProgressMode") {
          if (v === "PROGRESS_OVERRIDE" || v === "RETAINED_LOGIC") project.progressMode = v;
        } else if (name === "ProjectStartDate" || name === "ProjectEndDate") {
          const date = typeof v === "string" ? v.substring(0, 10) : "";
          if (name === "ProjectStartDate") project.startDate = date;
          else project.endDate = date;
        } else if (name === "CreatedAt") {
          if (typeof v === "string" && v) project.createdAt = v;
        } else if (name === "ModifiedAt") {
          if (typeof v === "string" && v) project.modifiedAt = v;
        } else if (name === "CompanyId") {
          if (typeof v === "string" && v) project.companyId = v;
        } else if (name === "CompanyName") {
          if (typeof v === "string" && v) project.companyName = v;
        }
      }
      continue;
    }
    if (psetName !== PSET.CustomFields && psetName !== PSET.ActivityCodes) continue;
    for (const objRef of objectRefs) {
      const taskId = taskStepIdMap.get(objRef);
      const task = taskId ? taskById.get(taskId) : void 0;
      if (!task) continue;
      for (const prop of props) {
        const name = stripQuotes(prop.args[0] || "");
        if (psetName === PSET.CustomFields && prop.type === "IFCPROPERTYSINGLEVALUE") {
          const def = defByName.get(name);
          const value = parseTypedValue(prop.args[2] || "");
          if (def && value !== void 0) {
            task.customFields = { ...task.customFields ?? {}, [def.id]: value };
          }
        } else if (psetName === PSET.ActivityCodes && prop.type === "IFCPROPERTYENUMERATEDVALUE") {
          const type = typeByName.get(name);
          const codes = splitArgs((prop.args[2] || "").replace(/^\(|\)$/g, "")).map((v) => parseTypedValue(v)).filter((v) => typeof v === "string");
          const value = type?.values.find((v) => v.code === codes[0]);
          if (type && value) {
            task.activityCodes = { ...task.activityCodes ?? {}, [type.id]: value.id };
          }
        }
      }
    }
  }
  return { activityCodeTypes, customFieldDefs };
}
function extractNesting(entities, _entityMap, tasks, taskStepIdMap) {
  const nestEntities = entities.filter((e) => e.type === "IFCRELNESTS");
  const taskById = new Map(tasks.map((t) => [t.id, t]));
  for (const ne of nestEntities) {
    const parentRef = parseRef(ne.args[4] || "");
    if (!parentRef) continue;
    const parentId = taskStepIdMap.get(parentRef);
    if (!parentId) continue;
    const parent = taskById.get(parentId);
    if (!parent) continue;
    const childRefs = parseRefs(ne.args[5] || "");
    for (const childRef of childRefs) {
      const childId = taskStepIdMap.get(childRef);
      if (!childId) continue;
      const child = taskById.get(childId);
      if (!child) continue;
      child.parentId = parentId;
      if (!parent.childIds.includes(childId)) {
        parent.childIds.push(childId);
      }
    }
  }
}
function extractResources(entities, _entityMap) {
  const resources = [];
  const resourceStepIdMap = /* @__PURE__ */ new Map();
  const resourceGuidMap = /* @__PURE__ */ new Map();
  for (const e of entities) {
    const resType = IFC_TO_RESOURCE_TYPE[e.type];
    if (!resType) continue;
    const id = generateId("res");
    resourceStepIdMap.set(e.id, id);
    resourceGuidMap.set(stripQuotes(e.args[0] || ""), id);
    resources.push({
      id,
      name: stripQuotes(e.args[2] || "") || "Resource",
      type: resType,
      // `$`/leeg/afwezig ⇒ '' (zelfde bug/fix als IfcTask.Description hierboven).
      description: ifcSlotText(e.args[3]),
      maxUnits: 1
    });
  }
  return { resources, resourceStepIdMap, resourceGuidMap };
}
function extractResourceMeta(entities, entityMap, resources, resourceStepIdMap, resourceGuidMap) {
  const resourceById = new Map(resources.map((r) => [r.id, r]));
  for (const rel of entities) {
    if (rel.type !== "IFCRELDEFINESBYPROPERTIES") continue;
    const pset = entityMap.get(parseRef(rel.args[5] || "") || "");
    if (!pset || pset.type !== "IFCPROPERTYSET") continue;
    if (stripQuotes(pset.args[2] || "") !== PSET.Resource) continue;
    const objectRefs = parseRefs(rel.args[4] || "");
    const props = parseRefs(pset.args[4] || "").map((r) => entityMap.get(r)).filter((p) => !!p && p.type === "IFCPROPERTYSINGLEVALUE");
    for (const objRef of objectRefs) {
      const resId = resourceStepIdMap.get(objRef);
      const res = resId ? resourceById.get(resId) : void 0;
      if (!res) continue;
      for (const prop of props) {
        const name = stripQuotes(prop.args[0] || "");
        const value = parseTypedValue(prop.args[2] || "");
        if (name === "MaxUnits" && typeof value === "number") {
          res.maxUnits = value;
        } else if (name === "CostPerHour" && typeof value === "number") {
          res.costPerHour = value;
        } else if (name === "UnitOfMeasure" && typeof value === "string") {
          res.unitOfMeasure = value;
        } else if (name === "AvailabilitySteps" && typeof value === "string") {
          const steps = value.split(";").map((pair) => {
            const [from, maxUnitsStr] = pair.split(":");
            return { from: (from || "").trim(), maxUnits: parseFloat(maxUnitsStr) };
          }).filter((s) => s.from && Number.isFinite(s.maxUnits));
          if (steps.length > 0) res.availabilitySteps = steps;
        } else if (name === "ParentGuid" && typeof value === "string" && !res.parentId) {
          const parentId = resourceGuidMap.get(value);
          if (parentId) res.parentId = parentId;
        } else if (name === "LibraryOrigin" && typeof value === "string" && value && !res.libraryOrigin) {
          try {
            const parsed = JSON.parse(value);
            if (parsed && typeof parsed.companyId === "string" && typeof parsed.libraryItemId === "string" && typeof parsed.poolVersion === "number") {
              if ("syncedHash" in parsed && typeof parsed.syncedHash !== "string") delete parsed.syncedHash;
              res.libraryOrigin = parsed;
            }
          } catch {
          }
        }
      }
    }
  }
}
function extractCrewNesting(entities, resources, resourceStepIdMap) {
  const resourceById = new Map(resources.map((r) => [r.id, r]));
  for (const ne of entities) {
    if (ne.type !== "IFCRELNESTS") continue;
    const parentRef = parseRef(ne.args[4] || "");
    if (!parentRef) continue;
    const parentId = resourceStepIdMap.get(parentRef);
    if (!parentId) continue;
    const childRefs = parseRefs(ne.args[5] || "");
    for (const childRef of childRefs) {
      const childId = resourceStepIdMap.get(childRef);
      const child = childId ? resourceById.get(childId) : void 0;
      if (child) child.parentId = parentId;
    }
  }
}
function parseIntList(s) {
  const inner = (s || "").trim().replace(/^\(|\)$/g, "");
  if (!inner) return [];
  return inner.split(",").map((x) => parseInt(x.trim(), 10)).filter(Number.isFinite);
}
function extractCalendarGeneration(calStepId, entities, entityMap) {
  for (const rel of entities) {
    if (rel.type !== "IFCRELDEFINESBYPROPERTIES") continue;
    const objectRefs = parseRefs(rel.args[4] || "");
    if (!objectRefs.includes(calStepId)) continue;
    const pset = entityMap.get(parseRef(rel.args[5] || "") || "");
    if (!pset || pset.type !== "IFCPROPERTYSET" || stripQuotes(pset.args[2] || "") !== PSET.Calendar) continue;
    const props = parseRefs(pset.args[4] || "").map((r) => entityMap.get(r)).filter((p) => !!p && p.type === "IFCPROPERTYSINGLEVALUE");
    let ruleSetId;
    let region;
    let breakChoice;
    let generatedFromYear;
    let generatedToYear;
    for (const prop of props) {
      const name = stripQuotes(prop.args[0] || "");
      const value = parseTypedValue(prop.args[2] || "");
      if (name === "RuleSetId" && typeof value === "string") ruleSetId = value;
      else if (name === "Region" && typeof value === "string") region = value;
      else if (name === "BreakChoice" && typeof value === "string") breakChoice = value;
      else if (name === "GeneratedFromYear" && typeof value === "number") generatedFromYear = value;
      else if (name === "GeneratedToYear" && typeof value === "number") generatedToYear = value;
    }
    if (!ruleSetId || generatedFromYear === void 0 || generatedToYear === void 0) continue;
    return {
      ruleSetId,
      ...region ? { region } : {},
      ...breakChoice ? { breakChoice } : {},
      generatedFromYear,
      generatedToYear
    };
  }
  return void 0;
}
function extractCalendarLibraryOrigin(calStepId, entities, entityMap) {
  for (const rel of entities) {
    if (rel.type !== "IFCRELDEFINESBYPROPERTIES") continue;
    const objectRefs = parseRefs(rel.args[4] || "");
    if (!objectRefs.includes(calStepId)) continue;
    const pset = entityMap.get(parseRef(rel.args[5] || "") || "");
    if (!pset || pset.type !== "IFCPROPERTYSET" || stripQuotes(pset.args[2] || "") !== PSET.Calendar) continue;
    const props = parseRefs(pset.args[4] || "").map((r) => entityMap.get(r)).filter((p) => !!p && p.type === "IFCPROPERTYSINGLEVALUE");
    for (const prop of props) {
      if (stripQuotes(prop.args[0] || "") !== "LibraryOrigin") continue;
      const value = parseTypedValue(prop.args[2] || "");
      if (typeof value !== "string" || !value) continue;
      try {
        const parsed = JSON.parse(value);
        if (parsed && typeof parsed.companyId === "string" && typeof parsed.libraryItemId === "string" && typeof parsed.poolVersion === "number") {
          if ("syncedHash" in parsed && typeof parsed.syncedHash !== "string") delete parsed.syncedHash;
          return parsed;
        }
      } catch {
      }
    }
  }
  return void 0;
}
function buildCalendarFromEntity(cal, entityMap, entities) {
  const calendar = createDefaultCalendar();
  calendar.name = stripQuotes(cal.args[2] || "") || calendar.name;
  calendar.description = ifcSlotText(cal.args[3]) || calendar.description;
  const workTimeRefs = parseRefs(cal.args[5] || "");
  let periods = [];
  let calWorkDays = [];
  for (const wtRef of workTimeRefs) {
    const wt = entityMap.get(wtRef);
    if (!wt || wt.type !== "IFCWORKTIME") continue;
    const recurrenceRef = parseRef(wt.args[3] || "");
    if (!recurrenceRef) continue;
    const rec = entityMap.get(recurrenceRef);
    if (!rec || rec.type !== "IFCRECURRENCEPATTERN") continue;
    const workDays = parseIntList(rec.args[2] || "");
    if (workDays.length > 0) {
      calendar.workDays = workDays;
      calWorkDays = workDays;
    }
    const timePeriodRefs = parseRefs(rec.args[7] || "");
    for (const tpRef of timePeriodRefs) {
      const tp = entityMap.get(tpRef);
      if (!tp || tp.type !== "IFCTIMEPERIOD") continue;
      const s = clockToMinutes(stripQuotes(tp.args[0] || ""));
      const e = clockToMinutes(stripQuotes(tp.args[1] || ""));
      if (s != null && e != null) periods.push({ start: s, end: e });
    }
    if (timePeriodRefs.length > 0) {
      const tp = entityMap.get(timePeriodRefs[0]);
      if (tp && tp.type === "IFCTIMEPERIOD") {
        const startHour = parseInt(stripQuotes(tp.args[0] || "").split(":")[0], 10);
        const endHour = parseInt(stripQuotes(tp.args[1] || "").split(":")[0], 10);
        if (Number.isFinite(startHour)) calendar.workStartHour = startHour;
        if (Number.isFinite(endHour)) calendar.workEndHour = endHour;
        if (Number.isFinite(startHour) && Number.isFinite(endHour) && endHour > startHour) {
          calendar.hoursPerDay = endHour - startHour;
        }
      }
    }
    break;
  }
  const days = (calWorkDays.length > 0 ? calWorkDays : calendar.workDays).filter((d) => d >= 1 && d <= 7);
  const rawByWeekday = {};
  for (const d of days) rawByWeekday[d] = periods.map((p) => ({ ...p }));
  const { bands, deviates } = canonicalizeBands(rawByWeekday);
  registerCalendarBands(calendar, { canonical: bands, deviates });
  const predef = (cal.args[7] || "").toUpperCase();
  if (predef.includes("SECONDSHIFT")) calendar.shift = "SECOND";
  else if (predef.includes("THIRDSHIFT")) calendar.shift = "THIRD";
  else if (predef.includes("USERDEFINED")) calendar.shift = "USERDEFINED";
  const exceptionRefs = parseRefs(cal.args[6] || "");
  const holidays = [];
  for (const ref2 of exceptionRefs) {
    const wt = entityMap.get(ref2);
    if (wt && wt.type === "IFCWORKTIME") {
      holidays.push({
        name: stripQuotes(wt.args[0] || "") || "Feestdag",
        startDate: parseDateFromIFC(wt.args[4] || ""),
        endDate: parseDateFromIFC(wt.args[5] || "")
      });
    }
  }
  if (holidays.length > 0) calendar.holidays = holidays;
  delete calendar.generation;
  calendar.generation = extractCalendarGeneration(cal.id, entities, entityMap);
  calendar.libraryOrigin = extractCalendarLibraryOrigin(cal.id, entities, entityMap);
  return calendar;
}
function extractCalendarLibrary(entities, entityMap, resources, resourceStepIdMap, tasks, taskStepIdMap) {
  const projectCalendarEntity = entities.find((e) => e.type === "IFCWORKCALENDAR");
  const resourceById = new Map(resources.map((r) => [r.id, r]));
  const taskById = new Map(tasks.map((t) => [t.id, t]));
  const calendars = [];
  const calByStepId = /* @__PURE__ */ new Map();
  for (const ce of entities) {
    if (ce.type !== "IFCRELASSIGNSTOCONTROL") continue;
    const controlRef = parseRef(ce.args[6] || "");
    if (!controlRef) continue;
    const controlEntity = entityMap.get(controlRef);
    if (!controlEntity || controlEntity.type !== "IFCWORKCALENDAR") continue;
    if (projectCalendarEntity && controlRef === projectCalendarEntity.id) continue;
    let cal = calByStepId.get(controlRef);
    if (!cal) {
      cal = buildCalendarFromEntity(controlEntity, entityMap, entities);
      cal.id = generateId("rescal");
      calByStepId.set(controlRef, cal);
      calendars.push(cal);
    }
    const relatedRefs = parseRefs(ce.args[4] || "");
    for (const r of relatedRefs) {
      const resId = resourceStepIdMap.get(r);
      if (resId) {
        const res = resourceById.get(resId);
        if (res) res.calendarId = cal.id;
        continue;
      }
      const taskId = taskStepIdMap.get(r);
      if (taskId) {
        const task = taskById.get(taskId);
        if (task) task.calendarId = cal.id;
      }
    }
  }
  for (const ce of entities) {
    if (ce.type !== "IFCWORKCALENDAR") continue;
    if (projectCalendarEntity && ce.id === projectCalendarEntity.id) continue;
    if (calByStepId.has(ce.id)) continue;
    const cal = buildCalendarFromEntity(ce, entityMap, entities);
    cal.id = generateId("rescal");
    calByStepId.set(ce.id, cal);
    calendars.push(cal);
  }
  return calendars;
}
function extractAssignments(entities, entityMap, taskStepIdMap, resourceStepIdMap) {
  const metaByTask = /* @__PURE__ */ new Map();
  for (const rel of entities) {
    if (rel.type !== "IFCRELDEFINESBYPROPERTIES") continue;
    const pset = entityMap.get(parseRef(rel.args[5] || "") || "");
    if (!pset || pset.type !== "IFCPROPERTYSET") continue;
    if (stripQuotes(pset.args[2] || "") !== PSET.Assignments) continue;
    const props = parseRefs(pset.args[4] || "").map((r) => entityMap.get(r)).filter((p) => !!p && p.type === "IFCPROPERTYSINGLEVALUE");
    for (const objRef of parseRefs(rel.args[4] || "")) {
      let taskMeta = metaByTask.get(objRef);
      if (!taskMeta) {
        taskMeta = { queues: /* @__PURE__ */ new Map(), legacy: /* @__PURE__ */ new Map() };
        metaByTask.set(objRef, taskMeta);
      }
      const indexed = [];
      for (const prop of props) {
        const propName = stripQuotes(prop.args[0] || "");
        const value = parseTypedValue(prop.args[2] || "");
        if (typeof value !== "string") continue;
        const [unitsRaw, curveRaw] = value.split("|");
        const unitsPerDay = parseFloat(unitsRaw);
        const curve = VALID_CURVES.includes(curveRaw) ? curveRaw : void 0;
        const meta = { unitsPerDay: Number.isFinite(unitsPerDay) ? unitsPerDay : 1, curve };
        const m = propName.match(/^(.+)#(\d+)$/);
        if (m) {
          indexed.push({ guid: m[1], index: parseInt(m[2], 10), meta });
        } else {
          taskMeta.legacy.set(propName, meta);
        }
      }
      indexed.sort((a, b) => a.index - b.index);
      for (const { guid, meta } of indexed) {
        let queue = taskMeta.queues.get(guid);
        if (!queue) {
          queue = [];
          taskMeta.queues.set(guid, queue);
        }
        queue.push(meta);
      }
    }
  }
  const assignEntities = entities.filter((e) => e.type === "IFCRELASSIGNSTOPROCESS");
  const assignments = [];
  for (const ae of assignEntities) {
    const taskRef = parseRef(ae.args[6] || "");
    if (!taskRef) continue;
    const taskId = taskStepIdMap.get(taskRef);
    if (!taskId) continue;
    const taskMeta = metaByTask.get(taskRef);
    const resRefs = parseRefs(ae.args[4] || "");
    for (const resRef of resRefs) {
      const resId = resourceStepIdMap.get(resRef);
      if (!resId) continue;
      const resEntity = entityMap.get(resRef);
      const resGuid = resEntity ? stripQuotes(resEntity.args[0] || "") : "";
      const meta = taskMeta?.queues.get(resGuid)?.shift() ?? taskMeta?.legacy.get(resGuid);
      assignments.push({
        id: generateId("asgn"),
        taskId,
        resourceId: resId,
        unitsPerDay: meta?.unitsPerDay ?? 1,
        ...meta?.curve && meta.curve !== "UNIFORM" ? { curve: meta.curve } : {}
      });
    }
  }
  return assignments;
}
function reconstructResourceIds(tasks, assignments) {
  const byTask = /* @__PURE__ */ new Map();
  for (const a of assignments) {
    let list = byTask.get(a.taskId);
    if (!list) {
      list = [];
      byTask.set(a.taskId, list);
    }
    if (!list.includes(a.resourceId)) list.push(a.resourceId);
  }
  for (const t of tasks) {
    const ids = byTask.get(t.id);
    if (ids) t.resourceIds = ids;
  }
}
function collectBaselineTaskStepIds(entities) {
  const baselineSchedIds = new Set(
    entities.filter((e) => e.type === "IFCWORKSCHEDULE" && (e.args[14] || "").includes("BASELINE")).map((e) => e.id)
  );
  const taskStepIds = /* @__PURE__ */ new Set();
  if (baselineSchedIds.size === 0) return taskStepIds;
  for (const e of entities) {
    if (e.type === "IFCRELNESTS") {
      const relating = parseRef(e.args[4] || "");
      if (relating && baselineSchedIds.has(relating)) {
        for (const r of parseRefs(e.args[5] || "")) taskStepIds.add(r);
      }
    } else if (e.type === "IFCRELASSIGNSTOCONTROL") {
      const control = parseRef(e.args[6] || "");
      if (control && baselineSchedIds.has(control)) {
        for (const r of parseRefs(e.args[4] || "")) taskStepIds.add(r);
      }
    }
  }
  return taskStepIds;
}
function extractBaselines(entities, entityMap, taskStepIdMap) {
  const guidToTaskId = /* @__PURE__ */ new Map();
  for (const e of entities) {
    if (e.type !== "IFCTASK") continue;
    const newId = taskStepIdMap.get(e.id);
    if (newId) guidToTaskId.set(stripQuotes(e.args[TASK_SLOT.globalId] || ""), newId);
  }
  let baselines = [];
  let activeBaselineId = null;
  let taskGuids = null;
  for (const e of entities) {
    if (e.type !== "IFCPROPERTYSET" || stripQuotes(e.args[2] || "") !== PSET.Baselines) continue;
    for (const propRef of parseRefs(e.args[4] || "")) {
      const prop = entityMap.get(propRef);
      if (!prop || prop.type !== "IFCPROPERTYSINGLEVALUE") continue;
      const name = stripQuotes(prop.args[0] || "");
      const raw = parseTypedValue(prop.args[2] || "");
      if (typeof raw !== "string") continue;
      if (name === "Baselines") {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) baselines = parsed;
        } catch {
        }
      } else if (name === "ActiveBaselineId") {
        activeBaselineId = raw;
      } else if (name === "TaskGuids") {
        try {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
            taskGuids = parsed;
          }
        } catch {
        }
      }
    }
  }
  for (const b of baselines) {
    if (!Array.isArray(b.tasks)) {
      b.tasks = [];
      continue;
    }
    for (const bt of b.tasks) {
      const guid = taskGuids?.[bt.taskId] ?? ifcGuid(bt.taskId);
      const remapped = guidToTaskId.get(guid);
      if (remapped) bt.taskId = remapped;
    }
  }
  if (activeBaselineId && !baselines.some((b) => b.id === activeBaselineId)) {
    activeBaselineId = baselines.length ? baselines[baselines.length - 1].id : null;
  }
  return { baselines, activeBaselineId };
}
function extractSchedulingOptions(entities, entityMap) {
  for (const e of entities) {
    if (e.type !== "IFCPROPERTYSET" || stripQuotes(e.args[2] || "") !== PSET.SchedulingOptions) continue;
    for (const propRef of parseRefs(e.args[4] || "")) {
      const prop = entityMap.get(propRef);
      if (!prop || prop.type !== "IFCPROPERTYSINGLEVALUE") continue;
      if (stripQuotes(prop.args[0] || "") !== "SchedulingOptions") continue;
      const raw = parseTypedValue(prop.args[2] || "");
      if (typeof raw !== "string" || !raw) continue;
      try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          return parsed;
        }
      } catch {
      }
    }
  }
  return void 0;
}

// src/services/csv/csvWriter.ts
var DELIMITER = ";";
var BOM = "\uFEFF";
function escapeCSV(value) {
  if (value.includes(DELIMITER) || value.includes('"') || value.includes("\n") || value.includes("\r")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
function sequenceTypeToAbbrev(type) {
  switch (type) {
    case "FINISH_START":
      return "FS";
    case "FINISH_FINISH":
      return "FF";
    case "START_START":
      return "SS";
    case "START_FINISH":
      return "SF";
  }
}
function formatLag(seq) {
  const e = seq.lagUnit === "ELAPSEDTIME" ? "e" : "";
  if (typeof seq.lagPercent === "number" && Number.isFinite(seq.lagPercent)) {
    return `${seq.lagPercent >= 0 ? "+" : ""}${seq.lagPercent}${e}%`;
  }
  if (seq.lagDays === 0) return "";
  return `${seq.lagDays > 0 ? "+" : ""}${seq.lagDays}${e}d`;
}
function writeCSV(_project, _calendar, tasks, sequences, _resources, _assignments) {
  const predMap = /* @__PURE__ */ new Map();
  const taskByIdMap = /* @__PURE__ */ new Map();
  for (const t of tasks) {
    taskByIdMap.set(t.id, t);
  }
  for (const seq of sequences) {
    const predTask = taskByIdMap.get(seq.predecessorId);
    if (!predTask) continue;
    const abbrev = sequenceTypeToAbbrev(seq.type);
    const lag = formatLag(seq);
    const predStr = `${predTask.wbsCode}${abbrev}${lag}`;
    if (!predMap.has(seq.successorId)) {
      predMap.set(seq.successorId, []);
    }
    predMap.get(seq.successorId).push(predStr);
  }
  const headers = [
    "WBS",
    "Name",
    "Duration (days)",
    "Start",
    "Finish",
    "Predecessors",
    "Task Type",
    "Status",
    "Completion (%)",
    // Actuals (fase 2.6, §9.3): achter Completion. Kolomkoppen altijd aanwezig (CSV-conventie);
    // een taak zonder actuals levert lege cellen. Geen baselines/statusdatum in CSV (bewust).
    "Actual Start",
    "Actual Finish",
    "Critical",
    "Total Float",
    "Description"
  ];
  const rows = [];
  rows.push(headers.map((h) => escapeCSV(h)).join(DELIMITER));
  for (const task of tasks) {
    const predecessors = predMap.get(task.id)?.join(", ") || "";
    const completion = Math.round(task.time.completion * 100);
    const row = [
      escapeCSV(task.wbsCode),
      escapeCSV(task.name),
      task.time.scheduleDuration.toString(),
      task.time.earlyStart || task.time.scheduleStart,
      task.time.earlyFinish || task.time.scheduleFinish,
      escapeCSV(predecessors),
      task.taskType,
      task.status,
      completion.toString(),
      task.time.actualStart || "",
      task.time.actualFinish || "",
      task.time.isCritical ? "Yes" : "No",
      task.time.totalFloat.toString(),
      escapeCSV(task.description)
    ];
    rows.push(row.join(DELIMITER));
  }
  return BOM + rows.join("\r\n") + "\r\n";
}

// src/services/importDates.ts
function isoDatePrefixOrToday(s) {
  if (!s) return formatDate(/* @__PURE__ */ new Date());
  return s.substring(0, 10);
}
function csvDateOrToday(s) {
  if (!s) return formatDate(/* @__PURE__ */ new Date());
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.substring(0, 10);
  const dmyMatch = s.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})/);
  if (dmyMatch) {
    return `${dmyMatch[3]}-${dmyMatch[2].padStart(2, "0")}-${dmyMatch[1].padStart(2, "0")}`;
  }
  return formatDate(/* @__PURE__ */ new Date());
}

// src/services/csv/csvReader.ts
function detectDelimiter(content) {
  const firstLine = content.split(/\r?\n/)[0] || "";
  const semicolons = (firstLine.match(/;/g) || []).length;
  const commas = (firstLine.match(/,/g) || []).length;
  return semicolons >= commas ? ";" : ",";
}
function parseCSVLine(line, delimiter2) {
  const fields = [];
  let current2 = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current2 += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current2 += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === delimiter2) {
        fields.push(current2);
        current2 = "";
      } else {
        current2 += ch;
      }
    }
  }
  fields.push(current2);
  return fields;
}
function parseTaskType2(s) {
  const upper = s.toUpperCase().trim();
  return TASK_TYPES.includes(upper) ? upper : "CONSTRUCTION";
}
function parseStatus(s) {
  const upper = s.toUpperCase().trim();
  if (upper === "STARTED" || upper === "IN_PROGRESS") return "STARTED";
  if (upper === "COMPLETED" || upper === "COMPLETE") return "COMPLETED";
  return "NOT_STARTED";
}
function parseDate2(s) {
  return csvDateOrToday(s);
}
function parsePredecessorString(predStr) {
  if (!predStr.trim()) return [];
  const results = [];
  const parts = predStr.split(/[,]/);
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const match = trimmed.match(/^([\d.]+)\s*(FS|FF|SS|SF)?\s*([+-]\d+(?:\.\d+)?(?:ed|e%|d|%)?)?$/i);
    if (match) {
      const wbs = match[1];
      const typeStr = (match[2] || "FS").toUpperCase();
      const lagStr = match[3] || "";
      const typeMap = {
        "FS": "FINISH_START",
        "FF": "FINISH_FINISH",
        "SS": "START_START",
        "SF": "START_FINISH"
      };
      let lag = 0;
      let lagUnit;
      let lagPercent;
      if (lagStr) {
        const lagMatch = lagStr.match(/^([+-]\d+(?:\.\d+)?)(ed|e%|d|%)?$/i);
        if (lagMatch) {
          const num = parseFloat(lagMatch[1]);
          const suffix = (lagMatch[2] || "d").toLowerCase();
          if (!isNaN(num)) {
            if (suffix === "%" || suffix === "e%") lagPercent = num;
            else lag = Math.round(num);
            if (suffix === "ed" || suffix === "e%") lagUnit = "ELAPSEDTIME";
          }
        }
      }
      results.push({ wbs, type: typeMap[typeStr] || "FINISH_START", lag, lagUnit, lagPercent });
    }
  }
  return results;
}
function mapColumnIndex(headers) {
  const map = {};
  const aliases = {
    wbs: ["wbs", "wbs code", "wbscode", "outline"],
    name: ["name", "task name", "activity", "taak", "naam"],
    duration: ["duration", "duration (days)", "duur", "days"],
    start: ["start", "start date", "begin", "startdatum"],
    finish: ["finish", "finish date", "end", "end date", "eind", "einddatum"],
    predecessors: ["predecessors", "predecessor", "voorgangers", "depends on", "links"],
    taskType: ["task type", "type", "tasktype", "taaktype"],
    status: ["status"],
    completion: ["completion", "completion (%)", "% complete", "percent", "voltooiing"],
    actualStart: ["actual start", "actualstart", "werkelijke start"],
    actualFinish: ["actual finish", "actualfinish", "werkelijke einde", "werkelijk einde"],
    critical: ["critical", "kritiek"],
    totalFloat: ["total float", "float", "slack", "speling"],
    description: ["description", "beschrijving", "notes", "opmerkingen"]
  };
  for (let i = 0; i < headers.length; i++) {
    const h = headers[i].toLowerCase().trim();
    for (const [key, aliasList] of Object.entries(aliases)) {
      if (aliasList.includes(h)) {
        map[key] = i;
        break;
      }
    }
  }
  return map;
}
function readCSV(content) {
  const clean = content.replace(/^\uFEFF/, "");
  const delimiter2 = detectDelimiter(clean);
  const lines = clean.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) {
    throw new Error("CSV file must have at least a header and one data row");
  }
  const headers = parseCSVLine(lines[0], delimiter2);
  const colMap = mapColumnIndex(headers);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const fields = parseCSVLine(lines[i], delimiter2);
    const get2 = (key, fallback = "") => colMap[key] !== void 0 ? fields[colMap[key]] || fallback : fallback;
    const completionStr = get2("completion", "0");
    let completion = parseFloat(completionStr) || 0;
    if (completion > 1) completion = completion / 100;
    const actualStartRaw = get2("actualStart").trim();
    const actualFinishRaw = get2("actualFinish").trim();
    rows.push({
      wbs: get2("wbs"),
      name: get2("name", "Task"),
      duration: parseFloat(get2("duration", "5")) || 5,
      start: parseDate2(get2("start")),
      finish: parseDate2(get2("finish")),
      predecessors: get2("predecessors"),
      taskType: get2("taskType", "CONSTRUCTION"),
      status: get2("status", "NOT_STARTED"),
      completion,
      actualStart: actualStartRaw ? parseDate2(actualStartRaw) : void 0,
      actualFinish: actualFinishRaw ? parseDate2(actualFinishRaw) : void 0,
      critical: get2("critical", "No").toLowerCase() === "yes",
      totalFloat: parseFloat(get2("totalFloat", "0")) || 0,
      description: get2("description")
    });
  }
  const tasks = [];
  const wbsToId = /* @__PURE__ */ new Map();
  for (const row of rows) {
    const id = generateId("task");
    wbsToId.set(row.wbs, id);
    tasks.push({
      id,
      name: row.name,
      description: row.description,
      wbsCode: row.wbs,
      taskType: parseTaskType2(row.taskType),
      status: parseStatus(row.status),
      isMilestone: row.duration === 0,
      priority: 0,
      parentId: null,
      childIds: [],
      time: {
        durationType: "WORKTIME",
        scheduleDuration: row.duration,
        scheduleStart: row.start,
        scheduleFinish: row.finish,
        earlyStart: row.start,
        earlyFinish: row.finish,
        lateStart: row.start,
        lateFinish: row.finish,
        freeFloat: 0,
        totalFloat: row.totalFloat,
        isCritical: row.critical,
        actualStart: row.actualStart,
        actualFinish: row.actualFinish,
        completion: row.completion
      },
      resourceIds: []
    });
  }
  normalizeImportedProgress(tasks, void 0);
  rebuildWbsHierarchy(tasks);
  const sequences = [];
  for (const task of tasks) {
    const row = rows.find((r) => r.wbs === task.wbsCode);
    if (!row || !row.predecessors) continue;
    const preds = parsePredecessorString(row.predecessors);
    for (const pred of preds) {
      const predId = wbsToId.get(pred.wbs);
      if (predId) {
        const seq = {
          id: generateId("seq"),
          predecessorId: predId,
          successorId: task.id,
          type: pred.type,
          lagDays: pred.lag
        };
        if (pred.lagUnit) seq.lagUnit = pred.lagUnit;
        if (pred.lagPercent !== void 0) seq.lagPercent = pred.lagPercent;
        sequences.push(seq);
      }
    }
  }
  const allStarts = tasks.map((t) => t.time.scheduleStart).filter(Boolean).sort();
  const allFinishes = tasks.map((t) => t.time.scheduleFinish).filter(Boolean).sort();
  const project = {
    id: generateId("proj"),
    name: "CSV Import",
    description: "",
    startDate: allStarts[0] || formatDate(/* @__PURE__ */ new Date()),
    endDate: allFinishes[allFinishes.length - 1] || "",
    calendarId: "cal-default",
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    modifiedAt: (/* @__PURE__ */ new Date()).toISOString(),
    author: "",
    company: ""
  };
  return {
    project,
    calendar: createDefaultCalendar(),
    tasks,
    sequences,
    resources: [],
    assignments: []
  };
}

// src/services/msproject/mspdiWriter.ts
var CURVE_TO_WORKCONTOUR = {
  UNIFORM: 0,
  BACK_LOADED: 1,
  FRONT_LOADED: 2,
  EARLY_PEAK: 4,
  LATE_PEAK: 5,
  BELL: 6
};
var WORKCONTOUR_TO_CURVE = (() => {
  const inv = {};
  for (const [curve, code] of Object.entries(CURVE_TO_WORKCONTOUR)) {
    inv[code] = curve;
  }
  return inv;
})();
function escapeXML(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function formatMSPDateTime(iso2) {
  if (!iso2) return "";
  if (iso2.length === 10) return `${iso2}T08:00:00`;
  if (iso2.length === 16) return `${iso2}:00`;
  return iso2;
}
function durationToISO8601(days, hoursPerDay) {
  const totalHours = days * hoursPerDay;
  return `PT${totalHours}H0M0S`;
}
function sequenceTypeToMSP(type) {
  switch (type) {
    case "FINISH_FINISH":
      return 0;
    case "FINISH_START":
      return 1;
    case "START_FINISH":
      return 2;
    case "START_START":
      return 3;
  }
}
function mspConstraintCode(c) {
  switch (c.type) {
    case "ASAP":
      return void 0;
    case "ALAP":
      return { code: 1 };
    case "SNET":
      return { code: 4 };
    case "SNLT":
      return { code: 5 };
    case "FNET":
      return { code: 6 };
    case "FNLT":
      return { code: 7 };
    case "MSO":
      return c.hard ? { code: 2 } : { code: 4, softLoss: true };
    case "MFO":
      return c.hard ? { code: 3 } : { code: 6, softLoss: true };
  }
}
function lagToTenthsOfMinutes(lagDays, hoursPerDay) {
  return lagDays * hoursPerDay * 60 * 10;
}
function lagFields(seq, hoursPerDay) {
  const elapsed = seq.lagUnit === "ELAPSEDTIME";
  if (typeof seq.lagPercent === "number" && Number.isFinite(seq.lagPercent)) {
    return { linkLag: Math.round(seq.lagPercent * 10), lagFormat: elapsed ? 20 : 19 };
  }
  if (elapsed) {
    return { linkLag: seq.lagDays * 24 * 60 * 10, lagFormat: 8 };
  }
  if (typeof seq.lagMinutes === "number" && Number.isFinite(seq.lagMinutes)) {
    return { linkLag: Math.round(seq.lagMinutes * 10), lagFormat: 7 };
  }
  return { linkLag: lagToTenthsOfMinutes(seq.lagDays, hoursPerDay), lagFormat: 7 };
}
function getOutlineLevel(wbs) {
  if (!wbs) return 1;
  return wbs.split(".").length;
}
function writeCalendarBlock(lines, indent, cal, uid, isBaseCalendar) {
  lines.push(`${indent(2)}<Calendar>`);
  lines.push(`${indent(3)}<UID>${uid}</UID>`);
  lines.push(`${indent(3)}<Name>${escapeXML(cal.name)}</Name>`);
  lines.push(`${indent(3)}<IsBaseCalendar>${isBaseCalendar ? 1 : 0}</IsBaseCalendar>`);
  lines.push(`${indent(3)}<WeekDays>`);
  for (let day = 1; day <= 7; day++) {
    const isWorkDay = cal.workDays.includes(day);
    const mspDay = day === 7 ? 1 : day + 1;
    const hourBands = cal.workTime ? cal.workTime.byWeekday[day] ?? [] : null;
    const dayWorking = hourBands ? hourBands.length > 0 : isWorkDay;
    lines.push(`${indent(4)}<WeekDay>`);
    lines.push(`${indent(5)}<DayType>${mspDay}</DayType>`);
    lines.push(`${indent(5)}<DayWorking>${dayWorking ? 1 : 0}</DayWorking>`);
    if (hourBands) {
      if (hourBands.length > 0) {
        lines.push(`${indent(5)}<WorkingTimes>`);
        for (const b of hourBands) {
          lines.push(`${indent(6)}<WorkingTime>`);
          lines.push(`${indent(7)}<FromTime>${minutesToClock(b.start)}</FromTime>`);
          lines.push(`${indent(7)}<ToTime>${minutesToClock(b.end)}</ToTime>`);
          lines.push(`${indent(6)}</WorkingTime>`);
        }
        lines.push(`${indent(5)}</WorkingTimes>`);
      }
    } else if (isWorkDay) {
      lines.push(`${indent(5)}<WorkingTimes>`);
      lines.push(`${indent(6)}<WorkingTime>`);
      lines.push(`${indent(7)}<FromTime>${String(cal.workStartHour).padStart(2, "0")}:00:00</FromTime>`);
      lines.push(`${indent(7)}<ToTime>${String(cal.workEndHour).padStart(2, "0")}:00:00</ToTime>`);
      lines.push(`${indent(6)}</WorkingTime>`);
      lines.push(`${indent(5)}</WorkingTimes>`);
    }
    lines.push(`${indent(4)}</WeekDay>`);
  }
  lines.push(`${indent(3)}</WeekDays>`);
  if (cal.holidays.length > 0) {
    lines.push(`${indent(3)}<Exceptions>`);
    for (const h of cal.holidays) {
      lines.push(`${indent(4)}<Exception>`);
      lines.push(`${indent(5)}<EnteredByOccurrences>0</EnteredByOccurrences>`);
      lines.push(`${indent(5)}<TimePeriod>`);
      lines.push(`${indent(6)}<FromDate>${formatMSPDateTime(h.startDate)}</FromDate>`);
      lines.push(`${indent(6)}<ToDate>${formatMSPDateTime(h.endDate)}</ToDate>`);
      lines.push(`${indent(5)}</TimePeriod>`);
      lines.push(`${indent(5)}<Name>${escapeXML(h.name)}</Name>`);
      lines.push(`${indent(5)}<Type>1</Type>`);
      lines.push(`${indent(5)}<DayWorking>0</DayWorking>`);
      lines.push(`${indent(4)}</Exception>`);
    }
    lines.push(`${indent(3)}</Exceptions>`);
  }
  lines.push(`${indent(2)}</Calendar>`);
}
function writeMSPDI(project, calendar, tasks, sequences, resources, assignments, resourceCalendars = [], baselines = [], activeBaselineId = null) {
  const lines = [];
  const indent = (level) => "  ".repeat(level);
  const extLinkCount = tasks.reduce((n, t) => n + (t.externalLinks?.length ?? 0), 0);
  if (extLinkCount > 0) {
    console.warn(`MSPDI-export: ${extLinkCount} externe (cross-project) dependency(s) weggelaten \u2014 niet uitdrukbaar in MSPDI (\xA76).`);
  }
  const softLossCount = tasks.filter((t) => t.constraint && !t.constraint.hard && (t.constraint.type === "MSO" || t.constraint.type === "MFO")).length;
  if (softLossCount > 0) {
    console.warn(`MSPDI-export: ${softLossCount} soft Start On/Finish On-constraint(s) gedegradeerd naar SNET/FNET \u2014 MSPDI-code 2/3 is HARD (Must), backward-bovengrens gaat verloren (\xA76).`);
  }
  const secondaryCount = tasks.filter((t) => t.constraint2).length;
  if (secondaryCount > 0) {
    console.warn(`MSPDI-export: ${secondaryCount} secundaire constraint(s) weggelaten \u2014 MSPDI kent maar \xE9\xE9n ConstraintType-element (\xA76).`);
  }
  const hammockCount = tasks.filter((t) => t.isHammock).length;
  if (hammockCount > 0) {
    console.warn(`MSPDI-export: ${hammockCount} hammock/LOE-taak/-taken ge\xEBxporteerd als gewone taak met berekende datums \u2014 MSPDI kent geen native LOE (\xA76).`);
  }
  const noteCount = tasks.reduce((n, t) => n + (t.notes?.length ?? 0), 0);
  if (noteCount > 0) {
    console.warn(`MSPDI-export: ${noteCount} taak-aantekening(en) weggelaten \u2014 MSPDI's native <Notes>-element is bewust niet gebruikt (lossy voor de checklist-vorm, \xA76).`);
  }
  const activeBaseline = baselines.find((b) => b.id === activeBaselineId) ?? null;
  const baselineByTask = new Map(
    (activeBaseline?.tasks ?? []).map((bt) => [bt.taskId, bt])
  );
  lines.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>');
  lines.push('<Project xmlns="http://schemas.microsoft.com/project">');
  const exportName = projectFileBase(project.name);
  lines.push(`${indent(1)}<Name>${escapeXML(exportName)}</Name>`);
  lines.push(`${indent(1)}<Title>${escapeXML(exportName)}</Title>`);
  lines.push(`${indent(1)}<Author>${escapeXML(project.author)}</Author>`);
  lines.push(`${indent(1)}<Company>${escapeXML(project.company)}</Company>`);
  lines.push(`${indent(1)}<CreationDate>${formatMSPDateTime(project.createdAt.substring(0, 10))}</CreationDate>`);
  lines.push(`${indent(1)}<StartDate>${formatMSPDateTime(project.startDate)}</StartDate>`);
  if (project.endDate) {
    lines.push(`${indent(1)}<FinishDate>${formatMSPDateTime(project.endDate)}</FinishDate>`);
  }
  if (project.statusDate) {
    lines.push(`${indent(1)}<StatusDate>${formatMSPDateTime(project.statusDate)}</StatusDate>`);
  }
  lines.push(`${indent(1)}<ScheduleFromStart>1</ScheduleFromStart>`);
  lines.push(`${indent(1)}<MinutesPerDay>${calendar.hoursPerDay * 60}</MinutesPerDay>`);
  lines.push(`${indent(1)}<MinutesPerWeek>${calendar.hoursPerDay * calendar.workDays.length * 60}</MinutesPerWeek>`);
  lines.push(`${indent(1)}<DaysPerMonth>20</DaysPerMonth>`);
  const so = project.schedulingOptions;
  if (so) {
    const cd = so.criticalDefinition;
    if (cd && cd.mode === "totalFloat" && typeof cd.threshold === "number" && Number.isInteger(cd.threshold) && cd.threshold >= 0) {
      lines.push(`${indent(1)}<CriticalSlackLimit>${cd.threshold}</CriticalSlackLimit>`);
    } else if (cd) {
      console.warn(`MSPDI-export: kritiek-definitie (${cd.mode}${cd.threshold != null ? `, drempel ${cd.threshold}` : ""}) niet uitdrukbaar als CriticalSlackLimit \u2014 weggelaten (\xA76).`);
    }
    const lost = [];
    if (so.lagCalendar && so.lagCalendar !== "predecessor") lost.push("lagCalendar");
    if (so.totalFloatMode && so.totalFloatMode !== "smallest") lost.push("totalFloatMode");
    if (so.makeOpenEndedCritical) lost.push("makeOpenEndedCritical");
    if (so.nearCriticalThreshold != null) lost.push("nearCriticalThreshold");
    if (so.floatPaths?.enabled) lost.push("floatPaths");
    if (lost.length > 0) {
      console.warn(`MSPDI-export: scheduling-opties ${lost.join("/")} niet native uitdrukbaar \u2014 weggelaten, alleen via IFC OPS_SchedulingOptions (\xA76).`);
    }
  }
  const libraryCalendars = resourceCalendars.filter((c) => c.id !== calendar.id);
  const calUidMap = /* @__PURE__ */ new Map();
  calUidMap.set(calendar.id, 1);
  let nextCalUid = 2;
  for (const cal of libraryCalendars) {
    calUidMap.set(cal.id, nextCalUid++);
  }
  const effCalByTask = effectiveCalendarByTask(tasks, calendar, libraryCalendars);
  lines.push(`${indent(1)}<Calendars>`);
  writeCalendarBlock(lines, indent, calendar, 1, true);
  for (const cal of libraryCalendars) {
    writeCalendarBlock(lines, indent, cal, calUidMap.get(cal.id), false);
  }
  lines.push(`${indent(1)}</Calendars>`);
  const taskUidMap = /* @__PURE__ */ new Map();
  for (let i = 0; i < tasks.length; i++) {
    taskUidMap.set(tasks[i].id, i + 1);
  }
  lines.push(`${indent(1)}<Tasks>`);
  lines.push(`${indent(2)}<Task>`);
  lines.push(`${indent(3)}<UID>0</UID>`);
  lines.push(`${indent(3)}<ID>0</ID>`);
  lines.push(`${indent(3)}<Name>${escapeXML(exportName)}</Name>`);
  lines.push(`${indent(3)}<OutlineLevel>0</OutlineLevel>`);
  lines.push(`${indent(3)}<Summary>1</Summary>`);
  lines.push(`${indent(2)}</Task>`);
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const uid = i + 1;
    const isSummary = task.childIds.length > 0;
    const isMilestone = task.isMilestone || task.time.scheduleDuration === 0;
    const effCal = effCalByTask.get(task.id);
    const isHour = isHourCalendar(effCal);
    const effHpd = effCal?.hoursPerDay ?? calendar.hoursPerDay;
    const durationTag = isHour ? minutesToIsoDuration(taskMinutesForWrite(task, effHpd)) : durationToISO8601(task.time.scheduleDuration, calendar.hoursPerDay);
    lines.push(`${indent(2)}<Task>`);
    lines.push(`${indent(3)}<UID>${uid}</UID>`);
    lines.push(`${indent(3)}<ID>${uid}</ID>`);
    lines.push(`${indent(3)}<Name>${escapeXML(task.name)}</Name>`);
    lines.push(`${indent(3)}<Duration>${durationTag}</Duration>`);
    lines.push(`${indent(3)}<Start>${formatMSPDateTime(task.time.earlyStart || task.time.scheduleStart)}</Start>`);
    lines.push(`${indent(3)}<Finish>${formatMSPDateTime(task.time.earlyFinish || task.time.scheduleFinish)}</Finish>`);
    lines.push(`${indent(3)}<WBS>${escapeXML(task.wbsCode)}</WBS>`);
    lines.push(`${indent(3)}<OutlineLevel>${getOutlineLevel(task.wbsCode)}</OutlineLevel>`);
    lines.push(`${indent(3)}<Summary>${isSummary ? 1 : 0}</Summary>`);
    lines.push(`${indent(3)}<Milestone>${isMilestone ? 1 : 0}</Milestone>`);
    lines.push(`${indent(3)}<PercentComplete>${Math.round(task.time.completion * 100)}</PercentComplete>`);
    if (task.time.actualStart) {
      lines.push(`${indent(3)}<ActualStart>${formatMSPDateTime(task.time.actualStart)}</ActualStart>`);
    }
    if (task.time.actualFinish) {
      lines.push(`${indent(3)}<ActualFinish>${formatMSPDateTime(task.time.actualFinish)}</ActualFinish>`);
    }
    if (isHour && task.time.remainingMinutes != null) {
      lines.push(`${indent(3)}<RemainingDuration>${minutesToIsoDuration(task.time.remainingMinutes)}</RemainingDuration>`);
    } else if (task.time.remainingTime != null) {
      lines.push(`${indent(3)}<RemainingDuration>${durationToISO8601(task.time.remainingTime, calendar.hoursPerDay)}</RemainingDuration>`);
    }
    lines.push(`${indent(3)}<Priority>${Number.isFinite(task.priority) ? task.priority : 500}</Priority>`);
    if (task.constraint) {
      const mapped = mspConstraintCode(task.constraint);
      if (mapped) {
        lines.push(`${indent(3)}<ConstraintType>${mapped.code}</ConstraintType>`);
        if (mapped.code !== 1 && task.constraint.date) {
          lines.push(`${indent(3)}<ConstraintDate>${formatMSPDateTime(task.constraint.date)}</ConstraintDate>`);
        }
      }
    }
    if (task.deadline) {
      lines.push(`${indent(3)}<Deadline>${formatMSPDateTime(task.deadline)}</Deadline>`);
    }
    const taskCalUid = task.calendarId && calUidMap.get(task.calendarId) || 1;
    lines.push(`${indent(3)}<CalendarUID>${taskCalUid}</CalendarUID>`);
    if (task.description) {
      lines.push(`${indent(3)}<Notes>${escapeXML(task.description)}</Notes>`);
    }
    const bt = baselineByTask.get(task.id);
    if (bt) {
      lines.push(`${indent(3)}<Baseline>`);
      lines.push(`${indent(4)}<Number>0</Number>`);
      lines.push(`${indent(4)}<Start>${formatMSPDateTime(bt.start)}</Start>`);
      lines.push(`${indent(4)}<Finish>${formatMSPDateTime(bt.finish)}</Finish>`);
      lines.push(`${indent(4)}<Duration>${durationToISO8601(bt.duration, calendar.hoursPerDay)}</Duration>`);
      lines.push(`${indent(3)}</Baseline>`);
    }
    const taskSeqs = sequences.filter((s) => s.successorId === task.id);
    if (taskSeqs.length > 0) {
      for (const seq of taskSeqs) {
        const predUid = taskUidMap.get(seq.predecessorId);
        if (predUid === void 0) continue;
        const { linkLag, lagFormat } = lagFields(seq, calendar.hoursPerDay);
        lines.push(`${indent(3)}<PredecessorLink>`);
        lines.push(`${indent(4)}<PredecessorUID>${predUid}</PredecessorUID>`);
        lines.push(`${indent(4)}<Type>${sequenceTypeToMSP(seq.type)}</Type>`);
        lines.push(`${indent(4)}<LinkLag>${linkLag}</LinkLag>`);
        lines.push(`${indent(4)}<LagFormat>${lagFormat}</LagFormat>`);
        lines.push(`${indent(3)}</PredecessorLink>`);
      }
    }
    lines.push(`${indent(2)}</Task>`);
  }
  lines.push(`${indent(1)}</Tasks>`);
  const resUidMap = /* @__PURE__ */ new Map();
  let nextResUid = 1;
  for (const res of resources) {
    resUidMap.set(res.id, nextResUid++);
  }
  lines.push(`${indent(1)}<Resources>`);
  for (const res of resources) {
    const uid = resUidMap.get(res.id);
    const calUid = res.calendarId && calUidMap.get(res.calendarId) || 1;
    lines.push(`${indent(2)}<Resource>`);
    lines.push(`${indent(3)}<UID>${uid}</UID>`);
    lines.push(`${indent(3)}<Name>${escapeXML(res.name)}</Name>`);
    lines.push(`${indent(3)}<Type>${res.type === "MATERIAL" ? 0 : 1}</Type>`);
    lines.push(`${indent(3)}<MaxUnits>${res.maxUnits}</MaxUnits>`);
    if (res.type === "MATERIAL" && res.unitOfMeasure) {
      lines.push(`${indent(3)}<MaterialLabel>${escapeXML(res.unitOfMeasure)}</MaterialLabel>`);
    }
    lines.push(`${indent(3)}<CalendarUID>${calUid}</CalendarUID>`);
    if (res.costPerHour !== void 0) {
      lines.push(`${indent(3)}<StandardRate>${res.costPerHour}</StandardRate>`);
    }
    lines.push(`${indent(2)}</Resource>`);
  }
  lines.push(`${indent(1)}</Resources>`);
  if (assignments.length > 0) {
    lines.push(`${indent(1)}<Assignments>`);
    let asgnUid = 1;
    for (const a of assignments) {
      const taskUid = taskUidMap.get(a.taskId);
      const resUid = resUidMap.get(a.resourceId);
      if (taskUid === void 0 || resUid === void 0) continue;
      const task = tasks.find((t) => t.id === a.taskId);
      const workDays = (task?.time.scheduleDuration ?? 0) * a.unitsPerDay;
      lines.push(`${indent(2)}<Assignment>`);
      lines.push(`${indent(3)}<UID>${asgnUid++}</UID>`);
      lines.push(`${indent(3)}<TaskUID>${taskUid}</TaskUID>`);
      lines.push(`${indent(3)}<ResourceUID>${resUid}</ResourceUID>`);
      lines.push(`${indent(3)}<Units>${a.unitsPerDay}</Units>`);
      lines.push(`${indent(3)}<Work>${durationToISO8601(workDays, calendar.hoursPerDay)}</Work>`);
      const contour = CURVE_TO_WORKCONTOUR[a.curve ?? "UNIFORM"];
      if (contour !== 0) {
        lines.push(`${indent(3)}<WorkContour>${contour}</WorkContour>`);
      }
      lines.push(`${indent(2)}</Assignment>`);
    }
    lines.push(`${indent(1)}</Assignments>`);
  }
  lines.push("</Project>");
  return lines.join("\n");
}

// src/services/xmlDom.ts
function descendantText(parent, tagName) {
  const el = parent.getElementsByTagName(tagName)[0];
  return el?.textContent?.trim() || "";
}
function directChildText(parent, tagName) {
  for (let i = 0; i < parent.children.length; i++) {
    const child = parent.children[i];
    if (child.localName === tagName || child.tagName === tagName) {
      return child.textContent?.trim() || "";
    }
  }
  return "";
}
function toInt(text, fallback = 0) {
  const n = parseInt(text);
  return isNaN(n) ? fallback : n;
}
function toFloat(text, fallback = 0) {
  const n = parseFloat(text);
  return isNaN(n) ? fallback : n;
}

// src/services/msproject/mspdiReader.ts
var MSP_TIME_ANCHOR = "08:00:00";
function getElementText(parent, tagName) {
  return descendantText(parent, tagName);
}
function getElementInt(parent, tagName, fallback = 0) {
  return toInt(getElementText(parent, tagName), fallback);
}
function getElementFloat(parent, tagName, fallback = 0) {
  return toFloat(getElementText(parent, tagName), fallback);
}
function parseMSPDate(s) {
  return isoDatePrefixOrToday(s);
}
function parseMSPInstant(s) {
  if (!s) return formatDate(/* @__PURE__ */ new Date());
  return formatInstant(parseInstant(s), "hour");
}
function mspDurationMinutes(s) {
  if (!s) return null;
  const m = s.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m || !m[1] && !m[2] && !m[3]) return null;
  return parseInt(m[1] || "0", 10) * 60 + parseInt(m[2] || "0", 10) + Math.round(parseInt(m[3] || "0", 10) / 60);
}
function parseMSPDuration(s, hoursPerDay) {
  if (!s) return 0;
  const mins = mspDurationMinutes(s);
  if (mins != null) {
    const perDay = hoursPerDay * 60;
    return perDay > 0 ? Math.round(mins / perDay) : 0;
  }
  const dayMatch = s.match(/P(\d+)D/);
  if (dayMatch) return parseInt(dayMatch[1]);
  return 0;
}
function mspTypeToSequenceType(type) {
  switch (type) {
    case 0:
      return "FINISH_FINISH";
    case 1:
      return "FINISH_START";
    case 2:
      return "START_FINISH";
    case 3:
      return "START_START";
    default:
      return "FINISH_START";
  }
}
function mspCodeToConstraint(code) {
  switch (code) {
    case 1:
      return { type: "ALAP" };
    case 2:
      return { type: "MSO", hard: true };
    case 3:
      return { type: "MFO", hard: true };
    case 4:
      return { type: "SNET" };
    case 5:
      return { type: "SNLT" };
    case 6:
      return { type: "FNET" };
    case 7:
      return { type: "FNLT" };
    default:
      return void 0;
  }
}
function tenthsOfMinutesToDays(tenths, hoursPerDay) {
  const minutes = tenths / 10;
  const hours = minutes / 60;
  return Math.round(hours / hoursPerDay);
}
function readMSPDI(content) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "application/xml");
  const parserError = doc.getElementsByTagName("parsererror")[0];
  if (parserError) {
    throw new Error("Invalid XML: " + parserError.textContent);
  }
  const root = doc.documentElement;
  const project = parseProject(root);
  const calendar = parseCalendar(root);
  const hoursPerDay = calendar.hoursPerDay;
  const calendarsRoot = root.getElementsByTagName("Calendars")[0];
  const calUidToId = /* @__PURE__ */ new Map();
  const resourceCalendars = [];
  if (calendarsRoot) {
    const calElements = calendarsRoot.getElementsByTagName("Calendar");
    for (let i = 0; i < calElements.length; i++) {
      const calEl = calElements[i];
      if (calEl.parentElement !== calendarsRoot) continue;
      const uid = getElementInt(calEl, "UID", -1);
      if (uid <= 1) continue;
      const cal = createDefaultCalendar();
      cal.id = generateId("rescal");
      cal.name = getElementText(calEl, "Name") || cal.name;
      applyCalendarBody(calEl, cal);
      delete cal.generation;
      calUidToId.set(uid, cal.id);
      resourceCalendars.push(cal);
    }
  }
  const resourcesRoot = root.getElementsByTagName("Resources")[0];
  const resources = [];
  const resUidToId = /* @__PURE__ */ new Map();
  if (resourcesRoot) {
    const resElements = resourcesRoot.getElementsByTagName("Resource");
    for (let i = 0; i < resElements.length; i++) {
      const resEl = resElements[i];
      if (resEl.parentElement !== resourcesRoot) continue;
      const uid = getElementInt(resEl, "UID", -1);
      if (uid < 0) continue;
      const id = generateId("res");
      resUidToId.set(uid, id);
      const name = getElementText(resEl, "Name") || "Resource";
      const type = getElementInt(resEl, "Type", 1);
      const maxUnits = getElementFloat(resEl, "MaxUnits", 1);
      const materialLabel = getElementText(resEl, "MaterialLabel");
      const calUid = getElementInt(resEl, "CalendarUID", -1);
      const standardRate = getElementText(resEl, "StandardRate");
      const resource = {
        id,
        name,
        type: type === 0 ? "MATERIAL" : "LABOR",
        description: "",
        maxUnits
      };
      if (materialLabel) resource.unitOfMeasure = materialLabel;
      if (calUid >= 0 && calUidToId.has(calUid)) resource.calendarId = calUidToId.get(calUid);
      const rate = parseFloat(standardRate);
      if (Number.isFinite(rate) && standardRate) resource.costPerHour = rate;
      resources.push(resource);
    }
  }
  const taskElements = root.getElementsByTagName("Task");
  const tasks = [];
  const uidToId = /* @__PURE__ */ new Map();
  const uidToWbs = /* @__PURE__ */ new Map();
  const pendingLinks = [];
  const baselineEntries = [];
  const calById = /* @__PURE__ */ new Map();
  calById.set(calendar.id, calendar);
  for (const c of resourceCalendars) calById.set(c.id, c);
  const effCalIdOfUid = (calUid) => calUid > 1 && calUidToId.get(calUid) || calendar.id;
  const taskHourById = /* @__PURE__ */ new Map();
  const cSignalCalIds = /* @__PURE__ */ new Set();
  for (let i = 0; i < taskElements.length; i++) {
    const te = taskElements[i];
    if (te.parentElement?.tagName !== "Tasks") continue;
    const calId = effCalIdOfUid(getElementInt(te, "CalendarUID", 1));
    const cal = calById.get(calId);
    if (!cal) continue;
    const durMin = mspDurationMinutes(getElementText(te, "Duration"));
    const durSignal = durMin != null && isSubDayMinutes(durMin, cal.hoursPerDay);
    const dateSignal = hasNonAnchorTime(getElementText(te, "Start"), MSP_TIME_ANCHOR) || hasNonAnchorTime(getElementText(te, "Finish"), MSP_TIME_ANCHOR);
    if (durSignal || dateSignal) cSignalCalIds.add(calId);
  }
  const hourModeCalIds = /* @__PURE__ */ new Set();
  for (const [id, cal] of calById) {
    if (promoteHourCalendar(cal, getCalendarBands(cal), cSignalCalIds.has(id), false)) {
      hourModeCalIds.add(id);
    }
  }
  for (let i = 0; i < taskElements.length; i++) {
    const te = taskElements[i];
    if (te.parentElement?.tagName !== "Tasks") continue;
    const uid = getElementInt(te, "UID", -1);
    if (uid < 0) continue;
    const outlineLevel = getElementInt(te, "OutlineLevel", 1);
    if (uid === 0 && outlineLevel === 0) continue;
    const id = generateId("task");
    uidToId.set(uid, id);
    const name = getElementText(te, "Name") || "Task";
    const wbs = getElementText(te, "WBS") || `${uid}`;
    uidToWbs.set(uid, wbs);
    const taskCalUid = getElementInt(te, "CalendarUID", 1);
    const taskCalendarId = taskCalUid > 1 ? calUidToId.get(taskCalUid) : void 0;
    const effCalId = effCalIdOfUid(taskCalUid);
    const isHour = hourModeCalIds.has(effCalId);
    const effHpd = calById.get(effCalId)?.hoursPerDay ?? hoursPerDay;
    const durationStr = getElementText(te, "Duration");
    const durationMinutes = isHour ? mspDurationMinutes(durationStr) ?? 0 : void 0;
    const duration = isHour ? effHpd > 0 ? durationMinutes / (effHpd * 60) : 0 : parseMSPDuration(durationStr, hoursPerDay);
    const start = isHour ? parseMSPInstant(getElementText(te, "Start")) : parseMSPDate(getElementText(te, "Start"));
    const finish = isHour ? parseMSPInstant(getElementText(te, "Finish")) : parseMSPDate(getElementText(te, "Finish"));
    const isMilestone = getElementInt(te, "Milestone") === 1;
    const percentComplete = getElementInt(te, "PercentComplete");
    const priority = getElementInt(te, "Priority", 500);
    const description = getElementText(te, "Notes");
    const actualStartRaw = getElementText(te, "ActualStart");
    const actualFinishRaw = getElementText(te, "ActualFinish");
    const remainingRaw = getElementText(te, "RemainingDuration");
    const actualStart = actualStartRaw ? isHour ? parseMSPInstant(actualStartRaw) : parseMSPDate(actualStartRaw) : void 0;
    const actualFinish = actualFinishRaw ? isHour ? parseMSPInstant(actualFinishRaw) : parseMSPDate(actualFinishRaw) : void 0;
    const remainingMinutes = isHour && remainingRaw ? mspDurationMinutes(remainingRaw) ?? void 0 : void 0;
    const remainingTime = !isHour && remainingRaw ? parseMSPDuration(remainingRaw, hoursPerDay) : void 0;
    let status = "NOT_STARTED";
    if (percentComplete >= 100) status = "COMPLETED";
    else if (percentComplete > 0) status = "STARTED";
    const parseCstrDate = (raw) => isHour ? parseMSPInstant(raw) : parseMSPDate(raw);
    let constraint;
    const cTypeRaw = getElementText(te, "ConstraintType");
    if (cTypeRaw) {
      const mapped = mspCodeToConstraint(parseInt(cTypeRaw, 10));
      if (mapped) {
        const cdateRaw = getElementText(te, "ConstraintDate");
        constraint = {
          type: mapped.type,
          ...mapped.hard ? { hard: true } : {},
          ...cdateRaw ? { date: parseCstrDate(cdateRaw) } : {}
        };
      }
    }
    const deadlineRaw = getElementText(te, "Deadline");
    const deadline = deadlineRaw ? parseCstrDate(deadlineRaw) : void 0;
    const baselineEls = te.getElementsByTagName("Baseline");
    for (let b = 0; b < baselineEls.length; b++) {
      const bEl = baselineEls[b];
      if (bEl.parentElement !== te) continue;
      if (getElementInt(bEl, "Number", -1) !== 0) continue;
      baselineEntries.push({
        taskId: id,
        start: parseMSPDate(getElementText(bEl, "Start")),
        finish: parseMSPDate(getElementText(bEl, "Finish")),
        duration: parseMSPDuration(getElementText(bEl, "Duration"), hoursPerDay),
        isMilestone
      });
      break;
    }
    tasks.push({
      id,
      name,
      description,
      wbsCode: wbs,
      taskType: "CONSTRUCTION",
      status,
      isMilestone,
      priority,
      parentId: null,
      childIds: [],
      time: {
        durationType: "WORKTIME",
        scheduleDuration: duration,
        ...durationMinutes != null ? { durationMinutes } : {},
        scheduleStart: start,
        scheduleFinish: finish,
        earlyStart: start,
        earlyFinish: finish,
        lateStart: start,
        lateFinish: finish,
        freeFloat: 0,
        totalFloat: 0,
        isCritical: false,
        actualStart,
        actualFinish,
        remainingTime,
        ...remainingMinutes != null ? { remainingMinutes } : {},
        completion: percentComplete / 100
      },
      resourceIds: [],
      ...constraint ? { constraint } : {},
      ...deadline ? { deadline } : {},
      ...taskCalendarId ? { calendarId: taskCalendarId } : {}
    });
    taskHourById.set(id, isHour);
    const predLinks = te.getElementsByTagName("PredecessorLink");
    for (let j = 0; j < predLinks.length; j++) {
      const pl = predLinks[j];
      const predUid = getElementInt(pl, "PredecessorUID", -1);
      const linkType = getElementInt(pl, "Type", 1);
      const linkLag = getElementInt(pl, "LinkLag", 0);
      const lagFormat = getElementInt(pl, "LagFormat", 7);
      if (predUid >= 0) {
        pendingLinks.push({
          successorId: id,
          predUid,
          type: linkType,
          lag: linkLag,
          lagFormat
        });
      }
    }
  }
  rebuildWbsHierarchy(tasks);
  const ELAPSED_DURATION_FORMATS = /* @__PURE__ */ new Set([4, 6, 8, 10, 12]);
  const sequences = [];
  for (const link of pendingLinks) {
    const predId = uidToId.get(link.predUid);
    if (!predId) continue;
    const seq = {
      id: generateId("seq"),
      predecessorId: predId,
      successorId: link.successorId,
      type: mspTypeToSequenceType(link.type),
      lagDays: 0
    };
    if (link.lagFormat === 19 || link.lagFormat === 20) {
      seq.lagPercent = link.lag / 10;
      if (link.lagFormat === 20) seq.lagUnit = "ELAPSEDTIME";
    } else if (ELAPSED_DURATION_FORMATS.has(link.lagFormat)) {
      seq.lagDays = Math.round(link.lag / 10 / 60 / 24);
      seq.lagUnit = "ELAPSEDTIME";
    } else if (taskHourById.get(link.successorId)) {
      seq.lagMinutes = Math.round(link.lag / 10);
    } else {
      seq.lagDays = tenthsOfMinutesToDays(link.lag, hoursPerDay);
    }
    sequences.push(seq);
  }
  const assignmentsRoot = root.getElementsByTagName("Assignments")[0];
  const assignments = [];
  if (assignmentsRoot) {
    const asgnElements = assignmentsRoot.getElementsByTagName("Assignment");
    for (let i = 0; i < asgnElements.length; i++) {
      const asgnEl = asgnElements[i];
      if (asgnEl.parentElement !== assignmentsRoot) continue;
      const taskUid = getElementInt(asgnEl, "TaskUID", -1);
      const resourceUid = getElementInt(asgnEl, "ResourceUID", -1);
      if (taskUid < 0 || resourceUid < 0) continue;
      const taskId = uidToId.get(taskUid);
      const resourceId = resUidToId.get(resourceUid);
      if (!taskId || !resourceId) continue;
      const unitsText = getElementText(asgnEl, "Units");
      const units = parseFloat(unitsText);
      const contour = getElementInt(asgnEl, "WorkContour", 0);
      const curve = WORKCONTOUR_TO_CURVE[contour];
      assignments.push({
        id: generateId("asgn"),
        taskId,
        resourceId,
        unitsPerDay: Number.isFinite(units) && unitsText ? units : 1,
        ...curve && curve !== "UNIFORM" ? { curve } : {}
      });
    }
  }
  const baselines = [];
  let activeBaselineId = null;
  if (baselineEntries.length > 0) {
    const id = generateId("baseline");
    const finishes = baselineEntries.map((b) => b.finish).filter(Boolean).sort();
    baselines.push({
      id,
      name: "Baseline (MSPDI)",
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      tasks: baselineEntries,
      projectEnd: finishes[finishes.length - 1] || "",
      projectDuration: 0
    });
    activeBaselineId = id;
  }
  normalizeImportedProgress(tasks, project.statusDate);
  return {
    project,
    calendar,
    tasks,
    sequences,
    resources,
    assignments,
    resourceCalendars,
    baselines,
    activeBaselineId
  };
}
function parseProject(root) {
  const project = {
    id: generateId("proj"),
    name: getElementText(root, "Name") || getElementText(root, "Title") || "MS Project Import",
    description: "",
    startDate: parseMSPDate(getElementText(root, "StartDate")),
    endDate: parseMSPDate(getElementText(root, "FinishDate")),
    calendarId: "cal-default",
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    modifiedAt: (/* @__PURE__ */ new Date()).toISOString(),
    author: getElementText(root, "Author"),
    company: getElementText(root, "Company")
  };
  const statusDateRaw = getElementText(root, "StatusDate");
  if (statusDateRaw) project.statusDate = parseMSPDate(statusDateRaw);
  const cslRaw = getElementText(root, "CriticalSlackLimit");
  if (cslRaw) {
    const csl = parseInt(cslRaw, 10);
    if (Number.isFinite(csl)) {
      project.schedulingOptions = { criticalDefinition: { mode: "totalFloat", threshold: csl } };
    }
  }
  return project;
}
function applyCalendarBody(calEl, calendar) {
  const weekDays = calEl.getElementsByTagName("WeekDay");
  const workDays = [];
  const rawByWeekday = {};
  for (let i = 0; i < weekDays.length; i++) {
    const wd = weekDays[i];
    if (wd.parentElement?.tagName !== "WeekDays") continue;
    const dayType = getElementInt(wd, "DayType");
    const dayWorking = getElementInt(wd, "DayWorking");
    if (dayWorking === 1 && dayType >= 1 && dayType <= 7) {
      const isoDay = dayType === 1 ? 7 : dayType - 1;
      workDays.push(isoDay);
      const wts = wd.getElementsByTagName("WorkingTime");
      const dayBands = [];
      for (let k = 0; k < wts.length; k++) {
        const s = clockToMinutes(getElementText(wts[k], "FromTime"));
        const e = clockToMinutes(getElementText(wts[k], "ToTime"));
        if (s != null && e != null) dayBands.push({ start: s, end: e });
      }
      if (dayBands.length > 0) rawByWeekday[isoDay] = dayBands;
    }
  }
  if (workDays.length > 0) {
    calendar.workDays = workDays.sort((a, b) => a - b);
  }
  const workingTimes = calEl.getElementsByTagName("WorkingTime");
  if (workingTimes.length > 0) {
    const fromTime = getElementText(workingTimes[0], "FromTime");
    const toTime = getElementText(workingTimes[0], "ToTime");
    if (fromTime) {
      const h = parseInt(fromTime.split(":")[0]);
      if (!isNaN(h)) calendar.workStartHour = h;
    }
    if (toTime) {
      const h = parseInt(toTime.split(":")[0]);
      if (!isNaN(h)) calendar.workEndHour = h;
    }
    calendar.hoursPerDay = calendar.workEndHour - calendar.workStartHour;
    if (calendar.hoursPerDay <= 0) calendar.hoursPerDay = 8;
  }
  const { bands, deviates } = canonicalizeBands(rawByWeekday);
  registerCalendarBands(calendar, { canonical: bands, deviates });
  const exceptions = calEl.getElementsByTagName("Exception");
  const holidays = [];
  for (let i = 0; i < exceptions.length; i++) {
    const exc = exceptions[i];
    const dayWorking = getElementInt(exc, "DayWorking");
    if (dayWorking === 0) {
      const name = getElementText(exc, "Name") || "Holiday";
      const timePeriods = exc.getElementsByTagName("TimePeriod");
      if (timePeriods.length > 0) {
        const fromDate = parseMSPDate(getElementText(timePeriods[0], "FromDate"));
        const toDate = parseMSPDate(getElementText(timePeriods[0], "ToDate"));
        holidays.push({ name, startDate: fromDate, endDate: toDate });
      }
    }
  }
  if (holidays.length > 0) {
    calendar.holidays = holidays;
  }
}
function parseCalendar(root) {
  const calElements = root.getElementsByTagName("Calendar");
  if (calElements.length === 0) return createDefaultCalendar();
  const cal = calElements[0];
  const calName = getElementText(cal, "Name") || "Imported Calendar";
  const calendar = createDefaultCalendar();
  calendar.name = calName;
  delete calendar.generation;
  applyCalendarBody(cal, calendar);
  const minutesPerDay = getElementInt(root, "MinutesPerDay");
  if (minutesPerDay > 0) {
    calendar.hoursPerDay = minutesPerDay / 60;
  }
  return calendar;
}

// src/services/p6/p6xmlWriter.ts
var P6_CURVE_TO_NAME = {
  UNIFORM: void 0,
  FRONT_LOADED: "Front Loaded",
  BACK_LOADED: "Back Loaded",
  BELL: "Bell Shaped",
  EARLY_PEAK: "Early Peak",
  LATE_PEAK: "Early Peak"
};
var P6_NAME_TO_CURVE = {
  "Linear": "UNIFORM",
  "Front Loaded": "FRONT_LOADED",
  "Back Loaded": "BACK_LOADED",
  "Bell Shaped": "BELL",
  "Early Peak": "EARLY_PEAK"
};
function resourceTypeToP6(type) {
  switch (type) {
    case "LABOR":
    case "CREW":
      return "Labor";
    case "MATERIAL":
      return "Material";
    case "EQUIPMENT":
    case "SUBCONTRACTOR":
      return "Nonlabor";
  }
}
function escapeXML2(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function formatP6DateTime(iso2) {
  if (!iso2) return "";
  if (iso2.length === 10) return `${iso2}T08:00:00`;
  if (iso2.length === 16) return `${iso2}:00`;
  return iso2;
}
function sequenceTypeToP6(type) {
  switch (type) {
    case "FINISH_START":
      return "PR_FS";
    case "FINISH_FINISH":
      return "PR_FF";
    case "START_START":
      return "PR_SS";
    case "START_FINISH":
      return "PR_SF";
  }
}
function p6ConstraintCode(c) {
  switch (c.type) {
    case "ASAP":
      return void 0;
    case "ALAP":
      return "CS_ALAP";
    case "SNET":
      return "CS_MSOA";
    case "SNLT":
      return "CS_MSOB";
    case "FNET":
      return "CS_MEOA";
    case "FNLT":
      return "CS_MEOB";
    case "MSO":
      return c.hard ? "CS_MANDSTART" : "CS_MSO";
    case "MFO":
      return c.hard ? "CS_MANDFIN" : "CS_MEO";
  }
}
function taskStatusToP6(task) {
  if (task.status === "COMPLETED") return "Completed";
  if (task.status === "STARTED") return "In Progress";
  return "Not Started";
}
function taskTypeToP6(task) {
  if (task.isMilestone) {
    return task.milestoneKind === "FINISH" ? "Finish Milestone" : "Start Milestone";
  }
  if (task.childIds.length > 0) return "WBS Summary";
  return "Task Dependent";
}
function durationToP6Hours(days, hoursPerDay) {
  return days * hoursPerDay;
}
var P6_DAY_NAMES = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
function writeStandardWorkWeek(lines, indent, cal) {
  lines.push(`${indent(2)}<StandardWorkWeek>`);
  for (let day = 1; day <= 7; day++) {
    lines.push(`${indent(3)}<StandardWorkHour>`);
    lines.push(`${indent(4)}<DayOfWeek>${P6_DAY_NAMES[day]}</DayOfWeek>`);
    if (cal.workTime) {
      for (const b of cal.workTime.byWeekday[day] ?? []) {
        lines.push(`${indent(4)}<WorkTime>`);
        lines.push(`${indent(5)}<Start>${minutesToClock(b.start)}</Start>`);
        lines.push(`${indent(5)}<Finish>${minutesToClock(b.end)}</Finish>`);
        lines.push(`${indent(4)}</WorkTime>`);
      }
    } else if (cal.workDays.includes(day)) {
      lines.push(`${indent(4)}<WorkTime>`);
      lines.push(`${indent(5)}<Start>${String(cal.workStartHour).padStart(2, "0")}:00:00</Start>`);
      lines.push(`${indent(5)}<Finish>${String(cal.workEndHour).padStart(2, "0")}:00:00</Finish>`);
      lines.push(`${indent(4)}</WorkTime>`);
    }
    lines.push(`${indent(3)}</StandardWorkHour>`);
  }
  lines.push(`${indent(2)}</StandardWorkWeek>`);
}
function writeHolidayOrExceptions(lines, indent, cal) {
  if (cal.holidays.length === 0) return;
  lines.push(`${indent(2)}<HolidayOrExceptions>`);
  for (const h of cal.holidays) {
    lines.push(`${indent(3)}<HolidayOrException>`);
    lines.push(`${indent(4)}<Name>${escapeXML2(h.name)}</Name>`);
    lines.push(`${indent(4)}<Date>${formatP6DateTime(h.startDate)}</Date>`);
    lines.push(`${indent(4)}<FinishDate>${formatP6DateTime(h.endDate)}</FinishDate>`);
    lines.push(`${indent(3)}</HolidayOrException>`);
  }
  lines.push(`${indent(2)}</HolidayOrExceptions>`);
}
function writeP6XML(project, calendar, tasks, sequences, resources, assignments, resourceCalendars = []) {
  const lines = [];
  const indent = (level) => "  ".repeat(level);
  const extLinkCount = tasks.reduce((n, t) => n + (t.externalLinks?.length ?? 0), 0);
  if (extLinkCount > 0) {
    console.warn(`P6-export: ${extLinkCount} externe (cross-project) dependency(s) weggelaten \u2014 niet uitdrukbaar in P6-XML (\xA76).`);
  }
  const hammockCount = tasks.filter((t) => t.isHammock).length;
  if (hammockCount > 0) {
    console.warn(`P6-export: ${hammockCount} hammock/LOE-taak/-taken ge\xEBxporteerd als gewone taak met berekende datums \u2014 P6 native LOE-type UNVERIFIED, niet gegokt (\xA76).`);
  }
  if (project.schedulingOptions && Object.keys(project.schedulingOptions).length > 0) {
    console.warn("P6-export: scheduling-opties niet ge\xEBxporteerd \u2014 P6 SCHEDOPTIONS-mapping UNVERIFIED (aspiratie, \xA76).");
  }
  const noteCount = tasks.reduce((n, t) => n + (t.notes?.length ?? 0), 0);
  if (noteCount > 0) {
    console.warn(`P6-export: ${noteCount} taak-aantekening(en) weggelaten \u2014 niet uitdrukbaar in P6-XML (\xA76).`);
  }
  lines.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>');
  lines.push('<APIBusinessObjects xmlns="http://xmlns.oracle.com/Primavera/P6/V23.12/API/BusinessObjects" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">');
  const taskObjMap = /* @__PURE__ */ new Map();
  let nextObjId = 1;
  for (const task of tasks) {
    taskObjMap.set(task.id, nextObjId++);
  }
  const resObjMap = /* @__PURE__ */ new Map();
  let nextResObjId = 1;
  for (const res of resources) {
    resObjMap.set(res.id, nextResObjId++);
  }
  const libraryCalendars = resourceCalendars.filter((c) => c.id !== calendar.id);
  const calObjMap = /* @__PURE__ */ new Map();
  calObjMap.set(calendar.id, 1);
  let nextCalObjId = 2;
  for (const cal of libraryCalendars) {
    calObjMap.set(cal.id, nextCalObjId++);
  }
  const effCalByTask = effectiveCalendarByTask(tasks, calendar, libraryCalendars);
  const wbsTasks = tasks.filter((t) => t.childIds.length > 0);
  const leafTasks = tasks.filter((t) => t.childIds.length === 0);
  lines.push(`${indent(1)}<Project>`);
  lines.push(`${indent(2)}<ObjectId>1</ObjectId>`);
  lines.push(`${indent(2)}<Id>${escapeXML2(project.id)}</Id>`);
  lines.push(`${indent(2)}<Name>${escapeXML2(projectFileBase(project.name))}</Name>`);
  lines.push(`${indent(2)}<Description>${escapeXML2(project.description)}</Description>`);
  lines.push(`${indent(2)}<PlannedStartDate>${formatP6DateTime(project.startDate)}</PlannedStartDate>`);
  if (project.endDate) {
    lines.push(`${indent(2)}<MustFinishByDate>${formatP6DateTime(project.endDate)}</MustFinishByDate>`);
  }
  lines.push(`${indent(2)}<Status>${project.endDate ? "Active" : "Planned"}</Status>`);
  if (project.statusDate) {
    lines.push(`${indent(2)}<DataDate>${formatP6DateTime(project.statusDate)}</DataDate>`);
  }
  lines.push(`${indent(1)}</Project>`);
  lines.push(`${indent(1)}<Calendar>`);
  lines.push(`${indent(2)}<ObjectId>1</ObjectId>`);
  lines.push(`${indent(2)}<Name>${escapeXML2(calendar.name)}</Name>`);
  lines.push(`${indent(2)}<Type>Global</Type>`);
  lines.push(`${indent(2)}<HoursPerDay>${calendar.hoursPerDay}</HoursPerDay>`);
  lines.push(`${indent(2)}<HoursPerWeek>${calendar.hoursPerDay * calendar.workDays.length}</HoursPerWeek>`);
  lines.push(`${indent(2)}<HoursPerMonth>${calendar.hoursPerDay * 20}</HoursPerMonth>`);
  writeStandardWorkWeek(lines, indent, calendar);
  writeHolidayOrExceptions(lines, indent, calendar);
  lines.push(`${indent(1)}</Calendar>`);
  for (const cal of libraryCalendars) {
    const objId = calObjMap.get(cal.id);
    lines.push(`${indent(1)}<Calendar>`);
    lines.push(`${indent(2)}<ObjectId>${objId}</ObjectId>`);
    lines.push(`${indent(2)}<Name>${escapeXML2(cal.name)}</Name>`);
    lines.push(`${indent(2)}<Type>Resource</Type>`);
    lines.push(`${indent(2)}<HoursPerDay>${cal.hoursPerDay}</HoursPerDay>`);
    lines.push(`${indent(2)}<HoursPerWeek>${cal.hoursPerDay * cal.workDays.length}</HoursPerWeek>`);
    lines.push(`${indent(2)}<HoursPerMonth>${cal.hoursPerDay * 20}</HoursPerMonth>`);
    writeStandardWorkWeek(lines, indent, cal);
    writeHolidayOrExceptions(lines, indent, cal);
    lines.push(`${indent(1)}</Calendar>`);
  }
  for (const res of resources) {
    const objId = resObjMap.get(res.id);
    lines.push(`${indent(1)}<Resource>`);
    lines.push(`${indent(2)}<ObjectId>${objId}</ObjectId>`);
    lines.push(`${indent(2)}<Id>${escapeXML2(res.id)}</Id>`);
    lines.push(`${indent(2)}<Name>${escapeXML2(res.name)}</Name>`);
    lines.push(`${indent(2)}<ResourceType>${resourceTypeToP6(res.type)}</ResourceType>`);
    const calObjId = res.calendarId && calObjMap.get(res.calendarId) || 1;
    lines.push(`${indent(2)}<CalendarObjectId>${calObjId}</CalendarObjectId>`);
    lines.push(`${indent(2)}<MaxUnitsPerTime>${res.maxUnits}</MaxUnitsPerTime>`);
    if (res.type === "MATERIAL" && res.unitOfMeasure) {
      lines.push(`${indent(2)}<UnitOfMeasureAbbreviation>${escapeXML2(res.unitOfMeasure)}</UnitOfMeasureAbbreviation>`);
    }
    if (res.parentId && resObjMap.has(res.parentId)) {
      lines.push(`${indent(2)}<ParentObjectId>${resObjMap.get(res.parentId)}</ParentObjectId>`);
    }
    lines.push(`${indent(1)}</Resource>`);
  }
  let rateObjId = 1;
  for (const res of resources) {
    if (res.costPerHour === void 0) continue;
    const rateResObjId = resObjMap.get(res.id);
    lines.push(`${indent(1)}<ResourceRate>`);
    lines.push(`${indent(2)}<ObjectId>${rateObjId++}</ObjectId>`);
    lines.push(`${indent(2)}<ResourceObjectId>${rateResObjId}</ResourceObjectId>`);
    lines.push(`${indent(2)}<EffectiveDate>${formatP6DateTime(project.startDate)}</EffectiveDate>`);
    lines.push(`${indent(2)}<PricePerUnit>${res.costPerHour}</PricePerUnit>`);
    lines.push(`${indent(1)}</ResourceRate>`);
  }
  for (const wbsTask of wbsTasks) {
    const objId = taskObjMap.get(wbsTask.id);
    const parentObjId = wbsTask.parentId ? taskObjMap.get(wbsTask.parentId) : void 0;
    lines.push(`${indent(1)}<WBS>`);
    lines.push(`${indent(2)}<ObjectId>${objId}</ObjectId>`);
    lines.push(`${indent(2)}<Code>${escapeXML2(wbsTask.wbsCode)}</Code>`);
    lines.push(`${indent(2)}<Name>${escapeXML2(wbsTask.name)}</Name>`);
    lines.push(`${indent(2)}<ProjectObjectId>1</ProjectObjectId>`);
    if (parentObjId !== void 0) {
      lines.push(`${indent(2)}<ParentObjectId>${parentObjId}</ParentObjectId>`);
    }
    lines.push(`${indent(1)}</WBS>`);
  }
  for (const task of leafTasks) {
    const objId = taskObjMap.get(task.id);
    const wbsObjId = task.parentId ? taskObjMap.get(task.parentId) : void 0;
    lines.push(`${indent(1)}<Activity>`);
    lines.push(`${indent(2)}<ObjectId>${objId}</ObjectId>`);
    lines.push(`${indent(2)}<Id>${escapeXML2(task.wbsCode || task.id)}</Id>`);
    lines.push(`${indent(2)}<Name>${escapeXML2(task.name)}</Name>`);
    lines.push(`${indent(2)}<ProjectObjectId>1</ProjectObjectId>`);
    if (wbsObjId !== void 0) {
      lines.push(`${indent(2)}<WBSObjectId>${wbsObjId}</WBSObjectId>`);
    }
    lines.push(`${indent(2)}<Type>${taskTypeToP6(task)}</Type>`);
    lines.push(`${indent(2)}<Status>${taskStatusToP6(task)}</Status>`);
    const effCal = effCalByTask.get(task.id);
    const isHour = isHourCalendar(effCal);
    const effHpd = effCal?.hoursPerDay ?? calendar.hoursPerDay;
    const plannedDur = isHour ? taskMinutesForWrite(task, effHpd) / 60 : durationToP6Hours(task.time.scheduleDuration, calendar.hoursPerDay);
    lines.push(`${indent(2)}<PlannedDuration>${plannedDur}</PlannedDuration>`);
    lines.push(`${indent(2)}<PlannedStartDate>${formatP6DateTime(task.time.earlyStart || task.time.scheduleStart)}</PlannedStartDate>`);
    lines.push(`${indent(2)}<PlannedFinishDate>${formatP6DateTime(task.time.earlyFinish || task.time.scheduleFinish)}</PlannedFinishDate>`);
    if (task.time.completion > 0) {
      lines.push(`${indent(2)}<PhysicalPercentComplete>${Math.round(task.time.completion * 100)}</PhysicalPercentComplete>`);
    }
    if (task.time.actualStart) {
      lines.push(`${indent(2)}<ActualStartDate>${formatP6DateTime(task.time.actualStart)}</ActualStartDate>`);
    }
    if (task.time.actualFinish) {
      lines.push(`${indent(2)}<ActualFinishDate>${formatP6DateTime(task.time.actualFinish)}</ActualFinishDate>`);
    }
    if (isHour && task.time.remainingMinutes != null) {
      lines.push(`${indent(2)}<RemainingDuration>${task.time.remainingMinutes / 60}</RemainingDuration>`);
    } else if (task.time.remainingTime != null) {
      lines.push(`${indent(2)}<RemainingDuration>${durationToP6Hours(task.time.remainingTime, calendar.hoursPerDay)}</RemainingDuration>`);
    }
    if (task.description) {
      lines.push(`${indent(2)}<Description>${escapeXML2(task.description)}</Description>`);
    }
    if (task.constraint) {
      const code = p6ConstraintCode(task.constraint);
      if (code) {
        lines.push(`${indent(2)}<PrimaryConstraintType>${code}</PrimaryConstraintType>`);
        if (task.constraint.date) {
          lines.push(`${indent(2)}<PrimaryConstraintDate>${formatP6DateTime(task.constraint.date)}</PrimaryConstraintDate>`);
        }
      }
    }
    if (task.constraint2) {
      const code2 = p6ConstraintCode(task.constraint2);
      if (code2) {
        lines.push(`${indent(2)}<SecondaryConstraintType>${code2}</SecondaryConstraintType>`);
        if (task.constraint2.date) {
          lines.push(`${indent(2)}<SecondaryConstraintDate>${formatP6DateTime(task.constraint2.date)}</SecondaryConstraintDate>`);
        }
      }
    }
    const taskCalObjId = task.calendarId && calObjMap.get(task.calendarId) || 1;
    lines.push(`${indent(2)}<CalendarObjectId>${taskCalObjId}</CalendarObjectId>`);
    lines.push(`${indent(1)}</Activity>`);
  }
  const taskById = new Map(tasks.map((t) => [t.id, t]));
  let relObjId = 1;
  for (const seq of sequences) {
    const predObjId = taskObjMap.get(seq.predecessorId);
    const succObjId = taskObjMap.get(seq.successorId);
    if (predObjId === void 0 || succObjId === void 0) continue;
    let lagDays = Number.isFinite(seq.lagDays) ? seq.lagDays : 0;
    if (typeof seq.lagPercent === "number" && Number.isFinite(seq.lagPercent)) {
      const pred = taskById.get(seq.predecessorId);
      const predDur = pred && !pred.isMilestone ? pred.time.scheduleDuration : 0;
      lagDays = Math.round(predDur * seq.lagPercent / 100);
      console.warn(`P6-export: procent-lag (${seq.lagPercent}%) uitgebakken naar ${lagDays} dagen \u2014 P6 kent geen procent-lag.`);
    }
    if (seq.lagUnit === "ELAPSEDTIME") {
      console.warn("P6-export: kalenderdag-lag ge\xEBxporteerd als gewone lag-uren \u2014 P6 heeft geen lag-eenheid per relatie.");
    }
    const hourLag = typeof seq.lagMinutes === "number" && Number.isFinite(seq.lagMinutes) && !(typeof seq.lagPercent === "number" && Number.isFinite(seq.lagPercent));
    const lagHours = hourLag ? seq.lagMinutes / 60 : durationToP6Hours(lagDays, calendar.hoursPerDay);
    lines.push(`${indent(1)}<Relationship>`);
    lines.push(`${indent(2)}<ObjectId>${relObjId++}</ObjectId>`);
    lines.push(`${indent(2)}<PredecessorActivityObjectId>${predObjId}</PredecessorActivityObjectId>`);
    lines.push(`${indent(2)}<SuccessorActivityObjectId>${succObjId}</SuccessorActivityObjectId>`);
    lines.push(`${indent(2)}<Type>${sequenceTypeToP6(seq.type)}</Type>`);
    lines.push(`${indent(2)}<Lag>${lagHours}</Lag>`);
    lines.push(`${indent(2)}<ProjectObjectId>1</ProjectObjectId>`);
    lines.push(`${indent(1)}</Relationship>`);
  }
  let asgnObjId = 1;
  for (const a of assignments) {
    const actObjId = taskObjMap.get(a.taskId);
    const resObjId = resObjMap.get(a.resourceId);
    if (actObjId === void 0 || resObjId === void 0) continue;
    lines.push(`${indent(1)}<ResourceAssignment>`);
    lines.push(`${indent(2)}<ObjectId>${asgnObjId++}</ObjectId>`);
    lines.push(`${indent(2)}<ActivityObjectId>${actObjId}</ActivityObjectId>`);
    lines.push(`${indent(2)}<ResourceObjectId>${resObjId}</ResourceObjectId>`);
    lines.push(`${indent(2)}<PlannedUnitsPerTime>${a.unitsPerDay}</PlannedUnitsPerTime>`);
    const curveName = a.curve ? P6_CURVE_TO_NAME[a.curve] : void 0;
    if (curveName) {
      if (a.curve === "LATE_PEAK") {
        console.warn("P6-export: LATE_PEAK-curve heeft geen P6-equivalent \u2014 ge\xEBxporteerd als 'Early Peak' (beste benadering).");
      }
      lines.push(`${indent(2)}<PlannedCurve>${escapeXML2(curveName)}</PlannedCurve>`);
    }
    lines.push(`${indent(1)}</ResourceAssignment>`);
  }
  lines.push("</APIBusinessObjects>");
  return lines.join("\n");
}

// src/services/p6/p6xmlReader.ts
var P6_TIME_ANCHOR = "08:00:00";
function resourceTypeFromP6(p6Type) {
  if (p6Type === "Material") return "MATERIAL";
  if (p6Type === "Nonlabor") return "EQUIPMENT";
  return "LABOR";
}
function getElementText2(parent, tagName) {
  return directChildText(parent, tagName);
}
function getElementInt2(parent, tagName, fallback = 0) {
  return toInt(getElementText2(parent, tagName), fallback);
}
function getElementFloat2(parent, tagName, fallback = 0) {
  return toFloat(getElementText2(parent, tagName), fallback);
}
function parseP6Date(s) {
  return isoDatePrefixOrToday(s);
}
function p6TypeToSequenceType(type) {
  switch (type) {
    case "PR_FS":
      return "FINISH_START";
    case "PR_FF":
      return "FINISH_FINISH";
    case "PR_SS":
      return "START_START";
    case "PR_SF":
      return "START_FINISH";
    default:
      return "FINISH_START";
  }
}
function p6HoursToDays(hours, hoursPerDay) {
  if (hoursPerDay <= 0) hoursPerDay = 8;
  return Math.round(hours / hoursPerDay);
}
function p6CodeToConstraint(code) {
  switch (code) {
    case "CS_MSO":
      return { type: "MSO" };
    case "CS_MSOA":
      return { type: "SNET" };
    case "CS_MSOB":
      return { type: "SNLT" };
    case "CS_MEO":
      return { type: "MFO" };
    case "CS_MEOA":
      return { type: "FNET" };
    case "CS_MEOB":
      return { type: "FNLT" };
    case "CS_ALAP":
      return { type: "ALAP" };
    case "CS_MANDSTART":
      return { type: "MSO", hard: true };
    case "CS_MANDFIN":
      return { type: "MFO", hard: true };
    default:
      return void 0;
  }
}
function parseP6StandardWorkWeek(calEl) {
  const wwEl = calEl.getElementsByTagName("StandardWorkWeek")[0];
  const workDays = [];
  let workStartHour;
  let workEndHour;
  const rawByWeekday = {};
  if (!wwEl) return { workDays, rawByWeekday };
  for (let i = 0; i < wwEl.children.length; i++) {
    const dayEl = wwEl.children[i];
    if (dayEl.localName !== "StandardWorkHour" && dayEl.tagName !== "StandardWorkHour") continue;
    const dayName = getElementText2(dayEl, "DayOfWeek");
    const isoDay = P6_DAY_NAMES.indexOf(dayName);
    const wts = dayEl.getElementsByTagName("WorkTime");
    const dayBands = [];
    for (let k = 0; k < wts.length; k++) {
      const wt = wts[k];
      const s = clockToMinutes(getElementText2(wt, "Start"));
      const e = clockToMinutes(getElementText2(wt, "Finish"));
      if (s == null || e == null) continue;
      dayBands.push({ start: s, end: e });
      workStartHour = Math.floor(s / 60);
      workEndHour = Math.floor(e / 60);
    }
    if (dayBands.length === 0 || isoDay <= 0) continue;
    workDays.push(isoDay);
    rawByWeekday[isoDay] = dayBands;
  }
  return { workDays, workStartHour, workEndHour, rawByWeekday };
}
function registerP6Bands(cal, rawByWeekday) {
  const { bands, deviates } = canonicalizeBands(rawByWeekday);
  registerCalendarBands(cal, { canonical: bands, deviates });
}
function parseP6HolidayOrExceptions(calEl) {
  const hoEl = calEl.getElementsByTagName("HolidayOrExceptions")[0];
  if (!hoEl) return [];
  const holidays = [];
  for (let i = 0; i < hoEl.children.length; i++) {
    const hEl = hoEl.children[i];
    if (hEl.localName !== "HolidayOrException" && hEl.tagName !== "HolidayOrException") continue;
    const date = getElementText2(hEl, "Date");
    if (!date) continue;
    const name = getElementText2(hEl, "Name") || "Feestdag";
    const finishDate = getElementText2(hEl, "FinishDate") || date;
    holidays.push({ name, startDate: parseP6Date(date), endDate: parseP6Date(finishDate) });
  }
  return holidays;
}
function getAllByLocalName(doc, localName) {
  const results = [];
  const root = doc.documentElement;
  for (let i = 0; i < root.children.length; i++) {
    const child = root.children[i];
    if (child.localName === localName) {
      results.push(child);
    }
  }
  return results;
}
function readP6XML(content) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "application/xml");
  const parserError = doc.getElementsByTagName("parsererror")[0];
  if (parserError) {
    throw new Error("Invalid XML: " + parserError.textContent);
  }
  const calendar = parseCalendar2(doc);
  const hoursPerDay = calendar.hoursPerDay;
  const calElements = getAllByLocalName(doc, "Calendar");
  const calObjIdToId = /* @__PURE__ */ new Map();
  const resourceCalendars = [];
  for (let i = 1; i < calElements.length; i++) {
    const calEl = calElements[i];
    if (getElementText2(calEl, "Type") !== "Resource") continue;
    const objId = getElementInt2(calEl, "ObjectId", -1);
    if (objId < 0) continue;
    const cal = createDefaultCalendar();
    delete cal.generation;
    cal.id = generateId("rescal");
    cal.name = getElementText2(calEl, "Name") || cal.name;
    const hpd = getElementFloat2(calEl, "HoursPerDay");
    if (hpd > 0) cal.hoursPerDay = hpd;
    const ww = parseP6StandardWorkWeek(calEl);
    if (ww.workDays.length > 0) cal.workDays = ww.workDays.sort((a, b) => a - b);
    if (ww.workStartHour !== void 0) cal.workStartHour = ww.workStartHour;
    if (ww.workEndHour !== void 0) cal.workEndHour = ww.workEndHour;
    registerP6Bands(cal, ww.rawByWeekday);
    const holidays = parseP6HolidayOrExceptions(calEl);
    if (holidays.length > 0) cal.holidays = holidays;
    calObjIdToId.set(objId, cal.id);
    resourceCalendars.push(cal);
  }
  const resourceElements = getAllByLocalName(doc, "Resource");
  const resources = [];
  const resObjIdToId = /* @__PURE__ */ new Map();
  const pendingParents = [];
  for (const resEl of resourceElements) {
    const objId = getElementInt2(resEl, "ObjectId", -1);
    if (objId < 0) continue;
    const id = generateId("res");
    resObjIdToId.set(objId, id);
    const name = getElementText2(resEl, "Name") || "Resource";
    const p6Type = getElementText2(resEl, "ResourceType");
    const maxUnitsPerTime = getElementFloat2(resEl, "MaxUnitsPerTime");
    const calObjId = getElementInt2(resEl, "CalendarObjectId", -1);
    const unitOfMeasure = getElementText2(resEl, "UnitOfMeasureAbbreviation");
    const parentObjId = getElementInt2(resEl, "ParentObjectId", -1);
    const resource = {
      id,
      name,
      type: resourceTypeFromP6(p6Type),
      description: "",
      // MaxUnitsPerTime is in P6-XML een dimensieloze fractie (1.0 = 100%), geen uren/dag
      // (L2-fix — spiegel van p6xmlWriter, MPXJ-bron aldaar), dus 1:1 overnemen.
      maxUnits: maxUnitsPerTime > 0 ? maxUnitsPerTime : 1
    };
    if (unitOfMeasure) resource.unitOfMeasure = unitOfMeasure;
    if (calObjId >= 0 && calObjIdToId.has(calObjId)) resource.calendarId = calObjIdToId.get(calObjId);
    resources.push(resource);
    if (parentObjId >= 0) pendingParents.push({ resId: id, parentObjId });
  }
  for (const { resId, parentObjId } of pendingParents) {
    const parentId = resObjIdToId.get(parentObjId);
    if (!parentId) continue;
    const resource = resources.find((r) => r.id === resId);
    if (resource) resource.parentId = parentId;
  }
  const rateElements = getAllByLocalName(doc, "ResourceRate");
  const earliestRate = /* @__PURE__ */ new Map();
  for (const rateEl of rateElements) {
    const rateResObjId = getElementInt2(rateEl, "ResourceObjectId", -1);
    const resId = resObjIdToId.get(rateResObjId);
    if (!resId) continue;
    const priceText = getElementText2(rateEl, "PricePerUnit");
    const price = parseFloat(priceText);
    if (!priceText || !Number.isFinite(price)) continue;
    const effective = getElementText2(rateEl, "EffectiveDate");
    const current2 = earliestRate.get(resId);
    if (!current2 || effective < current2.effective) {
      earliestRate.set(resId, { effective, price });
    }
  }
  for (const [resId, rate] of earliestRate) {
    const resource = resources.find((r) => r.id === resId);
    if (resource) resource.costPerHour = rate.price;
  }
  const project = parseProject2(doc);
  const wbsElements = getAllByLocalName(doc, "WBS");
  const wbsObjIdToId = /* @__PURE__ */ new Map();
  const wbsTasks = [];
  for (const wbsEl of wbsElements) {
    const objId = getElementInt2(wbsEl, "ObjectId", -1);
    if (objId < 0) continue;
    const id = generateId("task");
    wbsObjIdToId.set(objId, id);
    const code = getElementText2(wbsEl, "Code");
    const name = getElementText2(wbsEl, "Name") || "WBS";
    wbsTasks.push({
      id,
      name,
      description: "",
      wbsCode: code,
      taskType: "CONSTRUCTION",
      status: "NOT_STARTED",
      isMilestone: false,
      priority: 500,
      parentId: null,
      // resolved later
      childIds: [],
      time: createDefaultTaskTime(project.startDate, 0),
      resourceIds: []
    });
  }
  for (const wbsEl of wbsElements) {
    const objId = getElementInt2(wbsEl, "ObjectId", -1);
    const parentObjId = getElementInt2(wbsEl, "ParentObjectId", -1);
    if (parentObjId < 0 || objId < 0) continue;
    const childId = wbsObjIdToId.get(objId);
    const parentId = wbsObjIdToId.get(parentObjId);
    if (childId && parentId) {
      const child = wbsTasks.find((t) => t.id === childId);
      const parent = wbsTasks.find((t) => t.id === parentId);
      if (child && parent) {
        child.parentId = parentId;
        if (!parent.childIds.includes(childId)) {
          parent.childIds.push(childId);
        }
      }
    }
  }
  const activityElements = getAllByLocalName(doc, "Activity");
  const actObjIdToId = /* @__PURE__ */ new Map();
  const leafTasks = [];
  const taskHourById = /* @__PURE__ */ new Map();
  const calById = /* @__PURE__ */ new Map();
  calById.set(calendar.id, calendar);
  for (const c of resourceCalendars) calById.set(c.id, c);
  const effCalIdOf = (calObjId) => calObjId > 1 && calObjIdToId.get(calObjId) || calendar.id;
  const cSignalCalIds = /* @__PURE__ */ new Set();
  for (const actEl of activityElements) {
    const calId = effCalIdOf(getElementInt2(actEl, "CalendarObjectId", 1));
    const cal = calById.get(calId);
    if (!cal) continue;
    const durHours = getElementFloat2(actEl, "PlannedDuration");
    const durSignal = durHours > 0 && isSubDayMinutes(Math.round(durHours * 60), cal.hoursPerDay);
    const dateSignal = hasNonAnchorTime(getElementText2(actEl, "PlannedStartDate"), P6_TIME_ANCHOR) || hasNonAnchorTime(getElementText2(actEl, "PlannedFinishDate"), P6_TIME_ANCHOR);
    if (durSignal || dateSignal) cSignalCalIds.add(calId);
  }
  const hourModeCalIds = /* @__PURE__ */ new Set();
  for (const [id, cal] of calById) {
    if (promoteHourCalendar(cal, getCalendarBands(cal), cSignalCalIds.has(id), false)) {
      hourModeCalIds.add(id);
    }
  }
  for (const actEl of activityElements) {
    const objId = getElementInt2(actEl, "ObjectId", -1);
    if (objId < 0) continue;
    const id = generateId("task");
    actObjIdToId.set(objId, id);
    const actId = getElementText2(actEl, "Id");
    const name = getElementText2(actEl, "Name") || "Activity";
    const p6Type = getElementText2(actEl, "Type");
    const p6Status = getElementText2(actEl, "Status");
    const plannedDuration = getElementFloat2(actEl, "PlannedDuration");
    const plannedStartRaw = getElementText2(actEl, "PlannedStartDate");
    const plannedFinishRaw = getElementText2(actEl, "PlannedFinishDate");
    const percentComplete = getElementFloat2(actEl, "PhysicalPercentComplete");
    const description = getElementText2(actEl, "Description");
    const wbsObjId = getElementInt2(actEl, "WBSObjectId", -1);
    const calObjId = getElementInt2(actEl, "CalendarObjectId", 1);
    const taskCalendarId = calObjId > 1 ? calObjIdToId.get(calObjId) : void 0;
    const effCalId = effCalIdOf(calObjId);
    const isHour = hourModeCalIds.has(effCalId);
    const effHpd = calById.get(effCalId)?.hoursPerDay ?? hoursPerDay;
    const parseP6Instant = (raw) => raw ? formatInstant(parseInstant(raw), "hour") : parseP6Date(raw);
    const plannedStart = isHour ? parseP6Instant(plannedStartRaw) : parseP6Date(plannedStartRaw);
    const plannedFinish = isHour ? parseP6Instant(plannedFinishRaw) : parseP6Date(plannedFinishRaw);
    const actualStartRaw = getElementText2(actEl, "ActualStartDate");
    const actualFinishRaw = getElementText2(actEl, "ActualFinishDate");
    const remainingRaw = getElementText2(actEl, "RemainingDuration");
    const actualStart = actualStartRaw ? isHour ? parseP6Instant(actualStartRaw) : parseP6Date(actualStartRaw) : void 0;
    const actualFinish = actualFinishRaw ? isHour ? parseP6Instant(actualFinishRaw) : parseP6Date(actualFinishRaw) : void 0;
    const remainingMinutes = isHour && remainingRaw ? Math.round(parseFloat(remainingRaw) * 60) : void 0;
    const remainingTime = !isHour && remainingRaw ? p6HoursToDays(parseFloat(remainingRaw), hoursPerDay) : void 0;
    const durationMinutes = isHour ? Math.round(plannedDuration * 60) : void 0;
    const durationDays = isHour ? effHpd > 0 ? durationMinutes / (effHpd * 60) : 0 : p6HoursToDays(plannedDuration, hoursPerDay);
    const isMilestone = p6Type.includes("Milestone");
    const milestoneKind = !isMilestone ? void 0 : p6Type.includes("Finish") ? "FINISH" : "START";
    let status = "NOT_STARTED";
    if (p6Status === "Completed" || percentComplete >= 100) status = "COMPLETED";
    else if (p6Status === "In Progress" || percentComplete > 0) status = "STARTED";
    const parentId = wbsObjId >= 0 ? wbsObjIdToId.get(wbsObjId) || null : null;
    const parseCstrDate = (raw) => isHour ? parseP6Instant(raw) : parseP6Date(raw);
    let constraint;
    const primCode = getElementText2(actEl, "PrimaryConstraintType");
    if (primCode) {
      const mapped = p6CodeToConstraint(primCode);
      if (mapped) {
        const cdateRaw = getElementText2(actEl, "PrimaryConstraintDate");
        constraint = {
          type: mapped.type,
          ...mapped.hard ? { hard: true } : {},
          ...cdateRaw ? { date: parseCstrDate(cdateRaw) } : {}
        };
      }
    }
    let constraint2;
    const secCode = getElementText2(actEl, "SecondaryConstraintType");
    if (secCode) {
      const mapped2 = p6CodeToConstraint(secCode);
      if (mapped2) {
        const cdate2Raw = getElementText2(actEl, "SecondaryConstraintDate");
        constraint2 = {
          type: mapped2.type,
          ...cdate2Raw ? { date: parseCstrDate(cdate2Raw) } : {}
        };
      }
    }
    const task = {
      id,
      name,
      description,
      wbsCode: actId,
      taskType: "CONSTRUCTION",
      status,
      isMilestone,
      ...milestoneKind ? { milestoneKind } : {},
      priority: 500,
      parentId,
      childIds: [],
      ...constraint ? { constraint } : {},
      ...constraint2 ? { constraint2 } : {},
      time: {
        durationType: "WORKTIME",
        scheduleDuration: durationDays,
        ...durationMinutes != null ? { durationMinutes } : {},
        scheduleStart: plannedStart,
        scheduleFinish: plannedFinish,
        earlyStart: plannedStart,
        earlyFinish: plannedFinish,
        lateStart: plannedStart,
        lateFinish: plannedFinish,
        freeFloat: 0,
        totalFloat: 0,
        isCritical: false,
        actualStart,
        actualFinish,
        remainingTime,
        ...remainingMinutes != null ? { remainingMinutes } : {},
        completion: percentComplete / 100
      },
      resourceIds: [],
      ...taskCalendarId ? { calendarId: taskCalendarId } : {}
    };
    leafTasks.push(task);
    taskHourById.set(id, isHour);
    if (parentId) {
      const parent = wbsTasks.find((t) => t.id === parentId);
      if (parent && !parent.childIds.includes(id)) {
        parent.childIds.push(id);
      }
    }
  }
  const tasks = [...wbsTasks, ...leafTasks];
  normalizeImportedProgress(tasks, project.statusDate);
  const relElements = getAllByLocalName(doc, "Relationship");
  const sequences = [];
  for (const relEl of relElements) {
    const predObjId = getElementInt2(relEl, "PredecessorActivityObjectId", -1);
    const succObjId = getElementInt2(relEl, "SuccessorActivityObjectId", -1);
    if (predObjId < 0 || succObjId < 0) continue;
    const predId = actObjIdToId.get(predObjId);
    const succId = actObjIdToId.get(succObjId);
    if (!predId || !succId) continue;
    const p6Type = getElementText2(relEl, "Type");
    const lagHours = getElementFloat2(relEl, "Lag");
    const lagHourMode = taskHourById.get(succId) ?? false;
    const seq = {
      id: generateId("seq"),
      predecessorId: predId,
      successorId: succId,
      type: p6TypeToSequenceType(p6Type),
      lagDays: lagHourMode ? 0 : p6HoursToDays(lagHours, hoursPerDay)
    };
    if (lagHourMode) seq.lagMinutes = Math.round(lagHours * 60);
    sequences.push(seq);
  }
  const asgnElements = getAllByLocalName(doc, "ResourceAssignment");
  const assignments = [];
  for (const asgnEl of asgnElements) {
    const actObjId = getElementInt2(asgnEl, "ActivityObjectId", -1);
    const resObjId = getElementInt2(asgnEl, "ResourceObjectId", -1);
    if (actObjId < 0 || resObjId < 0) continue;
    const taskId = actObjIdToId.get(actObjId);
    const resourceId = resObjIdToId.get(resObjId);
    if (!taskId || !resourceId) continue;
    const plannedUnitsPerTime = getElementFloat2(asgnEl, "PlannedUnitsPerTime");
    const curveName = getElementText2(asgnEl, "PlannedCurve");
    const curve = P6_NAME_TO_CURVE[curveName];
    assignments.push({
      id: generateId("asgn"),
      taskId,
      resourceId,
      // PlannedUnitsPerTime is een fractie (1.0 = 100%), geen uren/dag (L2-fix,
      // spiegel van p6xmlWriter) — 1:1 overnemen.
      unitsPerDay: plannedUnitsPerTime > 0 ? plannedUnitsPerTime : 1,
      ...curve && curve !== "UNIFORM" ? { curve } : {}
    });
  }
  return {
    project,
    calendar,
    tasks,
    sequences,
    resources,
    assignments,
    resourceCalendars
  };
}
function parseProject2(doc) {
  const projElements = getAllByLocalName(doc, "Project");
  const projEl = projElements[0];
  if (!projEl) {
    return {
      id: generateId("proj"),
      name: "P6 Import",
      description: "",
      startDate: formatDate(/* @__PURE__ */ new Date()),
      endDate: "",
      calendarId: "cal-default",
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      modifiedAt: (/* @__PURE__ */ new Date()).toISOString(),
      author: "",
      company: ""
    };
  }
  const project = {
    id: generateId("proj"),
    name: getElementText2(projEl, "Name") || "P6 Import",
    description: getElementText2(projEl, "Description"),
    startDate: parseP6Date(getElementText2(projEl, "PlannedStartDate")),
    endDate: parseP6Date(getElementText2(projEl, "MustFinishByDate")),
    calendarId: "cal-default",
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    modifiedAt: (/* @__PURE__ */ new Date()).toISOString(),
    author: "",
    company: ""
  };
  const dataDateRaw = getElementText2(projEl, "DataDate");
  if (dataDateRaw) project.statusDate = parseP6Date(dataDateRaw);
  return project;
}
function parseCalendar2(doc) {
  const calElements = getAllByLocalName(doc, "Calendar");
  if (calElements.length === 0) return createDefaultCalendar();
  const calEl = calElements[0];
  const calendar = createDefaultCalendar();
  calendar.name = getElementText2(calEl, "Name") || calendar.name;
  delete calendar.generation;
  const hpd = getElementFloat2(calEl, "HoursPerDay");
  if (hpd > 0) calendar.hoursPerDay = hpd;
  const ww = parseP6StandardWorkWeek(calEl);
  if (ww.workDays.length > 0) calendar.workDays = ww.workDays.sort((a, b) => a - b);
  if (ww.workStartHour !== void 0) calendar.workStartHour = ww.workStartHour;
  if (ww.workEndHour !== void 0) calendar.workEndHour = ww.workEndHour;
  registerP6Bands(calendar, ww.rawByWeekday);
  const holidays = parseP6HolidayOrExceptions(calEl);
  if (holidays.length > 0) calendar.holidays = holidays;
  return calendar;
}

// src/utils/platform.ts
var isTauri = () => "__TAURI_INTERNALS__" in window;

// src/utils/filePath.ts
function ensureExtension(path, ext) {
  const suffix = `.${ext.toLowerCase()}`;
  return path.toLowerCase().endsWith(suffix) ? path : `${path}.${ext}`;
}

// src/services/fileAccess/tauriBackend.ts
var basename2 = (p) => p.split(/[\\/]/).pop() || p;
async function openFileDialogTauri(filters) {
  const { open: open3 } = await Promise.resolve().then(() => (init_dist_js(), dist_js_exports));
  const { readTextFile: readTextFile2 } = await Promise.resolve().then(() => (init_dist_js2(), dist_js_exports2));
  const selected = await open3({ multiple: false, filters });
  if (!selected) return null;
  const path = selected;
  const content = await readTextFile2(path);
  return { name: basename2(path), content, ref: { kind: "path", path } };
}
async function saveFileDialogTauri(defaultName, content, filters) {
  const { save: save2 } = await Promise.resolve().then(() => (init_dist_js(), dist_js_exports));
  const { writeTextFile: writeTextFile2 } = await Promise.resolve().then(() => (init_dist_js2(), dist_js_exports2));
  const picked = await save2({ defaultPath: defaultName, filters });
  if (!picked) return null;
  const ext = filters[0]?.extensions[0] ?? "";
  const savedPath = ext ? ensureExtension(picked, ext) : picked;
  await writeTextFile2(savedPath, content);
  return { ref: { kind: "path", path: savedPath }, name: basename2(savedPath) };
}
async function saveToRefTauri(ref2, content) {
  if (ref2.kind !== "path") return false;
  const { writeTextFile: writeTextFile2 } = await Promise.resolve().then(() => (init_dist_js2(), dist_js_exports2));
  await writeTextFile2(ref2.path, content);
  return true;
}
async function readFromRefTauri(ref2) {
  if (ref2.kind !== "path") return null;
  try {
    const { readTextFile: readTextFile2 } = await Promise.resolve().then(() => (init_dist_js2(), dist_js_exports2));
    return await readTextFile2(ref2.path);
  } catch {
    return null;
  }
}

// src/services/fileAccess/webBackend.ts
var hasFSA = () => typeof window !== "undefined" && "showOpenFilePicker" in window;
function toAcceptTypes(filters) {
  return filters.map((f) => ({
    description: f.name,
    accept: { "application/octet-stream": f.extensions.map((e) => `.${e}`) }
  }));
}
function isAbort(err) {
  return err instanceof DOMException && err.name === "AbortError";
}
function openViaInput(filters) {
  return new Promise((resolve2) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = filters.flatMap((f) => f.extensions.map((e) => `.${e}`)).join(",");
    input.addEventListener("cancel", () => resolve2(null));
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) {
        resolve2(null);
        return;
      }
      const content = await file.text();
      resolve2({ name: file.name, content, ref: null });
    };
    input.click();
  });
}
function downloadBlob(name, content) {
  const blob = new Blob([content], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}
async function openFileDialogWeb(filters) {
  if (hasFSA()) {
    try {
      const [handle] = await window.showOpenFilePicker({ multiple: false, types: toAcceptTypes(filters) });
      const file = await handle.getFile();
      const content = await file.text();
      return { name: file.name, content, ref: { kind: "handle", handle } };
    } catch (err) {
      if (isAbort(err)) return null;
      throw err;
    }
  }
  return openViaInput(filters);
}
async function saveFileDialogWeb(defaultName, content, filters) {
  if (hasFSA()) {
    try {
      const handle = await window.showSaveFilePicker({ suggestedName: defaultName, types: toAcceptTypes(filters) });
      const writable = await handle.createWritable();
      await writable.write(content);
      await writable.close();
      const file = await handle.getFile();
      return { ref: { kind: "handle", handle }, name: file.name };
    } catch (err) {
      if (isAbort(err)) return null;
      throw err;
    }
  }
  downloadBlob(defaultName, content);
  return { ref: null, name: defaultName };
}
async function saveToRefWeb(ref2, content) {
  if (ref2.kind !== "handle") return false;
  const { handle } = ref2;
  const opts = { mode: "readwrite" };
  try {
    if (await handle.queryPermission?.(opts) !== "granted") {
      if (await handle.requestPermission?.(opts) !== "granted") return false;
    }
    const writable = await handle.createWritable();
    await writable.write(content);
    await writable.close();
    return true;
  } catch {
    return false;
  }
}
async function readFromRefWeb(ref2) {
  if (ref2.kind !== "handle") return null;
  const { handle } = ref2;
  const opts = { mode: "read" };
  try {
    if (await handle.queryPermission?.(opts) !== "granted") {
      if (await handle.requestPermission?.(opts) !== "granted") return null;
    }
    const file = await handle.getFile();
    return await file.text();
  } catch {
    return null;
  }
}

// src/services/fileAccess/index.ts
function openFileDialog(filters) {
  return isTauri() ? openFileDialogTauri(filters) : openFileDialogWeb(filters);
}
function saveFileDialog(defaultName, content, filters) {
  return isTauri() ? saveFileDialogTauri(defaultName, content, filters) : saveFileDialogWeb(defaultName, content, filters);
}
function saveToRef(ref2, content) {
  return isTauri() ? saveToRefTauri(ref2, content) : saveToRefWeb(ref2, content);
}
function readFromRef(ref2) {
  return isTauri() ? readFromRefTauri(ref2) : readFromRefWeb(ref2);
}

// src/utils/idb.ts
var dbPromises = /* @__PURE__ */ new Map();
function openDb(dbName, storeName) {
  const cacheKey = `${dbName}::${storeName}`;
  const existing = dbPromises.get(cacheKey);
  if (existing) return existing;
  const p = new Promise((resolve2, reject) => {
    const req = indexedDB.open(dbName, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id" });
      }
    };
    req.onsuccess = () => {
      const db = req.result;
      db.onversionchange = () => {
        db.close();
        dbPromises.delete(cacheKey);
      };
      resolve2(db);
    };
    req.onerror = () => {
      dbPromises.delete(cacheKey);
      reject(req.error);
    };
  });
  dbPromises.set(cacheKey, p);
  return p;
}
async function idbGetAll(dbName, storeName) {
  try {
    const db = await openDb(dbName, storeName);
    return await new Promise((resolve2, reject) => {
      const tx = db.transaction(storeName, "readonly");
      const req = tx.objectStore(storeName).getAll();
      req.onsuccess = () => resolve2(req.result);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return [];
  }
}
async function idbPut(dbName, storeName, value) {
  try {
    const db = await openDb(dbName, storeName);
    await new Promise((resolve2, reject) => {
      const tx = db.transaction(storeName, "readwrite");
      tx.objectStore(storeName).put(value);
      tx.oncomplete = () => resolve2();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
  }
}
async function idbDelete(dbName, storeName, id) {
  try {
    const db = await openDb(dbName, storeName);
    await new Promise((resolve2, reject) => {
      const tx = db.transaction(storeName, "readwrite");
      tx.objectStore(storeName).delete(id);
      tx.oncomplete = () => resolve2();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
  }
}

// src/services/fileAccess/recentFiles.ts
var DB = "ops-recent-files";
var STORE = "recents";
var MAX = 10;
var LEGACY_KEY = "open-planner-studio-recent-files";
var basename3 = (p) => p.split(/[\\/]/).pop() || p;
async function sameRef(a, b) {
  if (a.kind === "path" && b.kind === "path") return a.path === b.path;
  if (a.kind === "handle" && b.kind === "handle") {
    try {
      return await a.handle.isSameEntry(b.handle);
    } catch {
      return false;
    }
  }
  return false;
}
async function migrateLegacy(existing) {
  if (existing.length > 0) return existing;
  let paths = [];
  try {
    const raw = localStorage.getItem(LEGACY_KEY);
    paths = raw ? JSON.parse(raw) : [];
  } catch {
    paths = [];
  }
  if (!Array.isArray(paths) || paths.length === 0) return existing;
  const now = Date.now();
  const migrated = paths.slice(0, MAX).map((p, i) => ({
    id: generateId("recent"),
    name: basename3(p),
    ref: { kind: "path", path: p },
    addedAt: now - i
    // bewaar MRU-volgorde
  }));
  for (const e of migrated) await idbPut(DB, STORE, e);
  try {
    localStorage.removeItem(LEGACY_KEY);
  } catch {
  }
  return migrated;
}
async function loadRecents() {
  const all = await idbGetAll(DB, STORE);
  const migrated = await migrateLegacy(all);
  return [...migrated].sort((a, b) => b.addedAt - a.addedAt).slice(0, MAX);
}
async function addRecent(ref2, name) {
  const existing = await loadRecents();
  const kept = [];
  for (const e of existing) {
    if (!await sameRef(e.ref, ref2)) kept.push(e);
  }
  const entry = { id: generateId("recent"), name, ref: ref2, addedAt: Date.now() };
  const next = [entry, ...kept].slice(0, MAX);
  await idbPut(DB, STORE, entry);
  const nextIds = new Set(next.map((e) => e.id));
  for (const e of existing) {
    if (!nextIds.has(e.id)) await idbDelete(DB, STORE, e.id);
  }
  return next;
}
async function removeRecent(id) {
  await idbDelete(DB, STORE, id);
  return loadRecents();
}

// src/state/ifcSaveInput.ts
function buildWriteIFCInput(src) {
  return {
    project: src.project,
    calendar: src.calendar,
    tasks: src.tasks,
    sequences: src.sequences,
    resources: src.resources,
    assignments: src.assignments,
    activityCodeTypes: src.activityCodeTypes,
    customFieldDefs: src.customFieldDefs,
    resourceCalendars: src.calendars,
    baselines: src.baselines,
    activeBaselineId: src.activeBaselineId
  };
}
var IFC_SAVE_KEYS = [
  "project",
  "calendar",
  "tasks",
  "sequences",
  "resources",
  "assignments",
  "activityCodeTypes",
  "customFieldDefs",
  "calendars",
  "baselines",
  "activeBaselineId"
];
function sameIFCSource(a, b) {
  return IFC_SAVE_KEYS.every((k) => a[k] === b[k]);
}

// src/engine/externalLinks.ts
function externalSourceSide(direction, relType) {
  const letter = direction === "predecessor" ? relType[0] : relType[1];
  return letter === "F" ? "finish" : "start";
}
function sourceAnchorDate(link, srcTask) {
  const side = externalSourceSide(link.direction, link.relType);
  return side === "finish" ? srcTask.time.earlyFinish || srcTask.time.scheduleFinish : srcTask.time.earlyStart || srcTask.time.scheduleStart;
}
function linkMatchesSource(link, source) {
  if (link.sourceRef.projectId && link.sourceRef.projectId === source.projectId) return true;
  return !!link.sourceRef.filePath && !!source.filePath && link.sourceRef.filePath === source.filePath;
}
function refreshExternalAnchors(tasks, source) {
  const srcById = new Map(source.tasks.map((t) => [t.id, t]));
  let refreshed = 0;
  let missing = 0;
  let anyChanged = false;
  const outTasks = tasks.map((task) => {
    if (!task.externalLinks || task.externalLinks.length === 0) return task;
    let taskChanged = false;
    const links = task.externalLinks.map((link) => {
      if (!linkMatchesSource(link, source)) return link;
      const srcTask = srcById.get(link.sourceRef.taskId);
      if (!srcTask) {
        missing++;
        if (link.sourceMissing === true) return link;
        taskChanged = true;
        return { ...link, sourceMissing: true };
      }
      const anchorDate = sourceAnchorDate(link, srcTask);
      refreshed++;
      const nextRef = {
        ...link.sourceRef,
        projectId: source.projectId,
        projectName: source.projectName ?? link.sourceRef.projectName,
        taskName: srcTask.name,
        filePath: source.filePath ?? link.sourceRef.filePath
      };
      if (link.anchorDate === anchorDate && link.sourceMissing === false && link.sourceRef.projectId === nextRef.projectId && link.sourceRef.projectName === nextRef.projectName && link.sourceRef.taskName === nextRef.taskName && link.sourceRef.filePath === nextRef.filePath) {
        return link;
      }
      taskChanged = true;
      return { ...link, anchorDate: anchorDate || link.anchorDate, sourceMissing: false, sourceRef: nextRef };
    });
    if (!taskChanged) return task;
    anyChanged = true;
    return { ...task, externalLinks: links };
  });
  return { tasks: anyChanged ? outTasks : tasks, refreshed, missing, changed: anyChanged };
}

// src/state/slices/fileSlice.ts
function isActivePristine(s) {
  return s.tasks.length === 0 && s.sequences.length === 0 && s.resources.length === 0 && s.filePath === null && !s.isDirty;
}
function parseProjectXml(content) {
  const isP6 = content.includes("APIBusinessObjects") || content.includes("Primavera");
  const isMsProject = content.includes("schemas.microsoft.com/project") || content.includes("<Project");
  if (isP6) return readP6XML(content);
  if (isMsProject) return readMSPDI(content);
  throw new Error("Onbekend XML-formaat: geen MS Project- of Primavera-markers gevonden");
}
var createFileSlice = (set2, get2) => {
  const pushRecent = async (ref2, name) => {
    if (!ref2) return;
    const list = await addRecent(ref2, name);
    set2((s) => {
      s.recentFiles = list;
    });
  };
  return {
    applyLoadedProject: (parsed, opts) => {
      set2((s) => {
        const filePath = opts.filePath !== void 0 ? opts.filePath : s.filePath;
        const payload = payloadFromImport(parsed, filePath);
        payload.view = s.view;
        payload.collapsedTaskIds = s.ui.collapsedTaskIds;
        payload.fileHandle = opts.fileHandle !== void 0 ? opts.fileHandle : s.fileHandle;
        hydratePayload(s, payload);
        if (!opts.linkedOpen) {
          s.project = { ...s.project, companyId: void 0, companyName: void 0 };
          s.resources = s.resources.map((r) => {
            const { libraryOrigin: _d, ...rest } = r;
            return rest;
          });
          s.calendars = s.calendars.map((c) => {
            const { libraryOrigin: _d, ...rest } = c;
            return rest;
          });
          s.calendar = s.calendars.find((c) => c.id === s.project.calendarId) ?? s.calendar;
        }
        if (opts.hourDataNotice) {
          s.ui.hourDataNotice = !s.ui.enableHourPlanning && fileHasHourData(s.tasks, [s.calendar, ...s.calendars]);
        }
      });
      if (opts.recompute) get2().runCPM();
      if (opts.fit) get2().requestFitToProject();
      emitExtensionEvent(HOST_EVENTS.projectLoaded, {
        tasks: parsed.tasks.length,
        sequences: parsed.sequences.length,
        resources: parsed.resources.length
      });
    },
    openFile: async (labels) => {
      try {
        const opened = await openFileDialog([
          { name: "All Supported", extensions: ["ifc", "csv", "xml"] },
          { name: "IFC Files", extensions: ["ifc"] },
          { name: "CSV Files", extensions: ["csv"] },
          { name: "XML Files", extensions: ["xml"] }
        ]);
        if (!opened) return;
        const ext = opened.name.split(".").pop()?.toLowerCase() || "";
        let parsed;
        if (ext === "csv") {
          parsed = readCSV(opened.content);
        } else if (ext === "xml") {
          parsed = parseProjectXml(opened.content);
        } else {
          parsed = readIFC(opened.content, labels);
        }
        if (!isActivePristine(get2())) get2().newDocument();
        get2().applyLoadedProject(parsed, {
          // Identiteit: echt pad (Tauri) of bestandsnaam (web); handle alleen als web-opslaan-doel.
          filePath: opened.ref?.kind === "path" ? opened.ref.path : opened.name,
          fileHandle: opened.ref?.kind === "handle" ? opened.ref.handle : null,
          recompute: true,
          fit: true,
          hourDataNotice: true,
          linkedOpen: true
        });
        get2().runOpenBoundary();
        await pushRecent(opened.ref, opened.name);
      } catch (err) {
        console.error("Failed to open file:", err);
        get2().notify({ severity: "error", messageKey: "notifications.openFailed", detail: err.message });
      }
    },
    saveFile: async () => {
      const state = get2();
      const content = writeIFC(buildWriteIFCInput(state));
      try {
        const ref2 = state.fileHandle ? { kind: "handle", handle: state.fileHandle } : isTauri() && state.filePath ? { kind: "path", path: state.filePath } : null;
        if (ref2 && await saveToRef(ref2, content)) {
          if (sameIFCSource(state, get2())) set2((s) => {
            s.isDirty = false;
          });
          return;
        }
        const outcome = await saveFileDialog(
          `${projectFileBase(state.project.name)}.ifc`,
          content,
          [{ name: "IFC Files", extensions: ["ifc"] }]
        );
        if (!outcome) return;
        const unchanged = sameIFCSource(state, get2());
        set2((s) => {
          s.filePath = outcome.ref?.kind === "path" ? outcome.ref.path : outcome.name;
          s.fileHandle = outcome.ref?.kind === "handle" ? outcome.ref.handle : null;
          if (unchanged) s.isDirty = false;
        });
        await pushRecent(outcome.ref, outcome.name);
      } catch (err) {
        console.error("Save failed:", err);
        get2().notify({ severity: "error", messageKey: "notifications.saveFailed", detail: err.message });
      }
    },
    saveFileAs: async () => {
      const state = get2();
      const content = writeIFC(buildWriteIFCInput(state));
      try {
        const outcome = await saveFileDialog(
          state.filePath ?? `${projectFileBase(state.project.name)}.ifc`,
          content,
          [{ name: "IFC Files", extensions: ["ifc"] }]
        );
        if (!outcome) return;
        const unchanged = sameIFCSource(state, get2());
        set2((s) => {
          s.filePath = outcome.ref?.kind === "path" ? outcome.ref.path : outcome.name;
          s.fileHandle = outcome.ref?.kind === "handle" ? outcome.ref.handle : null;
          if (unchanged) s.isDirty = false;
        });
        await pushRecent(outcome.ref, outcome.name);
      } catch (err) {
        console.error("Save As failed:", err);
        get2().notify({ severity: "error", messageKey: "notifications.saveFailed", detail: err.message });
      }
    },
    exportAs: async (format) => {
      if (get2().scheduleStale) get2().runCPM();
      const cpmError = get2().cpmResult?.error;
      if (cpmError) return { ok: false, error: cpmError };
      const state = get2();
      let content;
      let ext;
      let filters;
      switch (format) {
        case "csv":
          content = writeCSV(
            state.project,
            state.calendar,
            state.tasks,
            state.sequences,
            state.resources,
            state.assignments
          );
          ext = "csv";
          filters = [{ name: "CSV Files", extensions: ["csv"] }];
          break;
        case "mspdi":
          content = writeMSPDI(
            state.project,
            state.calendar,
            state.tasks,
            state.sequences,
            state.resources,
            state.assignments,
            state.calendars
          );
          ext = "xml";
          filters = [{ name: "XML Files", extensions: ["xml"] }];
          break;
        case "p6":
          content = writeP6XML(
            state.project,
            state.calendar,
            state.tasks,
            state.sequences,
            state.resources,
            state.assignments,
            state.calendars
          );
          ext = "xml";
          filters = [{ name: "XML Files", extensions: ["xml"] }];
          break;
        case "ifc":
        default:
          content = writeIFC(buildWriteIFCInput(state));
          ext = "ifc";
          filters = [{ name: "IFC Files", extensions: ["ifc"] }];
          break;
      }
      const outcome = await saveFileDialog(`${projectFileBase(state.project.name)}.${ext}`, content, filters);
      if (outcome) await pushRecent(outcome.ref, outcome.name);
      return { ok: true };
    },
    exportProjectWithPool: async () => {
      if (get2().scheduleStale) get2().runCPM();
      const cpmError = get2().cpmResult?.error;
      if (cpmError) return { ok: false, error: cpmError };
      const state = get2();
      const projectContent = writeIFC(buildWriteIFCInput(state));
      const base = projectFileBase(state.project.name);
      const outcome = await saveFileDialog(`${base}.ifc`, projectContent, [{ name: "IFC Files", extensions: ["ifc"] }]);
      if (!outcome) return { ok: true };
      await pushRecent(outcome.ref, outcome.name);
      const companyId = state.project.companyId;
      if (!companyId) return { ok: true };
      const poolContent = state.exportPoolIFC(companyId);
      if (!poolContent) return { ok: true };
      await saveFileDialog(`${base}-bibliotheek.ifc`, poolContent, [{ name: "IFC Files", extensions: ["ifc"] }]);
      return { ok: true };
    },
    recentFiles: [],
    hydrateRecentFiles: async () => {
      const list = await loadRecents();
      set2((s) => {
        s.recentFiles = list;
      });
    },
    parseExternalSource: async (filePath, labels) => {
      if (!isTauri()) return null;
      try {
        const { readTextFile: readTextFile2 } = await Promise.resolve().then(() => (init_dist_js2(), dist_js_exports2));
        const content = await readTextFile2(filePath);
        const ext = filePath.split(".").pop()?.toLowerCase() || "";
        const parsed = ext === "csv" ? readCSV(content) : ext === "xml" ? parseProjectXml(content) : readIFC(content, labels);
        return {
          projectId: parsed.project.id,
          projectName: parsed.project.name,
          filePath,
          tasks: parsed.tasks
        };
      } catch (err) {
        console.error("parseExternalSource: kon bronbestand niet lezen:", err);
        return null;
      }
    },
    refreshExternalAnchorsFrom: async (filePath, labels) => {
      const src = await get2().parseExternalSource(filePath, labels);
      if (!src) return null;
      const source = {
        projectId: src.projectId,
        filePath: src.filePath,
        projectName: src.projectName,
        tasks: src.tasks
      };
      const result = refreshExternalAnchors(get2().tasks, source);
      if (result.changed) {
        set2((s) => {
          s.tasks = result.tasks;
          finishMutation(s, { stale: true });
        });
        get2().recomputeViewRows();
        get2().runCPM();
      }
      return { refreshed: result.refreshed, missing: result.missing };
    },
    refreshAllExternalAnchors: async (labels) => {
      const paths = /* @__PURE__ */ new Set();
      for (const task of get2().tasks) {
        for (const link of task.externalLinks ?? []) {
          if (link.sourceRef.filePath) paths.add(link.sourceRef.filePath);
        }
      }
      let refreshed = 0;
      let missing = 0;
      let sources = 0;
      for (const p of paths) {
        const r = await get2().refreshExternalAnchorsFrom(p, labels);
        if (r) {
          refreshed += r.refreshed;
          missing += r.missing;
          sources++;
        }
      }
      return { refreshed, missing, sources };
    },
    openRecentFile: async (id, labels) => {
      const entry = get2().recentFiles.find((e) => e.id === id);
      if (!entry) return;
      const content = await readFromRef(entry.ref);
      if (content === null) {
        const list = await removeRecent(entry.id);
        set2((s) => {
          s.recentFiles = list;
        });
        return;
      }
      try {
        const ext = entry.name.split(".").pop()?.toLowerCase() || "";
        let parsed;
        if (ext === "csv") {
          parsed = readCSV(content);
        } else if (ext === "xml") {
          parsed = parseProjectXml(content);
        } else {
          parsed = readIFC(content, labels);
        }
        if (!isActivePristine(get2())) get2().newDocument();
        get2().applyLoadedProject(parsed, {
          filePath: entry.ref.kind === "path" ? entry.ref.path : entry.name,
          fileHandle: entry.ref.kind === "handle" ? entry.ref.handle : null,
          recompute: true,
          fit: true,
          hourDataNotice: true,
          linkedOpen: true
        });
        get2().runOpenBoundary();
        await pushRecent(entry.ref, entry.name);
      } catch (err) {
        console.error("Failed to open recent file:", err);
        get2().notify({ severity: "error", messageKey: "notifications.openFailed", detail: err.message });
      }
    },
    openExampleFromString: (content, name, labels) => {
      try {
        const parsed = readIFC(content, labels);
        if (!isActivePristine(get2())) get2().newDocument();
        get2().applyLoadedProject(parsed, {
          filePath: null,
          fileHandle: null,
          recompute: true,
          fit: true,
          hourDataNotice: true
        });
      } catch (err) {
        console.error(`Failed to open example "${name}":`, err);
        get2().notify({ severity: "error", messageKey: "notifications.openFailed", detail: err.message });
      }
    }
  };
};

// src/state/slices/extensionSlice.ts
var createExtensionSlice = (set2) => ({
  installedExtensions: {},
  extensionRibbonButtons: [],
  extensionImporters: [],
  catalogEntries: [],
  catalogLoading: false,
  catalogError: null,
  catalogLastFetched: null,
  registerExtension: (ext) => set2((s) => {
    s.installedExtensions[ext.id] = ext;
  }),
  unregisterExtension: (id) => set2((s) => {
    delete s.installedExtensions[id];
    s.extensionRibbonButtons = s.extensionRibbonButtons.filter(
      (b) => b.extensionId !== id
    );
    s.extensionImporters = s.extensionImporters.filter(
      (i) => i.extensionId !== id
    );
  }),
  setExtensionStatus: (id, status, error) => set2((s) => {
    const ext = s.installedExtensions[id];
    if (ext) {
      ext.status = status;
      ext.error = error;
    }
  }),
  addExtensionRibbonButton: (btn) => set2((s) => {
    const exists2 = s.extensionRibbonButtons.some(
      (b) => b.extensionId === btn.extensionId && b.label === btn.label
    );
    if (!exists2) s.extensionRibbonButtons.push(btn);
  }),
  removeExtensionRibbonButton: (extensionId, label) => set2((s) => {
    s.extensionRibbonButtons = s.extensionRibbonButtons.filter(
      (b) => !(b.extensionId === extensionId && b.label === label)
    );
  }),
  addExtensionImporter: (imp) => set2((s) => {
    const exists2 = s.extensionImporters.some(
      (i) => i.extensionId === imp.extensionId && i.id === imp.id
    );
    if (!exists2) s.extensionImporters.push(imp);
  }),
  removeExtensionImporter: (extensionId, importerId) => set2((s) => {
    s.extensionImporters = s.extensionImporters.filter(
      (i) => !(i.extensionId === extensionId && i.id === importerId)
    );
  }),
  removeAllExtensionUI: (extensionId) => set2((s) => {
    s.extensionRibbonButtons = s.extensionRibbonButtons.filter(
      (b) => b.extensionId !== extensionId
    );
    s.extensionImporters = s.extensionImporters.filter(
      (i) => i.extensionId !== extensionId
    );
  }),
  setCatalog: (entries, fetchedAt) => set2((s) => {
    s.catalogEntries = entries;
    s.catalogLastFetched = fetchedAt;
    s.catalogError = null;
  }),
  setCatalogLoading: (loading) => set2((s) => {
    s.catalogLoading = loading;
  }),
  setCatalogError: (error) => set2((s) => {
    s.catalogError = error;
  })
});

// src/state/slices/documentSlice.ts
function resetDocumentScopedUI(s) {
  s.ui.showTaskDialog = false;
  s.ui.editingTaskId = null;
  s.ui.showLibraryLinkDialog = false;
  s.ui.libraryRefreshNotice = null;
}
function docTitle(filePath, project) {
  return documentTitle(filePath, project.name);
}
function deepClone2(v) {
  return JSON.parse(JSON.stringify(v));
}
var VARIANT_RE = /^(.*) \(variant (\d+)\)$/;
function variantBaseName(name) {
  const m = VARIANT_RE.exec(name);
  return m ? m[1] : name;
}
function nextVariantName(sourceName, openNames) {
  const base = variantBaseName(sourceName);
  const used = /* @__PURE__ */ new Set();
  for (const nm of openNames) {
    const m = VARIANT_RE.exec(nm);
    if (m && m[1] === base) used.add(parseInt(m[2], 10));
  }
  let n = 2;
  while (used.has(n)) n++;
  return `${base} (variant ${n})`;
}
function openProjectNames(s) {
  return s.documents.map((d) => d.id === s.activeDocumentId ? s.project.name : d.payload.project.name);
}
var INITIAL_DOC_ID = generateId("doc");
var createDocumentSlice = (set2, get2) => ({
  documents: [{ id: INITIAL_DOC_ID, payload: null }],
  activeDocumentId: INITIAL_DOC_ID,
  newDocument: () => {
    const outgoing = capturePayload(get2());
    const newId = generateId("doc");
    set2((s) => {
      const cur = s.documents.find((d) => d.id === s.activeDocumentId);
      if (cur) cur.payload = outgoing;
      s.documents.push({ id: newId, payload: null });
      s.activeDocumentId = newId;
      hydratePayload(s, freshPayload());
      resetDocumentScopedUI(s);
    });
    get2().recomputeViewRows();
    emitExtensionEvent(HOST_EVENTS.projectNew);
    return newId;
  },
  duplicateDocument: (name) => {
    resetUndoCoalescing();
    const source = get2();
    const src = capturePayload(source);
    const copyName = name ?? (src.project.name ? nextVariantName(src.project.name, openProjectNames(source)) : "");
    const newId = generateId("doc");
    const copy = {
      project: { ...deepClone2(src.project), name: copyName },
      calendar: deepClone2(src.calendar),
      tasks: deepClone2(src.tasks),
      sequences: deepClone2(src.sequences),
      resources: deepClone2(src.resources),
      assignments: deepClone2(src.assignments),
      calendars: deepClone2(src.calendars),
      activityCodeTypes: deepClone2(src.activityCodeTypes),
      customFieldDefs: deepClone2(src.customFieldDefs),
      baselines: deepClone2(src.baselines),
      activeBaselineId: src.activeBaselineId,
      cpmResult: src.cpmResult,
      resourceLoadResult: src.resourceLoadResult,
      scheduleStale: src.scheduleStale,
      selectedTaskIds: [],
      view: deepClone2(src.view),
      collapsedTaskIds: deepClone2(src.collapsedTaskIds),
      undoStack: [],
      redoStack: [],
      filePath: null,
      fileHandle: null,
      isDirty: true
    };
    set2((s) => {
      const cur = s.documents.find((d) => d.id === s.activeDocumentId);
      if (cur) cur.payload = src;
      s.documents.push({ id: newId, payload: null });
      s.activeDocumentId = newId;
      hydratePayload(s, copy);
      resetDocumentScopedUI(s);
    });
    get2().recomputeViewRows();
    emitExtensionEvent(HOST_EVENTS.projectLoaded, {
      tasks: copy.tasks.length,
      sequences: copy.sequences.length,
      resources: copy.resources.length
    });
    return newId;
  },
  switchDocument: (id) => {
    const state = get2();
    if (id === state.activeDocumentId) return;
    resetUndoCoalescing();
    const target = state.documents.find((d) => d.id === id);
    if (!target || !target.payload) return;
    const outgoing = capturePayload(state);
    const incoming = target.payload;
    set2((s) => {
      const cur = s.documents.find((d) => d.id === s.activeDocumentId);
      if (cur) cur.payload = outgoing;
      hydratePayload(s, incoming);
      const inc = s.documents.find((d) => d.id === id);
      if (inc) inc.payload = null;
      s.activeDocumentId = id;
      resetDocumentScopedUI(s);
    });
    get2().recomputeViewRows();
    {
      const cid = get2().project.companyId;
      const refreshed = cid ? get2().refreshBehindItems(cid) : 0;
      get2().setUI({ showLibraryLinkDialog: false, libraryRefreshNotice: refreshed > 0 ? refreshed : null });
    }
    get2().recomputeResourceLoad();
    emitExtensionEvent(HOST_EVENTS.projectLoaded, {
      tasks: incoming.tasks.length,
      sequences: incoming.sequences.length,
      resources: incoming.resources.length
    });
  },
  closeDocument: (id) => {
    const state = get2();
    if (!state.documents.some((d) => d.id === id)) return;
    if (state.documents.length === 1) {
      const newId = generateId("doc");
      set2((s) => {
        s.documents = [{ id: newId, payload: null }];
        s.activeDocumentId = newId;
        hydratePayload(s, freshPayload());
        resetDocumentScopedUI(s);
      });
      get2().recomputeViewRows();
      emitExtensionEvent(HOST_EVENTS.projectNew);
      return;
    }
    if (id !== state.activeDocumentId) {
      set2((s) => {
        s.documents = s.documents.filter((d) => d.id !== id);
      });
      return;
    }
    const idx = state.documents.findIndex((d) => d.id === id);
    const neighbor = state.documents[idx + 1] ?? state.documents[idx - 1];
    const incoming = neighbor.payload;
    set2((s) => {
      hydratePayload(s, incoming);
      s.documents = s.documents.filter((d) => d.id !== id);
      const n = s.documents.find((d) => d.id === neighbor.id);
      if (n) n.payload = null;
      s.activeDocumentId = neighbor.id;
      resetDocumentScopedUI(s);
    });
    get2().recomputeViewRows();
    {
      const cid = get2().project.companyId;
      const refreshed = cid ? get2().refreshBehindItems(cid) : 0;
      get2().setUI({ showLibraryLinkDialog: false, libraryRefreshNotice: refreshed > 0 ? refreshed : null });
    }
    get2().recomputeResourceLoad();
    emitExtensionEvent(HOST_EVENTS.projectLoaded, {
      tasks: incoming.tasks.length,
      sequences: incoming.sequences.length,
      resources: incoming.resources.length
    });
  },
  getOpenDocuments: () => {
    const s = get2();
    const rows = s.documents.map((d) => {
      const active = d.id === s.activeDocumentId;
      const filePath = active ? s.filePath : d.payload.filePath;
      const project = active ? s.project : d.payload.project;
      const isDirty = active ? s.isDirty : d.payload.isDirty;
      return { id: d.id, title: docTitle(filePath, project), isDirty, isActive: active };
    });
    const ordinals = untitledOrdinals(rows.map((r) => r.title));
    return rows.map((r, i) => ordinals[i] === void 0 ? r : { ...r, untitledOrdinal: ordinals[i] });
  },
  getOpenDocumentPayloads: () => {
    const s = get2();
    return s.documents.map((d) => ({
      id: d.id,
      payload: d.id === s.activeDocumentId ? capturePayload(s) : d.payload
    }));
  },
  restoreDocuments: (docs, activeId) => {
    if (docs.length === 0) return;
    const active = docs.find((d) => d.id === activeId) ?? docs[0];
    set2((s) => {
      s.documents = docs.map((d) => ({
        id: d.id,
        payload: d.id === active.id ? null : payloadFromInput(d)
      }));
      s.activeDocumentId = active.id;
      hydratePayload(s, payloadFromInput(active));
      resetDocumentScopedUI(s);
    });
    get2().recomputeViewRows();
    get2().runCPM();
    emitExtensionEvent(HOST_EVENTS.projectLoaded, {
      tasks: active.tasks.length,
      sequences: active.sequences.length,
      resources: active.resources.length
    });
  }
});

// src/state/slices/structureSlice.ts
var createStructureSlice = (set2, get2) => ({
  activityCodeTypes: [],
  customFieldDefs: [],
  addActivityCodeType: (name) => {
    const id = generateId("act");
    set2((s) => {
      beginUndoable(s);
      s.activityCodeTypes.push({ id, name, values: [] });
      finishMutation(s);
    });
    get2().recomputeViewRows();
    return id;
  },
  renameActivityCodeType: (id, name) => {
    set2((s) => {
      const t = s.activityCodeTypes.find((x) => x.id === id);
      if (!t || t.name === name) return;
      beginUndoable(s);
      t.name = name;
      finishMutation(s);
    });
    get2().recomputeViewRows();
  },
  removeActivityCodeType: (id) => {
    set2((s) => {
      if (!s.activityCodeTypes.some((x) => x.id === id)) return;
      beginUndoable(s);
      s.activityCodeTypes = s.activityCodeTypes.filter((x) => x.id !== id);
      for (const task of s.tasks) {
        if (task.activityCodes && id in task.activityCodes) delete task.activityCodes[id];
      }
      s.view.group = s.view.group.filter((g2) => !(g2.field.src === "activityCode" && g2.field.typeId === id));
      s.view.sort = s.view.sort.filter((g2) => !(g2.field.src === "activityCode" && g2.field.typeId === id));
      finishMutation(s);
    });
    get2().recomputeViewRows();
  },
  addActivityCodeValue: (typeId, value) => {
    const id = generateId("acv");
    set2((s) => {
      const t = s.activityCodeTypes.find((x) => x.id === typeId);
      if (!t) return;
      beginUndoable(s);
      t.values.push({ ...value, id });
      finishMutation(s);
    });
    get2().recomputeViewRows();
    return id;
  },
  updateActivityCodeValue: (typeId, valueId, patch) => {
    set2((s) => {
      const v = s.activityCodeTypes.find((x) => x.id === typeId)?.values.find((x) => x.id === valueId);
      if (!v) return;
      beginUndoable(s);
      Object.assign(v, patch);
      finishMutation(s);
    });
    get2().recomputeViewRows();
  },
  removeActivityCodeValue: (typeId, valueId) => {
    set2((s) => {
      const t = s.activityCodeTypes.find((x) => x.id === typeId);
      if (!t || !t.values.some((v) => v.id === valueId)) return;
      beginUndoable(s);
      t.values = t.values.filter((v) => v.id !== valueId);
      for (const task of s.tasks) {
        if (task.activityCodes?.[typeId] === valueId) delete task.activityCodes[typeId];
      }
      finishMutation(s);
    });
    get2().recomputeViewRows();
  },
  setTaskActivityCode: (taskId, typeId, valueId) => {
    set2((s) => {
      const task = s.tasks.find((t) => t.id === taskId);
      if (!task) return;
      const current2 = task.activityCodes?.[typeId];
      if ((valueId ?? void 0) === current2) return;
      beginUndoable(s);
      if (valueId === null) {
        if (task.activityCodes) delete task.activityCodes[typeId];
      } else {
        task.activityCodes = { ...task.activityCodes ?? {}, [typeId]: valueId };
      }
      finishMutation(s);
    });
    get2().recomputeViewRows();
  },
  addCustomField: (name, type) => {
    const id = generateId("cfd");
    set2((s) => {
      beginUndoable(s);
      s.customFieldDefs.push({ id, name, type });
      finishMutation(s);
    });
    get2().recomputeViewRows();
    return id;
  },
  renameCustomField: (id, name) => {
    set2((s) => {
      const d = s.customFieldDefs.find((x) => x.id === id);
      if (!d || d.name === name) return;
      beginUndoable(s);
      d.name = name;
      finishMutation(s);
    });
    get2().recomputeViewRows();
  },
  removeCustomField: (id) => {
    set2((s) => {
      if (!s.customFieldDefs.some((x) => x.id === id)) return;
      beginUndoable(s);
      s.customFieldDefs = s.customFieldDefs.filter((x) => x.id !== id);
      for (const task of s.tasks) {
        if (task.customFields && id in task.customFields) delete task.customFields[id];
      }
      s.view.group = s.view.group.filter((g2) => !(g2.field.src === "customField" && g2.field.defId === id));
      s.view.sort = s.view.sort.filter((g2) => !(g2.field.src === "customField" && g2.field.defId === id));
      finishMutation(s);
    });
    get2().recomputeViewRows();
  },
  setTaskCustomField: (taskId, defId, value) => {
    set2((s) => {
      const task = s.tasks.find((t) => t.id === taskId);
      if (!task) return;
      const current2 = task.customFields?.[defId];
      if ((value ?? void 0) === current2) return;
      beginUndoable(s);
      if (value === null) {
        if (task.customFields) delete task.customFields[defId];
      } else {
        task.customFields = { ...task.customFields ?? {}, [defId]: value };
      }
      finishMutation(s);
    });
    get2().recomputeViewRows();
  }
});

// src/state/slices/baselineSlice.ts
var createBaselineSlice = (set2) => ({
  baselines: [],
  activeBaselineId: null,
  saveBaseline: (name) => {
    const id = generateId("baseline");
    set2((s) => {
      beginUndoable(s);
      const leaves = s.tasks.filter((t) => t.childIds.length === 0);
      s.baselines.push({
        id,
        name,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        tasks: leaves.map((t) => ({
          taskId: t.id,
          start: t.time.earlyStart || t.time.scheduleStart,
          finish: t.time.earlyFinish || t.time.scheduleFinish,
          duration: t.time.scheduleDuration,
          isMilestone: t.isMilestone,
          ...t.milestoneKind ? { milestoneKind: t.milestoneKind } : {}
        })),
        projectEnd: s.cpmResult?.projectEnd ?? "",
        projectDuration: s.cpmResult?.projectDuration ?? 0
      });
      s.activeBaselineId = id;
      finishMutation(s);
    });
    return id;
  },
  deleteBaseline: (id) => set2((s) => {
    if (!s.baselines.some((b) => b.id === id)) return;
    beginUndoable(s);
    s.baselines = s.baselines.filter((b) => b.id !== id);
    if (s.activeBaselineId === id) {
      s.activeBaselineId = s.baselines.length ? s.baselines[s.baselines.length - 1].id : null;
    }
    finishMutation(s);
  }),
  renameBaseline: (id, name) => set2((s) => {
    const b = s.baselines.find((x) => x.id === id);
    if (!b) return;
    beginUndoable(s);
    b.name = name;
    finishMutation(s);
  }),
  setActiveBaseline: (id) => set2((s) => {
    if (s.activeBaselineId === id) return;
    beginUndoable(s);
    s.activeBaselineId = id;
    finishMutation(s);
  })
});

// src/types/library.ts
var DEFAULT_COMPANY_ID = "company-default";
function createDefaultCompany() {
  return { id: DEFAULT_COMPANY_ID, name: "Mijn resourcebibliotheek" };
}
function createEmptyPool(company) {
  return {
    companyId: company.id,
    companyName: company.name,
    poolVersion: 0,
    modifiedAt: (/* @__PURE__ */ new Date()).toISOString(),
    calendars: [],
    resources: []
  };
}
function createDefaultLibrary() {
  const company = createDefaultCompany();
  return {
    companies: [company],
    defaultCompanyId: company.id,
    pools: { [company.id]: createEmptyPool(company) }
  };
}

// src/services/library/demoLibrary.ts
var DEMO_COMPANY_ID = "demo-resourcebibliotheek";
var DEMO_COMPANY_NAME = "Demo resource library";
function buildBouwkalenderNL() {
  return {
    id: generateId("cal"),
    name: "Construction calendar NL",
    description: "Standard Dutch construction calendar: Monday to Friday, 07:00-16:00.",
    workDays: [1, 2, 3, 4, 5],
    workStartHour: 7,
    workEndHour: 16,
    hoursPerDay: 8,
    holidays: []
  };
}
function buildMetselploegKalender() {
  return {
    id: generateId("cal"),
    name: "Masonry crew, 4-day week",
    description: "Shortened working week for the masonry crew: Monday to Thursday, 07:00-16:00.",
    workDays: [1, 2, 3, 4],
    workStartHour: 7,
    workEndHour: 16,
    hoursPerDay: 8,
    holidays: []
  };
}
function buildDemoLibrarySeed() {
  const company = { id: DEMO_COMPANY_ID, name: DEMO_COMPANY_NAME };
  const bouwkalenderNL = buildBouwkalenderNL();
  const metselploegKalender = buildMetselploegKalender();
  const resources = [
    { id: generateId("res"), name: "Carpenters", type: "LABOR", description: "Carpentry crew for structural works and fit-out.", maxUnits: 4, costPerHour: 45 },
    { id: generateId("res"), name: "MEP fitters", type: "LABOR", description: "Electrical and mechanical building services.", maxUnits: 4, costPerHour: 48 },
    { id: generateId("res"), name: "Plasterers", type: "LABOR", description: "Plastering to walls and ceilings.", maxUnits: 3, costPerHour: 42 },
    { id: generateId("res"), name: "Painters", type: "LABOR", description: "Internal and external painting.", maxUnits: 4, costPerHour: 38 },
    { id: generateId("res"), name: "Bricklayers", type: "LABOR", description: "Masonry to facades and internal leaves.", maxUnits: 6, costPerHour: 46 },
    { id: generateId("res"), name: "Masonry crew", type: "CREW", description: "Masonry crew moving from house to house.", maxUnits: 1, calendarId: metselploegKalender.id },
    { id: generateId("res"), name: "Concrete C20/25", type: "MATERIAL", description: "Standard foundation and structural concrete.", maxUnits: 999, unitOfMeasure: "m\xB3" },
    { id: generateId("res"), name: "Steel fixers", type: "LABOR", description: "Reinforcement fixing.", maxUnits: 4, costPerHour: 44 },
    { id: generateId("res"), name: "Tilers", type: "LABOR", description: "Tiling in bathrooms and kitchens.", maxUnits: 3, costPerHour: 43 },
    { id: generateId("res"), name: "Kitchen fitters", type: "LABOR", description: "Kitchen installation.", maxUnits: 2, costPerHour: 46 },
    { id: generateId("res"), name: "Tower crane", type: "EQUIPMENT", description: "Tower crane for vertical transport.", maxUnits: 1, costPerHour: 120 },
    { id: generateId("res"), name: "Concrete C30/37", type: "MATERIAL", description: "High-strength concrete for structural pours.", maxUnits: 999, unitOfMeasure: "m\xB3" },
    { id: generateId("res"), name: "Facade contractor", type: "SUBCONTRACTOR", description: "Facade cladding subcontractor.", maxUnits: 2, costPerHour: 60 },
    { id: generateId("res"), name: "Lift supplier", type: "SUBCONTRACTOR", description: "Subcontractor supplying and installing the lift.", maxUnits: 1, costPerHour: 90 }
  ];
  const pool = {
    companyId: company.id,
    companyName: company.name,
    poolVersion: 1,
    modifiedAt: (/* @__PURE__ */ new Date()).toISOString(),
    calendars: [bouwkalenderNL, metselploegKalender],
    resources
  };
  return { company, pool };
}

// src/services/library/libraryOps.ts
var RESERVED_COMPANY_IDS = /* @__PURE__ */ new Set([DEFAULT_COMPANY_ID, DEMO_COMPANY_ID]);
function isReservedCompanyId(id) {
  return RESERVED_COMPANY_IDS.has(id);
}
var SAFE_COMPANY_ID_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;
var UNSAFE_COMPANY_IDS = /* @__PURE__ */ new Set(["__proto__", "constructor", "prototype"]);
function isSafeFileCompanyId(id) {
  return SAFE_COMPANY_ID_PATTERN.test(id) && !UNSAFE_COMPANY_IDS.has(id);
}
function bumpPool(pool) {
  return { ...pool, poolVersion: pool.poolVersion + 1, modifiedAt: (/* @__PURE__ */ new Date()).toISOString() };
}
function normalizePoolShape(cid, raw, companies) {
  const p = raw ?? {};
  return {
    companyId: cid,
    companyName: typeof p.companyName === "string" ? p.companyName : companies.find((c) => c.id === cid)?.name ?? cid,
    // Fix B5: een geheel getal ≥1, anders 1 — vangt zowel niet-numerieke waarden (string/ontbrekend)
    // als een numerieke maar ongeldige waarde (float, 0, negatief) op. Vóór de fix accepteerde
    // `typeof p.poolVersion === 'number'` ELKE numerieke waarde inclusief NaN-achtige randgevallen,
    // floats en negatieve versies (bumpPool/isPoolNewer verwachten een oplopend geheel getal ≥1).
    poolVersion: typeof p.poolVersion === "number" && Number.isInteger(p.poolVersion) ? Math.max(1, p.poolVersion) : 1,
    modifiedAt: typeof p.modifiedAt === "string" ? p.modifiedAt : (/* @__PURE__ */ new Date()).toISOString(),
    // Fix B5: `Array.isArray` i.p.v. `??` — een object i.p.v. array (bijv. een hand-gemaakt of
    // door een derde tool geproduceerd OPS_Library-bestand met `calendars: {...}`) is niet-nullish,
    // dus `?? []` liet het ongewijzigd door; een latere `.push`/`.filter`/`.find` op zo'n object
    // crasht dan alsnog (bewezen fuzz-pool b6, jachtlijn 1 "calendars/resources zijn geen array").
    calendars: Array.isArray(p.calendars) ? p.calendars : [],
    resources: Array.isArray(p.resources) ? p.resources : []
  };
}
function parseTime(iso2) {
  const t = Date.parse(iso2);
  return Number.isNaN(t) ? 0 : t;
}
function isPoolNewer(local, imported) {
  if (!local) return false;
  return local.poolVersion > imported.poolVersion || parseTime(local.modifiedAt) > parseTime(imported.modifiedAt);
}
function makeOrigin(pool, libraryItemId, syncedHash) {
  return {
    companyId: pool.companyId,
    libraryItemId,
    poolVersion: pool.poolVersion,
    ...syncedHash !== void 0 ? { syncedHash } : {}
  };
}
function findCopyByOrigin(items, companyId, libraryItemId) {
  if (!companyId || !libraryItemId) return void 0;
  return items.find(
    (i) => i.libraryOrigin?.companyId === companyId && i.libraryOrigin?.libraryItemId === libraryItemId
  );
}
function copyCalendarToProject(pool, poolCalendarId, existingCalendars, genId) {
  const source = pool.calendars.find((c) => c.id === poolCalendarId);
  if (!source) return null;
  const existing = findCopyByOrigin(existingCalendars, pool.companyId, poolCalendarId);
  if (existing) return { calendar: existing, reused: true };
  const calendar = {
    ...structuredClone(source),
    id: genId("cal"),
    libraryOrigin: makeOrigin(pool, poolCalendarId, computeCalendarHash(source))
  };
  return { calendar, reused: false };
}
function copyResourceToProject(pool, poolResourceId, existingResources, existingCalendars, genId) {
  const source = pool.resources.find((r) => r.id === poolResourceId);
  if (!source) return null;
  const existing = findCopyByOrigin(existingResources, pool.companyId, poolResourceId);
  if (existing) return { resource: existing, reused: true };
  let travelingCalendar;
  let calendarId = source.calendarId;
  if (source.calendarId && pool.calendars.some((c) => c.id === source.calendarId)) {
    travelingCalendar = copyCalendarToProject(pool, source.calendarId, existingCalendars, genId) ?? void 0;
    calendarId = travelingCalendar?.calendar.id;
  } else {
    calendarId = void 0;
  }
  const resource = {
    ...structuredClone(source),
    id: genId("res"),
    calendarId,
    libraryOrigin: makeOrigin(pool, poolResourceId, computeResourceHash(source)),
    // parentId (ploeg-lidmaatschap) is een pool-lokale verwijzing; bij een losse kopie laten we hem
    // vallen (het project heeft de ploeg niet noodzakelijk). Zo ontstaat nooit een dode verwijzing.
    parentId: void 0
  };
  return { resource, reused: false, travelingCalendar };
}
var CALENDAR_DIFF_FIELDS = [
  "name",
  "description",
  "workDays",
  "workStartHour",
  "workEndHour",
  "hoursPerDay",
  "holidays",
  "generation",
  "workTime",
  "shift"
];
var RESOURCE_DIFF_FIELDS = [
  "name",
  "type",
  "description",
  "costPerHour",
  "unitOfMeasure"
];
function diffKey(value) {
  if (Array.isArray(value)) {
    const sorted = value.map((el) => JSON.stringify(el)).sort();
    return JSON.stringify(sorted);
  }
  return JSON.stringify(value);
}
function diffFields(project, library, fields) {
  const out = [];
  for (const f of fields) {
    const a = project[f];
    const b = library[f];
    if (diffKey(a) !== diffKey(b)) {
      out.push({ field: String(f), project: a, library: b });
    }
  }
  return out;
}
function hashFields(item, fields) {
  return JSON.stringify(fields.map((f) => diffKey(item[f])));
}
function computeCalendarHash(cal) {
  return hashFields(cal, CALENDAR_DIFF_FIELDS);
}
function computeResourceHash(res) {
  return hashFields(res, RESOURCE_DIFF_FIELDS);
}
var INVISIBLE_FORMATTING_CHARS = /[\u200B-\u200D\uFEFF\u00AD]/g;
function normalizeName(name) {
  return name.normalize("NFC").replace(INVISIBLE_FORMATTING_CHARS, "").trim().replace(/\s+/g, " ").toLowerCase();
}
function matchByName(name, candidates) {
  const target = normalizeName(name);
  if (!target) return null;
  const hits = candidates.filter((c) => normalizeName(c.name) === target);
  return hits.length === 1 ? hits[0] : null;
}
function resolveUniqueCompanyName(rawName, existingNames) {
  const base = normalizeName(rawName) ? rawName.trim() : "Nieuwe resourcebibliotheek";
  const existing = new Set(existingNames.map(normalizeName));
  if (!existing.has(normalizeName(base))) return base;
  let n = 2;
  while (existing.has(normalizeName(`${base} (${n})`))) n++;
  return `${base} (${n})`;
}
function diffCalendarVsPool(projectCal, pool) {
  const id = projectCal.libraryOrigin?.libraryItemId;
  const source = id ? pool.calendars.find((c) => c.id === id) : void 0;
  if (!source) return { status: "removed" };
  const fields = diffFields(projectCal, source, CALENDAR_DIFF_FIELDS);
  return fields.length === 0 ? { status: "up-to-date" } : { status: "changed", fields };
}
function diffResourceVsPool(projectRes, pool) {
  const id = projectRes.libraryOrigin?.libraryItemId;
  const source = id ? pool.resources.find((r) => r.id === id) : void 0;
  if (!source) return { status: "removed" };
  const fields = diffFields(projectRes, source, RESOURCE_DIFF_FIELDS);
  return fields.length === 0 ? { status: "up-to-date" } : { status: "changed", fields };
}
function classifyOnOpen(diffStatus, fileHash, syncedHash) {
  if (diffStatus === "removed") return "removed";
  if (diffStatus === "up-to-date") return "in-sync";
  if (syncedHash === void 0) return "deviated";
  return fileHash === syncedHash ? "behind" : "deviated";
}
function classifyCalendarOnOpen(projectCal, pool) {
  if (!projectCal.libraryOrigin) return "unbound";
  return classifyOnOpen(diffCalendarVsPool(projectCal, pool).status, computeCalendarHash(projectCal), projectCal.libraryOrigin.syncedHash);
}
function classifyResourceOnOpen(projectRes, pool) {
  if (!projectRes.libraryOrigin) return "unbound";
  return classifyOnOpen(diffResourceVsPool(projectRes, pool).status, computeResourceHash(projectRes), projectRes.libraryOrigin.syncedHash);
}
function applyDiffFields(target, source, fields) {
  const patched = structuredClone(target);
  for (const f of fields) {
    patched[f] = structuredClone(source[f]);
  }
  return patched;
}
function applyCalendarUpdate(projectCal, pool) {
  const id = projectCal.libraryOrigin?.libraryItemId;
  const source = id ? pool.calendars.find((c) => c.id === id) : void 0;
  if (!source) {
    throw new Error(`applyCalendarUpdate: pool-origineel niet gevonden voor kalender "${projectCal.name}" (id=${projectCal.id}, libraryItemId=${id ?? "ontbreekt"})`);
  }
  const patched = applyDiffFields(projectCal, source, CALENDAR_DIFF_FIELDS);
  patched.libraryOrigin = makeOrigin(pool, id, computeCalendarHash(source));
  return patched;
}
function applyResourceUpdate(projectRes, pool) {
  const id = projectRes.libraryOrigin?.libraryItemId;
  const source = id ? pool.resources.find((r) => r.id === id) : void 0;
  if (!source) {
    throw new Error(`applyResourceUpdate: pool-origineel niet gevonden voor resource "${projectRes.name}" (id=${projectRes.id}, libraryItemId=${id ?? "ontbreekt"})`);
  }
  const patched = applyDiffFields(projectRes, source, RESOURCE_DIFF_FIELDS);
  patched.libraryOrigin = makeOrigin(pool, id, computeResourceHash(source));
  return patched;
}

// src/services/library/libraryStore.ts
var LIBRARY_FILE = "ops-library.json";
var dbPromise = null;
function openLibraryDb() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve2, reject) => {
    const req = indexedDB.open("ops-library", 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("library")) {
        db.createObjectStore("library", { keyPath: "key" });
      }
    };
    req.onsuccess = () => {
      const db = req.result;
      db.onversionchange = () => {
        db.close();
        dbPromise = null;
      };
      resolve2(db);
    };
    req.onerror = () => {
      dbPromise = null;
      reject(req.error);
    };
  });
  return dbPromise;
}
async function loadWeb() {
  if (typeof indexedDB === "undefined") return null;
  const db = await openLibraryDb();
  return new Promise((resolve2, reject) => {
    const tx = db.transaction("library", "readonly");
    const req = tx.objectStore("library").get("library");
    req.onsuccess = () => resolve2(req.result?.value ?? null);
    req.onerror = () => reject(req.error);
  });
}
async function saveWeb(lib) {
  if (typeof indexedDB === "undefined") return;
  const db = await openLibraryDb();
  return new Promise((resolve2, reject) => {
    const tx = db.transaction("library", "readwrite");
    tx.objectStore("library").put({ key: "library", value: lib });
    tx.oncomplete = () => resolve2();
    tx.onerror = () => reject(tx.error);
  });
}
async function loadTauri() {
  const { readTextFile: readTextFile2, exists: exists2 } = await Promise.resolve().then(() => (init_dist_js2(), dist_js_exports2));
  const { appDataDir: appDataDir2, join: join2 } = await Promise.resolve().then(() => (init_path(), path_exports));
  const path = await join2(await appDataDir2(), LIBRARY_FILE);
  if (!await exists2(path)) return null;
  try {
    return JSON.parse(await readTextFile2(path));
  } catch {
    return null;
  }
}
async function saveTauri(lib) {
  const { writeTextFile: writeTextFile2 } = await Promise.resolve().then(() => (init_dist_js2(), dist_js_exports2));
  const { appDataDir: appDataDir2, join: join2 } = await Promise.resolve().then(() => (init_path(), path_exports));
  const path = await join2(await appDataDir2(), LIBRARY_FILE);
  await writeTextFile2(path, JSON.stringify(lib));
}
async function loadLibrary() {
  const loaded = isTauri() ? await loadTauri() : await loadWeb().catch(() => null);
  return loaded ?? createDefaultLibrary();
}
var lastSave = Promise.resolve();
function saveLibrary(lib) {
  const run = () => isTauri() ? saveTauri(lib) : saveWeb(lib);
  const result = lastSave.then(run, run);
  lastSave = result.catch(() => {
  });
  return result;
}

// src/services/library/libraryIfc.ts
function writePoolIFC(pool) {
  const project = {
    ...createDefaultProject(),
    name: `Bibliotheek \u2014 ${pool.companyName}`,
    company: pool.companyName,
    companyId: pool.companyId,
    companyName: pool.companyName
  };
  return writeIFC({
    project,
    calendar: createDefaultCalendar(),
    tasks: [],
    sequences: [],
    resources: pool.resources,
    assignments: [],
    resourceCalendars: pool.calendars,
    libraryPool: pool
  });
}

// src/services/debug/appLog.ts
var MAX_ENTRIES = 500;
var buffer = [];
var nextId = 1;
var listeners = /* @__PURE__ */ new Set();
var initialized = false;
function notify() {
  const snapshot = buffer.slice();
  for (const fn of listeners) {
    try {
      fn(snapshot);
    } catch (err) {
      originalConsole.error?.("[appLog] listener threw:", err);
    }
  }
}
function stringifyArg(arg) {
  if (typeof arg === "string") return arg;
  if (arg instanceof Error) {
    const stack = (arg.stack ?? "").split("\n").slice(0, 4).join("\n");
    return `${arg.name}: ${arg.message}
${stack}`;
  }
  if (arg === void 0) return "undefined";
  if (arg === null) return "null";
  try {
    return JSON.stringify(arg);
  } catch {
    return "[unserializable]";
  }
}
function formatArgs(args) {
  return args.map(stringifyArg).join(" ");
}
var originalConsole = {
  log: console.log.bind(console),
  info: console.info.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console)
};
function push(level, channel, text) {
  const entry = { id: nextId++, ts: Date.now(), level, channel, text };
  buffer.push(entry);
  if (buffer.length > MAX_ENTRIES) buffer.splice(0, buffer.length - MAX_ENTRIES);
  notify();
}
var appLog = {
  init() {
    if (initialized) return;
    initialized = true;
    console.log = (...args) => {
      try {
        push("log", void 0, formatArgs(args));
      } catch {
      }
      originalConsole.log(...args);
    };
    console.info = (...args) => {
      try {
        push("info", void 0, formatArgs(args));
      } catch {
      }
      originalConsole.info(...args);
    };
    console.warn = (...args) => {
      try {
        push("warn", void 0, formatArgs(args));
      } catch {
      }
      originalConsole.warn(...args);
    };
    console.error = (...args) => {
      try {
        push("error", void 0, formatArgs(args));
      } catch {
      }
      originalConsole.error(...args);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("error", (e) => {
        try {
          push("error", "window", `${e.message} @ ${e.filename}:${e.lineno}:${e.colno}`);
        } catch {
        }
      });
      window.addEventListener("unhandledrejection", (e) => {
        try {
          push("error", "promise", stringifyArg(e.reason));
        } catch {
        }
      });
    }
  },
  emit(level, channel, ...args) {
    push(level, channel, formatArgs(args));
  },
  subscribe(fn) {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
  snapshot() {
    return buffer.slice();
  },
  clear() {
    buffer = [];
    notify();
  }
};

// src/state/slices/librarySlice.ts
function normalizePool(cid, raw, companies) {
  return normalizePoolShape(cid, raw, companies);
}
function normalizeLoadedLibrary(lib) {
  const companies = lib?.companies && lib.companies.length > 0 ? lib.companies : createDefaultLibrary().companies;
  const companyIds = new Set(companies.map((c) => c.id));
  const rawPools = lib?.pools ?? {};
  const pools = Object.fromEntries(
    Object.entries(rawPools).filter(([cid]) => companyIds.has(cid)).map(([cid, p]) => [cid, normalizePool(cid, p, companies)])
  );
  const defaultCompanyId = lib?.defaultCompanyId && companyIds.has(lib.defaultCompanyId) ? lib.defaultCompanyId : companies[0].id;
  return { companies, defaultCompanyId, pools };
}
function persist(get2) {
  if (!get2().libraryLoaded) return;
  const s = get2();
  const lib = { companies: s.companies, defaultCompanyId: s.defaultCompanyId, pools: s.pools };
  saveLibrary(lib).catch((err) => {
    appLog.emit("error", "library", "saveLibrary faalde", err);
  });
}
var createLibrarySlice = (set2, get2) => ({
  companies: createDefaultLibrary().companies,
  defaultCompanyId: DEFAULT_COMPANY_ID,
  pools: createDefaultLibrary().pools,
  libraryLoaded: false,
  initLibrary: async () => {
    const raw = await loadLibrary();
    const lib = normalizeLoadedLibrary(raw);
    set2((s) => {
      s.companies = lib.companies;
      s.defaultCompanyId = lib.defaultCompanyId;
      s.pools = lib.pools;
      for (const c of s.companies) {
        if (!s.pools[c.id]) s.pools[c.id] = createEmptyPool(c);
      }
      s.libraryLoaded = true;
    });
  },
  addCompany: (name) => {
    const id = generateId("company");
    const company = { id, name: name.trim() || "Nieuwe resourcebibliotheek" };
    set2((s) => {
      s.companies.push(company);
      s.pools[id] = createEmptyPool(company);
    });
    persist(get2);
    return id;
  },
  seedDemoLibrary: () => {
    if (get2().companies.some((c) => c.id === DEMO_COMPANY_ID)) return DEMO_COMPANY_ID;
    set2((s) => {
      const { company, pool } = buildDemoLibrarySeed();
      s.companies.push(company);
      s.pools[company.id] = pool;
    });
    persist(get2);
    return DEMO_COMPANY_ID;
  },
  renameCompany: (id, name) => {
    set2((s) => {
      const c = s.companies.find((c2) => c2.id === id);
      if (!c) return;
      c.name = name.trim() || c.name;
      if (s.pools[id]) s.pools[id].companyName = c.name;
    });
    persist(get2);
  },
  removeCompany: (id) => {
    const wasActiveCompany = get2().companies.length > 1 && get2().project.companyId === id;
    set2((s) => {
      if (s.companies.length <= 1) return;
      s.companies = s.companies.filter((c) => c.id !== id);
      delete s.pools[id];
      if (s.defaultCompanyId === id) s.defaultCompanyId = s.companies[0].id;
      if (s.project.companyId === id) {
        s.project.companyId = void 0;
        s.project.companyName = void 0;
        s.resources = s.resources.map((r) => r.libraryOrigin?.companyId === id ? (() => {
          const { libraryOrigin: _d, ...rest } = r;
          return rest;
        })() : r);
        s.calendars = s.calendars.map((c) => c.libraryOrigin?.companyId === id ? (() => {
          const { libraryOrigin: _d, ...rest } = c;
          return rest;
        })() : c);
        s.calendar = s.calendars.find((c) => c.id === s.project.calendarId) ?? s.calendar;
      }
      for (const d of s.documents) {
        if (!d.payload) continue;
        const payload = d.payload;
        if (payload.project.companyId !== id) continue;
        payload.project = { ...payload.project, companyId: void 0, companyName: void 0 };
        payload.resources = payload.resources.map((r) => r.libraryOrigin?.companyId === id ? (() => {
          const { libraryOrigin: _d, ...rest } = r;
          return rest;
        })() : r);
        payload.calendars = payload.calendars.map((c) => c.libraryOrigin?.companyId === id ? (() => {
          const { libraryOrigin: _d, ...rest } = c;
          return rest;
        })() : c);
        payload.calendar = payload.calendars.find((c) => c.id === payload.project.calendarId) ?? payload.calendar;
      }
    });
    persist(get2);
    if (wasActiveCompany) {
      get2().setUI({ showLibraryLinkDialog: false, libraryRefreshNotice: null });
    }
  },
  countDocumentsLinkedTo: (companyId) => {
    const s = get2();
    let n = s.project.companyId === companyId ? 1 : 0;
    for (const d of s.documents) if (d.payload && d.payload.project.companyId === companyId) n++;
    return n;
  },
  setDefaultCompany: (id) => {
    set2((s) => {
      if (s.companies.some((c) => c.id === id)) s.defaultCompanyId = id;
    });
    persist(get2);
  },
  promoteCalendarToPool: (companyId, calendar) => {
    let newId = null;
    set2((s) => {
      const pool = s.pools[companyId];
      if (!pool) return;
      const id = generateId("cal");
      const { libraryOrigin: _drop, ...rest } = calendar;
      pool.calendars.push({ ...structuredClone(rest), id });
      const bumped = bumpPool(pool);
      s.pools[companyId] = bumped;
      const src = s.calendars.find((c) => c.id === calendar.id);
      if (src) {
        beginUndoable(s);
        const poolCal = bumped.calendars.find((c) => c.id === id);
        src.libraryOrigin = makeOrigin(bumped, id, computeCalendarHash(poolCal));
        syncProjectCalendar(s);
        finishMutation(s);
      }
      newId = id;
    });
    persist(get2);
    get2().refreshAllDocumentsFromPool(companyId);
    return newId;
  },
  promoteResourceToPool: (companyId, resource, opts) => {
    let newId = null;
    const existingPool = opts?.dedupByName ? get2().pools[companyId] : void 0;
    const existingMatch = existingPool ? matchByName(resource.name, existingPool.resources) : null;
    if (existingMatch) {
      let linked = false;
      set2((s) => {
        const idx = s.resources.findIndex((r) => r.id === resource.id);
        if (idx < 0 || s.resources[idx].libraryOrigin) return;
        beginUndoable(s);
        const pool = s.pools[companyId];
        s.resources[idx].libraryOrigin = makeOrigin(pool, existingMatch.id, computeResourceHash(existingMatch));
        finishMutation(s);
        linked = true;
      });
      if (linked) get2().recomputeViewRows();
      return linked ? existingMatch.id : null;
    }
    set2((s) => {
      const pool = s.pools[companyId];
      if (!pool) return;
      const id = generateId("res");
      const { libraryOrigin: _drop, parentId: _p, ...rest } = resource;
      pool.resources.push({ ...structuredClone(rest), id, calendarId: void 0 });
      const bumped = bumpPool(pool);
      s.pools[companyId] = bumped;
      const src = s.resources.find((r) => r.id === resource.id);
      if (src) {
        beginUndoable(s);
        const poolRes = bumped.resources.find((r) => r.id === id);
        src.libraryOrigin = makeOrigin(bumped, id, computeResourceHash(poolRes));
        finishMutation(s);
      }
      newId = id;
    });
    persist(get2);
    get2().recomputeViewRows();
    get2().refreshAllDocumentsFromPool(companyId);
    return newId;
  },
  updatePoolCalendar: (companyId, calendarId, updates) => {
    set2((s) => {
      const pool = s.pools[companyId];
      const idx = pool?.calendars.findIndex((c) => c.id === calendarId) ?? -1;
      if (!pool || idx < 0) return;
      Object.assign(pool.calendars[idx], updates);
      s.pools[companyId] = bumpPool(pool);
    });
    persist(get2);
    get2().refreshAllDocumentsFromPool(companyId);
  },
  updatePoolResource: (companyId, resourceId, updates) => {
    set2((s) => {
      const pool = s.pools[companyId];
      const idx = pool?.resources.findIndex((r) => r.id === resourceId) ?? -1;
      if (!pool || idx < 0) return;
      Object.assign(pool.resources[idx], updates);
      s.pools[companyId] = bumpPool(pool);
    });
    persist(get2);
    get2().refreshAllDocumentsFromPool(companyId);
  },
  removePoolCalendar: (companyId, calendarId) => {
    set2((s) => {
      const pool = s.pools[companyId];
      if (!pool) return;
      pool.calendars = pool.calendars.filter((c) => c.id !== calendarId);
      s.pools[companyId] = bumpPool(pool);
    });
    persist(get2);
    get2().refreshAllDocumentsFromPool(companyId);
  },
  removePoolResource: (companyId, resourceId) => {
    set2((s) => {
      const pool = s.pools[companyId];
      if (!pool) return;
      pool.resources = pool.resources.filter((r) => r.id !== resourceId);
      for (const r of pool.resources) {
        if (r.parentId === resourceId) r.parentId = void 0;
      }
      s.pools[companyId] = bumpPool(pool);
    });
    persist(get2);
    get2().refreshAllDocumentsFromPool(companyId);
  },
  addPoolResource: (companyId, resource) => {
    let newId = null;
    set2((s) => {
      const pool = s.pools[companyId];
      if (!pool) return;
      const id = generateId("res");
      const { libraryOrigin: _o, parentId: _p, calendarId: _c, ...rest } = resource;
      pool.resources.push({ ...structuredClone(rest), id });
      s.pools[companyId] = bumpPool(pool);
      newId = id;
    });
    persist(get2);
    return newId;
  },
  addPoolCalendar: (companyId, calendar) => {
    let newId = null;
    set2((s) => {
      const pool = s.pools[companyId];
      if (!pool) return;
      const id = generateId("cal");
      const { libraryOrigin: _o, ...rest } = calendar;
      pool.calendars.push({ ...structuredClone(rest), id });
      s.pools[companyId] = bumpPool(pool);
      newId = id;
    });
    persist(get2);
    return newId;
  },
  bindProjectToCompany: (companyId) => {
    set2((s) => {
      const company = s.companies.find((c) => c.id === companyId);
      if (!company) return;
      const previous = s.project.companyId;
      const isRebind = !!previous && previous !== companyId;
      if (isRebind) beginUndoable(s);
      s.project.companyId = company.id;
      s.project.companyName = company.name;
      s.project.modifiedAt = (/* @__PURE__ */ new Date()).toISOString();
      if (isRebind) {
        s.resources = s.resources.map((r) => r.libraryOrigin?.companyId === previous ? (() => {
          const { libraryOrigin: _d, ...rest } = r;
          return rest;
        })() : r);
        s.calendars = s.calendars.map((c) => c.libraryOrigin?.companyId === previous ? (() => {
          const { libraryOrigin: _d, ...rest } = c;
          return rest;
        })() : c);
        s.calendar = s.calendars.find((c) => c.id === s.project.calendarId) ?? s.calendar;
      }
      finishMutation(s);
    });
  },
  addLibraryCalendarToProject: (companyId, poolCalendarId) => {
    if (get2().project.companyId !== companyId) {
      appLog.emit("warn", "library", `materialisatie genegeerd: actief project niet aan bedrijf ${companyId} gekoppeld (project=${get2().project.companyId ?? "geen"})`);
      return { added: false, calendarId: null };
    }
    let result = { added: false, calendarId: null };
    set2((s) => {
      const draftPool = s.pools[companyId];
      if (!draftPool) return;
      const pool = current(draftPool);
      const copy = copyCalendarToProject(pool, poolCalendarId, s.calendars, generateId);
      if (!copy) return;
      if (copy.reused) {
        result = { added: false, calendarId: copy.calendar.id };
        return;
      }
      beginUndoable(s);
      s.calendars = [...s.calendars, copy.calendar];
      s.isDirty = true;
      result = { added: true, calendarId: copy.calendar.id };
      finishMutation(s);
    });
    get2().recomputeResourceLoad();
    return result;
  },
  addLibraryResourceToProject: (companyId, poolResourceId) => {
    if (get2().project.companyId !== companyId) {
      appLog.emit("warn", "library", `materialisatie genegeerd: actief project niet aan bedrijf ${companyId} gekoppeld (project=${get2().project.companyId ?? "geen"})`);
      return { added: false, resourceId: null };
    }
    let result = { added: false, resourceId: null };
    set2((s) => {
      const draftPool = s.pools[companyId];
      if (!draftPool) return;
      const pool = current(draftPool);
      const copy = copyResourceToProject(pool, poolResourceId, s.resources, s.calendars, generateId);
      if (!copy) return;
      if (copy.reused) {
        result = { added: false, resourceId: copy.resource.id };
        return;
      }
      beginUndoable(s);
      if (copy.travelingCalendar && !copy.travelingCalendar.reused) {
        s.calendars = [...s.calendars, copy.travelingCalendar.calendar];
      }
      s.resources = [...s.resources, copy.resource];
      result = { added: true, resourceId: copy.resource.id };
      finishMutation(s);
    });
    get2().recomputeResourceLoad();
    get2().recomputeViewRows();
    return result;
  },
  diffProjectCalendar: (calendarId) => {
    const s = get2();
    const cal = s.calendars.find((c) => c.id === calendarId);
    const companyId = cal?.libraryOrigin?.companyId;
    const pool = companyId ? s.pools[companyId] : void 0;
    if (!cal || !cal.libraryOrigin || !pool) return null;
    return diffCalendarVsPool(cal, pool);
  },
  diffProjectResource: (resourceId) => {
    const s = get2();
    const res = s.resources.find((r) => r.id === resourceId);
    const companyId = res?.libraryOrigin?.companyId;
    const pool = companyId ? s.pools[companyId] : void 0;
    if (!res || !res.libraryOrigin || !pool) return null;
    return diffResourceVsPool(res, pool);
  },
  updateProjectCalendarFromLibrary: (calendarId) => {
    set2((s) => {
      const idx = s.calendars.findIndex((c) => c.id === calendarId);
      const cal = idx >= 0 ? s.calendars[idx] : void 0;
      const companyId = cal?.libraryOrigin?.companyId;
      const draftPool = companyId ? s.pools[companyId] : void 0;
      if (!cal || !cal.libraryOrigin || !draftPool) return;
      const pool = current(draftPool);
      const snapCal = current(cal);
      if (diffCalendarVsPool(snapCal, pool).status !== "changed") return;
      beginUndoable(s);
      s.calendars[idx] = applyCalendarUpdate(snapCal, pool);
      syncProjectCalendar(s);
      finishMutation(s, { stale: true });
    });
    get2().recomputeResourceLoad();
  },
  updateProjectResourceFromLibrary: (resourceId) => {
    set2((s) => {
      const idx = s.resources.findIndex((r) => r.id === resourceId);
      const res = idx >= 0 ? s.resources[idx] : void 0;
      const companyId = res?.libraryOrigin?.companyId;
      const draftPool = companyId ? s.pools[companyId] : void 0;
      if (!res || !res.libraryOrigin || !draftPool) return;
      const pool = current(draftPool);
      const snapRes = current(res);
      if (diffResourceVsPool(snapRes, pool).status !== "changed") return;
      beginUndoable(s);
      s.resources[idx] = applyResourceUpdate(snapRes, pool);
      finishMutation(s);
    });
    get2().recomputeResourceLoad();
    get2().recomputeViewRows();
  },
  exportPoolIFC: (companyId) => {
    const pool = get2().pools[companyId];
    return pool ? writePoolIFC(pool) : null;
  },
  replacePool: (companyId, pool) => {
    set2((s) => {
      if (!s.companies.some((c) => c.id === companyId)) return;
      const company = s.companies.find((c) => c.id === companyId);
      const normalized = normalizePool(companyId, pool, s.companies);
      s.pools[companyId] = { ...normalized, companyName: company.name };
    });
    persist(get2);
  },
  importPoolAsNewCompany: (pool) => {
    let newId = "";
    set2((s) => {
      const name = resolveUniqueCompanyName(pool.companyName ?? "", s.companies.map((c) => c.name));
      const fileId = pool.companyId;
      const canKeepFileId = !!fileId && isSafeFileCompanyId(fileId) && !isReservedCompanyId(fileId) && !s.companies.some((c) => c.id === fileId);
      const id = canKeepFileId ? fileId : generateId("company");
      const company = { id, name };
      s.companies.push(company);
      const normalized = normalizePoolShape(id, pool, s.companies);
      s.pools[id] = { ...normalized, companyName: name };
      newId = id;
    });
    persist(get2);
    return newId;
  },
  isLocalPoolNewer: (companyId, imported) => {
    return isPoolNewer(get2().pools[companyId], imported);
  },
  refreshBehindItems: (companyId) => {
    let changed = 0;
    set2((s) => {
      if (s.project.companyId !== companyId || !s.companies.some((c) => c.id === companyId)) return;
      const draftPool = s.pools[companyId];
      if (!draftPool) return;
      const pool = current(draftPool);
      let calChanged = 0;
      const newCalendars = s.calendars.map((cal) => {
        if (cal.libraryOrigin?.companyId !== companyId) return cal;
        if (classifyCalendarOnOpen(current(cal), pool) !== "behind") return cal;
        calChanged++;
        return applyCalendarUpdate(current(cal), pool);
      });
      if (calChanged > 0) s.calendars = newCalendars;
      let resChanged = 0;
      const newResources = s.resources.map((res) => {
        if (res.libraryOrigin?.companyId !== companyId) return res;
        if (classifyResourceOnOpen(current(res), pool) !== "behind") return res;
        resChanged++;
        return applyResourceUpdate(current(res), pool);
      });
      if (resChanged > 0) s.resources = newResources;
      changed = calChanged + resChanged;
      if (changed > 0) {
        s.redoStack = [];
        s.calendar = s.calendars.find((c) => c.id === s.project.calendarId) ?? s.calendar;
        if (calChanged > 0) s.scheduleStale = true;
      }
    });
    if (changed > 0) {
      get2().recomputeResourceLoad();
      get2().recomputeViewRows();
    }
    return changed;
  },
  refreshAllDocumentsFromPool: (companyId) => {
    let changed = 0;
    set2((s) => {
      if (!s.companies.some((c) => c.id === companyId)) return;
      const draftPool = s.pools[companyId];
      if (!draftPool) return;
      const pool = current(draftPool);
      const refreshCalendars = (cals) => {
        let calChanged = 0;
        const items = cals.map((cal) => {
          if (cal.libraryOrigin?.companyId !== companyId) return cal;
          if (classifyCalendarOnOpen(cal, pool) !== "behind") return cal;
          calChanged++;
          return applyCalendarUpdate(cal, pool);
        });
        return { items, calChanged };
      };
      const refreshResources = (ress) => {
        let resChanged = 0;
        const items = ress.map((res) => {
          if (res.libraryOrigin?.companyId !== companyId) return res;
          if (classifyResourceOnOpen(res, pool) !== "behind") return res;
          resChanged++;
          return applyResourceUpdate(res, pool);
        });
        return { items, resChanged };
      };
      if (s.project.companyId === companyId) {
        const cals = refreshCalendars(s.calendars.map((c) => current(c)));
        const ress = refreshResources(s.resources.map((r) => current(r)));
        const docChanged = cals.calChanged + ress.resChanged;
        s.redoStack = [];
        if (docChanged > 0) {
          if (cals.calChanged > 0) s.calendars = cals.items;
          if (ress.resChanged > 0) s.resources = ress.items;
          s.calendar = s.calendars.find((c) => c.id === s.project.calendarId) ?? s.calendar;
          if (cals.calChanged > 0) s.scheduleStale = true;
          changed += docChanged;
        }
      }
      for (const doc of s.documents) {
        if (!doc.payload) continue;
        const payload = doc.payload;
        if (payload.project.companyId !== companyId) continue;
        const cals = refreshCalendars(payload.calendars.map((c) => current(c)));
        const ress = refreshResources(payload.resources.map((r) => current(r)));
        const docChanged = cals.calChanged + ress.resChanged;
        payload.redoStack = [];
        if (docChanged > 0) {
          if (cals.calChanged > 0) {
            payload.calendars = cals.items;
            payload.calendar = payload.calendars.find((c) => c.id === payload.project.calendarId) ?? payload.calendar;
          }
          if (ress.resChanged > 0) payload.resources = ress.items;
          if (cals.calChanged > 0) payload.scheduleStale = true;
          changed += docChanged;
        }
      }
    });
    if (changed > 0) {
      get2().recomputeResourceLoad();
      get2().recomputeViewRows();
    }
    return changed;
  },
  runOpenBoundary: () => {
    const s0 = get2();
    const companyId = s0.project.companyId;
    if (!companyId || !s0.companies.some((c) => c.id === companyId) || !s0.pools[companyId]) {
      get2().setUI({ showLibraryLinkDialog: false, libraryRefreshNotice: null });
      return { refreshed: 0, deviated: 0, removed: 0 };
    }
    let deviated = 0;
    let removed = 0;
    for (const r of s0.resources) {
      if (r.libraryOrigin?.companyId !== companyId) continue;
      const st = classifyResourceOnOpen(r, s0.pools[companyId]);
      if (st === "deviated") deviated++;
      else if (st === "removed") removed++;
    }
    for (const c of s0.calendars) {
      if (c.libraryOrigin?.companyId !== companyId) continue;
      const st = classifyCalendarOnOpen(c, s0.pools[companyId]);
      if (st === "deviated") deviated++;
      else if (st === "removed") removed++;
    }
    const refreshed = get2().refreshBehindItems(companyId);
    get2().setUI({ showLibraryLinkDialog: deviated > 0, libraryRefreshNotice: refreshed > 0 ? refreshed : null });
    return { refreshed, deviated, removed };
  },
  onOpenStatusForResource: (resourceId) => {
    const s = get2();
    const res = s.resources.find((r) => r.id === resourceId);
    const companyId = res?.libraryOrigin?.companyId;
    if (!res || !companyId || companyId !== s.project.companyId || !s.companies.some((c) => c.id === companyId)) return null;
    const pool = s.pools[companyId];
    return pool ? classifyResourceOnOpen(res, pool) : null;
  },
  onOpenStatusForCalendar: (calendarId) => {
    const s = get2();
    const cal = s.calendars.find((c) => c.id === calendarId);
    const companyId = cal?.libraryOrigin?.companyId;
    if (!cal || !companyId || companyId !== s.project.companyId || !s.companies.some((c) => c.id === companyId)) return null;
    const pool = s.pools[companyId];
    return pool ? classifyCalendarOnOpen(cal, pool) : null;
  },
  computeRecognition: () => {
    const s = get2();
    const companyId = s.project.companyId;
    if (!companyId || !s.companies.some((c) => c.id === companyId)) return [];
    const pool = s.pools[companyId];
    if (!pool) return [];
    const out = [];
    for (const r of s.resources) {
      if (r.libraryOrigin) continue;
      const m = matchByName(r.name, pool.resources);
      out.push({ kind: "resource", projectId: r.id, projectName: r.name, suggestedPoolId: m?.id ?? null, suggestedPoolName: m?.name ?? null });
    }
    for (const c of s.calendars) {
      if (c.libraryOrigin) continue;
      const m = matchByName(c.name, pool.calendars);
      out.push({ kind: "calendar", projectId: c.id, projectName: c.name, suggestedPoolId: m?.id ?? null, suggestedPoolName: m?.name ?? null });
    }
    return out;
  },
  linkRecognizedItems: (links) => {
    set2((s) => {
      const companyId = s.project.companyId;
      if (!companyId) return;
      const draftPool = s.pools[companyId];
      if (!draftPool) return;
      const pool = current(draftPool);
      const anyApplicable = links.some((link) => link.kind === "resource" ? pool.resources.some((r) => r.id === link.poolId) : pool.calendars.some((c) => c.id === link.poolId));
      if (!anyApplicable) return;
      beginUndoable(s);
      let calendarLinked = false;
      for (const link of links) {
        if (link.kind === "resource") {
          if (!pool.resources.some((r) => r.id === link.poolId)) continue;
          const idx = s.resources.findIndex((r) => r.id === link.projectId);
          if (idx < 0) continue;
          const stamped = { ...current(s.resources[idx]), libraryOrigin: makeOrigin(pool, link.poolId) };
          s.resources[idx] = applyResourceUpdate(stamped, pool);
        } else {
          if (!pool.calendars.some((c) => c.id === link.poolId)) continue;
          const idx = s.calendars.findIndex((c) => c.id === link.projectId);
          if (idx < 0) continue;
          const stamped = { ...current(s.calendars[idx]), libraryOrigin: makeOrigin(pool, link.poolId) };
          s.calendars[idx] = applyCalendarUpdate(stamped, pool);
          calendarLinked = true;
        }
      }
      s.calendar = s.calendars.find((c) => c.id === s.project.calendarId) ?? s.calendar;
      finishMutation(s, { stale: calendarLinked });
    });
    get2().recomputeResourceLoad();
    get2().recomputeViewRows();
  },
  unbindProject: () => {
    set2((s) => {
      if (!s.project.companyId) return;
      beginUndoable(s);
      s.project.companyId = void 0;
      s.project.companyName = void 0;
      s.resources = s.resources.map((r) => {
        const { libraryOrigin: _d, ...rest } = r;
        return rest;
      });
      s.calendars = s.calendars.map((c) => {
        const { libraryOrigin: _d, ...rest } = c;
        return rest;
      });
      s.calendar = s.calendars.find((c) => c.id === s.project.calendarId) ?? { ...s.calendar };
      finishMutation(s);
    });
    get2().recomputeResourceLoad();
    get2().recomputeViewRows();
  },
  resolveDeviation: (ref2, choice) => {
    const companyId = get2().project.companyId;
    if (!companyId) return;
    if (choice === "company") {
      set2((s) => {
        const draftPool = s.pools[companyId];
        if (!draftPool) return;
        const pool = current(draftPool);
        if (ref2.kind === "resource") {
          const idx = s.resources.findIndex((r) => r.id === ref2.projectId);
          if (idx < 0 || diffResourceVsPool(current(s.resources[idx]), pool).status !== "changed") return;
          s.resources[idx] = applyResourceUpdate(current(s.resources[idx]), pool);
        } else {
          const idx = s.calendars.findIndex((c) => c.id === ref2.projectId);
          if (idx < 0 || diffCalendarVsPool(current(s.calendars[idx]), pool).status !== "changed") return;
          s.calendars[idx] = applyCalendarUpdate(current(s.calendars[idx]), pool);
          s.calendar = s.calendars.find((c) => c.id === s.project.calendarId) ?? s.calendar;
          s.scheduleStale = true;
        }
        s.redoStack = [];
      });
      get2().recomputeResourceLoad();
      get2().recomputeViewRows();
      return;
    }
    set2((s) => {
      const draftPool = s.pools[companyId];
      if (!draftPool) return;
      if (ref2.kind === "resource") {
        const rIdx = s.resources.findIndex((r) => r.id === ref2.projectId);
        if (rIdx < 0) return;
        const item = current(s.resources[rIdx]);
        const libId = item.libraryOrigin?.libraryItemId;
        const pIdx = libId ? draftPool.resources.findIndex((r) => r.id === libId) : -1;
        if (pIdx < 0) return;
        for (const f of RESOURCE_DIFF_FIELDS) draftPool.resources[pIdx][f] = item[f];
        const bumped = bumpPool(draftPool);
        s.pools[companyId] = bumped;
        const newHash = computeResourceHash(bumped.resources[pIdx]);
        s.resources[rIdx] = { ...item, libraryOrigin: makeOrigin(bumped, libId, newHash) };
      } else {
        const cIdx = s.calendars.findIndex((c) => c.id === ref2.projectId);
        if (cIdx < 0) return;
        const item = current(s.calendars[cIdx]);
        const libId = item.libraryOrigin?.libraryItemId;
        const pIdx = libId ? draftPool.calendars.findIndex((c) => c.id === libId) : -1;
        if (pIdx < 0) return;
        for (const f of CALENDAR_DIFF_FIELDS) draftPool.calendars[pIdx][f] = item[f];
        const bumped = bumpPool(draftPool);
        s.pools[companyId] = bumped;
        const newHash = computeCalendarHash(bumped.calendars[pIdx]);
        s.calendars[cIdx] = { ...item, libraryOrigin: makeOrigin(bumped, libId, newHash) };
        s.calendar = s.calendars.find((c) => c.id === s.project.calendarId) ?? s.calendar;
      }
      s.redoStack = [];
    });
    persist(get2);
    get2().refreshAllDocumentsFromPool(companyId);
  },
  unlinkResourceFromLibrary: (resourceId) => {
    set2((s) => {
      const idx = s.resources.findIndex((r) => r.id === resourceId);
      if (idx < 0 || !s.resources[idx].libraryOrigin) return;
      beginUndoable(s);
      const calendarId = s.resources[idx].calendarId;
      const { libraryOrigin: _drop, ...rest } = s.resources[idx];
      s.resources[idx] = rest;
      if (calendarId) {
        const calIdx = s.calendars.findIndex((c) => c.id === calendarId);
        const cal = calIdx >= 0 ? s.calendars[calIdx] : void 0;
        if (cal?.libraryOrigin) {
          const stillFollowed = s.resources.some(
            (r) => r.id !== resourceId && r.calendarId === calendarId && !!r.libraryOrigin
          );
          if (!stillFollowed) {
            const { libraryOrigin: _calDrop, ...calRest } = cal;
            s.calendars[calIdx] = calRest;
            s.calendar = s.calendars.find((c) => c.id === s.project.calendarId) ?? s.calendar;
          }
        }
      }
      finishMutation(s);
    });
  }
});

// src/state/appStore.ts
enableMapSet();
var useAppStore = create()(
  immer2((...a) => ({
    ...createProjectSlice(...a),
    ...createTaskSlice(...a),
    ...createSequenceSlice(...a),
    ...createResourceSlice(...a),
    ...createScheduleSlice(...a),
    ...createHistorySlice(...a),
    ...createViewSlice(...a),
    ...createUiSlice(...a),
    ...createFileSlice(...a),
    ...createExtensionSlice(...a),
    ...createDocumentSlice(...a),
    ...createStructureSlice(...a),
    ...createBaselineSlice(...a),
    ...createLibrarySlice(...a)
  }))
);

// src/engine/renderer/themePalette.ts
function cssVarReader() {
  const s = getComputedStyle(document.documentElement);
  return (name, fallback) => s.getPropertyValue(name).trim() || fallback;
}
var BRAND = {
  critical: "#DC2626",
  // kritiek (rood)
  criticalLight: "#991B1B",
  // voortgangsvulling kritiek
  nearCritical: "#F59E0B",
  // bijna-kritiek (amber, fase 2.9 §5.4)
  hammock: "#0E7490",
  // hammock/LOE-balk (teal, fase 2.9 §5.3)
  normal: "#2563EB",
  // normale taak (blauw)
  normalLight: "#1D4ED8",
  // voortgangsvulling / voltooid (blauw)
  milestone: "#7C3AED",
  // mijlpaal (paars, ruit)
  baseline: "#6B7280",
  // baseline-onderbalk (grijs)
  dependency: "#6B7280",
  // afhankelijkheidspijl (grijs)
  summary: "#475569",
  // samenvattingsbalk (slate)
  ghost: "#94A3B8",
  // externe (cross-project) ghost-balk (grijs, fase 2.9 §5.5)
  constraintEarly: "#3B82F6",
  // vroege-zijde constraint (SNET/FNET): blauw
  constraintLate: "#8B5CF6",
  // late-zijde/pinnende constraint (SNLT/FNLT/MSO/MFO): violet
  deadlineOk: "#10B981",
  // deadline-marker (groen; rood bij overschrijding)
  tracePred: "#F59E0B",
  // path tracing: voorganger (goud)
  tracePredDriving: "#D97706",
  // path tracing: driving voorganger (donkerder goud)
  traceSucc: "#A78BFA",
  // path tracing: opvolger (paars)
  traceSuccDriving: "#7C3AED"
  // path tracing: driving opvolger (donkerder paars)
};
var FLOAT_PATH_TINTS = [
  BRAND.normal,
  BRAND.milestone,
  "#0891B2",
  "#DB2777",
  "#65A30D",
  "#EA580C",
  "#0D9488",
  "#9333EA"
];
function readGanttPalette() {
  const v = cssVarReader();
  return {
    // De Gantt leeft in een witte zwevende kaart, dus de canvas-achtergrond leest het kaart-
    // oppervlak (--theme-surface), NIET de werkruimte-tint (--theme-bg).
    bg: v("--theme-surface", "#ffffff"),
    surface: v("--theme-surface-alt", "#F6F8FB"),
    grid: v("--theme-border-light", "#EDF0F5"),
    gridWeekend: v("--theme-grid-weekend", "#EFF2F7"),
    border: v("--theme-border", "#E2E7EE"),
    text: v("--theme-text", "#333845"),
    textSecondary: v("--theme-text-dim", "#5B6472"),
    critical: BRAND.critical,
    criticalLight: BRAND.criticalLight,
    nearCritical: BRAND.nearCritical,
    hammock: BRAND.hammock,
    normal: BRAND.normal,
    normalLight: BRAND.normalLight,
    milestone: BRAND.milestone,
    float: v("--theme-bar-float", "#059669"),
    baseline: BRAND.baseline,
    complete: BRAND.normalLight,
    // '#1D4ED8', zelfde hex als normalLight
    selected: v("--theme-accent", "#B45309"),
    dependency: BRAND.dependency,
    today: v("--theme-accent", "#B45309"),
    // statusdatum-/voortgangslijn: accent-oranje, zelfde bron als today/selected (fase 2.6)
    statusDate: v("--theme-accent", "#B45309"),
    headerBg: v("--theme-surface-alt", "#F6F8FB"),
    summary: BRAND.summary,
    ghost: BRAND.ghost,
    constraintEarly: BRAND.constraintEarly,
    constraintLate: BRAND.constraintLate,
    deadlineOk: BRAND.deadlineOk,
    tracePred: BRAND.tracePred,
    tracePredDriving: BRAND.tracePredDriving,
    traceSucc: BRAND.traceSucc,
    traceSuccDriving: BRAND.traceSuccDriving,
    floatPathTints: FLOAT_PATH_TINTS,
    barText: "#ffffff"
  };
}
var PRINT_PALETTE = {
  bg: "#ffffff",
  surface: "#f8f9fa",
  grid: "#e5e7eb",
  gridWeekend: "#f0f1f3",
  gridHoliday: "#fef3c7",
  border: "#d1d5db",
  borderDark: "#9ca3af",
  text: "#111827",
  textSecondary: "#6b7280",
  critical: BRAND.critical,
  // '#DC2626'
  criticalDark: "#991b1b",
  normal: BRAND.normal,
  // '#2563EB'
  normalDark: "#1d4ed8",
  milestone: BRAND.milestone,
  // '#7C3AED'
  float: "#10B981",
  dependency: "#9CA3AF",
  today: "#F59E0B",
  headerBg: "#f1f5f9",
  summary: BRAND.milestone,
  // '#7C3AED' — print-samenvatting is violet (zelfde hex als mijlpaal)
  rowEven: "#f9fafb",
  rowOdd: "#ffffff"
};

// src/engine/renderer/timeAxis.ts
var MS_PER_DAY2 = 864e5;
function dateToX(date, viewStart, taskTableWidth, zoom, scrollX) {
  const daysFromStart = (date.getTime() - viewStart.getTime()) / MS_PER_DAY2;
  return taskTableWidth + daysFromStart * zoom - scrollX;
}
function xToDayOffset(x, taskTableWidth, zoom, scrollX) {
  return (x - taskTableWidth + scrollX) / zoom;
}
function xToDate(x, viewStart, taskTableWidth, zoom, scrollX) {
  const days = xToDayOffset(x, taskTableWidth, zoom, scrollX);
  return new Date(viewStart.getTime() + days * MS_PER_DAY2);
}

// src/engine/renderer/workdayAxis.ts
function buildCalendarAxis(options) {
  const { origin, taskTableWidth, zoom, scrollX } = options;
  return {
    dateToX: (date) => dateToX(date, origin, taskTableWidth, zoom, scrollX),
    xToDate: (x) => xToDate(x, origin, taskTableWidth, zoom, scrollX),
    daySpan: (from, to) => (to.getTime() - from.getTime()) / MS_PER_DAY2,
    dayIndexOf: (date) => (date.getTime() - origin.getTime()) / MS_PER_DAY2,
    dateAtIndex: (index) => new Date(origin.getTime() + index * MS_PER_DAY2)
  };
}
function utcDayIndex(date) {
  return Math.floor(date.getTime() / MS_PER_DAY2);
}
function dateFromUtcDayIndex(dayIdx) {
  return new Date(dayIdx * MS_PER_DAY2);
}
var EPOCH = /* @__PURE__ */ new Date(0);
var DEFAULT_INITIAL_PADDING_DAYS = 30;
var GROWTH_CHUNK_DAYS = 400;
var MAX_WINDOW_DAYS = 5e4;
function buildWorkdayAxis(options) {
  const { calendar, origin, taskTableWidth, zoom, scrollX } = options;
  const initialPadding = options.initialPaddingDays ?? DEFAULT_INITIAL_PADDING_DAYS;
  if (!calendar.hasWorkingDays()) {
    throw new Error(
      "buildWorkdayAxis: kalender heeft geen enkele werkdag (hasWorkingDays()===false) \u2014 de werkdagen-as kan niet gebouwd worden. Val terug op buildCalendarAxis()."
    );
  }
  let windowStart = 0;
  let windowEnd = -1;
  let prefix = new Uint32Array(0);
  let workDayList = [];
  let preWindowCount = 0;
  function buildWindow(start, end) {
    const len = end - start + 1;
    const nextPrefix = new Uint32Array(len);
    const nextWorkDayList = [];
    let count = 0;
    for (let k = 0; k < len; k++) {
      const dIdx = start + k;
      if (dIdx >= 0 && calendar.isWorkDay(dateFromUtcDayIndex(dIdx))) {
        count++;
        nextWorkDayList.push(dIdx);
      }
      nextPrefix[k] = count;
    }
    windowStart = start;
    windowEnd = end;
    prefix = nextPrefix;
    workDayList = nextWorkDayList;
    preWindowCount = start > 0 ? calendar.workDaysBetween(EPOCH, dateFromUtcDayIndex(start - 1)) : 0;
  }
  buildWindow(utcDayIndex(origin) - initialPadding, utcDayIndex(origin) + initialPadding);
  function ensureContainsDay(dayIdx) {
    if (dayIdx >= windowStart && dayIdx <= windowEnd) return true;
    let newStart = windowStart;
    let newEnd = windowEnd;
    if (dayIdx < newStart) newStart = dayIdx - GROWTH_CHUNK_DAYS;
    if (dayIdx > newEnd) newEnd = dayIdx + GROWTH_CHUNK_DAYS;
    if (newEnd - newStart + 1 > MAX_WINDOW_DAYS) return false;
    buildWindow(newStart, newEnd);
    return true;
  }
  function countThroughDay(dayIdx) {
    if (ensureContainsDay(dayIdx)) {
      return preWindowCount + prefix[dayIdx - windowStart];
    }
    return calendar.workDaysBetween(EPOCH, dateFromUtcDayIndex(dayIdx));
  }
  function workdayIndexOfDay(dayIdx) {
    const isWork = calendar.isWorkDay(dateFromUtcDayIndex(dayIdx));
    return countThroughDay(dayIdx) - (isWork ? 1 : 0);
  }
  function intraDayFraction(date, dayIdx) {
    if (!calendar.isWorkDay(date)) return 0;
    const dayStartMs = dayIdx * MS_PER_DAY2;
    return (date.getTime() - dayStartMs) / MS_PER_DAY2;
  }
  function fractionalIndexOf(date) {
    const dIdx = utcDayIndex(date);
    return workdayIndexOfDay(dIdx) + intraDayFraction(date, dIdx);
  }
  const originIndex = fractionalIndexOf(origin);
  function dayAtWorkdayIndex(index) {
    while (index < preWindowCount || index >= preWindowCount + workDayList.length) {
      const needForward = index >= preWindowCount + workDayList.length;
      const newStart = needForward ? windowStart : windowStart - GROWTH_CHUNK_DAYS;
      const newEnd = needForward ? windowEnd + GROWTH_CHUNK_DAYS : windowEnd;
      if (newEnd - newStart + 1 > MAX_WINDOW_DAYS) {
        return utcDayIndex(calendar.addWorkDays(EPOCH, index + 1));
      }
      buildWindow(newStart, newEnd);
    }
    return workDayList[index - preWindowCount];
  }
  const axis = {
    dateToX(date) {
      const idx = fractionalIndexOf(date);
      return taskTableWidth + (idx - originIndex) * zoom - scrollX;
    },
    xToDate(x) {
      const floatIdx = (x - taskTableWidth + scrollX) / zoom + originIndex;
      const wholeIdx = Math.floor(floatIdx);
      const frac = floatIdx - wholeIdx;
      const dayIdx = dayAtWorkdayIndex(wholeIdx);
      return new Date(dayIdx * MS_PER_DAY2 + frac * MS_PER_DAY2);
    },
    daySpan(from, to) {
      return fractionalIndexOf(to) - fractionalIndexOf(from);
    },
    dayIndexOf(date) {
      return fractionalIndexOf(date);
    },
    dateAtIndex(index) {
      const wholeIdx = Math.floor(index);
      const frac = index - wholeIdx;
      const dayIdx = dayAtWorkdayIndex(wholeIdx);
      return new Date(dayIdx * MS_PER_DAY2 + frac * MS_PER_DAY2);
    }
  };
  return axis;
}
function isCompressedEffective(calendar, compressNonWorkdays) {
  return compressNonWorkdays && calendar.hasWorkingDays();
}
function resolveGanttAxis(options) {
  const { calendar, compressNonWorkdays, origin, taskTableWidth, zoom, scrollX } = options;
  if (compressNonWorkdays) {
    if (calendar.hasWorkingDays()) {
      return buildWorkdayAxis({ calendar, origin, taskTableWidth, zoom, scrollX });
    }
    console.warn(
      "compressNonWorkdays: de kalender heeft geen enkele werkdag \u2014 val terug op de kalender-as (issue #21 punt 5, randgeval \xA79.4)."
    );
  }
  return buildCalendarAxis({ origin, taskTableWidth, zoom, scrollX });
}

// src/engine/renderer/GanttRenderer.ts
var FALLBACK_FONT_STACK = "-apple-system, BlinkMacSystemFont, sans-serif";
var EMPTY_SPANS = new Float64Array(0);
var nearCriticalHatch = null;
function getNearCriticalHatch(ctx) {
  if (nearCriticalHatch) return nearCriticalHatch;
  const size2 = 8;
  const tile = document.createElement("canvas");
  tile.width = size2;
  tile.height = size2;
  const p = tile.getContext("2d");
  if (!p) return null;
  p.fillStyle = "rgba(0,0,0,0.82)";
  p.fillRect(0, 0, size2 / 2, size2 / 2);
  p.fillRect(size2 / 2, size2 / 2, size2 / 2, size2 / 2);
  nearCriticalHatch = ctx.createPattern(tile, "repeat");
  return nearCriticalHatch;
}
var GanttRenderer = class _GanttRenderer {
  ctx;
  opts;
  colors;
  // Computed
  viewStart;
  // Rijmodel (fase 2.7, §4): de meegegeven gedeelde `viewRows`. Een rij is een taak-rij
  // (met depth/dimmed) of een bandkop-rij (`kind:'group'`). Alle hit-tests lopen via
  // getTaskAtY/getRowAtY en geven op een bandrij null/de bandrij terug, zodat
  // canvas-interacties vanzelf degraderen.
  rows;
  rowIndexByTask;
  // task id -> EERSTE rij-index (§7.1, pijlen)
  /** Engine op de PROJECTkalender — enige bron voor de niet-werkdag-arcering van de grid
   *  (weekpatroon + feestdagen, B2): geen hardcoded za/zo en geen eigen holiday-expansie meer. */
  projectEngine;
  violatedSet;
  missedDeadlineSet;
  highContrast;
  /** Issue #21 punt 5 (fase 2): de gekozen tijd-as (kalender- of werkdagen-, §2.1). Fresh per
   *  render — zie `workdayAxis.ts` §2.2/§2.5 (geen cross-render cache). */
  axis;
  /** Is de as DAADWERKELIJK gecomprimeerd (vlag AAN én de kalender heeft werkdagen, §9.4-guard)?
   *  Stuurt de grid-/arceringkeuze in `drawGridBackground` (§4.2: geen niet-werkdagen ⇒ geen
   *  arcering, geen dubbele rasterlijnen op de samengevallen naad-x). */
  compressed;
  /** Alpha voor gedimde rijen (filter-ouderketen, §4.2). */
  static DIM_ALPHA = 0.45;
  /** Fase 2.8b: per-kalender-id gecachete `CalendarEngine` voor de balk-opsplitsing (§6.9). De
   *  band-materialisatie zelf is gememoized op het kalender-OBJECT (WeakMap), dus deze cache
   *  voorkomt alleen herhaalde engine-constructie binnen één render. */
  engineCache = /* @__PURE__ */ new Map();
  constructor(ctx, opts) {
    this.ctx = ctx;
    this.opts = opts;
    this.colors = opts.palette ?? readGanttPalette();
    this.viewStart = parseDate(opts.view.viewStartDate);
    this.rows = opts.rows;
    this.rowIndexByTask = firstRowIndexByTask(opts.rows);
    this.projectEngine = new CalendarEngine(opts.calendar);
    this.engineCache.set(opts.calendar.id, this.projectEngine);
    this.violatedSet = new Set(opts.violatedConstraintTaskIds ?? []);
    this.missedDeadlineSet = new Set(opts.missedDeadlineTaskIds ?? []);
    this.highContrast = !!opts.highContrast;
    this.axis = opts.axis ?? resolveGanttAxis({
      calendar: this.projectEngine,
      compressNonWorkdays: !!opts.compressNonWorkdays,
      origin: this.viewStart,
      taskTableWidth: opts.taskTableWidth,
      zoom: opts.view.zoom,
      scrollX: opts.view.scrollX
    });
    this.compressed = isCompressedEffective(this.projectEngine, !!opts.compressNonWorkdays);
  }
  /** Bouwt een `ctx.font`-string in de gekozen interface-lettertypefamilie (issue #25 punt 4).
   *  Enige plek waar deze renderer een font-stack samenstelt — vroeger stonden er 17 letterlijke
   *  `ctx.font`-strings verspreid door het bestand, die per definitie uit de pas liepen zodra de
   *  familie instelbaar werd.
   *
   *  BEWUST NIET: de GROOTTE meeschalen met `ui.uiFontScale`. De canvas-geometrie ligt vast —
   *  `ROW_HEIGHT = 28` (GanttCanvas), balkhoogtes, kolombreedtes en de headerbanden zijn constanten
   *  in px. Grotere tekst zou dus niet "groter renderen" maar clippen en over rij-/balkranden heen
   *  lopen. Meeschalen kan pas als de rijhoogte en balkgeometrie zelf van de schaal afgeleid worden;
   *  dat is een aparte, veel grotere ingreep. Verander dit hier dus niet los. */
  font(sizePx, bold = false) {
    return `${bold ? "bold " : ""}${sizePx}px ${this.opts.fontFamily ?? FALLBACK_FONT_STACK}`;
  }
  /** Basis-balkkleur (fase 2.9 §5.4): kritiek-rood ≻ near-critical-amber ≻ float-path-tint ≻
   *  eigen kleur/normaal-blauw. `overrideColor` (trace-tint) wint altijd. Near-critical en de
   *  float-path-tint zijn analyse-overlays die alleen bestaan wanneer hun optie aanstaat ⇒ default
   *  byte-identiek (`isNearCritical`/`floatPath` afwezig). */
  barColor(task, overrideColor) {
    if (overrideColor) return overrideColor;
    if (task.time.isCritical) return this.colors.critical;
    if (task.time.isNearCritical) return this.colors.nearCritical;
    const fp = task.time.floatPath;
    if (fp !== void 0 && fp > 1) {
      const tints = this.colors.floatPathTints;
      return tints[(fp - 2) % tints.length];
    }
    return task.color || this.colors.normal;
  }
  /**
   * Duurkolom-tekst (§6.5). Urenplanning UIT ⇒ byte-identiek het huidige `${scheduleDuration}d`.
   * AAN ⇒ de eigen eenheid per taak via de Duurweergave-instelling (dag-taak "3d", uur-taak "20u").
   */
  durationText(task) {
    if (task.isMilestone) return "0d";
    if (!this.opts.enableHourPlanning) return `${task.time.scheduleDuration}d`;
    const cal = this.opts.effectiveCalById?.get(task.id) ?? this.opts.calendar;
    return formatDuration(taskDurationMinutes(task, cal), effHoursPerDay(cal), this.opts.durationDisplay ?? "auto", this.opts.durationSuffixes);
  }
  /** Kapt tekst af met een ellipsis zodra hij niet in `maxWidth` past (issue #38 punt 5): de
   *  taaktabel-kopteksten (WBS/Taaknaam/Duur) mogen nooit buiten hun kolom in de Gantt-zone
   *  lopen — vertalingen zoals DE "Dauer"/FR "Durée" kunnen breder zijn dan de gegokte offset
   *  die hier voorheen stond. Meet met het al ingestelde `ctx.font`, dus vóór het aanroepen
   *  moet de juiste font/grootte al gezet zijn. Zelfde aanpak als HistogramRenderer.truncate. */
  truncate(text, maxWidth) {
    const ctx = this.ctx;
    if (ctx.measureText(text).width <= maxWidth) return text;
    let t = text;
    while (t.length > 1 && ctx.measureText(t + "\u2026").width > maxWidth) t = t.slice(0, -1);
    return t + "\u2026";
  }
  /** Convert a date (with optional sub-day precision) to X position on canvas.
   *  Issue #21 punt 5 (fase 2): het ENE as-chokepoint (ontwerp §2.1/§10) — nu `this.axis.dateToX`
   *  i.p.v. rechtstreeks `timeAxis.dateToX`. Toggle uit ⇒ `this.axis` ís de kalender-as (dunne
   *  wrapper om exact dezelfde `axisDateToX`-aanroep, zie `buildCalendarAxis`) ⇒ byte-identiek.
   *  Alle 30+ bestaande call-sites (grid, balken, pijlen, mijlpalen, header, …) werken ongewijzigd
   *  door dit ene punt. */
  dateToX(date) {
    return this.axis.dateToX(date);
  }
  /** Convert task row index to Y position */
  rowToY(rowIndex) {
    return this.opts.headerHeight + rowIndex * this.opts.rowHeight - this.opts.view.scrollY;
  }
  // ── Fase 2.8b: uur-bewuste balkgeometrie (§6.1) ────────────────────────────
  // Discriminator: een taak is UUR-modus zodra zijn (early/schedule-)datumstring een tijdcomponent
  // ('T') draagt — precies wat `formatInstant('hour')` emitteert (§2.4). Dag-taken (YYYY-MM-DD)
  // vallen dus ALTIJD op het bestaande dag-pad (`parseDate` + één dag breedte) ⇒ bit-identiek.
  /** Balk-uiteinden voor een taak. Uur-taak: `[dateToX(start), dateToX(finish))` (geen +dag, §6.1).
   *  Dag-taak: `[dateToX(start), dateToX(finish)+zoom)` (inclusieve eind-dag, ongewijzigd). */
  barGeometry(task) {
    const startStr = task.time.earlyStart || task.time.scheduleStart;
    const endStr = task.time.earlyFinish || task.time.scheduleFinish;
    const hourMode = startStr.includes("T") || endStr.includes("T");
    const start = hourMode ? parseInstant(startStr) : parseDate(startStr);
    const end = hourMode ? parseInstant(endStr) : parseDate(endStr);
    const x1 = this.dateToX(start);
    const x2 = hourMode ? this.dateToX(end) : this.dateToX(end) + this.opts.view.zoom;
    return { x1, x2, hourMode, start, end };
  }
  /** De effectieve `CalendarEngine` voor een taak (uur-modus), of null als de taak op een
   *  dag-kalender staat / geen kalendermap is meegegeven — dan wordt er niet opgesplitst. */
  engineFor(task) {
    const cal = this.opts.effectiveCalById?.get(task.id) ?? this.opts.calendar;
    if (!isHourCalendar(cal)) return null;
    let eng = this.engineCache.get(cal.id);
    if (!eng) {
      eng = new CalendarEngine(cal);
      this.engineCache.set(cal.id, eng);
    }
    return eng;
  }
  /** Of een uur-taakbalk in werkblok-segmenten wordt getekend (§6.9): 'always' ⇒ altijd,
   *  'selection' ⇒ alleen als de taak geselecteerd is, 'never' ⇒ nooit. */
  shouldSplit(isSelected) {
    const mode = this.opts.barSplitMode ?? "selection";
    return mode === "always" || mode === "selection" && isSelected;
  }
  render() {
    const { canvasWidth, canvasHeight } = this.opts;
    const ctx = this.ctx;
    ctx.fillStyle = this.colors.bg;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    this.drawGridBackground();
    this.drawTodayLine();
    this.drawStatusDateLine();
    this.drawDependencyArrows();
    this.drawTaskBars();
    this.drawHolidayLabels();
    this.drawProgressLine();
    this.drawDragDurationBadge();
    this.drawTimelineHeader();
    this.drawTaskTable();
  }
  drawGridBackground() {
    const { canvasWidth, canvasHeight, headerHeight, view } = this.opts;
    const ctx = this.ctx;
    const visibleDays = Math.ceil(canvasWidth / view.zoom) + 2;
    const startOffset = Math.floor(xToDayOffset(this.opts.taskTableWidth, this.opts.taskTableWidth, view.zoom, view.scrollX));
    if (this.compressed) {
      const axisStartIndex = Math.floor(this.axis.dayIndexOf(this.viewStart) + view.scrollX / view.zoom);
      for (let i = -1; i < visibleDays; i++) {
        const date = this.axis.dateAtIndex(axisStartIndex + i);
        const x = this.axis.dateToX(date);
        const dayOfWeek = isoDayOfWeek(date);
        ctx.strokeStyle = this.colors.grid;
        ctx.lineWidth = dayOfWeek === (this.opts.weekStartDay === "sunday" ? 7 : 1) ? 1 : 0.5;
        ctx.beginPath();
        ctx.moveTo(x, headerHeight);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
      }
    } else {
      for (let i = -1; i < visibleDays; i++) {
        const date = addCalendarDays(this.viewStart, startOffset + i);
        const x = this.dateToX(date);
        const dayOfWeek = isoDayOfWeek(date);
        if (!this.projectEngine.isWorkDay(date)) {
          ctx.fillStyle = this.colors.gridWeekend;
          ctx.fillRect(x, headerHeight, view.zoom, canvasHeight - headerHeight);
        }
        ctx.strokeStyle = this.colors.grid;
        ctx.lineWidth = dayOfWeek === (this.opts.weekStartDay === "sunday" ? 7 : 1) ? 1 : 0.5;
        ctx.beginPath();
        ctx.moveTo(x, headerHeight);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
      }
    }
    for (let i = 0; i < this.rows.length + 1; i++) {
      const y = this.rowToY(i);
      if (y < headerHeight || y > canvasHeight) continue;
      ctx.strokeStyle = this.colors.grid;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvasWidth, y);
      ctx.stroke();
    }
  }
  /**
   * Naamlabel bij meerdaagse feestdagblokken (fase 2.8a, §6.2 — 2.5-QA-verhaal: een 5-daagse
   * taak leek een "opgerekte balk van vier weken" zonder dat de bouwvak-arcering zich verklaarde).
   * De arcering zelf blijft uitsluitend de projectkalender (§6.1); deze pass tekent alleen een
   * naam bovenop bestaande feestdagblokken die breder zijn dan ~3× de dagbreedte (te smal ⇒ geen
   * label, voorkomt onleesbare rommel bij losse enkele-dag-feestdagen). Horizontaal gecentreerd
   * bij voldoende breedte, anders verticaal (90°) langs de linkerrand van het blok.
   */
  drawHolidayLabels() {
    if (this.compressed) return;
    const { canvasWidth, canvasHeight, headerHeight, taskTableWidth, view } = this.opts;
    const zoom = view.zoom;
    const minWidthPx = zoom * 3;
    const ctx = this.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.rect(taskTableWidth, headerHeight, Math.max(0, canvasWidth - taskTableWidth), Math.max(0, canvasHeight - headerHeight));
    ctx.clip();
    ctx.fillStyle = this.colors.textSecondary;
    for (const h of this.opts.calendar.holidays) {
      const start = parseDate(h.startDate);
      const end = parseDate(h.endDate);
      const days = diffCalendarDays(start, end) + 1;
      const widthPx = days * zoom;
      if (widthPx < minWidthPx) continue;
      const x1 = this.dateToX(start);
      const x2 = x1 + widthPx;
      if (x2 < taskTableWidth || x1 > canvasWidth) continue;
      const clipX1 = Math.max(x1, taskTableWidth);
      const clipX2 = Math.min(x2, canvasWidth);
      const visibleWidth = clipX2 - clipX1;
      if (visibleWidth < zoom) continue;
      if (widthPx >= 70) {
        ctx.font = this.font(11, true);
        ctx.textBaseline = "top";
        ctx.save();
        ctx.beginPath();
        ctx.rect(clipX1, headerHeight, visibleWidth, Math.max(0, canvasHeight - headerHeight));
        ctx.clip();
        if (ctx.measureText(h.name).width <= visibleWidth - 8) {
          ctx.textAlign = "center";
          ctx.fillText(h.name, (clipX1 + clipX2) / 2, headerHeight + 6);
        } else {
          ctx.textAlign = "left";
          ctx.fillText(h.name, x1 + 4, headerHeight + 6);
        }
        ctx.restore();
      } else {
        ctx.font = this.font(10);
        ctx.save();
        ctx.beginPath();
        ctx.rect(clipX1, headerHeight, visibleWidth, Math.max(0, canvasHeight - headerHeight));
        ctx.clip();
        ctx.save();
        ctx.translate(clipX1 + zoom / 2, headerHeight + 8);
        ctx.rotate(Math.PI / 2);
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(h.name, 0, 0);
        ctx.restore();
        ctx.restore();
      }
    }
    ctx.restore();
  }
  drawTodayLine() {
    const ctx = this.ctx;
    const today = /* @__PURE__ */ new Date();
    const x = this.dateToX(today);
    if (x > this.opts.taskTableWidth && x < this.opts.canvasWidth) {
      ctx.strokeStyle = this.colors.today;
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(x, this.opts.headerHeight);
      ctx.lineTo(x, this.opts.canvasHeight);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }
  /** Statusdatumlijn (fase 2.6, §6.1): kopie van drawTodayLine met de statusdatum + eigen kleur.
   *  Getekend ná de vandaag-lijn zodat beide zichtbaar zijn (statusdatum bovenop).
   *  De voortgangslijn (`drawProgressLine`, verderop getekend) tekent zelf al een ononderbroken
   *  spine op exact dezelfde X in dezelfde kleur — als die actief is zou deze gestippelde lijn er
   *  bovenop dubbel tekenen (stippel-door-massief-effect / geknipper). Zodra de voortgangslijn aan
   *  staat, IS die de statusdatum-markering; deze losse lijn treedt dan terug. */
  drawStatusDateLine() {
    if (!this.opts.statusDate || this.opts.showStatusDateLine === false) return;
    if (this.opts.showProgressLine !== false) return;
    const ctx = this.ctx;
    const x = this.dateToX(parseDate(this.opts.statusDate));
    if (x > this.opts.taskTableWidth && x < this.opts.canvasWidth) {
      ctx.strokeStyle = this.colors.statusDate;
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(x, this.opts.headerHeight);
      ctx.lineTo(x, this.opts.canvasHeight);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }
  /** Voortgangslijn (fase 2.6, §6.3): één verticale lijn op de statusdatum die per zichtbare
   *  leaf-rij naar de voortgangspositie uitstulpt (MSP-zigzag). Hidden rijen worden overgeslagen
   *  (drawTaskBars-filter is impliciet: `rows` bevat geen hidden rijen). Summary-/band-/mijlpaal-
   *  rijen volgen de statusdatumlijn recht. */
  drawProgressLine() {
    if (!this.opts.statusDate || this.opts.showProgressLine === false) return;
    const ctx = this.ctx;
    const statusDay = parseDate(this.opts.statusDate);
    const statusX = this.dateToX(statusDay);
    const { headerHeight, canvasHeight, canvasWidth, taskTableWidth, rowHeight } = this.opts;
    ctx.save();
    ctx.beginPath();
    ctx.rect(taskTableWidth, headerHeight, canvasWidth - taskTableWidth, canvasHeight - headerHeight);
    ctx.clip();
    ctx.strokeStyle = this.colors.statusDate;
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(statusX, headerHeight);
    for (let i = 0; i < this.rows.length; i++) {
      const rowTop = this.rowToY(i);
      const rowBottom = rowTop + rowHeight;
      if (rowBottom < headerHeight || rowTop > canvasHeight) continue;
      const rowMid = rowTop + rowHeight / 2;
      const row = this.rows[i];
      const task = row.kind === "task" ? row.task : null;
      let progressX = statusX;
      if (task && !task.isMilestone && task.childIds.length === 0) {
        const geo = this.barGeometry(task);
        const c = Math.max(0, Math.min(1, task.time.completion || 0));
        const finishDay = new Date(geo.end.getFullYear(), geo.end.getMonth(), geo.end.getDate());
        const startDay = new Date(geo.start.getFullYear(), geo.start.getMonth(), geo.start.getDate());
        const fullyDoneByStatus = c >= 1 && finishDay <= statusDay;
        const notYetStarted = c === 0 && startDay >= statusDay;
        if (!fullyDoneByStatus && !notYetStarted) {
          progressX = geo.x1 + (geo.x2 - geo.x1) * c;
        }
      }
      ctx.lineTo(statusX, rowTop);
      ctx.lineTo(progressX, rowMid);
      ctx.lineTo(statusX, rowBottom);
    }
    ctx.stroke();
    ctx.restore();
  }
  /** Baseline-onderbalk (fase 2.6, §6.2): dunne balk (of ruit voor mijlpalen) in de baseline-kleur
   *  onder de hoofdbalk, uit de actieve-baseline-overlay. Alleen als de taak een baseline-entry heeft. */
  drawBaselineOverlay(task, y, height) {
    const overlay = this.opts.baselineOverlay;
    if (!overlay || this.opts.showBaselineOverlay === false) return;
    const entry = overlay.get(task.id);
    if (!entry) return;
    const ctx = this.ctx;
    const zoom = this.opts.view.zoom;
    const baseHeight = Math.max(2, height * 0.28);
    const baseY = y + height + 1;
    ctx.fillStyle = this.colors.baseline;
    if (entry.isMilestone) {
      const x = this.dateToX(parseDate(entry.start)) + zoom / 2;
      if (x < this.opts.taskTableWidth || x > this.opts.canvasWidth) return;
      const cy = baseY + baseHeight / 2;
      const s = baseHeight;
      ctx.beginPath();
      ctx.moveTo(x, cy - s);
      ctx.lineTo(x + s, cy);
      ctx.lineTo(x, cy + s);
      ctx.lineTo(x - s, cy);
      ctx.closePath();
      ctx.fill();
      return;
    }
    const x1 = this.dateToX(parseDate(entry.start));
    const x2 = this.dateToX(parseDate(entry.finish)) + zoom;
    if (x2 < this.opts.taskTableWidth || x1 > this.opts.canvasWidth) return;
    const width = Math.max(x2 - x1, 2);
    ctx.beginPath();
    ctx.roundRect(x1, baseY, width, baseHeight, 1);
    ctx.fill();
  }
  drawTimelineHeader() {
    const { canvasWidth, headerHeight, view, enableQuarterHourZoom } = this.opts;
    const ctx = this.ctx;
    ctx.fillStyle = this.colors.headerBg;
    ctx.fillRect(0, 0, canvasWidth, headerHeight);
    ctx.strokeStyle = this.colors.border;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, headerHeight);
    ctx.lineTo(canvasWidth, headerHeight);
    ctx.stroke();
    const enableQH = enableQuarterHourZoom ?? false;
    const { major, mid, minor } = pickTiers(view.zoom, enableQH, false);
    const axisViewStartIdx = this.axis.dayIndexOf(this.viewStart);
    const startDate = this.axis.dateAtIndex(axisViewStartIdx + Math.floor(view.scrollX / view.zoom) - 1);
    const endDate = this.axis.dateAtIndex(axisViewStartIdx + Math.ceil((view.scrollX + canvasWidth) / view.zoom) + 1);
    if (mid) {
      ctx.font = this.font(11, true);
      ctx.fillStyle = this.colors.text;
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      this.drawTierLabels(major, startDate, endDate, headerHeight / 6);
      ctx.font = this.font(10);
      ctx.fillStyle = this.colors.textSecondary;
      this.drawTierLabels(mid, startDate, endDate, headerHeight / 2);
      ctx.font = this.font(10);
      ctx.fillStyle = this.colors.textSecondary;
      this.drawTierLabels(minor, startDate, endDate, headerHeight * 5 / 6);
      return;
    }
    ctx.font = this.font(11, true);
    ctx.fillStyle = this.colors.text;
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    this.drawTierLabels(major, startDate, endDate, headerHeight / 4);
    ctx.font = this.font(10);
    ctx.fillStyle = this.colors.textSecondary;
    this.drawTierLabels(minor, startDate, endDate, headerHeight * 3 / 4);
  }
  drawTierLabels(tier, startDate, endDate, yCenter) {
    const { canvasWidth, taskTableWidth, weekStartDay, localizedMonths, localizedWeekdays } = this.opts;
    const wsd = weekStartDay ?? "monday";
    const ctx = this.ctx;
    const cfg = TIER_CONFIG[tier];
    if (tier === "day" && this.compressed) {
      this.drawWorkdayTierLabels(startDate, endDate, yCenter, cfg, wsd, localizedWeekdays);
      return;
    }
    let cursor = snapToTickStart(startDate, tier, wsd);
    let lastDrawnRight = -Infinity;
    while (cursor.getTime() <= endDate.getTime()) {
      const next = nextTickBoundary(cursor, tier);
      const x1 = this.dateToX(cursor);
      const x2 = this.dateToX(next);
      const labelText = this.formatTierLabel(tier, cursor, wsd, localizedMonths, localizedWeekdays);
      if (x2 <= taskTableWidth) {
        cursor = next;
        continue;
      }
      if (x1 >= canvasWidth) break;
      const labelX = Math.max(x1 + 4, taskTableWidth + 4);
      const slotWidth = x2 - Math.max(x1, taskTableWidth);
      if (slotWidth >= cfg.minLabelWidth && labelX > lastDrawnRight + 4) {
        const measured = ctx.measureText(labelText).width;
        if (labelX + measured <= x2 - 2) {
          ctx.fillText(labelText, labelX, yCenter);
          lastDrawnRight = labelX + measured;
        }
      }
      cursor = next;
    }
  }
  /**
   * Issue #21 punt 5 (header-bugfix): dag-tier onder compressie, itererend over
   * WERKDAG-as-indices (`this.axis.dayIndexOf`/`dateAtIndex`) i.p.v. kalenderdagen. Elke
   * opeenvolgende index is per constructie een ANDERE echte werkdag (§2.2 prefix-som) — er
   * bestaat dus geen niet-werkdag-tick om over te slaan, en twee ticks kunnen nooit op dezelfde
   * x landen. Bijkomend voordeel t.o.v. "per kalenderdag + 0-breedte-skip": het aantal
   * iteraties is O(zichtbare kolommen), niet O(zichtbare kalenderdagen incl. gecomprimeerde
   * weekenden/feestdagen) — bij een ver-gescrolde weergave met veel vrije dagen scheelt dat.
   */
  drawWorkdayTierLabels(startDate, endDate, yCenter, cfg, wsd, localizedWeekdays) {
    const { canvasWidth, taskTableWidth } = this.opts;
    const ctx = this.ctx;
    let idx = Math.floor(this.axis.dayIndexOf(startDate));
    const endIdx = Math.ceil(this.axis.dayIndexOf(endDate));
    let lastDrawnRight = -Infinity;
    while (idx <= endIdx) {
      const cursor = this.axis.dateAtIndex(idx);
      const next = this.axis.dateAtIndex(idx + 1);
      const x1 = this.axis.dateToX(cursor);
      const x2 = this.axis.dateToX(next);
      const labelText = this.formatTierLabel("day", cursor, wsd, void 0, localizedWeekdays);
      if (x2 <= taskTableWidth) {
        idx++;
        continue;
      }
      if (x1 >= canvasWidth) break;
      const labelX = Math.max(x1 + 4, taskTableWidth + 4);
      const slotWidth = x2 - Math.max(x1, taskTableWidth);
      if (slotWidth >= cfg.minLabelWidth && labelX > lastDrawnRight + 4) {
        const measured = ctx.measureText(labelText).width;
        if (labelX + measured <= x2 - 2) {
          ctx.fillText(labelText, labelX, yCenter);
          lastDrawnRight = labelX + measured;
        }
      }
      idx++;
    }
  }
  formatTierLabel(tier, d, weekStartDay, localizedMonths, localizedWeekdays) {
    const months = localizedMonths || ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const pad = (n) => n.toString().padStart(2, "0");
    switch (tier) {
      case "year":
        return `${d.getUTCFullYear()}`;
      case "quarter":
        return `Q${Math.floor(d.getUTCMonth() / 3) + 1} ${d.getUTCFullYear()}`;
      case "month":
        return `${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
      case "week":
        return `W${getWeekNumberFor(d, weekStartDay)}`;
      // issue #21 punt 2 (vervolg: dagnamen): bij voldoende inzoomen (zoom≥40 px/dag) de
      // weekdag-afkorting vóór het dagnummer tonen ('wo 23'); anders alleen het dagnummer.
      // Zonder localizedWeekdays valt het terug op alleen het dagnummer (backwards-compat).
      case "day": {
        const dayNum = d.getUTCDate();
        if (localizedWeekdays && this.opts.view.zoom >= 40) {
          return `${localizedWeekdays[d.getUTCDay()]} ${dayNum}`;
        }
        return `${dayNum}`;
      }
      case "hour":
        return `${pad(d.getUTCHours())}:00`;
      case "quarterHour":
        return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;
    }
  }
  drawTaskBars() {
    const { rowHeight } = this.opts;
    const barHeight = rowHeight * 0.5;
    const barOffset = (rowHeight - barHeight) / 2;
    const trace = this.opts.trace;
    const tDPred = trace ? new Set(trace.drivingPredecessors) : null;
    const tPred = trace ? new Set(trace.predecessors) : null;
    const tDSucc = trace ? new Set(trace.drivenSuccessors) : null;
    const tSucc = trace ? new Set(trace.successors) : null;
    for (let i = 0; i < this.rows.length; i++) {
      const row = this.rows[i];
      const y = this.rowToY(i) + barOffset;
      if (y + barHeight < this.opts.headerHeight || y > this.opts.canvasHeight) continue;
      if (row.kind === "group") {
        const rowY = this.rowToY(i);
        this.ctx.fillStyle = this.colors.summary + "14";
        this.ctx.fillRect(this.opts.taskTableWidth, rowY, this.opts.canvasWidth - this.opts.taskTableWidth, this.opts.rowHeight);
        continue;
      }
      const task = row.task;
      const isSelected = this.opts.selectedTaskIds.includes(task.id);
      let overrideColor;
      let dimmed = false;
      if (trace && task.id !== trace.focusId) {
        if (tDPred.has(task.id)) overrideColor = this.colors.tracePredDriving;
        else if (tPred.has(task.id)) overrideColor = this.colors.tracePred;
        else if (tDSucc.has(task.id)) overrideColor = this.colors.traceSuccDriving;
        else if (tSucc.has(task.id)) overrideColor = this.colors.traceSucc;
        else dimmed = true;
      }
      if (dimmed) this.ctx.globalAlpha = 0.25;
      else if (row.dimmed) this.ctx.globalAlpha = _GanttRenderer.DIM_ALPHA;
      if (task.isMilestone) {
        this.drawMilestone(task, y, barHeight, isSelected, overrideColor);
      } else if (task.childIds.length > 0) {
        this.drawSummaryBar(task, y, barHeight, isSelected, overrideColor);
      } else if (task.isHammock) {
        this.drawHammockBar(task, y, barHeight, isSelected, overrideColor);
      } else {
        this.drawTaskBar(task, y, barHeight, isSelected, overrideColor);
      }
      this.drawConstraintMarkers(task, y);
      this.drawNotesIndicator(task, y);
      if (dimmed || row.dimmed) this.ctx.globalAlpha = 1;
      this.drawExternalGhosts(task, y, barHeight);
      this.drawBaselineOverlay(task, y, barHeight);
    }
  }
  drawTaskBar(task, y, height, isSelected, overrideColor) {
    const ctx = this.ctx;
    const geo = this.barGeometry(task);
    const { x1, x2 } = geo;
    const floatWidth = task.time.totalFloat > 0 && !task.time.isCritical ? task.time.totalFloat * this.opts.view.zoom : 0;
    if (x2 + floatWidth < this.opts.taskTableWidth || x1 > this.opts.canvasWidth) return;
    const width = Math.max(x2 - x1, 4);
    const color = this.barColor(task, overrideColor);
    const progressColor = task.time.isCritical ? this.colors.criticalLight : this.colors.normalLight;
    let segs = [{ x1, x2 }];
    let split = false;
    if (geo.hourMode && this.shouldSplit(isSelected)) {
      const eng = this.engineFor(task);
      const intervals = eng ? eng.workIntervalsBetween(geo.start, geo.end) : [];
      if (intervals.length > 0) {
        segs = intervals.map((iv) => ({ x1: this.dateToX(iv.start), x2: this.dateToX(iv.end) }));
        split = true;
      }
    }
    if (split && segs.length > 1) {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.globalAlpha = ctx.globalAlpha * 0.5;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(segs[0].x2, y + height / 2);
      ctx.lineTo(segs[segs.length - 1].x1, y + height / 2);
      ctx.stroke();
      ctx.restore();
    }
    const progressEnd = x1 + width * task.time.completion;
    for (const s of segs) {
      const sw = Math.max(s.x2 - s.x1, split ? 2 : 4);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(s.x1, y, sw, height, 3);
      ctx.fill();
      if (task.time.completion > 0 && progressEnd > s.x1) {
        const pw = Math.min(s.x1 + sw, progressEnd) - s.x1;
        if (pw > 0) {
          ctx.fillStyle = progressColor;
          ctx.beginPath();
          ctx.roundRect(s.x1, y, pw, height, 3);
          ctx.fill();
        }
      }
    }
    if (this.highContrast && !task.time.isCritical) {
      if (task.time.isNearCritical) {
        const hatch = getNearCriticalHatch(ctx);
        if (hatch) {
          ctx.fillStyle = hatch;
          for (const s of segs) {
            const sw = Math.max(s.x2 - s.x1, split ? 2 : 4);
            ctx.beginPath();
            ctx.roundRect(s.x1, y, sw, height, 3);
            ctx.fill();
          }
        }
      } else {
        ctx.strokeStyle = this.colors.text;
        ctx.lineWidth = 1.5;
        for (const s of segs) {
          const sw = Math.max(s.x2 - s.x1, split ? 2 : 4);
          ctx.beginPath();
          ctx.roundRect(s.x1 + 0.75, y + 0.75, sw - 1.5, height - 1.5, 3);
          ctx.stroke();
        }
      }
    }
    if (floatWidth > 0) {
      ctx.fillStyle = this.colors.float + "E6";
      ctx.fillRect(x2, y + height / 4, floatWidth, height / 2);
    }
    if (isSelected) {
      ctx.strokeStyle = this.colors.selected;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(x1 - 1, y - 1, width + 2, height + 2, 4);
      ctx.stroke();
    }
    if (width > 40) {
      ctx.fillStyle = this.colors.barText;
      ctx.font = this.font(10);
      ctx.textBaseline = "middle";
      ctx.save();
      ctx.beginPath();
      ctx.rect(x1 + 4, y, width - 8, height);
      ctx.clip();
      ctx.fillText(task.name, x1 + 6, y + height / 2);
      ctx.restore();
    }
  }
  /**
   * Fase 2.9 §5.3 — hammock/LOE-balk. P6-conventie: een dunne balk die tussen de start- en
   * finish-driver spant, met haakvormige eind-caps (brackets naar beneden) i.p.v. een gevulde
   * taakbalk. De duur is afgeleid (de solver schrijft early/late), dus geen voortgangsvulling.
   */
  drawHammockBar(task, y, height, isSelected, overrideColor) {
    const ctx = this.ctx;
    const { x1, x2 } = this.barGeometry(task);
    if (x2 < this.opts.taskTableWidth || x1 > this.opts.canvasWidth) return;
    const width = Math.max(x2 - x1, 4);
    const color = overrideColor ?? this.colors.hammock;
    const barY = y + height * 0.4;
    const barH = height * 0.2;
    const hook = height * 0.42;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(x1, barY, width, barH, 1);
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1 + 1, barY);
    ctx.lineTo(x1 + 1, barY + hook);
    ctx.moveTo(x2 - 1, barY);
    ctx.lineTo(x2 - 1, barY + hook);
    ctx.stroke();
    if (isSelected) {
      ctx.strokeStyle = this.colors.selected;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(x1 - 1, y - 1, width + 2, height + 2, 4);
      ctx.stroke();
    }
    if (width > 40) {
      ctx.fillStyle = this.colors.text;
      ctx.font = this.font(10);
      ctx.textBaseline = "middle";
      ctx.save();
      ctx.beginPath();
      ctx.rect(x1 + 4, y, width - 8, height);
      ctx.clip();
      ctx.fillText(task.name, x1 + 6, y + height * 0.2);
      ctx.restore();
    }
  }
  drawSummaryBar(task, y, height, isSelected, overrideColor) {
    const ctx = this.ctx;
    const { x1, x2 } = this.barGeometry(task);
    if (x2 < this.opts.taskTableWidth || x1 > this.opts.canvasWidth) return;
    const width = Math.max(x2 - x1, 4);
    const barY = y + height * 0.3;
    const barH = height * 0.4;
    ctx.fillStyle = overrideColor ?? this.colors.summary;
    ctx.beginPath();
    ctx.roundRect(x1, barY, width, barH, 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x1, barY);
    ctx.lineTo(x1, barY + barH + 4);
    ctx.lineTo(x1 + 6, barY + barH);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x1 + width, barY);
    ctx.lineTo(x1 + width, barY + barH + 4);
    ctx.lineTo(x1 + width - 6, barY + barH);
    ctx.closePath();
    ctx.fill();
    if (isSelected) {
      ctx.strokeStyle = this.colors.selected;
      ctx.lineWidth = 2;
      ctx.strokeRect(x1 - 1, barY - 1, width + 2, barH + 6);
    }
  }
  drawMilestone(task, y, height, isSelected, overrideColor) {
    const ctx = this.ctx;
    const startStr = task.time.earlyStart || task.time.scheduleStart;
    const hourMode = startStr.includes("T");
    const date = hourMode ? parseInstant(startStr) : parseDate(startStr);
    const zoom = this.opts.view.zoom;
    const anchor = hourMode ? 0 : task.milestoneKind === "START" ? 0 : task.milestoneKind === "FINISH" ? zoom : zoom / 2;
    const x = this.dateToX(date) + anchor;
    const cy = y + height / 2;
    const size2 = height * 0.4;
    const diamond = (s) => {
      ctx.beginPath();
      ctx.moveTo(x, cy - s);
      ctx.lineTo(x + s, cy);
      ctx.lineTo(x, cy + s);
      ctx.lineTo(x - s, cy);
      ctx.closePath();
    };
    ctx.fillStyle = overrideColor ?? this.colors.milestone;
    diamond(size2);
    ctx.fill();
    if (task.mandatory) {
      ctx.fillStyle = this.colors.bg;
      diamond(size2 * 0.45);
      ctx.fill();
    }
    if (isSelected) {
      ctx.strokeStyle = this.colors.selected;
      ctx.lineWidth = 2;
      diamond(size2);
      ctx.stroke();
    }
    ctx.fillStyle = this.colors.text;
    ctx.font = this.font(10);
    ctx.textBaseline = "middle";
    ctx.fillText(task.name, x + size2 + 6, cy);
  }
  /**
   * Fase 2.9 (§5.5) — externe (cross-project) ghost-balken. Per `ExternalLink` een grijze balk die op
   * het bevroren anker EINDIGT (predecessor: de externe taak eindigt vóór mijn start) resp. BEGINT
   * (successor). `sourceMissing` ⇒ gestippelde rand + een "verouderd"-badge (bron niet geladen; her-
   * importeer om te verversen). De ghost is géén echte rij — puur weergave naast de lokale balk;
   * afwezig/leeg `externalLinks` ⇒ deze methode is een no-op (byte-identiek). */
  drawExternalGhosts(task, y, height) {
    const links = task.externalLinks;
    if (!links || links.length === 0) return;
    const ctx = this.ctx;
    const ghostW = Math.max(this.opts.view.zoom * 1.5, 28);
    const gh = height * 0.72;
    const gy = y + (height - gh) / 2;
    const chartLeft = this.opts.taskTableWidth;
    for (const link of links) {
      const anchorStr = link.anchorDate;
      if (!anchorStr) continue;
      const anchor = anchorStr.includes("T") ? parseInstant(anchorStr) : parseDate(anchorStr);
      if (isNaN(anchor.getTime())) continue;
      const ax = this.dateToX(anchor);
      const gx1 = link.direction === "predecessor" ? ax - ghostW : ax;
      if (gx1 + ghostW < chartLeft || gx1 > this.opts.canvasWidth) continue;
      ctx.save();
      ctx.beginPath();
      ctx.rect(chartLeft, this.opts.headerHeight, this.opts.canvasWidth - chartLeft, this.opts.canvasHeight - this.opts.headerHeight);
      ctx.clip();
      ctx.fillStyle = this.colors.ghost + "40";
      ctx.beginPath();
      ctx.roundRect(gx1, gy, ghostW, gh, 2);
      ctx.fill();
      ctx.strokeStyle = this.colors.ghost;
      ctx.lineWidth = 1;
      if (link.sourceMissing) ctx.setLineDash([3, 2]);
      ctx.beginPath();
      ctx.roundRect(gx1 + 0.5, gy + 0.5, ghostW - 1, gh - 1, 2);
      ctx.stroke();
      ctx.setLineDash([]);
      if (link.sourceMissing) {
        const label = this.opts.externalStaleLabel ?? "verouderd";
        ctx.font = this.font(9);
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        const tw = ctx.measureText(label).width + 6;
        const bx = gx1 + Math.max((ghostW - tw) / 2, 0);
        const by = gy - 13;
        ctx.fillStyle = this.colors.critical;
        ctx.beginPath();
        ctx.roundRect(bx, by, tw, 12, 2);
        ctx.fill();
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(label, bx + 3, by + 6.5);
        ctx.textAlign = "start";
      }
      ctx.restore();
    }
  }
  /**
   * Fase 2.3 — constraint-pins en deadline-markers (F10/F11):
   *  - constraint: klein pin-ruitje boven de balkrand — blauw aan de startkant voor
   *    vroege-zijde types (SNET/FNET), violet aan de betreffende kant voor late-zijde/
   *    pinnende types (SNLT/FNLT/MSO/MFO), rood wanneer de constraint geschonden is;
   *  - deadline: pijl-omlaag op de deadline-datum (MSP-conventie) — groen, rood bij
   *    overschrijding.
   */
  drawConstraintMarkers(task, y) {
    const ctx = this.ctx;
    const chartLeft = this.opts.taskTableWidth;
    const c = task.constraint;
    if (c && c.type !== "ASAP" && c.type !== "ALAP") {
      const start = parseDate(task.time.earlyStart || task.time.scheduleStart);
      const end = parseDate(task.time.earlyFinish || task.time.scheduleFinish);
      const startSide = c.type === "SNET" || c.type === "SNLT" || c.type === "MSO";
      const px = startSide ? this.dateToX(start) : this.dateToX(end) + this.opts.view.zoom;
      if (px >= chartLeft && px <= this.opts.canvasWidth) {
        const earlySide = c.type === "SNET" || c.type === "FNET";
        const violated = this.violatedSet.has(task.id);
        ctx.fillStyle = violated ? this.colors.critical : earlySide ? this.colors.constraintEarly : this.colors.constraintLate;
        if (c.hard && (c.type === "MSO" || c.type === "MFO")) {
          ctx.strokeStyle = ctx.fillStyle;
          ctx.lineWidth = 1.5;
          const hy = y - 7;
          ctx.beginPath();
          ctx.moveTo(px, hy + 2);
          ctx.lineTo(px, y);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(px, hy, 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const cy = y - 1;
          ctx.beginPath();
          ctx.moveTo(px, cy - 4);
          ctx.lineTo(px + 4, cy);
          ctx.lineTo(px, cy + 4);
          ctx.lineTo(px - 4, cy);
          ctx.closePath();
          ctx.fill();
        }
      }
    }
    if (task.deadline) {
      const d = parseDate(task.deadline);
      if (!isNaN(d.getTime())) {
        const dx = this.dateToX(d) + this.opts.view.zoom;
        if (dx >= chartLeft && dx <= this.opts.canvasWidth) {
          const missed = this.missedDeadlineSet.has(task.id);
          ctx.fillStyle = missed ? this.colors.critical : this.colors.deadlineOk;
          ctx.beginPath();
          ctx.moveTo(dx - 5, y - 2);
          ctx.lineTo(dx + 5, y - 2);
          ctx.lineTo(dx, y + 5);
          ctx.closePath();
          ctx.fill();
        }
      }
    }
  }
  /**
   * Fase 2.10 (item 1) — klein, neutraal-gekleurd "aantekeningen aanwezig"-badge, rechtsboven de
   * balk (naast `drawConstraintMarkers`, hetzelfde badge-precedent). Alleen zichtbaar bij ≥1 OPEN
   * (`!done`) aantekening — een volledig afgevinkte lijst toont niets meer (bewust informatief,
   * geen waarschuwingskleur).
   */
  drawNotesIndicator(task, y) {
    const notes = task.notes;
    if (!notes || !notes.some((n) => !n.done)) return;
    const ctx = this.ctx;
    const chartLeft = this.opts.taskTableWidth;
    const end = parseDate(task.time.earlyFinish || task.time.scheduleFinish);
    const px = this.dateToX(end) + this.opts.view.zoom;
    if (px < chartLeft || px > this.opts.canvasWidth) return;
    ctx.fillStyle = this.colors.textSecondary;
    ctx.beginPath();
    ctx.arc(px - 6, y - 5, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
  // ── Issue #51: live duur-pilletje tijdens een rand-sleep ────────────────────
  /** Halve tekstmarge links/rechts binnen het pilletje. */
  static DRAG_BADGE_PAD_X = 5;
  /** Hoogte van het pilletje — iets hoger dan de balk (rowHeight/2 = 14), zodat hij als los
   *  chipje leest en niet als een stuk vulling van de balk zelf. */
  static DRAG_BADGE_H = 16;
  /** Afstand tussen het pilletje en de gesleepte balkrand. Klein genoeg dat het label duidelijk
   *  bij die rand hoort (de melder plakte hem in zijn voorbeeld tegen de resize-cursor aan). */
  static DRAG_BADGE_GAP = 4;
  /**
   * Duurtekst voor het sleep-pilletje. Hergebruikt de duurkolom-formattering (`durationText`) en
   * repareert alleen de twee gevallen waarin die voor dit doel te kort schiet:
   *  - urenplanning UIT ⇒ `durationText` plakt een HARDGECODEERDE `d` achter het getal; los van de
   *    tabelkop is dat de enige eenheidsaanduiding die de gebruiker ziet, dus hier de VERTAALDE
   *    afkorting;
   *  - een UUR-taak terwijl de urenplanning-schakelaar uit staat ⇒ `durationText` zou
   *    `scheduleDuration` (dagen) tonen, maar een uur-sleep muteert `durationMinutes`. Het getal
   *    zou dus stilstaan terwijl de balk beweegt. Formatteer dan alsnog uit de minuten.
   */
  dragDurationText(task) {
    const sfx = this.opts.durationSuffixes ?? DEFAULT_DURATION_SUFFIXES;
    const startStr = task.time.earlyStart || task.time.scheduleStart;
    const endStr = task.time.earlyFinish || task.time.scheduleFinish;
    const hourMode = startStr.includes("T") || endStr.includes("T");
    if (hourMode) {
      const cal = this.opts.effectiveCalById?.get(task.id) ?? this.opts.calendar;
      const minutes = task.time.durationMinutes ?? taskDurationMinutes(task, cal);
      return formatDuration(minutes, effHoursPerDay(cal), this.opts.durationDisplay ?? "auto", sfx);
    }
    if (!this.opts.enableHourPlanning) return `${task.time.scheduleDuration}${sfx.day}`;
    return this.durationText(task);
  }
  /**
   * Issue #51 — compact duur-pilletje tegen de rand die op dit moment gerekt wordt.
   *
   * Waarom hier en niet als DOM-overlay: de x van een balkrand komt uit `barGeometry` bovenop de
   * gedeelde (mogelijk werkdag-gecomprimeerde) as. Buiten de renderer zou die geometrie een tweede
   * keer nagebouwd moeten worden — precies het soort duplicaat dat elders in dit bestand met veel
   * moeite tot ÉÉN as-chokepoint is teruggebracht. Bijkomend: het pilletje verschijnt zo in
   * dezelfde paint als de balk die het beschrijft (geen frame-lag/scheuring tussen DOM en canvas),
   * en de knipping tegen taaktabel/header komt gratis uit de tekenvolgorde in `render()`.
   *
   * Plaatsing: bij voorkeur BINNEN de balk tegen de gesleepte rand (zoals de melder het tekende);
   * past hij daar niet (smalle balk), dan net BUITEN die rand. In beide gevallen geklemd op het
   * chart-gebied, zodat een balk die tegen de vensterrand aan ligt zijn label niet kwijtraakt.
   */
  drawDragDurationBadge() {
    const drag = this.opts.durationDrag;
    if (!drag) return;
    const rowIndex = this.rowIndexByTask.get(drag.taskId);
    if (rowIndex === void 0) return;
    const row = this.rows[rowIndex];
    if (row?.kind !== "task") return;
    const task = row.task;
    const { rowHeight, headerHeight, canvasHeight, canvasWidth, taskTableWidth } = this.opts;
    const barHeight = rowHeight * 0.5;
    const barY = this.rowToY(rowIndex) + (rowHeight - barHeight) / 2;
    if (barY + barHeight < headerHeight || barY > canvasHeight) return;
    const ctx = this.ctx;
    const h = _GanttRenderer.DRAG_BADGE_H;
    const gap = _GanttRenderer.DRAG_BADGE_GAP;
    const label = this.dragDurationText(task);
    ctx.save();
    ctx.font = this.font(10, true);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    const w = ctx.measureText(label).width + _GanttRenderer.DRAG_BADGE_PAD_X * 2;
    const { x1, x2 } = this.barGeometry(task);
    let x;
    if (drag.edge === "right") {
      x = x2 - gap - w;
      if (x < x1 + 2) x = x2 + gap;
    } else {
      x = x1 - gap - w;
      if (x < taskTableWidth + 2) x = x1 + gap;
    }
    const lo = taskTableWidth + 2;
    const hi = canvasWidth - w - 2;
    x = hi < lo ? lo : Math.min(Math.max(x, lo), hi);
    const y = barY + (barHeight - h) / 2;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, h / 2);
    ctx.fillStyle = this.colors.text;
    ctx.fill();
    ctx.strokeStyle = this.colors.bg;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = this.colors.bg;
    ctx.fillText(label, x + _GanttRenderer.DRAG_BADGE_PAD_X, y + h / 2 + 0.5);
    ctx.restore();
  }
  // ── Relatie-routing (issue #41) ─────────────────────────────────────────────
  // De pijlen worden VÓÓR de balken getekend (render-volgorde), dus alles wat onder een balk
  // doorloopt is per definitie onzichtbaar. De routing moet de balken daarom écht ontwijken.
  // Twee bouwstenen: (1) horizontaal reizen gebeurt in de GOOT tussen twee rijen — balken beslaan
  // alleen de middelste helft van een rij (`barHeight = rowHeight/2`, gecentreerd), dus de rijgrens
  // is per constructie balkvrij; (2) verticaal reizen gebeurt in een KOLOM die geen balk van een
  // tussenliggende rij raakt (`pickColumn`).
  /** Marge rond een balk waarbinnen geen doorsteek-kolom wordt gekozen (dekt selectiering + afronding). */
  static ARROW_PAD = 3;
  /** Uit-/inlooplengte van de pijlstubs naast de balkrand. */
  static ARROW_STUB = 8;
  /** Compacte stub voor krappe gevallen (FS zonder gat: `toX ≈ fromX`) — houdt het "omheen"-blokje
   *  klein zodat de meest voorkomende relatie geen brede zigzag wordt. */
  static ARROW_STUB_TIGHT = 4;
  /** Hergebruikt scratch-pad voor het pijlpad: max 8 punten. Een array per pijl zou bij duizenden
   *  relaties × 60 fps puur GC-druk zijn. */
  arrowPts = new Array(16).fill(0);
  /**
   * Bouwt de obstakel-index van de zichtbare rijen. Bewuste keuzes over wat wél/niet als obstakel telt:
   *  - de BALK zelf (taak/summary/hammock/mijlpaal) telt — dat is de dekkende vulling uit de melding;
   *  - een BANDKOPRIJ telt NIET: die strook is 8% transparant (`summary + '14'`) en verbergt niets,
   *    terwijl hij de volle breedte beslaat en dus élke kolom zou blokkeren;
   *  - de SPELINGSBAND, baseline-onderbalk, constraint-pins en aantekening-badges tellen NIET.
   *    De speling-band kan tientallen dagen breed zijn; hem als obstakel meenemen zou pijlen
   *    kilometers laten omlopen (spaghetti) voor een strook die maar een halve balkhoogte hoog is.
   *    De andere drie zijn punt-glyphs c.q. liggen buiten de goot (baseline eindigt op 0,89·rowHeight,
   *    de goot ligt op de rijgrens).
   */
  buildRowObstacles() {
    const { rowHeight, headerHeight, canvasHeight, view } = this.opts;
    const n = this.rows.length;
    const first = Math.max(0, Math.ceil(view.scrollY / rowHeight) - 2);
    const last = Math.min(n - 1, Math.ceil((canvasHeight - headerHeight + view.scrollY) / rowHeight) + 1);
    if (last < first) return { r0: 0, r1: -1, x1: EMPTY_SPANS, x2: EMPTY_SPANS };
    const len = last - first + 1;
    const x1 = new Float64Array(len).fill(Infinity);
    const x2 = new Float64Array(len).fill(-Infinity);
    for (let i = first; i <= last; i++) {
      const row = this.rows[i];
      if (row.kind !== "task") continue;
      const geo = this.barGeometry(row.task);
      const pad = row.task.isMilestone ? 6 : _GanttRenderer.ARROW_PAD;
      x1[i - first] = geo.x1 - pad;
      x2[i - first] = geo.x2 + pad;
    }
    return { r0: first, r1: last, x1, x2 };
  }
  /** Is kolom `x` vrij van balken in de rijen STRIKT tussen `a` en `b`? De rijen van de voorganger
   *  en de opvolger zelf horen er niet bij: daar wordt de kolom per constructie al naast de balk
   *  gelegd. Rijen buiten de index (= buiten beeld) tellen niet mee. */
  isColumnFree(obs, x, a, b) {
    const lo = Math.max(Math.min(a, b) + 1, obs.r0);
    const hi = Math.min(Math.max(a, b) - 1, obs.r1);
    for (let i = lo; i <= hi; i++) {
      const k = i - obs.r0;
      if (x > obs.x1[k] && x < obs.x2[k]) return false;
    }
    return true;
  }
  /** Kiest de verticale doorsteek-kolom: eerst de voorkeur, dan het alternatief, en pas als beide
   *  geblokkeerd zijn een gatenzoektocht in de corridor ertussen (de dure tak — zeldzaam, en
   *  begrensd tot de corridor zodat een omweg nooit buiten de eigen bounding box uitwaaiert).
   *  Vindt hij niets, dan wint de voorkeur en accepteren we de occlusie: liever een gedeeltelijk
   *  bedekte pijl dan een pijl die dwars door het hele diagram slingert. */
  pickColumn(obs, prefer, alt, a, b) {
    if (this.isColumnFree(obs, prefer, a, b)) return prefer;
    if (this.isColumnFree(obs, alt, a, b)) return alt;
    const lo = Math.min(prefer, alt);
    const hi = Math.max(prefer, alt);
    if (hi - lo < 2) return prefer;
    const rLo = Math.max(Math.min(a, b) + 1, obs.r0);
    const rHi = Math.min(Math.max(a, b) - 1, obs.r1);
    const spans = [];
    for (let i = rLo; i <= rHi; i++) {
      const k = i - obs.r0;
      if (obs.x2[k] > lo && obs.x1[k] < hi) spans.push({ a: obs.x1[k], b: obs.x2[k] });
    }
    spans.sort((p, q) => p.a - q.a);
    let best = NaN;
    let bestDist = Infinity;
    const consider = (from, to) => {
      if (to - from < 1) return;
      const c = Math.min(Math.max(prefer, from), to);
      const d = Math.abs(c - prefer);
      if (d < bestDist) {
        bestDist = d;
        best = c;
      }
    };
    let cursor = lo;
    for (const s of spans) {
      if (s.a > cursor) consider(cursor, Math.min(s.a, hi));
      if (s.b > cursor) cursor = s.b;
      if (cursor >= hi) break;
    }
    if (cursor < hi) consider(cursor, hi);
    return Number.isNaN(best) ? prefer : best;
  }
  /** Tekent het pijlpad uit het scratch-pad (`n` = aantal getallen, dus 2× het aantal punten).
   *  Punten die samenvallen worden overgeslagen — een lege lineTo is met `lineCap:'butt'` weliswaar
   *  onzichtbaar, maar zo blijft het pad ook onafhankelijk van een eventuele lineCap van buiten. */
  strokeArrowPath(pts, n) {
    const ctx = this.ctx;
    ctx.beginPath();
    let px = pts[0];
    let py = pts[1];
    ctx.moveTo(px, py);
    for (let i = 2; i < n; i += 2) {
      const x = pts[i];
      const y = pts[i + 1];
      if (x === px && y === py) continue;
      ctx.lineTo(x, y);
      px = x;
      py = y;
    }
    ctx.stroke();
  }
  drawDependencyArrows() {
    const ctx = this.ctx;
    ctx.lineWidth = 1;
    if (this.opts.sequences.length === 0) return;
    const obs = this.buildRowObstacles();
    const drivingSet = this.opts.drivingSequenceIds ? new Set(this.opts.drivingSequenceIds) : null;
    const trace = this.opts.trace;
    const traced = trace ? /* @__PURE__ */ new Set([trace.focusId, ...trace.predecessors, ...trace.successors]) : null;
    for (const seq of this.opts.sequences) {
      const predIdx = this.rowIndexByTask.get(seq.predecessorId) ?? -1;
      const succIdx = this.rowIndexByTask.get(seq.successorId) ?? -1;
      if (predIdx < 0 || succIdx < 0) continue;
      const predRow = this.rows[predIdx];
      const succRow = this.rows[succIdx];
      if (predRow?.kind !== "task" || succRow?.kind !== "task") continue;
      const pred = predRow.task;
      const succ = succRow.task;
      const isDriving = drivingSet ? drivingSet.has(seq.id) : true;
      const isCriticalLink = drivingSet !== null && isDriving && pred.time.isCritical && succ.time.isCritical;
      const color = isCriticalLink ? this.colors.critical : this.colors.dependency;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.setLineDash(isDriving ? [] : [4, 3]);
      ctx.globalAlpha = traced && !(traced.has(seq.predecessorId) && traced.has(seq.successorId)) ? 0.15 : 1;
      const rowH = this.opts.rowHeight;
      const predY = this.rowToY(predIdx) + rowH / 2;
      const succY = this.rowToY(succIdx) + rowH / 2;
      const canvasH = this.opts.canvasHeight;
      const cullMargin = rowH / 2 + 8;
      if (Math.max(predY, succY) < -cullMargin || Math.min(predY, succY) > canvasH + cullMargin) continue;
      let fromX, toX;
      switch (seq.type) {
        case "FINISH_START": {
          const predEnd = parseDate(pred.time.earlyFinish || pred.time.scheduleFinish);
          fromX = this.dateToX(predEnd) + this.opts.view.zoom;
          const succStart = parseDate(succ.time.earlyStart || succ.time.scheduleStart);
          toX = this.dateToX(succStart);
          break;
        }
        case "START_START": {
          const predStart = parseDate(pred.time.earlyStart || pred.time.scheduleStart);
          fromX = this.dateToX(predStart);
          const succStart = parseDate(succ.time.earlyStart || succ.time.scheduleStart);
          toX = this.dateToX(succStart);
          break;
        }
        default: {
          const predEnd = parseDate(pred.time.earlyFinish || pred.time.scheduleFinish);
          fromX = this.dateToX(predEnd) + this.opts.view.zoom;
          const succStart = parseDate(succ.time.earlyStart || succ.time.scheduleStart);
          toX = this.dateToX(succStart);
        }
      }
      if (fromX < this.opts.taskTableWidth && toX < this.opts.taskTableWidth) continue;
      const dirOut = seq.type === "START_START" ? -1 : 1;
      const tight = Math.abs(toX - fromX) < 2 * _GanttRenderer.ARROW_STUB;
      const stub = tight ? _GanttRenderer.ARROW_STUB_TIGHT : _GanttRenderer.ARROW_STUB;
      const xa = fromX + dirOut * stub;
      const enter = toX - stub;
      const pts = this.arrowPts;
      let n = 0;
      if (xa <= enter && this.isColumnFree(obs, xa, predIdx, succIdx)) {
        pts[n++] = fromX;
        pts[n++] = predY;
        pts[n++] = xa;
        pts[n++] = predY;
        pts[n++] = xa;
        pts[n++] = succY;
        pts[n++] = toX;
        pts[n++] = succY;
      } else {
        const down = succIdx >= predIdx;
        const predTop = predY - rowH / 2;
        const succTop = succY - rowH / 2;
        const laneP = down ? predTop + rowH : predTop;
        const laneS = down ? succTop : succTop + rowH;
        const col = laneP === laneS ? enter : this.pickColumn(obs, enter, xa, predIdx, succIdx);
        pts[n++] = fromX;
        pts[n++] = predY;
        pts[n++] = xa;
        pts[n++] = predY;
        pts[n++] = xa;
        pts[n++] = laneP;
        pts[n++] = col;
        pts[n++] = laneP;
        pts[n++] = col;
        pts[n++] = laneS;
        pts[n++] = enter;
        pts[n++] = laneS;
        pts[n++] = enter;
        pts[n++] = succY;
        pts[n++] = toX;
        pts[n++] = succY;
      }
      this.strokeArrowPath(pts, n);
      ctx.beginPath();
      ctx.moveTo(toX, succY);
      ctx.lineTo(toX - 5, succY - 3);
      ctx.lineTo(toX - 5, succY + 3);
      ctx.closePath();
      ctx.fill();
    }
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
  }
  drawTaskTable() {
    const { taskTableWidth, canvasHeight, headerHeight, rowHeight } = this.opts;
    if (taskTableWidth <= 0) return;
    const ctx = this.ctx;
    const collapsed = new Set(this.opts.collapsedTaskIds);
    ctx.fillStyle = this.colors.surface;
    ctx.fillRect(0, 0, taskTableWidth, canvasHeight);
    ctx.fillStyle = this.colors.headerBg;
    ctx.fillRect(0, 0, taskTableWidth, headerHeight);
    const headers = this.opts.columnHeaders || { wbs: "WBS", taskName: "Taaknaam", duration: "Duur" };
    const headerDurationColStart = taskTableWidth - 55;
    ctx.fillStyle = this.colors.text;
    ctx.font = this.font(11, true);
    ctx.textBaseline = "middle";
    ctx.fillText(this.truncate(headers.wbs, 44), 8, headerHeight / 2);
    ctx.fillText(this.truncate(headers.taskName, headerDurationColStart - 60 - 4), 60, headerHeight / 2);
    const durationLabel = this.truncate(headers.duration, 47);
    const durationX = taskTableWidth - 8 - ctx.measureText(durationLabel).width;
    ctx.fillText(durationLabel, durationX, headerHeight / 2);
    ctx.strokeStyle = this.colors.border;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, headerHeight);
    ctx.lineTo(taskTableWidth, headerHeight);
    ctx.stroke();
    for (let i = 0; i < this.rows.length; i++) {
      const row = this.rows[i];
      const y = this.rowToY(i);
      if (y + rowHeight < headerHeight || y > canvasHeight) continue;
      if (row.kind === "group") {
        ctx.fillStyle = this.colors.summary + "1A";
        ctx.fillRect(0, y, taskTableWidth, rowHeight);
        const midY = y + rowHeight / 2;
        const triX = 10 + row.levelIndex * 14;
        ctx.fillStyle = this.colors.textSecondary;
        ctx.beginPath();
        if (row.collapsed) {
          ctx.moveTo(triX, midY - 4);
          ctx.lineTo(triX, midY + 4);
          ctx.lineTo(triX + 6, midY);
        } else {
          ctx.moveTo(triX - 1, midY - 3);
          ctx.lineTo(triX + 7, midY - 3);
          ctx.lineTo(triX + 3, midY + 3);
        }
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = this.colors.text;
        ctx.font = this.font(11, true);
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, y, taskTableWidth - 4, rowHeight);
        ctx.clip();
        ctx.fillText(`${row.label} (${row.count})`, triX + 12, midY);
        ctx.restore();
        ctx.strokeStyle = this.colors.grid;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, y + rowHeight);
        ctx.lineTo(taskTableWidth, y + rowHeight);
        ctx.stroke();
        continue;
      }
      const task = row.task;
      const depth = row.depth;
      const isSelected = this.opts.selectedTaskIds.includes(task.id);
      const isSummary = task.childIds.length > 0;
      const isCollapsed = collapsed.has(task.id);
      if (isSelected) {
        ctx.fillStyle = this.colors.selected + "20";
        ctx.fillRect(0, y, taskTableWidth, rowHeight);
      }
      if (isSummary) {
        ctx.fillStyle = this.colors.summary + "08";
        ctx.fillRect(0, y, taskTableWidth, rowHeight);
      }
      ctx.strokeStyle = this.colors.grid;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, y + rowHeight);
      ctx.lineTo(taskTableWidth, y + rowHeight);
      ctx.stroke();
      const textY = y + rowHeight / 2;
      const indent = 55 + depth * 16;
      if (row.dimmed) ctx.globalAlpha = _GanttRenderer.DIM_ALPHA;
      ctx.fillStyle = this.colors.textSecondary;
      ctx.font = this.font(10);
      ctx.fillText(task.wbsCode || "", 8, textY);
      if (isSummary) {
        const triX = indent - 2;
        const triY = textY;
        ctx.fillStyle = this.colors.textSecondary;
        ctx.beginPath();
        if (isCollapsed) {
          ctx.moveTo(triX - 8, triY - 4);
          ctx.lineTo(triX - 8, triY + 4);
          ctx.lineTo(triX - 2, triY);
        } else {
          ctx.moveTo(triX - 9, triY - 3);
          ctx.lineTo(triX - 1, triY - 3);
          ctx.lineTo(triX - 5, triY + 3);
        }
        ctx.closePath();
        ctx.fill();
      }
      ctx.fillStyle = isSummary ? this.colors.summary : this.colors.text;
      ctx.font = this.font(11, isSummary);
      ctx.save();
      ctx.beginPath();
      ctx.rect(indent, y, taskTableWidth - indent - 55, rowHeight);
      ctx.clip();
      ctx.fillText(task.name, indent + 2, textY);
      ctx.restore();
      if (isSummary) {
        const btnX = taskTableWidth - 52;
        const btnY = textY - 6;
        const btnSize = 12;
        ctx.fillStyle = this.colors.float + "60";
        ctx.beginPath();
        ctx.roundRect(btnX, btnY, btnSize, btnSize, 2);
        ctx.fill();
        ctx.fillStyle = this.colors.barText;
        ctx.font = this.font(10, true);
        ctx.textAlign = "center";
        ctx.fillText("+", btnX + btnSize / 2, textY);
        ctx.textAlign = "left";
      }
      ctx.fillStyle = this.colors.textSecondary;
      ctx.font = this.font(10);
      ctx.textAlign = "right";
      const durText = this.durationText(task);
      ctx.fillText(durText, taskTableWidth - 8, textY);
      ctx.textAlign = "left";
      if (row.dimmed) ctx.globalAlpha = 1;
    }
    ctx.strokeStyle = this.colors.border;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(taskTableWidth, 0);
    ctx.lineTo(taskTableWidth, canvasHeight);
    ctx.stroke();
  }
  /** Hit test (§4.5): welke gedeelde ViewRow ligt op deze canvas-Y? */
  getRowAtY(canvasY) {
    return this.rows[this.getRowIndex(canvasY)] ?? null;
  }
  /** Hit test: which task row is at the given canvas Y? Bandrijen geven null (§4.5). */
  getTaskAtY(canvasY) {
    const row = this.getRowAtY(canvasY);
    return row?.kind === "task" ? row.task : null;
  }
  /** Hit test: get the row index for a Y position */
  getRowIndex(canvasY) {
    return Math.floor((canvasY - this.opts.headerHeight + this.opts.view.scrollY) / this.opts.rowHeight);
  }
  /** Hit test (issue #21 punt 1, fase 2): verticale drieband bínnen de rij op `canvasY` — bovenste
   *  kwart = 'before' (invoegen boven deze rij), onderste kwart = 'after' (invoegen onder deze
   *  rij), middenband = 'nest' (kind worden van deze rij). Hergebruikt exact dezelfde
   *  rowTop-formule als `getRowIndex`/de rij-tekencode hierboven, zodat de zone altijd op de
   *  pixel klopt met waar de rij getekend is. */
  getRowZone(canvasY) {
    const idx = this.getRowIndex(canvasY);
    const rowTop = this.opts.headerHeight + idx * this.opts.rowHeight - this.opts.view.scrollY;
    const frac = (canvasY - rowTop) / this.opts.rowHeight;
    if (frac < 0.25) return "before";
    if (frac > 0.75) return "after";
    return "nest";
  }
  /** Hit test: is this position in the task table area? */
  isInTaskTable(canvasX) {
    return canvasX < this.opts.taskTableWidth;
  }
  /** Hit test: did the click land on the collapse/expand triangle of a summary task? */
  isCollapseToggle(canvasX, canvasY) {
    const row = this.getRowAtY(canvasY);
    if (row?.kind !== "task" || row.task.childIds.length === 0) return null;
    const indent = 55 + row.depth * 16;
    if (canvasX >= indent - 14 && canvasX <= indent + 2) {
      return row.task;
    }
    return null;
  }
  /** Hit test: did the click land on the '+' button of a summary task? */
  isAddButton(canvasX, canvasY) {
    const task = this.getTaskAtY(canvasY);
    if (!task || task.childIds.length === 0) return null;
    const btnX = this.opts.taskTableWidth - 52;
    if (canvasX >= btnX && canvasX <= btnX + 14) {
      return task;
    }
    return null;
  }
  /** Hit test (fase 2.10 golf 4, box-selection): welke taak-ids liggen met hun rij-band verticaal
   *  in [y1,y2] (canvas-coördinaten, willekeurige volgorde)? Bandrijen (`kind:'group'`) doen niet
   *  mee. Zelfde rij-index-wiskunde als getRowAtY, dus consistent met alle andere hit-tests. */
  getTaskIdsInYRange(y1, y2) {
    const lo = Math.max(0, this.getRowIndex(Math.min(y1, y2)));
    const hi = Math.min(this.rows.length - 1, this.getRowIndex(Math.max(y1, y2)));
    const ids = [];
    for (let i = lo; i <= hi; i++) {
      const row = this.rows[i];
      if (row?.kind === "task") ids.push(row.task.id);
    }
    return ids;
  }
  /** Hit test: get task bar bounds for a task at row index (for drag & drop) */
  getTaskBarBounds(canvasX, canvasY) {
    if (canvasX < this.opts.taskTableWidth) return null;
    const task = this.getTaskAtY(canvasY);
    if (!task || task.childIds.length > 0 || task.isMilestone) return null;
    const { x1, x2 } = this.barGeometry(task);
    const edgeZone = 6;
    if (canvasX >= x1 - edgeZone && canvasX <= x2 + edgeZone) {
      if (canvasX <= x1 + edgeZone) return { task, edge: "left" };
      if (canvasX >= x2 - edgeZone) return { task, edge: "right" };
      return { task, edge: "body" };
    }
    return null;
  }
};

// tests/planning/check-drag-duration-badge.ts
var g = globalThis;
g.document = { documentElement: {} };
g.getComputedStyle = () => ({ getPropertyValue: () => "" });
var S = () => useAppStore.getState();
var checks = 0;
var diffs = [];
function eq(label, actual, expected) {
  checks++;
  if (actual !== expected) diffs.push(`${label}: kreeg ${JSON.stringify(actual)}, verwacht ${JSON.stringify(expected)}`);
}
function near(label, actual, expected, tol = 0.51) {
  checks++;
  if (!(Math.abs(actual - expected) <= tol)) diffs.push(`${label}: kreeg ${actual}, verwacht \u2248${expected}`);
}
var CHAR_W = 6;
function makeCtx() {
  const ops = [];
  const noop = () => {
  };
  const ctx = {
    fillStyle: "",
    strokeStyle: "",
    lineWidth: 1,
    font: "",
    textAlign: "",
    textBaseline: "",
    globalAlpha: 1,
    lineCap: "",
    lineJoin: "",
    shadowBlur: 0,
    shadowColor: "",
    fillRect: noop,
    strokeRect: noop,
    clearRect: noop,
    beginPath: noop,
    closePath: noop,
    moveTo: noop,
    lineTo: noop,
    arc: noop,
    arcTo: noop,
    ellipse: noop,
    rect: noop,
    roundRect: (x, y, w, h) => {
      ops.push({ kind: "roundRect", x, y, w, h });
    },
    fill: noop,
    stroke: noop,
    save: noop,
    restore: noop,
    clip: noop,
    translate: noop,
    scale: noop,
    rotate: noop,
    setLineDash: noop,
    getLineDash: () => [],
    fillText: (text, x, y) => {
      ops.push({ kind: "fillText", text, x, y });
    },
    strokeText: noop,
    measureText: (t) => ({ width: String(t).length * CHAR_W }),
    createLinearGradient: () => ({ addColorStop: noop }),
    createPattern: () => null,
    quadraticCurveTo: noop,
    bezierCurveTo: noop,
    drawImage: noop
  };
  return { ctx, ops };
}
var CANVAS_W = 900;
var CANVAS_H = 300;
var TABLE_W = 300;
var ROW_H = 28;
var HEADER_H = 50;
function baseOpts(rows, zoom, scrollX, extra = {}) {
  const st = S();
  return {
    rows,
    sequences: [],
    calendar: st.calendar,
    view: { ...st.view, zoom, scrollX, scrollY: 0, viewStartDate: "2026-08-01" },
    selectedTaskIds: [],
    collapsedTaskIds: [],
    canvasWidth: CANVAS_W,
    canvasHeight: CANVAS_H,
    taskTableWidth: TABLE_W,
    rowHeight: ROW_H,
    headerHeight: HEADER_H,
    ...extra
  };
}
function badgeOps(opts, drag) {
  const a = makeCtx();
  new GanttRenderer(a.ctx, { ...opts, durationDrag: void 0 }).render();
  const b = makeCtx();
  new GanttRenderer(b.ctx, { ...opts, durationDrag: drag }).render();
  const baseline = a.ops.map((o) => JSON.stringify(o));
  const seen = /* @__PURE__ */ new Map();
  for (const k of baseline) seen.set(k, (seen.get(k) ?? 0) + 1);
  const extra = [];
  for (const op of b.ops) {
    const k = JSON.stringify(op);
    const n = seen.get(k) ?? 0;
    if (n > 0) seen.set(k, n - 1);
    else extra.push(op);
  }
  return extra;
}
function badge(opts, drag, label) {
  const extra = badgeOps(opts, drag);
  const rects = extra.filter((o) => o.kind === "roundRect");
  const texts = extra.filter((o) => o.kind === "fillText");
  eq(`${label}: aantal extra roundRects`, rects.length, 1);
  eq(`${label}: aantal extra fillTexts`, texts.length, 1);
  return { rect: rects[0], text: texts[0] };
}
S().newProject();
S().addTask({ name: "Brede taak" });
S().addTask({ name: "Smalle taak" });
var [wide, narrow] = S().tasks;
function setDates(id, start, finish, days) {
  const t = S().tasks.find((x) => x.id === id);
  S().updateTask(id, {
    time: { ...t.time, scheduleStart: start, scheduleFinish: finish, earlyStart: start, earlyFinish: finish, scheduleDuration: days }
  });
}
setDates(wide.id, "2026-08-03", "2026-08-14", 10);
setDates(narrow.id, "2026-08-03", "2026-08-03", 1);
var rowsOf = (...ids) => ids.map((id) => ({ kind: "task", task: S().tasks.find((t) => t.id === id), depth: 0, dimmed: false }));
var MS = 864e5;
var dayX = (iso2, zoom, scrollX) => TABLE_W + (Date.parse(`${iso2}T00:00:00Z`) - Date.parse("2026-08-01T00:00:00Z")) / MS * zoom - scrollX;
var PAD_X = 5;
var GAP = 4;
var BADGE_H = 16;
var wOf = (label) => label.length * CHAR_W + PAD_X * 2;
{
  const zoom = 30;
  const opts = baseOpts(rowsOf(wide.id), zoom, 0);
  const x2 = dayX("2026-08-14", zoom, 0) + zoom;
  const b = badge(opts, { taskId: wide.id, edge: "right" }, "breed/rechts");
  eq("breed/rechts: label", b.text.text, "10d");
  near("breed/rechts: rechterrand pil", b.rect.x + b.rect.w, x2 - GAP);
  eq("breed/rechts: pilbreedte", b.rect.w, wOf("10d"));
  eq("breed/rechts: pilhoogte", b.rect.h, BADGE_H);
  near("breed/rechts: pil-y", b.rect.y, HEADER_H + (ROW_H - ROW_H / 2) / 2 + (ROW_H / 2 - BADGE_H) / 2);
}
{
  const zoom = 8;
  const opts = baseOpts(rowsOf(narrow.id), zoom, 0);
  const x2 = dayX("2026-08-03", zoom, 0) + zoom;
  const b = badge(opts, { taskId: narrow.id, edge: "right" }, "smal/rechts");
  eq("smal/rechts: label", b.text.text, "1d");
  near("smal/rechts: linkerrand pil", b.rect.x, x2 + GAP);
}
{
  const zoom = 30;
  const opts = baseOpts(rowsOf(wide.id), zoom, 0);
  const x1 = dayX("2026-08-03", zoom, 0);
  const b = badge(opts, { taskId: wide.id, edge: "left" }, "breed/links");
  near("breed/links: rechterrand pil", b.rect.x + b.rect.w, x1 - GAP);
}
{
  const zoom = 30;
  const scrollX = dayX("2026-08-03", zoom, 0) - TABLE_W;
  const opts = baseOpts(rowsOf(wide.id), zoom, scrollX);
  const b = badge(opts, { taskId: wide.id, edge: "left" }, "linkerrand");
  checks++;
  if (b.rect.x < TABLE_W) diffs.push(`linkerrand: pil begint op ${b.rect.x}, dus links van de taaktabelgrens ${TABLE_W}`);
}
{
  const zoom = 30;
  const scrollX = dayX("2026-08-14", zoom, 0) + zoom - (CANVAS_W + 10);
  const opts = baseOpts(rowsOf(wide.id), zoom, scrollX);
  const b = badge(opts, { taskId: wide.id, edge: "right" }, "rechterrand");
  checks++;
  if (b.rect.x + b.rect.w > CANVAS_W) diffs.push(`rechterrand: pil loopt tot ${b.rect.x + b.rect.w}, voorbij canvasbreedte ${CANVAS_W}`);
  near("rechterrand: pil geklemd", b.rect.x + b.rect.w, CANVAS_W - 2);
}
{
  const opts = baseOpts(rowsOf(wide.id), 30, 0, { view: { ...S().view, zoom: 30, scrollX: 0, scrollY: 5e3, viewStartDate: "2026-08-01" } });
  const extra = badgeOps(opts, { taskId: wide.id, edge: "right" });
  eq("weggescrolde rij: geen extra ops", extra.length, 0);
}
{
  const opts = baseOpts(rowsOf(wide.id), 30, 0);
  eq("onbekend id: geen extra ops", badgeOps(opts, { taskId: "bestaat-niet", edge: "right" }).length, 0);
}
{
  const opts = baseOpts(rowsOf(wide.id), 30, 0, { durationSuffixes: { day: "j", hour: "h", minute: "m" } });
  const b = badge(opts, { taskId: wide.id, edge: "right" }, "suffix");
  eq("suffix: vertaalde dag-afkorting", b.text.text, "10j");
}
{
  S().addTask({ name: "Uurtaak" });
  const hourTask = S().tasks[S().tasks.length - 1];
  const bands = [{ start: 480, end: 720 }, { start: 780, end: 1020 }];
  const hourCal = {
    id: "cal-uur",
    name: "Uurkalender",
    description: "",
    workDays: [1, 2, 3, 4, 5],
    workStartHour: 8,
    workEndHour: 17,
    hoursPerDay: 8,
    holidays: [],
    workTime: { byWeekday: { 1: bands, 2: bands, 3: bands, 4: bands, 5: bands, 6: [], 7: [] } }
  };
  const t = S().tasks.find((x) => x.id === hourTask.id);
  S().updateTask(hourTask.id, {
    calendarId: "cal-uur",
    time: {
      ...t.time,
      scheduleStart: "2026-08-03T08:00",
      scheduleFinish: "2026-08-03T17:00",
      earlyStart: "2026-08-03T08:00",
      earlyFinish: "2026-08-03T17:00",
      scheduleDuration: 1,
      durationMinutes: 300
    }
  });
  const effectiveCalById = /* @__PURE__ */ new Map([[hourTask.id, hourCal]]);
  for (const enableHourPlanning of [false, true]) {
    const opts = baseOpts(rowsOf(hourTask.id), 300, 0, { effectiveCalById, enableHourPlanning });
    const b = badge(opts, { taskId: hourTask.id, edge: "right" }, `uurtaak(hp=${enableHourPlanning})`);
    eq(`uurtaak(hp=${enableHourPlanning}): label in uren`, b.text.text, "5u");
  }
}
if (diffs.length) {
  for (const d of diffs) console.log(`   XX ${d}`);
  console.log(`XX duur-pil (#51): ${diffs.length} afwijking(en) van ${checks} checks`);
  process.exit(1);
}
console.log(`OK duur-pil (#51): ${checks} checks groen`);
/*! Bundled license information:

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
