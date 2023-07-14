import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { logger } from './sdk';
import { Desktop } from '@wxcc-desktop/sdk';
// This serves as example as to how to import a specific webcomponent from the momentum web component library
import '@momentum-ui/web-components/dist/comp/md-badge.js';

@Component({
  selector: 'my-custom-component',
  templateUrl: './my-custom-component.component.html',
  styleUrls: ['./my-custom-component.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class MyCustomComponent implements OnInit {
  taskMap!: any;
  interId!: any;

  // This input param is added to serve as an example as to how to pass in attributes or properties to the custom element
  @Input('theme') isDarkMode: boolean | undefined;

  private initializeDesktop = async () => {
    await Desktop.config.init();
    logger.info('desktop initialized');
  };

  // Get interactionID, but more info can be obtained from this method
  public getInteractionId = async () => {
    this.taskMap = await Desktop.actions.getTaskMap();
    for (const iterator of this.taskMap) {
      this.interId = iterator[1].interactionId;
      console.log(`NIKOID:  ${this.interId}`);
      return this.interId;
    }
  };

  // Transfer to DN ie Blind-Transfer
  // async transferToDN(phoneDN: any) {
  //   let interactionId = await this.getInteractionId();
  //   let response = await Desktop.agentContact.blindTransfer({
  //     interactionId,
  //     data: {
  //       destAgentId: phoneDN,
  //       mediaType: 'telephony'
  //     },
  //   });

  //   logger.info('transferToDN' + JSON.stringify(response));
  // }

  ngOnInit() {
    this.initializeDesktop();
    this.getInteractionId();
  }
}
