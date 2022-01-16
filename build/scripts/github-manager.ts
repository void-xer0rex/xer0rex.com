require('dotenv').config()
// const { v4: uuidv4 } = require('uuid')
var axios = require('axios').default;
var http = require('http');
var https = require('https');
var axiosInstance = axios.create({
  
  //60 sec timeout
  timeout: 60000,
  
  //keepAlive pools and reuses TCP connections, so it's faster
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true,  }),
  
  //follow up to 10 HTTP 3xx redirects
  maxRedirects: 10,
  
  //cap the maximum content length we'll accept to 50MBs, just in case
  maxSockets: 100,
  maxFreeSockets: 10,
  
  freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
  maxContentLength: 50 * 1000 * 1000
});

var fs = require('fs');

declare type Credentials = {
  username: string;
  password: string
}

const GITHUB_CREDENTIALS: Credentials = {
  username: process.env.GITHUB_USERNAME,
  password: process.env.GITHUB_API_KEY
}

const USER_ENDPOINT = 'https://api.github.com/users'
const DOMAIN: string = 'api.github.com';
const GIST_ENDPOINT: string = `https://${DOMAIN}/gists`
const PERSONAL_ACCESS_TOKEN: string = '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';
const BASIC_AUTH: string = `token ${PERSONAL_ACCESS_TOKEN}`;

async function oktokitExample(){
  // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
  
  // Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();
  console.log("Hello, %s", login);  
}

oktokitExample()
  .then(() => {
    console.log('Done!')
  }).catch(e => console.error(e.name + e.message))
// const OAUTH_REDIRECT: string = 'https://xer0rex.com/oauth';
// const CLIENT_ID: string = 'eaabe3c2d11922cd669d';

const HEADERS: { [header: string]: string } = {
  "User-Agent": "0rexer0",
  "Access-Control-Allow-Origin": "*",
  "Authorization": BASIC_AUTH,
  "Contet-Type": "application/json"
};          

// // Preflight Headers // 
// // const PREFLIGHT_HEADERS = {
// //   "Access-Control-Allow-Headers": "Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since, X-GitHub-OTP, X-Requested-With",
// //   "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE",
// //   "Access-Control-Expose-Headers": "ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval",
// //   "Access-Control-Max-Age": "86400",
// // }

// // For OAuth flow
// // step 1 - get the code returned from a user signin
// /**
//  * Parameters
//  *Name	Type	Description
//  *¸client_id	string	Required. The client ID you received from GitHub when you registered.
//  * ¸redirect_uri	string	The URL in your application where users will be sent after authorization. See details below about redirect urls.
//  ¸login	string	Suggests a specific account to use for signing in and authorizing the app.
//  scope	string	A space-delimited list of scopes. If not provided, scope defaults to an empty list for users that have not authorized any scopes for the application. For users who have authorized scopes for the application, the user won't be shown the OAuth authorization page with the list of scopes. Instead, this step of the flow will automatically complete with the set of scopes the user has authorized for the application. For example, if a user has already performed the web flow twice and has authorized one token with user scope and another token with repo scope, a third web flow that does not provide a scope will receive a token with user and repo scope.
//  state	string	An unguessable random string. It is used to protect against cross-site request forgery attacks.
//  allow_signup	string	Whether or not unauthenticated users will be offered an option to sign up for GitHub during the OAuth flow. The default is true. Use false when a policy prohibits signups. 
//  * */
// async function getUserOAuthCode(): Promise<any> {

//   // if (localStorage.getItem('state')) {
//   //   return localStorage.getItem('state');
//   // }
//   // localStorage.setItem('state', uuidv4());
//   const signinURL = 'https://github.com/login/oauth/authorize';
//   // 'redirect_uri': 'https://xer0rex.com/oauth',
//   const paramsObj: {} = {
//     'client_id': CLIENT_ID,
//     'redirect_uri': OAUTH_REDIRECT,
//     'scope': ['public_repo']
//   }

//   const paramsF: (params: { [key: string]: string }) => string = ((params: { [key: string]: string }) => {
//     return Object
//       .keys(params)
//       .reduce((accumulated, currentKey, i) => {
//         return accumulated += i === 0
//           ? `${currentKey}=${params[currentKey]}`
//           : `&${currentKey}=${params[currentKey]}`;
//       }, '?');
//   });

