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
var _this = this;
require('dotenv').config();
// const { v4: uuidv4 } = require('uuid')
var axios = require('axios').default;
var http = require('http');
var https = require('https');
var axiosInstance = axios.create({
    //60 sec timeout
    timeout: 60000,
    //keepAlive pools and reuses TCP connections, so it's faster
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true, }),
    //follow up to 10 HTTP 3xx redirects
    maxRedirects: 10,
    //cap the maximum content length we'll accept to 50MBs, just in case
    maxSockets: 100,
    maxFreeSockets: 10,
    freeSocketTimeout: 30000,
    maxContentLength: 50 * 1000 * 1000
});
var fs = require('fs');
var USER_ENDPOINT = 'https://api.github.com/users';
var DOMAIN = 'api.github.com';
var GIST_ENDPOINT = "https://".concat(DOMAIN, "/gists");
var PERSONAL_ACCESS_TOKEN = process.env.GITHUB_PERSONAL_TOKEN;
var BASIC_AUTH = function (username) { return "basic ".concat(username, ":").concat(PERSONAL_ACCESS_TOKEN); };
// async function oktokitExample(){
//   // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
//   // Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
//   return await octokit.rest.users.getAuthenticated();
// }
var REST_HEADERS = function (username) { return ({
    "User-Agent": "0rexer0",
    "Access-Control-Allow-Origin": "*",
    "Authorization": BASIC_AUTH(username),
    "Contet-Type": "application/json"
}); };
// // Preflight Headers // 
// // const PREFLIGHT_HEADERS = {
// //   "Access-Control-Allow-Headers": "Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since, X-GitHub-OTP, X-Requested-With",
// //   "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE",
// //   "Access-Control-Expose-Headers": "ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval",
// //   "Access-Control-Max-Age": "86400",
// // }
// // For OAuth flow
// // step 1 - get the code returned from a user signin
// /**
//  * Parameters
//  *Name	Type	Description
//  *¸client_id	string	Required. The client ID you received from GitHub when you registered.
//  * ¸redirect_uri	string	The URL in your application where users will be sent after authorization. See details below about redirect urls.
//  ¸login	string	Suggests a specific account to use for signing in and authorizing the app.
//  scope	string	A space-delimited list of scopes. If not provided, scope defaults to an empty list for users that have not authorized any scopes for the application. For users who have authorized scopes for the application, the user won't be shown the OAuth authorization page with the list of scopes. Instead, this step of the flow will automatically complete with the set of scopes the user has authorized for the application. For example, if a user has already performed the web flow twice and has authorized one token with user scope and another token with repo scope, a third web flow that does not provide a scope will receive a token with user and repo scope.
//  state	string	An unguessable random string. It is used to protect against cross-site request forgery attacks.
//  allow_signup	string	Whether or not unauthenticated users will be offered an option to sign up for GitHub during the OAuth flow. The default is true. Use false when a policy prohibits signups. 
//  * */
// async function getUserOAuthCode(): Promise<any> {
//   // if (localStorage.getItem('state')) {
//   //   return localStorage.getItem('state');
//   // }
//   // localStorage.setItem('state', uuidv4());
//   const signinURL = 'https://github.com/login/oauth/authorize';
//   // 'redirect_uri': 'https://xer0rex.com/oauth',
//   const paramsObj: {} = {
//     'client_id': CLIENT_ID,
//     'redirect_uri': OAUTH_REDIRECT,
//     'scope': ['public_repo']
//   }
//   const paramsF: (params: { [key: string]: string }) => string = ((params: { [key: string]: string }) => {
//     return Object
//       .keys(params)
//       .reduce((accumulated, currentKey, i) => {
//         return accumulated += i === 0
//           ? `${currentKey}=${params[currentKey]}`
//           : `&${currentKey}=${params[currentKey]}`;
//       }, '?');
//   });
//   const params = paramsF(paramsObj)
//   const url = encodeURI(signinURL + params);
//   const request: any = {
//     url,
//     method: 'GET',
//     headers: {
//       'User-Agent': "0rexer0",
//       'Access-Control-Allow-Origin': '*',
//       'X-Rex': 'Loves You!'
//     }
//   };
// }
/**
 * fetches all the gists of the current service user and returns an array of Gists
 * @returns []GithubClient.Gist
 */
