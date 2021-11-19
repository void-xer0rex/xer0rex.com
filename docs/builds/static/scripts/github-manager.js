var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "https://jspm.dev/uuid"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getGists = exports.getUserOAuthCode = void 0;
    // @ts-ignore
    var uuid_1 = require("https://jspm.dev/uuid");
    console.log((0, uuid_1.v4)());
    var VERSION = 'v3';
    var DOMAIN = 'api.github.com';
    var GIST_B64_PATH = "/application/vnd.github." + VERSION + ".base64";
    var PERSONAL_ACCESS_TOKEN = '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';
    var USER_NAME = 'ibrexfoo';
    var BASIC_AUTH = "token " + PERSONAL_ACCESS_TOKEN;
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
                        console.log('Authing');
                        localStorage.setItem('state', (0, uuid_1.v4)());
                        console.log('test', (0, uuid_1.v4)());
                        signinURL = 'https://github.com/login/oauth/authorize';
                        paramsObj = {
                            'client_id': CLIENT_ID,
                            'redirect_uri': OAUTH_REDIRECT,
                            'scope': ['public_repo']
                        };
                        paramsF = (function (params) {
                            return Object.keys(params).reduce(function (accumulated, currentKey, i, original) {
                                return accumulated += i === 0
                                    ? currentKey + "=" + params[currentKey]
                                    : "&" + currentKey + "=" + params[currentKey];
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
                        return [4 /*yield*/, fetch(signinURL, request)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    exports.getUserOAuthCode = getUserOAuthCode;
    function getGists() {
        return __awaiter(this, void 0, void 0, function () {
            var result, requestConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('running gists');
                        return [4 /*yield*/, getUserOAuthCode()
                                .then(function (result) { return console.log(result); })
                                .catch(function (e) { return console.error('oAuth2 code retreival failed: ' + e.message); })];
                    case 1:
                        result = _a.sent();
                        requestConfig = new Request(URL, {
                            headers: HEADERS
                        });
                        console.log('making REST call with: ', requestConfig);
                        return [4 /*yield*/, fetch(URL, requestConfig).then(function (result) { return result
                                .json()
                                .then(function (response) {
                                console.log('JSON response', response);
                                return response;
                            }); }).catch(function (e) {
                                console.log('error: ' + e.status + ': ' + e.statusText);
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    exports.getGists = getGists;
});
//# sourceMappingURL=github-manager.js.map