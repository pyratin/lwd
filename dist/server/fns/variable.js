'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hostUrlGet = exports.outputResGet = exports.nodeEnvGet = exports.portGet = exports.titleGet = void 0;

var titleGet = function titleGet() {
  return process.env.npm_package_name;
};

exports.titleGet = titleGet;

var portGet = function portGet() {
  switch (true) {
    case !!process.env.PORT:
      return process.env.PORT;

    default:
      return process.env.npm_package_config_PORT;
  }
};

exports.portGet = portGet;

var nodeEnvGet = function nodeEnvGet() {
  return process.env.NODE_ENV;
};

exports.nodeEnvGet = nodeEnvGet;

var outputResGet = function outputResGet() {
  return process.env.npm_package_config_OUTPUT_RES;
};

exports.outputResGet = outputResGet;

var hostUrlGet = function hostUrlGet(req) {
  return "\n    ".concat(req.protocol, "://").concat(req.get('host'), "\n  ").trim();
};

exports.hostUrlGet = hostUrlGet;
//# sourceMappingURL=variable.js.map