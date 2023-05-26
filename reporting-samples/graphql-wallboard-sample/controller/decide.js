import fetch from "node-fetch";
import { tokenFromDB } from "./secured/tokenFromDB.js";
import { tokenFromDev } from "./secured/tokenFromDev.js";

// Decider of mongoDB tokens or just copy/paste token from dev portal
export async function decide() {
  let tokenDB = tokenFromDB;
  let tokenDev = tokenFromDev;
  let info = await getENVs();
  let org_id = info.org_id;
  let fetchToken = info.environment === "production" ? tokenDB() : tokenDev();
  // console.log(await condition);
  return {
    fetchToken,
    org_id
  };
}

async function getENVs() {
  const posts = await fetch(`${process.env.URL}/environment`);
  const response = await posts.json();
  const { environment, org_id } = await response;
  // console.log(environment);

  return {
    environment,
    org_id
  };
}
