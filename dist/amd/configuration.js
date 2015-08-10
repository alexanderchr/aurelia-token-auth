define(['exports', 'aurelia-http-client'], function (exports, _aureliaHttpClient) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var defaultConfiguration = {
    loginUrl: '/auth/sign_in',
    logoutUrl: '/auth/sign_out',
    identifierField: 'email',
    passwordField: 'password',
    bearerTokenHeaders: ['Access-Token', 'Client', 'Expiry', 'Token-Type', 'Uid'],
    renewBearerToken: true,
    disabled: false
  };

  var Configuration = (function () {
    function Configuration() {
      _classCallCheck(this, Configuration);

      this.setDefaults();
    }

    _createClass(Configuration, [{
      key: 'setDefaults',
      value: function setDefaults() {
        Object.assign(this, defaultConfiguration);
      }
    }]);

    return Configuration;
  })();

  exports.Configuration = Configuration;
});