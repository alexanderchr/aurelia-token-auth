
export class ResponseInterceptor {
  constructor(callback, configuration) {
    this.callback = callback;
    this.configuration = configuration;
  }

  response(message) {
    var bearerToken = { };
    var bearerTokenIncomplete = false;

    for(var k of this.configuration.bearerTokenHeaders) {
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
