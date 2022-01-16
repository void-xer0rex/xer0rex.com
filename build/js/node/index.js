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
require('dotenv').config();
// require('dotenv').config({path: path.join(cwd, './.env.local') });
var axios = require('axios').default;
var http = require('http');
var https = require('https');
var axiosInstance = axios.create({
    //60 sec timeout
    timeout: 60000,
    //keepAlive pools and reuses TCP connections, so it's faster
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
    //follow up to 10 HTTP 3xx redirects
    maxRedirects: 10,
    //cap the maximum content length we'll accept to 50MBs, just in case
    maxContentLength: 50 * 1000 * 1000
});
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
var fs = require('fs');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var github = require("./github-manager");
var Octokit = require("octokit").Octokit;
// const octokit = new Octokit({ auth: `${process.env.GITHIUB_CLIENT_ID}:${process.env.GITHUB_SECRTET}`});
var octokit = new Octokit({ auth: process.env.GITHUB_API_KEY });
// Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
octokit.rest.users
    .getAuthenticated()
    .then(function (response) {
    console.log('github authz response', response);
    var user = response.data;
    console.log('user', user);
    octokit.rest.users.fetch({
        owner: 'rbeatie'
        // @ts-ignore
    }).then(function (_a) {
        var rbeatie = _a.data;
        console.log('rbeatie', rbeatie);
    });
});
// ENV STUFF
var cwd = process.cwd();
var VERBOSE_LOGGING = false;
var tempnum = 1;
/**
 *
 * will test for the existence of anm error and if so will display it's details to the console
 *
 * @param test
 * @returns
*/
// @ts-ignore
function ifError(test) {
    if (!test || !!test.error) {
        console.error(test.error.name);
        console.error(test.error.message);
        if (VERBOSE_LOGGING) {
            console.log(test.error.stack);
            console.log('Non Array poroject metas...', test);
        }
        return false;
    }
    if (VERBOSE_LOGGING) {
        console.log('Project test', test);
    }
}
var PATHWAYS = /** @class */ (function () {
    function PATHWAYS() {
    }
    PATHWAYS.REPOS = 'repos';
    PATHWAYS.GISTS = 'gists';
    return PATHWAYS;
}());
/**
 * Useing a Service User to fetch the project details from Github's API and creates and writes new templates
 */
function generateProjectContentFiles() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            // fetch projects data
            // @ts-expect-error
            return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                    var owner;
                    return __generator(this, function (_a) {
                        owner = 'rbeatie';
                        octokit.rest.repos.get({
                            owner: owner,
                        })
                            .then(function (repos) {
                            console.log('repos', repos);
                        }).catch(function (e) {
                            console.log('failed with rest call in oktokit');
                            console.error(e);
                        });
                        return [2 /*return*/];
                    });
                }); })]; // end Promise
        });
    });
}
;
function writeTemplateToDir(fileName, template, order) {
    try {
        console.log('Tempalate to write: ', template);
        var filePath = path.join(cwd, 'content/english/portfolio', "project-".concat(order, "]-").concat(fileName, ".md"));
        console.log('path', filePath);
        save(filePath, template);
    }
    catch (e) {
        console.error('writeTemplateToDir failed with: ', e.name);
        console.error(e.message);
        return e;
    }
}
function writeTemplatesToDir(templateConfigs) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, templateConfigs_1, _config;
        return __generator(this, function (_a) {
            console.log('templates', templateConfigs);
            for (_i = 0, templateConfigs_1 = templateConfigs; _i < templateConfigs_1.length; _i++) {
                _config = templateConfigs_1[_i];
                // console.log('template???', templates[i]);
                Promise.resolve(_config)
                    .then(function (config) {
                    // console.log('template??2', template);
                    // console.log('writing to file', template);
                    var fileName = config.fileName, template = config.template, order = config.order;
                    writeTemplateToDir(fileName, template, order);
                    return template;
                });
            }
            ;
            return [2 /*return*/];
        });
    });
}
// @ts-ignore
function save(filepath, data) {
    console.log('writing file: ', typeof data, 'to', filepath);
    fs.writeFile(filepath, data, null, function (e) {
        if (VERBOSE_LOGGING) {
            console.log('write done for: ', filepath);
        }
        if (e)
            return console.error(e.message);
    });
}
/**
 *
 * consumes the content data object and builds a template string
 * @param config
 * @returns
 */
function generateFrontMatter(config) {
    console.log('generating frontmatter', config);
    var frontMatterFields = [{ 'title': 'name' }, { 'date': 'created_at' }, { 'image': 'image' }, { 'categories': 'categories' }, { 'description': 'description' }, { 'draft': 'isDraft' }, { 'project_info': 'title' }];
    try {
        var frontMatter = frontMatterFields
            .reduce(function (acc, nameKey) {
            var name = Object.keys(nameKey)[0];
            var key = Object.keys(nameKey)[1];
            return acc += "/n".concat(name, ":").concat(config[key]);
        }, '');
        console.log('frontMatter', frontMatter);
        return frontMatter;
        // // console.log('meta', meta);
        // let mdTemplate = `
        // 	---
        // 	title: "${config.name || 'no title'}"
        // 	date: ${config.created_at || new Date(Date.now()).toTimeString || 'date error'}
        // 	image: ${config.image || 'no image'}
        // 	categories: ${config.categories || 'no categories'}
        // 	description: ${config.description || 'no description'}
        // 	draft: ${config.isDraft || true}
        // 	project_info: ${config.title || 'no info provided'}
        //   ---
        //   <div>
        //   ${config.body}
        //   </div>
        //   `;
        // console.log('sanity 1', mdTemplate);
        // const sanity = sanitizeHtml(frontmatter + config.body);
        // console.log('sanity 2', sanity);
        // return sanity;
    }
    catch (e) {
        console.error('templating failed with ' + config || '...no meta');
        console.error('error: ' + e.name);
        console.error(e.stack);
    }
}
//   // data.rdev0rigin = getmeta('rdev0rigin', 'repos', 'gists')
//   // 	.then(response => {
//   // 		console.log('rdev0rigin', response);
//   // 		return response;
//   // 	});
//   // console.log('data', data);
// }
generateProjectContentFiles()
    .then(function () { return console.log('done!'); })
    .catch(function (e) {
    console.error('main failed with: ' + e.name + ': ' + e.message);
    return e;
});
//# sourceMappingURL=index.js.map