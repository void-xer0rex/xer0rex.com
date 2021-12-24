var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
System.register("github-manager", [], function (exports_1, context_1) {
    "use strict";
    var uuidv4, axios, USER_ENDPOINT, DOMAIN, GIST_ENDPOINT, PERSONAL_ACCESS_TOKEN, BASIC_AUTH, HEADERS, OAUTH_REDIRECT, CLIENT_ID, Store;
    var __moduleName = context_1 && context_1.id;
    // const GIST_ENDPOINT: string = DOMAIN + GIST_B64_PATH;
    // Preflight Headers // 
    // "Access-Control-Allow-Headers": "Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since, X-GitHub-OTP, X-Requested-With",
    // "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE",
    // "Access-Control-Expose-Headers": "ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval",
    // "Access-Control-Max-Age": "86400",
    // }
    // For OAuth flow
    // step 1 - get the code returned from a user signin
    /**
     * Parameters
     *Name	Type	Description
     *¸client_id	string	Required. The client ID you received from GitHub when you registered.
     * ¸redirect_uri	string	The URL in your application where users will be sent after authorization. See details below about redirect urls.
     ¸login	string	Suggests a specific account to use for signing in and authorizing the app.
     scope	string	A space-delimited list of scopes. If not provided, scope defaults to an empty list for users that have not authorized any scopes for the application. For users who have authorized scopes for the application, the user won't be shown the OAuth authorization page with the list of scopes. Instead, this step of the flow will automatically complete with the set of scopes the user has authorized for the application. For example, if a user has already performed the web flow twice and has authorized one token with user scope and another token with repo scope, a third web flow that does not provide a scope will receive a token with user and repo scope.
     state	string	An unguessable random string. It is used to protect against cross-site request forgery attacks.
     allow_signup	string	Whether or not unauthenticated users will be offered an option to sign up for GitHub during the OAuth flow. The default is true. Use false when a policy prohibits signups.
     * */
    // export async function getUserOAuthCode(): Promise<any> {
    function getUserOAuthCode() {
        return __awaiter(this, void 0, void 0, function () {
            var store, signinURL, paramsObj, paramsF, params, url, request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        store = new Store({});
                        store;
                        signinURL = 'https://github.com/login/oauth/authorize';
                        paramsObj = {
                            'client_id': CLIENT_ID,
                            'redirect_uri': OAUTH_REDIRECT,
                            'scope': ['public_repo']
                        };
                        paramsF = (function (params) {
                            return Object
                                .keys(params)
                                .reduce(function (accumulated, currentKey, i) {
                                return accumulated += i === 0
                                    ? "".concat(currentKey, "=").concat(params[currentKey])
                                    : "&".concat(currentKey, "=").concat(params[currentKey]);
                            }, '?');
                        });
                        params = paramsF(paramsObj);
                        url = encodeURI(signinURL + params);
                        request = {
                            url: url,
                            method: 'POST',
                            headers: {
                                'User-Agent': "0rexer0",
                                'Access-Control-Allow-Origin': '*',
                                'X-Rex': 'Loves You!'
                            }
                        };
                        return [4 /*yield*/, makeAsyncCall(request)
                                .then(function (result) { return result.data; })];
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
            var requestConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestConfig = {
                            url: GIST_ENDPOINT,
                            method: 'POST',
                            headers: HEADERS,
                        };
                        return [4 /*yield*/, makeAsyncCall(requestConfig)
                                .then(function (_a) {
                                var data = _a.data;
                                return data;
                            }).catch(function (e) {
                                console.error('error: ' + e.message ? e.name + ': ' + e.message : 'failed to make async REST call');
                                console.log('Stack Trace:> ', e.stack);
                                return e;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
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
                                case 0: return [4 /*yield*/, makeAsyncCall(githubPath(path))
                                        .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            // console.log('gitHu', res);
                                            return [2 /*return*/, res];
                                        });
                                    }); })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
            });
        });
    }
    //   for (const path of paths) {
    //     return await fetch(encodeURI(`${USER_ENDPOINT}/${user}/${path}`))
    //     .then(async result => {
    //       return await result.json()
    //     })
    //     .catch(e => e);
    //   }
    //  }
    function makeAsyncCall(request) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios(request)
                            .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, response.data];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); }).catch(function (error) { return error; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    function saveFile(options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            fs.writeFile(encodeURI(options.path), options.data, function (err) {
                                if (err)
                                    return reject(err);
                                if (options.callback) {
                                    // @ts-ignore
                                    options.callback(function (e) {
                                        return resolve(e);
                                    });
                                }
                                return resolve(201);
                            });
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    exports_1("saveFile", saveFile);
    return {
        setters: [],
        execute: function () {
            // @ts-ignore
            uuidv4 = require('uuid').v4;
            axios = require('axios').default;
            // import { v4 as uuidv4 } from 'uuid';
            // import pkg from 'axios';
            // const VERSION = 'v3';
            USER_ENDPOINT = 'https://api.github.com/users';
            DOMAIN = 'api.github.com';
            // const GIST_B64_PATH: string = `/application/vnd.github.${VERSION}.base64`
            GIST_ENDPOINT = "https://".concat(DOMAIN, "/gists");
            PERSONAL_ACCESS_TOKEN = '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';
            BASIC_AUTH = "token ".concat(PERSONAL_ACCESS_TOKEN);
            HEADERS = {
                "User-Agent": "0rexer0",
                "Access-Control-Allow-Origin": "*",
                "Authorization": BASIC_AUTH
            };
            OAUTH_REDIRECT = 'https://xer0rex.com/oauth';
            CLIENT_ID = 'eaabe3c2d11922cd669d';
            ;
            Store = /** @class */ (function () {
                function Store(initState) {
                    var _this = this;
                    this.state = undefined;
                    this.save = function (key, data) {
                        fs.writeFile(key, data, function (e) {
                            return e ? e : 201;
                        });
                    };
                    this.fetch = function (key) { _this.state.get(key); };
                    this.close = function () { return __awaiter(_this, void 0, void 0, function () {
                        var currentData, res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    currentData = this.state
                                        .forEach(function (item) {
                                        return __assign(__assign({}, currentData), item);
                                    });
                                    return [4 /*yield*/, saveFile({
                                            path: this.dataPath,
                                            data: JSON.stringify(currentData),
                                            callback: function (e) {
                                                if (e) {
                                                    console.error(e.message);
                                                }
                                            }
                                        }).then(function (res) {
                                            console.log('save file succesful: ', res);
                                            return 201;
                                        }).catch(function (e) { return e; })];
                                case 1:
                                    res = _a.sent();
                                    if (res.error)
                                        return [2 /*return*/, res.error];
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    if (initState && Object.keys({}).length > 0) {
                        this.state = new Set(initState);
                    }
                    var dataPath = path.join(cwd, 'static/store/data.json');
                    // const rawdata = makeAsyncCall(dataPath);
                    var file = fs.readFileSync(dataPath);
                    console.log('file contens', file);
                }
                return Store;
            }());
            ;
            module.exports = {
                makeAsyncCall: makeAsyncCall,
                getGists: getGists,
                getGithubData: getGithubData,
                getUserOAuthCode: getUserOAuthCode,
                saveFile: saveFile
            };
        }
    };
});
// import { getGithubData } from './github-manager.js';
var github = require("./github-manager");
var path = require('path');
var fs = require('fs');
var cwd = process.cwd();
/**
 * starts the process
 */
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var results, _a;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    results = {};
                    // fetch projects data
                    _a = results;
                    return [4 /*yield*/, github
                            .getGithubData('rbeatie', 'repos', 'gists')
                            .then(function (githubResponse) { return __awaiter(_this, void 0, void 0, function () {
                            var templates;
                            return __generator(this, function (_a) {
                                templates = [];
                                // console.log('github responese', githubResponse);
                                if (githubResponse && githubResponse.length > 0) {
                                    // populate each template with data 
                                    githubResponse
                                        .forEach(function (gitHubData) {
                                        // console.log('DATA', gitHubData);
                                        // console.log('END // DATA');
                                        // not always a promise?
                                        Promise.resolve(gitHubData)
                                            .then(function (projectContents) {
                                            // itterate promises
                                            projectContents.forEach(function (content) {
                                                // console.log('project', projectContents);
                                                console.log('projectContents', Array.isArray(content));
                                                Object.keys(content).forEach(function (key) {
                                                    console.log('content', content[key]);
                                                    console.log('/// /// /// // Done // /// /// ///');
                                                    var template = populateTemplate(content);
                                                    templates = __spreadArray(__spreadArray([], templates, true), [template], false);
                                                });
                                            });
                                        });
                                    });
                                }
                                return [2 /*return*/, templates];
                            });
                        }); })];
                case 1:
                    // fetch projects data
                    _a.rbeatie = _b.sent();
                    Object.keys(results)
                        .forEach(function (key, i) {
                        var filePath = path
                            .join(cwd, 'content/portfolio', "".concat(key, "-project-").concat(i));
                        saveFile(filePath, {}, results[key]);
                    });
                    console.log('Results', results.rbeatie);
                    return [2 /*return*/];
            }
        });
    });
}
;
function saveFile(filepath, data, options) {
    console.log(filepath, ' written');
    fs.writeFile(filepath, data, options || {}, function (e) {
        if (e) {
            console.error(e.message);
            // console.log(e.stack);
        }
    });
}
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
        console.log('content', content);
        var mdTemplate = "\n\t\t\t---\n\t\t\ttitle: \"".concat(content.name, "\"\n\t\t\tdate: ").concat(content.created_at, "\n\t\t\timage: ").concat(content.image, "\n\t\t\tcategories: ").concat(content.categories, "\n\t\t\tdescription: ").concat(content.description, "\n\t\t\tdraft: ").concat(content.isDraft, "\n\t\t\tproject_info:");
        console.log('sanity', mdTemplate);
        for (var _i = 0, _a = content.info; _i < _a.length; _i++) {
            var info = _a[_i];
            mdTemplate = mdTemplate + "\n\t\t\t\t- name: \"".concat(info.name, "\"\n\t\t\t\ticon: \"").concat(info.icon, "\" \n\t\t\t\tcontent: \"").concat(info.content, "\" \n\t\t\t\t");
        }
        mdTemplate = mdTemplate + "\n\t\t\t---\n\t\t\t\n\t\t\t".concat(content.body, "\n\t\t\t").concat(content.footer, "\t\t\t  \n\t\t\t");
        return mdTemplate;
    }
    catch (e) {
        console.error('templating failed');
        // Promise.resolve(content)
        //   .then((data: any) => {
        //     // console.error('template failed with content: ', data)
        //     return e;
        //   });
    }
    // data.rdev0rigin = getGithubData('rdev0rigin', 'repos', 'gists')
    // 	.then(response => {
    // 		console.log('rdev0rigin', response);
    // 		return response;
    // 	});
    // console.log('data', data);
}
main();
//# sourceMappingURL=index,js.map