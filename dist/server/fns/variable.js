'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mongoUriGet = exports.mongoRemoteUriGet = exports.mongoLocalUriGet = exports.hostUrlGet = exports.outputResGet = exports.nodeEnvGet = exports.portGet = exports.titleGet = void 0;

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

var mongoLocalUriGet = function mongoLocalUriGet() {
  return process.env.npm_package_config_MONGO_LOCAL_URI;
};

exports.mongoLocalUriGet = mongoLocalUriGet;

var mongoRemoteUriGet = function mongoRemoteUriGet() {
  return process.env.npm_package_config_MONGO_REMOTE_URI;
};

exports.mongoRemoteUriGet = mongoRemoteUriGet;

var mongoUriGet = function mongoUriGet() {
  switch (process.env.NODE_ENV) {
    case 'development':
      return mongoLocalUriGet();

    case 'production':
      return mongoRemoteUriGet();
  }
};

exports.mongoUriGet = mongoUriGet;
//# sourceMappingURL=variable.js.map