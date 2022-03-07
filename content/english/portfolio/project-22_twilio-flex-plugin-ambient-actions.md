---
name: "twilio-flex-plugin-ambient-actions"
draft: false
description: "A small composite component demonstrating how to set state with the Actions Framework"
---

# Actions Communicate In Ambient Ways
> WIP for the README please excuse the tpyos.

Ahoy! 

Thank you for taking the time to check out this demo of a technique used when building a [Twilio Flex Plugin](https://wwww.twilio.com/docs/plugin). Let's dive right in.

[Flex Plugins](https://www.twilio.com/docs/flex/plugin-builder#plugin-builder-v3) which are React Components have a nuance about them. They exist within the same flow of data but are unable to communicate with each other like issolated and lonely islands. They cannot see anything but what exsists within them in other words they are blind to the context they exist.

This makes passing data from one plugin to the other need a solution. A common solutionis to **lift the state** to a container component where both can exist. This technique is artfully detailed [here in the React docs](https://reactjs.org/docs/lifting-state-up.html). This won't work with *Flex Plugins*, unfortunately. *Flex Plugins* are loaded asynchronously or lazily making them independant but also not allowing for any to take part of anothers initialization. This is where the [ActionsFramework](https://www.twilio.com/docs/flex/actions-framework) comes in to bridge this gap. Yea!
 
The [ActionsFramework](https://www.twilio.com/docs/flex/actions-framework) is an Events manager. The ActionsFramework is able to be where ever you have the Flex Global Oject. This means that you can use Actions to pass data from island to island.   

# Composite

`src/composite/Panel2.Composite.js` is a [High Order Component](https://reactjs.org) that registers an Action with the `class React.Component` wrapping `Panel2`.



# _ Original Plugin Docs _ 

# Your custom Twilio Flex Plugin

Twilio Flex Plugins allow you to customize the appearance and behavior of [Twilio Flex](https://www.twilio.com/flex). If you want to learn more about the capabilities and how to use the API, check out our [Flex documentation](https://www.twilio.com/docs/flex).

## Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com) installed.

Afterwards, install the dependencies by running `npm install`:

```bash
cd 

# If you use npm
npm install
```

## Development

In order to develop locally, you can use the Webpack Dev Server by running:

```bash
npm start
```

This will automatically start up the Webpack Dev Server and open the browser for you. Your app will run on `http://localhost:8080`. If you want to change that you can do this by setting the `PORT` environment variable:

```bash
PORT=3000 npm start
```

When you make changes to your code, the browser window will be automatically refreshed.

## Deploy

Once you are happy with your plugin, you have to bundle it in order to deploy it to Twilio Flex.

Run the following command to start the bundling:

```bash
npm run build
```

Afterwards, you'll find in your project a `build/` folder that contains a file with the name of your plugin project. For example, `plugin-example.js`. Take this file and upload it into the Assets part of your Twilio Runtime.

Note: Common packages like `React`, `ReactDOM`, `Redux` and `ReactRedux` are not bundled with the build because they are treated as external dependencies so the plugin will depend on Flex to provide them globally.