//   const params = paramsF(paramsObj)
//   const url = encodeURI(signinURL + params);
//   const request: any = {
//     url,
//     method: 'GET',
//     headers: {
//       'User-Agent': "0rexer0",
//       'Access-Control-Allow-Origin': '*',
//       'X-Rex': 'Loves You!'
//     }
//   };
// }

/**
 * fetches all the gists of the current service user and returns an array of Gists
 * @returns []GithubClient.Gist
 */
async function getGists() {

  // const result: any s= await getUserOAuthCode()
  //   .then(async (oAuthCodeResult): Promise<any> => await oAuthCodeResult.json())
  //   .catch(e => console.error('oAuth2 code retreival failed: ' + e.message));

  // console.log('getUserOAuthCode call resulted: ', result);

  const requestConfig: {} = {
    url: GIST_ENDPOINT,
    method: 'GET',
    headers: HEADERS,
  };

  try {
    return await axiosInstance(requestConfig)
  } catch (e: any) {
    console.error('error: ' + (e.message)
      ? e.name + ': ' + e.message
      : 'failed to make async REST call')
    console.error('Stack Trace:> ', e.stack);
    return e;
  }
}

declare type GetGithubData = (
  user: string,
  path: string
) => any
/**
 * consumes endpoint paths a nd fetch target data or returns an error
 * @param user string
 * @param paths ...string | string[] | "repos" | "gists" 
 */
async function getGithubData<P extends string[]>(user: string, ...paths: [string, ...P]): Promise<any> {
  const githubPath = (p: string): string => encodeURI(`${USER_ENDPOINT}/${user}/${p}`);
  
  return await new Promise(async (resolve, reject) => {
    const responses: any[] = paths
      .map(async path => {
        
        const url: string = githubPath(path);
        const axiosConfig = {
          url,
          method: 'GET',
          credentials: GITHUB_CREDENTIALS
        };
        return await axiosInstance(axiosConfig)
            .then((axiosResponse: {[key: string]: any}) => {
              console.log('status: ', axiosResponse.status);
              const {data} = axiosResponse
              return data;
            }).catch((e: Error) => {
              console.error('axios call failed: ', e.name);
              console.error(e.message);
              reject(e);
            })
        });
    resolve(responses);
  });
}


//   for (const path of paths) {
//     return await fetch(encodeURI(`${USER_ENDPOINT}/${user}/${path}`))
//     .then(async result => {
//       return await result.json()
//     })
//     .catch(e => e);
//   }
//  }

//https://advancedweb.hu/how-to-implement-an-exponential-backoff-retry-strategy-in-javascript/
declare type CallWithRetry = (
  request: any,
  depth?: number
) => Promise<any>;

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

const callWithRetry: (CallWithRetry) = async (
  request: any,
  depth: number = 0
) => {
  try {
    return await axios(request);
  } catch (e) {
    if (depth > 7) {
      console.error(e.message);
      // console.log(e);
      // throw e;
    }
    await wait(2 ** depth * 10);
    return callWithRetry(request, depth + 1);
  }
}

declare interface AsyncSaveFileOptions {
  path: string;
  data: any;
  callback: (error: Error) => void
}

async function saveFile(options: AsyncSaveFileOptions) {
  return await new Promise(async (resolve, reject) => {

    console.log('Saving file!');

    await fs.wrirteFile(encodeURI(options.path), options.data, (err: any) => {
        if (err) return reject(err)
        if (options.callback) {
          
          // @ts-ignore
          options.callback((e: Error) => {
            return resolve(e);
          });
        }
        
        // console.log('file', file);
        return resolve(201);
      });
  });
}

declare interface StoreData {
  [key: string]: any | { options: any }
}


declare interface Store {
  this: any;
  save: any;
  fetch: any;
  close: () => any;
  // @ts-ignore
  findOrCreateDoc: (name: string) => any;
}


module.exports = {
  callWithRetry,
  getGists,
  getGithubData,
  saveFile
}

