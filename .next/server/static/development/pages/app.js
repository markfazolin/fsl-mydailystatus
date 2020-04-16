module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/auth0.js":
/*!**********************!*\
  !*** ./lib/auth0.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @auth0/nextjs-auth0 */ "@auth0/nextjs-auth0");
/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (Object(_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__["initAuth0"])({
  clientId: process.env.AUTH0_CLIENTID,
  clientSecret: process.env.AUTH0_CLIENTSECRET,
  scope: process.env.AUTH0_SCOPE,
  domain: process.env.AUTH0_DOMAIN,
  redirectUri: process.env.AUTH0_REDIRECTURI,
  postLogoutRedirectUri: process.env.AUTH0_POSTLOGOUTREDIRECTURI,
  session: {
    cookieSecret: process.env.AUTH0_SESSION_COOKIESECRET,
    cookieLifetime: process.env.AUTH0_SESSION_COOKIELIFETIME
  }
}));

/***/ }),

/***/ "./lib/db.js":
/*!*******************!*\
  !*** ./lib/db.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const admin = __webpack_require__(/*! firebase-admin */ "firebase-admin");

const secret = __webpack_require__(/*! ../mydailystatus-firebase.json */ "./mydailystatus-firebase.json");

const {
  GeoFirestore
} = __webpack_require__(/*! geofirestore */ "geofirestore");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(secret)
  });
}

const firestore = admin.firestore();
const db = new GeoFirestore(firestore);
module.exports = {
  db
};

/***/ }),

/***/ "./lib/geo.js":
/*!********************!*\
  !*** ./lib/geo.js ***!
  \********************/
/*! exports provided: distance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distance", function() { return distance; });
/**
 *  @link https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
 */
// Converts numeric degrees to radians
function toRad(Value) {
  return Value * Math.PI / 180;
} //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)


function distance(lat1, lon1, lat2, lon2) {
  var R = 6371; // km

  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

/***/ }),

/***/ "./mydailystatus-firebase.json":
/*!*************************************!*\
  !*** ./mydailystatus-firebase.json ***!
  \*************************************/
/*! exports provided: type, project_id, private_key_id, private_key, client_email, client_id, auth_uri, token_uri, auth_provider_x509_cert_url, client_x509_cert_url, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"type\":\"service_account\",\"project_id\":\"mydailystatus-markfazolin\",\"private_key_id\":\"a74cf2c05fb47183588cfcc89dff9c5d8fefe18d\",\"private_key\":\"-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDDO/UkNDat8hHJ\\nR4UKPkVG4iQvm8EKdq5DiCu5a0qoCMhMWy+2bmXuuVZ78ThvLBI3UEHTatLtKty5\\n87p1de3DO4PPgVjkB4gvl+D2Bc3kKBiDag3jR8yRbclmDsOeQj6yEvRa7tHHW9Ka\\nAWHsYdmQ7SMpWy8STJx7Bfl3Unyboh57lxmVymhg0APYNyc1gLKBP5I56GU91pQH\\nss5BCR6H7eYFpXnh3HXZKwkMSovc9ZkXkdjLXYl6DS5SHWtHi6wZWt1XxpU1eGw3\\nDXWYGoTs94PP6C39nJLMnlgJ0CGiZ2G7KcF7c+XxbKDNOd//QF7Xf9L2p4fD9iTh\\nlJpDEuJTAgMBAAECggEAUCNLU6oPC8WCYYF27aZz302yFsyzJ21hyJybfge5ZFH+\\njcEcS6DzPFNdWZDBXnjTnVrXOkXuAKYIZlfSIKbgirPiPgnVB/zDfO21zKbDRbTj\\nowWkX7e4E7Xh5n+G8m40t/mpza2b9F4Pi2Gn5VSg7qk4NqCUKMnDrYfdR4pXVbYz\\n5N0eVOERIFu0+lrxhUE2Ieboehiv6qJ0p3m6JAgyTGt/xckt89DCSWB3tjj//zJN\\nNj3Qb94rNzC8h/KfIjK7UxwFwKgPJXItyLcTaSoCjcrakrT4sVcwcjqlgusojRoa\\nKjpXuVlDKkoA1AXdfotj1+U7i6AKvWY5YnigfP2J8QKBgQD/vUFFWsWlMa9UAIyN\\ndsVioo/sgEgyke7ZM6VXyWjnqKCpxftjl4e4TjrFsERv+wWJnxGDmVx0NLx+0Y4K\\n+uLo1OyFAIrSC3MiUyXaKrHULR+SPXLgl6OuX+FhWaQXIUbU6yIBXDVHxmGeN4yV\\n+Smv0r8WKoIZfhVgewmB+LfNuQKBgQDDbulXKpbspJSS+BvFPhUV9i6BrVHNSl5K\\no/QFBl5FsWMaJhgn7JtjlUkAojNKYyETTPaw5eywTuEs4iiWyrvDEahqUftxbFZR\\ngR3W+oOFD8SG2aKxD3NSjcTCj8WcoDhvARKlrdGt06vr3mxJkpbnUwFb5y+oSkPw\\ne7oHsCIWawKBgQDRl3q563XWOE0YDEck3TVR7CcGTfBduapFyoT02HWoflQGL+Mi\\nsRqjG0IhqJ++Ir1cF8jT0Mmr11iwmu/N4eY7qd2Z92LOWGHovLpl/d22JbEdOk0+\\n8ihMjfn5vey0pCoX8Ajzkm18QILal24Zr5XRqme/M+FiISpF4zBcm8mPyQKBgF3b\\nPDDigUzw1XGnuh6F7DZ53mfkxu5iktoh1yU6o7ewszlxphQ2a4HtxfuJ6jwFU3Mj\\neS4Hnh4mI7ocewXAI2BRcKJu8OTN9L571crS0KrsoaNpjdqe4vF4qFAQIAVSZQfa\\nagwraBGlIGHMlhDXV6WMlZB/fMHDuNEbeoIKsrQ1AoGAHuA34i/BWLbIp/1R8o9r\\ni/tnkrE/OXX9PpnNlQsxXREEkrwVhwNxNwYx7Prh35ch0WftdL3rU0o+QNR3mTaE\\nrhJGsBknCs4qDSHbF7ydFE2isYjGpcpjW3/STd6HJWCaJFbtfkTMKLt/va/DmjLq\\nPb+GJ6E7Ojj1Zx9oZSckMbw=\\n-----END PRIVATE KEY-----\\n\",\"client_email\":\"firebase-adminsdk-2yj0j@mydailystatus-markfazolin.iam.gserviceaccount.com\",\"client_id\":\"113872696655761153744\",\"auth_uri\":\"https://accounts.google.com/o/oauth2/auth\",\"token_uri\":\"https://oauth2.googleapis.com/token\",\"auth_provider_x509_cert_url\":\"https://www.googleapis.com/oauth2/v1/certs\",\"client_x509_cert_url\":\"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2yj0j%40mydailystatus-markfazolin.iam.gserviceaccount.com\"}");

/***/ }),

