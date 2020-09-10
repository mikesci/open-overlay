(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["OverlayRenderer"] = factory(require("React"));
	else
		root["OverlayRenderer"] = factory(root["React"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_react__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _arrayLikeToArray(arr, len) {\n  if (len == null || len > arr.length) len = arr.length;\n\n  for (var i = 0, arr2 = new Array(len); i < len; i++) {\n    arr2[i] = arr[i];\n  }\n\n  return arr2;\n}\n\nmodule.exports = _arrayLikeToArray;\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/@babel/runtime/helpers/arrayLikeToArray.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _arrayWithHoles(arr) {\n  if (Array.isArray(arr)) return arr;\n}\n\nmodule.exports = _arrayWithHoles;\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/@babel/runtime/helpers/arrayWithHoles.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _assertThisInitialized(self) {\n  if (self === void 0) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }\n\n  return self;\n}\n\nmodule.exports = _assertThisInitialized;\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/@babel/runtime/helpers/assertThisInitialized.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nmodule.exports = _classCallCheck;\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/@babel/runtime/helpers/classCallCheck.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  return Constructor;\n}\n\nmodule.exports = _createClass;\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/@babel/runtime/helpers/createClass.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperty(obj, key, value) {\n  if (key in obj) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n  } else {\n    obj[key] = value;\n  }\n\n  return obj;\n}\n\nmodule.exports = _defineProperty;\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/@babel/runtime/helpers/defineProperty.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/extends.js":
/*!********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/extends.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _extends() {\n  module.exports = _extends = Object.assign || function (target) {\n    for (var i = 1; i < arguments.length; i++) {\n      var source = arguments[i];\n\n      for (var key in source) {\n        if (Object.prototype.hasOwnProperty.call(source, key)) {\n          target[key] = source[key];\n        }\n      }\n    }\n\n    return target;\n  };\n\n  return _extends.apply(this, arguments);\n}\n\nmodule.exports = _extends;\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/@babel/runtime/helpers/extends.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _getPrototypeOf(o) {\n  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n    return o.__proto__ || Object.getPrototypeOf(o);\n  };\n  return _getPrototypeOf(o);\n}\n\nmodule.exports = _getPrototypeOf;\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/@babel/runtime/helpers/getPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ \"./node_modules/@babel/runtime/helpers/setPrototypeOf.js\");\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function\");\n  }\n\n  subClass.prototype = Object.create(superClass && superClass.prototype, {\n    constructor: {\n      value: subClass,\n      writable: true,\n      configurable: true\n    }\n  });\n  if (superClass) setPrototypeOf(subClass, superClass);\n}\n\nmodule.exports = _inherits;\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/@babel/runtime/helpers/inherits.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _iterableToArrayLimit(arr, i) {\n  if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return;\n  var _arr = [];\n  var _n = true;\n  var _d = false;\n  var _e = undefined;\n\n  try {\n    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {\n      _arr.push(_s.value);\n\n      if (i && _arr.length === i) break;\n    }\n  } catch (err) {\n    _d = true;\n    _e = err;\n  } finally {\n    try {\n      if (!_n && _i[\"return\"] != null) _i[\"return\"]();\n    } finally {\n      if (_d) throw _e;\n    }\n  }\n\n  return _arr;\n}\n\nmodule.exports = _iterableToArrayLimit;\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _nonIterableRest() {\n  throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\");\n}\n\nmodule.exports = _nonIterableRest;\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/@babel/runtime/helpers/nonIterableRest.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _typeof = __webpack_require__(/*! ../helpers/typeof */ \"./node_modules/@babel/runtime/helpers/typeof.js\");\n\nvar assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n\nfunction _possibleConstructorReturn(self, call) {\n  if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n    return call;\n  }\n\n  return assertThisInitialized(self);\n}\n\nmodule.exports = _possibleConstructorReturn;\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _setPrototypeOf(o, p) {\n  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n    o.__proto__ = p;\n    return o;\n  };\n\n  return _setPrototypeOf(o, p);\n}\n\nmodule.exports = _setPrototypeOf;\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/@babel/runtime/helpers/setPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles */ \"./node_modules/@babel/runtime/helpers/arrayWithHoles.js\");\n\nvar iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit */ \"./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js\");\n\nvar unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray */ \"./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js\");\n\nvar nonIterableRest = __webpack_require__(/*! ./nonIterableRest */ \"./node_modules/@babel/runtime/helpers/nonIterableRest.js\");\n\nfunction _slicedToArray(arr, i) {\n  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();\n}\n\nmodule.exports = _slicedToArray;\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/@babel/runtime/helpers/slicedToArray.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _typeof(obj) {\n  \"@babel/helpers - typeof\";\n\n  if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") {\n    module.exports = _typeof = function _typeof(obj) {\n      return typeof obj;\n    };\n  } else {\n    module.exports = _typeof = function _typeof(obj) {\n      return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj;\n    };\n  }\n\n  return _typeof(obj);\n}\n\nmodule.exports = _typeof;\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/@babel/runtime/helpers/typeof.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray */ \"./node_modules/@babel/runtime/helpers/arrayLikeToArray.js\");\n\nfunction _unsupportedIterableToArray(o, minLen) {\n  if (!o) return;\n  if (typeof o === \"string\") return arrayLikeToArray(o, minLen);\n  var n = Object.prototype.toString.call(o).slice(8, -1);\n  if (n === \"Object\" && o.constructor) n = o.constructor.name;\n  if (n === \"Map\" || n === \"Set\") return Array.from(o);\n  if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);\n}\n\nmodule.exports = _unsupportedIterableToArray;\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/components/LayerRenderer.css":
/*!********************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/components/LayerRenderer.css ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".knockout-wrapper { position: absolute; width: 100%; height: 100%; }\\r\\n.layer-container { position: absolute; /*overflow: hidden;*/ }\\r\\n.layer-container-inner { width: 100%; height: 100%; box-sizing: content-box; }\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack://%5Bname%5D/./src/components/LayerRenderer.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot || '').concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/lodash/_DataView.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_DataView.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar DataView = getNative(root, 'DataView');\n\nmodule.exports = DataView;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_DataView.js?");

/***/ }),

/***/ "./node_modules/lodash/_Hash.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_Hash.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var hashClear = __webpack_require__(/*! ./_hashClear */ \"./node_modules/lodash/_hashClear.js\"),\n    hashDelete = __webpack_require__(/*! ./_hashDelete */ \"./node_modules/lodash/_hashDelete.js\"),\n    hashGet = __webpack_require__(/*! ./_hashGet */ \"./node_modules/lodash/_hashGet.js\"),\n    hashHas = __webpack_require__(/*! ./_hashHas */ \"./node_modules/lodash/_hashHas.js\"),\n    hashSet = __webpack_require__(/*! ./_hashSet */ \"./node_modules/lodash/_hashSet.js\");\n\n/**\n * Creates a hash object.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction Hash(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `Hash`.\nHash.prototype.clear = hashClear;\nHash.prototype['delete'] = hashDelete;\nHash.prototype.get = hashGet;\nHash.prototype.has = hashHas;\nHash.prototype.set = hashSet;\n\nmodule.exports = Hash;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_Hash.js?");

/***/ }),

/***/ "./node_modules/lodash/_ListCache.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_ListCache.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ \"./node_modules/lodash/_listCacheClear.js\"),\n    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ \"./node_modules/lodash/_listCacheDelete.js\"),\n    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ \"./node_modules/lodash/_listCacheGet.js\"),\n    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ \"./node_modules/lodash/_listCacheHas.js\"),\n    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ \"./node_modules/lodash/_listCacheSet.js\");\n\n/**\n * Creates an list cache object.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction ListCache(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `ListCache`.\nListCache.prototype.clear = listCacheClear;\nListCache.prototype['delete'] = listCacheDelete;\nListCache.prototype.get = listCacheGet;\nListCache.prototype.has = listCacheHas;\nListCache.prototype.set = listCacheSet;\n\nmodule.exports = ListCache;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_ListCache.js?");

/***/ }),

/***/ "./node_modules/lodash/_Map.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Map.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar Map = getNative(root, 'Map');\n\nmodule.exports = Map;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_Map.js?");

/***/ }),

/***/ "./node_modules/lodash/_MapCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_MapCache.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ \"./node_modules/lodash/_mapCacheClear.js\"),\n    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ \"./node_modules/lodash/_mapCacheDelete.js\"),\n    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ \"./node_modules/lodash/_mapCacheGet.js\"),\n    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ \"./node_modules/lodash/_mapCacheHas.js\"),\n    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ \"./node_modules/lodash/_mapCacheSet.js\");\n\n/**\n * Creates a map cache object to store key-value pairs.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction MapCache(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `MapCache`.\nMapCache.prototype.clear = mapCacheClear;\nMapCache.prototype['delete'] = mapCacheDelete;\nMapCache.prototype.get = mapCacheGet;\nMapCache.prototype.has = mapCacheHas;\nMapCache.prototype.set = mapCacheSet;\n\nmodule.exports = MapCache;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_MapCache.js?");

/***/ }),

/***/ "./node_modules/lodash/_Promise.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_Promise.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar Promise = getNative(root, 'Promise');\n\nmodule.exports = Promise;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_Promise.js?");

/***/ }),

/***/ "./node_modules/lodash/_Set.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Set.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar Set = getNative(root, 'Set');\n\nmodule.exports = Set;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_Set.js?");

/***/ }),

/***/ "./node_modules/lodash/_Stack.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_Stack.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var ListCache = __webpack_require__(/*! ./_ListCache */ \"./node_modules/lodash/_ListCache.js\"),\n    stackClear = __webpack_require__(/*! ./_stackClear */ \"./node_modules/lodash/_stackClear.js\"),\n    stackDelete = __webpack_require__(/*! ./_stackDelete */ \"./node_modules/lodash/_stackDelete.js\"),\n    stackGet = __webpack_require__(/*! ./_stackGet */ \"./node_modules/lodash/_stackGet.js\"),\n    stackHas = __webpack_require__(/*! ./_stackHas */ \"./node_modules/lodash/_stackHas.js\"),\n    stackSet = __webpack_require__(/*! ./_stackSet */ \"./node_modules/lodash/_stackSet.js\");\n\n/**\n * Creates a stack cache object to store key-value pairs.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction Stack(entries) {\n  var data = this.__data__ = new ListCache(entries);\n  this.size = data.size;\n}\n\n// Add methods to `Stack`.\nStack.prototype.clear = stackClear;\nStack.prototype['delete'] = stackDelete;\nStack.prototype.get = stackGet;\nStack.prototype.has = stackHas;\nStack.prototype.set = stackSet;\n\nmodule.exports = Stack;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_Stack.js?");

/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Built-in value references. */\nvar Symbol = root.Symbol;\n\nmodule.exports = Symbol;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_Symbol.js?");

/***/ }),

/***/ "./node_modules/lodash/_Uint8Array.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_Uint8Array.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Built-in value references. */\nvar Uint8Array = root.Uint8Array;\n\nmodule.exports = Uint8Array;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_Uint8Array.js?");

/***/ }),

/***/ "./node_modules/lodash/_WeakMap.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_WeakMap.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar WeakMap = getNative(root, 'WeakMap');\n\nmodule.exports = WeakMap;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_WeakMap.js?");

/***/ }),

/***/ "./node_modules/lodash/_apply.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_apply.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A faster alternative to `Function#apply`, this function invokes `func`\n * with the `this` binding of `thisArg` and the arguments of `args`.\n *\n * @private\n * @param {Function} func The function to invoke.\n * @param {*} thisArg The `this` binding of `func`.\n * @param {Array} args The arguments to invoke `func` with.\n * @returns {*} Returns the result of `func`.\n */\nfunction apply(func, thisArg, args) {\n  switch (args.length) {\n    case 0: return func.call(thisArg);\n    case 1: return func.call(thisArg, args[0]);\n    case 2: return func.call(thisArg, args[0], args[1]);\n    case 3: return func.call(thisArg, args[0], args[1], args[2]);\n  }\n  return func.apply(thisArg, args);\n}\n\nmodule.exports = apply;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_apply.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayEach.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayEach.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.forEach` for arrays without support for\n * iteratee shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Array} Returns `array`.\n */\nfunction arrayEach(array, iteratee) {\n  var index = -1,\n      length = array == null ? 0 : array.length;\n\n  while (++index < length) {\n    if (iteratee(array[index], index, array) === false) {\n      break;\n    }\n  }\n  return array;\n}\n\nmodule.exports = arrayEach;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_arrayEach.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayFilter.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_arrayFilter.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.filter` for arrays without support for\n * iteratee shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} predicate The function invoked per iteration.\n * @returns {Array} Returns the new filtered array.\n */\nfunction arrayFilter(array, predicate) {\n  var index = -1,\n      length = array == null ? 0 : array.length,\n      resIndex = 0,\n      result = [];\n\n  while (++index < length) {\n    var value = array[index];\n    if (predicate(value, index, array)) {\n      result[resIndex++] = value;\n    }\n  }\n  return result;\n}\n\nmodule.exports = arrayFilter;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_arrayFilter.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayLikeKeys.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayLikeKeys.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseTimes = __webpack_require__(/*! ./_baseTimes */ \"./node_modules/lodash/_baseTimes.js\"),\n    isArguments = __webpack_require__(/*! ./isArguments */ \"./node_modules/lodash/isArguments.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isBuffer = __webpack_require__(/*! ./isBuffer */ \"./node_modules/lodash/isBuffer.js\"),\n    isIndex = __webpack_require__(/*! ./_isIndex */ \"./node_modules/lodash/_isIndex.js\"),\n    isTypedArray = __webpack_require__(/*! ./isTypedArray */ \"./node_modules/lodash/isTypedArray.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Creates an array of the enumerable property names of the array-like `value`.\n *\n * @private\n * @param {*} value The value to query.\n * @param {boolean} inherited Specify returning inherited property names.\n * @returns {Array} Returns the array of property names.\n */\nfunction arrayLikeKeys(value, inherited) {\n  var isArr = isArray(value),\n      isArg = !isArr && isArguments(value),\n      isBuff = !isArr && !isArg && isBuffer(value),\n      isType = !isArr && !isArg && !isBuff && isTypedArray(value),\n      skipIndexes = isArr || isArg || isBuff || isType,\n      result = skipIndexes ? baseTimes(value.length, String) : [],\n      length = result.length;\n\n  for (var key in value) {\n    if ((inherited || hasOwnProperty.call(value, key)) &&\n        !(skipIndexes && (\n           // Safari 9 has enumerable `arguments.length` in strict mode.\n           key == 'length' ||\n           // Node.js 0.10 has enumerable non-index properties on buffers.\n           (isBuff && (key == 'offset' || key == 'parent')) ||\n           // PhantomJS 2 has enumerable non-index properties on typed arrays.\n           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||\n           // Skip index properties.\n           isIndex(key, length)\n        ))) {\n      result.push(key);\n    }\n  }\n  return result;\n}\n\nmodule.exports = arrayLikeKeys;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_arrayLikeKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayPush.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayPush.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Appends the elements of `values` to `array`.\n *\n * @private\n * @param {Array} array The array to modify.\n * @param {Array} values The values to append.\n * @returns {Array} Returns `array`.\n */\nfunction arrayPush(array, values) {\n  var index = -1,\n      length = values.length,\n      offset = array.length;\n\n  while (++index < length) {\n    array[offset + index] = values[index];\n  }\n  return array;\n}\n\nmodule.exports = arrayPush;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_arrayPush.js?");

/***/ }),

/***/ "./node_modules/lodash/_assignMergeValue.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_assignMergeValue.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ \"./node_modules/lodash/_baseAssignValue.js\"),\n    eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\");\n\n/**\n * This function is like `assignValue` except that it doesn't assign\n * `undefined` values.\n *\n * @private\n * @param {Object} object The object to modify.\n * @param {string} key The key of the property to assign.\n * @param {*} value The value to assign.\n */\nfunction assignMergeValue(object, key, value) {\n  if ((value !== undefined && !eq(object[key], value)) ||\n      (value === undefined && !(key in object))) {\n    baseAssignValue(object, key, value);\n  }\n}\n\nmodule.exports = assignMergeValue;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_assignMergeValue.js?");

/***/ }),

/***/ "./node_modules/lodash/_assignValue.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_assignValue.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ \"./node_modules/lodash/_baseAssignValue.js\"),\n    eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Assigns `value` to `key` of `object` if the existing value is not equivalent\n * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * for equality comparisons.\n *\n * @private\n * @param {Object} object The object to modify.\n * @param {string} key The key of the property to assign.\n * @param {*} value The value to assign.\n */\nfunction assignValue(object, key, value) {\n  var objValue = object[key];\n  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||\n      (value === undefined && !(key in object))) {\n    baseAssignValue(object, key, value);\n  }\n}\n\nmodule.exports = assignValue;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_assignValue.js?");

/***/ }),

