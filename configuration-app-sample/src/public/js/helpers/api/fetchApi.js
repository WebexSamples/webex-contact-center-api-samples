import { getBearerToken } from "./getBearerToken.js";

const token = getBearerToken();

export async function fetchApi(url, method) {
  try {
    let response1 = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    let response2 = await response1.json();
    return response2;
  } catch (error) {
    return error;
    // location.href = `${host}/index.html`;
  }
}
