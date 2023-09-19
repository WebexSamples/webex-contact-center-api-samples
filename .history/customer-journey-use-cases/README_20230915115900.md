[![standard-readme compliant](https://img.shields.io/badge/Cisco-WebexCC:_CJDS-brightgreen.svg?style=flat-square)](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/customer-journey-use-cases)

<h1 align="center"> <a href="https://app.vidcast.io/share/embed/a21c521b-90c2-4024-8d8c-9489b21670a3" >Customer Journey Data Service </a> </h1>

<div align="center" >
  <p>Customer Journey Data service is a next-generation customer journey management service that enables businesses to capture customer journeys across any channel or application, identify insights, and take real-time actions to provide an excellent customer experience.</p>
</div>

<br>

<p align="center"> 
  <img src="./images/devices-meeting-error-320-cobalt-lime.svg" alt="CJDS" >
</p>

<br>

<h2> Table of contents </h2>

- [Motivation](#motivation)
- [Video](#vidcast)
- [Links](#links)
- [Prerequisites](#prerequisites)
- [Use Cases](#uc)

<br>
<br>
<br>
<br>

<h2>Motivation <a id="motivation"></a></h2>

> We have compiled a series of CJDS **[Use Cases](#uc)** that will help with configurations, quick ramped, and provide inspiration for Webex Contact Center administrators. Make sure to start with use Case [CJDS01](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/customer-journey-use-cases/Use%20Cases/CJDS01) as it also includes initial setup process.

<br>
<br>
<br>
<br>

<h2>Video <a id="vidcast"></a></h2>

> [Overview of Customer Journey Data Services from the Product Manager](https://app.vidcast.io/share/889c2cbf-51b2-4cc9-94f8-9143078dca83)

<h3>Supplementary Video</h3>

> - <a href="https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/token-management-samples" >Token Management Setup </a>

<br>
<br>
<br>
<br>

<h2>Links <a id="links"></a></h2>

- [Configure Google Text-To-Speech (TTS) ](https://webexcc.github.io/pages/CCAI)
- [Configure CJDS for your tenant](https://developer.webex-cx.com/documentation/guides/journey---getting-started)
- [Webex Connect Digital Channels](https://help.imiconnect.io/)
- [Webex Flow Designer](https://www.cisco.com/c/en/us/td/docs/voice_ip_comm/cust_contact/contact_center/webexcc/SetupandAdministrationGuide_2/b_mp-release-2/wcc-flow-designer.html)
- [Webex Contact Center Guide](https://www.cisco.com/c/en/us/td/docs/voice_ip_comm/cust_contact/contact_center/webexcc/SetupandAdministrationGuide_2/b_mp-release-2.html)

<br>
<br>
<br>
<br>

<h2>Prerequisites <a id="prerequisites"></a></h2>

- Please make sure you start with Use Case [CJDS01](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/customer-journey-use-cases/Use%20Cases/CJDS01) as we are building up from each use case.
- You have already [Configure CJDS](https://developer.webex-cx.com/documentation/guides/journey---getting-started) for your tenant <span style="font-size:12px;color:gray"> (Cisco based)</span>
- You know how to work with [Webex Flow Designer](https://www.cisco.com/c/en/us/td/docs/voice_ip_comm/cust_contact/contact_center/webexcc/SetupandAdministrationGuide_2/b_mp-release-2/wcc-flow-designer.html) <span style="font-size:12px;color:gray"> (Cisco based)</span>
- You know how to work with [Webex Connect Digital Channels](https://help.imiconnect.io/)
  Channels <span style="font-size:12px; color:gray"> (Cisco based)</span>
- Intermediate level of APIs and using [Postman](https://learning.postman.com/docs/introduction/overview/) <span style="font-size:12px;color:gray"> (Generic)</span>
</div>

<br>
<br>
<br>
<br>

<h2>Use Cases <a id="uc"></a></h2>

<br>

| #                                                                                                                                                                                                                        | Use Case                                                                                                                                 | Description                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![standard-readme compliant](https://img.shields.io/badge/CJDS-01-blue.svg?style=flat-square)](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/customer-journey-use-cases/Use%20Cases/CJDS01) | [Start Here](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/customer-journey-use-cases/Use%20Cases/CJDS01)    | **Getting started**: Intro to configuring CJDS on your tenant and add your first identity (customer records).                                                                                              |
| [![standard-readme compliant](https://img.shields.io/badge/CJDS-02-blue.svg?style=flat-square)](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/customer-journey-use-cases/Use%20Cases/CJDS02) | [Repeat Caller](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/customer-journey-use-cases/Use%20Cases/CJDS02) | A customer calls in more than three times in the last 24 hours, always talking with the Billing team, the next time when the customer calls in, we present them with a personalized IVR, or other options. |
