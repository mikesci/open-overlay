(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["OverlayConverter"] = factory();
	else
		root["OverlayConverter"] = factory();
})(window, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nmodule.exports = _classCallCheck;\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/@babel/runtime/helpers/classCallCheck.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperty(obj, key, value) {\n  if (key in obj) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n  } else {\n    obj[key] = value;\n  }\n\n  return obj;\n}\n\nmodule.exports = _defineProperty;\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/@babel/runtime/helpers/defineProperty.js?");

/***/ }),

/***/ "./src/OverlayConverter.js":
/*!*********************************!*\
  !*** ./src/OverlayConverter.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return OverlayConverter; });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _templates_overlay_template_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./templates/overlay-template.js */ \"./src/templates/overlay-template.js\");\n/* harmony import */ var _templates_overlay_template_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_templates_overlay_template_js__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nvar OverlayConverter = function OverlayConverter(options) {\n  var _this = this;\n\n  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, OverlayConverter);\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"_rendererModuleUrl\", void 0);\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"exportOverlay\", function (overlay) {\n    var filename = _this.makeFilename(overlay.name);\n\n    var fileBody = _templates_overlay_template_js__WEBPACK_IMPORTED_MODULE_2___default()({\n      overlay: overlay,\n      rendererModuleUrl: _this._rendererModuleUrl\n    });\n    return _this.saveFile(filename, \"text/html\", fileBody);\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"overlayToHtml\", function (overlay) {\n    return _templates_overlay_template_js__WEBPACK_IMPORTED_MODULE_2___default()({\n      overlay: overlay,\n      rendererModuleUrl: _this._rendererModuleUrl\n    });\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"htmlToOverlay\", function () {});\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"makeFilename\", function (name) {\n    return name.replace(/[^a-z0-9]/ig, \"-\") + \".html\";\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"saveFile\", function (name, type, data) {\n    // stupid ie support\n    if (data !== null && navigator.msSaveBlob) return navigator.msSaveBlob(new Blob([data], {\n      type: type\n    }), name);\n    var a = document.createElement(\"a\");\n    a.style.display = \"none\";\n    var url = window.URL.createObjectURL(new Blob([data], {\n      type: type\n    }));\n    a.href = url;\n    a.download = name;\n    document.body.appendChild(a);\n    a.click();\n    document.body.removeChild(a);\n    window.URL.revokeObjectURL(url);\n  });\n\n  this._rendererModuleUrl = options.rendererModuleUrl;\n};\n\n\n\n//# sourceURL=webpack://%5Bname%5D/./src/OverlayConverter.js?");

/***/ }),

/***/ "./src/templates/overlay-template.js":
/*!*******************************************!*\
  !*** ./src/templates/overlay-template.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (t) {\n  var __t,\n      __p = '';\n\n  __p += '<!DOCTYPE html>\\n<html>\\n<head>\\n    <title>' + ((__t = t.overlay.name) == null ? '' : __t) + '</title>\\n    <link rel=\"shortcut icon\" href=\"data:image/x-icon;,\" type=\"image/x-icon\" />\\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\">\\n    <style>\\n    html, body { overflow: hidden; height: 100%; width: 100%; padding: 0; margin: 0; }\\n    </style>\\n</head>\\n<body>\\n    <div id=\"root\"></div>\\n    <script src=\"https://unpkg.com/react@16.13.1/umd/react.production.min.js\" crossorigin></script>\\n    <script src=\"https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js\" crossorigin></script>\\n    <script src=\"' + ((__t = t.rendererModuleUrl) == null ? '' : __t) + '\" crossorigin></script>\\n    <script id=\"overlay-definition\">\\n        window._overlay = ' + ((__t = JSON.stringify(t.overlay)) == null ? '' : __t) + ';\\n    </script>\\n    <script>\\n        window.addEventListener(\"load\", function() {\\n                ReactDOM.render(\\n                    React.createElement(OverlayRenderer.default, { overlay: window._overlay }),     \\n                document.querySelector(\"#root\")\\n            );\\n        });\\n    </script>\\n</body>\\n</html>';\n  return __p;\n};\n\n//# sourceURL=webpack://%5Bname%5D/./src/templates/overlay-template.js?");

/***/ }),

/***/ 2:
/*!***************************************!*\
  !*** multi ./src/OverlayConverter.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/OverlayConverter.js */\"./src/OverlayConverter.js\");\n\n\n//# sourceURL=webpack://%5Bname%5D/multi_./src/OverlayConverter.js?");

/***/ })

/******/ });
});