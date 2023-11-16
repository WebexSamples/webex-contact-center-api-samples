export function getBearerToken() {
  try {
    const query = decodeURI(window.location.search.substring(1));
    const accessToken = query.split("access_token=")[1];
    let host = decodeURI(window.location.origin);

    // localStorage
    localStorage.setItem("token", accessToken);
    return JSON.parse(accessToken);
  } catch (error) {
    //link for token
    const link = `${host}/index`;

    let noTokenMessage = document.getElementById("mainArticle");
    noTokenMessage.innerHTML = `
      <h2 id="message" class="noToken"> Oops... <br> Looks like we dont have an access token.<br> Let's get one... <a class="noToken" href="${link}">oAuth</a></h2>
    `;
    return;
  }
}
