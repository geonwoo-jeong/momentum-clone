(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw ((f.code = "MODULE_NOT_FOUND"), f);
      }
      var l = (n[o] = { exports: {} });
      t[o][0].call(
        l.exports,
        function(e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        },
        l,
        l.exports,
        e,
        t,
        n,
        r
      );
    }
    return n[o].exports;
  }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
})(
  {
    1: [
      function(require, module, exports) {
        "use strict";
        function getOS(e) {
          return -1 !== e.indexOf("Windows Phone")
            ? "Windows Phone"
            : -1 !== e.indexOf("Win")
            ? "Windows"
            : -1 !== e.indexOf("Android")
            ? "Android"
            : -1 !== e.indexOf("Linux")
            ? "Linux"
            : -1 !== e.indexOf("X11")
            ? "UNIX"
            : /iPad|iPhone|iPod/.test(e)
            ? "iOS"
            : -1 !== e.indexOf("Mac")
            ? "OS X"
            : void 0;
        }
        function info(e) {
          var i,
            n = e || navigator.userAgent,
            o = getOS(n),
            r =
              n.match(
                /(opera|coast|chrome|safari|firefox|edge|trident(?=\/))\/?\s*?(\S+)/i
              ) || [];
          if (null !== (i = n.match(/\bIEMobile\/(\S+[0-9])/)))
            return {
              name: "IEMobile",
              version: i[1].split(".")[0],
              fullVersion: i[1],
              os: o
            };
          if (/trident/i.test(r[1]))
            return {
              name: "IE",
              version:
                (i = /\brv[ :]+(\S+[0-9])/g.exec(n) || [])[1] &&
                i[1].split(".")[0],
              fullVersion: i[1],
              os: o
            };
          if ("Chrome" === r[1]) {
            if (null !== (i = n.match(/\bOPR\/(\d+)/)))
              return {
                name: "Opera",
                version: i[1].split(".")[0],
                fullVersion: i[1],
                os: o
              };
            if (null !== (i = n.match(/\bEdge\/(\S+)/)))
              return {
                name: "Edge",
                version: i[1].split(".")[0],
                fullVersion: i[1],
                os: o
              };
          }
          ("Coast" ===
            (r = r[2]
              ? [r[1], r[2]]
              : [navigator.appName, navigator.appVersion, "-?"])[0] &&
            (r[0] = "OperaCoast"),
          "Chrome" !== r[0]) &&
            (null !== (i = n.match(/version\/(\S+)/i)) &&
              "" !== i &&
              r.splice(1, 1, i[1]));
          return (
            "Firefox" === r[0] &&
              (r[0] = /waterfox/i.test(n) ? "Waterfox" : r[0]),
            {
              name: r[0],
              version: r[1].split(".")[0],
              fullVersion: r[1],
              os: o
            }
          );
        }
        module.exports = info;
      },
      {}
    ],
    2: [
      function(require, module, exports) {
        var s = 1e3,
          m = 60 * s,
          h = 60 * m,
          d = 24 * h,
          w = 7 * d,
          y = 365.25 * d;
        function parse(e) {
          if (!((e = String(e)).length > 100)) {
            var r = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
              e
            );
            if (r) {
              var a = parseFloat(r[1]);
              switch ((r[2] || "ms").toLowerCase()) {
                case "years":
                case "year":
                case "yrs":
                case "yr":
                case "y":
                  return a * y;
                case "weeks":
                case "week":
                case "w":
                  return a * w;
                case "days":
                case "day":
                case "d":
                  return a * d;
                case "hours":
                case "hour":
                case "hrs":
                case "hr":
                case "h":
                  return a * h;
                case "minutes":
                case "minute":
                case "mins":
                case "min":
                case "m":
                  return a * m;
                case "seconds":
                case "second":
                case "secs":
                case "sec":
                case "s":
                  return a * s;
                case "milliseconds":
                case "millisecond":
                case "msecs":
                case "msec":
                case "ms":
                  return a;
                default:
                  return;
              }
            }
          }
        }
        function fmtShort(e) {
          var r = Math.abs(e);
          return r >= d
            ? Math.round(e / d) + "d"
            : r >= h
            ? Math.round(e / h) + "h"
            : r >= m
            ? Math.round(e / m) + "m"
            : r >= s
            ? Math.round(e / s) + "s"
            : e + "ms";
        }
        function fmtLong(e) {
          var r = Math.abs(e);
          return r >= d
            ? plural(e, r, d, "day")
            : r >= h
            ? plural(e, r, h, "hour")
            : r >= m
            ? plural(e, r, m, "minute")
            : r >= s
            ? plural(e, r, s, "second")
            : e + " ms";
        }
        function plural(s, e, r, a) {
          var n = e >= 1.5 * r;
          return Math.round(s / r) + " " + a + (n ? "s" : "");
        }
        module.exports = function(s, e) {
          e = e || {};
          var r = typeof s;
          if ("string" === r && s.length > 0) return parse(s);
          if ("number" === r && !1 === isNaN(s))
            return e.long ? fmtLong(s) : fmtShort(s);
          throw new Error(
            "val is not a non-empty string or a valid number. val=" +
              JSON.stringify(s)
          );
        };
      },
      {}
    ],
    3: [
      function(require, module, exports) {
        (function(process) {
          "use strict";
          function _typeof(e) {
            return (_typeof =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function _typeof(e) {
                    return typeof e;
                  }
                : function _typeof(e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  })(e);
          }
          function useColors() {
            return (
              !(
                "undefined" == typeof window ||
                !window.process ||
                ("renderer" !== window.process.type && !window.process.__nwjs)
              ) ||
              (("undefined" == typeof navigator ||
                !navigator.userAgent ||
                !navigator.userAgent
                  .toLowerCase()
                  .match(/(edge|trident)\/(\d+)/)) &&
                (("undefined" != typeof document &&
                  document.documentElement &&
                  document.documentElement.style &&
                  document.documentElement.style.WebkitAppearance) ||
                  ("undefined" != typeof window &&
                    window.console &&
                    (window.console.firebug ||
                      (window.console.exception && window.console.table))) ||
                  ("undefined" != typeof navigator &&
                    navigator.userAgent &&
                    navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
                    parseInt(RegExp.$1, 10) >= 31) ||
                  ("undefined" != typeof navigator &&
                    navigator.userAgent &&
                    navigator.userAgent
                      .toLowerCase()
                      .match(/applewebkit\/(\d+)/))))
            );
          }
          function formatArgs(e) {
            if (
              ((e[0] =
                (this.useColors ? "%c" : "") +
                this.namespace +
                (this.useColors ? " %c" : " ") +
                e[0] +
                (this.useColors ? "%c " : " ") +
                "+" +
                module.exports.humanize(this.diff)),
              this.useColors)
            ) {
              var o = "color: " + this.color;
              e.splice(1, 0, o, "color: inherit");
              var t = 0,
                C = 0;
              e[0].replace(/%[a-zA-Z%]/g, function(e) {
                "%%" !== e && (t++, "%c" === e && (C = t));
              }),
                e.splice(C, 0, o);
            }
          }
          function log() {
            var e;
            return (
              "object" ===
                ("undefined" == typeof console
                  ? "undefined"
                  : _typeof(console)) &&
              console.log &&
              (e = console).log.apply(e, arguments)
            );
          }
          function save(e) {
            try {
              e
                ? exports.storage.setItem("debug", e)
                : exports.storage.removeItem("debug");
            } catch (e) {}
          }
          function load() {
            var e;
            try {
              e = exports.storage.getItem("debug");
            } catch (e) {}
            return (
              !e &&
                "undefined" != typeof process &&
                "env" in process &&
                (e = process.env.DEBUG),
              e
            );
          }
          function localstorage() {
            try {
              return localStorage;
            } catch (e) {}
          }
          (exports.log = log),
            (exports.formatArgs = formatArgs),
            (exports.save = save),
            (exports.load = load),
            (exports.useColors = useColors),
            (exports.storage = localstorage()),
            (exports.colors = [
              "#0000CC",
              "#0000FF",
              "#0033CC",
              "#0033FF",
              "#0066CC",
              "#0066FF",
              "#0099CC",
              "#0099FF",
              "#00CC00",
              "#00CC33",
              "#00CC66",
              "#00CC99",
              "#00CCCC",
              "#00CCFF",
              "#3300CC",
              "#3300FF",
              "#3333CC",
              "#3333FF",
              "#3366CC",
              "#3366FF",
              "#3399CC",
              "#3399FF",
              "#33CC00",
              "#33CC33",
              "#33CC66",
              "#33CC99",
              "#33CCCC",
              "#33CCFF",
              "#6600CC",
              "#6600FF",
              "#6633CC",
              "#6633FF",
              "#66CC00",
              "#66CC33",
              "#9900CC",
              "#9900FF",
              "#9933CC",
              "#9933FF",
              "#99CC00",
              "#99CC33",
              "#CC0000",
              "#CC0033",
              "#CC0066",
              "#CC0099",
              "#CC00CC",
              "#CC00FF",
              "#CC3300",
              "#CC3333",
              "#CC3366",
              "#CC3399",
              "#CC33CC",
              "#CC33FF",
              "#CC6600",
              "#CC6633",
              "#CC9900",
              "#CC9933",
              "#CCCC00",
              "#CCCC33",
              "#FF0000",
              "#FF0033",
              "#FF0066",
              "#FF0099",
              "#FF00CC",
              "#FF00FF",
              "#FF3300",
              "#FF3333",
              "#FF3366",
              "#FF3399",
              "#FF33CC",
              "#FF33FF",
              "#FF6600",
              "#FF6633",
              "#FF9900",
              "#FF9933",
              "#FFCC00",
              "#FFCC33"
            ]),
            (module.exports = require("./common")(exports));
          var formatters = module.exports.formatters;
          formatters.j = function(e) {
            try {
              return JSON.stringify(e);
            } catch (e) {
              return "[UnexpectedJSONParseError]: " + e.message;
            }
          };
        }.call(this, require("_process")));
      },
      { "./common": 4, _process: 7 }
    ],
    4: [
      function(require, module, exports) {
        "use strict";
        function setup(e) {
          function selectColor(e) {
            for (var r = 0, t = 0; t < e.length; t++)
              (r = (r << 5) - r + e.charCodeAt(t)), (r |= 0);
            return createDebug.colors[Math.abs(r) % createDebug.colors.length];
          }
          function createDebug(e) {
            var r;
            function debug() {
              for (
                var e = arguments.length, t = new Array(e), a = 0;
                a < e;
                a++
              )
                t[a] = arguments[a];
              if (debug.enabled) {
                var u = debug,
                  n = Number(new Date()),
                  c = n - (r || n);
                (u.diff = c),
                  (u.prev = r),
                  (u.curr = n),
                  (r = n),
                  (t[0] = createDebug.coerce(t[0])),
                  "string" != typeof t[0] && t.unshift("%O");
                var g = 0;
                (t[0] = t[0].replace(/%([a-zA-Z%])/g, function(e, r) {
                  if ("%%" === e) return e;
                  g++;
                  var a = createDebug.formatters[r];
                  if ("function" == typeof a) {
                    var n = t[g];
                    (e = a.call(u, n)), t.splice(g, 1), g--;
                  }
                  return e;
                })),
                  createDebug.formatArgs.call(u, t),
                  (u.log || createDebug.log).apply(u, t);
              }
            }
            return (
              (debug.namespace = e),
              (debug.enabled = createDebug.enabled(e)),
              (debug.useColors = createDebug.useColors()),
              (debug.color = selectColor(e)),
              (debug.destroy = destroy),
              (debug.extend = extend),
              "function" == typeof createDebug.init && createDebug.init(debug),
              createDebug.instances.push(debug),
              debug
            );
          }
          function destroy() {
            var e = createDebug.instances.indexOf(this);
            return -1 !== e && (createDebug.instances.splice(e, 1), !0);
          }
          function extend(e, r) {
            return createDebug(this.namespace + (void 0 === r ? ":" : r) + e);
          }
          return (
            (createDebug.debug = createDebug),
            (createDebug.default = createDebug),
            (createDebug.coerce = function coerce(e) {
              if (e instanceof Error) return e.stack || e.message;
              return e;
            }),
            (createDebug.disable = function disable() {
              createDebug.enable("");
            }),
            (createDebug.enable = function enable(e) {
              var r;
              createDebug.save(e),
                (createDebug.names = []),
                (createDebug.skips = []);
              var t = ("string" == typeof e ? e : "").split(/[\s,]+/),
                a = t.length;
              for (r = 0; r < a; r++)
                t[r] &&
                  ("-" === (e = t[r].replace(/\*/g, ".*?"))[0]
                    ? createDebug.skips.push(
                        new RegExp("^" + e.substr(1) + "$")
                      )
                    : createDebug.names.push(new RegExp("^" + e + "$")));
              for (r = 0; r < createDebug.instances.length; r++) {
                var u = createDebug.instances[r];
                u.enabled = createDebug.enabled(u.namespace);
              }
            }),
            (createDebug.enabled = function enabled(e) {
              if ("*" === e[e.length - 1]) return !0;
              var r, t;
              for (r = 0, t = createDebug.skips.length; r < t; r++)
                if (createDebug.skips[r].test(e)) return !1;
              for (r = 0, t = createDebug.names.length; r < t; r++)
                if (createDebug.names[r].test(e)) return !0;
              return !1;
            }),
            (createDebug.humanize = require("ms")),
            Object.keys(e).forEach(function(r) {
              createDebug[r] = e[r];
            }),
            (createDebug.instances = []),
            (createDebug.names = []),
            (createDebug.skips = []),
            (createDebug.formatters = {}),
            (createDebug.selectColor = selectColor),
            createDebug.enable(createDebug.load()),
            createDebug
          );
        }
        module.exports = setup;
      },
      { ms: 2 }
    ],
    5: [
      function(require, module, exports) {
        var objectCreate = Object.create || objectCreatePolyfill,
          objectKeys = Object.keys || objectKeysPolyfill,
          bind = Function.prototype.bind || functionBindPolyfill;
        function EventEmitter() {
          (this._events &&
            Object.prototype.hasOwnProperty.call(this, "_events")) ||
            ((this._events = objectCreate(null)), (this._eventsCount = 0)),
            (this._maxListeners = this._maxListeners || void 0);
        }
        (module.exports = EventEmitter),
          (EventEmitter.EventEmitter = EventEmitter),
          (EventEmitter.prototype._events = void 0),
          (EventEmitter.prototype._maxListeners = void 0);
        var hasDefineProperty,
          defaultMaxListeners = 10;
        try {
          var o = {};
          Object.defineProperty && Object.defineProperty(o, "x", { value: 0 }),
            (hasDefineProperty = 0 === o.x);
        } catch (e) {
          hasDefineProperty = !1;
        }
        function $getMaxListeners(e) {
          return void 0 === e._maxListeners
            ? EventEmitter.defaultMaxListeners
            : e._maxListeners;
        }
        function emitNone(e, t, n) {
          if (t) e.call(n);
          else
            for (var r = e.length, i = arrayClone(e, r), s = 0; s < r; ++s)
              i[s].call(n);
        }
        function emitOne(e, t, n, r) {
          if (t) e.call(n, r);
          else
            for (var i = e.length, s = arrayClone(e, i), o = 0; o < i; ++o)
              s[o].call(n, r);
        }
        function emitTwo(e, t, n, r, i) {
          if (t) e.call(n, r, i);
          else
            for (var s = e.length, o = arrayClone(e, s), a = 0; a < s; ++a)
              o[a].call(n, r, i);
        }
        function emitThree(e, t, n, r, i, s) {
          if (t) e.call(n, r, i, s);
          else
            for (var o = e.length, a = arrayClone(e, o), l = 0; l < o; ++l)
              a[l].call(n, r, i, s);
        }
        function emitMany(e, t, n, r) {
          if (t) e.apply(n, r);
          else
            for (var i = e.length, s = arrayClone(e, i), o = 0; o < i; ++o)
              s[o].apply(n, r);
        }
        function _addListener(e, t, n, r) {
          var i, s, o;
          if ("function" != typeof n)
            throw new TypeError('"listener" argument must be a function');
          if (
            ((s = e._events)
              ? (s.newListener &&
                  (e.emit("newListener", t, n.listener ? n.listener : n),
                  (s = e._events)),
                (o = s[t]))
              : ((s = e._events = objectCreate(null)), (e._eventsCount = 0)),
            o)
          ) {
            if (
              ("function" == typeof o
                ? (o = s[t] = r ? [n, o] : [o, n])
                : r
                ? o.unshift(n)
                : o.push(n),
              !o.warned && (i = $getMaxListeners(e)) && i > 0 && o.length > i)
            ) {
              o.warned = !0;
              var a = new Error(
                "Possible EventEmitter memory leak detected. " +
                  o.length +
                  ' "' +
                  String(t) +
                  '" listeners added. Use emitter.setMaxListeners() to increase limit.'
              );
              (a.name = "MaxListenersExceededWarning"),
                (a.emitter = e),
                (a.type = t),
                (a.count = o.length),
                "object" == typeof console &&
                  console.warn &&
                  console.warn("%s: %s", a.name, a.message);
            }
          } else (o = s[t] = n), ++e._eventsCount;
          return e;
        }
        function onceWrapper() {
          if (!this.fired)
            switch (
              (this.target.removeListener(this.type, this.wrapFn),
              (this.fired = !0),
              arguments.length)
            ) {
              case 0:
                return this.listener.call(this.target);
              case 1:
                return this.listener.call(this.target, arguments[0]);
              case 2:
                return this.listener.call(
                  this.target,
                  arguments[0],
                  arguments[1]
                );
              case 3:
                return this.listener.call(
                  this.target,
                  arguments[0],
                  arguments[1],
                  arguments[2]
                );
              default:
                for (
                  var e = new Array(arguments.length), t = 0;
                  t < e.length;
                  ++t
                )
                  e[t] = arguments[t];
                this.listener.apply(this.target, e);
            }
        }
        function _onceWrap(e, t, n) {
          var r = {
              fired: !1,
              wrapFn: void 0,
              target: e,
              type: t,
              listener: n
            },
            i = bind.call(onceWrapper, r);
          return (i.listener = n), (r.wrapFn = i), i;
        }
        function _listeners(e, t, n) {
          var r = e._events;
          if (!r) return [];
          var i = r[t];
          return i
            ? "function" == typeof i
              ? n
                ? [i.listener || i]
                : [i]
              : n
              ? unwrapListeners(i)
              : arrayClone(i, i.length)
            : [];
        }
        function listenerCount(e) {
          var t = this._events;
          if (t) {
            var n = t[e];
            if ("function" == typeof n) return 1;
            if (n) return n.length;
          }
          return 0;
        }
        function spliceOne(e, t) {
          for (var n = t, r = n + 1, i = e.length; r < i; n += 1, r += 1)
            e[n] = e[r];
          e.pop();
        }
        function arrayClone(e, t) {
          for (var n = new Array(t), r = 0; r < t; ++r) n[r] = e[r];
          return n;
        }
        function unwrapListeners(e) {
          for (var t = new Array(e.length), n = 0; n < t.length; ++n)
            t[n] = e[n].listener || e[n];
          return t;
        }
        function objectCreatePolyfill(e) {
          var t = function() {};
          return (t.prototype = e), new t();
        }
        function objectKeysPolyfill(e) {
          var t = [];
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
          return n;
        }
        function functionBindPolyfill(e) {
          var t = this;
          return function() {
            return t.apply(e, arguments);
          };
        }
        hasDefineProperty
          ? Object.defineProperty(EventEmitter, "defaultMaxListeners", {
              enumerable: !0,
              get: function() {
                return defaultMaxListeners;
              },
              set: function(e) {
                if ("number" != typeof e || e < 0 || e != e)
                  throw new TypeError(
                    '"defaultMaxListeners" must be a positive number'
                  );
                defaultMaxListeners = e;
              }
            })
          : (EventEmitter.defaultMaxListeners = defaultMaxListeners),
          (EventEmitter.prototype.setMaxListeners = function setMaxListeners(
            e
          ) {
            if ("number" != typeof e || e < 0 || isNaN(e))
              throw new TypeError('"n" argument must be a positive number');
            return (this._maxListeners = e), this;
          }),
          (EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
            return $getMaxListeners(this);
          }),
          (EventEmitter.prototype.emit = function emit(e) {
            var t,
              n,
              r,
              i,
              s,
              o,
              a = "error" === e;
            if ((o = this._events)) a = a && null == o.error;
            else if (!a) return !1;
            if (a) {
              if (
                (arguments.length > 1 && (t = arguments[1]), t instanceof Error)
              )
                throw t;
              var l = new Error('Unhandled "error" event. (' + t + ")");
              throw ((l.context = t), l);
            }
            if (!(n = o[e])) return !1;
            var u = "function" == typeof n;
            switch ((r = arguments.length)) {
              case 1:
                emitNone(n, u, this);
                break;
              case 2:
                emitOne(n, u, this, arguments[1]);
                break;
              case 3:
                emitTwo(n, u, this, arguments[1], arguments[2]);
                break;
              case 4:
                emitThree(n, u, this, arguments[1], arguments[2], arguments[3]);
                break;
              default:
                for (i = new Array(r - 1), s = 1; s < r; s++)
                  i[s - 1] = arguments[s];
                emitMany(n, u, this, i);
            }
            return !0;
          }),
          (EventEmitter.prototype.addListener = function addListener(e, t) {
            return _addListener(this, e, t, !1);
          }),
          (EventEmitter.prototype.on = EventEmitter.prototype.addListener),
          (EventEmitter.prototype.prependListener = function prependListener(
            e,
            t
          ) {
            return _addListener(this, e, t, !0);
          }),
          (EventEmitter.prototype.once = function once(e, t) {
            if ("function" != typeof t)
              throw new TypeError('"listener" argument must be a function');
            return this.on(e, _onceWrap(this, e, t)), this;
          }),
          (EventEmitter.prototype.prependOnceListener = function prependOnceListener(
            e,
            t
          ) {
            if ("function" != typeof t)
              throw new TypeError('"listener" argument must be a function');
            return this.prependListener(e, _onceWrap(this, e, t)), this;
          }),
          (EventEmitter.prototype.removeListener = function removeListener(
            e,
            t
          ) {
            var n, r, i, s, o;
            if ("function" != typeof t)
              throw new TypeError('"listener" argument must be a function');
            if (!(r = this._events)) return this;
            if (!(n = r[e])) return this;
            if (n === t || n.listener === t)
              0 == --this._eventsCount
                ? (this._events = objectCreate(null))
                : (delete r[e],
                  r.removeListener &&
                    this.emit("removeListener", e, n.listener || t));
            else if ("function" != typeof n) {
              for (i = -1, s = n.length - 1; s >= 0; s--)
                if (n[s] === t || n[s].listener === t) {
                  (o = n[s].listener), (i = s);
                  break;
                }
              if (i < 0) return this;
              0 === i ? n.shift() : spliceOne(n, i),
                1 === n.length && (r[e] = n[0]),
                r.removeListener && this.emit("removeListener", e, o || t);
            }
            return this;
          }),
          (EventEmitter.prototype.removeAllListeners = function removeAllListeners(
            e
          ) {
            var t, n, r;
            if (!(n = this._events)) return this;
            if (!n.removeListener)
              return (
                0 === arguments.length
                  ? ((this._events = objectCreate(null)),
                    (this._eventsCount = 0))
                  : n[e] &&
                    (0 == --this._eventsCount
                      ? (this._events = objectCreate(null))
                      : delete n[e]),
                this
              );
            if (0 === arguments.length) {
              var i,
                s = objectKeys(n);
              for (r = 0; r < s.length; ++r)
                "removeListener" !== (i = s[r]) && this.removeAllListeners(i);
              return (
                this.removeAllListeners("removeListener"),
                (this._events = objectCreate(null)),
                (this._eventsCount = 0),
                this
              );
            }
            if ("function" == typeof (t = n[e])) this.removeListener(e, t);
            else if (t)
              for (r = t.length - 1; r >= 0; r--) this.removeListener(e, t[r]);
            return this;
          }),
          (EventEmitter.prototype.listeners = function listeners(e) {
            return _listeners(this, e, !0);
          }),
          (EventEmitter.prototype.rawListeners = function rawListeners(e) {
            return _listeners(this, e, !1);
          }),
          (EventEmitter.listenerCount = function(e, t) {
            return "function" == typeof e.listenerCount
              ? e.listenerCount(t)
              : listenerCount.call(e, t);
          }),
          (EventEmitter.prototype.listenerCount = listenerCount),
          (EventEmitter.prototype.eventNames = function eventNames() {
            return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
          });
      },
      {}
    ],
    6: [
      function(require, module, exports) {
        (function(process) {
          function normalizeArray(r, t) {
            for (var e = 0, n = r.length - 1; n >= 0; n--) {
              var s = r[n];
              "." === s
                ? r.splice(n, 1)
                : ".." === s
                ? (r.splice(n, 1), e++)
                : e && (r.splice(n, 1), e--);
            }
            if (t) for (; e--; e) r.unshift("..");
            return r;
          }
          var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
            splitPath = function(r) {
              return splitPathRe.exec(r).slice(1);
            };
          function filter(r, t) {
            if (r.filter) return r.filter(t);
            for (var e = [], n = 0; n < r.length; n++)
              t(r[n], n, r) && e.push(r[n]);
            return e;
          }
          (exports.resolve = function() {
            for (
              var r = "", t = !1, e = arguments.length - 1;
              e >= -1 && !t;
              e--
            ) {
              var n = e >= 0 ? arguments[e] : process.cwd();
              if ("string" != typeof n)
                throw new TypeError(
                  "Arguments to path.resolve must be strings"
                );
              n && ((r = n + "/" + r), (t = "/" === n.charAt(0)));
            }
            return (
              (t ? "/" : "") +
                (r = normalizeArray(
                  filter(r.split("/"), function(r) {
                    return !!r;
                  }),
                  !t
                ).join("/")) || "."
            );
          }),
            (exports.normalize = function(r) {
              var t = exports.isAbsolute(r),
                e = "/" === substr(r, -1);
              return (
                (r = normalizeArray(
                  filter(r.split("/"), function(r) {
                    return !!r;
                  }),
                  !t
                ).join("/")) ||
                  t ||
                  (r = "."),
                r && e && (r += "/"),
                (t ? "/" : "") + r
              );
            }),
            (exports.isAbsolute = function(r) {
              return "/" === r.charAt(0);
            }),
            (exports.join = function() {
              var r = Array.prototype.slice.call(arguments, 0);
              return exports.normalize(
                filter(r, function(r, t) {
                  if ("string" != typeof r)
                    throw new TypeError(
                      "Arguments to path.join must be strings"
                    );
                  return r;
                }).join("/")
              );
            }),
            (exports.relative = function(r, t) {
              function trim(r) {
                for (var t = 0; t < r.length && "" === r[t]; t++);
                for (var e = r.length - 1; e >= 0 && "" === r[e]; e--);
                return t > e ? [] : r.slice(t, e - t + 1);
              }
              (r = exports.resolve(r).substr(1)),
                (t = exports.resolve(t).substr(1));
              for (
                var e = trim(r.split("/")),
                  n = trim(t.split("/")),
                  s = Math.min(e.length, n.length),
                  i = s,
                  o = 0;
                o < s;
                o++
              )
                if (e[o] !== n[o]) {
                  i = o;
                  break;
                }
              var u = [];
              for (o = i; o < e.length; o++) u.push("..");
              return (u = u.concat(n.slice(i))).join("/");
            }),
            (exports.sep = "/"),
            (exports.delimiter = ":"),
            (exports.dirname = function(r) {
              var t = splitPath(r),
                e = t[0],
                n = t[1];
              return e || n
                ? (n && (n = n.substr(0, n.length - 1)), e + n)
                : ".";
            }),
            (exports.basename = function(r, t) {
              var e = splitPath(r)[2];
              return (
                t &&
                  e.substr(-1 * t.length) === t &&
                  (e = e.substr(0, e.length - t.length)),
                e
              );
            }),
            (exports.extname = function(r) {
              return splitPath(r)[3];
            });
          var substr =
            "b" === "ab".substr(-1)
              ? function(r, t, e) {
                  return r.substr(t, e);
                }
              : function(r, t, e) {
                  return t < 0 && (t = r.length + t), r.substr(t, e);
                };
        }.call(this, require("_process")));
      },
      { _process: 7 }
    ],
    7: [
      function(require, module, exports) {
        var cachedSetTimeout,
          cachedClearTimeout,
          process = (module.exports = {});
        function defaultSetTimout() {
          throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
          throw new Error("clearTimeout has not been defined");
        }
        function runTimeout(e) {
          if (cachedSetTimeout === setTimeout) return setTimeout(e, 0);
          if (
            (cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) &&
            setTimeout
          )
            return (cachedSetTimeout = setTimeout), setTimeout(e, 0);
          try {
            return cachedSetTimeout(e, 0);
          } catch (t) {
            try {
              return cachedSetTimeout.call(null, e, 0);
            } catch (t) {
              return cachedSetTimeout.call(this, e, 0);
            }
          }
        }
        function runClearTimeout(e) {
          if (cachedClearTimeout === clearTimeout) return clearTimeout(e);
          if (
            (cachedClearTimeout === defaultClearTimeout ||
              !cachedClearTimeout) &&
            clearTimeout
          )
            return (cachedClearTimeout = clearTimeout), clearTimeout(e);
          try {
            return cachedClearTimeout(e);
          } catch (t) {
            try {
              return cachedClearTimeout.call(null, e);
            } catch (t) {
              return cachedClearTimeout.call(this, e);
            }
          }
        }
        !(function() {
          try {
            cachedSetTimeout =
              "function" == typeof setTimeout ? setTimeout : defaultSetTimout;
          } catch (e) {
            cachedSetTimeout = defaultSetTimout;
          }
          try {
            cachedClearTimeout =
              "function" == typeof clearTimeout
                ? clearTimeout
                : defaultClearTimeout;
          } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
          }
        })();
        var currentQueue,
          queue = [],
          draining = !1,
          queueIndex = -1;
        function cleanUpNextTick() {
          draining &&
            currentQueue &&
            ((draining = !1),
            currentQueue.length
              ? (queue = currentQueue.concat(queue))
              : (queueIndex = -1),
            queue.length && drainQueue());
        }
        function drainQueue() {
          if (!draining) {
            var e = runTimeout(cleanUpNextTick);
            draining = !0;
            for (var t = queue.length; t; ) {
              for (currentQueue = queue, queue = []; ++queueIndex < t; )
                currentQueue && currentQueue[queueIndex].run();
              (queueIndex = -1), (t = queue.length);
            }
            (currentQueue = null), (draining = !1), runClearTimeout(e);
          }
        }
        function Item(e, t) {
          (this.fun = e), (this.array = t);
        }
        function noop() {}
        (process.nextTick = function(e) {
          var t = new Array(arguments.length - 1);
          if (arguments.length > 1)
            for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
          queue.push(new Item(e, t)),
            1 !== queue.length || draining || runTimeout(drainQueue);
        }),
          (Item.prototype.run = function() {
            this.fun.apply(null, this.array);
          }),
          (process.title = "browser"),
          (process.browser = !0),
          (process.env = {}),
          (process.argv = []),
          (process.version = ""),
          (process.versions = {}),
          (process.on = noop),
          (process.addListener = noop),
          (process.once = noop),
          (process.off = noop),
          (process.removeListener = noop),
          (process.removeAllListeners = noop),
          (process.emit = noop),
          (process.prependListener = noop),
          (process.prependOnceListener = noop),
          (process.listeners = function(e) {
            return [];
          }),
          (process.binding = function(e) {
            throw new Error("process.binding is not supported");
          }),
          (process.cwd = function() {
            return "/";
          }),
          (process.chdir = function(e) {
            throw new Error("process.chdir is not supported");
          }),
          (process.umask = function() {
            return 0;
          });
      },
      {}
    ],
    8: [
      function(require, module, exports) {
        (function(global) {
          !(function(e) {
            var o =
                "object" == typeof exports &&
                exports &&
                !exports.nodeType &&
                exports,
              r =
                "object" == typeof module &&
                module &&
                !module.nodeType &&
                module,
              n = "object" == typeof global && global;
            (n.global !== n && n.window !== n && n.self !== n) || (e = n);
            var t,
              i,
              c = 2147483647,
              d = 36,
              u = 1,
              f = 26,
              a = 38,
              s = 700,
              p = 72,
              l = 128,
              h = "-",
              v = /^xn--/,
              g = /[^\x20-\x7E]/,
              m = /[\x2E\u3002\uFF0E\uFF61]/g,
              w = {
                overflow: "Overflow: input needs wider integers to process",
                "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                "invalid-input": "Invalid input"
              },
              x = d - u,
              b = Math.floor,
              y = String.fromCharCode;
            function error(e) {
              throw new RangeError(w[e]);
            }
            function map(e, o) {
              for (var r = e.length, n = []; r--; ) n[r] = o(e[r]);
              return n;
            }
            function mapDomain(e, o) {
              var r = e.split("@"),
                n = "";
              return (
                r.length > 1 && ((n = r[0] + "@"), (e = r[1])),
                n + map((e = e.replace(m, ".")).split("."), o).join(".")
              );
            }
            function ucs2decode(e) {
              for (var o, r, n = [], t = 0, i = e.length; t < i; )
                (o = e.charCodeAt(t++)) >= 55296 && o <= 56319 && t < i
                  ? 56320 == (64512 & (r = e.charCodeAt(t++)))
                    ? n.push(((1023 & o) << 10) + (1023 & r) + 65536)
                    : (n.push(o), t--)
                  : n.push(o);
              return n;
            }
            function ucs2encode(e) {
              return map(e, function(e) {
                var o = "";
                return (
                  e > 65535 &&
                    ((o += y((((e -= 65536) >>> 10) & 1023) | 55296)),
                    (e = 56320 | (1023 & e))),
                  (o += y(e))
                );
              }).join("");
            }
            function digitToBasic(e, o) {
              return e + 22 + 75 * (e < 26) - ((0 != o) << 5);
            }
            function adapt(e, o, r) {
              var n = 0;
              for (
                e = r ? b(e / s) : e >> 1, e += b(e / o);
                e > (x * f) >> 1;
                n += d
              )
                e = b(e / x);
              return b(n + ((x + 1) * e) / (e + a));
            }
            function decode(e) {
              var o,
                r,
                n,
                t,
                i,
                a,
                s,
                v,
                g,
                m,
                w,
                x = [],
                y = e.length,
                C = 0,
                j = l,
                A = p;
              for ((r = e.lastIndexOf(h)) < 0 && (r = 0), n = 0; n < r; ++n)
                e.charCodeAt(n) >= 128 && error("not-basic"),
                  x.push(e.charCodeAt(n));
              for (t = r > 0 ? r + 1 : 0; t < y; ) {
                for (
                  i = C, a = 1, s = d;
                  t >= y && error("invalid-input"),
                    ((v =
                      (w = e.charCodeAt(t++)) - 48 < 10
                        ? w - 22
                        : w - 65 < 26
                        ? w - 65
                        : w - 97 < 26
                        ? w - 97
                        : d) >= d ||
                      v > b((c - C) / a)) &&
                      error("overflow"),
                    (C += v * a),
                    !(v < (g = s <= A ? u : s >= A + f ? f : s - A));
                  s += d
                )
                  a > b(c / (m = d - g)) && error("overflow"), (a *= m);
                (A = adapt(C - i, (o = x.length + 1), 0 == i)),
                  b(C / o) > c - j && error("overflow"),
                  (j += b(C / o)),
                  (C %= o),
                  x.splice(C++, 0, j);
              }
              return ucs2encode(x);
            }
            function encode(e) {
              var o,
                r,
                n,
                t,
                i,
                a,
                s,
                v,
                g,
                m,
                w,
                x,
                C,
                j,
                A,
                I = [];
              for (
                x = (e = ucs2decode(e)).length, o = l, r = 0, i = p, a = 0;
                a < x;
                ++a
              )
                (w = e[a]) < 128 && I.push(y(w));
              for (n = t = I.length, t && I.push(h); n < x; ) {
                for (s = c, a = 0; a < x; ++a)
                  (w = e[a]) >= o && w < s && (s = w);
                for (
                  s - o > b((c - r) / (C = n + 1)) && error("overflow"),
                    r += (s - o) * C,
                    o = s,
                    a = 0;
                  a < x;
                  ++a
                )
                  if (
                    ((w = e[a]) < o && ++r > c && error("overflow"), w == o)
                  ) {
                    for (
                      v = r, g = d;
                      !(v < (m = g <= i ? u : g >= i + f ? f : g - i));
                      g += d
                    )
                      (A = v - m),
                        (j = d - m),
                        I.push(y(digitToBasic(m + (A % j), 0))),
                        (v = b(A / j));
                    I.push(y(digitToBasic(v, 0))),
                      (i = adapt(r, C, n == t)),
                      (r = 0),
                      ++n;
                  }
                ++r, ++o;
              }
              return I.join("");
            }
            if (
              ((t = {
                version: "1.4.1",
                ucs2: { decode: ucs2decode, encode: ucs2encode },
                decode: decode,
                encode: encode,
                toASCII: function toASCII(e) {
                  return mapDomain(e, function(e) {
                    return g.test(e) ? "xn--" + encode(e) : e;
                  });
                },
                toUnicode: function toUnicode(e) {
                  return mapDomain(e, function(e) {
                    return v.test(e) ? decode(e.slice(4).toLowerCase()) : e;
                  });
                }
              }),
              "function" == typeof define &&
                "object" == typeof define.amd &&
                define.amd)
            )
              define("punycode", function() {
                return t;
              });
            else if (o && r)
              if (module.exports == o) r.exports = t;
              else for (i in t) t.hasOwnProperty(i) && (o[i] = t[i]);
            else e.punycode = t;
          })(this);
        }.call(
          this,
          typeof global !== "undefined"
            ? global
            : typeof self !== "undefined"
            ? self
            : typeof window !== "undefined"
            ? window
            : {}
        ));
      },
      {}
    ],
    9: [
      function(require, module, exports) {
        "use strict";
        function hasOwnProperty(r, e) {
          return Object.prototype.hasOwnProperty.call(r, e);
        }
        module.exports = function(r, e, t, n) {
          (e = e || "&"), (t = t || "=");
          var o = {};
          if ("string" != typeof r || 0 === r.length) return o;
          var a = /\+/g;
          r = r.split(e);
          var s = 1e3;
          n && "number" == typeof n.maxKeys && (s = n.maxKeys);
          var p = r.length;
          s > 0 && p > s && (p = s);
          for (var y = 0; y < p; ++y) {
            var u,
              c,
              i,
              l,
              f = r[y].replace(a, "%20"),
              v = f.indexOf(t);
            v >= 0
              ? ((u = f.substr(0, v)), (c = f.substr(v + 1)))
              : ((u = f), (c = "")),
              (i = decodeURIComponent(u)),
              (l = decodeURIComponent(c)),
              hasOwnProperty(o, i)
                ? isArray(o[i])
                  ? o[i].push(l)
                  : (o[i] = [o[i], l])
                : (o[i] = l);
          }
          return o;
        };
        var isArray =
          Array.isArray ||
          function(r) {
            return "[object Array]" === Object.prototype.toString.call(r);
          };
      },
      {}
    ],
    10: [
      function(require, module, exports) {
        "use strict";
        var stringifyPrimitive = function(r) {
          switch (typeof r) {
            case "string":
              return r;
            case "boolean":
              return r ? "true" : "false";
            case "number":
              return isFinite(r) ? r : "";
            default:
              return "";
          }
        };
        module.exports = function(r, e, t, n) {
          return (
            (e = e || "&"),
            (t = t || "="),
            null === r && (r = void 0),
            "object" == typeof r
              ? map(objectKeys(r), function(n) {
                  var i = encodeURIComponent(stringifyPrimitive(n)) + t;
                  return isArray(r[n])
                    ? map(r[n], function(r) {
                        return i + encodeURIComponent(stringifyPrimitive(r));
                      }).join(e)
                    : i + encodeURIComponent(stringifyPrimitive(r[n]));
                }).join(e)
              : n
              ? encodeURIComponent(stringifyPrimitive(n)) +
                t +
                encodeURIComponent(stringifyPrimitive(r))
              : ""
          );
        };
        var isArray =
          Array.isArray ||
          function(r) {
            return "[object Array]" === Object.prototype.toString.call(r);
          };
        function map(r, e) {
          if (r.map) return r.map(e);
          for (var t = [], n = 0; n < r.length; n++) t.push(e(r[n], n));
          return t;
        }
        var objectKeys =
          Object.keys ||
          function(r) {
            var e = [];
            for (var t in r)
              Object.prototype.hasOwnProperty.call(r, t) && e.push(t);
            return e;
          };
      },
      {}
    ],
    11: [
      function(require, module, exports) {
        "use strict";
        (exports.decode = exports.parse = require("./decode")),
          (exports.encode = exports.stringify = require("./encode"));
      },
      { "./decode": 9, "./encode": 10 }
    ],
    12: [
      function(require, module, exports) {
        function RavenConfigError(r) {
          (this.name = "RavenConfigError"), (this.message = r);
        }
        (RavenConfigError.prototype = new Error()),
          (RavenConfigError.prototype.constructor = RavenConfigError),
          (module.exports = RavenConfigError);
      },
      {}
    ],
    13: [
      function(require, module, exports) {
        var utils = require("./utils"),
          wrapMethod = function(e, a, r) {
            var s = e[a],
              t = e;
            if (a in e) {
              var l = "warn" === a ? "warning" : a;
              e[a] = function() {
                var e = [].slice.call(arguments),
                  i = utils.safeJoin(e, " "),
                  o = { level: l, logger: "console", extra: { arguments: e } };
                "assert" === a
                  ? !1 === e[0] &&
                    ((i =
                      "Assertion failed: " +
                      (utils.safeJoin(e.slice(1), " ") || "console.assert")),
                    (o.extra.arguments = e.slice(1)),
                    r && r(i, o))
                  : r && r(i, o),
                  s && Function.prototype.apply.call(s, t, e);
              };
            }
          };
        module.exports = { wrapMethod: wrapMethod };
      },
      { "./utils": 16 }
    ],
    14: [
      function(require, module, exports) {
        (function(global) {
          var TraceKit = require("../vendor/TraceKit/tracekit"),
            stringify = require("../vendor/json-stringify-safe/stringify"),
            md5 = require("../vendor/md5/md5"),
            RavenConfigError = require("./configError"),
            utils = require("./utils"),
            isErrorEvent = utils.isErrorEvent,
            isDOMError = utils.isDOMError,
            isDOMException = utils.isDOMException,
            isError = utils.isError,
            isObject = utils.isObject,
            isPlainObject = utils.isPlainObject,
            isUndefined = utils.isUndefined,
            isFunction = utils.isFunction,
            isString = utils.isString,
            isArray = utils.isArray,
            isEmptyObject = utils.isEmptyObject,
            each = utils.each,
            objectMerge = utils.objectMerge,
            truncate = utils.truncate,
            objectFrozen = utils.objectFrozen,
            hasKey = utils.hasKey,
            joinRegExp = utils.joinRegExp,
            urlencode = utils.urlencode,
            uuid4 = utils.uuid4,
            htmlTreeAsString = utils.htmlTreeAsString,
            isSameException = utils.isSameException,
            isSameStacktrace = utils.isSameStacktrace,
            parseUrl = utils.parseUrl,
            fill = utils.fill,
            supportsFetch = utils.supportsFetch,
            supportsReferrerPolicy = utils.supportsReferrerPolicy,
            serializeKeysForMessage = utils.serializeKeysForMessage,
            serializeException = utils.serializeException,
            sanitize = utils.sanitize,
            wrapConsoleMethod = require("./console").wrapMethod,
            dsnKeys = "source protocol user pass host port path".split(" "),
            dsnPattern = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/;
          function now() {
            return +new Date();
          }
          var _window =
              "undefined" != typeof window
                ? window
                : "undefined" != typeof global
                ? global
                : "undefined" != typeof self
                ? self
                : {},
            _document = _window.document,
            _navigator = _window.navigator;
          function keepOriginalCallback(e, t) {
            return isFunction(t)
              ? function(r) {
                  return t(r, e);
                }
              : t;
          }
          function Raven() {
            for (var e in ((this._hasJSON = !(
              "object" != typeof JSON || !JSON.stringify
            )),
            (this._hasDocument = !isUndefined(_document)),
            (this._hasNavigator = !isUndefined(_navigator)),
            (this._lastCapturedException = null),
            (this._lastData = null),
            (this._lastEventId = null),
            (this._globalServer = null),
            (this._globalKey = null),
            (this._globalProject = null),
            (this._globalContext = {}),
            (this._globalOptions = {
              release: _window.SENTRY_RELEASE && _window.SENTRY_RELEASE.id,
              logger: "javascript",
              ignoreErrors: [],
              ignoreUrls: [],
              whitelistUrls: [],
              includePaths: [],
              headers: null,
              collectWindowErrors: !0,
              captureUnhandledRejections: !0,
              maxMessageLength: 0,
              maxUrlLength: 250,
              stackTraceLimit: 50,
              autoBreadcrumbs: !0,
              instrument: !0,
              sampleRate: 1,
              sanitizeKeys: []
            }),
            (this._fetchDefaults = {
              method: "POST",
              keepalive: !0,
              referrerPolicy: supportsReferrerPolicy() ? "origin" : ""
            }),
            (this._ignoreOnError = 0),
            (this._isRavenInstalled = !1),
            (this._originalErrorStackTraceLimit = Error.stackTraceLimit),
            (this._originalConsole = _window.console || {}),
            (this._originalConsoleMethods = {}),
            (this._plugins = []),
            (this._startTime = now()),
            (this._wrappedBuiltIns = []),
            (this._breadcrumbs = []),
            (this._lastCapturedEvent = null),
            this._keypressTimeout,
            (this._location = _window.location),
            (this._lastHref = this._location && this._location.href),
            this._resetBackoff(),
            this._originalConsole))
              this._originalConsoleMethods[e] = this._originalConsole[e];
          }
          (Raven.prototype = {
            VERSION: "3.26.3",
            debug: !1,
            TraceKit: TraceKit,
            config: function(e, t) {
              var r = this;
              if (r._globalServer)
                return (
                  this._logDebug(
                    "error",
                    "Error: Raven has already been configured"
                  ),
                  r
                );
              if (!e) return r;
              var n = r._globalOptions;
              t &&
                each(t, function(e, t) {
                  "tags" === e || "extra" === e || "user" === e
                    ? (r._globalContext[e] = t)
                    : (n[e] = t);
                }),
                r.setDSN(e),
                n.ignoreErrors.push(/^Script error\.?$/),
                n.ignoreErrors.push(
                  /^Javascript error: Script error\.? on line 0$/
                ),
                (n.ignoreErrors = joinRegExp(n.ignoreErrors)),
                (n.ignoreUrls =
                  !!n.ignoreUrls.length && joinRegExp(n.ignoreUrls)),
                (n.whitelistUrls =
                  !!n.whitelistUrls.length && joinRegExp(n.whitelistUrls)),
                (n.includePaths = joinRegExp(n.includePaths)),
                (n.maxBreadcrumbs = Math.max(
                  0,
                  Math.min(n.maxBreadcrumbs || 100, 100)
                ));
              var i = {
                  xhr: !0,
                  console: !0,
                  dom: !0,
                  location: !0,
                  sentry: !0
                },
                a = n.autoBreadcrumbs;
              "[object Object]" === {}.toString.call(a)
                ? (a = objectMerge(i, a))
                : !1 !== a && (a = i),
                (n.autoBreadcrumbs = a);
              var o = { tryCatch: !0 },
                s = n.instrument;
              return (
                "[object Object]" === {}.toString.call(s)
                  ? (s = objectMerge(o, s))
                  : !1 !== s && (s = o),
                (n.instrument = s),
                (TraceKit.collectWindowErrors = !!n.collectWindowErrors),
                r
              );
            },
            install: function() {
              var e = this;
              return (
                e.isSetup() &&
                  !e._isRavenInstalled &&
                  (TraceKit.report.subscribe(function() {
                    e._handleOnErrorStackInfo.apply(e, arguments);
                  }),
                  e._globalOptions.captureUnhandledRejections &&
                    e._attachPromiseRejectionHandler(),
                  e._patchFunctionToString(),
                  e._globalOptions.instrument &&
                    e._globalOptions.instrument.tryCatch &&
                    e._instrumentTryCatch(),
                  e._globalOptions.autoBreadcrumbs &&
                    e._instrumentBreadcrumbs(),
                  e._drainPlugins(),
                  (e._isRavenInstalled = !0)),
                (Error.stackTraceLimit = e._globalOptions.stackTraceLimit),
                this
              );
            },
            setDSN: function(e) {
              var t = this._parseDSN(e),
                r = t.path.lastIndexOf("/"),
                n = t.path.substr(1, r);
              (this._dsn = e),
                (this._globalKey = t.user),
                (this._globalSecret = t.pass && t.pass.substr(1)),
                (this._globalProject = t.path.substr(r + 1)),
                (this._globalServer = this._getGlobalServer(t)),
                (this._globalEndpoint =
                  this._globalServer +
                  "/" +
                  n +
                  "api/" +
                  this._globalProject +
                  "/store/"),
                this._resetBackoff();
            },
            context: function(e, t, r) {
              return (
                isFunction(e) && ((r = t || []), (t = e), (e = {})),
                this.wrap(e, t).apply(this, r)
              );
            },
            wrap: function(e, t, r) {
              var n = this;
              if (isUndefined(t) && !isFunction(e)) return e;
              if ((isFunction(e) && ((t = e), (e = void 0)), !isFunction(t)))
                return t;
              try {
                if (t.__raven__) return t;
                if (t.__raven_wrapper__) return t.__raven_wrapper__;
              } catch (e) {
                return t;
              }
              function wrapped() {
                var i = [],
                  a = arguments.length,
                  o = !e || (e && !1 !== e.deep);
                for (r && isFunction(r) && r.apply(this, arguments); a--; )
                  i[a] = o ? n.wrap(e, arguments[a]) : arguments[a];
                try {
                  return t.apply(this, i);
                } catch (t) {
                  throw (n._ignoreNextOnError(), n.captureException(t, e), t);
                }
              }
              for (var i in t) hasKey(t, i) && (wrapped[i] = t[i]);
              return (
                (wrapped.prototype = t.prototype),
                (t.__raven_wrapper__ = wrapped),
                (wrapped.__raven__ = !0),
                (wrapped.__orig__ = t),
                wrapped
              );
            },
            uninstall: function() {
              return (
                TraceKit.report.uninstall(),
                this._detachPromiseRejectionHandler(),
                this._unpatchFunctionToString(),
                this._restoreBuiltIns(),
                this._restoreConsole(),
                (Error.stackTraceLimit = this._originalErrorStackTraceLimit),
                (this._isRavenInstalled = !1),
                this
              );
            },
            _promiseRejectionHandler: function(e) {
              this._logDebug(
                "debug",
                "Raven caught unhandled promise rejection:",
                e
              ),
                this.captureException(e.reason, {
                  mechanism: { type: "onunhandledrejection", handled: !1 }
                });
            },
            _attachPromiseRejectionHandler: function() {
              return (
                (this._promiseRejectionHandler = this._promiseRejectionHandler.bind(
                  this
                )),
                _window.addEventListener &&
                  _window.addEventListener(
                    "unhandledrejection",
                    this._promiseRejectionHandler
                  ),
                this
              );
            },
            _detachPromiseRejectionHandler: function() {
              return (
                _window.removeEventListener &&
                  _window.removeEventListener(
                    "unhandledrejection",
                    this._promiseRejectionHandler
                  ),
                this
              );
            },
            captureException: function(e, t) {
              if (
                ((t = objectMerge({ trimHeadFrames: 0 }, t || {})),
                isErrorEvent(e) && e.error)
              )
                e = e.error;
              else {
                if (isDOMError(e) || isDOMException(e)) {
                  var r =
                      e.name || (isDOMError(e) ? "DOMError" : "DOMException"),
                    n = e.message ? r + ": " + e.message : r;
                  return this.captureMessage(
                    n,
                    objectMerge(t, {
                      stacktrace: !0,
                      trimHeadFrames: t.trimHeadFrames + 1
                    })
                  );
                }
                if (isError(e)) e = e;
                else {
                  if (!isPlainObject(e))
                    return this.captureMessage(
                      e,
                      objectMerge(t, {
                        stacktrace: !0,
                        trimHeadFrames: t.trimHeadFrames + 1
                      })
                    );
                  (t = this._getCaptureExceptionOptionsFromPlainObject(t, e)),
                    (e = new Error(t.message));
                }
              }
              this._lastCapturedException = e;
              try {
                var i = TraceKit.computeStackTrace(e);
                this._handleStackInfo(i, t);
              } catch (t) {
                if (e !== t) throw t;
              }
              return this;
            },
            _getCaptureExceptionOptionsFromPlainObject: function(e, t) {
              var r = Object.keys(t).sort(),
                n = objectMerge(e, {
                  message:
                    "Non-Error exception captured with keys: " +
                    serializeKeysForMessage(r),
                  fingerprint: [md5(r)],
                  extra: e.extra || {}
                });
              return (n.extra.__serialized__ = serializeException(t)), n;
            },
            captureMessage: function(e, t) {
              if (
                !this._globalOptions.ignoreErrors.test ||
                !this._globalOptions.ignoreErrors.test(e)
              ) {
                var r,
                  n = objectMerge({ message: (e += "") }, (t = t || {}));
                try {
                  throw new Error(e);
                } catch (e) {
                  r = e;
                }
                r.name = null;
                var i = TraceKit.computeStackTrace(r),
                  a = isArray(i.stack) && i.stack[1];
                a && "Raven.captureException" === a.func && (a = i.stack[2]);
                var o = (a && a.url) || "";
                if (
                  (!this._globalOptions.ignoreUrls.test ||
                    !this._globalOptions.ignoreUrls.test(o)) &&
                  (!this._globalOptions.whitelistUrls.test ||
                    this._globalOptions.whitelistUrls.test(o))
                ) {
                  if (
                    this._globalOptions.stacktrace ||
                    t.stacktrace ||
                    "" === n.message
                  ) {
                    (n.fingerprint = null == n.fingerprint ? e : n.fingerprint),
                      ((t = objectMerge(
                        { trimHeadFrames: 0 },
                        t
                      )).trimHeadFrames += 1);
                    var s = this._prepareFrames(i, t);
                    n.stacktrace = { frames: s.reverse() };
                  }
                  return (
                    n.fingerprint &&
                      (n.fingerprint = isArray(n.fingerprint)
                        ? n.fingerprint
                        : [n.fingerprint]),
                    this._send(n),
                    this
                  );
                }
              }
            },
            captureBreadcrumb: function(e) {
              var t = objectMerge({ timestamp: now() / 1e3 }, e);
              if (isFunction(this._globalOptions.breadcrumbCallback)) {
                var r = this._globalOptions.breadcrumbCallback(t);
                if (isObject(r) && !isEmptyObject(r)) t = r;
                else if (!1 === r) return this;
              }
              return (
                this._breadcrumbs.push(t),
                this._breadcrumbs.length > this._globalOptions.maxBreadcrumbs &&
                  this._breadcrumbs.shift(),
                this
              );
            },
            addPlugin: function(e) {
              var t = [].slice.call(arguments, 1);
              return (
                this._plugins.push([e, t]),
                this._isRavenInstalled && this._drainPlugins(),
                this
              );
            },
            setUserContext: function(e) {
              return (this._globalContext.user = e), this;
            },
            setExtraContext: function(e) {
              return this._mergeContext("extra", e), this;
            },
            setTagsContext: function(e) {
              return this._mergeContext("tags", e), this;
            },
            clearContext: function() {
              return (this._globalContext = {}), this;
            },
            getContext: function() {
              return JSON.parse(stringify(this._globalContext));
            },
            setEnvironment: function(e) {
              return (this._globalOptions.environment = e), this;
            },
            setRelease: function(e) {
              return (this._globalOptions.release = e), this;
            },
            setDataCallback: function(e) {
              var t = this._globalOptions.dataCallback;
              return (
                (this._globalOptions.dataCallback = keepOriginalCallback(t, e)),
                this
              );
            },
            setBreadcrumbCallback: function(e) {
              var t = this._globalOptions.breadcrumbCallback;
              return (
                (this._globalOptions.breadcrumbCallback = keepOriginalCallback(
                  t,
                  e
                )),
                this
              );
            },
            setShouldSendCallback: function(e) {
              var t = this._globalOptions.shouldSendCallback;
              return (
                (this._globalOptions.shouldSendCallback = keepOriginalCallback(
                  t,
                  e
                )),
                this
              );
            },
            setTransport: function(e) {
              return (this._globalOptions.transport = e), this;
            },
            lastException: function() {
              return this._lastCapturedException;
            },
            lastEventId: function() {
              return this._lastEventId;
            },
            isSetup: function() {
              return (
                !!this._hasJSON &&
                (!!this._globalServer ||
                  (this.ravenNotConfiguredError ||
                    ((this.ravenNotConfiguredError = !0),
                    this._logDebug(
                      "error",
                      "Error: Raven has not been configured."
                    )),
                  !1))
              );
            },
            afterLoad: function() {
              var e = _window.RavenConfig;
              e && this.config(e.dsn, e.config).install();
            },
            showReportDialog: function(e) {
              if (_document) {
                var t = (e = e || {}).eventId || this.lastEventId();
                if (!t) throw new RavenConfigError("Missing eventId");
                var r = e.dsn || this._dsn;
                if (!r) throw new RavenConfigError("Missing DSN");
                var n = encodeURIComponent,
                  i = "";
                (i += "?eventId=" + n(t)), (i += "&dsn=" + n(r));
                var a = e.user || this._globalContext.user;
                a &&
                  (a.name && (i += "&name=" + n(a.name)),
                  a.email && (i += "&email=" + n(a.email)));
                var o = this._getGlobalServer(this._parseDSN(r)),
                  s = _document.createElement("script");
                (s.async = !0),
                  (s.src = o + "/api/embed/error-page/" + i),
                  (_document.head || _document.body).appendChild(s);
              }
            },
            _ignoreNextOnError: function() {
              var e = this;
              (this._ignoreOnError += 1),
                setTimeout(function() {
                  e._ignoreOnError -= 1;
                });
            },
            _triggerEvent: function(e, t) {
              var r, n;
              if (this._hasDocument) {
                for (n in ((t = t || {}),
                (e = "raven" + e.substr(0, 1).toUpperCase() + e.substr(1)),
                _document.createEvent
                  ? (r = _document.createEvent("HTMLEvents")).initEvent(
                      e,
                      !0,
                      !0
                    )
                  : ((r = _document.createEventObject()).eventType = e),
                t))
                  hasKey(t, n) && (r[n] = t[n]);
                if (_document.createEvent) _document.dispatchEvent(r);
                else
                  try {
                    _document.fireEvent("on" + r.eventType.toLowerCase(), r);
                  } catch (e) {}
              }
            },
            _breadcrumbEventHandler: function(e) {
              var t = this;
              return function(r) {
                if (((t._keypressTimeout = null), t._lastCapturedEvent !== r)) {
                  var n;
                  t._lastCapturedEvent = r;
                  try {
                    n = htmlTreeAsString(r.target);
                  } catch (e) {
                    n = "<unknown>";
                  }
                  t.captureBreadcrumb({ category: "ui." + e, message: n });
                }
              };
            },
            _keypressEventHandler: function() {
              var e = this;
              return function(t) {
                var r;
                try {
                  r = t.target;
                } catch (e) {
                  return;
                }
                var n = r && r.tagName;
                if (
                  n &&
                  ("INPUT" === n || "TEXTAREA" === n || r.isContentEditable)
                ) {
                  var i = e._keypressTimeout;
                  i || e._breadcrumbEventHandler("input")(t),
                    clearTimeout(i),
                    (e._keypressTimeout = setTimeout(function() {
                      e._keypressTimeout = null;
                    }, 1e3));
                }
              };
            },
            _captureUrlChange: function(e, t) {
              var r = parseUrl(this._location.href),
                n = parseUrl(t),
                i = parseUrl(e);
              (this._lastHref = t),
                r.protocol === n.protocol &&
                  r.host === n.host &&
                  (t = n.relative),
                r.protocol === i.protocol &&
                  r.host === i.host &&
                  (e = i.relative),
                this.captureBreadcrumb({
                  category: "navigation",
                  data: { to: t, from: e }
                });
            },
            _patchFunctionToString: function() {
              var e = this;
              (e._originalFunctionToString = Function.prototype.toString),
                (Function.prototype.toString = function() {
                  return "function" == typeof this && this.__raven__
                    ? e._originalFunctionToString.apply(
                        this.__orig__,
                        arguments
                      )
                    : e._originalFunctionToString.apply(this, arguments);
                });
            },
            _unpatchFunctionToString: function() {
              this._originalFunctionToString &&
                (Function.prototype.toString = this._originalFunctionToString);
            },
            _instrumentTryCatch: function() {
              var e = this,
                t = e._wrappedBuiltIns;
              function wrapTimeFn(t) {
                return function(r, n) {
                  for (
                    var i = new Array(arguments.length), a = 0;
                    a < i.length;
                    ++a
                  )
                    i[a] = arguments[a];
                  var o = i[0];
                  return (
                    isFunction(o) &&
                      (i[0] = e.wrap(
                        {
                          mechanism: {
                            type: "instrument",
                            data: { function: t.name || "<anonymous>" }
                          }
                        },
                        o
                      )),
                    t.apply ? t.apply(this, i) : t(i[0], i[1])
                  );
                };
              }
              var r = this._globalOptions.autoBreadcrumbs;
              function wrapEventTarget(n) {
                var i = _window[n] && _window[n].prototype;
                i &&
                  i.hasOwnProperty &&
                  i.hasOwnProperty("addEventListener") &&
                  (fill(
                    i,
                    "addEventListener",
                    function(t) {
                      return function(i, a, o, s) {
                        try {
                          a &&
                            a.handleEvent &&
                            (a.handleEvent = e.wrap(
                              {
                                mechanism: {
                                  type: "instrument",
                                  data: {
                                    target: n,
                                    function: "handleEvent",
                                    handler: (a && a.name) || "<anonymous>"
                                  }
                                }
                              },
                              a.handleEvent
                            ));
                        } catch (e) {}
                        var l, c, u;
                        return (
                          r &&
                            r.dom &&
                            ("EventTarget" === n || "Node" === n) &&
                            ((c = e._breadcrumbEventHandler("click")),
                            (u = e._keypressEventHandler()),
                            (l = function(e) {
                              if (e) {
                                var t;
                                try {
                                  t = e.type;
                                } catch (e) {
                                  return;
                                }
                                return "click" === t
                                  ? c(e)
                                  : "keypress" === t
                                  ? u(e)
                                  : void 0;
                              }
                            })),
                          t.call(
                            this,
                            i,
                            e.wrap(
                              {
                                mechanism: {
                                  type: "instrument",
                                  data: {
                                    target: n,
                                    function: "addEventListener",
                                    handler: (a && a.name) || "<anonymous>"
                                  }
                                }
                              },
                              a,
                              l
                            ),
                            o,
                            s
                          )
                        );
                      };
                    },
                    t
                  ),
                  fill(
                    i,
                    "removeEventListener",
                    function(e) {
                      return function(t, r, n, i) {
                        try {
                          r =
                            r &&
                            (r.__raven_wrapper__ ? r.__raven_wrapper__ : r);
                        } catch (e) {}
                        return e.call(this, t, r, n, i);
                      };
                    },
                    t
                  ));
              }
              fill(_window, "setTimeout", wrapTimeFn, t),
                fill(_window, "setInterval", wrapTimeFn, t),
                _window.requestAnimationFrame &&
                  fill(
                    _window,
                    "requestAnimationFrame",
                    function(t) {
                      return function(r) {
                        return t(
                          e.wrap(
                            {
                              mechanism: {
                                type: "instrument",
                                data: {
                                  function: "requestAnimationFrame",
                                  handler: (t && t.name) || "<anonymous>"
                                }
                              }
                            },
                            r
                          )
                        );
                      };
                    },
                    t
                  );
              for (
                var n = [
                    "EventTarget",
                    "Window",
                    "Node",
                    "ApplicationCache",
                    "AudioTrackList",
                    "ChannelMergerNode",
                    "CryptoOperation",
                    "EventSource",
                    "FileReader",
                    "HTMLUnknownElement",
                    "IDBDatabase",
                    "IDBRequest",
                    "IDBTransaction",
                    "KeyOperation",
                    "MediaController",
                    "MessagePort",
                    "ModalWindow",
                    "Notification",
                    "SVGElementInstance",
                    "Screen",
                    "TextTrack",
                    "TextTrackCue",
                    "TextTrackList",
                    "WebSocket",
                    "WebSocketWorker",
                    "Worker",
                    "XMLHttpRequest",
                    "XMLHttpRequestEventTarget",
                    "XMLHttpRequestUpload"
                  ],
                  i = 0;
                i < n.length;
                i++
              )
                wrapEventTarget(n[i]);
            },
            _instrumentBreadcrumbs: function() {
              var e = this,
                t = this._globalOptions.autoBreadcrumbs,
                r = e._wrappedBuiltIns;
              function wrapProp(t, r) {
                t in r &&
                  isFunction(r[t]) &&
                  fill(r, t, function(r) {
                    return e.wrap(
                      {
                        mechanism: {
                          type: "instrument",
                          data: {
                            function: t,
                            handler: (r && r.name) || "<anonymous>"
                          }
                        }
                      },
                      r
                    );
                  });
              }
              if (t.xhr && "XMLHttpRequest" in _window) {
                var n =
                  _window.XMLHttpRequest && _window.XMLHttpRequest.prototype;
                fill(
                  n,
                  "open",
                  function(t) {
                    return function(r, n) {
                      return (
                        isString(n) &&
                          -1 === n.indexOf(e._globalKey) &&
                          (this.__raven_xhr = {
                            method: r,
                            url: n,
                            status_code: null
                          }),
                        t.apply(this, arguments)
                      );
                    };
                  },
                  r
                ),
                  fill(
                    n,
                    "send",
                    function(t) {
                      return function() {
                        var r = this;
                        function onreadystatechangeHandler() {
                          if (r.__raven_xhr && 4 === r.readyState) {
                            try {
                              r.__raven_xhr.status_code = r.status;
                            } catch (e) {}
                            e.captureBreadcrumb({
                              type: "http",
                              category: "xhr",
                              data: r.__raven_xhr
                            });
                          }
                        }
                        for (
                          var n = ["onload", "onerror", "onprogress"], i = 0;
                          i < n.length;
                          i++
                        )
                          wrapProp(n[i], r);
                        return (
                          "onreadystatechange" in r &&
                          isFunction(r.onreadystatechange)
                            ? fill(r, "onreadystatechange", function(t) {
                                return e.wrap(
                                  {
                                    mechanism: {
                                      type: "instrument",
                                      data: {
                                        function: "onreadystatechange",
                                        handler: (t && t.name) || "<anonymous>"
                                      }
                                    }
                                  },
                                  t,
                                  onreadystatechangeHandler
                                );
                              })
                            : (r.onreadystatechange = onreadystatechangeHandler),
                          t.apply(this, arguments)
                        );
                      };
                    },
                    r
                  );
              }
              t.xhr &&
                supportsFetch() &&
                fill(
                  _window,
                  "fetch",
                  function(t) {
                    return function() {
                      for (
                        var r = new Array(arguments.length), n = 0;
                        n < r.length;
                        ++n
                      )
                        r[n] = arguments[n];
                      var i,
                        a = r[0],
                        o = "GET";
                      if (
                        ("string" == typeof a
                          ? (i = a)
                          : "Request" in _window && a instanceof _window.Request
                          ? ((i = a.url), a.method && (o = a.method))
                          : (i = "" + a),
                        -1 !== i.indexOf(e._globalKey))
                      )
                        return t.apply(this, r);
                      r[1] && r[1].method && (o = r[1].method);
                      var s = { method: o, url: i, status_code: null };
                      return t
                        .apply(this, r)
                        .then(function(t) {
                          return (
                            (s.status_code = t.status),
                            e.captureBreadcrumb({
                              type: "http",
                              category: "fetch",
                              data: s
                            }),
                            t
                          );
                        })
                        .catch(function(t) {
                          throw (e.captureBreadcrumb({
                            type: "http",
                            category: "fetch",
                            data: s,
                            level: "error"
                          }),
                          t);
                        });
                    };
                  },
                  r
                ),
                t.dom &&
                  this._hasDocument &&
                  (_document.addEventListener
                    ? (_document.addEventListener(
                        "click",
                        e._breadcrumbEventHandler("click"),
                        !1
                      ),
                      _document.addEventListener(
                        "keypress",
                        e._keypressEventHandler(),
                        !1
                      ))
                    : _document.attachEvent &&
                      (_document.attachEvent(
                        "onclick",
                        e._breadcrumbEventHandler("click")
                      ),
                      _document.attachEvent(
                        "onkeypress",
                        e._keypressEventHandler()
                      )));
              var i = _window.chrome,
                a =
                  !(i && i.app && i.app.runtime) &&
                  _window.history &&
                  _window.history.pushState &&
                  _window.history.replaceState;
              if (t.location && a) {
                var o = _window.onpopstate;
                _window.onpopstate = function() {
                  var t = e._location.href;
                  if ((e._captureUrlChange(e._lastHref, t), o))
                    return o.apply(this, arguments);
                };
                var s = function(t) {
                  return function() {
                    var r = arguments.length > 2 ? arguments[2] : void 0;
                    return (
                      r && e._captureUrlChange(e._lastHref, r + ""),
                      t.apply(this, arguments)
                    );
                  };
                };
                fill(_window.history, "pushState", s, r),
                  fill(_window.history, "replaceState", s, r);
              }
              if (t.console && "console" in _window && console.log) {
                var l = function(t, r) {
                  e.captureBreadcrumb({
                    message: t,
                    level: r.level,
                    category: "console"
                  });
                };
                each(["debug", "info", "warn", "error", "log"], function(e, t) {
                  wrapConsoleMethod(console, t, l);
                });
              }
            },
            _restoreBuiltIns: function() {
              for (var e; this._wrappedBuiltIns.length; ) {
                var t = (e = this._wrappedBuiltIns.shift())[0],
                  r = e[1],
                  n = e[2];
                t[r] = n;
              }
            },
            _restoreConsole: function() {
              for (var e in this._originalConsoleMethods)
                this._originalConsole[e] = this._originalConsoleMethods[e];
            },
            _drainPlugins: function() {
              var e = this;
              each(this._plugins, function(t, r) {
                var n = r[0],
                  i = r[1];
                n.apply(e, [e].concat(i));
              });
            },
            _parseDSN: function(e) {
              var t = dsnPattern.exec(e),
                r = {},
                n = 7;
              try {
                for (; n--; ) r[dsnKeys[n]] = t[n] || "";
              } catch (t) {
                throw new RavenConfigError("Invalid DSN: " + e);
              }
              if (r.pass && !this._globalOptions.allowSecretKey)
                throw new RavenConfigError(
                  "Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key"
                );
              return r;
            },
            _getGlobalServer: function(e) {
              var t = "//" + e.host + (e.port ? ":" + e.port : "");
              return e.protocol && (t = e.protocol + ":" + t), t;
            },
            _handleOnErrorStackInfo: function(e, t) {
              ((t = t || {}).mechanism = t.mechanism || {
                type: "onerror",
                handled: !1
              }),
                this._ignoreOnError || this._handleStackInfo(e, t);
            },
            _handleStackInfo: function(e, t) {
              var r = this._prepareFrames(e, t);
              this._triggerEvent("handle", { stackInfo: e, options: t }),
                this._processException(
                  e.name,
                  e.message,
                  e.url,
                  e.lineno,
                  r,
                  t
                );
            },
            _prepareFrames: function(e, t) {
              var r = this,
                n = [];
              if (
                e.stack &&
                e.stack.length &&
                (each(e.stack, function(t, i) {
                  var a = r._normalizeFrame(i, e.url);
                  a && n.push(a);
                }),
                t && t.trimHeadFrames)
              )
                for (var i = 0; i < t.trimHeadFrames && i < n.length; i++)
                  n[i].in_app = !1;
              return (n = n.slice(0, this._globalOptions.stackTraceLimit));
            },
            _normalizeFrame: function(e, t) {
              var r = {
                filename: e.url,
                lineno: e.line,
                colno: e.column,
                function: e.func || "?"
              };
              return (
                e.url || (r.filename = t),
                (r.in_app = !(
                  (this._globalOptions.includePaths.test &&
                    !this._globalOptions.includePaths.test(r.filename)) ||
                  /(Raven|TraceKit)\./.test(r.function) ||
                  /raven\.(min\.)?js$/.test(r.filename)
                )),
                r
              );
            },
            _processException: function(e, t, r, n, i, a) {
              var o,
                s = (e ? e + ": " : "") + (t || "");
              if (
                (!this._globalOptions.ignoreErrors.test ||
                  (!this._globalOptions.ignoreErrors.test(t) &&
                    !this._globalOptions.ignoreErrors.test(s))) &&
                (i && i.length
                  ? ((r = i[0].filename || r), i.reverse(), (o = { frames: i }))
                  : r &&
                    (o = { frames: [{ filename: r, lineno: n, in_app: !0 }] }),
                (!this._globalOptions.ignoreUrls.test ||
                  !this._globalOptions.ignoreUrls.test(r)) &&
                  (!this._globalOptions.whitelistUrls.test ||
                    this._globalOptions.whitelistUrls.test(r)))
              ) {
                var l = objectMerge(
                    {
                      exception: {
                        values: [{ type: e, value: t, stacktrace: o }]
                      },
                      transaction: r
                    },
                    a
                  ),
                  c = l.exception.values[0];
                null == c.type &&
                  "" === c.value &&
                  (c.value = "Unrecoverable error caught"),
                  !l.exception.mechanism &&
                    l.mechanism &&
                    ((l.exception.mechanism = l.mechanism), delete l.mechanism),
                  (l.exception.mechanism = objectMerge(
                    { type: "generic", handled: !0 },
                    l.exception.mechanism || {}
                  )),
                  this._send(l);
              }
            },
            _trimPacket: function(e) {
              var t = this._globalOptions.maxMessageLength;
              if (
                (e.message && (e.message = truncate(e.message, t)), e.exception)
              ) {
                var r = e.exception.values[0];
                r.value = truncate(r.value, t);
              }
              var n = e.request;
              return (
                n &&
                  (n.url &&
                    (n.url = truncate(n.url, this._globalOptions.maxUrlLength)),
                  n.Referer &&
                    (n.Referer = truncate(
                      n.Referer,
                      this._globalOptions.maxUrlLength
                    ))),
                e.breadcrumbs &&
                  e.breadcrumbs.values &&
                  this._trimBreadcrumbs(e.breadcrumbs),
                e
              );
            },
            _trimBreadcrumbs: function(e) {
              for (
                var t, r, n, i = ["to", "from", "url"], a = 0;
                a < e.values.length;
                ++a
              )
                if (
                  (r = e.values[a]).hasOwnProperty("data") &&
                  isObject(r.data) &&
                  !objectFrozen(r.data)
                ) {
                  n = objectMerge({}, r.data);
                  for (var o = 0; o < i.length; ++o)
                    (t = i[o]),
                      n.hasOwnProperty(t) &&
                        n[t] &&
                        (n[t] = truncate(
                          n[t],
                          this._globalOptions.maxUrlLength
                        ));
                  e.values[a].data = n;
                }
            },
            _getHttpData: function() {
              if (this._hasNavigator || this._hasDocument) {
                var e = {};
                return (
                  this._hasNavigator &&
                    _navigator.userAgent &&
                    (e.headers = { "User-Agent": _navigator.userAgent }),
                  _window.location &&
                    _window.location.href &&
                    (e.url = _window.location.href),
                  this._hasDocument &&
                    _document.referrer &&
                    (e.headers || (e.headers = {}),
                    (e.headers.Referer = _document.referrer)),
                  e
                );
              }
            },
            _resetBackoff: function() {
              (this._backoffDuration = 0), (this._backoffStart = null);
            },
            _shouldBackoff: function() {
              return (
                this._backoffDuration &&
                now() - this._backoffStart < this._backoffDuration
              );
            },
            _isRepeatData: function(e) {
              var t = this._lastData;
              return (
                !(
                  !t ||
                  e.message !== t.message ||
                  e.transaction !== t.transaction
                ) &&
                (e.stacktrace || t.stacktrace
                  ? isSameStacktrace(e.stacktrace, t.stacktrace)
                  : (!e.exception && !t.exception) ||
                    isSameException(e.exception, t.exception))
              );
            },
            _setBackoffState: function(e) {
              if (!this._shouldBackoff()) {
                var t = e.status;
                if (400 === t || 401 === t || 429 === t) {
                  var r;
                  try {
                    (r = supportsFetch()
                      ? e.headers.get("Retry-After")
                      : e.getResponseHeader("Retry-After")),
                      (r = 1e3 * parseInt(r, 10));
                  } catch (e) {}
                  (this._backoffDuration =
                    r || (2 * this._backoffDuration || 1e3)),
                    (this._backoffStart = now());
                }
              }
            },
            _send: function(e) {
              var t = this._globalOptions,
                r = {
                  project: this._globalProject,
                  logger: t.logger,
                  platform: "javascript"
                },
                n = this._getHttpData();
              n && (r.request = n),
                e.trimHeadFrames && delete e.trimHeadFrames,
                ((e = objectMerge(r, e)).tags = objectMerge(
                  objectMerge({}, this._globalContext.tags),
                  e.tags
                )),
                (e.extra = objectMerge(
                  objectMerge({}, this._globalContext.extra),
                  e.extra
                )),
                (e.extra["session:duration"] = now() - this._startTime),
                this._breadcrumbs &&
                  this._breadcrumbs.length > 0 &&
                  (e.breadcrumbs = {
                    values: [].slice.call(this._breadcrumbs, 0)
                  }),
                this._globalContext.user && (e.user = this._globalContext.user),
                t.environment && (e.environment = t.environment),
                t.release && (e.release = t.release),
                t.serverName && (e.server_name = t.serverName),
                (e = this._sanitizeData(e)),
                Object.keys(e).forEach(function(t) {
                  (null == e[t] || "" === e[t] || isEmptyObject(e[t])) &&
                    delete e[t];
                }),
                isFunction(t.dataCallback) && (e = t.dataCallback(e) || e),
                e &&
                  !isEmptyObject(e) &&
                  ((isFunction(t.shouldSendCallback) &&
                    !t.shouldSendCallback(e)) ||
                    (this._shouldBackoff()
                      ? this._logDebug(
                          "warn",
                          "Raven dropped error due to backoff: ",
                          e
                        )
                      : "number" == typeof t.sampleRate
                      ? Math.random() < t.sampleRate &&
                        this._sendProcessedPayload(e)
                      : this._sendProcessedPayload(e)));
            },
            _sanitizeData: function(e) {
              return sanitize(e, this._globalOptions.sanitizeKeys);
            },
            _getUuid: function() {
              return uuid4();
            },
            _sendProcessedPayload: function(e, t) {
              var r = this,
                n = this._globalOptions;
              if (this.isSetup())
                if (
                  ((e = this._trimPacket(e)),
                  this._globalOptions.allowDuplicates || !this._isRepeatData(e))
                ) {
                  (this._lastEventId =
                    e.event_id || (e.event_id = this._getUuid())),
                    (this._lastData = e),
                    this._logDebug("debug", "Raven about to send:", e);
                  var i = {
                    sentry_version: "7",
                    sentry_client: "raven-js/" + this.VERSION,
                    sentry_key: this._globalKey
                  };
                  this._globalSecret && (i.sentry_secret = this._globalSecret);
                  var a = e.exception && e.exception.values[0];
                  this._globalOptions.autoBreadcrumbs &&
                    this._globalOptions.autoBreadcrumbs.sentry &&
                    this.captureBreadcrumb({
                      category: "sentry",
                      message: a
                        ? (a.type ? a.type + ": " : "") + a.value
                        : e.message,
                      event_id: e.event_id,
                      level: e.level || "error"
                    });
                  var o = this._globalEndpoint;
                  (n.transport || this._makeRequest).call(this, {
                    url: o,
                    auth: i,
                    data: e,
                    options: n,
                    onSuccess: function success() {
                      r._resetBackoff(),
                        r._triggerEvent("success", { data: e, src: o }),
                        t && t();
                    },
                    onError: function failure(n) {
                      r._logDebug(
                        "error",
                        "Raven transport failed to send: ",
                        n
                      ),
                        n.request && r._setBackoffState(n.request),
                        r._triggerEvent("failure", { data: e, src: o }),
                        (n =
                          n ||
                          new Error(
                            "Raven send failed (no additional details provided)"
                          )),
                        t && t(n);
                    }
                  });
                } else
                  this._logDebug("warn", "Raven dropped repeat event: ", e);
            },
            _makeRequest: function(e) {
              var t = e.url + "?" + urlencode(e.auth),
                r = null,
                n = {};
              if (
                (e.options.headers &&
                  (r = this._evaluateHash(e.options.headers)),
                e.options.fetchParameters &&
                  (n = this._evaluateHash(e.options.fetchParameters)),
                supportsFetch())
              ) {
                n.body = stringify(e.data);
                var i = objectMerge({}, this._fetchDefaults),
                  a = objectMerge(i, n);
                return (
                  r && (a.headers = r),
                  _window
                    .fetch(t, a)
                    .then(function(t) {
                      if (t.ok) e.onSuccess && e.onSuccess();
                      else {
                        var r = new Error("Sentry error code: " + t.status);
                        (r.request = t), e.onError && e.onError(r);
                      }
                    })
                    .catch(function() {
                      e.onError &&
                        e.onError(
                          new Error("Sentry error code: network unavailable")
                        );
                    })
                );
              }
              var o = _window.XMLHttpRequest && new _window.XMLHttpRequest();
              o &&
                (("withCredentials" in o ||
                  "undefined" != typeof XDomainRequest) &&
                  ("withCredentials" in o
                    ? (o.onreadystatechange = function() {
                        if (4 === o.readyState)
                          if (200 === o.status) e.onSuccess && e.onSuccess();
                          else if (e.onError) {
                            var t = new Error("Sentry error code: " + o.status);
                            (t.request = o), e.onError(t);
                          }
                      })
                    : ((o = new XDomainRequest()),
                      (t = t.replace(/^https?:/, "")),
                      e.onSuccess && (o.onload = e.onSuccess),
                      e.onError &&
                        (o.onerror = function() {
                          var t = new Error(
                            "Sentry error code: XDomainRequest"
                          );
                          (t.request = o), e.onError(t);
                        })),
                  o.open("POST", t),
                  r &&
                    each(r, function(e, t) {
                      o.setRequestHeader(e, t);
                    }),
                  o.send(stringify(e.data))));
            },
            _evaluateHash: function(e) {
              var t = {};
              for (var r in e)
                if (e.hasOwnProperty(r)) {
                  var n = e[r];
                  t[r] = "function" == typeof n ? n() : n;
                }
              return t;
            },
            _logDebug: function(e) {
              this._originalConsoleMethods[e] &&
                (this.debug || this._globalOptions.debug) &&
                Function.prototype.apply.call(
                  this._originalConsoleMethods[e],
                  this._originalConsole,
                  [].slice.call(arguments, 1)
                );
            },
            _mergeContext: function(e, t) {
              isUndefined(t)
                ? delete this._globalContext[e]
                : (this._globalContext[e] = objectMerge(
                    this._globalContext[e] || {},
                    t
                  ));
            }
          }),
            (Raven.prototype.setUser = Raven.prototype.setUserContext),
            (Raven.prototype.setReleaseContext = Raven.prototype.setRelease),
            (module.exports = Raven);
        }.call(
          this,
          typeof global !== "undefined"
            ? global
            : typeof self !== "undefined"
            ? self
            : typeof window !== "undefined"
            ? window
            : {}
        ));
      },
      {
        "../vendor/TraceKit/tracekit": 17,
        "../vendor/json-stringify-safe/stringify": 18,
        "../vendor/md5/md5": 19,
        "./configError": 12,
        "./console": 13,
        "./utils": 16
      }
    ],
    15: [
      function(require, module, exports) {
        (function(global) {
          var RavenConstructor = require("./raven"),
            _window =
              "undefined" != typeof window
                ? window
                : "undefined" != typeof global
                ? global
                : "undefined" != typeof self
                ? self
                : {},
            _Raven = _window.Raven,
            Raven = new RavenConstructor();
          (Raven.noConflict = function() {
            return (_window.Raven = _Raven), Raven;
          }),
            Raven.afterLoad(),
            (module.exports = Raven),
            (module.exports.Client = RavenConstructor);
        }.call(
          this,
          typeof global !== "undefined"
            ? global
            : typeof self !== "undefined"
            ? self
            : typeof window !== "undefined"
            ? window
            : {}
        ));
      },
      { "./raven": 14 }
    ],
    16: [
      function(require, module, exports) {
        (function(global) {
          var stringify = require("../vendor/json-stringify-safe/stringify"),
            _window =
              "undefined" != typeof window
                ? window
                : "undefined" != typeof global
                ? global
                : "undefined" != typeof self
                ? self
                : {};
          function isObject(e) {
            return "object" == typeof e && null !== e;
          }
          function isError(e) {
            switch (Object.prototype.toString.call(e)) {
              case "[object Error]":
              case "[object Exception]":
              case "[object DOMException]":
                return !0;
              default:
                return e instanceof Error;
            }
          }
          function isErrorEvent(e) {
            return "[object ErrorEvent]" === Object.prototype.toString.call(e);
          }
          function isDOMError(e) {
            return "[object DOMError]" === Object.prototype.toString.call(e);
          }
          function isDOMException(e) {
            return (
              "[object DOMException]" === Object.prototype.toString.call(e)
            );
          }
          function isUndefined(e) {
            return void 0 === e;
          }
          function isFunction(e) {
            return "function" == typeof e;
          }
          function isPlainObject(e) {
            return "[object Object]" === Object.prototype.toString.call(e);
          }
          function isString(e) {
            return "[object String]" === Object.prototype.toString.call(e);
          }
          function isArray(e) {
            return "[object Array]" === Object.prototype.toString.call(e);
          }
          function isEmptyObject(e) {
            if (!isPlainObject(e)) return !1;
            for (var r in e) if (e.hasOwnProperty(r)) return !1;
            return !0;
          }
          function supportsErrorEvent() {
            try {
              return new ErrorEvent(""), !0;
            } catch (e) {
              return !1;
            }
          }
          function supportsDOMError() {
            try {
              return new DOMError(""), !0;
            } catch (e) {
              return !1;
            }
          }
          function supportsDOMException() {
            try {
              return new DOMException(""), !0;
            } catch (e) {
              return !1;
            }
          }
          function supportsFetch() {
            if (!("fetch" in _window)) return !1;
            try {
              return new Headers(), new Request(""), new Response(), !0;
            } catch (e) {
              return !1;
            }
          }
          function supportsReferrerPolicy() {
            if (!supportsFetch()) return !1;
            try {
              return (
                new Request("pickleRick", { referrerPolicy: "origin" }), !0
              );
            } catch (e) {
              return !1;
            }
          }
          function supportsPromiseRejectionEvent() {
            return "function" == typeof PromiseRejectionEvent;
          }
          function wrappedCallback(e) {
            return function dataCallback(r, t) {
              var n = e(r) || r;
              return (t && t(n)) || n;
            };
          }
          function each(e, r) {
            var t, n;
            if (isUndefined(e.length))
              for (t in e) hasKey(e, t) && r.call(null, t, e[t]);
            else if ((n = e.length))
              for (t = 0; t < n; t++) r.call(null, t, e[t]);
          }
          function objectMerge(e, r) {
            return r
              ? (each(r, function(r, t) {
                  e[r] = t;
                }),
                e)
              : e;
          }
          function objectFrozen(e) {
            return !!Object.isFrozen && Object.isFrozen(e);
          }
          function truncate(e, r) {
            if ("number" != typeof r)
              throw new Error(
                "2nd argument to `truncate` function should be a number"
              );
            return "string" != typeof e || 0 === r
              ? e
              : e.length <= r
              ? e
              : e.substr(0, r) + "…";
          }
          function hasKey(e, r) {
            return Object.prototype.hasOwnProperty.call(e, r);
          }
          function joinRegExp(e) {
            for (var r, t = [], n = 0, i = e.length; n < i; n++)
              isString((r = e[n]))
                ? t.push(r.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"))
                : r && r.source && t.push(r.source);
            return new RegExp(t.join("|"), "i");
          }
          function urlencode(e) {
            var r = [];
            return (
              each(e, function(e, t) {
                r.push(encodeURIComponent(e) + "=" + encodeURIComponent(t));
              }),
              r.join("&")
            );
          }
          function parseUrl(e) {
            if ("string" != typeof e) return {};
            var r = e.match(
                /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/
              ),
              t = r[6] || "",
              n = r[8] || "";
            return {
              protocol: r[2],
              host: r[4],
              path: r[5],
              relative: r[5] + t + n
            };
          }
          function uuid4() {
            var e = _window.crypto || _window.msCrypto;
            if (!isUndefined(e) && e.getRandomValues) {
              var r = new Uint16Array(8);
              e.getRandomValues(r),
                (r[3] = (4095 & r[3]) | 16384),
                (r[4] = (16383 & r[4]) | 32768);
              var t = function(e) {
                for (var r = e.toString(16); r.length < 4; ) r = "0" + r;
                return r;
              };
              return (
                t(r[0]) +
                t(r[1]) +
                t(r[2]) +
                t(r[3]) +
                t(r[4]) +
                t(r[5]) +
                t(r[6]) +
                t(r[7])
              );
            }
            return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(
              e
            ) {
              var r = (16 * Math.random()) | 0;
              return ("x" === e ? r : (3 & r) | 8).toString(16);
            });
          }
          function htmlTreeAsString(e) {
            for (
              var r, t = [], n = 0, i = 0, o = " > ".length;
              e &&
              n++ < 5 &&
              !(
                "html" === (r = htmlElementAsString(e)) ||
                (n > 1 && i + t.length * o + r.length >= 80)
              );

            )
              t.push(r), (i += r.length), (e = e.parentNode);
            return t.reverse().join(" > ");
          }
          function htmlElementAsString(e) {
            var r,
              t,
              n,
              i,
              o,
              c = [];
            if (!e || !e.tagName) return "";
            if (
              (c.push(e.tagName.toLowerCase()),
              e.id && c.push("#" + e.id),
              (r = e.className) && isString(r))
            )
              for (t = r.split(/\s+/), o = 0; o < t.length; o++)
                c.push("." + t[o]);
            var u = ["type", "name", "title", "alt"];
            for (o = 0; o < u.length; o++)
              (n = u[o]),
                (i = e.getAttribute(n)) && c.push("[" + n + '="' + i + '"]');
            return c.join("");
          }
          function isOnlyOneTruthy(e, r) {
            return !!(!!e ^ !!r);
          }
          function isBothUndefined(e, r) {
            return isUndefined(e) && isUndefined(r);
          }
          function isSameException(e, r) {
            return (
              !isOnlyOneTruthy(e, r) &&
              ((e = e.values[0]),
              (r = r.values[0]),
              e.type === r.type &&
                e.value === r.value &&
                (!isBothUndefined(e.stacktrace, r.stacktrace) &&
                  isSameStacktrace(e.stacktrace, r.stacktrace)))
            );
          }
          function isSameStacktrace(e, r) {
            if (isOnlyOneTruthy(e, r)) return !1;
            var t,
              n,
              i = e.frames,
              o = r.frames;
            if (void 0 === i || void 0 === o) return !1;
            if (i.length !== o.length) return !1;
            for (var c = 0; c < i.length; c++)
              if (
                ((t = i[c]),
                (n = o[c]),
                t.filename !== n.filename ||
                  t.lineno !== n.lineno ||
                  t.colno !== n.colno ||
                  t.function !== n.function)
              )
                return !1;
            return !0;
          }
          function fill(e, r, t, n) {
            if (null != e) {
              var i = e[r];
              (e[r] = t(i)),
                (e[r].__raven__ = !0),
                (e[r].__orig__ = i),
                n && n.push([e, r, i]);
            }
          }
          function safeJoin(e, r) {
            if (!isArray(e)) return "";
            for (var t = [], n = 0; n < e.length; n++)
              try {
                t.push(String(e[n]));
              } catch (e) {
                t.push("[value cannot be serialized]");
              }
            return t.join(r);
          }
          var MAX_SERIALIZE_EXCEPTION_DEPTH = 3,
            MAX_SERIALIZE_EXCEPTION_SIZE = 51200,
            MAX_SERIALIZE_KEYS_LENGTH = 40;
          function utf8Length(e) {
            return ~-encodeURI(e).split(/%..|./).length;
          }
          function jsonSize(e) {
            return utf8Length(JSON.stringify(e));
          }
          function serializeValue(e) {
            if ("string" == typeof e) {
              return truncate(e, 40);
            }
            if ("number" == typeof e || "boolean" == typeof e || void 0 === e)
              return e;
            var r = Object.prototype.toString.call(e);
            return "[object Object]" === r
              ? "[Object]"
              : "[object Array]" === r
              ? "[Array]"
              : "[object Function]" === r
              ? e.name
                ? "[Function: " + e.name + "]"
                : "[Function]"
              : e;
          }
          function serializeObject(e, r) {
            return 0 === r
              ? serializeValue(e)
              : isPlainObject(e)
              ? Object.keys(e).reduce(function(t, n) {
                  return (t[n] = serializeObject(e[n], r - 1)), t;
                }, {})
              : Array.isArray(e)
              ? e.map(function(e) {
                  return serializeObject(e, r - 1);
                })
              : serializeValue(e);
          }
          function serializeException(e, r, t) {
            if (!isPlainObject(e)) return e;
            t =
              "number" !=
              typeof (r =
                "number" != typeof r ? MAX_SERIALIZE_EXCEPTION_DEPTH : r)
                ? MAX_SERIALIZE_EXCEPTION_SIZE
                : t;
            var n = serializeObject(e, r);
            return jsonSize(stringify(n)) > t
              ? serializeException(e, r - 1)
              : n;
          }
          function serializeKeysForMessage(e, r) {
            if ("number" == typeof e || "string" == typeof e)
              return e.toString();
            if (!Array.isArray(e)) return "";
            if (
              0 ===
              (e = e.filter(function(e) {
                return "string" == typeof e;
              })).length
            )
              return "[object has no keys]";
            if (
              ((r = "number" != typeof r ? MAX_SERIALIZE_KEYS_LENGTH : r),
              e[0].length >= r)
            )
              return e[0];
            for (var t = e.length; t > 0; t--) {
              var n = e.slice(0, t).join(", ");
              if (!(n.length > r)) return t === e.length ? n : n + "…";
            }
            return "";
          }
          function sanitize(e, r) {
            if (!isArray(r) || (isArray(r) && 0 === r.length)) return e;
            var t,
              n = joinRegExp(r),
              i = "********";
            try {
              t = JSON.parse(stringify(e));
            } catch (r) {
              return e;
            }
            return (function sanitizeWorker(e) {
              return isArray(e)
                ? e.map(function(e) {
                    return sanitizeWorker(e);
                  })
                : isPlainObject(e)
                ? Object.keys(e).reduce(function(r, t) {
                    return (
                      n.test(t) ? (r[t] = i) : (r[t] = sanitizeWorker(e[t])), r
                    );
                  }, {})
                : e;
            })(t);
          }
          module.exports = {
            isObject: isObject,
            isError: isError,
            isErrorEvent: isErrorEvent,
            isDOMError: isDOMError,
            isDOMException: isDOMException,
            isUndefined: isUndefined,
            isFunction: isFunction,
            isPlainObject: isPlainObject,
            isString: isString,
            isArray: isArray,
            isEmptyObject: isEmptyObject,
            supportsErrorEvent: supportsErrorEvent,
            supportsDOMError: supportsDOMError,
            supportsDOMException: supportsDOMException,
            supportsFetch: supportsFetch,
            supportsReferrerPolicy: supportsReferrerPolicy,
            supportsPromiseRejectionEvent: supportsPromiseRejectionEvent,
            wrappedCallback: wrappedCallback,
            each: each,
            objectMerge: objectMerge,
            truncate: truncate,
            objectFrozen: objectFrozen,
            hasKey: hasKey,
            joinRegExp: joinRegExp,
            urlencode: urlencode,
            uuid4: uuid4,
            htmlTreeAsString: htmlTreeAsString,
            htmlElementAsString: htmlElementAsString,
            isSameException: isSameException,
            isSameStacktrace: isSameStacktrace,
            parseUrl: parseUrl,
            fill: fill,
            safeJoin: safeJoin,
            serializeException: serializeException,
            serializeKeysForMessage: serializeKeysForMessage,
            sanitize: sanitize
          };
        }.call(
          this,
          typeof global !== "undefined"
            ? global
            : typeof self !== "undefined"
            ? self
            : typeof window !== "undefined"
            ? window
            : {}
        ));
      },
      { "../vendor/json-stringify-safe/stringify": 18 }
    ],
    17: [
      function(require, module, exports) {
        (function(global) {
          var utils = require("../../src/utils"),
            TraceKit = { collectWindowErrors: !0, debug: !1 },
            _window =
              "undefined" != typeof window
                ? window
                : "undefined" != typeof global
                ? global
                : "undefined" != typeof self
                ? self
                : {},
            _slice = [].slice,
            UNKNOWN_FUNCTION = "?",
            ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
          function getLocationHref() {
            return "undefined" == typeof document || null == document.location
              ? ""
              : document.location.href;
          }
          function getLocationOrigin() {
            return "undefined" == typeof document || null == document.location
              ? ""
              : document.location.origin
              ? document.location.origin
              : document.location.protocol +
                "//" +
                document.location.hostname +
                (document.location.port ? ":" + document.location.port : "");
          }
          (TraceKit.report = (function reportModuleWrapper() {
            var e,
              n,
              t = [],
              r = null,
              c = null,
              a = null;
            function notifyHandlers(e, n) {
              var r = null;
              if (!n || TraceKit.collectWindowErrors) {
                for (var c in t)
                  if (t.hasOwnProperty(c))
                    try {
                      t[c].apply(null, [e].concat(_slice.call(arguments, 2)));
                    } catch (e) {
                      r = e;
                    }
                if (r) throw r;
              }
            }
            function traceKitWindowOnError(n, t, r, c, i) {
              var l = utils.isErrorEvent(i) ? i.error : i,
                o = utils.isErrorEvent(n) ? n.message : n;
              if (a)
                TraceKit.computeStackTrace.augmentStackTraceWithInitialElement(
                  a,
                  t,
                  r,
                  o
                ),
                  processLastException();
              else if (l && utils.isError(l))
                notifyHandlers(TraceKit.computeStackTrace(l), !0);
              else {
                var u,
                  s = { url: t, line: r, column: c },
                  f = void 0;
                if ("[object String]" === {}.toString.call(o))
                  (u = o.match(ERROR_TYPES_RE)) && ((f = u[1]), (o = u[2]));
                (s.func = UNKNOWN_FUNCTION),
                  notifyHandlers(
                    { name: f, message: o, url: getLocationHref(), stack: [s] },
                    !0
                  );
              }
              return !!e && e.apply(this, arguments);
            }
            function processLastException() {
              var e = a,
                n = r;
              (r = null),
                (a = null),
                (c = null),
                notifyHandlers.apply(null, [e, !1].concat(n));
            }
            function report(e, n) {
              var t = _slice.call(arguments, 1);
              if (a) {
                if (c === e) return;
                processLastException();
              }
              var i = TraceKit.computeStackTrace(e);
              if (
                ((a = i),
                (c = e),
                (r = t),
                setTimeout(
                  function() {
                    c === e && processLastException();
                  },
                  i.incomplete ? 2e3 : 0
                ),
                !1 !== n)
              )
                throw e;
            }
            return (
              (report.subscribe = function subscribe(r) {
                !(function installGlobalHandler() {
                  n ||
                    ((e = _window.onerror),
                    (_window.onerror = traceKitWindowOnError),
                    (n = !0));
                })(),
                  t.push(r);
              }),
              (report.unsubscribe = function unsubscribe(e) {
                for (var n = t.length - 1; n >= 0; --n)
                  t[n] === e && t.splice(n, 1);
              }),
              (report.uninstall = function unsubscribeAll() {
                !(function uninstallGlobalHandler() {
                  n && ((_window.onerror = e), (n = !1), (e = void 0));
                })(),
                  (t = []);
              }),
              report
            );
          })()),
            (TraceKit.computeStackTrace = (function computeStackTraceWrapper() {
              function computeStackTraceFromStackProp(e) {
                if (void 0 !== e.stack && e.stack) {
                  for (
                    var n,
                      t,
                      r,
                      c = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
                      a = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx(?:-web)|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
                      i = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i,
                      l = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
                      o = /\((\S*)(?::(\d+))(?::(\d+))\)/,
                      u = e.stack.split("\n"),
                      s = [],
                      f = (/^(.*) is undefined$/.exec(e.message), 0),
                      m = u.length;
                    f < m;
                    ++f
                  ) {
                    if ((t = c.exec(u[f]))) {
                      var p = t[2] && 0 === t[2].indexOf("native");
                      t[2] &&
                        0 === t[2].indexOf("eval") &&
                        (n = o.exec(t[2])) &&
                        ((t[2] = n[1]), (t[3] = n[2]), (t[4] = n[3])),
                        (r = {
                          url: p ? null : t[2],
                          func: t[1] || UNKNOWN_FUNCTION,
                          args: p ? [t[2]] : [],
                          line: t[3] ? +t[3] : null,
                          column: t[4] ? +t[4] : null
                        });
                    } else if ((t = a.exec(u[f])))
                      r = {
                        url: t[2],
                        func: t[1] || UNKNOWN_FUNCTION,
                        args: [],
                        line: +t[3],
                        column: t[4] ? +t[4] : null
                      };
                    else {
                      if (!(t = i.exec(u[f]))) continue;
                      t[3] && t[3].indexOf(" > eval") > -1 && (n = l.exec(t[3]))
                        ? ((t[3] = n[1]), (t[4] = n[2]), (t[5] = null))
                        : 0 !== f ||
                          t[5] ||
                          void 0 === e.columnNumber ||
                          (s[0].column = e.columnNumber + 1),
                        (r = {
                          url: t[3],
                          func: t[1] || UNKNOWN_FUNCTION,
                          args: t[2] ? t[2].split(",") : [],
                          line: t[4] ? +t[4] : null,
                          column: t[5] ? +t[5] : null
                        });
                    }
                    if (
                      (!r.func && r.line && (r.func = UNKNOWN_FUNCTION),
                      r.url && "blob:" === r.url.substr(0, 5))
                    ) {
                      var d = new XMLHttpRequest();
                      if (
                        (d.open("GET", r.url, !1),
                        d.send(null),
                        200 === d.status)
                      ) {
                        var g = d.responseText || "",
                          T = (g = g.slice(-300)).match(
                            /\/\/# sourceMappingURL=(.*)$/
                          );
                        if (T) {
                          var k = T[1];
                          "~" === k.charAt(0) &&
                            (k = getLocationOrigin() + k.slice(1)),
                            (r.url = k.slice(0, -4));
                        }
                      }
                    }
                    s.push(r);
                  }
                  return s.length
                    ? {
                        name: e.name,
                        message: e.message,
                        url: getLocationHref(),
                        stack: s
                      }
                    : null;
                }
              }
              function augmentStackTraceWithInitialElement(e, n, t, r) {
                var c = { url: n, line: t };
                if (c.url && c.line) {
                  if (
                    ((e.incomplete = !1),
                    c.func || (c.func = UNKNOWN_FUNCTION),
                    e.stack.length > 0 && e.stack[0].url === c.url)
                  ) {
                    if (e.stack[0].line === c.line) return !1;
                    if (!e.stack[0].line && e.stack[0].func === c.func)
                      return (e.stack[0].line = c.line), !1;
                  }
                  return e.stack.unshift(c), (e.partial = !0), !0;
                }
                return (e.incomplete = !0), !1;
              }
              function computeStackTraceByWalkingCallerChain(e, n) {
                for (
                  var t,
                    r,
                    c = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,
                    a = [],
                    i = {},
                    l = !1,
                    o = computeStackTraceByWalkingCallerChain.caller;
                  o && !l;
                  o = o.caller
                )
                  if (o !== computeStackTrace && o !== TraceKit.report) {
                    if (
                      ((r = {
                        url: null,
                        func: UNKNOWN_FUNCTION,
                        line: null,
                        column: null
                      }),
                      o.name
                        ? (r.func = o.name)
                        : (t = c.exec(o.toString())) && (r.func = t[1]),
                      void 0 === r.func)
                    )
                      try {
                        r.func = t.input.substring(0, t.input.indexOf("{"));
                      } catch (e) {}
                    i["" + o] ? (l = !0) : (i["" + o] = !0), a.push(r);
                  }
                n && a.splice(0, n);
                var u = {
                  name: e.name,
                  message: e.message,
                  url: getLocationHref(),
                  stack: a
                };
                return (
                  augmentStackTraceWithInitialElement(
                    u,
                    e.sourceURL || e.fileName,
                    e.line || e.lineNumber,
                    e.message || e.description
                  ),
                  u
                );
              }
              function computeStackTrace(e, n) {
                var t = null;
                n = null == n ? 0 : +n;
                try {
                  if ((t = computeStackTraceFromStackProp(e))) return t;
                } catch (e) {
                  if (TraceKit.debug) throw e;
                }
                try {
                  if ((t = computeStackTraceByWalkingCallerChain(e, n + 1)))
                    return t;
                } catch (e) {
                  if (TraceKit.debug) throw e;
                }
                return {
                  name: e.name,
                  message: e.message,
                  url: getLocationHref()
                };
              }
              return (
                (computeStackTrace.augmentStackTraceWithInitialElement = augmentStackTraceWithInitialElement),
                (computeStackTrace.computeStackTraceFromStackProp = computeStackTraceFromStackProp),
                computeStackTrace
              );
            })()),
            (module.exports = TraceKit);
        }.call(
          this,
          typeof global !== "undefined"
            ? global
            : typeof self !== "undefined"
            ? self
            : typeof window !== "undefined"
            ? window
            : {}
        ));
      },
      { "../../src/utils": 16 }
    ],
    18: [
      function(require, module, exports) {
        function indexOf(r, i) {
          for (var e = 0; e < r.length; ++e) if (r[e] === i) return e;
          return -1;
        }
        function stringify(r, i, e, n) {
          return JSON.stringify(r, serializer(i, n), e);
        }
        function stringifyError(r) {
          var i = { stack: r.stack, message: r.message, name: r.name };
          for (var e in r)
            Object.prototype.hasOwnProperty.call(r, e) && (i[e] = r[e]);
          return i;
        }
        function serializer(r, i) {
          var e = [],
            n = [];
          return (
            null == i &&
              (i = function(r, i) {
                return e[0] === i
                  ? "[Circular ~]"
                  : "[Circular ~." + n.slice(0, indexOf(e, i)).join(".") + "]";
              }),
            function(t, s) {
              if (e.length > 0) {
                var l = indexOf(e, this);
                ~l ? e.splice(l + 1) : e.push(this),
                  ~l ? n.splice(l, 1 / 0, t) : n.push(t),
                  ~indexOf(e, s) && (s = i.call(this, t, s));
              } else e.push(s);
              return null == r
                ? s instanceof Error
                  ? stringifyError(s)
                  : s
                : r.call(this, t, s);
            }
          );
        }
        (exports = module.exports = stringify),
          (exports.getSerialize = serializer);
      },
      {}
    ],
    19: [
      function(require, module, exports) {
        function safeAdd(r, d) {
          var n = (65535 & r) + (65535 & d);
          return (((r >> 16) + (d >> 16) + (n >> 16)) << 16) | (65535 & n);
        }
        function bitRotateLeft(r, d) {
          return (r << d) | (r >>> (32 - d));
        }
        function md5cmn(r, d, n, t, m, f) {
          return safeAdd(
            bitRotateLeft(safeAdd(safeAdd(d, r), safeAdd(t, f)), m),
            n
          );
        }
        function md5ff(r, d, n, t, m, f, i) {
          return md5cmn((d & n) | (~d & t), r, d, m, f, i);
        }
        function md5gg(r, d, n, t, m, f, i) {
          return md5cmn((d & t) | (n & ~t), r, d, m, f, i);
        }
        function md5hh(r, d, n, t, m, f, i) {
          return md5cmn(d ^ n ^ t, r, d, m, f, i);
        }
        function md5ii(r, d, n, t, m, f, i) {
          return md5cmn(n ^ (d | ~t), r, d, m, f, i);
        }
        function binlMD5(r, d) {
          var n, t, m, f, i;
          (r[d >> 5] |= 128 << d % 32), (r[14 + (((d + 64) >>> 9) << 4)] = d);
          var e = 1732584193,
            h = -271733879,
            g = -1732584194,
            o = 271733878;
          for (n = 0; n < r.length; n += 16)
            (t = e),
              (m = h),
              (f = g),
              (i = o),
              (e = md5ff(e, h, g, o, r[n], 7, -680876936)),
              (o = md5ff(o, e, h, g, r[n + 1], 12, -389564586)),
              (g = md5ff(g, o, e, h, r[n + 2], 17, 606105819)),
              (h = md5ff(h, g, o, e, r[n + 3], 22, -1044525330)),
              (e = md5ff(e, h, g, o, r[n + 4], 7, -176418897)),
              (o = md5ff(o, e, h, g, r[n + 5], 12, 1200080426)),
              (g = md5ff(g, o, e, h, r[n + 6], 17, -1473231341)),
              (h = md5ff(h, g, o, e, r[n + 7], 22, -45705983)),
              (e = md5ff(e, h, g, o, r[n + 8], 7, 1770035416)),
              (o = md5ff(o, e, h, g, r[n + 9], 12, -1958414417)),
              (g = md5ff(g, o, e, h, r[n + 10], 17, -42063)),
              (h = md5ff(h, g, o, e, r[n + 11], 22, -1990404162)),
              (e = md5ff(e, h, g, o, r[n + 12], 7, 1804603682)),
              (o = md5ff(o, e, h, g, r[n + 13], 12, -40341101)),
              (g = md5ff(g, o, e, h, r[n + 14], 17, -1502002290)),
              (e = md5gg(
                e,
                (h = md5ff(h, g, o, e, r[n + 15], 22, 1236535329)),
                g,
                o,
                r[n + 1],
                5,
                -165796510
              )),
              (o = md5gg(o, e, h, g, r[n + 6], 9, -1069501632)),
              (g = md5gg(g, o, e, h, r[n + 11], 14, 643717713)),
              (h = md5gg(h, g, o, e, r[n], 20, -373897302)),
              (e = md5gg(e, h, g, o, r[n + 5], 5, -701558691)),
              (o = md5gg(o, e, h, g, r[n + 10], 9, 38016083)),
              (g = md5gg(g, o, e, h, r[n + 15], 14, -660478335)),
              (h = md5gg(h, g, o, e, r[n + 4], 20, -405537848)),
              (e = md5gg(e, h, g, o, r[n + 9], 5, 568446438)),
              (o = md5gg(o, e, h, g, r[n + 14], 9, -1019803690)),
              (g = md5gg(g, o, e, h, r[n + 3], 14, -187363961)),
              (h = md5gg(h, g, o, e, r[n + 8], 20, 1163531501)),
              (e = md5gg(e, h, g, o, r[n + 13], 5, -1444681467)),
              (o = md5gg(o, e, h, g, r[n + 2], 9, -51403784)),
              (g = md5gg(g, o, e, h, r[n + 7], 14, 1735328473)),
              (e = md5hh(
                e,
                (h = md5gg(h, g, o, e, r[n + 12], 20, -1926607734)),
                g,
                o,
                r[n + 5],
                4,
                -378558
              )),
              (o = md5hh(o, e, h, g, r[n + 8], 11, -2022574463)),
              (g = md5hh(g, o, e, h, r[n + 11], 16, 1839030562)),
              (h = md5hh(h, g, o, e, r[n + 14], 23, -35309556)),
              (e = md5hh(e, h, g, o, r[n + 1], 4, -1530992060)),
              (o = md5hh(o, e, h, g, r[n + 4], 11, 1272893353)),
              (g = md5hh(g, o, e, h, r[n + 7], 16, -155497632)),
              (h = md5hh(h, g, o, e, r[n + 10], 23, -1094730640)),
              (e = md5hh(e, h, g, o, r[n + 13], 4, 681279174)),
              (o = md5hh(o, e, h, g, r[n], 11, -358537222)),
              (g = md5hh(g, o, e, h, r[n + 3], 16, -722521979)),
              (h = md5hh(h, g, o, e, r[n + 6], 23, 76029189)),
              (e = md5hh(e, h, g, o, r[n + 9], 4, -640364487)),
              (o = md5hh(o, e, h, g, r[n + 12], 11, -421815835)),
              (g = md5hh(g, o, e, h, r[n + 15], 16, 530742520)),
              (e = md5ii(
                e,
                (h = md5hh(h, g, o, e, r[n + 2], 23, -995338651)),
                g,
                o,
                r[n],
                6,
                -198630844
              )),
              (o = md5ii(o, e, h, g, r[n + 7], 10, 1126891415)),
              (g = md5ii(g, o, e, h, r[n + 14], 15, -1416354905)),
              (h = md5ii(h, g, o, e, r[n + 5], 21, -57434055)),
              (e = md5ii(e, h, g, o, r[n + 12], 6, 1700485571)),
              (o = md5ii(o, e, h, g, r[n + 3], 10, -1894986606)),
              (g = md5ii(g, o, e, h, r[n + 10], 15, -1051523)),
              (h = md5ii(h, g, o, e, r[n + 1], 21, -2054922799)),
              (e = md5ii(e, h, g, o, r[n + 8], 6, 1873313359)),
              (o = md5ii(o, e, h, g, r[n + 15], 10, -30611744)),
              (g = md5ii(g, o, e, h, r[n + 6], 15, -1560198380)),
              (h = md5ii(h, g, o, e, r[n + 13], 21, 1309151649)),
              (e = md5ii(e, h, g, o, r[n + 4], 6, -145523070)),
              (o = md5ii(o, e, h, g, r[n + 11], 10, -1120210379)),
              (g = md5ii(g, o, e, h, r[n + 2], 15, 718787259)),
              (h = md5ii(h, g, o, e, r[n + 9], 21, -343485551)),
              (e = safeAdd(e, t)),
              (h = safeAdd(h, m)),
              (g = safeAdd(g, f)),
              (o = safeAdd(o, i));
          return [e, h, g, o];
        }
        function binl2rstr(r) {
          var d,
            n = "",
            t = 32 * r.length;
          for (d = 0; d < t; d += 8)
            n += String.fromCharCode((r[d >> 5] >>> d % 32) & 255);
          return n;
        }
        function rstr2binl(r) {
          var d,
            n = [];
          for (n[(r.length >> 2) - 1] = void 0, d = 0; d < n.length; d += 1)
            n[d] = 0;
          var t = 8 * r.length;
          for (d = 0; d < t; d += 8)
            n[d >> 5] |= (255 & r.charCodeAt(d / 8)) << d % 32;
          return n;
        }
        function rstrMD5(r) {
          return binl2rstr(binlMD5(rstr2binl(r), 8 * r.length));
        }
        function rstrHMACMD5(r, d) {
          var n,
            t,
            m = rstr2binl(r),
            f = [],
            i = [];
          for (
            f[15] = i[15] = void 0,
              m.length > 16 && (m = binlMD5(m, 8 * r.length)),
              n = 0;
            n < 16;
            n += 1
          )
            (f[n] = 909522486 ^ m[n]), (i[n] = 1549556828 ^ m[n]);
          return (
            (t = binlMD5(f.concat(rstr2binl(d)), 512 + 8 * d.length)),
            binl2rstr(binlMD5(i.concat(t), 640))
          );
        }
        function rstr2hex(r) {
          var d,
            n,
            t = "";
          for (n = 0; n < r.length; n += 1)
            (d = r.charCodeAt(n)),
              (t +=
                "0123456789abcdef".charAt((d >>> 4) & 15) +
                "0123456789abcdef".charAt(15 & d));
          return t;
        }
        function str2rstrUTF8(r) {
          return unescape(encodeURIComponent(r));
        }
        function rawMD5(r) {
          return rstrMD5(str2rstrUTF8(r));
        }
        function hexMD5(r) {
          return rstr2hex(rawMD5(r));
        }
        function rawHMACMD5(r, d) {
          return rstrHMACMD5(str2rstrUTF8(r), str2rstrUTF8(d));
        }
        function hexHMACMD5(r, d) {
          return rstr2hex(rawHMACMD5(r, d));
        }
        function md5(r, d, n) {
          return d
            ? n
              ? rawHMACMD5(d, r)
              : hexHMACMD5(d, r)
            : n
            ? rawMD5(r)
            : hexMD5(r);
        }
        module.exports = md5;
      },
      {}
    ],
    20: [
      function(require, module, exports) {
        "use strict";
        var _when = require("./when"),
          _not = require("./not");
        module.exports = { When: _when.When, WhenNot: _not.WhenNot };
      },
      { "./not": 21, "./when": 22 }
    ],
    21: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.WhenNot = void 0);
        var _when = require("./when"),
          WhenNot = (exports.WhenNot = function WhenNot(e) {
            if (e.and && e.or) throw new Error('must not use "and" with "or".');
            var r = (0, _when.filterCaseLabel)(Object.keys(e));
            if (r.length > 1 && !e.and && !e.or)
              throw new Error('must specify "and" or "or" operator.');
            var n = !0,
              t = !1,
              o = void 0;
            try {
              for (
                var a, i = r[Symbol.iterator]();
                !(n = (a = i.next()).done);
                n = !0
              ) {
                var l = a.value;
                if (e.or) {
                  if (_when.When.case(l)) return null;
                } else if (!_when.When.case(l)) return e.children || null;
              }
            } catch (e) {
              (t = !0), (o = e);
            } finally {
              try {
                !n && i.return && i.return();
              } finally {
                if (t) throw o;
              }
            }
            return (e.or && e.children) || null;
          });
      },
      { "./when": 22 }
    ],
    22: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var reservedWords = ["children", "or", "and"],
          filterCaseLabel = (exports.filterCaseLabel = function filterCaseLabel(
            e
          ) {
            return e.filter(function(e) {
              return !reservedWords.includes(e);
            });
          }),
          When = (exports.When = function When(e) {
            if (e.and && e.or) throw new Error('must not use "and" with "or".');
            var r = filterCaseLabel(Object.keys(e));
            if (r.length > 1 && !e.and && !e.or)
              throw new Error('must specify "and" or "or" operator.');
            var n = !0,
              t = !1,
              o = void 0;
            try {
              for (
                var i, s = r[Symbol.iterator]();
                !(n = (i = s.next()).done);
                n = !0
              ) {
                var a = i.value;
                if (e.or) {
                  if (When.case(a)) return e.children || null;
                } else if (!When.case(a)) return null;
              }
            } catch (e) {
              (t = !0), (o = e);
            } finally {
              try {
                !n && s.return && s.return();
              } finally {
                if (t) throw o;
              }
            }
            return e.or ? null : e.children || null;
          });
        (When.cases = {}),
          (When.case = function(e, r) {
            if (r) {
              if ("function" != typeof r)
                throw new Error("condition must be a function.");
              if (When.cases[e])
                throw new Error('label "' + e + '" is already registerd.');
              return (
                (When.cases[e] = r),
                Object.defineProperty(When, e, { get: r }),
                r
              );
            }
            if ("function" != typeof When.cases[e])
              throw new Error('label "' + e + '" is not registerd.');
            return When.cases[e]();
          });
      },
      {}
    ],
    23: [
      function(require, module, exports) {
        "use strict";
        var punycode = require("punycode"),
          util = require("./util");
        function Url() {
          (this.protocol = null),
            (this.slashes = null),
            (this.auth = null),
            (this.host = null),
            (this.port = null),
            (this.hostname = null),
            (this.hash = null),
            (this.search = null),
            (this.query = null),
            (this.pathname = null),
            (this.path = null),
            (this.href = null);
        }
        (exports.parse = urlParse),
          (exports.resolve = urlResolve),
          (exports.resolveObject = urlResolveObject),
          (exports.format = urlFormat),
          (exports.Url = Url);
        var protocolPattern = /^([a-z0-9.+-]+:)/i,
          portPattern = /:[0-9]*$/,
          simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
          delims = ["<", ">", '"', "`", " ", "\r", "\n", "\t"],
          unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims),
          autoEscape = ["'"].concat(unwise),
          nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape),
          hostEndingChars = ["/", "?", "#"],
          hostnameMaxLen = 255,
          hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
          hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
          unsafeProtocol = { javascript: !0, "javascript:": !0 },
          hostlessProtocol = { javascript: !0, "javascript:": !0 },
          slashedProtocol = {
            http: !0,
            https: !0,
            ftp: !0,
            gopher: !0,
            file: !0,
            "http:": !0,
            "https:": !0,
            "ftp:": !0,
            "gopher:": !0,
            "file:": !0
          },
          querystring = require("querystring");
        function urlParse(t, s, e) {
          if (t && util.isObject(t) && t instanceof Url) return t;
          var h = new Url();
          return h.parse(t, s, e), h;
        }
        function urlFormat(t) {
          return (
            util.isString(t) && (t = urlParse(t)),
            t instanceof Url ? t.format() : Url.prototype.format.call(t)
          );
        }
        function urlResolve(t, s) {
          return urlParse(t, !1, !0).resolve(s);
        }
        function urlResolveObject(t, s) {
          return t ? urlParse(t, !1, !0).resolveObject(s) : s;
        }
        (Url.prototype.parse = function(t, s, e) {
          if (!util.isString(t))
            throw new TypeError(
              "Parameter 'url' must be a string, not " + typeof t
            );
          var h = t.indexOf("?"),
            r = -1 !== h && h < t.indexOf("#") ? "?" : "#",
            a = t.split(r);
          a[0] = a[0].replace(/\\/g, "/");
          var o = (t = a.join(r));
          if (((o = o.trim()), !e && 1 === t.split("#").length)) {
            var n = simplePathPattern.exec(o);
            if (n)
              return (
                (this.path = o),
                (this.href = o),
                (this.pathname = n[1]),
                n[2]
                  ? ((this.search = n[2]),
                    (this.query = s
                      ? querystring.parse(this.search.substr(1))
                      : this.search.substr(1)))
                  : s && ((this.search = ""), (this.query = {})),
                this
              );
          }
          var i = protocolPattern.exec(o);
          if (i) {
            var l = (i = i[0]).toLowerCase();
            (this.protocol = l), (o = o.substr(i.length));
          }
          if (e || i || o.match(/^\/\/[^@\/]+@[^@\/]+/)) {
            var u = "//" === o.substr(0, 2);
            !u ||
              (i && hostlessProtocol[i]) ||
              ((o = o.substr(2)), (this.slashes = !0));
          }
          if (!hostlessProtocol[i] && (u || (i && !slashedProtocol[i]))) {
            for (var p, c, f = -1, m = 0; m < hostEndingChars.length; m++) {
              -1 !== (v = o.indexOf(hostEndingChars[m])) &&
                (-1 === f || v < f) &&
                (f = v);
            }
            -1 !==
              (c = -1 === f ? o.lastIndexOf("@") : o.lastIndexOf("@", f)) &&
              ((p = o.slice(0, c)),
              (o = o.slice(c + 1)),
              (this.auth = decodeURIComponent(p))),
              (f = -1);
            for (m = 0; m < nonHostChars.length; m++) {
              var v;
              -1 !== (v = o.indexOf(nonHostChars[m])) &&
                (-1 === f || v < f) &&
                (f = v);
            }
            -1 === f && (f = o.length),
              (this.host = o.slice(0, f)),
              (o = o.slice(f)),
              this.parseHost(),
              (this.hostname = this.hostname || "");
            var g =
              "[" === this.hostname[0] &&
              "]" === this.hostname[this.hostname.length - 1];
            if (!g)
              for (
                var y = this.hostname.split(/\./), P = ((m = 0), y.length);
                m < P;
                m++
              ) {
                var d = y[m];
                if (d && !d.match(hostnamePartPattern)) {
                  for (var b = "", q = 0, O = d.length; q < O; q++)
                    d.charCodeAt(q) > 127 ? (b += "x") : (b += d[q]);
                  if (!b.match(hostnamePartPattern)) {
                    var j = y.slice(0, m),
                      x = y.slice(m + 1),
                      U = d.match(hostnamePartStart);
                    U && (j.push(U[1]), x.unshift(U[2])),
                      x.length && (o = "/" + x.join(".") + o),
                      (this.hostname = j.join("."));
                    break;
                  }
                }
              }
            this.hostname.length > hostnameMaxLen
              ? (this.hostname = "")
              : (this.hostname = this.hostname.toLowerCase()),
              g || (this.hostname = punycode.toASCII(this.hostname));
            var C = this.port ? ":" + this.port : "",
              A = this.hostname || "";
            (this.host = A + C),
              (this.href += this.host),
              g &&
                ((this.hostname = this.hostname.substr(
                  1,
                  this.hostname.length - 2
                )),
                "/" !== o[0] && (o = "/" + o));
          }
          if (!unsafeProtocol[l])
            for (m = 0, P = autoEscape.length; m < P; m++) {
              var w = autoEscape[m];
              if (-1 !== o.indexOf(w)) {
                var E = encodeURIComponent(w);
                E === w && (E = escape(w)), (o = o.split(w).join(E));
              }
            }
          var I = o.indexOf("#");
          -1 !== I && ((this.hash = o.substr(I)), (o = o.slice(0, I)));
          var R = o.indexOf("?");
          if (
            (-1 !== R
              ? ((this.search = o.substr(R)),
                (this.query = o.substr(R + 1)),
                s && (this.query = querystring.parse(this.query)),
                (o = o.slice(0, R)))
              : s && ((this.search = ""), (this.query = {})),
            o && (this.pathname = o),
            slashedProtocol[l] &&
              this.hostname &&
              !this.pathname &&
              (this.pathname = "/"),
            this.pathname || this.search)
          ) {
            C = this.pathname || "";
            var S = this.search || "";
            this.path = C + S;
          }
          return (this.href = this.format()), this;
        }),
          (Url.prototype.format = function() {
            var t = this.auth || "";
            t &&
              ((t = (t = encodeURIComponent(t)).replace(/%3A/i, ":")),
              (t += "@"));
            var s = this.protocol || "",
              e = this.pathname || "",
              h = this.hash || "",
              r = !1,
              a = "";
            this.host
              ? (r = t + this.host)
              : this.hostname &&
                ((r =
                  t +
                  (-1 === this.hostname.indexOf(":")
                    ? this.hostname
                    : "[" + this.hostname + "]")),
                this.port && (r += ":" + this.port)),
              this.query &&
                util.isObject(this.query) &&
                Object.keys(this.query).length &&
                (a = querystring.stringify(this.query));
            var o = this.search || (a && "?" + a) || "";
            return (
              s && ":" !== s.substr(-1) && (s += ":"),
              this.slashes || ((!s || slashedProtocol[s]) && !1 !== r)
                ? ((r = "//" + (r || "")),
                  e && "/" !== e.charAt(0) && (e = "/" + e))
                : r || (r = ""),
              h && "#" !== h.charAt(0) && (h = "#" + h),
              o && "?" !== o.charAt(0) && (o = "?" + o),
              s +
                r +
                (e = e.replace(/[?#]/g, function(t) {
                  return encodeURIComponent(t);
                })) +
                (o = o.replace("#", "%23")) +
                h
            );
          }),
          (Url.prototype.resolve = function(t) {
            return this.resolveObject(urlParse(t, !1, !0)).format();
          }),
          (Url.prototype.resolveObject = function(t) {
            if (util.isString(t)) {
              var s = new Url();
              s.parse(t, !1, !0), (t = s);
            }
            for (
              var e = new Url(), h = Object.keys(this), r = 0;
              r < h.length;
              r++
            ) {
              var a = h[r];
              e[a] = this[a];
            }
            if (((e.hash = t.hash), "" === t.href))
              return (e.href = e.format()), e;
            if (t.slashes && !t.protocol) {
              for (var o = Object.keys(t), n = 0; n < o.length; n++) {
                var i = o[n];
                "protocol" !== i && (e[i] = t[i]);
              }
              return (
                slashedProtocol[e.protocol] &&
                  e.hostname &&
                  !e.pathname &&
                  (e.path = e.pathname = "/"),
                (e.href = e.format()),
                e
              );
            }
            if (t.protocol && t.protocol !== e.protocol) {
              if (!slashedProtocol[t.protocol]) {
                for (var l = Object.keys(t), u = 0; u < l.length; u++) {
                  var p = l[u];
                  e[p] = t[p];
                }
                return (e.href = e.format()), e;
              }
              if (
                ((e.protocol = t.protocol),
                t.host || hostlessProtocol[t.protocol])
              )
                e.pathname = t.pathname;
              else {
                for (
                  var c = (t.pathname || "").split("/");
                  c.length && !(t.host = c.shift());

                );
                t.host || (t.host = ""),
                  t.hostname || (t.hostname = ""),
                  "" !== c[0] && c.unshift(""),
                  c.length < 2 && c.unshift(""),
                  (e.pathname = c.join("/"));
              }
              if (
                ((e.search = t.search),
                (e.query = t.query),
                (e.host = t.host || ""),
                (e.auth = t.auth),
                (e.hostname = t.hostname || t.host),
                (e.port = t.port),
                e.pathname || e.search)
              ) {
                var f = e.pathname || "",
                  m = e.search || "";
                e.path = f + m;
              }
              return (
                (e.slashes = e.slashes || t.slashes), (e.href = e.format()), e
              );
            }
            var v = e.pathname && "/" === e.pathname.charAt(0),
              g = t.host || (t.pathname && "/" === t.pathname.charAt(0)),
              y = g || v || (e.host && t.pathname),
              P = y,
              d = (e.pathname && e.pathname.split("/")) || [],
              b = ((c = (t.pathname && t.pathname.split("/")) || []),
              e.protocol && !slashedProtocol[e.protocol]);
            if (
              (b &&
                ((e.hostname = ""),
                (e.port = null),
                e.host && ("" === d[0] ? (d[0] = e.host) : d.unshift(e.host)),
                (e.host = ""),
                t.protocol &&
                  ((t.hostname = null),
                  (t.port = null),
                  t.host && ("" === c[0] ? (c[0] = t.host) : c.unshift(t.host)),
                  (t.host = null)),
                (y = y && ("" === c[0] || "" === d[0]))),
              g)
            )
              (e.host = t.host || "" === t.host ? t.host : e.host),
                (e.hostname =
                  t.hostname || "" === t.hostname ? t.hostname : e.hostname),
                (e.search = t.search),
                (e.query = t.query),
                (d = c);
            else if (c.length)
              d || (d = []),
                d.pop(),
                (d = d.concat(c)),
                (e.search = t.search),
                (e.query = t.query);
            else if (!util.isNullOrUndefined(t.search)) {
              if (b)
                (e.hostname = e.host = d.shift()),
                  (U =
                    !!(e.host && e.host.indexOf("@") > 0) &&
                    e.host.split("@")) &&
                    ((e.auth = U.shift()), (e.host = e.hostname = U.shift()));
              return (
                (e.search = t.search),
                (e.query = t.query),
                (util.isNull(e.pathname) && util.isNull(e.search)) ||
                  (e.path =
                    (e.pathname ? e.pathname : "") +
                    (e.search ? e.search : "")),
                (e.href = e.format()),
                e
              );
            }
            if (!d.length)
              return (
                (e.pathname = null),
                e.search ? (e.path = "/" + e.search) : (e.path = null),
                (e.href = e.format()),
                e
              );
            for (
              var q = d.slice(-1)[0],
                O =
                  ((e.host || t.host || d.length > 1) &&
                    ("." === q || ".." === q)) ||
                  "" === q,
                j = 0,
                x = d.length;
              x >= 0;
              x--
            )
              "." === (q = d[x])
                ? d.splice(x, 1)
                : ".." === q
                ? (d.splice(x, 1), j++)
                : j && (d.splice(x, 1), j--);
            if (!y && !P) for (; j--; j) d.unshift("..");
            !y ||
              "" === d[0] ||
              (d[0] && "/" === d[0].charAt(0)) ||
              d.unshift(""),
              O && "/" !== d.join("/").substr(-1) && d.push("");
            var U,
              C = "" === d[0] || (d[0] && "/" === d[0].charAt(0));
            b &&
              ((e.hostname = e.host = C ? "" : d.length ? d.shift() : ""),
              (U =
                !!(e.host && e.host.indexOf("@") > 0) && e.host.split("@")) &&
                ((e.auth = U.shift()), (e.host = e.hostname = U.shift())));
            return (
              (y = y || (e.host && d.length)) && !C && d.unshift(""),
              d.length
                ? (e.pathname = d.join("/"))
                : ((e.pathname = null), (e.path = null)),
              (util.isNull(e.pathname) && util.isNull(e.search)) ||
                (e.path =
                  (e.pathname ? e.pathname : "") + (e.search ? e.search : "")),
              (e.auth = t.auth || e.auth),
              (e.slashes = e.slashes || t.slashes),
              (e.href = e.format()),
              e
            );
          }),
          (Url.prototype.parseHost = function() {
            var t = this.host,
              s = portPattern.exec(t);
            s &&
              (":" !== (s = s[0]) && (this.port = s.substr(1)),
              (t = t.substr(0, t.length - s.length))),
              t && (this.hostname = t);
          });
      },
      { "./util": 24, punycode: 8, querystring: 11 }
    ],
    24: [
      function(require, module, exports) {
        "use strict";
        module.exports = {
          isString: function(n) {
            return "string" == typeof n;
          },
          isObject: function(n) {
            return "object" == typeof n && null !== n;
          },
          isNull: function(n) {
            return null === n;
          },
          isNullOrUndefined: function(n) {
            return null == n;
          }
        };
      },
      {}
    ],
    25: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.isMac = isMac),
          (exports.isNotMac = isNotMac),
          (exports.isiOS = isiOS),
          (exports.isAndroid = isAndroid),
          (exports.isWindowsPhone = isWindowsPhone),
          (exports.isTouchDevice = isTouchDevice),
          (exports.isNotTouchDevice = isNotTouchDevice),
          (exports.isLegacyBrowser = isLegacyBrowser),
          (exports.isOperaCoast = isOperaCoast),
          (exports.isSafari = isSafari),
          (exports.isTargetBrowserForServiceworker = isTargetBrowserForServiceworker);
        var _browserInfo = _interopRequireDefault(require("browser-info")),
          _reactDisplaySwitch = require("react-display-switch");
        function _interopRequireDefault(i) {
          return i && i.__esModule ? i : { default: i };
        }
        var info = {};
        try {
          info = (0, _browserInfo.default)();
        } catch (i) {
          console.error(i.stack || i);
        }
        function isMac() {
          return "OS X" === info.os;
        }
        function isNotMac() {
          return !isMac();
        }
        function isiOS() {
          return "iOS" === info.os;
        }
        function isAndroid() {
          return "Android" === info.os;
        }
        function isWindowsPhone() {
          return "Windows Phone" === info.os;
        }
        function isTouchDevice() {
          return isiOS() || isAndroid() || isWindowsPhone();
        }
        function isNotTouchDevice() {
          return !isTouchDevice();
        }
        function isLegacyBrowser() {
          return (
            ("Chrome" === info.name && info.version < 50) ||
            ("Safari" === info.name && info.version < 10) ||
            ("Firefox" === info.name && info.version < 50) ||
            "IE" === info.name
          );
        }
        function isOperaCoast() {
          return "OperaCoast" === info.name;
        }
        function isSafari() {
          return "Safari" === info.name;
        }
        function isTargetBrowserForServiceworker() {
          return (
            ("Chrome" === info.name && info.version >= 67) ||
            ("Safari" === info.name && info.version >= 12) ||
            ("Firefox" === info.name && info.version >= 62)
          );
        }
        _reactDisplaySwitch.When.case("mac", isMac),
          _reactDisplaySwitch.When.case("iOS", isiOS),
          _reactDisplaySwitch.When.case("android", isAndroid),
          _reactDisplaySwitch.When.case("windows_phone", isWindowsPhone),
          _reactDisplaySwitch.When.case("touch_device", isTouchDevice),
          _reactDisplaySwitch.When.case("safari", isSafari);
      },
      { "browser-info": 1, "react-display-switch": 20 }
    ],
    26: [
      function(require, module, exports) {
        "use strict";
        var enable = !0,
          PATH_HEADS = ["/src/client/js/workers/"];
        function fileToTitle(e) {
          if ("string" != typeof e) throw new Error("filename is not string");
          return e
            .replace(new RegExp("^(" + PATH_HEADS.join("|") + ")"), "")
            .replace(/\..+$/, "")
            .replace(/\/index$/, "")
            .replace(/\//g, ":");
        }
        module.exports = function createDebug(e) {
          if (!enable) return function() {};
          var r = fileToTitle(e);
          return function() {
            for (
              var e, n = arguments.length, o = new Array(n), t = 0;
              t < n;
              t++
            )
              o[t] = arguments[t];
            (e = console).log.apply(
              e,
              ["%c".concat(r), "color: gray"].concat(o)
            );
          };
        };
      },
      {}
    ],
    27: [
      function(require, module, exports) {
        (function(__filename) {
          "use strict";
          var _ravenJs = _interopRequireDefault(require("raven-js")),
            _url = _interopRequireDefault(require("url")),
            _browser = require("../../lib/browser");
          function _interopRequireDefault(e) {
            return e && e.__esModule ? e : { default: e };
          }
          var debug = require("./debug")(__filename);
          function toPublicDSN(e) {
            var r = _url.default.parse(e);
            return r.auth && (r.auth = r.auth.split(":")[0]), r.format();
          }
          function setupSentry() {
            return (0, _browser.isLegacyBrowser)()
              ? debug("Legacy Browser")
              : (0, _browser.isOperaCoast)()
              ? debug("OperaCoast has OperaIce bug")
              : (debug(
                  "setup sentry",
                  "https://a1e18d1b37504a1a847ea4d4b7e154f4:90f89d76a6154969a2a5ca8784b8e02f@sentry.io/192116"
                ),
                void _ravenJs.default
                  .config(
                    toPublicDSN(
                      "https://a1e18d1b37504a1a847ea4d4b7e154f4:90f89d76a6154969a2a5ca8784b8e02f@sentry.io/192116"
                    )
                  )
                  .install());
          }
          setupSentry();
        }.call(this, "/src/client/js/workers/lib/setup-sentry.js"));
      },
      { "../../lib/browser": 25, "./debug": 26, "raven-js": 15, url: 23 }
    ],
    28: [
      function(require, module, exports) {
        (function(__filename) {
          "use strict";
          var _events = _interopRequireDefault(require("../lib/events")),
            _url = _interopRequireDefault(require("url")),
            _singlePageRequest = require("./single-page-request"),
            _prefetch = require("./prefetch"),
            _cacheStorage = require("../lib/cache-storage"),
            _assetsCache = require("../lib/assets-cache"),
            _apiCache = require("../lib/api-cache");
          function _interopRequireDefault(e) {
            return e && e.__esModule ? e : { default: e };
          }
          const debug = require("../../lib/debug")(__filename);
          function isGyazoUploadUrl(e) {
            const { host: t, pathname: a } = _url.default.parse(e);
            return (
              "upload.gyazo.com" === t ||
              (/gyazo\.com/.test(t) && a.startsWith("/api/upload/"))
            );
          }
          function cacheIsOutdated(e) {
            const t = e.headers.get("date");
            if (!t) return !1;
            const a = new Date(t);
            return new Date() - a > 2592e6;
          }
          async function respondCacheFirst(e) {
            const t = await (0, _assetsCache.findAssetsCache)(e);
            return t
              ? (debug("use cache", e.url, e.cache), t)
              : (debug("fetch", e.url, e.cache), fetch(e));
          }
          async function respondSinglePage(e) {
            e = (0, _singlePageRequest.createSinglePageRequest)(e);
            const t = await (0, _assetsCache.findAssetsCache)(e);
            if (!t)
              return (0, _cacheStorage.checkForUpdateBackground)(), fetch(e);
            if (!cacheIsOutdated(t))
              return (
                debug("use cache", e.url, e.cache),
                (0, _cacheStorage.checkForUpdateBackground)(),
                t
              );
            let a;
            debug("cache is outdated", "(fetch remote)", e.url, e.cache);
            try {
              if (!(a = await fetch(e)).ok)
                throw new Error(`Responded ${t.status}`);
            } catch (a) {
              return (
                console.error(a), debug("use cache anyway", e.url, e.cache), t
              );
            }
            const r = t.headers.get("x-assets-version");
            if (r === a.headers.get("x-assets-version")) {
              debug(
                "version is not changed",
                "so just replace cache to new one"
              );
              const t = await caches.open(r);
              await t.put(e, a.clone());
            } else
              debug("fetched different version"),
                await (0, _cacheStorage.deleteAllCache)(),
                (0, _cacheStorage.checkForUpdateBackground)();
            return a;
          }
          self.addEventListener("fetch", async function(e) {
            setTimeout(() => _events.default.emit("fetch", e), 1);
            const t = e.request,
              { protocol: a, host: r, pathname: c } = _url.default.parse(t.url);
            ("https:" !== a && r !== location.host) ||
              ((0, _singlePageRequest.isLoginOrLogoutRequest)(t) &&
                (await (0, _cacheStorage.deleteAllCache)()),
              "GET" === t.method &&
                (isGyazoUploadUrl(t.url) ||
                  e.respondWith(
                    (async function() {
                      if ((0, _singlePageRequest.isSinglePageRequest)(t))
                        return respondSinglePage(t);
                      try {
                        return c.startsWith("/api/")
                          ? (await (0, _prefetch.findPrefetchedResponse)(t)) ||
                              (await (0, _apiCache.respondApiNetworkFirst)(t))
                          : respondCacheFirst(t);
                      } catch (e) {
                        return debug(e), e;
                      }
                    })()
                  )));
          });
        }.call(this, "/src/client/js/workers/service-worker/fetch/index.js"));
      },
      {
        "../../lib/debug": 26,
        "../lib/api-cache": 33,
        "../lib/assets-cache": 34,
        "../lib/cache-storage": 35,
        "../lib/events": 37,
        "./prefetch": 29,
        "./single-page-request": 30,
        url: 23
      }
    ],
    29: [
      function(require, module, exports) {
        (function(__filename) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: !0 }),
            (exports.prefetch = prefetch),
            (exports.findPrefetchedResponse = findPrefetchedResponse);
          var _delay = require("../../../../../share/delay"),
            _error = require("../lib/error"),
            _apiCache = require("../lib/api-cache");
          const debug = require("../../lib/debug")(__filename),
            state = { enable: !0 },
            expireTimeouts = {};
          async function fetchAndCache(e) {
            const t = await fetch(e),
              r = await caches.open("prefetch");
            return (
              await r.put(e, t.clone()),
              await (0, _apiCache.saveApiCache)(e, t.clone()),
              (expireTimeouts[e.url] = setTimeout(async function() {
                delete expireTimeouts[e.url], r.delete(e);
              }, 15e3)),
              t
            );
          }
          function temporarilyDisable() {
            (state.enable = !1),
              setTimeout(() => {
                state.enable = !0;
              }, 6e4);
          }
          async function prefetch({ urls: e }) {
            if (!state.enable)
              throw new _error.NetworkError("network is slow.");
            return Promise.all(
              e.map(async e => {
                const t = new Request(e, { credentials: "same-origin" });
                return (
                  !expireTimeouts[t.url] &&
                  ("timeout" ===
                    (await Promise.race([
                      fetchAndCache(t),
                      (0, _delay.delay)(3e3).then(() => "timeout")
                    ])) && temporarilyDisable(),
                  e)
                );
              })
            );
          }
          async function findPrefetchedResponse(e) {
            if ("GET" !== e.method) return null;
            const t = await caches.open("prefetch"),
              r = await t.match(e);
            return r
              ? (debug("hit", decodeURIComponent(e.url)),
                clearTimeout(expireTimeouts[e.url]),
                delete expireTimeouts[e.url],
                t.delete(e),
                r)
              : null;
          }
        }.call(
          this,
          "/src/client/js/workers/service-worker/fetch/prefetch.js"
        ));
      },
      {
        "../../../../../share/delay": 40,
        "../../lib/debug": 26,
        "../lib/api-cache": 33,
        "../lib/error": 36
      }
    ],
    30: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.isLoginOrLogoutRequest = isLoginOrLogoutRequest),
          (exports.isSinglePageRequest = isSinglePageRequest),
          (exports.createSinglePageRequest = createSinglePageRequest);
        var _projectName = require("../../../../../share/validator/project-name");
        const LOGIN_PATHS = _projectName.logins.map(e => `/${e}`),
          NOCACHE_PATHS = [
            "/serviceworker.js",
            "/api/",
            ...LOGIN_PATHS,
            ..._projectName.landings.map(e => `/${e}`)
          ],
          ASSET_PATHS = [
            "/assets/",
            "/app.html",
            "/favicon.ico",
            "/manifest.json"
          ];
        function isLoginOrLogoutRequest(e) {
          const t = new URL(e.url);
          return isMyHost(t) && LOGIN_PATHS.includes(t.pathname);
        }
        function isMyHost(e) {
          return location.hostname === e.hostname;
        }
        function isApiOrLandingPage(e) {
          return (
            isMyHost(e) &&
            NOCACHE_PATHS.find(function(t) {
              return 0 === e.pathname.indexOf(t);
            })
          );
        }
        function isAssetPath(e) {
          return (
            isMyHost(e) &&
            ASSET_PATHS.find(function(t) {
              return 0 === e.pathname.indexOf(t);
            })
          );
        }
        function isAcceptHtml(e) {
          const t = e.headers.get("Accept");
          return t && (t.includes("text/html") || "*/*" === t);
        }
        function isGetMethod(e) {
          return "GET" === e.method;
        }
        function isSinglePageRequest(e) {
          const t = new URL(e.url);
          return (
            isMyHost(t) &&
            !isAssetPath(t) &&
            !isApiOrLandingPage(t) &&
            isGetMethod(e) &&
            isAcceptHtml(e)
          );
        }
        function createSinglePageRequest(e) {
          const t = new URL(e.url).origin + "/app.html";
          return new Request(t, {
            method: e.method,
            headers: e.headers,
            credentials: e.credentials,
            cache: e.cache,
            mode: "same-origin",
            redirect: "manual"
          });
        }
      },
      { "../../../../../share/validator/project-name": 43 }
    ],
    31: [
      function(require, module, exports) {
        (function(__filename) {
          "use strict";
          require("../lib/setup-sentry"),
            require("./fetch/"),
            require("./install/"),
            require("./message");
          const debug = require("../lib/debug")(__filename);
          debug("start");
        }.call(this, "/src/client/js/workers/service-worker/index.js"));
      },
      {
        "../lib/debug": 26,
        "../lib/setup-sentry": 27,
        "./fetch/": 28,
        "./install/": 32,
        "./message": 38
      }
    ],
    32: [
      function(require, module, exports) {
        (function(__filename) {
          "use strict";
          var _events = _interopRequireDefault(require("../lib/events")),
            _cacheStorage = require("../lib/cache-storage");
          function _interopRequireDefault(e) {
            return e && e.__esModule ? e : { default: e };
          }
          const debug = require("../../lib/debug")(__filename);
          self.addEventListener("install", function(e) {
            debug("install"),
              setTimeout(() => _events.default.emit("install", e), 1),
              e.waitUntil(self.skipWaiting());
          }),
            self.addEventListener("activate", function(e) {
              debug("activate"),
                setTimeout(() => _events.default.emit("activate", e), 1),
                e.waitUntil(self.clients.claim()),
                (0, _cacheStorage.checkForUpdateBackground)();
            });
        }.call(this, "/src/client/js/workers/service-worker/install/index.js"));
      },
      { "../../lib/debug": 26, "../lib/cache-storage": 35, "../lib/events": 37 }
    ],
    33: [
      function(require, module, exports) {
        (function(__filename) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: !0 }),
            (exports.deleteExpiredApiCache = deleteExpiredApiCache),
            (exports.saveApiCache = saveApiCache),
            (exports.respondApiNetworkFirst = respondApiNetworkFirst);
          var _cacheStorage = require("./cache-storage");
          const debug = require("../../lib/debug")(__filename),
            apiCacheNamePattern = /^api-(\d{4}-\d{2}-\d{2})$/,
            generateCacheName = (e = new Date()) =>
              [
                "api",
                e.getFullYear(),
                (e.getMonth() + 1).toString().padStart(2, "0"),
                e
                  .getDate()
                  .toString()
                  .padStart(2, "0")
              ].join("-");
          function isExpiredApiCache(e) {
            const [, a] = e.match(apiCacheNamePattern) || [];
            return !!a && new Date() - new Date(a) > 6048e5;
          }
          async function findLatestApiCache(e) {
            const a = (await caches.keys()).filter(e =>
                apiCacheNamePattern.test(e)
              ),
              { pathname: t } = new URL(e.url),
              r = ![/^\/api\/projects$/, /^\/api\/pages\/([^\/]+?)$/].some(e =>
                e.test(t)
              );
            for (const t of a.sort().reverse()) {
              const a = await caches.open(t),
                c = await a.match(e, { ignoreSearch: r });
              if (c) return c;
            }
            return null;
          }
          async function deleteExpiredApiCache() {
            const e = await caches.keys();
            return Promise.all(
              e
                .filter(e => isExpiredApiCache(e))
                .map(
                  e => (
                    debug(`delete expired api cache "${e}"`), caches.delete(e)
                  )
                )
            );
          }
          async function saveApiCache(e, a) {
            try {
              const t = await caches.open(generateCacheName());
              await t.put(e.url, await (0, _cacheStorage.setHeader)(a));
            } catch (e) {
              console.error(e.stack || e);
            }
          }
          async function respondApiNetworkFirst(e) {
            let a;
            try {
              a = await fetch(e);
            } catch (a) {
              return (
                console.error(a),
                (async () => {
                  const a = await findLatestApiCache(e);
                  return a ? (debug("use cache", e.url, e.cache), a) : null;
                })()
              );
            }
            return a.ok && saveApiCache(e, a.clone()), a;
          }
        }.call(this, "/src/client/js/workers/service-worker/lib/api-cache.js"));
      },
      { "../../lib/debug": 26, "./cache-storage": 35 }
    ],
    34: [
      function(require, module, exports) {
        (function(__filename) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: !0 }),
            (exports.findAssetsCache = findAssetsCache),
            (exports.checkForUpdate = checkForUpdate);
          var _error = require("./error"),
            _cacheStorage = require("./cache-storage");
          const debug = require("../../lib/debug")(__filename);
          async function fetchAssetsJson() {
            debug("fetching assets.json...");
            const e = await fetch("/assets/assets.json");
            if (!e.ok)
              throw new _error.ServerError(`Server responded ${e.status}`);
            return e.clone().json();
          }
          async function updateAssetsCache({ version: e, urls: s }) {
            const t = await caches.open(e);
            return (
              debug("adding all AssetsCache..."),
              await t.addAll(s),
              debug(`add all AssetsCache done "${e}"`),
              await deleteOldAssetsCache(e),
              debug("updating AssetsCache done"),
              { hasUpdate: !0 }
            );
          }
          async function deleteOldAssetsCache(e) {
            const s = await caches.keys();
            return Promise.all(
              s
                .filter(s => s.startsWith("assets-") && s !== e)
                .map(
                  e => (
                    debug(`delete old AssetsCache "${e}"`), caches.delete(e)
                  )
                )
            );
          }
          async function findAssetsCache(e) {
            const s = (await caches.keys()).find(e => e.startsWith("assets-"));
            return s ? (await caches.open(s)).match(e) : null;
          }
          async function checkForUpdate() {
            if ((debug("checking for update..."), !navigator.onLine))
              throw new _error.NetworkError("network is offline");
            const e = await fetchAssetsJson();
            if (await (0, _cacheStorage.cacheExists)(e.version))
              return (
                debug("already up-to-date"),
                await deleteOldAssetsCache(e.version),
                { hasUpdate: !1 }
              );
            try {
              return await updateAssetsCache(e);
            } catch (s) {
              if (
                (0, _error.matchTypes)(s, DOMException) &&
                "QuotaExceededError" === s.name
              )
                return (
                  await (0, _cacheStorage.deleteAllCache)(),
                  updateAssetsCache(e)
                );
              throw (console.error(s.stack || s), s);
            }
          }
        }.call(
          this,
          "/src/client/js/workers/service-worker/lib/assets-cache.js"
        ));
      },
      { "../../lib/debug": 26, "./cache-storage": 35, "./error": 36 }
    ],
    35: [
      function(require, module, exports) {
        (function(__filename) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: !0 }),
            (exports.deleteAllCache = deleteAllCache),
            (exports.cacheExists = cacheExists),
            (exports.setHeader = setHeader),
            (exports.checkForUpdateBackground = checkForUpdateBackground);
          var _events = _interopRequireDefault(require("./events")),
            _error = require("./error"),
            _assetsCache = require("./assets-cache"),
            _apiCache = require("./api-cache");
          function _interopRequireDefault(e) {
            return e && e.__esModule ? e : { default: e };
          }
          const debug = require("../../lib/debug")(__filename);
          async function deleteAllCache() {
            debug("delete all cache");
            const e = await caches.keys();
            return Promise.all(e.map(e => caches.delete(e)));
          }
          async function cacheExists(e) {
            if (!(await caches.has(e))) return !1;
            const t = await caches.open(e);
            return (await t.keys()).length > 0;
          }
          async function setHeader(e) {
            if ("opaque" === e.type) return e;
            const t = new Headers(e.headers);
            return (
              t.set(
                "X-Serviceworker-Cached",
                new Date(t.get("date")).getTime()
              ),
              new Response(await e.blob(), {
                status: e.status,
                statusText: e.statusText,
                headers: t
              })
            );
          }
          let lastFetchedAt = Date.now();
          _events.default.on("fetch", e => {
            lastFetchedAt = Date.now();
          });
          let checkForUpdateTimer = null;
          function checkForUpdateBackground() {
            if (checkForUpdateTimer) return !1;
            debug("checkForUpdateBackground: Wait for connection to be idle."),
              (checkForUpdateTimer = setInterval(async () => {
                if (!(Date.now() - lastFetchedAt < 3e3)) {
                  clearInterval(checkForUpdateTimer),
                    (checkForUpdateTimer = null);
                  try {
                    await (0, _assetsCache.checkForUpdate)(),
                      await (0, _apiCache.deleteExpiredApiCache)();
                  } catch (e) {
                    if (
                      (0, _error.matchTypes)(
                        e,
                        _error.NetworkError,
                        _error.ServerError,
                        TypeError
                      )
                    )
                      return console.error(e);
                    throw e;
                  }
                }
              }, 1e3));
          }
        }.call(
          this,
          "/src/client/js/workers/service-worker/lib/cache-storage.js"
        ));
      },
      {
        "../../lib/debug": 26,
        "./api-cache": 33,
        "./assets-cache": 34,
        "./error": 36,
        "./events": 37
      }
    ],
    36: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.ServerError = exports.NetworkError = exports.matchTypes = void 0);
        const matchTypes = (r, ...e) => e.find(e => r instanceof e);
        exports.matchTypes = matchTypes;
        class NetworkError extends Error {
          constructor(r) {
            super(r), (this.name = "NetworkError");
          }
        }
        exports.NetworkError = NetworkError;
        class ServerError extends Error {
          constructor(r) {
            super(r), (this.name = "FetchError");
          }
        }
        exports.ServerError = ServerError;
      },
      {}
    ],
    37: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = void 0);
        var _events = require("events"),
          _default = new _events.EventEmitter();
        exports.default = _default;
      },
      { events: 5 }
    ],
    38: [
      function(require, module, exports) {
        (function(__filename) {
          "use strict";
          var _events = _interopRequireDefault(require("../lib/events")),
            _cacheStorage = require("../lib/cache-storage"),
            _assetsCache = require("../lib/assets-cache"),
            _prefetch = require("../fetch/prefetch");
          function _interopRequireDefault(e) {
            return e && e.__esModule ? e : { default: e };
          }
          const debug = require("../../lib/debug")(__filename);
          function exec({ title: e, body: t }) {
            switch ((debug("exec", { title: e, body: t }), e)) {
              case "checkForUpdate":
                return (0, _assetsCache.checkForUpdate)();
              case "deleteAllCache":
                return (0, _cacheStorage.deleteAllCache)();
              case "prefetch":
                return (0, _prefetch.prefetch)(t);
            }
          }
          self.addEventListener("message", function(e) {
            setTimeout(() => _events.default.emit("message", e), 1),
              e.waitUntil(
                (async function() {
                  try {
                    const t = await exec(e.data);
                    e.ports[0].postMessage({ title: e.data.title, result: t });
                  } catch (t) {
                    e.ports[0].postMessage({
                      title: e.data.title,
                      error: t.message
                    });
                  }
                })()
              );
          });
        }.call(this, "/src/client/js/workers/service-worker/message/index.js"));
      },
      {
        "../../lib/debug": 26,
        "../fetch/prefetch": 29,
        "../lib/assets-cache": 34,
        "../lib/cache-storage": 35,
        "../lib/events": 37
      }
    ],
    39: [
      function(require, module, exports) {
        "use strict";
        var _debug = _interopRequireDefault(require("debug")),
          _path = _interopRequireDefault(require("path"));
        function _interopRequireDefault(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var appName = "scrapbox",
          PATH_HEADS = [
            "/src/client/js",
            "/src/share",
            _path.default.resolve("src/server"),
            _path.default.resolve("build/server"),
            _path.default.resolve("src/share")
          ];
        function fileToName(e) {
          if ("string" != typeof e) throw new Error("filename is not string");
          return e
            .replace(new RegExp("^(" + PATH_HEADS.join("|") + ")"), appName)
            .replace(/\..+$/, "")
            .replace(/\/index$/, "")
            .replace(/\//g, ":");
        }
        module.exports = function createDebug(e) {
          return (0, _debug.default)(fileToName(e));
        };
      },
      { debug: 3, path: 6 }
    ],
    40: [
      function(require, module, exports) {
        (function(__filename) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: !0 }),
            (exports.simulateRequestDelay = exports.delay = void 0);
          var debug = require("./debug")(__filename),
            delay = function delay(e) {
              return new Promise(function(t) {
                return setTimeout(t, e);
              });
            };
          exports.delay = delay;
          var simulateRequestDelay = function simulateRequestDelay(e, t) {
            return Promise.resolve();
          };
          exports.simulateRequestDelay = simulateRequestDelay;
        }.call(this, "/src/share/delay.js"));
      },
      { "./debug": 39 }
    ],
    41: [
      function(require, module, exports) {
        (function(process) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: !0 }),
            (exports.ENABLE_GYAZO_UPLOAD = exports.ENABLE_FILE_UPLOAD = exports.ENABLE_SERVICE_WORKER = exports.ENABLE_RATE_LIMIT_BY_USER = exports.ENABLE_PROJECT_BACKUP = exports.ENABLE_BILLING = exports.ENABLE_GOOGLE_ANALYTICS = exports.DEFAULT_PRO_USER = exports.ALLOW_UNAUTHORIZED_GHE_CERT = exports.LANDING = void 0);
          var LANDING = !0;
          exports.LANDING = LANDING;
          var ALLOW_UNAUTHORIZED_GHE_CERT =
            "true" === process.env.ALLOW_UNAUTHORIZED_GHE_CERT;
          exports.ALLOW_UNAUTHORIZED_GHE_CERT = ALLOW_UNAUTHORIZED_GHE_CERT;
          var DEFAULT_PRO_USER = "true" === process.env.DEFAULT_PRO_USER;
          exports.DEFAULT_PRO_USER = DEFAULT_PRO_USER;
          var ENABLE_GOOGLE_ANALYTICS = !0;
          exports.ENABLE_GOOGLE_ANALYTICS = ENABLE_GOOGLE_ANALYTICS;
          var ENABLE_BILLING = !0;
          exports.ENABLE_BILLING = ENABLE_BILLING;
          var ENABLE_PROJECT_BACKUP = !0;
          exports.ENABLE_PROJECT_BACKUP = ENABLE_PROJECT_BACKUP;
          var ENABLE_RATE_LIMIT_BY_USER = !0;
          exports.ENABLE_RATE_LIMIT_BY_USER = ENABLE_RATE_LIMIT_BY_USER;
          var ENABLE_SERVICE_WORKER = !0;
          exports.ENABLE_SERVICE_WORKER = ENABLE_SERVICE_WORKER;
          var ENABLE_FILE_UPLOAD = "true" === process.env.ENABLE_FILE_UPLOAD;
          exports.ENABLE_FILE_UPLOAD = ENABLE_FILE_UPLOAD;
          var ENABLE_GYAZO_UPLOAD = !0;
          exports.ENABLE_GYAZO_UPLOAD = ENABLE_GYAZO_UPLOAD;
        }.call(this, require("_process")));
      },
      { _process: 7 }
    ],
    42: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.combineValidators = void 0);
        var _result = _interopRequireDefault(require("./result"));
        function _interopRequireDefault(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var combineValidators = function combineValidators() {
          for (var e = arguments.length, r = new Array(e), t = 0; t < e; t++)
            r[t] = arguments[t];
          for (var a = 0; a < r.length; a++) {
            var o = r[a],
              n = o.validator,
              i = o.message;
            if ("function" != typeof n)
              throw new Error("validator must be a function.");
            if ("string" != typeof i)
              throw new Error("message must be a string.");
          }
          var s = function validate(e) {
            for (var t = new _result.default(), a = 0; a < r.length; a++) {
              var o = r[a],
                n = o.validator,
                i = o.message,
                s = o.next;
              if (!n(e) && (t.errors.push(i), !s)) break;
            }
            return t;
          };
          return (
            Object.defineProperty(s, "mongooseFormat", {
              get: function get() {
                return r.map(function(e) {
                  return { validator: e.validator, message: e.message };
                });
              }
            }),
            (s.validators = r),
            s
          );
        };
        exports.combineValidators = combineValidators;
      },
      { "./result": 44 }
    ],
    43: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.validateProjectName = exports.ReservedProjectNames = exports.logins = exports.landings = exports.maxProjectNameLength = exports.minProjectNameLength = void 0);
        var _flags = require("../flags"),
          _ = require("./"),
          minProjectNameLength = { value: 2, message: "Name is too short" };
        exports.minProjectNameLength = minProjectNameLength;
        var maxProjectNameLength = { value: 24, message: "Name is too long" };
        exports.maxProjectNameLength = maxProjectNameLength;
        var landings = [
          "landing",
          "product",
          "enterprise",
          "pricing",
          "try-enterprise",
          "contact",
          "terms",
          "privacy",
          "jp-commercial-act",
          "business"
        ];
        exports.landings = landings;
        var logins = ["auth", "login", "logout"];
        exports.logins = logins;
        var ReservedProjectNames = ["_", "assets"]
          .concat(logins, [
            "config",
            "api",
            "index",
            "project",
            "projects",
            "user",
            "users",
            "setting",
            "settings",
            "slide",
            "feed",
            "search",
            "opensearch",
            "stream",
            "new",
            "billing",
            "billings",
            "io",
            "socket.io",
            "app.html"
          ])
          .concat(_flags.LANDING ? landings : [])
          .map(function(e) {
            return e.toLowerCase();
          });
        exports.ReservedProjectNames = ReservedProjectNames;
        var validateProjectName = (0, _.combineValidators)(
          {
            validator: function validator(e) {
              return "string" == typeof e;
            },
            message: "Name must be a String"
          },
          {
            validator: function validator(e) {
              return e.length >= minProjectNameLength.value;
            },
            message: minProjectNameLength.message,
            next: !0
          },
          {
            validator: function validator(e) {
              return e.length <= maxProjectNameLength.value;
            },
            message: maxProjectNameLength.message,
            next: !0
          },
          {
            validator: function validator(e) {
              return /^[a-z0-9][a-z0-9-]*[a-z0-9]$/i.test(e);
            },
            message:
              "Name can contain only alphabets, numbers and hyphens. It must start and end with alphabet or number",
            next: !0
          },
          {
            validator: function validator(e) {
              return !ReservedProjectNames.includes(e.toLowerCase());
            },
            message: "the name is reserved for system",
            next: !0
          }
        );
        exports.validateProjectName = validateProjectName;
      },
      { "../flags": 41, "./": 42 }
    ],
    44: [
      function(require, module, exports) {
        "use strict";
        function _classCallCheck(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        function _defineProperties(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        function _createClass(e, t, r) {
          return (
            t && _defineProperties(e.prototype, t),
            r && _defineProperties(e, r),
            e
          );
        }
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = void 0);
        var ValidationResult = (function() {
          function ValidationResult() {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : [];
            if (
              (_classCallCheck(this, ValidationResult), !(e instanceof Array))
            )
              throw new Error("ArgumentError: errors must be an Array");
            this.errors = e;
          }
          return (
            _createClass(ValidationResult, [
              {
                key: "toString",
                value: function toString() {
                  return this.errors
                    .map(function(e) {
                      return e.message || e;
                    })
                    .join(". ");
                }
              },
              {
                key: "isValid",
                get: function get() {
                  return this.errors.length < 1;
                }
              },
              {
                key: "isInvalid",
                get: function get() {
                  return !this.isValid;
                }
              }
            ]),
            ValidationResult
          );
        })();
        exports.default = ValidationResult;
      },
      {}
    ]
  },
  {},
  [31]
);
