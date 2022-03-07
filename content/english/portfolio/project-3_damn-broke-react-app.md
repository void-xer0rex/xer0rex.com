---
name: "damn-broke-react-app"
draft: false
description: "An educational project for demonstrating pain points and common errors developers find when building ReactJS applications."
---

# Welcome to my Damn Broken React App

The idea behind this project is that it's broken. ...well, this *master* branch isn't but I seemed to have *broken* some of the things on the other branches. I would recommend reading the [ReactJS documents](https://reactjs.org/docs/getting-started.html) first when you are trying to *defunkify* a branch however, this master branch does|should work and you can always look at differentials for clues.

I have also left a trail of hints, sometimes as inline comments and sometimes markdown files. If you get stuck, make sure to read them. Also, please note that each branch will be different in how hints are given. 

## Lets *break* down how this project is set up. 

![Break Dancers](./readme-images/break-dancers.gif)

I have made an assumption that you are comfortable with `JavaScript`, if your not just copy and paste the part that confuses you into Google and include the acronym `MDN`. That should give you a good starting point. [MDN](https://developer.mozilla.org/en-US/) is like a pop-up storybook for web specs. Love it.

Coding ain't easy so I'm *not* going to rank these branches by difficulty but by how complex the fixes are. `i.e. The more I have to type, the more complex it is.` Well... at least the ones I was intending to show. There's always more than one way to confuse a lead. 

If you have any questions or concerns, even ones on topic just reach out to [Rex(rbeatie@twilio.com)](rbeatie@twilio.com).

> Happy Hacking! -Rex

# My Damn Broken Branches
| Title | Description | Branch | Resources | 
|:---:|:---|:----:|:---:|
|**No Render!?**| I think of JSX as just a way to have `JavaScript` store `HTML`. ReactJS can detect the JSX and knows how to render it into the DOM however, it has a few nuances for detection. Understanding them is a great way to not have to think about them later. | **dont-render** | [JSX-In Depth](https://reactjs.org/docs/jsx-in-depth.html) | 
|**No Blurbz!?**| Passing in `props` are a core part to how we build a ReactJS data flow. Let's give some `props` to React! Yea! Woot!| **oh-no-props** | [Components and Props](https://reactjs.org/docs/components-and-props.html)|


# Stuff that came with the CLI setup tool...

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you arn’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
