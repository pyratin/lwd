'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _wordsTokenizedGet = _interopRequireDefault(require("./wordsTokenizedGet"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var charactersRenderTextAssignedGetFn = function charactersRenderTextAssignedGetFn(_text, lengthMax) {
  var tokens = (0, _wordsTokenizedGet["default"])(_text).map(function (_ref) {
    var text = _ref.text;
    return text;
  });
  var text = tokens.reduce(function (memo, token) {
    if (memo.length < lengthMax) {
      return "\n          ".concat(memo, " ").concat(token, "\n        ").trim();
    }

    return memo;
  }, '');
  text = text.slice(0, lengthMax);

  if (text.length < _text.length) {
    text = "\n      ".concat(text, "..\n    ").trim();
  }

  return text;
};

var charactersRenderTextAssignedGet = function charactersRenderTextAssignedGet(characters) {
  var lengthMax = 10;
  return characters.reduce(function (memo, character) {
    var renderText = charactersRenderTextAssignedGetFn(character.text, lengthMax);
    return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, character), {}, {
      renderText: renderText
    })]);
  }, []);
};

var charactersConcatedGet = function charactersConcatedGet(_characters) {
  var characters = _characters.reduce(function (memo, character) {
    var dualRoleIndex = character.dualRoleIndex;

    if (character.render && dualRoleIndex >= 0) {
      var renderText = "\n          ".concat(memo[dualRoleIndex].renderText, " / ").concat(character.renderText, "\n        ").trim();
      return [].concat((0, _toConsumableArray2["default"])(memo.slice(0, dualRoleIndex)), [_objectSpread(_objectSpread({}, memo[dualRoleIndex]), {}, {
        renderText: renderText
      })], (0, _toConsumableArray2["default"])(memo.slice(dualRoleIndex + 1)), [_objectSpread(_objectSpread({}, character), {}, {
        render: false
      })]);
    }

    return [].concat((0, _toConsumableArray2["default"])(memo), [character]);
  }, []);

  return characters;
};

var charactersSortedByCastIndexGet = function charactersSortedByCastIndexGet(characters) {
  return characters.sort(function (a, b) {
    switch (true) {
      case a.castIndex > b.castIndex:
        return 1;

      case b.castIndex > a.castIndex:
        return -1;
    }
  });
};

var charactersRenderDetailAssignedGet = function charactersRenderDetailAssignedGet(_characters) {
  var characters = charactersRenderTextAssignedGet(_characters);
  characters = charactersConcatedGet(characters);
  characters = charactersSortedByCastIndexGet(characters);
  return characters;
};

var cardsRenderDetailAssignedGet = function cardsRenderDetailAssignedGet(cards, characters) {
  return cards.reduce(function (memo, card) {
    var character = characters.find(function (character) {
      var _card$character;

      return character.text === ((_card$character = card.character) === null || _card$character === void 0 ? void 0 : _card$character.text);
    });

    if (character) {
      return [].concat((0, _toConsumableArray2["default"])(memo), [_objectSpread(_objectSpread({}, card), {}, {
        dualRoleIndex: character.dualRoleIndex
      })]);
    }

    return [].concat((0, _toConsumableArray2["default"])(memo), [card]);
  }, []);
};

var cardTextGet = function cardTextGet(_ref2) {
  var _text = _ref2.text,
      character = _ref2.character;
  var renderText = _text;

  if (!character) {
    return renderText;
  }

  renderText = "\n    ".concat(renderText.slice(0, character.distance), "<b>").concat(character.text, "</b>").concat(renderText.slice(character.distance + character.text.length), "\n  ").trim();
  return renderText;
};

var cardGet = function cardGet(card) {
  var renderText = cardTextGet(card);
  return _objectSpread(_objectSpread({}, card), {}, {
    renderText: renderText
  });
};

var cardsRenderTextAssignedGet = function cardsRenderTextAssignedGet(cards) {
  return cards.reduce(function (memo, _card) {
    var card = cardGet(_card);
    return [].concat((0, _toConsumableArray2["default"])(memo), [card]);
  }, []);
};

var _default = function _default(deck) {
  var characters = charactersRenderDetailAssignedGet(deck.splash.characters);
  var cards = cardsRenderDetailAssignedGet(deck.cards, characters);
  cards = cardsRenderTextAssignedGet(cards);
  return _objectSpread(_objectSpread({}, deck), {}, {
    cards: cards,
    splash: _objectSpread(_objectSpread({}, deck.splash), {}, {
      characters: characters
    })
  });
};

exports["default"] = _default;
//# sourceMappingURL=deckRenderDetailsAssignedGet.js.map