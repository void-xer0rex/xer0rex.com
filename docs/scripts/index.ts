import { getGithubData } from './github-manager';
// import * as fs from 'fs';
// import * as path from 'path';

declare type ProjectInfo = {
	name: string;
	icon: string;
	content: string;
}
declare type ProjectData = {
	name: string;
	created_at: string;
	image: string;
	categories: string;
	description: string;
	isDraft: string;
	info: ProjectInfo[];
	body: string;
	footer: string;
}

async function main() {
	const data: any = {};
	data.rbeatie = getGithubData('rbeatie', 'repos', 'gists')
		.then(async response => {
			response.forEach((data: any) => {

				console.log('rbeatie', data.name);
				const template = populateTemplate(data);
				console.log('rbeatie template', template);
				return data;
			});

		});

	/**
	 * Sample Pulled Data 
	 * REPO
	 * [
  {
    "id": 163477590,
    "node_id": "MDEwOlJlcG9zaXRvcnkxNjM0Nzc1OTA=",
    "name": "Access2.0Justice",
    "full_name": "rbeatie/Access2.0Justice",
    "private": false,
    "owner": {
      "login": "rbeatie",
      "id": 45648604,
      "node_id": "MDQ6VXNlcjQ1NjQ4NjA0",
      "avatar_url": "https://avatars.githubusercontent.com/u/45648604?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/rbeatie",
      "html_url": "https://github.com/rbeatie",
      "followers_url": "https://api.github.com/users/rbeatie/followers",
      "following_url": "https://api.github.com/users/rbeatie/following{/other_user}",
      "gists_url": "https://api.github.com/users/rbeatie/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/rbeatie/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/rbeatie/subscriptions",
      "organizations_url": "https://api.github.com/users/rbeatie/orgs",
      "repos_url": "https://api.github.com/users/rbeatie/repos",
      "events_url": "https://api.github.com/users/rbeatie/events{/privacy}",
      "received_events_url": "https://api.github.com/users/rbeatie/received_events",
      "type": "User",
      "site_admin": false
    },
    "html_url": "https://github.com/rbeatie/Access2.0Justice",
    "description": "A progressive project for The Commons Law center. ",
    "fork": false,
    "url": "https://api.github.com/repos/rbeatie/Access2.0Justice",
    "forks_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/forks",
    "keys_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/teams",
    "hooks_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/hooks",
    "issue_events_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/issues/events{/number}",
    "events_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/events",
    "assignees_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/assignees{/user}",
    "branches_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/branches{/branch}",
    "tags_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/tags",
    "blobs_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/languages",
    "stargazers_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/stargazers",
    "contributors_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/contributors",
    "subscribers_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/subscribers",
    "subscription_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/subscription",
    "commits_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/issues/comments{/number}",
    "contents_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/contents/{+path}",
    "compare_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/merges",
    "archive_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/downloads",
    "issues_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/issues{/number}",
    "pulls_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/labels{/name}",
    "releases_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/releases{/id}",
    "deployments_url": "https://api.github.com/repos/rbeatie/Access2.0Justice/deployments",
    "created_at": "2018-12-29T05:04:32Z",
    "updated_at": "2019-10-04T21:59:25Z",
    "pushed_at": "2019-01-02T02:12:46Z",
    "git_url": "git://github.com/rbeatie/Access2.0Justice.git",
    "ssh_url": "git@github.com:rbeatie/Access2.0Justice.git",
    "clone_url": "https://github.com/rbeatie/Access2.0Justice.git",
    "svn_url": "https://github.com/rbeatie/Access2.0Justice",
    "homepage": null,
    "size": 316,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": "TypeScript",
    "has_issues": true,
    "has_projects": true,
    "has_downloads": true,
    "has_wiki": true,
    "has_pages": false,
    "forks_count": 0,
    "mirror_url": null,
    "archived": false,
    "disabled": false,
    "open_issues_count": 0,
    "license": null,
    "allow_forking": true,
    "is_template": false,
    "topics": [

    ],
    "visibility": "public",
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "default_branch": "master"
  },
	 * 
	 * GIST
	 * {
    "url": "https://api.github.com/gists/9eeecb7adf321f78210ac0fb6b396188",
    "forks_url": "https://api.github.com/gists/9eeecb7adf321f78210ac0fb6b396188/forks",
    "commits_url": "https://api.github.com/gists/9eeecb7adf321f78210ac0fb6b396188/commits",
    "id": "9eeecb7adf321f78210ac0fb6b396188",
    "node_id": "MDQ6R2lzdDllZWVjYjdhZGYzMjFmNzgyMTBhYzBmYjZiMzk2MTg4",
    "git_pull_url": "https://gist.github.com/9eeecb7adf321f78210ac0fb6b396188.git",
    "git_push_url": "https://gist.github.com/9eeecb7adf321f78210ac0fb6b396188.git",
    "html_url": "https://gist.github.com/9eeecb7adf321f78210ac0fb6b396188",
    "files": {
      "DisconnectOnRejectPlugin.js": {
        "filename": "DisconnectOnRejectPlugin.js",
        "type": "application/javascript",
        "language": "JavaScript",
        "raw_url": "https://gist.githubusercontent.com/rbeatie/9eeecb7adf321f78210ac0fb6b396188/raw/484aff71e6545712e2fdbd64501bec01cbf81f6e/DisconnectOnRejectPlugin.js",
        "size": 1800
      },
      "hang-up-call.js": {
        "filename": "hang-up-call.js",
        "type": "application/javascript",
        "language": "JavaScript",
        "raw_url": "https://gist.githubusercontent.com/rbeatie/9eeecb7adf321f78210ac0fb6b396188/raw/1508cb1bdc23ce10de2f848c167eebb4ace68515/hang-up-call.js",
        "size": 1861
      }
    },
    "public": true,
    "created_at": "2021-01-14T00:19:46Z",
    "updated_at": "2021-01-14T00:20:25Z",
    "description": "hanging up a call when an Agent rejects the task",
    "comments": 0,
    "user": null,
    "comments_url": "https://api.github.com/gists/9eeecb7adf321f78210ac0fb6b396188/comments",
    "owner": {
      "login": "rbeatie",
      "id": ***,
      "node_id": "****",
      "avatar_url": "https://avatars.githubusercontent.com/u/45648604?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/rbeatie",
      "html_url": "https://github.com/rbeatie",
      "followers_url": "https://api.github.com/users/rbeatie/followers",
      "following_url": "https://api.github.com/users/rbeatie/following{/other_user}",
      "gists_url": "https://api.github.com/users/rbeatie/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/rbeatie/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/rbeatie/subscriptions",
      "organizations_url": "https://api.github.com/users/rbeatie/orgs",
      "repos_url": "https://api.github.com/users/rbeatie/repos",
      "events_url": "https://api.github.com/users/rbeatie/events{/privacy}",
      "received_events_url": "https://api.github.com/users/rbeatie/received_events",
      "type": "User",
      "site_admin": false
    },
    "truncated": false
  },
	 * @param content 
	 * @returns 
	 */
	function populateTemplate(content: ProjectData) {

		try {
			let mdTemplate = `
			---
			title: "${content.name}"
			date: ${content.created_at}
			image: ${content.image}
			categories: ${content.categories}
			description: ${content.description}
			draft: ${content.isDraft}
			project_info:`;

			for (const info of content.info) {
				mdTemplate = mdTemplate + `
				- name: "${info.name}"
				icon: "${info.icon}" 
				content: "${info.content}" 
				`
			}

			mdTemplate = mdTemplate + `
			---
			
			${content.body}
			${content.footer}			  
			`;
			return mdTemplate;
		} catch (e) {
			console.error('template failed with content: ', content)
			console.error(e);
			return null;
		}

		// data.rdev0rigin = getGithubData('rdev0rigin', 'repos', 'gists')
		// 	.then(response => {
		// 		console.log('rdev0rigin', response);
		// 		return response;
		// 	});

		// console.log('data', data);
	}
}
main();