/***/ "./pages/app.js":
/*!**********************!*\
  !*** ./pages/app.js ***!
  \**********************/
/*! exports provided: default, getServerSideProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getServerSideProps", function() { return getServerSideProps; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_auth0__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/auth0 */ "./lib/auth0.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/db */ "./lib/db.js");
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lib_db__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_geo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/geo */ "./lib/geo.js");
var _jsxFileName = "/mnt/hd1tb/develop/cursos/fullstacklab20/mydailystatus/pages/app.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






const App = props => {
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (!props.isAuth) {
      next_router__WEBPACK_IMPORTED_MODULE_2___default.a.push('/');
    } else if (props.forceCreate) {
      next_router__WEBPACK_IMPORTED_MODULE_2___default.a.push('/create-status');
    }
  });
  if (!props.isAuth) return null;
  return __jsx("div", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 9
    }
  }, __jsx("h1", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 13
    }
  }, "Estado das Pessoas pr\xF3ximas de Voc\xEA"), __jsx("table", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 13
    }
  }, props.checkins.map(checkin => {
    return __jsx("tr", {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22,
        columnNumber: 25
      }
    }, __jsx("td", {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23,
        columnNumber: 29
      }
    }, checkin.id === props.user.sub && 'Você'), __jsx("td", {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 24,
        columnNumber: 29
      }
    }, checkin.status), __jsx("td", {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 25,
        columnNumber: 29
      }
    }, JSON.stringify(checkin.coords)), __jsx("td", {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26,
        columnNumber: 29
      }
    }, checkin.distance, " km"));
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (App);
async function getServerSideProps({
  req,
  res
}) {
  const session = await _lib_auth0__WEBPACK_IMPORTED_MODULE_1__["default"].getSession(req);

  if (session) {
    const today = new Date();
    const currentDate = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
    const todayCheckin = await _lib_db__WEBPACK_IMPORTED_MODULE_3__["db"].collection('markers').doc(currentDate).collection('checks').doc(session.user.sub).get();
    const todayData = todayCheckin.data();
    const checkinsList = [];
    let forceCreate = true;

    if (todayData) {
      forceCreate = false;
      const checkins = await _lib_db__WEBPACK_IMPORTED_MODULE_3__["db"].collection('markers').doc(currentDate).collection('checks').near({
        center: todayData.coordinates,
        radius: 1000
      }).get();
      checkins.docs.forEach(doc => {
        checkinsList.push({
          id: doc.id,
          status: doc.data().status,
          coords: {
            lat: doc.data().coordinates.latitude,
            long: doc.data().coordinates.longitude
          },
          distance: Object(_lib_geo__WEBPACK_IMPORTED_MODULE_4__["distance"])(todayData.coordinates.latitude, todayData.coordinates.longitude, doc.data().coordinates.latitude, doc.data().coordinates.longitude).toFixed(3)
        });
      });
    }

    return {
      props: {
        isAuth: true,
        user: session.user,
        forceCreate,
        checkins: checkinsList
      }
    };
  }

  return {
    props: {
      isAuth: false,
      user: {}
    }
  };
}

/***/ }),

/***/ 3:
/*!****************************!*\
  !*** multi ./pages/app.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /mnt/hd1tb/develop/cursos/fullstacklab20/mydailystatus/pages/app.js */"./pages/app.js");


/***/ }),

/***/ "@auth0/nextjs-auth0":
/*!**************************************!*\
  !*** external "@auth0/nextjs-auth0" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@auth0/nextjs-auth0");

/***/ }),

/***/ "firebase-admin":
/*!*********************************!*\
  !*** external "firebase-admin" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("firebase-admin");

/***/ }),

/***/ "geofirestore":
/*!*******************************!*\
  !*** external "geofirestore" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("geofirestore");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
//# sourceMappingURL=app.js.map