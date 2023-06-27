## Desktop JS SDK Call Control Widget

This is a collection of a few telephony call-control methods. The focus of this widget is on understanding common call-control methods in their basic minimal configuration, needed to successfully call these methods.

## [Watch: Desktop JS SDK - Call Controls - Getting Started](https://app.vidcast.io/share/26f9237a-1401-46d3-9ca4-a4260bd01533)

This sample covers Outdial, Transfer, Blind/Consult Transfer, Pause, Resume, Hold and Unhold.

You can copy the legend/name of the card and paste in the JS file and it will take you to the parts that are associated with that method.

This is tenant agnostic - meaning you can enter in your tenants queue / entry point IDs straight into the card to call the methods, as well as your mobile for the DN related methods. No need to modify the JS unless you're adding a new method.

![Voice SDK Sample](./images/voice-sdk-sample.png)

## Developer Documentation

**https://developer.webex-cx.com/documentation/guides/desktop**

## Getting Started

The widget can be hosted locally and the demo covers how this is done by building and hosting the widget on localhost.

To understand how to interact with our Desktop Layout, please watch the video and supplemental detailed documentation @ **[Desktop Layout - Administration Guide](https://www.cisco.com/c/en/us/td/docs/voice_ip_comm/cust_contact/contact_center/webexcc/SetupandAdministrationGuide_2/b_mp-release-2/b_cc-release-2_chapter_011.html#topic_8230815F4023699032326F948C3F1495)**

To understand more about the Desktop STORE, please also look at the **useful links** below for additional references.

### Executing the sample

How to run the sample widget:

- **Step 1:**

_To use this widget sample on your localhost_

- Inside this project on your terminal type: `npm install`
- Then inside this project on your terminal type: `npm run dev`
- This should run the app on your localhost:5000

**Step 2:**

_To wire up the Widget to the Layout:_

- Upload the **_callControlWidget.json_** file onto your Administration Portal **[WebexCC Portal - US](https://portal.wxcc-us1.cisco.com/portal/home.html#)**
  - _link above is referencing the US portal link please change if you are in different geo (us1, eu1, eu2, anz1)_
  - Note that Layouts are configured per Agent Team.
- Log in to your agent and select the right Team to view the new layout.

**Additional Improvements:**

- You can modify the widget as required.
- To create a new compiled JS file, using `npm run build` which will create the new compiled JS under `build/bundle.js`.
- You may rename this file, host it on your server of choice, and use this as the widget `src` parameter in the layout.
- For the `Make an OutDial Call` - you will need to add the Outdial ANI in the Post body the key is called `origin` from your tenant's Portal make sure to use +1xxxxxxxxxx(or your country code)

## Useful Links

**[Desktop Layout](https://www.cisco.com/c/en/us/td/docs/voice_ip_comm/cust_contact/contact_center/webexcc/SetupandAdministrationGuide_2/b_mp-release-2/b_cc-release-2_chapter_011.html#topic_8230815F4023699032326F948C3F1495)**

## Disclaimer

> These samples are meant to be used, as "samples", for demos, and to understand how to interact w
> ith the WebexCC APIs.
> When building a production grade solution, please consider the overall architecture and design with a security first approach.
> Also, please consider how you would extend this app for multiple orgs, manage tokens for the orgs, etc.
> These samples are only meant to provide working, starter code and many layers have been simplified and abstracted away to focus on the Webex Contact Center use cases.

## Support

For dedicated Developer Support on the APIs - Please open a ticket with the team using this link: **[Webex Contact Center Developer Support](https://developer.webex-cx.com/support)**

For discussions on the samples, feel free to participate in our Developer Community:

**[Webex Contact Center APIs Developer Community](https://community.cisco.com/t5/contact-center/bd-p/j-disc-dev-contact-center)**

Refer: **[How to Ask a Question or Initiate a Discussion](https://community.cisco.com/t5/contact-center/webex-contact-center-apis-developer-community-and-support/m-p/4558270)**

## Version History

- 1.0.0
  - a few GET methods & updated readme
    <!-- * See [commit change]() or See [release history]() -->
