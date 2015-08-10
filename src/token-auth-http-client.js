import {Configuration} from './configuration';
import {RequestInterceptor} from './request-interceptor';
import {ResponseInterceptor} from './response-interceptor';
import {HttpClient} from 'aurelia-http-client';

export class TokenAuthHttpClient extends HttpClient {
  constructor() {
    super();
    this.bearerToken = undefined;
    this.tokenAuthConfiguration = new Configuration();
  }

  setBearerToken(bearerToken) {
    this.bearerToken = bearerToken;
  }

  // The interceptors could be added in a less intrusive way but
  // this allows enabling and disabling at will.
  send(message, transformers) {
    message.interceptors = message.interceptors || [];

    var conf = this.tokenAuthConfiguration;
    if(!conf.disabled) {
      message.interceptors.unshift(new RequestInterceptor(this.bearerToken));
      if(conf.renewBearerToken || !this.bearerToken) {
        message.interceptors.unshift(new ResponseInterceptor(this.setBearerToken.bind(this), this.tokenAuthConfiguration.bearerTokenHeaders));
      }
    }

    return new HttpClient().send(message, transformers);
    return super.send(message, transformers);
  }

  login(identifier, password, identifierField) {
    var conf = this.tokenAuthConfiguration;
    var identifierField = identifierField || conf.identifierField;

    var url = conf.loginUrl;
    var params = {};
    params[identifierField] = identifier;
    params[conf.passwordField] = password;
    console.log(params);
    return this.createRequest(url).asPost().withParams(params).send();
  }

  logout() {
    var url = this.tokenAuthConfiguration.logoutUrl;
    return this.createRequest(url).asDelete().send();
  }
}
