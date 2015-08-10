"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResponseInterceptor = (function () {
  function ResponseInterceptor(callback, bearerTokenHeaders) {
    _classCallCheck(this, ResponseInterceptor);

    this.callback = callback;
    this.bearerTokenHeaders = bearerTokenHeaders;
  }

  _createClass(ResponseInterceptor, [{
    key: "response",
    value: function response(message) {
      var bearerToken = {};
      var bearerTokenIncomplete = false;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.bearerTokenHeaders[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var k = _step.value;

          if (message.headers.get(k)) {
            bearerToken[k] = message.headers.get(k);
          } else {
            bearerTokenIncomplete = true;
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (!bearerTokenIncomplete) {
        this.callback(bearerToken);
      }

      return message;
    }
  }]);

  return ResponseInterceptor;
})();

exports.ResponseInterceptor = ResponseInterceptor;