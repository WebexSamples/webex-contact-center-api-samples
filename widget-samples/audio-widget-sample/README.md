## Audio Widget Sample

In this tutorial we leverage native javascript for access to the PC microphone and give ourselves the ability to record a wav file, and convert it to a play on an IVR platform. From there, within this simple app, we fetch all our wav files on our tenant and have the ability to replace.update any of our files.

### [Watch Now: Audio Recording Widget Example](https://app.vidcast.io/share/2fbacc17-7551-4b69-be1b-47f8cf2b4ac3)

![Audio Widget Sample](./src/images/audio-widget-sample.png)

## Developer Documentation

**https://developer.webex-cx.com/documentation/guides/desktop**

## Getting Started

This POC widget sample is currently hosted by us on AWS for a limited time. Follow instructions below to wire up the widget on your tenant.

> To understand how to interact with our Desktop Layout, please watch the video and supplemental detailed documentation @ **[Desktop Layout - Administration Guide](https://www.cisco.com/c/en/us/td/docs/voice_ip_comm/cust_contact/contact_center/webexcc/SetupandAdministrationGuide_2/b_mp-release-2/b_cc-release-2_chapter_011.html#topic_8230815F4023699032326F948C3F1495)**
> To understand more about the Desktop STORE, please also look at the **useful links** below for additional references.

### Executing the sample

**Step 1:**

_To wire up the Widget to the Layout:_

- Upload the **_audio-widget.json_** file onto your Administration Portal **[WebexCC Portal - US](https://portal.wxcc-us1.cisco.com/portal/home.html#)**
  - _link above is referencing the US portal link please change if you are in different geo (us1, eu1, eu2, anz1)_
  - Note that Layouts are configured per Agent Team.
- Log in to your agent and select the right Team to view the new layout.

## Useful Links

**[Desktop Layout](https://www.cisco.com/c/en/us/td/docs/voice_ip_comm/cust_contact/contact_center/webexcc/SetupandAdministrationGuide_2/b_mp-release-2/b_cc-release-2_chapter_011.html#topic_8230815F4023699032326F948C3F1495)**

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

- 1.0.0
  - Initial sample widget
