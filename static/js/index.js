/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./static/scripts/github-manager.ts":
/*!******************************************!*\
  !*** ./static/scripts/github-manager.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUserOAuthCode": () => (/* binding */ getUserOAuthCode),
/* harmony export */   "getGists": () => (/* binding */ getGists),
/* harmony export */   "getGithubData": () => (/* binding */ getGithubData)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// @ts-ignore

var VERSION = 'v3';
var USER_ENDPOINT = 'https://api.github.com/users';
var DOMAIN = 'api.github.com';
var GIST_B64_PATH = "/application/vnd.github.".concat(VERSION, ".base64");
var PERSONAL_ACCESS_TOKEN = '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';
var BASIC_AUTH = "token ".concat(PERSONAL_ACCESS_TOKEN);
var HEADERS = {
    "User-Agent": "0rexer0",
    "Access-Control-Allow-Origin": "*",
    "Authorization": BASIC_AUTH
};
var OAUTH_REDIRECT = 'https://xer0rex.com/oauth';
var CLIENT_ID = 'eaabe3c2d11922cd669d';
// Preflight Headers // 
// "Access-Control-Allow-Headers": "Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since, X-GitHub-OTP, X-Requested-With",
// "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE",
// "Access-Control-Expose-Headers": "ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval",
// "Access-Control-Max-Age": "86400",
// }
var URL = DOMAIN + GIST_B64_PATH;
// For OAuth flow
// step 1 - get the code returned from a user signin
/**
 * Parameters
 Name	Type	Description
 ¸client_id	string	Required. The client ID you received from GitHub when you registered.
 ¸redirect_uri	string	The URL in your application where users will be sent after authorization. See details below about redirect urls.
 ¸login	string	Suggests a specific account to use for signing in and authorizing the app.
 scope	string	A space-delimited list of scopes. If not provided, scope defaults to an empty list for users that have not authorized any scopes for the application. For users who have authorized scopes for the application, the user won't be shown the OAuth authorization page with the list of scopes. Instead, this step of the flow will automatically complete with the set of scopes the user has authorized for the application. For example, if a user has already performed the web flow twice and has authorized one token with user scope and another token with repo scope, a third web flow that does not provide a scope will receive a token with user and repo scope.
 state	string	An unguessable random string. It is used to protect against cross-site request forgery attacks.
 allow_signup	string	Whether or not unauthenticated users will be offered an option to sign up for GitHub during the OAuth flow. The default is true. Use false when a policy prohibits signups.
 * */
function getUserOAuthCode() {
    return __awaiter(this, void 0, void 0, function () {
        var signinURL, paramsObj, paramsF, params, url, request;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (localStorage.getItem('state')) {
                        return [2 /*return*/, localStorage.getItem('state')];
                    }
                    localStorage.setItem('state', (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])());
                    signinURL = 'https://github.com/login/oauth/authorize';
                    paramsObj = {
                        'client_id': CLIENT_ID,
                        'redirect_uri': OAUTH_REDIRECT,
                        'scope': ['public_repo']
                    };
                    paramsF = (function (params) {
                        return Object.keys(params).reduce(function (accumulated, currentKey, i) {
                            return accumulated += i === 0
                                ? "".concat(currentKey, "=").concat(params[currentKey])
                                : "&".concat(currentKey, "=").concat(params[currentKey]);
                        }, '?');
                    });
                    params = paramsF(paramsObj);
                    url = encodeURI(signinURL + params);
                    request = new Request(url, {
                        headers: {
                            'User-Agent': "0rexer0",
                            'Access-Control-Allow-Origin': '*',
                            'X-Rex': 'Loves You!'
                        }
                    });
                    return [4 /*yield*/, fetch(signinURL, request)
                            .then(function (result) { return result.json()
                            .then(function (response) { return response.code; }); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
/**
 * fetches all the gists of the current service user and returns an array of Gists
 * @returns []GithubClient.Gist
 */
function getGists() {
    return __awaiter(this, void 0, void 0, function () {
        var result, requestConfig;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUserOAuthCode()
                        .then(function (oAuthCodeResult) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, oAuthCodeResult.json()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); })
                        .catch(function (e) { return console.error('oAuth2 code retreival failed: ' + e.message); })];
                case 1:
                    result = _a.sent();
                    console.log('getUserOAuthCode call resulted: ', result);
                    requestConfig = new Request(URL, {
                        headers: HEADERS,
                    });
                    console.log('making REST call with: ', requestConfig);
                    return [4 /*yield*/, fetch(URL, requestConfig).then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, result
                                            .json()
                                            .then(function (data) {
                                            console.log('JSON response', data);
                                            return data;
                                        })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); }).catch(function (e) {
                            console.log('error: ' + e.code ? e.status + ': ' + e.statusText : 0);
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
/**
 * makes a fetch to github and returns userdata or error
 * @param user string
 * @param paths ...string | string[] | "repos" | "gists"
 */
function getGithubData(user) {
    var paths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        paths[_i - 1] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        var githubPath;
        var _this = this;
        return __generator(this, function (_a) {
            githubPath = function (p) { return encodeURI("".concat(USER_ENDPOINT, "/").concat(user, "/").concat(p)); };
            return [2 /*return*/, paths
                    .map(function (path) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetch(githubPath(path))
                                    .then(function (res) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, res.json()];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                }); }); })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); })];
        });
    });
}
;
//   for (const path of paths) {
//     return await fetch(encodeURI(`${USER_ENDPOINT}/${user}/${path}`))
//     .then(async result => {
//       return await result.json()
//     })
//     .catch(e => e);
//   }
//  }


