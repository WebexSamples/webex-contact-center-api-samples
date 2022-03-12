const oauth = {
  client_id: "C239e8b22acfb54145054c7626e1cdf3fe6b6c8d2a80562c0edfcc2f7e8e27889",
  redirect_uri: "http://localhost:5000/oauth/redirect",
  scope1: "cjp:config",
  scope2: "cjp:config_write",
  scope3: "cjp:config_read"
};

//build auth URL
const div = document.querySelector("#mainArticle");
const authBtn = document.createElement("a");
authBtn.classList.add("btn");
authBtn.textContent = "WxCC oAuth";
authBtn.href = `https://webexapis.com/v1/authorize?client_id=${oauth.client_id}&response_type=code&redirect_uri=${oauth.redirect_uri}&scope=${oauth.scope2} ${oauth.scope1} ${oauth.scope3}&state=set_state_here`;
div.appendChild(authBtn);

console.log(div);
