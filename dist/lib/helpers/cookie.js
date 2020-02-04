"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// cookie 文件
var cookie = {
    // 读取cookie
    read: function (name) {
        var match = document.cookie.match(new RegExp('(^|;\\S*)(' + name + ')=([^;]*)'));
        return match ? decodeURIComponent(match[3]) : null;
    }
};
exports.default = cookie;
//# sourceMappingURL=cookie.js.map