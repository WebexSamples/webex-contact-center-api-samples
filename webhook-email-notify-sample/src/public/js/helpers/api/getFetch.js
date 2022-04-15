import { fetchApi } from "./fetchApi.js";
import { renderHTML } from "../../../views/render.js";

export async function getFetch(formValues, method) {
  const url = `https://api.wxcc-us1.cisco.com/v1/${formValues.endpoint}`;
  if (formValues.endpoint === "event-types") {
    const response = await fetchApi(url, method);
    try {
      // Traverse form
      const results = response.data.map(el => {
        const elementInfo = {
          elementName: el.name,
          elementResource: el.resource,
          elementAction: el.action
        };
        const { elementName, elementResource, elementAction } = elementInfo;

        return `
    					<p class="fs">name: <div class="fs">${elementName}</div></p>
    					<p class="fs">resource: <div class="fs">${elementResource}</div> </p>
    					<p class="fs">action: <div class="fs">${elementAction}</div> </p>
    					`;
      });
      //Render results
      renderHTML(formValues.endpoint, results);
    } catch (error) {
      console.log(error);
      if (response.error.key == 401) {
        // send back to re-authenticate
        const host = decodeURI(window.location.origin);
        location.href = `${host}/app.html`;
      } else {
        console.log("something went wrong");
      }
    }
  } else {
    const response = await fetchApi(url, method);
    const endpoint = "";
    const meta = [response];
    console.log(meta);

    const results = meta.map(el => {
      const elementInfo = {
        metaOrg: el.meta.orgId,
        metaSubscriptionCount: el.meta.subscriptionCount,
        dataDescription: el.data[0].description,
        dataUrl: el.data[0].destinationUrl,
        dataID: el.data[0].id,
        dataName: el.data[0].name,
        dataStatus: el.data[0].status,
        dataEventType: el.data[0].eventTypes.map(event => {
          return event;
        })
      };
      const { metaOrg, metaSubscriptionCount, dataDescription, dataUrl, dataID, dataName, dataStatus, dataEventType } = elementInfo;

      return `
              <p class="fs">Org Id: <div class="fs">${metaOrg}</div></p>
              <p class="fs">Subscription Count: <div class="fs">${metaSubscriptionCount}</div> </p>
            
                  <p class="fs">Description: <div class="fs"> ${dataDescription}</div></p>
                  <p class="fs">URL: <div class="fs"> ${dataUrl}</div></p>
                  <p class="fs">Id: <div class="fs"> ${dataID}</div></p>
                  <p class="fs">Name: <div class="fs"> ${dataName}</div></p>
                  <p class="fs">Status: <div class="fs"> ${dataStatus}</div></p>
                  <p class="fs">Event Type: <div class="fs"> ${dataEventType}</div></p>
             
              `;
    });
    //Render results
    renderHTML(endpoint, results);
  }
}