/***/ "./node_modules/lodash/_assocIndexOf.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_assocIndexOf.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\");\n\n/**\n * Gets the index at which the `key` is found in `array` of key-value pairs.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {*} key The key to search for.\n * @returns {number} Returns the index of the matched value, else `-1`.\n */\nfunction assocIndexOf(array, key) {\n  var length = array.length;\n  while (length--) {\n    if (eq(array[length][0], key)) {\n      return length;\n    }\n  }\n  return -1;\n}\n\nmodule.exports = assocIndexOf;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_assocIndexOf.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseAssign.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseAssign.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var copyObject = __webpack_require__(/*! ./_copyObject */ \"./node_modules/lodash/_copyObject.js\"),\n    keys = __webpack_require__(/*! ./keys */ \"./node_modules/lodash/keys.js\");\n\n/**\n * The base implementation of `_.assign` without support for multiple sources\n * or `customizer` functions.\n *\n * @private\n * @param {Object} object The destination object.\n * @param {Object} source The source object.\n * @returns {Object} Returns `object`.\n */\nfunction baseAssign(object, source) {\n  return object && copyObject(source, keys(source), object);\n}\n\nmodule.exports = baseAssign;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_baseAssign.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseAssignIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseAssignIn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var copyObject = __webpack_require__(/*! ./_copyObject */ \"./node_modules/lodash/_copyObject.js\"),\n    keysIn = __webpack_require__(/*! ./keysIn */ \"./node_modules/lodash/keysIn.js\");\n\n/**\n * The base implementation of `_.assignIn` without support for multiple sources\n * or `customizer` functions.\n *\n * @private\n * @param {Object} object The destination object.\n * @param {Object} source The source object.\n * @returns {Object} Returns `object`.\n */\nfunction baseAssignIn(object, source) {\n  return object && copyObject(source, keysIn(source), object);\n}\n\nmodule.exports = baseAssignIn;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_baseAssignIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseAssignValue.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseAssignValue.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var defineProperty = __webpack_require__(/*! ./_defineProperty */ \"./node_modules/lodash/_defineProperty.js\");\n\n/**\n * The base implementation of `assignValue` and `assignMergeValue` without\n * value checks.\n *\n * @private\n * @param {Object} object The object to modify.\n * @param {string} key The key of the property to assign.\n * @param {*} value The value to assign.\n */\nfunction baseAssignValue(object, key, value) {\n  if (key == '__proto__' && defineProperty) {\n    defineProperty(object, key, {\n      'configurable': true,\n      'enumerable': true,\n      'value': value,\n      'writable': true\n    });\n  } else {\n    object[key] = value;\n  }\n}\n\nmodule.exports = baseAssignValue;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_baseAssignValue.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseClone.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseClone.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Stack = __webpack_require__(/*! ./_Stack */ \"./node_modules/lodash/_Stack.js\"),\n    arrayEach = __webpack_require__(/*! ./_arrayEach */ \"./node_modules/lodash/_arrayEach.js\"),\n    assignValue = __webpack_require__(/*! ./_assignValue */ \"./node_modules/lodash/_assignValue.js\"),\n    baseAssign = __webpack_require__(/*! ./_baseAssign */ \"./node_modules/lodash/_baseAssign.js\"),\n    baseAssignIn = __webpack_require__(/*! ./_baseAssignIn */ \"./node_modules/lodash/_baseAssignIn.js\"),\n    cloneBuffer = __webpack_require__(/*! ./_cloneBuffer */ \"./node_modules/lodash/_cloneBuffer.js\"),\n    copyArray = __webpack_require__(/*! ./_copyArray */ \"./node_modules/lodash/_copyArray.js\"),\n    copySymbols = __webpack_require__(/*! ./_copySymbols */ \"./node_modules/lodash/_copySymbols.js\"),\n    copySymbolsIn = __webpack_require__(/*! ./_copySymbolsIn */ \"./node_modules/lodash/_copySymbolsIn.js\"),\n    getAllKeys = __webpack_require__(/*! ./_getAllKeys */ \"./node_modules/lodash/_getAllKeys.js\"),\n    getAllKeysIn = __webpack_require__(/*! ./_getAllKeysIn */ \"./node_modules/lodash/_getAllKeysIn.js\"),\n    getTag = __webpack_require__(/*! ./_getTag */ \"./node_modules/lodash/_getTag.js\"),\n    initCloneArray = __webpack_require__(/*! ./_initCloneArray */ \"./node_modules/lodash/_initCloneArray.js\"),\n    initCloneByTag = __webpack_require__(/*! ./_initCloneByTag */ \"./node_modules/lodash/_initCloneByTag.js\"),\n    initCloneObject = __webpack_require__(/*! ./_initCloneObject */ \"./node_modules/lodash/_initCloneObject.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isBuffer = __webpack_require__(/*! ./isBuffer */ \"./node_modules/lodash/isBuffer.js\"),\n    isMap = __webpack_require__(/*! ./isMap */ \"./node_modules/lodash/isMap.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    isSet = __webpack_require__(/*! ./isSet */ \"./node_modules/lodash/isSet.js\"),\n    keys = __webpack_require__(/*! ./keys */ \"./node_modules/lodash/keys.js\"),\n    keysIn = __webpack_require__(/*! ./keysIn */ \"./node_modules/lodash/keysIn.js\");\n\n/** Used to compose bitmasks for cloning. */\nvar CLONE_DEEP_FLAG = 1,\n    CLONE_FLAT_FLAG = 2,\n    CLONE_SYMBOLS_FLAG = 4;\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]',\n    arrayTag = '[object Array]',\n    boolTag = '[object Boolean]',\n    dateTag = '[object Date]',\n    errorTag = '[object Error]',\n    funcTag = '[object Function]',\n    genTag = '[object GeneratorFunction]',\n    mapTag = '[object Map]',\n    numberTag = '[object Number]',\n    objectTag = '[object Object]',\n    regexpTag = '[object RegExp]',\n    setTag = '[object Set]',\n    stringTag = '[object String]',\n    symbolTag = '[object Symbol]',\n    weakMapTag = '[object WeakMap]';\n\nvar arrayBufferTag = '[object ArrayBuffer]',\n    dataViewTag = '[object DataView]',\n    float32Tag = '[object Float32Array]',\n    float64Tag = '[object Float64Array]',\n    int8Tag = '[object Int8Array]',\n    int16Tag = '[object Int16Array]',\n    int32Tag = '[object Int32Array]',\n    uint8Tag = '[object Uint8Array]',\n    uint8ClampedTag = '[object Uint8ClampedArray]',\n    uint16Tag = '[object Uint16Array]',\n    uint32Tag = '[object Uint32Array]';\n\n/** Used to identify `toStringTag` values supported by `_.clone`. */\nvar cloneableTags = {};\ncloneableTags[argsTag] = cloneableTags[arrayTag] =\ncloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =\ncloneableTags[boolTag] = cloneableTags[dateTag] =\ncloneableTags[float32Tag] = cloneableTags[float64Tag] =\ncloneableTags[int8Tag] = cloneableTags[int16Tag] =\ncloneableTags[int32Tag] = cloneableTags[mapTag] =\ncloneableTags[numberTag] = cloneableTags[objectTag] =\ncloneableTags[regexpTag] = cloneableTags[setTag] =\ncloneableTags[stringTag] = cloneableTags[symbolTag] =\ncloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =\ncloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;\ncloneableTags[errorTag] = cloneableTags[funcTag] =\ncloneableTags[weakMapTag] = false;\n\n/**\n * The base implementation of `_.clone` and `_.cloneDeep` which tracks\n * traversed objects.\n *\n * @private\n * @param {*} value The value to clone.\n * @param {boolean} bitmask The bitmask flags.\n *  1 - Deep clone\n *  2 - Flatten inherited properties\n *  4 - Clone symbols\n * @param {Function} [customizer] The function to customize cloning.\n * @param {string} [key] The key of `value`.\n * @param {Object} [object] The parent object of `value`.\n * @param {Object} [stack] Tracks traversed objects and their clone counterparts.\n * @returns {*} Returns the cloned value.\n */\nfunction baseClone(value, bitmask, customizer, key, object, stack) {\n  var result,\n      isDeep = bitmask & CLONE_DEEP_FLAG,\n      isFlat = bitmask & CLONE_FLAT_FLAG,\n      isFull = bitmask & CLONE_SYMBOLS_FLAG;\n\n  if (customizer) {\n    result = object ? customizer(value, key, object, stack) : customizer(value);\n  }\n  if (result !== undefined) {\n    return result;\n  }\n  if (!isObject(value)) {\n    return value;\n  }\n  var isArr = isArray(value);\n  if (isArr) {\n    result = initCloneArray(value);\n    if (!isDeep) {\n      return copyArray(value, result);\n    }\n  } else {\n    var tag = getTag(value),\n        isFunc = tag == funcTag || tag == genTag;\n\n    if (isBuffer(value)) {\n      return cloneBuffer(value, isDeep);\n    }\n    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {\n      result = (isFlat || isFunc) ? {} : initCloneObject(value);\n      if (!isDeep) {\n        return isFlat\n          ? copySymbolsIn(value, baseAssignIn(result, value))\n          : copySymbols(value, baseAssign(result, value));\n      }\n    } else {\n      if (!cloneableTags[tag]) {\n        return object ? value : {};\n      }\n      result = initCloneByTag(value, tag, isDeep);\n    }\n  }\n  // Check for circular references and return its corresponding clone.\n  stack || (stack = new Stack);\n  var stacked = stack.get(value);\n  if (stacked) {\n    return stacked;\n  }\n  stack.set(value, result);\n\n  if (isSet(value)) {\n    value.forEach(function(subValue) {\n      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));\n    });\n  } else if (isMap(value)) {\n    value.forEach(function(subValue, key) {\n      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));\n    });\n  }\n\n  var keysFunc = isFull\n    ? (isFlat ? getAllKeysIn : getAllKeys)\n    : (isFlat ? keysIn : keys);\n\n  var props = isArr ? undefined : keysFunc(value);\n  arrayEach(props || value, function(subValue, key) {\n    if (props) {\n      key = subValue;\n      subValue = value[key];\n    }\n    // Recursively populate clone (susceptible to call stack limits).\n    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));\n  });\n  return result;\n}\n\nmodule.exports = baseClone;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_baseClone.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseCreate.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseCreate.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\");\n\n/** Built-in value references. */\nvar objectCreate = Object.create;\n\n/**\n * The base implementation of `_.create` without support for assigning\n * properties to the created object.\n *\n * @private\n * @param {Object} proto The object to inherit from.\n * @returns {Object} Returns the new object.\n */\nvar baseCreate = (function() {\n  function object() {}\n  return function(proto) {\n    if (!isObject(proto)) {\n      return {};\n    }\n    if (objectCreate) {\n      return objectCreate(proto);\n    }\n    object.prototype = proto;\n    var result = new object;\n    object.prototype = undefined;\n    return result;\n  };\n}());\n\nmodule.exports = baseCreate;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_baseCreate.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseFor.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseFor.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var createBaseFor = __webpack_require__(/*! ./_createBaseFor */ \"./node_modules/lodash/_createBaseFor.js\");\n\n/**\n * The base implementation of `baseForOwn` which iterates over `object`\n * properties returned by `keysFunc` and invokes `iteratee` for each property.\n * Iteratee functions may exit iteration early by explicitly returning `false`.\n *\n * @private\n * @param {Object} object The object to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @param {Function} keysFunc The function to get the keys of `object`.\n * @returns {Object} Returns `object`.\n */\nvar baseFor = createBaseFor();\n\nmodule.exports = baseFor;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_baseFor.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGetAllKeys.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_baseGetAllKeys.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayPush = __webpack_require__(/*! ./_arrayPush */ \"./node_modules/lodash/_arrayPush.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\");\n\n/**\n * The base implementation of `getAllKeys` and `getAllKeysIn` which uses\n * `keysFunc` and `symbolsFunc` to get the enumerable property names and\n * symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {Function} keysFunc The function to get the keys of `object`.\n * @param {Function} symbolsFunc The function to get the symbols of `object`.\n * @returns {Array} Returns the array of property names and symbols.\n */\nfunction baseGetAllKeys(object, keysFunc, symbolsFunc) {\n  var result = keysFunc(object);\n  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));\n}\n\nmodule.exports = baseGetAllKeys;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_baseGetAllKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    getRawTag = __webpack_require__(/*! ./_getRawTag */ \"./node_modules/lodash/_getRawTag.js\"),\n    objectToString = __webpack_require__(/*! ./_objectToString */ \"./node_modules/lodash/_objectToString.js\");\n\n/** `Object#toString` result references. */\nvar nullTag = '[object Null]',\n    undefinedTag = '[object Undefined]';\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * The base implementation of `getTag` without fallbacks for buggy environments.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the `toStringTag`.\n */\nfunction baseGetTag(value) {\n  if (value == null) {\n    return value === undefined ? undefinedTag : nullTag;\n  }\n  return (symToStringTag && symToStringTag in Object(value))\n    ? getRawTag(value)\n    : objectToString(value);\n}\n\nmodule.exports = baseGetTag;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_baseGetTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsArguments.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]';\n\n/**\n * The base implementation of `_.isArguments`.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an `arguments` object,\n */\nfunction baseIsArguments(value) {\n  return isObjectLike(value) && baseGetTag(value) == argsTag;\n}\n\nmodule.exports = baseIsArguments;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_baseIsArguments.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsMap.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseIsMap.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getTag = __webpack_require__(/*! ./_getTag */ \"./node_modules/lodash/_getTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar mapTag = '[object Map]';\n\n/**\n * The base implementation of `_.isMap` without Node.js optimizations.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a map, else `false`.\n */\nfunction baseIsMap(value) {\n  return isObjectLike(value) && getTag(value) == mapTag;\n}\n\nmodule.exports = baseIsMap;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_baseIsMap.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsNative.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIsNative.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isFunction = __webpack_require__(/*! ./isFunction */ \"./node_modules/lodash/isFunction.js\"),\n    isMasked = __webpack_require__(/*! ./_isMasked */ \"./node_modules/lodash/_isMasked.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    toSource = __webpack_require__(/*! ./_toSource */ \"./node_modules/lodash/_toSource.js\");\n\n/**\n * Used to match `RegExp`\n * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).\n */\nvar reRegExpChar = /[\\\\^$.*+?()[\\]{}|]/g;\n\n/** Used to detect host constructors (Safari). */\nvar reIsHostCtor = /^\\[object .+?Constructor\\]$/;\n\n/** Used for built-in method references. */\nvar funcProto = Function.prototype,\n    objectProto = Object.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/** Used to detect if a method is native. */\nvar reIsNative = RegExp('^' +\n  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\\\$&')\n  .replace(/hasOwnProperty|(function).*?(?=\\\\\\()| for .+?(?=\\\\\\])/g, '$1.*?') + '$'\n);\n\n/**\n * The base implementation of `_.isNative` without bad shim checks.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a native function,\n *  else `false`.\n */\nfunction baseIsNative(value) {\n  if (!isObject(value) || isMasked(value)) {\n    return false;\n  }\n  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;\n  return pattern.test(toSource(value));\n}\n\nmodule.exports = baseIsNative;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_baseIsNative.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsSet.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseIsSet.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getTag = __webpack_require__(/*! ./_getTag */ \"./node_modules/lodash/_getTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar setTag = '[object Set]';\n\n/**\n * The base implementation of `_.isSet` without Node.js optimizations.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a set, else `false`.\n */\nfunction baseIsSet(value) {\n  return isObjectLike(value) && getTag(value) == setTag;\n}\n\nmodule.exports = baseIsSet;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_baseIsSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsTypedArray.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIsTypedArray.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isLength = __webpack_require__(/*! ./isLength */ \"./node_modules/lodash/isLength.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]',\n    arrayTag = '[object Array]',\n    boolTag = '[object Boolean]',\n    dateTag = '[object Date]',\n    errorTag = '[object Error]',\n    funcTag = '[object Function]',\n    mapTag = '[object Map]',\n    numberTag = '[object Number]',\n    objectTag = '[object Object]',\n    regexpTag = '[object RegExp]',\n    setTag = '[object Set]',\n    stringTag = '[object String]',\n    weakMapTag = '[object WeakMap]';\n\nvar arrayBufferTag = '[object ArrayBuffer]',\n    dataViewTag = '[object DataView]',\n    float32Tag = '[object Float32Array]',\n    float64Tag = '[object Float64Array]',\n    int8Tag = '[object Int8Array]',\n    int16Tag = '[object Int16Array]',\n    int32Tag = '[object Int32Array]',\n    uint8Tag = '[object Uint8Array]',\n    uint8ClampedTag = '[object Uint8ClampedArray]',\n    uint16Tag = '[object Uint16Array]',\n    uint32Tag = '[object Uint32Array]';\n\n/** Used to identify `toStringTag` values of typed arrays. */\nvar typedArrayTags = {};\ntypedArrayTags[float32Tag] = typedArrayTags[float64Tag] =\ntypedArrayTags[int8Tag] = typedArrayTags[int16Tag] =\ntypedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =\ntypedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =\ntypedArrayTags[uint32Tag] = true;\ntypedArrayTags[argsTag] = typedArrayTags[arrayTag] =\ntypedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =\ntypedArrayTags[dataViewTag] = typedArrayTags[dateTag] =\ntypedArrayTags[errorTag] = typedArrayTags[funcTag] =\ntypedArrayTags[mapTag] = typedArrayTags[numberTag] =\ntypedArrayTags[objectTag] = typedArrayTags[regexpTag] =\ntypedArrayTags[setTag] = typedArrayTags[stringTag] =\ntypedArrayTags[weakMapTag] = false;\n\n/**\n * The base implementation of `_.isTypedArray` without Node.js optimizations.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.\n */\nfunction baseIsTypedArray(value) {\n  return isObjectLike(value) &&\n    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];\n}\n\nmodule.exports = baseIsTypedArray;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_baseIsTypedArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseKeys.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseKeys.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isPrototype = __webpack_require__(/*! ./_isPrototype */ \"./node_modules/lodash/_isPrototype.js\"),\n    nativeKeys = __webpack_require__(/*! ./_nativeKeys */ \"./node_modules/lodash/_nativeKeys.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n */\nfunction baseKeys(object) {\n  if (!isPrototype(object)) {\n    return nativeKeys(object);\n  }\n  var result = [];\n  for (var key in Object(object)) {\n    if (hasOwnProperty.call(object, key) && key != 'constructor') {\n      result.push(key);\n    }\n  }\n  return result;\n}\n\nmodule.exports = baseKeys;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_baseKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseKeysIn.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseKeysIn.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    isPrototype = __webpack_require__(/*! ./_isPrototype */ \"./node_modules/lodash/_isPrototype.js\"),\n    nativeKeysIn = __webpack_require__(/*! ./_nativeKeysIn */ \"./node_modules/lodash/_nativeKeysIn.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n */\nfunction baseKeysIn(object) {\n  if (!isObject(object)) {\n    return nativeKeysIn(object);\n  }\n  var isProto = isPrototype(object),\n      result = [];\n\n  for (var key in object) {\n    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {\n      result.push(key);\n    }\n  }\n  return result;\n}\n\nmodule.exports = baseKeysIn;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_baseKeysIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseMerge.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseMerge.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Stack = __webpack_require__(/*! ./_Stack */ \"./node_modules/lodash/_Stack.js\"),\n    assignMergeValue = __webpack_require__(/*! ./_assignMergeValue */ \"./node_modules/lodash/_assignMergeValue.js\"),\n    baseFor = __webpack_require__(/*! ./_baseFor */ \"./node_modules/lodash/_baseFor.js\"),\n    baseMergeDeep = __webpack_require__(/*! ./_baseMergeDeep */ \"./node_modules/lodash/_baseMergeDeep.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    keysIn = __webpack_require__(/*! ./keysIn */ \"./node_modules/lodash/keysIn.js\"),\n    safeGet = __webpack_require__(/*! ./_safeGet */ \"./node_modules/lodash/_safeGet.js\");\n\n/**\n * The base implementation of `_.merge` without support for multiple sources.\n *\n * @private\n * @param {Object} object The destination object.\n * @param {Object} source The source object.\n * @param {number} srcIndex The index of `source`.\n * @param {Function} [customizer] The function to customize merged values.\n * @param {Object} [stack] Tracks traversed source values and their merged\n *  counterparts.\n */\nfunction baseMerge(object, source, srcIndex, customizer, stack) {\n  if (object === source) {\n    return;\n  }\n  baseFor(source, function(srcValue, key) {\n    stack || (stack = new Stack);\n    if (isObject(srcValue)) {\n      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);\n    }\n    else {\n      var newValue = customizer\n        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)\n        : undefined;\n\n      if (newValue === undefined) {\n        newValue = srcValue;\n      }\n      assignMergeValue(object, key, newValue);\n    }\n  }, keysIn);\n}\n\nmodule.exports = baseMerge;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_baseMerge.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseMergeDeep.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_baseMergeDeep.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assignMergeValue = __webpack_require__(/*! ./_assignMergeValue */ \"./node_modules/lodash/_assignMergeValue.js\"),\n    cloneBuffer = __webpack_require__(/*! ./_cloneBuffer */ \"./node_modules/lodash/_cloneBuffer.js\"),\n    cloneTypedArray = __webpack_require__(/*! ./_cloneTypedArray */ \"./node_modules/lodash/_cloneTypedArray.js\"),\n    copyArray = __webpack_require__(/*! ./_copyArray */ \"./node_modules/lodash/_copyArray.js\"),\n    initCloneObject = __webpack_require__(/*! ./_initCloneObject */ \"./node_modules/lodash/_initCloneObject.js\"),\n    isArguments = __webpack_require__(/*! ./isArguments */ \"./node_modules/lodash/isArguments.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isArrayLikeObject = __webpack_require__(/*! ./isArrayLikeObject */ \"./node_modules/lodash/isArrayLikeObject.js\"),\n    isBuffer = __webpack_require__(/*! ./isBuffer */ \"./node_modules/lodash/isBuffer.js\"),\n    isFunction = __webpack_require__(/*! ./isFunction */ \"./node_modules/lodash/isFunction.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    isPlainObject = __webpack_require__(/*! ./isPlainObject */ \"./node_modules/lodash/isPlainObject.js\"),\n    isTypedArray = __webpack_require__(/*! ./isTypedArray */ \"./node_modules/lodash/isTypedArray.js\"),\n    safeGet = __webpack_require__(/*! ./_safeGet */ \"./node_modules/lodash/_safeGet.js\"),\n    toPlainObject = __webpack_require__(/*! ./toPlainObject */ \"./node_modules/lodash/toPlainObject.js\");\n\n/**\n * A specialized version of `baseMerge` for arrays and objects which performs\n * deep merges and tracks traversed objects enabling objects with circular\n * references to be merged.\n *\n * @private\n * @param {Object} object The destination object.\n * @param {Object} source The source object.\n * @param {string} key The key of the value to merge.\n * @param {number} srcIndex The index of `source`.\n * @param {Function} mergeFunc The function to merge values.\n * @param {Function} [customizer] The function to customize assigned values.\n * @param {Object} [stack] Tracks traversed source values and their merged\n *  counterparts.\n */\nfunction baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {\n  var objValue = safeGet(object, key),\n      srcValue = safeGet(source, key),\n      stacked = stack.get(srcValue);\n\n  if (stacked) {\n    assignMergeValue(object, key, stacked);\n    return;\n  }\n  var newValue = customizer\n    ? customizer(objValue, srcValue, (key + ''), object, source, stack)\n    : undefined;\n\n  var isCommon = newValue === undefined;\n\n  if (isCommon) {\n    var isArr = isArray(srcValue),\n        isBuff = !isArr && isBuffer(srcValue),\n        isTyped = !isArr && !isBuff && isTypedArray(srcValue);\n\n    newValue = srcValue;\n    if (isArr || isBuff || isTyped) {\n      if (isArray(objValue)) {\n        newValue = objValue;\n      }\n      else if (isArrayLikeObject(objValue)) {\n        newValue = copyArray(objValue);\n      }\n      else if (isBuff) {\n        isCommon = false;\n        newValue = cloneBuffer(srcValue, true);\n      }\n      else if (isTyped) {\n        isCommon = false;\n        newValue = cloneTypedArray(srcValue, true);\n      }\n      else {\n        newValue = [];\n      }\n    }\n    else if (isPlainObject(srcValue) || isArguments(srcValue)) {\n      newValue = objValue;\n      if (isArguments(objValue)) {\n        newValue = toPlainObject(objValue);\n      }\n      else if (!isObject(objValue) || isFunction(objValue)) {\n        newValue = initCloneObject(srcValue);\n      }\n    }\n    else {\n      isCommon = false;\n    }\n  }\n  if (isCommon) {\n    // Recursively merge objects and arrays (susceptible to call stack limits).\n    stack.set(srcValue, newValue);\n    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);\n    stack['delete'](srcValue);\n  }\n  assignMergeValue(object, key, newValue);\n}\n\nmodule.exports = baseMergeDeep;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_baseMergeDeep.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseRest.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var identity = __webpack_require__(/*! ./identity */ \"./node_modules/lodash/identity.js\"),\n    overRest = __webpack_require__(/*! ./_overRest */ \"./node_modules/lodash/_overRest.js\"),\n    setToString = __webpack_require__(/*! ./_setToString */ \"./node_modules/lodash/_setToString.js\");\n\n/**\n * The base implementation of `_.rest` which doesn't validate or coerce arguments.\n *\n * @private\n * @param {Function} func The function to apply a rest parameter to.\n * @param {number} [start=func.length-1] The start position of the rest parameter.\n * @returns {Function} Returns the new function.\n */\nfunction baseRest(func, start) {\n  return setToString(overRest(func, start, identity), func + '');\n}\n\nmodule.exports = baseRest;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_baseRest.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseSetToString.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseSetToString.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var constant = __webpack_require__(/*! ./constant */ \"./node_modules/lodash/constant.js\"),\n    defineProperty = __webpack_require__(/*! ./_defineProperty */ \"./node_modules/lodash/_defineProperty.js\"),\n    identity = __webpack_require__(/*! ./identity */ \"./node_modules/lodash/identity.js\");\n\n/**\n * The base implementation of `setToString` without support for hot loop shorting.\n *\n * @private\n * @param {Function} func The function to modify.\n * @param {Function} string The `toString` result.\n * @returns {Function} Returns `func`.\n */\nvar baseSetToString = !defineProperty ? identity : function(func, string) {\n  return defineProperty(func, 'toString', {\n    'configurable': true,\n    'enumerable': false,\n    'value': constant(string),\n    'writable': true\n  });\n};\n\nmodule.exports = baseSetToString;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_baseSetToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseTimes.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseTimes.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.times` without support for iteratee shorthands\n * or max array length checks.\n *\n * @private\n * @param {number} n The number of times to invoke `iteratee`.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Array} Returns the array of results.\n */\nfunction baseTimes(n, iteratee) {\n  var index = -1,\n      result = Array(n);\n\n  while (++index < n) {\n    result[index] = iteratee(index);\n  }\n  return result;\n}\n\nmodule.exports = baseTimes;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_baseTimes.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseUnary.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.unary` without support for storing metadata.\n *\n * @private\n * @param {Function} func The function to cap arguments for.\n * @returns {Function} Returns the new capped function.\n */\nfunction baseUnary(func) {\n  return function(value) {\n    return func(value);\n  };\n}\n\nmodule.exports = baseUnary;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_baseUnary.js?");

/***/ }),

/***/ "./node_modules/lodash/_cloneArrayBuffer.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_cloneArrayBuffer.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Uint8Array = __webpack_require__(/*! ./_Uint8Array */ \"./node_modules/lodash/_Uint8Array.js\");\n\n/**\n * Creates a clone of `arrayBuffer`.\n *\n * @private\n * @param {ArrayBuffer} arrayBuffer The array buffer to clone.\n * @returns {ArrayBuffer} Returns the cloned array buffer.\n */\nfunction cloneArrayBuffer(arrayBuffer) {\n  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);\n  new Uint8Array(result).set(new Uint8Array(arrayBuffer));\n  return result;\n}\n\nmodule.exports = cloneArrayBuffer;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_cloneArrayBuffer.js?");

/***/ }),

/***/ "./node_modules/lodash/_cloneBuffer.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneBuffer.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Detect free variable `exports`. */\nvar freeExports =  true && exports && !exports.nodeType && exports;\n\n/** Detect free variable `module`. */\nvar freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;\n\n/** Detect the popular CommonJS extension `module.exports`. */\nvar moduleExports = freeModule && freeModule.exports === freeExports;\n\n/** Built-in value references. */\nvar Buffer = moduleExports ? root.Buffer : undefined,\n    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;\n\n/**\n * Creates a clone of  `buffer`.\n *\n * @private\n * @param {Buffer} buffer The buffer to clone.\n * @param {boolean} [isDeep] Specify a deep clone.\n * @returns {Buffer} Returns the cloned buffer.\n */\nfunction cloneBuffer(buffer, isDeep) {\n  if (isDeep) {\n    return buffer.slice();\n  }\n  var length = buffer.length,\n      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);\n\n  buffer.copy(result);\n  return result;\n}\n\nmodule.exports = cloneBuffer;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_cloneBuffer.js?");

/***/ }),

/***/ "./node_modules/lodash/_cloneDataView.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_cloneDataView.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ \"./node_modules/lodash/_cloneArrayBuffer.js\");\n\n/**\n * Creates a clone of `dataView`.\n *\n * @private\n * @param {Object} dataView The data view to clone.\n * @param {boolean} [isDeep] Specify a deep clone.\n * @returns {Object} Returns the cloned data view.\n */\nfunction cloneDataView(dataView, isDeep) {\n  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;\n  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);\n}\n\nmodule.exports = cloneDataView;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_cloneDataView.js?");

/***/ }),

/***/ "./node_modules/lodash/_cloneRegExp.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneRegExp.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used to match `RegExp` flags from their coerced string values. */\nvar reFlags = /\\w*$/;\n\n/**\n * Creates a clone of `regexp`.\n *\n * @private\n * @param {Object} regexp The regexp to clone.\n * @returns {Object} Returns the cloned regexp.\n */\nfunction cloneRegExp(regexp) {\n  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));\n  result.lastIndex = regexp.lastIndex;\n  return result;\n}\n\nmodule.exports = cloneRegExp;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_cloneRegExp.js?");

/***/ }),

/***/ "./node_modules/lodash/_cloneSymbol.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneSymbol.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\");\n\n/** Used to convert symbols to primitives and strings. */\nvar symbolProto = Symbol ? Symbol.prototype : undefined,\n    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;\n\n/**\n * Creates a clone of the `symbol` object.\n *\n * @private\n * @param {Object} symbol The symbol object to clone.\n * @returns {Object} Returns the cloned symbol object.\n */\nfunction cloneSymbol(symbol) {\n  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};\n}\n\nmodule.exports = cloneSymbol;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_cloneSymbol.js?");

/***/ }),

/***/ "./node_modules/lodash/_cloneTypedArray.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_cloneTypedArray.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ \"./node_modules/lodash/_cloneArrayBuffer.js\");\n\n/**\n * Creates a clone of `typedArray`.\n *\n * @private\n * @param {Object} typedArray The typed array to clone.\n * @param {boolean} [isDeep] Specify a deep clone.\n * @returns {Object} Returns the cloned typed array.\n */\nfunction cloneTypedArray(typedArray, isDeep) {\n  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;\n  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);\n}\n\nmodule.exports = cloneTypedArray;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_cloneTypedArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_copyArray.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_copyArray.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Copies the values of `source` to `array`.\n *\n * @private\n * @param {Array} source The array to copy values from.\n * @param {Array} [array=[]] The array to copy values to.\n * @returns {Array} Returns `array`.\n */\nfunction copyArray(source, array) {\n  var index = -1,\n      length = source.length;\n\n  array || (array = Array(length));\n  while (++index < length) {\n    array[index] = source[index];\n  }\n  return array;\n}\n\nmodule.exports = copyArray;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_copyArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_copyObject.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_copyObject.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assignValue = __webpack_require__(/*! ./_assignValue */ \"./node_modules/lodash/_assignValue.js\"),\n    baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ \"./node_modules/lodash/_baseAssignValue.js\");\n\n/**\n * Copies properties of `source` to `object`.\n *\n * @private\n * @param {Object} source The object to copy properties from.\n * @param {Array} props The property identifiers to copy.\n * @param {Object} [object={}] The object to copy properties to.\n * @param {Function} [customizer] The function to customize copied values.\n * @returns {Object} Returns `object`.\n */\nfunction copyObject(source, props, object, customizer) {\n  var isNew = !object;\n  object || (object = {});\n\n  var index = -1,\n      length = props.length;\n\n  while (++index < length) {\n    var key = props[index];\n\n    var newValue = customizer\n      ? customizer(object[key], source[key], key, object, source)\n      : undefined;\n\n    if (newValue === undefined) {\n      newValue = source[key];\n    }\n    if (isNew) {\n      baseAssignValue(object, key, newValue);\n    } else {\n      assignValue(object, key, newValue);\n    }\n  }\n  return object;\n}\n\nmodule.exports = copyObject;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_copyObject.js?");

/***/ }),

/***/ "./node_modules/lodash/_copySymbols.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_copySymbols.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var copyObject = __webpack_require__(/*! ./_copyObject */ \"./node_modules/lodash/_copyObject.js\"),\n    getSymbols = __webpack_require__(/*! ./_getSymbols */ \"./node_modules/lodash/_getSymbols.js\");\n\n/**\n * Copies own symbols of `source` to `object`.\n *\n * @private\n * @param {Object} source The object to copy symbols from.\n * @param {Object} [object={}] The object to copy symbols to.\n * @returns {Object} Returns `object`.\n */\nfunction copySymbols(source, object) {\n  return copyObject(source, getSymbols(source), object);\n}\n\nmodule.exports = copySymbols;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_copySymbols.js?");

/***/ }),

/***/ "./node_modules/lodash/_copySymbolsIn.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_copySymbolsIn.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var copyObject = __webpack_require__(/*! ./_copyObject */ \"./node_modules/lodash/_copyObject.js\"),\n    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ \"./node_modules/lodash/_getSymbolsIn.js\");\n\n/**\n * Copies own and inherited symbols of `source` to `object`.\n *\n * @private\n * @param {Object} source The object to copy symbols from.\n * @param {Object} [object={}] The object to copy symbols to.\n * @returns {Object} Returns `object`.\n */\nfunction copySymbolsIn(source, object) {\n  return copyObject(source, getSymbolsIn(source), object);\n}\n\nmodule.exports = copySymbolsIn;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_copySymbolsIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_coreJsData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_coreJsData.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Used to detect overreaching core-js shims. */\nvar coreJsData = root['__core-js_shared__'];\n\nmodule.exports = coreJsData;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_coreJsData.js?");

/***/ }),

/***/ "./node_modules/lodash/_createAssigner.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_createAssigner.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseRest = __webpack_require__(/*! ./_baseRest */ \"./node_modules/lodash/_baseRest.js\"),\n    isIterateeCall = __webpack_require__(/*! ./_isIterateeCall */ \"./node_modules/lodash/_isIterateeCall.js\");\n\n/**\n * Creates a function like `_.assign`.\n *\n * @private\n * @param {Function} assigner The function to assign values.\n * @returns {Function} Returns the new assigner function.\n */\nfunction createAssigner(assigner) {\n  return baseRest(function(object, sources) {\n    var index = -1,\n        length = sources.length,\n        customizer = length > 1 ? sources[length - 1] : undefined,\n        guard = length > 2 ? sources[2] : undefined;\n\n    customizer = (assigner.length > 3 && typeof customizer == 'function')\n      ? (length--, customizer)\n      : undefined;\n\n    if (guard && isIterateeCall(sources[0], sources[1], guard)) {\n      customizer = length < 3 ? undefined : customizer;\n      length = 1;\n    }\n    object = Object(object);\n    while (++index < length) {\n      var source = sources[index];\n      if (source) {\n        assigner(object, source, index, customizer);\n      }\n    }\n    return object;\n  });\n}\n\nmodule.exports = createAssigner;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_createAssigner.js?");

/***/ }),

/***/ "./node_modules/lodash/_createBaseFor.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_createBaseFor.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Creates a base function for methods like `_.forIn` and `_.forOwn`.\n *\n * @private\n * @param {boolean} [fromRight] Specify iterating from right to left.\n * @returns {Function} Returns the new base function.\n */\nfunction createBaseFor(fromRight) {\n  return function(object, iteratee, keysFunc) {\n    var index = -1,\n        iterable = Object(object),\n        props = keysFunc(object),\n        length = props.length;\n\n    while (length--) {\n      var key = props[fromRight ? length : ++index];\n      if (iteratee(iterable[key], key, iterable) === false) {\n        break;\n      }\n    }\n    return object;\n  };\n}\n\nmodule.exports = createBaseFor;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_createBaseFor.js?");

/***/ }),

/***/ "./node_modules/lodash/_defineProperty.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_defineProperty.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\");\n\nvar defineProperty = (function() {\n  try {\n    var func = getNative(Object, 'defineProperty');\n    func({}, '', {});\n    return func;\n  } catch (e) {}\n}());\n\nmodule.exports = defineProperty;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_defineProperty.js?");

/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */\nvar freeGlobal = typeof global == 'object' && global && global.Object === Object && global;\n\nmodule.exports = freeGlobal;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_freeGlobal.js?");

/***/ }),

/***/ "./node_modules/lodash/_getAllKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getAllKeys.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ \"./node_modules/lodash/_baseGetAllKeys.js\"),\n    getSymbols = __webpack_require__(/*! ./_getSymbols */ \"./node_modules/lodash/_getSymbols.js\"),\n    keys = __webpack_require__(/*! ./keys */ \"./node_modules/lodash/keys.js\");\n\n/**\n * Creates an array of own enumerable property names and symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names and symbols.\n */\nfunction getAllKeys(object) {\n  return baseGetAllKeys(object, keys, getSymbols);\n}\n\nmodule.exports = getAllKeys;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_getAllKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_getAllKeysIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getAllKeysIn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ \"./node_modules/lodash/_baseGetAllKeys.js\"),\n    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ \"./node_modules/lodash/_getSymbolsIn.js\"),\n    keysIn = __webpack_require__(/*! ./keysIn */ \"./node_modules/lodash/keysIn.js\");\n\n/**\n * Creates an array of own and inherited enumerable property names and\n * symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names and symbols.\n */\nfunction getAllKeysIn(object) {\n  return baseGetAllKeys(object, keysIn, getSymbolsIn);\n}\n\nmodule.exports = getAllKeysIn;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_getAllKeysIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_getMapData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getMapData.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isKeyable = __webpack_require__(/*! ./_isKeyable */ \"./node_modules/lodash/_isKeyable.js\");\n\n/**\n * Gets the data for `map`.\n *\n * @private\n * @param {Object} map The map to query.\n * @param {string} key The reference key.\n * @returns {*} Returns the map data.\n */\nfunction getMapData(map, key) {\n  var data = map.__data__;\n  return isKeyable(key)\n    ? data[typeof key == 'string' ? 'string' : 'hash']\n    : data.map;\n}\n\nmodule.exports = getMapData;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_getMapData.js?");

/***/ }),

/***/ "./node_modules/lodash/_getNative.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getNative.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ \"./node_modules/lodash/_baseIsNative.js\"),\n    getValue = __webpack_require__(/*! ./_getValue */ \"./node_modules/lodash/_getValue.js\");\n\n/**\n * Gets the native function at `key` of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {string} key The key of the method to get.\n * @returns {*} Returns the function if it's native, else `undefined`.\n */\nfunction getNative(object, key) {\n  var value = getValue(object, key);\n  return baseIsNative(value) ? value : undefined;\n}\n\nmodule.exports = getNative;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_getNative.js?");

/***/ }),

/***/ "./node_modules/lodash/_getPrototype.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getPrototype.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var overArg = __webpack_require__(/*! ./_overArg */ \"./node_modules/lodash/_overArg.js\");\n\n/** Built-in value references. */\nvar getPrototype = overArg(Object.getPrototypeOf, Object);\n\nmodule.exports = getPrototype;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_getPrototype.js?");

/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the raw `toStringTag`.\n */\nfunction getRawTag(value) {\n  var isOwn = hasOwnProperty.call(value, symToStringTag),\n      tag = value[symToStringTag];\n\n  try {\n    value[symToStringTag] = undefined;\n    var unmasked = true;\n  } catch (e) {}\n\n  var result = nativeObjectToString.call(value);\n  if (unmasked) {\n    if (isOwn) {\n      value[symToStringTag] = tag;\n    } else {\n      delete value[symToStringTag];\n    }\n  }\n  return result;\n}\n\nmodule.exports = getRawTag;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_getRawTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_getSymbols.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getSymbols.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayFilter = __webpack_require__(/*! ./_arrayFilter */ \"./node_modules/lodash/_arrayFilter.js\"),\n    stubArray = __webpack_require__(/*! ./stubArray */ \"./node_modules/lodash/stubArray.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Built-in value references. */\nvar propertyIsEnumerable = objectProto.propertyIsEnumerable;\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeGetSymbols = Object.getOwnPropertySymbols;\n\n/**\n * Creates an array of the own enumerable symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of symbols.\n */\nvar getSymbols = !nativeGetSymbols ? stubArray : function(object) {\n  if (object == null) {\n    return [];\n  }\n  object = Object(object);\n  return arrayFilter(nativeGetSymbols(object), function(symbol) {\n    return propertyIsEnumerable.call(object, symbol);\n  });\n};\n\nmodule.exports = getSymbols;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_getSymbols.js?");

/***/ }),

