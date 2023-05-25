export const accessToken = async () => {
  return async function () {
    // add your own public URL;
    let response = await fetch("your_public_url/token");
    let result = await response.json();
    return result.ccAccessToken;
  };
};
