require('dotenv').config();
// require('dotenv').config({path: path.join(cwd, './.env.local') });

var axios = require('axios').default;
var http = require('http');
var https = require('https');

var axiosInstance: any = axios.create({
  //60 sec timeout
  timeout: 60000,
  
  //keepAlive pools and reuses TCP connections, so it's faster
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
  
  //follow up to 10 HTTP 3xx redirects
  maxRedirects: 10,
  
  //cap the maximum content length we'll accept to 50MBs, just in case
  maxContentLength: 50 * 1000 * 1000
});
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

var fs = require('fs')
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const github = require("./github-manager");

const {Octokit} = require("octokit");
// const octokit = new Octokit({ auth: `${process.env.GITHIUB_CLIENT_ID}:${process.env.GITHUB_SECRTET}`});
const octokit = new Octokit({ auth: process.env.GITHUB_API_KEY })
// Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
octokit.rest.users
.getAuthenticated()
  .then((response: any) => {
    console.log('github authz response', response);
    const {data: user} = response;
    console.log('user', user);
    octokit.rest.request({
      accept: 'application/vnd.github.v3+json',
      owner: 'rbeatie'
      // @ts-ignore
    }).then(({data: rbeatie}) => {
      console.log('rbeatie', rbeatie);
      
    })
  });


// ENV STUFF
const cwd: string = process.cwd();
const VERBOSE_LOGGING = false;



let tempnum = 1;
// bug / getting axios is not defined but is declared in github-manager.ts


// disable console.log
// console.log = function() {};

// import * as fs from 'fs';
// import * as path from 'path';
declare type Template = string

declare type TemplateConfig = {
  fileName: string;
  template: string;
  order?: number;
}

declare type ProjectInfo = {
  name: string;
  icon: string;
  meta: string;
}

declare type TemplateFrontMatter = {
  name: string;
  isDraft: boolean;
  body?: string;
  description?: string;
  image?: string;
  created_at?: string;
  categories?: string;
  info?: ProjectInfo[];
  footer?: string;
  error?: Error | null;
  [key: string]: any;
}

declare type Results = {
  order: number;
  data: any;
  name: string;
  error?: Error;
}

declare type ResultsLog = Results[]

/**
 * 
 * will test for the existence of anm error and if so will display it's details to the console
 * 
 * @param test 
 * @returns 
*/
// @ts-ignore
function ifError(test: { error?: Error }) {
  if (!test || !!test.error) {
    console.error(test.error.name);
    console.error(test.error.message)
    if (VERBOSE_LOGGING) {
      console.log(test.error.stack)
      console.log('Non Array poroject metas...', test);
    }
    return false;
  }

  if (VERBOSE_LOGGING) {
    console.log('Project test', test);
  }
}

class PATHWAYS {
  static REPOS = 'repos';
  static GISTS = 'gists';
}


/**
 * Useing a Service User to fetch the project details from Github's API and creates and writes new templates
 */
async function generateProjectContentFiles() {

  // fetch projects data
  // @ts-expect-error
  return new Promise(async (resolve) => {

    const owner = 'rbeatie'; 
    octokit.rest.repos.get({
      owner,
    })
    .then((repos: any) => {
      console.log('repos', repos);
    }).catch((e: any) => {
      console.log('failed with rest call in oktokit')
      console.error(e);
    });
    // await github
    //   .getGithubData('rbeatie', PATHWAYS.REPOS, PATHWAYS.GISTS)
    //   .then((ghDataResponses: any): void => {

    //     for (let _ghDataResponse of ghDataResponses) {
          
    //       console.log(_ghDataResponse);
    //       Promise.resolve(_ghDataResponse)
    //         .then((datas: any): void => {
    //           datas.forEach((projectInfo: any) => {

    //             // filter out gist requessts
    //             const gistTest = /(gists)/;
    //             if (gistTest.exec(projectInfo.url)) {

    //               // console.log('gists', projectInfo)

    //               // template gists
    //               const templates: any[] = Object
    //                 .keys(projectInfo.files)
    //                 .map((name) => {
    //                   const file = projectInfo.files[name];
    //                   const bodyString = `
    //                   ---
    //                   title: ${name}
    //                   date: ${new Date(Date.now())};
    //                   description: ${projectInfo.description}
    //                   ---
    //                   <div id="ID-${file.id}">
    //                   <h2>File:</h2>
    //                   ${file.fileName}
    //                   </div>
    //                   <div>
    //                   ${projectInfo.files[name].content}
    //                   </div>
    //                   `;

    //                   // set TempalteConfig for gist
    //                   const frontMatterConfig: TemplateFrontMatter = {
    //                     name: file.fileName,
    //                     isDraft: false,
    //                     title: name,
    //                     date: new Date(Date.now()).toTimeString(),
    //                     description: projectInfo.description
    //                   }

    //                   const frontmatter = generateFrontMatter(frontMatterConfig)
    //                   return frontmatter + bodyString;


    //                 });

    //               console.log('gist Templates', templates)
    //               writeTemplatesToDir(templates);
    //               resolve(templates);

    //             } // end if



    //             // set TemplateConfig for repose
    //             const repoTest = /(repo)/;
    //             console.log('trying if Repos', projectInfo.name);
    //             if (repoTest.exec(projectInfo.url)) {
    //               console.log('populating with Repos')

    //               // GET README
    //               const README_URL: (userName: string, repoName: string) => string = (userName: string, repoName: string) => `https://api.github.com/repos/${userName}/${repoName}/contents/README.md?ref=master`
    //               console.log('data', README_URL, projectInfo.name);
    //               const readmeUrl: string = README_URL(projectInfo.owner.login, projectInfo.name)
    //               axiosInstance({
    //                 method: 'GET',
    //                 url: readmeUrl,
    //               }).then((readmeResponse: any): void => {
    //                 // console.log('readme', readmeResponse.data);
    //                 console.log('resolving readme')
    //                 resolve(readmeResponse);
    //               })
    //             }
    //           })
    //         })
    //      }
    //   });

    // .forEach(async (_resposne: any) => {
    //   const response = await _resposne
    // return githubnDataResponse
    //   .map(async (_templatesResponse: any) => {

    //     const templatesResponse = await Promise.resolve(_templatesResponse);
    //     // console.log('templakteResponse', templatesResponse);
    //     // itterate projects from response.data
    //     const templates: Promise<Template>[] = await templatesResponse
    //       .map(async (projectMeta: any) => {

    //         // filter out gist urls
    //         const filterPattern = /(gist)/g;
    //         if (await !projectMeta.html_url
    //           .match(filterPattern)) return;

    //         // finding content for article body if repo //
    //         const url: string = projectMeta.html_url + '/README.md';

    //         projectMeta.readme = await axios({
    //           method: 'GET',
    //           url,
    //           headers: HEADERS
    //         }).then((readmeResponse: any) => {
    //           const { data } = readmeResponse;
    //           console.log('README', data);
    //           return data;
    //         }).catch((e: Error) => {
    //           console.error('fetching readme failed: ' + e.message);
    //         });

    //         //    // decodiong the URI encoding on the payload
    //         // const projectMetaDecoded = Object.keys(projectMeta)
    //         // .reduce((acc, key) => {
    //         //   return acc = { ...acc, [key]: decodeURI(projectMeta[key]) };
    //         // }, {});

    //         console.log('projectMetaStuff', projectMeta);
    //         console.log('abo0ut to generate template', projectMeta);

    //         const _template = await generateTemplate(projectMeta);

    //         const template = await Promise.resolve(_template)
    //           .then(async (temp_template): Promise<void> => {

    //             return await temp_template;
    //           });
    //         return await {
    //           fileName: projectMeta.name,
    //           content: template,
    //         }
    //       });

    //     writeTemplatesToDir(templates);

    //     console.log('done generating templates', templates);
    //     const temp = await Promise.resolve(templates[0]);
    //     console.log('sanity', temp);
    //     return templates;
  }); // end Promise
};

