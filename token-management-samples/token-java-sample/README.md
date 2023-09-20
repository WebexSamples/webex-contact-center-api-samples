## Java Spring Boot with Oauth2 Spring Security project to demonstrate Webexcc login for authentication and authorization

- This basic authorization app helps you visualize the Authentication & Authorization flow to obtain an Access Token to use the Webex Contact Center APIs.

- Webex Contact Center APIs use OAuth2. For more information, refer :

- The OAuth Flow can be visualized by going to the http://localhost of this app once the app dependencies are installed and the application is run.

## [Watch the Video](https://app.vidcast.io/share/5c1c16ab-1d3a-4623-b1ea-68bc2fbb19a3)

![Basic Authorization Sample](./images/basic-authorization-sample.png)

#### Pre-Requisites:

- Java
- Spring Boot
- Spring Security Oauth2
- gradle



#### Steps:

- Clone this Repository / Download it.
- Import project
- Edit /token-java-sample/src/main/resources/application.yaml


- Run `gradle bootRun`

- Go to http://localhost:8080
- Go to http://localhost:8080/userinfo for user details access token



## Disclaimer

> These samples are meant to be used, as "samples", for demos, and to understand how to interact with the WebexCC APIs.
> When building a production grade solution, please consider the overall architecture and design with a security first approach.
> Also, please consider how you would extend this app for multiple orgs, manage tokens for those orgs, etc.
> These samples are only meant to provide working, starter code and many layers have been simplified and abstracted away to focus on the Webex Contact Center use cases.

## Support

For dedicated Developer Support on the APIs - Please open a ticket with the team using this link: **[Webex Contact Center Developer Support](https://developer.webex-cx.com/support)**

For discussions on the samples, feel free to participate in our Developer Community:

**[Webex Contact Center APIs Developer Community](https://community.cisco.com/t5/contact-center/bd-p/j-disc-dev-contact-center)**

Refer: **[How to Ask a Question or Initiate a Discussion](https://community.cisco.com/t5/contact-center/webex-contact-center-apis-developer-community-and-support/m-p/4558270)**
