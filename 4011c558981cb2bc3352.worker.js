(function(t){var n={};function r(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=n,r.d=function(t,n,e){r.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,n){if(1&n&&(t=r(t)),8&n)return t;if(4&n&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)r.d(e,i,function(n){return t[n]}.bind(null,i));return e},r.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p="",r(r.s="25c0")})({"0366":function(t,n,r){var e=r("1c0b");t.exports=function(t,n,r){if(e(t),void 0===n)return t;switch(r){case 0:return function(){return t.call(n)};case 1:return function(r){return t.call(n,r)};case 2:return function(r,e){return t.call(n,r,e)};case 3:return function(r,e,i){return t.call(n,r,e,i)}}return function(){return t.apply(n,arguments)}}},"06cf":function(t,n,r){var e=r("83ab"),i=r("d1e7"),o=r("5c6c"),a=r("fc6a"),u=r("c04e"),c=r("5135"),s=r("0cfb"),f=Object.getOwnPropertyDescriptor;n.f=e?f:function(t,n){if(t=a(t),n=u(n,!0),s)try{return f(t,n)}catch(r){}if(c(t,n))return o(!i.f.call(t,n),t[n])}},"0cfb":function(t,n,r){var e=r("83ab"),i=r("d039"),o=r("cc12");t.exports=!e&&!i((function(){return 7!=Object.defineProperty(o("div"),"a",{get:function(){return 7}}).a}))},"1be4":function(t,n,r){var e=r("d066");t.exports=e("document","documentElement")},"1c0b":function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t}},"1d80":function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on "+t);return t}},"1dde":function(t,n,r){var e=r("d039"),i=r("b622"),o=r("2d00"),a=i("species");t.exports=function(t){return o>=51||!e((function(){var n=[],r=n.constructor={};return r[a]=function(){return{foo:1}},1!==n[t](Boolean).foo}))}},"23cb":function(t,n,r){var e=r("a691"),i=Math.max,o=Math.min;t.exports=function(t,n){var r=e(t);return r<0?i(r+n,0):o(r,n)}},"23e7":function(t,n,r){var e=r("da84"),i=r("06cf").f,o=r("9112"),a=r("6eeb"),u=r("ce4e"),c=r("e893"),s=r("94ca");t.exports=function(t,n){var r,f,h,p,l,v,m=t.target,d=t.global,b=t.stat;if(f=d?e:b?e[m]||u(m,{}):(e[m]||{}).prototype,f)for(h in n){if(l=n[h],t.noTargetGet?(v=i(f,h),p=v&&v.value):p=f[h],r=s(d?h:m+(b?".":"#")+h,t.forced),!r&&void 0!==p){if(typeof l===typeof p)continue;c(l,p)}(t.sham||p&&p.sham)&&o(l,"sham",!0),a(f,h,l,t)}}},"241c":function(t,n,r){var e=r("ca84"),i=r("7839"),o=i.concat("length","prototype");n.f=Object.getOwnPropertyNames||function(t){return e(t,o)}},"25c0":function(t,n,r){"use strict";r.r(n),r.d(n,"binomial",(function(){return u}));r("cb29"),r("d81d"),r("4c53");var e=r("edaf"),i=r.n(e),o=function(t){var n=1;while(t>0)n*=t,t-=1;return n},a=function(t,n){return o(t)/(o(n)*o(t-n))};function u(t,n,r,e,o){var u=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1,c=i()(t,n),s=i()(r,e),f=s.sub(c).div(s.add(c)).mul(Math.pow(2,-u)),h=2-4/Math.PI*Math.acos(.5*Math.pow(o/f.abs(),1/u)),p=c,l=Array(u).fill(0).map((function(t,n){return p=p.log().add(s.div(c).log().mul(Math.pow(2,-u)*a(u,n))).exp(),p.clone()}));return{A:f,fM:h,Z:l}}addEventListener("message",(function(t){var r,e,i=t.data,o=i.type,a=i.method,u=i.id,c=i.params;"RPC"===o&&a&&(e=(r=n[a])?Promise.resolve().then((function(){return r.apply(n,c)})):Promise.reject("No such method"),e.then((function(t){postMessage({type:"RPC",id:u,result:t})})).catch((function(t){var n={message:t};t.stack&&(n.message=t.message,n.stack=t.stack,n.name=t.name),postMessage({type:"RPC",id:u,error:n})})))})),postMessage({type:"RPC",method:"ready"})},"2d00":function(t,n,r){var e,i,o=r("da84"),a=r("342f"),u=o.process,c=u&&u.versions,s=c&&c.v8;s?(e=s.split("."),i=e[0]+e[1]):a&&(e=a.match(/Edge\/(\d+)/),(!e||e[1]>=74)&&(e=a.match(/Chrome\/(\d+)/),e&&(i=e[1]))),t.exports=i&&+i},"342f":function(t,n,r){var e=r("d066");t.exports=e("navigator","userAgent")||""},"37e8":function(t,n,r){var e=r("83ab"),i=r("9bf2"),o=r("825a"),a=r("df75");t.exports=e?Object.defineProperties:function(t,n){o(t);var r,e=a(n),u=e.length,c=0;while(u>c)i.f(t,r=e[c++],n[r]);return t}},"428f":function(t,n,r){var e=r("da84");t.exports=e},"44ad":function(t,n,r){var e=r("d039"),i=r("c6b6"),o="".split;t.exports=e((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==i(t)?o.call(t,""):Object(t)}:Object},"44d2":function(t,n,r){var e=r("b622"),i=r("7c73"),o=r("9bf2"),a=e("unscopables"),u=Array.prototype;void 0==u[a]&&o.f(u,a,{configurable:!0,value:i(null)}),t.exports=function(t){u[a][t]=!0}},4930:function(t,n,r){var e=r("d039");t.exports=!!Object.getOwnPropertySymbols&&!e((function(){return!String(Symbol())}))},"4c53":function(t,n,r){"use strict";var e=r("23e7"),i=r("857a"),o=r("af03");e({target:"String",proto:!0,forced:o("sub")},{sub:function(){return i(this,"sub","","")}})},"4d64":function(t,n,r){var e=r("fc6a"),i=r("50c4"),o=r("23cb"),a=function(t){return function(n,r,a){var u,c=e(n),s=i(c.length),f=o(a,s);if(t&&r!=r){while(s>f)if(u=c[f++],u!=u)return!0}else for(;s>f;f++)if((t||f in c)&&c[f]===r)return t||f||0;return!t&&-1}};t.exports={includes:a(!0),indexOf:a(!1)}},"50c4":function(t,n,r){var e=r("a691"),i=Math.min;t.exports=function(t){return t>0?i(e(t),9007199254740991):0}},5135:function(t,n){var r={}.hasOwnProperty;t.exports=function(t,n){return r.call(t,n)}},5692:function(t,n,r){var e=r("c430"),i=r("c6cd");(t.exports=function(t,n){return i[t]||(i[t]=void 0!==n?n:{})})("versions",[]).push({version:"3.7.0",mode:e?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})},"56ef":function(t,n,r){var e=r("d066"),i=r("241c"),o=r("7418"),a=r("825a");t.exports=e("Reflect","ownKeys")||function(t){var n=i.f(a(t)),r=o.f;return r?n.concat(r(t)):n}},"5c6c":function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},"65f0":function(t,n,r){var e=r("861d"),i=r("e8b5"),o=r("b622"),a=o("species");t.exports=function(t,n){var r;return i(t)&&(r=t.constructor,"function"!=typeof r||r!==Array&&!i(r.prototype)?e(r)&&(r=r[a],null===r&&(r=void 0)):r=void 0),new(void 0===r?Array:r)(0===n?0:n)}},"69f3":function(t,n,r){var e,i,o,a=r("7f9a"),u=r("da84"),c=r("861d"),s=r("9112"),f=r("5135"),h=r("c6cd"),p=r("f772"),l=r("d012"),v=u.WeakMap,m=function(t){return o(t)?i(t):e(t,{})},d=function(t){return function(n){var r;if(!c(n)||(r=i(n)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return r}};if(a){var b=h.state||(h.state=new v),w=b.get,M=b.has,y=b.set;e=function(t,n){return n.facade=t,y.call(b,t,n),n},i=function(t){return w.call(b,t)||{}},o=function(t){return M.call(b,t)}}else{var g=p("state");l[g]=!0,e=function(t,n){return n.facade=t,s(t,g,n),n},i=function(t){return f(t,g)?t[g]:{}},o=function(t){return f(t,g)}}t.exports={set:e,get:i,has:o,enforce:m,getterFor:d}},"6eeb":function(t,n,r){var e=r("da84"),i=r("9112"),o=r("5135"),a=r("ce4e"),u=r("8925"),c=r("69f3"),s=c.get,f=c.enforce,h=String(String).split("String");(t.exports=function(t,n,r,u){var c,s=!!u&&!!u.unsafe,p=!!u&&!!u.enumerable,l=!!u&&!!u.noTargetGet;"function"==typeof r&&("string"!=typeof n||o(r,"name")||i(r,"name",n),c=f(r),c.source||(c.source=h.join("string"==typeof n?n:""))),t!==e?(s?!l&&t[n]&&(p=!0):delete t[n],p?t[n]=r:i(t,n,r)):p?t[n]=r:a(n,r)})(Function.prototype,"toString",(function(){return"function"==typeof this&&s(this).source||u(this)}))},7418:function(t,n){n.f=Object.getOwnPropertySymbols},7839:function(t,n){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},"7b0b":function(t,n,r){var e=r("1d80");t.exports=function(t){return Object(e(t))}},"7c73":function(t,n,r){var e,i=r("825a"),o=r("37e8"),a=r("7839"),u=r("d012"),c=r("1be4"),s=r("cc12"),f=r("f772"),h=">",p="<",l="prototype",v="script",m=f("IE_PROTO"),d=function(){},b=function(t){return p+v+h+t+p+"/"+v+h},w=function(t){t.write(b("")),t.close();var n=t.parentWindow.Object;return t=null,n},M=function(){var t,n=s("iframe"),r="java"+v+":";return n.style.display="none",c.appendChild(n),n.src=String(r),t=n.contentWindow.document,t.open(),t.write(b("document.F=Object")),t.close(),t.F},y=function(){try{e=document.domain&&new ActiveXObject("htmlfile")}catch(n){}y=e?w(e):M();var t=a.length;while(t--)delete y[l][a[t]];return y()};u[m]=!0,t.exports=Object.create||function(t,n){var r;return null!==t?(d[l]=i(t),r=new d,d[l]=null,r[m]=t):r=y(),void 0===n?r:o(r,n)}},"7f9a":function(t,n,r){var e=r("da84"),i=r("8925"),o=e.WeakMap;t.exports="function"===typeof o&&/native code/.test(i(o))},"81d5":function(t,n,r){"use strict";var e=r("7b0b"),i=r("23cb"),o=r("50c4");t.exports=function(t){var n=e(this),r=o(n.length),a=arguments.length,u=i(a>1?arguments[1]:void 0,r),c=a>2?arguments[2]:void 0,s=void 0===c?r:i(c,r);while(s>u)n[u++]=t;return n}},"825a":function(t,n,r){var e=r("861d");t.exports=function(t){if(!e(t))throw TypeError(String(t)+" is not an object");return t}},"83ab":function(t,n,r){var e=r("d039");t.exports=!e((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},"857a":function(t,n,r){var e=r("1d80"),i=/"/g;t.exports=function(t,n,r,o){var a=String(e(t)),u="<"+n;return""!==r&&(u+=" "+r+'="'+String(o).replace(i,"&quot;")+'"'),u+">"+a+"</"+n+">"}},"861d":function(t,n){t.exports=function(t){return"object"===typeof t?null!==t:"function"===typeof t}},8925:function(t,n,r){var e=r("c6cd"),i=Function.toString;"function"!=typeof e.inspectSource&&(e.inspectSource=function(t){return i.call(t)}),t.exports=e.inspectSource},"90e3":function(t,n){var r=0,e=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++r+e).toString(36)}},9112:function(t,n,r){var e=r("83ab"),i=r("9bf2"),o=r("5c6c");t.exports=e?function(t,n,r){return i.f(t,n,o(1,r))}:function(t,n,r){return t[n]=r,t}},"94ca":function(t,n,r){var e=r("d039"),i=/#|\.prototype\./,o=function(t,n){var r=u[a(t)];return r==s||r!=c&&("function"==typeof n?e(n):!!n)},a=o.normalize=function(t){return String(t).replace(i,".").toLowerCase()},u=o.data={},c=o.NATIVE="N",s=o.POLYFILL="P";t.exports=o},"9bf2":function(t,n,r){var e=r("83ab"),i=r("0cfb"),o=r("825a"),a=r("c04e"),u=Object.defineProperty;n.f=e?u:function(t,n,r){if(o(t),n=a(n,!0),o(r),i)try{return u(t,n,r)}catch(e){}if("get"in r||"set"in r)throw TypeError("Accessors not supported");return"value"in r&&(t[n]=r.value),t}},a691:function(t,n){var r=Math.ceil,e=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?e:r)(t)}},ae40:function(t,n,r){var e=r("83ab"),i=r("d039"),o=r("5135"),a=Object.defineProperty,u={},c=function(t){throw t};t.exports=function(t,n){if(o(u,t))return u[t];n||(n={});var r=[][t],s=!!o(n,"ACCESSORS")&&n.ACCESSORS,f=o(n,0)?n[0]:c,h=o(n,1)?n[1]:void 0;return u[t]=!!r&&!i((function(){if(s&&!e)return!0;var t={length:-1};s?a(t,1,{enumerable:!0,get:c}):t[1]=1,r.call(t,f,h)}))}},af03:function(t,n,r){var e=r("d039");t.exports=function(t){return e((function(){var n=""[t]('"');return n!==n.toLowerCase()||n.split('"').length>3}))}},b622:function(t,n,r){var e=r("da84"),i=r("5692"),o=r("5135"),a=r("90e3"),u=r("4930"),c=r("fdbf"),s=i("wks"),f=e.Symbol,h=c?f:f&&f.withoutSetter||a;t.exports=function(t){return o(s,t)||(u&&o(f,t)?s[t]=f[t]:s[t]=h("Symbol."+t)),s[t]}},b727:function(t,n,r){var e=r("0366"),i=r("44ad"),o=r("7b0b"),a=r("50c4"),u=r("65f0"),c=[].push,s=function(t){var n=1==t,r=2==t,s=3==t,f=4==t,h=6==t,p=5==t||h;return function(l,v,m,d){for(var b,w,M=o(l),y=i(M),g=e(v,m,3),x=a(y.length),I=0,N=d||u,O=n?N(l,x):r?N(l,0):void 0;x>I;I++)if((p||I in y)&&(b=y[I],w=g(b,I,M),t))if(n)O[I]=w;else if(w)switch(t){case 3:return!0;case 5:return b;case 6:return I;case 2:c.call(O,b)}else if(f)return!1;return h?-1:s||f?f:O}};t.exports={forEach:s(0),map:s(1),filter:s(2),some:s(3),every:s(4),find:s(5),findIndex:s(6)}},c04e:function(t,n,r){var e=r("861d");t.exports=function(t,n){if(!e(t))return t;var r,i;if(n&&"function"==typeof(r=t.toString)&&!e(i=r.call(t)))return i;if("function"==typeof(r=t.valueOf)&&!e(i=r.call(t)))return i;if(!n&&"function"==typeof(r=t.toString)&&!e(i=r.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},c430:function(t,n){t.exports=!1},c6b6:function(t,n){var r={}.toString;t.exports=function(t){return r.call(t).slice(8,-1)}},c6cd:function(t,n,r){var e=r("da84"),i=r("ce4e"),o="__core-js_shared__",a=e[o]||i(o,{});t.exports=a},c8ba:function(t,n){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"===typeof window&&(r=window)}t.exports=r},ca84:function(t,n,r){var e=r("5135"),i=r("fc6a"),o=r("4d64").indexOf,a=r("d012");t.exports=function(t,n){var r,u=i(t),c=0,s=[];for(r in u)!e(a,r)&&e(u,r)&&s.push(r);while(n.length>c)e(u,r=n[c++])&&(~o(s,r)||s.push(r));return s}},cb29:function(t,n,r){var e=r("23e7"),i=r("81d5"),o=r("44d2");e({target:"Array",proto:!0},{fill:i}),o("fill")},cc12:function(t,n,r){var e=r("da84"),i=r("861d"),o=e.document,a=i(o)&&i(o.createElement);t.exports=function(t){return a?o.createElement(t):{}}},ce4e:function(t,n,r){var e=r("da84"),i=r("9112");t.exports=function(t,n){try{i(e,t,n)}catch(r){e[t]=n}return n}},d012:function(t,n){t.exports={}},d039:function(t,n){t.exports=function(t){try{return!!t()}catch(n){return!0}}},d066:function(t,n,r){var e=r("428f"),i=r("da84"),o=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,n){return arguments.length<2?o(e[t])||o(i[t]):e[t]&&e[t][n]||i[t]&&i[t][n]}},d1e7:function(t,n,r){"use strict";var e={}.propertyIsEnumerable,i=Object.getOwnPropertyDescriptor,o=i&&!e.call({1:2},1);n.f=o?function(t){var n=i(this,t);return!!n&&n.enumerable}:e},d81d:function(t,n,r){"use strict";var e=r("23e7"),i=r("b727").map,o=r("1dde"),a=r("ae40"),u=o("map"),c=a("map");e({target:"Array",proto:!0,forced:!u||!c},{map:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},da84:function(t,n,r){(function(n){var r=function(t){return t&&t.Math==Math&&t};t.exports=r("object"==typeof globalThis&&globalThis)||r("object"==typeof window&&window)||r("object"==typeof self&&self)||r("object"==typeof n&&n)||function(){return this}()||Function("return this")()}).call(this,r("c8ba"))},df75:function(t,n,r){var e=r("ca84"),i=r("7839");t.exports=Object.keys||function(t){return e(t,i)}},e893:function(t,n,r){var e=r("5135"),i=r("56ef"),o=r("06cf"),a=r("9bf2");t.exports=function(t,n){for(var r=i(n),u=a.f,c=o.f,s=0;s<r.length;s++){var f=r[s];e(t,f)||u(t,f,c(n,f))}}},e8b5:function(t,n,r){var e=r("c6b6");t.exports=Array.isArray||function(t){return"Array"==e(t)}},edaf:function(t,n,r){var e,i;
/**
 * @license Complex.js v2.0.11 11/02/2016
 *
 * Copyright (c) 2016, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/(function(r){"use strict";var o=function(t){return.5*(Math.exp(t)+Math.exp(-t))},a=function(t){return.5*(Math.exp(t)-Math.exp(-t))},u=function(t){var n=Math.PI/4;if(t<-n||t>n)return Math.cos(t)-1;var r=t*t;return r*(r*(1/24+r*(-1/720+r*(1/40320+r*(-1/3628800+r*(1/4790014600+r*(-1/87178291200+r*(1/20922789888e3)))))))-.5)},c=function(t,n){var r=Math.abs(t),e=Math.abs(n);return r<3e3&&e<3e3?Math.sqrt(r*r+e*e):(r<e?(r=e,e=t/n):e=n/t,r*Math.sqrt(1+e*e))},s=function(){throw SyntaxError("Invalid Param")};function f(t,n){var r=Math.abs(t),e=Math.abs(n);return 0===t?Math.log(e):0===n?Math.log(r):r<3e3&&e<3e3?.5*Math.log(t*t+n*n):Math.log(t/Math.cos(Math.atan2(n,t)))}var h=function(t,n){var r={re:0,im:0};if(void 0===t||null===t)r["re"]=r["im"]=0;else if(void 0!==n)r["re"]=t,r["im"]=n;else switch(typeof t){case"object":if("im"in t&&"re"in t)r["re"]=t["re"],r["im"]=t["im"];else if("abs"in t&&"arg"in t){if(!Number.isFinite(t["abs"])&&Number.isFinite(t["arg"]))return p["INFINITY"];r["re"]=t["abs"]*Math.cos(t["arg"]),r["im"]=t["abs"]*Math.sin(t["arg"])}else if("r"in t&&"phi"in t){if(!Number.isFinite(t["r"])&&Number.isFinite(t["phi"]))return p["INFINITY"];r["re"]=t["r"]*Math.cos(t["phi"]),r["im"]=t["r"]*Math.sin(t["phi"])}else 2===t.length?(r["re"]=t[0],r["im"]=t[1]):s();break;case"string":r["im"]=r["re"]=0;var e=t.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g),i=1,o=0;null===e&&s();for(var a=0;a<e.length;a++){var u=e[a];" "===u||"\t"===u||"\n"===u||("+"===u?i++:"-"===u?o++:"i"===u||"I"===u?(i+o===0&&s()," "===e[a+1]||isNaN(e[a+1])?r["im"]+=parseFloat((o%2?"-":"")+"1"):(r["im"]+=parseFloat((o%2?"-":"")+e[a+1]),a++),i=o=0):((i+o===0||isNaN(u))&&s(),"i"===e[a+1]||"I"===e[a+1]?(r["im"]+=parseFloat((o%2?"-":"")+u),a++):r["re"]+=parseFloat((o%2?"-":"")+u),i=o=0))}i+o>0&&s();break;case"number":r["im"]=0,r["re"]=t;break;default:s()}return isNaN(r["re"])||isNaN(r["im"]),r};function p(t,n){if(!(this instanceof p))return new p(t,n);var r=h(t,n);this["re"]=r["re"],this["im"]=r["im"]}p.prototype={re:0,im:0,sign:function(){var t=this["abs"]();return new p(this["re"]/t,this["im"]/t)},add:function(t,n){var r=new p(t,n);return this["isInfinite"]()&&r["isInfinite"]()?p["NAN"]:this["isInfinite"]()||r["isInfinite"]()?p["INFINITY"]:new p(this["re"]+r["re"],this["im"]+r["im"])},sub:function(t,n){var r=new p(t,n);return this["isInfinite"]()&&r["isInfinite"]()?p["NAN"]:this["isInfinite"]()||r["isInfinite"]()?p["INFINITY"]:new p(this["re"]-r["re"],this["im"]-r["im"])},mul:function(t,n){var r=new p(t,n);return this["isInfinite"]()&&r["isZero"]()||this["isZero"]()&&r["isInfinite"]()?p["NAN"]:this["isInfinite"]()||r["isInfinite"]()?p["INFINITY"]:0===r["im"]&&0===this["im"]?new p(this["re"]*r["re"],0):new p(this["re"]*r["re"]-this["im"]*r["im"],this["re"]*r["im"]+this["im"]*r["re"])},div:function(t,n){var r=new p(t,n);if(this["isZero"]()&&r["isZero"]()||this["isInfinite"]()&&r["isInfinite"]())return p["NAN"];if(this["isInfinite"]()||r["isZero"]())return p["INFINITY"];if(this["isZero"]()||r["isInfinite"]())return p["ZERO"];t=this["re"],n=this["im"];var e,i,o=r["re"],a=r["im"];return 0===a?new p(t/o,n/o):Math.abs(o)<Math.abs(a)?(i=o/a,e=o*i+a,new p((t*i+n)/e,(n*i-t)/e)):(i=a/o,e=a*i+o,new p((t+n*i)/e,(n-t*i)/e))},pow:function(t,n){var r=new p(t,n);if(t=this["re"],n=this["im"],r["isZero"]())return p["ONE"];if(0===r["im"]){if(0===n&&t>=0)return new p(Math.pow(t,r["re"]),0);if(0===t)switch((r["re"]%4+4)%4){case 0:return new p(Math.pow(n,r["re"]),0);case 1:return new p(0,Math.pow(n,r["re"]));case 2:return new p(-Math.pow(n,r["re"]),0);case 3:return new p(0,-Math.pow(n,r["re"]))}}if(0===t&&0===n&&r["re"]>0&&r["im"]>=0)return p["ZERO"];var e=Math.atan2(n,t),i=f(t,n);return t=Math.exp(r["re"]*i-r["im"]*e),n=r["im"]*i+r["re"]*e,new p(t*Math.cos(n),t*Math.sin(n))},sqrt:function(){var t,n,r=this["re"],e=this["im"],i=this["abs"]();if(r>=0){if(0===e)return new p(Math.sqrt(r),0);t=.5*Math.sqrt(2*(i+r))}else t=Math.abs(e)/Math.sqrt(2*(i-r));return n=r<=0?.5*Math.sqrt(2*(i-r)):Math.abs(e)/Math.sqrt(2*(i+r)),new p(t,e<0?-n:n)},exp:function(){var t=Math.exp(this["re"]);return this["im"],new p(t*Math.cos(this["im"]),t*Math.sin(this["im"]))},expm1:function(){var t=this["re"],n=this["im"];return new p(Math.expm1(t)*Math.cos(n)+u(n),Math.exp(t)*Math.sin(n))},log:function(){var t=this["re"],n=this["im"];return new p(f(t,n),Math.atan2(n,t))},abs:function(){return c(this["re"],this["im"])},arg:function(){return Math.atan2(this["im"],this["re"])},sin:function(){var t=this["re"],n=this["im"];return new p(Math.sin(t)*o(n),Math.cos(t)*a(n))},cos:function(){var t=this["re"],n=this["im"];return new p(Math.cos(t)*o(n),-Math.sin(t)*a(n))},tan:function(){var t=2*this["re"],n=2*this["im"],r=Math.cos(t)+o(n);return new p(Math.sin(t)/r,a(n)/r)},cot:function(){var t=2*this["re"],n=2*this["im"],r=Math.cos(t)-o(n);return new p(-Math.sin(t)/r,a(n)/r)},sec:function(){var t=this["re"],n=this["im"],r=.5*o(2*n)+.5*Math.cos(2*t);return new p(Math.cos(t)*o(n)/r,Math.sin(t)*a(n)/r)},csc:function(){var t=this["re"],n=this["im"],r=.5*o(2*n)-.5*Math.cos(2*t);return new p(Math.sin(t)*o(n)/r,-Math.cos(t)*a(n)/r)},asin:function(){var t=this["re"],n=this["im"],r=new p(n*n-t*t+1,-2*t*n)["sqrt"](),e=new p(r["re"]-n,r["im"]+t)["log"]();return new p(e["im"],-e["re"])},acos:function(){var t=this["re"],n=this["im"],r=new p(n*n-t*t+1,-2*t*n)["sqrt"](),e=new p(r["re"]-n,r["im"]+t)["log"]();return new p(Math.PI/2-e["im"],e["re"])},atan:function(){var t=this["re"],n=this["im"];if(0===t){if(1===n)return new p(0,1/0);if(-1===n)return new p(0,-1/0)}var r=t*t+(1-n)*(1-n),e=new p((1-n*n-t*t)/r,-2*t/r).log();return new p(-.5*e["im"],.5*e["re"])},acot:function(){var t=this["re"],n=this["im"];if(0===n)return new p(Math.atan2(1,t),0);var r=t*t+n*n;return 0!==r?new p(t/r,-n/r).atan():new p(0!==t?t/0:0,0!==n?-n/0:0).atan()},asec:function(){var t=this["re"],n=this["im"];if(0===t&&0===n)return new p(0,1/0);var r=t*t+n*n;return 0!==r?new p(t/r,-n/r).acos():new p(0!==t?t/0:0,0!==n?-n/0:0).acos()},acsc:function(){var t=this["re"],n=this["im"];if(0===t&&0===n)return new p(Math.PI/2,1/0);var r=t*t+n*n;return 0!==r?new p(t/r,-n/r).asin():new p(0!==t?t/0:0,0!==n?-n/0:0).asin()},sinh:function(){var t=this["re"],n=this["im"];return new p(a(t)*Math.cos(n),o(t)*Math.sin(n))},cosh:function(){var t=this["re"],n=this["im"];return new p(o(t)*Math.cos(n),a(t)*Math.sin(n))},tanh:function(){var t=2*this["re"],n=2*this["im"],r=o(t)+Math.cos(n);return new p(a(t)/r,Math.sin(n)/r)},coth:function(){var t=2*this["re"],n=2*this["im"],r=o(t)-Math.cos(n);return new p(a(t)/r,-Math.sin(n)/r)},csch:function(){var t=this["re"],n=this["im"],r=Math.cos(2*n)-o(2*t);return new p(-2*a(t)*Math.cos(n)/r,2*o(t)*Math.sin(n)/r)},sech:function(){var t=this["re"],n=this["im"],r=Math.cos(2*n)+o(2*t);return new p(2*o(t)*Math.cos(n)/r,-2*a(t)*Math.sin(n)/r)},asinh:function(){var t=this["im"];this["im"]=-this["re"],this["re"]=t;var n=this["asin"]();return this["re"]=-this["im"],this["im"]=t,t=n["re"],n["re"]=-n["im"],n["im"]=t,n},acosh:function(){var t=this["acos"]();if(t["im"]<=0){var n=t["re"];t["re"]=-t["im"],t["im"]=n}else{n=t["im"];t["im"]=-t["re"],t["re"]=n}return t},atanh:function(){var t=this["re"],n=this["im"],r=t>1&&0===n,e=1-t,i=1+t,o=e*e+n*n,a=0!==o?new p((i*e-n*n)/o,(n*e+i*n)/o):new p(-1!==t?t/0:0,0!==n?n/0:0),u=a["re"];return a["re"]=f(a["re"],a["im"])/2,a["im"]=Math.atan2(a["im"],u)/2,r&&(a["im"]=-a["im"]),a},acoth:function(){var t=this["re"],n=this["im"];if(0===t&&0===n)return new p(0,Math.PI/2);var r=t*t+n*n;return 0!==r?new p(t/r,-n/r).atanh():new p(0!==t?t/0:0,0!==n?-n/0:0).atanh()},acsch:function(){var t=this["re"],n=this["im"];if(0===n)return new p(0!==t?Math.log(t+Math.sqrt(t*t+1)):1/0,0);var r=t*t+n*n;return 0!==r?new p(t/r,-n/r).asinh():new p(0!==t?t/0:0,0!==n?-n/0:0).asinh()},asech:function(){var t=this["re"],n=this["im"];if(this["isZero"]())return p["INFINITY"];var r=t*t+n*n;return 0!==r?new p(t/r,-n/r).acosh():new p(0!==t?t/0:0,0!==n?-n/0:0).acosh()},inverse:function(){if(this["isZero"]())return p["INFINITY"];if(this["isInfinite"]())return p["ZERO"];var t=this["re"],n=this["im"],r=t*t+n*n;return new p(t/r,-n/r)},conjugate:function(){return new p(this["re"],-this["im"])},neg:function(){return new p(-this["re"],-this["im"])},ceil:function(t){return t=Math.pow(10,t||0),new p(Math.ceil(this["re"]*t)/t,Math.ceil(this["im"]*t)/t)},floor:function(t){return t=Math.pow(10,t||0),new p(Math.floor(this["re"]*t)/t,Math.floor(this["im"]*t)/t)},round:function(t){return t=Math.pow(10,t||0),new p(Math.round(this["re"]*t)/t,Math.round(this["im"]*t)/t)},equals:function(t,n){var r=new p(t,n);return Math.abs(r["re"]-this["re"])<=p["EPSILON"]&&Math.abs(r["im"]-this["im"])<=p["EPSILON"]},clone:function(){return new p(this["re"],this["im"])},toString:function(){var t=this["re"],n=this["im"],r="";return this["isNaN"]()?"NaN":this["isZero"]()?"0":this["isInfinite"]()?"Infinity":(0!==t&&(r+=t),0!==n&&(0!==t?r+=n<0?" - ":" + ":n<0&&(r+="-"),n=Math.abs(n),1!==n&&(r+=n),r+="i"),r||"0")},toVector:function(){return[this["re"],this["im"]]},valueOf:function(){return 0===this["im"]?this["re"]:null},isNaN:function(){return isNaN(this["re"])||isNaN(this["im"])},isZero:function(){return(0===this["re"]||-0===this["re"])&&(0===this["im"]||-0===this["im"])},isFinite:function(){return isFinite(this["re"])&&isFinite(this["im"])},isInfinite:function(){return!(this["isNaN"]()||this["isFinite"]())}},p["ZERO"]=new p(0,0),p["ONE"]=new p(1,0),p["I"]=new p(0,1),p["PI"]=new p(Math.PI,0),p["E"]=new p(Math.E,0),p["INFINITY"]=new p(1/0,1/0),p["NAN"]=new p(NaN,NaN),p["EPSILON"]=1e-16,e=[],i=function(){return p}.apply(n,e),void 0===i||(t.exports=i)})()},f772:function(t,n,r){var e=r("5692"),i=r("90e3"),o=e("keys");t.exports=function(t){return o[t]||(o[t]=i(t))}},fc6a:function(t,n,r){var e=r("44ad"),i=r("1d80");t.exports=function(t){return e(i(t))}},fdbf:function(t,n,r){var e=r("4930");t.exports=e&&!Symbol.sham&&"symbol"==typeof Symbol.iterator}});
//# sourceMappingURL=4011c558981cb2bc3352.worker.js.map