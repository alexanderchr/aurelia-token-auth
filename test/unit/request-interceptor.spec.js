import {RequestInterceptor} from '../../src/request-interceptor';
import {Headers} from 'aurelia-http-client';

describe('request interceptor', () => {
  var bearerToken, interceptor;
  beforeEach(() => {
    bearerToken = { 'a': 'd', 'c': 'd' }
    interceptor = new RequestInterceptor(bearerToken);
  })

  describe('constructor', () => {
    it('constructs the interceptor properly', () => {
      expect(interceptor.bearerToken).toEqual(bearerToken);
    })
  });

  describe('#request', () => {
    var message, headers;

    beforeEach(() => {
      headers = new Headers({ aheader: 'some' });
      message = { headers: new Headers(Object.assign({}, headers.headers)) };
    });

    it('returns message', () => {
      expect(interceptor.request(message)).toBe(message);
    });

    describe('when bearer token is empty', () => {
      beforeEach(() => {
        interceptor.bearerToken = {};
      });

      it('does not modify the message headers', () => {
        interceptor.request(message);
        expect(message.headers).toEqual(headers);
      });
    });

    describe('when bearer token is not empty', () => {
      it('is appended to the message as headers', () => {
        interceptor.request(message);
        expect(message.headers.headers).toEqual(jasmine.objectContaining(bearerToken));
      });
    });
  });
});
