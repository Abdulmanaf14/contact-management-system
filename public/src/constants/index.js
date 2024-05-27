"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugLevel = exports.APP_VERSION = exports.SECRET_KEY = exports.HOST = exports.PORT = exports.DEBUG_LEVEL = void 0;
const package_json_1 = __importDefault(require("../../package.json"));
exports.DEBUG_LEVEL = process.env.FEDO_ID_SERVER_LOG_LEVEL || 'debug';
exports.PORT = parseInt(process.env.FEDO_ID_SERVER_PORT || '', 10) || 38000;
exports.HOST = process.env.FEDO_ID_SERVER_HOST || '0.0.0.0';
exports.SECRET_KEY = process.env.SECRET_KEY || 'qwertyuioplkjhgfdsazxcvbm';
exports.APP_VERSION = package_json_1.default.version;
exports.debugLevel = (() => {
    if (exports.DEBUG_LEVEL == 'debug')
        return ['debug', 'warn', 'error'];
    if (exports.DEBUG_LEVEL == 'warn')
        return ['warn', 'error'];
    if (exports.DEBUG_LEVEL == 'error')
        return ['error'];
    return ['debug'];
})();
//# sourceMappingURL=index.js.map