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
// ENV STUFF
var VERBOSE_LOGGING = false;
// import { getmeta } from './github-manager.js';
var github = require("./github-manager");
var path = require('path');
var fs = require('fs');
var cwd = process.cwd();
/**
 * starts the process
 */
function generateProjectFiles() {
    return __awaiter(this, void 0, void 0, function () {
        function ifError(test) {
            if (!test || !!test.error) {
                console.error(test.error.name);
                console.error(test.error.message);
                if (VERBOSE_LOGGING) {
                    console.log(test.error.stack);
                    console.log('Non Array poroject metas...', test);
                }
                return test.error;
            }
            if (VERBOSE_LOGGING) {
                console.log('Project test', test);
            }
        }
        var results, templates, _a;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    results = {};
                    templates = [];
                    // fetch projects data
                    _a = results;
                    return [4 /*yield*/, github
                            .getGithubData('rbeatie', 'repos', 'gists')
                            .then(function (githubResponse) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                console.log('github responese', githubResponse);
                                Promise.allSettled(githubResponse)
                                    .then(function (metas) { return metas
                                    .forEach(function (meta) { return __awaiter(_this, void 0, void 0, function () {
                                    var isError, request, _a;
                                    var _this = this;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                isError = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, ifError(meta)];
                                                        case 1: return [2 /*return*/, _a.sent()];
                                                    }
                                                }); }); };
                                                if (isError)
                                                    return [2 /*return*/, meta.error];
                                                console.log('meta?', meta);
                                                request = {
                                                    method: 'GET',
                                                    url: meta.html_url + '/README.md',
                                                };
                                                _a = meta;
                                                return [4 /*yield*/, github.asyncCallWithRertry(request)];
                                            case 1:
                                                _a.readme = _b.sent();
                                                generateTemplate(meta)
                                                    .then(function (template) {
                                                    templates = __spreadArray(__spreadArray([], templates, true), [template], false);
                                                });
                                                return [2 /*return*/, templates];
                                        }
                                    });
                                }); }); });
                                return [2 /*return*/];
                            });
                        }); })];
                case 1:
                    // fetch projects data
                    _a.rbeatie = _b.sent();
                    Object.keys(results)
                        .forEach(function (key, i) {
                        var filePath = path
                            .join(cwd, 'meta/portfolio', "".concat(key, "-project-").concat(i));
                        save(filePath, {}, results[key]);
                    });
                    console.log('Results', results.rbeatie);
                    return [2 /*return*/];
            }
        });
    });
}
;
// @ts-ignore
function save(filepath, data, options) {
    console.log(filepath, ' written');
    fs.writeFile(filepath, data, options || {}, function (e) {
        if (e) {
            console.error(e.message);
            // console.log(e.stack);
        }
    });
}
function generateTemplate(meta) {
    return __awaiter(this, void 0, void 0, function () {
        var mdTemplate;
        return __generator(this, function (_a) {
            try {
                console.log('meta', meta);
                mdTemplate = "\n\t\t\t---\n\t\t\ttitle: \"".concat(meta.name || 'no title', "\"\n\t\t\tdate: ").concat(meta.created_at || 'date error', "\n\t\t\timage: ").concat(meta.image || 'no image', "\n\t\t\tcategories: ").concat(meta.categories || 'no categories', "\n\t\t\tdescription: ").concat(meta.description || 'no description', "\n\t\t\tdraft: ").concat(meta.isDraft || true, "\n\t\t\tproject_info: ").concat(meta.title, "\n      ---\n      ").concat(meta.body);
                return [2 /*return*/, mdTemplate];
            }
            catch (e) {
                console.error('templating failed');
                // Promise.resolve(meta)
                //   .then((data: any) => {
                //     // console.error('template failed with meta: ', data)
                //     return e;
                //   });
            }
            return [2 /*return*/];
        });
    });
}
generateProjectFiles()
    .catch(function (e) {
    console.error('main failed');
    console.log(e);
});
//# sourceMappingURL=index.js.map