# aurelia-token-auth

A wrapper around Aurelia's http client that handles token authorization. Works out of the box with [devise_token_auth](https://github.com/lynndylanhurley/devise_token_auth) and is configurable to work with pretty much any token provider that uses headers.

## Usage

```javascript
var client = TokenAuthHttpClient();
client.login('username', 'password').then(
  (response) => {
    // may be used as a regular aurelia-http-client
    client.get('super/secret/url').then(
      (response) => {
        client.logout();
      }
    );
  }
);

```

## Configuration

```javascript
var c = client.tokenAuthConfiguration;
c.loginUrl = '/auth/sign_in'; 
c.logoutUrl = '/auth/sign_out'; // urls used by the login and logout helpers
c.identifierField = 'email'; // 'user identifier' field used by login
c.passwordField = 'password'; 
c.bearerTokenHeaders = ['Access-Token', 'Client', 'Expiry', 'Token-Type', 'Uid']; // The headers
// making up the bearer token. These will be retrieved from responses and appended to requests. 
c.renewBearerToken = false; // Renews bearer token with every response if set to true.
c.disabled = false; // Disables retrieving and appending bearer tokens
```

## Notes

* A bearer token will not be saved unless all headers are present in the response.
* To use the helper methods login and logout, the client has to be configured with a base url.

## Todo

* Add support for aurelia events.
* Use same configuration as aurelia-http-client