function getGists(username) {
    return __awaiter(this, void 0, void 0, function () {
        var requestConfig, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestConfig = {
                        url: GIST_ENDPOINT,
                        method: 'GET',
                        headers: REST_HEADERS(username),
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axiosInstance(requestConfig)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    e_1 = _a.sent();
                    console.error('error: ' + (e_1.message)
                        ? e_1.name + ': ' + e_1.message
                        : 'failed to make async REST call');
                    console.error('Stack Trace:> ', e_1.stack);
                    return [2 /*return*/, e_1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * consumes endpoint paths a nd fetch target data or returns an error
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
            switch (_a.label) {
                case 0:
                    githubPath = function (p) { return encodeURI("".concat(USER_ENDPOINT, "/").concat(user, "/").concat(p)); };
                    return [4 /*yield*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var responses;
                            var _this = this;
                            return __generator(this, function (_a) {
                                responses = paths
                                    .map(function (path) { return __awaiter(_this, void 0, void 0, function () {
                                    var url, axiosConfig;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                url = githubPath(path);
                                                axiosConfig = {
                                                    url: url,
                                                    method: 'GET',
                                                    credentials: {
                                                        token: PERSONAL_ACCESS_TOKEN
                                                    }
                                                };
                                                return [4 /*yield*/, axiosInstance(axiosConfig)
                                                        .then(function (axiosResponse) {
                                                        console.log('status: ', axiosResponse.status);
                                                        var data = axiosResponse.data;
                                                        return data;
                                                    }).catch(function (e) {
                                                        console.error('axios call failed: ', e.name);
                                                        console.error(e.message);
                                                        reject(e);
                                                    })];
                                            case 1: return [2 /*return*/, _a.sent()];
                                        }
                                    });
                                }); });
                                resolve(responses);
                                return [2 /*return*/];
                            });
                        }); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
var wait = function (ms) { return new Promise(function (res) { return setTimeout(res, ms); }); };
var callWithRetry = function (request, depth) {
    if (depth === void 0) { depth = 0; }
    return __awaiter(_this, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 4]);
                    return [4 /*yield*/, axios(request)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_2 = _a.sent();
                    if (depth > 7) {
                        console.error(e_2.message);
                        // console.log(e);
                        // throw e;
                    }
                    return [4 /*yield*/, wait(Math.pow(2, depth) * 10)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, callWithRetry(request, depth + 1)];
                case 4: return [2 /*return*/];
            }
        });
    });
};
function saveFile(options) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log('Saving file!');
                                    return [4 /*yield*/, fs.wrirteFile(encodeURI(options.path), options.data, function (err) {
                                            if (err)
                                                return reject(err);
                                            if (options.callback) {
                                                // @ts-ignore
                                                options.callback(function (e) {
                                                    return resolve(e);
                                                });
                                            }
                                            // console.log('file', file);
                                            return resolve(201);
                                        })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
var Octokit = require("octokit").Octokit;
// const octokit = new Octokit({ auth: `${process.env.GITHIUB_CLIENT_ID}:${process.env.GITHUB_SECRTET}`});
// // Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
// octokit.rest.users
// .getAuthenticated()
//   .then(function(response: any) {
//     // console.log('github authz response', response);
//     const {data: user} = response
//     console.log('user', user);
//     octokit.rest.repos({
//       accept: 'application/vnd.github.v3+json',
//       owner: 'rbeatie'
//       // @ts-ignore
//     }).then(({data: rbeatie}) => {
//       console.log('rbeatie', rbeatie);
//     })
//   });
var GithubClient = /** @class */ (function () {
    function GithubClient(auth) {
        var _this = this;
        if (auth === void 0) { auth = PERSONAL_ACCESS_TOKEN; }
        this.client = new Octokit({ userAgent: 'RexsInternalApp/v0.0.1', auth: auth });
        this.client.rest.users.getAuthenticated()
            .then(function (response) {
            console.log('this users response', response);
            _this.user = response.data;
            console.log('user', _this.user);
        });
    }
    GithubClient.prototype.getRepos = function (owner) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client
                            .request("GET /users/{owner}/repos", {
                            owner: owner,
                        }).then(function (repos) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, repos.data];
                        }); }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GithubClient.prototype.getRepoReadme = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var owner, repo, branch, url, config;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // const readmeRequest = {
                        //   owner: options.owner,
                        //   repo: options.repoName,
                        //   branch: options.branch
                        // }
                        console.log('options', options);
                        owner = options.owner;
                        repo = options.repoName;
                        branch = options.branch;
                        url = "https://raw.githubusercontent.com/".concat(owner, "/").concat(repo, "/").concat(branch, "/README.md");
                        console.log('URL', url);
                        config = {
                            method: 'get',
                            url: url,
                        };
                        return [4 /*yield*/, axios(url, config)
                                // return await this.client.request('GET {owner}/{repo}/raw/{branch}', readmeRequest)
                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            console.log('res', res.data);
                                            return [4 /*yield*/, res.data];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); }).catch(function (error) {
                                console.error(error.name + '> ' + error.message);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return GithubClient;
}());
module.exports = {
    Octokit: Octokit,
    GithubClient: GithubClient,
    callWithRetry: callWithRetry,
    getGists: getGists,
    getGithubData: getGithubData,
    saveFile: saveFile
};
//# sourceMappingURL=github-manager.js.map