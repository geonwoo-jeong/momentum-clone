parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"bWEA":[function(require,module,exports) {
"use strict";var e=function(){var e,t=document,n=t.querySelector(".js-form-todo"),r=n.querySelector("input"),i=t.querySelector(".js-ul-todo"),o="toDos",a=[];function l(e){var t=e.target.parentNode;i.removeChild(t);var n=a.filter(function(e){return e.id!==t.id});a=n,u()}function u(){localStorage.setItem(o,JSON.stringify(a))}function c(e){var n=t.createElement("li"),r=t.createElement("button"),o=t.createElement("span"),c=String(a.length+1);r.innerText="❌",r.addEventListener("click",l),o.innerText=e,n.id=c,n.appendChild(r),n.appendChild(o),i.appendChild(n);var d={id:c,text:e};a.push(d),u()}function d(e){e.preventDefault(),c(r.value)}null!==(e=localStorage.getItem(o))&&JSON.parse(e).forEach(function(e){c(e.text)}),n.addEventListener("submit",d)}();
},{}]},{},["bWEA"], null)
//# sourceMappingURL=todo.898a49b2.js.map