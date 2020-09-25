'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _mediawikiFetch = _interopRequireDefault(require("./mediawikiFetch"));

var _sentencesTokenizedGet = _interopRequireDefault(require("./sentencesTokenizedGet"));

var queryGet = function queryGet(actorUd) {
  return "\n    https://en.wikipedia.org/api/rest_v1/page/mobile-sections-lead/".concat(actorUd, "\n  ").trim();
};

var sentenceLeadGet = function sentenceLeadGet($) {
  var _$$toArray$map = $('p').toArray().map(function (el) {
    return $(el).text();
  }),
      _$$toArray$map2 = (0, _slicedToArray2["default"])(_$$toArray$map, 1),
      paragraphLead = _$$toArray$map2[0];

  var sentenceLead = paragraphLead ? (0, _sentencesTokenizedGet["default"])(paragraphLead)[0] : '';
  return sentenceLead;
};

var occupationGet = function occupationGet($) {
  var occupation = $('th:contains(Occupation)').parent().find('td').text();
  return occupation;
};

var textGet = function textGet(res) {
  var sectionLeadText = res.sections[0].text;

  var $ = _cheerio["default"].load(sectionLeadText);

  var sentenceLead = sentenceLeadGet($);
  var occupation = occupationGet($);
  var text = "\n    ".concat(sentenceLead, " ").concat(occupation, "\n  ").trim();
  return text;
};

var _default = function _default(actor) {
  var genderUnknown = 'unknown';

  if (!(actor === null || actor === void 0 ? void 0 : actor.ud)) {
    return Promise.resolve(genderUnknown);
  }

  return (0, _mediawikiFetch["default"])(queryGet(encodeURIComponent(actor.ud))).then(function (res) {
    var text = textGet(res);

    switch (true) {
      case !!text.match(/actress/i):
        return 'woman';

      case !!text.match(/(actor|comedian)/i):
        return 'man';

      default:
        return genderUnknown;
    }
  });
};

exports["default"] = _default;
//# sourceMappingURL=actorGenderGet.js.map