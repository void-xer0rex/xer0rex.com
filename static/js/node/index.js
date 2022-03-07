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
var github = require('./github-manager');
// ENV STUFF
var cwd = process.cwd();
var VERBOSE_LOGGING = false;
var tempnum = 1;
function handleError(error, prefix) {
    if (prefix === void 0) { prefix = 'error: '; }
    console.error(prefix + error.name + ': ' + error.message);
}
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
// async function generateProjectContentFiles() {
//   // fetch projects data
//   // @ts-expect-error
//   return new Promise(async (resolve) => {
//     const owner = 'rbeatie'; 
//     octokit.rest.repos.get({
//       owner,
//     })
//     .then((repos: any) => {
//       console.log('repos', repos);
//     }).catch((e: any) => {
//       console.log('failed with rest call in oktokit')
//       console.error(e);
//     });
//     // await githubClient
//     //   .getGithubrbeatie', PATHWAYS.REPOS, PATHWAYS.GISTS)
//     //   .then((ghDataResponses: any): void => {
//     //     for (let _ghDataResponse of ghDataResponses) {
//     //       console.log(_ghDataResponse);
//     //       Promise.resolve(_ghDataResponse)
//     //         .then((datas: any): void => {
//     //           datas.forEach((projectInfo: any) => {
//     //             // filter out gist requessts
//     //             const gistTest = /(gists)/;
//     //             if (gistTest.exec(projectInfo.url)) {
//     //               // console.log('gists', projectInfo)
//     //               // template gists
//     //               const templates: any[] = Object
//     //                 .keys(projectInfo.files)
//     //                 .map((name) => {
//     //                   const file = projectInfo.files[name];
//     //                   const bodyString = `
//     //                   ---
//     //                   title: ${name}
//     //                   date: ${new Date(Date.now())};
//     //                   description: ${projectInfo.description}
//     //                   ---
//     //                   <div id="ID-${file.id}">
//     //                   <h2>File:</h2>
//     //                   ${file.fileName}
//     //                   </div>
//     //                   <div>
//     //                   ${projectInfo.files[name].content}
//     //                   </div>
//     //                   `;
//     //                   // set TempalteConfig for gist
//     //                   const frontMatterConfig: TemplateFrontMatter = {
//     //                     name: file.fileName,
//     //                     draft
// : false,
//     //                     title: name,
//     //                     date: new Date(Date.now()).toTimeString(),
//     //                     description: projectInfo.description
//     //                   }
//     //                   const frontmatter = generateFrontMatter(frontMatterConfig)
//     //                   return frontmatter + bodyString;
//     //                 });
//     //               console.log('gist Templates', templates)
//     //               writeTemplatesToDir(templates);
//     //               resolve(templates);
//     //             } // end if
//     //             // set TemplateConfig for repose
//     //             const repoTest = /(repo)/;
//     //             console.log('trying if Repos', projectInfo.name);
//     //             if (repoTest.exec(projectInfo.url)) {
//     //               console.log('populating with Repos')
//     //               // GET README
//     //               const README_URL: (userName: string, repoName: string) => string = (userName: string, repoName: string) => `https://api.githubClient.com/repos/${us}/${repoName}/contents/README.md?ref=master`
//     //               console.log('data', README_URL, projectInfo.name);
//     //               const readmeUrl: string = README_URL(projectInfo.owner.login, projectInfo.name)
//     //               axiosInstance({
//     //                 method: 'GET',
//     //                 url: readmeUrl,
//     //               }).then((readmeResponse: any): void => {
//     //                 // console.log('readme', readmeResponse.data);
//     //                 console.log('resolving readme')
//     //                 resolve(readmeResponse);
//     //               })
//     //             }
//     //           })
//     //         })
//     //      }
//     //   });
//     // .forEach(async (_resposne: any) => {
//     //   const response = await _resposne
//     // return githubnDataResponseClient
//     //   .map (_templatesResponse: any) => {
//     //     const templatesResponse = await Promise.resolve(_templatesResponse);
//     //     // console.log('templakteResponse', templatesResponse);
//     //     // itterate projects from response.data
//     //     const templates: Promise<Template>[] = await templatesResponse
//     //       .map(async (projectMeta: any) => {
//     //         // filter out gist urls
//     //         const filterPattern = /(gist)/g;
//     //         if (await !projectMeta.html_url
//     //           .match(filterPattern)) return;
//     //         // finding content for article body if repo //
//     //         const url: string = projectMeta.html_url + '/README.md';
//     //         projectMeta.readme = await axios({
//     //           method: 'GET',
//     //           url,
//     //           headers: HEADERS
//     //         }).then((readmeResponse: any) => {
//     //           const { data } = readmeResponse;
//     //           console.log('README', data);
//     //           return data;
//     //         }).catch((e: Error) => {
//     //           console.error('fetching readme failed: ' + e.message);
//     //         });
//     //         //    // decodiong the URI encoding on the payload
//     //         // const projectMetaDecoded = Object.keys(projectMeta)
//     //         // .reduce((acc, key) => {
//     //         //   return acc = { ...acc, [key]: decodeURI(projectMeta[key]) };
//     //         // }, {});
//     //         console.log('projectMetaStuff', projectMeta);
//     //         console.log('abo0ut to generate template', projectMeta);
//     //         const _template = await generateTemplate(projectMeta);
//     //         const template = await Promise.resolve(_template)
//     //           .then(async (temp_template): Promise<void> => {
//     //             return await temp_template;
//     //           });
//     //         return await {
//     //           fileName: projectMeta.name,
//     //           content: template,
//     //         }
//     //       });
//     //     writeTemplatesToDir(templates);
//     //     console.log('done generating templates', templates);
//     //     const temp = await Promise.resolve(templates[0]);
//     //     console.log('sanity', temp);
//     //     return templates;
//   }); // end Promise
// };
function writeTemplateToDir(fileName, template, order) {
    try {
        var filePath = path.join(cwd, 'content/english/portfolio', "project-".concat(order.toString(), "_").concat(fileName, ".md"));
        save(filePath, template);
        return template;
    }
    catch (e) {
        console.error('writeTemplateToDir failed with: ', e.name);
        console.error(e.message);
        return e;
    }
}
function writeTemplatesToDir(templatesPack) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, templatesPack_1, _item, item, fileName, content, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('writing templates', templatesPack);
                    _i = 0, templatesPack_1 = templatesPack;
                    _a.label = 1;
                case 1:
                    if (!(_i < templatesPack_1.length)) return [3 /*break*/, 4];
                    _item = templatesPack_1[_i];
                    return [4 /*yield*/, Promise.resolve(_item)];
                case 2:
                    item = _a.sent();
                    console.log('item', item);
                    fileName = item.fileName, content = item.content, order = item.order;
                    writeTemplateToDir(fileName, content, order);
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
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
    // const frontMatterFields: any = [{ 'title': 'name' }, { 'date': 'created_at' }, { 'image': 'image' }, { 'categories': 'categories' }, { 'description': 'description' }, { 'draft': 'draft
    // ' }, { 'project_info': 'title' }]
    "";
    var KEY_TYPES = /** @class */ (function () {
        function KEY_TYPES() {
        }
        KEY_TYPES.title = 'string';
        KEY_TYPES.date = 'date';
        KEY_TYPES.image = 'binary || base64';
        KEY_TYPES.categories = 'string';
        KEY_TYPES.description = 'string';
        KEY_TYPES.draft = 'boolean';
        return KEY_TYPES;
    }());
    try {
        var frontMatter = Object.keys(config)
            .reduce(function (acc, key) {
            // @ts-expect-error
            var type = KEY_TYPES[key];
            switch (type) {
                case 'string':
                    return acc += "".concat(key, ": \"").concat(config[key], "\"\n");
                case 'date':
                    return acc += "".concat(key, ": ").concat(config[key], "\n");
                case 'image':
                    return acc += "".concat(key, ": \"").concat(config[key], "\"\n");
                case 'boolean':
                    return acc += "".concat(key, ": ").concat(config[key], "\n");
            }
            return acc += "".concat(key, ": \"").concat(config[key], "\"\n");
            "/n".concat(key, ":").concat(config[key]);
        }, "---\n");
        return frontMatter + '---\n';
    }
    catch (e) {
        console.error('templating failed with ' + config || '...no meta');
        handleError(e);
    }
}
function packTemplate(template, options) {
    try {
        var pack = {
            content: template,
            order: options.order || null,
            fileName: options.fileName
        };
        return pack;
    }
    catch (e) {
        console.error(e.name + ': ' + e.message);
        return e;
    }
}
/**
 * The starting place
 */
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var githubClient, repos, templatePacks;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new github.GithubClient('')];
                case 1:
                    githubClient = _a.sent();
                    return [4 /*yield*/, githubClient.getRepos('rbeatie')];
                case 2:
                    repos = _a.sent();
                    return [4 /*yield*/, repos
                            .map(function (repo, i) { return __awaiter(_this, void 0, void 0, function () {
                            var frontmatterConfig, readmeOptions, readmeText, frontmatter;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        frontmatterConfig = {
                                            name: repo.name,
                                            draft: false,
                                            description: repo.description
                                        };
                                        readmeOptions = {
                                            owner: repo.owner.login,
                                            repoName: repo.name,
                                            branch: repo.default_branch
                                        };
                                        return [4 /*yield*/, githubClient.getRepoReadme(readmeOptions)];
                                    case 1:
                                        readmeText = _a.sent();
                                        return [4 /*yield*/, generateFrontMatter(frontmatterConfig)];
                                    case 2:
                                        frontmatter = _a.sent();
                                        console.log('ReadmeResponse', readmeText);
                                        return [2 /*return*/, packTemplate(frontmatter, {
                                                order: i,
                                                fileName: repo.name,
                                            })];
                                }
                            });
                        }); })];
                case 3:
                    templatePacks = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * The go button
 */
main()
    .then(function () { return console.log('done!'); })
    .catch(function (e) {
    console.error('main failed with: ' + e.name + ': ' + e.message);
    return e;
});
//# sourceMappingURL=index.js.map