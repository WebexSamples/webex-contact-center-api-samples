import { Desktop } from '@wxcc-desktop/sdk';

// This is the logger initializer factory method for the headless widget
export const logger = Desktop.logger.createLogger('headless-widget'); 

// Some sample data points
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
    // Mounting the headless widget and initializing
    this.init(); 
    logger.info('Headless Widget Log: Webcomponent connectedCallback function');
  }
  
  
  async init() 
  {
    // This is the Init Method - called to configure the WebexCC Desktop JS SDK inside the headless widget
    await Desktop.config.init();
    logger.info('Headless Widget Log: init function');
    this.registerEventListeners();
  }


  async findWrapUpCode(wrapUpID) {

    // Collect Wrap up code data and print to console 
    let wrapUpInfo = await Desktop.actions.getWrapUpCodes();
    wrapUpInfo =  JSON.stringify(wrapUpInfo);
    wrapUpInfo = JSON.parse(wrapUpInfo);

    let wrapUpCode = wrapUpInfo.find(code => code.id === wrapUpID).name;
    logger.info('Headless Widget Log: Wrap Up Code selected : ' + wrapUpCode);    
  }


  async registerEventListeners()
  {

    // This method registers all the event listeners supported by the JS SDK.
    // The event listeners are asynchronous and require handlers within each of the listeners.
    // Sample handlers below are only console logs as an example

    
    Desktop.agentStateInfo.addEventListener('updated', (agentInfo) => {
      
        // Listener for agent state
        logger.info('Headless Widget Log: Agent state has changed.. !!!');
        logger.info(agentInfo);

        agentName = agentInfo.find(item => item.name === 'agentName').value;
      });

    Desktop.agentContact.addEventListener('eAgentOfferContact', (agentContact) => {
      
      // Listener for agent contact offered
      logger.info('Headless Widget Log: Agent Offered Contact');
    });

    Desktop.agentContact.addEventListener('eAgentContactAssigned', (agentContactAssigned) => {
      
      // Listener for agent contact assigned
      logger.info('Headless Widget Log: Agent Assigned Contact');
      callStartTime = new Date();

    });

   Desktop.agentContact.addEventListener('eAgentContactWrappedUp', (contactWrappedUp) => {

      // Wrap up event listener - and collection of contact metadata 
      logger.info('Headless Widget Log: Contact wrapped up! Here is the Contact Information --> ');
      logger.info(contactWrappedUp);
      logger.info(JSON.stringify(contactWrappedUp));
      
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
       
      logger.info('Headless Widget Log: ANI is : ' + ani);
      logger.info('Headless Widget Log: DNIS is : ' + dn);
      logger.info('Headless Widget Log: Cad Variable Case Number is : ' + cadCaseNo);
      logger.info('Headless Widget Log: Agent ID is : ' + agentID);
      logger.info('Headless Widget Log: Agent Name : ' + agentName);
      logger.info('Headless Widget Log: Queue Name : ' + queueName);
      logger.info('Headless Widget Log: Interaction ID is : ' + interactionId);
      logger.info('Headless Widget Log: Type of call is : ' + callType);
      logger.info('Headless Widget Log: Call Duration : ' + callDuration + ' s');
      logger.info('Headless Widget Log: Wrap up Reason : ' + wrapUpReason);
     });
  } 			

    disconnectedCallback() {}

  }
);
