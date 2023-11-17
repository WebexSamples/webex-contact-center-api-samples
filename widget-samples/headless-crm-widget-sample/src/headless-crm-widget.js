import { Desktop } from '@wxcc-desktop/sdk';

// This is the logger initializer factory method for the headless widget
export const logger = Desktop.logger.createLogger('headless-widget'); 

// Some sample data points
let callStartTime = 0 , callEndTime = 0 , callDuration = 0;
let agentName, agentState = '';
let isInitialized = false;
let callType = 'Inbound';

customElements.define(
  'headless-crm-widget',
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

  // Mounting the headless widget and initializing
  async connectedCallback() 
  {
    this.init(); 
    logger.info('Headless Widget Log: Webcomponent connectedCallback function');
  }


  // Init Method - called to configure the WebexCC Desktop JS SDK inside the headless widget
  async init() 
  {  
    await Desktop.config.init();
    logger.info('Headless Widget Log: init function');
    this.registerEventListeners();
  }


  // This method registers all the event listeners supported by the JS SDK.
  // The event listeners are asynchronous and require handlers within each of the listeners.
  // Sample handlers below are only console logs as examples
  async registerEventListeners()
  {

    // Listener for agent state change event
    Desktop.agentStateInfo.addEventListener('updated', (agentInfo) => {
      logger.info('Headless Widget Log: agentInfo : ' + JSON.stringify(agentInfo));

      if(isInitialized === false)
      {
        agentName = agentInfo.find(item => item.name === 'agentName').value;
      }
      else
      {
        logger.info('Headless Widget Log: Agent state has changed.. !!!');

        if(agentInfo.some(obj => obj.value === 'Available') === true)
          agentState = agentInfo.find(item => item.name === 'subStatus').value;
        else
          agentState = agentInfo.find(item => item.name === 'idleCode').value['name'];

        logger.info('Headless Widget Log: Agent State is : ' + agentState);
      }

      if(agentState === 'Make OutDial Call')
        this.makeOutDialCall();

      isInitialized = true;
    });


    // Listener for screenpop event
    Desktop.screenpop.addEventListener("eScreenPop", screenPopMsg => {
      screenPopMsg = JSON.stringify(screenPopMsg);
      screenPopMsg = JSON.parse(screenPopMsg);
      
      let screenPopName = screenPopMsg.data['screenPopName'];
      let screenPopUrl = screenPopMsg.data['screenPopUrl'];

      logger.info('Headless Widget Log: Screenpop Message Information --> ');
      logger.info('Headless Widget Log: ScreenPop Name : ' + screenPopName);
      logger.info('Headless Widget Log: ScreenPop URL : ' + screenPopUrl);
    });


    // Listener for agent contact offered event
    Desktop.agentContact.addEventListener('eAgentOfferContact', (agentContact) => {
      logger.info('Headless Widget Log: Agent Offered Contact');
    });


    // Listener for agent contact assigned event
    Desktop.agentContact.addEventListener('eAgentContactAssigned', (agentContactAssigned) => {
      logger.info('Headless Widget Log: Agent Assigned Contact');
      callStartTime = new Date();
    });


    // Wrap up event listener - and collection of contact metadata 
    Desktop.agentContact.addEventListener('eAgentContactWrappedUp', (contactWrappedUp) => {
      logger.info('Headless Widget Log: Contact wrapped up! Here is the Contact Information --> ');
      logger.info('Headless Widget Log: WrapUpInfo : ' + contactWrappedUp);
      
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
      let queueName = contactWrappedUp.data['interaction'].callAssociatedDetails.virtualTeamName;
      let cadCaseNo;

      if(callType === 'Inbound')
      {
        cadCaseNo = contactWrappedUp.data['interaction'].callAssociatedData.Case_Number.value;
      }
      
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


  // Collect Wrap up code data and print to console 
  async findWrapUpCode(wrapUpID) 
  {
    let wrapUpInfo = await Desktop.actions.getWrapUpCodes();
    wrapUpInfo =  JSON.stringify(wrapUpInfo);
    wrapUpInfo = JSON.parse(wrapUpInfo);

    let wrapUpCode = wrapUpInfo.find(code => code.id === wrapUpID).name;
    logger.info('Headless Widget Log: Wrap Up Code selected : ' + wrapUpCode);    
  }
    

  // method to make an OutDial Call
  async makeOutDialCall()
  {
    callType = 'Outbound';
    try {
      const outDial = await Desktop.dialer.startOutdial({
      data: {
          entryPointId: '57a9b978-206f-48bd-a340-770b61ca83c4', // OutDial Entry Point ID
          destination: '14806754111', // user phone number
          direction: 'OUTBOUND', // either INBOUND or OUTBOUND
          origin: '+14806754084', // OutDial ANI with country code
          attributes: {},
          mediaType: 'telephony',
          outboundType: 'OUTDIAL',
         }
      });
      logger.info('Headless Widget Log: Dialer outdial : ' + JSON.stringify(outDial));
    }
    catch (error) {
      logger.info('Headless Widget Log: Dialer Error Message : ' + error);
      Desktop.dialer.addEventListener("eOutdialFailed", msg => logger.info('Headless Widget Log: ' + msg));
    }
  }

  disconnectedCallback() {;}

});
