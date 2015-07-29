
export class ResponseInterceptor {
  constructor(callback, bearerTokenHeaders) {
    this.callback = callback;
    this.bearerTokenHeaders = bearerTokenHeaders;
  }

  response(message) {
    var bearerToken = { };
    var bearerTokenIncomplete = false;

    for(var k of this.bearerTokenHeaders) {
      if(message.headers.get(k)) {
        bearerToken[k] = message.headers.get(k);
      } else {
        bearerTokenIncomplete = true;
        break;
      }
    }
    
    if (!bearerTokenIncomplete) {
      this.callback(bearerToken);
    }

    return message;
  }
}
