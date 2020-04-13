"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const onServerStarted = async bp => {};

const onServerReady = async bp => {};

const entryPoint = {
  onServerStarted,
  onServerReady,
  definition: {
    name: 'task-management',
    menuIcon: 'none',
    menuText: 'Task Management',
    noInterface: false,
    fullName: 'Task Management',
    homepage: 'https://kintone.com'
  }
};
var _default = entryPoint;
exports.default = _default;
//# sourceMappingURL=index.js.map