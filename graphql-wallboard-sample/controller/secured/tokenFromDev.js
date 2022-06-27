import fetch from "node-fetch";
import { encode, decode } from "js-base64";

export let tokenFromDev = async () => {
  try {
    const posts = await fetch(`${process.env.URL}/dev-token`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + encode(process.env.NAME + ":" + process.env.PASS),
        "Content-Type": "application/json"
      }
    });
    const response = await posts.json();
    const access_token = await response.access_token;
    // console.log(`from dev: ${access_token}`);
    return access_token;
  } catch (error) {
    console.log(error);
  }
};
