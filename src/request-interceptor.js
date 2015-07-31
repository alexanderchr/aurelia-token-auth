
export class RequestInterceptor {
  constructor(bearerToken) {
    this.bearerToken = bearerToken;
  }

  request(message) {
    for(var k in this.bearerToken) {
      message.headers.add(k, this.bearerToken[k]);
    }
    return message;
  }
}