/***/ "./node_modules/lodash/_getSymbolsIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getSymbolsIn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayPush = __webpack_require__(/*! ./_arrayPush */ \"./node_modules/lodash/_arrayPush.js\"),\n    getPrototype = __webpack_require__(/*! ./_getPrototype */ \"./node_modules/lodash/_getPrototype.js\"),\n    getSymbols = __webpack_require__(/*! ./_getSymbols */ \"./node_modules/lodash/_getSymbols.js\"),\n    stubArray = __webpack_require__(/*! ./stubArray */ \"./node_modules/lodash/stubArray.js\");\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeGetSymbols = Object.getOwnPropertySymbols;\n\n/**\n * Creates an array of the own and inherited enumerable symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of symbols.\n */\nvar getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {\n  var result = [];\n  while (object) {\n    arrayPush(result, getSymbols(object));\n    object = getPrototype(object);\n  }\n  return result;\n};\n\nmodule.exports = getSymbolsIn;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_getSymbolsIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_getTag.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_getTag.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var DataView = __webpack_require__(/*! ./_DataView */ \"./node_modules/lodash/_DataView.js\"),\n    Map = __webpack_require__(/*! ./_Map */ \"./node_modules/lodash/_Map.js\"),\n    Promise = __webpack_require__(/*! ./_Promise */ \"./node_modules/lodash/_Promise.js\"),\n    Set = __webpack_require__(/*! ./_Set */ \"./node_modules/lodash/_Set.js\"),\n    WeakMap = __webpack_require__(/*! ./_WeakMap */ \"./node_modules/lodash/_WeakMap.js\"),\n    baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    toSource = __webpack_require__(/*! ./_toSource */ \"./node_modules/lodash/_toSource.js\");\n\n/** `Object#toString` result references. */\nvar mapTag = '[object Map]',\n    objectTag = '[object Object]',\n    promiseTag = '[object Promise]',\n    setTag = '[object Set]',\n    weakMapTag = '[object WeakMap]';\n\nvar dataViewTag = '[object DataView]';\n\n/** Used to detect maps, sets, and weakmaps. */\nvar dataViewCtorString = toSource(DataView),\n    mapCtorString = toSource(Map),\n    promiseCtorString = toSource(Promise),\n    setCtorString = toSource(Set),\n    weakMapCtorString = toSource(WeakMap);\n\n/**\n * Gets the `toStringTag` of `value`.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the `toStringTag`.\n */\nvar getTag = baseGetTag;\n\n// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.\nif ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||\n    (Map && getTag(new Map) != mapTag) ||\n    (Promise && getTag(Promise.resolve()) != promiseTag) ||\n    (Set && getTag(new Set) != setTag) ||\n    (WeakMap && getTag(new WeakMap) != weakMapTag)) {\n  getTag = function(value) {\n    var result = baseGetTag(value),\n        Ctor = result == objectTag ? value.constructor : undefined,\n        ctorString = Ctor ? toSource(Ctor) : '';\n\n    if (ctorString) {\n      switch (ctorString) {\n        case dataViewCtorString: return dataViewTag;\n        case mapCtorString: return mapTag;\n        case promiseCtorString: return promiseTag;\n        case setCtorString: return setTag;\n        case weakMapCtorString: return weakMapTag;\n      }\n    }\n    return result;\n  };\n}\n\nmodule.exports = getTag;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_getTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_getValue.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_getValue.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Gets the value at `key` of `object`.\n *\n * @private\n * @param {Object} [object] The object to query.\n * @param {string} key The key of the property to get.\n * @returns {*} Returns the property value.\n */\nfunction getValue(object, key) {\n  return object == null ? undefined : object[key];\n}\n\nmodule.exports = getValue;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_getValue.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashClear.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_hashClear.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/**\n * Removes all key-value entries from the hash.\n *\n * @private\n * @name clear\n * @memberOf Hash\n */\nfunction hashClear() {\n  this.__data__ = nativeCreate ? nativeCreate(null) : {};\n  this.size = 0;\n}\n\nmodule.exports = hashClear;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_hashClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashDelete.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_hashDelete.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Removes `key` and its value from the hash.\n *\n * @private\n * @name delete\n * @memberOf Hash\n * @param {Object} hash The hash to modify.\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction hashDelete(key) {\n  var result = this.has(key) && delete this.__data__[key];\n  this.size -= result ? 1 : 0;\n  return result;\n}\n\nmodule.exports = hashDelete;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_hashDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Gets the hash value for `key`.\n *\n * @private\n * @name get\n * @memberOf Hash\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction hashGet(key) {\n  var data = this.__data__;\n  if (nativeCreate) {\n    var result = data[key];\n    return result === HASH_UNDEFINED ? undefined : result;\n  }\n  return hasOwnProperty.call(data, key) ? data[key] : undefined;\n}\n\nmodule.exports = hashGet;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_hashGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashHas.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashHas.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Checks if a hash value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf Hash\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction hashHas(key) {\n  var data = this.__data__;\n  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);\n}\n\nmodule.exports = hashHas;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_hashHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashSet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashSet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/**\n * Sets the hash `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf Hash\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the hash instance.\n */\nfunction hashSet(key, value) {\n  var data = this.__data__;\n  this.size += this.has(key) ? 0 : 1;\n  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;\n  return this;\n}\n\nmodule.exports = hashSet;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_hashSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_initCloneArray.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_initCloneArray.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Initializes an array clone.\n *\n * @private\n * @param {Array} array The array to clone.\n * @returns {Array} Returns the initialized clone.\n */\nfunction initCloneArray(array) {\n  var length = array.length,\n      result = new array.constructor(length);\n\n  // Add properties assigned by `RegExp#exec`.\n  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {\n    result.index = array.index;\n    result.input = array.input;\n  }\n  return result;\n}\n\nmodule.exports = initCloneArray;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_initCloneArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_initCloneByTag.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_initCloneByTag.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ \"./node_modules/lodash/_cloneArrayBuffer.js\"),\n    cloneDataView = __webpack_require__(/*! ./_cloneDataView */ \"./node_modules/lodash/_cloneDataView.js\"),\n    cloneRegExp = __webpack_require__(/*! ./_cloneRegExp */ \"./node_modules/lodash/_cloneRegExp.js\"),\n    cloneSymbol = __webpack_require__(/*! ./_cloneSymbol */ \"./node_modules/lodash/_cloneSymbol.js\"),\n    cloneTypedArray = __webpack_require__(/*! ./_cloneTypedArray */ \"./node_modules/lodash/_cloneTypedArray.js\");\n\n/** `Object#toString` result references. */\nvar boolTag = '[object Boolean]',\n    dateTag = '[object Date]',\n    mapTag = '[object Map]',\n    numberTag = '[object Number]',\n    regexpTag = '[object RegExp]',\n    setTag = '[object Set]',\n    stringTag = '[object String]',\n    symbolTag = '[object Symbol]';\n\nvar arrayBufferTag = '[object ArrayBuffer]',\n    dataViewTag = '[object DataView]',\n    float32Tag = '[object Float32Array]',\n    float64Tag = '[object Float64Array]',\n    int8Tag = '[object Int8Array]',\n    int16Tag = '[object Int16Array]',\n    int32Tag = '[object Int32Array]',\n    uint8Tag = '[object Uint8Array]',\n    uint8ClampedTag = '[object Uint8ClampedArray]',\n    uint16Tag = '[object Uint16Array]',\n    uint32Tag = '[object Uint32Array]';\n\n/**\n * Initializes an object clone based on its `toStringTag`.\n *\n * **Note:** This function only supports cloning values with tags of\n * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.\n *\n * @private\n * @param {Object} object The object to clone.\n * @param {string} tag The `toStringTag` of the object to clone.\n * @param {boolean} [isDeep] Specify a deep clone.\n * @returns {Object} Returns the initialized clone.\n */\nfunction initCloneByTag(object, tag, isDeep) {\n  var Ctor = object.constructor;\n  switch (tag) {\n    case arrayBufferTag:\n      return cloneArrayBuffer(object);\n\n    case boolTag:\n    case dateTag:\n      return new Ctor(+object);\n\n    case dataViewTag:\n      return cloneDataView(object, isDeep);\n\n    case float32Tag: case float64Tag:\n    case int8Tag: case int16Tag: case int32Tag:\n    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:\n      return cloneTypedArray(object, isDeep);\n\n    case mapTag:\n      return new Ctor;\n\n    case numberTag:\n    case stringTag:\n      return new Ctor(object);\n\n    case regexpTag:\n      return cloneRegExp(object);\n\n    case setTag:\n      return new Ctor;\n\n    case symbolTag:\n      return cloneSymbol(object);\n  }\n}\n\nmodule.exports = initCloneByTag;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_initCloneByTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_initCloneObject.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_initCloneObject.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseCreate = __webpack_require__(/*! ./_baseCreate */ \"./node_modules/lodash/_baseCreate.js\"),\n    getPrototype = __webpack_require__(/*! ./_getPrototype */ \"./node_modules/lodash/_getPrototype.js\"),\n    isPrototype = __webpack_require__(/*! ./_isPrototype */ \"./node_modules/lodash/_isPrototype.js\");\n\n/**\n * Initializes an object clone.\n *\n * @private\n * @param {Object} object The object to clone.\n * @returns {Object} Returns the initialized clone.\n */\nfunction initCloneObject(object) {\n  return (typeof object.constructor == 'function' && !isPrototype(object))\n    ? baseCreate(getPrototype(object))\n    : {};\n}\n\nmodule.exports = initCloneObject;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_initCloneObject.js?");

/***/ }),

/***/ "./node_modules/lodash/_isIndex.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_isIndex.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used as references for various `Number` constants. */\nvar MAX_SAFE_INTEGER = 9007199254740991;\n\n/** Used to detect unsigned integer values. */\nvar reIsUint = /^(?:0|[1-9]\\d*)$/;\n\n/**\n * Checks if `value` is a valid array-like index.\n *\n * @private\n * @param {*} value The value to check.\n * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.\n * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.\n */\nfunction isIndex(value, length) {\n  var type = typeof value;\n  length = length == null ? MAX_SAFE_INTEGER : length;\n\n  return !!length &&\n    (type == 'number' ||\n      (type != 'symbol' && reIsUint.test(value))) &&\n        (value > -1 && value % 1 == 0 && value < length);\n}\n\nmodule.exports = isIndex;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_isIndex.js?");

/***/ }),

/***/ "./node_modules/lodash/_isIterateeCall.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_isIterateeCall.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\"),\n    isArrayLike = __webpack_require__(/*! ./isArrayLike */ \"./node_modules/lodash/isArrayLike.js\"),\n    isIndex = __webpack_require__(/*! ./_isIndex */ \"./node_modules/lodash/_isIndex.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\");\n\n/**\n * Checks if the given arguments are from an iteratee call.\n *\n * @private\n * @param {*} value The potential iteratee value argument.\n * @param {*} index The potential iteratee index or key argument.\n * @param {*} object The potential iteratee object argument.\n * @returns {boolean} Returns `true` if the arguments are from an iteratee call,\n *  else `false`.\n */\nfunction isIterateeCall(value, index, object) {\n  if (!isObject(object)) {\n    return false;\n  }\n  var type = typeof index;\n  if (type == 'number'\n        ? (isArrayLike(object) && isIndex(index, object.length))\n        : (type == 'string' && index in object)\n      ) {\n    return eq(object[index], value);\n  }\n  return false;\n}\n\nmodule.exports = isIterateeCall;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_isIterateeCall.js?");

/***/ }),

/***/ "./node_modules/lodash/_isKeyable.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_isKeyable.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is suitable for use as unique object key.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is suitable, else `false`.\n */\nfunction isKeyable(value) {\n  var type = typeof value;\n  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')\n    ? (value !== '__proto__')\n    : (value === null);\n}\n\nmodule.exports = isKeyable;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_isKeyable.js?");

/***/ }),

/***/ "./node_modules/lodash/_isMasked.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_isMasked.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var coreJsData = __webpack_require__(/*! ./_coreJsData */ \"./node_modules/lodash/_coreJsData.js\");\n\n/** Used to detect methods masquerading as native. */\nvar maskSrcKey = (function() {\n  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');\n  return uid ? ('Symbol(src)_1.' + uid) : '';\n}());\n\n/**\n * Checks if `func` has its source masked.\n *\n * @private\n * @param {Function} func The function to check.\n * @returns {boolean} Returns `true` if `func` is masked, else `false`.\n */\nfunction isMasked(func) {\n  return !!maskSrcKey && (maskSrcKey in func);\n}\n\nmodule.exports = isMasked;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_isMasked.js?");

/***/ }),

/***/ "./node_modules/lodash/_isPrototype.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_isPrototype.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/**\n * Checks if `value` is likely a prototype object.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.\n */\nfunction isPrototype(value) {\n  var Ctor = value && value.constructor,\n      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;\n\n  return value === proto;\n}\n\nmodule.exports = isPrototype;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_isPrototype.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheClear.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_listCacheClear.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Removes all key-value entries from the list cache.\n *\n * @private\n * @name clear\n * @memberOf ListCache\n */\nfunction listCacheClear() {\n  this.__data__ = [];\n  this.size = 0;\n}\n\nmodule.exports = listCacheClear;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_listCacheClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheDelete.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_listCacheDelete.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/** Used for built-in method references. */\nvar arrayProto = Array.prototype;\n\n/** Built-in value references. */\nvar splice = arrayProto.splice;\n\n/**\n * Removes `key` and its value from the list cache.\n *\n * @private\n * @name delete\n * @memberOf ListCache\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction listCacheDelete(key) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  if (index < 0) {\n    return false;\n  }\n  var lastIndex = data.length - 1;\n  if (index == lastIndex) {\n    data.pop();\n  } else {\n    splice.call(data, index, 1);\n  }\n  --this.size;\n  return true;\n}\n\nmodule.exports = listCacheDelete;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_listCacheDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheGet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheGet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Gets the list cache value for `key`.\n *\n * @private\n * @name get\n * @memberOf ListCache\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction listCacheGet(key) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  return index < 0 ? undefined : data[index][1];\n}\n\nmodule.exports = listCacheGet;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_listCacheGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheHas.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheHas.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Checks if a list cache value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf ListCache\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction listCacheHas(key) {\n  return assocIndexOf(this.__data__, key) > -1;\n}\n\nmodule.exports = listCacheHas;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_listCacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheSet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheSet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Sets the list cache `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf ListCache\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the list cache instance.\n */\nfunction listCacheSet(key, value) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  if (index < 0) {\n    ++this.size;\n    data.push([key, value]);\n  } else {\n    data[index][1] = value;\n  }\n  return this;\n}\n\nmodule.exports = listCacheSet;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_listCacheSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheClear.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_mapCacheClear.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Hash = __webpack_require__(/*! ./_Hash */ \"./node_modules/lodash/_Hash.js\"),\n    ListCache = __webpack_require__(/*! ./_ListCache */ \"./node_modules/lodash/_ListCache.js\"),\n    Map = __webpack_require__(/*! ./_Map */ \"./node_modules/lodash/_Map.js\");\n\n/**\n * Removes all key-value entries from the map.\n *\n * @private\n * @name clear\n * @memberOf MapCache\n */\nfunction mapCacheClear() {\n  this.size = 0;\n  this.__data__ = {\n    'hash': new Hash,\n    'map': new (Map || ListCache),\n    'string': new Hash\n  };\n}\n\nmodule.exports = mapCacheClear;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_mapCacheClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheDelete.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_mapCacheDelete.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Removes `key` and its value from the map.\n *\n * @private\n * @name delete\n * @memberOf MapCache\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction mapCacheDelete(key) {\n  var result = getMapData(this, key)['delete'](key);\n  this.size -= result ? 1 : 0;\n  return result;\n}\n\nmodule.exports = mapCacheDelete;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_mapCacheDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheGet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheGet.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Gets the map value for `key`.\n *\n * @private\n * @name get\n * @memberOf MapCache\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction mapCacheGet(key) {\n  return getMapData(this, key).get(key);\n}\n\nmodule.exports = mapCacheGet;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_mapCacheGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheHas.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Checks if a map value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf MapCache\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction mapCacheHas(key) {\n  return getMapData(this, key).has(key);\n}\n\nmodule.exports = mapCacheHas;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_mapCacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheSet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheSet.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Sets the map `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf MapCache\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the map cache instance.\n */\nfunction mapCacheSet(key, value) {\n  var data = getMapData(this, key),\n      size = data.size;\n\n  data.set(key, value);\n  this.size += data.size == size ? 0 : 1;\n  return this;\n}\n\nmodule.exports = mapCacheSet;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_mapCacheSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_nativeCreate.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeCreate.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\");\n\n/* Built-in method references that are verified to be native. */\nvar nativeCreate = getNative(Object, 'create');\n\nmodule.exports = nativeCreate;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_nativeCreate.js?");

/***/ }),

/***/ "./node_modules/lodash/_nativeKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_nativeKeys.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var overArg = __webpack_require__(/*! ./_overArg */ \"./node_modules/lodash/_overArg.js\");\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeKeys = overArg(Object.keys, Object);\n\nmodule.exports = nativeKeys;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_nativeKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_nativeKeysIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeKeysIn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This function is like\n * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)\n * except that it includes inherited enumerable properties.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n */\nfunction nativeKeysIn(object) {\n  var result = [];\n  if (object != null) {\n    for (var key in Object(object)) {\n      result.push(key);\n    }\n  }\n  return result;\n}\n\nmodule.exports = nativeKeysIn;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_nativeKeysIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_nodeUtil.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_nodeUtil.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ \"./node_modules/lodash/_freeGlobal.js\");\n\n/** Detect free variable `exports`. */\nvar freeExports =  true && exports && !exports.nodeType && exports;\n\n/** Detect free variable `module`. */\nvar freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;\n\n/** Detect the popular CommonJS extension `module.exports`. */\nvar moduleExports = freeModule && freeModule.exports === freeExports;\n\n/** Detect free variable `process` from Node.js. */\nvar freeProcess = moduleExports && freeGlobal.process;\n\n/** Used to access faster Node.js helpers. */\nvar nodeUtil = (function() {\n  try {\n    // Use `util.types` for Node.js 10+.\n    var types = freeModule && freeModule.require && freeModule.require('util').types;\n\n    if (types) {\n      return types;\n    }\n\n    // Legacy `process.binding('util')` for Node.js < 10.\n    return freeProcess && freeProcess.binding && freeProcess.binding('util');\n  } catch (e) {}\n}());\n\nmodule.exports = nodeUtil;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_nodeUtil.js?");

/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/**\n * Converts `value` to a string using `Object.prototype.toString`.\n *\n * @private\n * @param {*} value The value to convert.\n * @returns {string} Returns the converted string.\n */\nfunction objectToString(value) {\n  return nativeObjectToString.call(value);\n}\n\nmodule.exports = objectToString;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_objectToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_overArg.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_overArg.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Creates a unary function that invokes `func` with its argument transformed.\n *\n * @private\n * @param {Function} func The function to wrap.\n * @param {Function} transform The argument transform.\n * @returns {Function} Returns the new function.\n */\nfunction overArg(func, transform) {\n  return function(arg) {\n    return func(transform(arg));\n  };\n}\n\nmodule.exports = overArg;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_overArg.js?");

/***/ }),

/***/ "./node_modules/lodash/_overRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_overRest.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var apply = __webpack_require__(/*! ./_apply */ \"./node_modules/lodash/_apply.js\");\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeMax = Math.max;\n\n/**\n * A specialized version of `baseRest` which transforms the rest array.\n *\n * @private\n * @param {Function} func The function to apply a rest parameter to.\n * @param {number} [start=func.length-1] The start position of the rest parameter.\n * @param {Function} transform The rest array transform.\n * @returns {Function} Returns the new function.\n */\nfunction overRest(func, start, transform) {\n  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);\n  return function() {\n    var args = arguments,\n        index = -1,\n        length = nativeMax(args.length - start, 0),\n        array = Array(length);\n\n    while (++index < length) {\n      array[index] = args[start + index];\n    }\n    index = -1;\n    var otherArgs = Array(start + 1);\n    while (++index < start) {\n      otherArgs[index] = args[index];\n    }\n    otherArgs[start] = transform(array);\n    return apply(func, this, otherArgs);\n  };\n}\n\nmodule.exports = overRest;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_overRest.js?");

/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ \"./node_modules/lodash/_freeGlobal.js\");\n\n/** Detect free variable `self`. */\nvar freeSelf = typeof self == 'object' && self && self.Object === Object && self;\n\n/** Used as a reference to the global object. */\nvar root = freeGlobal || freeSelf || Function('return this')();\n\nmodule.exports = root;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_root.js?");

/***/ }),

/***/ "./node_modules/lodash/_safeGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_safeGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Gets the value at `key`, unless `key` is \"__proto__\" or \"constructor\".\n *\n * @private\n * @param {Object} object The object to query.\n * @param {string} key The key of the property to get.\n * @returns {*} Returns the property value.\n */\nfunction safeGet(object, key) {\n  if (key === 'constructor' && typeof object[key] === 'function') {\n    return;\n  }\n\n  if (key == '__proto__') {\n    return;\n  }\n\n  return object[key];\n}\n\nmodule.exports = safeGet;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_safeGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_setToString.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setToString.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseSetToString = __webpack_require__(/*! ./_baseSetToString */ \"./node_modules/lodash/_baseSetToString.js\"),\n    shortOut = __webpack_require__(/*! ./_shortOut */ \"./node_modules/lodash/_shortOut.js\");\n\n/**\n * Sets the `toString` method of `func` to return `string`.\n *\n * @private\n * @param {Function} func The function to modify.\n * @param {Function} string The `toString` result.\n * @returns {Function} Returns `func`.\n */\nvar setToString = shortOut(baseSetToString);\n\nmodule.exports = setToString;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_setToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_shortOut.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_shortOut.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used to detect hot functions by number of calls within a span of milliseconds. */\nvar HOT_COUNT = 800,\n    HOT_SPAN = 16;\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeNow = Date.now;\n\n/**\n * Creates a function that'll short out and invoke `identity` instead\n * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`\n * milliseconds.\n *\n * @private\n * @param {Function} func The function to restrict.\n * @returns {Function} Returns the new shortable function.\n */\nfunction shortOut(func) {\n  var count = 0,\n      lastCalled = 0;\n\n  return function() {\n    var stamp = nativeNow(),\n        remaining = HOT_SPAN - (stamp - lastCalled);\n\n    lastCalled = stamp;\n    if (remaining > 0) {\n      if (++count >= HOT_COUNT) {\n        return arguments[0];\n      }\n    } else {\n      count = 0;\n    }\n    return func.apply(undefined, arguments);\n  };\n}\n\nmodule.exports = shortOut;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_shortOut.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackClear.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_stackClear.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var ListCache = __webpack_require__(/*! ./_ListCache */ \"./node_modules/lodash/_ListCache.js\");\n\n/**\n * Removes all key-value entries from the stack.\n *\n * @private\n * @name clear\n * @memberOf Stack\n */\nfunction stackClear() {\n  this.__data__ = new ListCache;\n  this.size = 0;\n}\n\nmodule.exports = stackClear;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_stackClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackDelete.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_stackDelete.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Removes `key` and its value from the stack.\n *\n * @private\n * @name delete\n * @memberOf Stack\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction stackDelete(key) {\n  var data = this.__data__,\n      result = data['delete'](key);\n\n  this.size = data.size;\n  return result;\n}\n\nmodule.exports = stackDelete;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_stackDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackGet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackGet.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Gets the stack value for `key`.\n *\n * @private\n * @name get\n * @memberOf Stack\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction stackGet(key) {\n  return this.__data__.get(key);\n}\n\nmodule.exports = stackGet;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_stackGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackHas.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if a stack value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf Stack\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction stackHas(key) {\n  return this.__data__.has(key);\n}\n\nmodule.exports = stackHas;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_stackHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackSet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackSet.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var ListCache = __webpack_require__(/*! ./_ListCache */ \"./node_modules/lodash/_ListCache.js\"),\n    Map = __webpack_require__(/*! ./_Map */ \"./node_modules/lodash/_Map.js\"),\n    MapCache = __webpack_require__(/*! ./_MapCache */ \"./node_modules/lodash/_MapCache.js\");\n\n/** Used as the size to enable large array optimizations. */\nvar LARGE_ARRAY_SIZE = 200;\n\n/**\n * Sets the stack `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf Stack\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the stack cache instance.\n */\nfunction stackSet(key, value) {\n  var data = this.__data__;\n  if (data instanceof ListCache) {\n    var pairs = data.__data__;\n    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {\n      pairs.push([key, value]);\n      this.size = ++data.size;\n      return this;\n    }\n    data = this.__data__ = new MapCache(pairs);\n  }\n  data.set(key, value);\n  this.size = data.size;\n  return this;\n}\n\nmodule.exports = stackSet;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_stackSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_toSource.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_toSource.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar funcProto = Function.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/**\n * Converts `func` to its source code.\n *\n * @private\n * @param {Function} func The function to convert.\n * @returns {string} Returns the source code.\n */\nfunction toSource(func) {\n  if (func != null) {\n    try {\n      return funcToString.call(func);\n    } catch (e) {}\n    try {\n      return (func + '');\n    } catch (e) {}\n  }\n  return '';\n}\n\nmodule.exports = toSource;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/_toSource.js?");

/***/ }),

/***/ "./node_modules/lodash/cloneDeep.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/cloneDeep.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseClone = __webpack_require__(/*! ./_baseClone */ \"./node_modules/lodash/_baseClone.js\");\n\n/** Used to compose bitmasks for cloning. */\nvar CLONE_DEEP_FLAG = 1,\n    CLONE_SYMBOLS_FLAG = 4;\n\n/**\n * This method is like `_.clone` except that it recursively clones `value`.\n *\n * @static\n * @memberOf _\n * @since 1.0.0\n * @category Lang\n * @param {*} value The value to recursively clone.\n * @returns {*} Returns the deep cloned value.\n * @see _.clone\n * @example\n *\n * var objects = [{ 'a': 1 }, { 'b': 2 }];\n *\n * var deep = _.cloneDeep(objects);\n * console.log(deep[0] === objects[0]);\n * // => false\n */\nfunction cloneDeep(value) {\n  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);\n}\n\nmodule.exports = cloneDeep;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/cloneDeep.js?");

/***/ }),

/***/ "./node_modules/lodash/constant.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/constant.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Creates a function that returns `value`.\n *\n * @static\n * @memberOf _\n * @since 2.4.0\n * @category Util\n * @param {*} value The value to return from the new function.\n * @returns {Function} Returns the new constant function.\n * @example\n *\n * var objects = _.times(2, _.constant({ 'a': 1 }));\n *\n * console.log(objects);\n * // => [{ 'a': 1 }, { 'a': 1 }]\n *\n * console.log(objects[0] === objects[1]);\n * // => true\n */\nfunction constant(value) {\n  return function() {\n    return value;\n  };\n}\n\nmodule.exports = constant;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/constant.js?");

/***/ }),

/***/ "./node_modules/lodash/eq.js":
/*!***********************************!*\
  !*** ./node_modules/lodash/eq.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Performs a\n * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * comparison between two values to determine if they are equivalent.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to compare.\n * @param {*} other The other value to compare.\n * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n * @example\n *\n * var object = { 'a': 1 };\n * var other = { 'a': 1 };\n *\n * _.eq(object, object);\n * // => true\n *\n * _.eq(object, other);\n * // => false\n *\n * _.eq('a', 'a');\n * // => true\n *\n * _.eq('a', Object('a'));\n * // => false\n *\n * _.eq(NaN, NaN);\n * // => true\n */\nfunction eq(value, other) {\n  return value === other || (value !== value && other !== other);\n}\n\nmodule.exports = eq;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/eq.js?");

/***/ }),

/***/ "./node_modules/lodash/identity.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/identity.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns the first argument it receives.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Util\n * @param {*} value Any value.\n * @returns {*} Returns `value`.\n * @example\n *\n * var object = { 'a': 1 };\n *\n * console.log(_.identity(object) === object);\n * // => true\n */\nfunction identity(value) {\n  return value;\n}\n\nmodule.exports = identity;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/identity.js?");

/***/ }),

/***/ "./node_modules/lodash/isArguments.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ \"./node_modules/lodash/_baseIsArguments.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/** Built-in value references. */\nvar propertyIsEnumerable = objectProto.propertyIsEnumerable;\n\n/**\n * Checks if `value` is likely an `arguments` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an `arguments` object,\n *  else `false`.\n * @example\n *\n * _.isArguments(function() { return arguments; }());\n * // => true\n *\n * _.isArguments([1, 2, 3]);\n * // => false\n */\nvar isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {\n  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&\n    !propertyIsEnumerable.call(value, 'callee');\n};\n\nmodule.exports = isArguments;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/isArguments.js?");

/***/ }),

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is classified as an `Array` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an array, else `false`.\n * @example\n *\n * _.isArray([1, 2, 3]);\n * // => true\n *\n * _.isArray(document.body.children);\n * // => false\n *\n * _.isArray('abc');\n * // => false\n *\n * _.isArray(_.noop);\n * // => false\n */\nvar isArray = Array.isArray;\n\nmodule.exports = isArray;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/isArray.js?");

/***/ }),

/***/ "./node_modules/lodash/isArrayLike.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isFunction = __webpack_require__(/*! ./isFunction */ \"./node_modules/lodash/isFunction.js\"),\n    isLength = __webpack_require__(/*! ./isLength */ \"./node_modules/lodash/isLength.js\");\n\n/**\n * Checks if `value` is array-like. A value is considered array-like if it's\n * not a function and has a `value.length` that's an integer greater than or\n * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is array-like, else `false`.\n * @example\n *\n * _.isArrayLike([1, 2, 3]);\n * // => true\n *\n * _.isArrayLike(document.body.children);\n * // => true\n *\n * _.isArrayLike('abc');\n * // => true\n *\n * _.isArrayLike(_.noop);\n * // => false\n */\nfunction isArrayLike(value) {\n  return value != null && isLength(value.length) && !isFunction(value);\n}\n\nmodule.exports = isArrayLike;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/isArrayLike.js?");

/***/ }),

/***/ "./node_modules/lodash/isArrayLikeObject.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/isArrayLikeObject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isArrayLike = __webpack_require__(/*! ./isArrayLike */ \"./node_modules/lodash/isArrayLike.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/**\n * This method is like `_.isArrayLike` except that it also checks if `value`\n * is an object.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an array-like object,\n *  else `false`.\n * @example\n *\n * _.isArrayLikeObject([1, 2, 3]);\n * // => true\n *\n * _.isArrayLikeObject(document.body.children);\n * // => true\n *\n * _.isArrayLikeObject('abc');\n * // => false\n *\n * _.isArrayLikeObject(_.noop);\n * // => false\n */\nfunction isArrayLikeObject(value) {\n  return isObjectLike(value) && isArrayLike(value);\n}\n\nmodule.exports = isArrayLikeObject;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/isArrayLikeObject.js?");

/***/ }),

