// parse Environmental from the URL
const oauth = {
  clientID: decodeURI(window.location.search.split("?")[1].split("clientID=")[1]),
  host: decodeURI(window.location.origin),
  path: decodeURI(window.location.search.substring(2).split("path=")[1]),
  scope1: "cjp:config",
  scope2: "cjp:config_write",
  scope3: "cjp:config_read"
};

//build auth URL
const div = document.querySelector("#mainArticle");
const authBtn = document.createElement("a");
authBtn.classList.add("btn");
authBtn.textContent = "WxCC oAuth";
authBtn.href = `https://webexapis.com/v1/authorize?client_id=${oauth.clientID}&response_type=code&redirect_uri=${oauth.host}${oauth.path}&scope=${oauth.scope2} ${oauth.scope1} ${oauth.scope3}&state=set_state_here`;
div.appendChild(authBtn);
