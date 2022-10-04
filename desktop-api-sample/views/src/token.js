export const accessToken = async () => {
  // let response = await fetch("https://sa-wxcc-api-custom-desktop.herokuapp.com/token");
  let response = await fetch("https://bf8e-2600-1700-8490-795f-e993-8c2e-f4a9-8d32.ngrok.io/token");
  let result = await response.json();
  // console.log(result);
  return result;
};