/***/ "./node_modules/lodash/isBuffer.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isBuffer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\"),\n    stubFalse = __webpack_require__(/*! ./stubFalse */ \"./node_modules/lodash/stubFalse.js\");\n\n/** Detect free variable `exports`. */\nvar freeExports =  true && exports && !exports.nodeType && exports;\n\n/** Detect free variable `module`. */\nvar freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;\n\n/** Detect the popular CommonJS extension `module.exports`. */\nvar moduleExports = freeModule && freeModule.exports === freeExports;\n\n/** Built-in value references. */\nvar Buffer = moduleExports ? root.Buffer : undefined;\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;\n\n/**\n * Checks if `value` is a buffer.\n *\n * @static\n * @memberOf _\n * @since 4.3.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.\n * @example\n *\n * _.isBuffer(new Buffer(2));\n * // => true\n *\n * _.isBuffer(new Uint8Array(2));\n * // => false\n */\nvar isBuffer = nativeIsBuffer || stubFalse;\n\nmodule.exports = isBuffer;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/isBuffer.js?");

/***/ }),

/***/ "./node_modules/lodash/isFunction.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\");\n\n/** `Object#toString` result references. */\nvar asyncTag = '[object AsyncFunction]',\n    funcTag = '[object Function]',\n    genTag = '[object GeneratorFunction]',\n    proxyTag = '[object Proxy]';\n\n/**\n * Checks if `value` is classified as a `Function` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a function, else `false`.\n * @example\n *\n * _.isFunction(_);\n * // => true\n *\n * _.isFunction(/abc/);\n * // => false\n */\nfunction isFunction(value) {\n  if (!isObject(value)) {\n    return false;\n  }\n  // The use of `Object#toString` avoids issues with the `typeof` operator\n  // in Safari 9 which returns 'object' for typed arrays and other constructors.\n  var tag = baseGetTag(value);\n  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;\n}\n\nmodule.exports = isFunction;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/isFunction.js?");

/***/ }),

/***/ "./node_modules/lodash/isLength.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used as references for various `Number` constants. */\nvar MAX_SAFE_INTEGER = 9007199254740991;\n\n/**\n * Checks if `value` is a valid array-like length.\n *\n * **Note:** This method is loosely based on\n * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.\n * @example\n *\n * _.isLength(3);\n * // => true\n *\n * _.isLength(Number.MIN_VALUE);\n * // => false\n *\n * _.isLength(Infinity);\n * // => false\n *\n * _.isLength('3');\n * // => false\n */\nfunction isLength(value) {\n  return typeof value == 'number' &&\n    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;\n}\n\nmodule.exports = isLength;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/isLength.js?");

/***/ }),

/***/ "./node_modules/lodash/isMap.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/isMap.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsMap = __webpack_require__(/*! ./_baseIsMap */ \"./node_modules/lodash/_baseIsMap.js\"),\n    baseUnary = __webpack_require__(/*! ./_baseUnary */ \"./node_modules/lodash/_baseUnary.js\"),\n    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ \"./node_modules/lodash/_nodeUtil.js\");\n\n/* Node.js helper references. */\nvar nodeIsMap = nodeUtil && nodeUtil.isMap;\n\n/**\n * Checks if `value` is classified as a `Map` object.\n *\n * @static\n * @memberOf _\n * @since 4.3.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a map, else `false`.\n * @example\n *\n * _.isMap(new Map);\n * // => true\n *\n * _.isMap(new WeakMap);\n * // => false\n */\nvar isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;\n\nmodule.exports = isMap;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/isMap.js?");

/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is the\n * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)\n * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an object, else `false`.\n * @example\n *\n * _.isObject({});\n * // => true\n *\n * _.isObject([1, 2, 3]);\n * // => true\n *\n * _.isObject(_.noop);\n * // => true\n *\n * _.isObject(null);\n * // => false\n */\nfunction isObject(value) {\n  var type = typeof value;\n  return value != null && (type == 'object' || type == 'function');\n}\n\nmodule.exports = isObject;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/isObject.js?");

/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is object-like. A value is object-like if it's not `null`\n * and has a `typeof` result of \"object\".\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is object-like, else `false`.\n * @example\n *\n * _.isObjectLike({});\n * // => true\n *\n * _.isObjectLike([1, 2, 3]);\n * // => true\n *\n * _.isObjectLike(_.noop);\n * // => false\n *\n * _.isObjectLike(null);\n * // => false\n */\nfunction isObjectLike(value) {\n  return value != null && typeof value == 'object';\n}\n\nmodule.exports = isObjectLike;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/isObjectLike.js?");

/***/ }),

/***/ "./node_modules/lodash/isPlainObject.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/isPlainObject.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    getPrototype = __webpack_require__(/*! ./_getPrototype */ \"./node_modules/lodash/_getPrototype.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar objectTag = '[object Object]';\n\n/** Used for built-in method references. */\nvar funcProto = Function.prototype,\n    objectProto = Object.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/** Used to infer the `Object` constructor. */\nvar objectCtorString = funcToString.call(Object);\n\n/**\n * Checks if `value` is a plain object, that is, an object created by the\n * `Object` constructor or one with a `[[Prototype]]` of `null`.\n *\n * @static\n * @memberOf _\n * @since 0.8.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.\n * @example\n *\n * function Foo() {\n *   this.a = 1;\n * }\n *\n * _.isPlainObject(new Foo);\n * // => false\n *\n * _.isPlainObject([1, 2, 3]);\n * // => false\n *\n * _.isPlainObject({ 'x': 0, 'y': 0 });\n * // => true\n *\n * _.isPlainObject(Object.create(null));\n * // => true\n */\nfunction isPlainObject(value) {\n  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {\n    return false;\n  }\n  var proto = getPrototype(value);\n  if (proto === null) {\n    return true;\n  }\n  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;\n  return typeof Ctor == 'function' && Ctor instanceof Ctor &&\n    funcToString.call(Ctor) == objectCtorString;\n}\n\nmodule.exports = isPlainObject;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/isPlainObject.js?");

/***/ }),

/***/ "./node_modules/lodash/isSet.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/isSet.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsSet = __webpack_require__(/*! ./_baseIsSet */ \"./node_modules/lodash/_baseIsSet.js\"),\n    baseUnary = __webpack_require__(/*! ./_baseUnary */ \"./node_modules/lodash/_baseUnary.js\"),\n    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ \"./node_modules/lodash/_nodeUtil.js\");\n\n/* Node.js helper references. */\nvar nodeIsSet = nodeUtil && nodeUtil.isSet;\n\n/**\n * Checks if `value` is classified as a `Set` object.\n *\n * @static\n * @memberOf _\n * @since 4.3.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a set, else `false`.\n * @example\n *\n * _.isSet(new Set);\n * // => true\n *\n * _.isSet(new WeakSet);\n * // => false\n */\nvar isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;\n\nmodule.exports = isSet;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/isSet.js?");

/***/ }),

/***/ "./node_modules/lodash/isTypedArray.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isTypedArray.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ \"./node_modules/lodash/_baseIsTypedArray.js\"),\n    baseUnary = __webpack_require__(/*! ./_baseUnary */ \"./node_modules/lodash/_baseUnary.js\"),\n    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ \"./node_modules/lodash/_nodeUtil.js\");\n\n/* Node.js helper references. */\nvar nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;\n\n/**\n * Checks if `value` is classified as a typed array.\n *\n * @static\n * @memberOf _\n * @since 3.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.\n * @example\n *\n * _.isTypedArray(new Uint8Array);\n * // => true\n *\n * _.isTypedArray([]);\n * // => false\n */\nvar isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;\n\nmodule.exports = isTypedArray;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/isTypedArray.js?");

/***/ }),

/***/ "./node_modules/lodash/keys.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/keys.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ \"./node_modules/lodash/_arrayLikeKeys.js\"),\n    baseKeys = __webpack_require__(/*! ./_baseKeys */ \"./node_modules/lodash/_baseKeys.js\"),\n    isArrayLike = __webpack_require__(/*! ./isArrayLike */ \"./node_modules/lodash/isArrayLike.js\");\n\n/**\n * Creates an array of the own enumerable property names of `object`.\n *\n * **Note:** Non-object values are coerced to objects. See the\n * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)\n * for more details.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Object\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n * @example\n *\n * function Foo() {\n *   this.a = 1;\n *   this.b = 2;\n * }\n *\n * Foo.prototype.c = 3;\n *\n * _.keys(new Foo);\n * // => ['a', 'b'] (iteration order is not guaranteed)\n *\n * _.keys('hi');\n * // => ['0', '1']\n */\nfunction keys(object) {\n  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);\n}\n\nmodule.exports = keys;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/keys.js?");

/***/ }),

/***/ "./node_modules/lodash/keysIn.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/keysIn.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ \"./node_modules/lodash/_arrayLikeKeys.js\"),\n    baseKeysIn = __webpack_require__(/*! ./_baseKeysIn */ \"./node_modules/lodash/_baseKeysIn.js\"),\n    isArrayLike = __webpack_require__(/*! ./isArrayLike */ \"./node_modules/lodash/isArrayLike.js\");\n\n/**\n * Creates an array of the own and inherited enumerable property names of `object`.\n *\n * **Note:** Non-object values are coerced to objects.\n *\n * @static\n * @memberOf _\n * @since 3.0.0\n * @category Object\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n * @example\n *\n * function Foo() {\n *   this.a = 1;\n *   this.b = 2;\n * }\n *\n * Foo.prototype.c = 3;\n *\n * _.keysIn(new Foo);\n * // => ['a', 'b', 'c'] (iteration order is not guaranteed)\n */\nfunction keysIn(object) {\n  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);\n}\n\nmodule.exports = keysIn;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/keysIn.js?");

/***/ }),

/***/ "./node_modules/lodash/merge.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/merge.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseMerge = __webpack_require__(/*! ./_baseMerge */ \"./node_modules/lodash/_baseMerge.js\"),\n    createAssigner = __webpack_require__(/*! ./_createAssigner */ \"./node_modules/lodash/_createAssigner.js\");\n\n/**\n * This method is like `_.assign` except that it recursively merges own and\n * inherited enumerable string keyed properties of source objects into the\n * destination object. Source properties that resolve to `undefined` are\n * skipped if a destination value exists. Array and plain object properties\n * are merged recursively. Other objects and value types are overridden by\n * assignment. Source objects are applied from left to right. Subsequent\n * sources overwrite property assignments of previous sources.\n *\n * **Note:** This method mutates `object`.\n *\n * @static\n * @memberOf _\n * @since 0.5.0\n * @category Object\n * @param {Object} object The destination object.\n * @param {...Object} [sources] The source objects.\n * @returns {Object} Returns `object`.\n * @example\n *\n * var object = {\n *   'a': [{ 'b': 2 }, { 'd': 4 }]\n * };\n *\n * var other = {\n *   'a': [{ 'c': 3 }, { 'e': 5 }]\n * };\n *\n * _.merge(object, other);\n * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }\n */\nvar merge = createAssigner(function(object, source, srcIndex) {\n  baseMerge(object, source, srcIndex);\n});\n\nmodule.exports = merge;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/merge.js?");

/***/ }),

/***/ "./node_modules/lodash/stubArray.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubArray.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns a new empty array.\n *\n * @static\n * @memberOf _\n * @since 4.13.0\n * @category Util\n * @returns {Array} Returns the new empty array.\n * @example\n *\n * var arrays = _.times(2, _.stubArray);\n *\n * console.log(arrays);\n * // => [[], []]\n *\n * console.log(arrays[0] === arrays[1]);\n * // => false\n */\nfunction stubArray() {\n  return [];\n}\n\nmodule.exports = stubArray;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/stubArray.js?");

/***/ }),

/***/ "./node_modules/lodash/stubFalse.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubFalse.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns `false`.\n *\n * @static\n * @memberOf _\n * @since 4.13.0\n * @category Util\n * @returns {boolean} Returns `false`.\n * @example\n *\n * _.times(2, _.stubFalse);\n * // => [false, false]\n */\nfunction stubFalse() {\n  return false;\n}\n\nmodule.exports = stubFalse;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/stubFalse.js?");

/***/ }),

/***/ "./node_modules/lodash/toPlainObject.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/toPlainObject.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var copyObject = __webpack_require__(/*! ./_copyObject */ \"./node_modules/lodash/_copyObject.js\"),\n    keysIn = __webpack_require__(/*! ./keysIn */ \"./node_modules/lodash/keysIn.js\");\n\n/**\n * Converts `value` to a plain object flattening inherited enumerable string\n * keyed properties of `value` to own properties of the plain object.\n *\n * @static\n * @memberOf _\n * @since 3.0.0\n * @category Lang\n * @param {*} value The value to convert.\n * @returns {Object} Returns the converted plain object.\n * @example\n *\n * function Foo() {\n *   this.b = 2;\n * }\n *\n * Foo.prototype.c = 3;\n *\n * _.assign({ 'a': 1 }, new Foo);\n * // => { 'a': 1, 'b': 2 }\n *\n * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));\n * // => { 'a': 1, 'b': 2, 'c': 3 }\n */\nfunction toPlainObject(value) {\n  return copyObject(value, keysIn(value));\n}\n\nmodule.exports = toPlainObject;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/lodash/toPlainObject.js?");

/***/ }),

/***/ "./node_modules/memoize-one/dist/memoize-one.esm.js":
/*!**********************************************************!*\
  !*** ./node_modules/memoize-one/dist/memoize-one.esm.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction areInputsEqual(newInputs, lastInputs) {\n    if (newInputs.length !== lastInputs.length) {\n        return false;\n    }\n    for (var i = 0; i < newInputs.length; i++) {\n        if (newInputs[i] !== lastInputs[i]) {\n            return false;\n        }\n    }\n    return true;\n}\n\nfunction memoizeOne(resultFn, isEqual) {\n    if (isEqual === void 0) { isEqual = areInputsEqual; }\n    var lastThis;\n    var lastArgs = [];\n    var lastResult;\n    var calledOnce = false;\n    function memoized() {\n        var newArgs = [];\n        for (var _i = 0; _i < arguments.length; _i++) {\n            newArgs[_i] = arguments[_i];\n        }\n        if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {\n            return lastResult;\n        }\n        lastResult = resultFn.apply(this, newArgs);\n        calledOnce = true;\n        lastThis = this;\n        lastArgs = newArgs;\n        return lastResult;\n    }\n    return memoized;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (memoizeOne);\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/memoize-one/dist/memoize-one.esm.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\nvar stylesInDom = {};\n\nvar\tmemoize = function (fn) {\n\tvar memo;\n\n\treturn function () {\n\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\n\t\treturn memo;\n\t};\n};\n\nvar isOldIE = memoize(function () {\n\t// Test for IE <= 9 as proposed by Browserhacks\n\t// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n\t// Tests for existence of standard globals is to allow style-loader\n\t// to operate correctly into non-standard environments\n\t// @see https://github.com/webpack-contrib/style-loader/issues/177\n\treturn window && document && document.all && !window.atob;\n});\n\nvar getTarget = function (target, parent) {\n  if (parent){\n    return parent.querySelector(target);\n  }\n  return document.querySelector(target);\n};\n\nvar getElement = (function (fn) {\n\tvar memo = {};\n\n\treturn function(target, parent) {\n                // If passing function in options, then use it for resolve \"head\" element.\n                // Useful for Shadow Root style i.e\n                // {\n                //   insertInto: function () { return document.querySelector(\"#foo\").shadowRoot }\n                // }\n                if (typeof target === 'function') {\n                        return target();\n                }\n                if (typeof memo[target] === \"undefined\") {\n\t\t\tvar styleTarget = getTarget.call(this, target, parent);\n\t\t\t// Special case to return head of iframe instead of iframe itself\n\t\t\tif (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n\t\t\t\ttry {\n\t\t\t\t\t// This will throw an exception if access to iframe is blocked\n\t\t\t\t\t// due to cross-origin restrictions\n\t\t\t\t\tstyleTarget = styleTarget.contentDocument.head;\n\t\t\t\t} catch(e) {\n\t\t\t\t\tstyleTarget = null;\n\t\t\t\t}\n\t\t\t}\n\t\t\tmemo[target] = styleTarget;\n\t\t}\n\t\treturn memo[target]\n\t};\n})();\n\nvar singleton = null;\nvar\tsingletonCounter = 0;\nvar\tstylesInsertedAtTop = [];\n\nvar\tfixUrls = __webpack_require__(/*! ./urls */ \"./node_modules/style-loader/lib/urls.js\");\n\nmodule.exports = function(list, options) {\n\tif (typeof DEBUG !== \"undefined\" && DEBUG) {\n\t\tif (typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\n\t}\n\n\toptions = options || {};\n\n\toptions.attrs = typeof options.attrs === \"object\" ? options.attrs : {};\n\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n\t// tags it will allow on a page\n\tif (!options.singleton && typeof options.singleton !== \"boolean\") options.singleton = isOldIE();\n\n\t// By default, add <style> tags to the <head> element\n        if (!options.insertInto) options.insertInto = \"head\";\n\n\t// By default, add <style> tags to the bottom of the target\n\tif (!options.insertAt) options.insertAt = \"bottom\";\n\n\tvar styles = listToStyles(list, options);\n\n\taddStylesToDom(styles, options);\n\n\treturn function update (newList) {\n\t\tvar mayRemove = [];\n\n\t\tfor (var i = 0; i < styles.length; i++) {\n\t\t\tvar item = styles[i];\n\t\t\tvar domStyle = stylesInDom[item.id];\n\n\t\t\tdomStyle.refs--;\n\t\t\tmayRemove.push(domStyle);\n\t\t}\n\n\t\tif(newList) {\n\t\t\tvar newStyles = listToStyles(newList, options);\n\t\t\taddStylesToDom(newStyles, options);\n\t\t}\n\n\t\tfor (var i = 0; i < mayRemove.length; i++) {\n\t\t\tvar domStyle = mayRemove[i];\n\n\t\t\tif(domStyle.refs === 0) {\n\t\t\t\tfor (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();\n\n\t\t\t\tdelete stylesInDom[domStyle.id];\n\t\t\t}\n\t\t}\n\t};\n};\n\nfunction addStylesToDom (styles, options) {\n\tfor (var i = 0; i < styles.length; i++) {\n\t\tvar item = styles[i];\n\t\tvar domStyle = stylesInDom[item.id];\n\n\t\tif(domStyle) {\n\t\t\tdomStyle.refs++;\n\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\n\t\t\t}\n\n\t\t\tfor(; j < item.parts.length; j++) {\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\t\t} else {\n\t\t\tvar parts = [];\n\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\n\t\t}\n\t}\n}\n\nfunction listToStyles (list, options) {\n\tvar styles = [];\n\tvar newStyles = {};\n\n\tfor (var i = 0; i < list.length; i++) {\n\t\tvar item = list[i];\n\t\tvar id = options.base ? item[0] + options.base : item[0];\n\t\tvar css = item[1];\n\t\tvar media = item[2];\n\t\tvar sourceMap = item[3];\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\n\n\t\tif(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});\n\t\telse newStyles[id].parts.push(part);\n\t}\n\n\treturn styles;\n}\n\nfunction insertStyleElement (options, style) {\n\tvar target = getElement(options.insertInto)\n\n\tif (!target) {\n\t\tthrow new Error(\"Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.\");\n\t}\n\n\tvar lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];\n\n\tif (options.insertAt === \"top\") {\n\t\tif (!lastStyleElementInsertedAtTop) {\n\t\t\ttarget.insertBefore(style, target.firstChild);\n\t\t} else if (lastStyleElementInsertedAtTop.nextSibling) {\n\t\t\ttarget.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);\n\t\t} else {\n\t\t\ttarget.appendChild(style);\n\t\t}\n\t\tstylesInsertedAtTop.push(style);\n\t} else if (options.insertAt === \"bottom\") {\n\t\ttarget.appendChild(style);\n\t} else if (typeof options.insertAt === \"object\" && options.insertAt.before) {\n\t\tvar nextSibling = getElement(options.insertAt.before, target);\n\t\ttarget.insertBefore(style, nextSibling);\n\t} else {\n\t\tthrow new Error(\"[Style Loader]\\n\\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\\n Must be 'top', 'bottom', or Object.\\n (https://github.com/webpack-contrib/style-loader#insertat)\\n\");\n\t}\n}\n\nfunction removeStyleElement (style) {\n\tif (style.parentNode === null) return false;\n\tstyle.parentNode.removeChild(style);\n\n\tvar idx = stylesInsertedAtTop.indexOf(style);\n\tif(idx >= 0) {\n\t\tstylesInsertedAtTop.splice(idx, 1);\n\t}\n}\n\nfunction createStyleElement (options) {\n\tvar style = document.createElement(\"style\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\n\tif(options.attrs.nonce === undefined) {\n\t\tvar nonce = getNonce();\n\t\tif (nonce) {\n\t\t\toptions.attrs.nonce = nonce;\n\t\t}\n\t}\n\n\taddAttrs(style, options.attrs);\n\tinsertStyleElement(options, style);\n\n\treturn style;\n}\n\nfunction createLinkElement (options) {\n\tvar link = document.createElement(\"link\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\toptions.attrs.rel = \"stylesheet\";\n\n\taddAttrs(link, options.attrs);\n\tinsertStyleElement(options, link);\n\n\treturn link;\n}\n\nfunction addAttrs (el, attrs) {\n\tObject.keys(attrs).forEach(function (key) {\n\t\tel.setAttribute(key, attrs[key]);\n\t});\n}\n\nfunction getNonce() {\n\tif (false) {}\n\n\treturn __webpack_require__.nc;\n}\n\nfunction addStyle (obj, options) {\n\tvar style, update, remove, result;\n\n\t// If a transform function was defined, run it on the css\n\tif (options.transform && obj.css) {\n\t    result = typeof options.transform === 'function'\n\t\t ? options.transform(obj.css) \n\t\t : options.transform.default(obj.css);\n\n\t    if (result) {\n\t    \t// If transform returns a value, use that instead of the original css.\n\t    \t// This allows running runtime transformations on the css.\n\t    \tobj.css = result;\n\t    } else {\n\t    \t// If the transform function returns a falsy value, don't add this css.\n\t    \t// This allows conditional loading of css\n\t    \treturn function() {\n\t    \t\t// noop\n\t    \t};\n\t    }\n\t}\n\n\tif (options.singleton) {\n\t\tvar styleIndex = singletonCounter++;\n\n\t\tstyle = singleton || (singleton = createStyleElement(options));\n\n\t\tupdate = applyToSingletonTag.bind(null, style, styleIndex, false);\n\t\tremove = applyToSingletonTag.bind(null, style, styleIndex, true);\n\n\t} else if (\n\t\tobj.sourceMap &&\n\t\ttypeof URL === \"function\" &&\n\t\ttypeof URL.createObjectURL === \"function\" &&\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\n\t\ttypeof Blob === \"function\" &&\n\t\ttypeof btoa === \"function\"\n\t) {\n\t\tstyle = createLinkElement(options);\n\t\tupdate = updateLink.bind(null, style, options);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\n\t\t\tif(style.href) URL.revokeObjectURL(style.href);\n\t\t};\n\t} else {\n\t\tstyle = createStyleElement(options);\n\t\tupdate = applyToTag.bind(null, style);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\t\t};\n\t}\n\n\tupdate(obj);\n\n\treturn function updateStyle (newObj) {\n\t\tif (newObj) {\n\t\t\tif (\n\t\t\t\tnewObj.css === obj.css &&\n\t\t\t\tnewObj.media === obj.media &&\n\t\t\t\tnewObj.sourceMap === obj.sourceMap\n\t\t\t) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tupdate(obj = newObj);\n\t\t} else {\n\t\t\tremove();\n\t\t}\n\t};\n}\n\nvar replaceText = (function () {\n\tvar textStore = [];\n\n\treturn function (index, replacement) {\n\t\ttextStore[index] = replacement;\n\n\t\treturn textStore.filter(Boolean).join('\\n');\n\t};\n})();\n\nfunction applyToSingletonTag (style, index, remove, obj) {\n\tvar css = remove ? \"\" : obj.css;\n\n\tif (style.styleSheet) {\n\t\tstyle.styleSheet.cssText = replaceText(index, css);\n\t} else {\n\t\tvar cssNode = document.createTextNode(css);\n\t\tvar childNodes = style.childNodes;\n\n\t\tif (childNodes[index]) style.removeChild(childNodes[index]);\n\n\t\tif (childNodes.length) {\n\t\t\tstyle.insertBefore(cssNode, childNodes[index]);\n\t\t} else {\n\t\t\tstyle.appendChild(cssNode);\n\t\t}\n\t}\n}\n\nfunction applyToTag (style, obj) {\n\tvar css = obj.css;\n\tvar media = obj.media;\n\n\tif(media) {\n\t\tstyle.setAttribute(\"media\", media)\n\t}\n\n\tif(style.styleSheet) {\n\t\tstyle.styleSheet.cssText = css;\n\t} else {\n\t\twhile(style.firstChild) {\n\t\t\tstyle.removeChild(style.firstChild);\n\t\t}\n\n\t\tstyle.appendChild(document.createTextNode(css));\n\t}\n}\n\nfunction updateLink (link, options, obj) {\n\tvar css = obj.css;\n\tvar sourceMap = obj.sourceMap;\n\n\t/*\n\t\tIf convertToAbsoluteUrls isn't defined, but sourcemaps are enabled\n\t\tand there is no publicPath defined then lets turn convertToAbsoluteUrls\n\t\ton by default.  Otherwise default to the convertToAbsoluteUrls option\n\t\tdirectly\n\t*/\n\tvar autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;\n\n\tif (options.convertToAbsoluteUrls || autoFixUrls) {\n\t\tcss = fixUrls(css);\n\t}\n\n\tif (sourceMap) {\n\t\t// http://stackoverflow.com/a/26603875\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\n\t}\n\n\tvar blob = new Blob([css], { type: \"text/css\" });\n\n\tvar oldSrc = link.href;\n\n\tlink.href = URL.createObjectURL(blob);\n\n\tif(oldSrc) URL.revokeObjectURL(oldSrc);\n}\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/style-loader/lib/addStyles.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n/**\n * When source maps are enabled, `style-loader` uses a link element with a data-uri to\n * embed the css on the page. This breaks all relative urls because now they are relative to a\n * bundle instead of the current page.\n *\n * One solution is to only use full urls, but that may be impossible.\n *\n * Instead, this function \"fixes\" the relative urls to be absolute according to the current page location.\n *\n * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.\n *\n */\n\nmodule.exports = function (css) {\n  // get current location\n  var location = typeof window !== \"undefined\" && window.location;\n\n  if (!location) {\n    throw new Error(\"fixUrls requires window.location\");\n  }\n\n\t// blank or null?\n\tif (!css || typeof css !== \"string\") {\n\t  return css;\n  }\n\n  var baseUrl = location.protocol + \"//\" + location.host;\n  var currentDir = baseUrl + location.pathname.replace(/\\/[^\\/]*$/, \"/\");\n\n\t// convert each url(...)\n\t/*\n\tThis regular expression is just a way to recursively match brackets within\n\ta string.\n\n\t /url\\s*\\(  = Match on the word \"url\" with any whitespace after it and then a parens\n\t   (  = Start a capturing group\n\t     (?:  = Start a non-capturing group\n\t         [^)(]  = Match anything that isn't a parentheses\n\t         |  = OR\n\t         \\(  = Match a start parentheses\n\t             (?:  = Start another non-capturing groups\n\t                 [^)(]+  = Match anything that isn't a parentheses\n\t                 |  = OR\n\t                 \\(  = Match a start parentheses\n\t                     [^)(]*  = Match anything that isn't a parentheses\n\t                 \\)  = Match a end parentheses\n\t             )  = End Group\n              *\\) = Match anything and then a close parens\n          )  = Close non-capturing group\n          *  = Match anything\n       )  = Close capturing group\n\t \\)  = Match a close parens\n\n\t /gi  = Get all matches, not the first.  Be case insensitive.\n\t */\n\tvar fixedCss = css.replace(/url\\s*\\(((?:[^)(]|\\((?:[^)(]+|\\([^)(]*\\))*\\))*)\\)/gi, function(fullMatch, origUrl) {\n\t\t// strip quotes (if they exist)\n\t\tvar unquotedOrigUrl = origUrl\n\t\t\t.trim()\n\t\t\t.replace(/^\"(.*)\"$/, function(o, $1){ return $1; })\n\t\t\t.replace(/^'(.*)'$/, function(o, $1){ return $1; });\n\n\t\t// already a full url? no change\n\t\tif (/^(#|data:|http:\\/\\/|https:\\/\\/|file:\\/\\/\\/|\\s*$)/i.test(unquotedOrigUrl)) {\n\t\t  return fullMatch;\n\t\t}\n\n\t\t// convert the url to a full url\n\t\tvar newUrl;\n\n\t\tif (unquotedOrigUrl.indexOf(\"//\") === 0) {\n\t\t  \t//TODO: should we add protocol?\n\t\t\tnewUrl = unquotedOrigUrl;\n\t\t} else if (unquotedOrigUrl.indexOf(\"/\") === 0) {\n\t\t\t// path should be relative to the base url\n\t\t\tnewUrl = baseUrl + unquotedOrigUrl; // already starts with '/'\n\t\t} else {\n\t\t\t// path should be relative to current directory\n\t\t\tnewUrl = currentDir + unquotedOrigUrl.replace(/^\\.\\//, \"\"); // Strip leading './'\n\t\t}\n\n\t\t// send back the fixed url(...)\n\t\treturn \"url(\" + JSON.stringify(newUrl) + \")\";\n\t});\n\n\t// send back the fixed css\n\treturn fixedCss;\n};\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/style-loader/lib/urls.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!************************************************!*\
  !*** ./node_modules/webpack/buildin/global.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/webpack/buildin/global.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!************************************************!*\
  !*** ./node_modules/webpack/buildin/module.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\n\tif (!module.webpackPolyfill) {\n\t\tmodule.deprecate = function() {};\n\t\tmodule.paths = [];\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/webpack/buildin/module.js?");

/***/ }),

