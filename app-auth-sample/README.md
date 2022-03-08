## Basic Auth Sample

- This basic auth app helps you visualize the Authentication & Authorization flow to obtain an Access Token to use the Webex Contact Center APIs.

- Webex Contact Center APIs use OAuth2. For more information, refer :

- The OAuth Flow can be visualized by going to the http://localhost of this app once the app dependencies are installed and the application is run.

## [Watch the Video: Understanding WebexCC OAuth2 - App Sample]()

#### Pre-Requisites:

- Node JS and NPM
- An IDE like VS Code or similar.

```
$ node -v
v14.16.1
$ npm -v
6.14.12
```

#### Steps:

- Ensure you have installed NodeJS and NPM
- Clone this Repository / Download it.
- Create a .env file in each of the folders with the settings of the environment variables required to initialize the environment variables. Your server.js will pick it up from the local .env file in the root folder.

`$ cat .env`

```
PORT=5000
CLIENT_ID=<your-client-id>
CLIENT_SECRET=<your-client-secret>
REDIRECT_URI=<your-redirect uri - ex: http://localhost:5000/auth/webex/callback>
ORG_ID=<your-org-id>
```

- Run `$ npm install`

- Run the App

`$ nodemon` OR `$ npm start`

- Go to http://localhost:5000 to fetch an access token
- Go to http://localhost:5000/tasks or http://localhost:5000/users to see the basic GET Tasks and GET Users examples.

Expand / extend the sample app(s) as required.
