
export class RequestInterceptor {
  constructor() {
    this.bearerToken = { };
  }

  setBearerToken(bearerToken) {
    this.bearerToken = bearerToken;
  }

  request(message) {
    for(var k in this.bearerToken) {
      message.headers.add(k, this.bearerToken[k]);
    }
    return message;
  }
}