/***/ "./src/OverlayRenderer.jsx":
/*!*********************************!*\
  !*** ./src/OverlayRenderer.jsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _components_LayerRenderer_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/LayerRenderer.jsx */ \"./src/components/LayerRenderer.jsx\");\n/* harmony import */ var _components_Elements_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/Elements.jsx */ \"./src/components/Elements.jsx\");\n/* harmony import */ var _shared_ScriptingContext_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./shared/ScriptingContext.js */ \"./src/shared/ScriptingContext.js\");\n\n\n\n\n\n\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\n\n\n\n\n\nvar OverlayRenderer = /*#__PURE__*/function (_React$Component) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(OverlayRenderer, _React$Component);\n\n  var _super = _createSuper(OverlayRenderer);\n\n  function OverlayRenderer(props) {\n    var _this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, OverlayRenderer);\n\n    _this = _super.call(this, props); // props.id\n    // props.overlay\n    // props.zIndex\n    // props.hidden\n    // props.wireframeMode\n    // props.elements\n    // props.elementProps\n    // if an id is not provided, generate one\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), \"_scriptingContext\", new _shared_ScriptingContext_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]({\n      onUpdated: function onUpdated() {\n        _this.forceUpdate();\n      }\n    }));\n\n    var id = _this.props.id || Math.random().toString(); // merge elements\n\n    var elements = _objectSpread({}, _components_Elements_jsx__WEBPACK_IMPORTED_MODULE_9__[\"default\"].Builtin);\n\n    if (_this.props.elements) {\n      Object.assign(elements, _this.props.elements);\n    }\n\n    _this.state = {\n      id: id,\n      elements: elements\n    };\n    return _this;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(OverlayRenderer, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      if (this.props.script && !this.props.hidden) {\n        this._scriptingContext.execute(this.props.overlay);\n      }\n    }\n  }, {\n    key: \"componentDidUpdate\",\n    value: function componentDidUpdate(prevProps) {\n      // execute scripts when the overlay is hidden/shown\n      if (this.props.overlay.script && this.props.hidden != prevProps.hidden) {\n        if (this.props.hidden) {\n          this._scriptingContext.reset();\n\n          this.forceUpdate();\n        } else {\n          this._scriptingContext.execute(this.props.overlay);\n        }\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      // default the z-index to 10000\n      var zIndex = this.props.zIndex == null ? 10000 : this.props.zIndex; // use the script context's layers if it has them\n\n      var layers = this._scriptingContext.hasModifiedLayers ? this._scriptingContext.layers : this.props.overlay.layers;\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_components_LayerRenderer_jsx__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n        id: this.state.id,\n        elements: this.state.elements,\n        elementProps: _objectSpread({\n          assets: this.props.overlay.assets\n        }, this.props.elementProps || {}),\n        layers: layers,\n        zIndex: zIndex,\n        hidden: this.props.hidden,\n        scriptingContext: this._scriptingContext,\n        runScriptsOnShow: true,\n        wireframeMode: this.props.wireframeMode\n      });\n    }\n  }]);\n\n  return OverlayRenderer;\n}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (OverlayRenderer);\n\n//# sourceURL=webpack://%5Bname%5D/./src/OverlayRenderer.jsx?");

/***/ }),

/***/ "./src/components/Elements.jsx":
/*!*************************************!*\
  !*** ./src/components/Elements.jsx ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);\n\n\n\n\n\n\n\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\n\n\nvar RectangleElement = /*#__PURE__*/function (_React$Component) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(RectangleElement, _React$Component);\n\n  var _super = _createSuper(RectangleElement);\n\n  function RectangleElement() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, RectangleElement);\n\n    return _super.apply(this, arguments);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(RectangleElement, [{\n    key: \"render\",\n    value: function render() {\n      var style = Object.assign({}, {\n        height: \"100%\",\n        width: \"100%\"\n      });\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"div\", {\n        style: style\n      });\n    }\n  }]);\n\n  return RectangleElement;\n}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);\n\n_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(RectangleElement, \"manifest\", {\n  name: \"Rectangle\",\n  author: \"SCI\",\n  description: \"A customizable rectangle.\",\n  width: 640,\n  height: 360,\n  preserveAspect: false,\n  parameters: [],\n  defaultEffects: {\n    \"backgroundColor\": {\n      \"color\": \"#fff\"\n    }\n  }\n});\n\nvar KnockoutElement = /*#__PURE__*/function (_React$Component2) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(KnockoutElement, _React$Component2);\n\n  var _super2 = _createSuper(KnockoutElement);\n\n  function KnockoutElement() {\n    var _this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, KnockoutElement);\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    _this = _super2.call.apply(_super2, [this].concat(args));\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), \"_knockoutId\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), \"_lastRect\", void 0);\n\n    return _this;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(KnockoutElement, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      /*\r\n      this.props.scriptContext.emit(this.props.layer.id, \"set-knockout\", null);\r\n      this.props.scriptContext.on(\"whatever\", (data) => {\r\n        });\r\n        on(\"whatever\", () => {\r\n          console.log\r\n      });\r\n      */\n      this._knockoutId = this.props.onRegisterKnockout();\n      this.props.onUpdateKnockout(this._knockoutId, this.buildPathString(this.props.layer, this.props.radius));\n      this._lastRect = {\n        top: this.props.layer.top,\n        left: this.props.layer.left,\n        width: this.props.layer.width,\n        height: this.props.layer.height,\n        radius: this.props.radius\n      };\n    }\n  }, {\n    key: \"shouldComponentUpdate\",\n    value: function shouldComponentUpdate(nextProps, nextState) {\n      var needsUpdate = false;\n\n      if (nextProps.layer.top != this._lastRect.top) {\n        needsUpdate = true;\n        this._lastRect.top = nextProps.layer.top;\n      }\n\n      if (nextProps.layer.left != this._lastRect.left) {\n        needsUpdate = true;\n        this._lastRect.left = nextProps.layer.left;\n      }\n\n      if (nextProps.layer.width != this._lastRect.width) {\n        needsUpdate = true;\n        this._lastRect.width = nextProps.layer.width;\n      }\n\n      if (nextProps.layer.height != this._lastRect.height) {\n        needsUpdate = true;\n        this._lastRect.height = nextProps.layer.height;\n      }\n\n      if (nextProps.radius != this._lastRect.radius) {\n        needsUpdate = true;\n        this._lastRect.radius = nextProps.radius;\n      }\n\n      if (needsUpdate) {\n        this.props.onUpdateKnockout(this._knockoutId, this.buildPathString(nextProps.layer, nextProps.radius));\n      } // we'll never need to render anything\n\n\n      return false;\n    }\n  }, {\n    key: \"componentWillUnmount\",\n    value: function componentWillUnmount() {\n      this.props.onRemoveKnockout(this._knockoutId);\n    }\n  }, {\n    key: \"buildPathString\",\n    value: function buildPathString(layer, radius) {\n      var intRadius;\n\n      if (radius != null && radius.length > 0) {\n        intRadius = parseInt(radius);\n      }\n\n      if (intRadius && !isNaN(intRadius)) {\n        // clamp to max out at half width/height\n        intRadius = Math.min(Math.min(intRadius, layer.height / 2), layer.width / 2);\n        return \"M\".concat(layer.left, \" \").concat(layer.top + intRadius, \" L\").concat(layer.left, \" \").concat(layer.top + layer.height - intRadius, \" A\").concat(intRadius, \" \").concat(intRadius, \" 90 0 0 \").concat(layer.left + intRadius, \" \").concat(layer.top + layer.height, \" L\").concat(layer.left + layer.width - intRadius, \" \").concat(layer.top + layer.height, \" A\").concat(intRadius, \" \").concat(intRadius, \" 90 0 0 \").concat(layer.left + layer.width, \" \").concat(layer.top + layer.height - intRadius, \" L\").concat(layer.left + layer.width, \" \").concat(layer.top + intRadius, \" A\").concat(intRadius, \" \").concat(intRadius, \" 90 0 0 \").concat(layer.left + layer.width - intRadius, \" \").concat(layer.top, \" L\").concat(layer.left + intRadius, \" \").concat(layer.top, \" A\").concat(intRadius, \" \").concat(intRadius, \" 90 0 0 \").concat(layer.left, \" \").concat(layer.top + intRadius);\n      } else {\n        return \"M\".concat(layer.left, \" \").concat(layer.top, \" L\").concat(layer.left, \" \").concat(layer.top + layer.height, \" L\").concat(layer.left + layer.width, \" \").concat(layer.top + layer.height, \" L\").concat(layer.left + layer.width, \" \").concat(layer.top, \" L\").concat(layer.left, \" \").concat(layer.top);\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return null;\n    }\n  }]);\n\n  return KnockoutElement;\n}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);\n\n_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(KnockoutElement, \"manifest\", {\n  name: \"Knockout\",\n  author: \"SCI\",\n  description: \"A customizable knockout area.\",\n  width: 400,\n  height: 400,\n  preserveAspect: false,\n  parameters: [{\n    \"name\": \"radius\",\n    \"displayName\": \"Corner Radius\",\n    \"type\": \"text\"\n  }]\n});\n\nvar TextElement = /*#__PURE__*/function (_React$Component3) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(TextElement, _React$Component3);\n\n  var _super3 = _createSuper(TextElement);\n\n  function TextElement(props) {\n    var _this2;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, TextElement);\n\n    _this2 = _super3.call(this, props);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this2), \"valignToAlignItems\", function (valign) {\n      if (valign == \"top\") {\n        return \"flex-start\";\n      }\n\n      if (valign == \"center\") {\n        return \"center\";\n      }\n\n      if (valign == \"bottom\") {\n        return \"flex-end\";\n      }\n\n      return null;\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this2), \"textAlignToJustifyContent\", function (textAlign) {\n      if (textAlign == \"left\") {\n        return \"flex-start\";\n      }\n\n      if (textAlign == \"center\") {\n        return \"center\";\n      }\n\n      if (textAlign == \"right\") {\n        return \"flex-end\";\n      }\n\n      return null;\n    });\n\n    return _this2;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(TextElement, [{\n    key: \"render\",\n    value: function render() {\n      var style = Object.assign({}, this.props.font, {\n        height: \"100%\",\n        width: \"100%\",\n        overflow: \"hidden\",\n        display: \"flex\",\n        whiteSpace: this.props.wrap ? \"pre-wrap\" : \"pre\",\n        alignItems: this.valignToAlignItems(this.props.valign),\n        justifyContent: this.textAlignToJustifyContent(this.props.font.textAlign)\n      });\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"div\", {\n        style: style\n      }, this.props.text);\n    }\n  }]);\n\n  return TextElement;\n}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);\n\n_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(TextElement, \"manifest\", {\n  name: \"Text\",\n  author: \"SCI\",\n  description: \"A customizable text element.\",\n  width: 400,\n  height: 400,\n  preserveAspect: false,\n  parameters: [{\n    \"name\": \"text\",\n    \"displayName\": \"Text\",\n    \"type\": \"textarea\",\n    \"defaultValue\": \"text\"\n  }, {\n    \"name\": \"font\",\n    \"displayName\": \"Font\",\n    \"type\": \"font\",\n    \"defaultValue\": {\n      \"fontFamily\": \"Arial\",\n      \"fontSize\": \"144pt\",\n      \"color\": \"rgba(255,255,255,1)\"\n    }\n  }, {\n    \"name\": \"wrap\",\n    \"displayName\": \"Wrapping\",\n    \"type\": \"checkbox\",\n    \"defaultValue\": false\n  }, {\n    \"name\": \"valign\",\n    \"displayName\": \"Vertical Align\",\n    \"type\": \"valign\",\n    \"defaultValue\": \"flex-start\"\n  }]\n});\n\nvar EllipseElement = /*#__PURE__*/function (_React$Component4) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(EllipseElement, _React$Component4);\n\n  var _super4 = _createSuper(EllipseElement);\n\n  function EllipseElement() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, EllipseElement);\n\n    return _super4.apply(this, arguments);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(EllipseElement, [{\n    key: \"render\",\n    value: function render() {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"svg\", {\n        style: {\n          height: \"100%\",\n          width: \"100%\"\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"ellipse\", {\n        cx: \"50%\",\n        cy: \"50%\",\n        rx: \"50%\",\n        ry: \"50%\",\n        fill: this.props.fill\n      }));\n    }\n  }]);\n\n  return EllipseElement;\n}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);\n\n_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(EllipseElement, \"manifest\", {\n  name: \"Ellipse\",\n  author: \"SCI\",\n  description: \"A customizable ellipse or circle.\",\n  width: 400,\n  height: 400,\n  preserveAspect: false,\n  parameters: [{\n    \"name\": \"fill\",\n    \"type\": \"color\",\n    \"displayName\": \"Fill Color\",\n    \"defaultValue\": \"#FF0000\"\n  }]\n});\n\nvar ImageElement = /*#__PURE__*/function (_React$Component5) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(ImageElement, _React$Component5);\n\n  var _super5 = _createSuper(ImageElement);\n\n  function ImageElement(props) {\n    var _this3;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, ImageElement);\n\n    _this3 = _super5.call(this, props);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this3), \"getSource\", function () {\n      if (!_this3.props.url) {\n        return \"\";\n      }\n\n      if (_this3.props.assets && _this3.props.url.startsWith(\"asset:\")) {\n        var assetKey = _this3.props.url.substr(6);\n\n        return _this3.props.assets[assetKey] || \"\";\n      }\n\n      return _this3.props.url;\n    });\n\n    _this3.state = {\n      source: _this3.getSource(),\n      preloaded: false\n    };\n    return _this3;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(ImageElement, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      var _this4 = this;\n\n      new Promise(function (resolve, reject) {\n        var img = new Image();\n        img.addEventListener(\"load\", resolve);\n        img.addEventListener(\"error\", resolve);\n        img.addEventListener(\"abort\", resolve);\n        img.src = _this4.state.source;\n      }).then(function () {\n        _this4.setState({\n          preloaded: true\n        });\n      })[\"catch\"](function (err) {\n        _this4.setState({\n          preloaded: true\n        });\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      if (!this.state.preloaded) {\n        return null;\n      }\n\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"img\", {\n        src: this.state.source,\n        style: {\n          \"height\": \"100%\",\n          \"width\": \"100%\",\n          \"objectFit\": this.props.fit,\n          \"objectPosition\": this.props.offset\n        }\n      });\n    }\n  }]);\n\n  return ImageElement;\n}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);\n\n_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(ImageElement, \"manifest\", {\n  name: \"Image\",\n  author: \"SCI\",\n  description: \"A customizable image.\",\n  width: 400,\n  height: 400,\n  preserveAspect: true,\n  parameters: [{\n    \"name\": \"url\",\n    \"displayName\": \"Url\",\n    \"type\": \"text\"\n  }, {\n    \"name\": \"fit\",\n    \"displayName\": \"Fit\",\n    \"type\": \"select\",\n    \"defaultValue\": \"cover\",\n    \"options\": [{\n      label: \"Contain\",\n      value: \"contain\"\n    }, {\n      label: \"Cover\",\n      value: \"cover\"\n    }, {\n      label: \"Fill\",\n      value: \"fill\"\n    }]\n  }, {\n    \"name\": \"offset\",\n    \"displayName\": \"Offset\",\n    \"type\": \"text\"\n  }]\n});\n\nvar VideoElement = /*#__PURE__*/function (_React$Component6) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(VideoElement, _React$Component6);\n\n  var _super6 = _createSuper(VideoElement);\n\n  function VideoElement(props) {\n    var _this5;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, VideoElement);\n\n    _this5 = _super6.call(this, props);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this5), \"_vidRef\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this5), \"getSource\", function () {\n      if (!_this5.props.url) {\n        return \"\";\n      }\n\n      if (_this5.props.assets && _this5.props.url.startsWith(\"asset:\")) {\n        var assetKey = _this5.props.url.substr(6);\n\n        return _this5.props.assets[assetKey] || \"\";\n      }\n\n      return _this5.props.url;\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this5), \"onLoadedData\", function (evt) {\n      _this5.setState({\n        preloaded: true\n      });\n\n      if (_this5.props.playing) {\n        _this5._vidRef.current.play()[\"catch\"](function (err) {\n          // videos can fail to play if the user doesn't interact with the document.\n          // not a big deal for the renderer, but we'll log to the console\n          console.log(err.message);\n        });\n      }\n    });\n\n    _this5._vidRef = react__WEBPACK_IMPORTED_MODULE_7___default.a.createRef();\n    _this5.state = {\n      source: _this5.getSource(),\n      preloaded: false\n    };\n    return _this5;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(VideoElement, [{\n    key: \"componentDidUpdate\",\n    value: function componentDidUpdate(prevProps) {\n      var newShouldPlay = this.props.playing && !(this.props.container && this.props.container.hidden) && !this.props.hidden;\n      var oldShouldPlay = prevProps.playing && !(prevProps.container && prevProps.container.hidden) && !prevProps.hidden;\n\n      if (newShouldPlay != oldShouldPlay) {\n        this._vidRef.current.currentTime = 0;\n        if (newShouldPlay) this._vidRef.current.play();else this._vidRef.current.pause();\n      }\n\n      if (prevProps.url != this.props.url) {\n        this._vidRef.current.load();\n      }\n\n      this._vidRef.current.volume = (this.props.volume != null ? this.props.volume : 100) / 100;\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var style = {\n        \"height\": \"100%\",\n        \"width\": \"100%\",\n        \"objectFit\": this.props.fit,\n        \"objectPosition\": this.props.offset,\n        \"opacity\": this.state.preloaded ? 1 : 0\n      };\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"video\", {\n        ref: this._vidRef,\n        onLoadedData: this.onLoadedData,\n        loop: this.props.loop,\n        style: style\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"source\", {\n        src: this.state.source\n      }));\n    }\n  }]);\n\n  return VideoElement;\n}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);\n\n_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(VideoElement, \"manifest\", {\n  name: \"Video\",\n  author: \"SCI\",\n  description: \"A customizable video player.\",\n  width: 1280,\n  height: 720,\n  preserveAspect: true,\n  parameters: [{\n    \"name\": \"url\",\n    \"displayName\": \"Url\",\n    \"type\": \"text\"\n  }, {\n    \"name\": \"playing\",\n    \"type\": \"checkbox\",\n    \"displayName\": \"Playing\",\n    \"defaultValue\": true\n  }, {\n    \"name\": \"loop\",\n    \"type\": \"checkbox\",\n    \"displayName\": \"Loop\",\n    \"defaultValue\": false\n  }, {\n    \"name\": \"volume\",\n    \"type\": \"slider\",\n    \"displayName\": \"Volume\",\n    \"defaultValue\": 100\n  }, {\n    \"name\": \"fit\",\n    \"displayName\": \"Fit\",\n    \"type\": \"select\",\n    \"defaultValue\": \"cover\",\n    \"options\": [{\n      label: \"Contain\",\n      value: \"contain\"\n    }, {\n      label: \"Cover\",\n      value: \"cover\"\n    }, {\n      label: \"Fill\",\n      value: \"fill\"\n    }]\n  }, {\n    \"name\": \"offset\",\n    \"displayName\": \"Offset\",\n    \"type\": \"text\"\n  }]\n});\n\nvar AudioElement = /*#__PURE__*/function (_React$Component7) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(AudioElement, _React$Component7);\n\n  var _super7 = _createSuper(AudioElement);\n\n  function AudioElement(props) {\n    var _this6;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, AudioElement);\n\n    _this6 = _super7.call(this, props);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this6), \"_audioRef\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this6), \"getSource\", function () {\n      if (!_this6.props.url) {\n        return \"\";\n      }\n\n      if (_this6.props.assets && _this6.props.url.startsWith(\"asset:\")) {\n        var assetKey = _this6.props.url.substr(6);\n\n        return _this6.props.assets[assetKey] || \"\";\n      }\n\n      return _this6.props.url;\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this6), \"onLoadedData\", function (evt) {\n      _this6.setState({\n        preloaded: true\n      });\n\n      if (_this6.props.playing) {\n        _this6._audioRef.current.play()[\"catch\"](function (err) {\n          // videos can fail to play if the user doesn't interact with the document.\n          // not a big deal, but we'll log to the console\n          console.log(err.message);\n        });\n      }\n    });\n\n    _this6._audioRef = react__WEBPACK_IMPORTED_MODULE_7___default.a.createRef();\n    _this6.state = {\n      source: _this6.getSource(),\n      preloaded: false\n    };\n    return _this6;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(AudioElement, [{\n    key: \"shouldComponentUpdate\",\n    value: function shouldComponentUpdate(nextProps) {\n      if (this.props.playing != nextProps.playing) {\n        if (nextProps.playing || nextProps.playing == undefined) this._audioRef.current.play();else this._audioRef.current.pause();\n      }\n\n      if (this.props.url != nextProps.url) {\n        this._audioRef.current.load();\n      }\n\n      return true;\n    }\n  }, {\n    key: \"componentDidUpdate\",\n    value: function componentDidUpdate() {\n      this._audioRef.current.volume = (this.props.volume != null ? this.props.volume : 100) / 100;\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"audio\", {\n        ref: this._audioRef,\n        onLoadedData: this.onLoadedData,\n        loop: this.props.loop\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"source\", {\n        src: this.state.source\n      }));\n    }\n  }]);\n\n  return AudioElement;\n}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);\n\n_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(AudioElement, \"manifest\", {\n  name: \"Audio\",\n  author: \"SCI\",\n  description: \"A customizable audio player.\",\n  nonVisual: true,\n  parameters: [{\n    \"name\": \"url\",\n    \"displayName\": \"Url\",\n    \"type\": \"text\"\n  }, {\n    \"name\": \"playing\",\n    \"type\": \"checkbox\",\n    \"displayName\": \"Playing\",\n    \"defaultValue\": true\n  }, {\n    \"name\": \"loop\",\n    \"type\": \"checkbox\",\n    \"displayName\": \"Loop\",\n    \"defaultValue\": false\n  }, {\n    \"name\": \"volume\",\n    \"type\": \"slider\",\n    \"displayName\": \"Volume\",\n    \"defaultValue\": 100\n  }]\n});\n\nvar IFrameElement = /*#__PURE__*/function (_React$Component8) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(IFrameElement, _React$Component8);\n\n  var _super8 = _createSuper(IFrameElement);\n\n  function IFrameElement() {\n    var _this7;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, IFrameElement);\n\n    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n      args[_key2] = arguments[_key2];\n    }\n\n    _this7 = _super8.call.apply(_super8, [this].concat(args));\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this7), \"getSource\", function () {\n      if (!_this7.props.url) {\n        return \"\";\n      }\n\n      if (_this7.props.assets && _this7.props.url.startsWith(\"asset:\")) {\n        var assetKey = _this7.props.url.substr(6);\n\n        return _this7.props.assets[assetKey] || \"\";\n      }\n\n      return _this7.props.url;\n    });\n\n    return _this7;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(IFrameElement, [{\n    key: \"render\",\n    value: function render() {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"iframe\", {\n        src: this.getSource(),\n        style: {\n          \"border\": \"0\",\n          height: \"100%\",\n          width: \"100%\"\n        }\n      });\n    }\n  }]);\n\n  return IFrameElement;\n}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);\n\n_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(IFrameElement, \"manifest\", {\n  name: \"Iframe\",\n  author: \"SCI\",\n  description: \"A customizable iframe.\",\n  width: 1280,\n  height: 720,\n  preserveAspect: false,\n  parameters: [{\n    \"name\": \"url\",\n    \"type\": \"text\",\n    \"displayName\": \"Url\"\n  }]\n});\n\nvar YoutubeElement = /*#__PURE__*/function (_React$Component9) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(YoutubeElement, _React$Component9);\n\n  var _super9 = _createSuper(YoutubeElement);\n\n  function YoutubeElement(_props) {\n    var _this8;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, YoutubeElement);\n\n    _this8 = _super9.call(this, _props);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this8), \"_queuedOperations\", {\n      playing: []\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this8), \"_targetRef\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this8), \"onStateChange\", function (evt) {\n      var playerState = evt.data;\n\n      if (playerState == 1) {\n        // playing, paused, buffering respectively\n        while (_this8._queuedOperations.playing.length > 0) {\n          _this8._queuedOperations.playing.splice(0, 1)[0]();\n        }\n      }\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this8), \"updatePlayerState\", function (lastProps, nextProps) {\n      if (nextProps.url != lastProps.url) {\n        var url = _this8.getYoutubeUrl(nextProps);\n\n        _this8._player.loadVideoByUrl(url);\n\n        _this8._queuedOperations.playing.push(function () {\n          _this8._player.seekTo(0);\n        });\n      }\n\n      if (nextProps.url != lastProps.url || nextProps.start != lastProps.start) {\n        var playerState = _this8._player.getPlayerState();\n\n        if (playerState == 1 || playerState == -1) {\n          // playing or paused, respectively\n          _this8._player.seekTo(nextProps.start);\n        } else {\n          _this8._queuedOperations.playing.push(function () {\n            _this8._player.seekTo(nextProps.start);\n          });\n        }\n      }\n\n      if (nextProps.playing != lastProps.playing) {\n        if (nextProps.playing) _this8._player.playVideo();else _this8._player.pauseVideo();\n      }\n\n      if (nextProps.volume != lastProps.volume) {\n        _this8._player.setVolume(nextProps.volume);\n      }\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this8), \"getYoutubeUrl\", function (props) {\n      if (!props.url) {\n        return \"\";\n      }\n\n      var match = props.url.match(YoutubeElement.URL_REGEX);\n\n      if (match == null || match.length < 2 || match[1].length == 0) {\n        return \"\";\n      }\n\n      var videoId = match[1];\n      return \"http://www.youtube.com/v/\".concat(videoId, \"?version=3\");\n    });\n\n    _this8._targetRef = react__WEBPACK_IMPORTED_MODULE_7___default.a.createRef();\n\n    if (!window.onYouTubeIframeAPIReadyPromise) {\n      window.onYouTubeIframeAPIReadyPromise = new Promise(function (resolve) {\n        if (window.YT) {\n          resolve();\n          return;\n        }\n\n        var $script = document.createElement(\"script\");\n        $script.type = \"text/javascript\";\n        $script.src = \"https://www.youtube.com/iframe_api\";\n        document.head.append($script);\n        window.onYouTubeIframeAPIReady = resolve;\n      });\n    }\n\n    return _this8;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(YoutubeElement, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      var _this9 = this;\n\n      var self = this;\n      window.onYouTubeIframeAPIReadyPromise.then(function () {\n        var player = new YT.Player(_this9._targetRef.current, {\n          width: \"100%\",\n          height: \"100%\",\n          playerVars: {\n            'controls': 0,\n            'modestbranding': 1\n          },\n          events: {\n            onReady: function onReady(evt) {\n              self.updatePlayerState({}, self.props);\n            },\n            onStateChange: self.onStateChange\n          }\n        });\n        _this9._player = player;\n      });\n    }\n  }, {\n    key: \"shouldComponentUpdate\",\n    value: function shouldComponentUpdate(nextProps, nextState) {\n      this.updatePlayerState(this.props, nextProps);\n      return true;\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_7___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"div\", {\n        style: {\n          position: \"absolute\",\n          top: 0,\n          left: 0,\n          width: \"100%\",\n          height: \"100%\"\n        }\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"div\", {\n        style: {\n          overflow: \"hidden\",\n          height: \"100%\",\n          width: \"100%\",\n          display: this.props.url != null && this.props.url.length > 0 ? \"block\" : \"none\"\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"div\", {\n        ref: this._targetRef\n      })));\n    }\n  }]);\n\n  return YoutubeElement;\n}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);\n\n_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(YoutubeElement, \"manifest\", {\n  name: \"Youtube\",\n  author: \"SCI\",\n  description: \"A customizable YouTube player.\",\n  width: 1280,\n  height: 720,\n  preserveAspect: true,\n  parameters: [{\n    \"name\": \"url\",\n    \"type\": \"text\",\n    \"displayName\": \"Url\",\n    \"inline\": 78\n  }, {\n    \"name\": \"start\",\n    \"type\": \"text\",\n    \"displayName\": \"Start (s)\",\n    \"inline\": 20\n  }, {\n    \"name\": \"volume\",\n    \"type\": \"slider\",\n    \"displayName\": \"Volume\",\n    \"defaultValue\": 100,\n    \"inline\": 70\n  }, {\n    \"name\": \"playing\",\n    \"type\": \"checkbox\",\n    \"displayName\": \"Playing\",\n    \"defaultValue\": true,\n    \"inline\": 20,\n    \"compact\": false\n  }]\n});\n\n_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(YoutubeElement, \"URL_REGEX\", /.*(?:www\\.youtube\\.com\\/(?:(?:watch\\?v=)|(?:embed\\/))|(?:youtu\\.be\\/))([a-z0-9]+)(?:\\?(?:(?:t)|(?:start))=(\\d+))?/i);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  Builtin: {\n    \"rectangle\": RectangleElement,\n    \"text\": TextElement,\n    \"ellipse\": EllipseElement,\n    \"image\": ImageElement,\n    \"video\": VideoElement,\n    \"audio\": AudioElement,\n    \"knockout\": KnockoutElement,\n    \"iframe\": IFrameElement,\n    \"youtube\": YoutubeElement\n  }\n});\n\n//# sourceURL=webpack://%5Bname%5D/./src/components/Elements.jsx?");

/***/ }),

/***/ "./src/components/LayerRenderer.css":
/*!******************************************!*\
  !*** ./src/components/LayerRenderer.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./LayerRenderer.css */ \"./node_modules/css-loader/dist/cjs.js!./src/components/LayerRenderer.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack://%5Bname%5D/./src/components/LayerRenderer.css?");

/***/ }),

