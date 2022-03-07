---
name: "ReFlexThunk"
draft: false
description: "Twilio Flex with custom Redux Flex and Thunk "
---

# Twilio Flex Custom Redux and Thunk Middleware

This basic demonstration shows an implementation of a Redux dispatch Chain using [`redux-thunk`](https://github.com/reduxjs/redux-thunk).

The guide was modified from Redux-Thunk's [Composition](https://github.com/reduxjs/redux-thunk#composition)

Two files should be considered for demonstrating how to implement a custom Redux store with middleware within the Flex-UI ecology. The Middleware example used is Thunk, an asynchronous library for calling chains of dispatch and actions. An action in this library is replaced with a function giving actions more utility and returns the action object that was the original type value of the dispatch parameter.

The first file [index.js](https://github.com/rbeatie/ReFlexThunk/blob/master/src/index.js) will show the setup process for a custom Reduxs store and integration with a middleware utility called Thunk. It continues to show how to combine your store
with Flexs stat store and then thread it into your Apps Provider.

The second file # Twilio Flex Custom Redux and Thunk Middleware

This basic demonstration shows an implementation of a Redux dispatch Chain using [`redux-thunk`](https://github.com/reduxjs/redux-thunk).

The guide was modified from Redux-Thunk's [Composition](https://github.com/reduxjs/redux-thunk#composition)

Two files should be considered for demonstrating how to implement a custom Redux store with middleware within the Flex-UI ecology. The Middleware example used is Thunk, an asynchronous library for calling chains of dispatch and actions. An action in this library is replaced with a function giving actions more utility and returns the action object that was the original type value of the dispatch parameter.

The first file [index.js](https://github.com/rbeatie/ReFlexThunk/blob/master/src/index.js) will show the setup process for a custom Reduxs store and integration with a middleware utility called Thunk. It continues to show how to combine your store
with Flexs stat store and then thread it into your Apps Provider.

The second file [App.js](https://github.com/rbeatie/ReFlexThunk/blob/master/src/App.js) is an example of how to build Thunk functions and chain them together.

If you run into any trouble please make a GitHub Issue here for this repo. Feel free to post there for any problems or concerns. I will try to address them as soon as I ca and please have 

-Rex


### Bugs: 

The **redux-logger** throws an frequent error `Uncaught (in promise) Error: You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.`

# Twilio Flex UI Sample

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of the guide on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

This package can only be consumed together with Twilio Flex. Visit http://twilio.com/flex to find out more.

## Instructions

1. Install all dependencies by running:
```
npm install
```
2. Copy appConfig.sample.js in public/assets folder and configure accordingly to use your Twilio account
```
cp public/assets/appConfig.sample.js public/assets/appConfig.js
```
3. Start Flex UI by running:
```
npm start
```

If you run into any trouble please make a GitHub Issue here for this repo. Feel free to post there for any problems or concerns. I will try to address them as soon as I can.

-Rex


### Bugs: 

The **redux-logger** throws an frequent error `Uncaught (in promise) Error: You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.`

# Twilio Flex UI Sample

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of the guide on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

This package can only be consumed together with Twilio Flex. Visit http://twilio.com/flex to find out more.

## Instructions

1. Install all dependencies by running:
```
npm install
```
2. Copy appConfig.sample.js in public/assets folder and configure accordingly to use your Twilio account
```
cp public/assets/appConfig.sample.js public/assets/appConfig.js
```
3. Start Flex UI by running:
```
npm start
```
