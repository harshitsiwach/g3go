
var Godot = (() => {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  
  return (
function(Godot = {})  {

function h() {
  ba.buffer != da.buffer && ea();
  return da;
}
function fa() {
  ba.buffer != da.buffer && ea();
  return ha;
}
function ia() {
  ba.buffer != da.buffer && ea();
  return ja;
}
function la() {
  ba.buffer != da.buffer && ea();
  return ma;
}
function m() {
  ba.buffer != da.buffer && ea();
  return na;
}
function n() {
  ba.buffer != da.buffer && ea();
  return oa;
}
function p() {
  ba.buffer != da.buffer && ea();
  return pa;
}
function qa() {
  ba.buffer != da.buffer && ea();
  return ra;
}
var q;
q ||= typeof Godot !== 'undefined' ? Godot : {};
var sa, ta;
q.ready = new Promise((a, b) => {
  sa = a;
  ta = b;
});
"_main __emscripten_thread_init __emscripten_thread_exit __emscripten_thread_crashed __emscripten_thread_mailbox_await __emscripten_tls_init _pthread_self checkMailbox establishStackSpace invokeEntryPoint PThread __Z14godot_web_mainiPPc _fflush __emwebxr_on_input_event __emwebxr_on_simple_event __emscripten_check_mailbox onRuntimeInitialized".split(" ").forEach(a => {
  Object.getOwnPropertyDescriptor(q.ready, a) || Object.defineProperty(q.ready, a, {get:() => ua("You are getting " + a + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js"), set:() => ua("You are setting " + a + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js")});
});
var va = Object.assign({}, q), wa = [], xa = "./this.program", ya = (a, b) => {
  throw b;
}, za = "object" == typeof window, Aa = "function" == typeof importScripts, Ba = "object" == typeof process && "object" == typeof process.Zc && "string" == typeof process.Zc.node, Ca = !za && !Ba && !Aa;
if (q.ENVIRONMENT) {
  throw Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
}
var t = q.ENVIRONMENT_IS_PTHREAD || !1, Da = "";
function Ea(a) {
  return q.locateFile ? q.locateFile(a, Da) : Da + a;
}
var Fa;
if (Ca) {
  if ("object" == typeof process && "function" === typeof require || "object" == typeof window || "function" == typeof importScripts) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
  Fa = a => {
    if ("function" == typeof readbuffer) {
      return new Uint8Array(readbuffer(a));
    }
    a = read(a, "binary");
    w("object" == typeof a);
    return a;
  };
  "undefined" == typeof clearTimeout && (globalThis.clearTimeout = () => {
  });
  "undefined" != typeof scriptArgs ? wa = scriptArgs : "undefined" != typeof arguments && (wa = arguments);
  "function" == typeof quit && (ya = (a, b) => {
    setTimeout(() => {
      if (!(b instanceof Ga)) {
        let c = b;
        b && "object" == typeof b && b.stack && (c = [b, b.stack]);
        x(`exiting due to exception: ${c}`);
      }
      quit(a);
    });
    throw b;
  });
  "undefined" != typeof print && ("undefined" == typeof console && (console = {}), console.log = print, console.warn = console.error = "undefined" != typeof printErr ? printErr : print);
} else if (za || Aa) {
  Aa ? Da = self.location.href : "undefined" != typeof document && document.currentScript && (Da = document.currentScript.src);
  _scriptDir && (Da = _scriptDir);
  0 !== Da.indexOf("blob:") ? Da = Da.substr(0, Da.replace(/[?#].*/, "").lastIndexOf("/") + 1) : Da = "";
  if ("object" != typeof window && "function" != typeof importScripts) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
  Aa && (Fa = a => {
    var b = new XMLHttpRequest();
    b.open("GET", a, !1);
    b.responseType = "arraybuffer";
    b.send(null);
    return new Uint8Array(b.response);
  });
} else {
  throw Error("environment detection error");
}
var Ha = q.print || console.log.bind(console), x = q.printErr || console.error.bind(console);
Object.assign(q, va);
va = null;
Object.getOwnPropertyDescriptor(q, "fetchSettings") && ua("`Module.fetchSettings` was supplied but `fetchSettings` not included in INCOMING_MODULE_JS_API");
q.arguments && (wa = q.arguments);
Ia("arguments", "arguments_");
q.thisProgram && (xa = q.thisProgram);
Ia("thisProgram", "thisProgram");
q.quit && (ya = q.quit);
Ia("quit", "quit_");
w("undefined" == typeof q.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
w("undefined" == typeof q.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
w("undefined" == typeof q.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
w("undefined" == typeof q.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
w("undefined" == typeof q.read, "Module.read option was removed (modify read_ in JS)");
w("undefined" == typeof q.readAsync, "Module.readAsync option was removed (modify readAsync in JS)");
w("undefined" == typeof q.readBinary, "Module.readBinary option was removed (modify readBinary in JS)");
w("undefined" == typeof q.setWindowTitle, "Module.setWindowTitle option was removed (modify setWindowTitle in JS)");
w("undefined" == typeof q.TOTAL_MEMORY, "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
Ia("read", "read_");
Ia("readAsync", "readAsync");
Ia("readBinary", "readBinary");
Ia("setWindowTitle", "setWindowTitle");
w(za || Aa || Ba, "Pthreads do not work in this environment yet (need Web Workers, or an alternative to them)");
w(!Ba, "node environment detected but not enabled at build time.  Add 'node' to `-sENVIRONMENT` to enable.");
w(!Ca, "shell environment detected but not enabled at build time.  Add 'shell' to `-sENVIRONMENT` to enable.");
var La;
q.wasmBinary && (La = q.wasmBinary);
Ia("wasmBinary", "wasmBinary");
var noExitRuntime = q.noExitRuntime || !1;
Ia("noExitRuntime", "noExitRuntime");
"object" != typeof WebAssembly && ua("no native wasm support detected");
var ba, Ma, Na = !1, Oa;
function w(a, b) {
  a || ua("Assertion failed" + (b ? ": " + b : ""));
}
var da, ha, ja, ma, na, oa, pa, ra;
function ea() {
  var a = ba.buffer;
  q.HEAP8 = da = new Int8Array(a);
  q.HEAP16 = ja = new Int16Array(a);
  q.HEAP32 = na = new Int32Array(a);
  q.HEAPU8 = ha = new Uint8Array(a);
  q.HEAPU16 = ma = new Uint16Array(a);
  q.HEAPU32 = oa = new Uint32Array(a);
  q.HEAPF32 = pa = new Float32Array(a);
  q.HEAPF64 = ra = new Float64Array(a);
}
w(!q.STACK_SIZE, "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");
w("undefined" != typeof Int32Array && "undefined" !== typeof Float64Array && void 0 != Int32Array.prototype.subarray && void 0 != Int32Array.prototype.set, "JS engine does not provide full typed array support");
var Pa = q.INITIAL_MEMORY || 67108864;
Ia("INITIAL_MEMORY", "INITIAL_MEMORY");
w(5242880 <= Pa, "INITIAL_MEMORY should be larger than STACK_SIZE, was " + Pa + "! (STACK_SIZE=5242880)");
if (t) {
  ba = q.wasmMemory;
} else {
  if (q.wasmMemory) {
    ba = q.wasmMemory;
  } else {
    if (ba = new WebAssembly.Memory({initial:Pa / 65536, maximum:32768, shared:!0}), !(ba.buffer instanceof SharedArrayBuffer)) {
      throw x("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"), Ba && x("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and/or recent version)"), Error("bad memory");
    }
  }
}
ea();
Pa = ba.buffer.byteLength;
w(0 === Pa % 65536);
var Qa;
function Ra() {
  var a = Sa();
  w(0 == (a & 3));
  0 == a && (a += 4);
  n()[a >> 2] = 34821223;
  n()[a + 4 >> 2] = 2310721022;
  n()[0] = 1668509029;
}
function Ta() {
  if (!Na) {
    var a = Sa();
    0 == a && (a += 4);
    var b = n()[a >> 2], c = n()[a + 4 >> 2];
    34821223 == b && 2310721022 == c || ua("Stack overflow! Stack cookie has been overwritten at " + Ua(a) + ", expected hex dwords 0x89BACDFE and 0x2135467, but received " + Ua(c) + " " + Ua(b));
    1668509029 !== n()[0] && ua("Runtime error: The application has corrupted its heap memory area (address zero)!");
  }
}
var Va = new Int16Array(1), Wa = new Int8Array(Va.buffer);
Va[0] = 25459;
if (115 !== Wa[0] || 99 !== Wa[1]) {
  throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
}
var Xa = [], Ya = [], Za = [], $a = [], ab = [], bb = !1, cb = !1, db = 0;
function eb() {
  return noExitRuntime || 0 < db;
}
function fb() {
  w(!bb);
  bb = !0;
  if (!t) {
    Ta();
    if (!q.noFSInit && !gb) {
      w(!gb, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
      gb = !0;
      hb();
      q.stdin = q.stdin;
      q.stdout = q.stdout;
      q.stderr = q.stderr;
      q.stdin ? ib("stdin", q.stdin) : jb("/dev/tty", "/dev/stdin");
      q.stdout ? ib("stdout", null, q.stdout) : jb("/dev/tty", "/dev/stdout");
      q.stderr ? ib("stderr", null, q.stderr) : jb("/dev/tty1", "/dev/stderr");
      var a = kb("/dev/stdin", 0), b = kb("/dev/stdout", 1), c = kb("/dev/stderr", 1);
      w(0 === a.m, `invalid handle for stdin (${a.m})`);
      w(1 === b.m, `invalid handle for stdout (${b.m})`);
      w(2 === c.m, `invalid handle for stderr (${c.m})`);
    }
    lb = !1;
    mb.root = nb(mb, null);
    ob(Ya);
  }
}
function pb() {
  var a = q.preRun.shift();
  Xa.unshift(a);
}
w(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
w(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
w(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
w(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
var qb = 0, rb = null, sb = null, tb = {};
function ub() {
  qb++;
  q.monitorRunDependencies && q.monitorRunDependencies(qb);
  w(!tb["wasm-instantiate"]);
  tb["wasm-instantiate"] = 1;
  null === rb && "undefined" != typeof setInterval && (rb = setInterval(() => {
    if (Na) {
      clearInterval(rb), rb = null;
    } else {
      var a = !1, b;
      for (b in tb) {
        a || (a = !0, x("still waiting on run dependencies:")), x("dependency: " + b);
      }
      a && x("(end of list)");
    }
  }, 1e4));
}
function ua(a) {
  if (q.onAbort) {
    q.onAbort(a);
  }
  a = "Aborted(" + a + ")";
  x(a);
  Na = !0;
  Oa = 1;
  a = new WebAssembly.RuntimeError(a);
  ta(a);
  throw a;
}
function vb(a) {
  return a.startsWith("data:application/octet-stream;base64,");
}
function z(a) {
  return function() {
    var b = q.asm;
    w(bb, "native function `" + a + "` called before runtime initialization");
    w(!cb, "native function `" + a + "` called after runtime exit (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
    b[a] || w(b[a], "exported native function `" + a + "` not found");
    return b[a].apply(null, arguments);
  };
}
var wb;
wb = "godot.web.editor.wasm32.wasm";
vb(wb) || (wb = Ea(wb));
function xb(a) {
  try {
    if (a == wb && La) {
      return new Uint8Array(La);
    }
    if (Fa) {
      return Fa(a);
    }
    throw "both async and sync fetching of the wasm failed";
  } catch (b) {
    ua(b);
  }
}
function yb(a) {
  return La || !za && !Aa || "function" != typeof fetch ? Promise.resolve().then(() => xb(a)) : fetch(a, {credentials:"same-origin"}).then(b => {
    if (!b.ok) {
      throw "failed to load wasm binary file at '" + a + "'";
    }
    return b.arrayBuffer();
  }).catch(() => xb(a));
}
function zb(a, b, c) {
  return yb(a).then(d => WebAssembly.instantiate(d, b)).then(d => d).then(c, d => {
    x("failed to asynchronously prepare wasm: " + d);
    wb.startsWith("file://") && x("warning: Loading from a file URI (" + wb + ") is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing");
    ua(d);
  });
}
function Ab(a, b) {
  var c = wb;
  return La || "function" != typeof WebAssembly.instantiateStreaming || vb(c) || "function" != typeof fetch ? zb(c, a, b) : fetch(c, {credentials:"same-origin"}).then(d => WebAssembly.instantiateStreaming(d, a).then(b, function(e) {
    x("wasm streaming compile failed: " + e);
    x("falling back to ArrayBuffer instantiation");
    return zb(c, a, b);
  }));
}
var A, D;
function Ia(a, b) {
  Object.getOwnPropertyDescriptor(q, a) || Object.defineProperty(q, a, {configurable:!0, get:function() {
    ua("Module." + a + " has been replaced with plain " + b + " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
  }});
}
function Bb(a) {
  return "FS_createPath" === a || "FS_createDataFile" === a || "FS_createPreloadedFile" === a || "FS_unlink" === a || "addRunDependency" === a || "FS_createLazyFile" === a || "FS_createDevice" === a || "removeRunDependency" === a;
}
(function(a, b) {
  "undefined" !== typeof globalThis && Object.defineProperty(globalThis, a, {configurable:!0, get:function() {
    Cb("`" + a + "` is not longer defined by emscripten. " + b);
  }});
})("buffer", "Please use HEAP8.buffer or wasmMemory.buffer");
function Db(a) {
  Object.getOwnPropertyDescriptor(q, a) || Object.defineProperty(q, a, {configurable:!0, get:function() {
    var b = "'" + a + "' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)";
    Bb(a) && (b += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    ua(b);
  }});
}
function Ga(a) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + a + ")";
  this.status = a;
}
function Eb(a) {
  a.terminate();
  a.onmessage = b => {
    x('received "' + b.data.cmd + '" command from terminated worker: ' + a.Ob);
  };
}
function Fb(a) {
  w(!t, "Internal Error! cleanupThread() can only ever be called from main application thread!");
  w(a, "Internal Error! Null pthread_ptr in cleanupThread!");
  a = F.R[a];
  w(a);
  F.Mc(a);
}
function Gb(a, b) {
  fa().fill(0, a, a + b);
  return a;
}
function Hb(a) {
  w(!t, "Internal Error! spawnThread() can only ever be called from main application thread!");
  w(a.C, "Internal error, no pthread ptr!");
  var b = F.jc();
  if (!b) {
    return 6;
  }
  w(!b.C, "Internal error!");
  F.ba.push(b);
  F.R[a.C] = b;
  b.C = a.C;
  b.postMessage({cmd:"run", start_routine:a.Pc, arg:a.kb, pthread_ptr:a.C}, a.Xc);
  return 0;
}
var Ib = (a, b) => {
  for (var c = 0, d = a.length - 1; 0 <= d; d--) {
    var e = a[d];
    "." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
  }
  if (b) {
    for (; c; c--) {
      a.unshift("..");
    }
  }
  return a;
}, Jb = a => {
  var b = "/" === a.charAt(0), c = "/" === a.substr(-1);
  (a = Ib(a.split("/").filter(d => !!d), !b).join("/")) || b || (a = ".");
  a && c && (a += "/");
  return (b ? "/" : "") + a;
}, Kb = a => {
  var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
  a = b[0];
  b = b[1];
  if (!a && !b) {
    return ".";
  }
  b &&= b.substr(0, b.length - 1);
  return a + b;
}, Lb = a => {
  if ("/" === a) {
    return "/";
  }
  a = Jb(a);
  a = a.replace(/\/$/, "");
  var b = a.lastIndexOf("/");
  return -1 === b ? a : a.substr(b + 1);
};
function Mb() {
  if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
    return a => (a.set(crypto.getRandomValues(new Uint8Array(a.byteLength))), a);
  }
  ua("no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };");
}
function Nb(a) {
  return (Nb = Mb())(a);
}
function Ob() {
  for (var a = "", b = !1, c = arguments.length - 1; -1 <= c && !b; c--) {
    b = 0 <= c ? arguments[c] : Pb;
    if ("string" != typeof b) {
      throw new TypeError("Arguments to path.resolve must be strings");
    }
    if (!b) {
      return "";
    }
    a = b + "/" + a;
    b = "/" === b.charAt(0);
  }
  a = Ib(a.split("/").filter(d => !!d), !b).join("/");
  return (b ? "/" : "") + a || ".";
}
var Qb = (a, b) => {
  function c(g) {
    for (var k = 0; k < g.length && "" === g[k]; k++) {
    }
    for (var l = g.length - 1; 0 <= l && "" === g[l]; l--) {
    }
    return k > l ? [] : g.slice(k, l - k + 1);
  }
  a = Ob(a).substr(1);
  b = Ob(b).substr(1);
  a = c(a.split("/"));
  b = c(b.split("/"));
  for (var d = Math.min(a.length, b.length), e = d, f = 0; f < d; f++) {
    if (a[f] !== b[f]) {
      e = f;
      break;
    }
  }
  d = [];
  for (f = e; f < a.length; f++) {
    d.push("..");
  }
  d = d.concat(b.slice(e));
  return d.join("/");
};
function Rb(a) {
  for (var b = 0, c = 0; c < a.length; ++c) {
    var d = a.charCodeAt(c);
    127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
  }
  return b;
}
function Sb(a, b, c, d) {
  w("string" === typeof a);
  if (!(0 < d)) {
    return 0;
  }
  var e = c;
  d = c + d - 1;
  for (var f = 0; f < a.length; ++f) {
    var g = a.charCodeAt(f);
    if (55296 <= g && 57343 >= g) {
      var k = a.charCodeAt(++f);
      g = 65536 + ((g & 1023) << 10) | k & 1023;
    }
    if (127 >= g) {
      if (c >= d) {
        break;
      }
      b[c++] = g;
    } else {
      if (2047 >= g) {
        if (c + 1 >= d) {
          break;
        }
        b[c++] = 192 | g >> 6;
      } else {
        if (65535 >= g) {
          if (c + 2 >= d) {
            break;
          }
          b[c++] = 224 | g >> 12;
        } else {
          if (c + 3 >= d) {
            break;
          }
          1114111 < g && Cb("Invalid Unicode code point " + Ua(g) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
          b[c++] = 240 | g >> 18;
          b[c++] = 128 | g >> 12 & 63;
        }
        b[c++] = 128 | g >> 6 & 63;
      }
      b[c++] = 128 | g & 63;
    }
  }
  b[c] = 0;
  return c - e;
}
function Tb(a, b) {
  var c = Array(Rb(a) + 1);
  a = Sb(a, c, 0, c.length);
  b && (c.length = a);
  return c;
}
var Ub = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
function Vb(a, b, c) {
  var d = b + c;
  for (c = b; a[c] && !(c >= d);) {
    ++c;
  }
  if (16 < c - b && a.buffer && Ub) {
    return Ub.decode(a.buffer instanceof SharedArrayBuffer ? a.slice(b, c) : a.subarray(b, c));
  }
  for (d = ""; b < c;) {
    var e = a[b++];
    if (e & 128) {
      var f = a[b++] & 63;
      if (192 == (e & 224)) {
        d += String.fromCharCode((e & 31) << 6 | f);
      } else {
        var g = a[b++] & 63;
        224 == (e & 240) ? e = (e & 15) << 12 | f << 6 | g : (240 != (e & 248) && Cb("Invalid UTF-8 leading byte " + Ua(e) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!"), e = (e & 7) << 18 | f << 12 | g << 6 | a[b++] & 63);
        65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
      }
    } else {
      d += String.fromCharCode(e);
    }
  }
  return d;
}
var Wb = [];
function Xb(a, b) {
  Wb[a] = {input:[], B:[], ga:b};
  Yb(a, Zb);
}
var Zb = {open:function(a) {
  var b = Wb[a.node.qa];
  if (!b) {
    throw new G(43);
  }
  a.o = b;
  a.seekable = !1;
}, close:function(a) {
  a.o.ga.ya(a.o);
}, ya:function(a) {
  a.o.ga.ya(a.o);
}, read:function(a, b, c, d) {
  if (!a.o || !a.o.ga.tb) {
    throw new G(60);
  }
  for (var e = 0, f = 0; f < d; f++) {
    try {
      var g = a.o.ga.tb(a.o);
    } catch (k) {
      throw new G(29);
    }
    if (void 0 === g && 0 === e) {
      throw new G(6);
    }
    if (null === g || void 0 === g) {
      break;
    }
    e++;
    b[c + f] = g;
  }
  e && (a.node.timestamp = Date.now());
  return e;
}, write:function(a, b, c, d) {
  if (!a.o || !a.o.ga.Za) {
    throw new G(60);
  }
  try {
    for (var e = 0; e < d; e++) {
      a.o.ga.Za(a.o, b[c + e]);
    }
  } catch (f) {
    throw new G(29);
  }
  d && (a.node.timestamp = Date.now());
  return e;
}}, $b = {tb:function(a) {
  if (!a.input.length) {
    var b = null;
    "undefined" != typeof window && "function" == typeof window.prompt ? (b = window.prompt("Input: "), null !== b && (b += "\n")) : "function" == typeof readline && (b = readline(), null !== b && (b += "\n"));
    if (!b) {
      return null;
    }
    a.input = Tb(b, !0);
  }
  return a.input.shift();
}, Za:function(a, b) {
  null === b || 10 === b ? (Ha(Vb(a.B, 0)), a.B = []) : 0 != b && a.B.push(b);
}, ya:function(a) {
  a.B && 0 < a.B.length && (Ha(Vb(a.B, 0)), a.B = []);
}}, ac = {Za:function(a, b) {
  null === b || 10 === b ? (x(Vb(a.B, 0)), a.B = []) : 0 != b && a.B.push(b);
}, ya:function(a) {
  a.B && 0 < a.B.length && (x(Vb(a.B, 0)), a.B = []);
}}, H = {K:null, u:function() {
  return H.createNode(null, "/", 16895, 0);
}, createNode:function(a, b, c, d) {
  if (24576 === (c & 61440) || 4096 === (c & 61440)) {
    throw new G(63);
  }
  H.K || (H.K = {dir:{node:{J:H.h.J, D:H.h.D, na:H.h.na, Ea:H.h.Ea, Ja:H.h.Ja, Qa:H.h.Qa, La:H.h.La, Ia:H.h.Ia, Ma:H.h.Ma}, stream:{$:H.j.$}}, file:{node:{J:H.h.J, D:H.h.D}, stream:{$:H.j.$, read:H.j.read, write:H.j.write, ib:H.j.ib, xb:H.j.xb, yb:H.j.yb}}, link:{node:{J:H.h.J, D:H.h.D, sa:H.h.sa}, stream:{}}, mb:{node:{J:H.h.J, D:H.h.D}, stream:bc}});
  c = cc(a, b, c, d);
  16384 === (c.mode & 61440) ? (c.h = H.K.dir.node, c.j = H.K.dir.stream, c.l = {}) : 32768 === (c.mode & 61440) ? (c.h = H.K.file.node, c.j = H.K.file.stream, c.s = 0, c.l = null) : 40960 === (c.mode & 61440) ? (c.h = H.K.link.node, c.j = H.K.link.stream) : 8192 === (c.mode & 61440) && (c.h = H.K.mb.node, c.j = H.K.mb.stream);
  c.timestamp = Date.now();
  a && (a.l[b] = c, a.timestamp = c.timestamp);
  return c;
}, hc:function(a) {
  return a.l ? a.l.subarray ? a.l.subarray(0, a.s) : new Uint8Array(a.l) : new Uint8Array(0);
}, rb:function(a, b) {
  var c = a.l ? a.l.length : 0;
  c >= b || (b = Math.max(b, c * (1048576 > c ? 2 : 1.125) >>> 0), 0 != c && (b = Math.max(b, 256)), c = a.l, a.l = new Uint8Array(b), 0 < a.s && a.l.set(c.subarray(0, a.s), 0));
}, Lc:function(a, b) {
  if (a.s != b) {
    if (0 == b) {
      a.l = null, a.s = 0;
    } else {
      var c = a.l;
      a.l = new Uint8Array(b);
      c && a.l.set(c.subarray(0, Math.min(b, a.s)));
      a.s = b;
    }
  }
}, h:{J:function(a) {
  var b = {};
  b.bc = 8192 === (a.mode & 61440) ? a.id : 1;
  b.Wa = a.id;
  b.mode = a.mode;
  b.Ac = 1;
  b.uid = 0;
  b.oc = 0;
  b.qa = a.qa;
  16384 === (a.mode & 61440) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.s : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
  b.Qb = new Date(a.timestamp);
  b.Ga = new Date(a.timestamp);
  b.Zb = new Date(a.timestamp);
  b.Ub = 4096;
  b.Vb = Math.ceil(b.size / b.Ub);
  return b;
}, D:function(a, b) {
  void 0 !== b.mode && (a.mode = b.mode);
  void 0 !== b.timestamp && (a.timestamp = b.timestamp);
  void 0 !== b.size && H.Lc(a, b.size);
}, na:function() {
  throw dc[44];
}, Ea:function(a, b, c, d) {
  return H.createNode(a, b, c, d);
}, Ja:function(a, b, c) {
  if (16384 === (a.mode & 61440)) {
    try {
      var d = ec(b, c);
    } catch (f) {
    }
    if (d) {
      for (var e in d.l) {
        throw new G(55);
      }
    }
  }
  delete a.parent.l[a.name];
  a.parent.timestamp = Date.now();
  a.name = c;
  b.l[c] = a;
  b.timestamp = a.parent.timestamp;
  a.parent = b;
}, Qa:function(a, b) {
  delete a.l[b];
  a.timestamp = Date.now();
}, La:function(a, b) {
  var c = ec(a, b), d;
  for (d in c.l) {
    throw new G(55);
  }
  delete a.l[b];
  a.timestamp = Date.now();
}, Ia:function(a) {
  var b = [".", ".."], c;
  for (c in a.l) {
    a.l.hasOwnProperty(c) && b.push(c);
  }
  return b;
}, Ma:function(a, b, c) {
  a = H.createNode(a, b, 41471, 0);
  a.link = c;
  return a;
}, sa:function(a) {
  if (40960 !== (a.mode & 61440)) {
    throw new G(28);
  }
  return a.link;
}}, j:{read:function(a, b, c, d, e) {
  var f = a.node.l;
  if (e >= a.node.s) {
    return 0;
  }
  a = Math.min(a.node.s - e, d);
  w(0 <= a);
  if (8 < a && f.subarray) {
    b.set(f.subarray(e, e + a), c);
  } else {
    for (d = 0; d < a; d++) {
      b[c + d] = f[e + d];
    }
  }
  return a;
}, write:function(a, b, c, d, e, f) {
  w(!(b instanceof ArrayBuffer));
  b.buffer === h().buffer && (f = !1);
  if (!d) {
    return 0;
  }
  a = a.node;
  a.timestamp = Date.now();
  if (b.subarray && (!a.l || a.l.subarray)) {
    if (f) {
      return w(0 === e, "canOwn must imply no weird position inside the file"), a.l = b.subarray(c, c + d), a.s = d;
    }
    if (0 === a.s && 0 === e) {
      return a.l = b.slice(c, c + d), a.s = d;
    }
    if (e + d <= a.s) {
      return a.l.set(b.subarray(c, c + d), e), d;
    }
  }
  H.rb(a, e + d);
  if (a.l.subarray && b.subarray) {
    a.l.set(b.subarray(c, c + d), e);
  } else {
    for (f = 0; f < d; f++) {
      a.l[e + f] = b[c + f];
    }
  }
  a.s = Math.max(a.s, e + d);
  return d;
}, $:function(a, b, c) {
  1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.s);
  if (0 > b) {
    throw new G(28);
  }
  return b;
}, ib:function(a, b, c) {
  H.rb(a.node, b + c);
  a.node.s = Math.max(a.node.s, b + c);
}, xb:function(a, b, c, d, e) {
  if (32768 !== (a.node.mode & 61440)) {
    throw new G(43);
  }
  a = a.node.l;
  if (e & 2 || a.buffer !== h().buffer) {
    if (0 < c || c + b < a.length) {
      a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
    }
    c = !0;
    w(65536, "alignment argument is required");
    b = 65536 * Math.ceil(b / 65536);
    b = (e = fc(65536, b)) ? Gb(e, b) : 0;
    if (!b) {
      throw new G(48);
    }
    h().set(a, b);
  } else {
    c = !1, b = a.byteOffset;
  }
  return {Dd:b, bd:c};
}, yb:function(a, b, c, d) {
  H.j.write(a, b, 0, d, c, !1);
  return 0;
}}}, gc = q.preloadPlugins || [];
function hc(a, b) {
  var c = 0;
  a && (c |= 365);
  b && (c |= 146);
  return c;
}
var I = {W:{}, indexedDB:() => {
  if ("undefined" != typeof indexedDB) {
    return indexedDB;
  }
  var a = null;
  "object" == typeof window && (a = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB);
  w(a, "IDBFS used, but indexedDB not supported");
  return a;
}, Pb:21, U:"FILE_DATA", u:function(a) {
  return H.u.apply(null, arguments);
}, Hb:(a, b, c) => {
  I.ic(a, (d, e) => {
    if (d) {
      return c(d);
    }
    I.kc(a, (f, g) => {
      if (f) {
        return c(f);
      }
      I.Hc(b ? g : e, b ? e : g, c);
    });
  });
}, Ec:() => {
  Object.values(I.W).forEach(a => a.close());
  I.W = {};
}, fc:(a, b) => {
  var c = I.W[a];
  if (c) {
    return b(null, c);
  }
  try {
    var d = I.indexedDB().open(a, I.Pb);
  } catch (e) {
    return b(e);
  }
  if (!d) {
    return b("Unable to connect to IndexedDB");
  }
  d.onupgradeneeded = e => {
    var f = e.target.result;
    e = e.target.transaction;
    var g;
    f.objectStoreNames.contains(I.U) ? g = e.objectStore(I.U) : g = f.createObjectStore(I.U);
    g.indexNames.contains("timestamp") || g.createIndex("timestamp", "timestamp", {unique:!1});
  };
  d.onsuccess = () => {
    c = d.result;
    I.W[a] = c;
    b(null, c);
  };
  d.onerror = e => {
    b(this.error);
    e.preventDefault();
  };
}, ic:(a, b) => {
  function c(k) {
    return "." !== k && ".." !== k;
  }
  function d(k) {
    return l => Jb(k + "/" + l);
  }
  var e = {};
  for (a = ic(a.oa).filter(c).map(d(a.oa)); a.length;) {
    var f = a.pop();
    try {
      var g = jc(f);
    } catch (k) {
      return b(k);
    }
    16384 === (g.mode & 61440) && a.push.apply(a, ic(f).filter(c).map(d(f)));
    e[f] = {timestamp:g.Ga};
  }
  return b(null, {type:"local", entries:e});
}, kc:(a, b) => {
  var c = {};
  I.fc(a.oa, (d, e) => {
    if (d) {
      return b(d);
    }
    try {
      var f = e.transaction([I.U], "readonly");
      f.onerror = g => {
        b(this.error);
        g.preventDefault();
      };
      f.objectStore(I.U).index("timestamp").openKeyCursor().onsuccess = g => {
        g = g.target.result;
        if (!g) {
          return b(null, {type:"remote", db:e, entries:c});
        }
        c[g.primaryKey] = {timestamp:g.key};
        g.continue();
      };
    } catch (g) {
      return b(g);
    }
  });
}, wc:(a, b) => {
  try {
    var c = kc(a).node;
    var d = jc(a);
  } catch (e) {
    return b(e);
  }
  return 16384 === (d.mode & 61440) ? b(null, {timestamp:d.Ga, mode:d.mode}) : 32768 === (d.mode & 61440) ? (c.l = H.hc(c), b(null, {timestamp:d.Ga, mode:d.mode, contents:c.l})) : b(Error("node type not supported"));
}, Qc:(a, b, c) => {
  try {
    if (16384 === (b.mode & 61440)) {
      lc(a, b.mode);
    } else if (32768 === (b.mode & 61440)) {
      mc(a, b.contents, {lb:!0});
    } else {
      return c(Error("node type not supported"));
    }
    nc(a, b.mode);
    var d = b.timestamp, e = b.timestamp, f = kc(a, {S:!0}).node;
    f.h.D(f, {timestamp:Math.max(d, e)});
  } catch (g) {
    return c(g);
  }
  c(null);
}, Jc:(a, b) => {
  try {
    var c = jc(a);
    16384 === (c.mode & 61440) ? oc(a) : 32768 === (c.mode & 61440) && pc(a);
  } catch (d) {
    return b(d);
  }
  b(null);
}, xc:(a, b, c) => {
  a = a.get(b);
  a.onsuccess = d => {
    c(null, d.target.result);
  };
  a.onerror = d => {
    c(this.error);
    d.preventDefault();
  };
}, Rc:(a, b, c, d) => {
  try {
    var e = a.put(c, b);
  } catch (f) {
    d(f);
    return;
  }
  e.onsuccess = () => {
    d(null);
  };
  e.onerror = f => {
    d(this.error);
    f.preventDefault();
  };
}, Kc:(a, b, c) => {
  a = a.delete(b);
  a.onsuccess = () => {
    c(null);
  };
  a.onerror = d => {
    c(this.error);
    d.preventDefault();
  };
}, Hc:(a, b, c) => {
  function d(v) {
    if (v && !k) {
      return k = !0, c(v);
    }
  }
  var e = 0, f = [];
  Object.keys(a.entries).forEach(function(v) {
    var B = a.entries[v], E = b.entries[v];
    E && B.timestamp.getTime() == E.timestamp.getTime() || (f.push(v), e++);
  });
  var g = [];
  Object.keys(b.entries).forEach(function(v) {
    a.entries[v] || (g.push(v), e++);
  });
  if (!e) {
    return c(null);
  }
  var k = !1, l = ("remote" === a.type ? a.db : b.db).transaction([I.U], "readwrite"), r = l.objectStore(I.U);
  l.onerror = v => {
    d(this.error);
    v.preventDefault();
  };
  l.oncomplete = () => {
    k || c(null);
  };
  f.sort().forEach(v => {
    "local" === b.type ? I.xc(r, v, (B, E) => {
      if (B) {
        return d(B);
      }
      I.Qc(v, E, d);
    }) : I.wc(v, (B, E) => {
      if (B) {
        return d(B);
      }
      I.Rc(r, v, E, d);
    });
  });
  g.sort().reverse().forEach(v => {
    "local" === b.type ? I.Jc(v, d) : I.Kc(r, v, d);
  });
}}, qc = {0:"Success", 1:"Arg list too long", 2:"Permission denied", 3:"Address already in use", 4:"Address not available", 5:"Address family not supported by protocol family", 6:"No more processes", 7:"Socket already connected", 8:"Bad file number", 9:"Trying to read unreadable message", 10:"Mount device busy", 11:"Operation canceled", 12:"No children", 13:"Connection aborted", 14:"Connection refused", 15:"Connection reset by peer", 16:"File locking deadlock error", 17:"Destination address required", 
18:"Math arg out of domain of func", 19:"Quota exceeded", 20:"File exists", 21:"Bad address", 22:"File too large", 23:"Host is unreachable", 24:"Identifier removed", 25:"Illegal byte sequence", 26:"Connection already in progress", 27:"Interrupted system call", 28:"Invalid argument", 29:"I/O error", 30:"Socket is already connected", 31:"Is a directory", 32:"Too many symbolic links", 33:"Too many open files", 34:"Too many links", 35:"Message too long", 36:"Multihop attempted", 37:"File or path name too long", 
38:"Network interface is not configured", 39:"Connection reset by network", 40:"Network is unreachable", 41:"Too many open files in system", 42:"No buffer space available", 43:"No such device", 44:"No such file or directory", 45:"Exec format error", 46:"No record locks available", 47:"The link has been severed", 48:"Not enough core", 49:"No message of desired type", 50:"Protocol not available", 51:"No space left on device", 52:"Function not implemented", 53:"Socket is not connected", 54:"Not a directory", 
55:"Directory not empty", 56:"State not recoverable", 57:"Socket operation on non-socket", 59:"Not a typewriter", 60:"No such device or address", 61:"Value too large for defined data type", 62:"Previous owner died", 63:"Not super-user", 64:"Broken pipe", 65:"Protocol error", 66:"Unknown protocol", 67:"Protocol wrong type for socket", 68:"Math result not representable", 69:"Read only file system", 70:"Illegal seek", 71:"No such process", 72:"Stale file handle", 73:"Connection timed out", 74:"Text file busy", 
75:"Cross-device link", 100:"Device not a stream", 101:"Bad font file fmt", 102:"Invalid slot", 103:"Invalid request code", 104:"No anode", 105:"Block device required", 106:"Channel number out of range", 107:"Level 3 halted", 108:"Level 3 reset", 109:"Link number out of range", 110:"Protocol driver not attached", 111:"No CSI structure available", 112:"Level 2 halted", 113:"Invalid exchange", 114:"Invalid request descriptor", 115:"Exchange full", 116:"No data (for no delay io)", 117:"Timer expired", 
118:"Out of streams resources", 119:"Machine is not on the network", 120:"Package not installed", 121:"The object is remote", 122:"Advertise error", 123:"Srmount error", 124:"Communication error on send", 125:"Cross mount point (not really error)", 126:"Given log. name not unique", 127:"f.d. invalid for this operation", 128:"Remote address changed", 129:"Can   access a needed shared lib", 130:"Accessing a corrupted shared lib", 131:".lib section in a.out corrupted", 132:"Attempting to link in too many libs", 
133:"Attempting to exec a shared library", 135:"Streams pipe error", 136:"Too many users", 137:"Socket type not supported", 138:"Not supported", 139:"Protocol family not supported", 140:"Can't send after socket shutdown", 141:"Too many references", 142:"Host is down", 148:"No medium (in tape drive)", 156:"Level 2 not synchronized"}, rc = {};
function sc(a) {
  return a.replace(/\b_Z[\w\d_]+/g, function(b) {
    Cb("warning: build with -sDEMANGLE_SUPPORT to link in libcxxabi demangling");
    return b === b ? b : b + " [" + b + "]";
  });
}
var tc = null, uc = {}, vc = [], wc = 1, xc = null, Pb = "/", lb = !0, G = null, dc = {}, yc = 0, kc = (a, b = {}) => {
  a = Ob(a);
  if (!a) {
    return {path:"", node:null};
  }
  b = Object.assign({Va:!0, ab:0}, b);
  if (8 < b.ab) {
    throw new G(32);
  }
  a = a.split("/").filter(g => !!g);
  for (var c = tc, d = "/", e = 0; e < a.length; e++) {
    var f = e === a.length - 1;
    if (f && b.parent) {
      break;
    }
    c = ec(c, a[e]);
    d = Jb(d + "/" + a[e]);
    c.I && (!f || f && b.Va) && (c = c.I.root);
    if (!f || b.S) {
      for (f = 0; 40960 === (c.mode & 61440);) {
        if (c = zc(d), d = Ob(Kb(d), c), c = kc(d, {ab:b.ab + 1}).node, 40 < f++) {
          throw new G(32);
        }
      }
    }
  }
  return {path:d, node:c};
}, Ac = a => {
  for (var b;;) {
    if (a === a.parent) {
      return a = a.u.oa, b ? "/" !== a[a.length - 1] ? `${a}/${b}` : a + b : a;
    }
    b = b ? `${a.name}/${b}` : a.name;
    a = a.parent;
  }
}, Bc = (a, b) => {
  for (var c = 0, d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d) | 0;
  }
  return (a + c >>> 0) % xc.length;
}, Cc = a => {
  var b = Bc(a.parent.id, a.name);
  a.aa = xc[b];
  xc[b] = a;
}, Dc = a => {
  var b = Bc(a.parent.id, a.name);
  if (xc[b] === a) {
    xc[b] = a.aa;
  } else {
    for (b = xc[b]; b;) {
      if (b.aa === a) {
        b.aa = a.aa;
        break;
      }
      b = b.aa;
    }
  }
}, ec = (a, b) => {
  var c;
  if (c = (c = Ec(a, "x")) ? c : a.h.na ? 0 : 2) {
    throw new G(c, a);
  }
  for (c = xc[Bc(a.id, b)]; c; c = c.aa) {
    var d = c.name;
    if (c.parent.id === a.id && d === b) {
      return c;
    }
  }
  return a.h.na(a, b);
}, cc = (a, b, c, d) => {
  w("object" == typeof a);
  a = new Fc(a, b, c, d);
  Cc(a);
  return a;
}, Gc = a => {
  var b = ["r", "w", "rw"][a & 3];
  a & 512 && (b += "w");
  return b;
}, Ec = (a, b) => {
  if (lb) {
    return 0;
  }
  if (!b.includes("r") || a.mode & 292) {
    if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73)) {
      return 2;
    }
  } else {
    return 2;
  }
  return 0;
}, Hc = (a, b) => {
  try {
    return ec(a, b), 20;
  } catch (c) {
  }
  return Ec(a, "wx");
}, Ic = (a, b, c) => {
  try {
    var d = ec(a, b);
  } catch (e) {
    return e.g;
  }
  if (a = Ec(a, "wx")) {
    return a;
  }
  if (c) {
    if (16384 !== (d.mode & 61440)) {
      return 54;
    }
    if (d === d.parent || Ac(d) === Pb) {
      return 10;
    }
  } else {
    if (16384 === (d.mode & 61440)) {
      return 31;
    }
  }
  return 0;
}, Jc = (a = 0) => {
  for (; 4096 >= a; a++) {
    if (!vc[a]) {
      return a;
    }
  }
  throw new G(33);
}, Lc = (a, b) => {
  Kc || (Kc = function() {
    this.X = {};
  }, Kc.prototype = {}, Object.defineProperties(Kc.prototype, {object:{get:function() {
    return this.node;
  }, set:function(c) {
    this.node = c;
  }}, flags:{get:function() {
    return this.X.flags;
  }, set:function(c) {
    this.X.flags = c;
  }}, position:{get:function() {
    return this.X.position;
  }, set:function(c) {
    this.X.position = c;
  }}}));
  a = Object.assign(new Kc(), a);
  b = Jc(b);
  a.m = b;
  return vc[b] = a;
}, bc = {open:a => {
  a.j = uc[a.node.qa].j;
  a.j.open && a.j.open(a);
}, $:() => {
  throw new G(70);
}}, Yb = (a, b) => {
  uc[a] = {j:b};
}, Mc = a => {
  var b = [];
  for (a = [a]; a.length;) {
    var c = a.pop();
    b.push(c);
    a.push.apply(a, c.Fa);
  }
  return b;
}, Nc = (a, b) => {
  function c(g) {
    w(0 < yc);
    yc--;
    return b(g);
  }
  function d(g) {
    if (g) {
      if (!d.dc) {
        return d.dc = !0, c(g);
      }
    } else {
      ++f >= e.length && c(null);
    }
  }
  "function" == typeof a && (b = a, a = !1);
  yc++;
  1 < yc && x(`warning: ${yc} FS.syncfs operations in flight at once, probably just doing extra work`);
  var e = Mc(tc.u), f = 0;
  e.forEach(g => {
    if (!g.type.Hb) {
      return d(null);
    }
    g.type.Hb(g, a, d);
  });
}, nb = (a, b) => {
  if ("string" == typeof a) {
    throw a;
  }
  var c = "/" === b, d = !b;
  if (c && tc) {
    throw new G(10);
  }
  if (!c && !d) {
    var e = kc(b, {Va:!1});
    b = e.path;
    e = e.node;
    if (e.I) {
      throw new G(10);
    }
    if (16384 !== (e.mode & 61440)) {
      throw new G(54);
    }
  }
  b = {type:a, Bd:{}, oa:b, Fa:[]};
  a = a.u(b);
  a.u = b;
  b.root = a;
  c ? tc = a : e && (e.I = b, e.u && e.u.Fa.push(b));
  return a;
}, Oc = a => {
  a = kc(a, {Va:!1});
  if (!a.node.I) {
    throw new G(28);
  }
  a = a.node;
  var b = a.I, c = Mc(b);
  Object.keys(xc).forEach(d => {
    for (d = xc[d]; d;) {
      var e = d.aa;
      c.includes(d.u) && Dc(d);
      d = e;
    }
  });
  a.I = null;
  b = a.u.Fa.indexOf(b);
  w(-1 !== b);
  a.u.Fa.splice(b, 1);
}, Pc = (a, b, c) => {
  var d = kc(a, {parent:!0}).node;
  a = Lb(a);
  if (!a || "." === a || ".." === a) {
    throw new G(28);
  }
  var e = Hc(d, a);
  if (e) {
    throw new G(e);
  }
  if (!d.h.Ea) {
    throw new G(63);
  }
  return d.h.Ea(d, a, b, c);
}, Qc = (a, b) => Pc(a, (void 0 !== b ? b : 511) & 1023 | 16384, 0), lc = (a, b) => {
  a = a.split("/");
  for (var c = "", d = 0; d < a.length; ++d) {
    if (a[d]) {
      c += "/" + a[d];
      try {
        Qc(c, b);
      } catch (e) {
        if (20 != e.g) {
          throw e;
        }
      }
    }
  }
}, Rc = (a, b, c) => {
  "undefined" == typeof c && (c = b, b = 438);
  Pc(a, b | 8192, c);
}, jb = (a, b) => {
  if (!Ob(a)) {
    throw new G(44);
  }
  var c = kc(b, {parent:!0}).node;
  if (!c) {
    throw new G(44);
  }
  b = Lb(b);
  var d = Hc(c, b);
  if (d) {
    throw new G(d);
  }
  if (!c.h.Ma) {
    throw new G(63);
  }
  c.h.Ma(c, b, a);
}, oc = a => {
  var b = kc(a, {parent:!0}).node;
  a = Lb(a);
  var c = ec(b, a), d = Ic(b, a, !0);
  if (d) {
    throw new G(d);
  }
  if (!b.h.La) {
    throw new G(63);
  }
  if (c.I) {
    throw new G(10);
  }
  b.h.La(b, a);
  Dc(c);
}, ic = a => {
  a = kc(a, {S:!0}).node;
  if (!a.h.Ia) {
    throw new G(54);
  }
  return a.h.Ia(a);
}, pc = a => {
  var b = kc(a, {parent:!0}).node;
  if (!b) {
    throw new G(44);
  }
  a = Lb(a);
  var c = ec(b, a), d = Ic(b, a, !1);
  if (d) {
    throw new G(d);
  }
  if (!b.h.Qa) {
    throw new G(63);
  }
  if (c.I) {
    throw new G(10);
  }
  b.h.Qa(b, a);
  Dc(c);
}, zc = a => {
  a = kc(a).node;
  if (!a) {
    throw new G(44);
  }
  if (!a.h.sa) {
    throw new G(28);
  }
  return Ob(Ac(a.parent), a.h.sa(a));
}, jc = (a, b) => {
  a = kc(a, {S:!b}).node;
  if (!a) {
    throw new G(44);
  }
  if (!a.h.J) {
    throw new G(63);
  }
  return a.h.J(a);
}, Sc = a => jc(a, !0), nc = (a, b) => {
  a = "string" == typeof a ? kc(a, {S:!0}).node : a;
  if (!a.h.D) {
    throw new G(63);
  }
  a.h.D(a, {mode:b & 4095 | a.mode & -4096, timestamp:Date.now()});
}, kb = (a, b, c) => {
  if ("" === a) {
    throw new G(44);
  }
  if ("string" == typeof b) {
    var d = {r:0, "r+":2, w:577, "w+":578, a:1089, "a+":1090}[b];
    if ("undefined" == typeof d) {
      throw Error(`Unknown file open mode: ${b}`);
    }
    b = d;
  }
  c = b & 64 ? ("undefined" == typeof c ? 438 : c) & 4095 | 32768 : 0;
  if ("object" == typeof a) {
    var e = a;
  } else {
    a = Jb(a);
    try {
      e = kc(a, {S:!(b & 131072)}).node;
    } catch (f) {
    }
  }
  d = !1;
  if (b & 64) {
    if (e) {
      if (b & 128) {
        throw new G(20);
      }
    } else {
      e = Pc(a, c, 0), d = !0;
    }
  }
  if (!e) {
    throw new G(44);
  }
  8192 === (e.mode & 61440) && (b &= -513);
  if (b & 65536 && 16384 !== (e.mode & 61440)) {
    throw new G(54);
  }
  if (!d && (c = e ? 40960 === (e.mode & 61440) ? 32 : 16384 === (e.mode & 61440) && ("r" !== Gc(b) || b & 512) ? 31 : Ec(e, Gc(b)) : 44)) {
    throw new G(c);
  }
  if (b & 512 && !d) {
    c = e;
    c = "string" == typeof c ? kc(c, {S:!0}).node : c;
    if (!c.h.D) {
      throw new G(63);
    }
    if (16384 === (c.mode & 61440)) {
      throw new G(31);
    }
    if (32768 !== (c.mode & 61440)) {
      throw new G(28);
    }
    if (d = Ec(c, "w")) {
      throw new G(d);
    }
    c.h.D(c, {size:0, timestamp:Date.now()});
  }
  b &= -131713;
  e = Lc({node:e, path:Ac(e), flags:b, seekable:!0, position:0, j:e.j, Yc:[], error:!1});
  e.j.open && e.j.open(e);
  !q.logReadFiles || b & 1 || (Tc ||= {}, a in Tc || (Tc[a] = 1));
  return e;
}, Uc = a => {
  if (null === a.m) {
    throw new G(8);
  }
  a.Y && (a.Y = null);
  try {
    a.j.close && a.j.close(a);
  } catch (b) {
    throw b;
  } finally {
    vc[a.m] = null;
  }
  a.m = null;
}, Vc = (a, b, c) => {
  if (null === a.m) {
    throw new G(8);
  }
  if (!a.seekable || !a.j.$) {
    throw new G(70);
  }
  if (0 != c && 1 != c && 2 != c) {
    throw new G(28);
  }
  a.position = a.j.$(a, b, c);
  a.Yc = [];
  return a.position;
}, Wc = (a, b, c, d, e, f) => {
  if (0 > d || 0 > e) {
    throw new G(28);
  }
  if (null === a.m) {
    throw new G(8);
  }
  if (0 === (a.flags & 2097155)) {
    throw new G(8);
  }
  if (16384 === (a.node.mode & 61440)) {
    throw new G(31);
  }
  if (!a.j.write) {
    throw new G(28);
  }
  a.seekable && a.flags & 1024 && Vc(a, 0, 2);
  var g = "undefined" != typeof e;
  if (!g) {
    e = a.position;
  } else if (!a.seekable) {
    throw new G(70);
  }
  b = a.j.write(a, b, c, d, e, f);
  g || (a.position += b);
  return b;
}, mc = (a, b, c = {}) => {
  c.flags = c.flags || 577;
  a = kb(a, c.flags, c.mode);
  if ("string" == typeof b) {
    var d = new Uint8Array(Rb(b) + 1);
    b = Sb(b, d, 0, d.length);
    Wc(a, d, 0, b, void 0, c.lb);
  } else if (ArrayBuffer.isView(b)) {
    Wc(a, b, 0, b.byteLength, void 0, c.lb);
  } else {
    throw Error("Unsupported data type");
  }
  Uc(a);
}, hb = () => {
  G || (G = function(a, b) {
    this.name = "ErrnoError";
    this.node = b;
    this.Nc = function(c) {
      this.g = c;
      for (var d in rc) {
        if (rc[d] === c) {
          this.code = d;
          break;
        }
      }
    };
    this.Nc(a);
    this.message = qc[a];
    this.stack && (Object.defineProperty(this, "stack", {value:Error().stack, writable:!0}), this.stack = sc(this.stack));
  }, G.prototype = Error(), G.prototype.constructor = G, [44].forEach(a => {
    dc[a] = new G(a);
    dc[a].stack = "<generic error, no stack>";
  }));
}, gb, ib = (a, b, c) => {
  a = Jb("/dev/" + a);
  var d = hc(!!b, !!c);
  Xc ||= 64;
  var e = Xc++ << 8 | 0;
  Yb(e, {open:f => {
    f.seekable = !1;
  }, close:() => {
    c && c.buffer && c.buffer.length && c(10);
  }, read:(f, g, k, l) => {
    for (var r = 0, v = 0; v < l; v++) {
      try {
        var B = b();
      } catch (E) {
        throw new G(29);
      }
      if (void 0 === B && 0 === r) {
        throw new G(6);
      }
      if (null === B || void 0 === B) {
        break;
      }
      r++;
      g[k + v] = B;
    }
    r && (f.node.timestamp = Date.now());
    return r;
  }, write:(f, g, k, l) => {
    for (var r = 0; r < l; r++) {
      try {
        c(g[k + r]);
      } catch (v) {
        throw new G(29);
      }
    }
    l && (f.node.timestamp = Date.now());
    return r;
  }});
  Rc(a, d, e);
}, Xc, J = {}, Kc, Tc;
function K(a, b) {
  w("number" == typeof a);
  return a ? Vb(fa(), a, b) : "";
}
function Yc(a, b, c) {
  if ("/" === b.charAt(0)) {
    return b;
  }
  a = -100 === a ? Pb : Zc(a).path;
  if (0 == b.length) {
    if (!c) {
      throw new G(44);
    }
    return a;
  }
  return Jb(a + "/" + b);
}
function $c(a, b, c) {
  try {
    var d = a(b);
  } catch (f) {
    if (f && f.node && Jb(b) !== Jb(Ac(f.node))) {
      return -54;
    }
    throw f;
  }
  m()[c >> 2] = d.bc;
  m()[c + 8 >> 2] = d.Wa;
  m()[c + 12 >> 2] = d.mode;
  n()[c + 16 >> 2] = d.Ac;
  m()[c + 20 >> 2] = d.uid;
  m()[c + 24 >> 2] = d.oc;
  m()[c + 28 >> 2] = d.qa;
  D = [d.size >>> 0, (A = d.size, 1 <= +Math.abs(A) ? 0 < A ? +Math.floor(A / 4294967296) >>> 0 : ~~+Math.ceil((A - +(~~A >>> 0)) / 4294967296) >>> 0 : 0)];
  m()[c + 40 >> 2] = D[0];
  m()[c + 44 >> 2] = D[1];
  m()[c + 48 >> 2] = 4096;
  m()[c + 52 >> 2] = d.Vb;
  a = d.Qb.getTime();
  b = d.Ga.getTime();
  var e = d.Zb.getTime();
  D = [Math.floor(a / 1e3) >>> 0, (A = Math.floor(a / 1e3), 1 <= +Math.abs(A) ? 0 < A ? +Math.floor(A / 4294967296) >>> 0 : ~~+Math.ceil((A - +(~~A >>> 0)) / 4294967296) >>> 0 : 0)];
  m()[c + 56 >> 2] = D[0];
  m()[c + 60 >> 2] = D[1];
  n()[c + 64 >> 2] = a % 1e3 * 1e3;
  D = [Math.floor(b / 1e3) >>> 0, (A = Math.floor(b / 1e3), 1 <= +Math.abs(A) ? 0 < A ? +Math.floor(A / 4294967296) >>> 0 : ~~+Math.ceil((A - +(~~A >>> 0)) / 4294967296) >>> 0 : 0)];
  m()[c + 72 >> 2] = D[0];
  m()[c + 76 >> 2] = D[1];
  n()[c + 80 >> 2] = b % 1e3 * 1e3;
  D = [Math.floor(e / 1e3) >>> 0, (A = Math.floor(e / 1e3), 1 <= +Math.abs(A) ? 0 < A ? +Math.floor(A / 4294967296) >>> 0 : ~~+Math.ceil((A - +(~~A >>> 0)) / 4294967296) >>> 0 : 0)];
  m()[c + 88 >> 2] = D[0];
  m()[c + 92 >> 2] = D[1];
  n()[c + 96 >> 2] = e % 1e3 * 1e3;
  D = [d.Wa >>> 0, (A = d.Wa, 1 <= +Math.abs(A) ? 0 < A ? +Math.floor(A / 4294967296) >>> 0 : ~~+Math.ceil((A - +(~~A >>> 0)) / 4294967296) >>> 0 : 0)];
  m()[c + 104 >> 2] = D[0];
  m()[c + 108 >> 2] = D[1];
  return 0;
}
var ad = void 0;
function bd() {
  w(void 0 != ad);
  ad += 4;
  return m()[ad - 4 >> 2];
}
function Zc(a) {
  a = vc[a];
  if (!a) {
    throw new G(8);
  }
  return a;
}
function cd(a) {
  if (t) {
    return L(1, 1, a);
  }
  Oa = a;
  if (!eb()) {
    F.Ib();
    if (q.onExit) {
      q.onExit(a);
    }
    Na = !0;
  }
  ya(a, new Ga(a));
}
function dd(a, b) {
  Oa = a;
  if (t) {
    throw w(!b), ed(a), "unwind";
  }
  if (!eb() && (w(!cb), Ta(), !t)) {
    fd();
    ob($a);
    gb = !1;
    gd(0);
    for (var c = 0; c < vc.length; c++) {
      var d = vc[c];
      d && Uc(d);
    }
    I.Ec();
    F.Ib();
    cb = !0;
  }
  eb() && !b && (b = `program exited (with status: ${a}), but keepRuntimeAlive() is set (counter=${db}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`, ta(b), x(b));
  cd(a);
}
function Ua(a) {
  w("number" === typeof a);
  return "0x" + a.toString(16).padStart(8, "0");
}
function hd(a) {
  if (a instanceof Ga || "unwind" == a) {
    return Oa;
  }
  Ta();
  a instanceof WebAssembly.RuntimeError && 0 >= jd() && x("Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 5242880)");
  ya(1, a);
}
var F = {T:[], ba:[], Kb:[], R:{}, zc:1, kd:function() {
}, sc:function() {
  t ? F.vc() : F.uc();
}, uc:function() {
  for (var a = 8; a--;) {
    F.jb();
  }
}, vc:function() {
  F.receiveObjectTransfer = F.Gc;
  F.threadInitTLS = F.Jb;
  F.setExitStatus = F.Gb;
  noExitRuntime = !1;
}, Gb:function(a) {
  Oa = a;
}, Kd:["$terminateWorker"], Ib:function() {
  w(!t, "Internal Error! terminateAllThreads() can only ever be called from main application thread!");
  for (var a of F.ba) {
    Eb(a);
  }
  for (a of F.T) {
    Eb(a);
  }
  F.T = [];
  F.ba = [];
  F.R = [];
}, Mc:function(a) {
  var b = a.C;
  delete F.R[b];
  F.T.push(a);
  F.ba.splice(F.ba.indexOf(a), 1);
  a.C = 0;
  kd(b);
}, Gc:function() {
}, Jb:function() {
  F.Kb.forEach(a => a());
}, wb:a => new Promise(b => {
  a.onmessage = f => {
    f = f.data;
    var g = f.cmd;
    a.C && (F.ac = a.C);
    if (f.targetThread && f.targetThread != ld()) {
      var k = F.R[f.Jd];
      k ? k.postMessage(f, f.transferList) : x('Internal error! Worker sent a message "' + g + '" to target pthread ' + f.targetThread + ", but that thread no longer exists!");
    } else {
      if ("checkMailbox" === g) {
        md();
      } else if ("spawnThread" === g) {
        Hb(f);
      } else if ("cleanupThread" === g) {
        Fb(f.thread);
      } else if ("killThread" === g) {
        f = f.thread, w(!t, "Internal Error! killThread() can only ever be called from main application thread!"), w(f, "Internal Error! Null pthread_ptr in killThread!"), g = F.R[f], delete F.R[f], Eb(g), kd(f), F.ba.splice(F.ba.indexOf(g), 1), g.C = 0;
      } else if ("cancelThread" === g) {
        f = f.thread, w(!t, "Internal Error! cancelThread() can only ever be called from main application thread!"), w(f, "Internal Error! Null pthread_ptr in cancelThread!"), F.R[f].postMessage({cmd:"cancel"});
      } else if ("loaded" === g) {
        a.loaded = !0, b(a);
      } else if ("print" === g) {
        Ha("Thread " + f.threadId + ": " + f.text);
      } else if ("printErr" === g) {
        x("Thread " + f.threadId + ": " + f.text);
      } else if ("alert" === g) {
        alert("Thread " + f.threadId + ": " + f.text);
      } else if ("setimmediate" === f.target) {
        a.postMessage(f);
      } else if ("callHandler" === g) {
        q[f.handler](...f.args);
      } else {
        g && x("worker sent an unknown command " + g);
      }
    }
    F.ac = void 0;
  };
  a.onerror = f => {
    var g = "worker sent an error!";
    a.C && (g = "Pthread " + Ua(a.C) + " sent an error!");
    x(g + " " + f.filename + ":" + f.lineno + ": " + f.message);
    throw f;
  };
  w(ba instanceof WebAssembly.Memory, "WebAssembly memory should have been loaded by now!");
  w(Ma instanceof WebAssembly.Module, "WebAssembly Module should have been loaded by now!");
  var c = [], d = ["onExit", "onAbort", "print", "printErr"], e;
  for (e of d) {
    q.hasOwnProperty(e) && c.push(e);
  }
  a.Ob = F.zc++;
  a.postMessage({cmd:"load", handlers:c, urlOrBlob:q.mainScriptUrlOrBlob || _scriptDir, wasmMemory:ba, wasmModule:Ma, workerID:a.Ob});
}), yc:function(a) {
  if (t) {
    return a();
  }
  Promise.all(F.T.map(F.wb)).then(a);
}, jb:function() {
  var a = Ea("godot.web.editor.wasm32.worker.js");
  a = new Worker(a);
  F.T.push(a);
}, jc:function() {
  0 == F.T.length && (x("Tried to spawn a new thread, but the thread pool is exhausted.\nThis might result in a deadlock unless some threads eventually exit or the code explicitly breaks out to the event loop.\nIf you want to increase the pool size, use setting `-sPTHREAD_POOL_SIZE=...`.\nIf you want to throw an explicit error instead of the risk of deadlocking in those cases, use setting `-sPTHREAD_POOL_SIZE_STRICT=2`."), F.jb(), F.wb(F.T[0]));
  return F.T.pop();
}};
q.PThread = F;
function ob(a) {
  for (; 0 < a.length;) {
    a.shift()(q);
  }
}
q.establishStackSpace = function() {
  var a = ld(), b = m()[a + 52 >> 2];
  a = m()[a + 56 >> 2];
  a = b - a;
  w(0 != b);
  w(0 != a);
  w(b > a, "stackTop must be higher then stackMax");
  nd(b, a);
  od(b);
  Ra();
};
function ed(a) {
  if (t) {
    return L(2, 0, a);
  }
  dd(a);
}
function pd(a, b = "i8") {
  b.endsWith("*") && (b = "*");
  switch(b) {
    case "i1":
      return h()[a >> 0];
    case "i8":
      return h()[a >> 0];
    case "i16":
      return ia()[a >> 1];
    case "i32":
      return m()[a >> 2];
    case "i64":
      return m()[a >> 2];
    case "float":
      return p()[a >> 2];
    case "double":
      return qa()[a >> 3];
    case "*":
      return n()[a >> 2];
    default:
      ua(`invalid type for getValue: ${b}`);
  }
}
var qd = [];
function rd(a) {
  var b = qd[a];
  b || (a >= qd.length && (qd.length = a + 1), qd[a] = b = Qa.get(a));
  w(Qa.get(a) == b, "JavaScript-side Wasm function table mirror is out of date!");
  return b;
}
q.invokeEntryPoint = function(a, b) {
  db = 0;
  a = rd(a)(b);
  Ta();
  eb() ? F.Gb(a) : sd(a);
};
function M(a, b, c = "i8") {
  c.endsWith("*") && (c = "*");
  switch(c) {
    case "i1":
      h()[a >> 0] = b;
      break;
    case "i8":
      h()[a >> 0] = b;
      break;
    case "i16":
      ia()[a >> 1] = b;
      break;
    case "i32":
      m()[a >> 2] = b;
      break;
    case "i64":
      D = [b >>> 0, (A = b, 1 <= +Math.abs(A) ? 0 < A ? +Math.floor(A / 4294967296) >>> 0 : ~~+Math.ceil((A - +(~~A >>> 0)) / 4294967296) >>> 0 : 0)];
      m()[a >> 2] = D[0];
      m()[a + 4 >> 2] = D[1];
      break;
    case "float":
      p()[a >> 2] = b;
      break;
    case "double":
      qa()[a >> 3] = b;
      break;
    case "*":
      n()[a >> 2] = b;
      break;
    default:
      ua(`invalid type for setValue: ${c}`);
  }
}
function Cb(a) {
  td ||= {};
  td[a] || (td[a] = 1, x(a));
}
var td;
function ud(a, b, c, d) {
  return t ? L(3, 1, a, b, c, d) : vd(a, b, c, d);
}
function vd(a, b, c, d) {
  if ("undefined" == typeof SharedArrayBuffer) {
    return x("Current environment does not support SharedArrayBuffer, pthreads are not available!"), 6;
  }
  var e = [];
  if (t && 0 === e.length) {
    return ud(a, b, c, d);
  }
  a = {Pc:c, C:a, kb:d, Xc:e};
  return t ? (a.ed = "spawnThread", postMessage(a, e), 0) : Hb(a);
}
function wd(a, b, c, d, e) {
  if (t) {
    return L(4, 1, a, b, c, d, e);
  }
  try {
    w(64 >= a, "nfds must be less than or equal to 64");
    w(!d, "exceptfds not supported");
    e = 0;
    for (var f = b ? m()[b >> 2] : 0, g = b ? m()[b + 4 >> 2] : 0, k = c ? m()[c >> 2] : 0, l = c ? m()[c + 4 >> 2] : 0, r = d ? m()[d >> 2] : 0, v = d ? m()[d + 4 >> 2] : 0, B = 0, E = 0, u = 0, C = 0, y = 0, O = 0, ca = (b ? m()[b >> 2] : 0) | (c ? m()[c >> 2] : 0) | (d ? m()[d >> 2] : 0), aa = (b ? m()[b + 4 >> 2] : 0) | (c ? m()[c + 4 >> 2] : 0) | (d ? m()[d + 4 >> 2] : 0), ka = 0; ka < a; ka++) {
      var U = 1 << ka % 32;
      if (32 > ka ? ca & U : aa & U) {
        var Ja = Zc(ka), Ka = 5;
        Ja.j.ha && (Ka = Ja.j.ha(Ja));
        Ka & 1 && (32 > ka ? f & U : g & U) && (32 > ka ? B |= U : E |= U, e++);
        Ka & 4 && (32 > ka ? k & U : l & U) && (32 > ka ? u |= U : C |= U, e++);
        Ka & 2 && (32 > ka ? r & U : v & U) && (32 > ka ? y |= U : O |= U, e++);
      }
    }
    b && (m()[b >> 2] = B, m()[b + 4 >> 2] = E);
    c && (m()[c >> 2] = u, m()[c + 4 >> 2] = C);
    d && (m()[d >> 2] = y, m()[d + 4 >> 2] = O);
    return e;
  } catch (Pd) {
    if ("undefined" == typeof J || "ErrnoError" !== Pd.name) {
      throw Pd;
    }
    return -Pd.g;
  }
}
var mb = {u:function() {
  q.websocket = q.websocket && "object" === typeof q.websocket ? q.websocket : {};
  q.websocket.Ra = {};
  q.websocket.on = function(a, b) {
    "function" === typeof b && (this.Ra[a] = b);
    return this;
  };
  q.websocket.fa = function(a, b) {
    "function" === typeof this.Ra[a] && this.Ra[a].call(this, b);
  };
  return cc(null, "/", 16895, 0);
}, Yb:function(a, b, c) {
  b &= -526337;
  if (1 == b && c && 6 != c) {
    throw new G(66);
  }
  a = {family:a, type:b, protocol:c, L:null, error:null, pa:{}, pending:[], ia:[], F:mb.G};
  b = mb.Ha();
  c = cc(mb.root, b, 49152, 0);
  c.ja = a;
  b = Lc({path:b, node:c, flags:2, seekable:!1, j:mb.j});
  a.stream = b;
  return a;
}, lc:function(a) {
  return (a = vc[a]) && 49152 === (a.node.mode & 49152) ? a.node.ja : null;
}, j:{ha:function(a) {
  a = a.node.ja;
  return a.F.ha(a);
}, Aa:function(a, b, c) {
  a = a.node.ja;
  return a.F.Aa(a, b, c);
}, read:function(a, b, c, d) {
  a = a.node.ja;
  d = a.F.Db(a, d);
  if (!d) {
    return 0;
  }
  b.set(d.buffer, c);
  return d.buffer.length;
}, write:function(a, b, c, d) {
  a = a.node.ja;
  return a.F.Fb(a, b, c, d);
}, close:function(a) {
  a = a.node.ja;
  a.F.close(a);
}}, Ha:function() {
  mb.Ha.current || (mb.Ha.current = 0);
  return "socket[" + mb.Ha.current++ + "]";
}, G:{nb:function(a, b, c) {
  if ("object" == typeof b) {
    var d = b;
    c = b = null;
  }
  if (d) {
    if (d.gb) {
      b = d.gb.Fd, c = d.gb.Gd;
    } else {
      c = /ws[s]?:\/\/([^:]+):(\d+)/.exec(d.url);
      if (!c) {
        throw Error("WebSocket URL must be in the format ws(s)://address:port");
      }
      b = c[1];
      c = parseInt(c[2], 10);
    }
  } else {
    try {
      var e = q.websocket && "object" === typeof q.websocket, f = "ws://";
      e && "string" === typeof q.websocket.url && (f = q.websocket.url);
      if ("ws://" === f || "wss://" === f) {
        var g = b.split("/");
        f = f + g[0] + ":" + c + "/" + g.slice(1).join("/");
      }
      g = "binary";
      e && "string" === typeof q.websocket.subprotocol && (g = q.websocket.subprotocol);
      var k = void 0;
      "null" !== g && (k = g = g.replace(/^ +| +$/g, "").split(/ *, */));
      e && null === q.websocket.subprotocol && (k = void 0);
      d = new WebSocket(f, k);
      d.binaryType = "arraybuffer";
    } catch (l) {
      throw new G(23);
    }
  }
  b = {A:b, port:c, i:d, xa:[]};
  mb.G.hb(a, b);
  mb.G.qc(a, b);
  2 === a.type && "undefined" != typeof a.ka && b.xa.push(new Uint8Array([255, 255, 255, 255, 112, 111, 114, 116, (a.ka & 65280) >> 8, a.ka & 255]));
  return b;
}, za:function(a, b, c) {
  return a.pa[b + ":" + c];
}, hb:function(a, b) {
  a.pa[b.A + ":" + b.port] = b;
}, Eb:function(a, b) {
  delete a.pa[b.A + ":" + b.port];
}, qc:function(a, b) {
  function c() {
    q.websocket.fa("open", a.stream.m);
    try {
      for (var f = b.xa.shift(); f;) {
        b.i.send(f), f = b.xa.shift();
      }
    } catch (g) {
      b.i.close();
    }
  }
  function d(f) {
    if ("string" == typeof f) {
      f = (new TextEncoder()).encode(f);
    } else {
      w(void 0 !== f.byteLength);
      if (0 == f.byteLength) {
        return;
      }
      f = new Uint8Array(f);
    }
    var g = e;
    e = !1;
    g && 10 === f.length && 255 === f[0] && 255 === f[1] && 255 === f[2] && 255 === f[3] && 112 === f[4] && 111 === f[5] && 114 === f[6] && 116 === f[7] ? (f = f[8] << 8 | f[9], mb.G.Eb(a, b), b.port = f, mb.G.hb(a, b)) : (a.ia.push({A:b.A, port:b.port, data:f}), q.websocket.fa("message", a.stream.m));
  }
  var e = !0;
  Ba ? (b.i.Ya("open", c), b.i.Ya("message", function(f, g) {
    g && d((new Uint8Array(f)).buffer);
  }), b.i.Ya("close", function() {
    q.websocket.fa("close", a.stream.m);
  }), b.i.Ya("error", function() {
    a.error = 14;
    q.websocket.fa("error", [a.stream.m, a.error, "ECONNREFUSED: Connection refused"]);
  })) : (b.i.onopen = c, b.i.onclose = function() {
    q.websocket.fa("close", a.stream.m);
  }, b.i.onmessage = function(f) {
    d(f.data);
  }, b.i.onerror = function() {
    a.error = 14;
    q.websocket.fa("error", [a.stream.m, a.error, "ECONNREFUSED: Connection refused"]);
  });
}, ha:function(a) {
  if (1 === a.type && a.L) {
    return a.pending.length ? 65 : 0;
  }
  var b = 0, c = 1 === a.type ? mb.G.za(a, a.O, a.P) : null;
  if (a.ia.length || !c || c && c.i.readyState === c.i.CLOSING || c && c.i.readyState === c.i.CLOSED) {
    b |= 65;
  }
  if (!c || c && c.i.readyState === c.i.OPEN) {
    b |= 4;
  }
  if (c && c.i.readyState === c.i.CLOSING || c && c.i.readyState === c.i.CLOSED) {
    b |= 16;
  }
  return b;
}, Aa:function(a, b, c) {
  switch(b) {
    case 21531:
      return b = 0, a.ia.length && (b = a.ia[0].data.length), m()[c >> 2] = b, 0;
    default:
      return 28;
  }
}, close:function(a) {
  if (a.L) {
    try {
      a.L.close();
    } catch (e) {
    }
    a.L = null;
  }
  for (var b = Object.keys(a.pa), c = 0; c < b.length; c++) {
    var d = a.pa[b[c]];
    try {
      d.i.close();
    } catch (e) {
    }
    mb.G.Eb(a, d);
  }
  return 0;
}, bind:function(a, b, c) {
  if ("undefined" != typeof a.cb || "undefined" != typeof a.ka) {
    throw new G(28);
  }
  a.cb = b;
  a.ka = c;
  if (2 === a.type) {
    a.L && (a.L.close(), a.L = null);
    try {
      a.F.vb(a, 0);
    } catch (d) {
      if ("ErrnoError" !== d.name) {
        throw d;
      }
      if (138 !== d.g) {
        throw d;
      }
    }
  }
}, connect:function(a, b, c) {
  if (a.L) {
    throw new G(138);
  }
  if ("undefined" != typeof a.O && "undefined" != typeof a.P) {
    var d = mb.G.za(a, a.O, a.P);
    if (d) {
      if (d.i.readyState === d.i.CONNECTING) {
        throw new G(7);
      }
      throw new G(30);
    }
  }
  b = mb.G.nb(a, b, c);
  a.O = b.A;
  a.P = b.port;
  throw new G(26);
}, vb:function() {
  if (!Ba) {
    throw new G(138);
  }
}, accept:function(a) {
  if (!a.L || !a.pending.length) {
    throw new G(28);
  }
  var b = a.pending.shift();
  b.stream.flags = a.stream.flags;
  return b;
}, sd:function(a, b) {
  if (b) {
    if (void 0 === a.O || void 0 === a.P) {
      throw new G(53);
    }
    b = a.O;
    a = a.P;
  } else {
    b = a.cb || 0, a = a.ka || 0;
  }
  return {A:b, port:a};
}, Fb:function(a, b, c, d, e, f) {
  if (2 === a.type) {
    if (void 0 === e || void 0 === f) {
      e = a.O, f = a.P;
    }
    if (void 0 === e || void 0 === f) {
      throw new G(17);
    }
  } else {
    e = a.O, f = a.P;
  }
  var g = mb.G.za(a, e, f);
  if (1 === a.type) {
    if (!g || g.i.readyState === g.i.CLOSING || g.i.readyState === g.i.CLOSED) {
      throw new G(53);
    }
    if (g.i.readyState === g.i.CONNECTING) {
      throw new G(6);
    }
  }
  ArrayBuffer.isView(b) && (c += b.byteOffset, b = b.buffer);
  var k;
  b instanceof SharedArrayBuffer ? k = (new Uint8Array(new Uint8Array(b.slice(c, c + d)))).buffer : k = b.slice(c, c + d);
  if (2 === a.type && (!g || g.i.readyState !== g.i.OPEN)) {
    return g && g.i.readyState !== g.i.CLOSING && g.i.readyState !== g.i.CLOSED || (g = mb.G.nb(a, e, f)), g.xa.push(k), d;
  }
  try {
    return g.i.send(k), d;
  } catch (l) {
    throw new G(28);
  }
}, Db:function(a, b) {
  if (1 === a.type && a.L) {
    throw new G(53);
  }
  var c = a.ia.shift();
  if (!c) {
    if (1 === a.type) {
      a = mb.G.za(a, a.O, a.P);
      if (!a) {
        throw new G(53);
      }
      if (a.i.readyState === a.i.CLOSING || a.i.readyState === a.i.CLOSED) {
        return null;
      }
    }
    throw new G(6);
  }
  var d = c.data.byteLength || c.data.length, e = c.data.byteOffset || 0, f = c.data.buffer || c.data;
  b = Math.min(b, d);
  var g = {buffer:new Uint8Array(f, e, b), A:c.A, port:c.port};
  1 === a.type && b < d && (c.data = new Uint8Array(f, e + b, d - b), a.ia.unshift(c));
  return g;
}}};
function xd(a) {
  a = mb.lc(a);
  if (!a) {
    throw new G(8);
  }
  return a;
}
function yd(a) {
  a = a.split(".");
  for (var b = 0; 4 > b; b++) {
    var c = Number(a[b]);
    if (isNaN(c)) {
      return null;
    }
    a[b] = c;
  }
  return (a[0] | a[1] << 8 | a[2] << 16 | a[3] << 24) >>> 0;
}
function zd(a) {
  var b, c, d = [];
  if (!/^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i.test(a)) {
    return null;
  }
  if ("::" === a) {
    return [0, 0, 0, 0, 0, 0, 0, 0];
  }
  a = a.startsWith("::") ? a.replace("::", "Z:") : a.replace("::", ":Z:");
  0 < a.indexOf(".") ? (a = a.replace(RegExp("[.]", "g"), ":"), a = a.split(":"), a[a.length - 4] = parseInt(a[a.length - 4]) + 256 * parseInt(a[a.length - 3]), a[a.length - 3] = parseInt(a[a.length - 2]) + 256 * parseInt(a[a.length - 1]), a = a.slice(0, a.length - 2)) : a = a.split(":");
  for (b = c = 0; b < a.length; b++) {
    if ("string" == typeof a[b]) {
      if ("Z" === a[b]) {
        for (c = 0; c < 8 - a.length + 1; c++) {
          d[b + c] = 0;
        }
        --c;
      } else {
        d[b + c] = Ad(parseInt(a[b], 16));
      }
    } else {
      d[b + c] = a[b];
    }
  }
  return [d[1] << 16 | d[0], d[3] << 16 | d[2], d[5] << 16 | d[4], d[7] << 16 | d[6]];
}
function Bd(a, b, c, d, e) {
  switch(b) {
    case 2:
      c = yd(c);
      Gb(a, 16);
      e && (m()[e >> 2] = 16);
      ia()[a >> 1] = b;
      m()[a + 4 >> 2] = c;
      ia()[a + 2 >> 1] = Ad(d);
      break;
    case 10:
      c = zd(c);
      Gb(a, 28);
      e && (m()[e >> 2] = 28);
      m()[a >> 2] = b;
      m()[a + 8 >> 2] = c[0];
      m()[a + 12 >> 2] = c[1];
      m()[a + 16 >> 2] = c[2];
      m()[a + 20 >> 2] = c[3];
      ia()[a + 2 >> 1] = Ad(d);
      break;
    default:
      return 5;
  }
  return 0;
}
var Cd = 1, Dd = {}, Ed = {};
function Fd(a) {
  var b = yd(a);
  if (null !== b) {
    return a;
  }
  b = zd(a);
  if (null !== b) {
    return a;
  }
  Dd[a] ? b = Dd[a] : (b = Cd++, w(65535 > b, "exceeded max address mappings of 65535"), b = "172.29." + (b & 255) + "." + (b & 65280), Ed[b] = a, Dd[a] = b);
  return b;
}
function Gd(a, b, c, d, e, f) {
  if (t) {
    return L(5, 1, a, b, c, d, e, f);
  }
  try {
    var g = xd(a), k = g.F.accept(g);
    if (b) {
      var l = Bd(b, k.family, Fd(k.O), k.P, c);
      w(!l);
    }
    return k.stream.m;
  } catch (r) {
    if ("undefined" == typeof J || "ErrnoError" !== r.name) {
      throw r;
    }
    return -r.g;
  }
}
function Hd(a) {
  return (a & 255) + "." + (a >> 8 & 255) + "." + (a >> 16 & 255) + "." + (a >> 24 & 255);
}
function Id(a) {
  var b = "", c, d = 0, e = 0, f = 0, g = 0;
  a = [a[0] & 65535, a[0] >> 16, a[1] & 65535, a[1] >> 16, a[2] & 65535, a[2] >> 16, a[3] & 65535, a[3] >> 16];
  var k = !0;
  for (c = 0; 5 > c; c++) {
    if (0 !== a[c]) {
      k = !1;
      break;
    }
  }
  if (k) {
    c = Hd(a[6] | a[7] << 16);
    if (-1 === a[5]) {
      return "::ffff:" + c;
    }
    if (0 === a[5]) {
      return "0.0.0.0" === c && (c = ""), "0.0.0.1" === c && (c = "1"), "::" + c;
    }
  }
  for (c = 0; 8 > c; c++) {
    0 === a[c] && (1 < c - e && (g = 0), e = c, g++), g > d && (d = g, f = c - d + 1);
  }
  for (c = 0; 8 > c; c++) {
    1 < d && 0 === a[c] && c >= f && c < f + d ? c === f && (b += ":", 0 === f && (b += ":")) : (b += Number(Jd(a[c] & 65535)).toString(16), b += 7 > c ? ":" : "");
  }
  return b;
}
function Kd(a, b) {
  var c = ia()[a >> 1], d = Jd(la()[a + 2 >> 1]);
  switch(c) {
    case 2:
      if (16 !== b) {
        return {g:28};
      }
      a = m()[a + 4 >> 2];
      a = Hd(a);
      break;
    case 10:
      if (28 !== b) {
        return {g:28};
      }
      a = [m()[a + 8 >> 2], m()[a + 12 >> 2], m()[a + 16 >> 2], m()[a + 20 >> 2]];
      a = Id(a);
      break;
    default:
      return {g:5};
  }
  return {family:c, A:a, port:d};
}
function Ld(a, b, c) {
  if (c && 0 === a) {
    return null;
  }
  a = Kd(a, b);
  if (a.g) {
    throw new G(a.g);
  }
  b = a.A;
  a.A = (Ed[b] ? Ed[b] : null) || a.A;
  return a;
}
function Md(a, b, c, d, e, f) {
  if (t) {
    return L(6, 1, a, b, c, d, e, f);
  }
  try {
    var g = xd(a), k = Ld(b, c);
    g.F.bind(g, k.A, k.port);
    return 0;
  } catch (l) {
    if ("undefined" == typeof J || "ErrnoError" !== l.name) {
      throw l;
    }
    return -l.g;
  }
}
function Nd(a) {
  if (t) {
    return L(7, 1, a);
  }
  try {
    a = K(a);
    var b = kc(a, {S:!0});
    if (null === b.node) {
      throw new G(44);
    }
    if (16384 !== (b.node.mode & 61440)) {
      throw new G(54);
    }
    var c = Ec(b.node, "x");
    if (c) {
      throw new G(c);
    }
    Pb = b.path;
    return 0;
  } catch (d) {
    if ("undefined" == typeof J || "ErrnoError" !== d.name) {
      throw d;
    }
    return -d.g;
  }
}
function Od(a, b) {
  if (t) {
    return L(8, 1, a, b);
  }
  try {
    return a = K(a), nc(a, b), 0;
  } catch (c) {
    if ("undefined" == typeof J || "ErrnoError" !== c.name) {
      throw c;
    }
    return -c.g;
  }
}
function Qd(a, b, c, d, e, f) {
  if (t) {
    return L(9, 1, a, b, c, d, e, f);
  }
  try {
    var g = xd(a), k = Ld(b, c);
    g.F.connect(g, k.A, k.port);
    return 0;
  } catch (l) {
    if ("undefined" == typeof J || "ErrnoError" !== l.name) {
      throw l;
    }
    return -l.g;
  }
}
function Rd(a, b, c, d) {
  if (t) {
    return L(10, 1, a, b, c, d);
  }
  try {
    b = K(b);
    w(0 === d);
    b = Yc(a, b);
    if (c & -8) {
      return -28;
    }
    var e = kc(b, {S:!0}).node;
    if (!e) {
      return -44;
    }
    a = "";
    c & 4 && (a += "r");
    c & 2 && (a += "w");
    c & 1 && (a += "x");
    return a && Ec(e, a) ? -2 : 0;
  } catch (f) {
    if ("undefined" == typeof J || "ErrnoError" !== f.name) {
      throw f;
    }
    return -f.g;
  }
}
function Sd(a, b) {
  if (t) {
    return L(11, 1, a, b);
  }
  try {
    var c = vc[a];
    if (!c) {
      throw new G(8);
    }
    nc(c.node, b);
    return 0;
  } catch (d) {
    if ("undefined" == typeof J || "ErrnoError" !== d.name) {
      throw d;
    }
    return -d.g;
  }
}
function Td(a, b, c) {
  if (t) {
    return L(12, 1, a, b, c);
  }
  ad = c;
  try {
    var d = Zc(a);
    switch(b) {
      case 0:
        var e = bd();
        return 0 > e ? -28 : Lc(d, e).m;
      case 1:
      case 2:
        return 0;
      case 3:
        return d.flags;
      case 4:
        return e = bd(), d.flags |= e, 0;
      case 5:
        return e = bd(), ia()[e + 0 >> 1] = 2, 0;
      case 6:
      case 7:
        return 0;
      case 16:
      case 8:
        return -28;
      case 9:
        return m()[Ud() >> 2] = 28, -1;
      default:
        return -28;
    }
  } catch (f) {
    if ("undefined" == typeof J || "ErrnoError" !== f.name) {
      throw f;
    }
    return -f.g;
  }
}
function Vd(a, b, c) {
  w("number" == typeof c, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  return Sb(a, fa(), b, c);
}
function Wd(a, b) {
  if (t) {
    return L(13, 1, a, b);
  }
  try {
    if (0 === b) {
      return -28;
    }
    var c = Pb, d = Rb(c) + 1;
    if (b < d) {
      return -68;
    }
    Vd(c, a, b);
    return d;
  } catch (e) {
    if ("undefined" == typeof J || "ErrnoError" !== e.name) {
      throw e;
    }
    return -e.g;
  }
}
function Xd(a, b, c) {
  if (t) {
    return L(14, 1, a, b, c);
  }
  try {
    var d = Zc(a);
    d.Y || (d.Y = ic(d.path));
    a = 0;
    for (var e = Vc(d, 0, 1), f = Math.floor(e / 280); f < d.Y.length && a + 280 <= c;) {
      var g = d.Y[f];
      if ("." === g) {
        var k = d.node.id;
        var l = 4;
      } else if (".." === g) {
        k = kc(d.path, {parent:!0}).node.id, l = 4;
      } else {
        var r = ec(d.node, g);
        k = r.id;
        l = 8192 === (r.mode & 61440) ? 2 : 16384 === (r.mode & 61440) ? 4 : 40960 === (r.mode & 61440) ? 10 : 8;
      }
      w(k);
      D = [k >>> 0, (A = k, 1 <= +Math.abs(A) ? 0 < A ? +Math.floor(A / 4294967296) >>> 0 : ~~+Math.ceil((A - +(~~A >>> 0)) / 4294967296) >>> 0 : 0)];
      m()[b + a >> 2] = D[0];
      m()[b + a + 4 >> 2] = D[1];
      D = [280 * (f + 1) >>> 0, (A = 280 * (f + 1), 1 <= +Math.abs(A) ? 0 < A ? +Math.floor(A / 4294967296) >>> 0 : ~~+Math.ceil((A - +(~~A >>> 0)) / 4294967296) >>> 0 : 0)];
      m()[b + a + 8 >> 2] = D[0];
      m()[b + a + 12 >> 2] = D[1];
      ia()[b + a + 16 >> 1] = 280;
      h()[b + a + 18 >> 0] = l;
      Vd(g, b + a + 19, 256);
      a += 280;
      f += 1;
    }
    Vc(d, 280 * f, 0);
    return a;
  } catch (v) {
    if ("undefined" == typeof J || "ErrnoError" !== v.name) {
      throw v;
    }
    return -v.g;
  }
}
function Yd(a, b, c, d, e, f) {
  if (t) {
    return L(15, 1, a, b, c, d, e, f);
  }
  try {
    var g = xd(a), k = Bd(b, g.family, Fd(g.cb || "0.0.0.0"), g.ka, c);
    w(!k);
    return 0;
  } catch (l) {
    if ("undefined" == typeof J || "ErrnoError" !== l.name) {
      throw l;
    }
    return -l.g;
  }
}
function Zd(a, b, c, d, e, f) {
  if (t) {
    return L(16, 1, a, b, c, d, e, f);
  }
  try {
    var g = xd(a);
    return 1 === b && 4 === c ? (m()[d >> 2] = g.error, m()[e >> 2] = 4, g.error = null, 0) : -50;
  } catch (k) {
    if ("undefined" == typeof J || "ErrnoError" !== k.name) {
      throw k;
    }
    return -k.g;
  }
}
function $d(a, b, c) {
  if (t) {
    return L(17, 1, a, b, c);
  }
  ad = c;
  try {
    var d = Zc(a);
    switch(b) {
      case 21509:
      case 21505:
        return d.o ? 0 : -59;
      case 21510:
      case 21511:
      case 21512:
      case 21506:
      case 21507:
      case 21508:
        return d.o ? 0 : -59;
      case 21519:
        if (!d.o) {
          return -59;
        }
        var e = bd();
        return m()[e >> 2] = 0;
      case 21520:
        return d.o ? -28 : -59;
      case 21531:
        a = e = bd();
        if (!d.j.Aa) {
          throw new G(59);
        }
        return d.j.Aa(d, b, a);
      case 21523:
        return d.o ? 0 : -59;
      case 21524:
        return d.o ? 0 : -59;
      default:
        return -28;
    }
  } catch (f) {
    if ("undefined" == typeof J || "ErrnoError" !== f.name) {
      throw f;
    }
    return -f.g;
  }
}
function ae(a, b) {
  if (t) {
    return L(18, 1, a, b);
  }
  try {
    var c = xd(a);
    c.F.vb(c, b);
    return 0;
  } catch (d) {
    if ("undefined" == typeof J || "ErrnoError" !== d.name) {
      throw d;
    }
    return -d.g;
  }
}
function be(a, b) {
  if (t) {
    return L(19, 1, a, b);
  }
  try {
    return a = K(a), $c(Sc, a, b);
  } catch (c) {
    if ("undefined" == typeof J || "ErrnoError" !== c.name) {
      throw c;
    }
    return -c.g;
  }
}
function ce(a, b, c) {
  if (t) {
    return L(20, 1, a, b, c);
  }
  try {
    return b = K(b), b = Yc(a, b), b = Jb(b), "/" === b[b.length - 1] && (b = b.substr(0, b.length - 1)), Qc(b, c), 0;
  } catch (d) {
    if ("undefined" == typeof J || "ErrnoError" !== d.name) {
      throw d;
    }
    return -d.g;
  }
}
function de(a, b, c, d) {
  if (t) {
    return L(21, 1, a, b, c, d);
  }
  try {
    b = K(b);
    var e = d & 256, f = d & 4096;
    d &= -6401;
    w(!d, "unknown flags in __syscall_newfstatat: " + d);
    b = Yc(a, b, f);
    return $c(e ? Sc : jc, b, c);
  } catch (g) {
    if ("undefined" == typeof J || "ErrnoError" !== g.name) {
      throw g;
    }
    return -g.g;
  }
}
function ee(a, b, c, d) {
  if (t) {
    return L(22, 1, a, b, c, d);
  }
  ad = d;
  try {
    b = K(b);
    b = Yc(a, b);
    var e = d ? bd() : 0;
    return kb(b, c, e).m;
  } catch (f) {
    if ("undefined" == typeof J || "ErrnoError" !== f.name) {
      throw f;
    }
    return -f.g;
  }
}
function fe(a, b, c) {
  if (t) {
    return L(23, 1, a, b, c);
  }
  try {
    for (var d = c = 0; d < b; d++) {
      var e = a + 8 * d, f = m()[e >> 2], g = ia()[e + 4 >> 1], k = 32, l = vc[f];
      l && (k = 5, l.j.ha && (k = l.j.ha(l)));
      (k &= g | 24) && c++;
      ia()[e + 6 >> 1] = k;
    }
    return c;
  } catch (r) {
    if ("undefined" == typeof J || "ErrnoError" !== r.name) {
      throw r;
    }
    return -r.g;
  }
}
function ge(a, b, c, d) {
  if (t) {
    return L(24, 1, a, b, c, d);
  }
  try {
    b = K(b);
    b = Yc(a, b);
    if (0 >= d) {
      return -28;
    }
    var e = zc(b), f = Math.min(d, Rb(e)), g = h()[c + f];
    Vd(e, c, d + 1);
    h()[c + f] = g;
    return f;
  } catch (k) {
    if ("undefined" == typeof J || "ErrnoError" !== k.name) {
      throw k;
    }
    return -k.g;
  }
}
function he(a, b, c, d, e, f) {
  if (t) {
    return L(25, 1, a, b, c, d, e, f);
  }
  try {
    var g = xd(a), k = g.F.Db(g, c);
    if (!k) {
      return 0;
    }
    if (e) {
      var l = Bd(e, g.family, Fd(k.A), k.port, f);
      w(!l);
    }
    fa().set(k.buffer, b);
    return k.buffer.byteLength;
  } catch (r) {
    if ("undefined" == typeof J || "ErrnoError" !== r.name) {
      throw r;
    }
    return -r.g;
  }
}
function ie(a, b, c, d) {
  if (t) {
    return L(26, 1, a, b, c, d);
  }
  try {
    b = K(b);
    d = K(d);
    b = Yc(a, b);
    d = Yc(c, d);
    a = b;
    var e = Kb(a), f = Kb(d), g = Lb(a), k = Lb(d);
    var l = kc(a, {parent:!0});
    var r = l.node;
    l = kc(d, {parent:!0});
    var v = l.node;
    if (!r || !v) {
      throw new G(44);
    }
    if (r.u !== v.u) {
      throw new G(75);
    }
    var B = ec(r, g), E = Qb(a, f);
    if ("." !== E.charAt(0)) {
      throw new G(28);
    }
    E = Qb(d, e);
    if ("." !== E.charAt(0)) {
      throw new G(55);
    }
    try {
      var u = ec(v, k);
    } catch (O) {
    }
    if (B !== u) {
      var C = 16384 === (B.mode & 61440), y = Ic(r, g, C);
      if (y) {
        throw new G(y);
      }
      if (y = u ? Ic(v, k, C) : Hc(v, k)) {
        throw new G(y);
      }
      if (!r.h.Ja) {
        throw new G(63);
      }
      if (B.I || u && u.I) {
        throw new G(10);
      }
      if (v !== r && (y = Ec(r, "w"))) {
        throw new G(y);
      }
      Dc(B);
      try {
        r.h.Ja(B, v, k);
      } catch (O) {
        throw O;
      } finally {
        Cc(B);
      }
    }
    return 0;
  } catch (O) {
    if ("undefined" == typeof J || "ErrnoError" !== O.name) {
      throw O;
    }
    return -O.g;
  }
}
function je(a) {
  if (t) {
    return L(27, 1, a);
  }
  try {
    return a = K(a), oc(a), 0;
  } catch (b) {
    if ("undefined" == typeof J || "ErrnoError" !== b.name) {
      throw b;
    }
    return -b.g;
  }
}
function ke(a, b, c, d, e, f) {
  if (t) {
    return L(28, 1, a, b, c, d, e, f);
  }
  try {
    var g = xd(a), k = Ld(e, f, !0);
    return k ? g.F.Fb(g, h(), b, c, k.A, k.port) : Wc(g.stream, h(), b, c);
  } catch (l) {
    if ("undefined" == typeof J || "ErrnoError" !== l.name) {
      throw l;
    }
    return -l.g;
  }
}
function le(a, b, c) {
  if (t) {
    return L(29, 1, a, b, c);
  }
  try {
    var d = mb.Yb(a, b, c);
    w(64 > d.stream.m);
    return d.stream.m;
  } catch (e) {
    if ("undefined" == typeof J || "ErrnoError" !== e.name) {
      throw e;
    }
    return -e.g;
  }
}
function me(a, b) {
  if (t) {
    return L(30, 1, a, b);
  }
  try {
    return a = K(a), $c(jc, a, b);
  } catch (c) {
    if ("undefined" == typeof J || "ErrnoError" !== c.name) {
      throw c;
    }
    return -c.g;
  }
}
function ne(a, b, c) {
  if (t) {
    return L(31, 1, a, b, c);
  }
  try {
    return K(a), w(64 === b), m()[c + 4 >> 2] = 4096, m()[c + 40 >> 2] = 4096, m()[c + 8 >> 2] = 1e6, m()[c + 12 >> 2] = 5e5, m()[c + 16 >> 2] = 5e5, m()[c + 20 >> 2] = wc, m()[c + 24 >> 2] = 1e6, m()[c + 28 >> 2] = 42, m()[c + 44 >> 2] = 2, m()[c + 36 >> 2] = 255, 0;
  } catch (d) {
    if ("undefined" == typeof J || "ErrnoError" !== d.name) {
      throw d;
    }
    return -d.g;
  }
}
function oe(a, b) {
  if (t) {
    return L(32, 1, a, b);
  }
  try {
    return a = K(a), b = K(b), jb(a, b), 0;
  } catch (c) {
    if ("undefined" == typeof J || "ErrnoError" !== c.name) {
      throw c;
    }
    return -c.g;
  }
}
function pe(a, b, c) {
  if (t) {
    return L(33, 1, a, b, c);
  }
  try {
    return b = K(b), b = Yc(a, b), 0 === c ? pc(b) : 512 === c ? oc(b) : ua("Invalid flags passed to unlinkat"), 0;
  } catch (d) {
    if ("undefined" == typeof J || "ErrnoError" !== d.name) {
      throw d;
    }
    return -d.g;
  }
}
function qe() {
  if (!cb && !eb()) {
    try {
      t ? sd(Oa) : dd(Oa);
    } catch (a) {
      hd(a);
    }
  }
}
function re(a) {
  if (cb || Na) {
    x("user callback triggered after runtime exited or application aborted.  Ignoring.");
  } else {
    try {
      a(), qe();
    } catch (b) {
      hd(b);
    }
  }
}
function se(a) {
  if ("function" === typeof Atomics.$c) {
    var b = Atomics.$c(m(), a >> 2, a);
    w(b.async);
    b.value.then(md);
    a += 128;
    Atomics.store(m(), a >> 2, 1);
  }
}
q.__emscripten_thread_mailbox_await = se;
function md() {
  var a = ld();
  a && (se(a), re(() => te()));
}
q.checkMailbox = md;
function ue(a) {
  var b = a.getExtension("ANGLE_instanced_arrays");
  b && (a.vertexAttribDivisor = function(c, d) {
    b.vertexAttribDivisorANGLE(c, d);
  }, a.drawArraysInstanced = function(c, d, e, f) {
    b.drawArraysInstancedANGLE(c, d, e, f);
  }, a.drawElementsInstanced = function(c, d, e, f, g) {
    b.drawElementsInstancedANGLE(c, d, e, f, g);
  });
}
function ve(a) {
  var b = a.getExtension("OES_vertex_array_object");
  b && (a.createVertexArray = function() {
    return b.createVertexArrayOES();
  }, a.deleteVertexArray = function(c) {
    b.deleteVertexArrayOES(c);
  }, a.bindVertexArray = function(c) {
    b.bindVertexArrayOES(c);
  }, a.isVertexArray = function(c) {
    return b.isVertexArrayOES(c);
  });
}
function we(a) {
  var b = a.getExtension("WEBGL_draw_buffers");
  b && (a.drawBuffers = function(c, d) {
    b.drawBuffersWEBGL(c, d);
  });
}
function xe(a) {
  a.ld = a.getExtension("WEBGL_draw_instanced_base_vertex_base_instance");
}
function ye(a) {
  a.vd = a.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance");
}
function ze(a) {
  a.yd = a.getExtension("WEBGL_multi_draw");
}
var Ae = 1, Be = [], Ce = [], De = [], Ee = [], Fe = [], Ge = [], He = [], Ie = {}, Je = [], Ke = [], Le = {}, Me = {}, Ne = 4;
function N(a) {
  Oe ||= a;
}
function Pe(a) {
  for (var b = Ae++, c = a.length; c < b; c++) {
    a[c] = null;
  }
  return b;
}
function Qe(a, b) {
  b.Ka && (b.preserveDrawingBuffer = !0);
  var c = 1 < b.Xa ? a.getContext("webgl2", b) : a.getContext("webgl", b);
  if (c) {
    a = Re(8);
    m()[a + 4 >> 2] = ld();
    var d = {pc:a, attributes:b, version:b.Xa, v:c};
    c.canvas && (c.canvas.V = d);
    Ie[a] = d;
    ("undefined" == typeof b.qb || b.qb) && Se(d);
    if (b.Ka) {
      b = d.v;
      c = b.createFramebuffer();
      b.bindFramebuffer(36160, c);
      d.Ua = c;
      d.ob = !1;
      b.getContextAttributes().antialias && (d.ob = !0);
      d.ma = b.createTexture();
      d.va = b.createRenderbuffer();
      Te(d);
      b.bindTexture(3553, d.ma);
      b.texParameteri(3553, 10241, 9728);
      b.texParameteri(3553, 10240, 9728);
      b.texParameteri(3553, 10242, 33071);
      b.texParameteri(3553, 10243, 33071);
      b.texImage2D(3553, 0, 6408, b.canvas.width, b.canvas.height, 0, 6408, 5121, null);
      b.framebufferTexture2D(36160, 36064, 3553, d.ma, 0);
      b.bindTexture(3553, null);
      b.bindRenderbuffer(36161, d.va);
      b.renderbufferStorage(36161, 33189, b.canvas.width, b.canvas.height);
      b.framebufferRenderbuffer(36160, 36096, 36161, d.va);
      b.bindRenderbuffer(36161, null);
      c = b.createBuffer();
      b.bindBuffer(34962, c);
      b.bufferData(34962, new Float32Array([-1, -1, -1, 1, 1, -1, 1, 1]), 35044);
      b.bindBuffer(34962, null);
      d.Tb = c;
      c = b.createShader(35633);
      b.shaderSource(c, "attribute vec2 pos;varying lowp vec2 tex;void main() { tex = pos * 0.5 + vec2(0.5,0.5); gl_Position = vec4(pos, 0.0, 1.0); }");
      b.compileShader(c);
      var e = b.createShader(35632);
      b.shaderSource(e, "varying lowp vec2 tex;uniform sampler2D sampler;void main() { gl_FragColor = texture2D(sampler, tex); }");
      b.compileShader(e);
      var f = b.createProgram();
      b.attachShader(f, c);
      b.attachShader(f, e);
      b.linkProgram(f);
      d.Sb = f;
      d.H = b.getAttribLocation(f, "pos");
      b.useProgram(f);
      b.uniform1i(b.getUniformLocation(f, "sampler"), 0);
      b.useProgram(null);
      d.wa = void 0;
      b.createVertexArray && (d.wa = b.createVertexArray(), b.bindVertexArray(d.wa), b.enableVertexAttribArray(d.H), b.bindVertexArray(null));
    }
  } else {
    a = 0;
  }
  return a;
}
function Te(a) {
  var b = a.v;
  if (a.ma) {
    var c = b.getParameter(32873);
    b.bindTexture(3553, a.ma);
    b.texImage2D(3553, 0, 6408, b.drawingBufferWidth, b.drawingBufferHeight, 0, 6408, 5121, null);
    b.bindTexture(3553, c);
  }
  a.va && (c = b.getParameter(36007), b.bindRenderbuffer(36161, a.va), b.renderbufferStorage(36161, 33189, b.drawingBufferWidth, b.drawingBufferHeight), b.bindRenderbuffer(36161, c));
}
function Ue() {
  var a = P, b = a.v, c = b.getParameter(3089);
  c && b.disable(3089);
  var d = b.getParameter(36006);
  if (b.blitFramebuffer && !a.ob) {
    b.bindFramebuffer(36008, a.Ua), b.bindFramebuffer(36009, null), b.blitFramebuffer(0, 0, b.canvas.width, b.canvas.height, 0, 0, b.canvas.width, b.canvas.height, 16384, 9728);
  } else {
    b.bindFramebuffer(36160, null);
    var e = b.getParameter(35725);
    b.useProgram(a.Sb);
    var f = b.getParameter(34964);
    b.bindBuffer(34962, a.Tb);
    var g = b.getParameter(34016);
    b.activeTexture(33984);
    var k = b.getParameter(32873);
    b.bindTexture(3553, a.ma);
    var l = b.getParameter(3042);
    l && b.disable(3042);
    var r = b.getParameter(2884);
    r && b.disable(2884);
    var v = b.getParameter(2929);
    v && b.disable(2929);
    var B = b.getParameter(2960);
    B && b.disable(2960);
    function aa() {
      b.vertexAttribPointer(a.H, 2, 5126, !1, 0, 0);
      b.drawArrays(5, 0, 4);
    }
    if (a.wa) {
      var E = b.getParameter(34229);
      b.bindVertexArray(a.wa);
      aa();
      b.bindVertexArray(E);
    } else {
      E = {buffer:b.getVertexAttrib(a.H, 34975), size:b.getVertexAttrib(a.H, 34339), Sc:b.getVertexAttrib(a.H, 34340), type:b.getVertexAttrib(a.H, 34341), Bc:b.getVertexAttrib(a.H, 34922), Cd:b.getVertexAttribOffset(a.H, 34373)};
      for (var u = b.getParameter(34921), C = [], y = 0; y < u; ++y) {
        var O = b.getVertexAttrib(y, 34338), ca = y == a.H;
        O && !ca && b.disableVertexAttribArray(y);
        !O && ca && b.enableVertexAttribArray(y);
        C[y] = O;
      }
      aa();
      for (y = 0; y < u; ++y) {
        O = C[y], ca = y == a.H, O && !ca && b.enableVertexAttribArray(y), !O && ca && b.disableVertexAttribArray(y);
      }
      b.bindBuffer(34962, E.buffer);
      b.vertexAttribPointer(a.H, E.size, E.type, E.Bc, E.Sc, E.offset);
    }
    B && b.enable(2960);
    v && b.enable(2929);
    r && b.enable(2884);
    l && b.enable(3042);
    b.bindTexture(3553, k);
    b.activeTexture(g);
    b.bindBuffer(34962, f);
    b.useProgram(e);
  }
  b.bindFramebuffer(36160, d);
  c && b.enable(3089);
}
function Ve(a) {
  P = Ie[a];
  q.la = Q = P && P.v;
  return !(a && !Q);
}
function Se(a) {
  a ||= P;
  if (!a.tc) {
    a.tc = !0;
    var b = a.v;
    ue(b);
    ve(b);
    we(b);
    xe(b);
    ye(b);
    2 <= a.version && (b.pb = b.getExtension("EXT_disjoint_timer_query_webgl2"));
    if (2 > a.version || !b.pb) {
      b.pb = b.getExtension("EXT_disjoint_timer_query");
    }
    ze(b);
    (b.getSupportedExtensions() || []).forEach(function(c) {
      c.includes("lose_context") || c.includes("debug") || b.getExtension(c);
    });
  }
}
var We = {}, Oe, P;
function Xe(a) {
  return n()[a >> 2] + 4294967296 * m()[a + 4 >> 2];
}
function Ye(a) {
  return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400);
}
var Ze = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], $e = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], af = {}, bf;
bf = () => performance.timeOrigin + performance.now();
function cf(a, b) {
  if (t) {
    return L(34, 1, a, b);
  }
  af[a] && (clearTimeout(af[a].id), delete af[a]);
  if (!b) {
    return 0;
  }
  var c = setTimeout(() => {
    w(a in af);
    delete af[a];
    re(() => df(a, bf()));
  }, b);
  af[a] = {id:c, Ld:b};
  return 0;
}
function ef(a) {
  var b = Rb(a) + 1, c = Re(b);
  c && Vd(a, c, b);
  return c;
}
function ff(a, b) {
  gf = a;
  hf = b;
  if (jf) {
    if (kf || (db += 1, kf = !0), 0 == a) {
      lf = function() {
        var d = Math.max(0, mf + b - bf()) | 0;
        setTimeout(nf, d);
      }, of = "timeout";
    } else if (1 == a) {
      lf = function() {
        pf(nf);
      }, of = "rAF";
    } else if (2 == a) {
      if ("undefined" == typeof setImmediate) {
        var c = [];
        addEventListener("message", d => {
          if ("setimmediate" === d.data || "setimmediate" === d.data.target) {
            d.stopPropagation(), c.shift()();
          }
        }, !0);
        setImmediate = function(d) {
          c.push(d);
          Aa ? (void 0 === q.setImmediates && (q.setImmediates = []), q.setImmediates.push(d), postMessage({target:"setimmediate"})) : postMessage("setimmediate", "*");
        };
      }
      lf = function() {
        setImmediate(nf);
      };
      of = "immediate";
    }
  } else {
    x("emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up.");
  }
}
function qf() {
  w(0 < db);
  --db;
}
function rf(a, b, c, d, e) {
  function f() {
    return g < sf ? (qf(), qe(), !1) : !0;
  }
  w(!jf, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
  jf = a;
  tf = d;
  var g = sf;
  kf = !1;
  nf = function() {
    if (!Na) {
      if (0 < uf.length) {
        var k = Date.now(), l = uf.shift();
        l.pd(l.kb);
        if (vf) {
          var r = vf, v = 0 == r % 1 ? r - 1 : Math.floor(r);
          vf = l.jd ? v : (8 * r + (v + .5)) / 9;
        }
        Ha('main loop blocker "' + l.name + '" took ' + (Date.now() - k) + " ms");
        q.setStatus && (k = q.statusMessage || "Please wait...", l = vf, r = wf.od, l ? l < r ? q.setStatus(k + " (" + (r - l) + "/" + r + ")") : q.setStatus(k) : q.setStatus(""));
        f() && setTimeout(nf, 0);
      } else {
        f() && (xf = xf + 1 | 0, 1 == gf && 1 < hf && 0 != xf % hf ? lf() : (0 == gf && (mf = bf()), "timeout" === of && q.la && (Cb("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!"), of = ""), Na || q.preMainLoop && !1 === q.preMainLoop() || (re(a), q.postMainLoop && q.postMainLoop()), Ta(), f() && ("object" == typeof SDL && 
        SDL.audio && SDL.audio.Dc && SDL.audio.Dc(), lf())));
      }
    }
  };
  e || (b && 0 < b ? ff(0, 1e3 / b) : ff(1, 1), lf());
  if (c) {
    throw "unwind";
  }
}
function yf(a) {
  db += 1;
  setTimeout(() => {
    qf();
    re(a);
  }, 1e4);
}
var kf = !1, lf = null, of = "", sf = 0, jf = null, tf = 0, gf = 0, hf = 0, xf = 0, uf = [];
function zf() {
  sf++;
  var a = gf, b = hf, c = jf;
  jf = null;
  rf(c, 0, !1, tf, !0);
  ff(a, b);
  lf();
}
var wf = {}, mf, nf, vf, Af = !1, Bf = !1, Cf = [];
function Df() {
  function a() {
    Bf = document.pointerLockElement === q.canvas || document.mozPointerLockElement === q.canvas || document.webkitPointerLockElement === q.canvas || document.msPointerLockElement === q.canvas;
  }
  if (!Ef) {
    Ef = !0;
    gc.push({canHandle:function(c) {
      return !q.Ad && /\.(jpg|jpeg|png|bmp)$/i.test(c);
    }, handle:function(c, d, e, f) {
      var g = new Blob([c], {type:Ff(d)});
      g.size !== c.length && (g = new Blob([(new Uint8Array(c)).buffer], {type:Ff(d)}));
      var k = URL.createObjectURL(g);
      w("string" == typeof k, "createObjectURL must return a url as a string");
      var l = new Image();
      l.onload = () => {
        w(l.complete, "Image " + d + " could not be decoded");
        var r = document.createElement("canvas");
        r.width = l.width;
        r.height = l.height;
        r.getContext("2d").drawImage(l, 0, 0);
        URL.revokeObjectURL(k);
        e && e(c);
      };
      l.onerror = () => {
        Ha("Image " + k + " could not be decoded");
        f && f();
      };
      l.src = k;
    }});
    gc.push({canHandle:function(c) {
      return !q.zd && c.substr(-4) in {".ogg":1, ".wav":1, ".mp3":1};
    }, handle:function(c, d, e) {
      function f() {
        g || (g = !0, e && e(c));
      }
      var g = !1, k = URL.createObjectURL(new Blob([c], {type:Ff(d)}));
      w("string" == typeof k, "createObjectURL must return a url as a string");
      var l = new Audio();
      l.addEventListener("canplaythrough", () => f(l), !1);
      l.onerror = function() {
        if (!g) {
          x("warning: browser could not fully decode audio " + d + ", trying slower base64 approach");
          for (var r = "", v = 0, B = 0, E = 0; E < c.length; E++) {
            for (v = v << 8 | c[E], B += 8; 6 <= B;) {
              var u = v >> B - 6 & 63;
              B -= 6;
              r += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[u];
            }
          }
          2 == B ? (r += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(v & 3) << 4], r += "==") : 4 == B && (r += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(v & 15) << 2], r += "=");
          l.src = "data:audio/x-" + d.substr(-3) + ";base64," + r;
          f(l);
        }
      };
      l.src = k;
      yf(() => {
        f(l);
      });
    }});
    var b = q.canvas;
    b && (b.requestPointerLock = b.requestPointerLock || b.mozRequestPointerLock || b.webkitRequestPointerLock || b.msRequestPointerLock || (() => {
    }), b.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock || document.msExitPointerLock || (() => {
    }), b.exitPointerLock = b.exitPointerLock.bind(document), document.addEventListener("pointerlockchange", a, !1), document.addEventListener("mozpointerlockchange", a, !1), document.addEventListener("webkitpointerlockchange", a, !1), document.addEventListener("mspointerlockchange", a, !1), q.elementPointerLock && b.addEventListener("click", c => {
      !Bf && q.canvas.requestPointerLock && (q.canvas.requestPointerLock(), c.preventDefault());
    }, !1));
  }
}
function Gf(a, b, c, d) {
  if (b && q.la && a == q.canvas) {
    return q.la;
  }
  var e;
  if (b) {
    var f = {antialias:!1, alpha:!1, Xa:"undefined" != typeof WebGL2RenderingContext ? 2 : 1};
    if (d) {
      for (var g in d) {
        f[g] = d[g];
      }
    }
    if ("undefined" != typeof We && (e = Qe(a, f))) {
      var k = Ie[e].v;
    }
  } else {
    k = a.getContext("2d");
  }
  if (!k) {
    return null;
  }
  c && (b || w("undefined" == typeof Q, "cannot set in module if GLctx is used, but we are a non-GL context that would replace it"), q.la = k, b && Ve(e), q.Od = b, Cf.forEach(l => l()), Df());
  return k;
}
var Hf = !1, If = void 0, Jf = void 0;
function Kf(a, b) {
  function c() {
    Af = !1;
    var f = d.parentNode;
    (document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === f ? (d.exitFullscreen = Lf, If && d.requestPointerLock(), Af = !0, Jf ? ("undefined" != typeof SDL && (f = n()[SDL.screen >> 2], f |= 8388608, m()[SDL.screen >> 2] = f), Mf(q.canvas), Nf()) : Mf(d)) : (f.parentNode.insertBefore(d, f), f.parentNode.removeChild(f), Jf ? ("undefined" != typeof SDL && (f = n()[SDL.screen >> 
    2], f &= -8388609, m()[SDL.screen >> 2] = f), Mf(q.canvas), Nf()) : Mf(d));
    if (q.onFullScreen) {
      q.onFullScreen(Af);
    }
    if (q.onFullscreen) {
      q.onFullscreen(Af);
    }
  }
  If = a;
  Jf = b;
  "undefined" == typeof If && (If = !0);
  "undefined" == typeof Jf && (Jf = !1);
  var d = q.canvas;
  Hf || (Hf = !0, document.addEventListener("fullscreenchange", c, !1), document.addEventListener("mozfullscreenchange", c, !1), document.addEventListener("webkitfullscreenchange", c, !1), document.addEventListener("MSFullscreenChange", c, !1));
  var e = document.createElement("div");
  d.parentNode.insertBefore(e, d);
  e.appendChild(d);
  e.requestFullscreen = e.requestFullscreen || e.mozRequestFullScreen || e.msRequestFullscreen || (e.webkitRequestFullscreen ? () => e.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : null) || (e.webkitRequestFullScreen ? () => e.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : null);
  e.requestFullscreen();
}
function Lf() {
  if (!Af) {
    return !1;
  }
  (document.exitFullscreen || document.cancelFullScreen || document.mozCancelFullScreen || document.msExitFullscreen || document.webkitCancelFullScreen || (() => {
  })).apply(document, []);
  return !0;
}
var Of = 0;
function pf(a) {
  if ("function" == typeof requestAnimationFrame) {
    requestAnimationFrame(a);
  } else {
    var b = Date.now();
    if (0 === Of) {
      Of = b + 1e3 / 60;
    } else {
      for (; b + 2 >= Of;) {
        Of += 1e3 / 60;
      }
    }
    setTimeout(a, Math.max(Of - b, 0));
  }
}
function Ff(a) {
  return {jpg:"image/jpeg", jpeg:"image/jpeg", png:"image/png", bmp:"image/bmp", ogg:"audio/ogg", wav:"audio/wav", mp3:"audio/mpeg"}[a.substr(a.lastIndexOf(".") + 1)];
}
var Pf = [];
function Nf() {
  var a = q.canvas;
  Pf.forEach(b => b(a.width, a.height));
}
function Mf(a, b, c) {
  b && c ? (a.ad = b, a.rc = c) : (b = a.ad, c = a.rc);
  var d = b, e = c;
  q.forcedAspectRatio && 0 < q.forcedAspectRatio && (d / e < q.forcedAspectRatio ? d = Math.round(e * q.forcedAspectRatio) : e = Math.round(d / q.forcedAspectRatio));
  if ((document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === a.parentNode && "undefined" != typeof screen) {
    var f = Math.min(screen.width / d, screen.height / e);
    d = Math.round(d * f);
    e = Math.round(e * f);
  }
  Jf ? (a.width != d && (a.width = d), a.height != e && (a.height = e), "undefined" != typeof a.style && (a.style.removeProperty("width"), a.style.removeProperty("height"))) : (a.width != b && (a.width = b), a.height != c && (a.height = c), "undefined" != typeof a.style && (d != b || e != c ? (a.style.setProperty("width", d + "px", "important"), a.style.setProperty("height", e + "px", "important")) : (a.style.removeProperty("width"), a.style.removeProperty("height"))));
}
var Ef;
function Qf(a) {
  if (t) {
    return L(35, 1, a);
  }
  noExitRuntime = !1;
  db = 0;
  dd(a);
}
function Rf(a, b, c, d) {
  for (var e = 0; e < a; e++) {
    var f = Q[c](), g = f && Pe(d);
    f ? (f.name = g, d[g] = f) : N(1282);
    m()[b + 4 * e >> 2] = g;
  }
}
function Sf(a, b, c) {
  if (b) {
    var d = void 0;
    switch(a) {
      case 36346:
        d = 1;
        break;
      case 36344:
        0 != c && 1 != c && N(1280);
        return;
      case 34814:
      case 36345:
        d = 0;
        break;
      case 34466:
        var e = Q.getParameter(34467);
        d = e ? e.length : 0;
        break;
      case 33309:
        if (2 > P.version) {
          N(1282);
          return;
        }
        d = 2 * (Q.getSupportedExtensions() || []).length;
        break;
      case 33307:
      case 33308:
        if (2 > P.version) {
          N(1280);
          return;
        }
        d = 33307 == a ? 3 : 0;
    }
    if (void 0 === d) {
      switch(e = Q.getParameter(a), typeof e) {
        case "number":
          d = e;
          break;
        case "boolean":
          d = e ? 1 : 0;
          break;
        case "string":
          N(1280);
          return;
        case "object":
          if (null === e) {
            switch(a) {
              case 34964:
              case 35725:
              case 34965:
              case 36006:
              case 36007:
              case 32873:
              case 34229:
              case 36662:
              case 36663:
              case 35053:
              case 35055:
              case 36010:
              case 35097:
              case 35869:
              case 32874:
              case 36389:
              case 35983:
              case 35368:
              case 34068:
                d = 0;
                break;
              default:
                N(1280);
                return;
            }
          } else {
            if (e instanceof Float32Array || e instanceof Uint32Array || e instanceof Int32Array || e instanceof Array) {
              for (var f = 0; f < e.length; ++f) {
                switch(c) {
                  case 0:
                    m()[b + 4 * f >> 2] = e[f];
                    break;
                  case 2:
                    p()[b + 4 * f >> 2] = e[f];
                    break;
                  case 4:
                    h()[b + f >> 0] = e[f] ? 1 : 0;
                }
              }
              return;
            }
            try {
              d = e.name | 0;
            } catch (g) {
              N(1280);
              x("GL_INVALID_ENUM in glGet" + c + "v: Unknown object returned from WebGL getParameter(" + a + ")! (error: " + g + ")");
              return;
            }
          }
          break;
        default:
          N(1280);
          x("GL_INVALID_ENUM in glGet" + c + "v: Native code calling glGet" + c + "v(" + a + ") and it returns " + e + " of type " + typeof e + "!");
          return;
      }
    }
    switch(c) {
      case 1:
        c = d;
        n()[b >> 2] = c;
        n()[b + 4 >> 2] = (c - n()[b >> 2]) / 4294967296;
        0 <= c ? f = n()[b >> 2] + 4294967296 * n()[b + 4 >> 2] : f = Xe(b);
        f != c && Cb("writeI53ToI64() out of range: serialized JS Number " + c + " to Wasm heap as bytes lo=" + Ua(n()[b >> 2]) + ", hi=" + Ua(n()[b + 4 >> 2]) + ", which deserializes back to " + f + " instead!");
        break;
      case 0:
        m()[b >> 2] = d;
        break;
      case 2:
        p()[b >> 2] = d;
        break;
      case 4:
        h()[b >> 0] = d ? 1 : 0;
    }
  } else {
    N(1281);
  }
}
function Tf(a) {
  return "]" == a.slice(-1) && a.lastIndexOf("[");
}
function Uf(a) {
  a -= 5120;
  return 0 == a ? h() : 1 == a ? fa() : 2 == a ? ia() : 4 == a ? m() : 6 == a ? p() : 5 == a || 28922 == a || 28520 == a || 30779 == a || 30782 == a ? n() : la();
}
function Vf(a) {
  return 31 - Math.clz32(a.BYTES_PER_ELEMENT);
}
function Wf(a, b, c, d, e) {
  a = Uf(a);
  var f = Vf(a), g = Ne;
  return a.subarray(e >> f, e + d * (c * ({5:3, 6:4, 8:2, 29502:3, 29504:4, 26917:2, 26918:2, 29846:3, 29847:4}[b - 6402] || 1) * (1 << f) + g - 1 & -g) >> f);
}
function Xf(a) {
  var b = Q.$b;
  if (b) {
    var c = b.ta[a];
    "number" == typeof c && (b.ta[a] = c = Q.getUniformLocation(b, b.Lb[a] + (0 < c ? "[" + c + "]" : "")));
    return c;
  }
  N(1282);
}
var Yf = [], Zf = [];
function $f(a) {
  var b = ag();
  a = a();
  od(b);
  return a;
}
function L(a, b) {
  var c = arguments.length - 2, d = arguments;
  if (19 < c) {
    throw "proxyToMainThread: Too many arguments " + c + " to proxied function idx=" + a + ", maximum supported is 19";
  }
  return $f(() => {
    for (var e = bg(8 * c), f = e >> 3, g = 0; g < c; g++) {
      var k = d[2 + g];
      qa()[f + g] = k;
    }
    return cg(a, c, e, b);
  });
}
var dg = [], eg = [], fg = {}, gg = [0, "undefined" != typeof document ? document : 0, "undefined" != typeof window ? window : 0];
function hg(a) {
  a = 2 < a ? K(a) : a;
  return gg[a] || ("undefined" != typeof document ? document.querySelector(a) : void 0);
}
function ig(a, b, c) {
  a = hg(a);
  if (!a || a.hd) {
    return -4;
  }
  var d = !1;
  a.V && a.V.v && (d = a.V.v.getParameter(2978), d = 0 === d[0] && 0 === d[1] && d[2] === a.width && d[3] === a.height);
  a.width = b;
  a.height = c;
  d && a.V.v.viewport(0, 0, b, c);
  a.V && Te(a.V);
  return 0;
}
function jg(a, b, c) {
  return t ? L(36, 1, a, b, c) : ig(a, b, c);
}
function kg(a) {
  if (t) {
    return L(37, 1, a);
  }
  P == a && (P = 0);
  P === Ie[a] && (P = null);
  if ("object" == typeof fg) {
    for (var b = Ie[a].v.canvas, c = 0; c < eg.length; ++c) {
      if (eg[c].target == b) {
        var d = c--, e = eg[d];
        e.target.removeEventListener(e.nd, e.md, e.Nd);
        eg.splice(d, 1);
      }
    }
  }
  Ie[a] && Ie[a].v.canvas && (Ie[a].v.canvas.V = void 0);
  R(Ie[a].pc);
  Ie[a] = null;
}
function lg(a, b) {
  return t ? L(38, 1, a, b) : mg(a, b);
}
var ng = ["default", "low-power", "high-performance"];
function mg(a, b) {
  w(b);
  var c = b >> 2, d = m()[c + 6];
  c = {alpha:!!m()[c], depth:!!m()[c + 1], stencil:!!m()[c + 2], antialias:!!m()[c + 3], premultipliedAlpha:!!m()[c + 4], preserveDrawingBuffer:!!m()[c + 5], powerPreference:ng[d], failIfMajorPerformanceCaveat:!!m()[c + 7], Xa:m()[c + 8], wd:m()[c + 9], qb:m()[c + 10], sb:m()[c + 11], Bb:m()[c + 12], Ka:m()[c + 13]};
  d = hg(a);
  if (t && (2 === c.Bb || !d && 1 === c.Bb)) {
    return "undefined" == typeof OffscreenCanvas && (m()[b + 52 >> 2] = 1, m()[b + 20 >> 2] = 1), lg(a, b);
  }
  if (!d) {
    return 0;
  }
  c.sb && !c.Ka && (c.Ka = !0);
  return Qe(d, c);
}
function og(a, b) {
  if (t) {
    return L(39, 1, a, b);
  }
  a = Ie[a];
  b = K(b);
  b.startsWith("GL_") && (b = b.substr(3));
  "ANGLE_instanced_arrays" == b && ue(Q);
  "OES_vertex_array_object" == b && ve(Q);
  "WEBGL_draw_buffers" == b && we(Q);
  "WEBGL_draw_instanced_base_vertex_base_instance" == b && xe(Q);
  "WEBGL_multi_draw_instanced_base_vertex_base_instance" == b && ye(Q);
  "WEBGL_multi_draw" == b && ze(Q);
  return !!a.v.getExtension(b);
}
var pg = {};
function qg() {
  if (!rg) {
    var a = {USER:"web_user", LOGNAME:"web_user", PATH:"/", PWD:"/", HOME:"/home/web_user", LANG:("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _:xa || "./this.program"}, b;
    for (b in pg) {
      void 0 === pg[b] ? delete a[b] : a[b] = pg[b];
    }
    var c = [];
    for (b in a) {
      c.push(b + "=" + a[b]);
    }
    rg = c;
  }
  return rg;
}
var rg;
function sg(a, b) {
  if (t) {
    return L(40, 1, a, b);
  }
  var c = 0;
  qg().forEach(function(d, e) {
    var f = b + c;
    e = n()[a + 4 * e >> 2] = f;
    for (f = 0; f < d.length; ++f) {
      w(d.charCodeAt(f) === (d.charCodeAt(f) & 255)), h()[e++ >> 0] = d.charCodeAt(f);
    }
    h()[e >> 0] = 0;
    c += d.length + 1;
  });
  return 0;
}
function tg(a, b) {
  if (t) {
    return L(41, 1, a, b);
  }
  var c = qg();
  n()[a >> 2] = c.length;
  var d = 0;
  c.forEach(function(e) {
    d += e.length + 1;
  });
  n()[b >> 2] = d;
  return 0;
}
function ug(a) {
  if (t) {
    return L(42, 1, a);
  }
  try {
    var b = Zc(a);
    Uc(b);
    return 0;
  } catch (c) {
    if ("undefined" == typeof J || "ErrnoError" !== c.name) {
      throw c;
    }
    return c.g;
  }
}
function vg(a, b) {
  if (t) {
    return L(43, 1, a, b);
  }
  try {
    var c = Zc(a), d = c.o ? 2 : 16384 === (c.mode & 61440) ? 3 : 40960 === (c.mode & 61440) ? 7 : 4;
    h()[b >> 0] = d;
    ia()[b + 2 >> 1] = 0;
    D = [0, (A = 0, 1 <= +Math.abs(A) ? 0 < A ? +Math.floor(A / 4294967296) >>> 0 : ~~+Math.ceil((A - +(~~A >>> 0)) / 4294967296) >>> 0 : 0)];
    m()[b + 8 >> 2] = D[0];
    m()[b + 12 >> 2] = D[1];
    D = [0, (A = 0, 1 <= +Math.abs(A) ? 0 < A ? +Math.floor(A / 4294967296) >>> 0 : ~~+Math.ceil((A - +(~~A >>> 0)) / 4294967296) >>> 0 : 0)];
    m()[b + 16 >> 2] = D[0];
    m()[b + 20 >> 2] = D[1];
    return 0;
  } catch (e) {
    if ("undefined" == typeof J || "ErrnoError" !== e.name) {
      throw e;
    }
    return e.g;
  }
}
function wg(a, b, c, d) {
  if (t) {
    return L(44, 1, a, b, c, d);
  }
  try {
    a: {
      var e = Zc(a);
      a = b;
      for (var f, g = b = 0; g < c; g++) {
        var k = n()[a >> 2], l = n()[a + 4 >> 2];
        a += 8;
        var r = e, v = h(), B = k, E = l, u = f;
        if (0 > E || 0 > u) {
          throw new G(28);
        }
        if (null === r.m) {
          throw new G(8);
        }
        if (1 === (r.flags & 2097155)) {
          throw new G(8);
        }
        if (16384 === (r.node.mode & 61440)) {
          throw new G(31);
        }
        if (!r.j.read) {
          throw new G(28);
        }
        var C = "undefined" != typeof u;
        if (!C) {
          u = r.position;
        } else if (!r.seekable) {
          throw new G(70);
        }
        var y = r.j.read(r, v, B, E, u);
        C || (r.position += y);
        var O = y;
        if (0 > O) {
          var ca = -1;
          break a;
        }
        b += O;
        if (O < l) {
          break;
        }
        "undefined" !== typeof f && (f += O);
      }
      ca = b;
    }
    n()[d >> 2] = ca;
    return 0;
  } catch (aa) {
    if ("undefined" == typeof J || "ErrnoError" !== aa.name) {
      throw aa;
    }
    return aa.g;
  }
}
function xg(a, b, c, d, e) {
  if (t) {
    return L(45, 1, a, b, c, d, e);
  }
  try {
    w(b == b >>> 0 || b == (b | 0));
    w(c === (c | 0));
    var f = c + 2097152 >>> 0 < 4194305 - !!b ? (b >>> 0) + 4294967296 * c : NaN;
    if (isNaN(f)) {
      return 61;
    }
    var g = Zc(a);
    Vc(g, f, d);
    D = [g.position >>> 0, (A = g.position, 1 <= +Math.abs(A) ? 0 < A ? +Math.floor(A / 4294967296) >>> 0 : ~~+Math.ceil((A - +(~~A >>> 0)) / 4294967296) >>> 0 : 0)];
    m()[e >> 2] = D[0];
    m()[e + 4 >> 2] = D[1];
    g.Y && 0 === f && 0 === d && (g.Y = null);
    return 0;
  } catch (k) {
    if ("undefined" == typeof J || "ErrnoError" !== k.name) {
      throw k;
    }
    return k.g;
  }
}
function yg(a, b, c, d) {
  if (t) {
    return L(46, 1, a, b, c, d);
  }
  try {
    a: {
      var e = Zc(a);
      a = b;
      for (var f, g = b = 0; g < c; g++) {
        var k = n()[a >> 2], l = n()[a + 4 >> 2];
        a += 8;
        var r = Wc(e, h(), k, l, f);
        if (0 > r) {
          var v = -1;
          break a;
        }
        b += r;
        "undefined" !== typeof f && (f += r);
      }
      v = b;
    }
    n()[d >> 2] = v;
    return 0;
  } catch (B) {
    if ("undefined" == typeof J || "ErrnoError" !== B.name) {
      throw B;
    }
    return B.g;
  }
}
function zg(a, b, c, d) {
  function e(B, E, u, C, y, O) {
    var ca = 10 === B ? 28 : 16;
    y = 10 === B ? Id(y) : Hd(y);
    ca = Re(ca);
    y = Bd(ca, B, y, O);
    w(!y);
    y = Re(32);
    m()[y + 4 >> 2] = B;
    m()[y + 8 >> 2] = E;
    m()[y + 12 >> 2] = u;
    n()[y + 24 >> 2] = C;
    n()[y + 20 >> 2] = ca;
    10 === B ? m()[y + 16 >> 2] = 28 : m()[y + 16 >> 2] = 16;
    m()[y + 28 >> 2] = 0;
    return y;
  }
  if (t) {
    return L(47, 1, a, b, c, d);
  }
  var f = 0, g = 0, k = 0, l = 0, r = 0, v = 0;
  c && (k = m()[c >> 2], l = m()[c + 4 >> 2], r = m()[c + 8 >> 2], v = m()[c + 12 >> 2]);
  r && !v && (v = 2 === r ? 17 : 6);
  !r && v && (r = 17 === v ? 2 : 1);
  0 === v && (v = 6);
  0 === r && (r = 1);
  if (!a && !b) {
    return -2;
  }
  if (k & -1088 || 0 !== c && m()[c >> 2] & 2 && !a) {
    return -1;
  }
  if (k & 32) {
    return -2;
  }
  if (0 !== r && 1 !== r && 2 !== r) {
    return -7;
  }
  if (0 !== l && 2 !== l && 10 !== l) {
    return -6;
  }
  if (b && (b = K(b), g = parseInt(b, 10), isNaN(g))) {
    return k & 1024 ? -2 : -8;
  }
  if (!a) {
    return 0 === l && (l = 2), 0 === (k & 1) && (2 === l ? f = Ag(2130706433) : f = [0, 0, 0, 1]), a = e(l, r, v, null, f, g), n()[d >> 2] = a, 0;
  }
  a = K(a);
  f = yd(a);
  if (null !== f) {
    if (0 === l || 2 === l) {
      l = 2;
    } else if (10 === l && k & 8) {
      f = [0, 0, Ag(65535), f], l = 10;
    } else {
      return -2;
    }
  } else {
    if (f = zd(a), null !== f) {
      if (0 === l || 10 === l) {
        l = 10;
      } else {
        return -2;
      }
    }
  }
  if (null != f) {
    return a = e(l, r, v, a, f, g), n()[d >> 2] = a, 0;
  }
  if (k & 4) {
    return -2;
  }
  a = Fd(a);
  f = yd(a);
  0 === l ? l = 2 : 10 === l && (f = [0, 0, Ag(65535), f]);
  a = e(l, r, v, null, f, g);
  n()[d >> 2] = a;
  return 0;
}
function S(a) {
  return Qa.get(a);
}
function T() {
  x.apply(null, Array.from(arguments));
}
function Bg() {
  Ha.apply(null, Array.from(arguments));
}
function Cg(a, b) {
  M(a, b, "*");
}
function Dg(a, b, c) {
  const d = a.BYTES_PER_ELEMENT;
  return a.subarray(b / d, b / d + c);
}
function Eg(a, b, c) {
  const d = a.BYTES_PER_ELEMENT;
  return a.slice(b / d, b / d + c);
}
function Fg(a, b) {
  const c = [];
  Dg(m(), a, b).forEach(function(d) {
    c.push(K(d));
  });
  return c;
}
function V(a) {
  const b = Rb(a) + 1, c = Re(b);
  Vd(a, c, b);
  return c;
}
function Gg(a) {
  const b = a.length, c = Re(4 * b);
  for (let d = 0; d < b; d++) {
    m()[(c >> 2) + d] = V(a[d]);
  }
  return c;
}
function Hg(a, b) {
  for (let c = 0; c < b; c++) {
    R(m()[(a >> 2) + c]);
  }
  R(a);
}
var W = null, Ig = "en", Jg = 2, Kg = !1, Lg = !1, Mg = null, Ng = null, Og = !1, Pg = !1, Qg = [];
function Rg() {
  Qg.forEach(function(a) {
    try {
      Oc(a);
    } catch (b) {
      Bg("Already unmounted", b);
    }
    Og && I.W[a] && (I.W[a].close(), delete I.W[a]);
  });
  Qg = [];
  Pg = Og = !1;
}
function Sg() {
  if (Pg) {
    return T("Already syncing!"), Promise.resolve();
  }
  Pg = !0;
  return new Promise(function(a) {
    Nc(!1, function(b) {
      b && T(`Failed to save IDB file system: ${b.message}`);
      Pg = !1;
      a(b);
    });
  });
}
function Tg(a, b) {
  const c = a.lastIndexOf("/");
  let d = "/";
  0 < c && (d = a.slice(0, c));
  try {
    jc(d);
  } catch (e) {
    44 !== e.g && T(e), lc(d);
  }
  mc(a, new Uint8Array(b));
}
function Ug() {
}
var Vg = [], Wg = null;
function Xg(a) {
  Wg.then(function() {
    const b = [];
    Vg.forEach(function(c) {
      b.push(new Promise(c));
    });
    return Promise.all(b);
  }).then(function() {
    return Sg();
  }).then(function() {
    setTimeout(function() {
      a();
    }, 0);
  });
}
var Yg = null, Zg = null, $g = null, ah = 0;
function bh(a, b, c) {
  const d = {};
  a && (d.sampleRate = a);
  const e = new (window.AudioContext || window.webkitAudioContext)(d);
  Yg = e;
  e.onstatechange = function() {
    let f = 0;
    switch(e.state) {
      case "suspended":
        f = 0;
        break;
      case "running":
        f = 1;
        break;
      case "closed":
        f = 2;
    }
    b(f);
  };
  e.onstatechange();
  ah = setInterval(function() {
    let f = 0;
    e.Rb && (f += Yg.Rb);
    e.Cc && (f += Yg.Cc);
    c(f);
  }, 1e3);
  Vg.push(ch);
  return e.destination.channelCount;
}
function dh(a) {
  function b(c) {
    try {
      Zg = Yg.createMediaStreamSource(c), a(Zg);
    } catch (d) {
      T("Failed creating input.", d);
    }
  }
  if (Zg) {
    return 0;
  }
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({audio:!0}).then(b, function(c) {
      T("Error getting user media.", c);
    });
  } else {
    navigator.getUserMedia || (navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.X);
    if (!navigator.getUserMedia) {
      return T("getUserMedia not available."), 1;
    }
    navigator.getUserMedia({audio:!0}, b, function(c) {
      Bg(c);
    });
  }
  return 0;
}
function ch(a) {
  const b = Yg;
  Yg = null;
  if (b) {
    ah && (clearInterval(ah), ah = 0);
    Zg && (Zg.disconnect(), Zg = null);
    var c = Promise.resolve();
    $g && (c = $g.close());
    c.then(function() {
      return b.close();
    }).then(function() {
      b.onstatechange = null;
      a();
    }).catch(function(d) {
      b.onstatechange = null;
      T("Error closing AudioContext", d);
      a();
    });
  } else {
    a();
  }
}
function eh() {
  return t ? L(48, 1) : Yg && Yg.audioWorklet ? 1 : 0;
}
function fh(a, b, c, d) {
  if (t) {
    return L(49, 1, a, b, c, d);
  }
  b = S(c);
  d = S(d);
  c = pd(a, "i32");
  d = bh(c, b, d);
  M(a, Yg.sampleRate, "i32");
  return d;
}
function gh() {
  return t ? L(50, 1) : dh(function(a) {
    a.connect($g.mc());
  });
}
function hh() {
  if (t) {
    return L(51, 1);
  }
  if (Zg) {
    const a = Zg.mediaStream.getTracks();
    for (let b = 0; b < a.length; b++) {
      a[b].stop();
    }
    Zg.disconnect();
    Zg = null;
  }
}
function ih() {
  return t ? L(52, 1) : window.AudioContext || window.webkitAudioContext ? 1 : 0;
}
function jh() {
  if (t) {
    return L(53, 1);
  }
  Yg && "running" !== Yg.state && Yg.resume();
}
var kh = {promise:null, N:null, bb:null, create:function(a) {
  const b = q.locateFile("godot.audio.worklet.js");
  kh.promise = Yg.audioWorklet.addModule(b).then(function() {
    kh.N = new AudioWorkletNode(Yg, "godot-processor", {outputChannelCount:[a]});
    return Promise.resolve();
  });
  $g = kh;
}, start:function(a, b, c) {
  kh.promise.then(function() {
    const d = kh.N;
    d.connect(Yg.destination);
    d.port.postMessage({cmd:"start", data:[c, a, b]});
    d.port.onmessage = function(e) {
      T(e.data);
    };
  });
}, Id:function(a, b, c, d, e, f) {
  kh.bb = new function() {
    let g = 0, k = 0, l = 0;
    const r = new Float32Array(b);
    this.Fc = function(v) {
      const B = Dg(p(), d, e), E = k;
      let u = v.length, C = 0;
      k + u >= e && (C = e - k, B.set(v.subarray(0, C), k), u -= C, k = 0);
      u && B.set(v.subarray(C, u), k);
      f(E, v.length);
      k += u;
    };
    this.Xb = function(v) {
      var B = kh.N.port;
      l += v;
      if (0 !== l) {
        v = Dg(p(), a, b);
        var E = v.length, u = l;
        c(g, l);
        if (g + l >= E) {
          const C = E - g;
          r.set(v.subarray(g, E));
          l -= C;
          g = 0;
        }
        0 < l && r.set(v.subarray(g, g + l), u - l);
        B.postMessage({cmd:"chunk", data:r.subarray(0, u)});
        g += l;
        l = 0;
      }
    };
  }();
  kh.promise.then(function() {
    const g = kh.N, k = Eg(p(), a, b);
    g.connect(Yg.destination);
    g.port.postMessage({cmd:"start_nothreads", data:[k, e]});
    g.port.onmessage = function(l) {
      kh.N && ("read" === l.data.cmd ? kh.bb.Xb(l.data.data) : "input" === l.data.cmd ? (l = l.data.data, l.length > e ? T("Input chunk is too big") : kh.bb.Fc(l)) : T(l.data));
    };
  });
}, mc:function() {
  return kh.N;
}, close:function() {
  return new Promise(function(a) {
    null !== kh.promise && kh.promise.then(function() {
      kh.N.port.postMessage({cmd:"stop", data:null});
      kh.N.disconnect();
      kh.N.port.onmessage = null;
      kh.N = null;
      kh.promise = null;
      a();
    }).catch(function(b) {
      T(b);
    });
  });
}};
function lh(a) {
  if (t) {
    return L(54, 1, a);
  }
  try {
    kh.create(a);
  } catch (b) {
    return T("Error starting AudioDriverWorklet", b), 1;
  }
  return 0;
}
function mh(a, b, c, d, e) {
  if (t) {
    return L(55, 1, a, b, c, d, e);
  }
  c = Dg(p(), c, d);
  a = Dg(p(), a, b);
  e = Dg(m(), e, 4);
  kh.start(a, c, e);
}
function nh(a, b) {
  if (t) {
    return L(56, 1, a, b);
  }
  Sb(`#${W.id}`, h(), a, b);
}
function oh(a, b) {
  if (t) {
    return L(57, 1, a, b);
  }
  Sb(Ig, h(), a, b);
}
var ph = "default", qh = !0, rh = {};
function sh(a) {
  let b = ph = a;
  a in rh && (a = rh[a], b = `url("${a.url}") ${a.x} ${a.y}, default`);
  qh && (W.style.cursor = b);
}
function th() {
  W.style.cursor = "";
  ph = "default";
  qh = !0;
  Object.keys(rh).forEach(function(a) {
    URL.revokeObjectURL(rh[a]);
    delete rh[a];
  });
}
var uh = [];
function vh(a, b, c, d) {
  return -1 !== uh.findIndex(function(e) {
    return e.target === a && e.event === b && e.method === c && e.capture === d;
  });
}
function X(a, b, c, d) {
  vh(a, b, c, d) || (uh.push(new function(e, f, g, k) {
    this.target = e;
    this.event = f;
    this.method = g;
    this.capture = k;
  }(a, b, c, d)), a.addEventListener(b, c, d));
}
function wh() {
  uh.forEach(function(a) {
    a.target.removeEventListener(a.event, a.method, a.capture);
  });
  uh.length = 0;
}
var xh = [0, 0], yh = !0;
function zh() {
  const a = document.fullscreenElement || document.td || document.webkitFullscreenElement || document.msFullscreenElement;
  return a ? a === W : document.X || document.mozFullScreen || document.ud;
}
function Ah() {
  if (!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled)) {
    return 1;
  }
  const a = W;
  try {
    const b = (a.requestFullscreen || a.msRequestFullscreen || a.mozRequestFullScreen || a.xd || a.webkitRequestFullscreen).call(a);
    b && b.catch(function() {
    });
  } catch (b) {
    return 1;
  }
  return 0;
}
function Bh() {
  if (!zh()) {
    return 0;
  }
  try {
    const a = document.exitFullscreen();
    a && a.catch(function() {
    });
  } catch (a) {
    return 1;
  }
  return 0;
}
function Ch() {
  var a = Dh();
  (a = Ie[a]) && Te(a);
}
function Eh() {
  var a = zh();
  const b = 2 === Jg, c = W;
  let d = xh[0], e = xh[1];
  if (0 === Jg) {
    return c.width !== d || c.height !== e ? (xh = [c.width, c.height], Ch(), 1) : 0;
  }
  var f = yh ? window.devicePixelRatio || 1 : 1;
  if (a || b) {
    d = window.innerWidth * f, e = window.innerHeight * f;
  }
  a = `${d / f}px`;
  f = `${e / f}px`;
  return c.style.width !== a || c.style.height !== f || c.width !== d || c.height !== e ? (c.width = d, c.height = e, c.style.width = a, c.style.height = f, Ch(), 1) : 0;
}
var Fh = null, Gh = null;
function Hh(a) {
  function b(c) {
    const d = document.createElement(c);
    d.style.display = "none";
    d.style.position = "absolute";
    d.style.zIndex = "-1";
    d.style.background = "transparent";
    d.style.padding = "0px";
    d.style.margin = "0px";
    d.style.overflow = "hidden";
    d.style.width = "0px";
    d.style.height = "0px";
    d.style.border = "0px";
    d.style.outline = "none";
    d.Cb = !0;
    d.disabled = !0;
    X(d, "input", function() {
      const e = V(d.value);
      a(e, d.selectionEnd);
      R(e);
    }, !1);
    X(d, "blur", function() {
      d.style.display = "none";
      d.Cb = !0;
      d.disabled = !0;
    }, !1);
    W.insertAdjacentElement("beforebegin", d);
    return d;
  }
  Fh = b("input");
  Gh = b("textarea");
  Ih();
}
function Jh() {
  Fh && Gh && [Fh, Gh].forEach(function(a) {
    a.blur();
    a.style.display = "none";
    a.value = "";
  });
}
function Ih() {
  function a(c) {
    c.style.left = `${b.left}px`;
    c.style.top = `${b.top}px`;
    c.style.width = `${b.width}px`;
    c.style.height = `${b.height}px`;
  }
  if (Fh && Gh) {
    var b = W.getBoundingClientRect();
    a(Fh);
    a(Gh);
  }
}
var Kh = "";
function Lh(a) {
  if (t) {
    return L(58, 1, a);
  }
  window.alert(K(a));
}
function Mh() {
  if (t) {
    return L(59, 1);
  }
  W.focus();
}
function Nh() {
  return t ? L(60, 1) : document.activeElement === W;
}
function Oh(a) {
  if (t) {
    return L(61, 1, a);
  }
  const b = S(a);
  try {
    navigator.clipboard.readText().then(function(c) {
      c = V(c);
      b(c);
      R(c);
    }).catch(function() {
    });
  } catch (c) {
  }
}
function Ph(a) {
  if (t) {
    return L(62, 1, a);
  }
  a = K(a);
  if (!navigator.clipboard || !navigator.clipboard.writeText) {
    return 1;
  }
  navigator.clipboard.writeText(a).catch(function(b) {
    T("Setting OS clipboard is only possible from an input callback for the Web platform. Exception:", b);
  });
  return 0;
}
function Qh() {
  return t ? L(63, 1) : !qh;
}
function Rh() {
  return t ? L(64, 1) : document.pointerLockElement === W ? 1 : 0;
}
function Sh(a) {
  if (t) {
    return L(65, 1, a);
  }
  a ? (a = W, a.requestPointerLock && a.requestPointerLock()) : document.exitPointerLock && document.exitPointerLock();
}
function Th(a, b, c, d, e) {
  if (t) {
    return L(66, 1, a, b, c, d, e);
  }
  a = K(a);
  const f = rh[a];
  0 < c ? (b = new Blob([Eg(fa(), b, c)], {type:"image/png"}), b = URL.createObjectURL(b), rh[a] = {url:b, x:d, y:e}) : delete rh[a];
  a === ph && sh(ph);
  f && URL.revokeObjectURL(f.url);
}
function Uh(a) {
  if (t) {
    return L(67, 1, a);
  }
  sh(K(a));
}
function Vh(a) {
  if (t) {
    return L(68, 1, a);
  }
  a = 0 !== a;
  a !== qh && ((qh = a) ? sh(ph) : W.style.cursor = "none");
}
function Wh(a, b) {
  if (t) {
    return L(69, 1, a, b);
  }
  xh = [a, b];
  Eh();
}
function Xh(a) {
  function b(e) {
    e.target === c && d(zh());
  }
  if (t) {
    return L(70, 1, a);
  }
  const c = W, d = S(a);
  X(document, "fullscreenchange", b, !1);
  X(document, "mozfullscreenchange", b, !1);
  X(document, "webkitfullscreenchange", b, !1);
}
function Yh() {
  return t ? L(71, 1) : Bh();
}
function Zh() {
  return t ? L(72, 1) : Ah();
}
function $h(a) {
  if (t) {
    return L(73, 1, a);
  }
  if (1 !== a && 2 !== a) {
    return !1;
  }
  try {
    return !!document.createElement("canvas").getContext(2 === a ? "webgl2" : "webgl");
  } catch (b) {
  }
  return !1;
}
function ai() {
  return t ? L(74, 1) : -1 !== ["Windows", "Win64", "Win32", "WinCE"].indexOf(navigator.platform || "") ? 1 : 0;
}
function bi(a, b, c, d, e) {
  if (t) {
    return L(75, 1, a, b, c, d, e);
  }
  const f = W, g = S(a), k = [b, c, d, e];
  ["mouseover", "mouseleave", "focus", "blur"].forEach(function(l, r) {
    X(f, l, function() {
      g(k[r]);
    }, !0);
  });
}
function ci() {
  return t ? L(76, 1) : yh ? window.devicePixelRatio || 1 : 1;
}
function di() {
  if (t) {
    var a = L(77, 1);
  } else {
    a = Math.round(96 * window.devicePixelRatio), a = 96 <= a ? a : 96;
  }
  return a;
}
function ei(a, b) {
  if (t) {
    return L(78, 1, a, b);
  }
  const c = yh ? window.devicePixelRatio || 1 : 1;
  M(a, window.screen.width * c, "i32");
  M(b, window.screen.height * c, "i32");
}
function fi(a, b, c, d) {
  if (t) {
    return L(79, 1, a, b, c, d);
  }
  const e = W;
  X(e, "contextmenu", function(f) {
    f.preventDefault();
  }, !1);
  X(e, "webglcontextlost", function(f) {
    alert("WebGL context lost, please reload the page");
    f.preventDefault();
  }, !1);
  yh = !!d;
  switch(Jg) {
    case 0:
      xh = [e.width, e.height];
      break;
    case 1:
      xh = [a, b];
      break;
    default:
      e.style.position = "absolute", e.style.top = 0, e.style.left = 0;
  }
  Eh();
  c && Ah();
}
function gi() {
  if (t) {
    return L(80, 1);
  }
  const a = Eh();
  a && Ih();
  return a;
}
function hi() {
  return t ? L(81, 1) : "ontouchstart" in window;
}
function ii() {
  return t ? L(82, 1) : "speechSynthesis" in window;
}
function ji() {
  return t ? L(83, 1) : Kg && "ontouchstart" in window;
}
function ki(a) {
  if (t) {
    return L(84, 1, a);
  }
  a = S(a);
  Kg && "ontouchstart" in window && Hh(a);
}
function li() {
  if (t) {
    return L(85, 1);
  }
  Jh();
}
function mi(a, b, c, d) {
  if (t) {
    return L(86, 1, a, b, c, d);
  }
  a = K(a);
  c = 0 < c ? c : 0;
  d = 0 < d ? d : c;
  if (Fh && Gh) {
    "" === Fh.style.display && "" === Gh.style.display || Jh();
    Ih();
    var e = Fh;
    switch(b) {
      case 0:
        e.type = "text";
        e.Z = "";
        break;
      case 1:
        e = Gh;
        break;
      case 2:
        e.type = "text";
        e.Z = "numeric";
        break;
      case 3:
        e.type = "text";
        e.Z = "decimal";
        break;
      case 4:
        e.type = "tel";
        e.Z = "";
        break;
      case 5:
        e.type = "email";
        e.Z = "";
        break;
      case 6:
        e.type = "password";
        e.Z = "";
        break;
      case 7:
        e.type = "url";
        e.Z = "";
        break;
      default:
        e.type = "text", e.Z = "";
    }
    e.Cb = !1;
    e.disabled = !1;
    e.value = a;
    e.style.display = "block";
    e.focus();
    e.setSelectionRange(c, d);
  }
}
function ni(a) {
  if (t) {
    return L(87, 1, a);
  }
  const b = S(a);
  X(window, "blur", function() {
    b();
  }, !1);
}
function oi(a, b) {
  if (t) {
    return L(88, 1, a, b);
  }
  let c = document.getElementById("-gd-engine-icon");
  const d = Kh;
  a ? (null === c && (c = document.createElement("link"), c.rel = "icon", c.id = "-gd-engine-icon", document.head.appendChild(c)), a = new Blob([Eg(fa(), a, b)], {type:"image/png"}), Kh = URL.createObjectURL(a), c.href = Kh) : (c && c.remove(), Kh = null);
  d && URL.revokeObjectURL(d);
}
function pi(a, b) {
  if (t) {
    return L(89, 1, a, b);
  }
  M(a, W.width, "i32");
  M(b, W.height, "i32");
}
function qi(a) {
  if (t) {
    return L(90, 1, a);
  }
  document.title = K(a);
}
var ri = 0, Y = {};
function si(a) {
  const b = ++ri;
  Y[b] = a;
  return b;
}
function ti(a) {
  delete Y[a];
}
function ui(a, b) {
  if (a = Y[a]) {
    b.value && a.Sa.push(b.value), a.$a = !1, a.done = b.done;
  }
}
function vi(a, b) {
  if (a = Y[a]) {
    var c = !1;
    b.headers.forEach(function(d, e) {
      d = d.toLowerCase().trim();
      "transfer-encoding" === e.toLowerCase().trim() && "chunked" === d && (c = !0);
    });
    a.status = b.status;
    a.response = b;
    a.ra = b.body.getReader();
    a.Wb = c;
  }
}
function wi(a, b) {
  T(b);
  if (a = Y[a]) {
    a.error = b;
  }
}
function xi(a, b, c, d) {
  const e = {request:null, response:null, ra:null, error:null, done:!1, $a:!1, status:0, Sa:[]}, f = si(e);
  e.request = fetch(b, {method:a, headers:c, body:d});
  e.request.then(vi.bind(null, f)).catch(wi.bind(null, f));
  return f;
}
function yi(a) {
  const b = Y[a];
  b && (ti(a), b.request && b.request.then(function(c) {
    c.abort();
  }).catch(function() {
  }));
}
function zi(a, b, c, d, e, f) {
  if (t) {
    return L(91, 1, a, b, c, d, e, f);
  }
  a = K(a);
  b = K(b);
  c = Fg(c, d);
  e = f ? Eg(h(), e, f) : null;
  return xi(a, b, c.map(function(g) {
    const k = g.indexOf(":");
    return 0 >= k ? [] : [g.slice(0, k).trim(), g.slice(k + 1).trim()];
  }).filter(function(g) {
    return 2 === g.length;
  }), e);
}
function Ai(a) {
  if (t) {
    return L(92, 1, a);
  }
  yi(a);
}
function Bi(a) {
  return t ? L(93, 1, a) : (a = Y[a]) && a.response ? a.status : 0;
}
function Ci(a) {
  return t ? L(94, 1, a) : (a = Y[a]) && a.response ? a.Wb ? 1 : 0 : -1;
}
function Di(a, b, c) {
  if (t) {
    return L(95, 1, a, b, c);
  }
  const d = Y[a];
  if (!d || !d.response) {
    return 0;
  }
  let e = c;
  const f = d.Sa;
  for (; e && f.length;) {
    const l = d.Sa[0];
    if (l.length > e) {
      var g = h(), k = l.slice(0, e);
      g.set(k, b / k.BYTES_PER_ELEMENT);
      f[0] = l.slice(e);
      e = 0;
    } else {
      h().set(l, b / l.BYTES_PER_ELEMENT), e -= l.length, f.pop();
    }
  }
  f.length || (b = Y[a]) && b.ra && !b.$a && (b.done ? b.ra = null : (b.$a = !0, b.ra.read().then(ui.bind(null, a)).catch(wi.bind(null, a))));
  return c - e;
}
function Ei(a, b, c) {
  if (t) {
    return L(96, 1, a, b, c);
  }
  a = Y[a];
  if (!a || !a.response) {
    return 1;
  }
  b = S(b);
  const d = [];
  a.response.headers.forEach(function(e, f) {
    d.push(`${f}:${e}`);
  });
  a = Gg(d);
  b(d.length, a, c);
  Hg(a, d.length);
  return 0;
}
function Fi(a) {
  if (t) {
    return L(97, 1, a);
  }
  a = Y[a];
  return !a || a.error ? -1 : a.response ? a.ra ? 1 : a.done ? 2 : -1 : 0;
}
var Gi = [];
function Hi() {
  try {
    const a = navigator.getGamepads();
    return a ? a : [];
  } catch (a) {
    return [];
  }
}
function Ii(a) {
  function b(d) {
    if (d.mapping) {
      var e = d.mapping;
    } else {
      var f = navigator.userAgent;
      e = "Unknown";
      0 <= f.indexOf("Android") ? e = "Android" : 0 <= f.indexOf("Linux") ? e = "Linux" : 0 <= f.indexOf("iPhone") ? e = "iOS" : 0 <= f.indexOf("Macintosh") ? e = "MacOSX" : 0 <= f.indexOf("Windows") && (e = "Windows");
      var g = d.id, k = /vendor: ([0-9a-f]{4}) product: ([0-9a-f]{4})/i, l = /^([0-9a-f]+)-([0-9a-f]+)-/i, r = f = "";
      k.test(g) ? (g = k.exec(g), f = g[1].padStart(4, "0"), r = g[2].padStart(4, "0")) : l.test(g) && (g = l.exec(g), f = g[1].padStart(4, "0"), r = g[2].padStart(4, "0"));
      e = f && r ? e + f + r : `${e}Unknown`;
    }
    f = e;
    e = V(d.id);
    f = V(f);
    a(d.index, 1, e, f);
    R(e);
    R(f);
  }
  Gi = [];
  const c = Hi();
  for (let d = 0; d < c.length; d++) {
    c[d] && b(c[d]);
  }
  X(window, "gamepadconnected", function(d) {
    d.gamepad && b(d.gamepad);
  }, !1);
  X(window, "gamepaddisconnected", function(d) {
    d.gamepad && a(d.gamepad.index, 0);
  }, !1);
}
var Ji = [], Ki = [];
function Li(a) {
  a.isDirectory ? Mi(a) : a.isFile ? Ni(a) : T("Unrecognized entry...", a);
}
function Mi(a) {
  Ji.push(new Promise(function(b) {
    a.createReader().readEntries(function(c) {
      for (let d = 0; d < c.length; d++) {
        Li(c[d]);
      }
      b();
    });
  }));
}
function Ni(a) {
  Ji.push(new Promise(function(b, c) {
    a.file(function(d) {
      const e = new FileReader();
      e.onload = function() {
        const f = {path:d.Ed || d.webkitRelativePath, name:d.name, type:d.type, size:d.size, data:e.result};
        f.path || (f.path = f.name);
        Ki.push(f);
        b();
      };
      e.onerror = function() {
        Bg("Error reading file");
        c();
      };
      e.readAsArrayBuffer(d);
    }, function() {
      Bg("Error!");
      c();
    });
  }));
}
function Oi(a, b) {
  0 === Ji.length ? a() : Ji.pop().then(function() {
    setTimeout(function() {
      Oi(a, b);
    }, 0);
  });
}
function Pi(a, b) {
  a.preventDefault();
  if (a.dataTransfer.items) {
    for (let c = 0; c < a.dataTransfer.items.length; c++) {
      const d = a.dataTransfer.items[c];
      let e = null;
      "getAsEntry" in d ? e = d.rd() : "webkitGetAsEntry" in d && (e = d.webkitGetAsEntry());
      e && Li(e);
    }
  } else {
    T("File upload not supported");
  }
  (new Promise(Oi)).then(function() {
    const c = `/tmp/drop-${parseInt(1073741824 * Math.random(), 10)}/`, d = [], e = [];
    Qc(c.slice(0, -1));
    Ki.forEach(f => {
      const g = f.path;
      Tg(c + g, f.data);
      f = g.indexOf("/");
      if (-1 === f) {
        d.push(c + g);
      } else {
        const k = g.substr(0, f);
        f = k.indexOf("/");
        0 > f && -1 === d.indexOf(c + k) && d.push(c + k);
      }
      e.push(c + g);
    });
    Ji = [];
    Ki = [];
    b(d);
    Lg ? Vg.push(function(f) {
      Qi(e, c);
      f();
    }) : Qi(e, c);
  });
}
function Qi(a, b) {
  const c = [b.substr(0, b.length - 1)];
  a.forEach(function(d) {
    pc(d);
    d = d.replace(b, "");
    let e = d.lastIndexOf("/");
    for (; 0 < e;) {
      d = d.substr(0, e), -1 === c.indexOf(b + d) && c.push(b + d), e = d.lastIndexOf("/");
    }
  });
  c.sort(function(d, e) {
    d = (d.match(/\//g) || []).length;
    e = (e.match(/\//g) || []).length;
    return d > e ? -1 : d < e ? 1 : 0;
  }).forEach(function(d) {
    oc(d);
  });
}
function Ri(a) {
  return function(b) {
    Pi(b, a);
  };
}
function Si(a) {
  return a.shiftKey + 0 + (a.altKey + 0 << 1) + (a.ctrlKey + 0 << 2) + (a.metaKey + 0 << 3);
}
function Ti(a, b) {
  const c = W;
  return [c.width / b.width * (a.clientX - b.x), c.height / b.height * (a.clientY - b.y)];
}
function Ui(a) {
  if (t) {
    return L(98, 1, a);
  }
  const b = S(a);
  a = W;
  X(a, "dragover", function(c) {
    c.preventDefault();
  }, !1);
  X(a, "drop", Ri(function(c) {
    var d = c || [];
    d.length && (c = d.length, d = Gg(d), b(d, c), Hg(d, c));
  }));
}
function Vi(a) {
  if (t) {
    return L(99, 1, a);
  }
  a = S(a);
  Ii(a);
}
function Wi() {
  if (t) {
    return L(100, 1);
  }
  const a = Hi(), b = [];
  for (let d = 0; d < a.length; d++) {
    const e = a[d];
    if (!e) {
      b.push(null);
      continue;
    }
    const f = {Oc:"standard" === e.mapping, buttons:[], axes:[], connected:e.connected};
    for (var c = 0; c < e.buttons.length; c++) {
      f.buttons.push(e.buttons[c].value);
    }
    for (c = 0; c < e.axes.length; c++) {
      f.axes.push(e.axes[c]);
    }
    b.push(f);
  }
  Gi = b;
  return 0;
}
function Xi() {
  return t ? L(101, 1) : Gi.length;
}
function Yi(a, b, c, d, e, f) {
  if (t) {
    return L(102, 1, a, b, c, d, e, f);
  }
  var g = Gi;
  a = a < g.length ? g[a] : null;
  if (!a || !a.connected) {
    return 1;
  }
  g = a.buttons;
  const k = 16 > g.length ? g.length : 16;
  for (let l = 0; l < k; l++) {
    M(b + (l << 2), g[l], "float");
  }
  M(c, k, "i32");
  b = a.axes;
  c = 10 > b.length ? b.length : 10;
  for (g = 0; g < c; g++) {
    M(d + (g << 2), b[g], "float");
  }
  M(e, c, "i32");
  M(f, a.Oc ? 1 : 0, "i32");
  return 0;
}
function Zi(a, b, c) {
  function d(f, g) {
    const k = Si(g);
    Sb(g.code, h(), b, 32);
    Sb(g.key, h(), c, 32);
    e(f, g.repeat, k);
    g.preventDefault();
  }
  if (t) {
    return L(103, 1, a, b, c);
  }
  const e = S(a);
  X(W, "keydown", d.bind(null, 1), !1);
  X(W, "keyup", d.bind(null, 0), !1);
}
function $i(a) {
  function b(e, f) {
    var g = d.getBoundingClientRect();
    g = Ti(f, g);
    const k = Si(f);
    e && W.focus();
    c(e, f.button, g[0], g[1], k) && f.preventDefault();
  }
  if (t) {
    return L(104, 1, a);
  }
  const c = S(a), d = W;
  X(d, "mousedown", b.bind(null, 1), !1);
  X(window, "mouseup", b.bind(null, 0), !1);
}
function aj(a) {
  if (t) {
    return L(105, 1, a);
  }
  const b = S(a), c = W;
  X(window, "mousemove", function(d) {
    const e = c.getBoundingClientRect(), f = Ti(d, e);
    b(f[0], f[1], c.width / e.width * d.movementX, c.height / e.height * d.movementY, Si(d));
  }, !1);
}
function bj(a) {
  if (t) {
    return L(106, 1, a);
  }
  const b = S(a);
  X(W, "wheel", function(c) {
    b(c.deltaX || 0, c.deltaY || 0) && c.preventDefault();
  }, !1);
}
function cj(a) {
  if (t) {
    return L(107, 1, a);
  }
  const b = S(a);
  X(window, "paste", function(c) {
    c = c.clipboardData.getData("text");
    c = V(c);
    b(c);
    R(c);
  }, !1);
}
function dj(a, b, c) {
  function d(g, k) {
    0 === g && W.focus();
    const l = f.getBoundingClientRect(), r = k.changedTouches;
    for (let v = 0; v < r.length; v++) {
      const B = r[v], E = Ti(B, l);
      M(c + 16 * v, E[0], "double");
      M(c + 8 * (2 * v + 1), E[1], "double");
      M(b + 4 * v, B.identifier, "i32");
    }
    e(g, r.length);
    k.cancelable && k.preventDefault();
  }
  if (t) {
    return L(108, 1, a, b, c);
  }
  const e = S(a), f = W;
  X(f, "touchstart", d.bind(null, 0), !1);
  X(f, "touchend", d.bind(null, 1), !1);
  X(f, "touchcancel", d.bind(null, 1), !1);
  X(f, "touchmove", d.bind(null, 2), !1);
}
function ej(a) {
  if (t) {
    return L(109, 1, a);
  }
  "function" !== typeof navigator.vibrate ? Bg("This browser does not support vibration.") : navigator.vibrate(a);
}
function fj(a, b, c, d) {
  if (t) {
    return L(110, 1, a, b, c, d);
  }
  a = Eg(h(), a, b);
  c = K(c);
  d = K(d);
  d = window.URL.createObjectURL(new Blob([a], {type:d}));
  a = document.createElement("a");
  a.href = d;
  a.download = c;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(d);
}
function gj(a) {
  if (t) {
    return L(111, 1, a);
  }
  a = K(a);
  a = JSON.parse(a);
  return Mg ? (Mg(a), 0) : 1;
}
function hj(a) {
  if (t) {
    return L(112, 1, a);
  }
  a = S(a);
  Xg(a);
}
function ij() {
  return t ? L(113, 1) : Og ? 1 : 0;
}
function jj(a) {
  if (t) {
    return L(114, 1, a);
  }
  const b = S(a);
  Wg = Sg();
  Wg.then(function() {
    b();
  });
}
function kj(a) {
  if (t) {
    return L(115, 1, a);
  }
  a = K(a);
  const b = navigator.userAgent;
  return "web_macos" === a ? -1 !== b.indexOf("Mac") ? 1 : 0 : "web_windows" === a ? -1 !== b.indexOf("Windows") ? 1 : 0 : "web_android" === a ? -1 !== b.indexOf("Android") ? 1 : 0 : "web_ios" === a ? -1 !== b.indexOf("iPhone") || -1 !== b.indexOf("iPad") || -1 !== b.indexOf("iPod") ? 1 : 0 : "web_linuxbsd" === a ? -1 !== b.indexOf("CrOS") || -1 !== b.indexOf("BSD") || -1 !== b.indexOf("Linux") || -1 !== b.indexOf("X11") ? 1 : 0 : 0;
}
function lj() {
  if (t) {
    return L(116, 1);
  }
  const a = navigator.hardwareConcurrency || 1;
  return 2 > a ? a : 2;
}
function mj(a) {
  if (t) {
    return L(117, 1, a);
  }
  Ug = S(a);
}
function nj(a) {
  if (t) {
    return L(118, 1, a);
  }
  window.open(K(a), "_blank");
}
var oj = !1;
function pj(a, b) {
  b && b.active && (b.waiting && (oj = !0, a()), X(b, "updatefound", function() {
    const c = b.installing;
    X(c, "statechange", function() {
      "installed" === c.state && (oj = !0, a());
    });
  }));
}
function qj(a) {
  if (t) {
    return L(119, 1, a);
  }
  "serviceWorker" in navigator && (a = S(a), navigator.serviceWorker.getRegistration().then(pj.bind(null, a)));
}
function rj() {
  return t ? L(120, 1) : "serviceWorker" in navigator && oj ? (navigator.serviceWorker.getRegistration().then(function(a) {
    a && a.waiting && a.waiting.postMessage("update");
  }), 0) : 1;
}
function sj(a, b, c, d, e) {
  if (a = Y[a]) {
    a.binaryType = "arraybuffer", a.onopen = function() {
      b();
    }, a.onclose = function() {
      e();
    }, a.onerror = function() {
      d();
    }, a.onmessage = function(f) {
      let g = 0;
      if (f.data instanceof ArrayBuffer) {
        f = new Uint8Array(f.data);
      } else {
        if (f.data instanceof Blob) {
          T("Blob type not supported");
          return;
        }
        if ("string" === typeof f.data) {
          g = 1;
          var k = new TextEncoder("utf-8");
          f = new Uint8Array(k.encode(f.data));
        } else {
          T("Unknown message type");
          return;
        }
      }
      k = f.length * f.BYTES_PER_ELEMENT;
      const l = Re(k);
      fa().set(f, l);
      c(l, k, g);
      R(l);
    };
  }
}
function tj(a) {
  if (a = Y[a]) {
    a.onopen = null, a.onmessage = null, a.onerror = null, a.onclose = null, a.close();
  }
}
function uj(a, b, c) {
  return (a = Y[a]) && void 0 !== a[b] ? a[b] : c;
}
function vj(a) {
  if (t) {
    return L(121, 1, a);
  }
  Y[a] && tj(a);
}
function wj(a, b, c, d, e, f) {
  if (t) {
    return L(122, 1, a, b, c, d, e, f);
  }
  c = S(c).bind(null, b);
  d = S(d).bind(null, b);
  e = S(e).bind(null, b);
  b = S(f).bind(null, b);
  sj(a, c, d, e, b);
}
function xj(a) {
  if (t) {
    return L(123, 1, a);
  }
  tj(a);
  ti(a);
}
function yj(a) {
  return t ? L(124, 1, a) : uj(a, "bufferedAmount", 0);
}
function zj(a) {
  return t ? L(125, 1, a) : uj(a, "id", 65535);
}
function Aj(a) {
  return t ? L(126, 1, a) : uj(a, "negotiated", 65535);
}
function Bj(a) {
  return t ? L(127, 1, a) : uj(a, "ordered", !0);
}
function Cj(a) {
  return t ? L(128, 1, a) : (a = Y[a]) && a.label ? V(a.label) : 0;
}
function Dj(a) {
  return t ? L(129, 1, a) : (a = Y[a]) ? void 0 !== a.maxPacketLifeTime ? a.maxPacketLifeTime : void 0 !== a.maxRetransmitTime ? a.maxRetransmitTime : 65535 : 65535;
}
function Ej(a) {
  return t ? L(130, 1, a) : uj(a, "maxRetransmits", 65535);
}
function Fj(a) {
  if (t) {
    return L(131, 1, a);
  }
  a = Y[a];
  if (!a) {
    return 3;
  }
  switch(a.readyState) {
    case "connecting":
      return 0;
    case "open":
      return 1;
    case "closing":
      return 2;
    default:
      return 3;
  }
}
function Gj(a, b, c, d) {
  if (t) {
    return L(132, 1, a, b, c, d);
  }
  a = Y[a];
  if (!a) {
    return 1;
  }
  const e = new Uint8Array(c);
  for (let f = 0; f < c; f++) {
    e[f] = pd(b + f, "i8");
  }
  d ? a.send(e.buffer) : (b = (new TextDecoder("utf-8")).decode(e), a.send(b));
  return 0;
}
var Hj = {Ab:0, gd:1, connected:2, cc:3, ec:4, closed:5}, Ij = {Ab:0, dd:1, connected:2, fd:2, cc:3, ec:4, closed:5}, Jj = {Ab:0, qd:1, complete:2}, Kj = {Hd:0, "have-local-offer":1, "have-remote-offer":2, "have-local-pranswer":3, "have-remote-pranswer":4, closed:5};
function Lj(a, b, c, d, e, f) {
  let g = null;
  try {
    g = new RTCPeerConnection(a);
  } catch (l) {
    return T(l), 0;
  }
  const k = si(g);
  "connectionState" in g && void 0 !== g.connectionState ? g.onconnectionstatechange = function() {
    Y[k] && b(Hj[g.connectionState] || 0);
  } : g.oniceconnectionstatechange = function() {
    Y[k] && b(Ij[g.iceConnectionState] || 0);
  };
  g.onicegatheringstatechange = function() {
    Y[k] && d(Jj[g.iceGatheringState] || 0);
  };
  g.onsignalingstatechange = function() {
    Y[k] && c(Kj[g.signalingState] || 0);
  };
  g.onicecandidate = function(l) {
    if (Y[k] && (l = l.candidate) && l.candidate) {
      var r = V(l.candidate), v = V(l.sdpMid);
      e(v, l.sdpMLineIndex, r);
      R(r);
      R(v);
    }
  };
  g.ondatachannel = function(l) {
    Y[k] && (l = si(l.channel), f(l));
  };
  return k;
}
function Mj(a, b, c) {
  Y[a] && (a = V(c.type), c = V(c.sdp), b(a, c), R(a), R(c));
}
function Nj(a) {
  if (t) {
    return L(133, 1, a);
  }
  (a = Y[a]) && a.close();
}
function Oj(a, b, c, d, e, f, g) {
  function k(l) {
    return S(l).bind(null, b);
  }
  return t ? L(134, 1, a, b, c, d, e, f, g) : Lj(JSON.parse(K(a)), k(c), k(e), k(d), k(f), k(g));
}
function Pj(a, b, c) {
  if (t) {
    return L(135, 1, a, b, c);
  }
  try {
    const d = Y[a];
    if (!d) {
      return 0;
    }
    const e = K(b), f = JSON.parse(K(c)), g = d.createDataChannel(e, f);
    return si(g);
  } catch (d) {
    return T(d), 0;
  }
}
function Qj(a) {
  if (t) {
    return L(136, 1, a);
  }
  const b = Y[a];
  b && (b.onconnectionstatechange = null, b.oniceconnectionstatechange = null, b.onicegatheringstatechange = null, b.onsignalingstatechange = null, b.onicecandidate = null, b.ondatachannel = null, ti(a));
}
function Rj(a, b, c, d) {
  if (t) {
    return L(137, 1, a, b, c, d);
  }
  if (a = Y[a]) {
    b = K(b), d = K(d), a.addIceCandidate(new RTCIceCandidate({candidate:d, sdpMid:b, sdpMlineIndex:c}));
  }
}
function Sj(a, b, c, d, e) {
  if (t) {
    return L(138, 1, a, b, c, d, e);
  }
  const f = Y[a];
  if (f) {
    b = K(b);
    c = K(c);
    var g = S(e).bind(null, d);
    f.setLocalDescription({sdp:c, type:b}).catch(function(k) {
      Y[a] && (T(k), g());
    });
  }
}
function Tj(a, b, c, d) {
  if (t) {
    return L(139, 1, a, b, c, d);
  }
  const e = Y[a];
  if (e) {
    var f = S(c).bind(null, b), g = S(d).bind(null, b);
    e.createOffer().then(function(k) {
      Mj(a, f, k);
    }).catch(function(k) {
      Y[a] && (T(k), g());
    });
  }
}
function Uj(a, b, c, d, e, f) {
  if (t) {
    return L(140, 1, a, b, c, d, e, f);
  }
  const g = Y[a];
  if (g) {
    var k = K(b);
    b = K(c);
    var l = S(f).bind(null, d), r = S(e).bind(null, d);
    g.setRemoteDescription({sdp:b, type:k}).then(function() {
      return "offer" !== k ? Promise.resolve() : g.createAnswer().then(function(v) {
        Mj(a, r, v);
      });
    }).catch(function(v) {
      Y[a] && (T(v), l());
    });
  }
}
function Vj(a) {
  if (t) {
    return L(141, 1, a);
  }
  a = S(a);
  try {
    const b = [], c = window.speechSynthesis.getVoices();
    for (let e = 0; e < c.length; e++) {
      b.push(`${c[e].lang};${c[e].name}`);
    }
    const d = Gg(b);
    a(b.length, d);
    Hg(d, b.length);
  } catch (b) {
  }
}
function Wj() {
  return t ? L(142, 1) : window.speechSynthesis.paused;
}
function Xj() {
  return t ? L(143, 1) : window.speechSynthesis.X;
}
function Yj() {
  if (t) {
    return L(144, 1);
  }
  window.speechSynthesis.pause();
}
function Zj() {
  if (t) {
    return L(145, 1);
  }
  window.speechSynthesis.resume();
}
function ak(a, b, c, d, e, f, g) {
  if (t) {
    return L(146, 1, a, b, c, d, e, f, g);
  }
  g = S(g);
  a = new SpeechSynthesisUtterance(K(a));
  a.rate = e;
  a.pitch = d;
  a.volume = c / 100;
  a.addEventListener("end", function(k) {
    k.currentTarget.ua(1, k.currentTarget.id, 0);
  });
  a.addEventListener("start", function(k) {
    k.currentTarget.ua(0, k.currentTarget.id, 0);
  });
  a.addEventListener("error", function(k) {
    k.currentTarget.ua(2, k.currentTarget.id, 0);
  });
  a.addEventListener("boundary", function(k) {
    k.currentTarget.ua(3, k.currentTarget.id, k.cd);
  });
  a.id = f;
  a.ua = g;
  b = K(b);
  c = window.speechSynthesis.getVoices();
  for (d = 0; d < c.length; d++) {
    if (c[d].name === b) {
      a.voice = c[d];
      break;
    }
  }
  window.speechSynthesis.resume();
  window.speechSynthesis.speak(a);
}
function bk() {
  if (t) {
    return L(147, 1);
  }
  window.speechSynthesis.cancel();
  window.speechSynthesis.resume();
}
function ck(a, b) {
  if (a = Y[a]) {
    a = V(a.protocol), b(a), R(a);
  }
}
function dk(a, b, c) {
  if (Y[a]) {
    a = 0;
    if (c.data instanceof ArrayBuffer) {
      c = new Uint8Array(c.data);
    } else {
      if (c.data instanceof Blob) {
        T("Blob type not supported");
        return;
      }
      if ("string" === typeof c.data) {
        a = 1;
        var d = new TextEncoder("utf-8");
        c = new Uint8Array(d.encode(c.data));
      } else {
        T("Unknown message type");
        return;
      }
    }
    d = c.length * c.BYTES_PER_ELEMENT;
    var e = Re(d);
    fa().set(c, e);
    b(e, d, a);
    R(e);
  }
}
function ek(a, b) {
  Y[a] && b();
}
function fk(a, b, c) {
  Y[a] && (a = V(c.reason), b(c.code, a, c.wasClean ? 1 : 0), R(a));
}
function gk(a) {
  t ? a = L(148, 1, a) : a = (a = Y[a]) ? a.bufferedAmount : 0;
  return a;
}
function hk(a, b, c) {
  if (t) {
    return L(149, 1, a, b, c);
  }
  c = K(c);
  (a = Y[a]) && a.readyState < a.CLOSING && a.close(b, c);
}
function ik(a, b, c, d, e, f, g) {
  if (t) {
    return L(150, 1, a, b, c, d, e, f, g);
  }
  d = S(d).bind(null, a);
  e = S(e).bind(null, a);
  f = S(f).bind(null, a);
  a = S(g).bind(null, a);
  b = K(b);
  c = K(c);
  g = null;
  try {
    g = c ? new WebSocket(b, c.split(",")) : new WebSocket(b);
  } catch (k) {
    return 0;
  }
  g.binaryType = "arraybuffer";
  c = g;
  b = si(c);
  c.onopen = ck.bind(null, b, d);
  c.onmessage = dk.bind(null, b, e);
  c.onerror = ek.bind(null, b, f);
  c.onclose = fk.bind(null, b, a);
  return b;
}
function jk(a) {
  if (t) {
    return L(151, 1, a);
  }
  const b = Y[a];
  if (b) {
    const c = Y[a];
    c && c.readyState < c.CLOSING && c.close(3001, "destroyed");
    ti(a);
    b.onopen = null;
    b.onmessage = null;
    b.onerror = null;
    b.onclose = null;
  }
}
function kk(a, b, c, d) {
  if (t) {
    return L(152, 1, a, b, c, d);
  }
  const e = new Uint8Array(c);
  let f;
  for (f = 0; f < c; f++) {
    e[f] = pd(b + f, "i8");
  }
  b = e.buffer;
  d || (b = (new TextDecoder("utf-8")).decode(e));
  (a = Y[a]) && a.readyState === a.OPEN ? (a.send(b), a = 0) : a = 1;
  return a;
}
var lk = null, mk = null;
function nk(a) {
  const b = si(this);
  lk.set(a, b);
  let c = 1;
  this.Ic = function() {
    c++;
  };
  this.Nb = function() {
    c--;
    0 === c && (ti(b), lk.delete(a));
  };
  this.nc = function() {
    return a;
  };
  this.ub = function() {
    return b;
  };
}
function ok(a) {
  const b = lk.get(a);
  if (void 0 === b) {
    return (new nk(a)).ub();
  }
  Y[b].Ic();
  return b;
}
function pk(a) {
  a = Y[a];
  if (void 0 !== a) {
    return a.nc();
  }
}
function qk(a, b) {
  switch(a) {
    case 0:
      return null;
    case 1:
      return !!pd(b, "i64");
    case 2:
      return pd(b, "i64");
    case 3:
      return pd(b, "double");
    case 4:
      return K(pd(b, "*"));
    case 24:
      return pk(pd(b, "i64"));
  }
}
function rk(a, b) {
  if (void 0 === a || null === a) {
    return 0;
  }
  const c = typeof a;
  if ("boolean" === c) {
    return M(b, a, "i64"), 1;
  }
  if ("number" === c) {
    if (Number.isInteger(a)) {
      return M(b, a, "i64"), 2;
    }
    M(b, a, "double");
    return 3;
  }
  if ("string" === c) {
    return a = V(a), M(b, a, "*"), 4;
  }
  a = ok(a);
  M(b, a, "i64");
  return 24;
}
function sk(a, b) {
  if (t) {
    return L(153, 1, a, b);
  }
  const c = S(b);
  let d = 0;
  return d = ok(function() {
    if (pk(d)) {
      mk = null;
      var e = Array.from(arguments), f = new nk(e);
      c(a, f.ub(), e.length);
      f.Nb();
      e = mk;
      mk = null;
      return e;
    }
  });
}
function tk(a, b, c, d, e, f, g) {
  if (t) {
    return L(154, 1, a, b, c, d, e, f, g);
  }
  a = K(a);
  if ("undefined" === typeof window[a]) {
    return -1;
  }
  d = S(d);
  g = S(g);
  const k = Array(c);
  for (let l = 0; l < c; l++) {
    const r = d(b, l, e, f), v = pd(f, "*");
    k[l] = qk(r, e);
    v && g(f, r);
  }
  try {
    const l = new window[a](...k);
    return rk(l, e);
  } catch (l) {
    return T(`Error calling constructor ${a} with args:`, k, "error:", l), -1;
  }
}
function uk(a) {
  if (t) {
    return L(155, 1, a);
  }
  a = K(a);
  return "undefined" !== typeof window[a] ? ok(window[a]) : 0;
}
function vk(a, b, c, d, e, f, g, k) {
  if (t) {
    return L(156, 1, a, b, c, d, e, f, g, k);
  }
  a = pk(a);
  if (void 0 === a) {
    return -1;
  }
  b = K(b);
  e = S(e);
  k = S(k);
  const l = Array(d);
  for (let r = 0; r < d; r++) {
    const v = e(c, r, f, g), B = pd(g, "*");
    l[r] = qk(v, f);
    B && k(g, v);
  }
  try {
    const r = a[b](...l);
    return rk(r, f);
  } catch (r) {
    return T(`Error calling method ${b} on:`, a, "error:", r), -1;
  }
}
function wk(a, b, c) {
  if (t) {
    return L(157, 1, a, b, c);
  }
  a = pk(a);
  if (void 0 === a) {
    return 0;
  }
  if (c) {
    c = K(c);
    try {
      return rk(a[c], b);
    } catch (d) {
      return T(`Error getting variable ${c} on object`, a), 0;
    }
  }
  return rk(a, b);
}
function xk(a, b, c) {
  if (t) {
    return L(158, 1, a, b, c);
  }
  a = pk(a);
  if (void 0 === a) {
    return -1;
  }
  b = qk(b, c);
  if (void 0 === b || null === b) {
    return -1;
  }
  try {
    return rk(a[b], c);
  } catch (d) {
    return T(`Error getting variable ${b} on object`, a, d), -1;
  }
}
function yk(a, b, c, d) {
  if (t) {
    return L(159, 1, a, b, c, d);
  }
  a = pk(a);
  if (void 0 !== a) {
    b = K(b);
    try {
      a[b] = qk(c, d);
    } catch (e) {
      T(`Error setting variable ${b} on object`, a);
    }
  }
}
function zk(a, b) {
  if (t) {
    return L(160, 1, a, b);
  }
  mk = qk(a, b);
}
function Ak(a, b, c, d, e) {
  if (t) {
    return L(161, 1, a, b, c, d, e);
  }
  a = pk(a);
  if (void 0 === a) {
    return -1;
  }
  b = qk(b, c);
  try {
    return a[b] = qk(d, e), 0;
  } catch (f) {
    return T(`Error setting variable ${b} on object`, a), -1;
  }
}
function Bk(a) {
  if (t) {
    return L(162, 1, a);
  }
  a = Y[a];
  void 0 !== a && a.Nb();
}
function Ck(a, b, c, d, e, f) {
  if (t) {
    return L(163, 1, a, b, c, d, e, f);
  }
  const g = P;
  if ("undefined" === typeof g.zb) {
    const k = g.v.getExtension("OVR_multiview2");
    if (!k) {
      T("Trying to call glFramebufferTextureMultiviewOVR() without the OVR_multiview2 extension");
      return;
    }
    g.zb = k;
  }
  g.zb.framebufferTextureMultiviewOVR(a, b, Fe[c], d, e, f);
}
function Dk(a, b, c, d) {
  if (t) {
    return L(164, 1, a, b, c, d);
  }
  var e = Dh();
  (e = Ie[e]) && e.v.getBufferSubData(a, b, fa(), d, c);
}
var Ek = null, Z = null, Fk = null, Gk = null, Hk = null, Ik = null, Jk = null, Kk = 1, Lk = [, , , , , , , , , , , , , , , ], Mk = [, , , , ], Nk = null, Ok = null, Pk = a => {
  Z && Hk ? Z.requestAnimationFrame(function(b, c) {
    Ik = c;
    Jk = c.getViewerPose(Hk);
    a(b);
    Jk = Ik = null;
  }) : Ok(a);
}, Qk = () => {
  lf = null;
  sf++;
  db += 1;
  window.setTimeout(function() {
    qf();
    zf();
  }, 0);
}, Rk = () => {
  const a = Jk ? Jk.views.length : 1;
  var b = Gk;
  if (b && Kk === a) {
    return b;
  }
  if (!Z || !Fk) {
    return null;
  }
  b = Ek;
  b = Fk.createProjectionLayer({textureType:1 < a ? "texture-array" : "texture", colorFormat:b.RGBA8, depthFormat:b.DEPTH_COMPONENT24});
  Z.updateRenderState({layers:[b]});
  Gk = b;
  Kk = a;
  return b;
}, Sk = () => {
  if (!Jk) {
    return null;
  }
  const a = Rk();
  return null === a ? null : Fk.getViewSubImage(a, Jk.views[0]);
}, Tk = a => {
  if (void 0 !== a.name) {
    return a.name;
  }
  const b = Pe(Fe);
  a.name = b;
  Fe[b] = a;
  return b;
}, Uk = a => {
  let b = -1;
  if ("tracked-pointer" === a.targetRayMode && "left" === a.handedness) {
    b = 0;
  } else if ("tracked-pointer" === a.targetRayMode && "right" === a.handedness) {
    b = 1;
  } else {
    for (var c = 2; 16 > c; c++) {
      if (!Lk[c]) {
        b = c;
        break;
      }
    }
  }
  if (0 <= b && (Lk[b] = a, a.name = b, "screen" === a.targetRayMode)) {
    c = -1;
    for (let d = 0; 5 > d; d++) {
      if (!Mk[d]) {
        c = d;
        break;
      }
    }
    0 <= c && (Mk[c] = a, a.Pa = c);
  }
  return b;
}, Vk = a => {
  if (void 0 !== a.name) {
    const b = a.name;
    0 <= b && 16 > b && (Lk[b] = null);
    void 0 !== a.Pa && (a = a.Pa, 0 <= a && 5 > a && (Mk[a] = null));
    return b;
  }
  return -1;
};
function Wk(a) {
  if (t) {
    return L(165, 1, a);
  }
  if (!Hk || !Hk.boundsGeometry) {
    return 0;
  }
  const b = Hk.boundsGeometry.length;
  if (0 === b) {
    return 0;
  }
  const c = Re(12 * b);
  for (let d = 0; d < b; d++) {
    const e = Hk.boundsGeometry[d];
    M(c + 12 * d, e.x, "float");
    M(c + 4 * (3 * d + 1), e.y, "float");
    M(c + 4 * (3 * d + 2), e.z, "float");
  }
  M(a, c, "i32");
  return b;
}
function Xk() {
  if (t) {
    return L(166, 1);
  }
  const a = Sk();
  return null === a ? 0 : Tk(a.colorTexture);
}
function Yk() {
  if (t) {
    return L(167, 1);
  }
  const a = Sk();
  return null !== a && a.depthStencilTexture ? Tk(a.depthStencilTexture) : 0;
}
function Zk() {
  return t ? L(168, 1) : Z && void 0 !== Z.frameRate ? Z.frameRate : 0;
}
function $k(a, b) {
  if (t) {
    return L(169, 1, a, b);
  }
  if (!Z || !Jk) {
    return !1;
  }
  a = Jk.views[a].projectionMatrix;
  for (let c = 0; 16 > c; c++) {
    M(b + 4 * c, a[c], "float");
  }
  return !0;
}
function al(a) {
  if (t) {
    return L(170, 1, a);
  }
  const b = Sk();
  if (null === b) {
    return !1;
  }
  M(a + 0, b.viewport.width, "i32");
  M(a + 4, b.viewport.height, "i32");
  return !0;
}
function bl(a) {
  if (t) {
    return L(171, 1, a);
  }
  if (!Z || void 0 === Z.supportedFrameRates) {
    return 0;
  }
  const b = Z.supportedFrameRates.length;
  if (0 === b) {
    return 0;
  }
  const c = Re(4 * b);
  for (let d = 0; d < b; d++) {
    M(c + 4 * d, Z.supportedFrameRates[d], "float");
  }
  M(a, c, "i32");
  return b;
}
function cl(a, b) {
  if (t) {
    return L(172, 1, a, b);
  }
  if (!Z || !Jk) {
    return !1;
  }
  var c = Jk.views;
  a = 0 <= a ? c[a].transform.matrix : Jk.transform.matrix;
  for (c = 0; 16 > c; c++) {
    M(b + 4 * c, a[c], "float");
  }
  return !0;
}
function dl() {
  if (t) {
    return L(173, 1);
  }
  const a = Sk();
  return null !== a && a.motionVectorTexture ? Tk(a.motionVectorTexture) : 0;
}
function el() {
  if (t) {
    return L(174, 1);
  }
  if (!Z || !Jk) {
    return 1;
  }
  const a = Jk.views.length;
  return 0 < a ? a : 1;
}
function fl() {
  return t ? L(175, 1) : Z && Z.visibilityState ? V(Z.visibilityState) : 0;
}
function gl(a, b, c, d, e, f, g, k, l) {
  if (t) {
    return L(176, 1, a, b, c, d, e, f, g, k, l);
  }
  null === Ok && (Ok = pf);
  pf = Pk;
  a = K(a);
  b = K(b).split(",").map(y => y.trim()).filter(y => "" !== y);
  c = K(c).split(",").map(y => y.trim()).filter(y => "" !== y);
  const r = K(d).split(",").map(y => y.trim()), v = S(e), B = S(f), E = S(g), u = S(k), C = S(l);
  d = {};
  0 < b.length && (d.requiredFeatures = b);
  0 < c.length && (d.optionalFeatures = c);
  navigator.xr.requestSession(a, d).then(function(y) {
    Z = y;
    y.addEventListener("end", function() {
      B();
    });
    y.addEventListener("inputsourceschange", function(aa) {
      aa.added.forEach(Uk);
      aa.removed.forEach(Vk);
    });
    ["selectstart", "selectend", "squeezestart", "squeezeend"].forEach((aa, ka) => {
      y.addEventListener(aa, function(U) {
        Ik = U.frame;
        U = U.inputSource;
        u(ka, void 0 !== U ? U.name : -1);
        Ik = null;
      });
    });
    y.addEventListener("visibilitychange", function() {
      const aa = V("visibility_state_changed");
      C(aa);
      R(aa);
    });
    Nk = C;
    const O = Dh(), ca = Ie[O].v;
    Ek = ca;
    ca.makeXRCompatible().then(function() {
      function aa(U, Ja) {
        Hk = U;
        U.onreset = function() {
          const Ka = V("reference_space_reset");
          C(Ka);
          R(Ka);
        };
        Qk();
        window.setTimeout(function() {
          const Ka = V(Ja);
          v(Ka);
          R(Ka);
        }, 0);
      }
      function ka() {
        const U = r.shift();
        y.requestReferenceSpace(U).then(Ja => {
          aa(Ja, U);
        }).catch(() => {
          if (0 === r.length) {
            const Ja = V("Unable to get any of the requested reference space types");
            E(Ja);
            R(Ja);
          } else {
            ka();
          }
        });
      }
      Fk = new XRWebGLBinding(y, ca);
      Rk();
      ka();
    }).catch(function(aa) {
      aa = V(`Unable to make WebGL context compatible with WebXR: ${aa}`);
      E(aa);
      R(aa);
    });
  }).catch(function(y) {
    y = V(`Unable to start session: ${y}`);
    E(y);
    R(y);
  });
}
function hl(a, b) {
  if (t) {
    return L(177, 1, a, b);
  }
  const c = K(a), d = S(b);
  navigator.xr ? navigator.xr.isSessionSupported(c).then(function(e) {
    const f = V(c);
    d(f, e ? 1 : 0);
    R(f);
  }) : (a = V(c), d(a, 0), R(a));
}
function il() {
  return t ? L(178, 1) : !!navigator.xr;
}
function jl() {
  if (t) {
    return L(179, 1);
  }
  Z && Z.end().catch(() => {
  });
  Jk = Ik = Hk = Gk = Fk = Z = null;
  Kk = 1;
  Lk = Array(16);
  Mk = Array(5);
  Nk = null;
  null === Ok && (Ok = pf);
  pf = Ok;
  Qk();
}
function kl(a, b, c, d, e, f, g, k, l, r, v) {
  if (t) {
    return L(180, 1, a, b, c, d, e, f, g, k, l, r, v);
  }
  if (!Z || !Ik) {
    return 0;
  }
  if (0 > a || a >= Lk.length || !Lk[a]) {
    return !1;
  }
  a = Lk[a];
  const B = Ik, E = Hk;
  var u = B.getPose(a.targetRaySpace, E);
  if (!u) {
    return !1;
  }
  u = u.transform.matrix;
  for (let C = 0; 16 > C; C++) {
    M(b + 4 * C, u[C], "float");
  }
  b = 0;
  switch(a.targetRayMode) {
    case "gaze":
      b = 1;
      break;
    case "tracked-pointer":
      b = 2;
      break;
    case "screen":
      b = 3;
  }
  M(c, b, "i32");
  M(d, void 0 !== a.Pa ? a.Pa : -1, "i32");
  c = !1;
  if (a.gripSpace && (d = B.getPose(a.gripSpace, E))) {
    c = d.transform.matrix;
    for (d = 0; 16 > d; d++) {
      M(f + 4 * d, c[d], "float");
    }
    c = !0;
  }
  M(e, c ? 1 : 0, "i32");
  e = !1;
  c = f = 0;
  if (a.gamepad) {
    "xr-standard" === a.gamepad.mapping && (e = !0);
    f = Math.min(a.gamepad.buttons.length, 10);
    for (c = 0; c < f; c++) {
      M(l + 4 * c, a.gamepad.buttons[c].value, "float");
    }
    c = Math.min(a.gamepad.axes.length, 10);
    for (l = 0; l < c; l++) {
      M(v + 4 * l, a.gamepad.axes[l], "float");
    }
  }
  M(g, e ? 1 : 0, "i32");
  M(k, f, "i32");
  M(r, c, "i32");
  return !0;
}
function ll(a) {
  if (t) {
    return L(181, 1, a);
  }
  Z && void 0 !== Z.updateTargetFrameRate && Z.updateTargetFrameRate(a).then(() => {
    const b = V("display_refresh_rate_changed");
    Nk(b);
    R(b);
  });
}
var ml = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], nl = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function ol(a, b) {
  w(0 <= a.length, "writeArrayToMemory array must have a length (should be an array or typed array)");
  h().set(a, b);
}
function pl(a, b, c, d) {
  function e(u, C, y) {
    for (u = "number" == typeof u ? u.toString() : u || ""; u.length < C;) {
      u = y[0] + u;
    }
    return u;
  }
  function f(u, C) {
    return e(u, C, "0");
  }
  function g(u, C) {
    function y(ca) {
      return 0 > ca ? -1 : 0 < ca ? 1 : 0;
    }
    var O;
    0 === (O = y(u.getFullYear() - C.getFullYear())) && 0 === (O = y(u.getMonth() - C.getMonth())) && (O = y(u.getDate() - C.getDate()));
    return O;
  }
  function k(u) {
    switch(u.getDay()) {
      case 0:
        return new Date(u.getFullYear() - 1, 11, 29);
      case 1:
        return u;
      case 2:
        return new Date(u.getFullYear(), 0, 3);
      case 3:
        return new Date(u.getFullYear(), 0, 2);
      case 4:
        return new Date(u.getFullYear(), 0, 1);
      case 5:
        return new Date(u.getFullYear() - 1, 11, 31);
      case 6:
        return new Date(u.getFullYear() - 1, 11, 30);
    }
  }
  function l(u) {
    var C = u.ca;
    for (u = new Date((new Date(u.da + 1900, 0, 1)).getTime()); 0 < C;) {
      var y = u.getMonth(), O = (Ye(u.getFullYear()) ? ml : nl)[y];
      if (C > O - u.getDate()) {
        C -= O - u.getDate() + 1, u.setDate(1), 11 > y ? u.setMonth(y + 1) : (u.setMonth(0), u.setFullYear(u.getFullYear() + 1));
      } else {
        u.setDate(u.getDate() + C);
        break;
      }
    }
    y = new Date(u.getFullYear() + 1, 0, 4);
    C = k(new Date(u.getFullYear(), 0, 4));
    y = k(y);
    return 0 >= g(C, u) ? 0 >= g(y, u) ? u.getFullYear() + 1 : u.getFullYear() : u.getFullYear() - 1;
  }
  var r = m()[d + 40 >> 2];
  d = {Vc:m()[d >> 2], Uc:m()[d + 4 >> 2], Na:m()[d + 8 >> 2], eb:m()[d + 12 >> 2], Oa:m()[d + 16 >> 2], da:m()[d + 20 >> 2], M:m()[d + 24 >> 2], ca:m()[d + 28 >> 2], Md:m()[d + 32 >> 2], Tc:m()[d + 36 >> 2], Wc:r ? K(r) : ""};
  c = K(c);
  r = {"%c":"%a %b %d %H:%M:%S %Y", "%D":"%m/%d/%y", "%F":"%Y-%m-%d", "%h":"%b", "%r":"%I:%M:%S %p", "%R":"%H:%M", "%T":"%H:%M:%S", "%x":"%m/%d/%y", "%X":"%H:%M:%S", "%Ec":"%c", "%EC":"%C", "%Ex":"%m/%d/%y", "%EX":"%H:%M:%S", "%Ey":"%y", "%EY":"%Y", "%Od":"%d", "%Oe":"%e", "%OH":"%H", "%OI":"%I", "%Om":"%m", "%OM":"%M", "%OS":"%S", "%Ou":"%u", "%OU":"%U", "%OV":"%V", "%Ow":"%w", "%OW":"%W", "%Oy":"%y"};
  for (var v in r) {
    c = c.replace(new RegExp(v, "g"), r[v]);
  }
  var B = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), E = "January February March April May June July August September October November December".split(" ");
  r = {"%a":function(u) {
    return B[u.M].substring(0, 3);
  }, "%A":function(u) {
    return B[u.M];
  }, "%b":function(u) {
    return E[u.Oa].substring(0, 3);
  }, "%B":function(u) {
    return E[u.Oa];
  }, "%C":function(u) {
    return f((u.da + 1900) / 100 | 0, 2);
  }, "%d":function(u) {
    return f(u.eb, 2);
  }, "%e":function(u) {
    return e(u.eb, 2, " ");
  }, "%g":function(u) {
    return l(u).toString().substring(2);
  }, "%G":function(u) {
    return l(u);
  }, "%H":function(u) {
    return f(u.Na, 2);
  }, "%I":function(u) {
    u = u.Na;
    0 == u ? u = 12 : 12 < u && (u -= 12);
    return f(u, 2);
  }, "%j":function(u) {
    for (var C = 0, y = 0; y <= u.Oa - 1; C += (Ye(u.da + 1900) ? ml : nl)[y++]) {
    }
    return f(u.eb + C, 3);
  }, "%m":function(u) {
    return f(u.Oa + 1, 2);
  }, "%M":function(u) {
    return f(u.Uc, 2);
  }, "%n":function() {
    return "\n";
  }, "%p":function(u) {
    return 0 <= u.Na && 12 > u.Na ? "AM" : "PM";
  }, "%S":function(u) {
    return f(u.Vc, 2);
  }, "%t":function() {
    return "\t";
  }, "%u":function(u) {
    return u.M || 7;
  }, "%U":function(u) {
    return f(Math.floor((u.ca + 7 - u.M) / 7), 2);
  }, "%V":function(u) {
    var C = Math.floor((u.ca + 7 - (u.M + 6) % 7) / 7);
    2 >= (u.M + 371 - u.ca - 2) % 7 && C++;
    if (C) {
      53 == C && (y = (u.M + 371 - u.ca) % 7, 4 == y || 3 == y && Ye(u.da) || (C = 1));
    } else {
      C = 52;
      var y = (u.M + 7 - u.ca - 1) % 7;
      (4 == y || 5 == y && Ye(u.da % 400 - 1)) && C++;
    }
    return f(C, 2);
  }, "%w":function(u) {
    return u.M;
  }, "%W":function(u) {
    return f(Math.floor((u.ca + 7 - (u.M + 6) % 7) / 7), 2);
  }, "%y":function(u) {
    return (u.da + 1900).toString().substring(2);
  }, "%Y":function(u) {
    return u.da + 1900;
  }, "%z":function(u) {
    u = u.Tc;
    var C = 0 <= u;
    u = Math.abs(u) / 60;
    return (C ? "+" : "-") + String("0000" + (u / 60 * 100 + u % 60)).slice(-4);
  }, "%Z":function(u) {
    return u.Wc;
  }, "%%":function() {
    return "%";
  }};
  c = c.replace(/%%/g, "\x00\x00");
  for (v in r) {
    c.includes(v) && (c = c.replace(new RegExp(v, "g"), r[v](d)));
  }
  c = c.replace(/\0\0/g, "%");
  v = Tb(c, !1);
  if (v.length > b) {
    return 0;
  }
  ol(v, a);
  return v.length - 1;
}
function ql(a) {
  var b = Rb(a) + 1, c = bg(b);
  Vd(a, c, b);
  return c;
}
function rl(a) {
  var b = q["_" + a];
  w(b, "Cannot call unknown function " + a + ", make sure it is exported");
  return b;
}
function sl(a, b, c, d) {
  var e = {string:r => {
    var v = 0;
    null !== r && void 0 !== r && 0 !== r && (v = ql(r));
    return v;
  }, array:r => {
    var v = bg(r.length);
    ol(r, v);
    return v;
  }};
  a = rl(a);
  var f = [], g = 0;
  w("array" !== b, 'Return type should not be "array".');
  if (d) {
    for (var k = 0; k < d.length; k++) {
      var l = e[c[k]];
      l ? (0 === g && (g = ag()), f[k] = l(d[k])) : f[k] = d[k];
    }
  }
  c = a.apply(null, f);
  return c = function(r) {
    0 !== g && od(g);
    return "string" === b ? K(r) : "boolean" === b ? !!r : r;
  }(c);
}
F.sc();
function Fc(a, b, c, d) {
  a ||= this;
  this.parent = a;
  this.u = a.u;
  this.I = null;
  this.id = wc++;
  this.name = b;
  this.mode = c;
  this.h = {};
  this.j = {};
  this.qa = d;
}
Object.defineProperties(Fc.prototype, {read:{get:function() {
  return 365 === (this.mode & 365);
}, set:function(a) {
  a ? this.mode |= 365 : this.mode &= -366;
}}, write:{get:function() {
  return 146 === (this.mode & 146);
}, set:function(a) {
  a ? this.mode |= 146 : this.mode &= -147;
}}});
hb();
xc = Array(4096);
nb(H, "/");
Qc("/tmp");
Qc("/home");
Qc("/home/web_user");
(() => {
  Qc("/dev");
  Yb(259, {read:() => 0, write:(d, e, f, g) => g});
  Rc("/dev/null", 259);
  Xb(1280, $b);
  Xb(1536, ac);
  Rc("/dev/tty", 1280);
  Rc("/dev/tty1", 1536);
  var a = new Uint8Array(1024), b = 0, c = () => {
    0 === b && (b = Nb(a).byteLength);
    return a[--b];
  };
  ib("random", c);
  ib("urandom", c);
  Qc("/dev/shm");
  Qc("/dev/shm/tmp");
})();
(() => {
  Qc("/proc");
  var a = Qc("/proc/self");
  Qc("/proc/self/fd");
  nb({u:() => {
    var b = cc(a, "fd", 16895, 73);
    b.h = {na:(c, d) => {
      var e = vc[+d];
      if (!e) {
        throw new G(8);
      }
      c = {parent:null, u:{oa:"fake"}, h:{sa:() => e.path}};
      return c.parent = c;
    }};
    return b;
  }}, "/proc/self/fd");
})();
rc = {EPERM:63, ENOENT:44, ESRCH:71, EINTR:27, EIO:29, ENXIO:60, E2BIG:1, ENOEXEC:45, EBADF:8, ECHILD:12, EAGAIN:6, EWOULDBLOCK:6, ENOMEM:48, EACCES:2, EFAULT:21, ENOTBLK:105, EBUSY:10, EEXIST:20, EXDEV:75, ENODEV:43, ENOTDIR:54, EISDIR:31, EINVAL:28, ENFILE:41, EMFILE:33, ENOTTY:59, ETXTBSY:74, EFBIG:22, ENOSPC:51, ESPIPE:70, EROFS:69, EMLINK:34, EPIPE:64, EDOM:18, ERANGE:68, ENOMSG:49, EIDRM:24, ECHRNG:106, EL2NSYNC:156, EL3HLT:107, EL3RST:108, ELNRNG:109, EUNATCH:110, ENOCSI:111, EL2HLT:112, EDEADLK:16, 
ENOLCK:46, EBADE:113, EBADR:114, EXFULL:115, ENOANO:104, EBADRQC:103, EBADSLT:102, EDEADLOCK:16, EBFONT:101, ENOSTR:100, ENODATA:116, ETIME:117, ENOSR:118, ENONET:119, ENOPKG:120, EREMOTE:121, ENOLINK:47, EADV:122, ESRMNT:123, ECOMM:124, EPROTO:65, EMULTIHOP:36, EDOTDOT:125, EBADMSG:9, ENOTUNIQ:126, EBADFD:127, EREMCHG:128, ELIBACC:129, ELIBBAD:130, ELIBSCN:131, ELIBMAX:132, ELIBEXEC:133, ENOSYS:52, ENOTEMPTY:55, ENAMETOOLONG:37, ELOOP:32, EOPNOTSUPP:138, EPFNOSUPPORT:139, ECONNRESET:15, ENOBUFS:42, 
EAFNOSUPPORT:5, EPROTOTYPE:67, ENOTSOCK:57, ENOPROTOOPT:50, ESHUTDOWN:140, ECONNREFUSED:14, EADDRINUSE:3, ECONNABORTED:13, ENETUNREACH:40, ENETDOWN:38, ETIMEDOUT:73, EHOSTDOWN:142, EHOSTUNREACH:23, EINPROGRESS:26, EALREADY:7, EDESTADDRREQ:17, EMSGSIZE:35, EPROTONOSUPPORT:66, ESOCKTNOSUPPORT:137, EADDRNOTAVAIL:4, ENETRESET:39, EISCONN:30, ENOTCONN:53, ETOOMANYREFS:141, EUSERS:136, EDQUOT:19, ESTALE:72, ENOTSUP:138, ENOMEDIUM:148, EILSEQ:25, EOVERFLOW:61, ECANCELED:11, ENOTRECOVERABLE:56, EOWNERDEAD:62, 
ESTRPIPE:135};
var Q;
q.requestFullscreen = function(a, b) {
  Kf(a, b);
};
q.requestFullScreen = function() {
  ua("Module.requestFullScreen has been replaced by Module.requestFullscreen (without a capital S)");
};
q.requestAnimationFrame = function(a) {
  pf(a);
};
q.setCanvasSize = function(a, b, c) {
  Mf(q.canvas, a, b);
  c || Nf();
};
q.pauseMainLoop = function() {
  lf = null;
  sf++;
};
q.resumeMainLoop = function() {
  zf();
};
q.getUserMedia = function() {
  window.getUserMedia || (window.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia);
  window.getUserMedia(void 0);
};
q.createContext = function(a, b, c, d) {
  return Gf(a, b, c, d);
};
for (var tl = new Int32Array(288), ul = 0; 288 > ul; ++ul) {
  Yf[ul] = tl.subarray(0, ul + 1);
}
var vl = new Float32Array(288);
for (ul = 0; 288 > ul; ++ul) {
  Zf[ul] = vl.subarray(0, ul + 1);
}
q.request_quit = function() {
  Ug();
};
q.onExit = function(a) {
  const b = Ng;
  Rg();
  W = null;
  Ig = "en";
  Jg = 2;
  Lg = Kg = !1;
  Ng = Mg = null;
  b && b(a);
};
Wg = Promise.resolve();
q.initConfig = function(a) {
  Jg = a.canvasResizePolicy;
  W = a.canvas;
  Ig = a.locale || Ig;
  Kg = a.virtualKeyboard;
  Lg = !!a.persistentDrops;
  Mg = a.onExecute;
  Ng = a.onExit;
  a.focusCanvas && W.focus();
};
q.initFS = function(a) {
  Og = !1;
  if (!Array.isArray(a)) {
    return Promise.reject(Error("Persistent paths must be an array"));
  }
  if (!a.length) {
    return Promise.resolve();
  }
  Qg = a.slice();
  Qg.forEach(function(b) {
    try {
      jc(b);
    } catch (c) {
      44 !== c.g && T(c), lc(b);
    }
    nb(I, b);
  });
  return new Promise(function(b) {
    Nc(!0, function(c) {
      c ? (Qg = [], Og = !1, Bg(`IndexedDB not available: ${c.message}`)) : Og = !0;
      b(c);
    });
  });
};
q.copyToFS = Tg;
Vg.push(function(a) {
  th();
  a();
});
Vg.push(function(a) {
  wh();
  a();
});
Vg.push(function(a) {
  Fh && (Fh.remove(), Fh = null);
  Gh && (Gh.remove(), Gh = null);
  a();
});
lk = new Map();
var wl = [null, cd, ed, ud, wd, Gd, Md, Nd, Od, Qd, Rd, Sd, Td, Wd, Xd, Yd, Zd, $d, ae, be, ce, de, ee, fe, ge, he, ie, je, ke, le, me, ne, oe, pe, cf, Qf, jg, kg, lg, og, sg, tg, ug, vg, wg, xg, yg, zg, eh, fh, gh, hh, ih, jh, lh, mh, nh, oh, Lh, Mh, Nh, Oh, Ph, Qh, Rh, Sh, Th, Uh, Vh, Wh, Xh, Yh, Zh, $h, ai, bi, ci, di, ei, fi, gi, hi, ii, ji, ki, li, mi, ni, oi, pi, qi, zi, Ai, Bi, Ci, Di, Ei, Fi, Ui, Vi, Wi, Xi, Yi, Zi, $i, aj, bj, cj, dj, ej, fj, gj, hj, ij, jj, kj, lj, mj, nj, qj, rj, vj, wj, 
xj, yj, zj, Aj, Bj, Cj, Dj, Ej, Fj, Gj, Nj, Oj, Pj, Qj, Rj, Sj, Tj, Uj, Vj, Wj, Xj, Yj, Zj, ak, bk, gk, hk, ik, jk, kk, sk, tk, uk, vk, wk, xk, yk, zk, Ak, Bk, Ck, Dk, Wk, Xk, Yk, Zk, $k, al, bl, cl, dl, el, fl, gl, hl, il, jl, kl, ll], Kl = {__assert_fail:function(a, b, c, d) {
  ua(`Assertion failed: ${K(a)}, at: ` + [b ? K(b) : "unknown filename", c, d ? K(d) : "unknown function"]);
}, __call_sighandler:function(a, b) {
  rd(a)(b);
}, __dlsym:function() {
  ua("To use dlopen, you need enable dynamic linking, see https://emscripten.org/docs/compiling/Dynamic-Linking.html");
}, __emscripten_init_main_thread_js:function(a) {
  xl(a, !Aa, 1, !za, 2097152);
  F.Jb();
}, __emscripten_thread_cleanup:function(a) {
  t ? postMessage({cmd:"cleanupThread", thread:a}) : Fb(a);
}, __pthread_create_js:vd, __syscall__newselect:wd, __syscall_accept4:Gd, __syscall_bind:Md, __syscall_chdir:Nd, __syscall_chmod:Od, __syscall_connect:Qd, __syscall_faccessat:Rd, __syscall_fchmod:Sd, __syscall_fcntl64:Td, __syscall_getcwd:Wd, __syscall_getdents64:Xd, __syscall_getsockname:Yd, __syscall_getsockopt:Zd, __syscall_ioctl:$d, __syscall_listen:ae, __syscall_lstat64:be, __syscall_mkdirat:ce, __syscall_newfstatat:de, __syscall_openat:ee, __syscall_poll:fe, __syscall_readlinkat:ge, __syscall_recvfrom:he, 
__syscall_renameat:ie, __syscall_rmdir:je, __syscall_sendto:ke, __syscall_socket:le, __syscall_stat64:me, __syscall_statfs64:ne, __syscall_symlink:oe, __syscall_unlinkat:pe, _emscripten_get_now_is_monotonic:function() {
  return !0;
}, _emscripten_notify_mailbox_postmessage:function(a, b) {
  a == b ? setTimeout(() => md()) : t ? postMessage({targetThread:a, cmd:"checkMailbox"}) : (b = F.R[a]) ? b.postMessage({cmd:"checkMailbox"}) : x("Cannot send message to thread with ID " + a + ", unknown thread ID!");
}, _emscripten_proxied_gl_context_activated_from_main_browser_thread:function(a) {
  Q = q.la = P = a;
}, _emscripten_set_offscreencanvas_size:function() {
  x("emscripten_set_offscreencanvas_size: Build with -sOFFSCREENCANVAS_SUPPORT=1 to enable transferring canvases to pthreads.");
  return -1;
}, _emscripten_thread_mailbox_await:se, _emscripten_thread_set_strongref:function() {
}, _emscripten_throw_longjmp:function() {
  throw Infinity;
}, _gmtime_js:function(a, b) {
  a = new Date(1e3 * Xe(a));
  m()[b >> 2] = a.getUTCSeconds();
  m()[b + 4 >> 2] = a.getUTCMinutes();
  m()[b + 8 >> 2] = a.getUTCHours();
  m()[b + 12 >> 2] = a.getUTCDate();
  m()[b + 16 >> 2] = a.getUTCMonth();
  m()[b + 20 >> 2] = a.getUTCFullYear() - 1900;
  m()[b + 24 >> 2] = a.getUTCDay();
  a = (a.getTime() - Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864E5 | 0;
  m()[b + 28 >> 2] = a;
}, _localtime_js:function(a, b) {
  a = new Date(1e3 * Xe(a));
  m()[b >> 2] = a.getSeconds();
  m()[b + 4 >> 2] = a.getMinutes();
  m()[b + 8 >> 2] = a.getHours();
  m()[b + 12 >> 2] = a.getDate();
  m()[b + 16 >> 2] = a.getMonth();
  m()[b + 20 >> 2] = a.getFullYear() - 1900;
  m()[b + 24 >> 2] = a.getDay();
  var c = (Ye(a.getFullYear()) ? Ze : $e)[a.getMonth()] + a.getDate() - 1 | 0;
  m()[b + 28 >> 2] = c;
  m()[b + 36 >> 2] = -(60 * a.getTimezoneOffset());
  c = (new Date(a.getFullYear(), 6, 1)).getTimezoneOffset();
  var d = (new Date(a.getFullYear(), 0, 1)).getTimezoneOffset();
  a = (c != d && a.getTimezoneOffset() == Math.min(d, c)) | 0;
  m()[b + 32 >> 2] = a;
}, _setitimer_js:cf, _tzset_js:function(a, b, c) {
  function d(r) {
    return (r = r.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? r[1] : "GMT";
  }
  var e = (new Date()).getFullYear(), f = new Date(e, 0, 1), g = new Date(e, 6, 1);
  e = f.getTimezoneOffset();
  var k = g.getTimezoneOffset(), l = Math.max(e, k);
  n()[a >> 2] = 60 * l;
  m()[b >> 2] = Number(e != k);
  a = d(f);
  b = d(g);
  a = ef(a);
  b = ef(b);
  k < e ? (n()[c >> 2] = a, n()[c + 4 >> 2] = b) : (n()[c >> 2] = b, n()[c + 4 >> 2] = a);
}, abort:function() {
  ua("native code called abort()");
}, dlopen:function() {
  ua("To use dlopen, you need enable dynamic linking, see https://emscripten.org/docs/compiling/Dynamic-Linking.html");
}, emscripten_cancel_main_loop:function() {
  lf = null;
  sf++;
  jf = null;
}, emscripten_check_blocking_allowed:function() {
  Aa || Cb("Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread");
}, emscripten_console_error:function(a) {
  w("number" == typeof a);
  console.error(K(a));
}, emscripten_date_now:function() {
  return Date.now();
}, emscripten_exit_with_live_runtime:function() {
  db += 1;
  throw "unwind";
}, emscripten_force_exit:Qf, emscripten_get_now:bf, emscripten_glActiveTexture:function(a) {
  Q.activeTexture(a);
}, emscripten_glAttachShader:function(a, b) {
  Q.attachShader(Ce[a], Ge[b]);
}, emscripten_glBeginTransformFeedback:function(a) {
  Q.beginTransformFeedback(a);
}, emscripten_glBindBuffer:function(a, b) {
  35051 == a ? Q.Ta = b : 35052 == a && (Q.ea = b);
  Q.bindBuffer(a, Be[b]);
}, emscripten_glBindBufferBase:function(a, b, c) {
  Q.bindBufferBase(a, b, Be[c]);
}, emscripten_glBindBufferRange:function(a, b, c, d, e) {
  Q.bindBufferRange(a, b, Be[c], d, e);
}, emscripten_glBindFramebuffer:function(a, b) {
  Q.bindFramebuffer(a, b ? De[b] : P.Ua);
}, emscripten_glBindRenderbuffer:function(a, b) {
  Q.bindRenderbuffer(a, Ee[b]);
}, emscripten_glBindTexture:function(a, b) {
  Q.bindTexture(a, Fe[b]);
}, emscripten_glBindVertexArray:function(a) {
  Q.bindVertexArray(He[a]);
}, emscripten_glBlendColor:function(a, b, c, d) {
  Q.blendColor(a, b, c, d);
}, emscripten_glBlendEquation:function(a) {
  Q.blendEquation(a);
}, emscripten_glBlendFunc:function(a, b) {
  Q.blendFunc(a, b);
}, emscripten_glBlendFuncSeparate:function(a, b, c, d) {
  Q.blendFuncSeparate(a, b, c, d);
}, emscripten_glBlitFramebuffer:function(a, b, c, d, e, f, g, k, l, r) {
  Q.blitFramebuffer(a, b, c, d, e, f, g, k, l, r);
}, emscripten_glBufferData:function(a, b, c, d) {
  2 <= P.version ? c && b ? Q.bufferData(a, fa(), d, c, b) : Q.bufferData(a, b, d) : Q.bufferData(a, c ? fa().subarray(c, c + b) : b, d);
}, emscripten_glBufferSubData:function(a, b, c, d) {
  2 <= P.version ? c && Q.bufferSubData(a, b, fa(), d, c) : Q.bufferSubData(a, b, fa().subarray(d, d + c));
}, emscripten_glCheckFramebufferStatus:function(a) {
  return Q.checkFramebufferStatus(a);
}, emscripten_glClear:function(a) {
  Q.clear(a);
}, emscripten_glClearBufferfv:function(a, b, c) {
  Q.clearBufferfv(a, b, p(), c >> 2);
}, emscripten_glClearColor:function(a, b, c, d) {
  Q.clearColor(a, b, c, d);
}, emscripten_glClearDepthf:function(a) {
  Q.clearDepth(a);
}, emscripten_glColorMask:function(a, b, c, d) {
  Q.colorMask(!!a, !!b, !!c, !!d);
}, emscripten_glCompileShader:function(a) {
  Q.compileShader(Ge[a]);
}, emscripten_glCompressedTexImage2D:function(a, b, c, d, e, f, g, k) {
  2 <= P.version ? Q.ea || !g ? Q.compressedTexImage2D(a, b, c, d, e, f, g, k) : Q.compressedTexImage2D(a, b, c, d, e, f, fa(), k, g) : Q.compressedTexImage2D(a, b, c, d, e, f, k ? fa().subarray(k, k + g) : null);
}, emscripten_glCopyBufferSubData:function(a, b, c, d, e) {
  Q.copyBufferSubData(a, b, c, d, e);
}, emscripten_glCreateProgram:function() {
  var a = Pe(Ce), b = Q.createProgram();
  b.name = a;
  b.Da = b.Ba = b.Ca = 0;
  b.fb = 1;
  Ce[a] = b;
  return a;
}, emscripten_glCreateShader:function(a) {
  var b = Pe(Ge);
  Ge[b] = Q.createShader(a);
  return b;
}, emscripten_glCullFace:function(a) {
  Q.cullFace(a);
}, emscripten_glDeleteBuffers:function(a, b) {
  for (var c = 0; c < a; c++) {
    var d = m()[b + 4 * c >> 2], e = Be[d];
    e && (Q.deleteBuffer(e), e.name = 0, Be[d] = null, d == Q.Ta && (Q.Ta = 0), d == Q.ea && (Q.ea = 0));
  }
}, emscripten_glDeleteFramebuffers:function(a, b) {
  for (var c = 0; c < a; ++c) {
    var d = m()[b + 4 * c >> 2], e = De[d];
    e && (Q.deleteFramebuffer(e), e.name = 0, De[d] = null);
  }
}, emscripten_glDeleteProgram:function(a) {
  if (a) {
    var b = Ce[a];
    b ? (Q.deleteProgram(b), b.name = 0, Ce[a] = null) : N(1281);
  }
}, emscripten_glDeleteQueries:function(a, b) {
  for (var c = 0; c < a; c++) {
    var d = m()[b + 4 * c >> 2], e = Je[d];
    e && (Q.deleteQuery(e), Je[d] = null);
  }
}, emscripten_glDeleteRenderbuffers:function(a, b) {
  for (var c = 0; c < a; c++) {
    var d = m()[b + 4 * c >> 2], e = Ee[d];
    e && (Q.deleteRenderbuffer(e), e.name = 0, Ee[d] = null);
  }
}, emscripten_glDeleteShader:function(a) {
  if (a) {
    var b = Ge[a];
    b ? (Q.deleteShader(b), Ge[a] = null) : N(1281);
  }
}, emscripten_glDeleteSync:function(a) {
  if (a) {
    var b = Ke[a];
    b ? (Q.deleteSync(b), b.name = 0, Ke[a] = null) : N(1281);
  }
}, emscripten_glDeleteTextures:function(a, b) {
  for (var c = 0; c < a; c++) {
    var d = m()[b + 4 * c >> 2], e = Fe[d];
    e && (Q.deleteTexture(e), e.name = 0, Fe[d] = null);
  }
}, emscripten_glDeleteVertexArrays:function(a, b) {
  for (var c = 0; c < a; c++) {
    var d = m()[b + 4 * c >> 2];
    Q.deleteVertexArray(He[d]);
    He[d] = null;
  }
}, emscripten_glDepthFunc:function(a) {
  Q.depthFunc(a);
}, emscripten_glDepthMask:function(a) {
  Q.depthMask(!!a);
}, emscripten_glDisable:function(a) {
  Q.disable(a);
}, emscripten_glDisableVertexAttribArray:function(a) {
  Q.disableVertexAttribArray(a);
}, emscripten_glDrawArrays:function(a, b, c) {
  Q.drawArrays(a, b, c);
}, emscripten_glDrawArraysInstanced:function(a, b, c, d) {
  Q.drawArraysInstanced(a, b, c, d);
}, emscripten_glDrawElements:function(a, b, c, d) {
  Q.drawElements(a, b, c, d);
}, emscripten_glDrawElementsInstanced:function(a, b, c, d, e) {
  Q.drawElementsInstanced(a, b, c, d, e);
}, emscripten_glEnable:function(a) {
  Q.enable(a);
}, emscripten_glEnableVertexAttribArray:function(a) {
  Q.enableVertexAttribArray(a);
}, emscripten_glEndTransformFeedback:function() {
  Q.endTransformFeedback();
}, emscripten_glFenceSync:function(a, b) {
  return (a = Q.fenceSync(a, b)) ? (b = Pe(Ke), a.name = b, Ke[b] = a, b) : 0;
}, emscripten_glFinish:function() {
  Q.finish();
}, emscripten_glFramebufferRenderbuffer:function(a, b, c, d) {
  Q.framebufferRenderbuffer(a, b, c, Ee[d]);
}, emscripten_glFramebufferTexture2D:function(a, b, c, d, e) {
  Q.framebufferTexture2D(a, b, c, Fe[d], e);
}, emscripten_glFramebufferTextureLayer:function(a, b, c, d, e) {
  Q.framebufferTextureLayer(a, b, Fe[c], d, e);
}, emscripten_glFrontFace:function(a) {
  Q.frontFace(a);
}, emscripten_glGenBuffers:function(a, b) {
  Rf(a, b, "createBuffer", Be);
}, emscripten_glGenFramebuffers:function(a, b) {
  Rf(a, b, "createFramebuffer", De);
}, emscripten_glGenQueries:function(a, b) {
  Rf(a, b, "createQuery", Je);
}, emscripten_glGenRenderbuffers:function(a, b) {
  Rf(a, b, "createRenderbuffer", Ee);
}, emscripten_glGenTextures:function(a, b) {
  Rf(a, b, "createTexture", Fe);
}, emscripten_glGenVertexArrays:function(a, b) {
  Rf(a, b, "createVertexArray", He);
}, emscripten_glGenerateMipmap:function(a) {
  Q.generateMipmap(a);
}, emscripten_glGetFloatv:function(a, b) {
  Sf(a, b, 2);
}, emscripten_glGetInteger64v:function(a, b) {
  Sf(a, b, 1);
}, emscripten_glGetProgramInfoLog:function(a, b, c, d) {
  a = Q.getProgramInfoLog(Ce[a]);
  null === a && (a = "(unknown error)");
  b = 0 < b && d ? Vd(a, d, b) : 0;
  c && (m()[c >> 2] = b);
}, emscripten_glGetProgramiv:function(a, b, c) {
  if (c) {
    if (a >= Ae) {
      N(1281);
    } else {
      if (a = Ce[a], 35716 == b) {
        a = Q.getProgramInfoLog(a), null === a && (a = "(unknown error)"), m()[c >> 2] = a.length + 1;
      } else if (35719 == b) {
        if (!a.Da) {
          for (b = 0; b < Q.getProgramParameter(a, 35718); ++b) {
            a.Da = Math.max(a.Da, Q.getActiveUniform(a, b).name.length + 1);
          }
        }
        m()[c >> 2] = a.Da;
      } else if (35722 == b) {
        if (!a.Ba) {
          for (b = 0; b < Q.getProgramParameter(a, 35721); ++b) {
            a.Ba = Math.max(a.Ba, Q.getActiveAttrib(a, b).name.length + 1);
          }
        }
        m()[c >> 2] = a.Ba;
      } else if (35381 == b) {
        if (!a.Ca) {
          for (b = 0; b < Q.getProgramParameter(a, 35382); ++b) {
            a.Ca = Math.max(a.Ca, Q.getActiveUniformBlockName(a, b).length + 1);
          }
        }
        m()[c >> 2] = a.Ca;
      } else {
        m()[c >> 2] = Q.getProgramParameter(a, b);
      }
    }
  } else {
    N(1281);
  }
}, emscripten_glGetShaderInfoLog:function(a, b, c, d) {
  a = Q.getShaderInfoLog(Ge[a]);
  null === a && (a = "(unknown error)");
  b = 0 < b && d ? Vd(a, d, b) : 0;
  c && (m()[c >> 2] = b);
}, emscripten_glGetShaderiv:function(a, b, c) {
  c ? 35716 == b ? (a = Q.getShaderInfoLog(Ge[a]), null === a && (a = "(unknown error)"), a = a ? a.length + 1 : 0, m()[c >> 2] = a) : 35720 == b ? (a = (a = Q.getShaderSource(Ge[a])) ? a.length + 1 : 0, m()[c >> 2] = a) : m()[c >> 2] = Q.getShaderParameter(Ge[a], b) : N(1281);
}, emscripten_glGetString:function(a) {
  var b = Le[a];
  if (!b) {
    switch(a) {
      case 7939:
        b = Q.getSupportedExtensions() || [];
        b = b.concat(b.map(function(d) {
          return "GL_" + d;
        }));
        b = ef(b.join(" "));
        break;
      case 7936:
      case 7937:
      case 37445:
      case 37446:
        (b = Q.getParameter(a)) || N(1280);
        b = b && ef(b);
        break;
      case 7938:
        b = Q.getParameter(7938);
        b = 2 <= P.version ? "OpenGL ES 3.0 (" + b + ")" : "OpenGL ES 2.0 (" + b + ")";
        b = ef(b);
        break;
      case 35724:
        b = Q.getParameter(35724);
        var c = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
        null !== c && (3 == c[1].length && (c[1] += "0"), b = "OpenGL ES GLSL ES " + c[1] + " (" + b + ")");
        b = ef(b);
        break;
      default:
        N(1280);
    }
    Le[a] = b;
  }
  return b;
}, emscripten_glGetStringi:function(a, b) {
  if (2 > P.version) {
    return N(1282), 0;
  }
  var c = Me[a];
  if (c) {
    return 0 > b || b >= c.length ? (N(1281), 0) : c[b];
  }
  switch(a) {
    case 7939:
      return c = Q.getSupportedExtensions() || [], c = c.concat(c.map(function(d) {
        return "GL_" + d;
      })), c = c.map(function(d) {
        return ef(d);
      }), c = Me[a] = c, 0 > b || b >= c.length ? (N(1281), 0) : c[b];
    default:
      return N(1280), 0;
  }
}, emscripten_glGetSynciv:function(a, b, c, d, e) {
  0 > c ? N(1281) : e ? (a = Q.getSyncParameter(Ke[a], b), null !== a && (m()[e >> 2] = a, d && (m()[d >> 2] = 1))) : N(1281);
}, emscripten_glGetUniformBlockIndex:function(a, b) {
  return Q.getUniformBlockIndex(Ce[a], K(b));
}, emscripten_glGetUniformLocation:function(a, b) {
  b = K(b);
  if (a = Ce[a]) {
    var c = a, d = c.ta, e = c.Mb, f;
    if (!d) {
      for (c.ta = d = {}, c.Lb = {}, f = 0; f < Q.getProgramParameter(c, 35718); ++f) {
        var g = Q.getActiveUniform(c, f);
        var k = g.name;
        g = g.size;
        var l = Tf(k);
        l = 0 < l ? k.slice(0, l) : k;
        var r = c.fb;
        c.fb += g;
        e[l] = [g, r];
        for (k = 0; k < g; ++k) {
          d[r] = k, c.Lb[r++] = l;
        }
      }
    }
    c = a.ta;
    d = 0;
    e = b;
    f = Tf(b);
    0 < f && (d = parseInt(b.slice(f + 1)) >>> 0, e = b.slice(0, f));
    if ((e = a.Mb[e]) && d < e[0] && (d += e[1], c[d] = c[d] || Q.getUniformLocation(a, b))) {
      return d;
    }
  } else {
    N(1281);
  }
  return -1;
}, emscripten_glLinkProgram:function(a) {
  a = Ce[a];
  Q.linkProgram(a);
  a.ta = 0;
  a.Mb = {};
}, emscripten_glPixelStorei:function(a, b) {
  3317 == a && (Ne = b);
  Q.pixelStorei(a, b);
}, emscripten_glReadBuffer:function(a) {
  Q.readBuffer(a);
}, emscripten_glReadPixels:function(a, b, c, d, e, f, g) {
  if (2 <= P.version) {
    if (Q.Ta) {
      Q.readPixels(a, b, c, d, e, f, g);
    } else {
      var k = Uf(f);
      Q.readPixels(a, b, c, d, e, f, k, g >> Vf(k));
    }
  } else {
    (g = Wf(f, e, c, d, g)) ? Q.readPixels(a, b, c, d, e, f, g) : N(1280);
  }
}, emscripten_glRenderbufferStorage:function(a, b, c, d) {
  Q.renderbufferStorage(a, b, c, d);
}, emscripten_glScissor:function(a, b, c, d) {
  Q.scissor(a, b, c, d);
}, emscripten_glShaderSource:function(a, b, c, d) {
  for (var e = "", f = 0; f < b; ++f) {
    var g = d ? m()[d + 4 * f >> 2] : -1;
    e += K(m()[c + 4 * f >> 2], 0 > g ? void 0 : g);
  }
  Q.shaderSource(Ge[a], e);
}, emscripten_glTexImage2D:function(a, b, c, d, e, f, g, k, l) {
  if (2 <= P.version) {
    if (Q.ea) {
      Q.texImage2D(a, b, c, d, e, f, g, k, l);
    } else if (l) {
      var r = Uf(k);
      Q.texImage2D(a, b, c, d, e, f, g, k, r, l >> Vf(r));
    } else {
      Q.texImage2D(a, b, c, d, e, f, g, k, null);
    }
  } else {
    Q.texImage2D(a, b, c, d, e, f, g, k, l ? Wf(k, g, d, e, l) : null);
  }
}, emscripten_glTexImage3D:function(a, b, c, d, e, f, g, k, l, r) {
  if (Q.ea) {
    Q.texImage3D(a, b, c, d, e, f, g, k, l, r);
  } else if (r) {
    var v = Uf(l);
    Q.texImage3D(a, b, c, d, e, f, g, k, l, v, r >> Vf(v));
  } else {
    Q.texImage3D(a, b, c, d, e, f, g, k, l, null);
  }
}, emscripten_glTexParameterf:function(a, b, c) {
  Q.texParameterf(a, b, c);
}, emscripten_glTexParameteri:function(a, b, c) {
  Q.texParameteri(a, b, c);
}, emscripten_glTexStorage2D:function(a, b, c, d, e) {
  Q.texStorage2D(a, b, c, d, e);
}, emscripten_glTexSubImage3D:function(a, b, c, d, e, f, g, k, l, r, v) {
  if (Q.ea) {
    Q.texSubImage3D(a, b, c, d, e, f, g, k, l, r, v);
  } else if (v) {
    var B = Uf(r);
    Q.texSubImage3D(a, b, c, d, e, f, g, k, l, r, B, v >> Vf(B));
  } else {
    Q.texSubImage3D(a, b, c, d, e, f, g, k, l, r, null);
  }
}, emscripten_glTransformFeedbackVaryings:function(a, b, c, d) {
  a = Ce[a];
  for (var e = [], f = 0; f < b; f++) {
    e.push(K(m()[c + 4 * f >> 2]));
  }
  Q.transformFeedbackVaryings(a, e, d);
}, emscripten_glUniform1f:function(a, b) {
  Q.uniform1f(Xf(a), b);
}, emscripten_glUniform1i:function(a, b) {
  Q.uniform1i(Xf(a), b);
}, emscripten_glUniform1iv:function(a, b, c) {
  if (2 <= P.version) {
    b && Q.uniform1iv(Xf(a), m(), c >> 2, b);
  } else {
    if (288 >= b) {
      for (var d = Yf[b - 1], e = 0; e < b; ++e) {
        d[e] = m()[c + 4 * e >> 2];
      }
    } else {
      d = m().subarray(c >> 2, c + 4 * b >> 2);
    }
    Q.uniform1iv(Xf(a), d);
  }
}, emscripten_glUniform1ui:function(a, b) {
  Q.uniform1ui(Xf(a), b);
}, emscripten_glUniform1uiv:function(a, b, c) {
  b && Q.uniform1uiv(Xf(a), n(), c >> 2, b);
}, emscripten_glUniform2f:function(a, b, c) {
  Q.uniform2f(Xf(a), b, c);
}, emscripten_glUniform2fv:function(a, b, c) {
  if (2 <= P.version) {
    b && Q.uniform2fv(Xf(a), p(), c >> 2, 2 * b);
  } else {
    if (144 >= b) {
      for (var d = Zf[2 * b - 1], e = 0; e < 2 * b; e += 2) {
        d[e] = p()[c + 4 * e >> 2], d[e + 1] = p()[c + (4 * e + 4) >> 2];
      }
    } else {
      d = p().subarray(c >> 2, c + 8 * b >> 2);
    }
    Q.uniform2fv(Xf(a), d);
  }
}, emscripten_glUniform2iv:function(a, b, c) {
  if (2 <= P.version) {
    b && Q.uniform2iv(Xf(a), m(), c >> 2, 2 * b);
  } else {
    if (144 >= b) {
      for (var d = Yf[2 * b - 1], e = 0; e < 2 * b; e += 2) {
        d[e] = m()[c + 4 * e >> 2], d[e + 1] = m()[c + (4 * e + 4) >> 2];
      }
    } else {
      d = m().subarray(c >> 2, c + 8 * b >> 2);
    }
    Q.uniform2iv(Xf(a), d);
  }
}, emscripten_glUniform3fv:function(a, b, c) {
  if (2 <= P.version) {
    b && Q.uniform3fv(Xf(a), p(), c >> 2, 3 * b);
  } else {
    if (96 >= b) {
      for (var d = Zf[3 * b - 1], e = 0; e < 3 * b; e += 3) {
        d[e] = p()[c + 4 * e >> 2], d[e + 1] = p()[c + (4 * e + 4) >> 2], d[e + 2] = p()[c + (4 * e + 8) >> 2];
      }
    } else {
      d = p().subarray(c >> 2, c + 12 * b >> 2);
    }
    Q.uniform3fv(Xf(a), d);
  }
}, emscripten_glUniform4f:function(a, b, c, d, e) {
  Q.uniform4f(Xf(a), b, c, d, e);
}, emscripten_glUniform4fv:function(a, b, c) {
  if (2 <= P.version) {
    b && Q.uniform4fv(Xf(a), p(), c >> 2, 4 * b);
  } else {
    if (72 >= b) {
      var d = Zf[4 * b - 1], e = p();
      c >>= 2;
      for (var f = 0; f < 4 * b; f += 4) {
        var g = c + f;
        d[f] = e[g];
        d[f + 1] = e[g + 1];
        d[f + 2] = e[g + 2];
        d[f + 3] = e[g + 3];
      }
    } else {
      d = p().subarray(c >> 2, c + 16 * b >> 2);
    }
    Q.uniform4fv(Xf(a), d);
  }
}, emscripten_glUniformBlockBinding:function(a, b, c) {
  a = Ce[a];
  Q.uniformBlockBinding(a, b, c);
}, emscripten_glUniformMatrix4fv:function(a, b, c, d) {
  if (2 <= P.version) {
    b && Q.uniformMatrix4fv(Xf(a), !!c, p(), d >> 2, 16 * b);
  } else {
    if (18 >= b) {
      var e = Zf[16 * b - 1], f = p();
      d >>= 2;
      for (var g = 0; g < 16 * b; g += 16) {
        var k = d + g;
        e[g] = f[k];
        e[g + 1] = f[k + 1];
        e[g + 2] = f[k + 2];
        e[g + 3] = f[k + 3];
        e[g + 4] = f[k + 4];
        e[g + 5] = f[k + 5];
        e[g + 6] = f[k + 6];
        e[g + 7] = f[k + 7];
        e[g + 8] = f[k + 8];
        e[g + 9] = f[k + 9];
        e[g + 10] = f[k + 10];
        e[g + 11] = f[k + 11];
        e[g + 12] = f[k + 12];
        e[g + 13] = f[k + 13];
        e[g + 14] = f[k + 14];
        e[g + 15] = f[k + 15];
      }
    } else {
      e = p().subarray(d >> 2, d + 64 * b >> 2);
    }
    Q.uniformMatrix4fv(Xf(a), !!c, e);
  }
}, emscripten_glUseProgram:function(a) {
  a = Ce[a];
  Q.useProgram(a);
  Q.$b = a;
}, emscripten_glVertexAttrib4f:function(a, b, c, d, e) {
  Q.vertexAttrib4f(a, b, c, d, e);
}, emscripten_glVertexAttribDivisor:function(a, b) {
  Q.vertexAttribDivisor(a, b);
}, emscripten_glVertexAttribI4ui:function(a, b, c, d, e) {
  Q.vertexAttribI4ui(a, b, c, d, e);
}, emscripten_glVertexAttribIPointer:function(a, b, c, d, e) {
  Q.vertexAttribIPointer(a, b, c, d, e);
}, emscripten_glVertexAttribPointer:function(a, b, c, d, e, f) {
  Q.vertexAttribPointer(a, b, c, !!d, e, f);
}, emscripten_glViewport:function(a, b, c, d) {
  Q.viewport(a, b, c, d);
}, emscripten_num_logical_cores:function() {
  return navigator.hardwareConcurrency;
}, emscripten_receive_on_main_thread_js:function(a, b, c) {
  dg.length = b;
  c >>= 3;
  for (var d = 0; d < b; d++) {
    dg[d] = qa()[c + d];
  }
  a = wl[a];
  w(a.length == b, "Call args mismatch in emscripten_receive_on_main_thread_js");
  return a.apply(null, dg);
}, emscripten_resize_heap:function(a) {
  var b = fa().length;
  a >>>= 0;
  if (a <= b) {
    return !1;
  }
  if (2147483648 < a) {
    return x(`Cannot enlarge memory, asked to go up to ${a} bytes, but the limit is ${2147483648} bytes!`), !1;
  }
  for (var c = 1; 4 >= c; c *= 2) {
    var d = b * (1 + .2 / c);
    d = Math.min(d, a + 100663296);
    var e = Math;
    d = Math.max(a, d);
    e = e.min.call(e, 2147483648, d + (65536 - d % 65536) % 65536);
    a: {
      d = e;
      var f = ba.buffer;
      try {
        ba.grow(d - f.byteLength + 65535 >>> 16);
        ea();
        var g = 1;
        break a;
      } catch (k) {
        x(`emscripten_realloc_buffer: Attempted to grow heap from ${f.byteLength} bytes to ${d} bytes, but got error: ${k}`);
      }
      g = void 0;
    }
    if (g) {
      return !0;
    }
  }
  x(`Failed to grow the heap from ${b} bytes to ${e} bytes, not enough memory!`);
  return !1;
}, emscripten_set_canvas_element_size:function(a, b, c) {
  return hg(a) ? ig(a, b, c) : jg(a, b, c);
}, emscripten_set_main_loop:function(a, b, c) {
  a = rd(a);
  rf(a, b, c);
}, emscripten_supports_offscreencanvas:function() {
  return 0;
}, emscripten_webgl_destroy_context:kg, emscripten_webgl_do_commit_frame:function() {
  return P && P.v ? P.Ua ? (Ue(), 0) : P.attributes.sb ? 0 : -3 : -3;
}, emscripten_webgl_do_create_context:mg, emscripten_webgl_enable_extension:og, emscripten_webgl_init_context_attributes:function(a) {
  w(a);
  for (var b = a >> 2, c = 0; 14 > c; ++c) {
    m()[b + c] = 0;
  }
  m()[b] = m()[b + 1] = m()[b + 3] = m()[b + 4] = m()[b + 8] = m()[b + 10] = 1;
  Aa && (m()[a + 48 >> 2] = 1);
}, emscripten_webgl_make_context_current_calling_thread:function(a) {
  return Ve(a) ? 0 : -5;
}, environ_get:sg, environ_sizes_get:tg, exit:dd, fd_close:ug, fd_fdstat_get:vg, fd_read:wg, fd_seek:xg, fd_write:yg, getaddrinfo:zg, getnameinfo:function(a, b, c, d, e, f, g) {
  b = Kd(a, b);
  if (b.g) {
    return -6;
  }
  a = b.port;
  var k = b.A;
  b = !1;
  if (c && d) {
    var l;
    if (g & 1 || !(l = Ed[k] ? Ed[k] : null)) {
      if (g & 8) {
        return -2;
      }
    } else {
      k = l;
    }
    c = Vd(k, c, d);
    c + 1 >= d && (b = !0);
  }
  e && f && (c = Vd("" + a, e, f), c + 1 >= f && (b = !0));
  return b ? -12 : 0;
}, godot_audio_has_worklet:eh, godot_audio_init:fh, godot_audio_input_start:gh, godot_audio_input_stop:hh, godot_audio_is_available:ih, godot_audio_resume:jh, godot_audio_worklet_create:lh, godot_audio_worklet_start:mh, godot_audio_worklet_state_add:function(a, b, c) {
  return Atomics.add(m(), (a >> 2) + b, c);
}, godot_audio_worklet_state_get:function(a, b) {
  return Atomics.load(m(), (a >> 2) + b);
}, godot_audio_worklet_state_wait:function(a, b, c, d) {
  Atomics.wait(m(), (a >> 2) + b, c, d);
  return Atomics.load(m(), (a >> 2) + b);
}, godot_js_config_canvas_id_get:nh, godot_js_config_locale_get:oh, godot_js_display_alert:Lh, godot_js_display_canvas_focus:Mh, godot_js_display_canvas_is_focused:Nh, godot_js_display_clipboard_get:Oh, godot_js_display_clipboard_set:Ph, godot_js_display_cursor_is_hidden:Qh, godot_js_display_cursor_is_locked:Rh, godot_js_display_cursor_lock_set:Sh, godot_js_display_cursor_set_custom_shape:Th, godot_js_display_cursor_set_shape:Uh, godot_js_display_cursor_set_visible:Vh, godot_js_display_desired_size_set:Wh, 
godot_js_display_fullscreen_cb:Xh, godot_js_display_fullscreen_exit:Yh, godot_js_display_fullscreen_request:Zh, godot_js_display_has_webgl:$h, godot_js_display_is_swap_ok_cancel:ai, godot_js_display_notification_cb:bi, godot_js_display_pixel_ratio_get:ci, godot_js_display_screen_dpi_get:di, godot_js_display_screen_size_get:ei, godot_js_display_setup_canvas:fi, godot_js_display_size_update:gi, godot_js_display_touchscreen_is_available:hi, godot_js_display_tts_available:ii, godot_js_display_vk_available:ji, 
godot_js_display_vk_cb:ki, godot_js_display_vk_hide:li, godot_js_display_vk_show:mi, godot_js_display_window_blur_cb:ni, godot_js_display_window_icon_set:oi, godot_js_display_window_size_get:pi, godot_js_display_window_title_set:qi, godot_js_eval:function(a, b, c, d, e, f) {
  b = K(a);
  a = null;
  try {
    a = (0,eval)(b);
  } catch (g) {
    T(g);
  }
  switch(typeof a) {
    case "boolean":
      return M(c, a, "i32"), 1;
    case "number":
      return M(c, a, "double"), 3;
    case "string":
      return Cg(c, V(a)), 4;
    case "object":
      if (null !== a && (!ArrayBuffer.isView(a) || a instanceof Uint8Array ? a instanceof ArrayBuffer && (a = new Uint8Array(a)) : a = new Uint8Array(a.buffer), a instanceof Uint8Array)) {
        return c = S(f)(d, e, a.length), fa().set(a, c), 29;
      }
  }
  return 0;
}, godot_js_fetch_create:zi, godot_js_fetch_free:Ai, godot_js_fetch_http_status_get:Bi, godot_js_fetch_is_chunked:Ci, godot_js_fetch_read_chunk:Di, godot_js_fetch_read_headers:Ei, godot_js_fetch_state_get:Fi, godot_js_input_drop_files_cb:Ui, godot_js_input_gamepad_cb:Vi, godot_js_input_gamepad_sample:Wi, godot_js_input_gamepad_sample_count:Xi, godot_js_input_gamepad_sample_get:Yi, godot_js_input_key_cb:Zi, godot_js_input_mouse_button_cb:$i, godot_js_input_mouse_move_cb:aj, godot_js_input_mouse_wheel_cb:bj, 
godot_js_input_paste_cb:cj, godot_js_input_touch_cb:dj, godot_js_input_vibrate_handheld:ej, godot_js_os_download_buffer:fj, godot_js_os_execute:gj, godot_js_os_finish_async:hj, godot_js_os_fs_is_persistent:ij, godot_js_os_fs_sync:jj, godot_js_os_has_feature:kj, godot_js_os_hw_concurrency_get:lj, godot_js_os_request_quit_cb:mj, godot_js_os_shell_open:nj, godot_js_pwa_cb:qj, godot_js_pwa_update:rj, godot_js_rtc_datachannel_close:vj, godot_js_rtc_datachannel_connect:wj, godot_js_rtc_datachannel_destroy:xj, 
godot_js_rtc_datachannel_get_buffered_amount:yj, godot_js_rtc_datachannel_id_get:zj, godot_js_rtc_datachannel_is_negotiated:Aj, godot_js_rtc_datachannel_is_ordered:Bj, godot_js_rtc_datachannel_label_get:Cj, godot_js_rtc_datachannel_max_packet_lifetime_get:Dj, godot_js_rtc_datachannel_max_retransmits_get:Ej, godot_js_rtc_datachannel_protocol_get:function(a) {
  return (a = Y[a]) && a.protocol ? V(a.protocol) : 0;
}, godot_js_rtc_datachannel_ready_state_get:Fj, godot_js_rtc_datachannel_send:Gj, godot_js_rtc_pc_close:Nj, godot_js_rtc_pc_create:Oj, godot_js_rtc_pc_datachannel_create:Pj, godot_js_rtc_pc_destroy:Qj, godot_js_rtc_pc_ice_candidate_add:Rj, godot_js_rtc_pc_local_description_set:Sj, godot_js_rtc_pc_offer_create:Tj, godot_js_rtc_pc_remote_description_set:Uj, godot_js_tts_get_voices:Vj, godot_js_tts_is_paused:Wj, godot_js_tts_is_speaking:Xj, godot_js_tts_pause:Yj, godot_js_tts_resume:Zj, godot_js_tts_speak:ak, 
godot_js_tts_stop:bk, godot_js_websocket_buffered_amount:gk, godot_js_websocket_close:hk, godot_js_websocket_create:ik, godot_js_websocket_destroy:jk, godot_js_websocket_send:kk, godot_js_wrapper_create_cb:sk, godot_js_wrapper_create_object:tk, godot_js_wrapper_interface_get:uk, godot_js_wrapper_object_call:vk, godot_js_wrapper_object_get:wk, godot_js_wrapper_object_getvar:xk, godot_js_wrapper_object_set:yk, godot_js_wrapper_object_set_cb_ret:zk, godot_js_wrapper_object_setvar:Ak, godot_js_wrapper_object_unref:Bk, 
godot_webgl2_glFramebufferTextureMultiviewOVR:Ck, godot_webgl2_glGetBufferSubData:Dk, godot_webxr_get_bounds_geometry:Wk, godot_webxr_get_color_texture:Xk, godot_webxr_get_depth_texture:Yk, godot_webxr_get_frame_rate:Zk, godot_webxr_get_projection_for_view:$k, godot_webxr_get_render_target_size:al, godot_webxr_get_supported_frame_rates:bl, godot_webxr_get_transform_for_view:cl, godot_webxr_get_velocity_texture:dl, godot_webxr_get_view_count:el, godot_webxr_get_visibility_state:fl, godot_webxr_initialize:gl, 
godot_webxr_is_session_supported:hl, godot_webxr_is_supported:il, godot_webxr_uninitialize:jl, godot_webxr_update_input_source:kl, godot_webxr_update_target_frame_rate:ll, invoke_ii:yl, invoke_iii:zl, invoke_iiii:Al, invoke_iiiii:Bl, invoke_iiiiii:Cl, invoke_vi:Dl, invoke_vii:El, invoke_viii:Fl, invoke_viiii:Gl, invoke_viiiiiii:Hl, invoke_viiiiiiii:Il, invoke_viiij:Jl, memory:ba || q.wasmMemory, strftime:pl, strftime_l:function(a, b, c, d) {
  return pl(a, b, c, d);
}};
(function() {
  function a(d, e) {
    d = d.exports;
    q.asm = d;
    F.Kb.push(q.asm._emscripten_tls_init);
    Qa = q.asm.__indirect_function_table;
    w(Qa, "table not found in wasm exports");
    Ya.unshift(q.asm.__wasm_call_ctors);
    Ma = e;
    F.yc(() => {
      qb--;
      q.monitorRunDependencies && q.monitorRunDependencies(qb);
      w(tb["wasm-instantiate"]);
      delete tb["wasm-instantiate"];
      if (0 == qb && (null !== rb && (clearInterval(rb), rb = null), sb)) {
        var f = sb;
        sb = null;
        f();
      }
    });
    return d;
  }
  var b = {env:Kl, wasi_snapshot_preview1:Kl};
  ub();
  var c = q;
  if (q.instantiateWasm) {
    try {
      return q.instantiateWasm(b, a);
    } catch (d) {
      x("Module.instantiateWasm callback failed with error: " + d), ta(d);
    }
  }
  Ab(b, function(d) {
    w(q === c, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
    c = null;
    a(d.instance, d.module);
  }).catch(ta);
  return {};
})();
var R = z("free");
q.__Z14godot_web_mainiPPc = z("_Z14godot_web_mainiPPc");
var Ll = q._main = z("__main_argc_argv"), Re = z("malloc"), Ud = z("__errno_location"), gd = q._fflush = z("fflush"), Ag = z("htonl"), Ad = z("htons"), Jd = z("ntohs");
q.__emwebxr_on_input_event = z("_emwebxr_on_input_event");
q.__emwebxr_on_simple_event = z("_emwebxr_on_simple_event");
q.__emscripten_tls_init = z("_emscripten_tls_init");
var ld = q._pthread_self = function() {
  return (ld = q._pthread_self = q.asm.pthread_self).apply(null, arguments);
}, fc = z("emscripten_builtin_memalign"), Dh = z("emscripten_webgl_get_current_context"), fd = z("__funcs_on_exit"), xl = q.__emscripten_thread_init = z("_emscripten_thread_init");
q.__emscripten_thread_crashed = z("_emscripten_thread_crashed");
var cg = z("_emscripten_run_in_main_runtime_thread_js");
function Sa() {
  return (Sa = q.asm.emscripten_stack_get_end).apply(null, arguments);
}
var kd = z("_emscripten_thread_free_data"), sd = q.__emscripten_thread_exit = z("_emscripten_thread_exit"), df = z("_emscripten_timeout"), te = q.__emscripten_check_mailbox = z("_emscripten_check_mailbox"), Ml = z("setThrew");
function Nl() {
  return (Nl = q.asm.emscripten_stack_init).apply(null, arguments);
}
function nd() {
  return (nd = q.asm.emscripten_stack_set_limits).apply(null, arguments);
}
var ag = z("stackSave"), od = z("stackRestore"), bg = z("stackAlloc");
function jd() {
  return (jd = q.asm.emscripten_stack_get_current).apply(null, arguments);
}
q.dynCall_vjiii = z("dynCall_vjiii");
q.dynCall_viiiiji = z("dynCall_viiiiji");
q.dynCall_viiiiij = z("dynCall_viiiiij");
q.dynCall_viiiij = z("dynCall_viiiij");
q.dynCall_vij = z("dynCall_vij");
q.dynCall_ji = z("dynCall_ji");
q.dynCall_viiijii = z("dynCall_viiijii");
q.dynCall_vijiii = z("dynCall_vijiii");
q.dynCall_jij = z("dynCall_jij");
q.dynCall_iiij = z("dynCall_iiij");
q.dynCall_iij = z("dynCall_iij");
q.dynCall_viij = z("dynCall_viij");
q.dynCall_jiij = z("dynCall_jiij");
q.dynCall_jiii = z("dynCall_jiii");
q.dynCall_jiiiiiii = z("dynCall_jiiiiiii");
q.dynCall_jiiiii = z("dynCall_jiiiii");
q.dynCall_ij = z("dynCall_ij");
q.dynCall_jiiiiiiiiii = z("dynCall_jiiiiiiiiii");
q.dynCall_jiiiiii = z("dynCall_jiiiiii");
q.dynCall_jiiiiiiii = z("dynCall_jiiiiiiii");
q.dynCall_jii = z("dynCall_jii");
var Ol = q.dynCall_viiij = z("dynCall_viiij");
q.dynCall_jiiii = z("dynCall_jiiii");
q.dynCall_viiiiiiij = z("dynCall_viiiiiiij");
q.dynCall_viiiiifiijii = z("dynCall_viiiiifiijii");
q.dynCall_viiiiifiiijjii = z("dynCall_viiiiifiiijjii");
q.dynCall_viiiiifiiijii = z("dynCall_viiiiifiiijii");
q.dynCall_viiiiifiiiijjii = z("dynCall_viiiiifiiiijjii");
q.dynCall_jiji = z("dynCall_jiji");
q.dynCall_viji = z("dynCall_viji");
q.dynCall_vijii = z("dynCall_vijii");
q.dynCall_viiiiijj = z("dynCall_viiiiijj");
q.dynCall_jiiifi = z("dynCall_jiiifi");
q.dynCall_jiifff = z("dynCall_jiifff");
q.dynCall_vijf = z("dynCall_vijf");
q.dynCall_vijiiii = z("dynCall_vijiiii");
q.dynCall_viijiiiiiiiii = z("dynCall_viijiiiiiiiii");
q.dynCall_viiiiiji = z("dynCall_viiiiiji");
q.dynCall_vijj = z("dynCall_vijj");
q.dynCall_jiijiiii = z("dynCall_jiijiiii");
q.dynCall_jiiji = z("dynCall_jiiji");
q.dynCall_jiiiji = z("dynCall_jiiiji");
q.dynCall_jiijii = z("dynCall_jiijii");
q.dynCall_iijiiij = z("dynCall_iijiiij");
q.dynCall_jijjjiiiiijii = z("dynCall_jijjjiiiiijii");
q.dynCall_jijiiiiifiii = z("dynCall_jijiiiiifiii");
q.dynCall_viijiiiiiifiii = z("dynCall_viijiiiiiifiii");
q.dynCall_vijiiiiiidddd = z("dynCall_vijiiiiiidddd");
q.dynCall_viiji = z("dynCall_viiji");
q.dynCall_vijji = z("dynCall_vijji");
q.dynCall_vijjii = z("dynCall_vijjii");
q.dynCall_fij = z("dynCall_fij");
q.dynCall_vijiffifff = z("dynCall_vijiffifff");
q.dynCall_vijff = z("dynCall_vijff");
q.dynCall_vijiffff = z("dynCall_vijiffff");
q.dynCall_vijjf = z("dynCall_vijjf");
q.dynCall_vijij = z("dynCall_vijij");
q.dynCall_vijif = z("dynCall_vijif");
q.dynCall_vijiiifi = z("dynCall_vijiiifi");
q.dynCall_vijiifi = z("dynCall_vijiifi");
q.dynCall_vijiif = z("dynCall_vijiif");
q.dynCall_vijifi = z("dynCall_vijifi");
q.dynCall_vijijiii = z("dynCall_vijijiii");
q.dynCall_vijijiiii = z("dynCall_vijijiiii");
q.dynCall_vijijiiiff = z("dynCall_vijijiiiff");
q.dynCall_vijijii = z("dynCall_vijijii");
q.dynCall_vijiijiiiiii = z("dynCall_vijiijiiiiii");
q.dynCall_vijiiij = z("dynCall_vijiiij");
q.dynCall_vijiiiiiiji = z("dynCall_vijiiiiiiji");
q.dynCall_vijjj = z("dynCall_vijjj");
q.dynCall_vijdddd = z("dynCall_vijdddd");
q.dynCall_vijififi = z("dynCall_vijififi");
q.dynCall_iiiij = z("dynCall_iiiij");
q.dynCall_iijji = z("dynCall_iijji");
q.dynCall_viijj = z("dynCall_viijj");
q.dynCall_dij = z("dynCall_dij");
q.dynCall_vijd = z("dynCall_vijd");
q.dynCall_viijiiii = z("dynCall_viijiiii");
q.dynCall_viijiii = z("dynCall_viijiii");
q.dynCall_iiji = z("dynCall_iiji");
q.dynCall_iiiijf = z("dynCall_iiiijf");
q.dynCall_vijiiiii = z("dynCall_vijiiiii");
q.dynCall_iiiiiiiji = z("dynCall_iiiiiiiji");
q.dynCall_viijd = z("dynCall_viijd");
q.dynCall_diij = z("dynCall_diij");
q.dynCall_viiiji = z("dynCall_viiiji");
q.dynCall_viiijj = z("dynCall_viiijj");
q.dynCall_viijji = z("dynCall_viijji");
q.dynCall_jiiij = z("dynCall_jiiij");
q.dynCall_viijii = z("dynCall_viijii");
q.dynCall_jiijjj = z("dynCall_jiijjj");
q.dynCall_jiijj = z("dynCall_jiijj");
q.dynCall_viiijiji = z("dynCall_viiijiji");
q.dynCall_viiijjiji = z("dynCall_viiijjiji");
q.dynCall_viijiji = z("dynCall_viijiji");
q.dynCall_iiiiijiii = z("dynCall_iiiiijiii");
q.dynCall_iiiiiijd = z("dynCall_iiiiiijd");
q.dynCall_diidj = z("dynCall_diidj");
q.dynCall_viiiijij = z("dynCall_viiiijij");
q.dynCall_viiidjj = z("dynCall_viiidjj");
q.dynCall_viidj = z("dynCall_viidj");
q.dynCall_iiijj = z("dynCall_iiijj");
q.dynCall_jiid = z("dynCall_jiid");
q.dynCall_viiiiddji = z("dynCall_viiiiddji");
q.dynCall_vijiiiiiiiii = z("dynCall_vijiiiiiiiii");
q.dynCall_vijiiiffi = z("dynCall_vijiiiffi");
q.dynCall_vijiiifii = z("dynCall_vijiiifii");
q.dynCall_viijfii = z("dynCall_viijfii");
q.dynCall_viiiiiiiiiiijjjjjjifiiiiii = z("dynCall_viiiiiiiiiiijjjjjjifiiiiii");
q.dynCall_vijifff = z("dynCall_vijifff");
q.dynCall_fiji = z("dynCall_fiji");
q.dynCall_vijiiffifffi = z("dynCall_vijiiffifffi");
q.dynCall_iijj = z("dynCall_iijj");
q.dynCall_iijjfj = z("dynCall_iijjfj");
q.dynCall_vijiji = z("dynCall_vijiji");
q.dynCall_jijii = z("dynCall_jijii");
q.dynCall_vijid = z("dynCall_vijid");
q.dynCall_vijiiiiii = z("dynCall_vijiiiiii");
q.dynCall_vijiff = z("dynCall_vijiff");
q.dynCall_vijjjj = z("dynCall_vijjjj");
q.dynCall_vijiiiiiii = z("dynCall_vijiiiiiii");
q.dynCall_jiiifiiiii = z("dynCall_jiiifiiiii");
q.dynCall_viiiifijii = z("dynCall_viiiifijii");
q.dynCall_viiiifiijjii = z("dynCall_viiiifiijjii");
q.dynCall_vijiiifiijii = z("dynCall_vijiiifiijii");
q.dynCall_vijiiifiiijjii = z("dynCall_vijiiifiiijjii");
q.dynCall_vijiiifiiijii = z("dynCall_vijiiifiiijii");
q.dynCall_vijiiifiiiijjii = z("dynCall_vijiiifiiiijjii");
q.dynCall_fijiiii = z("dynCall_fijiiii");
q.dynCall_fijiiiii = z("dynCall_fijiiiii");
q.dynCall_iijii = z("dynCall_iijii");
q.dynCall_iijiijiiiii = z("dynCall_iijiijiiiii");
q.dynCall_iijijiiiii = z("dynCall_iijijiiiii");
q.dynCall_vijijj = z("dynCall_vijijj");
q.dynCall_vijiiijj = z("dynCall_vijiiijj");
q.dynCall_vijiijj = z("dynCall_vijiijj");
q.dynCall_vijjiji = z("dynCall_vijjiji");
q.dynCall_vijjiijii = z("dynCall_vijjiijii");
q.dynCall_fijii = z("dynCall_fijii");
q.dynCall_iiiiiiij = z("dynCall_iiiiiiij");
q.dynCall_vijiiiij = z("dynCall_vijiiiij");
q.dynCall_jijj = z("dynCall_jijj");
q.dynCall_jiiif = z("dynCall_jiiif");
q.dynCall_vijfff = z("dynCall_vijfff");
q.dynCall_vijfiff = z("dynCall_vijfiff");
q.dynCall_vijfi = z("dynCall_vijfi");
q.dynCall_vijffffi = z("dynCall_vijffffi");
q.dynCall_vijiiffi = z("dynCall_vijiiffi");
q.dynCall_vijiifffffff = z("dynCall_vijiifffffff");
q.dynCall_vijifiifffffifff = z("dynCall_vijifiifffffifff");
q.dynCall_vijiiffffiffffj = z("dynCall_vijiiffffiffffj");
q.dynCall_vijiifff = z("dynCall_vijiifff");
q.dynCall_vijiffffffff = z("dynCall_vijiffffffff");
q.dynCall_vijiifiififff = z("dynCall_vijiifiififff");
q.dynCall_vijifffij = z("dynCall_vijifffij");
q.dynCall_viijjjiifjii = z("dynCall_viijjjiifjii");
q.dynCall_vijjjii = z("dynCall_vijjjii");
q.dynCall_fijj = z("dynCall_fijj");
q.dynCall_iijjiii = z("dynCall_iijjiii");
q.dynCall_iiiiij = z("dynCall_iiiiij");
q.dynCall_iiiiijj = z("dynCall_iiiiijj");
q.dynCall_iiiiiijj = z("dynCall_iiiiiijj");
function El(a, b, c) {
  var d = ag();
  try {
    rd(a)(b, c);
  } catch (e) {
    od(d);
    if (e !== e + 0) {
      throw e;
    }
    Ml(1, 0);
  }
}
function Dl(a, b) {
  var c = ag();
  try {
    rd(a)(b);
  } catch (d) {
    od(c);
    if (d !== d + 0) {
      throw d;
    }
    Ml(1, 0);
  }
}
function Al(a, b, c, d) {
  var e = ag();
  try {
    return rd(a)(b, c, d);
  } catch (f) {
    od(e);
    if (f !== f + 0) {
      throw f;
    }
    Ml(1, 0);
  }
}
function yl(a, b) {
  var c = ag();
  try {
    return rd(a)(b);
  } catch (d) {
    od(c);
    if (d !== d + 0) {
      throw d;
    }
    Ml(1, 0);
  }
}
function Cl(a, b, c, d, e, f) {
  var g = ag();
  try {
    return rd(a)(b, c, d, e, f);
  } catch (k) {
    od(g);
    if (k !== k + 0) {
      throw k;
    }
    Ml(1, 0);
  }
}
function Gl(a, b, c, d, e) {
  var f = ag();
  try {
    rd(a)(b, c, d, e);
  } catch (g) {
    od(f);
    if (g !== g + 0) {
      throw g;
    }
    Ml(1, 0);
  }
}
function zl(a, b, c) {
  var d = ag();
  try {
    return rd(a)(b, c);
  } catch (e) {
    od(d);
    if (e !== e + 0) {
      throw e;
    }
    Ml(1, 0);
  }
}
function Bl(a, b, c, d, e) {
  var f = ag();
  try {
    return rd(a)(b, c, d, e);
  } catch (g) {
    od(f);
    if (g !== g + 0) {
      throw g;
    }
    Ml(1, 0);
  }
}
function Il(a, b, c, d, e, f, g, k, l) {
  var r = ag();
  try {
    rd(a)(b, c, d, e, f, g, k, l);
  } catch (v) {
    od(r);
    if (v !== v + 0) {
      throw v;
    }
    Ml(1, 0);
  }
}
function Fl(a, b, c, d) {
  var e = ag();
  try {
    rd(a)(b, c, d);
  } catch (f) {
    od(e);
    if (f !== f + 0) {
      throw f;
    }
    Ml(1, 0);
  }
}
function Hl(a, b, c, d, e, f, g, k) {
  var l = ag();
  try {
    rd(a)(b, c, d, e, f, g, k);
  } catch (r) {
    od(l);
    if (r !== r + 0) {
      throw r;
    }
    Ml(1, 0);
  }
}
function Jl(a, b, c, d, e, f) {
  var g = ag();
  try {
    Ol(a, b, c, d, e, f);
  } catch (k) {
    od(g);
    if (k !== k + 0) {
      throw k;
    }
    Ml(1, 0);
  }
}
q.callMain = Pl;
q.keepRuntimeAlive = eb;
q.wasmMemory = ba;
q.cwrap = function(a, b, c) {
  return function() {
    return sl(a, b, c, arguments);
  };
};
q.ExitStatus = Ga;
q.PThread = F;
"getHostByName traverseStack getCallstack emscriptenLog convertPCtoSourceLocation readEmAsmArgs jstoi_s listenOnce autoResumeAudioContext dynCallLegacy getDynCaller dynCall asmjsMangle HandleAllocator getNativeTypeSize STACK_SIZE STACK_ALIGN POINTER_SIZE ASSERTIONS writeI53ToI64Clamped writeI53ToI64Signaling writeI53ToU64Clamped writeI53ToU64Signaling convertI32PairToI53 convertU32PairToI53 uleb128Encode sigToWasmTypes generateFuncType convertJsFunctionToWasm getEmptyTableSlot updateTableMap getFunctionAddress addFunction removeFunction reallyNegative unSign strLen reSign formatString intArrayToString AsciiToString UTF16ToString stringToUTF16 lengthBytesUTF16 UTF32ToString stringToUTF32 lengthBytesUTF32 registerKeyEventCallback getBoundingClientRect fillMouseEventData registerMouseEventCallback registerWheelEventCallback registerUiEventCallback registerFocusEventCallback fillDeviceOrientationEventData registerDeviceOrientationEventCallback fillDeviceMotionEventData registerDeviceMotionEventCallback screenOrientation fillOrientationChangeEventData registerOrientationChangeEventCallback fillFullscreenChangeEventData registerFullscreenChangeEventCallback JSEvents_requestFullscreen JSEvents_resizeCanvasForFullscreen registerRestoreOldStyle hideEverythingExceptGivenElement restoreHiddenElements setLetterbox softFullscreenResizeWebGLRenderTarget doRequestFullscreen fillPointerlockChangeEventData registerPointerlockChangeEventCallback registerPointerlockErrorEventCallback requestPointerLock fillVisibilityChangeEventData registerVisibilityChangeEventCallback registerTouchEventCallback fillGamepadEventData registerGamepadEventCallback registerBeforeUnloadEventCallback fillBatteryEventData battery registerBatteryEventCallback setCanvasElementSize getCanvasSizeCallingThread getCanvasSizeMainThread getCanvasElementSize jsStackTrace stackTrace checkWasiClock wasiRightsToMuslOFlags wasiOFlagsToMuslOFlags createDyncallWrapper setImmediateWrapped clearImmediateWrapped polyfillSetImmediate getPromise makePromise idsToPromises makePromiseCallback ExceptionInfo _setNetworkCallback emscriptenWebGLGetUniform emscriptenWebGLGetVertexAttrib __glGetActiveAttribOrUniform writeGLArray emscripten_webgl_destroy_context_before_on_calling_thread registerWebGlEventCallback runAndAbortIfError SDL_unicode SDL_ttfContext SDL_audio GLFW_Window emscriptenWebGLGetIndexed ALLOC_NORMAL ALLOC_STACK allocate writeStringToMemory writeAsciiToMemory".split(" ").forEach(function(a) {
  "undefined" === typeof globalThis || Object.getOwnPropertyDescriptor(globalThis, a) || Object.defineProperty(globalThis, a, {configurable:!0, get:function() {
    var b = "`" + a + "` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line", c = a;
    c.startsWith("_") || (c = "$" + a);
    b += " (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE=" + c + ")";
    Bb(a) && (b += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    Cb(b);
  }});
  Db(a);
});
"run addOnPreRun addOnInit addOnPreMain addOnExit addOnPostRun addRunDependency removeRunDependency FS_createFolder FS_createPath FS_createDataFile FS_createLazyFile FS_createLink FS_createDevice FS_unlink out err abort stackAlloc stackSave stackRestore getTempRet0 setTempRet0 GROWABLE_HEAP_I8 GROWABLE_HEAP_U8 GROWABLE_HEAP_I16 GROWABLE_HEAP_U16 GROWABLE_HEAP_I32 GROWABLE_HEAP_U32 GROWABLE_HEAP_F32 GROWABLE_HEAP_F64 writeStackCookie checkStackCookie ptrToString zeroMemory exitJS getHeapMax emscripten_realloc_buffer ENV MONTH_DAYS_REGULAR MONTH_DAYS_LEAP MONTH_DAYS_REGULAR_CUMULATIVE MONTH_DAYS_LEAP_CUMULATIVE isLeapYear ydayFromDate arraySum addDays ERRNO_CODES ERRNO_MESSAGES setErrNo inetPton4 inetNtop4 inetPton6 inetNtop6 readSockaddr writeSockaddr DNS Protocols Sockets initRandomFill randomFill timers warnOnce UNWIND_CACHE readEmAsmArgsArray jstoi_q getExecutableName handleException runtimeKeepalivePush runtimeKeepalivePop callUserCallback maybeExit safeSetTimeout asyncLoad alignMemory mmapAlloc writeI53ToI64 readI53FromI64 readI53FromU64 convertI32PairToI53Checked getCFunc ccall freeTableIndexes functionsInTableMap setValue getValue PATH PATH_FS UTF8Decoder UTF8ArrayToString UTF8ToString stringToUTF8Array stringToUTF8 lengthBytesUTF8 intArrayFromString stringToAscii UTF16Decoder stringToNewUTF8 stringToUTF8OnStack writeArrayToMemory SYSCALLS getSocketFromFD getSocketAddress JSEvents specialHTMLTargets maybeCStringToJsString findEventTarget findCanvasEventTarget currentFullscreenStrategy restoreOldWindowedStyle setCanvasElementSizeCallingThread setCanvasElementSizeMainThread demangle demangleAll getEnvStrings doReadv doWritev dlopenMissingError promiseMap uncaughtExceptionCount exceptionLast exceptionCaught Browser setMainLoop wget preloadPlugins FS_createPreloadedFile FS_modeStringToFlags FS_getMode FS MEMFS TTY PIPEFS SOCKFS tempFixedLengthArray miniTempWebGLFloatBuffers miniTempWebGLIntBuffers heapObjectForWebGLType heapAccessShiftForWebGLHeap webgl_enable_ANGLE_instanced_arrays webgl_enable_OES_vertex_array_object webgl_enable_WEBGL_draw_buffers webgl_enable_WEBGL_multi_draw GL emscriptenWebGLGet computeUnpackAlignedImageSize colorChannelsInGlTextureFormat emscriptenWebGLGetTexPixelData __glGenObject webglGetUniformLocation webglPrepareUniformLocationsBeforeFirstUse webglGetLeftBracePos emscripten_webgl_power_preferences AL GLUT EGL GLEW IDBStore SDL SDL_gfx GLFW webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance allocateUTF8 allocateUTF8OnStack terminateWorker killThread cleanupThread registerTLSInit cancelThread spawnThread exitOnMainThread proxyToMainThread emscripten_receive_on_main_thread_js_callArgs invokeEntryPoint checkMailbox GodotWebXR GodotWebSocket GodotRTCDataChannel GodotRTCPeerConnection GodotAudio GodotAudioWorklet GodotAudioScript GodotDisplayVK GodotDisplayCursor GodotDisplayScreen GodotDisplay GodotFetch IDHandler GodotConfig GodotFS GodotOS GodotEventListeners GodotPWA GodotRuntime GodotInputGamepads GodotInputDragDrop GodotInput GodotWebGL2 GodotJSWrapper IDBFS".split(" ").forEach(Db);
var Ql;
sb = function Rl() {
  Ql || Sl();
  Ql || (sb = Rl);
};
function Pl(a = []) {
  w(0 == qb, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
  w(0 == Xa.length, "cannot call main when preRun functions remain to be called");
  a.unshift(xa);
  var b = a.length, c = bg(4 * (b + 1)), d = c >> 2;
  a.forEach(f => {
    m()[d++] = ql(f);
  });
  m()[d] = 0;
  try {
    var e = Ll(b, c);
    dd(e, !0);
    return e;
  } catch (f) {
    return hd(f);
  }
}
function Sl() {
  var a = wa;
  function b() {
    if (!Ql && (Ql = !0, q.calledRun = !0, !Na)) {
      fb();
      Ta();
      t || ob(Za);
      sa(q);
      if (q.onRuntimeInitialized) {
        q.onRuntimeInitialized();
      }
      Tl && Pl(a);
      Ta();
      if (!t) {
        if (q.postRun) {
          for ("function" == typeof q.postRun && (q.postRun = [q.postRun]); q.postRun.length;) {
            var c = q.postRun.shift();
            ab.unshift(c);
          }
        }
        ob(ab);
      }
    }
  }
  if (!(0 < qb)) {
    if (t || (w(!t), Nl(), Ra()), t) {
      sa(q), fb(), startWorker(q);
    } else {
      w(!t);
      if (q.preRun) {
        for ("function" == typeof q.preRun && (q.preRun = [q.preRun]); q.preRun.length;) {
          pb();
        }
      }
      ob(Xa);
      0 < qb || (q.setStatus ? (q.setStatus("Running..."), setTimeout(function() {
        setTimeout(function() {
          q.setStatus("");
        }, 1);
        b();
      }, 1)) : b(), Ta());
    }
  }
}
if (q.preInit) {
  for ("function" == typeof q.preInit && (q.preInit = [q.preInit]); 0 < q.preInit.length;) {
    q.preInit.pop()();
  }
}
var Tl = !1;
q.noInitialRun && (Tl = !1);
Sl();



  return Godot.ready
}

);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = Godot;
else if (typeof define === 'function' && define['amd'])
  define([], function() { return Godot; });
else if (typeof exports === 'object')
  exports["Godot"] = Godot;

function t(c=1){try{return!!document.createElement("canvas").getContext(["webgl","webgl2"][c-1])}catch(l){}return!1}function u(){return"fetch"in window&&"Response"in window&&"body"in window.Response.prototype}function v(){return!0===window.isSecureContext}function w(){return!0===window.crossOriginIsolated}function x(){return"SharedArrayBuffer"in window}function y(){return"AudioContext"in window&&"audioWorklet"in AudioContext.prototype}
function z(){const c=[];t(2)||c.push("WebGL2 - Check web browser configuration and hardware support");u()||c.push("Fetch - Check web browser version");v()||c.push("Secure Context - Check web server configuration (use HTTPS)");w()||c.push("Cross Origin Isolation - Check web server configuration (send correct headers)");x()||c.push("SharedArrayBuffer - Check web server configuration (send correct headers)");return c};function A(){function c(){let a=0,d=0,m=!0,h=!0;Object.keys(n).forEach(function(e){e=n[e];e.done||(h=!1);m&&0!==e.total?d+=e.total:(m=!1,d=0);a+=e.loaded});if(a!==f||d!==p)f=a,p=d,"function"===typeof g&&g(a,d);h||requestAnimationFrame(c)}function l(a,d){function m(e,q){return e.read().then(function(r){if(d.done)return Promise.resolve();r.value&&(q.enqueue(r.value),d.loaded+=r.value.length);if(!r.done)return m(e,q);d.done=!0;return Promise.resolve()})}const h=a.body.getReader();return new Response(new ReadableStream({start:function(e){m(h,
e).then(function(){e.close()})}}),{headers:a.headers})}function k(a,d,m,h){d[a]={total:m||0,loaded:0,done:!1};return fetch(a).then(function(e){if(!e.ok)return Promise.reject(Error(`Failed loading file '${a}'`));e=l(e,d[a]);return h?Promise.resolve(e):e.arrayBuffer()})}function b(a,d=1){return a().catch(function(m){return 1>=d?Promise.reject(m):new Promise(function(h,e){setTimeout(function(){b(a,d-1).then(h).catch(e)},1E3)})})}const n={};var f=0,p=0;let g=null;this.R=c;this.S=function(a){g=a};this.s=
function(a,d,m=!1){return b(k.bind(null,a,n,d,m),4)};this.i=[];this.B=function(a,d,m){let h=null;if("string"===typeof a){const e=this;return this.s(a,m).then(function(q){e.i.push({path:d||a,buffer:q});return Promise.resolve()})}a instanceof ArrayBuffer?h=new Uint8Array(a):ArrayBuffer.isView(a)&&(h=new Uint8Array(a.buffer));return h?(this.i.push({path:d,buffer:a}),Promise.resolve()):Promise.reject(Error("Invalid object for preloading"))}};function B(c){function l(k){this.update(k)}l.prototype={M:!0,canvas:null,l:"",D:null,locale:null,u:2,j:[],A:!0,v:!1,serviceWorker:"",L:["/userfs"],K:!1,o:[],m:[],F:null,G:null,J:null,H:function(){console.log.apply(console,Array.from(arguments))},I:function(k){console.error.apply(console,Array.from(arguments))}};l.prototype.update=function(k){function b(f,p){return"undefined"===typeof n[f]?p:n[f]}const n=k||{};this.M=b("unloadAfterInit",this.M);this.I=b("onPrintError",this.I);this.H=b("onPrint",this.H);
this.J=b("onProgress",this.J);this.canvas=b("canvas",this.canvas);this.l=b("executable",this.l);this.D=b("mainPack",this.D);this.locale=b("locale",this.locale);this.u=b("canvasResizePolicy",this.u);this.L=b("persistentPaths",this.L);this.K=b("persistentDrops",this.K);this.v=b("experimentalVK",this.v);this.A=b("focusCanvas",this.A);this.serviceWorker=b("serviceWorker",this.serviceWorker);this.o=b("gdextensionLibs",this.o);this.m=b("fileSizes",this.m);this.j=b("args",this.j);this.F=b("onExecute",this.F);
this.G=b("onExit",this.G)};l.prototype.P=function(k,b){let n=b;return{print:this.H,printErr:this.I,thisProgram:this.l,noExitRuntime:!1,dynamicLibraries:[`${k}.side.wasm`],instantiateWasm:function(f,p){function g(a){p(a.instance,a.module)}"undefined"!==typeof WebAssembly.instantiateStreaming?WebAssembly.instantiateStreaming(Promise.resolve(n),f).then(g):n.arrayBuffer().then(function(a){WebAssembly.instantiate(a,f).then(g)});n=null;return{}},locateFile:function(f){if(f.startsWith("godot.")){if(f.endsWith(".worker.js"))return`${k}.worker.js`;
if(f.endsWith(".audio.worklet.js"))return`${k}.audio.worklet.js`;if(f.endsWith(".js"))return`${k}.js`;if(f.endsWith(".side.wasm"))return`${k}.side.wasm`;if(f.endsWith(".wasm"))return`${k}.wasm`}return f}}};l.prototype.O=function(k){if(!(this.canvas instanceof HTMLCanvasElement)){var b=document.getElementsByTagName("canvas");b.length&&b[0]instanceof HTMLCanvasElement&&(this.canvas=b[0]);if(!this.canvas)throw Error("No canvas found in page");}0>this.canvas.tabIndex&&(this.canvas.tabIndex=0);b=this.locale;
b||(b=navigator.languages?navigator.languages[0]:navigator.language,b=b.split(".")[0]);b=b.replace("-","_");const n=this.G;return{canvas:this.canvas,canvasResizePolicy:this.u,locale:b,persistentDrops:this.K,virtualKeyboard:this.v,focusCanvas:this.A,onExecute:this.F,onExit:function(f){k();"function"===typeof n&&n(f)}}};return new l(c)};const C=function(){function c(p){this.g=new B(p);this.h=null}function l(p){c.prototype={C:function(g){if(f)return f;if(null==b){if(!g)return f=Promise.reject(Error("A base path must be provided when calling `init` and the engine is not loaded."));c.load(g,this.g.m[`${g}.wasm`])}const a=this;k.S(this.g.J);return f=function(d){return new Promise(function(m){d.then(function(h){h=new Response(h.clone().body,{headers:[["content-type","application/wasm"]]});Godot(a.g.P(n,h)).then(function(e){e.initFS(a.g.L).then(function(){a.h=
e;a.g.M&&c.i();m()})})})})}(b)},N:function(g,a){return k.B(g,a,this.g.m[g])},start:function(g){this.g.update(g);const a=this;return a.C().then(function(){if(!a.h)return Promise.reject(Error("The engine must be initialized before it can be started"));let d={};try{d=a.g.O(function(){a.h=null})}catch(h){return Promise.reject(h)}a.h.initConfig(d);const m=[];if(0<a.g.o.length&&!a.h.loadDynamicLibrary)return Promise.reject(Error('GDExtension libraries are not supported by this engine version. Enable "Extensions Support" for your export preset and/or build your custom template with "dlink_enabled=yes".'));
a.g.o.forEach(function(h){m.push(a.h.loadDynamicLibrary(h,{loadAsync:!0}))});return Promise.all(m).then(function(){return new Promise(function(h){k.i.forEach(function(e){a.h.copyToFS(e.path,e.buffer)});k.i.length=0;a.h.callMain(a.g.j);f=null;a.g.serviceWorker&&"serviceWorker"in navigator&&navigator.serviceWorker.register(a.g.serviceWorker);h()})})})},B:function(g){this.g.update(g);g=this.g.l;const a=this.g.D||`${g}.pck`;this.g.j=["--main-pack",a].concat(this.g.j);const d=this;return Promise.all([this.C(g),
this.N(a,a)]).then(function(){return d.start.apply(d)})},i:function(g,a){if(null==this.h)throw Error("Engine must be inited before copying files");this.h.copyToFS(g,a)},s:function(){this.h&&this.h.request_quit()}};c.prototype.init=c.prototype.C;c.prototype.preloadFile=c.prototype.N;c.prototype.start=c.prototype.start;c.prototype.startGame=c.prototype.B;c.prototype.copyToFS=c.prototype.i;c.prototype.requestQuit=c.prototype.s;c.prototype.load=c.load;c.prototype.unload=c.i;return new c(p)}const k=new A;
let b=null,n="",f=null;c.load=function(p,g){null==b&&(n=p,b=k.s(`${n}.wasm`,g,!0),requestAnimationFrame(k.R));return b};c.i=function(){b=null};l.load=c.load;l.unload=c.i;l.isWebGLAvailable=t;l.isFetchAvailable=u;l.isSecureContext=v;l.isCrossOriginIsolated=w;l.isSharedArrayBufferAvailable=x;l.isAudioWorkletAvailable=y;l.getMissingFeatures=z;return l}();"undefined"!==typeof window&&(window.Engine=C);