function writeTemplateToDir(fileName: string, template: Template, order: number) {
  try {
    
    console.log('Tempalate to write: ', template);
    const filePath: string = path.join(cwd, 'content/english/portfolio',`project-${order}]-${fileName}.md`);
    console.log('path', filePath);
    save(filePath, template);

  } catch (e) {
    console.error('writeTemplateToDir failed with: ', e.name);
    console.error(e.message);
    return e;
  }

}

async function writeTemplatesToDir(templateConfigs: Promise<TemplateConfig>[]) {
  console.log('templates', templateConfigs);

  for (let _config of templateConfigs) {
    // console.log('template???', templates[i]);
    Promise.resolve(_config)
      .then((config: TemplateConfig) => {
        // console.log('template??2', template);
        // console.log('writing to file', template);
        const {fileName, template, order} = config;
        writeTemplateToDir(
          fileName,
          template,
          order 
        );
        return template;
      });
  };
}

// @ts-ignore
function save(
  filepath: string,
  data: any,
): void {
  console.log('writing file: ', typeof data, 'to', filepath);
  fs.writeFile(filepath, data, null, (e: Error) => {
    if (VERBOSE_LOGGING) {
      console.log('write done for: ', filepath);
    }
    if (e) return console.error(e.message);
  });
}


/**
 * 
 * consumes the content data object and builds a template string
 * @param config 
 * @returns 
 */
function generateFrontMatter(config: TemplateFrontMatter) {
  console.log('generating frontmatter', config);
  const frontMatterFields: any = [{ 'title': 'name' }, { 'date': 'created_at' }, { 'image': 'image' }, { 'categories': 'categories' }, { 'description': 'description' }, { 'draft': 'isDraft' }, { 'project_info': 'title' }]

  try {
    const frontMatter: TemplateFrontMatter = frontMatterFields
    .reduce((acc: '', nameKey: {}) => {
      const name: string = Object.keys(nameKey)[0];
      const key: string = Object.keys(nameKey)[1];
      return acc += `/n${name}:${config[key]}`;
    }, '');

    console.log('frontMatter', frontMatter);
    return frontMatter;
    // // console.log('meta', meta);
    // let mdTemplate = `
    // 	---
    // 	title: "${config.name || 'no title'}"
    // 	date: ${config.created_at || new Date(Date.now()).toTimeString || 'date error'}
    // 	image: ${config.image || 'no image'}
    // 	categories: ${config.categories || 'no categories'}
    // 	description: ${config.description || 'no description'}
    // 	draft: ${config.isDraft || true}
    // 	project_info: ${config.title || 'no info provided'}
    //   ---
    //   <div>
    //   ${config.body}
    //   </div>
    //   `;

    // console.log('sanity 1', mdTemplate);
    // const sanity = sanitizeHtml(frontmatter + config.body);
    // console.log('sanity 2', sanity);
    // return sanity;

  } catch (e: Error | any) {
    console.error('templating failed with ' + config || '...no meta');
    console.error('error: ' + e.name);
    console.error(e.stack)
  }
}
//   // data.rdev0rigin = getmeta('rdev0rigin', 'repos', 'gists')
//   // 	.then(response => {
//   // 		console.log('rdev0rigin', response);
//   // 		return response;
//   // 	});

//   // console.log('data', data);
// }

generateProjectContentFiles()
  .then(() => console.log('done!'))
  .catch((e: Error) => {
    console.error('main failed with: ' + e.name + ': ' + e.message)
    return e;
  });
