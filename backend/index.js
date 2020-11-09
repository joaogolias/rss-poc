"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var node_html_parser_1 = require("node-html-parser");
var rss_parser_1 = __importDefault(require("rss-parser"));
var app = express_1["default"]();
Array.prototype.selfConcat = function () {
    if (!Array.isArray(this[0])) {
        return this;
    }
    return this.reduce(function (acc, curr) {
        return acc.concat(curr);
    }, []);
};
console.log("heeeere");
app.get("/rss", function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var parseFeeds, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("\n\nabc\n\n");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                parseFeeds = function (inputs) { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Promise.all(inputs.map(function (input) { return __awaiter(void 0, void 0, void 0, function () {
                                    var parser, feed;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                parser = new rss_parser_1["default"]();
                                                return [4 /*yield*/, parser.parseURL(input.link)];
                                            case 1:
                                                feed = _a.sent();
                                                return [2 /*return*/, (feed.items || [])
                                                        .filter(input.filter || (function () { return true; }))
                                                        .map(function (item) {
                                                        if (!item.content) {
                                                            return item;
                                                        }
                                                        var rootHtml = node_html_parser_1.parse(item.content);
                                                        var img = rootHtml.querySelector("img");
                                                        var src = img && img.rawAttributes["src"];
                                                        return __assign({ imageSource: src || input.defaultThumbnail }, item);
                                                    })];
                                        }
                                    });
                                }); }))];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result.selfConcat()];
                        }
                    });
                }); };
                return [4 /*yield*/, parseFeeds([
                        {
                            link: 'http://exame.com.br/rss',
                            filter: function (item) {
                                if (item.categories) {
                                    return item.categories.filter(function (cat) {
                                        return cat.toLocaleLowerCase().indexOf("mercado") !== -1 ||
                                            cat.toLocaleLowerCase().indexOf("negócios") !== -1;
                                    }).length > 0;
                                }
                                return true;
                            },
                            defaultThumbnail: "data:image/png;base64,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"
                        },
                        { link: 'http://g1.globo.com/dynamo/economia/rss2.xml', defaultThumbnail: "data:image/png;base64,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" },
                        { link: 'http://g1.globo.com/dynamo/politica/rss2.xml', defaultThumbnail: "data:image/png;base64,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" }
                    ])];
            case 2:
                result = _a.sent();
                result.unshift({
                    imageSource: "asioji",
                    title: "GOLI, DEU BOM",
                    content: "<div> </div>",
                    contentSnippet: "OLAA"
                });
                res.send({
                    qtd: result.length,
                    items: result
                });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(400).send({
                    message: err_1.message
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen("3000", function () {
    console.log("Running on 8080");
});