/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./static/scripts/index.ts ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _github_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./github-manager */ "./static/scripts/github-manager.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

function main() {
    return __awaiter(this, void 0, void 0, function () {
        /**
         * Sample Pulled Data
         * REPO
         * [
      {
        "id": 163477590,
        "node_id": "MDEwOlJlcG9zaXRvcnkxNjM0Nzc1OTA=",
        "name": "Access2.0Justice",
        "full_name": "rbeatie/Access2.0Justice",
        "private": false,
        "owner": {
          "login": "rbeatie",
          "id": 45648604,
          "node_id": "MDQ6VXNlcjQ1NjQ4NjA0",
          "avatar_url": "https://avatars.githubusercontent.com/u/45648604?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/rbeatie",
          "html_url": "https://github.com/rbeatie",
          "followers_url": "https://api.github.com/users/rbeatie/followers",
          "following_url": "https://api.github.com/users/rbeatie/following{/other_user}",
          "gists_url": "https://api.github.com/users/rbeatie/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/rbeatie/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/rbeatie/subscriptions",
          "organizations_url": "https://api.github.com/users/rbeatie/orgs",
          "repos_url": "https://api.github.com/users/rbeatie/repos",
          "events_url": "https://api.github.com/users/rbeatie/events{/privacy}",
          "received_events_url": "https://api.github.com/users/rbeatie/received_events",
          "type": "User",
          "site_admin": false
        },
        "html_url": "https://github.com/rbeatie/Access2.0Justice",
        "description": "A progressive project for The Commons Law center. ",
        "fork": false,
        "url": "https://api.github.com/repos/rbeatie/Access2.0Justice",
        "forks_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/forks",
        "keys_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/teams",
        "hooks_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/hooks",
        "issue_events_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/issues/events{/number}",
        "events_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/events",
        "assignees_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/assignees{/user}",
        "branches_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/branches{/branch}",
        "tags_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/tags",
        "blobs_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/languages",
        "stargazers_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/stargazers",
        "contributors_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/contributors",
        "subscribers_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/subscribers",
        "subscription_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/subscription",
        "commits_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/issues/comments{/number}",
        "contents_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/contents/{+path}",
        "compare_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/merges",
        "archive_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/downloads",
        "issues_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/issues{/number}",
        "pulls_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/labels{/name}",
        "releases_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/releases{/id}",
        "deployments_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/deployments",
        "created_at": "2018-12-29T05:04:32Z",
        "updated_at": "2019-10-04T21:59:25Z",
        "pushed_at": "2019-01-02T02:12:46Z",
        "git_url": "git://github.com/rbeatie/Access2.0Justice.git",
        "ssh_url": "git@github.com:rbeatie/Access2.0Justice.git",
        "clone_url": "https://github.com/rbeatie/Access2.0Justice.git",
        "svn_url": "https://github.com/rbeatie/Access2.0Justice",
        "homepage": null,
        "size": 316,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": "TypeScript",
        "has_issues": true,
        "has_projects": true,
        "has_downloads": true,
        "has_wiki": true,
        "has_pages": false,
        "forks_count": 0,
        "mirror_url": null,
        "archived": false,
        "disabled": false,
        "open_issues_count": 0,
        "license": null,
        "allow_forking": true,
        "is_template": false,
        "topics": [
    
        ],
        "visibility": "public",
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master"
      },
         *
         * GIST
         * {
        "url": "https://api.github.com/gists/9eeecb7adf321f78210ac0fb6b396188",
        "forks_url": "https://api.github.com/gists/9eeecb7adf321f78210ac0fb6b396188/forks",
        "commits_url": "https://api.github.com/gists/9eeecb7adf321f78210ac0fb6b396188/commits",
        "id": "9eeecb7adf321f78210ac0fb6b396188",
        "node_id": "MDQ6R2lzdDllZWVjYjdhZGYzMjFmNzgyMTBhYzBmYjZiMzk2MTg4",
        "git_pull_url": "https://gist.github.com/9eeecb7adf321f78210ac0fb6b396188.git",
        "git_push_url": "https://gist.github.com/9eeecb7adf321f78210ac0fb6b396188.git",
        "html_url": "https://gist.github.com/9eeecb7adf321f78210ac0fb6b396188",
        "files": {
          "DisconnectOnRejectPlugin.js": {
            "filename": "DisconnectOnRejectPlugin.js",
            "type": "application/javascript",
            "language": "JavaScript",
            "raw_url": "https://gist.githubusercontent.com/rbeatie/9eeecb7adf321f78210ac0fb6b396188/raw/484aff71e6545712e2fdbd64501bec01cbf81f6e/DisconnectOnRejectPlugin.js",
            "size": 1800
          },
          "hang-up-call.js": {
            "filename": "hang-up-call.js",
            "type": "application/javascript",
            "language": "JavaScript",
            "raw_url": "https://gist.githubusercontent.com/rbeatie/9eeecb7adf321f78210ac0fb6b396188/raw/1508cb1bdc23ce10de2f848c167eebb4ace68515/hang-up-call.js",
            "size": 1861
          }
        },
        "public": true,
        "created_at": "2021-01-14T00:19:46Z",
        "updated_at": "2021-01-14T00:20:25Z",
        "description": "hanging up a call when an Agent rejects the task",
        "comments": 0,
        "user": null,
        "comments_url": "https://api.github.com/gists/9eeecb7adf321f78210ac0fb6b396188/comments",
        "owner": {
          "login": "rbeatie",
          "id": ***,
          "node_id": "****",
          "avatar_url": "https://avatars.githubusercontent.com/u/45648604?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/rbeatie",
          "html_url": "https://github.com/rbeatie",
          "followers_url": "https://api.github.com/users/rbeatie/followers",
          "following_url": "https://api.github.com/users/rbeatie/following{/other_user}",
          "gists_url": "https://api.github.com/users/rbeatie/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/rbeatie/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/rbeatie/subscriptions",
          "organizations_url": "https://api.github.com/users/rbeatie/orgs",
          "repos_url": "https://api.github.com/users/rbeatie/repos",
          "events_url": "https://api.github.com/users/rbeatie/events{/privacy}",
          "received_events_url": "https://api.github.com/users/rbeatie/received_events",
          "type": "User",
          "site_admin": false
        },
        "truncated": false
      },
         * @param content
         * @returns
         */
        function populateTemplate(content) {
            try {
                var mdTemplate = "\n\t\t\t---\n\t\t\ttitle: \"".concat(content.name, "\"\n\t\t\tdate: ").concat(content.created_at, "\n\t\t\timage: ").concat(content.image, "\n\t\t\tcategories: ").concat(content.categories, "\n\t\t\tdescription: ").concat(content.description, "\n\t\t\tdraft: ").concat(content.isDraft, "\n\t\t\tproject_info:");
                for (var _i = 0, _a = content.info; _i < _a.length; _i++) {
                    var info = _a[_i];
                    mdTemplate = mdTemplate + "\n\t\t\t\t- name: \"".concat(info.name, "\"\n\t\t\t\ticon: \"").concat(info.icon, "\" \n\t\t\t\tcontent: \"").concat(info.content, "\" \n\t\t\t\t");
                }
                mdTemplate = mdTemplate + "\n\t\t\t---\n\t\t\t\n\t\t\t".concat(content.body, "\n\t\t\t").concat(content.footer, "\t\t\t  \n\t\t\t");
                return mdTemplate;
            }
            catch (e) {
                console.error('template failed with content: ', content);
                console.error(e);
                return null;
            }
            // data.rdev0rigin = getGithubData('rdev0rigin', 'repos', 'gists')
            // 	.then(response => {
            // 		console.log('rdev0rigin', response);
            // 		return response;
            // 	});
            // console.log('data', data);
        }
        var data;
        var _this = this;
        return __generator(this, function (_a) {
            data = {};
            data.rbeatie = (0,_github_manager__WEBPACK_IMPORTED_MODULE_0__.getGithubData)('rbeatie', 'repos', 'gists')
                .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    response.forEach(function (data) {
                        console.log('rbeatie', data.name);
                        var template = populateTemplate(data);
                        console.log('rbeatie template', template);
                        return data;
                    });
                    return [2 /*return*/];
                });
            }); });
            return [2 /*return*/];
        });
    });
}
main();

})();

/******/ })()
;
//# sourceMappingURL=index.js.map