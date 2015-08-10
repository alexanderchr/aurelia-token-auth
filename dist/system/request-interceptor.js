System.register([], function (_export) {
  "use strict";

  var RequestInterceptor;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      RequestInterceptor = (function () {
        function RequestInterceptor(bearerToken) {
          _classCallCheck(this, RequestInterceptor);

          this.bearerToken = bearerToken;
        }

        _createClass(RequestInterceptor, [{
          key: "request",
          value: function request(message) {
            for (var k in this.bearerToken) {
              message.headers.add(k, this.bearerToken[k]);
            }
            return message;
          }
        }]);

        return RequestInterceptor;
      })();

      _export("RequestInterceptor", RequestInterceptor);
    }
  };
});