/***/ "./src/components/LayerRenderer.jsx":
/*!******************************************!*\
  !*** ./src/components/LayerRenderer.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return LayerRenderer; });\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\");\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _shared_effects_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/effects.js */ \"./src/shared/effects.js\");\n/* harmony import */ var _LayerRenderer_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./LayerRenderer.css */ \"./src/components/LayerRenderer.css\");\n/* harmony import */ var _LayerRenderer_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_LayerRenderer_css__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _shared_AnimationHelper_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../shared/AnimationHelper.js */ \"./src/shared/AnimationHelper.js\");\n/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! memoize-one */ \"./node_modules/memoize-one/dist/memoize-one.esm.js\");\n/* harmony import */ var _shared_FontLoader_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../shared/FontLoader.js */ \"./src/shared/FontLoader.js\");\n\n\n\n\n\n\n\n\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\n\n\n\n\n\nfunction transformsListToString(list) {\n  var finalTransform = {};\n\n  var _iterator = _createForOfIteratorHelper(list),\n      _step;\n\n  try {\n    for (_iterator.s(); !(_step = _iterator.n()).done;) {\n      var transform = _step.value;\n\n      for (var _i = 0, _Object$entries = Object.entries(transform); _i < _Object$entries.length; _i++) {\n        var _Object$entries$_i = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_8___default()(_Object$entries[_i], 2),\n            key = _Object$entries$_i[0],\n            value = _Object$entries$_i[1];\n\n        switch (key) {\n          case \"rotate\":\n          case \"translate\":\n            // rotate and translate are 3d vectors that get added\n            if (!finalTransform[key]) {\n              finalTransform[key] = [0, 0, 0];\n            }\n\n            finalTransform[key][0] += value[0];\n            finalTransform[key][1] += value[1];\n            finalTransform[key][2] += value[2];\n            break;\n\n          default:\n            finalTransform[key] = value;\n          // overwrite as the default\n        }\n      }\n    }\n  } catch (err) {\n    _iterator.e(err);\n  } finally {\n    _iterator.f();\n  }\n\n  var returnVal = \"\";\n  if (finalTransform.perspective != undefined) returnVal += \" perspective(\".concat(finalTransform.perspective, \"px)\");\n  if (finalTransform.rotate) returnVal += \" rotateX(\".concat(finalTransform.rotate[0], \"deg) rotateY(\").concat(finalTransform.rotate[1], \"deg) rotateZ(\").concat(finalTransform.rotate[2], \"deg)\");\n  if (finalTransform.translate) returnVal += \" translate3d(\".concat(finalTransform.translate[0], \"px,\").concat(finalTransform.translate[1], \"px,\").concat(finalTransform.translate[2], \"px)\");\n  if (finalTransform.translateZ != undefined) returnVal += \" translateZ(\".concat(finalTransform.translateZ, \"px)\");\n  return returnVal;\n}\n\nfunction animationsListToString(list) {\n  var animations = [];\n\n  var _iterator2 = _createForOfIteratorHelper(list),\n      _step2;\n\n  try {\n    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n      var item = _step2.value;\n      // ensure keyframes are loaded\n      _shared_AnimationHelper_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"].ensureKeyframes(item.name, item.keyframes, item.overwrite); // apply defaults\n\n      if (item.duration == undefined) {\n        item.duration = \"500\";\n      }\n\n      if (item.timing == undefined) {\n        item.timing = \"ease\";\n      }\n\n      if (item.delay == undefined) {\n        item.delay = \"0\";\n      }\n\n      if (item.iterations == undefined) {\n        item.iterations = \"1\";\n      }\n\n      if (item.direction == undefined) {\n        item.direction = \"normal\";\n      }\n\n      animations.push(\"\".concat(item.name, \" \").concat(item.duration, \"ms \").concat(item.timing, \" \").concat(item.delay, \"ms \").concat(item.iterations, \" \").concat(item.direction, \" both\"));\n    }\n  } catch (err) {\n    _iterator2.e(err);\n  } finally {\n    _iterator2.f();\n  }\n\n  return animations.join(\",\");\n}\n\nfunction maxEffectDurationReducer(a, c) {\n  var duration = parseInt(c.duration || 0) + parseInt(c.delay || 0);\n  return a < duration ? duration : a;\n}\n\nvar DISPLAY_PHASE = {\n  ENTERING: \"entering\",\n  VISIBLE: \"visible\",\n  EXITING: \"exiting\",\n  HIDDEN: \"hidden\",\n  STATIC: \"static\"\n};\n\nvar Layer = /*#__PURE__*/function (_React$PureComponent) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Layer, _React$PureComponent);\n\n  var _super = _createSuper(Layer);\n\n  function Layer(props) {\n    var _this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Layer);\n\n    _this = _super.call(this, props); // props.layer\n    // props.element\n    // props.elementProps\n    // props.index\n    // props.forcePhase\n    // props.zIndex\n    // props.scriptingContext\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), \"_phaseChangeTimeout\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), \"computeEffectsMemoized\", Object(memoize_one__WEBPACK_IMPORTED_MODULE_13__[\"default\"])(function (layer) {\n      var position = {\n        top: layer.top + \"px\",\n        left: layer.left + \"px\",\n        height: layer.height + \"px\",\n        width: layer.width + \"px\",\n        transition: layer.transition\n      }; // if a style is set, override\n\n      if (layer.style) position = _objectSpread({}, position);\n\n      var style = _objectSpread({}, layer.style);\n\n      var transforms = [];\n      var entranceAnimations = [];\n      var standardAnimations = [];\n      var exitAnimations = [];\n      if (layer.rotation) transforms.push({\n        rotate: [0, 0, layer.rotation]\n      });\n\n      if (layer.effects) {\n        Object.entries(layer.effects).forEach(function (_ref) {\n          var _ref2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_8___default()(_ref, 2),\n              effectName = _ref2[0],\n              config = _ref2[1];\n\n          var effect = _shared_effects_js__WEBPACK_IMPORTED_MODULE_10__[\"effects\"][effectName];\n\n          if (!effect) {\n            return;\n          }\n\n          switch (effect.type) {\n            case \"style\":\n              effect.apply(style, config, layer);\n              break;\n\n            case \"transform\":\n              effect.apply(transforms, config, layer);\n              break;\n\n            case \"animation\":\n              switch (effect.animationType) {\n                case \"entrance\":\n                  effect.apply(entranceAnimations, config, layer);\n                  break;\n\n                case \"standard\":\n                  effect.apply(standardAnimations, config, layer);\n                  break;\n\n                case \"exit\":\n                  effect.apply(exitAnimations, config, layer);\n                  break;\n\n                default:\n                  break;\n              }\n\n              break;\n\n            default:\n              break;\n          }\n        });\n      }\n\n      var layerWillChange = false; // process animations\n\n      var entranceAnimation,\n          entranceAnimationDuration = 0;\n\n      if (entranceAnimations.length > 0) {\n        entranceAnimation = animationsListToString(entranceAnimations);\n        entranceAnimationDuration = entranceAnimations.reduce(maxEffectDurationReducer, 0);\n        layerWillChange = true;\n      }\n\n      var standardAnimation,\n          standardAnimationDuration = 0;\n\n      if (standardAnimations.length > 0) {\n        standardAnimation = animationsListToString(standardAnimations);\n        standardAnimationDuration = standardAnimations.reduce(maxEffectDurationReducer, 0);\n        layerWillChange = true;\n      }\n\n      var exitAnimation,\n          exitAnimationDuration = 0;\n\n      if (exitAnimations.length > 0) {\n        exitAnimation = animationsListToString(exitAnimations);\n        exitAnimationDuration = exitAnimations.reduce(maxEffectDurationReducer, 0);\n        layerWillChange = true;\n      } // force hardware rendering if we have any animations\n\n\n      if (layerWillChange) {\n        style.willChange = \"transform, filter\";\n        transforms.translateZ = 0;\n      } // if the style has any transforms, reduce them to a string to save rendering time\n\n\n      var transform;\n      if (transforms.length > 0) transform = transformsListToString(transforms);\n      return {\n        position: position,\n        style: style,\n        transform: transform,\n        entranceAnimation: entranceAnimation,\n        entranceAnimationDuration: entranceAnimationDuration,\n        standardAnimation: standardAnimation,\n        standardAnimationDuration: standardAnimationDuration,\n        exitAnimation: exitAnimation,\n        exitAnimationDuration: exitAnimationDuration\n      };\n    }));\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), \"emit\", function (eventName, eventArgs) {\n      _this.props.scriptingContext.emitToOtherLayers(eventName, eventArgs, _this.props.layer);\n    });\n\n    _this.state = {\n      isExiting: false,\n      phase: _this.props.hidden ? DISPLAY_PHASE.HIDDEN : _this.props.forcePhase ? _this.props.forcePhase : DISPLAY_PHASE.ENTERING //computedEffects: this.computeEffects(this.props.layer, this.props.zIndex, this.props.hidden)\n\n    };\n    return _this;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Layer, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {}\n  }, {\n    key: \"componentDidUpdate\",\n    value: function componentDidUpdate(prevProps) {\n      var _this2 = this;\n\n      // handle forced phase changes.  this disables automatic phase changes\n      if (this.props.forcePhase) {\n        if (prevProps.forcePhase != this.props.forcePhase || prevProps.hidden != this.props.hidden) {\n          this.setState({\n            phase: this.props.hidden ? DISPLAY_PHASE.HIDDEN : this.props.forcePhase\n          });\n          return;\n        }\n      } // handle phase changes automatically\n\n\n      if (prevProps.hidden != this.props.hidden) {\n        // grab the memoized computedEffects\n        var computedEffects = this.computeEffectsMemoized(this.props.layer);\n\n        if (this.props.hidden) {\n          // if flipping from visible to hidden\n          if (computedEffects.exitAnimation) {\n            // render the exit animation, and flip to HIDDEN automatically when it's done\n            this.setState({\n              phase: DISPLAY_PHASE.EXITING\n            }, function () {\n              if (_this2._phaseChangeTimeout) {\n                clearTimeout(_this2._phaseChangeTimeout);\n              }\n\n              _this2._phaseChangeTimeout = setTimeout(function () {\n                _this2.setState({\n                  phase: DISPLAY_PHASE.HIDDEN\n                });\n              }, computedEffects.exitAnimationDuration);\n            });\n          } else {\n            // otherwise, go directly to hidden\n            if (this._phaseChangeTimeout) {\n              clearTimeout(this._phaseChangeTimeout);\n            }\n\n            this.setState({\n              phase: DISPLAY_PHASE.HIDDEN\n            });\n          }\n        } else {\n          // if flipping from hidden to visible\n          if (computedEffects.entranceAnimation) {\n            this.setState({\n              phase: DISPLAY_PHASE.ENTERING\n            }, function () {\n              if (_this2._phaseChangeTimeout) {\n                clearTimeout(_this2._phaseChangeTimeout);\n              }\n\n              _this2._phaseChangeTimeout = setTimeout(function () {\n                _this2.setState({\n                  phase: DISPLAY_PHASE.VISIBLE\n                });\n              }, computedEffects.entranceAnimationDuration);\n            });\n          } else {\n            if (this._phaseChangeTimeout) {\n              clearTimeout(this._phaseChangeTimeout);\n            }\n\n            this.setState({\n              phase: DISPLAY_PHASE.VISIBLE\n            });\n          }\n        }\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      // immediately return, render nothing\n      if (this.state.phase == DISPLAY_PHASE.HIDDEN) {\n        return null;\n      }\n\n      var computedEffects = this.computeEffectsMemoized(this.props.layer);\n      var animation;\n\n      switch (this.state.phase) {\n        case DISPLAY_PHASE.ENTERING:\n          animation = computedEffects.entranceAnimation;\n          break;\n\n        case DISPLAY_PHASE.VISIBLE:\n          animation = computedEffects.standardAnimation;\n          break;\n\n        case DISPLAY_PHASE.EXITING:\n          animation = computedEffects.exitAnimation;\n          break;\n\n        default:\n          break;\n      }\n\n      var elementProps = this.props.elementProps || {};\n      var element;\n\n      if (this.props.wireframeMode) {\n        element = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(\"div\", {\n          style: {\n            height: \"100%\",\n            width: \"100%\",\n            border: \"1px solid red\"\n          }\n        });\n      } else {\n        element = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(\"div\", {\n          className: \"layer-container-inner\",\n          style: _objectSpread(_objectSpread({}, computedEffects.style), {}, {\n            transform: computedEffects.transform\n          })\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(this.props.Element, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, elementProps, this.props.layer.config, {\n          layer: this.props.layer,\n          hidden: this.props.hidden,\n          emit: this.emit,\n          onRegisterKnockout: this.props.onRegisterKnockout,\n          onUpdateKnockout: this.props.onUpdateKnockout,\n          onRemoveKnockout: this.props.onRemoveKnockout\n        })));\n      }\n\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(\"div\", {\n        className: \"layer-container\",\n        \"data-id\": this.props.layer.id,\n        style: _objectSpread(_objectSpread({}, computedEffects.position), {}, {\n          zIndex: this.props.zIndex,\n          animation: animation\n        })\n      }, element);\n    }\n  }]);\n\n  return Layer;\n}(react__WEBPACK_IMPORTED_MODULE_9___default.a.PureComponent);\n\nvar LayerRenderer = /*#__PURE__*/function (_React$Component) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(LayerRenderer, _React$Component);\n\n  var _super2 = _createSuper(LayerRenderer);\n\n  function LayerRenderer(props) {\n    var _this3;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, LayerRenderer);\n\n    _this3 = _super2.call(this, props); // props.layers\n    // props.elements\n    // props.zIndex\n    // props.forcePhase\n    // props.scriptingContext\n    // props.runScriptsOnShow\n    // props.wireframeMode\n    // props.elementProps\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this3), \"_scriptingContext\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this3), \"_knockoutIdCounter\", 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this3), \"ensureFonts\", function () {\n      var _iterator3 = _createForOfIteratorHelper(_this3.props.layers),\n          _step3;\n\n      try {\n        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n          var layer = _step3.value;\n          var Element = _this3.props.elements[layer.elementName];\n\n          if (!Element) {\n            continue;\n          }\n\n          var _iterator4 = _createForOfIteratorHelper(Element.manifest.parameters),\n              _step4;\n\n          try {\n            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {\n              var parameter = _step4.value;\n\n              if (parameter.type == \"font\") {\n                var font = layer.config[parameter.name];\n\n                if (font && font.fontFamily) {\n                  var fontPromise = _shared_FontLoader_js__WEBPACK_IMPORTED_MODULE_14__[\"default\"].LoadFont(font.fontFamily); // this returns null if it's already loaded\n\n                  if (fontPromise) {\n                    _this3.setState({\n                      isLoadingFonts: true\n                    });\n\n                    fontPromise.then(function () {\n                      _this3.setState({\n                        isLoadingFonts: false\n                      });\n                    });\n                  }\n                }\n              }\n            }\n          } catch (err) {\n            _iterator4.e(err);\n          } finally {\n            _iterator4.f();\n          }\n        }\n      } catch (err) {\n        _iterator3.e(err);\n      } finally {\n        _iterator3.f();\n      }\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this3), \"onRegisterKnockout\", function () {\n      var id = _this3._knockoutIdCounter++;\n\n      _this3.setState(function (prevState) {\n        var knockouts = Object.assign({}, prevState.knockouts);\n        knockouts[id] = \"\";\n        return {\n          knockouts: knockouts\n        };\n      });\n\n      return id;\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this3), \"onUpdateKnockout\", function (id, pathString) {\n      _this3.setState(function (prevState) {\n        var knockouts = Object.assign({}, prevState.knockouts);\n        knockouts[id] = pathString;\n        return {\n          knockouts: knockouts\n        };\n      });\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this3), \"onRemoveKnockout\", function (id) {\n      _this3.setState(function (prevState) {\n        var knockouts = Object.assign({}, prevState.knockouts);\n        delete knockouts[id];\n        return {\n          knockouts: knockouts\n        };\n      });\n    });\n\n    _this3.state = {\n      isLoadingFonts: false,\n      knockouts: {}\n    };\n    return _this3;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(LayerRenderer, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      this.componentDidUpdate({});\n    }\n  }, {\n    key: \"componentDidUpdate\",\n    value: function componentDidUpdate(prevProps) {\n      if (prevProps.layers != this.props.layers) {\n        // and ensure that we have all the fonts loaded\n        this.ensureFonts();\n      }\n    }\n  }, {\n    key: \"renderKnockouts\",\n    value: function renderKnockouts(knockouts) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(\"svg\", {\n        style: {\n          position: \"absolute\",\n          top: \"-99999px\"\n        },\n        viewBox: \"0 0 1920 1080\",\n        xmlns: \"http://www.w3.org/2000/svg\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(\"defs\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(\"clipPath\", {\n        id: \"knockoutClippath_\" + this.props.id\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(\"path\", {\n        d: \"M-10000 -10000 L10000 -10000 L10000 10000 L-10000 10000 L-10000 -10000 \" + knockouts.join(\" \") + \"Z\"\n      }))));\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this4 = this;\n\n      // render nothing if we're loading fonts\n      if (this.state.isLoadingFonts) {\n        return null;\n      }\n\n      var layers = this.props.layers;\n      var renderedLayers = layers.map(function (layer, index) {\n        var Element = _this4.props.elements[layer.elementName];\n\n        if (!Element) {\n          return null;\n        } // don't render anything if we don't recognize the element\n\n\n        var hidden = layer.hidden || _this4.props.hidden;\n        var zIndex = (_this4.props.zIndex || 0) - index;\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(Layer, {\n          key: layer.id,\n          hidden: hidden,\n          layer: layer,\n          Element: Element,\n          zIndex: zIndex,\n          wireframeMode: _this4.props.wireframeMode,\n          forcePhase: _this4.props.forcePhase,\n          elementProps: _this4.props.elementProps,\n          scriptingContext: _this4.props.scriptingContext,\n          onRegisterKnockout: _this4.onRegisterKnockout,\n          onRemoveKnockout: _this4.onRemoveKnockout,\n          onUpdateKnockout: _this4.onUpdateKnockout\n        });\n      });\n      var knockouts = Object.values(this.state.knockouts);\n      var style = {\n        zIndex: this.props.zIndex\n      };\n\n      if (knockouts.length > 0) {\n        style.clipPath = \"url(#knockoutClippath_\" + this.props.id + \")\";\n      }\n\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(\"div\", {\n        className: \"knockout-wrapper\",\n        style: style\n      }, knockouts.length > 0 ? this.renderKnockouts(knockouts) : null, renderedLayers);\n    }\n  }]);\n\n  return LayerRenderer;\n}(react__WEBPACK_IMPORTED_MODULE_9___default.a.Component);\n\n\n\n//# sourceURL=webpack://%5Bname%5D/./src/components/LayerRenderer.jsx?");

/***/ }),

/***/ "./src/shared/AnimationHelper.js":
/*!***************************************!*\
  !*** ./src/shared/AnimationHelper.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nvar _temp;\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new (_temp = /*#__PURE__*/function () {\n  function AnimationHelper() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, AnimationHelper);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_stylesheet\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_loadedKeyframes\", []);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(AnimationHelper, [{\n    key: \"ensureKeyframes\",\n    value: function ensureKeyframes(name, definition, overwrite) {\n      if (this._loadedKeyframes.includes(name) && !overwrite) {\n        return;\n      } // ensure we have a stylesheet to put this rule into\n\n\n      this._ensureStylesheet();\n\n      var index = 0;\n\n      var _iterator = _createForOfIteratorHelper(this._stylesheet.cssRules),\n          _step;\n\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var rule = _step.value;\n\n          if (rule.name == name) {\n            // if not overwriting, commandeer the existing rule and return\n            if (!overwrite) {\n              this._loadedKeyframes.push(name);\n\n              return;\n            } // otherwise, we have to remove it\n\n\n            this._stylesheet.deleteRule(index); // and break out, so it can be re-added\n\n\n            break;\n          }\n\n          index++;\n        } // and add\n        // this call can fail, so we have to try/catch\n        // squelching for now - is there a reason to bubble up these errors?\n\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n\n      try {\n        this._stylesheet.insertRule(definition);\n      } catch (_unused) {}\n\n      this._loadedKeyframes.push(name);\n    }\n  }, {\n    key: \"_ensureStylesheet\",\n    value: function _ensureStylesheet() {\n      if (this._stylesheet) {\n        return;\n      } // pick up the existing stylesheet if we can\n\n\n      for (var i = 0; i < document.styleSheets.length; i++) {\n        var sheet = document.styleSheets[i];\n\n        if (sheet.title == \"openoverlay-animations\") {\n          this._stylesheet = sheet;\n          return;\n        }\n      } // otherwise, create it\n\n\n      var element = document.createElement(\"style\");\n      element.type = \"text/css\";\n      element.title = \"openoverlay-animations\";\n      document.head.appendChild(element);\n      this._stylesheet = document.styleSheets[document.styleSheets.length - 1];\n    }\n  }]);\n\n  return AnimationHelper;\n}(), _temp)());\n\n//# sourceURL=webpack://%5Bname%5D/./src/shared/AnimationHelper.js?");

/***/ }),

/***/ "./src/shared/BuiltinFontSource.js":
/*!*****************************************!*\
  !*** ./src/shared/BuiltinFontSource.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nvar _temp;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new (_temp = /*#__PURE__*/function () {\n  function BuiltinFontSource() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, BuiltinFontSource);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_BUILTIN_FONTS\", [\"Arial\", \"Arial Black\", \"Comic Sans MS\", \"Courier New\", \"Georgia\", \"Impact\", \"Lucida Sans Unicode\", \"Lucida Console\", \"Tahoma\", \"Trebuchet MS\", \"Times New Roman\", \"Verdana\"]);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(BuiltinFontSource, [{\n    key: \"GetFontNames\",\n    value: function GetFontNames() {\n      return this._BUILTIN_FONTS;\n    }\n  }, {\n    key: \"LoadFont\",\n    value: function LoadFont(fontName) {\n      if (!this._BUILTIN_FONTS.includes(fontName)) return null;\n      return Promise.resolve();\n    }\n  }]);\n\n  return BuiltinFontSource;\n}(), _temp)());\n\n//# sourceURL=webpack://%5Bname%5D/./src/shared/BuiltinFontSource.js?");

/***/ }),

/***/ "./src/shared/FontLoader.js":
/*!**********************************!*\
  !*** ./src/shared/FontLoader.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _BuiltinFontSource_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BuiltinFontSource.js */ \"./src/shared/BuiltinFontSource.js\");\n/* harmony import */ var _GoogleFontSource_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GoogleFontSource.js */ \"./src/shared/GoogleFontSource.js\");\n\n\n\nvar _temp;\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new (_temp = function FontLoader() {\n  var _this = this;\n\n  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, FontLoader);\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"_loadedFonts\", []);\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"_loadPromises\", {});\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"_fontSources\", [_BuiltinFontSource_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"], _GoogleFontSource_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]]);\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"_fontNames\", void 0);\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"GetFontNames\", function () {\n    // lazy load font names\n    if (!_this._fontNames) {\n      // iterate through font sources to pull all available font names and cache for later\n      var fontNames = [];\n\n      var _iterator = _createForOfIteratorHelper(_this._fontSources),\n          _step;\n\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var fontSource = _step.value;\n\n          var _iterator2 = _createForOfIteratorHelper(fontSource.GetFontNames()),\n              _step2;\n\n          try {\n            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n              var fontName = _step2.value;\n              fontNames.push(fontName);\n            }\n          } catch (err) {\n            _iterator2.e(err);\n          } finally {\n            _iterator2.f();\n          }\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n\n      _this._fontNames = fontNames.sort();\n    }\n\n    return _this._fontNames;\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"LoadFont\", function (name) {\n    // ensure this font has not yet been loaded\n    if (_this._loadedFonts.includes(name)) {\n      return null;\n    } // if we have an active promise, return that instead to avoid duplication\n\n\n    if (_this._loadPromises[name]) {\n      return _this._loadPromises[name];\n    }\n\n    var _iterator3 = _createForOfIteratorHelper(_this._fontSources),\n        _step3;\n\n    try {\n      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n        var fontSource = _step3.value;\n        var possiblePromise = fontSource.LoadFont(name);\n\n        if (possiblePromise) {\n          _this._loadPromises[name] = possiblePromise;\n          possiblePromise.then(function () {\n            return _this._loadedFonts.push(name);\n          });\n          return possiblePromise;\n        }\n      }\n    } catch (err) {\n      _iterator3.e(err);\n    } finally {\n      _iterator3.f();\n    }\n\n    return null;\n  });\n}, _temp)());\n\n//# sourceURL=webpack://%5Bname%5D/./src/shared/FontLoader.js?");

/***/ }),

