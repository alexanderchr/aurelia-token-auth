import {HttpRequestMessage} from 'aurelia-http-client'
import {TokenAuthHttpClient} from '../../src/token-auth-http-client';
import {Configuration} from '../../src/configuration';

describe('authorizing http client', () => {
  var client;
  beforeEach(() => {
    client = new TokenAuthHttpClient();
  });

  describe('constructor', () => {
    it('constructs the client properly', () => {
      expect(client.tokenAuthConfiguration).toEqual(jasmine.any(Configuration))
    });
  });

  describe('set bearer token', () => {
    var bearerToken = { a: 'token', b: 'some' };

    it('sets bearer token', () =>  {
      client.setBearerToken(bearerToken);
      expect(client.bearerToken).toEqual(bearerToken);
    });
  });

  describe('send', () => {
    var message;

    beforeEach(() => {
      jasmine.Ajax.install();
      message = new HttpRequestMessage();
      message.url = 'foo/bar';
      message.method = 'get';
    });

    afterEach(() => {
      jasmine.Ajax.uninstall();
    });

    it('appends bearer token to requests', (done) => {
      client.bearerToken = { 'a': 'bc' };
      jasmine.Ajax.stubRequest('foo/bar').andReturn({ status: 200 });

      client.send(message).then((response) => {
        var requestHeaders = jasmine.Ajax.requests.mostRecent().requestHeaders;
        expect(requestHeaders).toEqual(jasmine.objectContaining({ 'a': 'bc' }));
        done();
      });
    });

    it('stores bearer tokens from responses', (done) => {
      var bearerToken = { 'aheader': 'avalue', 'something': 'else' };
      client.tokenAuthConfiguration.bearerTokenHeaders = Object.keys(bearerToken);
      jasmine.Ajax.stubRequest('foo/bar').andReturn({ status: 200, responseHeaders: Object.assign({}, bearerToken) });

      client.send(message).then((response) => {
        expect(client.bearerToken).toEqual(bearerToken);
        done();
      });
    });

    describe('bearer token is defined and renew bearer token is false', () => {
      beforeEach(() => {
        client.tokenAuthConfiguration.renewBearerToken = false;
        client.bearerToken = { some: 'other' };
      });

      it('does not store bearer tokens', (done) => {
        var bearerToken = { 'aheader': 'avalue', 'something': 'else' };
        client.tokenAuthConfiguration.bearerTokenHeaders = Object.keys(bearerToken);
        jasmine.Ajax.stubRequest('foo/bar').andReturn({ status: 200, responseHeaders: Object.assign({}, bearerToken) });

        client.send(message).then((response) => {
          expect(client.bearerToken).toEqual({ some: 'other' });
          done();
        });
      });
    });
  });
});

