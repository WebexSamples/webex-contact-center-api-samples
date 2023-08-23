## Export Call Recordings from Webex Contact Center

### Executing Capture API calls using Spring Boot

This is a sample web application to export call recordings from WebexCC using the Capture API. It uses a simple Spring Boot web application to serve a web page for date selectable call recoding extraction. The call recordings can be persisted to localhost, AWS, or Google.

The application can be modified, enhanced or extended to fit the use cases required.

Watch the demo below to understand what this application does and how to set it up and extend on it.

## [Watch Now: Extract Webexcc call recordings](https://app.vidcast.io/share/014d7798-55f8-4465-b10f-18adee7182c3)

> **Note:** This is a sample that assumes you know the basics of rest API calls as well as Java/Spring Boot.

> This demo goes over the Java sample code that is used to extract call recordings from Webex Contact Center with the Capture API. The code exports the call recordings from Webex Contact Center and provides interfaces to persist the recordings to different platforms. It leverages the power of Spring Boot to make this consumable by any external use or storage.

## Developer Documentation

**https://developer.webex-cx.com/documentation/captures**

## Getting Started

The application can be hosted on any Java VM environment and covers how this is done by building and hosting the application on localhost.

### Executing the sample

How to run the sample application:

**Step 1:**

- Download / Clone the repository and go to [call-recording-extractor-sample](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/call-recording-extractor-sample)

**Step 2:**

- Modify the property file under
  `/src/main/resources/application.properties`

- Add the details such as the client_id, client_secret, redirect_uri. For more information on how to configure these parameters, refer to the basic samples in the repository.

- Modify the property file under
  `/src/main/resources/application.yml`

- Add the file system details details such as the localhost, AWS S3 and Google Cloud Storage. For more information on how to configure these parameters, refer to AWS S3 and Google Cloud Storage documentation.

**Step 3:**

- Install the dependencies using: `mvn clean install`

**Step 4:**

- Run the application locally using: `java -jar capture-0.0.1-SNAPSHOT.jar` under newly created 'target' directory
- This should run the app on `http://localhost:8080`

**Additional Improvements:**

- You can modify the application as required.

## Useful Links - Supplemental Resources

- [call-recording-extractor-sample](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/call-recording-extractor-sample)

- [Captures](https://developer.webex-cx.com/documentation/captures)

- [My Apps](https://developer.webex-cx.com/my-apps)

## Disclaimer

> These samples are meant to be used, as "samples", for demos, and to understand how to interact with the WebexCC APIs.
> When building a production grade solution, please consider the overall architecture and design with a security first approach.
> Also, please consider how you would extend this app for multiple orgs, manage tokens for the orgs, etc.
> These samples are only meant to provide working, starter code and many layers have been simplified and abstracted away to focus on the Webex Contact Center use cases.

## Support

For dedicated Developer Support on the APIs - Please open a ticket with the team using this link: **[Webex Contact Center Developer Support](https://developer.webex-cx.com/support)**

For discussions on the samples, feel free to participate in our Developer Community:

**[Webex Contact Center APIs Developer Community](https://community.cisco.com/t5/contact-center/bd-p/j-disc-dev-contact-center)**

Refer: **[How to Ask a Question or Initiate a Discussion](https://community.cisco.com/t5/contact-center/webex-contact-center-apis-developer-community-and-support/m-p/4558270)**

## Version History

- 0.0.1

  - Beta version with basic REST API Capture
