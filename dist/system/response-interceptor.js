System.register([], function (_export) {
  "use strict";

  var ResponseInterceptor;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      ResponseInterceptor = (function () {
        function ResponseInterceptor(callback, configuration) {
          _classCallCheck(this, ResponseInterceptor);

          this.callback = callback;
          this.configuration = configuration;
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
              for (var _iterator = this.configuration.bearerTokenHeaders[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

      _export("ResponseInterceptor", ResponseInterceptor);
    }
  };
});