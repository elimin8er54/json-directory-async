"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path_1 = __importDefault(require("path"));
var Util_1 = require("./Util");
//Thank you Typescript for forcing me to reformat the code properly with all the errors it gives me.
var Scanner = /** @class */ (function () {
    function Scanner(options) {
        this.showSymbolicLink = false;
        this.showDepth = false;
        this.showSize = true;
        this.showType = true;
        this.showName = true;
        this.showExtension = true;
        this.itemStats = [];
        if (options) {
            if (options.showSymbolicLink)
                this.showSymbolicLink = options.showSymbolicLink;
            if (options.showSize)
                this.showSize = options.showSize;
            if (options.showType)
                this.showType = options.showType;
            if (options.showExtension)
                this.showExtension = options.showExtension;
            if (options.showDepth)
                this.showDepth = options.showDepth;
            if (options.showName)
                this.showName = options.showName;
            if (options.stats)
                this.itemStats = options.stats;
        }
    }
    /**
     * This is a proxy function so that the user does not have
     * to worry about passing the starting depth for the recursive function
     * @param  {String} path
     * @return {Folders | Files}
     */
    Scanner.prototype.scan = function (path, currentProgress) {
        return __awaiter(this, void 0, void 0, function () {
            var depth;
            return __generator(this, function (_a) {
                depth = 1;
                return [2 /*return*/, this.scans(path, depth, currentProgress)];
            });
        });
    };
    /**
     * Recurseivly get files and folders as a json object
     * Should be called by the scan function
     * @param  {String} path
     * @param  {number} depth
     * @return {Folders | Files}
     */
    Scanner.prototype.scans = function (path, depth, currentProgress) {
        return __awaiter(this, void 0, void 0, function () {
            var item, stats, e_1, dir, e_2, _a, fullSize, lstats, e_3;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs.promises.stat(path_1.default.join(path))];
                    case 1:
                        stats = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _b.sent();
                        //I return an error code with a size of 0 because if I return null then there would be no size to calculate.
                        //Which would then cause an error.
                        return [2 /*return*/, { path: path, size: 0 }];
                    case 3:
                        if (!stats.isDirectory()) return [3 /*break*/, 9];
                        item = { path: "", children: [] };
                        dir = void 0;
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, fs.promises.readdir(path)];
                    case 5:
                        dir = _b.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_2 = _b.sent();
                        return [2 /*return*/, { path: path, size: 0 }];
                    case 7:
                        item.path = path_1.default.normalize(path);
                        _a = item;
                        return [4 /*yield*/, Promise.all(dir.map(function (child) { return _this.scans(path + path_1.default.sep + child, depth + 1, currentProgress); }))];
                    case 8:
                        _a.children = _b.sent();
                        fullSize = item.children.reduce(function (previousValue, currentValue) { return previousValue + currentValue.size; }, 0);
                        if (this.showSize) {
                            item.size = fullSize;
                            item.sizeFormatted = Util_1.Util.formatByte(fullSize);
                        }
                        if (this.showDepth) {
                            item.depth = depth;
                        }
                        if (this.showType) {
                            item.type = Util_1.Type.Folder;
                        }
                        if (this.showName) {
                            item.name = path_1.default.basename(path);
                        }
                        return [3 /*break*/, 10];
                    case 9:
                        if (stats.isFile()) {
                            item = { path: "" };
                            item.path = path_1.default.normalize(path);
                            if (this.showSize) {
                                item.size = stats.size;
                                item.sizeFormatted = Util_1.Util.formatByte(stats.size);
                            }
                            if (this.showExtension) {
                                item.extension = path_1.default.extname(path);
                            }
                            if (this.showDepth) {
                                item.depth = depth;
                            }
                            if (this.showType) {
                                item.type = Util_1.Type.File;
                            }
                            if (this.showName) {
                                item.name = path_1.default.basename(path);
                            }
                        }
                        else {
                            //Dummy item incase a check fails. But this should not be called ever unless someone makes a mistake.
                            //It also keeps Typescript happy.
                            item = { path: "Error", size: 0 };
                        }
                        _b.label = 10;
                    case 10:
                        if (this.itemStats) {
                            this.itemStats.forEach(function (stat) {
                                if (!item.properties) {
                                    item.properties = {};
                                }
                                item.properties[stat] = stats[stat];
                            });
                        }
                        if (!this.showSymbolicLink) return [3 /*break*/, 15];
                        lstats = void 0;
                        _b.label = 11;
                    case 11:
                        _b.trys.push([11, 13, , 14]);
                        return [4 /*yield*/, fs.promises.lstat(path_1.default.join(path))];
                    case 12:
                        lstats = _b.sent();
                        return [3 /*break*/, 14];
                    case 13:
                        e_3 = _b.sent();
                        //I return an error code with a size of 0 because if I return null then there would be no size to calculate.
                        //Which would then cause an error.
                        return [2 /*return*/, { path: path, size: 0 }];
                    case 14:
                        item.isSymbolicLink = lstats.isSymbolicLink();
                        _b.label = 15;
                    case 15:
                        if (currentProgress) {
                            currentProgress(item);
                        }
                        return [2 /*return*/, item];
                }
            });
        });
    };
    return Scanner;
}());
exports.default = Scanner;
