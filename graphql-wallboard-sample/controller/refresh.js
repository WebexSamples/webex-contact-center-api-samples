import fetch from "node-fetch";
import { encode, decode } from "js-base64";

export async function checkToken() {
  // Get values from server
  let envValues = {
    getIDs: async () => {
      const posts = await fetch(`${process.env.URL}/refreshToken`, {
        method: "GET",
        headers: {
          Authorization: "Basic " + encode(process.env.NAME + ":" + process.env.PASS),
          "Content-Type": "application/json"
        }
      });
      const response = await posts.json();
      const { client_id, client_secret, grant_type, refresh_token, expires, startTimer } = await response[0];
      console.log(expires);
      return { client_id, client_secret, grant_type, refresh_token, expires, startTimer };
    }
  };

  //Set timers for the token on the Environment
  async function setTokenTimer() {
    let time = new Date().getTime();
    let setCountDown = time;
    let expires = new Date(new Date(Number(setCountDown)).getTime() + 60 * 60 * 10 * 1000).getTime();

    try {
      const response = await fetch(`${process.env.URL}/updateTimer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ expires })
      });
    } catch (error) {
      console.log(error);
    }
  }

  // rotate tokens
  async function getToken() {
    try {
      // let info = await combineAllIDs();
      let info = await envValues.getIDs();
      // console.log(info);
      const response = await fetch("https://webexapis.com/v1/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
      });
      var token = await response.json();
      console.log("I got new TOKEN");
      updateToken(token);
      setTokenTimer();
      console.log(`new token stored, expires in 10 hours`);
    } catch (error) {
      console.log(error);
    }
  }

  //update tokens
  async function updateToken(token) {
    try {
      const response = await fetch(`${process.env.URL}/update`, {
        method: "POST",
        headers: {
          Authorization: "Basic " + encode(process.env.NAME + ":" + process.env.PASS),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(token)
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Make a logical decision to renew Access_Token every 10 hours
  async function determine() {
    let info = await envValues.getIDs();
    let expires = info.expires;
    if (expires <= new Date().getTime()) {
      console.log("Token is expired");
      getToken();
      setTokenTimer();
    } else {
      console.log(`All good.  Still have some time before token expires.`);
    }
  }
  determine();
}
