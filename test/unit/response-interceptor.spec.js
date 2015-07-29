import {ResponseInterceptor} from '../../src/response-interceptor';
import {Headers} from 'aurelia-http-client';

var bearerToken = {
  'Access-Token': 'atoken',
  'Client': 'aclient',
  'Expiry': 'sometimefarinthefuture',
  'Token-Type': 'bearer',
  'Uid': '123'
}

describe('response interceptor', () => {

  describe('constructor', () => {
    it('constructs the interceptor properly', () => {
      var callback = new Function();
      var bearerTokenHeaders = { a: 'b' };
      var interceptor = new ResponseInterceptor(callback, bearerTokenHeaders)
      expect(interceptor.callback).toBe(callback);
      expect(interceptor.bearerTokenHeaders).toBe(bearerTokenHeaders);
    })
  });

  describe('#response', () => {
    var message, callback, configuration, interceptor;

    beforeEach(() => {
      message = { headers: new Headers() };
      callback = jasmine.createSpy('callback');
      interceptor = new ResponseInterceptor(callback, Object.keys(bearerToken));
    });

    it('returns message', () => {
      message.foo = 'bar';
      expect(interceptor.response(message)).toBe(message);
    });

    describe('when the response message is correctly authed', () => {
      beforeEach(() => {
        message.headers = new Headers(bearerToken);
        interceptor.response(message);
      });

      it('calls the callback function with the bearer token', () => {
        expect(callback).toHaveBeenCalledWith(bearerToken);
      });
    });

    describe('when the response message does not contain all auth headers', () => {
      // poor man's object 'slice':
      var slicedBearerToken = new Object();
      for(var k of Object.keys(bearerToken).slice(2)) slicedBearerToken[k]=bearerToken[k];
      
      beforeEach(() => {
        message.headers = new Headers(slicedBearerToken);
        interceptor.response(message);
      });

      it('does not call the callback function', () => {
        expect(callback).not.toHaveBeenCalled();
      });
    });
  });
});
