import {HttpClient} from 'aurelia-http-client'

var defaultConfiguration = {
  loginUrl:           '/auth/sign_in',
  logoutUrl:          '/auth/sign_out',
  identifierField:    'email',
  passwordField:      'password',
  bearerTokenHeaders: ['Access-Token', 'Client', 'Expiry', 'Token-Type', 'Uid'],
  renewBearerToken:   true,
  disabled:           false
}

export class Configuration {
  constructor() {
    this.setDefaults();
  }

  setDefaults() {
    Object.assign(this, defaultConfiguration);
  }
}
