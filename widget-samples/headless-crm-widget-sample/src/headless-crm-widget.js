import { Desktop } from '@wxcc-desktop/sdk';
//import { SERVICE } from "@wxcc-desktop/sdk-types";

export const logger = Desktop.logger.createLogger('headless-widget'); 
let callStartTime = 0 , callEndTime = 0 , callDuration = 0;
let agentName = '';

customElements.define(
  'headless-crm-widget',
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }


  async connectedCallback() 
  {
    this.init(); 
    logger.info('Neha log : connectedCallback function');
  }
  
  
  async init() 
  {
    await Desktop.config.init();
    logger.info('Neha log : init function');
    this.registerEventListeners();
  }


  async findWrapUpCode(wrapUpID) {
    let wrapUpInfo = await Desktop.actions.getWrapUpCodes();
    
    wrapUpInfo =  JSON.stringify(wrapUpInfo);
    wrapUpInfo = JSON.parse(wrapUpInfo);

    let wrapUpCode = wrapUpInfo.find(code => code.id === wrapUpID).name;
    logger.info("Neha Log : Wrap Up Code selected : " + wrapUpCode);    
  }


  async registerEventListeners()
  {
    Desktop.agentStateInfo.addEventListener('updated', (agentInfo) => {
        logger.info('Neha log : Agent state has changed.. !!!');
        logger.info(agentInfo);

        agentName = agentInfo.find(item => item.name === "agentName").value;
      });

    Desktop.agentContact.addEventListener('eAgentOfferContact', (agentContact) => {
      logger.info('Neha log : Agent Offered Contact');
    });

    Desktop.agentContact.addEventListener('eAgentContactAssigned', (agentContactAssigned) => {
      logger.info('Neha log : Agent Assigned Contact');

    callStartTime = new Date();
      
      //Desktop.screenpop("https://youtube.com");
    });


   // Desktop.disconnectedCallback.addEventListener()


   Desktop.agentContact.addEventListener("eAgentContactWrappedUp", (contactWrappedUp) => {  
      logger.info("Neha Log : Call wrapped up !! Here is the Call Information....");
      console.log(contactWrappedUp);
      console.log(JSON.stringify(contactWrappedUp));
      
      contactWrappedUp = JSON.stringify(contactWrappedUp);
      contactWrappedUp = JSON.parse(contactWrappedUp);
      
      callEndTime = new Date();
      callDuration = (callEndTime - callStartTime) / 1000;

      let wrapUpId = contactWrappedUp.data['wrapUpAuxCodeId'];
      let agentID = contactWrappedUp.data['agentId'];
      let interactionId = contactWrappedUp.data['interaction'].interactionId;
      let ani = contactWrappedUp.data['interaction'].callAssociatedDetails.ani;
      let dn = contactWrappedUp.data['interaction'].callAssociatedDetails.dn;
      let callType = contactWrappedUp.data['interaction'].contactDirection.type
      let wrapUpReason = contactWrappedUp.data['type']
      let cadCaseNo = contactWrappedUp.data['interaction'].callAssociatedData.Case_Number.value;
      let queueName = contactWrappedUp.data['interaction'].callAssociatedDetails.virtualTeamName
      
      this.findWrapUpCode(wrapUpId);
      logger.info("Neha Log : ANI is : " + ani);
      logger.info("Neha Log : DNIS is : " + dn);
      logger.info("Neha Log : Cad Variable Case Number is : " + cadCaseNo);
      logger.info("Neha Log : Agent ID is : " + agentID);
      logger.info('Neha log : Agent Name : ' + agentName);
      logger.info('Neha log : Queue Name : ' + queueName);
      logger.info("Neha Log : Interaction ID is : " + interactionId);
      logger.info("Neha Log : Type of call is : " + callType);
      logger.info('Neha log : Call Duration : ' + callDuration + ' s');
      logger.info("Neha Log : Wrap up Reason : " + wrapUpReason);
     });
  } 			

    disconnectedCallback() {}

  }
);