/***/ "./src/shared/GoogleFontSource.js":
/*!****************************************!*\
  !*** ./src/shared/GoogleFontSource.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar _temp;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new (_temp = function GoogleFontSource() {\n  var _this = this;\n\n  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, GoogleFontSource);\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"GetFontNames\", function () {\n    return _this._fontNames;\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"LoadFont\", function (name) {\n    if (!_this._fontNames.includes(name)) {\n      return null;\n    }\n\n    return new Promise(function (resolve, reject) {\n      var link = document.createElement(\"link\");\n      link.rel = \"stylesheet\";\n      link.href = \"https://fonts.googleapis.com/css?family=\" + encodeURIComponent(name);\n      link.addEventListener(\"load\", resolve);\n      link.addEventListener(\"abort\", reject);\n      link.addEventListener(\"error\", reject);\n      document.head.appendChild(link);\n    });\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"_fontNames\", [\"ABeeZee\", \"Abel\", \"Abhaya Libre\", \"Abril Fatface\", \"Aclonica\", \"Acme\", \"Actor\", \"Adamina\", \"Advent Pro\", \"Aguafina Script\", \"Akronim\", \"Aladin\", \"Aldrich\", \"Alef\", \"Alegreya\", \"Alegreya SC\", \"Alegreya Sans\", \"Alegreya Sans SC\", \"Aleo\", \"Alex Brush\", \"Alfa Slab One\", \"Alice\", \"Alike\", \"Alike Angular\", \"Allan\", \"Allerta\", \"Allerta Stencil\", \"Allura\", \"Almendra\", \"Almendra Display\", \"Almendra SC\", \"Amarante\", \"Amaranth\", \"Amatic SC\", \"Amethysta\", \"Amiko\", \"Amiri\", \"Amita\", \"Anaheim\", \"Andada\", \"Andika\", \"Angkor\", \"Annie Use Your Telescope\", \"Anonymous Pro\", \"Antic\", \"Antic Didone\", \"Antic Slab\", \"Anton\", \"Arapey\", \"Arbutus\", \"Arbutus Slab\", \"Architects Daughter\", \"Archivo\", \"Archivo Black\", \"Archivo Narrow\", \"Aref Ruqaa\", \"Arima Madurai\", \"Arimo\", \"Arizonia\", \"Armata\", \"Arsenal\", \"Artifika\", \"Arvo\", \"Arya\", \"Asap\", \"Asap Condensed\", \"Asar\", \"Asset\", \"Assistant\", \"Astloch\", \"Asul\", \"Athiti\", \"Atma\", \"Atomic Age\", \"Aubrey\", \"Audiowide\", \"Autour One\", \"Average\", \"Average Sans\", \"Averia Gruesa Libre\", \"Averia Libre\", \"Averia Sans Libre\", \"Averia Serif Libre\", \"B612\", \"B612 Mono\", \"Bad Script\", \"Bahiana\", \"Bahianita\", \"Bai Jamjuree\", \"Baloo\", \"Baloo Bhai\", \"Baloo Bhaijaan\", \"Baloo Bhaina\", \"Baloo Chettan\", \"Baloo Da\", \"Baloo Paaji\", \"Baloo Tamma\", \"Baloo Tammudu\", \"Baloo Thambi\", \"Balthazar\", \"Bangers\", \"Barlow\", \"Barlow Condensed\", \"Barlow Semi Condensed\", \"Barriecito\", \"Barrio\", \"Basic\", \"Battambang\", \"Baumans\", \"Bayon\", \"Belgrano\", \"Bellefair\", \"Belleza\", \"BenchNine\", \"Bentham\", \"Berkshire Swash\", \"Beth Ellen\", \"Bevan\", \"Bigelow Rules\", \"Bigshot One\", \"Bilbo\", \"Bilbo Swash Caps\", \"BioRhyme\", \"BioRhyme Expanded\", \"Biryani\", \"Bitter\", \"Black And White Picture\", \"Black Han Sans\", \"Black Ops One\", \"Blinker\", \"Bokor\", \"Bonbon\", \"Boogaloo\", \"Bowlby One\", \"Bowlby One SC\", \"Brawler\", \"Bree Serif\", \"Bubblegum Sans\", \"Bubbler One\", \"Buda\", \"Buenard\", \"Bungee\", \"Bungee Hairline\", \"Bungee Inline\", \"Bungee Outline\", \"Bungee Shade\", \"Butcherman\", \"Butterfly Kids\", \"Cabin\", \"Cabin Condensed\", \"Cabin Sketch\", \"Caesar Dressing\", \"Cagliostro\", \"Cairo\", \"Calligraffitti\", \"Cambay\", \"Cambo\", \"Candal\", \"Cantarell\", \"Cantata One\", \"Cantora One\", \"Capriola\", \"Cardo\", \"Carme\", \"Carrois Gothic\", \"Carrois Gothic SC\", \"Carter One\", \"Catamaran\", \"Caudex\", \"Caveat\", \"Caveat Brush\", \"Cedarville Cursive\", \"Ceviche One\", \"Chakra Petch\", \"Changa\", \"Changa One\", \"Chango\", \"Charm\", \"Charmonman\", \"Chathura\", \"Chau Philomene One\", \"Chela One\", \"Chelsea Market\", \"Chenla\", \"Cherry Cream Soda\", \"Cherry Swash\", \"Chewy\", \"Chicle\", \"Chivo\", \"Chonburi\", \"Cinzel\", \"Cinzel Decorative\", \"Clicker Script\", \"Coda\", \"Coda Caption\", \"Codystar\", \"Coiny\", \"Combo\", \"Comfortaa\", \"Coming Soon\", \"Concert One\", \"Condiment\", \"Content\", \"Contrail One\", \"Convergence\", \"Cookie\", \"Copse\", \"Corben\", \"Cormorant\", \"Cormorant Garamond\", \"Cormorant Infant\", \"Cormorant SC\", \"Cormorant Unicase\", \"Cormorant Upright\", \"Courgette\", \"Cousine\", \"Coustard\", \"Covered By Your Grace\", \"Crafty Girls\", \"Creepster\", \"Crete Round\", \"Crimson Pro\", \"Crimson Text\", \"Croissant One\", \"Crushed\", \"Cuprum\", \"Cute Font\", \"Cutive\", \"Cutive Mono\", \"DM Sans\", \"DM Serif Display\", \"DM Serif Text\", \"Damion\", \"Dancing Script\", \"Dangrek\", \"Darker Grotesque\", \"David Libre\", \"Dawning of a New Day\", \"Days One\", \"Dekko\", \"Delius\", \"Delius Swash Caps\", \"Delius Unicase\", \"Della Respira\", \"Denk One\", \"Devonshire\", \"Dhurjati\", \"Didact Gothic\", \"Diplomata\", \"Diplomata SC\", \"Do Hyeon\", \"Dokdo\", \"Domine\", \"Donegal One\", \"Doppio One\", \"Dorsa\", \"Dosis\", \"Dr Sugiyama\", \"Duru Sans\", \"Dynalight\", \"EB Garamond\", \"Eagle Lake\", \"East Sea Dokdo\", \"Eater\", \"Economica\", \"Eczar\", \"El Messiri\", \"Electrolize\", \"Elsie\", \"Elsie Swash Caps\", \"Emblema One\", \"Emilys Candy\", \"Encode Sans\", \"Encode Sans Condensed\", \"Encode Sans Expanded\", \"Encode Sans Semi Condensed\", \"Encode Sans Semi Expanded\", \"Engagement\", \"Englebert\", \"Enriqueta\", \"Erica One\", \"Esteban\", \"Euphoria Script\", \"Ewert\", \"Exo\", \"Exo 2\", \"Expletus Sans\", \"Fahkwang\", \"Fanwood Text\", \"Farro\", \"Farsan\", \"Fascinate\", \"Fascinate Inline\", \"Faster One\", \"Fasthand\", \"Fauna One\", \"Faustina\", \"Federant\", \"Federo\", \"Felipa\", \"Fenix\", \"Finger Paint\", \"Fira Code\", \"Fira Mono\", \"Fira Sans\", \"Fira Sans Condensed\", \"Fira Sans Extra Condensed\", \"Fjalla One\", \"Fjord One\", \"Flamenco\", \"Flavors\", \"Fondamento\", \"Fontdiner Swanky\", \"Forum\", \"Francois One\", \"Frank Ruhl Libre\", \"Freckle Face\", \"Fredericka the Great\", \"Fredoka One\", \"Freehand\", \"Fresca\", \"Frijole\", \"Fruktur\", \"Fugaz One\", \"GFS Didot\", \"GFS Neohellenic\", \"Gabriela\", \"Gaegu\", \"Gafata\", \"Galada\", \"Galdeano\", \"Galindo\", \"Gamja Flower\", \"Gentium Basic\", \"Gentium Book Basic\", \"Geo\", \"Geostar\", \"Geostar Fill\", \"Germania One\", \"Gidugu\", \"Gilda Display\", \"Give You Glory\", \"Glass Antiqua\", \"Glegoo\", \"Gloria Hallelujah\", \"Goblin One\", \"Gochi Hand\", \"Gorditas\", \"Gothic A1\", \"Goudy Bookletter 1911\", \"Graduate\", \"Grand Hotel\", \"Gravitas One\", \"Great Vibes\", \"Grenze\", \"Griffy\", \"Gruppo\", \"Gudea\", \"Gugi\", \"Gurajada\", \"Habibi\", \"Halant\", \"Hammersmith One\", \"Hanalei\", \"Hanalei Fill\", \"Handlee\", \"Hanuman\", \"Happy Monkey\", \"Harmattan\", \"Headland One\", \"Heebo\", \"Henny Penny\", \"Hepta Slab\", \"Herr Von Muellerhoff\", \"Hi Melody\", \"Hind\", \"Hind Guntur\", \"Hind Madurai\", \"Hind Siliguri\", \"Hind Vadodara\", \"Holtwood One SC\", \"Homemade Apple\", \"Homenaje\", \"IBM Plex Mono\", \"IBM Plex Sans\", \"IBM Plex Sans Condensed\", \"IBM Plex Serif\", \"IM Fell DW Pica\", \"IM Fell DW Pica SC\", \"IM Fell Double Pica\", \"IM Fell Double Pica SC\", \"IM Fell English\", \"IM Fell English SC\", \"IM Fell French Canon\", \"IM Fell French Canon SC\", \"IM Fell Great Primer\", \"IM Fell Great Primer SC\", \"Iceberg\", \"Iceland\", \"Imprima\", \"Inconsolata\", \"Inder\", \"Indie Flower\", \"Inika\", \"Inknut Antiqua\", \"Irish Grover\", \"Istok Web\", \"Italiana\", \"Italianno\", \"Itim\", \"Jacques Francois\", \"Jacques Francois Shadow\", \"Jaldi\", \"Jim Nightshade\", \"Jockey One\", \"Jolly Lodger\", \"Jomhuria\", \"Josefin Sans\", \"Josefin Slab\", \"Joti One\", \"Jua\", \"Judson\", \"Julee\", \"Julius Sans One\", \"Junge\", \"Jura\", \"Just Another Hand\", \"Just Me Again Down Here\", \"K2D\", \"Kadwa\", \"Kalam\", \"Kameron\", \"Kanit\", \"Kantumruy\", \"Karla\", \"Karma\", \"Katibeh\", \"Kaushan Script\", \"Kavivanar\", \"Kavoon\", \"Kdam Thmor\", \"Keania One\", \"Kelly Slab\", \"Kenia\", \"Khand\", \"Khmer\", \"Khula\", \"Kirang Haerang\", \"Kite One\", \"Knewave\", \"KoHo\", \"Kodchasan\", \"Kosugi\", \"Kosugi Maru\", \"Kotta One\", \"Koulen\", \"Kranky\", \"Kreon\", \"Kristi\", \"Krona One\", \"Krub\", \"Kumar One\", \"Kumar One Outline\", \"Kurale\", \"La Belle Aurore\", \"Lacquer\", \"Laila\", \"Lakki Reddy\", \"Lalezar\", \"Lancelot\", \"Lateef\", \"Lato\", \"League Script\", \"Leckerli One\", \"Ledger\", \"Lekton\", \"Lemon\", \"Lemonada\", \"Lexend Deca\", \"Lexend Exa\", \"Lexend Giga\", \"Lexend Mega\", \"Lexend Peta\", \"Lexend Tera\", \"Lexend Zetta\", \"Libre Barcode 128\", \"Libre Barcode 128 Text\", \"Libre Barcode 39\", \"Libre Barcode 39 Extended\", \"Libre Barcode 39 Extended Text\", \"Libre Barcode 39 Text\", \"Libre Baskerville\", \"Libre Caslon Display\", \"Libre Caslon Text\", \"Libre Franklin\", \"Life Savers\", \"Lilita One\", \"Lily Script One\", \"Limelight\", \"Linden Hill\", \"Literata\", \"Liu Jian Mao Cao\", \"Livvic\", \"Lobster\", \"Lobster Two\", \"Londrina Outline\", \"Londrina Shadow\", \"Londrina Sketch\", \"Londrina Solid\", \"Long Cang\", \"Lora\", \"Love Ya Like A Sister\", \"Loved by the King\", \"Lovers Quarrel\", \"Luckiest Guy\", \"Lusitana\", \"Lustria\", \"M PLUS 1p\", \"M PLUS Rounded 1c\", \"Ma Shan Zheng\", \"Macondo\", \"Macondo Swash Caps\", \"Mada\", \"Magra\", \"Maiden Orange\", \"Maitree\", \"Major Mono Display\", \"Mako\", \"Mali\", \"Mallanna\", \"Mandali\", \"Manuale\", \"Marcellus\", \"Marcellus SC\", \"Marck Script\", \"Margarine\", \"Markazi Text\", \"Marko One\", \"Marmelad\", \"Martel\", \"Martel Sans\", \"Marvel\", \"Mate\", \"Mate SC\", \"Maven Pro\", \"McLaren\", \"Meddon\", \"MedievalSharp\", \"Medula One\", \"Meera Inimai\", \"Megrim\", \"Meie Script\", \"Merienda\", \"Merienda One\", \"Merriweather\", \"Merriweather Sans\", \"Metal\", \"Metal Mania\", \"Metamorphous\", \"Metrophobic\", \"Michroma\", \"Milonga\", \"Miltonian\", \"Miltonian Tattoo\", \"Mina\", \"Miniver\", \"Miriam Libre\", \"Mirza\", \"Miss Fajardose\", \"Mitr\", \"Modak\", \"Modern Antiqua\", \"Mogra\", \"Molengo\", \"Molle\", \"Monda\", \"Monofett\", \"Monoton\", \"Monsieur La Doulaise\", \"Montaga\", \"Montez\", \"Montserrat\", \"Montserrat Alternates\", \"Montserrat Subrayada\", \"Moul\", \"Moulpali\", \"Mountains of Christmas\", \"Mouse Memoirs\", \"Mr Bedfort\", \"Mr Dafoe\", \"Mr De Haviland\", \"Mrs Saint Delafield\", \"Mrs Sheppards\", \"Mukta\", \"Mukta Mahee\", \"Mukta Malar\", \"Mukta Vaani\", \"Muli\", \"Mystery Quest\", \"NTR\", \"Nanum Brush Script\", \"Nanum Gothic\", \"Nanum Gothic Coding\", \"Nanum Myeongjo\", \"Nanum Pen Script\", \"Neucha\", \"Neuton\", \"New Rocker\", \"News Cycle\", \"Niconne\", \"Niramit\", \"Nixie One\", \"Nobile\", \"Nokora\", \"Norican\", \"Nosifer\", \"Notable\", \"Nothing You Could Do\", \"Noticia Text\", \"Noto Sans\", \"Noto Sans HK\", \"Noto Sans JP\", \"Noto Sans KR\", \"Noto Sans SC\", \"Noto Sans TC\", \"Noto Serif\", \"Noto Serif JP\", \"Noto Serif KR\", \"Noto Serif SC\", \"Noto Serif TC\", \"Nova Cut\", \"Nova Flat\", \"Nova Mono\", \"Nova Oval\", \"Nova Round\", \"Nova Script\", \"Nova Slim\", \"Nova Square\", \"Numans\", \"Nunito\", \"Nunito Sans\", \"Odor Mean Chey\", \"Offside\", \"Old Standard TT\", \"Oldenburg\", \"Oleo Script\", \"Oleo Script Swash Caps\", \"Open Sans\", \"Open Sans Condensed\", \"Oranienbaum\", \"Orbitron\", \"Oregano\", \"Orienta\", \"Original Surfer\", \"Oswald\", \"Over the Rainbow\", \"Overlock\", \"Overlock SC\", \"Overpass\", \"Overpass Mono\", \"Ovo\", \"Oxygen\", \"Oxygen Mono\", \"PT Mono\", \"PT Sans\", \"PT Sans Caption\", \"PT Sans Narrow\", \"PT Serif\", \"PT Serif Caption\", \"Pacifico\", \"Padauk\", \"Palanquin\", \"Palanquin Dark\", \"Pangolin\", \"Paprika\", \"Parisienne\", \"Passero One\", \"Passion One\", \"Pathway Gothic One\", \"Patrick Hand\", \"Patrick Hand SC\", \"Pattaya\", \"Patua One\", \"Pavanam\", \"Paytone One\", \"Peddana\", \"Peralta\", \"Permanent Marker\", \"Petit Formal Script\", \"Petrona\", \"Philosopher\", \"Piedra\", \"Pinyon Script\", \"Pirata One\", \"Plaster\", \"Play\", \"Playball\", \"Playfair Display\", \"Playfair Display SC\", \"Podkova\", \"Poiret One\", \"Poller One\", \"Poly\", \"Pompiere\", \"Pontano Sans\", \"Poor Story\", \"Poppins\", \"Port Lligat Sans\", \"Port Lligat Slab\", \"Pragati Narrow\", \"Prata\", \"Preahvihear\", \"Press Start 2P\", \"Pridi\", \"Princess Sofia\", \"Prociono\", \"Prompt\", \"Prosto One\", \"Proza Libre\", \"Puritan\", \"Purple Purse\", \"Quando\", \"Quantico\", \"Quattrocento\", \"Quattrocento Sans\", \"Questrial\", \"Quicksand\", \"Quintessential\", \"Qwigley\", \"Racing Sans One\", \"Radley\", \"Rajdhani\", \"Rakkas\", \"Raleway\", \"Raleway Dots\", \"Ramabhadra\", \"Ramaraja\", \"Rambla\", \"Rammetto One\", \"Ranchers\", \"Rancho\", \"Ranga\", \"Rasa\", \"Rationale\", \"Ravi Prakash\", \"Red Hat Display\", \"Red Hat Text\", \"Redressed\", \"Reem Kufi\", \"Reenie Beanie\", \"Revalia\", \"Rhodium Libre\", \"Ribeye\", \"Ribeye Marrow\", \"Righteous\", \"Risque\", \"Roboto\", \"Roboto Condensed\", \"Roboto Mono\", \"Roboto Slab\", \"Rochester\", \"Rock Salt\", \"Rokkitt\", \"Romanesco\", \"Ropa Sans\", \"Rosario\", \"Rosarivo\", \"Rouge Script\", \"Rozha One\", \"Rubik\", \"Rubik Mono One\", \"Ruda\", \"Rufina\", \"Ruge Boogie\", \"Ruluko\", \"Rum Raisin\", \"Ruslan Display\", \"Russo One\", \"Ruthie\", \"Rye\", \"Sacramento\", \"Sahitya\", \"Sail\", \"Saira\", \"Saira Condensed\", \"Saira Extra Condensed\", \"Saira Semi Condensed\", \"Saira Stencil One\", \"Salsa\", \"Sanchez\", \"Sancreek\", \"Sansita\", \"Sarabun\", \"Sarala\", \"Sarina\", \"Sarpanch\", \"Satisfy\", \"Sawarabi Gothic\", \"Sawarabi Mincho\", \"Scada\", \"Scheherazade\", \"Schoolbell\", \"Scope One\", \"Seaweed Script\", \"Secular One\", \"Sedgwick Ave\", \"Sedgwick Ave Display\", \"Sevillana\", \"Seymour One\", \"Shadows Into Light\", \"Shadows Into Light Two\", \"Shanti\", \"Share\", \"Share Tech\", \"Share Tech Mono\", \"Shojumaru\", \"Short Stack\", \"Shrikhand\", \"Siemreap\", \"Sigmar One\", \"Signika\", \"Signika Negative\", \"Simonetta\", \"Single Day\", \"Sintony\", \"Sirin Stencil\", \"Six Caps\", \"Skranji\", \"Slabo 13px\", \"Slabo 27px\", \"Slackey\", \"Smokum\", \"Smythe\", \"Sniglet\", \"Snippet\", \"Snowburst One\", \"Sofadi One\", \"Sofia\", \"Song Myung\", \"Sonsie One\", \"Sorts Mill Goudy\", \"Source Code Pro\", \"Source Sans Pro\", \"Source Serif Pro\", \"Space Mono\", \"Special Elite\", \"Spectral\", \"Spectral SC\", \"Spicy Rice\", \"Spinnaker\", \"Spirax\", \"Squada One\", \"Sree Krushnadevaraya\", \"Sriracha\", \"Srisakdi\", \"Staatliches\", \"Stalemate\", \"Stalinist One\", \"Stardos Stencil\", \"Stint Ultra Condensed\", \"Stint Ultra Expanded\", \"Stoke\", \"Strait\", \"Stylish\", \"Sue Ellen Francisco\", \"Suez One\", \"Sumana\", \"Sunflower\", \"Sunshiney\", \"Supermercado One\", \"Sura\", \"Suranna\", \"Suravaram\", \"Suwannaphum\", \"Swanky and Moo Moo\", \"Syncopate\", \"Tajawal\", \"Tangerine\", \"Taprom\", \"Tauri\", \"Taviraj\", \"Teko\", \"Telex\", \"Tenali Ramakrishna\", \"Tenor Sans\", \"Text Me One\", \"Thasadith\", \"The Girl Next Door\", \"Tienne\", \"Tillana\", \"Timmana\", \"Tinos\", \"Titan One\", \"Titillium Web\", \"Trade Winds\", \"Trirong\", \"Trocchi\", \"Trochut\", \"Trykker\", \"Tulpen One\", \"Ubuntu\", \"Ubuntu Condensed\", \"Ubuntu Mono\", \"Ultra\", \"Uncial Antiqua\", \"Underdog\", \"Unica One\", \"UnifrakturCook\", \"UnifrakturMaguntia\", \"Unkempt\", \"Unlock\", \"Unna\", \"VT323\", \"Vampiro One\", \"Varela\", \"Varela Round\", \"Vast Shadow\", \"Vesper Libre\", \"Vibur\", \"Vidaloka\", \"Viga\", \"Voces\", \"Volkhov\", \"Vollkorn\", \"Vollkorn SC\", \"Voltaire\", \"Waiting for the Sunrise\", \"Wallpoet\", \"Walter Turncoat\", \"Warnes\", \"Wellfleet\", \"Wendy One\", \"Wire One\", \"Work Sans\", \"Yanone Kaffeesatz\", \"Yantramanav\", \"Yatra One\", \"Yellowtail\", \"Yeon Sung\", \"Yeseva One\", \"Yesteryear\", \"Yrsa\", \"ZCOOL KuaiLe\", \"ZCOOL QingKe HuangYou\", \"ZCOOL XiaoWei\", \"Zeyada\", \"Zhi Mang Xing\", \"Zilla Slab\", \"Zilla Slab Highlight\"]);\n}, _temp)());\n\n//# sourceURL=webpack://%5Bname%5D/./src/shared/GoogleFontSource.js?");

/***/ }),

/***/ "./src/shared/ScriptingContext.js":
/*!****************************************!*\
  !*** ./src/shared/ScriptingContext.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ScriptingContext; });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ \"./node_modules/@babel/runtime/helpers/typeof.js\");\n/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/cloneDeep */ \"./node_modules/lodash/cloneDeep.js\");\n/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash/merge */ \"./node_modules/lodash/merge.js\");\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\n\nfunction layerFilterToMatchFunction(layerFilter) {\n  if (!layerFilter) {\n    return null;\n  }\n\n  return _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_4___default()(layerFilter) === \"object\" ? matchLayerObject : matchLayerLabel;\n}\n\nfunction matchLayerObject(layer, layerFilterObject) {\n  for (var _i = 0, _Object$entries = Object.entries(layerFilterObject); _i < _Object$entries.length; _i++) {\n    var _Object$entries$_i = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_Object$entries[_i], 2),\n        prop = _Object$entries$_i[0],\n        val = _Object$entries$_i[1];\n\n    if (layer[prop] != val) {\n      return false;\n    }\n  }\n\n  return true;\n}\n\nfunction matchLayerLabel(layer, layerFilterString) {\n  return layer.label == layerFilterString;\n}\n\nvar OverlayContext = /*#__PURE__*/function () {\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(OverlayContext, [{\n    key: \"hasModifiedLayers\",\n    get: function get() {\n      return this._hasModifiedLayers;\n    }\n  }, {\n    key: \"layers\",\n    get: function get() {\n      return this._layers;\n    }\n  }, {\n    key: \"lastUpdated\",\n    get: function get() {\n      return this._lastUpdated;\n    }\n  }]);\n\n  function OverlayContext(layers, lastUpdated, onUpdated) {\n    var _this = this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, OverlayContext);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_eventHandlers\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_layers\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_lastUpdated\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_onUpdated\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_hasModifiedLayers\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_maxLayerId\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"emitToOtherLayers\", function (eventName, eventArgs, sourceLayer) {\n      var handlers = _this._eventHandlers[eventName];\n\n      if (!handlers) {\n        return;\n      }\n\n      var _iterator = _createForOfIteratorHelper(handlers),\n          _step;\n\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var handler = _step.value;\n\n          // if there is a matchFunction/layerFilter supplied, run it for this source layer\n          // non-matches get skipped\n          if (handler.matchFunction && !handler.matchFunction(sourceLayer, handler.layerFilter)) {\n            continue;\n          } // layer filter doesn't exist or matches, so invoke the callback\n\n\n          handler.callback(eventArgs, sourceLayer);\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"on\", function (eventName, layerFilterOrCallback, callback) {\n      // lazy-instantiate handlers\n      var handlers = _this._eventHandlers[eventName];\n\n      if (!handlers) {\n        handlers = [];\n        _this._eventHandlers[eventName] = handlers;\n      } // if callback is null, then layerFilterOrCallback contains callback\n      // this code is confusing, but efficient.  read carefully :|\n\n\n      var layerFilter;\n      if (!callback) callback = layerFilterOrCallback;else layerFilter = layerFilterOrCallback; // immediately convert to a match function for efficiency\n\n      var matchFunction = layerFilter ? layerFilterToMatchFunction(layerFilter) : null;\n      handlers.push({\n        matchFunction: matchFunction,\n        layerFilter: layerFilter,\n        callback: callback\n      });\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"setLayer\", function (layerFilter, callbackFnOrObject) {\n      // allow layerFilter to be not provided\n      if (!callbackFnOrObject) {\n        callbackFnOrObject = layerFilter;\n        layerFilter = null;\n      } // determine our layer match function\n\n\n      var matchFunction = layerFilterToMatchFunction(layerFilter); // find out if our parameter is a callback or a function\n\n      var isCallback = typeof callbackFnOrObject === \"function\" ? true : false; // iterate\n\n      for (var i = 0; i < _this._layers.length; i++) {\n        // skip layers that don't match\n        if (matchFunction && !matchFunction(_this._layers[i], layerFilter)) {\n          continue;\n        }\n\n        var result = isCallback ? callbackFnOrObject(_this._layers[i]) : callbackFnOrObject; // apply the changes to the layer if we had a return value\n\n        if (result) {\n          // deep clone the layer\n          var layer = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_5___default()(_this._layers[i]); // merge the result props using lodash/merge\n\n          lodash_merge__WEBPACK_IMPORTED_MODULE_6___default()(layer, result); // assign back to the array\n\n          _this._layers[i] = layer;\n          _this._hasModifiedLayers = true;\n        }\n      }\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"cloneLayer\", function (layerFilter) {\n      // layerFilter must be provided\n      if (!layerFilter) {\n        return null;\n      } // get match function\n\n\n      var matchFunction = layerFilterToMatchFunction(layerFilter); // find the first layer that matches\n\n      var targetLayer;\n\n      var _iterator2 = _createForOfIteratorHelper(_this._layers),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var layer = _step2.value;\n\n          if (matchFunction(layer, layerFilter)) {\n            targetLayer = layer;\n            break;\n          }\n        } // return null if no layer matches\n\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n\n      if (!targetLayer) {\n        return null;\n      } // clone the layer\n\n\n      var clonedLayer = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_5___default()(targetLayer); // and delete id since this will be autogenerated when added back\n\n      delete clonedLayer.id;\n      return clonedLayer;\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"addLayer\", function (layer) {\n      layer.id = ++_this._maxLayerId;\n      _this._hasModifiedLayers = true;\n\n      _this._layers.push(layer);\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"removeLayer\", function (layerFilter) {\n      // layerFilter must be provided\n      if (!layerFilter) {\n        return null;\n      } // get match function\n\n\n      var matchFunction = layerFilterToMatchFunction(layerFilter);\n      var layersToRemove = [];\n      var targetLayer;\n\n      var _iterator3 = _createForOfIteratorHelper(_this._layers),\n          _step3;\n\n      try {\n        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n          var _layer = _step3.value;\n\n          if (matchFunction(_layer, layerFilter)) {\n            layersToRemove.push(_layer);\n          }\n        }\n      } catch (err) {\n        _iterator3.e(err);\n      } finally {\n        _iterator3.f();\n      }\n\n      for (var _i2 = 0, _layersToRemove = layersToRemove; _i2 < _layersToRemove.length; _i2++) {\n        var layer = _layersToRemove[_i2];\n\n        _this._layers.splice(_this._layers.indexOf(layer), 1);\n      }\n\n      _this._hasModifiedLayers = true;\n      return layersToRemove;\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"update\", function () {\n      _this._onUpdated();\n    });\n\n    this._eventHandlers = {};\n    this._layers = layers || [];\n    this._lastUpdated = lastUpdated;\n    this._onUpdated = onUpdated;\n    this._hasModifiedLayers = false; // get the max layer id\n\n    this._maxLayerId = this._layers.reduce(function (a, c) {\n      return c.id > a ? c.id : a;\n    }, 0);\n  }\n\n  return OverlayContext;\n}(); // NEW METHOD\n\n/*\r\noverlay.on(\"event-name\")\r\noverlay.setLayer(\"Layer Name\", { top: 10 });\r\noverlay.setLayer(\"Whatever\", { top: 20 });\r\nlet clone = overlay.cloneLayer(\"Layer Name\");\r\noverlay.addLayer(clone);\r\noverlay.removeLayer(\"Layer Name\");\r\noverlay.update();\r\n*/\n\n\nvar ScriptingContext = /*#__PURE__*/function () {\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ScriptingContext, [{\n    key: \"lastExecutionError\",\n    get: function get() {\n      return this._lastExecutionError;\n    }\n  }, {\n    key: \"hasModifiedLayers\",\n    get: function get() {\n      return this._overlayContext != null && this._overlayContext.hasModifiedLayers == true;\n    }\n  }, {\n    key: \"layers\",\n    get: function get() {\n      return !this._overlayContext ? [] : this._overlayContext.layers;\n    }\n  }]);\n\n  function ScriptingContext(opts) {\n    var _this2 = this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ScriptingContext);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_onUpdated\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_overlayContext\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_lastExecutionError\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_interceptedTimeouts\", []);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_interceptedIntervals\", []);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"emitToOtherLayers\", function (eventName, eventArgs, sourceLayer) {\n      // don't emit if we don't have an overlay context\n      if (!_this2._overlayContext) {\n        return;\n      }\n\n      _this2._overlayContext.emitToOtherLayers(eventName, eventArgs, sourceLayer);\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"reset\", function () {\n      // clear all timeouts\n      var _iterator4 = _createForOfIteratorHelper(_this2._interceptedTimeouts),\n          _step4;\n\n      try {\n        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {\n          var timeout = _step4.value;\n          clearTimeout(timeout);\n        }\n      } catch (err) {\n        _iterator4.e(err);\n      } finally {\n        _iterator4.f();\n      }\n\n      _this2._interceptedTimeouts = []; // clear all intervals\n\n      var _iterator5 = _createForOfIteratorHelper(_this2._interceptedIntervals),\n          _step5;\n\n      try {\n        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {\n          var interval = _step5.value;\n          clearInterval(interval);\n        }\n      } catch (err) {\n        _iterator5.e(err);\n      } finally {\n        _iterator5.f();\n      }\n\n      _this2._interceptedIntervals = []; // clear out overlay context\n\n      _this2._overlayContext = null;\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"validateScript\", function (script) {\n      try {\n        window.Function(\"return function() { \".concat(script, \" }\"))();\n        return null;\n      } catch (ex) {\n        return ex;\n      }\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"setTimeoutOverride\", function (callback, delay) {\n      var timeout = setTimeout(callback, delay);\n\n      _this2._interceptedTimeouts.push(timeout);\n\n      return timeout;\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"setIntervalOverride\", function (callback, period) {\n      var interval = setInterval(callback, period);\n\n      _this2._interceptedIntervals.push(interval);\n\n      return interval;\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"execute\", function (overlay) {\n      _this2._overlayContext = new OverlayContext(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_5___default()(overlay.layers), Date.now(), _this2._onUpdated);\n\n      try {\n        _this2._lastExecutionError = null;\n        window.Function(\"return function(overlay, setTimeout, setInterval) { \".concat(script, \" }\"))()(_this2._overlayContext, _this2.setTimeoutOverride, _this2.setIntervalOverride);\n        return true;\n      } catch (ex) {\n        _this2._lastExecutionError = ex;\n        return false;\n      }\n    });\n\n    this._onUpdated = opts.onUpdated;\n  }\n\n  return ScriptingContext;\n}();\n\n\n;\n\n//# sourceURL=webpack://%5Bname%5D/./src/shared/ScriptingContext.js?");

/***/ }),

/***/ "./src/shared/effects.js":
/*!*******************************!*\
  !*** ./src/shared/effects.js ***!
  \*******************************/
