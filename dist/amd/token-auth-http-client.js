define(['exports', './configuration', './request-interceptor', './response-interceptor', 'aurelia-http-client'], function (exports, _configuration, _requestInterceptor, _responseInterceptor, _aureliaHttpClient) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var TokenAuthHttpClient = (function (_HttpClient) {
    _inherits(TokenAuthHttpClient, _HttpClient);

    function TokenAuthHttpClient() {
      _classCallCheck(this, TokenAuthHttpClient);

      _get(Object.getPrototypeOf(TokenAuthHttpClient.prototype), 'constructor', this).call(this);
      this.bearerToken = undefined;
      this.tokenAuthConfiguration = new _configuration.Configuration();
    }

    _createClass(TokenAuthHttpClient, [{
      key: 'setBearerToken',
      value: function setBearerToken(bearerToken) {
        this.bearerToken = bearerToken;
      }
    }, {
      key: 'send',
      value: function send(message, transformers) {
        message.interceptors = message.interceptors || [];

        var conf = this.tokenAuthConfiguration;
        if (!conf.disabled) {
          message.interceptors.unshift(new _requestInterceptor.RequestInterceptor(this.bearerToken));
          if (conf.renewBearerToken || !this.bearerToken) {
            message.interceptors.unshift(new _responseInterceptor.ResponseInterceptor(this.setBearerToken.bind(this), this.tokenAuthConfiguration.bearerTokenHeaders));
          }
        }

        return new _aureliaHttpClient.HttpClient().send(message, transformers);
        return _get(Object.getPrototypeOf(TokenAuthHttpClient.prototype), 'send', this).call(this, message, transformers);
      }
    }, {
      key: 'login',
      value: function login(identifier, password, identifierField) {
        var conf = this.tokenAuthConfiguration;
        var identifierField = identifierField || conf.identifierField;

        var url = conf.loginUrl;
        var params = {};
        params[identifierField] = identifier;
        params[conf.passwordField] = password;
        console.log(params);
        return this.createRequest(url).asPost().withParams(params).send();
      }
    }, {
      key: 'logout',
      value: function logout() {
        var url = this.tokenAuthConfiguration.logoutUrl;
        return this.createRequest(url).asDelete().send();
      }
    }]);

    return TokenAuthHttpClient;
  })(_aureliaHttpClient.HttpClient);

  exports.TokenAuthHttpClient = TokenAuthHttpClient;
});