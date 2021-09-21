"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = exports.Type = void 0;
var Type;
(function (Type) {
    Type["File"] = "file";
    Type["Folder"] = "folder";
})(Type = exports.Type || (exports.Type = {}));
var Util = /** @class */ (function () {
    function Util() {
    }
    //https://stackoverflow.com/questions/1242266/converting-bytes-to-gb-in-c
    //Changed it to work with javascript/typescript
    Util.formatByte = function (bytes) {
        var suffix = ["B", "KB", "MB", "GB", "TB"];
        var dblSByte = bytes;
        var i;
        for (i = 0; i < suffix.length && bytes >= 1024; i++, bytes /= 1024) {
            dblSByte = bytes / 1024.0;
        }
        return Math.round(dblSByte) + " " + suffix[i];
    };
    return Util;
}());
exports.Util = Util;
