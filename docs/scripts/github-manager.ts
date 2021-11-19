// @ts-ignore
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

console.log(uuidv4());

const VERSION = 'v3';
const DOMAIN: string = 'api.github.com';
const GIST_B64_PATH: string = `/application/vnd.github.${VERSION}.base64`
const PERSONAL_ACCESS_TOKEN: string = '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';
const BASIC_AUTH: string = `token ${PERSONAL_ACCESS_TOKEN}`;
const HEADERS: {[header: string]: string} = {
    "User-Agent": "0rexer0",
    "Access-Control-Allow-Origin": "*",
    "Authorization": BASIC_AUTH
};
const OAUTH_REDIRECT: string = 'https://xer0rex.com/oauth';

const CLIENT_ID: string = 'eaabe3c2d11922cd669d';

    // Preflight Headers // 
    // "Access-Control-Allow-Headers": "Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since, X-GitHub-OTP, X-Requested-With",
    // "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE",
    // "Access-Control-Expose-Headers": "ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval",
    // "Access-Control-Max-Age": "86400",
// }
const URL = DOMAIN + GIST_B64_PATH;

// For OAuth flow
// step 1 - get the code returned from a user signin
/**
 * Parameters
 Name	Type	Description
 ¸client_id	string	Required. The client ID you received from GitHub when you registered.
 ¸redirect_uri	string	The URL in your application where users will be sent after authorization. See details below about redirect urls.
 ¸login	string	Suggests a specific account to use for signing in and authorizing the app.
 scope	string	A space-delimited list of scopes. If not provided, scope defaults to an empty list for users that have not authorized any scopes for the application. For users who have authorized scopes for the application, the user won't be shown the OAuth authorization page with the list of scopes. Instead, this step of the flow will automatically complete with the set of scopes the user has authorized for the application. For example, if a user has already performed the web flow twice and has authorized one token with user scope and another token with repo scope, a third web flow that does not provide a scope will receive a token with user and repo scope.
 state	string	An unguessable random string. It is used to protect against cross-site request forgery attacks.
 allow_signup	string	Whether or not unauthenticated users will be offered an option to sign up for GitHub during the OAuth flow. The default is true. Use false when a policy prohibits signups. 
 * */  
export async function getUserOAuthCode() {
  console.log('Authing');
  localStorage.setItem('state', uuidv4());
  console.log('test', uuidv4());
  const signinURL =  'https://github.com/login/oauth/authorize';
  // 'redirect_uri': 'https://xer0rex.com/oauth',
  const paramsObj: {} = {
    'client_id': CLIENT_ID,
    'redirect_uri': OAUTH_REDIRECT,
    'scope': ['public_repo']
  }

  const paramsF: (params: {[key: string]: string}) => string = ((params: {[key: string]: string}) => {
    return Object.keys(params).reduce((accumulated, currentKey, i) => {
      return accumulated += i === 0 
      ? `${currentKey}=${params[currentKey]}` 
      : `&${currentKey}=${params[currentKey]}`;
    }, '?');
});

  const params = paramsF(paramsObj)
  const url = encodeURI(signinURL + params);
  const request: any = new Request(url, {
  headers: {
    'User-Agent': "0rexer0",
    'Access-Control-Allow-Origin': '*',
    'X-Rex': 'Loves You!'
  }
});
  return await fetch(signinURL, request);
}


export async function getGists() { 
  console.log('running gists');
  const result = await getUserOAuthCode()
  .then(result => {
    return result
  })
  .catch(e => console.error('oAuth2 code retreival failed: ' +  e.message));
  
  console.log('getUserOAuthCode call resulted: ', result);


  const requestConfig: Request = new Request(URL, {  
    headers: HEADERS,
  });
  
  console.log('making REST call with: ', requestConfig);
    return await fetch(URL, requestConfig
      ).then(result => result
        .json()
        .then((response: any) => {
          console.log('JSON response', response);
          return response;
      })
    ).catch(e => {
        console.log('error: ' + e.status + ': ' + e.statusText);
    })
}