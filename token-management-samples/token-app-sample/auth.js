/**
 * This file has a method that checks the validity of the request.
 * It is important to protect the Access Token, and bind it to the IP address of Webex Contact Center when using Flow Designer.
 * Refer: https://help.webex.com/en-us/article/3srgv1/Security-Settings-for-Webex-Contact-Center#Cisco_Concept.dita_44643223-9809-4085-bb55-7727c96d009a
 * For source IP Addresses per datacenter that need to be allow-listed by this API.
 */

const checkRequestHeaders = (headers) => {
  let pass = false;

  if (
    headers.contentType === 'application/json' &&
    headers.orgId === process.env.ORG_ID &&
    headers.from === process.env.FROM &&
    headers.sourceIp === process.env.SOURCE_IP &&
    headers.apiToken === process.env.PASSPHRASE &&
    headers.accept === 'application/json'
  ) {
    pass = true;
  } 

  return pass;
};

module.exports = { checkRequestHeaders };
