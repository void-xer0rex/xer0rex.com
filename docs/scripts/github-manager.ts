// @ts-ignore
const { v4: uuidv4 } = require('uuid')
const axios = require('axios').default;
const fs = require('fs');
// import { v4 as uuidv4 } from 'uuid';
// import pkg from 'axios';

const VERSION = 'v3';
const USER_ENDPOINT = 'https://api.github.com/users'
const DOMAIN: string = 'api.github.com';
const GIST_B64_PATH: string = `/application/vnd.github.${VERSION}.base64`
const PERSONAL_ACCESS_TOKEN: string = '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';
const BASIC_AUTH: string = `token ${PERSONAL_ACCESS_TOKEN}`;
const HEADERS: { [header: string]: string } = {
  "User-Agent": "0rexer0",
  "Access-Control-Allow-Origin": "*",
  "Authorization": BASIC_AUTH
};
const OAUTH_REDIRECT: string = 'https://xer0rex.com/oauth';

const CLIENT_ID: string = 'eaabe3c2d11922cd669d';
const GIST_ENDPOINT: string = DOMAIN + GIST_B64_PATH;

// Preflight Headers // 
// "Access-Control-Allow-Headers": "Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since, X-GitHub-OTP, X-Requested-With",
// "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE",
// "Access-Control-Expose-Headers": "ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval",
// "Access-Control-Max-Age": "86400",
// }


// For OAuth flow
// step 1 - get the code returned from a user signin
/**
 * Parameters
 *Name	Type	Description
 *¸client_id	string	Required. The client ID you received from GitHub when you registered.
 * ¸redirect_uri	string	The URL in your application where users will be sent after authorization. See details below about redirect urls.
 ¸login	string	Suggests a specific account to use for signing in and authorizing the app.
 scope	string	A space-delimited list of scopes. If not provided, scope defaults to an empty list for users that have not authorized any scopes for the application. For users who have authorized scopes for the application, the user won't be shown the OAuth authorization page with the list of scopes. Instead, this step of the flow will automatically complete with the set of scopes the user has authorized for the application. For example, if a user has already performed the web flow twice and has authorized one token with user scope and another token with repo scope, a third web flow that does not provide a scope will receive a token with user and repo scope.
 state	string	An unguessable random string. It is used to protect against cross-site request forgery attacks.
 allow_signup	string	Whether or not unauthenticated users will be offered an option to sign up for GitHub during the OAuth flow. The default is true. Use false when a policy prohibits signups. 
 * */
// export async function getUserOAuthCode(): Promise<any> {
async function getUserOAuthCode(): Promise<any> {

  if (localStorage.getItem('state')) {
    return localStorage.getItem('state');
  }
  localStorage.setItem('state', uuidv4());
  const signinURL = 'https://github.com/login/oauth/authorize';
  // 'redirect_uri': 'https://xer0rex.com/oauth',
  const paramsObj: {} = {
    'client_id': CLIENT_ID,
    'redirect_uri': OAUTH_REDIRECT,
    'scope': ['public_repo']
  }

  const paramsF: (params: { [key: string]: string }) => string = ((params: { [key: string]: string }) => {
    return Object
      .keys(params)
      .reduce((accumulated, currentKey, i) => {
        return accumulated += i === 0
          ? `${currentKey}=${params[currentKey]}`
          : `&${currentKey}=${params[currentKey]}`;
      }, '?');
  });

  const params = paramsF(paramsObj)
  const url = encodeURI(signinURL + params);
  const request: any = {
    url,
    method: 'POST',
    headers: {
      'User-Agent': "0rexer0",
      'Access-Control-Allow-Origin': '*',
      'X-Rex': 'Loves You!'
    }
  };


  return await makeAsyncCall(request)
    .then(result => result.data);
}

/**
 * fetches all the gists of the current service user and returns an array of Gists
 * @returns []GithubClient.Gist
 */
async function getGists() {

  // const result: any = await getUserOAuthCode()
  //   .then(async (oAuthCodeResult): Promise<any> => await oAuthCodeResult.json())
  //   .catch(e => console.error('oAuth2 code retreival failed: ' + e.message));

  // console.log('getUserOAuthCode call resulted: ', result);

  const requestConfig: {} = {
    url: URL,
    method: 'POST',
    headers: HEADERS,
  };

  return await makeAsyncCall(requestConfig)
    .then(({ data }) => {
      return data;
    }).catch((e: Error) => {
      console.error('error: ' + e.message ? e.name + ': ' + e.message : 'failed to make async REST call')
      console.log('Stack Trace:> ', e.stack);
      return e;
    })
}

/**
 * makes a fetch to github and returns userdata or error
 * @param user string
 * @param paths ...string | string[] | "repos" | "gists" 
 */
async function getGithubData(user: string, ...paths: string[]): Promise<any> {
  const githubPath: any = (p: string): any => encodeURI(`${USER_ENDPOINT}/${user}/${p}`);
  return paths
    .map(async path => await makeAsyncCall(githubPath(path))
      .then(async (res: any) => {
        // console.log('gitHu', res);
        return res
      }));
};


//   for (const path of paths) {
//     return await fetch(encodeURI(`${USER_ENDPOINT}/${user}/${path}`))
//     .then(async result => {
//       return await result.json()
//     })
//     .catch(e => e);
//   }
//  }

async function makeAsyncCall(request: any | string) {
  return await axios(request)
    .then(async (response: any) => {
      return await response.data;
    }).catch((error: Error) => error)
}

declare type AsyncSaveFileOptions = {
  path: string;
  data: any;
  callback:(error: Error) => {}


}

async function saveFile(options: any) {
  return await new Promise((resolve, reject) => {
    fs.writeFile(encodeURI(options.path), options.data, (err: any) => {
      if (err) return reject(err)
      if (options.callback) return options.callback(resolve);
      return resolve(201);
      });
  });
}

module.exports = {
  makeAsyncCall,
  getGists,
  getGithubData,
  getUserOAuthCode,
  saveFile 
};