/*! exports provided: categories, entryAnimations, exitAnimations, standardAnimations, effects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"categories\", function() { return categories; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"entryAnimations\", function() { return entryAnimations; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"exitAnimations\", function() { return exitAnimations; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"standardAnimations\", function() { return standardAnimations; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"effects\", function() { return effects; });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nvar categories = {\n  \"General\": [\"backgroundColor\", \"border\", \"cornerRadius\", \"shadow\", \"blur\", \"opacity\", \"cornerClip\", \"padding\"],\n  \"Color\": [\"brightness\", \"contrast\", \"saturation\", \"hue\", \"invert\", \"sepia\"],\n  \"Text\": [\"textStroke\", \"textShadow\", \"letterSpacing\", \"lineHeight\"],\n  \"3D\": [\"theaterProjection\"]\n};\nvar entryAnimations = [\"animSlide\", \"animSlideUp\", \"animSlideDown\", \"animSlideLeft\", \"animSlideRight\", \"animWipeLeftIn\", \"animWipeRightIn\", \"animWipeUpIn\", \"animWipeDownIn\", \"animFadeIn\", \"animScaleIn\", \"animBlurIn\", \"animCustomEntry\"];\nvar exitAnimations = [\"animSlide\", \"animSlideUpExit\", \"animSlideDownExit\", \"animSlideLeftExit\", \"animSlideRightExit\", \"animWipeLeftExit\", \"animWipeRightExit\", \"animWipeDownExit\", \"animWipeUpExit\", \"animScaleOutExit\", \"animFadeOutExit\", \"animBlurOutExit\", \"animCustomExit\"];\nvar standardAnimations = [\"animSlide\", \"animCustomStandard\", \"animRotateStandard\"];\n\nfunction sanitizeName(name) {\n  return name.replace(/[^a-zA-Z0-9\\-_]/, \"_\");\n}\n\nvar effects = {\n  \"backgroundColor\": {\n    type: \"style\",\n    displayName: \"Background Color\",\n    parameters: [{\n      \"name\": \"color\",\n      \"type\": \"color\",\n      \"displayName\": null,\n      \"defaultValue\": \"#00000080\"\n    }],\n    apply: function apply(style, config) {\n      style.backgroundColor = config.color;\n    }\n  },\n  \"border\": {\n    type: \"style\",\n    displayName: \"Border\",\n    parameters: [{\n      \"name\": \"width\",\n      \"type\": \"number\",\n      \"displayName\": \"Thickness\",\n      \"defaultValue\": 5,\n      inline: 30\n    }, {\n      \"name\": \"style\",\n      \"type\": \"select\",\n      \"displayName\": \"Type\",\n      \"defaultValue\": \"solid\",\n      inline: 40,\n      options: [{\n        label: \"Solid\",\n        value: \"solid\"\n      }, {\n        label: \"Dotted\",\n        value: \"dotted\"\n      }, {\n        label: \"Dashed\",\n        value: \"dashed\"\n      }, {\n        label: \"Double\",\n        value: \"double\"\n      }, {\n        label: \"Groove\",\n        value: \"groove\"\n      }, {\n        label: \"Ridge\",\n        value: \"ridge\"\n      }, {\n        label: \"Inset\",\n        value: \"inset\"\n      }, {\n        label: \"Outset\",\n        value: \"outset\"\n      }]\n    }, {\n      \"name\": \"color\",\n      \"type\": \"color\",\n      \"displayName\": \"Color\",\n      \"defaultValue\": \"#FFFFFF\",\n      inline: 30\n    }],\n    apply: function apply(style, config) {\n      style.borderWidth = config.width + \"px\";\n      style.borderColor = config.color;\n      style.borderStyle = config.style;\n    }\n  },\n  \"cornerRadius\": {\n    type: \"style\",\n    displayName: \"Corner Radius\",\n    parameters: [{\n      \"name\": \"tl\",\n      \"type\": \"number\",\n      \"defaultValue\": 15,\n      inline: 25\n    }, {\n      \"name\": \"tr\",\n      \"type\": \"number\",\n      \"defaultValue\": 15,\n      inline: 25\n    }, {\n      \"name\": \"br\",\n      \"type\": \"number\",\n      \"defaultValue\": 15,\n      inline: 25\n    }, {\n      \"name\": \"bl\",\n      \"type\": \"number\",\n      \"defaultValue\": 15,\n      inline: 25\n    }],\n    apply: function apply(style, config) {\n      style.borderRadius = \"\".concat(config.tl || 0, \"px \").concat(config.tr || 0, \"px \").concat(config.br || 0, \"px \").concat(config.bl || 0, \"px\");\n    }\n  },\n  \"padding\": {\n    type: \"style\",\n    displayName: \"Padding\",\n    parameters: [{\n      \"name\": \"t\",\n      \"type\": \"number\",\n      \"defaultValue\": 0,\n      inline: 25\n    }, {\n      \"name\": \"r\",\n      \"type\": \"number\",\n      \"defaultValue\": 0,\n      inline: 25\n    }, {\n      \"name\": \"b\",\n      \"type\": \"number\",\n      \"defaultValue\": 0,\n      inline: 25\n    }, {\n      \"name\": \"l\",\n      \"type\": \"number\",\n      \"defaultValue\": 0,\n      inline: 25\n    }],\n    apply: function apply(style, config) {\n      style.padding = \"\".concat(config.t || 0, \"px \").concat(config.r || 0, \"px \").concat(config.b || 0, \"px \").concat(config.l || 0, \"px\");\n      console.log({\n        oops: \"\".concat(config.t || 0, \"px \").concat(config.r || 0, \"px \").concat(config.b || 0, \"px \").concat(config.l || 0, \"px\")\n      });\n    }\n  },\n  \"shadow\": {\n    type: \"style\",\n    displayName: \"Shadow\",\n    parameters: [{\n      \"name\": \"offsetx\",\n      \"type\": \"number\",\n      \"displayName\": \"X\",\n      \"defaultValue\": 0,\n      \"inline\": 20\n    }, {\n      \"name\": \"offsety\",\n      \"type\": \"number\",\n      \"displayName\": \"Y\",\n      \"defaultValue\": 0,\n      \"inline\": 20\n    }, {\n      \"name\": \"size\",\n      \"type\": \"number\",\n      \"displayName\": \"Radius\",\n      \"defaultValue\": 5,\n      \"inline\": 45\n    }, {\n      \"name\": \"color\",\n      \"type\": \"color\",\n      \"displayName\": \"Color\",\n      \"defaultValue\": \"#00000080\",\n      \"inline\": 15\n    }],\n    apply: function apply(style, config) {\n      style.boxShadow = \"\".concat(config.offsetx, \"px \").concat(config.offsety, \"px \").concat(config.size, \"px \").concat(config.color);\n    }\n  },\n  \"textStroke\": {\n    type: \"style\",\n    displayName: \"Text Stroke\",\n    parameters: [{\n      \"name\": \"width\",\n      \"type\": \"number\",\n      \"displayName\": \"Width\",\n      \"defaultValue\": 5,\n      \"inline\": 45\n    }, {\n      \"name\": \"color\",\n      \"type\": \"color\",\n      \"displayName\": \"Color\",\n      \"defaultValue\": \"#000000\",\n      \"inline\": 15\n    }],\n    apply: function apply(style, config) {\n      style.webkitTextStroke = \"\".concat(config.width, \"px \").concat(config.color);\n    }\n  },\n  \"textShadow\": {\n    type: \"style\",\n    displayName: \"Text Shadow\",\n    parameters: [{\n      \"name\": \"offsetx\",\n      \"type\": \"number\",\n      \"displayName\": \"X\",\n      \"defaultValue\": 0,\n      \"inline\": 20\n    }, {\n      \"name\": \"offsety\",\n      \"type\": \"number\",\n      \"displayName\": \"Y\",\n      \"defaultValue\": 0,\n      \"inline\": 20\n    }, {\n      \"name\": \"size\",\n      \"type\": \"number\",\n      \"displayName\": \"Radius\",\n      \"defaultValue\": 5,\n      \"inline\": 45\n    }, {\n      \"name\": \"color\",\n      \"type\": \"color\",\n      \"displayName\": \"Color\",\n      \"defaultValue\": \"#00000080\",\n      \"inline\": 15\n    }],\n    apply: function apply(style, config) {\n      style.textShadow = \"\".concat(config.offsetx, \"px \").concat(config.offsety, \"px \").concat(config.size, \"px \").concat(config.color);\n    }\n  },\n  \"blur\": {\n    type: \"style\",\n    displayName: \"Blur\",\n    parameters: [{\n      \"name\": \"amount\",\n      \"type\": \"slider\",\n      \"displayName\": null,\n      \"defaultValue\": 10\n    }],\n    apply: function apply(style, config) {\n      if (style.filter == null) {\n        style.filter = \"\";\n      }\n\n      style.filter += \" blur(\".concat(config.amount, \"px)\");\n    }\n  },\n  \"brightness\": {\n    type: \"style\",\n    displayName: \"Brightness\",\n    parameters: [{\n      \"name\": \"amount\",\n      \"type\": \"slider\",\n      \"displayName\": null,\n      \"defaultValue\": 50\n    }],\n    apply: function apply(style, config) {\n      if (style.filter == null) {\n        style.filter = \"\";\n      }\n\n      style.filter += \" brightness(\".concat(config.amount * 2, \"%)\");\n    }\n  },\n  \"contrast\": {\n    type: \"style\",\n    displayName: \"Contrast\",\n    parameters: [{\n      \"name\": \"amount\",\n      \"type\": \"slider\",\n      \"displayName\": null,\n      \"defaultValue\": 50\n    }],\n    apply: function apply(style, config) {\n      if (style.filter == null) {\n        style.filter = \"\";\n      }\n\n      style.filter += \" contrast(\".concat(config.amount * 2, \"%)\");\n    }\n  },\n  \"saturation\": {\n    type: \"style\",\n    displayName: \"Saturation\",\n    parameters: [{\n      \"name\": \"amount\",\n      \"type\": \"slider\",\n      \"displayName\": null,\n      \"defaultValue\": 50\n    }],\n    apply: function apply(style, config) {\n      if (style.filter == null) {\n        style.filter = \"\";\n      }\n\n      style.filter += \" saturate(\".concat(config.amount * 2, \"%)\");\n    }\n  },\n  \"hue\": {\n    type: \"style\",\n    displayName: \"Hue Shift\",\n    parameters: [{\n      \"name\": \"amount\",\n      \"type\": \"slider\",\n      \"displayName\": null,\n      \"defaultValue\": 0\n    }],\n    apply: function apply(style, config) {\n      if (style.filter == null) {\n        style.filter = \"\";\n      }\n\n      style.filter += \" hue-rotate(\".concat(config.amount * 3.6, \"deg)\");\n    }\n  },\n  \"invert\": {\n    type: \"style\",\n    displayName: \"Invert\",\n    parameters: [{\n      \"name\": \"amount\",\n      \"type\": \"slider\",\n      \"displayName\": null,\n      \"defaultValue\": 0\n    }],\n    apply: function apply(style, config) {\n      if (style.filter == null) {\n        style.filter = \"\";\n      }\n\n      style.filter += \" invert(\".concat(config.amount, \"%)\");\n    }\n  },\n  \"sepia\": {\n    type: \"style\",\n    displayName: \"Sepia\",\n    parameters: [{\n      \"name\": \"amount\",\n      \"type\": \"slider\",\n      \"displayName\": null,\n      \"defaultValue\": 0\n    }],\n    apply: function apply(style, config) {\n      if (style.filter == null) {\n        style.filter = \"\";\n      }\n\n      style.filter += \" sepia(\".concat(config.amount, \"%)\");\n    }\n  },\n  \"opacity\": {\n    type: \"style\",\n    displayName: \"Opacity\",\n    parameters: [{\n      \"name\": \"amount\",\n      \"type\": \"slider\",\n      \"displayName\": null,\n      \"defaultValue\": 100\n    }],\n    apply: function apply(style, config) {\n      style.opacity = \"\".concat(config.amount / 100);\n    }\n  },\n  \"cornerClip\": {\n    type: \"style\",\n    displayName: \"Corner Clip\",\n    parameters: [{\n      \"name\": \"tl\",\n      \"type\": \"number\",\n      \"displayName\": \"Top Left\",\n      \"defaultValue\": 10,\n      \"inline\": 25\n    }, {\n      \"name\": \"tr\",\n      \"type\": \"number\",\n      \"displayName\": \"Top Right\",\n      \"defaultValue\": 0,\n      \"inline\": 25\n    }, {\n      \"name\": \"br\",\n      \"type\": \"number\",\n      \"displayName\": \"Bot. Right\",\n      \"defaultValue\": 0,\n      \"inline\": 25\n    }, {\n      \"name\": \"bl\",\n      \"type\": \"number\",\n      \"displayName\": \"Bot. Left\",\n      \"defaultValue\": 0,\n      \"inline\": 25\n    }],\n    apply: function apply(style, config) {\n      var clipPath = \"polygon(\".concat(config.tl, \"px 0, calc(100% - \").concat(config.tr, \"px) 0, 100% \").concat(config.tr, \"px, 100% calc(100% - \").concat(config.br, \"px), calc(100% - \").concat(config.br, \"px) 100%, \").concat(config.bl, \"px 100%, 0 calc(100% - \").concat(config.bl, \"px), 0 \").concat(config.tl, \"px, \").concat(config.tl, \"px 0)\");\n      style.clipPath = clipPath;\n    }\n  },\n  \"letterSpacing\": {\n    type: \"style\",\n    displayName: \"Letter Spacing\",\n    parameters: [{\n      \"name\": \"amount\",\n      \"type\": \"slider\",\n      \"displayName\": null,\n      \"defaultValue\": 0,\n      \"min\": -100,\n      \"max\": 100\n    }],\n    apply: function apply(style, config) {\n      style.letterSpacing = \"\".concat(config.amount, \"px\");\n    }\n  },\n  \"lineHeight\": {\n    type: \"style\",\n    displayName: \"Line Height\",\n    parameters: [{\n      \"name\": \"amount\",\n      \"type\": \"slider\",\n      \"displayName\": null,\n      \"defaultValue\": 0,\n      \"min\": 0,\n      \"max\": 200,\n      \"labelStepSize\": 50\n    }],\n    apply: function apply(style, config) {\n      style.lineHeight = \"\".concat(config.amount, \"px\");\n    }\n  },\n  \"theaterProjection\": {\n    type: \"transform\",\n    displayName: \"Theater Projection\",\n    parameters: [{\n      \"name\": \"amount\",\n      \"type\": \"slider\",\n      \"displayName\": \"Amount\",\n      \"defaultValue\": 25,\n      inline: 50\n    }, {\n      \"name\": \"mode\",\n      \"type\": \"select\",\n      \"displayName\": \"Direction\",\n      \"defaultValue\": \"both\",\n      inline: 40,\n      options: [{\n        value: \"horizontal\",\n        label: \"Horizontal\"\n      }, {\n        value: \"vertical\",\n        label: \"Vertical\"\n      }, {\n        value: \"both\",\n        label: \"Both\"\n      }]\n    }],\n    apply: function apply(transforms, config, layer) {\n      var yAngle = 0;\n      var xAngle = 0;\n\n      if (config.mode == \"horizontal\" || config.mode == \"both\") {\n        var distanceToCenter = 960 - (layer.left + layer.width / 2);\n        yAngle = distanceToCenter / 1920 * (180 * (config.amount / 50));\n      }\n\n      if (config.mode == \"vertical\" || config.mode == \"both\") {\n        var _distanceToCenter = layer.top + layer.height / 2 - 540;\n\n        xAngle = _distanceToCenter / 1080 * (180 * (config.amount / 50));\n      }\n\n      transforms.push({\n        perspective: 1000\n      });\n      transforms.push({\n        rotate: [xAngle, yAngle, 0]\n      });\n    }\n  },\n  \"animSlide\": {\n    type: \"animation\",\n    animationType: \"entrance\",\n    displayName: \"Slide\",\n    parameters: [{\n      \"name\": \"startx\",\n      \"type\": \"text\",\n      \"displayName\": \"Start X\",\n      \"defaultValue\": \"-100vh\"\n    }, {\n      \"name\": \"starty\",\n      \"type\": \"text\",\n      \"displayName\": \"Start Y\",\n      \"defaultValue\": \"0\"\n    }, {\n      \"name\": \"endx\",\n      \"type\": \"text\",\n      \"displayName\": \"End X\",\n      \"defaultValue\": \"0\"\n    }, {\n      \"name\": \"endy\",\n      \"type\": \"text\",\n      \"displayName\": \"End Y\",\n      \"defaultValue\": \"0\"\n    }, {\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      var startx = config.startx || \"-100vh\";\n      var starty = config.starty || \"0\";\n      var endx = config.endx || \"0\";\n      var endy = config.endy || \"0\";\n      var name = sanitizeName(\"openoverlay-anim-slide-\".concat(startx).concat(starty).concat(endx).concat(endy));\n      animations.push(_objectSpread({\n        name: name,\n        keyframes: \"@keyframes \".concat(name, \" { from { margin-left: \").concat(startx, \"; margin-top: \").concat(starty, \"; } to { margin-left: \").concat(endx, \"; margin-top: \").concat(endy, \"; } }\")\n      }, config.animation));\n    }\n  },\n  \"animSlideUp\": {\n    type: \"animation\",\n    animationType: \"entrance\",\n    displayName: \"Slide Up\",\n    parameters: [{\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      animations.push(_objectSpread({\n        name: \"openoverlay-anim-slide-up\",\n        keyframes: \"@keyframes openoverlay-anim-slide-up { from { margin-top: 150vh; } to { margin-top: 0; } }\"\n      }, config.animation));\n    }\n  },\n  \"animSlideDown\": {\n    type: \"animation\",\n    animationType: \"entrance\",\n    displayName: \"Slide Down\",\n    parameters: [{\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      animations.push(_objectSpread({\n        name: \"openoverlay-anim-slide-down\",\n        keyframes: \"@keyframes openoverlay-anim-slide-down { from { margin-top: -150vh; } to { margin-top: 0; } }\"\n      }, config.animation));\n    }\n  },\n  \"animSlideLeft\": {\n    type: \"animation\",\n    animationType: \"entrance\",\n    displayName: \"Slide Left\",\n    parameters: [{\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      animations.push(_objectSpread({\n        name: \"openoverlay-anim-slide-left\",\n        keyframes: \"@keyframes openoverlay-anim-slide-left { from { margin-left: 150vw; } to { margin-left: 0; } }\"\n      }, config.animation));\n    }\n  },\n  \"animSlideRight\": {\n    type: \"animation\",\n    animationType: \"entrance\",\n    displayName: \"Slide Right\",\n    parameters: [{\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      animations.push(_objectSpread({\n        name: \"openoverlay-anim-slide-right\",\n        keyframes: \"@keyframes openoverlay-anim-slide-right { from { margin-left: -150vw; } to { margin-left: 0; } }\"\n      }, config.animation));\n    }\n  },\n  \"animWipeLeftIn\": {\n    type: \"animation\",\n    animationType: \"entrance\",\n    displayName: \"Wipe Left\",\n    parameters: [{\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      animations.push(_objectSpread({\n        name: \"openoverlay-anim-wipe-left-in\",\n        keyframes: \"@keyframes openoverlay-anim-wipe-left-in { from { clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%, 100% 0); } to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0) } }\"\n      }, config.animation));\n    }\n  },\n  \"animWipeRightIn\": {\n    type: \"animation\",\n    animationType: \"entrance\",\n    displayName: \"Wipe Right\",\n    parameters: [{\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      animations.push(_objectSpread({\n        name: \"openoverlay-anim-wipe-right-in\",\n        keyframes: \"@keyframes openoverlay-anim-wipe-right-in { from { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%, 0 0); } to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0) } }\"\n      }, config.animation));\n    }\n  },\n  \"animWipeUpIn\": {\n    type: \"animation\",\n    animationType: \"entrance\",\n    displayName: \"Wipe Up\",\n    parameters: [{\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      animations.push(_objectSpread({\n        name: \"openoverlay-anim-wipe-up-in\",\n        keyframes: \"@keyframes openoverlay-anim-wipe-up-in { from { clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%, 0 100%); } to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0) } }\"\n      }, config.animation));\n    }\n  },\n  \"animWipeDownIn\": {\n    type: \"animation\",\n    animationType: \"entrance\",\n    displayName: \"Wipe Down\",\n    parameters: [{\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      animations.push(_objectSpread({\n        name: \"openoverlay-anim-wipe-down-in\",\n        keyframes: \"@keyframes openoverlay-anim-wipe-down-in { from { clip-path: polygon(0 0, 100% 0, 100% 0, 0 0, 0 0); } to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0) } }\"\n      }, config.animation));\n    }\n  },\n  \"animFadeIn\": {\n    type: \"animation\",\n    animationType: \"entrance\",\n    displayName: \"Fade In\",\n    parameters: [{\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      animations.push(_objectSpread({\n        name: \"openoverlay-anim-fade-in\",\n        keyframes: \"@keyframes openoverlay-anim-fade-in { from { opacity: 0; } to { opacity: 1; } }\"\n      }, config.animation));\n    }\n  },\n  \"animScaleIn\": {\n    type: \"animation\",\n    animationType: \"entrance\",\n    displayName: \"Scale In\",\n    parameters: [{\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      animations.push(_objectSpread({\n        name: \"openoverlay-anim-scale-in\",\n        keyframes: \"@keyframes openoverlay-anim-scale-in { from { transform: scale(10); } to { transform: scale(1); } }\"\n      }, config.animation));\n    }\n  },\n  \"animBlurIn\": {\n    type: \"animation\",\n    animationType: \"entrance\",\n    displayName: \"Blur In\",\n    parameters: [{\n      \"name\": \"amount\",\n      \"type\": \"number\",\n      \"displayName\": \"Amount\",\n      \"defaultValue\": 10\n    }, {\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      var amount = config.amount || 10;\n      animations.push(_objectSpread({\n        name: \"openoverlay-anim-blur-in-\" + amount,\n        keyframes: \"@keyframes openoverlay-anim-blur-in-\".concat(amount, \" { from { filter: blur(\").concat(amount, \"px); } to { filter: blur(0); } }\")\n      }, config.animation));\n    }\n  },\n  \"animCustomEntry\": {\n    type: \"animation\",\n    animationType: \"entrance\",\n    displayName: \"Custom Entry\",\n    parameters: [{\n      \"name\": \"keyframes\",\n      \"type\": \"textarea\",\n      \"displayName\": \"Keyframes\",\n      \"defaultValue\": \"@keyframes my-animation-name {\\n0% {}\\n100% {}\\n}\"\n    }, {\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      var m = config.keyframes.match(/^@keyframes ([^ ]+)/i);\n\n      if (!m) {\n        console.log(\"Could not parse keyframes string: \".concat(config.keyframes));\n        return;\n      }\n\n      var name = m[1];\n      animations.push(_objectSpread({\n        overwrite: true,\n        name: name,\n        keyframes: config.keyframes\n      }, config.animation));\n    }\n  },\n  \"animSlideUpExit\": {\n    type: \"animation\",\n    animationType: \"exit\",\n    displayName: \"Slide Up\",\n    parameters: [{\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      animations.push(_objectSpread({\n        name: \"openoverlay-anim-slide-up-exit\",\n        keyframes: \"@keyframes openoverlay-anim-slide-up-exit { from { margin-top: 0; } to { margin-top: -150vh; } }\"\n      }, config.animation));\n    }\n  },\n  \"animSlideDownExit\": {\n    type: \"animation\",\n    animationType: \"exit\",\n    displayName: \"Slide Down\",\n    parameters: [{\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      animations.push(_objectSpread({\n        name: \"openoverlay-anim-slide-down-exit\",\n        keyframes: \"@keyframes openoverlay-anim-slide-down-exit { from { margin-top: 0; } to { margin-top: 150vh; } }\"\n      }, config.animation));\n    }\n  },\n  \"animSlideLeftExit\": {\n    type: \"animation\",\n    animationType: \"exit\",\n    displayName: \"Slide Left\",\n    parameters: [{\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      animations.push(_objectSpread({\n        name: \"openoverlay-anim-slide-left-exit\",\n        keyframes: \"@keyframes openoverlay-anim-slide-left-exit { from { margin-left: 0; } to { margin-left: -150vw; } }\"\n      }, config.animation));\n    }\n  },\n  \"animSlideRightExit\": {\n    type: \"animation\",\n    animationType: \"exit\",\n    displayName: \"Slide Right\",\n    parameters: [{\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      animations.push(_objectSpread({\n        name: \"openoverlay-anim-slide-right-exit\",\n        keyframes: \"@keyframes openoverlay-anim-slide-right-exit { from { margin-left: 0; } to { margin-left: 150vw; } }\"\n      }, config.animation));\n    }\n  },\n  \"animWipeLeftExit\": {\n    type: \"animation\",\n    animationType: \"exit\",\n    displayName: \"Wipe Left\",\n    parameters: [{\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      animations.push(_objectSpread({\n        name: \"openoverlay-anim-wipe-left-exit\",\n        keyframes: \"@keyframes openoverlay-anim-wipe-left-exit { from { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0); } to { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%, 0 0); } }\"\n      }, config.animation));\n    }\n  },\n  \"animWipeRightExit\": {\n    type: \"animation\",\n    animationType: \"exit\",\n    displayName: \"Wipe Right\",\n    parameters: [{\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      animations.push(_objectSpread({\n        name: \"openoverlay-anim-wipe-right-exit\",\n        keyframes: \"@keyframes openoverlay-anim-wipe-right-exit { from { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0); } to { clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%, 100% 0); } }\"\n      }, config.animation));\n    }\n  },\n  \"animWipeDownExit\": {\n    type: \"animation\",\n    animationType: \"exit\",\n    displayName: \"Wipe Down\",\n    parameters: [{\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      animations.push(_objectSpread({\n        name: \"openoverlay-anim-wipe-down-exit\",\n        keyframes: \"@keyframes openoverlay-anim-wipe-down-exit { from { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0); } to { clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%, 0 100%); } }\"\n      }, config.animation));\n    }\n  },\n  \"animWipeUpExit\": {\n    type: \"animation\",\n    animationType: \"exit\",\n    displayName: \"Wipe Up\",\n    parameters: [{\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      animations.push(_objectSpread({\n        name: \"openoverlay-anim-wipe-up-exit\",\n        keyframes: \"@keyframes openoverlay-anim-wipe-up-exit { from { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0); } to { clip-path: polygon(0 0, 100% 0, 100% 0, 0 0, 0 0); } }\"\n      }, config.animation));\n    }\n  },\n  \"animScaleOutExit\": {\n    type: \"animation\",\n    animationType: \"exit\",\n    displayName: \"Scale Out\",\n    parameters: [{\n      \"name\": \"amount\",\n      \"type\": \"number\",\n      \"displayName\": \"Amount\",\n      \"defaultValue\": \"10\"\n    }, {\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      var amount = config.amount == undefined ? 10 : parseFloat(config.amount);\n\n      if (!isNaN(amount)) {\n        var name = \"openoverlay-anim-scale-out-exit-\".concat(parseInt(amount * 10000));\n        animations.push(_objectSpread({\n          name: name,\n          keyframes: \"@keyframes \".concat(name, \" { from { transform: scale(1); } to { transform: scale(\").concat(amount, \"); }\")\n        }, config.animation));\n      }\n    }\n  },\n  \"animFadeOutExit\": {\n    type: \"animation\",\n    animationType: \"exit\",\n    displayName: \"Fade Out\",\n    parameters: [{\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      animations.push(_objectSpread({\n        name: \"openoverlay-anim-fade-out-exit\",\n        keyframes: \"@keyframes openoverlay-anim-fade-out-exit { from { opacity: 1; } to { opacity: 0; } }\"\n      }, config.animation));\n    }\n  },\n  \"animBlurOutExit\": {\n    type: \"animation\",\n    animationType: \"exit\",\n    displayName: \"Blur Out\",\n    parameters: [{\n      \"name\": \"amount\",\n      \"type\": \"number\",\n      \"displayName\": \"Amount\",\n      \"defaultValue\": 10\n    }, {\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      var amount = config.amount || 10;\n      animations.push(_objectSpread({\n        name: \"openoverlay-anim-blur-out-\" + amount,\n        keyframes: \"@keyframes openoverlay-anim-blur-out-\".concat(amount, \" { from { filter: blur(0); } to { filter:  blur(\").concat(amount, \"px); } }\")\n      }, config.animation));\n    }\n  },\n  \"animCustomExit\": {\n    type: \"animation\",\n    animationType: \"exit\",\n    displayName: \"Custom Exit\",\n    parameters: [{\n      \"name\": \"keyframes\",\n      \"type\": \"textarea\",\n      \"displayName\": \"Keyframes\",\n      \"defaultValue\": \"@keyframes my-animation-name {\\n0% {}\\n100% {}\\n}\"\n    }, {\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      var m = config.keyframes.match(/^@keyframes ([^ ]+)/i);\n\n      if (!m) {\n        console.log(\"Could not parse keyframes string: \".concat(config.keyframes));\n        return;\n      }\n\n      var name = m[1];\n      animations.push(_objectSpread({\n        overwrite: true,\n        name: name,\n        keyframes: config.keyframes\n      }, config.animation));\n    }\n  },\n  \"animCustomStandard\": {\n    type: \"animation\",\n    animationType: \"standard\",\n    displayName: \"Custom\",\n    parameters: [{\n      \"name\": \"keyframes\",\n      \"type\": \"textarea\",\n      \"displayName\": \"Keyframes\",\n      \"defaultValue\": \"@keyframes my-animation-name {\\n0% {}\\n100% {}\\n}\"\n    }, {\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"500\",\n        delay: \"0\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      var m = config.keyframes.match(/^@keyframes ([^ ]+)/i);\n\n      if (!m) {\n        console.log(\"Could not parse keyframes string: \".concat(config.keyframes));\n        return;\n      }\n\n      var name = m[1];\n      animations.push(_objectSpread({\n        overwrite: true,\n        name: name,\n        keyframes: config.keyframes\n      }, config.animation));\n    }\n  },\n  \"animRotateStandard\": {\n    type: \"animation\",\n    animationType: \"standard\",\n    displayName: \"Rotate\",\n    parameters: [{\n      \"name\": \"degrees\",\n      \"type\": \"number\",\n      \"displayName\": \"Degrees\",\n      \"defaultValue\": 360\n    }, {\n      \"name\": \"animation\",\n      \"type\": \"animation\",\n      \"displayName\": null,\n      \"defaultValue\": {\n        duration: \"2000\",\n        delay: \"0\",\n        iterations: \"infinite\"\n      }\n    }],\n    apply: function apply(animations, config) {\n      var degrees = config.degrees || 15;\n      animations.push(_objectSpread({\n        name: \"openoverlay-anim-rotate-standard-\" + degrees,\n        keyframes: \"@keyframes openoverlay-anim-rotate-standard-\".concat(degrees, \" { from { transform: rotate(0); } to { transform: rotate(\").concat(degrees, \"deg); } }\")\n      }, config.animation));\n    }\n  }\n};\n\n\n//# sourceURL=webpack://%5Bname%5D/./src/shared/effects.js?");

/***/ }),

/***/ 1:
/*!***************************************!*\
  !*** multi ./src/OverlayRenderer.jsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/OverlayRenderer.jsx */\"./src/OverlayRenderer.jsx\");\n\n\n//# sourceURL=webpack://%5Bname%5D/multi_./src/OverlayRenderer.jsx?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react__;\n\n//# sourceURL=webpack://%5Bname%5D/external_%22React%22?");

/***/ })

/******/ });
});