// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');
const fetch = require('node-fetch');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(
  (request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log(
      'Dialogflow Request headers: ' + JSON.stringify(request.headers)
    );
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    const fetchCRMInfo = async (pin) => {
      let response = await fetch(
        `https://5f97898842706e0016957443.mockapi.io/crm/api/customers?pin=${pin}`
      );
      const data = await response.json();
      let account = data[0].account;
      let phone = data[0].phone;
      let crmInfo = { account: account, phone: phone };

      return crmInfo;
    };

    const welcome = async (agent) => {
      // Getting Data from Webex Contact Center
      let intentName = request.body.queryResult.intent.displayName;
      //"Default Welcome Intent"
      let webexCCData = request.body.originalDetectIntentRequest.payload;
      // Extract Information from the payload
      let customerName = webexCCData.name ? webexCCData.name : 'Cisco Name';
      let customerEmail = webexCCData.email ? webexCCData.email : 'Cisco Email';
      let customerReason = webexCCData.reason
        ? webexCCData.reason
        : 'Cisco Reason';
      let customerPin = webexCCData.pin ? webexCCData.pin : '36238';

      //CRM Lookup
      let crmInfo = await fetchCRMInfo(customerPin);

      agent.context.set({
        name: 'confirm-details',
        lifespan: 5,
        parameters: {
          account: crmInfo.account,
          phone: crmInfo.phone,
          'account.original': crmInfo.account,
          'phone.original': crmInfo.phone,
        },
      });

      agent.add(
        `<speak> Hello ${customerName}, ` +
          `we see you sent us an email from ${customerEmail} ` +
          `and are probably calling regarding ${customerReason}, Right?` +
          `Please confirm your account number is <say-as interpret-as="characters">${crmInfo.account}</say-as> </speak>`
      );
    };

    const confirmDetails = (agent) => {
      let contexts = request.body.queryResult.outputContexts;

      let myContext = contexts.filter((item) => {
        if (item.parameters)
          return item.parameters.account && item.parameters.phone;
      });

      agent.context.set({
        name: 'escalated',
        lifespan: 5,
        parameters: {
          account: myContext[0].parameters.account,
          'account.original': myContext[0].parameters.account,
          phone: myContext[0].parameters.phone,
          'phone.original': myContext[0].parameters.phone,
        },
      });

      agent.add(`Confirming Details..`);

      agent.setFollowupEvent({
        name: 'escalated',
        parameters: {
          account: myContext[0].parameters.account,
          phone: myContext[0].parameters.phone,
        },
      });
    };

    const fallback = (agent) => {
      agent.add(`I didn't understand`);
      agent.add(`I'm sorry, can you try again?`);
    };

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('Confirm Details', confirmDetails);

    // Handle the request as per the intent map
    agent.handleRequest(intentMap);
  }
);
